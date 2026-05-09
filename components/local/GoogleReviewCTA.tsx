import { Star } from "lucide-react";

interface GoogleReviewCTAProps {
    /** "full" = large card with stars and copy, "compact" = inline pill. */
    variant?: "full" | "compact";
    className?: string;
    /** Override the default copy on the full variant. */
    title?: string;
    /** Override the default body on the full variant. */
    body?: string;
}

/**
 * Call-to-action that drops the visitor straight onto the "leave a review"
 * panel of our Google Business Profile.
 *
 * Resolution priority for the destination URL:
 *   1. NEXT_PUBLIC_GBP_PLACE_ID   ->  search.google.com/local/writereview
 *      (the only URL that opens the rating form pre-loaded — best UX)
 *   2. NEXT_PUBLIC_GBP_CID        ->  google.com/maps?cid=...
 *      (opens the GBP profile; user needs one extra tap to write a review)
 *   3. Fallback                    ->  Maps search by name + address
 *      (still works, two taps to reach the review form)
 *
 * Until either env var is set we ship the fallback so nothing breaks.
 */
function buildReviewUrl(): string {
    const placeId = process.env.NEXT_PUBLIC_GBP_PLACE_ID;
    if (placeId) {
        return `https://search.google.com/local/writereview?placeid=${placeId}`;
    }
    const cid = process.env.NEXT_PUBLIC_GBP_CID;
    if (cid) {
        return `https://www.google.com/maps?cid=${cid}`;
    }
    return "https://www.google.com/maps/search/?api=1&query=Orient+Relais+48+avenue+de+Touraine+Maurepas";
}

export function GoogleReviewCTA({
    variant = "full",
    className = "",
    title = "Votre avis compte vraiment pour nous",
    body = "Si votre passage chez Orient Relais s'est bien passé, prenez 30 secondes pour laisser un avis sur Google. C'est ce qui nous aide le plus à faire connaître la boutique.",
}: GoogleReviewCTAProps) {
    const url = buildReviewUrl();

    if (variant === "compact") {
        return (
            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline ${className}`}
            >
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                Laissez-nous un avis Google
            </a>
        );
    }

    return (
        <div
            className={`rounded-2xl border border-amber-200/70 bg-gradient-to-br from-amber-50 to-stone-50 p-6 md:p-8 text-center ${className}`}
        >
            <div className="flex items-center justify-center gap-1 mb-3" aria-hidden="true">
                {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                ))}
            </div>
            <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">
                {title}
            </h3>
            <p className="text-sm text-stone-600 mb-5 max-w-md mx-auto leading-relaxed">
                {body}
            </p>
            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors shadow-md shadow-primary/20"
            >
                <Star className="h-4 w-4" aria-hidden="true" />
                Laisser un avis Google
            </a>
        </div>
    );
}
