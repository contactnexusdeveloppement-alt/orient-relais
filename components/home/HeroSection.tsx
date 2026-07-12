import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Hero is rendered as a server component with CSS-only entry effects. The
// previous version used Framer Motion with delays up to 1.3 s before the H1
// became opacity:1, which made the LCP element paint at ~6 s on mobile
// 4G and inflated CLS (0.363) due to transform/opacity transitions on the
// hero text. The CSS version paints the H1 immediately and the animations
// (scale/glow) are purely decorative and do not block layout.
export function HeroSection() {
    return (
        // min-h au lieu de h : sur une fenêtre très peu haute, le contenu
        // centré (badge + H1 + CTA) se faisait rogner par overflow-hidden.
        // min-h laisse la section grandir ; hauteur initiale identique,
        // aucun impact LCP/CLS.
        <section className="relative min-h-[85vh] w-full overflow-hidden bg-stone-100 flex items-center justify-center py-16">
            {/* Background Image: priority + no motion so LCP lands fast */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/hero.webp"
                    alt="Savons d'Alep bio et ingrédients naturels authentiques"
                    fill
                    sizes="100vw"
                    className="object-cover brightness-90 opacity-90"
                    priority
                    fetchPriority="high"
                />
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-stone-900/80 via-stone-900/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent" />
                {/* Decorative gold glow — CSS animation, no layout impact */}
                <div
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-gradient-radial from-primary/20 via-primary/5 to-transparent blur-3xl pointer-events-none animate-pulse [animation-duration:4s]"
                />
            </div>

            {/* Content — rendered eagerly, no delay on critical text */}
            <div className="container relative z-10 px-4 md:px-0 flex flex-col items-start gap-6 max-w-5xl mr-auto ml-4 md:ml-12 pt-12">
                <span className="inline-block rounded-full bg-primary/90 px-4 py-1.5 text-sm font-medium text-primary-foreground backdrop-blur-md shadow-lg shadow-primary/20 border border-white/20">
                    Livraison OFFERTE dès 39€
                </span>

                <h1 className="font-serif text-5xl font-bold leading-tight text-white md:text-7xl lg:text-8xl drop-shadow-lg">
                    <span className="block">L&apos;Authenticité du</span>
                    <span className="text-primary drop-shadow-[0_0_30px_rgba(197,160,89,0.4)] italic block">
                        Soin Ancestral.
                    </span>
                </h1>

                <p className="max-w-xl text-lg text-stone-100 md:text-2xl font-light leading-relaxed">
                    Découvrez nos savons d&apos;Alep véritables, huiles essentielles bio
                    et compléments alimentaires naturels.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <Link href="/boutique">
                        <Button
                            size="lg"
                            className="rounded-full font-semibold px-8 h-14 text-lg shadow-lg shadow-primary/30 hover:scale-105 transition-all w-full sm:w-auto"
                        >
                            Découvrir la Boutique
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
