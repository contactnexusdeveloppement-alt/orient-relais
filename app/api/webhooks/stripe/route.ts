import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe-server";
import { createOrderFromPaymentIntent, findOrderByPaymentIntent } from "@/lib/checkout-order";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

/**
 * Filet de sécurité : crée la commande WooCommerce quand Stripe confirme un
 * paiement, au cas où le checkout n'a pas pu le faire (onglet fermé, réseau
 * coupé…). Signature Stripe vérifiée : l'événement est authentique.
 */
export async function POST(req: NextRequest) {
    if (!webhookSecret) {
        console.error("Missing STRIPE_WEBHOOK_SECRET");
        return NextResponse.json({ error: "Webhook secret missing" }, { status: 500 });
    }

    const body = await req.text();
    const signature = req.headers.get("stripe-signature") ?? "";

    let event: Stripe.Event;
    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown error";
        console.error(`Webhook signature verification failed: ${message}`);
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    if (event.type !== "payment_intent.succeeded") {
        return NextResponse.json({ received: true });
    }

    const paymentIntent = event.data.object as Stripe.PaymentIntent;

    try {
        // Le checkout crée normalement la commande 1 à 3 s après le paiement.
        // Si elle n'existe pas encore, on lui laisse le temps avant de
        // revérifier, pour ne pas créer un doublon quand les deux arrivent
        // en même temps. En cas d'échec, Stripe renverra l'événement.
        if (!(await findOrderByPaymentIntent(paymentIntent.id))) {
            await new Promise((resolve) => setTimeout(resolve, 3000));
        }

        const { order, created } = await createOrderFromPaymentIntent(paymentIntent, "webhook");
        console.log(
            `[Stripe Webhook] ${paymentIntent.id} → commande #${order.number} ${created ? "créée" : "déjà existante"}`,
        );
        return NextResponse.json({ received: true, orderNumber: order.number, created });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown error";
        console.error(`[Stripe Webhook Error] ${paymentIntent.id}: ${message}`);
        return NextResponse.json({ error: "Webhook handler failed." }, { status: 500 });
    }
}
