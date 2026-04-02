import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "FAQ | Questions Frequentes",
    description: "Retrouvez les reponses a toutes vos questions sur les produits Orient Relais, la livraison, le paiement et les retours.",
    openGraph: {
        title: "FAQ | Orient Relais",
        description: "Livraison, paiement, retours... Toutes les reponses a vos questions.",
    },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
    return children;
}
