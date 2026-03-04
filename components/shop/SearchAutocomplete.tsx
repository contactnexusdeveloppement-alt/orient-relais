"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { WooProduct } from "@/lib/woocommerce-types";
import Image from "next/image";
import Link from "next/link";

interface SearchAutocompleteProps {
    className?: string;
    inputClassName?: string;
    placeholder?: string;
    onClose?: () => void; // For mobile menu closing
}

export function SearchAutocomplete({
    className,
    inputClassName,
    placeholder = "Rechercher...",
    onClose
}: SearchAutocompleteProps) {
    const router = useRouter();
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<WooProduct[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Debounce the fetch
    useEffect(() => {
        const timer = setTimeout(() => {
            if (query.trim().length >= 2) {
                fetchResults(query);
            } else {
                setResults([]);
                setIsOpen(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    // Handle clicks outside to close the dropdown
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const fetchResults = async (searchQuery: string) => {
        setIsLoading(true);
        try {
            const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
            if (res.ok) {
                const data = await res.json();
                setResults(data);
                setIsOpen(true);
            }
        } catch (error) {
            console.error("Failed to fetch search results", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && query.trim()) {
            setIsOpen(false);
            if (onClose) onClose();
            router.push(`/recherche?q=${encodeURIComponent(query.trim())}`);
        }
    };

    const handleResultClick = () => {
        setIsOpen(false);
        setQuery("");
        if (onClose) onClose();
    };

    return (
        <div ref={wrapperRef} className={cn("relative group w-full", className)}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400 group-focus-within:text-primary transition-colors z-10" />

            <Input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => {
                    if (query.trim().length >= 2 && results.length > 0) {
                        setIsOpen(true);
                    }
                }}
                placeholder={placeholder}
                className={cn(
                    "pl-9 bg-transparent border-stone-200 focus-visible:ring-primary focus-visible:bg-white transition-all",
                    inputClassName
                )}
            />

            {isLoading && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <Loader2 className="h-4 w-4 animate-spin text-stone-300" />
                </div>
            )}

            <AnimatePresence>
                {isOpen && query.trim().length >= 2 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl shadow-stone-900/10 border border-stone-100 overflow-hidden z-50 max-h-[70vh] flex flex-col"
                    >
                        <div className="overflow-y-auto w-full custom-scrollbar flex-1">
                            {results.length > 0 ? (
                                <div className="p-2 space-y-1">
                                    <div className="px-3 py-2 text-xs font-bold text-stone-400 uppercase tracking-wider">
                                        Produits suggérés
                                    </div>
                                    {results.slice(0, 6).map((product) => (
                                        <Link
                                            key={product.id}
                                            href={`/produit/${product.slug}`}
                                            onClick={handleResultClick}
                                            className="flex items-center gap-4 p-2 rounded-xl hover:bg-stone-50 transition-colors group/item"
                                        >
                                            <div className="relative h-12 w-12 rounded-lg bg-stone-100 overflow-hidden flex-shrink-0 border border-stone-100">
                                                {product.images?.[0] ? (
                                                    <Image
                                                        src={product.images[0].src}
                                                        alt={product.images[0].alt || product.name}
                                                        fill
                                                        className="object-cover group-hover/item:scale-105 transition-transform duration-300"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-stone-300">
                                                        <Search className="h-4 w-4" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-bold text-stone-900 line-clamp-1 group-hover/item:text-primary transition-colors">
                                                    {product.name}
                                                </h4>
                                                <div className="text-sm font-medium text-stone-500">
                                                    {parseFloat(product.price).toFixed(2)}€
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : !isLoading ? (
                                <div className="p-8 text-center text-stone-500">
                                    <p className="text-sm mb-1">Aucun produit trouvé pour</p>
                                    <p className="font-bold text-stone-900">&quot;{query}&quot;</p>
                                </div>
                            ) : null}
                        </div>

                        {results.length > 6 && (
                            <div className="p-3 border-t border-stone-50 bg-stone-50/50">
                                <Button
                                    variant="ghost"
                                    className="w-full text-sm font-bold text-primary hover:text-primary hover:bg-primary/5"
                                    onClick={() => {
                                        setIsOpen(false);
                                        if (onClose) onClose();
                                        router.push(`/recherche?q=${encodeURIComponent(query.trim())}`);
                                    }}
                                >
                                    Voir tous les résultats ({results.length})
                                </Button>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

