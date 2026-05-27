"use client";

import { useState } from "react";
import { X } from "lucide-react";

/**
 * Bannière client (uniquement le UI + dismiss).
 *
 * Dismiss state : useState local, perdu au rechargement de la page.
 * Pas de localStorage — décision produit explicite : la promo dure
 * 7 jours, il est OK de re-voir la bannière à chaque session pour
 * maintenir la pression marketing.
 *
 * Aucun bundle d'image : visuel = emoji + couleurs. CLS = 0, LCP intact.
 */
export function FeteMeresBannerClient() {
    const [dismissed, setDismissed] = useState(false);
    if (dismissed) return null;

    return (
        <section
            aria-label="Promotion Fête des Mères"
            className="relative bg-gradient-to-r from-amber-50 via-amber-100/40 to-amber-50 border-b border-primary/20 py-3 px-4"
        >
            <div className="container mx-auto flex items-center justify-center text-center pr-10">
                <p className="text-sm md:text-base text-stone-700 leading-snug">
                    <span className="font-serif font-bold text-stone-900 text-base md:text-lg">
                        🎁 Fête des Mères
                    </span>
                    <span className="mx-2 text-stone-400">—</span>
                    <span>
                        un <strong className="text-primary">cadeau surprise offert</strong> pour toute commande passée jusqu&apos;au 31 mai.
                    </span>
                    <span className="block md:inline md:ml-2 text-stone-500 italic text-sm">
                        Pour elle, pour les mariés, pour toute la famille.
                    </span>
                </p>
            </div>
            <button
                type="button"
                onClick={() => setDismissed(true)}
                aria-label="Fermer la bannière promotionnelle"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-stone-500 hover:text-primary hover:bg-white/60 transition-colors"
            >
                <X className="h-4 w-4" aria-hidden="true" />
            </button>
        </section>
    );
}
