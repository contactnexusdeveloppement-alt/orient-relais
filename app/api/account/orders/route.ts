import { NextRequest, NextResponse } from "next/server";
import { wooClient } from "@/lib/wc-client";
import { getCustomerIdFromRequest } from "@/lib/auth";

const client = wooClient;

export async function GET(request: NextRequest) {
    try {
        const customerId = await getCustomerIdFromRequest(request);
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
