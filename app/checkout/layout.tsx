import type { Metadata } from "next";

export const metadata: Metadata = {
    robots: {
        index: false,
        follow: false,
        nocache: true,
    },
    title: "Commande | Orient Relais",
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
    return children;
}
