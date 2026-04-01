import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function StorySection() {
    return (
        <section className="py-16 md:py-24 bg-[#Fdfbf7]">
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
                    {/* Image Side */}
                    <div className="w-full md:w-1/2 relative">
                        <div className="aspect-[4/3] relative rounded-2xl overflow-hidden shadow-xl shadow-[#1A3C34]/10">
                            <Image
                                src="/images/categories/savons-alep-v2.webp"
                                alt="Fabrication artisanale de savon d'Alep"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                        {/* Decorative element */}
                        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#D4AF37]/10 rounded-full -z-10 blur-xl" />
                        <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#1A3C34]/5 rounded-full -z-10 blur-xl" />
                    </div>

                    {/* Content Side */}
                    <div className="w-full md:w-1/2 space-y-6">
                        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-[#1A3C34]">
                            L'Authenticité d'un Savoir-Faire Millénaire
                        </h2>
                        <div className="w-20 h-1 bg-[#D4AF37]/40 rounded-full" />
                        <p className="text-stone-600 font-manrope leading-relaxed text-lg">
                            Depuis des siècles, le savon d'Alep est fabriqué selon une méthode traditionnelle inchangée,
                            au cœur de la cité historique d'Alep. Cuit au chaudron, il allie la douceur de l'huile d'olive
                            aux vertus purifiantes de l'huile de baies de laurier.
                        </p>
                        <p className="text-stone-600 font-manrope leading-relaxed">
                            Chez Orient Relais, nous nous engageons à vous offrir ce trésor de la nature dans sa forme la plus pure.
                            Nos produits sont certifiés biologiques et respectent une éthique rigoureuse, pour le bien-être de votre peau
                            et de l'environnement.
                        </p>
                        <div className="pt-4">
                            <Link href="/a-propos">
                                <Button className="bg-[#1A3C34] hover:bg-[#0F2822] text-white px-8 py-6 text-lg font-playfair rounded-full shadow-lg shadow-[#1A3C34]/20 hover:shadow-xl transition-all">
                                    Découvrir Notre Histoire
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
