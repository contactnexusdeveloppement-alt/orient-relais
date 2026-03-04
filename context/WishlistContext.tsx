"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useAuth } from "./AuthContext";

interface WishlistContextType {
    items: string[]; // Product IDs
    isInWishlist: (productId: string) => boolean;
    toggleWishlist: (productId: string) => void;
    isLoading: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuth();
    const [items, setItems] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Load wishlist from localStorage (works for both logged-in and anonymous users)
    useEffect(() => {
        const saved = localStorage.getItem("wishlist");
        if (saved) {
            try {
                setItems(JSON.parse(saved));
            } catch {
                setItems([]);
            }
        }
    }, []);

    // Save wishlist to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(items));
    }, [items]);

    const isInWishlist = useCallback(
        (productId: string) => items.includes(productId),
        [items]
    );

    const toggleWishlist = useCallback((productId: string) => {
        setItems((prev) => {
            if (prev.includes(productId)) {
                return prev.filter((id) => id !== productId);
            }
            return [...prev, productId];
        });
    }, []);

    return (
        <WishlistContext.Provider value={{ items, isInWishlist, toggleWishlist, isLoading }}>
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error("useWishlist must be used within a WishlistProvider");
    }
    return context;
}
