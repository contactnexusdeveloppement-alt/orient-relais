import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact | Orient Relais",
    description: "Contactez Orient Relais pour toute question sur nos produits naturels et bio. Email, telephone ou formulaire de contact. Reponse sous 24h ouvrees.",
    openGraph: {
        title: "Contactez-nous | Orient Relais",
        description: "Une question ? Notre equipe vous repond sous 24h ouvrees.",
    },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return children;
}
