"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Search, Sparkles } from "lucide-react";
import { WooProduct } from "@/lib/woocommerce-types";
import { CategoryProductGrid } from "@/components/shop/CategoryProductGrid";

function SearchResults() {
    const searchParams = useSearchParams();
    const query = searchParams.get("q")?.toLowerCase() || "";
    const [results, setResults] = useState<WooProduct[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchResults = async () => {
            if (!query) {
                setResults([]);
                return;
            }
            setLoading(true);
            try {
                const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
                const products = await response.json();
                setResults(products);
            } catch (error) {
                console.error("Search failed", error);
                setResults([]);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [query]);

    return (
        <div className="container mx-auto px-4 py-8 md:py-16">
            <div className="mb-8">
                <Link href="/" className="inline-flex items-center text-sm text-stone-500 hover:text-primary mb-4">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Retour à l&apos;accueil
                </Link>
                <h1 className="font-serif text-3xl md:text-5xl font-bold text-stone-900 mb-2">
                    {query ? `Résultats pour "${query}"` : "Recherche"}
                </h1>
                <p className="text-stone-500">
                    {loading ? "Recherche en cours..." : `${results.length} produit(s) trouvé(s)`}
                </p>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((n) => (
                        <div key={n} className="h-[400px] bg-stone-100 rounded-3xl animate-pulse" />
                    ))}
                </div>
            ) : results.length > 0 ? (
                <CategoryProductGrid
                    category="all"
                    products={results}
                    productCount={results.length}
                />
            ) : (
                <div className="relative text-center py-24 bg-gradient-to-br from-amber-50/50 to-stone-50 rounded-3xl border border-primary/10 overflow-hidden">
                    {/* Decorative glow */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-60 h-30 bg-primary/10 blur-3xl" />

                    <div className="relative z-10">
                        <div className="h-20 w-20 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl mx-auto mb-6 flex items-center justify-center border border-primary/20">
                            <Search className="h-10 w-10 text-primary" />
                        </div>
                        <p className="text-2xl font-serif font-bold text-stone-900 mb-2">
                            {query ? "Aucun résultat trouvé" : "Que recherchez-vous ?"}
                        </p>
                        <p className="text-stone-500 mb-8 max-w-md mx-auto">
                            {query
                                ? "Essayez avec un autre terme comme \"savon\", \"nigelle\", \"moringa\" ou \"coffret\"."
                                : "Recherchez parmi nos produits bio: savons, huiles essentielles, compléments..."
                            }
                        </p>
                        <div className="flex flex-wrap gap-2 justify-center mb-8">
                            <Link href="/recherche?q=savon">
                                <Button variant="outline" size="sm" className="rounded-full border-primary/30 hover:bg-primary/5 hover:border-primary">Savon</Button>
                            </Link>
                            <Link href="/recherche?q=huile">
                                <Button variant="outline" size="sm" className="rounded-full border-primary/30 hover:bg-primary/5 hover:border-primary">Huile</Button>
                            </Link>
                            <Link href="/recherche?q=bio">
                                <Button variant="outline" size="sm" className="rounded-full border-primary/30 hover:bg-primary/5 hover:border-primary">Bio</Button>
                            </Link>
                            <Link href="/recherche?q=miel">
                                <Button variant="outline" size="sm" className="rounded-full border-primary/30 hover:bg-primary/5 hover:border-primary">Miel</Button>
                            </Link>
                        </div>
                        <Button asChild className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25">
                            <Link href="/boutique">Voir toute la boutique</Link>
                        </Button>
                    </div>
                </div>
            )}

            {/* Popular categories */}
            {results.length > 0 && (
                <div className="mt-16 pt-8 relative">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                    <h2 className="font-serif text-xl font-bold text-stone-900 mb-4 flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-primary" /> Explorer par catégorie
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        <Link href="/categorie/savons-dalep">
                            <Button variant="outline" className="rounded-full border-primary/30 hover:bg-primary/5 hover:border-primary">Savons d'Alep</Button>
                        </Link>
                        <Link href="/categorie/huiles-essentielles">
                            <Button variant="outline" className="rounded-full border-primary/30 hover:bg-primary/5 hover:border-primary">Huiles Essentielles</Button>
                        </Link>
                        <Link href="/categorie/complements">
                            <Button variant="outline" className="rounded-full border-primary/30 hover:bg-primary/5 hover:border-primary">Compléments</Button>
                        </Link>
                        <Link href="/categorie/soins-et-beaute">
                            <Button variant="outline" className="rounded-full border-primary/30 hover:bg-primary/5 hover:border-primary">Soins et Beauté</Button>
                        </Link>
                        <Link href="/categorie/coffrets">
                            <Button variant="outline" className="rounded-full border-primary/30 hover:bg-primary/5 hover:border-primary">Coffrets</Button>
                        </Link>
                        <Link href="/categorie/epicerie-orientale">
                            <Button variant="outline" className="rounded-full border-primary/30 hover:bg-primary/5 hover:border-primary">Épicerie Orientale</Button>
                        </Link>
                        <Link href="/categorie/miel">
                            <Button variant="outline" className="rounded-full border-primary/30 hover:bg-primary/5 hover:border-primary">Miel</Button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div className="container mx-auto py-20 text-center">Chargement...</div>}>
            <SearchResults />
        </Suspense>
    );
}
