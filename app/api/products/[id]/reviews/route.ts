import { NextRequest, NextResponse } from "next/server";
import wooClient from "@/lib/woocommerce";

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const params = await context.params;
        const productId = params.id;

        if (!productId) {
            return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
        }

        const response = await wooClient.get("products/reviews", {
            product: [Number(productId)],
            status: "approved"
        });

        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error("Error fetching reviews:", error);
        return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
    }
}

export async function POST(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const params = await context.params;
        const productId = params.id;
        const body = await request.json();

        const { reviewer, reviewer_email, review, rating } = body;

        if (!review || !rating || !reviewer || !reviewer_email) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const response = await wooClient.post("products/reviews", {
            product_id: Number(productId),
            review,
            reviewer,
            reviewer_email,
            rating: Number(rating),
            status: "hold" // Force hold so you can moderate them in WordPress, change to 'approved' if you trust all inputs
        });

        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error("Error posting review:", error);
        const message = error.response?.data?.message || "Failed to post review";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
