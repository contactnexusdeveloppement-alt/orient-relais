import { Package } from "lucide-react";
import { getActiveReapproCampaign } from "./campaigns";

/**
 * Avertissement de réapprovisionnement affiché au panier et au checkout
 * (toutes étapes, dont Mondial Relay) pendant la fenêtre réappro
 * (18 juin → 18 juillet 2026, voir campaigns.ts).
 *
 * Composant SERVEUR : le gate de date tourne côté serveur, rien n'est
 * ajouté au bundle client. Les surfaces client (CartDrawer, checkout)
 * reçoivent le résultat déjà rendu via le pattern slot (props ReactNode)
 * ou via un layout serveur.
 *
 * Style : alerte douce ambrée (pas de rouge anxiogène). Le message est
 * volontairement court et rassurant — les commandes restent ouvertes.
 */
export function ReapproNotice({ className = "" }: { className?: string }) {
    const campaign = getActiveReapproCampaign();
    if (!campaign) return null;

    return (
        <div
            role="status"
            className={`flex items-start gap-3 rounded-xl border border-amber-300/70 bg-amber-50 px-4 py-3 text-sm text-amber-900 ${className}`}
        >
            <Package className="h-5 w-5 flex-shrink-0 text-amber-600 mt-0.5" aria-hidden="true" />
            <p className="leading-relaxed">
                <strong>Période de réapprovisionnement&nbsp;:</strong> votre commande
                sera expédiée à partir du 20 juillet 2026.
            </p>
        </div>
    );
}
