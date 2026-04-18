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
    description: "Découvrez notre sélection de savons d'Alep, huiles essentielles, compléments alimentaires bio et soins naturels. Livraison offerte dès 39€. Boutique à Maurepas (78).",
    alternates: {
        canonical: "/",
    },
    openGraph: {
        title: "Orient Relais | Boutique Bio — Savons d'Alep & Produits Naturels",
        description: "Savons d'Alep authentiques, huiles essentielles et compléments alimentaires bio. Livraison offerte dès 39€. Boutique à Maurepas (78).",
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
