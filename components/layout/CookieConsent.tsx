"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CONSENT_GRANTED_EVENT } from "@/components/analytics/GoogleAnalytics";

export function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already made a choice
        const consent = localStorage.getItem("cookieConsent");
        if (consent === null) {
            // Show banner after a short delay for better UX
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("cookieConsent", "true");
        // Signale au composant GoogleAnalytics de charger gtag.js à chaud —
        // avant ce consentement, AUCUN script analytics n'est présent sur la
        // page (exigence CNIL : pas de traceur avant accord explicite).
        window.dispatchEvent(new Event(CONSENT_GRANTED_EVENT));
        setIsVisible(false);
    };

    const handleDecline = () => {
        // Refus réellement effectif : GoogleAnalytics ne se montera jamais,
        // gtag.js n'est pas chargé, aucun cookie _ga n'est déposé.
        localStorage.setItem("cookieConsent", "false");
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className={cn(
            "fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6",
            "bg-stone-900 border-t border-stone-800 shadow-2xl",
            "animate-in slide-in-from-bottom duration-500"
        )}>
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
                <div className="flex-1 text-center md:text-left">
                    <h3 className="text-lg font-serif font-bold text-white mb-2">Respect de votre vie privée</h3>
                    <p className="text-sm text-stone-400 leading-relaxed max-w-2xl">
                        Nous utilisons des cookies de mesure d&apos;audience (Google Analytics) pour améliorer votre expérience.
                        Aucun cookie de suivi n&apos;est déposé tant que vous n&apos;avez pas accepté.
                        Refuser n&apos;affecte pas votre navigation.{" "}
                        <Link href="/confidentialite" className="underline hover:text-white transition-colors">
                            En savoir plus
                        </Link>
                    </p>
                </div>
                <div className="flex gap-3 shrink-0">
                    <Button
                        variant="outline"
                        onClick={handleDecline}
                        className="bg-transparent text-white border-stone-600 hover:bg-stone-800 hover:text-white"
                    >
                        Refuser
                    </Button>
                    <Button
                        onClick={handleAccept}
                        className="font-medium"
                    >
                        Accepter
                    </Button>
                </div>
            </div>
        </div>
    );
}
