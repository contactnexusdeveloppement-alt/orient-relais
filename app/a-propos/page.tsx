import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, Globe, Users, Leaf, ShieldCheck, Award } from "lucide-react";

export const metadata = {
    title: "À Propos | Orient Relais - Boutique Bio",
    description: "Découvrez Orient Relais, revendeur spécialisé de produits bio DP Nature et Najel. Savons d'Alep, huiles essentielles et compléments alimentaires naturels.",
};

export default function AboutPage() {
    return (
        <div className="pb-16">
            {/* Hero */}
            <div className="relative h-[60vh] w-full flex items-center justify-center bg-stone-900 text-white overflow-hidden">
                <Image
                    src="/hero.webp"
                    alt="Savon d'Alep artisanal"
                    fill
                    className="object-cover opacity-50 scale-105"
                />
                {/* Animated Gold Glow */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-radial from-primary/20 via-primary/5 to-transparent blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '4s' }} />
                <div className="relative z-10 text-center px-4 max-w-4xl">
                    <span className="inline-block rounded-full bg-primary/90 px-4 py-1.5 text-sm font-medium text-white mb-6 shadow-lg shadow-primary/30">
                        Depuis les Yvelines, pour votre bien-être
                    </span>
                    <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">Qui sommes-nous ?</h1>
                    <p className="text-xl md:text-2xl font-light text-stone-200">
                        Revendeur spécialisé des produits DP Nature et Najel
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16 space-y-24">

                {/* Introduction */}
                <div className="max-w-3xl mx-auto text-center">
                    <p className="text-xl text-stone-600 leading-relaxed">
                        Basé dans les Yvelines, <strong>Orient Relais</strong> vous propose une gamme de produits bio
                        pour votre bien-être. Sur notre boutique en ligne, retrouvez des <strong>savons d'Alep authentiques</strong>,
                        des <strong>huiles essentielles</strong> et des <strong>compléments alimentaires naturels</strong>
                        soigneusement sélectionnés pour toute la famille.
                    </p>
                </div>

                {/* L'artisanat d'antan */}
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1 space-y-6">
                        <span className="text-primary font-bold uppercase tracking-widest text-sm">L'Artisanat d'Antan</span>
                        <h2 className="font-serif text-4xl font-bold text-stone-900">Une fabrication traditionnelle ancestrale</h2>
                        <p className="text-stone-600 leading-relaxed text-lg">
                            On ne peut pas simplement mélanger de l'huile d'olive avec de l'huile de baie de laurier et espérer
                            obtenir un véritable savon d'Alep. Le véritable savon d'Alep est fabriqué dans de grands chaudrons
                            et en quantité importante.
                        </p>
                        <p className="text-stone-600 leading-relaxed text-lg">
                            <strong>Pourquoi en produit-on une seule fois par an ?</strong> Parce que ce savon doit sécher à l'air libre
                            pendant <strong>9 mois</strong>. Il durcit grâce à l'hiver et acquiert sa consistance finale sous la chaleur
                            de l'été. Ce savoir-faire reflète l'artisanat d'autrefois, avec un profond respect pour le rythme
                            des saisons et la maturation.
                        </p>
                        <p className="text-stone-500 italic text-sm">
                            Le savon d'Alep existe depuis des siècles et est toujours apprécié aujourd'hui pour ses bienfaits remarquables.
                        </p>
                    </div>
                    <div className="flex-1 relative aspect-[4/3] w-full bg-stone-100 rounded-2xl overflow-hidden">
                        <Image src="/bento-soap.webp" alt="Savon d'Alep artisanal" fill className="object-cover" />
                    </div>
                </div>

                {/* Engagements */}
                <div className="bg-gradient-to-br from-amber-50/70 to-stone-50 rounded-3xl p-8 md:p-12">
                    <div className="text-center mb-12">
                        <span className="text-primary font-bold uppercase tracking-widest text-sm">Nos Engagements</span>
                        <h2 className="font-serif text-3xl font-bold text-stone-900 mt-2">Des produits sains et naturels</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <ValueCard
                            icon={Leaf}
                            title="VEGAN"
                            text="Tous nos produits conviennent aux Végans et sont respectueux des animaux."
                        />
                        <ValueCard
                            icon={ShieldCheck}
                            title="NATUREL"
                            text="Nous choisissons avec soin des produits naturels, élaborés avec des formules sûres et respectueuses de l'environnement."
                        />
                        <ValueCard
                            icon={Award}
                            title="ARTISANAT"
                            text="Tradition ancestrale et fabrication artisanale, sans aucun ingrédient chimique."
                        />
                    </div>
                </div>

                {/* Les bienfaits */}
                <div className="flex flex-col md:flex-row-reverse items-center gap-12">
                    <div className="flex-1 space-y-6">
                        <span className="text-primary font-bold uppercase tracking-widest text-sm">Un savon aux multiples vertus</span>
                        <h2 className="font-serif text-4xl font-bold text-stone-900">Les bienfaits du savon d'Alep</h2>
                        <p className="text-stone-600 leading-relaxed text-lg">
                            Produit naturel fait d'huiles végétales, le savon d'Alep cumule la douceur pour la peau
                            et une intransigeance à l'égard des bactéries. Avec un pourcentage variable d'huile de baie
                            de laurier, nous vous proposons des produits de qualité supérieure aux propriétés antiseptiques avérées.
                        </p>
                        <ul className="grid grid-cols-2 gap-3 text-stone-700">
                            <li className="flex items-center gap-2"><span className="text-primary">✓</span> Eczéma</li>
                            <li className="flex items-center gap-2"><span className="text-primary">✓</span> Psoriasis</li>
                            <li className="flex items-center gap-2"><span className="text-primary">✓</span> Maladies de peaux</li>
                            <li className="flex items-center gap-2"><span className="text-primary">✓</span> Mycoses</li>
                            <li className="flex items-center gap-2"><span className="text-primary">✓</span> Dermatite et acné</li>
                            <li className="flex items-center gap-2"><span className="text-primary">✓</span> Antiseptique</li>
                            <li className="flex items-center gap-2"><span className="text-primary">✓</span> Nettoie et purifie</li>
                            <li className="flex items-center gap-2"><span className="text-primary">✓</span> Hydrate et nourrit</li>
                        </ul>
                        <Link href="/categorie/savons-dalep">
                            <Button className="h-12 px-8 mt-4">
                                Découvrir nos savons
                            </Button>
                        </Link>
                    </div>
                    <div className="flex-1 relative aspect-square w-full max-w-md bg-stone-100 rounded-2xl overflow-hidden">
                        <Image src="/bento-spices.webp" alt="Bienfaits naturels" fill className="object-cover" />
                    </div>
                </div>

                {/* Huiles et Compléments */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative bg-gradient-to-br from-amber-50/50 to-stone-50 p-8 rounded-3xl space-y-4 border border-primary/10 overflow-hidden group hover:shadow-xl hover:shadow-primary/10 transition-all duration-500">
                        {/* Corner accent */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full" />
                        <h3 className="font-serif text-2xl font-bold text-stone-900">Huiles essentielles 100% pures</h3>
                        <p className="text-stone-600 leading-relaxed">
                            Explorez notre sélection d'huiles essentielles naturelles et biologiques, extraites avec soin
                            pour préserver toutes leurs propriétés thérapeutiques.
                        </p>
                        <Link href="/categorie/huiles-essentielles" className="text-primary font-bold hover:text-amber-600 inline-flex items-center gap-2 transition-colors group-hover:gap-3">
                            Voir les huiles essentielles <span className="transition-transform group-hover:translate-x-1">→</span>
                        </Link>
                    </div>
                    <div className="relative bg-gradient-to-br from-stone-900 to-stone-800 p-8 rounded-3xl space-y-4 overflow-hidden group hover:shadow-xl hover:shadow-primary/20 transition-all duration-500">
                        {/* Gold glow */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-20 bg-primary/30 blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />
                        <h3 className="font-serif text-2xl font-bold text-white">Compléments alimentaires naturels</h3>
                        <p className="text-stone-300 leading-relaxed">
                            Découvrez notre sélection pour renforcer votre bien-être. Spiruline, gelée royale, nigelle,
                            vitamines... Chaque produit est sélectionné avec soin.
                        </p>
                        <Link href="/categorie/complements" className="text-primary font-bold hover:text-amber-300 inline-flex items-center gap-2 transition-colors group-hover:gap-3">
                            Voir les compléments <span className="transition-transform group-hover:translate-x-1">→</span>
                        </Link>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="relative bg-stone-900 text-white p-8 md:p-12 rounded-3xl text-center overflow-hidden">
                    {/* Pattern overlay */}
                    <div className="absolute inset-0 opacity-5" style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)`,
                        backgroundSize: '20px 20px',
                    }} />
                    {/* Gold glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-60 h-30 bg-primary/20 blur-3xl" />
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

                    <div className="relative z-10">
                        <h2 className="font-serif text-3xl font-bold mb-4">Nous contacter</h2>
                        <p className="text-stone-300 mb-8 max-w-xl mx-auto">
                            Une question sur nos produits ? Notre équipe est à votre écoute.
                        </p>
                        <div className="flex flex-col md:flex-row justify-center gap-8 text-stone-200 mb-8">
                            <div className="bg-stone-800/50 p-4 rounded-xl border border-stone-700">
                                <span className="block text-xs text-primary mb-1 uppercase tracking-wider font-bold">Adresse</span>
                                <span className="font-medium">48 avenue de Touraine<br />78310 MAUREPAS</span>
                            </div>
                            <div className="bg-stone-800/50 p-4 rounded-xl border border-stone-700">
                                <span className="block text-xs text-primary mb-1 uppercase tracking-wider font-bold">Téléphone</span>
                                <span className="font-medium">06 99 55 69 77</span>
                            </div>
                            <div className="bg-stone-800/50 p-4 rounded-xl border border-stone-700">
                                <span className="block text-xs text-primary mb-1 uppercase tracking-wider font-bold">Email</span>
                                <span className="font-medium">Contact@orient-relais.com</span>
                            </div>
                        </div>
                        <Link href="/contact">
                            <Button className="bg-primary hover:bg-primary/90 text-white h-12 px-8 shadow-lg shadow-primary/30">
                                Nous écrire
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ValueCard({ icon: Icon, title, text }: { icon: React.ElementType, title: string, text: string }) {
    return (
        <div className="group bg-white p-8 rounded-2xl border border-stone-100 shadow-sm hover:shadow-xl hover:shadow-primary/10 hover:border-primary/20 transition-all duration-500 text-center flex flex-col items-center">
            <div className="h-16 w-16 bg-gradient-to-br from-primary/15 to-primary/5 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300 border border-primary/10">
                <Icon className="h-8 w-8" />
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-900 mb-3">{title}</h3>
            <p className="text-stone-600 leading-relaxed">{text}</p>
        </div>
    );
}
