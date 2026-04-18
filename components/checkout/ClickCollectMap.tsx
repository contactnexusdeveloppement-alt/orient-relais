"use client";

import { useEffect, useRef, useState } from "react";

// 48 avenue de Touraine, 78310 Maurepas (geocoded once, hard-coded to avoid
// hitting Nominatim on every page render)
const STORE_LAT = 48.75829;
const STORE_LNG = 1.9287;
const STORE_NAME = "Orient Relais";
const STORE_ADDRESS = "48 avenue de Touraine, 78310 Maurepas";

declare global {
    interface Window {
        L?: unknown;
    }
}

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

export function ClickCollectMap() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        let mapInstance: any = null;

        (async () => {
            try {
                await loadStylesheet("https://unpkg.com/leaflet@1.9.4/dist/leaflet.css");
                if (!window.L) {
                    await loadScript("https://unpkg.com/leaflet@1.9.4/dist/leaflet.js");
                }
                if (cancelled || !containerRef.current) return;

                const L = window.L as any;

                containerRef.current.innerHTML = "";
                const map = L.map(containerRef.current, {
                    center: [STORE_LAT, STORE_LNG],
                    zoom: 15,
                    scrollWheelZoom: false,
                });
                mapInstance = map;

                L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                    attribution:
                        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                    maxZoom: 19,
                }).addTo(map);

                // Red marker (DivIcon, no external image = no CSP img-src work needed)
                const redIcon = L.divIcon({
                    className: "",
                    html:
                        '<div style="width:28px;height:40px;position:relative;transform:translate(-14px,-40px);">' +
                        '<div style="position:absolute;inset:0;background:#dc2626;clip-path:path(\'M14 0 C6 0 0 6 0 14 C0 24 14 40 14 40 C14 40 28 24 28 14 C28 6 22 0 14 0 Z\');box-shadow:0 2px 6px rgba(0,0,0,0.35);"></div>' +
                        '<div style="position:absolute;left:10px;top:9px;width:8px;height:8px;border-radius:50%;background:#fff;"></div>' +
                        "</div>",
                    iconSize: [28, 40],
                    iconAnchor: [14, 40],
                });

                L.marker([STORE_LAT, STORE_LNG], { icon: redIcon })
                    .addTo(map)
                    .bindPopup(
                        `<strong>${STORE_NAME}</strong><br/>${STORE_ADDRESS}`
                    )
                    .openPopup();

                setIsLoading(false);

                // Leaflet miscalculates tile coverage when the container is
                // toggled from display:none (or hidden) to block; force a
                // resize after paint so all tiles load correctly.
                requestAnimationFrame(() => {
                    if (!cancelled && mapInstance) {
                        mapInstance.invalidateSize();
                    }
                });
            } catch (err) {
                console.error("Failed to load Click & Collect map:", err);
                if (!cancelled) {
                    setError("La carte n'a pas pu se charger. L'adresse reste disponible ci-dessus.");
                    setIsLoading(false);
                }
            }
        })();

        return () => {
            cancelled = true;
            if (mapInstance) {
                try { mapInstance.remove(); } catch { /* noop */ }
            }
        };
    }, []);

    return (
        <div className="space-y-3">
            {error && (
                <p className="text-xs text-stone-500 italic">{error}</p>
            )}
            <div className="relative">
                <div
                    ref={containerRef}
                    className="rounded-lg overflow-hidden border border-stone-200"
                    style={{ height: 320, visibility: error ? "hidden" : "visible" }}
                    aria-label={`Carte — ${STORE_ADDRESS}`}
                />
                {isLoading && !error && (
                    <div className="absolute inset-0 flex items-center justify-center bg-stone-50/80 backdrop-blur-sm rounded-lg border border-stone-200 z-[500]">
                        <div className="flex items-center gap-3 text-stone-500 text-sm">
                            <span className="h-4 w-4 border-2 border-amber-600 border-t-transparent rounded-full animate-spin" />
                            Chargement de la carte...
                        </div>
                    </div>
                )}
            </div>
            <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${STORE_LAT},${STORE_LNG}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
            >
                Itinéraire Google Maps &rarr;
            </a>
        </div>
    );
}
