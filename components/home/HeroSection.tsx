"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function HeroSection() {
    return (
        <section className="relative h-[85vh] w-full overflow-hidden bg-stone-100 flex items-center justify-center">
            {/* Background Image with Parallax-like scale effect */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.9 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="relative w-full h-full"
                >
                    <Image
                        src="/hero.webp"
                        alt="Savons d'Alep bio et ingrédients naturels authentiques"
                        fill
                        sizes="100vw"
                        className="object-cover brightness-90"
                        priority
                    />
                </motion.div>
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-stone-900/80 via-stone-900/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent" />
                {/* Animated Gold Glow */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-gradient-radial from-primary/20 via-primary/5 to-transparent blur-3xl pointer-events-none"
                />
            </div>

            {/* Content */}
            <div className="container relative z-10 px-4 md:px-0 flex flex-col items-start gap-6 max-w-5xl mr-auto ml-4 md:ml-12 pt-12">

                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                >
                    <span className="inline-block rounded-full bg-primary/90 px-4 py-1.5 text-sm font-medium text-primary-foreground backdrop-blur-md shadow-lg shadow-primary/20 border border-white/20">
                        Livraison OFFERTE dès 39€
                    </span>
                </motion.div>

                {/* Title */}
                <h1 className="font-serif text-5xl font-bold leading-tight text-white md:text-7xl lg:text-8xl drop-shadow-lg">
                    <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7, duration: 0.7 }}
                        className="block"
                    >
                        L'Authenticité du
                    </motion.span>
                    <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.9, duration: 0.7 }}
                        className="text-primary drop-shadow-[0_0_30px_rgba(197,160,89,0.4)] italic block"
                    >
                        Soin Ancestral.
                    </motion.span>
                </h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1, duration: 0.7 }}
                    className="max-w-xl text-lg text-stone-100 md:text-2xl font-light leading-relaxed"
                >
                    Découvrez nos savons d'Alep véritables, huiles essentielles bio
                    et compléments alimentaires naturels.
                </motion.p>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3, duration: 0.7 }}
                    className="flex flex-col sm:flex-row gap-4 pt-6"
                >
                    <Link href="/boutique">
                        <Button
                            size="lg"
                            className="rounded-full font-semibold px-8 h-14 text-lg shadow-lg shadow-primary/30 hover:scale-105 transition-all w-full sm:w-auto"
                        >
                            Découvrir la Boutique
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
