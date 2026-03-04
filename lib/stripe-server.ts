import Stripe from "stripe";

// Lazy-initialized Stripe instance (avoids crash at build time when env var is missing)
let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
    if (!_stripe) {
        const key = process.env.STRIPE_SECRET_KEY;
        if (!key) {
            throw new Error("STRIPE_SECRET_KEY is not set in environment variables");
        }
        _stripe = new Stripe(key);
    }
    return _stripe;
}

// Keep backward-compatible named export (getter)
export const stripe = new Proxy({} as Stripe, {
    get(_target, prop) {
        return (getStripe() as Record<string | symbol, unknown>)[prop];
    },
});
