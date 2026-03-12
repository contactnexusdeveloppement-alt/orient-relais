import { cn } from "@/lib/utils";
import { WooBrand } from "@/lib/woocommerce-types";
import Image from "next/image";

interface BrandCarouselProps {
    brands: WooBrand[];
}

export function BrandCarousel({ brands }: BrandCarouselProps) {
    if (!brands || brands.length === 0) return null;

    // Duplicate the brands array enough times to fill the screen for infinite scroll
    // Typically, doing it 2-3 times is enough depending on the brand count.
    const displayBrands = [...brands, ...brands, ...brands];

    return (
        <section className="py-12 bg-white border-b border-stone-100 overflow-hidden">
            <div className="container mx-auto px-4 mb-6 text-center">
                <p className="text-sm font-semibold text-stone-400 uppercase tracking-widest">
                    Les marques qui nous font confiance
                </p>
            </div>
            
            <div className="relative w-full overflow-hidden flex" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
                <div className="flex animate-scroll whitespace-nowrap gap-16 md:gap-32 items-center justify-center py-4 w-max">
                    {displayBrands.map((brand, i) => (
                        <div 
                            key={`brand-${brand.id}-${i}`} 
                            className="flex items-center justify-center text-stone-400 hover:text-stone-800 transition-colors grayscale hover:grayscale-0 h-16"
                        >
                            {brand.image ? (
                                <div className="relative h-12 w-32 md:w-40 opacity-70 hover:opacity-100 transition-opacity">
                                    <Image
                                        src={brand.image}
                                        alt={`Logo de la marque ${brand.name}`}
                                        fill
                                        className="object-contain object-center"
                                        sizes="(max-width: 768px) 128px, 160px"
                                    />
                                </div>
                            ) : (
                                <span className="font-serif text-3xl md:text-4xl font-bold tracking-tight opacity-70 hover:opacity-100 transition-opacity">
                                    {brand.name}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
