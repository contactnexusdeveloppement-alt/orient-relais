import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search, ShoppingBag, Sparkles } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4">
            <div className="text-center max-w-lg relative">
                {/* Background glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

                {/* Decorative Element */}
                <div className="relative mb-8">
                    {/* 110px sur mobile : à 180px, "404" (~300px de large)
                        débordait des écrans de 320px. */}
                    <span className="text-[110px] sm:text-[180px] font-serif font-bold bg-gradient-to-b from-primary/30 to-stone-100 bg-clip-text text-transparent select-none">404</span>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-28 w-28 rounded-2xl bg-gradient-to-br from-primary/20 to-amber-100 flex items-center justify-center shadow-lg shadow-primary/20 border border-primary/20">
                            <span className="text-6xl">🧼</span>
                        </div>
                    </div>
                </div>

                <h1 className="font-serif text-3xl font-bold text-stone-900 mb-4 relative">
                    Oups ! Page introuvable
                </h1>
                <p className="text-stone-600 mb-8 leading-relaxed relative">
                    Cette page semble avoir disparu comme une bulle de savon...
                    Pas de panique, notre boutique regorge de trésors à découvrir !
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center relative">
                    <Link href="/">
                        <Button className="gap-2 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25">
                            <Home className="h-4 w-4" /> Retour à l'accueil
                        </Button>
                    </Link>
                    <Link href="/boutique">
                        <Button variant="outline" className="gap-2 border-primary/30 hover:bg-primary/5 hover:border-primary">
                            <ShoppingBag className="h-4 w-4" /> Voir la boutique
                        </Button>
                    </Link>
                    <Link href="/recherche">
                        <Button variant="outline" className="gap-2 border-primary/30 hover:bg-primary/5 hover:border-primary">
                            <Search className="h-4 w-4" /> Rechercher
                        </Button>
                    </Link>
                </div>

                {/* Popular Categories */}
                <div className="mt-12 pt-8 relative">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                    <p className="text-sm text-stone-500 mb-4 flex items-center justify-center gap-2">
                        <Sparkles className="h-4 w-4 text-primary" /> Catégories populaires
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                        <Link href="/categorie/savons-dalep" className="px-4 py-2 bg-gradient-to-r from-primary/10 to-amber-50 rounded-full text-sm text-stone-700 hover:from-primary/20 hover:to-amber-100 transition-all border border-primary/20">
                            Savons d'Alep
                        </Link>
                        <Link href="/categorie/complements" className="px-4 py-2 bg-gradient-to-r from-primary/10 to-amber-50 rounded-full text-sm text-stone-700 hover:from-primary/20 hover:to-amber-100 transition-all border border-primary/20">
                            Compléments
                        </Link>
                        <Link href="/categorie/huiles-essentielles" className="px-4 py-2 bg-gradient-to-r from-primary/10 to-amber-50 rounded-full text-sm text-stone-700 hover:from-primary/20 hover:to-amber-100 transition-all border border-primary/20">
                            Huiles Essentielles
                        </Link>
                        <Link href="/categorie/soins-et-beaute" className="px-4 py-2 bg-gradient-to-r from-primary/10 to-amber-50 rounded-full text-sm text-stone-700 hover:from-primary/20 hover:to-amber-100 transition-all border border-primary/20">
                            Soins et Beauté
                        </Link>
                        <Link href="/categorie/coffrets" className="px-4 py-2 bg-gradient-to-r from-primary/10 to-amber-50 rounded-full text-sm text-stone-700 hover:from-primary/20 hover:to-amber-100 transition-all border border-primary/20">
                            Coffrets
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
