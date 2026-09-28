import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { stripe } from "@/lib/stripe-server";
import { checkRateLimitAsync, getClientIp } from "@/lib/rate-limit";
import { createOrderFromPaymentIntent } from "@/lib/checkout-order";

const bodySchema = z.object({
    paymentIntentId: z.string().regex(/^pi_[A-Za-z0-9]+$/),
});

/**
 * Appelé par le checkout juste après un paiement réussi, pour créer la
 * commande immédiatement et afficher son numéro au client.
 *
 * Le navigateur n'envoie QUE l'identifiant du paiement : tout le contenu de
 * la commande vient du PaymentIntent relu chez Stripe. Un identifiant inventé
 * ou un paiement non abouti est refusé.
 *
 * Si cette route échoue, rien n'est perdu : le webhook Stripe
 * (payment_intent.succeeded) crée la commande de son côté.
 */
export async function POST(request: NextRequest) {
    const rl = await checkRateLimitAsync(`order:${getClientIp(request)}`, 20, 15 * 60 * 1000);
    if (!rl.allowed) {
        return NextResponse.json({ error: "Trop de tentatives." }, { status: 429 });
    }

    const parsed = bodySchema.safeParse(await request.json().catch(() => null));
    if (!parsed.success) {
        return NextResponse.json({ error: "Données manquantes." }, { status: 400 });
    }
    const { paymentIntentId } = parsed.data;

    let paymentIntent;
    try {
        paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    } catch (error) {
        console.error(`[orders/create] Stripe retrieve failed for ${paymentIntentId}:`, error);
        return NextResponse.json({ error: "Paiement introuvable." }, { status: 400 });
    }

    if (paymentIntent.status !== "succeeded") {
        return NextResponse.json({ error: "Le paiement n'est pas finalisé." }, { status: 400 });
    }

    try {
        const { order, created } = await createOrderFromPaymentIntent(paymentIntent, "front");
        return NextResponse.json({
            success: true,
            orderId: order.id,
            orderNumber: order.number,
            duplicate: !created,
        });
    } catch (error) {
        console.error(`[orders/create] Order creation failed for ${paymentIntentId}:`, error);
        return NextResponse.json(
            { error: "Erreur lors de la création de la commande." },
            { status: 500 },
        );
    }
}
