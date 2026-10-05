import Link from "next/link";
import type { Metadata } from "next";
import { Truck, MapPin, Phone, Clock, ShoppingBag, Leaf, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { jsonLdScript } from "@/lib/json-ld";
import { GoogleMapEmbed } from "@/components/local/GoogleMapEmbed";

// Resolve the Maps URL that the schema's `hasMap` field will point to.
// Same fallback chain as the layout's central business entity, so both
// schemas agree on the canonical Map URL once env vars land.
const GBP_PLACE_ID = process.env.NEXT_PUBLIC_GBP_PLACE_ID;
const GBP_CID = process.env.NEXT_PUBLIC_GBP_CID;
const HAS_MAP_URL = GBP_CID
    ? `https://www.google.com/maps?cid=${GBP_CID}`
    : GBP_PLACE_ID
        ? `https://www.google.com/maps/place/?q=place_id:${GBP_PLACE_ID}`
        : "https://www.google.com/maps/search/?api=1&query=48+avenue+de+Touraine+78310+Maurepas";

export const metadata: Metadata = {
    title: "Boutique Bio à Maurepas (78310) — Savons d'Alep, Cosmétiques & Compléments Bio",
    description:
        "Orient Relais, boutique bio à Maurepas (78310) au 48 avenue de Touraine. Savons d'Alep Najel, huiles essentielles bio Terra Etica, cosmétiques naturels et compléments ayurvédiques. Click & Collect gratuit, livraison rapide en Yvelines.",
    alternates: { canonical: "/boutique-bio-maurepas" },
    openGraph: {
        title: "Boutique Bio à Maurepas — Orient Relais (Yvelines)",
        description:
            "Magasin bio à Maurepas (Yvelines) : savons d'Alep, huiles essentielles bio, cosmétiques naturels, compléments ayurvédiques. Retrait gratuit en boutique.",
        url: "https://www.orient-relais.com/boutique-bio-maurepas",
        type: "website",
    },
};

const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.orient-relais.com" },
        { "@type": "ListItem", position: 2, name: "Boutique Bio Maurepas", item: "https://www.orient-relais.com/boutique-bio-maurepas" },
    ],
};

const placeJsonLd = {
    "@context": "https://schema.org",
    "@type": ["Store", "HealthAndBeautyBusiness"],
    "@id": "https://www.orient-relais.com/boutique-bio-maurepas#place",
    name: "Orient Relais — Boutique Bio Maurepas",
    description:
        "Magasin bio à Maurepas (78310) : savons d'Alep, huiles essentielles, cosmétiques bio, compléments ayurvédiques. Click & Collect gratuit du lundi au vendredi.",
    url: "https://www.orient-relais.com/boutique-bio-maurepas",
    telephone: "+33699556977",
    image: "https://www.orient-relais.com/images/Logo_respon.png",
    priceRange: "€€",
    paymentAccepted: "Cash, Credit Card, Apple Pay, Google Pay",
    address: {
        "@type": "PostalAddress",
        streetAddress: "48 avenue de Touraine",
        addressLocality: "Maurepas",
        postalCode: "78310",
        addressRegion: "Yvelines",
        addressCountry: "FR",
    },
    geo: { "@type": "GeoCoordinates", latitude: 48.7642, longitude: 1.9393 },
    hasMap: HAS_MAP_URL,
    openingHoursSpecification: [
        {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "09:00",
            closes: "18:00",
        },
    ],
    areaServed: [
        { "@type": "City", name: "Maurepas" },
        { "@type": "City", name: "Coignières" },
        { "@type": "City", name: "Élancourt" },
        { "@type": "City", name: "La Verrière" },
        { "@type": "City", name: "Saint-Quentin-en-Yvelines" },
        { "@type": "City", name: "Plaisir" },
        { "@type": "City", name: "Trappes" },
    ],
};

// FAQ affichée sur la page ET reprise en données structurées (Google exige que
// le contenu FAQPage soit visible). Chaque réponse doit rester vérifiable :
// catalogue réel, pas de livraison promise hors de France (le checkout est FR).
const MAUREPAS_FAQ = [
    {
        q: "Où se trouve la boutique Orient Relais à Maurepas ?",
        a: "Notre boutique bio est située au 48 avenue de Touraine, 78310 Maurepas (Yvelines), à deux pas de Coignières et de Saint-Quentin-en-Yvelines. Ouverte du lundi au vendredi de 9 h à 18 h.",
    },
    {
        q: "Quels produits trouve-t-on chez Orient Relais ?",
        a: "Environ 80 références : savons d'Alep authentiques Najel, huiles essentielles (dont une gamme bio Terra Etica), cosmétiques naturels dont plusieurs certifiés Cosmos Organic, compléments ayurvédiques Ayur-vana, huile de nigelle, miel, épicerie orientale et accessoires pour le bain. Les produits certifiés bio portent la mention dans leur nom.",
    },
    {
        q: "Le Click & Collect est-il gratuit ?",
        a: "Oui, le retrait Click & Collect en boutique à Maurepas est entièrement gratuit, quel que soit le montant de votre commande. Vous commandez en ligne et récupérez votre colis sous 24 h ouvrées au 48 avenue de Touraine.",
    },
    {
        q: "Livrez-vous en dehors des Yvelines ?",
        a: "Oui, nous livrons partout en France métropolitaine via Colissimo (24-48 h) et Mondial Relay (2-5 jours). Livraison offerte à partir de 39 € d'achat.",
    },
    {
        q: "Comment accéder à la boutique en transports ?",
        a: "Depuis Paris : train jusqu'à La Verrière (lignes N ou U), puis bus. En voiture, la boutique est à quelques minutes de la N10. Depuis Saint-Quentin-en-Yvelines : environ 10 min en voiture.",
    },
] as const;

const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: MAUREPAS_FAQ.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
    })),
};

export default function BoutiqueBioMaurepasPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: jsonLdScript([breadcrumbJsonLd, placeJsonLd, faqJsonLd]) }}
            />

            <nav aria-label="Fil d'Ariane" className="text-sm text-stone-500 mb-6 flex items-center gap-2">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span aria-hidden>›</span>
                <span className="text-stone-700">Boutique Bio Maurepas</span>
            </nav>

            <header className="max-w-3xl mb-12">
                <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary bg-primary/5 px-4 py-1.5 rounded-full border border-primary/10 mb-4">
                    <Leaf className="h-4 w-4" /> Magasin bio à Maurepas (78310)
                </span>
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-stone-900 mb-4">
                    Boutique Bio à Maurepas (Yvelines)
                </h1>
                <p className="text-stone-600 text-lg leading-relaxed">
                    Bienvenue chez <strong>Orient Relais</strong>, votre boutique bio de proximité au
                    {" "}<strong>48 avenue de Touraine, 78310 Maurepas</strong>. Nous sélectionnons depuis 2024
                    des savons d&apos;Alep authentiques, des huiles essentielles bio, des cosmétiques
                    naturels et des compléments ayurvédiques pour les habitants de
                    Saint-Quentin-en-Yvelines, Coignières, Élancourt, Plaisir, La Verrière, Trappes
                    et toute l&apos;agglomération SQY. Achat en ligne ou retrait gratuit en magasin.
                </p>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                <div className="bg-gradient-to-br from-amber-50/70 to-stone-50 border border-primary/10 rounded-2xl p-6">
                    <h2 className="font-serif text-xl font-bold text-stone-900 mb-3 flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" /> Notre boutique physique
                    </h2>
                    <p className="text-stone-700 mb-3">
                        <strong>48 avenue de Touraine</strong><br />
                        78310 Maurepas (Yvelines)
                    </p>
                    <p className="text-stone-600 text-sm mb-4">
                        Ouvert du lundi au vendredi, 9 h–18 h.
                        Téléphone : <a href="tel:+33699556977" className="text-primary hover:underline">06 99 55 69 77</a>
                    </p>
                    <a
                        href="https://www.google.com/maps/search/?api=1&query=48+avenue+de+Touraine+78310+Maurepas"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                    >
                        <MapPin className="h-4 w-4" /> Itinéraire Google Maps
                    </a>
                </div>
                <div className="bg-gradient-to-br from-stone-50 to-amber-50/50 border border-primary/10 rounded-2xl p-6">
                    <h2 className="font-serif text-xl font-bold text-stone-900 mb-3 flex items-center gap-2">
                        <ShoppingBag className="h-5 w-5 text-primary" /> Click &amp; Collect gratuit
                    </h2>
                    <p className="text-stone-700 mb-3">
                        Commandez en ligne, récupérez votre commande sous <strong>24 h ouvrées</strong>
                        en boutique sans aucun frais de port.
                    </p>
                    <p className="text-stone-600 text-sm mb-4">
                        Idéal pour les habitants de Maurepas, Coignières, Élancourt, Saint-Quentin-en-Yvelines,
                        Plaisir, La Verrière, Trappes et Versailles.
                    </p>
                    <Link href="/boutique" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                        <ShoppingBag className="h-4 w-4" /> Voir le catalogue
                    </Link>
                </div>
            </section>

            <section aria-labelledby="map-title" className="mb-16">
                <h2 id="map-title" className="font-serif text-2xl md:text-3xl font-bold text-stone-900 mb-4">
                    Nous trouver à Maurepas
                </h2>
                <p className="text-stone-600 mb-6 max-w-2xl">
                    Boutique située au <strong>48 avenue de Touraine, 78310 Maurepas</strong>,
                    à quelques minutes de la N10.
                </p>
                <GoogleMapEmbed
                    height={400}
                    ariaLabel="Carte Google Maps — Orient Relais, 48 avenue de Touraine, 78310 Maurepas"
                />
            </section>

            <section className="prose prose-stone max-w-3xl mb-16">
                <h2>Une boutique bio spécialisée dans le 78</h2>
                <p>
                    Orient Relais n&apos;est pas un magasin bio généraliste. Nous avons fait le choix
                    de la <strong>spécialisation</strong> autour de quatre univers complémentaires :
                </p>
                <ul>
                    <li>
                        <strong><Link href="/categorie/savons-dalep">Savons d&apos;Alep</Link></strong>
                        {" "}— Najel, saponifiés au chaudron et séchés à l&apos;air libre. Du savon
                        liquide à 5 % de laurier (usage quotidien) au savon traditionnel à 40 % (peaux grasses).
                    </li>
                    <li>
                        <strong><Link href="/categorie/huiles-essentielles">Huiles essentielles bio</Link></strong>
                        {" "}— dont une gamme bio Terra Etica (thym, ravintsara, niaouli, cyprès…).
                    </li>
                    <li>
                        <strong><Link href="/categorie/soins-et-beaute">Cosmétiques naturels et bio</Link></strong>
                        {" "}— soins visage, baumes, gommages, huiles végétales, dont plusieurs références certifiées Cosmos Organic.
                    </li>
                    <li>
                        <strong><Link href="/categorie/complements">Compléments ayurvédiques</Link></strong>
                        {" "}— moringa, curcuma, guduchi, shilajit… Marque Ayur-vana, dont de nombreuses références bio.
                    </li>
                </ul>
                <h2>Une boutique de proximité pour tout le 78</h2>
                <p>
                    Que vous habitiez <strong>Maurepas</strong>, <strong>Coignières</strong>,
                    {" "}<strong>Élancourt</strong>, <strong>Saint-Quentin-en-Yvelines</strong>, <strong>Plaisir</strong>,
                    {" "}<strong>La Verrière</strong> ou <strong>Trappes</strong>, la boutique est à quelques
                    minutes de chez vous. Ce que nous vous proposons :
                </p>
                <ol>
                    <li>Une sélection resserrée : chaque marque est choisie pour sa transparence sur ses ingrédients et son mode de fabrication.</li>
                    <li>Du conseil en boutique : quel pourcentage de laurier choisir, quelle huile essentielle pour quel usage.</li>
                    <li>Le Click &amp; Collect gratuit : pas de frais de port quand on habite à côté.</li>
                </ol>
                <h2>Marques distribuées</h2>
                <p>
                    Nous distribuons notamment{" "}
                    <Link href="/marques/najel">Najel</Link> pour les savons d&apos;Alep et les cosmétiques,
                    {" "}<Link href="/marques/terra-etica">Terra Etica</Link> pour les huiles essentielles,
                    {" "}<Link href="/marques/ayur-vana">Ayur-vana</Link> pour les compléments ayurvédiques,
                    Graine Sauvage pour les huiles en capsules (nigelle, onagre-bourrache) et Miel
                    Lacourcelle pour les miels.
                </p>
            </section>

            <section aria-labelledby="faq-title-maurepas" className="max-w-3xl mb-16">
                <h2 id="faq-title-maurepas" className="font-serif text-2xl md:text-3xl font-bold text-stone-900 mb-6">
                    Questions fréquentes
                </h2>
                <div className="space-y-3">
                    {MAUREPAS_FAQ.map(({ q, a }) => (
                        <details
                            key={q}
                            className="group bg-white border border-stone-200 rounded-2xl px-5 py-4 hover:border-primary/30 transition-all open:border-primary/40"
                        >
                            <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-serif text-base md:text-lg font-semibold text-stone-900 group-open:text-primary transition-colors">
                                <span>{q}</span>
                                <span aria-hidden="true" className="text-primary transition-transform duration-200 group-open:rotate-180">⌄</span>
                            </summary>
                            <p className="mt-3 text-stone-600 leading-relaxed">{a}</p>
                        </details>
                    ))}
                </div>
            </section>

            <section className="bg-stone-900 text-white rounded-2xl p-8 md:p-12 text-center mb-16">
                <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">
                    Venez nous voir ou commandez en ligne
                </h2>
                <p className="text-stone-200 mb-6 max-w-2xl mx-auto">
                    Boutique ouverte du lundi au vendredi 9 h–18 h. Conseil personnalisé gratuit.
                    Click &amp; Collect en 24 h. Livraison offerte dès 39 € en France métropolitaine.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link href="/boutique">
                        <Button size="lg" className="font-bold">
                            <ShoppingBag className="h-4 w-4 mr-2" />
                            Voir le catalogue en ligne
                        </Button>
                    </Link>
                    <a
                        href="https://www.google.com/maps/search/?api=1&query=48+avenue+de+Touraine+78310+Maurepas"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Button size="lg" variant="outline" className="font-bold bg-transparent border-white text-white hover:bg-white hover:text-stone-900">
                            <MapPin className="h-4 w-4 mr-2" />
                            Itinéraire Google Maps
                        </Button>
                    </a>
                </div>
            </section>

            <section aria-labelledby="trust" className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <h2 id="trust" className="sr-only">Nos engagements</h2>
                <div className="text-center p-4">
                    <Leaf className="h-8 w-8 mx-auto mb-3 text-primary" />
                    <h3 className="font-serif text-lg font-bold mb-1">Naturel &amp; bio</h3>
                    <p className="text-sm text-stone-600">Une sélection naturelle, et la mention bio sur chaque produit certifié.</p>
                </div>
                <div className="text-center p-4">
                    <Truck className="h-8 w-8 mx-auto mb-3 text-primary" />
                    <h3 className="font-serif text-lg font-bold mb-1">Livraison rapide IDF</h3>
                    <p className="text-sm text-stone-600">24-48 h en région parisienne, offerte dès 39 € d&apos;achat.</p>
                </div>
                <div className="text-center p-4">
                    <ShieldCheck className="h-8 w-8 mx-auto mb-3 text-primary" />
                    <h3 className="font-serif text-lg font-bold mb-1">Conseil personnalisé</h3>
                    <p className="text-sm text-stone-600">En boutique ou par téléphone au 06 99 55 69 77.</p>
                </div>
            </section>

            <section aria-labelledby="contact-info" className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto text-sm text-stone-600 mt-16">
                <h2 id="contact-info" className="sr-only">Coordonnées</h2>
                <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                        <strong className="block text-stone-900">Adresse</strong>
                        48 avenue de Touraine<br />78310 Maurepas (Yvelines)
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                        <strong className="block text-stone-900">Téléphone</strong>
                        <a href="tel:+33699556977" className="hover:text-primary">06 99 55 69 77</a>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                        <strong className="block text-stone-900">Horaires</strong>
                        Lun. – Ven. 9 h – 18 h
                    </div>
                </div>
            </section>
        </div>
    );
}
