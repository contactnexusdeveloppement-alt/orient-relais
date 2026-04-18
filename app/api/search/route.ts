import { NextRequest, NextResponse } from "next/server";
import { searchWooProducts } from "@/lib/woocommerce";

const MAX_QUERY_LENGTH = 100;
const MAX_RESULTS = 20;

export async function GET(request: NextRequest) {
    const raw = request.nextUrl.searchParams.get("q") || "";
    const query = raw.trim().slice(0, MAX_QUERY_LENGTH);

    if (!query) {
        return NextResponse.json([]);
    }

    try {
        const products = await searchWooProducts(query);
        return NextResponse.json(products.slice(0, MAX_RESULTS));
    } catch (error) {
        console.error("Search API error:", error);
        return NextResponse.json([], { status: 500 });
    }
}
