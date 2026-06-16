"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface PromoBannerClientProps {
    emoji: string;
    title: string;
    body: string;
    variant: "soft" | "strong";
}

/**
 * UI de la bannière promo + dismiss.
 *
 * Dismiss : useState local, perdu au rechargement de la page. Pas de
 * localStorage — choix produit : maintenir la pression sur la durée de la
 * campagne, l'utilisateur revoit la bannière à chaque session.
 *
 * Aucune image : visuel = emoji + couleurs → 0 CLS, pas d'impact LCP.
 *
 * variant "strong" = mode "le site est en pause" (réappro) : fond ambré
 * plus marqué, bordure plus épaisse, padding et texte plus grands que le
 * "soft" pour signaler clairement la situation tout en restant dans la
 * charte (amber / stone / primary), sans rouge anxiogène.
 */
export function PromoBannerClient({ emoji, title, body, variant }: PromoBannerClientProps) {
    const [dismissed, setDismissed] = useState(false);
    if (dismissed) return null;

    const isStrong = variant === "strong";

    const wrapperClass = isStrong
        ? "relative bg-gradient-to-r from-amber-100 via-amber-200/70 to-amber-100 border-b-2 border-primary/40 py-4 md:py-5 px-4 shadow-sm"
        : "relative bg-gradient-to-r from-amber-50 via-amber-100/40 to-amber-50 border-b border-primary/20 py-3 px-4";

    const titleClass = isStrong
        ? "font-serif font-bold text-stone-900 text-lg md:text-xl"
        : "font-serif font-bold text-stone-900 text-base md:text-lg";

    const bodyClass = isStrong
        ? "text-stone-800 text-sm md:text-base"
        : "text-stone-700 text-sm md:text-base";

    return (
        <section
            aria-label={`Promotion ${title}`}
            className={wrapperClass}
        >
            <div className="container mx-auto flex items-center justify-center text-center pr-10">
                <p className="leading-snug">
                    <span className={titleClass}>
                        {emoji} {title}
                    </span>
                    <span className="mx-2 text-stone-400">—</span>
                    <span className={bodyClass}>{body}</span>
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
