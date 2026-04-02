import type { Metadata } from "next";

export const metadata: Metadata = {
    robots: {
        index: false,
        follow: false,
        nocache: true,
    },
    title: "Mot de passe oublie | Orient Relais",
};

export default function MotDePasseOublieLayout({ children }: { children: React.ReactNode }) {
    return children;
}
