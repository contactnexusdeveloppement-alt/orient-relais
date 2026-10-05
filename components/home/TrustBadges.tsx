import { Truck, ShieldCheck, Leaf, HeartHandshake } from "lucide-react";

const badges = [
    {
        icon: Leaf,
        title: "Naturel & Bio",
        desc: "Une sélection naturelle, dont de nombreux produits bio"
    },
    {
        icon: ShieldCheck,
        title: "Paiement Sécurisé",
        desc: "Transactions cryptées SSL"
    },
    {
        icon: Truck,
        title: "Livraison Rapide",
        desc: "Expédition sous 24/48h"
    },
    {
        icon: HeartHandshake,
        title: "Service Client",
        desc: "À votre écoute 6j/7"
    }
];

export function TrustBadges() {
    return (
        <section className="py-12 bg-white border-y border-stone-100">
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {badges.map((badge, index) => (
                        <div key={index} className="flex flex-col items-center text-center space-y-3 group cursor-default">
                            <div className="w-12 h-12 rounded-full bg-[#1A3C34]/5 flex items-center justify-center text-[#1A3C34] group-hover:bg-[#1A3C34] group-hover:text-white transition-all duration-300">
                                <badge.icon className="h-6 w-6" strokeWidth={1.5} />
                            </div>
                            <div>
                                <h3 className="font-playfair font-bold text-[#1A3C34]">{badge.title}</h3>
                                <p className="text-xs md:text-sm text-stone-500 font-manrope mt-1">{badge.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
