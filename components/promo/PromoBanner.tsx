import { getActiveCampaign } from "./campaigns";
import { PromoBannerClient } from "./PromoBannerClient";

/**
 * Bannière promo site-wide.
 *
 * Composant serveur : sélectionne la campagne active aujourd'hui (date
 * Europe/Paris, priorité la plus haute) et la passe au composant client
 * sous forme de primitives. Renvoie null si aucune campagne active.
 *
 * Le gate de date est donc 100 % serveur — le bundle client ne contient
 * ni la liste des campagnes ni la logique de date.
 *
 * La home utilise une ISR revalidate de 2 min : l'apparition/disparition
 * d'une campagne et les bascules de priorité (ex : la campagne réappro
 * priorité 10 qui prend le dessus sur le cadeau priorité 1 du 18 juin au
 * 18 juillet) sont précises à ~2 min près au basculement de date.
 */
export function PromoBanner() {
    const campaign = getActiveCampaign();
    if (!campaign) return null;

    return (
        <PromoBannerClient
            // key = id : un changement de campagne remonte le composant et
            // réinitialise l'état "dismissed" (sinon une bannière fermée
            // resterait masquée quand une nouvelle campagne démarre).
            key={campaign.id}
            emoji={campaign.emoji}
            title={campaign.title}
            body={campaign.body}
            variant={campaign.variant}
        />
    );
}
