# Orient Relais : fiche projet

## Client
- Orient Relais, boutique bio, 48 avenue de Touraine, 78310 Maurepas (Yvelines).
- Interlocuteur : Georges Harb (gérant). On le tutoie.
- Site : https://www.orient-relais.com

## Périmètre : forfait ou devis (règle Ned, à appliquer AVANT de coder)
Le forfait de maintenance couvre uniquement les changements mineurs. Tout le reste
passe par un devis validé par le client avant de commencer.

Pour chaque demande de Georges : la classer d'abord. Si elle sort du forfait, ou en
cas de doute, ne pas coder : décrire la demande, estimer le temps et le signaler à
Adam / Théo pour chiffrage.

| Forfait (mineur) | Devis (hors forfait) |
|---|---|
| Correction de texte, prix, image, bannière promo | Nouvelle page ou nouvelle section de contenu |
| Mots-clés, title, meta description | Nouvelle fonctionnalité (checkout, comptes, fidélité, transporteur…) |
| Petit ajustement visuel d'une page existante | Refonte design d'une page ou d'une section |
| Mises à jour de sécurité et dépendances | Rédaction : articles de blog, fiches produits, textes SEO |
| Correction d'un bug de notre code (garantie, toujours gratuit) | Intégration d'un service tiers (emailing, ERP, avis…) |
| | Audit ou stratégie SEO, campagnes |

- Repère : une demande qui dépasse 1 h de travail passe en devis (seuil à ajuster
  selon le contrat).
- Le catalogue (produits, prix, stocks, catégories) est géré par le client dans
  WooCommerce. La saisie de produits à sa place est hors forfait.

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
