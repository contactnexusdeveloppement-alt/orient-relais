import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { fetchWooBrands } from "@/lib/woocommerce-brands";
import { fetchWooProducts } from "@/lib/woocommerce";
import { ProductCard } from "@/components/shop/ProductCard";
import { jsonLdScript } from "@/lib/json-ld";

// Human-written marketing copy used when the WooCommerce brand taxonomy
// does not provide a description yet. Matches Najel / Aroma-Zone pattern:
// short story + benefits + connection to our catalogue.
const BRAND_STORIES: Record<string, { tagline: string; story: string }> = {
    // Textes limités à ce qui est vérifiable dans notre catalogue : pas
    // d'allégation santé, pas de certification non confirmée.
    najel: {
        tagline: "Savons d'Alep saponifiés au chaudron selon la méthode traditionnelle d'Alep",
        story:
            "Najel est une maison spécialisée dans le savon d'Alep. Ses pains, saponifiés au chaudron puis séchés à l'air libre, associent huile d'olive et huile de baie de laurier. Chez Orient Relais, vous trouverez le savon d'Alep traditionnel à 40 % de laurier, le savon liquide à 5 %, des savons parfumés et enrichis, ainsi que des cosmétiques Najel, dont plusieurs certifiés Cosmos Organic.",
    },
    "terra-etica": {
        tagline: "Huiles essentielles, dont une gamme bio",
        story:
            "Terra Etica fournit une partie de nos huiles essentielles : thym à thymol, ravintsara, orange douce, niaouli, laurier noble et cyprès en version bio, ainsi que l'eucalyptus globulus et le clou de girofle.",
    },
    "ayur-vana": {
        tagline: "Compléments alimentaires de la tradition ayurvédique",
        story:
            "Ayur-vana propose des plantes de la tradition ayurvédique en gélules ou en poudre. Chez Orient Relais, vous trouverez notamment le moringa, le curcuma, le gingembre indien, le guduchi et le bilva, dont plusieurs références bio. Demandez conseil à un professionnel de santé avant toute cure, notamment en cas de grossesse, d'allaitement ou de traitement en cours.",
    },
};

export async function generateStaticParams() {
    const brands = await fetchWooBrands();
    return brands.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const slug = (await params).slug;
    const brands = await fetchWooBrands();
    const brand = brands.find((b) => b.slug === slug);
    // Marque sans produit en vente (ex. Florame) : vraie 404 plutôt qu'une
    // page vide indexable.
    if (!brand || brand.count === 0) notFound();

    const story = BRAND_STORIES[slug];
    const description =
        (brand.description && brand.description.replace(/<[^>]+>/g, "").slice(0, 160)) ||
        story?.tagline ||
        `Découvrez la gamme ${brand.name} chez Orient Relais.`;

    return {
        title: `${brand.name} : notre sélection`,
        description,
        alternates: { canonical: `/marques/${slug}` },
        openGraph: {
            title: `${brand.name} — Orient Relais`,
            description,
            url: `https://www.orient-relais.com/marques/${slug}`,
            type: "website",
        },
    };
}

export default async function BrandPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const slug = (await params).slug;
    const brands = await fetchWooBrands();
    const brand = brands.find((b) => b.slug === slug);
    if (!brand || brand.count === 0) notFound();

    // Pull all products and keep only those matching this brand (taxonomy or
    // "Marque" attribute)
    const allProducts = await fetchWooProducts(1, 100);
    const brandProducts = allProducts.filter((p) => {
        if (p.brands?.some((b) => b.slug === slug)) return true;
        const marqueAttr = p.attributes?.find(
            (a) => a.name?.toLowerCase() === "marque" || a.name?.toLowerCase() === "marques",
        );
        return marqueAttr?.options?.some(
            (o) =>
                o.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") ===
                brand.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
        );
    });

    const story = BRAND_STORIES[slug];
    const plainDesc = brand.description?.replace(/<[^>]+>/g, "").trim();

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.orient-relais.com" },
            { "@type": "ListItem", position: 2, name: "Marques", item: "https://www.orient-relais.com/marques" },
            { "@type": "ListItem", position: 3, name: brand.name, item: `https://www.orient-relais.com/marques/${slug}` },
        ],
    };

    const brandJsonLd = {
        "@context": "https://schema.org",
        "@type": "Brand",
        name: brand.name,
        url: `https://www.orient-relais.com/marques/${slug}`,
        ...(brand.image ? { logo: brand.image } : {}),
        ...(plainDesc || story ? { description: plainDesc || story?.story } : {}),
    };

    const itemListJsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: `Produits ${brand.name}`,
        numberOfItems: brandProducts.length,
        itemListElement: brandProducts.slice(0, 30).map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `https://www.orient-relais.com/produit/${p.slug}`,
            name: p.name,
        })),
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: jsonLdScript([breadcrumbJsonLd, brandJsonLd, itemListJsonLd]),
                }}
            />

            <nav aria-label="Fil d'Ariane" className="text-sm text-stone-500 mb-6 flex items-center gap-2 flex-wrap">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span aria-hidden>›</span>
                <Link href="/marques" className="hover:text-primary">Marques</Link>
                <span aria-hidden>›</span>
                <span className="text-stone-700">{brand.name}</span>
            </nav>

            <header className="max-w-3xl mb-10">
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-stone-900 mb-3">
                    {brand.name}
                </h1>
                {(story?.tagline || plainDesc) && (
                    <p className="text-primary text-lg md:text-xl font-medium mb-5">
                        {story?.tagline || plainDesc}
                    </p>
                )}
                {(story?.story || plainDesc) && (
                    <div className="text-stone-600 text-base leading-relaxed space-y-3">
                        <p>{story?.story || plainDesc}</p>
                    </div>
                )}
            </header>

            <section aria-labelledby="brand-products" className="mt-12">
                <h2
                    id="brand-products"
                    className="font-serif text-2xl md:text-3xl font-bold text-stone-900 mb-6"
                >
                    Nos produits {brand.name}
                    <span className="text-stone-400 text-lg font-sans font-normal ml-3">
                        {brandProducts.length} référence{brandProducts.length > 1 ? "s" : ""}
                    </span>
                </h2>

                {brandProducts.length === 0 ? (
                    <p className="text-stone-500">
                        Les produits {brand.name} seront bientôt disponibles. En attendant,
                        <Link href="/boutique" className="text-primary underline ml-1">
                            découvrez toute notre boutique
                        </Link>
                        .
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {brandProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}
