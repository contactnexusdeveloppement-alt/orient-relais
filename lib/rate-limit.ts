import type { NextRequest } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export function getClientIp(request: NextRequest): string {
    const forwarded = request.headers.get("x-forwarded-for");
    if (forwarded) return forwarded.split(",")[0].trim();
    return request.headers.get("x-real-ip") || "unknown";
}

export type RateLimitResult = {
    allowed: boolean;
    retryAfterSec: number;
    remaining: number;
};

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const USE_UPSTASH = Boolean(UPSTASH_URL && UPSTASH_TOKEN);

let redis: Redis | null = null;
const limiters = new Map<string, Ratelimit>();

if (USE_UPSTASH) {
    redis = new Redis({ url: UPSTASH_URL!, token: UPSTASH_TOKEN! });
}

function getLimiter(prefix: string, limit: number, windowMs: number): Ratelimit {
    const key = `${prefix}:${limit}:${windowMs}`;
    const existing = limiters.get(key);
    if (existing) return existing;
    const limiter = new Ratelimit({
        redis: redis!,
        limiter: Ratelimit.slidingWindow(limit, `${windowMs} ms`),
        prefix,
        analytics: false,
    });
    limiters.set(key, limiter);
    return limiter;
}

type Bucket = { hits: number[] };
const buckets = new Map<string, Bucket>();

function checkMemoryRateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
    const now = Date.now();
    const bucket = buckets.get(key) ?? { hits: [] };
    bucket.hits = bucket.hits.filter((t) => now - t < windowMs);

    if (bucket.hits.length >= limit) {
        const oldest = bucket.hits[0];
        const retryAfterSec = Math.max(1, Math.ceil((windowMs - (now - oldest)) / 1000));
        buckets.set(key, bucket);
        return { allowed: false, retryAfterSec, remaining: 0 };
    }

    bucket.hits.push(now);
    buckets.set(key, bucket);
    return { allowed: true, retryAfterSec: 0, remaining: limit - bucket.hits.length };
}

export async function checkRateLimitAsync(
    key: string,
    limit: number,
    windowMs: number
): Promise<RateLimitResult> {
    if (USE_UPSTASH && redis) {
        const [prefix, ...rest] = key.split(":");
        const identifier = rest.join(":") || "_";
        try {
            const res = await getLimiter(prefix, limit, windowMs).limit(identifier);
            const retryAfterSec = res.success
                ? 0
                : Math.max(1, Math.ceil((res.reset - Date.now()) / 1000));
            return { allowed: res.success, retryAfterSec, remaining: res.remaining };
        } catch (err) {
            console.error("[rate-limit] Upstash failed, falling back to memory", err);
        }
    }
    return checkMemoryRateLimit(key, limit, windowMs);
}

export function checkRateLimit(
    key: string,
    limit: number,
    windowMs: number
): RateLimitResult {
    return checkMemoryRateLimit(key, limit, windowMs);
}

if (typeof setInterval !== "undefined") {
    const MAX_IDLE_MS = 60 * 60 * 1000;
    setInterval(() => {
        const now = Date.now();
        for (const [key, bucket] of buckets.entries()) {
            const last = bucket.hits[bucket.hits.length - 1] ?? 0;
            if (now - last > MAX_IDLE_MS) buckets.delete(key);
        }
    }, 10 * 60 * 1000).unref?.();
}
