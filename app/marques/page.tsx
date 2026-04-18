import Link from "next/link";
import type { Metadata } from "next";
import { fetchWooBrands } from "@/lib/woocommerce-brands";
import { jsonLdScript } from "@/lib/json-ld";

export const metadata: Metadata = {
    title: "Toutes nos marques bio et naturelles",
    description:
        "Découvrez les marques sélectionnées par Orient Relais : Najel, Terra Etica, Florame, Ayur-vana. Des savons d'Alep authentiques aux huiles essentielles bio.",
    alternates: { canonical: "/marques" },
    openGraph: {
        title: "Nos marques bio — Orient Relais",
        description:
            "Najel, Terra Etica, Florame, Ayur-vana : les marques de confiance qui composent notre sélection bio et naturelle.",
        url: "https://www.orient-relais.com/marques",
        type: "website",
    },
};

export default async function MarquesPage() {
    const brands = await fetchWooBrands();

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.orient-relais.com" },
            { "@type": "ListItem", position: 2, name: "Marques", item: "https://www.orient-relais.com/marques" },
        ],
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbJsonLd) }}
            />

            <nav aria-label="Fil d'Ariane" className="text-sm text-stone-500 mb-6 flex items-center gap-2">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span aria-hidden>›</span>
                <span className="text-stone-700">Marques</span>
            </nav>

            <header className="max-w-3xl mb-12">
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-stone-900 mb-4">
                    Nos marques bio et naturelles
                </h1>
                <p className="text-stone-600 text-lg leading-relaxed">
                    Chez Orient Relais, chaque produit est choisi pour ce qu&apos;il raconte :
                    une tradition familiale, une certification bio exigeante, une filière
                    juste. Voici les marques qui composent notre sélection — cliquez pour
                    découvrir leur histoire et leur gamme.
                </p>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {brands.map((brand) => (
                    <Link
                        key={brand.slug}
                        href={`/marques/${brand.slug}`}
                        className="group relative bg-white border border-stone-200 rounded-2xl p-8 hover:shadow-lg hover:border-primary/30 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="font-serif text-2xl font-bold text-stone-900 group-hover:text-primary transition-colors">
                                {brand.name}
                            </h2>
                            {brand.count != null && brand.count > 0 && (
                                <span className="text-xs font-medium text-stone-500 bg-stone-100 px-2 py-1 rounded-full">
                                    {brand.count} produit{brand.count > 1 ? "s" : ""}
                                </span>
                            )}
                        </div>
                        {brand.description && (
                            <p className="text-sm text-stone-600 line-clamp-3">
                                {brand.description.replace(/<[^>]+>/g, "")}
                            </p>
                        )}
                        <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary">
                            Voir la marque →
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
