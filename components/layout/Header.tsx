"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingBag, Menu, User, X, ChevronDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useRef } from "react";
import { CartDrawer } from "@/components/shop/CartDrawer";
import { SearchAutocomplete } from "@/components/shop/SearchAutocomplete";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isProductsMenuOpen, setIsProductsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const productCategories = [
        { href: "/categorie/savons-dalep", label: "Savons d'Alep", desc: "L'authentique soin millénaire" },
        { href: "/categorie/huiles-essentielles", label: "Huiles Essentielles", desc: "Pureté Terra Etica" },
        { href: "/categorie/complements", label: "Compléments", desc: "Bien-être au naturel" },
        { href: "/categorie/soins-et-beaute", label: "Soins et Beauté", desc: "Beauté naturelle" },
        { href: "/categorie/coffrets", label: "Coffrets Cadeaux", desc: "Pour faire plaisir" },
        { href: "/categorie/epicerie-orientale", label: "Épicerie Orientale", desc: "Saveurs d'Orient" },
        { href: "/categorie/miel", label: "Miel", desc: "Miels BIO de qualité" },
    ];

    return (
        <div className="flex flex-col">
            {/* Top Bar - Gold Accent */}
            <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 text-white py-2.5 text-center text-xs font-medium tracking-wider uppercase border-b border-primary/20">
                <span className="bg-gradient-to-r from-primary via-amber-400 to-primary bg-clip-text text-transparent font-bold">✨ Livraison offerte dès 39€ en France ✨</span>
            </div>

            <header
                className={cn(
                    "sticky top-0 z-50 w-full border-b transition-all duration-300",
                    isScrolled
                        ? "border-primary/20 bg-white/95 backdrop-blur-md shadow-lg shadow-stone-900/5"
                        : "border-transparent bg-white/80 backdrop-blur-sm"
                )}
                onMouseLeave={() => setIsProductsMenuOpen(false)}
            >
                <div className="container mx-auto flex h-20 items-center justify-between px-4 gap-8">
                    {/* Logo - Left */}
                    <Link href="/" className="flex-shrink-0 group relative z-50">
                        <Image
                            src="/images/logo-new.png"
                            alt="Orient Relais"
                            width={150}
                            height={50}
                            className="h-10 w-auto md:h-12 lg:h-14 object-contain"
                            priority
                        />
                    </Link>

                    {/* Desktop Nav - Centered */}
                    <nav className="hidden lg:flex items-center gap-10 text-sm font-medium text-stone-600">
                        <div
                            className="relative group h-20 flex items-center"
                            onMouseEnter={() => setIsProductsMenuOpen(true)}
                        >
                            <button className={cn(
                                "flex items-center gap-1 hover:text-primary transition-colors focus:outline-none",
                                isProductsMenuOpen && "text-primary"
                            )}>
                                Boutique <ChevronDown className={cn("h-4 w-4 transition-transform duration-300", isProductsMenuOpen && "rotate-180")} />
                            </button>
                        </div>

                        <Link href="/a-propos" className="relative hover:text-primary transition-colors group">
                            Notre Histoire
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                        </Link>
                        <Link href="/blog" className="relative hover:text-primary transition-colors group">
                            Le Journal
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                        </Link>
                        <Link href="/contact" className="relative hover:text-primary transition-colors group">
                            Contact
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                        </Link>
                    </nav>

                    {/* Actions - Right */}
                    <div className="flex items-center gap-2 flex-shrink-0 z-50">
                        {/* Desktop Search */}
                        <div className="hidden md:flex relative w-48 lg:w-64 group mr-2">
                            <SearchAutocomplete
                                inputClassName="rounded-full h-9 text-sm"
                            />
                        </div>

                        <CartDrawer />

                        <Button
                            variant="ghost"
                            size="icon"
                            className="lg:hidden"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </Button>
                    </div>
                </div>

                {/* Mega Menu Dropdown */}
                <div className={cn(
                    "absolute top-full left-0 w-full bg-white border-t border-primary/10 shadow-2xl shadow-stone-900/10 overflow-hidden transition-all duration-300 ease-in-out origin-top z-40",
                    isProductsMenuOpen ? "opacity-100 max-h-96" : "opacity-0 max-h-0 pointer-events-none"
                )}
                    onMouseEnter={() => setIsProductsMenuOpen(true)}
                    onMouseLeave={() => setIsProductsMenuOpen(false)}
                >
                    {/* Gold accent line */}
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />
                    <div className="container mx-auto px-4 py-10">
                        {/* All Products Link */}
                        <Link
                            href="/boutique"
                            className="inline-flex items-center gap-2 mb-8 px-5 py-3 rounded-full bg-gradient-to-r from-primary to-amber-500 text-white font-bold hover:shadow-lg hover:shadow-primary/30 hover:scale-105 transition-all duration-300"
                            onClick={() => setIsProductsMenuOpen(false)}
                        >
                            <ShoppingBag className="h-5 w-5" />
                            Voir tous les produits
                        </Link>

                        <div className="grid grid-cols-4 gap-6">
                            {productCategories.map((cat, i) => (
                                <Link
                                    key={cat.href}
                                    href={cat.href}
                                    className="group block p-5 rounded-2xl hover:bg-gradient-to-br hover:from-amber-50/50 hover:to-stone-50 border border-transparent hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                                    onClick={() => setIsProductsMenuOpen(false)}
                                >
                                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-primary mb-3 group-hover:scale-110 group-hover:shadow-md group-hover:shadow-primary/20 transition-all duration-300 border border-primary/10">
                                        <Sparkles className="h-5 w-5" />
                                    </div>
                                    <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-primary mb-1 transition-colors">
                                        {cat.label}
                                    </h3>
                                    <p className="text-sm text-stone-500 group-hover:text-stone-600 transition-colors">{cat.desc}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "calc(100vh - 80px)", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="lg:hidden border-t border-stone-100 bg-white overflow-hidden"
                        >
                            <div className="p-4 space-y-6 overflow-y-auto h-full pb-20">
                                <div className="relative z-50">
                                    <SearchAutocomplete
                                        inputClassName="h-12 bg-stone-50"
                                        onClose={() => setIsMenuOpen(false)}
                                    />
                                </div>

                                <div>
                                    <h3 className="text-sm font-bold text-stone-400 uppercase tracking-wider mb-3 px-2">Boutique</h3>
                                    <nav className="flex flex-col space-y-1">
                                        {productCategories.map((link, i) => (
                                            <motion.div
                                                key={link.href}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.1 + (i * 0.05) }}
                                            >
                                                <Link
                                                    href={link.href}
                                                    className="block px-4 py-3 rounded-lg hover:bg-stone-50 text-stone-900 font-medium"
                                                    onClick={() => setIsMenuOpen(false)}
                                                >
                                                    {link.label}
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </nav>
                                </div>

                                <div className="border-t border-stone-100 pt-6">
                                    <nav className="flex flex-col space-y-1">
                                        {[
                                            { href: "/a-propos", label: "Notre Histoire" },
                                            { href: "/blog", label: "Le Journal" },
                                            { href: "/contact", label: "Contact" },
                                            { href: "/faq", label: "FAQ" }
                                        ].map((link, i) => (
                                            <motion.div
                                                key={link.href}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.3 + (i * 0.05) }}
                                            >
                                                <Link
                                                    href={link.href}
                                                    className="block px-4 py-3 rounded-lg hover:bg-stone-50 text-stone-600"
                                                    onClick={() => setIsMenuOpen(false)}
                                                >
                                                    {link.label}
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </nav>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>
        </div>
    );
}
