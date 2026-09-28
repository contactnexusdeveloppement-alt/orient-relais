/**
 * Règles de livraison — source unique partagée par le checkout (affichage)
 * et par l'API de paiement (montant réellement débité). Montants en centimes
 * pour éviter les erreurs d'arrondi sur les flottants.
 */

export const SHIPPING_METHODS = ["colissimo", "mondialrelay", "clickcollect"] as const;
export type ShippingMethod = (typeof SHIPPING_METHODS)[number];

/** Livraison offerte à partir de ce sous-total (Colissimo et Mondial Relay). */
export const FREE_SHIPPING_THRESHOLD_CENTS = 3900;

/** Tarifs contrat transporteurs (juillet 2026). */
const BASE_RATES_CENTS: Record<ShippingMethod, number> = {
    colissimo: 790,
    mondialrelay: 490,
    clickcollect: 0,
};

export const SHIPPING_LABELS: Record<ShippingMethod, string> = {
    colissimo: "Colissimo Domicile",
    mondialrelay: "Mondial Relay",
    clickcollect: "Click & Collect — Retrait en boutique",
};

/** Identifiants de méthode attendus par WooCommerce dans shipping_lines. */
export const WOO_SHIPPING_METHOD_IDS: Record<ShippingMethod, string> = {
    colissimo: "colissimo",
    mondialrelay: "mondial_relay",
    clickcollect: "local_pickup",
};

export function isShippingMethod(value: unknown): value is ShippingMethod {
    return typeof value === "string" && (SHIPPING_METHODS as readonly string[]).includes(value);
}

export function computeShippingCents(method: ShippingMethod, subtotalCents: number): number {
    if (method === "clickcollect") return 0;
    if (subtotalCents >= FREE_SHIPPING_THRESHOLD_CENTS) return 0;
    return BASE_RATES_CENTS[method];
}

/** Convertit un prix en euros (number ou string WooCommerce) en centimes. */
export function toCents(euros: number | string): number {
    const value = typeof euros === "string" ? parseFloat(euros) : euros;
    return Number.isFinite(value) ? Math.round(value * 100) : NaN;
}
