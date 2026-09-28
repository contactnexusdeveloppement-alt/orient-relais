import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { stripe } from "@/lib/stripe-server";
import { getCustomerIdFromRequest } from "@/lib/auth";
import { checkRateLimitAsync, getClientIp } from "@/lib/rate-limit";
import { SHIPPING_METHODS, computeShippingCents } from "@/lib/shipping";
import { CheckoutError, buildPaymentMetadata, priceCartServerSide } from "@/lib/checkout-order";

const bodySchema = z
    .object({
        items: z
            .array(
                z.object({
                    id: z.coerce.number().int().positive(),
                    quantity: z.coerce.number().int().min(1).max(99),
                }),
            )
            .min(1, "Le panier est vide.")
            .max(50),
        shippingMethod: z.enum(SHIPPING_METHODS),
        selectedRelay: z
            .object({
                id: z.string().min(1),
                name: z.string(),
                address: z.string(),
                postcode: z.string(),
                city: z.string(),
            })
            .nullish(),
        customerInfo: z.object({
            email: z.string().trim().email("Adresse email invalide.").max(254),
            firstName: z.string().trim().min(1).max(80),
            lastName: z.string().trim().min(1).max(80),
            phone: z.string().trim().max(30).optional(),
            address: z.string().trim().min(1).max(200),
            zip: z.string().trim().min(1).max(12),
            city: z.string().trim().min(1).max(100),
        }),
    })
    .refine((b) => b.shippingMethod !== "mondialrelay" || !!b.selectedRelay, {
        message: "Choisissez un point relais.",
    });

export async function POST(request: NextRequest) {
    // Le checkout est ouvert sans compte : on limite la création de paiements
    // par IP pour freiner les robots qui testent des cartes volées.
    const rl = await checkRateLimitAsync(`pi:${getClientIp(request)}`, 10, 15 * 60 * 1000);
    if (!rl.allowed) {
        return NextResponse.json(
            { error: "Trop de tentatives. Réessayez dans quelques minutes." },
            { status: 429, headers: { "Retry-After": String(rl.retryAfterSec) } },
        );
    }

    try {
        const parsed = bodySchema.safeParse(await request.json());
        if (!parsed.success) {
            const message = parsed.error.issues[0]?.message ?? "Données de commande invalides.";
            return NextResponse.json({ error: message }, { status: 400 });
        }
        const { items, shippingMethod, selectedRelay, customerInfo } = parsed.data;

        // Montant calculé côté serveur avec les prix WooCommerce du moment —
        // jamais avec les prix envoyés par le navigateur.
        const { subtotalCents } = await priceCartServerSide(items);
        const shippingCents = computeShippingCents(shippingMethod, subtotalCents);
        const amount = subtotalCents + shippingCents;

        if (amount < 50) {
            return NextResponse.json({ error: "Le montant minimum est de 0,50 €." }, { status: 400 });
        }

        const customerId = await getCustomerIdFromRequest(request);

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "eur",
            automatic_payment_methods: { enabled: true },
            metadata: buildPaymentMetadata({
                lines: items,
                shippingMethod,
                shippingCents,
                customer: customerInfo,
                relay: selectedRelay ?? null,
                customerId,
            }),
            receipt_email: customerInfo.email,
            description: `Commande Orient Relais — ${items.length} article(s)`,
        });

        return NextResponse.json({
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id,
            // Montant réellement débité, affiché sur le bouton "Payer".
            amount,
        });
    } catch (error: unknown) {
        if (error instanceof CheckoutError) {
            return NextResponse.json({ error: error.message }, { status: error.status });
        }
        console.error("[create-payment-intent]", error);
        return NextResponse.json(
            { error: "Impossible de préparer le paiement. Réessayez dans un instant." },
            { status: 500 },
        );
    }
}
