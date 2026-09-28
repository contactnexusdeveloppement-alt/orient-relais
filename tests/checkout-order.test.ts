import { describe, expect, it, vi } from "vitest";

// Le client WooCommerce exige des clés API à son instanciation ; ces tests ne
// couvrent que la logique pure (aucun appel réseau), on le remplace donc.
vi.mock("@/lib/wc-client", () => ({ wooClientWithQSAuth: {} }));

import {
    CheckoutError,
    buildPaymentMetadata,
    decodeItemsMeta,
    encodeItemsMeta,
} from "@/lib/checkout-order";

const customer = {
    email: "client@example.com",
    firstName: "Marie",
    lastName: "Curie",
    phone: "0600000000",
    address: "1 rue de la Paix",
    zip: "78310",
    city: "Maurepas",
};

describe("encodeItemsMeta / decodeItemsMeta", () => {
    it("fait l'aller-retour sans perte", () => {
        const lines = [{ id: 3325, quantity: 1 }, { id: 3326, quantity: 3 }];
        expect(decodeItemsMeta({ items: encodeItemsMeta(lines) })).toEqual(lines);
    });

    it("lit l'ancien format items_json des paiements créés avant le correctif", () => {
        expect(decodeItemsMeta({ items_json: '[{"id":3325,"q":2}]' })).toEqual([{ id: 3325, quantity: 2 }]);
    });

    it("ignore les lignes invalides et le JSON corrompu", () => {
        expect(decodeItemsMeta({ items: "3325:0,-4:1,abc:2,3326:1" })).toEqual([{ id: 3326, quantity: 1 }]);
        expect(decodeItemsMeta({ items_json: "{pas du json" })).toEqual([]);
        expect(decodeItemsMeta({})).toEqual([]);
    });
});

describe("buildPaymentMetadata", () => {
    const relay = { id: "FR-12345", name: "Tabac du centre", address: "2 place", postcode: "78310", city: "Maurepas" };

    it("stocke le point relais uniquement pour Mondial Relay", () => {
        const mr = buildPaymentMetadata({ lines: [{ id: 1, quantity: 1 }], shippingMethod: "mondialrelay", shippingCents: 490, customer, relay });
        const cc = buildPaymentMetadata({ lines: [{ id: 1, quantity: 1 }], shippingMethod: "clickcollect", shippingCents: 0, customer, relay });
        expect(mr.relay_id).toBe("FR-12345");
        expect(mr.shipping_method).toBe("mondialrelay");
        expect(cc.relay_id).toBe("");
        expect(cc.shipping_cost).toBe("0");
    });

    it("sépare prénom et nom (plus de découpage approximatif)", () => {
        const meta = buildPaymentMetadata({ lines: [{ id: 1, quantity: 1 }], shippingMethod: "colissimo", shippingCents: 790, customer });
        expect(meta.customer_first_name).toBe("Marie");
        expect(meta.customer_last_name).toBe("Curie");
        expect(meta.customer_id).toBe("");
    });

    it("tronque les valeurs à la limite Stripe de 500 caractères", () => {
        const meta = buildPaymentMetadata({
            lines: [{ id: 1, quantity: 1 }],
            shippingMethod: "colissimo",
            shippingCents: 790,
            customer: { ...customer, address: "x".repeat(900) },
        });
        expect(String(meta.shipping_address).length).toBe(500);
    });

    it("refuse un panier trop long pour les métadonnées Stripe", () => {
        const lines = Array.from({ length: 80 }, (_, i) => ({ id: 100000 + i, quantity: 1 }));
        expect(() => buildPaymentMetadata({ lines, shippingMethod: "colissimo", shippingCents: 0, customer })).toThrow(CheckoutError);
    });
});
