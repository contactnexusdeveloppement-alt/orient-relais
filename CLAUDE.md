# Orient Relais : fiche projet

## Client
- Orient Relais, boutique bio, 48 avenue de Touraine, 78310 Maurepas (Yvelines).
- Interlocuteur : Georges Harb (gérant). On le tutoie.
- Site : https://www.orient-relais.com

## Contrat (devis DEV-2026-003 signé le 13/05/2026, CGV incluses)
- Refonte livrée : 1 490 € HT, facturée 500 € HT après une remise de lancement de
  66,4 %. Art. 5.1 : cette remise est ponctuelle et ne sert **jamais** de tarif de
  référence pour les prestations futures.
- **Forfait Mensuel Essentiel : 25 € HT / 30 € TTC par mois**, prélevé par Stripe le 21.
  Engagement de 12 mois à partir du 21/05/2026 (jusqu'au 20/05/2027).
- Inclus : hébergement Vercel, maintenance technique et corrective, mises à jour de
  sécurité, sauvegardes hebdomadaires, support email sous 24 h ouvrées, et
  **1 seule modification mineure par mois** (texte, image ou ajout d'un produit simple).
- Exclus (art. 4) : nom de domaine (géré par le client), toute évolution
  fonctionnelle ou visuelle significative (devis complémentaire), modules payants tiers.
- La garantie de 30 jours après livraison (art. 7) a expiré. Corriger un bug de notre
  code relève de la maintenance technique : c'est inclus et ça ne consomme pas la
  modification du mois.

## Périmètre : forfait ou devis (à appliquer AVANT de coder)
Pour chaque demande de Georges, la classer d'abord. Si elle sort du forfait, ou en
cas de doute, ne pas coder : décrire la demande, estimer le temps et le signaler à
Adam / Théo pour chiffrage.

| Inclus dans le forfait | Devis (hors forfait) |
|---|---|
| 1 modification mineure par mois : un texte, une image, un produit simple, une liste de mots-clés | Toute modification mineure au-delà de la 1re du mois |
| Correction d'un bug de notre code | Nouvelle page ou nouvelle section de contenu |
| Mises à jour de sécurité et de dépendances | Nouvelle fonctionnalité (checkout, comptes, bannières, transporteur…) |
| Hébergement, sauvegardes, support email | Refonte visuelle d'une page ou d'une section |
| | Rédaction : articles de blog, fiches produits, textes SEO |
| | Intégration d'un service tiers, audit ou stratégie SEO |

- Une modification mineure, c'est un seul sujet et environ 1 h de travail au maximum.
- La période du forfait va du 21 au 20 du mois suivant.
- Le catalogue (produits, prix, stocks, catégories) est géré par le client dans
  WooCommerce depuis la formation au back-office.

## Registre des modifications mineures
Mettre à jour à chaque intervention demandée par le client.

Les lignes antérieures au 05/10/2026 ont été reconstituées à partir de l'historique git.

| Période | Inclus (1) | Au-delà / hors forfait (non facturé sauf mention) |
|---|---|---|
| 21/05 – 20/06 | Bannière Fête des Mères (27/05) | Système de bannières de campagne + avis de réappro (16/06, évolution) |
| 21/07 – 20/08 | Tarifs livraison + badge Stripe (11/08) | Mots-clés newsletter (12/08), mots-clés Paris (13/08) |
| 21/09 – 20/10 | Mots-clés Alep / Yvelines / cadeaux (28/09) | Commande sans compte (28/09, évolution) ; mots-clés huiles (05/10) ; section SEO page Yvelines (05/10, annoncée comme offerte) |

## Stack
- Next.js 15 (App Router, TypeScript, Tailwind) en front headless, sur Vercel.
- WooCommerce / WordPress hébergé chez OVH : catalogue, commandes, comptes clients.
  L'admin passe par le proxy `/api/wp-proxy` (`/wp-admin`).
- Stripe : PaymentIntent créé côté serveur avec les prix relus dans WooCommerce
  (`app/api/create-payment-intent`), commande WooCommerce créée à partir du paiement
  vérifié (`lib/checkout-order.ts`, `app/api/orders/create`, webhook `app/api/webhooks/stripe`).
- Commande sans compte (invité) active depuis le 28/09/2026.
- Livraison : règles uniques dans `lib/shipping.ts` (Colissimo 7,90 €, Mondial Relay
  4,90 €, Click & Collect gratuit, port offert dès 39 €).
- Rate limit : Upstash si configuré, sinon en mémoire. GA4 chargé seulement après
  consentement cookies.

## Comptes
- GitHub : organisation `contactnexusdeveloppement-alt` (Ned).
- Vercel : équipe « Nexus' projects » (Ned), projet `orient-relais`. La branche `master`
  part en production à chaque push ; les autres branches donnent une preview.
- WordPress / WooCommerce (OVH) : propriétaire du compte à compléter.
- Stripe : propriétaire du compte à compléter.

## Commandes
- `npm run dev`, `npm run lint`, `npm test`, `npm run build`.
- Le build a besoin de `WC_CONSUMER_KEY` / `WC_CONSUMER_SECRET` (clés factices
  suffisantes pour vérifier qu'il compile ; les appels WooCommerce échouent alors
  proprement).

## Points ouverts (05/10/2026)
- Page `/savon-alep-yvelines` : annonce des savons à 5, 12, 20 et 40 % de laurier,
  alors que seuls le 40 % et le liquide 5 % sont en ligne. À corriger avec Georges.
- Mentions « 100 % bio » sur les pages locales : demander les certificats
  (Ecocert / Cosmos) ou adoucir le texte.
- Catégorie « Huiles végétales » à créer dans WooCommerce (par le client), puis
  l'ajouter côté code (sitemap, `KNOWN_CATEGORIES`).
- Une URL invalide renvoie un code HTTP 200 (corps 404 + noindex) au lieu d'un 404.
- Accueil mobile : 8 px de défilement horizontal (dégradé décoratif `w-[600px]`),
  déjà présent en prod avant le 05/10.
- Fiche Google (Business Profile) : donner l'accès à Georges pour qu'il réponde à ses
  avis (livraison des accès prévue au devis, hors registre). Fiche : CID
  11005396459811211730.

## Avis clients : règles
- Jamais d'avis ou de témoignages rédigés par nous : faux avis = pratique commerciale
  trompeuse (art. L121-4 Code de la consommation). Les témoignages inventés de
  l'accueil ont été retirés le 05/10/2026.
- Demandes d'avis toujours neutres : Google interdit de solliciter des avis positifs
  de façon sélective (« si vous êtes satisfait… ») et d'offrir une contrepartie.
