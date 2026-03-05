"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart, Heart, Truck, ShieldCheck, Leaf, Minus, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { WooProduct } from "@/lib/woocommerce-types";

interface ProductInfoProps {
    product: WooProduct;
}

// Helper to get badge color from tag name
function getBadgeColor(tag: string): "green" | "orange" | "stone" | "blue" | "pink" | "default" {
    const lowerTag = tag.toLowerCase();
    if (lowerTag.includes("bio") || lowerTag.includes("naturel") || lowerTag.includes("vegan")) return "green";
    if (lowerTag.includes("promo") || lowerTag.includes("offres")) return "orange";
    if (lowerTag.includes("luxe") || lowerTag.includes("précieux")) return "stone";
    if (lowerTag.includes("hydratant") || lowerTag.includes("eau")) return "blue";
    if (lowerTag.includes("femme") || lowerTag.includes("teint")) return "pink";
    return "stone";
}

export function ProductInfo({ product }: ProductInfoProps) {
    const [quantity, setQuantity] = useState(1);
    const { addItem } = useCart();

    const price = parseFloat(product.price);
    const regularPrice = product.regular_price ? parseFloat(product.regular_price) : price;
    const isOnSale = product.on_sale && regularPrice > price;

    // Parse rating safely
    const ratingValue = parseFloat(product.average_rating || "0");

    const totalPrice = price * quantity;
    const { isInWishlist, toggleWishlist } = useWishlist();
    const { isAuthenticated } = useAuth();
    const isFavorite = isInWishlist(String(product.id));

    const handleAddToCart = () => {
        addItem({
            id: String(product.id),
            title: product.name,
            price: isNaN(price) ? 0 : price,
            image: product.images[0]?.src || '/images/placeholder.png',
            quantity: quantity,
        });
    };

    const handleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isAuthenticated) {
            window.location.href = "/login";
            return;
        }
        toggleWishlist(String(product.id));
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Badges mapped from Tags */}
            {product.tags && product.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag) => (
                        <span
                            key={tag.id}
                            className={`text-xs font-bold uppercase px-3 py-1.5 rounded-full ${getBadgeColor(tag.name) === "green" ? "bg-emerald-100 text-emerald-700" :
                                getBadgeColor(tag.name) === "orange" ? "bg-primary/15 text-primary" :
                                    getBadgeColor(tag.name) === "blue" ? "bg-blue-100 text-blue-700" :
                                        getBadgeColor(tag.name) === "pink" ? "bg-pink-100 text-pink-700" :
                                            "bg-stone-100 text-stone-700"
                                }`}
                        >
                            {tag.name}
                        </span>
                    ))}
                </div>
            )}

            {/* Title */}
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-stone-900 leading-tight">
                {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-5 w-5 ${i < Math.floor(ratingValue) ? "fill-current" : "stroke-current fill-none"}`} />
                    ))}
                </div>
                <span className="text-stone-500 text-sm">({product.rating_count} avis)</span>
            </div>

            {/* Description */}
            <div
                className="text-stone-600 text-lg leading-relaxed prose prose-stone"
                dangerouslySetInnerHTML={{ __html: product.short_description || product.description }}
            />

            {/* Price */}
            <div className="flex items-baseline gap-3 pt-2">
                <span className="text-4xl font-bold text-primary">{totalPrice.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}</span>
                {isOnSale && (
                    <span className="text-xl text-stone-400 line-through">{(regularPrice * quantity).toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}</span>
                )}
            </div>

            {/* Weight */}
            {product.weight && (
                <p className="text-sm text-stone-500"><span className="font-medium text-stone-700">Contenance :</span> {product.weight}</p>
            )}

            {/* Quantity & Cart */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-stone-100">
                <div className="flex items-center border-2 border-stone-200 rounded-2xl bg-stone-50/50 overflow-hidden hover:border-primary/30 transition-colors">
                    <button
                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                        className="p-4 hover:bg-primary/5 transition-colors text-stone-600 hover:text-primary"
                    >
                        <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-6 font-bold text-xl text-stone-800 min-w-[3.5rem] text-center">{quantity}</span>
                    <button
                        onClick={() => setQuantity(q => q + 1)}
                        className="p-4 hover:bg-primary/5 transition-colors text-stone-600 hover:text-primary"
                    >
                        <Plus className="h-4 w-4" />
                    </button>
                </div>
                <Button
                    onClick={handleAddToCart}
                    size="lg"
                    className="flex-1 h-14 text-lg font-bold gap-3 rounded-2xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
                >
                    <ShoppingCart className="h-5 w-5" />
                    Ajouter au panier
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={handleWishlist}
                    className={`h-14 w-14 shrink-0 rounded-2xl border-2 transition-colors ${isFavorite ? "border-red-200 bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600" : "hover:border-primary/50 hover:text-primary"}`}
                >
                    <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
                </Button>
            </div>

            {/* Reassurance */}
            <div className="grid grid-cols-3 gap-3 pt-8 border-t border-stone-100">
                <div className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent border border-primary/10 hover:border-primary/20 transition-colors group">
                    <div className="p-2.5 rounded-xl bg-primary/10 group-hover:scale-110 transition-transform">
                        <Truck className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-xs text-stone-600 text-center leading-tight font-medium">Livraison<br />offerte dès 39€</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent border border-primary/10 hover:border-primary/20 transition-colors group">
                    <div className="p-2.5 rounded-xl bg-primary/10 group-hover:scale-110 transition-transform">
                        <ShieldCheck className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-xs text-stone-600 text-center leading-tight font-medium">Paiement<br />sécurisé</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent border border-primary/10 hover:border-primary/20 transition-colors group">
                    <div className="p-2.5 rounded-xl bg-primary/10 group-hover:scale-110 transition-transform">
                        <Leaf className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-xs text-stone-600 text-center leading-tight font-medium">100%<br />Naturel</span>
                </div>
            </div>

            {/* Stock */}
            <div className="flex items-center gap-2 text-sm">
                {product.stock_status === 'instock' ? (
                    <>
                        <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                        <span className="text-green-600 font-medium">En stock</span>
                    </>
                ) : (
                    <>
                        <span className="h-2 w-2 bg-red-500 rounded-full"></span>
                        <span className="text-red-600 font-medium">Rupture de stock</span>
                    </>
                )}
            </div>
        </div>
    );
}
