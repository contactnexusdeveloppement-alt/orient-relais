import { notFound } from "next/navigation";
import { fetchWooProductsByCategory, fetchWooCategoryBySlug } from "@/lib/woocommerce";
import { CategoryProductGrid } from "@/components/shop/CategoryProductGrid";
import { CategoryHeroSplit } from "@/components/shop/CategoryHeroSplit";
import type { Metadata } from "next";

// ─── Slug aliases (old URLs → real WooCommerce slugs) ─────────
const SLUG_ALIASES: Record<string, string> = {
    savons: "savons-dalep",
    soins: "soins-et-beaute",
    "complements-alimentaires": "complements",
    huiles: "huiles-essentielles",
};

function resolveSlug(slug: string): string {
    return SLUG_ALIASES[slug] || slug;
}

// ─── Fallback static images (used if WooCommerce has no image) ─
const FALLBACK_IMAGES: Record<string, string> = {
    "savons-dalep": "/images/categories/savons-alep-v2.webp",
    "huiles-essentielles": "/images/categories/huiles-essentielles-v2.webp",
    complements: "/images/categories/complements-alimentaires-v2.webp",
    "soins-et-beaute": "/images/categories/soins-cosmetiques-v3.webp",
    coffrets: "/images/categories/coffrets-cadeaux-v2.webp",
    "epicerie-orientale": "/images/categories/soins-cosmetiques-v3.webp",
    miel: "/images/categories/complements-alimentaires-v2.webp",
};

// ─── Metadata ─────────────────────────────────────────────────
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const slug = resolveSlug((await params).slug);
    const wooCategory = await fetchWooCategoryBySlug(slug);

    if (!wooCategory) {
        return { title: "Catégorie introuvable | Orient Relais" };
    }

    return {
        title: `${wooCategory.name} | Orient Relais - Boutique Bio`,
        description: wooCategory.description || `Découvrez notre sélection de ${wooCategory.name.toLowerCase()} bio et naturels. Livraison offerte dès 39€.`,
    };
}

// ─── Page ─────────────────────────────────────────────────────
export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const rawSlug = (await params).slug;
    const slug = resolveSlug(rawSlug);

    // Fetch category info from WooCommerce (with image!)
    const wooCategory = await fetchWooCategoryBySlug(slug);

    if (!wooCategory) {
        notFound();
    }

    // Use WooCommerce image if set, otherwise fall back to static
    const bannerImage = wooCategory.image?.src || FALLBACK_IMAGES[slug] || "/images/categories/savons-alep-v2.webp";

    const products = await fetchWooProductsByCategory(slug);

    return (
        <div className="flex flex-col bg-white">
            {/* Split Hero Banner — image comes from WooCommerce */}
            <CategoryHeroSplit
                title={wooCategory.name}
                description={wooCategory.description}
                image={bannerImage}
            />

            <div className="container mx-auto px-4 py-8 md:py-16">
                <CategoryProductGrid
                    category={slug}
                    products={products}
                    productCount={products.length}
                />
            </div>
        </div>
    );
}
