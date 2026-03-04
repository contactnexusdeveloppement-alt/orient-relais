import { NextRequest, NextResponse } from "next/server";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { jwtVerify } from "jose";

const client = new WooCommerceRestApi({
    url: process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://orient-relais.com",
    consumerKey: process.env.WC_CONSUMER_KEY || "",
    consumerSecret: process.env.WC_CONSUMER_SECRET || "",
    version: "wc/v3",
});

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || "orient-relais-jwt-secret-key-change-in-production"
);

async function getCustomerIdFromToken(request: NextRequest): Promise<number | null> {
    const token = request.cookies.get("auth-token")?.value;
    if (!token) return null;
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        return payload.customerId as number;
    } catch {
        return null;
    }
}

export async function GET(request: NextRequest) {
    try {
        const customerId = await getCustomerIdFromToken(request);
        if (!customerId) {
            return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
        }

        // Fetch customer orders
        const response = await client.get("orders", {
            customer: customerId,
            per_page: 20,
            orderby: "date",
            order: "desc",
        });

        const orders = response.data.map((order: Record<string, unknown>) => ({
            id: order.id,
            number: order.number,
            status: order.status,
            total: order.total,
            currency: order.currency,
            date_created: order.date_created,
            line_items: (order.line_items as Record<string, unknown>[])?.map((item) => ({
                id: item.id,
                name: item.name,
                quantity: item.quantity,
                total: item.total,
                image: (item.image as Record<string, unknown>)?.src || "",
            })),
            shipping: order.shipping,
            billing: order.billing,
        }));

        return NextResponse.json({ orders });
    } catch (error) {
        console.error("Orders fetch error:", error);
        return NextResponse.json({ error: "Erreur lors de la récupération des commandes." }, { status: 500 });
    }
}
