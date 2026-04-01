import Image from "next/image";
import { cn } from "@/lib/utils";

interface CategoryHeroSplitProps {
    title: string;
    description: string;
    image: string;
}

export function CategoryHeroSplit({ title, description, image }: CategoryHeroSplitProps) {
    return (
        <div className="w-full flex flex-col lg:flex-row min-h-[50vh] lg:h-[60vh]">
            {/* Image Side (Left on Desktop, Top on Mobile) */}
            <div className="relative w-full lg:w-1/2 h-[40vh] lg:h-full overflow-hidden group">
                <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                />
                {/* Subtle Overlay */}
                <div className="absolute inset-0 bg-stone-900/10" />
            </div>

            {/* Content Side (Right on Desktop, Bottom on Mobile) */}
            <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center items-center text-center p-8 md:p-16 lg:p-24">
                <div className="max-w-xl">
                    <span className="inline-block mb-6 px-3 py-1 border border-primary/20 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                        Collection Exclusive
                    </span>
                    <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
                        {title}
                    </h1>
                    <div className="w-16 h-1 bg-primary/20 mx-auto mb-8" />
                    <p className="text-stone-600 text-lg leading-relaxed md:text-xl font-light">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
}
