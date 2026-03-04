"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { ArrowRight, Leaf, Lock, Truck, ShieldCheck, Heart, Sparkles, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/shop/ProductCard";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/animations";
import { WooProduct } from "@/lib/woocommerce-types";

interface HomeContentProps {
    featuredProducts: WooProduct[];
    promoProducts: WooProduct[];
    categoryImages?: Record<string, string>;
}

export function HomeContent({ featuredProducts, promoProducts, categoryImages = {} }: HomeContentProps) {
    return (
        <>
            {/* Bento Grid - Nos Univers */}
            <section className="relative py-20 overflow-hidden">
                {/* Subtle decorative pattern */}
                <div className="absolute inset-0 opacity-[0.02]" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C5A059' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }} />
                <div className="container mx-auto px-4 relative z-10">
                    <FadeIn className="mb-12 text-center">
                        <span className="text-sm font-bold uppercase tracking-widest text-primary">Collections</span>
                        <h2 className="mt-2 font-serif text-4xl font-bold text-stone-900">Nos Univers</h2>
                        <p className="mt-3 text-stone-500 max-w-lg mx-auto">Découvrez nos gammes de produits naturels, soigneusement sélectionnés pour votre bien-être.</p>
                    </FadeIn>

                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-4 gap-4 md:h-[600px]" staggerDelay={0.15}>
                        {/* Grande Carte - Savon */}
                        <StaggerItem className="md:col-span-2 md:row-span-2">
                            <Link href="/categorie/savons-dalep" className="group block h-full relative overflow-hidden rounded-3xl bg-white border border-stone-200 min-h-[300px] hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500">
                                <Image
                                    src="/bento-soap.png"
                                    alt="Texture Savon d'Alep"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/30 to-transparent flex flex-col justify-end p-8">
                                    <h3 className="text-3xl font-serif font-bold text-white mb-2 drop-shadow-lg">Savons d'Alep</h3>
                                    <p className="text-stone-200 text-sm">L'or vert de l'Orient, purifiant et apaisant.</p>
                                </div>
                            </Link>
                        </StaggerItem>

                        {/* Carte Moyenne - Compléments */}
                        <StaggerItem className="md:col-span-2 md:row-span-1">
                            <Link href="/categorie/complements" className="group block h-full relative overflow-hidden rounded-3xl bg-white border border-stone-200 min-h-[200px] hover:shadow-xl hover:shadow-primary/10 transition-all duration-500">
                                <Image
                                    src={categoryImages["complements"] || "/images/categories/Compléments alimentaires.webp"}
                                    alt="Compléments Alimentaires Bio"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-stone-900/80 via-stone-900/50 to-transparent flex flex-col justify-end p-8">
                                    <h3 className="text-2xl font-serif font-bold text-white mb-2 drop-shadow-lg">Compléments Alimentaires</h3>
                                    <p className="text-stone-200 text-sm">Moringa, Nigelle, Gingembre... Naturellement efficaces.</p>
                                </div>
                            </Link>
                        </StaggerItem>

                        {/* Petite Carte - Huiles Essentielles */}
                        <StaggerItem className="md:col-span-1 md:row-span-1">
                            <Link href="/categorie/huiles-essentielles" className="group block h-full relative overflow-hidden rounded-3xl bg-white border border-stone-200 min-h-[150px] hover:shadow-xl hover:shadow-primary/10 transition-all duration-500">
                                <Image
                                    src={categoryImages["huiles-essentielles"] || "/images/categories/Huiles essentiels.webp"}
                                    alt="Huiles Essentielles Bio"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 25vw"
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/40 to-transparent flex flex-col justify-end p-6">
                                    <h3 className="text-xl font-serif font-bold text-white mb-1 drop-shadow-lg">Huiles Essentielles</h3>
                                    <p className="text-stone-200 text-xs">Terra Etica</p>
                                </div>
                            </Link>
                        </StaggerItem>

                        {/* Petite Carte - Coffrets */}
                        <StaggerItem className="md:col-span-1 md:row-span-1">
                            <Link href="/categorie/coffrets" className="group block h-full relative overflow-hidden rounded-3xl bg-white border border-stone-200 min-h-[150px] hover:shadow-xl hover:shadow-primary/10 transition-all duration-500">
                                <Image
                                    src={categoryImages["coffrets"] || "/images/categories/Coffrets.webp"}
                                    alt="Coffrets Cadeaux"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 25vw"
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/40 to-transparent flex flex-col justify-end p-6">
                                    <h3 className="text-xl font-serif font-bold text-white mb-1 drop-shadow-lg">Coffrets Cadeaux</h3>
                                    <p className="text-stone-200 text-xs">Najel & Mer Morte</p>
                                </div>
                            </Link>
                        </StaggerItem>
                    </StaggerContainer>
                </div>
            </section>

            {/* Visual Separator */}
            <div className="container mx-auto px-4">
                <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            </div>

            {/* Best-Sellers Section */}
            <section className="relative py-20 bg-white overflow-hidden">
                {/* Subtle top border */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                <div className="container mx-auto px-4 relative z-10">
                    <FadeIn className="flex justify-between items-end mb-10">
                        <div>
                            <span className="text-sm font-bold uppercase tracking-widest text-primary">Incontournables</span>
                            <h2 className="mt-2 font-serif text-4xl font-bold text-stone-900">Nos Best-Sellers</h2>
                            <p className="mt-3 text-stone-500 max-w-md">Les produits plébiscités par notre communauté.</p>
                        </div>
                        <Link href="/boutique" className="hidden md:flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors">
                            Voir tout <ArrowRight className="h-4 w-4" />
                        </Link>
                    </FadeIn>

                    <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6" staggerDelay={0.1}>
                        {featuredProducts.map((product) => (
                            <StaggerItem key={product.id} className="h-full">
                                <ProductCard product={product} />
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* Promo Section - Carousel */}
            {promoProducts.length > 0 && (
                <PromoCarousel products={promoProducts} />
            )}

            {/* Testimonials Section - Clean White with accent border */}
            <section className="relative py-24 bg-white">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-30" />
                <div className="container mx-auto px-4">
                    <FadeIn className="text-center mb-14">
                        <span className="text-sm font-bold uppercase tracking-widest text-primary">Avis Clients</span>
                        <h2 className="mt-2 font-serif text-4xl font-bold text-stone-900">Ce qu'ils en pensent</h2>
                        <p className="mt-3 text-stone-500 max-w-lg mx-auto">Des milliers de clients satisfaits nous font confiance.</p>
                    </FadeIn>
                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerDelay={0.15}>
                        <StaggerItem>
                            <TestimonialCard
                                name="Marie L."
                                location="Paris"
                                rating={5}
                                text="Le savon d'Alep a transformé ma peau ! Après des années d'eczéma, j'ai enfin trouvé un produit qui me convient. Livraison rapide et produit de qualité."
                            />
                        </StaggerItem>
                        <StaggerItem>
                            <TestimonialCard
                                name="Thomas B."
                                location="Lyon"
                                rating={5}
                                text="Excellent rapport qualité-prix. Les huiles essentielles Terra Etica sont pures et efficaces. Je recommande les yeux fermés."
                            />
                        </StaggerItem>
                        <StaggerItem>
                            <TestimonialCard
                                name="Sophie M."
                                location="Nantes"
                                rating={5}
                                text="Le coffret Najel était parfait pour offrir à ma mère. Emballage soigné, produits authentiques. Merci Orient Relais !"
                            />
                        </StaggerItem>
                    </StaggerContainer>
                </div>
            </section>

            {/* Reassurance Section - Clean & Minimal */}
            <section className="relative py-16 bg-stone-50 overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <FadeIn className="text-center mb-12">
                        <span className="text-sm font-bold uppercase tracking-widest text-primary">Nos Engagements</span>
                        <h2 className="mt-2 font-serif text-3xl font-bold text-stone-900">Pourquoi nous choisir ?</h2>
                    </FadeIn>
                    <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8" staggerDelay={0.1}>
                        <StaggerItem><ReassuranceItem icon={Leaf} title="Certifié Bio" text="Ingrédients 100% naturels" /></StaggerItem>
                        <StaggerItem><ReassuranceItem icon={ShieldCheck} title="Fabrication Artisanale" text="Savoir-faire ancestral" /></StaggerItem>
                        <StaggerItem><ReassuranceItem icon={Lock} title="Paiement Sécurisé" text="CB, Google Pay, Stripe" /></StaggerItem>
                        <StaggerItem><ReassuranceItem icon={Truck} title="Livraison Rapide" text="Offerte dès 39€" /></StaggerItem>
                    </StaggerContainer>
                </div>
            </section>
        </>
    );
}

function ReassuranceItem({ icon: Icon, title, text }: { icon: React.ElementType, title: string, text: string }) {
    return (
        <div className="flex flex-col items-center text-center gap-3 group">
            <div className="h-14 w-14 rounded-full flex items-center justify-center mb-2 transition-all duration-300 group-hover:scale-110 bg-white border border-stone-200 text-primary shadow-sm">
                <Icon className="h-6 w-6" />
            </div>
            <h4 className="font-serif font-bold text-base text-stone-900">{title}</h4>
            <p className="text-sm text-stone-500">{text}</p>
        </div>
    );
}

function TestimonialCard({ name, location, rating, text }: { name: string, location: string, rating: number, text: string }) {
    return (
        <div className="bg-gradient-to-br from-stone-50 to-white p-8 rounded-3xl border border-stone-100 shadow-sm hover:shadow-xl hover:shadow-primary/10 hover:border-primary/20 transition-all duration-500 relative overflow-hidden group h-full">
            {/* Quote icon */}
            <div className="absolute top-6 right-6 h-10 w-10 rounded-full bg-primary/5 flex items-center justify-center text-primary/30 group-hover:text-primary/50 transition-colors">
                <Quote className="h-5 w-5" />
            </div>
            <div className="flex gap-1 mb-5">
                {[...Array(rating)].map((_, i) => (
                    <span key={i} className="text-amber-400 text-lg">★</span>
                ))}
            </div>
            <p className="text-stone-600 leading-relaxed mb-6 text-lg italic relative z-10">"{text}"</p>
            <div className="flex items-center gap-4 pt-4 border-t border-stone-100">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/20 to-amber-100 flex items-center justify-center text-primary font-bold text-lg shadow-sm">
                    {name.charAt(0)}
                </div>
                <div>
                    <p className="font-semibold text-stone-900">{name}</p>
                    <p className="text-xs text-stone-500">{location}</p>
                </div>
            </div>
        </div>
    );
}

function PromoCarousel({ products }: { products: WooProduct[] }) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const scrollAmount = 320; // Width of one card approximately
            scrollRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth"
            });
        }
    };

    return (
        <section className="relative py-20 bg-gradient-to-br from-amber-50 via-orange-50/50 to-stone-50 overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-amber-200/20 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 relative z-10">
                <FadeIn className="flex justify-between items-center mb-10">
                    <div>
                        <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
                            <Sparkles className="h-4 w-4" /> Offres Spéciales
                        </span>
                        <h2 className="mt-4 font-serif text-4xl font-bold text-stone-900">Promotions en Cours</h2>
                        <p className="mt-3 text-stone-600 max-w-md">Profitez de nos offres exceptionnelles sur une sélection de produits.</p>
                    </div>

                    {/* Navigation Arrows */}
                    <div className="hidden md:flex items-center gap-2">
                        <button
                            onClick={() => scroll("left")}
                            className="h-12 w-12 rounded-full bg-white shadow-md hover:shadow-lg flex items-center justify-center text-stone-600 hover:text-primary transition-all hover:scale-105 border border-stone-100"
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            className="h-12 w-12 rounded-full bg-white shadow-md hover:shadow-lg flex items-center justify-center text-stone-600 hover:text-primary transition-all hover:scale-105 border border-stone-100"
                        >
                            <ChevronRight className="h-6 w-6" />
                        </button>
                    </div>
                </FadeIn>

                {/* Carousel Container */}
                <div
                    ref={scrollRef}
                    className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory -mx-4 px-4"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="flex-shrink-0 w-[280px] sm:w-[300px] snap-start"
                        >
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
