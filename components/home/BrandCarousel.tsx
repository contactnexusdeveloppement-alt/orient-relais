import { cn } from "@/lib/utils";

const brands = [
    { name: "Ayur-vana", isText: true },
    { name: "Florame", isText: true },
    { name: "Terra Etica", isText: true },
    { name: "Najel", isText: true },
    { name: "Ayur-vana", isText: true },
    { name: "Florame", isText: true },
    { name: "Terra Etica", isText: true },
    { name: "Najel", isText: true }, // Duplicated for infinite scroll effect
];

export function BrandCarousel() {
    return (
        <section className="py-12 bg-white border-b border-stone-100 overflow-hidden">
            <div className="container mx-auto px-4 mb-6 text-center">
                <p className="text-sm font-semibold text-stone-400 uppercase tracking-widest">
                    Les marques qui nous font confiance
                </p>
            </div>
            
            <div className="relative w-full overflow-hidden flex" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
                <div className="flex animate-scroll whitespace-nowrap gap-16 md:gap-32 items-center justify-center py-4 w-max">
                    {brands.map((brand, i) => (
                        <div 
                            key={`brand-${i}`} 
                            className="flex items-center justify-center text-stone-400 hover:text-stone-800 transition-colors grayscale hover:grayscale-0"
                        >
                            <span className="font-serif text-3xl md:text-4xl font-bold tracking-tight opacity-70 hover:opacity-100 transition-opacity">
                                {brand.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Ensure you add this to tailwind.config.ts if not present:
// theme: { extend: { animation: { scroll: "scroll-x 20s linear infinite" }, keyframes: { "scroll-x": { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(calc(-50% - 2rem))" } } } } }
