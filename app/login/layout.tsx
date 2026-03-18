import type { Metadata } from "next";

export const metadata: Metadata = {
    robots: {
        index: false,
        follow: false,
        nocache: true,
    },
    title: "Connexion | Orient Relais",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return children;
}
