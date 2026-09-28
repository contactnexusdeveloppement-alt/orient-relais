import { describe, expect, it } from "vitest";
import { computeShippingCents, isShippingMethod, toCents } from "@/lib/shipping";

describe("computeShippingCents", () => {
    it("Click & Collect est toujours gratuit", () => {
        expect(computeShippingCents("clickcollect", 690)).toBe(0);
        expect(computeShippingCents("clickcollect", 10000)).toBe(0);
    });

    it("applique les tarifs contrat sous le seuil de 39 €", () => {
        expect(computeShippingCents("colissimo", 690)).toBe(790);
        expect(computeShippingCents("mondialrelay", 690)).toBe(490);
    });

    it("offre la livraison à partir de 39 € pile", () => {
        expect(computeShippingCents("colissimo", 3899)).toBe(790);
        expect(computeShippingCents("colissimo", 3900)).toBe(0);
        expect(computeShippingCents("mondialrelay", 3899)).toBe(490);
        expect(computeShippingCents("mondialrelay", 3900)).toBe(0);
    });
});

describe("toCents", () => {
    it("convertit les prix WooCommerce (string) et les nombres", () => {
        expect(toCents("6.90")).toBe(690);
        expect(toCents(5.5)).toBe(550);
    });

    it("corrige les erreurs d'arrondi flottant", () => {
        expect(toCents(0.1 + 0.2)).toBe(30);
    });

    it("renvoie NaN pour une valeur non numérique", () => {
        expect(toCents("abc")).toBeNaN();
    });
});

describe("isShippingMethod", () => {
    it("n'accepte que les 3 modes connus", () => {
        expect(isShippingMethod("mondialrelay")).toBe(true);
        expect(isShippingMethod("chronopost")).toBe(false);
        expect(isShippingMethod(undefined)).toBe(false);
    });
});
