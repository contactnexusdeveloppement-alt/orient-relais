import type { Metadata } from "next";
import { getFeaturedWooProducts, getPromoWooProducts, fetchWooCategories } from "@/lib/woocommerce";
import { fetchWooBrands } from "@/lib/woocommerce-brands";
import { HeroSection } from "@/components/home/HeroSection";
import { BrandCarousel } from "@/components/home/BrandCarousel";
import { HomeContent } from "@/components/home/HomeContent";
import { TrustBadges } from "@/components/home/TrustBadges";
import { StorySection } from "@/components/home/StorySection";

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
    </div>
  );
}
