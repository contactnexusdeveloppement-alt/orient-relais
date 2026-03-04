import Stripe from "stripe";

// Lazy-initialized Stripe instance (avoids crash at build time when env var is missing)
let _stripe: Stripe | null = null;

function getStripe(): Stripe {
    if (!_stripe) {
        const key = process.env.STRIPE_SECRET_KEY;
        if (!key) {
            throw new Error("STRIPE_SECRET_KEY is not set in environment variables");
        }
        _stripe = new Stripe(key);
    }
    return _stripe;
}

// Proxy that lazily initializes Stripe on first access
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const stripe = new Proxy({} as Stripe, {
    get(_target, prop) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (getStripe() as any)[prop];
    },
});
