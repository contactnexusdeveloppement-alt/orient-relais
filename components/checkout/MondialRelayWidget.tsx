"use client";

import { useEffect, useRef, useState } from "react";

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

export function MondialRelayWidget({ postcode, onSelect }: MondialRelayWidgetProps) {
    const onSelectRef = useRef(onSelect);
    onSelectRef.current = onSelect;
    const [selectedPoint, setSelectedPoint] = useState<RelayPoint | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const brandCode = process.env.NEXT_PUBLIC_MR_BRAND_CODE || "CC23L0MD";
    const cp = postcode || "75000";

    // Build the official Mondial Relay iframe URL
    // Using the v4 widget served as a standalone page
    const iframeUrl = `https://widget.mondialrelay.com/parcelshop-picker/v4_0/fr/fr/compact.html` +
        `?Brand=${brandCode}` +
        `&Country=FR` +
        `&PostCode=${cp}` +
        `&ColLivMod=24R` +
        `&NbResults=7` +
        `&ShowResultsOnMap=1` +
        `&Target=_MR_Selected`;

    useEffect(() => {
        // Listen for messages from the Mondial Relay iframe
        const handleMessage = (event: MessageEvent) => {
            // Accept messages from Mondial Relay widget domain
            if (!event.origin.includes("mondialrelay.com")) return;

            try {
                const data = event.data;
                // The widget sends relay point data via postMessage
                if (data && (data.ID || data.MR_Selected)) {
                    const point = data.ID ? data : data.MR_Selected;
                    if (point && point.ID) {
                        const relay: RelayPoint = {
                            id: point.ID,
                            name: point.Nom || point.Name || "",
                            address: point.Adresse1 || point.Address || "",
                            city: point.Ville || point.City || "",
                            postcode: point.CP || point.Postcode || "",
                            country: point.Pays || point.Country || "FR",
                        };
                        setSelectedPoint(relay);
                        onSelectRef.current(relay);
                    }
                }
            } catch {
                // Ignore parse errors
            }
        };

        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, []);

    return (
        <div className="space-y-4">
            <div className="relative rounded-lg overflow-hidden border border-stone-200 bg-stone-50">
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-stone-50 z-10">
                        <div className="flex items-center gap-3 text-stone-500">
                            <span className="h-5 w-5 border-2 border-amber-600 border-t-transparent rounded-full animate-spin" />
                            <span className="text-sm">Chargement des points relais...</span>
                        </div>
                    </div>
                )}
                <iframe
                    src={iframeUrl}
                    width="100%"
                    height="450"
                    frameBorder="0"
                    scrolling="no"
                    style={{ display: "block", minHeight: 450 }}
                    onLoad={() => setIsLoading(false)}
                    onError={() => setIsLoading(false)}
                    title="Choisir un point Mondial Relay"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
            </div>
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
