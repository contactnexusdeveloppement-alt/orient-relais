import { NextRequest, NextResponse } from "next/server";
import wooClient from "@/lib/woocommerce";
import { z } from "zod";
import { checkRateLimitAsync, getClientIp } from "@/lib/rate-limit";

const REVIEWS_PER_PAGE = 20;

function toProductId(raw: string): number | null {
    const n = Number(raw);
    if (!Number.isInteger(n) || n <= 0 || n > 2_147_483_647) return null;
    return n;
}

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const params = await context.params;
        const productId = toProductId(params.id);
        if (!productId) {
            return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
        }

        const page = Math.max(1, Number(request.nextUrl.searchParams.get("page") || 1) || 1);

        const response = await wooClient.get("products/reviews", {
            product: [productId],
            status: "approved",
            per_page: REVIEWS_PER_PAGE,
            page,
        });

        return NextResponse.json(response.data);
    } catch (error: unknown) {
        console.error("Error fetching reviews:", error);
        return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
    }
}

const reviewSchema = z.object({
    reviewer: z.string().trim().min(1).max(80),
    reviewer_email: z.string().trim().toLowerCase().email().max(254),
    review: z.string().trim().min(1).max(2000),
    rating: z.number().int().min(1).max(5),
});

export async function POST(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const params = await context.params;
        const productId = toProductId(params.id);
        if (!productId) {
            return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
        }

        const ip = getClientIp(request);
        const rl = await checkRateLimitAsync(`review:${ip}`, 5, 60 * 60 * 1000);
        if (!rl.allowed) {
            return NextResponse.json(
                { error: "Trop d'avis envoyés. Réessayez plus tard." },
                { status: 429, headers: { "Retry-After": String(rl.retryAfterSec) } }
            );
        }

        const body = await request.json().catch(() => null);
        const normalised =
            body && typeof body === "object"
                ? { ...body, rating: Number((body as Record<string, unknown>).rating) }
                : body;
        const parsed = reviewSchema.safeParse(normalised);
        if (!parsed.success) {
            return NextResponse.json(
                { error: parsed.error.issues[0]?.message ?? "Données invalides" },
                { status: 400 }
            );
        }
        const { reviewer, reviewer_email, review, rating } = parsed.data;

        const response = await wooClient.post("products/reviews", {
            product_id: productId,
            review,
            reviewer,
            reviewer_email,
            rating,
            status: "hold", // Moderation: reviews start on hold
        });

        return NextResponse.json(response.data);
    } catch (error: unknown) {
        console.error("Error posting review:", error);
        const wcErr = error as { response?: { data?: { message?: string } } };
        const message = wcErr?.response?.data?.message || "Failed to post review";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
