import { cn } from "@/lib/utils";
import { WooBrand } from "@/lib/woocommerce-types";
import Image from "next/image";

interface BrandCarouselProps {
    brands: WooBrand[];
}

export function BrandCarousel({ brands }: BrandCarouselProps) {
    if (!brands || brands.length === 0) return null;

    // Pour garantir une boucle fluide sur les grands écrans 4K, 
    // on duplique les marques plusieurs fois pour que la longueur dépasse la largeur de l'écran.
    const repeatedBrands = [
        ...brands,
        ...brands,
        ...brands,
        ...brands
    ]; // 4 copies de la liste originale

    // Un bloc contenant toutes les marques générées
    const renderBrandRow = () => (
        <div className="flex w-max items-center justify-center gap-16 md:gap-32 px-8 md:px-16 flex-none">
            {repeatedBrands.map((brand, i) => (
                <div 
                    key={`brand-${brand.id}-${i}`} 
                    className="flex items-center justify-center h-16 w-32 md:w-36 flex-none"
                >
                    {brand.image ? (
                        <div className="relative h-full w-full">
                            <Image
                                src={brand.image}
                                alt={`Logo de la marque ${brand.name}`}
                                fill
                                className="object-contain object-center"
                                sizes="(max-width: 768px) 128px, 160px"
                            />
                        </div>
                    ) : (
                        <span className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-stone-800 text-center w-full shrink-0 truncate">
                            {brand.name}
                        </span>
                    )}
                </div>
            ))}
        </div>
    );

    return (
        <section className="py-12 bg-white border-b border-stone-100 overflow-hidden w-full max-w-[100vw]">
            <div className="container mx-auto px-4 mb-6 text-center">
                <p className="text-sm font-semibold text-stone-400 uppercase tracking-widest">
                    Les marques qui nous font confiance
                </p>
            </div>
            
            <div 
                className="relative w-full overflow-hidden flex max-w-[100vw]" 
                style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}
            >
                <div className="flex w-max animate-scroll hover:[animation-play-state:paused]">
                    {/* Le secret d'une boucle infinie fluide : 2 blocs absolument identiques mis côte à côte, le parent se déplace de -50% au lieu de -100% */}
                    {renderBrandRow()}
                    {renderBrandRow()}
                </div>
            </div>
        </section>
    );
}
