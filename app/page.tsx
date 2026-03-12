import { getFeaturedWooProducts, getPromoWooProducts, fetchWooCategories } from "@/lib/woocommerce";
import { HeroSection } from "@/components/home/HeroSection";
import { BrandCarousel } from "@/components/home/BrandCarousel";
import { HomeContent } from "@/components/home/HomeContent";
import { TrustBadges } from "@/components/home/TrustBadges";
import { StorySection } from "@/components/home/StorySection";

export default async function Home() {
  const featuredProducts = (await getFeaturedWooProducts()).slice(0, 4);
  const promoProducts = await getPromoWooProducts();
  const categories = await fetchWooCategories();

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
      <BrandCarousel />

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
