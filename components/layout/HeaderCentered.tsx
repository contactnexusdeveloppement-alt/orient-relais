"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingBag, Menu, User, X, ChevronDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { CartDrawer } from "@/components/shop/CartDrawer";
import { SearchAutocomplete } from "@/components/shop/SearchAutocomplete";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

export function HeaderCentered() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isProductsMenuOpen, setIsProductsMenuOpen] = useState(false);
    const { user, isAuthenticated } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const productCategories = [
        { href: "/categorie/savons-dalep", label: "SAVONS D'ALEP", desc: "L'authentique soin millénaire" },
        { href: "/categorie/huiles-essentielles", label: "HUILES ESSENTIELLES", desc: "Pureté Terra Etica" },
        { href: "/categorie/complements", label: "COMPLÉMENTS", desc: "Bien-être au naturel" },
        { href: "/categorie/soins-et-beaute", label: "SOINS ET BEAUTÉ", desc: "Cosmétique naturelle" },
        { href: "/categorie/coffrets", label: "COFFRETS", desc: "Idées cadeaux" },
        { href: "/categorie/epicerie-orientale", label: "ÉPICERIE ORIENTALE", desc: "Saveurs d'Orient" },
        { href: "/categorie/miel", label: "MIEL", desc: "Miels BIO de qualité" },
    ];

    const navLinks = [
        { href: "/a-propos", label: "NOTRE HISTOIRE" },
        { href: "/blog", label: "LE JOURNAL" },
        { href: "/contact", label: "CONTACT" },
    ];

    return (
        <div className="flex flex-col w-full relative z-50">
            {/* Top Bar - Dark Green Najel Style */}
            <div className="bg-[#0F2822] text-white py-2 text-center text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase">
                <span>LIVRAISON OFFERTE DÈS 39€ EN FRANCE</span>
            </div>

            <header
                className={cn(
                    "w-full bg-white transition-all duration-300 border-b border-primary/5",
                    isScrolled ? "shadow-md sticky top-0" : "relative"
                )}
                onMouseLeave={() => setIsProductsMenuOpen(false)}
            >
                <div className="container mx-auto px-4 md:px-8">
                    {/* Upper Row: Search - Logo - Actions */}
                    <div className="flex items-center justify-between h-20 md:h-24 relative">
                        {/* Left: Search (Desktop) */}
                        <div className="hidden lg:flex items-center w-1/3">
                            <div className="relative group w-64 transition-all duration-300 focus-within:w-72">
                                <SearchAutocomplete
                                    placeholder="Que recherchez-vous ?"
                                    inputClassName="w-full pl-10 bg-transparent border-b border-transparent focus:border-primary/20 outline-none text-sm placeholder:text-stone-400 text-stone-800 py-1 rounded-none shadow-none ring-0 focus-visible:ring-0"
                                />
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="lg:hidden w-1/3 flex justify-start">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="text-stone-800 hover:text-primary hover:bg-stone-50"
                            >
                                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </Button>
                        </div>

                        {/* Center: Logo */}
                        <div className="w-1/3 flex justify-center">
                            <Link href="/" className="relative group">
                                <Image
                                    src="/images/logo-new.png"
                                    alt="Orient Relais"
                                    width={180}
                                    height={60}
                                    className="h-12 md:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                                    priority
                                />
                            </Link>
                        </div>

                        {/* Right: Actions */}
                        <div className="w-1/3 flex justify-end items-center gap-4">
                            <Link
                                href={isAuthenticated ? "/mon-compte" : "/login"}
                                className="relative p-2 rounded-full hover:bg-stone-50 text-stone-600 hover:text-primary transition-colors"
                                title={isAuthenticated ? `Mon compte (${user?.firstName})` : "Se connecter"}
                            >
                                {isAuthenticated ? (
                                    <div className="h-5 w-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-bold">
                                        {user?.firstName?.charAt(0)?.toUpperCase()}
                                    </div>
                                ) : (
                                    <User className="h-5 w-5" />
                                )}
                            </Link>
                            <CartDrawer />
                        </div>
                    </div>

                    {/* Lower Row: Navigation (Desktop) */}
                    <nav className="hidden lg:flex items-center justify-center h-12 border-t border-stone-100">
                        <div className="flex items-center gap-8">
                            {/* Boutique Dropdown Trigger */}
                            <div
                                className="h-12 flex items-center"
                                onMouseEnter={() => setIsProductsMenuOpen(true)}
                            >
                                <Link
                                    href="/boutique"
                                    className={cn(
                                        "text-xs font-bold tracking-[0.15em] hover:text-primary transition-colors uppercase flex items-center gap-1 py-4",
                                        isProductsMenuOpen ? "text-primary" : "text-stone-600"
                                    )}
                                >
                                    PRODUITS
                                </Link>
                            </div>

                            {/* Standard Links */}
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-xs font-bold tracking-[0.15em] text-stone-600 hover:text-primary transition-colors uppercase py-4 relative group"
                                >
                                    {link.label}
                                    <span className="absolute bottom-3 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
                                </Link>
                            ))}
                        </div>
                    </nav>
                </div>

                {/* Mega Menu Dropdown */}
                <div className={cn(
                    "absolute top-full left-0 w-full bg-white border-t border-stone-100 shadow-2xl shadow-stone-900/10 overflow-hidden transition-all duration-300 ease-in-out origin-top z-[60]",
                    isProductsMenuOpen ? "opacity-100 max-h-[500px]" : "opacity-0 max-h-0 pointer-events-none"
                )}
                    onMouseEnter={() => setIsProductsMenuOpen(true)}
                    onMouseLeave={() => setIsProductsMenuOpen(false)}
                >
                    <div className="container mx-auto px-4 py-8">
                        <div className="grid grid-cols-4 gap-4">
                            {productCategories.map((cat, i) => (
                                <Link
                                    key={cat.href}
                                    href={cat.href}
                                    className="group block p-4 rounded-xl hover:bg-stone-50 transition-all duration-300"
                                    onClick={() => setIsProductsMenuOpen(false)}
                                >
                                    <div className="h-8 w-8 rounded-full bg-primary/5 flex items-center justify-center text-primary mb-3 group-hover:scale-110 transition-transform">
                                        <Sparkles className="h-4 w-4" />
                                    </div>
                                    <h3 className="font-bold text-sm text-primary uppercase tracking-wide mb-1 group-hover:underline decoration-1 underline-offset-4">
                                        {cat.label}
                                    </h3>
                                    <p className="text-xs text-stone-500 font-medium">{cat.desc}</p>
                                </Link>
                            ))}
                        </div>
                        <div className="mt-8 pt-4 border-t border-stone-100 text-center">
                            <Link
                                href="/boutique"
                                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary hover:text-primary/80 transition-colors"
                            >
                                Tout voir <ChevronDown className="h-3 w-3 -rotate-90" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                            className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-stone-100 shadow-xl z-50 max-h-[80vh] overflow-y-auto"
                        >
                            <div className="p-6 space-y-6">
                                <div className="relative z-50">
                                    <SearchAutocomplete
                                        inputClassName="pl-10 bg-stone-50 border-none h-12"
                                        onClose={() => setIsMenuOpen(false)}
                                    />
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <span className="text-xs font-bold text-stone-400 uppercase tracking-widest block mb-4">Produits</span>
                                        <div className="grid gap-3">
                                            {productCategories.map((cat) => (
                                                <Link
                                                    key={cat.href}
                                                    href={cat.href}
                                                    className="flex items-center gap-3 text-stone-800 font-medium p-2 rounded-lg hover:bg-stone-50"
                                                    onClick={() => setIsMenuOpen(false)}
                                                >
                                                    <span className="h-1.5 w-1.5 rounded-full bg-primary/40" />
                                                    {cat.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="border-t border-stone-100 pt-6">
                                        <div className="grid gap-3">
                                            {navLinks.map((link) => (
                                                <Link
                                                    key={link.href}
                                                    href={link.href}
                                                    className="block text-stone-600 font-medium hover:text-primary"
                                                    onClick={() => setIsMenuOpen(false)}
                                                >
                                                    {link.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>
        </div>
    );
}
