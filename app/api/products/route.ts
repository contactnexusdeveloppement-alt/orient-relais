import { NextRequest, NextResponse } from "next/server";
import { wooClient } from "@/lib/wc-client";

const MAX_IDS_PER_REQUEST = 50;

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const include = searchParams.get("include");

        if (!include) {
            return NextResponse.json({ products: [] });
        }

        // Validate: comma-separated positive integers only (WooCommerce IDs).
        // Rejects injection attempts and caps list length to prevent abuse.
        const rawIds = include.split(",").map((s) => s.trim()).filter(Boolean);
        if (rawIds.length === 0 || rawIds.length > MAX_IDS_PER_REQUEST) {
            return NextResponse.json({ products: [] });
        }

        const ids: number[] = [];
        for (const raw of rawIds) {
            const n = Number(raw);
            if (!Number.isInteger(n) || n <= 0 || n > 2_147_483_647) {
                return NextResponse.json({ products: [] });
            }
            ids.push(n);
        }

        const response = await wooClient.get("products", {
            include: ids.join(","),
            per_page: MAX_IDS_PER_REQUEST,
        });

        return NextResponse.json({ products: response.data });
    } catch (error) {
        console.error("Products fetch error:", error);
        return NextResponse.json({ products: [] }, { status: 500 });
    }
}
