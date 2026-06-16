/**
 * Système de campagnes promo — source unique de vérité.
 *
 * Toutes les dates sont au format YYYY-MM-DD dans le fuseau Europe/Paris,
 * bornes INCLUSIVES. La comparaison se fait lexicographiquement sur ce
 * format trié (pas d'arithmétique de Date, donc pas de piège DST).
 *
 * Ce module est volontairement SANS "use client" et ne doit être importé
 * que par des composants serveur (PromoBanner, ReapproNotice). Les
 * composants client reçoivent des primitives en props, jamais ce module —
 * la logique de date reste donc hors du bundle client.
 */

export type Campaign = {
    id: string;
    startDate: string; // YYYY-MM-DD Paris, inclusif
    endDate: string; // YYYY-MM-DD Paris, inclusif ("9999-12-31" = permanent)
    priority: number; // plus haut = gagne si plusieurs actives
    emoji: string;
    title: string;
    body: string;
    variant: "soft" | "strong"; // strong = bg plus marqué, texte plus gros
};

export const CAMPAIGNS: Campaign[] = [
    {
        id: "cadeau-5-39",
        startDate: "2026-05-28",
        endDate: "9999-12-31",
        priority: 1,
        emoji: "🎁",
        title: "Cadeau surprise offert",
        body: "Un cadeau de 5 € pour toute commande à partir de 39 € d'achat.",
        variant: "soft",
    },
    {
        id: "reappro-2026",
        startDate: "2026-06-18",
        endDate: "2026-07-18",
        priority: 10,
        emoji: "🏖️",
        title: "Réapprovisionnement en cours",
        body: "Du 18 juin au 18 juillet. Les commandes restent ouvertes, livraison à partir du 20 juillet 2026.",
        variant: "strong",
    },
];

/** ID de la campagne de réapprovisionnement — utilisé par ReapproNotice. */
export const REAPPRO_CAMPAIGN_ID = "reappro-2026";

/** Date du jour au format YYYY-MM-DD dans le fuseau Europe/Paris. */
export function todayInParis(): string {
    // "en-CA" produit toujours YYYY-MM-DD, donc triable lexicographiquement.
    return new Intl.DateTimeFormat("en-CA", {
        timeZone: "Europe/Paris",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(new Date());
}

/** Une campagne est-elle active à la date donnée (bornes inclusives) ? */
export function isActiveOn(campaign: Campaign, today: string): boolean {
    return today >= campaign.startDate && today <= campaign.endDate;
}

/**
 * Sélectionne la campagne active aujourd'hui ayant la priorité la plus
 * haute. Renvoie null si aucune n'est active.
 */
export function getActiveCampaign(today: string = todayInParis()): Campaign | null {
    const active = CAMPAIGNS.filter((c) => isActiveOn(c, today));
    if (active.length === 0) return null;
    return active.reduce((best, c) => (c.priority > best.priority ? c : best));
}

/**
 * Renvoie la campagne de réapprovisionnement si elle est active aujourd'hui,
 * sinon null. Utilisé par l'avertissement panier / checkout pour garder la
 * fenêtre de dates au même endroit que le reste des campagnes.
 */
export function getActiveReapproCampaign(today: string = todayInParis()): Campaign | null {
    const c = CAMPAIGNS.find((x) => x.id === REAPPRO_CAMPAIGN_ID);
    if (!c) return null;
    return isActiveOn(c, today) ? c : null;
}
