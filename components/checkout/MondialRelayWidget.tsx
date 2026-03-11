"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export interface RelayPoint {
    id: string;
    name: string;
    address: string;
    city: string;
    postcode: string;
    country: string;
}

interface MondialRelayWidgetProps {
    postcode?: string;
    onSelect: (point: RelayPoint) => void;
}

declare global {
    interface Window {
        jQuery: unknown;
        $: unknown;
    }
}

export function MondialRelayWidget({ postcode, onSelect }: MondialRelayWidgetProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const onSelectRef = useRef(onSelect);
    onSelectRef.current = onSelect;
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [retryCount, setRetryCount] = useState(0);
    // Production Mondial Relay credentials - CC23L0MD is the real account code
    const brandCode = process.env.NEXT_PUBLIC_MR_BRAND_CODE || "CC23L0MD";
    const marque = process.env.NEXT_PUBLIC_MR_MARQUE || "CC";

    useEffect(() => {
        let cancelled = false;

        const loadWidget = async () => {
            setIsLoading(true);
            setError(null);

            try {
                // Load jQuery if not present
                if (!window.jQuery) {
                    await loadScript("https://code.jquery.com/jquery-3.7.1.min.js");
                }

                // Load Mondial Relay widget
                await loadScript("https://widget.mondialrelay.com/parcelshop-picker/v4_0/MRParcelShopPicker.min.js");
                await loadStylesheet("https://widget.mondialrelay.com/parcelshop-picker/v4_0/MRParcelShopPicker.min.css");

                if (cancelled || !containerRef.current) return;

                // Clear previous widget content
                containerRef.current.innerHTML = "";

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const $ = window.jQuery as any;

                // Initialize the widget with correct v4 parameters
                // Brand = code enseigne complet (CC23L0MD)
                // Ref: https://widget.mondialrelay.com/parcelshop-picker/v4_0/
                $(containerRef.current).MR_ParcelShopPicker({
                    Target: "#mr-selected-point",
                    Brand: brandCode,       // Code enseigne: CC23L0MD
                    Country: "FR",
                    PostCode: postcode || "75000",
                    ColLivMod: "24R",
                    NbResults: "7",
                    ShowResultsOnMap: true,
                    OnParcelShopSelected: (point: {
                        ID: string;
                        Nom: string;
                        Adresse1: string;
                        Ville: string;
                        CP: string;
                        Pays: string;
                    }) => {
                        onSelectRef.current({
                            id: point.ID,
                            name: point.Nom,
                            address: point.Adresse1,
                            city: point.Ville,
                            postcode: point.CP,
                            country: point.Pays,
                        });
                    },
                });

                setIsLoading(false);
            } catch (err) {
                console.error("Failed to load Mondial Relay widget:", err);
                if (!cancelled) {
                    setError("Impossible de charger la carte Mondial Relay.");
                    setIsLoading(false);
                }
            }
        };

        loadWidget();

        return () => {
            cancelled = true;
        };
    }, [postcode, brandCode, retryCount]);

    if (error) {
        return (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm space-y-3">
                <p>{error}</p>
                <button
                    onClick={() => setRetryCount((c) => c + 1)}
                    className="text-xs font-bold text-red-700 underline hover:no-underline"
                >
                    Réessayer
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {isLoading && (
                <div className="flex items-center justify-center py-8">
                    <div className="flex items-center gap-3 text-stone-500">
                        <span className="h-5 w-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        <span className="text-sm">Chargement des points relais...</span>
                    </div>
                </div>
            )}
            <div
                ref={containerRef}
                id="mr-widget-container"
                className="rounded-lg overflow-hidden border border-stone-200"
                style={{ minHeight: isLoading ? 0 : 400 }}
            />
            <input type="hidden" id="mr-selected-point" />
        </div>
    );
}


// Helper: load a script dynamically
function loadScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
            resolve();
            return;
        }
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
        document.head.appendChild(script);
    });
}

// Helper: load a stylesheet dynamically
function loadStylesheet(href: string): Promise<void> {
    return new Promise((resolve, reject) => {
        if (document.querySelector(`link[href="${href}"]`)) {
            resolve();
            return;
        }
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        link.onload = () => resolve();
        link.onerror = () => reject(new Error(`Failed to load stylesheet: ${href}`));
        document.head.appendChild(link);
    });
}
