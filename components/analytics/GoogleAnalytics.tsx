"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const GA_ID = "G-TKE6MX2P5G";

/**
 * Nom de l'événement émis par CookieConsent quand le visiteur clique
 * « Accepter » — permet de charger GA4 à chaud, sans rechargement de page.
 */
export const CONSENT_GRANTED_EVENT = "or-consent-granted";

/**
 * Chargement de Google Analytics 4 conditionné au consentement (mode
 * « basic » — le plus strict au sens CNIL).
 *
 * Tant que le visiteur n'a pas cliqué « Accepter » sur la bannière cookies :
 *   - gtag.js n'est PAS chargé (aucune requête vers googletagmanager.com)
 *   - aucun cookie _ga n'est déposé, aucun ping envoyé
 *
 * Historique : la bannière stockait le choix dans localStorage mais gtag.js
 * était chargé inconditionnellement depuis le layout — « Refuser » ne
 * refusait rien. Ce composant referme ce trou : le layout ne référence plus
 * GA, seul ce composant le charge, et uniquement après consentement.
 *
 * Les helpers lib/analytics.ts sont déjà no-op quand window.gtag est absent,
 * donc les événements e-commerce (add_to_cart, purchase…) se coupent
 * proprement en cas de refus.
 */
export function GoogleAnalytics() {
    const [consented, setConsented] = useState(false);

    useEffect(() => {
        // Visiteur revenant qui avait déjà accepté
        try {
            if (localStorage.getItem("cookieConsent") === "true") {
                setConsented(true);
                return;
            }
        } catch {
            // localStorage indisponible (navigation privée stricte) → pas de GA
        }

        // Acceptation pendant la session courante (émis par CookieConsent)
        const onGrant = () => setConsented(true);
        window.addEventListener(CONSENT_GRANTED_EVENT, onGrant);
        return () => window.removeEventListener(CONSENT_GRANTED_EVENT, onGrant);
    }, []);

    if (!consented) return null;

    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
                strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
                {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  analytics_storage: 'granted',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied'
});
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
            </Script>
        </>
    );
}
