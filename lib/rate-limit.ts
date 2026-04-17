import type { NextRequest } from "next/server";

type Bucket = { hits: number[] };

const buckets = new Map<string, Bucket>();

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

export function checkRateLimit(
    key: string,
    limit: number,
    windowMs: number
): RateLimitResult {
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
