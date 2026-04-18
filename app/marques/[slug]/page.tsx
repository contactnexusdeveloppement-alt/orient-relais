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
    najel: {
        tagline:
            "Savons d'Alep authentiques saponifiés au chaudron selon la méthode ancestrale syrienne",
        story:
            "Najel perpétue depuis 1895 la tradition familiale syrienne de fabrication du savon d'Alep. Cuits au chaudron puis séchés neuf mois à l'air libre, leurs pains associent huile d'olive et huile de baie de laurier pour purifier, hydrater et apaiser les peaux les plus sensibles (eczéma, psoriasis, acné). Chez Orient Relais, Najel est la marque de référence pour qui cherche le vrai savon d'Alep, sans colorants ni conservateurs.",
    },
    "terra-etica": {
        tagline: "Huiles essentielles 100 % pures, bio et équitables",
        story:
            "Terra Etica est le label de commerce équitable engagé du groupe Éthiquable. Leurs huiles essentielles sont issues de filières paysannes bio — lavande de Provence, ylang-ylang de Madagascar, tea tree australien — avec une traçabilité totale et une certification AB + Fair for Life. Nous avons choisi Terra Etica pour la qualité chromato­graphique de leurs huiles et pour le prix juste versé aux producteurs.",
    },
    florame: {
        tagline: "Cosmétique bio provençale depuis 1988",
        story:
            "Pionnière de l'aromathérapie française, Florame travaille à Saint-Rémy-de-Provence avec des producteurs sélectionnés en Europe et dans le monde. Leurs huiles essentielles et cosmétiques bio sont formulés sans ingrédients pétrochimiques, parabens ni silicones. Une marque historique qui a popularisé l'aromathérapie familiale en France.",
    },
    "ayur-vana": {
        tagline: "Compléments alimentaires ayurvédiques bio",
        story:
            "Ayur-vana propose des compléments ayurvédiques bio — ashwagandha, curcuma, triphala, spiruline — pour soutenir l'équilibre au quotidien. Les plantes sont cultivées en Inde selon la tradition ayurvédique millénaire et transformées en gélules végétales adaptées aux habitudes occidentales.",
    },
    "dp-nature": {
        tagline: "Cosmétique naturelle et huiles essentielles françaises",
        story:
            "DP Nature fabrique en France des huiles essentielles et produits de soin naturels. Leurs formules simples et sans additifs superflus conviennent à toute la famille.",
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
    if (!brand) notFound();

    const story = BRAND_STORIES[slug];
    const description =
        (brand.description && brand.description.replace(/<[^>]+>/g, "").slice(0, 160)) ||
        story?.tagline ||
        `Découvrez la gamme ${brand.name} chez Orient Relais.`;

    return {
        title: `${brand.name} — produits bio sélectionnés`,
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
    if (!brand) notFound();

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
