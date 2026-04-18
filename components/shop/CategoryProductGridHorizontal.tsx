"use client";

import { useState, useCallback } from "react";
import { ProductFiltersHorizontal } from "@/components/shop/ProductFiltersHorizontal";
import { ProductCard } from "@/components/shop/ProductCard";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ProductFilters } from "@/components/shop/ProductFilters";
import { WooProduct } from "@/lib/woocommerce-types";

interface CategoryProductGridHorizontalProps {
    category: string;
    products: WooProduct[];
    productCount: number;
}

export function CategoryProductGridHorizontal({ category, products, productCount }: CategoryProductGridHorizontalProps) {
    const [filteredProducts, setFilteredProducts] = useState<WooProduct[]>(products);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const handleFilterChange = useCallback((filtered: WooProduct[]) => {
        setFilteredProducts(filtered);
    }, []);

    return (
        <div className="flex flex-col">
            {/* Desktop Filters (Horizontal) */}
            <div className="hidden lg:block mb-8 sticky top-24 z-20 bg-white/80 backdrop-blur-md py-4 border-b border-primary/5">
                <ProductFiltersHorizontal
                    category={category}
                    products={products}
                    onFilterChange={handleFilterChange}
                />
            </div>

            {/* Mobile Filter Drawer */}
            <div className="lg:hidden mb-6">
                <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                    <SheetTrigger asChild>
                        <Button variant="outline" className="w-full flex gap-2 h-12 border-stone-200">
                            <SlidersHorizontal className="h-4 w-4" />
                            FILTRER
                            {filteredProducts.length !== products.length && (
                                <span className="ml-auto text-primary font-bold bg-primary/10 px-2 py-0.5 rounded-full text-xs">
                                    {filteredProducts.length}
                                </span>
                            )}
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[320px] overflow-y-auto">
                        <SheetHeader>
                            <SheetTitle className="font-serif text-xl">Filtrer les produits</SheetTitle>
                            <SheetDescription className="sr-only">
                                Affinez la liste par prix, catégorie, marque ou contenance.
                            </SheetDescription>
                        </SheetHeader>
                        <div className="mt-6">
                            <ProductFilters
                                category={category}
                                products={products}
                                onFilterChange={handleFilterChange}
                            />
                        </div>
                        <div className="mt-6 pt-4 border-t sticky bottom-0 bg-white p-4">
                            <Button
                                className="w-full bg-primary hover:bg-primary/90 text-white font-bold tracking-widest uppercase"
                                onClick={() => setIsFilterOpen(false)}
                            >
                                Voir {filteredProducts.length} résultats
                            </Button>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>

            {/* Product Grid */}
            <div className="w-full">
                {/* Results count text if needed, or included in filters line */}

                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 lg:gap-x-8 lg:gap-y-12">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
                        <div className="h-20 w-20 mx-auto mb-6 rounded-full bg-white flex items-center justify-center shadow-sm">
                            <SlidersHorizontal className="h-8 w-8 text-stone-300" />
                        </div>
                        <p className="font-serif text-xl font-bold text-stone-800 mb-2">
                            Aucun produit ne correspond
                        </p>
                        <p className="text-stone-500 max-w-sm mx-auto">
                            Essayez de modifier vos filtres pour voir plus de résultats de notre collection.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
