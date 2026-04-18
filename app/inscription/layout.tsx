import type { Metadata } from "next";

export const metadata: Metadata = {
    robots: {
        index: false,
        follow: false,
        nocache: true,
    },
    title: "Inscription",
};

export default function InscriptionLayout({ children }: { children: React.ReactNode }) {
    return children;
}
