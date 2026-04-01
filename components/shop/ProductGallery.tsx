"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface ProductGalleryProps {
    images: { src: string; name: string }[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(0);

    // Guard clause for empty images
    if (!images || images.length === 0) {
        return (
            <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-stone-100 flex items-center justify-center text-stone-400">
                No Image Available
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-gradient-to-br from-stone-50 to-stone-100 border border-stone-200 group">
                {/* Subtle pattern background */}
                <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, hsl(43 50% 55%) 1px, transparent 0)`,
                    backgroundSize: '24px 24px',
                }} />
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedImage}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="relative w-full h-full"
                    >
                        <Image
                            src={images[selectedImage].src}
                            alt={images[selectedImage].name}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-contain p-8 transition-transform duration-500 ease-out group-hover:scale-110"
                            priority
                        />
                    </motion.div>
                </AnimatePresence>
                {/* Premium corner accent */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary/20 rounded-tl-lg" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-primary/20 rounded-br-lg" />
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2 px-1">
                    {images.map((img, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedImage(index)}
                            className={cn(
                                "relative aspect-square w-20 flex-shrink-0 overflow-hidden rounded-xl transition-all duration-300",
                                selectedImage === index
                                    ? "border-2 border-primary ring-2 ring-primary/20 shadow-lg shadow-primary/10"
                                    : "border-2 border-stone-200 hover:border-primary/50 hover:shadow-md"
                            )}
                        >
                            <div className={cn(
                                "absolute inset-0 bg-gradient-to-br from-stone-50 to-stone-100",
                                selectedImage === index ? "opacity-0" : "opacity-50"
                            )} />
                            <Image
                                src={img.src}
                                alt={img.name}
                                fill
                                sizes="80px"
                                className="object-contain p-2"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
