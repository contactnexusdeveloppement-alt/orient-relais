import type { Metadata } from "next";
import { ReapproNotice } from "@/components/promo/ReapproNotice";

export const metadata: Metadata = {
    robots: {
        index: false,
        follow: false,
        nocache: true,
    },
    title: "Commande",
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
    // ReapproNotice : gate de date côté serveur, rendu en haut du tunnel de
    // commande. Le checkout étant une page unique à étapes, ce notice est
    // visible sur toutes les étapes (dont la sélection Mondial Relay). Renvoie
    // null hors fenêtre réappro → aucun espace résiduel le reste de l'année.
    return (
        <>
            <ReapproNotice className="container mx-auto mt-6 px-4" />
            {children}
        </>
    );
}
