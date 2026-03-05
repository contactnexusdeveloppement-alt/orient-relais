import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { ProductGallery } from "@/components/shop/ProductGallery";
import { ProductInfo } from "@/components/shop/ProductInfo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductCard } from "@/components/shop/ProductCard";
import { ProductReviews } from "@/components/shop/ProductReviews";
import { BenefitCard } from "@/components/shop/BenefitCard";
import { parseBenefits } from "@/lib/benefits";
import { fetchWooProductBySlug, fetchWooProductsByCategory } from "@/lib/woocommerce";
import type { Metadata } from "next";
import { WooProduct } from "@/lib/woocommerce-types";

// Helper to clean HTML descriptions for metadata
function stripHtml(html: string) {
    return html.replace(/<[^>]*>/g, '');
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const slug = (await params).slug;
    const product = await fetchWooProductBySlug(slug);

    if (!product) {
        return { title: "Produit introuvable | Orient Relais" };
    }

    const description = product.short_description ? stripHtml(product.short_description) : stripHtml(product.description).slice(0, 160);

    return {
        title: `${product.name} | Orient Relais`,
        description: description,
        openGraph: {
            title: product.name,
            description: description,
            images: product.images.map(img => ({ url: img.src, width: 800, height: 800, alt: img.alt || product.name })),
            type: "website",
        },
    };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;
    const product = await fetchWooProductBySlug(slug);

    if (!product) {
        notFound();
    }

    // Get related products from same category
    const categorySlug = product.categories[0]?.slug || "savons";
    const allCategoryProducts = await fetchWooProductsByCategory(categorySlug);
    const relatedProducts = allCategoryProducts
        .filter(p => p.id !== product.id)
        .slice(0, 4);

    const categoryName = product.categories[0]?.name || "Boutique";

    // Parse attributes
    const benefitsAttribute = product.attributes.find(a => a.name === "Benefits" || a.name === "Bienfaits");
    const ingredientsAttribute = product.attributes.find(a => a.name === "Ingredients" || a.name === "Ingrédients");

    // Parse meta data for extra tabs (if present in Woo)
    // In mock data specific keys might be missing so we handle gracefully
    const usageMeta = product.meta_data.find(m => m.key === "Usage" || m.key === "Conseils d'utilisation");
    const characteristicsMeta = product.meta_data.find(m => m.key === "Characteristics" || m.key === "Caractéristiques");
    const detailsMeta = product.meta_data.find(m => m.key === "Details");

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        image: product.images.map(i => i.src),
        description: stripHtml(product.description).slice(0, 200),
        brand: {
            "@type": "Brand",
            name: "Orient Relais",
        },
        offers: {
            "@type": "Offer",
            url: `https://orient-relais.com/produit/${product.slug}`,
            priceCurrency: "EUR",
            price: product.price,
            availability: product.stock_status === 'instock' ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        },
        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.average_rating || "5",
            reviewCount: product.rating_count || 1,
        },
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-stone-500 mb-8 overflow-x-auto whitespace-nowrap px-4 py-3 bg-stone-50/50 rounded-xl border border-stone-100">
                <Link href="/" className="hover:text-primary transition-colors font-medium">Accueil</Link>
                <ChevronRight className="h-4 w-4 text-primary/40 flex-shrink-0" />
                <Link href="/boutique" className="hover:text-primary transition-colors">Boutique</Link>
                <ChevronRight className="h-4 w-4 text-primary/40 flex-shrink-0" />
                <Link href={`/categorie/${categorySlug}`} className="hover:text-primary transition-colors">{categoryName}</Link>
                <ChevronRight className="h-4 w-4 text-primary/40 flex-shrink-0" />
                <span className="text-primary font-semibold truncate max-w-[200px]">{product.name}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
                {/* Gallery */}
                <ProductGallery images={product.images.map(img => ({ src: img.src, name: img.name || product.name }))} />

                {/* Info & Conversion */}
                <ProductInfo product={product} />
            </div>

            {/* Content Tabs */}
            <div className="mb-20">
                <Tabs defaultValue="description" className="w-full">
                    <TabsList className="w-full justify-start border-b-2 border-stone-100 rounded-none bg-transparent p-0 h-auto gap-8 overflow-x-auto">
                        <TabsTrigger value="description" className="rounded-none border-b-2 border-transparent px-0 py-3 font-serif text-lg text-stone-500 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none hover:text-stone-800 transition-colors">
                            Description
                        </TabsTrigger>
                        {benefitsAttribute && benefitsAttribute.options.length > 0 && (
                            <TabsTrigger value="bienfaits" className="rounded-none border-b-2 border-transparent px-0 py-3 font-serif text-lg text-stone-500 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none hover:text-stone-800 transition-colors">
                                Bienfaits
                            </TabsTrigger>
                        )}
                        {usageMeta && (
                            <TabsTrigger value="conseils" className="rounded-none border-b-2 border-transparent px-0 py-3 font-serif text-lg text-stone-500 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none hover:text-stone-800 transition-colors">
                                Conseils d'utilisation
                            </TabsTrigger>
                        )}
                        {characteristicsMeta && (
                            <TabsTrigger value="caracteristiques" className="rounded-none border-b-2 border-transparent px-0 py-3 font-serif text-lg text-stone-500 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none hover:text-stone-800 transition-colors">
                                Caractéristiques
                            </TabsTrigger>
                        )}
                        <TabsTrigger value="avis" className="rounded-none border-b-2 border-transparent px-0 py-3 font-serif text-lg text-stone-500 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none hover:text-stone-800 transition-colors">
                            Avis ({product.rating_count})
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="description" className="pt-8">
                        <div className="prose prose-stone max-w-none prose-p:leading-relaxed prose-lg prose-headings:font-serif prose-h3:text-2xl prose-h4:text-lg prose-h4:text-primary">
                            <div dangerouslySetInnerHTML={{ __html: product.description }} />

                            {/* Certifications (Tags) */}
                            <h4 className="text-sm font-serif font-bold text-stone-900 uppercase tracking-widest mb-6 mt-8">
                                Certifications
                            </h4>
                            <div className="flex flex-wrap gap-8 items-center opacity-90">
                                {product.tags.map((tag) => {
                                    const certMap: Record<string, { src: string; alt: string; height: string }> = {
                                        "bio": { src: "/images/certifications/label-bio.png", alt: "Cosmétique Bio", height: "h-12" },
                                        "cosmos": { src: "/images/certifications/label-cosmos.png", alt: "Cosmos Organic", height: "h-10" },
                                        "ecocert": { src: "/images/certifications/label-ecocert.png", alt: "Ecocert", height: "h-10" },
                                        "france": { src: "/images/certifications/label-france.png", alt: "Fabriqué en France", height: "h-14" },
                                        "ab": { src: "/images/certifications/label-ab.png", alt: "AB Agriculture Biologique", height: "h-10" },
                                        "gelules": { src: "/images/certifications/label-gelules.png", alt: "Gélules Végétales", height: "h-12" },
                                        "vegan": { src: "/images/certifications/label-vegan.png", alt: "Vegan & Ayurvédique", height: "h-12" },
                                    };
                                    // Match loose
                                    const key = Object.keys(certMap).find(k => tag.slug.includes(k) || tag.name.toLowerCase().includes(k));
                                    const c = key ? certMap[key] : null;

                                    return c ? (
                                        <div key={tag.id} className="transition-all duration-300 hover:scale-110 ease-out cursor-help" title={c.alt}>
                                            <Image src={c.src} alt={c.alt} width={80} height={60} className={`w-auto ${c.height} object-contain`} />
                                        </div>
                                    ) : null;
                                })}
                            </div>

                            {/* Details Table */}
                            {detailsMeta && (
                                <div className="mt-10 mb-8 border-t border-stone-100 pt-8">
                                    <h4 className="text-sm font-serif font-bold text-stone-900 uppercase tracking-widest mb-6">
                                        Plus d'informations
                                    </h4>
                                    <div dangerouslySetInnerHTML={{ __html: detailsMeta.value }} />
                                </div>
                            )}

                            {/* Ingredients */}
                            {ingredientsAttribute && ingredientsAttribute.options.length > 0 && (
                                <div className="mt-8 p-6 bg-stone-50 rounded-2xl border border-stone-200">
                                    <h4 className="flex items-center gap-2 !mt-0">
                                        <span>🧪</span> Composition
                                    </h4>
                                    <ul className="!mb-0">
                                        {ingredientsAttribute.options.map((ing, i) => (
                                            <li key={i}>{ing}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </TabsContent>

                    <TabsContent value="bienfaits" className="pt-8">
                        {benefitsAttribute && benefitsAttribute.options.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {parseBenefits(benefitsAttribute.options).map((benefit, i) => (
                                    <BenefitCard
                                        key={i}
                                        category={benefit.category}
                                        items={benefit.items}
                                    />
                                ))}
                            </div>
                        ) : (
                            <p className="text-stone-500">Information non disponible pour ce produit.</p>
                        )}
                    </TabsContent>

                    {usageMeta && (
                        <TabsContent value="conseils" className="pt-8">
                            <div className="prose prose-stone max-w-none prose-headings:font-serif prose-h4:text-lg prose-h4:text-primary prose-ol:space-y-2 prose-li:marker:text-primary">
                                <div dangerouslySetInnerHTML={{ __html: usageMeta.value }} />
                            </div>
                        </TabsContent>
                    )}

                    {characteristicsMeta && (
                        <TabsContent value="caracteristiques" className="pt-8">
                            <div className="prose prose-stone max-w-none prose-headings:font-serif prose-h4:text-lg prose-h4:text-primary prose-ul:space-y-2 prose-li:marker:text-primary">
                                <div dangerouslySetInnerHTML={{ __html: characteristicsMeta.value }} />
                            </div>
                        </TabsContent>
                    )}

                    <TabsContent value="avis" className="pt-8">
                        <ProductReviews productId={product.id} rating={parseFloat(product.average_rating || "0")} count={product.rating_count} />
                    </TabsContent>
                </Tabs>
            </div>

            {/* Cross-Selling */}
            {relatedProducts.length > 0 && (
                <div className="relative py-16">
                    {/* Decorative top line */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

                    <div className="text-center mb-12">
                        <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary bg-primary/5 px-4 py-1.5 rounded-full border border-primary/10">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                            Vous pourriez aussi aimer
                        </span>
                        <h2 className="font-serif text-3xl font-bold text-stone-900 mt-4">Complétez votre rituel</h2>
                        <p className="text-stone-500 mt-2 max-w-md mx-auto">Nos experts ont sélectionné ces produits pour accompagner votre achat.</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {relatedProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                        <Link href="/boutique" className="flex flex-col items-center justify-center bg-gradient-to-br from-stone-900 to-stone-800 rounded-3xl border border-stone-700 text-stone-300 text-sm p-8 text-center hover:border-primary/50 transition-all group">
                            {/* Gold glow */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-10 bg-primary/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform border border-primary/30">
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                            </div>
                            <span className="font-serif font-bold text-white">Voir plus</span>
                            <span className="text-xs text-stone-400 mt-1">Découvrir la boutique</span>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
