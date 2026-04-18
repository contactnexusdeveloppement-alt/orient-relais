import { CategoryProductGrid } from "@/components/shop/CategoryProductGrid";
import { fetchWooProducts } from "@/lib/woocommerce";
import { jsonLdScript } from "@/lib/json-ld";
import { Sparkles, ShoppingBag } from "lucide-react";

export const metadata = {
    title: "Boutique Bio — Tous nos savons d'Alep, huiles & compléments",
    description: "Découvrez tous nos produits bio : savons d'Alep authentiques, huiles essentielles 100% pures, compléments alimentaires naturels, coffrets cadeaux. Livraison offerte dès 39€.",
    alternates: { canonical: "/boutique" },
    openGraph: {
        title: "Boutique Bio — Tous nos savons d'Alep, huiles & compléments",
        description: "Savons d'Alep, huiles essentielles, compléments et coffrets bio. Livraison offerte dès 39€.",
        url: "https://www.orient-relais.com/boutique",
        type: "website",
    },
};

export default async function BoutiquePage() {
    // Fetch all products (page 1, big limit or multiple calls if needed, assuming < 100 for mock)
    const products = await fetchWooProducts(1, 100);

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.orient-relais.com" },
            { "@type": "ListItem", position: 2, name: "Boutique", item: "https://www.orient-relais.com/boutique" },
        ],
    };

    const itemListJsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        numberOfItems: products.length,
        itemListElement: products.slice(0, 30).map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `https://www.orient-relais.com/produit/${p.slug}`,
            name: p.name,
        })),
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: jsonLdScript([breadcrumbJsonLd, itemListJsonLd]) }}
            />
            {/* Header */}
            <div className="mb-10">
                <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary bg-primary/5 px-4 py-1.5 rounded-full border border-primary/10 mb-3">
                    <ShoppingBag className="h-4 w-4" /> Tous nos produits
                </span>
                <h1 className="font-serif text-4xl font-bold text-stone-900">Notre Boutique</h1>
            </div>

            {/* Product Grid with Filters */}
            <CategoryProductGrid
                category="all"
                products={products}
                productCount={products.length}
            />

            {/* SEO Block */}
            <div className="relative mt-24 pt-12 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                <div className="max-w-3xl mx-auto text-center space-y-4 relative">
                    <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary">
                        <Sparkles className="h-4 w-4" /> À propos
                    </span>
                    <h2 className="font-serif text-2xl font-bold text-stone-900">
                        Orient Relais - Votre Boutique Bio en Ligne
                    </h2>
                    <div className="text-stone-600 text-sm leading-relaxed space-y-4 text-justify md:text-center">
                        <p>
                            Basé dans les Yvelines (78), Orient Relais vous propose une gamme de produits bio pour votre bien-être.
                            Savons d'Alep authentiques fabriqués selon la méthode traditionnelle ancestrale,
                            huiles essentielles 100% pures Terra Etica, compléments alimentaires naturels et coffrets cadeaux soigneusement composés.
                        </p>
                        <p>
                            Tous nos produits sont sélectionnés avec soin auprès de marques de confiance comme DP Nature et Najel.
                            Certifiés bio, sans ingrédients chimiques, respectueux des animaux et de l'environnement.
                            <span className="text-primary font-medium"> Livraison offerte dès 39€</span> en France métropolitaine avec Mondial Relay.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
