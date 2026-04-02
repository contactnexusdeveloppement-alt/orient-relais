import { notFound } from "next/navigation";
import { fetchWooProductsByCategory, fetchWooCategoryBySlug, fetchWooCategories } from "@/lib/woocommerce";
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

export async function generateStaticParams() {
    const categories = await fetchWooCategories();
    const slugs = categories.map((c) => c.slug);
    // Also include alias slugs so old URLs still work
    const aliasKeys = Object.keys(SLUG_ALIASES);
    const allSlugs = [...new Set([...slugs, ...aliasKeys])];
    return allSlugs.map((slug) => ({ slug }));
}

export const revalidate = 300;

// ─── Fallback static images (used if WooCommerce has no image) ─
const FALLBACK_IMAGES: Record<string, string> = {
    "savons-dalep": "/images/categories/savons-alep-v2.webp",
    "huiles-essentielles": "/images/categories/huiles-essentielles-v2.webp",
    complements: "/images/categories/complements-alimentaires-v2.webp",
    "soins-et-beaute": "/images/categories/soins-cosmetiques-v3.webp",
    coffrets: "/images/categories/coffrets-cadeaux-v2.webp",
    "epicerie-orientale": "/images/categories/soins-cosmetiques-v3.webp",
    miel: "/images/categories/complements-alimentaires-v2.webp",
    accessoires: "/images/categories/coffrets-cadeaux-v2.webp",
    "idees-cadeaux": "/images/categories/coffrets-cadeaux-v2.webp",
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

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.orient-relais.com" },
            { "@type": "ListItem", position: 2, name: "Boutique", item: "https://www.orient-relais.com/boutique" },
            { "@type": "ListItem", position: 3, name: wooCategory.name, item: `https://www.orient-relais.com/categorie/${slug}` },
        ],
    };

    return (
        <div className="flex flex-col bg-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
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
