import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact — une question ? On vous répond sous 24h",
    description: "Contactez Orient Relais par téléphone (+33 6 99 55 69 77), email (contact@orient-relais.com) ou formulaire. Boutique 48 avenue de Touraine, 78310 Maurepas.",
    alternates: { canonical: "/contact" },
    openGraph: {
        title: "Contactez Orient Relais — boutique bio à Maurepas",
        description: "Téléphone, email et formulaire. Notre équipe répond sous 24 h ouvrées.",
        url: "https://www.orient-relais.com/contact",
        type: "website",
    },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return children;
}
