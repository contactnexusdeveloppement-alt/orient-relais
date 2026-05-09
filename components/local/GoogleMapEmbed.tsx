import { MapPin } from "lucide-react";

interface GoogleMapEmbedProps {
    /**
     * Google Place ID. If absent, falls back to a query-based static link card
     * (so the page never breaks when the env var isn't set yet).
     */
    placeId?: string;
    /**
     * Free-form query used for the link fallback.
     * Defaults to the boutique address.
     */
    query?: string;
    /** Embed iframe height in px. Default 350. */
    height?: number;
    /** Wrapper className. */
    className?: string;
    /** Localized iframe / link aria-label. */
    ariaLabel?: string;
}

/**
 * Embedded Google Map that gracefully degrades when no API key or Place ID
 * is configured.
 *
 * Required env vars (all `NEXT_PUBLIC_*` because the iframe URL is rendered
 * client-side after hydration, but they're read at build time on the server,
 * so they must ship in the bundle):
 *   - NEXT_PUBLIC_GBP_PLACE_ID    Google Business Profile Place ID
 *   - NEXT_PUBLIC_GMAPS_EMBED_KEY Maps Embed API key (restricted to our domains)
 *
 * If either is missing we render a styled link to Google Maps instead of an
 * empty iframe — that way the page still works the moment the code lands,
 * and "lights up" with the real map once env vars are populated in Vercel.
 */
export function GoogleMapEmbed({
    placeId = process.env.NEXT_PUBLIC_GBP_PLACE_ID,
    query = "48+avenue+de+Touraine+78310+Maurepas",
    height = 350,
    className = "",
    ariaLabel = "Carte Google Maps de la boutique Orient Relais à Maurepas",
}: GoogleMapEmbedProps) {
    const embedKey = process.env.NEXT_PUBLIC_GMAPS_EMBED_KEY;
    const canEmbed = Boolean(placeId && embedKey);

    if (!canEmbed) {
        return (
            <div className={`rounded-2xl border border-stone-200 bg-stone-50 ${className}`}>
                <a
                    href={`https://www.google.com/maps/search/?api=1&query=${query}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center text-center p-12 text-stone-700 hover:text-primary transition-colors rounded-2xl"
                    style={{ minHeight: height }}
                    aria-label={ariaLabel}
                >
                    <MapPin className="h-10 w-10 text-primary mb-3" aria-hidden="true" />
                    <span className="font-serif text-lg font-bold mb-1">
                        Voir sur Google Maps
                    </span>
                    <span className="text-sm text-stone-500">
                        48 avenue de Touraine, 78310 Maurepas
                    </span>
                    <span className="mt-3 inline-flex items-center text-xs text-primary font-medium underline">
                        Ouvrir l&apos;itinéraire →
                    </span>
                </a>
            </div>
        );
    }

    const src = `https://www.google.com/maps/embed/v1/place?key=${embedKey}&q=place_id:${placeId}&language=fr&region=FR`;

    return (
        <div className={`rounded-2xl overflow-hidden border border-stone-200 ${className}`}>
            <iframe
                src={src}
                width="100%"
                height={height}
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={ariaLabel}
            />
        </div>
    );
}
