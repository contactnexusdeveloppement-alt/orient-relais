"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function SmartProductSidebar() {
    return (
        <div className="sticky top-24 space-y-6">
            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
                <h4 className="font-serif font-bold text-stone-900 mb-4">Produit mentionné</h4>
                <div className="flex flex-col gap-4">
                    <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-stone-50">
                        <Image
                            src="/aleppo-soap-product.webp"
                            alt="Savon d'Alep"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <h5 className="font-semibold text-stone-900 text-sm">Savon d'Alep 40% Laurier</h5>
                        <p className="text-primary font-bold text-lg">12,90 €</p>
                    </div>
                    <Button className="w-full">
                        Ajouter au panier
                    </Button>
                </div>
            </div>

            <div className="bg-stone-900 text-stone-100 p-6 rounded-xl">
                <h4 className="font-serif font-bold text-xl mb-2">Besoin de conseils ?</h4>
                <p className="text-sm text-stone-400 mb-4">
                    Nos experts en Ayurvéda sont là pour vous guider.
                </p>
                <Link href="/contact" className="text-sm font-semibold underline hover:text-white">
                    Contactez-nous
                </Link>
            </div>
        </div>
    );
}
