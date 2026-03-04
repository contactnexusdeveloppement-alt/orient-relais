"use client";

import Image from "next/image";
import { Minus, Plus, ShoppingBag, Trash2, Sparkles, ArrowRight, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { useCart } from "@/context/CartContext";

export function CartDrawer() {
    const { items, removeItem, updateQuantity, cartCount, subtotal, isDrawerOpen, setIsDrawerOpen } = useCart();

    const freeShippingThreshold = 39;
    const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
    const progress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

    return (
        <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative hover:text-primary hover:bg-stone-100">
                    <ShoppingBag className="h-5 w-5" />
                    {cartCount > 0 && (
                        <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white animated-bounce">
                            {cartCount}
                        </span>
                    )}
                    <span className="sr-only">Panier</span>
                </Button>
            </SheetTrigger>
            <SheetContent className="w-[380px] sm:w-[480px] flex flex-col p-0">
                <SheetHeader className="px-6 pt-6 pb-2">
                    <SheetTitle className="font-serif text-2xl font-bold flex items-center justify-between">
                        <span>Mon Panier</span>
                        <span className="text-sm font-sans font-normal text-stone-500">
                            ({cartCount} articles)
                        </span>
                    </SheetTitle>
                </SheetHeader>

                {/* Free Shipping Progress */}
                <div className="px-6 py-4 bg-gradient-to-r from-amber-50/50 to-stone-50 border-y border-primary/10">
                    <div className="flex justify-between text-sm mb-2">
                        {remainingForFreeShipping > 0 ? (
                            <span className="text-stone-700 flex items-center gap-1.5">
                                <Package className="h-4 w-4 text-primary" />
                                Plus que <strong className="text-primary">{remainingForFreeShipping.toFixed(2)}€</strong> pour la livraison offerte !
                            </span>
                        ) : (
                            <span className="text-emerald-700 font-medium flex items-center gap-1.5">
                                <Sparkles className="h-4 w-4" /> Livraison offerte débloquée !
                            </span>
                        )}
                    </div>
                    <Progress value={progress} className="h-2 bg-stone-200 [&>div]:bg-gradient-to-r [&>div]:from-primary [&>div]:to-amber-400" />
                </div>

                <ScrollArea className="flex-1 px-6">
                    <div className="flex flex-col gap-6 py-6">
                        {items.map((item) => (
                            <div key={`${item.id}-${item.variant}`} className="flex gap-4">
                                {/* Image */}
                                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-stone-100 border border-stone-200">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                {/* Info */}
                                <div className="flex flex-1 flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-serif font-bold text-stone-900 text-sm line-clamp-1">{item.title}</h4>
                                            <button onClick={() => removeItem(item.id, item.variant)} className="text-stone-400 hover:text-red-500">
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                        <p className="text-xs text-stone-500 mt-1">{item.variant}</p>
                                    </div>

                                    <div className="flex justify-between items-end">
                                        <div className="flex items-center border border-stone-200 rounded-md">
                                            <button onClick={() => updateQuantity(item.id, -1, item.variant)} className="h-7 w-7 flex items-center justify-center text-stone-500 hover:bg-stone-50">
                                                <Minus className="h-3 w-3" />
                                            </button>
                                            <span className="w-8 text-center text-sm font-medium text-stone-900">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, 1, item.variant)} className="h-7 w-7 flex items-center justify-center text-stone-500 hover:bg-stone-50">
                                                <Plus className="h-3 w-3" />
                                            </button>
                                        </div>
                                        <div className="font-bold text-stone-900">
                                            {(item.price * item.quantity).toFixed(2)}€
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {items.length === 0 && (
                            <div className="text-center py-16 text-stone-500">
                                <div className="h-20 w-20 mx-auto mb-6 rounded-full bg-stone-100 flex items-center justify-center">
                                    <ShoppingBag className="h-8 w-8 text-stone-400" />
                                </div>
                                <p className="font-serif text-lg font-bold text-stone-800 mb-2">Votre panier est vide</p>
                                <p className="text-sm mb-6">Découvrez nos produits naturels et authentiques</p>
                                <SheetClose asChild>
                                    <Button className="bg-primary hover:bg-primary/90 text-white" asChild>
                                        <Link href="/boutique">
                                            Explorer la boutique <ArrowRight className="h-4 w-4 ml-2" />
                                        </Link>
                                    </Button>
                                </SheetClose>
                            </div>
                        )}
                    </div>
                </ScrollArea>

                {/* Footer Actions */}
                {items.length > 0 && (
                    <div className="p-6 border-t border-primary/10 bg-gradient-to-t from-stone-50 to-white space-y-4 shadow-[0_-8px_20px_-5px_rgba(0,0,0,0.05)]">
                        <div className="space-y-3">
                            <div className="flex justify-between text-lg font-bold text-stone-900">
                                <span>Sous-total</span>
                                <span className="text-primary">{subtotal.toFixed(2)} €</span>
                            </div>
                            <p className="text-xs text-stone-500 text-center">
                                Taxes et frais d&apos;expédition calculés lors du paiement
                            </p>
                        </div>
                        <SheetClose asChild>
                            <Button asChild className="w-full h-12 text-base font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 rounded-xl">
                                <Link href="/checkout" className="flex items-center justify-center gap-2">
                                    Procéder au paiement <ArrowRight className="h-4 w-4" />
                                </Link>
                            </Button>
                        </SheetClose>
                        <SheetClose asChild>
                            <Button variant="ghost" className="w-full text-stone-500 hover:text-primary text-sm" asChild>
                                <Link href="/boutique">Continuer mes achats</Link>
                            </Button>
                        </SheetClose>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
}
