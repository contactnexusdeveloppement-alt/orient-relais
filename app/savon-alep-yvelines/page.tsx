import Link from "next/link";
import type { Metadata } from "next";
import { Sparkles, Truck, MapPin, Phone, Clock, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { jsonLdScript } from "@/lib/json-ld";

export const metadata: Metadata = {
    title: "Savon d'Alep Bio dans les Yvelines (78) — Livraison Express & Click & Collect Maurepas",
    description:
        "Achetez du savon d'Alep bio authentique Najel dans les Yvelines : livraison sous 24-48 h en région parisienne ou retrait gratuit à notre boutique de Maurepas (78310). Sélection de savons saponifiés au chaudron.",
    alternates: { canonical: "/savon-alep-yvelines" },
    openGraph: {
        title: "Savon d'Alep Bio Yvelines — Orient Relais Maurepas",
        description:
            "Boutique bio à Maurepas (78310) spécialisée en savons d'Alep authentiques Najel. Livraison rapide en Yvelines + Île-de-France.",
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
    name: "Orient Relais — Savons d'Alep Bio Yvelines",
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

const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        {
            "@type": "Question",
            name: "Où acheter un savon d'Alep bio dans les Yvelines ?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Orient Relais, boutique bio basée au 48 avenue de Touraine à Maurepas (78310), propose une sélection de savons d'Alep authentiques Najel. Achat en ligne avec livraison France ou retrait gratuit Click & Collect en boutique du lundi au vendredi 9 h–18 h.",
            },
        },
        {
            "@type": "Question",
            name: "Quel pourcentage de laurier choisir pour un savon d'Alep ?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Pour une peau normale, partez sur 5 % à 12 % d'huile de baie de laurier. Pour une peau atopique ou sujette à l'eczéma, le 20 % est l'option recommandée. Pour les peaux grasses ou les zones en crise (acné, psoriasis), montez à 30 % ou 40 % en usage localisé. Notre guide détaillé est dans le journal Orient Relais.",
            },
        },
        {
            "@type": "Question",
            name: "Le savon d'Alep est-il vraiment bio ?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Le savon d'Alep traditionnel est composé uniquement d'huile d'olive, d'huile de baie de laurier, de soude et d'eau. Aucun additif, aucun conservateur, aucun parfum de synthèse. Les savons que nous distribuons sont saponifiés au chaudron en Syrie selon la méthode ancestrale et séchés 9 mois à l'air libre.",
            },
        },
        {
            "@type": "Question",
            name: "Quels sont les délais de livraison en Île-de-France ?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Comptez 24 à 48 h ouvrées pour une livraison Colissimo en Île-de-France, et 2 à 5 jours en Mondial Relay. La livraison est offerte dès 39 € d'achat en France métropolitaine. Pour les habitants des Yvelines, le Click & Collect gratuit à notre boutique de Maurepas est l'option la plus rapide.",
            },
        },
    ],
};

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
                    Savons d&apos;Alep Bio Authentiques dans les Yvelines
                </h1>
                <p className="text-stone-600 text-lg leading-relaxed">
                    Vous cherchez à acheter un véritable <strong>savon d&apos;Alep bio</strong>
                    {" "}près de chez vous dans les <strong>Yvelines</strong> (78) ? Orient Relais est
                    votre boutique spécialisée à Maurepas (78310), à deux pas de
                    Saint-Quentin-en-Yvelines, Élancourt, Plaisir, Trappes et Versailles. Nous
                    distribuons une sélection rigoureuse de savons d&apos;Alep saponifiés au
                    chaudron par <strong>Najel</strong>, l&apos;un des derniers producteurs
                    syriens à respecter la recette ancestrale et le séchage 9 mois à l&apos;air
                    libre. Livraison rapide en Île-de-France ou retrait gratuit en boutique.
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
                        100 % bio, 9 mois de séchage, fabrication artisanale syrienne traditionnelle.
                    </p>
                </div>
            </section>

            <section className="prose prose-stone max-w-3xl mb-16">
                <h2>Pourquoi le savon d&apos;Alep est-il un best-seller dans les Yvelines ?</h2>
                <p>
                    Les Yvelines comptent parmi les départements franciliens les plus sensibles à
                    la cosmétique naturelle. Avec une population active fortement urbanisée (Saint-Quentin-en-Yvelines,
                    Versailles, Vélizy, Trappes) mais en quête de produits sains et de fabrication respectueuse,
                    le savon d&apos;Alep coche toutes les cases : <strong>bio</strong>, <strong>vegan</strong>,
                    {" "}<strong>fabrication artisanale</strong>, et surtout efficacité reconnue sur les
                    peaux sensibles. À Maurepas, à Élancourt ou à Plaisir, de plus en plus de familles
                    troquent leurs gels douches industriels contre un pain de savon d&apos;Alep qui dure
                    3 à 4 mois.
                </p>
                <h2>Notre sélection de savons d&apos;Alep distribués dans le 78</h2>
                <p>
                    Nous proposons les principaux pourcentages d&apos;huile de baie de laurier de la marque
                    {" "}<Link href="/marques/najel">Najel</Link>, plus quelques références enrichies (rose de
                    Damas, miel, lait de chèvre, jasmin) :
                </p>
                <ul>
                    <li><strong>Savon d&apos;Alep 5 % et 12 % laurier</strong> — quotidien famille, peaux normales</li>
                    <li><strong>Savon d&apos;Alep 20 % laurier</strong> — peaux atopiques, eczéma léger, bébé 6 mois+ (avec accord pédiatre)</li>
                    <li><strong>Savon d&apos;Alep 40 % laurier</strong> — usage localisé sur poussées d&apos;eczéma, peaux grasses, acné</li>
                    <li><strong>Savons enrichis</strong> rose, miel, lait de chèvre — soins doux pour le visage</li>
                </ul>
                <p>
                    Toutes ces références sont disponibles dans notre catégorie {" "}
                    <Link href="/categorie/savons-dalep">Savons d&apos;Alep</Link> avec descriptions
                    détaillées, INCI complète et conseils d&apos;usage. Pour aller plus loin, notre
                    guide <Link href="/blog/savon-alep-eczema-guide">savon d&apos;Alep et eczéma</Link>
                    {" "}explique en 2 500 mots quel pourcentage choisir selon votre type de peau.
                </p>
                <h2>Boutique physique à Maurepas (78310) — Click &amp; Collect</h2>
                <p>
                    Notre boutique est située au <strong>48 avenue de Touraine, 78310 Maurepas</strong>,
                    accessible facilement depuis Saint-Quentin-en-Yvelines (10 min en voiture) et Versailles
                    (20 min). Vous pouvez commander en ligne et retirer votre colis sous 24 h ouvrées,
                    gratuitement, du lundi au vendredi de 9 h à 18 h. Téléphone : 06 99 55 69 77.
                </p>
            </section>

            <section className="bg-stone-50 rounded-2xl p-8 md:p-12 text-center mb-16">
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-stone-900 mb-4">
                    Prêt à découvrir nos savons d&apos;Alep ?
                </h2>
                <p className="text-stone-600 mb-6 max-w-2xl mx-auto">
                    Retrouvez l&apos;ensemble de notre catalogue de savons d&apos;Alep bio Najel,
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
