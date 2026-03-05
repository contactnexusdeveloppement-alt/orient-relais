import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe-server";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

// Stripe needs the raw body to verify the signature
export const config = {
    api: {
        bodyParser: false,
    },
};

const woo = new WooCommerceRestApi({
    url: process.env.NEXT_PUBLIC_WOOCOMMERCE_URL || "https://www.orient-relais.com",
    consumerKey: process.env.WC_CONSUMER_KEY || "",
    consumerSecret: process.env.WC_CONSUMER_SECRET || "",
    version: "wc/v3",
    queryStringAuth: true
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
    if (!webhookSecret) {
        console.error("Missing STRIPE_WEBHOOK_SECRET");
        return NextResponse.json({ error: "Webhook secret missing" }, { status: 500 });
    }

    try {
        const body = await req.text();
        const signature = req.headers.get("stripe-signature") as string;

        let event;
        try {
            event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
        } catch (err: any) {
            console.error(`Webhook signature verification failed: ${err.message}`);
            return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
        }

        // We only care about successful payments
        if (event.type === "payment_intent.succeeded") {
            const paymentIntent = event.data.object as any;
            const pmId = paymentIntent.id;
            const meta = paymentIntent.metadata;

            console.log(`[Stripe Webhook] PaymentIntent ${pmId} succeeded. Processing order...`);

            // Check if order already exists to prevent duplicates
            const existingOrders = await woo.get("orders", { search: pmId });
            if (existingOrders.data && existingOrders.data.length > 0) {
                console.log(`[Stripe Webhook] Order for intent ${pmId} already exists. Skipping.`);
                return NextResponse.json({ received: true, status: "already_processed" });
            }

            // Reconstruct the items
            let parsedItems: any[] = [];
            try {
                parsedItems = JSON.parse(meta.items_json || "[]");
            } catch (e) {
                console.error("Could not parse items_json from metadata");
            }

            const lineItems = parsedItems.map((item) => ({
                product_id: item.id,
                quantity: item.q,
            }));

            // Reconstruct shipping lines
            const shippingLines = [
                {
                    method_id: meta.shipping_method === "mondialrelay" ? "mondial_relay" : "colissimo",
                    method_title: meta.shipping_method === "mondialrelay" ? "Mondial Relay" : "Colissimo Domicile",
                    total: meta.shipping_cost ? (parseInt(meta.shipping_cost) / 100).toFixed(2) : "4.90",
                },
            ];

            // Reconstruct exact shipping address based on method
            const isMondialRelay = meta.shipping_method === "mondialrelay" && meta.relay_id;
            const finalShippingAddress = isMondialRelay
                ? `${meta.relay_name} — ${meta.relay_address}`
                : meta.shipping_address;
            const finalShippingCity = isMondialRelay ? meta.relay_city : meta.shipping_city;
            const finalShippingZip = isMondialRelay ? meta.relay_zip : meta.shipping_zip;

            // Build WooCommerce order payload
            const orderData: Record<string, unknown> = {
                payment_method: "stripe",
                payment_method_title: "Carte bancaire (Stripe)",
                set_paid: true,
                status: "processing", // The order is paid and ready to be processed
                billing: {
                    first_name: meta.customer_name?.split(" ")[0] || "",
                    last_name: meta.customer_name?.split(" ").slice(1).join(" ") || "",
                    email: meta.customer_email || "",
                    phone: meta.customer_phone || "",
                    address_1: meta.shipping_address || "",
                    city: meta.shipping_city || "",
                    postcode: meta.shipping_zip || "",
                    country: "FR",
                },
                shipping: {
                    first_name: meta.customer_name?.split(" ")[0] || "",
                    last_name: meta.customer_name?.split(" ").slice(1).join(" ") || "",
                    address_1: finalShippingAddress || "",
                    city: finalShippingCity || "",
                    postcode: finalShippingZip || "",
                    country: "FR",
                },
                line_items: lineItems,
                shipping_lines: shippingLines,
                transaction_id: pmId,
                meta_data: [
                    { key: "_stripe_payment_intent", value: pmId },
                    { key: "_created_via", value: "stripe_webhook" },
                    ...(isMondialRelay ? [
                        { key: "_mondial_relay_id", value: meta.relay_id },
                        { key: "_mondial_relay_name", value: meta.relay_name },
                    ] : []),
                ],
            };

            // Create the order via WooCommerce API
            const response = await woo.post("orders", orderData);
            console.log(`[Stripe Webhook] Successfully created WooCommerce order #${response.data.id}`);
        }

        return NextResponse.json({ received: true });
    } catch (err: any) {
        console.error(`[Stripe Webhook Error] ${err.message}`);
        return NextResponse.json({ error: "Webhook handler failed." }, { status: 500 });
    }
}
