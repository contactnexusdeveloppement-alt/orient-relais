"use client";

import { ShoppingBag, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { WooProduct } from "@/lib/woocommerce-types";
import { trackAddToCart } from "@/lib/analytics";

interface AddToCartButtonProps {
    product: WooProduct;
    variant?: string;
    className?: string;
    fullWidth?: boolean;
}

export function AddToCartButton({ product, variant = "Standard", className, fullWidth = true }: AddToCartButtonProps) {
    const { addItem } = useCart();
    const [added, setAdded] = useState(false);

    const handleAdd = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent link navigation if inside a Link

        const price = parseFloat(product.price);
        const imageSrc = product.images && product.images.length > 0 ? product.images[0].src : '/images/placeholder.png';

        addItem({
            id: String(product.id),
            title: product.name,
            price: isNaN(price) ? 0 : price,
            image: imageSrc,
            variant: variant,
            quantity: 1
        });
        trackAddToCart({
            item_id: String(product.id),
            item_name: product.name,
            item_category: product.categories?.[0]?.name,
            item_brand: product.brands?.[0]?.name,
            price: isNaN(price) ? 0 : price,
            quantity: 1,
        });
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
    };

    if (fullWidth) {
        return (
            <Button
                className={`w-full bg-primary hover:bg-primary/90 text-white font-medium rounded-xl h-11 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98] transition-all duration-300 ${added ? 'bg-emerald-500 hover:bg-emerald-500' : ''} ${className}`}
                onClick={handleAdd}
                aria-label="Ajouter au panier"
            >
                {added ? (
                    <>
                        <Check className="h-4 w-4 mr-2" />
                        Ajouté !
                    </>
                ) : (
                    <>
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        Ajouter au panier
                    </>
                )}
            </Button>
        );
    }

    return (
        <Button
            size="icon"
            className={`h-10 w-10 rounded-xl bg-white text-stone-800 shadow-lg hover:bg-primary hover:text-white hover:scale-110 active:scale-95 transition-all duration-300 border border-stone-100 ${added ? 'bg-emerald-500 text-white border-emerald-500' : ''} ${className}`}
            onClick={handleAdd}
            aria-label="Ajouter au panier"
        >
            {added ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
        </Button>
    );
}
