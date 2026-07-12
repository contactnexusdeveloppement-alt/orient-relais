// Lightweight GA4 Enhanced Ecommerce helper.
// Only fires when window.gtag is available — gtag.js is loaded exclusively
// by components/analytics/GoogleAnalytics.tsx, and only after the visitor
// accepts the cookie banner (CNIL requirement). Every helper is therefore a
// silent no-op on the server AND for visitors who declined analytics.

type GtagItem = {
    item_id: string;
    item_name: string;
    item_brand?: string;
    item_category?: string;
    price?: number;
    quantity?: number;
    currency?: string;
};

function gtag(...args: unknown[]) {
    if (typeof window === "undefined") return;
    const g = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag;
    if (typeof g === "function") g(...args);
}

const EUR = "EUR";

export function trackViewItem(item: GtagItem) {
    gtag("event", "view_item", {
        currency: EUR,
        value: (item.price ?? 0) * (item.quantity ?? 1),
        items: [{ ...item, currency: EUR, quantity: item.quantity ?? 1 }],
    });
}

export function trackAddToCart(item: GtagItem) {
    gtag("event", "add_to_cart", {
        currency: EUR,
        value: (item.price ?? 0) * (item.quantity ?? 1),
        items: [{ ...item, currency: EUR, quantity: item.quantity ?? 1 }],
    });
}

export function trackRemoveFromCart(item: GtagItem) {
    gtag("event", "remove_from_cart", {
        currency: EUR,
        value: (item.price ?? 0) * (item.quantity ?? 1),
        items: [{ ...item, currency: EUR, quantity: item.quantity ?? 1 }],
    });
}

export function trackBeginCheckout(items: GtagItem[], total: number) {
    gtag("event", "begin_checkout", {
        currency: EUR,
        value: total,
        items: items.map((i) => ({ ...i, currency: EUR, quantity: i.quantity ?? 1 })),
    });
}

export function trackPurchase(opts: {
    transactionId: string;
    total: number;
    tax?: number;
    shipping?: number;
    items: GtagItem[];
}) {
    gtag("event", "purchase", {
        transaction_id: opts.transactionId,
        currency: EUR,
        value: opts.total,
        tax: opts.tax ?? 0,
        shipping: opts.shipping ?? 0,
        items: opts.items.map((i) => ({ ...i, currency: EUR, quantity: i.quantity ?? 1 })),
    });
}
