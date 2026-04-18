import type { Metadata } from "next";

export const metadata: Metadata = {
    robots: {
        index: false,
        follow: false,
        nocache: true,
    },
    title: "Recherche",
};

export default function RechercheLayout({ children }: { children: React.ReactNode }) {
    return children;
}
