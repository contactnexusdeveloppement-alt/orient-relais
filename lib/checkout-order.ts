import type Stripe from "stripe";
import { wooClientWithQSAuth } from "@/lib/wc-client";
import {
    SHIPPING_LABELS,
    WOO_SHIPPING_METHOD_IDS,
    isShippingMethod,
    toCents,
    type ShippingMethod,
} from "@/lib/shipping";

/**
 * Tunnel de commande — la source de vérité est le PaymentIntent Stripe.
 *
 * Au moment de créer le paiement, le serveur relit les prix dans WooCommerce,
 * calcule le port, et écrit TOUT le nécessaire (articles, livraison, point
 * relais, client) dans les métadonnées du PaymentIntent. Ensuite, la commande
 * WooCommerce est construite uniquement à partir de ce PaymentIntent
 * (récupéré chez Stripe ou reçu par webhook signé) : le navigateur ne peut
 * injecter ni prix, ni articles, ni faux paiement.
 */

const woo = wooClientWithQSAuth;

/** Stripe limite chaque valeur de métadonnée à 500 caractères. */
const META_MAX = 500;

export type CartLine = { id: number; quantity: number };

export type RelayPoint = {
    id: string;
    name: string;
    address: string;
    postcode: string;
    city: string;
};

export type CustomerInfo = {
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
    address: string;
    zip: string;
    city: string;
};

// ─── Articles : "3325:1,3326:2" (compact pour tenir dans 500 caractères) ────

export function encodeItemsMeta(lines: CartLine[]): string {
    return lines.map((l) => `${l.id}:${l.quantity}`).join(",");
}

export function decodeItemsMeta(meta: Stripe.Metadata): CartLine[] {
    if (meta.items) {
        return meta.items
            .split(",")
            .map((pair) => {
                const [id, q] = pair.split(":").map((n) => parseInt(n, 10));
                return { id, quantity: q };
            })
            .filter((l) => Number.isInteger(l.id) && l.id > 0 && Number.isInteger(l.quantity) && l.quantity > 0);
    }
    // Ancien format (paiements créés avant ce correctif) : [{"id":3325,"q":1}]
    if (meta.items_json) {
        try {
            const parsed = JSON.parse(meta.items_json) as { id: number | string; q: number }[];
            return parsed
                .map((i) => ({ id: Number(i.id), quantity: Number(i.q) }))
                .filter((l) => Number.isInteger(l.id) && l.id > 0 && Number.isInteger(l.quantity) && l.quantity > 0);
        } catch {
            return [];
        }
    }
    return [];
}

function clip(value: string | undefined | null): string {
    return (value ?? "").slice(0, META_MAX);
}

export function buildPaymentMetadata(input: {
    lines: CartLine[];
    shippingMethod: ShippingMethod;
    shippingCents: number;
    customer: CustomerInfo;
    relay?: RelayPoint | null;
    customerId?: number | null;
}): Stripe.MetadataParam {
    const items = encodeItemsMeta(input.lines);
    if (items.length > META_MAX) {
        throw new CheckoutError("Votre panier contient trop d'articles différents pour un paiement en ligne. Contactez-nous.", 400);
    }
    const relay = input.shippingMethod === "mondialrelay" ? input.relay : null;
    return {
        items,
        shipping_method: input.shippingMethod,
        shipping_cost: String(input.shippingCents),
        customer_email: clip(input.customer.email),
        customer_first_name: clip(input.customer.firstName),
        customer_last_name: clip(input.customer.lastName),
        customer_phone: clip(input.customer.phone),
        shipping_address: clip(input.customer.address),
        shipping_city: clip(input.customer.city),
        shipping_zip: clip(input.customer.zip),
        relay_id: clip(relay?.id),
        relay_name: clip(relay?.name),
        relay_address: clip(relay?.address),
        relay_city: clip(relay?.city),
        relay_zip: clip(relay?.postcode),
        customer_id: input.customerId ? String(input.customerId) : "",
    };
}

// ─── Prix serveur ────────────────────────────────────────────────────────────

export class CheckoutError extends Error {
    constructor(message: string, public status: number) {
        super(message);
    }
}

/**
 * Relit dans WooCommerce le prix actuel de chaque article (un seul appel).
 * Lève une CheckoutError si un article n'est plus en vente.
 */
export async function priceCartServerSide(lines: CartLine[]): Promise<{ subtotalCents: number }> {
    const ids = [...new Set(lines.map((l) => l.id))];
    const { data } = await woo.get("products", {
        include: ids.join(","),
        per_page: 100,
        status: "publish",
    });
    const byId = new Map<number, { priceCents: number; purchasable: boolean }>();
    for (const p of (data ?? []) as { id: number; price: string; purchasable: boolean }[]) {
        byId.set(p.id, { priceCents: toCents(p.price), purchasable: p.purchasable });
    }

    let subtotalCents = 0;
    for (const line of lines) {
        const product = byId.get(line.id);
        if (!product || !product.purchasable || !Number.isFinite(product.priceCents) || product.priceCents <= 0) {
            throw new CheckoutError("Un article de votre panier n'est plus disponible. Retirez-le puis réessayez.", 409);
        }
        subtotalCents += product.priceCents * line.quantity;
    }
    return { subtotalCents };
}

// ─── Commande WooCommerce ────────────────────────────────────────────────────

type WooOrder = { id: number; number: string; total: string; status: string; transaction_id: string };

/**
 * Cherche une commande déjà créée pour ce paiement. Le filtre
 * `transaction_id` n'existe pas dans l'API WooCommerce (il est ignoré et
 * renvoie la dernière commande !) : on passe par `search`, puis on vérifie
 * l'égalité exacte côté code.
 */
export async function findOrderByPaymentIntent(paymentIntentId: string): Promise<WooOrder | null> {
    const { data } = await woo.get("orders", { search: paymentIntentId, per_page: 10 });
    const match = ((data ?? []) as WooOrder[]).find((o) => o.transaction_id === paymentIntentId);
    return match ?? null;
}

function splitLegacyName(full: string | undefined): [string, string] {
    const parts = (full ?? "").trim().split(/\s+/);
    return [parts[0] ?? "", parts.slice(1).join(" ")];
}

/**
 * Crée la commande WooCommerce à partir d'un PaymentIntent RÉUSSI.
 * Idempotent : si la commande existe déjà, elle est renvoyée telle quelle.
 * L'appelant doit avoir vérifié que le PaymentIntent vient bien de Stripe
 * (retrieve côté serveur, ou webhook signé) et qu'il est `succeeded`.
 */
export async function createOrderFromPaymentIntent(
    pi: Stripe.PaymentIntent,
    source: "front" | "webhook",
): Promise<{ order: WooOrder; created: boolean }> {
    const existing = await findOrderByPaymentIntent(pi.id);
    if (existing) return { order: existing, created: false };

    const meta = pi.metadata ?? {};
    const lines = decodeItemsMeta(meta);
    if (lines.length === 0) {
        throw new Error(`PaymentIntent ${pi.id} sans articles exploitables dans ses métadonnées`);
    }

    const method: ShippingMethod = isShippingMethod(meta.shipping_method) ? meta.shipping_method : "colissimo";
    const shippingCents = parseInt(meta.shipping_cost ?? "", 10);

    const [legacyFirst, legacyLast] = splitLegacyName(meta.customer_name);
    const firstName = meta.customer_first_name || legacyFirst;
    const lastName = meta.customer_last_name || legacyLast;

    const shippingAddress =
        method === "clickcollect"
            ? { address_1: "Click & Collect — 48 avenue de Touraine", city: "Maurepas", postcode: "78310" }
            : method === "mondialrelay" && meta.relay_id
                ? { address_1: `${meta.relay_name} — ${meta.relay_address}`, city: meta.relay_city ?? "", postcode: meta.relay_zip ?? "" }
                : { address_1: meta.shipping_address ?? "", city: meta.shipping_city ?? "", postcode: meta.shipping_zip ?? "" };

    const customerId = parseInt(meta.customer_id ?? "", 10);

    const orderData: Record<string, unknown> = {
        payment_method: "stripe",
        payment_method_title: "Carte bancaire (Stripe)",
        set_paid: true,
        status: "processing",
        billing: {
            first_name: firstName,
            last_name: lastName,
            email: meta.customer_email ?? "",
            phone: meta.customer_phone ?? "",
            address_1: meta.shipping_address ?? "",
            city: meta.shipping_city ?? "",
            postcode: meta.shipping_zip ?? "",
            country: "FR",
        },
        shipping: { first_name: firstName, last_name: lastName, country: "FR", ...shippingAddress },
        line_items: lines.map((l) => ({ product_id: l.id, quantity: l.quantity })),
        shipping_lines: [
            {
                method_id: WOO_SHIPPING_METHOD_IDS[method],
                method_title: SHIPPING_LABELS[method],
                total: Number.isFinite(shippingCents) ? (shippingCents / 100).toFixed(2) : "0.00",
            },
        ],
        transaction_id: pi.id,
        meta_data: [
            { key: "_stripe_payment_intent", value: pi.id },
            { key: "_orient_order_source", value: source },
            ...(method === "mondialrelay" && meta.relay_id
                ? [
                    { key: "_mondial_relay_id", value: meta.relay_id },
                    { key: "_mondial_relay_name", value: meta.relay_name ?? "" },
                ]
                : []),
        ],
        ...(Number.isInteger(customerId) && customerId > 0 ? { customer_id: customerId } : {}),
    };

    const { data: order } = (await woo.post("orders", orderData)) as { data: WooOrder };

    // Garde-fou : WooCommerce recalcule le total avec les prix du moment.
    // S'il diffère de ce que Stripe a réellement encaissé (prix modifié
    // pendant le paiement, ou ancien paiement calculé côté navigateur),
    // on bloque l'expédition en "en attente" avec une note explicite.
    const paidCents = pi.amount_received || pi.amount;
    if (Math.abs(toCents(order.total) - paidCents) > 1) {
        await woo.put(`orders/${order.id}`, { status: "on-hold" });
        await woo.post(`orders/${order.id}/notes`, {
            note: `⚠️ Montant encaissé par Stripe : ${(paidCents / 100).toFixed(2)} € — total de la commande : ${order.total} €. Vérifier avant expédition.`,
            customer_note: false,
        });
        order.status = "on-hold";
    }

    return { order, created: true };
}
