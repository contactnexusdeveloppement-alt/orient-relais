"use client";

import { useState, useCallback, useEffect } from "react";
import { ProductFilters } from "@/components/shop/ProductFilters";
import { ProductCard } from "@/components/shop/ProductCard";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, Sparkles } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { WooProduct } from "@/lib/woocommerce-types";

interface CategoryProductGridProps {
    category: string;
    products: WooProduct[];
    productCount: number;
}

export function CategoryProductGrid({ category, products, productCount }: CategoryProductGridProps) {
    const [filteredProducts, setFilteredProducts] = useState<WooProduct[]>(products);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    useEffect(() => {
        setFilteredProducts(products);
    }, [products]);

    const handleFilterChange = useCallback((filtered: WooProduct[]) => {
        setFilteredProducts(filtered);
    }, []);

    return (
        <div className="flex flex-col lg:flex-row gap-10">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-72 flex-shrink-0 space-y-8">
                <div className="bg-white rounded-2xl border border-stone-100 p-6 shadow-sm sticky top-24">
                    <ProductFilters
                        category={category}
                        products={products}
                        onFilterChange={handleFilterChange}
                    />
                </div>
            </aside>

            {/* Mobile Filter Drawer */}
            <div className="lg:hidden">
                <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                    <SheetTrigger asChild>
                        <Button variant="outline" className="w-full flex gap-2 mb-4">
                            <SlidersHorizontal className="h-4 w-4" />
                            Filtres
                            {filteredProducts.length !== products.length && (
                                <span className="ml-auto text-primary font-bold">
                                    ({filteredProducts.length})
                                </span>
                            )}
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[320px] sm:w-[400px] overflow-y-auto">
                        <SheetHeader>
                            <SheetTitle className="font-serif text-xl">Filtrer les produits</SheetTitle>
                        </SheetHeader>
                        <div className="mt-6">
                            <ProductFilters
                                category={category}
                                products={products}
                                onFilterChange={handleFilterChange}
                            />
                        </div>
                        <div className="mt-6 pt-4 border-t">
                            <Button
                                className="w-full bg-primary hover:bg-primary/90"
                                onClick={() => setIsFilterOpen(false)}
                            >
                                Voir {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''}
                            </Button>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>

            {/* Product Grid */}
            <div className="flex-1">
                {/* Results count */}
                <div className="flex items-center justify-between mb-6">
                    <p className="text-stone-600 flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-primary" />
                        <span>
                            {filteredProducts.length === products.length ? (
                                <>{productCount} produit{productCount > 1 ? 's' : ''}</>
                            ) : (
                                <>{filteredProducts.length} sur {productCount} produit{productCount > 1 ? 's' : ''}</>
                            )}
                        </span>
                    </p>
                </div>

                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 text-stone-500">
                        <div className="h-20 w-20 mx-auto mb-6 rounded-full bg-stone-100 flex items-center justify-center">
                            <SlidersHorizontal className="h-8 w-8 text-stone-400" />
                        </div>
                        <p className="font-serif text-lg font-bold text-stone-800 mb-2">
                            Aucun produit trouvé
                        </p>
                        <p className="text-sm mb-4">
                            Essayez de modifier vos filtres pour voir plus de résultats.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
