import { NextRequest, NextResponse } from "next/server";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const client = new WooCommerceRestApi({
    url: process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://orient-relais.com",
    consumerKey: process.env.WC_CONSUMER_KEY || "",
    consumerSecret: process.env.WC_CONSUMER_SECRET || "",
    version: "wc/v3",
});

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const include = searchParams.get("include");

        if (!include) {
            return NextResponse.json({ products: [] });
        }

        const response = await client.get("products", {
            include: include,
            per_page: 50,
        });

        return NextResponse.json({ products: response.data });
    } catch (error) {
        console.error("Products fetch error:", error);
        return NextResponse.json({ products: [] }, { status: 500 });
    }
}
