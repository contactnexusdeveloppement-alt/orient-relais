import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { checkRateLimitAsync, getClientIp } from "@/lib/rate-limit";

const emailSchema = z.object({
    email: z.string().trim().toLowerCase().email().max(254),
});

// Generic response used for every outcome to avoid leaking whether an
// account exists (email enumeration defence).
const GENERIC_RESPONSE = {
    message:
        "Si un compte existe avec cet email, vous recevrez un lien de réinitialisation.",
};

export async function POST(request: NextRequest) {
    try {
        const ip = getClientIp(request);
        const rl = await checkRateLimitAsync(
            `forgot-password:${ip}`,
            5,
            60 * 60 * 1000
        );
        if (!rl.allowed) {
            return NextResponse.json(
                { error: "Trop de tentatives. Réessayez plus tard." },
                {
                    status: 429,
                    headers: { "Retry-After": String(rl.retryAfterSec) },
                }
            );
        }

        const body = await request.json().catch(() => null);
        const parsed = emailSchema.safeParse(body);
        if (!parsed.success) {
            // Still return generic message to avoid signalling validity
            return NextResponse.json(GENERIC_RESPONSE);
        }
        const { email } = parsed.data;

        const wpUrl =
            process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://orient-relais.com";

        // Fire-and-best-effort: don't surface upstream errors to the client
        await fetch(`${wpUrl}/wp-json/custom/v1/forgot-password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        }).catch(() => undefined);

        return NextResponse.json(GENERIC_RESPONSE);
    } catch (error) {
        console.error("Forgot password error:", error);
        return NextResponse.json(GENERIC_RESPONSE);
    }
}
