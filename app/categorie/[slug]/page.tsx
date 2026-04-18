import { notFound } from "next/navigation";
import { fetchWooProductsByCategory, fetchWooCategoryBySlug, fetchWooCategories } from "@/lib/woocommerce";
import { CategoryProductGrid } from "@/components/shop/CategoryProductGrid";
import { CategoryHeroSplit } from "@/components/shop/CategoryHeroSplit";
import type { Metadata } from "next";
import { jsonLdScript } from "@/lib/json-ld";

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

// ─── Known categories fallback (used when WooCommerce API is down) ─
const KNOWN_CATEGORIES: Record<string, { name: string; description: string }> = {
    "savons-dalep": { name: "Savons d'Alep", description: "Découvrez notre sélection de savons d'Alep authentiques, fabriqués artisanalement selon une tradition millénaire." },
    "huiles-essentielles": { name: "Huiles Essentielles", description: "Nos huiles essentielles bio certifiées pour votre bien-être au quotidien." },
    complements: { name: "Compléments", description: "Compléments alimentaires naturels et bio pour renforcer votre santé." },
    "soins-et-beaute": { name: "Soins et Beauté", description: "Révélez votre beauté naturelle avec nos soins cosmétiques éthiques et biologiques." },
    coffrets: { name: "Coffrets", description: "Nos coffrets cadeaux composés de produits naturels et bio, parfaits pour offrir." },
    "epicerie-orientale": { name: "Épicerie Orientale", description: "Découvrez nos produits d'épicerie orientale authentiques et savoureux." },
    miel: { name: "Miel", description: "Miels naturels et purs, récoltés avec soin pour préserver toutes leurs qualités." },
    accessoires: { name: "Accessoires", description: "Accessoires naturels pour accompagner vos rituels de soin au quotidien." },
    "idees-cadeaux": { name: "Idées Cadeaux", description: "Trouvez le cadeau parfait parmi notre sélection de produits naturels." },
};

// ─── Fetch with retry (OVH shared hosting can be slow) ─
async function fetchCategoryWithRetry(slug: string, retries = 2) {
    for (let i = 0; i <= retries; i++) {
        const result = await fetchWooCategoryBySlug(slug);
        if (result) return result;
        if (i < retries) await new Promise(r => setTimeout(r, 1000));
    }
    return null;
}

// ─── Metadata ─────────────────────────────────────────────────
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const slug = resolveSlug((await params).slug);
    const wooCategory = await fetchWooCategoryBySlug(slug);
    const fallback = KNOWN_CATEGORIES[slug];

    if (!wooCategory && !fallback) {
        return { title: "Catégorie introuvable" };
    }

    const name = wooCategory?.name || fallback?.name || slug;
    const rawDesc = wooCategory?.description || fallback?.description || "";
    const plainDesc = rawDesc.replace(/<[^>]+>/g, "").trim();
    const description =
        plainDesc.slice(0, 155) ||
        `Découvrez notre sélection de ${name.toLowerCase()} bio et naturels. Livraison offerte dès 39€.`;

    return {
        title: `${name} bio — sélection Orient Relais`,
        description,
        alternates: { canonical: `/categorie/${slug}` },
        openGraph: {
            title: `${name} bio — Orient Relais`,
            description,
            url: `https://www.orient-relais.com/categorie/${slug}`,
            type: "website",
        },
    };
}

// ─── Page ─────────────────────────────────────────────────────
export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const rawSlug = (await params).slug;
    const slug = resolveSlug(rawSlug);

    // Fetch category info from WooCommerce with retry
    const wooCategory = await fetchCategoryWithRetry(slug);

    // If API fails but it's a known category, use fallback data instead of 404
    const knownFallback = KNOWN_CATEGORIES[slug];
    if (!wooCategory && !knownFallback) {
        notFound();
    }

    const categoryName = wooCategory?.name || knownFallback?.name || slug;
    const categoryDescription = wooCategory?.description || knownFallback?.description || "";

    // Use WooCommerce image if set, otherwise fall back to static
    const bannerImage = wooCategory?.image?.src || FALLBACK_IMAGES[slug] || "/images/categories/savons-alep-v2.webp";

    const products = await fetchWooProductsByCategory(slug);

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.orient-relais.com" },
            { "@type": "ListItem", position: 2, name: "Boutique", item: "https://www.orient-relais.com/boutique" },
            { "@type": "ListItem", position: 3, name: categoryName, item: `https://www.orient-relais.com/categorie/${slug}` },
        ],
    };

    const itemListJsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: `${categoryName} — Orient Relais`,
        numberOfItems: products.length,
        itemListElement: products.slice(0, 30).map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `https://www.orient-relais.com/produit/${p.slug}`,
            name: p.name,
        })),
    };

    // Strip HTML from WooCommerce description so it renders as plain intro text
    const plainDescription = categoryDescription.replace(/<[^>]+>/g, "").trim();

    return (
        <div className="flex flex-col bg-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: jsonLdScript([breadcrumbJsonLd, itemListJsonLd]) }}
            />
            {/* Split Hero Banner — image comes from WooCommerce */}
            <CategoryHeroSplit
                title={categoryName}
                description={categoryDescription}
                image={bannerImage}
            />

            <div className="container mx-auto px-4 py-8 md:py-16">
                {plainDescription && (
                    <section className="max-w-3xl mx-auto mb-10 md:mb-14 text-stone-600 text-base leading-relaxed space-y-3">
                        <p>{plainDescription}</p>
                    </section>
                )}
                <CategoryProductGrid
                    category={slug}
                    products={products}
                    productCount={products.length}
                />
            </div>
        </div>
    );
}
