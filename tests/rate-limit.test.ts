import { describe, expect, it, beforeEach, vi } from "vitest";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import type { NextRequest } from "next/server";

function req(headers: Record<string, string>): NextRequest {
    const h = new Headers(headers);
    return { headers: h } as unknown as NextRequest;
}

describe("getClientIp", () => {
    it("returns the first IP in x-forwarded-for", () => {
        expect(getClientIp(req({ "x-forwarded-for": "203.0.113.5, 10.0.0.1" }))).toBe("203.0.113.5");
    });

    it("falls back to x-real-ip", () => {
        expect(getClientIp(req({ "x-real-ip": "198.51.100.2" }))).toBe("198.51.100.2");
    });

    it("returns 'unknown' when no IP header is present", () => {
        expect(getClientIp(req({}))).toBe("unknown");
    });
});

describe("checkRateLimit", () => {
    let counter = 0;
    beforeEach(() => {
        counter += 1;
        vi.useRealTimers();
    });

    const freshKey = () => `test-key-${counter}-${Math.random()}`;

    it("allows up to N hits in the window", () => {
        const key = freshKey();
        for (let i = 0; i < 5; i++) {
            expect(checkRateLimit(key, 5, 60_000).allowed).toBe(true);
        }
    });

    it("rejects the N+1th hit inside the window", () => {
        const key = freshKey();
        for (let i = 0; i < 3; i++) checkRateLimit(key, 3, 60_000);
        const result = checkRateLimit(key, 3, 60_000);
        expect(result.allowed).toBe(false);
        expect(result.retryAfterSec).toBeGreaterThan(0);
        expect(result.remaining).toBe(0);
    });

    it("resets after the window elapses", () => {
        const key = freshKey();
        vi.useFakeTimers();
        vi.setSystemTime(new Date("2026-01-01T00:00:00Z"));
        for (let i = 0; i < 3; i++) checkRateLimit(key, 3, 60_000);
        expect(checkRateLimit(key, 3, 60_000).allowed).toBe(false);
        vi.setSystemTime(new Date("2026-01-01T00:01:01Z"));
        expect(checkRateLimit(key, 3, 60_000).allowed).toBe(true);
    });

    it("tracks different keys independently", () => {
        const a = freshKey();
        const b = freshKey();
        for (let i = 0; i < 3; i++) checkRateLimit(a, 3, 60_000);
        expect(checkRateLimit(a, 3, 60_000).allowed).toBe(false);
        expect(checkRateLimit(b, 3, 60_000).allowed).toBe(true);
    });
});
