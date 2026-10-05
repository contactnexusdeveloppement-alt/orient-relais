import Link from "next/link";
import type { Metadata } from "next";
import { Sparkles, Truck, MapPin, Phone, Clock, ShoppingBag, Sprout, Droplets, Droplet, Sun, Leaf, Hexagon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { jsonLdScript } from "@/lib/json-ld";
import { GoogleMapEmbed } from "@/components/local/GoogleMapEmbed";

export const metadata: Metadata = {
    title: "Savon d'Alep et savon d'Alep bio dans les Yvelines (78) — Click & Collect Maurepas",
    description:
        "Savons d'Alep authentiques Najel, dont une référence certifiée bio, dans les Yvelines : livraison sous 24-48 h en Île-de-France ou retrait gratuit dans notre boutique de Maurepas (78310).",
    alternates: { canonical: "/savon-alep-yvelines" },
    openGraph: {
        title: "Savon d'Alep Yvelines — Orient Relais Maurepas",
        description:
            "Boutique bio à Maurepas (78310) spécialisée en savons d'Alep authentiques Najel. Livraison rapide en Yvelines et en Île-de-France.",
        url: "https://www.orient-relais.com/savon-alep-yvelines",
        type: "website",
    },
};

const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.orient-relais.com" },
        { "@type": "ListItem", position: 2, name: "Savon d'Alep Yvelines", item: "https://www.orient-relais.com/savon-alep-yvelines" },
    ],
};

const placeJsonLd = {
    "@context": "https://schema.org",
    "@type": ["Store", "HealthAndBeautyBusiness"],
    "@id": "https://www.orient-relais.com/savon-alep-yvelines#place",
    name: "Orient Relais — Savons d'Alep Yvelines",
    description:
        "Boutique bio dans les Yvelines (Maurepas, 78310) spécialisée en savons d'Alep authentiques saponifiés au chaudron.",
    url: "https://www.orient-relais.com/savon-alep-yvelines",
    telephone: "+33699556977",
    address: {
        "@type": "PostalAddress",
        streetAddress: "48 avenue de Touraine",
        addressLocality: "Maurepas",
        postalCode: "78310",
        addressRegion: "Yvelines",
        addressCountry: "FR",
    },
    geo: { "@type": "GeoCoordinates", latitude: 48.7642, longitude: 1.9393 },
    areaServed: [
        { "@type": "AdministrativeArea", name: "Yvelines" },
        { "@type": "AdministrativeArea", name: "Île-de-France" },
        { "@type": "City", name: "Maurepas" },
        { "@type": "City", name: "Saint-Quentin-en-Yvelines" },
        { "@type": "City", name: "Versailles" },
        { "@type": "City", name: "Élancourt" },
        { "@type": "City", name: "Plaisir" },
        { "@type": "City", name: "Trappes" },
    ],
};

// FAQ affichée sur la page ET reprise en données structurées : Google exige
// que le contenu FAQPage soit visible. Pas d'allégation santé (cosmétique) ni
// de mention bio non vérifiée : seuls les produits dont le nom porte « bio »
// sont certifiés.
const YVELINES_FAQ = [
    {
        q: "Où acheter un savon d'Alep bio dans les Yvelines ?",
        a: "Chez Orient Relais, boutique bio au 48 avenue de Touraine à Maurepas (78310). Nous proposons les savons d'Alep de la maison Najel, dont un savon d'Alep à la rose de Damas certifié bio. Achat en ligne avec livraison en France, ou retrait gratuit en Click & Collect du lundi au vendredi, de 9 h à 18 h.",
    },
    {
        q: "Quel pourcentage de laurier choisir pour un savon d'Alep ?",
        a: "Plus le taux d'huile de baie de laurier est élevé, plus le savon est purifiant. Un taux bas, comme notre savon d'Alep liquide à 5 %, convient à un usage quotidien et aux peaux sensibles. Un taux élevé, comme notre savon traditionnel à 40 %, convient plutôt aux peaux grasses. En cas de problème de peau, demandez conseil à votre médecin ou à votre pharmacien.",
    },
    {
        q: "Le savon d'Alep est-il bio ?",
        a: "Pas forcément : un savon d'Alep n'est bio que s'il est certifié. La recette traditionnelle ne contient que de l'huile d'olive, de l'huile de baie de laurier, de la soude et de l'eau. Dans notre sélection, les savons certifiés bio portent la mention dans leur nom, comme le savon d'Alep à la rose de Damas bio.",
    },
    {
        q: "Quels sont les délais de livraison en Île-de-France ?",
        a: "Comptez 24 à 48 h ouvrées pour une livraison Colissimo en Île-de-France, et 2 à 5 jours en Mondial Relay. La livraison est offerte dès 39 € d'achat en France métropolitaine. Pour les habitants des Yvelines, le Click & Collect gratuit à notre boutique de Maurepas est souvent le plus simple.",
    },
] as const;

const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: YVELINES_FAQ.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
    })),
};

// Produits réellement en vente (slugs WooCommerce vérifiés le 05/10/2026).
// Si un produit est retiré du catalogue, retirer ou rediriger son lien ici.
const NATURAL_PRODUCTS = [
    {
        icon: Sprout,
        title: "Huile de nigelle bio",
        text: "Huile de nigelle (cumin noir) biologique en capsules, boîte de 120. Un incontournable de la tradition orientale, dans un format pratique au quotidien.",
        links: [{ href: "/produit/huile-de-nigelle-bio-120-capsules", label: "Voir l'huile de nigelle" }],
    },
    {
        icon: Droplets,
        title: "Huile de figue de barbarie",
        text: "Une huile rare, obtenue à partir des pépins du fruit du figuier de barbarie. Quelques gouttes suffisent pour le soin du visage.",
        links: [{ href: "/produit/huile-de-graines-de-figue-de-barbarie", label: "Voir l'huile de figue de barbarie" }],
    },
    {
        icon: Sun,
        title: "Huile de dattier du désert",
        text: "Une huile sèche qui pénètre vite sans laisser de film gras. Elle s'utilise sur le visage, le corps et les cheveux.",
        links: [{ href: "/produit/huile-seche-de-dattier-du-desert", label: "Voir l'huile de dattier du désert" }],
    },
    {
        icon: Leaf,
        title: "Savons à l'huile d'argan",
        text: "Le savon noir à l'huile d'argan bio pour le rituel du hammam, et un savon d'Alep enrichi à l'argan et au rhassoul.",
        links: [
            { href: "/produit/savon-noir-lhuile-dargan-bio-cosmos-natural-180g-najel", label: "Savon noir à l'huile d'argan" },
            { href: "/produit/savon-dalep-argan-rhassoul-najel-100g", label: "Savon d'Alep argan et rhassoul" },
        ],
    },
    {
        icon: Droplet,
        title: "Huile d'olive et laurier",
        text: "La base de tout vrai savon d'Alep : de l'huile d'olive et de l'huile de baie de laurier, saponifiées au chaudron puis séchées plusieurs mois.",
        links: [{ href: "/categorie/savons-dalep", label: "Voir les savons d'Alep" }],
    },
    {
        icon: Hexagon,
        title: "Miel",
        text: "Miel de montagne et miel de bourdaine, en pots de 250 g et de 500 g.",
        links: [{ href: "/categorie/miel", label: "Voir les miels" }],
    },
];

export default function SavonAlepYvelinesPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: jsonLdScript([breadcrumbJsonLd, placeJsonLd, faqJsonLd]) }}
            />

            <nav aria-label="Fil d'Ariane" className="text-sm text-stone-500 mb-6 flex items-center gap-2">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span aria-hidden>›</span>
                <span className="text-stone-700">Savon d&apos;Alep Yvelines</span>
            </nav>

            <header className="max-w-3xl mb-12">
                <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary bg-primary/5 px-4 py-1.5 rounded-full border border-primary/10 mb-4">
                    <Sparkles className="h-4 w-4" /> Savon d&apos;Alep dans les Yvelines (78)
                </span>
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-stone-900 mb-4">
                    Savons d&apos;Alep authentiques dans les Yvelines
                </h1>
                <p className="text-stone-600 text-lg leading-relaxed">
                    Vous cherchez un véritable <strong>savon d&apos;Alep</strong> près de chez vous
                    dans les <strong>Yvelines</strong> (78) ? Orient Relais est votre boutique
                    spécialisée à Maurepas (78310), à deux pas de Saint-Quentin-en-Yvelines,
                    Élancourt, Plaisir, Trappes et Versailles. Nous distribuons les savons
                    d&apos;Alep de la maison <strong>Najel</strong>, saponifiés au chaudron et séchés
                    à l&apos;air libre selon la recette traditionnelle, dont un
                    {" "}<strong>savon d&apos;Alep bio</strong> certifié. Livraison rapide en
                    Île-de-France ou retrait gratuit en boutique.
                </p>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                <div className="bg-white border border-stone-200 rounded-2xl p-6">
                    <Truck className="h-6 w-6 text-primary mb-3" />
                    <h2 className="font-serif text-xl font-bold mb-2">Livraison Yvelines 24-48 h</h2>
                    <p className="text-sm text-stone-600">
                        Colissimo et Mondial Relay sur tout le 78. Livraison offerte dès 39 € d&apos;achat.
                    </p>
                </div>
                <div className="bg-white border border-stone-200 rounded-2xl p-6">
                    <ShoppingBag className="h-6 w-6 text-primary mb-3" />
                    <h2 className="font-serif text-xl font-bold mb-2">Click &amp; Collect gratuit</h2>
                    <p className="text-sm text-stone-600">
                        Retrait sous 24 h à notre boutique de Maurepas, sans frais.
                    </p>
                </div>
                <div className="bg-white border border-stone-200 rounded-2xl p-6">
                    <Sparkles className="h-6 w-6 text-primary mb-3" />
                    <h2 className="font-serif text-xl font-bold mb-2">Najel saponifié au chaudron</h2>
                    <p className="text-sm text-stone-600">
                        Saponifié au chaudron puis séché longuement à l&apos;air libre, selon la méthode traditionnelle d&apos;Alep.
                    </p>
                </div>
            </section>

            <section className="prose prose-stone max-w-3xl mb-16">
                <h2>Pourquoi choisir le savon d&apos;Alep dans les Yvelines ?</h2>
                <p>
                    Le savon d&apos;Alep traditionnel ne contient que quatre ingrédients : de
                    l&apos;huile d&apos;olive, de l&apos;huile de baie de laurier, de la soude et de
                    l&apos;eau. Il s&apos;utilise sur le visage, le corps et les cheveux, convient à
                    toute la famille, et un pain posé sur un porte-savon aéré dure plusieurs mois.
                    Que vous habitiez Maurepas, Élancourt, Plaisir ou Saint-Quentin-en-Yvelines,
                    vous pouvez venir le découvrir en boutique avant de choisir.
                </p>
                <h2>Notre sélection de savons d&apos;Alep distribués dans le 78</h2>
                <p>
                    Toute notre sélection vient de la maison{" "}
                    <Link href="/marques/najel">Najel</Link>, spécialiste du savon d&apos;Alep :
                </p>
                <ul>
                    <li>
                        <Link href="/produit/savon-dalep-traditionnel-40-laurier"><strong>Savon d&apos;Alep traditionnel 40 % laurier</strong></Link>
                        {" "}: le plus riche en huile de baie de laurier, apprécié des peaux grasses.
                    </li>
                    <li>
                        <Link href="/produit/savon-dalep-liquide-5-laurier"><strong>Savon d&apos;Alep liquide 5 % laurier</strong></Link>
                        {" "}: doux et pratique pour les mains et la douche, pour toute la famille.
                    </li>
                    <li>
                        <strong>Savons d&apos;Alep parfumés et enrichis</strong> : rose de Damas (dont une
                        {" "}<Link href="/produit/savon-dalep-a-la-rose-de-damas-bio">version certifiée bio</Link>),
                        jasmin, miel, lait de chèvre, argan et rhassoul, encens, boue de la mer Morte,
                        ambre et oud.
                    </li>
                </ul>
                <p>
                    Toutes ces références sont disponibles dans notre catégorie{" "}
                    <Link href="/categorie/savons-dalep">Savons d&apos;Alep</Link>, avec leur
                    description et leurs conseils d&apos;utilisation. Pour comprendre les différents
                    taux de laurier, lisez{" "}
                    <Link href="/blog/savon-alep-eczema-guide">notre guide pour bien choisir son savon d&apos;Alep</Link>.
                </p>
                <h2>Boutique physique à Maurepas (78310) — Click &amp; Collect</h2>
                <p>
                    Notre boutique est située au <strong>48 avenue de Touraine, 78310 Maurepas</strong>,
                    accessible facilement depuis Saint-Quentin-en-Yvelines (10 min en voiture) et Versailles
                    (20 min). Vous pouvez commander en ligne et retirer votre colis sous 24 h ouvrées,
                    gratuitement, du lundi au vendredi de 9 h à 18 h. Téléphone : 06 99 55 69 77.
                </p>
            </section>

            <section aria-labelledby="natural-products-title" className="mb-16">
                <h2 id="natural-products-title" className="font-serif text-2xl md:text-3xl font-bold text-stone-900 mb-4">
                    Huiles végétales, nigelle et miel à Maurepas
                </h2>
                <p className="text-stone-600 mb-8 max-w-3xl">
                    La boutique ne se limite pas au savon d&apos;Alep. Vous y trouverez aussi des
                    huiles végétales pour la peau et les cheveux, de l&apos;huile de nigelle et du
                    miel, à commander en ligne ou à retirer gratuitement en boutique.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {NATURAL_PRODUCTS.map(({ icon: Icon, title, text, links }) => (
                        <div key={title} className="bg-white border border-stone-200 rounded-2xl p-6 flex flex-col">
                            <Icon className="h-6 w-6 text-primary mb-3" aria-hidden="true" />
                            <h3 className="font-serif text-xl font-bold mb-2">{title}</h3>
                            <p className="text-sm text-stone-600 mb-4">{text}</p>
                            <div className="mt-auto flex flex-col gap-1">
                                {links.map((link) => (
                                    <Link key={link.href} href={link.href} className="text-sm font-medium text-primary hover:underline">
                                        {link.label} →
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section aria-labelledby="map-title-yvelines" className="mb-16">
                <h2 id="map-title-yvelines" className="font-serif text-2xl md:text-3xl font-bold text-stone-900 mb-4">
                    Notre boutique à Maurepas (78310)
                </h2>
                <p className="text-stone-600 mb-6 max-w-2xl">
                    Située au <strong>48 avenue de Touraine, 78310 Maurepas</strong>,
                    accessible en 10 min depuis Saint-Quentin-en-Yvelines et en 20 min depuis Versailles.
                </p>
                <GoogleMapEmbed
                    height={400}
                    ariaLabel="Carte Google Maps — Orient Relais, 48 avenue de Touraine, 78310 Maurepas"
                />
            </section>

            <section aria-labelledby="faq-title-yvelines" className="max-w-3xl mb-16">
                <h2 id="faq-title-yvelines" className="font-serif text-2xl md:text-3xl font-bold text-stone-900 mb-6">
                    Questions fréquentes
                </h2>
                <div className="space-y-3">
                    {YVELINES_FAQ.map(({ q, a }) => (
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

            <section className="bg-stone-50 rounded-2xl p-8 md:p-12 text-center mb-16">
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-stone-900 mb-4">
                    Prêt à découvrir nos savons d&apos;Alep ?
                </h2>
                <p className="text-stone-600 mb-6 max-w-2xl mx-auto">
                    Retrouvez l&apos;ensemble de notre catalogue de savons d&apos;Alep Najel,
                    avec livraison rapide dans toute la France et retrait gratuit en boutique pour
                    les habitants des Yvelines.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link href="/categorie/savons-dalep">
                        <Button size="lg" className="font-bold">Voir tous les savons d&apos;Alep</Button>
                    </Link>
                    <Link href="/contact">
                        <Button size="lg" variant="outline" className="font-bold">
                            <MapPin className="h-4 w-4 mr-2" />
                            Venir en boutique
                        </Button>
                    </Link>
                </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto text-sm text-stone-600">
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
