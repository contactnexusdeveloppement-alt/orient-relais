import { FeteMeresBannerClient } from "./FeteMeresBannerClient";

/**
 * Bannière promo Fête des Mères 2026.
 *
 * Auto-affichée du 25 mai 2026 00:00 au 31 mai 2026 23:59 (timezone
 * Europe/Paris, bornes inclusives). Return null en dehors de cette
 * fenêtre — la bannière disparaît toute seule sans intervention manuelle.
 *
 * Le check de date se fait côté serveur au render. La home utilise une
 * ISR revalidate de 2 min, donc l'apparition/disparition est précise à
 * ~2 min près au moment du basculement de date — acceptable pour une
 * promo qui dure 7 jours pleins.
 *
 * Stratégie timezone : on convertit "now" au format YYYY-MM-DD dans le
 * fuseau Europe/Paris via Intl, puis on compare lexicographiquement aux
 * bornes. Évite toute logique manuelle d'offset DST.
 */

const PROMO_START_PARIS = "2026-05-25"; // YYYY-MM-DD, inclusif
const PROMO_END_PARIS = "2026-05-31"; // YYYY-MM-DD, inclusif

function todayInParis(): string {
    // "en-CA" produit toujours YYYY-MM-DD, format trié lexicographiquement.
    return new Intl.DateTimeFormat("en-CA", {
        timeZone: "Europe/Paris",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(new Date());
}

export function FeteMeresBanner() {
    const today = todayInParis();
    if (today < PROMO_START_PARIS || today > PROMO_END_PARIS) return null;
    return <FeteMeresBannerClient />;
}
