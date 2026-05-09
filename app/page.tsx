import type { Metadata } from "next";
import { getFeaturedWooProducts, getPromoWooProducts, fetchWooCategories } from "@/lib/woocommerce";
import { fetchWooBrands } from "@/lib/woocommerce-brands";
import { HeroSection } from "@/components/home/HeroSection";
import { BrandCarousel } from "@/components/home/BrandCarousel";
import { HomeContent } from "@/components/home/HomeContent";
import { TrustBadges } from "@/components/home/TrustBadges";
import { StorySection } from "@/components/home/StorySection";
import { jsonLdScript } from "@/lib/json-ld";

/**
 * Homepage FAQ — single source of truth for both the visible accordion at
 * the bottom of the page AND the FAQPage JSON-LD. Deriving the schema
 * from the same array guarantees the DOM text and `acceptedAnswer.text`
 * never drift, which is what Google checks for "Content not visible on
 * page" warnings on FAQPage schema.
 *
 * Questions intentionally cover the four topics that drive 80 % of
 * pre-purchase queries on a local bio shop:
 *   - identity / what we sell
 *   - bio certification
 *   - delivery
 *   - in-store pickup
 *
 * Answers stay short enough to be quoted verbatim by AI search engines
 * (Perplexity, ChatGPT search, Bing Copilot) — they all consume FAQPage
 * schema and surface answers in citations even if Google's own FAQ rich
 * result is now restricted to authoritative health / gov sites.
 */
const HOMEPAGE_FAQ = [
    {
        q: "Qu'est-ce qu'Orient Relais ?",
        a: "Orient Relais est une boutique bio basée à Maurepas (78310, Yvelines) spécialisée dans les savons d'Alep authentiques Najel, les huiles essentielles bio Terra Etica et Florame, les cosmétiques naturels et les compléments ayurvédiques. Vente en ligne et retrait gratuit en boutique.",
    },
    {
        q: "Les produits Orient Relais sont-ils certifiés bio ?",
        a: "Oui, la quasi-totalité de notre catalogue est certifiée par Ecocert ou un organisme équivalent (AB, Cosmos Organic, Nature et Progrès). Les savons d'Alep sont fabriqués selon la méthode traditionnelle syrienne sans additifs ni conservateurs. Pour chaque produit, la certification figure sur la fiche.",
    },
    {
        q: "Quels sont les délais de livraison ?",
        a: "Les commandes sont expédiées sous 24 h ouvrées. Comptez 24 à 48 h pour Colissimo et 2 à 5 jours pour Mondial Relay en France métropolitaine. Livraison offerte dès 39 € d'achat. Nous livrons aussi en Belgique et au Luxembourg.",
    },
    {
        q: "Le Click & Collect en boutique est-il gratuit ?",
        a: "Oui, le retrait Click & Collect en boutique à Maurepas (48 avenue de Touraine) est totalement gratuit, quel que soit le montant de votre commande. Vous commandez en ligne et récupérez votre colis sous 24 h ouvrées du lundi au vendredi de 9 h à 18 h.",
    },
] as const;

const homepageFaqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HOMEPAGE_FAQ.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
    })),
};

export const metadata: Metadata = {
    // Uses the layout's title template's `default` value — no override needed
    // on the homepage since we don't want "Accueil | Orient Relais".
    description: "Boutique bio à Maurepas (Yvelines, 78) et en ligne : savons d'Alep authentiques Najel, huiles essentielles bio Terra Etica, cosmétiques naturels et compléments ayurvédiques. Livraison offerte dès 39 € en France ou Click & Collect gratuit en boutique.",
    alternates: {
        canonical: "/",
    },
    openGraph: {
        title: "Orient Relais — Boutique Bio à Maurepas (Yvelines) | Savons d'Alep & Cosmétiques Naturels",
        description: "Savons d'Alep authentiques Najel, huiles essentielles bio Terra Etica, cosmétiques bio et compléments ayurvédiques. Livraison France offerte dès 39 € ou retrait gratuit à Maurepas (Yvelines).",
        url: "https://www.orient-relais.com/",
        type: "website",
    },
};

export default async function Home() {
  const [featuredProductsRaw, promoProducts, categories, brands] = await Promise.all([
    getFeaturedWooProducts(),
    getPromoWooProducts(),
    fetchWooCategories(),
    fetchWooBrands(),
  ]);
  const featuredProducts = featuredProductsRaw.slice(0, 4);

  // Build a slug -> image URL map for the bento grid
  const categoryImages: Record<string, string> = {};
  for (const cat of categories) {
    if (cat.image?.src) {
      categoryImages[cat.slug] = cat.image.src;
    }
  }

  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(homepageFaqJsonLd) }}
      />
      {/* Hero Section */}
      <HeroSection />

      {/* Local SEO bar — indexable HTML for "Maurepas Yvelines Click & Collect" queries */}
      <section
        aria-label="Informations livraison et retrait"
        className="bg-stone-900 text-stone-100 py-3 px-4 text-center text-sm md:text-base"
      >
        <p className="container mx-auto">
          <strong>Boutique bio à Maurepas (Yvelines, 78310)</strong> ·
          {" "}🏪 Click & Collect gratuit en boutique ·
          {" "}📦 Livraison offerte dès 39 € en France métropolitaine ·
          {" "}<a href="/contact" className="underline hover:text-primary">48 avenue de Touraine</a>
        </p>
      </section>

      {/* Brand Carousel */}
      <BrandCarousel brands={brands} />

      {/* Trust Badges - Reassurance */}
      <TrustBadges />

      {/* Storytelling Section */}
      <StorySection />

      {/* Animated Content Sections */}
      <HomeContent
        featuredProducts={featuredProducts}
        promoProducts={promoProducts}
        categoryImages={categoryImages}
      />

      {/* FAQ — visible content backing the FAQPage JSON-LD above. Native
          <details>/<summary> for zero JS, free keyboard a11y, and durable
          cross-browser behaviour. Answers map *verbatim* to
          acceptedAnswer.text so Search Console doesn't flag the schema. */}
      <section
        aria-labelledby="home-faq-title"
        className="bg-stone-50 border-t border-stone-200 py-16 md:py-20"
      >
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-widest text-primary bg-primary/5 px-4 py-1.5 rounded-full border border-primary/10 mb-4">
              FAQ
            </span>
            <h2
              id="home-faq-title"
              className="font-serif text-3xl md:text-4xl font-bold text-stone-900 mt-2"
            >
              Questions fréquentes
            </h2>
            <p className="text-stone-600 mt-3 max-w-xl mx-auto">
              Tout ce que vous voulez savoir avant de commander chez Orient Relais.
            </p>
          </div>

          <div className="space-y-3">
            {HOMEPAGE_FAQ.map(({ q, a }) => (
              <details
                key={q}
                className="group bg-white border border-stone-200 rounded-2xl px-5 py-4 hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 transition-all open:border-primary/40 open:shadow-md open:shadow-primary/5"
              >
                <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-serif text-base md:text-lg font-semibold text-stone-900 group-open:text-primary transition-colors">
                  <span>{q}</span>
                  <svg
                    className="h-5 w-5 flex-shrink-0 text-primary transition-transform duration-200 group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <p className="mt-4 text-stone-600 leading-relaxed border-l-2 border-primary/30 pl-4">
                  {a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
