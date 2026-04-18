import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "FAQ — livraison, paiement, retours & produits bio",
    description: "Toutes les réponses aux questions fréquentes sur Orient Relais : livraison Colissimo/Mondial Relay, click & collect à Maurepas, paiement Stripe, retours et conseils produits bio.",
    alternates: { canonical: "/faq" },
    openGraph: {
        title: "FAQ Orient Relais — livraison, paiement, retours",
        description: "Livraison, paiement, retours, conseils produits… toutes les réponses à vos questions.",
        url: "https://www.orient-relais.com/faq",
        type: "website",
    },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
    return children;
}
