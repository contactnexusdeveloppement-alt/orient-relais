import type { Metadata } from "next";

export const metadata: Metadata = {
    robots: {
        index: false,
        follow: false,
        nocache: true,
    },
    title: "Mon Compte | Orient Relais",
};

export default function MonCompteLayout({ children }: { children: React.ReactNode }) {
    return children;
}
