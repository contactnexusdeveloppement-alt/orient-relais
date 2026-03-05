import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe-server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { items, shippingCost = 490, customerInfo } = body;

        // Validate items
        if (!items || !Array.isArray(items) || items.length === 0) {
            return NextResponse.json(
                { error: "Le panier est vide." },
                { status: 400 }
            );
        }

        // Calculate amount server-side (in cents) to prevent tampering
        const itemsTotal = items.reduce(
            (sum: number, item: { price: number; quantity: number }) =>
                sum + Math.round(item.price * 100) * item.quantity,
            0
        );

        const totalAmount = itemsTotal + shippingCost;

        // Minimum Stripe amount is 50 cents
        if (totalAmount < 50) {
            return NextResponse.json(
                { error: "Le montant minimum est de 0,50 €." },
                { status: 400 }
            );
        }

        // Create the PaymentIntent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalAmount,
            currency: "eur",
            automatic_payment_methods: {
                enabled: true,
            },
            metadata: {
                // Customer Context
                customer_email: customerInfo?.email || "",
                customer_name: `${customerInfo?.firstName || ""} ${customerInfo?.lastName || ""}`.trim(),
                customer_phone: customerInfo?.phone || "",

                // Shipping Context
                shipping_address: customerInfo?.address || "",
                shipping_city: customerInfo?.city || "",
                shipping_zip: customerInfo?.zip || "",
                shipping_method: body.shippingMethod || "colissimo",
                shipping_cost: body.shippingCost?.toString() || "490",

                // Mondial Relay Data (if selected)
                relay_id: body.selectedRelay?.id || "",
                relay_name: body.selectedRelay?.name || "",
                relay_address: body.selectedRelay?.address || "",
                relay_city: body.selectedRelay?.city || "",
                relay_zip: body.selectedRelay?.postcode || "",

                // Cart Context (JSON stringified to fit in metadata, limited to ~500 chars usually)
                items_json: JSON.stringify(items.map((i: any) => ({ id: i.id, q: i.quantity }))),
            },
            receipt_email: customerInfo?.email || undefined,
            description: `Commande Orient Relais — ${items.length} article(s)`,
        });

        return NextResponse.json({
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id,
        });
    } catch (error: unknown) {
        console.error("Error creating payment intent:", error);
        const message =
            error instanceof Error ? error.message : "Erreur interne du serveur";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
