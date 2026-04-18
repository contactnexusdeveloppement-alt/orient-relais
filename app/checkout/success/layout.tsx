import type { Metadata } from "next";

export const metadata: Metadata = {
    robots: {
        index: false,
        follow: false,
        nocache: true,
    },
    title: "Commande confirmée",
};

export default function CheckoutSuccessLayout({ children }: { children: React.ReactNode }) {
    return children;
}
