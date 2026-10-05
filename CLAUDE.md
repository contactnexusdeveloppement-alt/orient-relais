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
- Stripe : les paiements du site ne passent pas par le compte Stripe de Ned (vérifié le
  05/10/2026) ; compte du client, accès à compléter. Le Stripe de Ned ne sert qu'au
  prélèvement du forfait.

## Commandes
- `npm run dev`, `npm run lint`, `npm test`, `npm run build`.
- Le build a besoin de `WC_CONSUMER_KEY` / `WC_CONSUMER_SECRET` (clés factices
  suffisantes pour vérifier qu'il compile ; les appels WooCommerce échouent alors
  proprement).

## Points ouverts
- Fiche Google (Business Profile) : Adam invite harbgeorges@yahoo.com comme
  propriétaire, puis transfère la propriété principale 7 jours après (Ned reste
  administrateur). Livraison des accès prévue au devis, hors registre. Fiche : CID
  11005396459811211730. Brouillon de mail à Georges prêt dans Gmail.
- En attente de Georges : certificats bio (pour remettre la mention bio sur les
  produits certifiés), livraison Belgique / Luxembourg sur demande (mention retirée),
  parking gratuit près de la boutique (mention conservée), cadeau de 5 € dès 39 €
  (bandeau permanent `cadeau-5-39`).
- Commande sans compte : aucune commande réelle vérifiée depuis le 28/09 (paiements
  sur le Stripe de Georges, pas celui de Ned). Contrôler dans WooCommerce ou passer
  une commande test.
- Catégorie « Huiles végétales » : à créer dans WooCommerce par le client ; le
  contenu SEO associé est sur devis.

## Contenus : règles (DGCCRF)
- Bio : seuls les produits dont le nom porte « bio » / « Cosmos Organic » sont
  certifiés (25 sur 83 au 05/10/2026). Jamais de « 100 % bio », « tous nos produits
  sont certifiés », ni de logo AB / Ecocert / Cosmos sans tag exact sur le produit.
- Cosmétiques : aucune allégation thérapeutique (eczéma, psoriasis, acné, mycoses,
  antiseptique…). Compléments alimentaires : aucune allégation santé non autorisée
  (immunité, anti-inflammatoire, digestion, « purifie le sang »…).
- Pas de marque, produit ou pourcentage de laurier qui n'existe pas au catalogue
  (vérifier via `/wp-json/wc/store/v1/products`). Pas de livraison hors de France
  annoncée : le checkout est limité à la France.

## Avis clients : règles
- Jamais d'avis ou de témoignages rédigés par nous : faux avis = pratique commerciale
  trompeuse (art. L121-4 Code de la consommation). Les témoignages inventés de
  l'accueil ont été retirés le 05/10/2026.
- Demandes d'avis toujours neutres : Google interdit de solliciter des avis positifs
  de façon sélective (« si vous êtes satisfait… ») et d'offrir une contrepartie.
