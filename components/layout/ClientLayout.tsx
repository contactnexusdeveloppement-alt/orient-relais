"use client";

import { HeaderCentered } from "@/components/layout/HeaderCentered";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { WooCategory } from "@/lib/woocommerce-types";

export function ClientLayout({
    children,
    categories
}: {
    children: React.ReactNode;
    categories: WooCategory[];
}) {
    return (
        <AuthProvider>
            <CartProvider>
                <WishlistProvider>
                    <ScrollToTop />
                    <HeaderCentered categories={categories} />
                    <main className="flex-1">
                        {children}
                    </main>
                    <Footer />
                    <CookieConsent />
                </WishlistProvider>
            </CartProvider>
        </AuthProvider>
    );
}

