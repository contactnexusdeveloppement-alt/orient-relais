"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AddToCartButton } from "@/components/shop/AddToCartButton";
import { WooProduct } from "@/lib/woocommerce-types";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";

// Helper to determine badge color based on tag name
function getBadgeColor(tag: string): "green" | "orange" | "stone" | "blue" | "pink" | "default" {
    const lowerTag = tag.toLowerCase();
    if (lowerTag.includes("bio") || lowerTag.includes("naturel") || lowerTag.includes("vegan")) return "green";
    if (lowerTag.includes("promo") || lowerTag.includes("offres")) return "orange";
    if (lowerTag.includes("luxe") || lowerTag.includes("précieux")) return "stone";
    if (lowerTag.includes("hydratant") || lowerTag.includes("eau")) return "blue";
    if (lowerTag.includes("femme") || lowerTag.includes("teint")) return "pink";
    return "stone"; // Default color
}

export function ProductCard({ product }: { product: WooProduct }) {
    const { isInWishlist, toggleWishlist } = useWishlist();
    const { isAuthenticated } = useAuth();
    const isFavorite = isInWishlist(String(product.id));

    // Safely access image
    const imageSrc = product.images && product.images.length > 0 ? product.images[0].src : '/images/placeholder.png';

    // Safely parse price
    const price = parseFloat(product.price);
    const formattedPrice = isNaN(price) ? "N/A" : price.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });

    // Safely parse rating
    const rating = parseFloat(product.average_rating || "0");
    const reviews = product.rating_count || 0;

    return (
        <div className="group relative flex flex-col h-full">
            {/* Image Container */}
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F9F9F9] mb-4 transition-all duration-500">
                <Link href={`/produit/${product.slug}`} className="block w-full h-full relative">
                    <Image
                        src={imageSrc}
                        alt={product.name}
                        fill
                        className="object-contain p-8 transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                </Link>

                {/* Badges mapped from Tags */}
                <div className="absolute left-0 top-0 p-3 flex flex-col gap-1.5 z-10">
                    {product.tags?.map((tag) => (
                        <Badge
                            key={tag.id}
                            variant="secondary"
                            className={`
                                ${getBadgeColor(tag.name) === "green" ? "bg-emerald-700 text-white" : ""}
                                ${getBadgeColor(tag.name) === "orange" ? "bg-amber-700 text-white" : ""}
                                ${getBadgeColor(tag.name) === "stone" ? "bg-stone-800 text-white" : ""}
                                ${getBadgeColor(tag.name) === "blue" ? "bg-blue-700 text-white" : ""}
                                ${getBadgeColor(tag.name) === "pink" ? "bg-pink-700 text-white" : ""}
                                rounded-sm px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest border-none
                            `}
                        >
                            {tag.name}
                        </Badge>
                    ))}
                </div>

                {/* Wishlist Button */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (!isAuthenticated) {
                            window.location.href = "/login";
                            return;
                        }
                        toggleWishlist(String(product.id));
                    }}
                    className={`absolute top-2 right-2 h-8 w-8 rounded-full transition-all duration-300 z-20 ${isFavorite
                        ? "bg-white text-red-500 opacity-100 shadow-sm"
                        : "bg-white/0 text-stone-400 hover:bg-white hover:text-red-500 hover:shadow-sm opacity-0 group-hover:opacity-100"
                        }`}
                >
                    <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
                </Button>

                {/* Quick Add Button (Slide up) */}
                <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
                    <div className="p-4 bg-white/90 backdrop-blur-sm border-t border-stone-100">
                        <AddToCartButton product={product} />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col items-center text-center gap-2 flex-grow px-2">
                {/* Title */}
                <Link href={`/produit/${product.slug}`} className="font-serif text-base md:text-lg font-medium text-stone-900 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                    {product.name}
                </Link>

                {/* Rating */}
                <div className="flex items-center gap-1 justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                    <div className="flex text-primary">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`h-3 w-3 ${i < Math.floor(rating) ? "fill-current" : "text-stone-200"}`} />
                        ))}
                    </div>
                    {reviews > 0 && <span className="text-stone-400 text-[10px]">({reviews})</span>}
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mt-auto">
                    {product.sale_price ? (
                        <>
                            <span className="font-sans font-medium text-stone-400 text-sm line-through">
                                {parseFloat(product.regular_price).toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
                            </span>
                            <span className="font-sans font-bold text-stone-900 text-lg">
                                {parseFloat(product.sale_price).toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}
                            </span>
                        </>
                    ) : (
                        <span className="font-sans font-bold text-stone-900 text-lg">
                            {formattedPrice}
                        </span>
                    )}
                </div>
            </div>
        </div >
    );
}
