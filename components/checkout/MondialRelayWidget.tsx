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
    const [selectedPoint, setSelectedPoint] = useState<RelayPoint | null>(null);

    // Brand code from environment variables
    const brandCode = process.env.NEXT_PUBLIC_MR_BRAND_CODE || "CC23L0MD";

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

                // Load Leaflet CSS + JS for the map
                await loadStylesheet("https://unpkg.com/leaflet@1.9.4/dist/leaflet.css");
                if (!(window as any).L) {
                    await loadScript("https://unpkg.com/leaflet@1.9.4/dist/leaflet.js");
                }

                // Load Mondial Relay widget - official CDN URL (no version needed, always latest)
                await loadScript(
                    "https://widget.mondialrelay.com/parcelshop-picker/jquery.plugin.mondialrelay.parcelshoppicker.min.js"
                );

                if (cancelled || !containerRef.current) return;

                // Clear previous widget content
                containerRef.current.innerHTML = "";

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const $ = window.jQuery as any;

                // Initialize the widget
                $(containerRef.current).MR_ParcelShopPicker({
                    Target: "#mr-selected-point",
                    Brand: brandCode,
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
                        const relay: RelayPoint = {
                            id: point.ID,
                            name: point.Nom,
                            address: point.Adresse1,
                            city: point.Ville,
                            postcode: point.CP,
                            country: point.Pays,
                        };
                        setSelectedPoint(relay);
                        onSelectRef.current(relay);
                    },
                });

                setIsLoading(false);
            } catch (err) {
                console.error("Failed to load Mondial Relay widget:", err);
                if (!cancelled) {
                    setError("Impossible de charger la carte Mondial Relay. Veuillez réessayer.");
                    setIsLoading(false);
                }
            }
        };

        loadWidget();

        return () => {
            cancelled = true;
        };
    }, [postcode, brandCode, retryCount]);

    const handleRetry = useCallback(() => {
        // Remove existing scripts so they reload fresh
        document.querySelectorAll('script[src*="mondialrelay"]').forEach(s => s.remove());
        setRetryCount((c) => c + 1);
    }, []);

    if (error) {
        return (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm space-y-3">
                <p>{error}</p>
                <button
                    onClick={handleRetry}
                    className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-800 rounded-md text-xs font-bold transition-colors"
                >
                    🔄 Réessayer
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {isLoading && (
                <div className="flex items-center justify-center py-8">
                    <div className="flex items-center gap-3 text-stone-500">
                        <span className="h-5 w-5 border-2 border-amber-600 border-t-transparent rounded-full animate-spin" />
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
            {selectedPoint && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm">
                    <p className="font-semibold text-green-800">✅ Point relais sélectionné :</p>
                    <p className="text-green-700">{selectedPoint.name}</p>
                    <p className="text-green-600">{selectedPoint.address}, {selectedPoint.postcode} {selectedPoint.city}</p>
                </div>
            )}
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
