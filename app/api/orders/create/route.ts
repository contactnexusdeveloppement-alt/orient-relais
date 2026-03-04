import { NextRequest, NextResponse } from "next/server";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

const woo = new WooCommerceRestApi({
    url: process.env.NEXT_PUBLIC_WOOCOMMERCE_URL || "https://orient-relais.com",
    consumerKey: process.env.WC_CONSUMER_KEY || "",
    consumerSecret: process.env.WC_CONSUMER_SECRET || "",
    version: "wc/v3",
});

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || "orient-relais-jwt-secret-key-change-in-production"
);

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            paymentIntentId,
            items,
            customerInfo,
            shippingMethod,
            shippingCost,
            selectedRelay,
        } = body;

        if (!paymentIntentId || !items || items.length === 0) {
            return NextResponse.json({ error: "Données manquantes." }, { status: 400 });
        }

        // Get customer ID from JWT if logged in
        let customerId: number | undefined;
        const cookieStore = await cookies();
        const token = cookieStore.get("auth-token")?.value;
        if (token) {
            try {
                const { payload } = await jwtVerify(token, JWT_SECRET);
                customerId = payload.customerId as number;
            } catch {
                // Continue without customer ID
            }
        }

        // Build line items
        const lineItems = items.map((item: { id: number; title: string; quantity: number; price: number }) => ({
            product_id: item.id,
            quantity: item.quantity,
        }));

        // Build shipping lines
        const shippingLines = [
            {
                method_id: shippingMethod === "mondialrelay" ? "mondial_relay" : "colissimo",
                method_title: shippingMethod === "mondialrelay" ? "Mondial Relay" : "Colissimo Domicile",
                total: shippingCost.toFixed(2),
            },
        ];

        // Build order data
        const orderData: Record<string, unknown> = {
            payment_method: "stripe",
            payment_method_title: "Carte bancaire (Stripe)",
            set_paid: true,
            status: "processing",
            billing: {
                first_name: customerInfo.firstName || "",
                last_name: customerInfo.lastName || "",
                email: customerInfo.email || "",
                phone: customerInfo.phone || "",
                address_1: customerInfo.address || "",
                city: customerInfo.city || "",
                postcode: customerInfo.zip || "",
                country: "FR",
            },
            shipping: {
                first_name: customerInfo.firstName || "",
                last_name: customerInfo.lastName || "",
                address_1: shippingMethod === "mondialrelay" && selectedRelay
                    ? `${selectedRelay.name} — ${selectedRelay.address}`
                    : customerInfo.address || "",
                city: shippingMethod === "mondialrelay" && selectedRelay
                    ? selectedRelay.city
                    : customerInfo.city || "",
                postcode: shippingMethod === "mondialrelay" && selectedRelay
                    ? selectedRelay.postcode
                    : customerInfo.zip || "",
                country: "FR",
            },
            line_items: lineItems,
            shipping_lines: shippingLines,
            transaction_id: paymentIntentId,
            meta_data: [
                { key: "_stripe_payment_intent", value: paymentIntentId },
                ...(selectedRelay ? [
                    { key: "_mondial_relay_id", value: selectedRelay.id },
                    { key: "_mondial_relay_name", value: selectedRelay.name },
                ] : []),
            ],
        };

        // Attach customer if logged in
        if (customerId) {
            orderData.customer_id = customerId;
        }

        // Create the order in WooCommerce
        const response = await woo.post("orders", orderData);

        return NextResponse.json({
            success: true,
            orderId: response.data.id,
            orderNumber: response.data.number,
        });
    } catch (error) {
        console.error("Error creating WooCommerce order:", error);
        return NextResponse.json(
            { error: "Erreur lors de la création de la commande." },
            { status: 500 }
        );
    }
}
