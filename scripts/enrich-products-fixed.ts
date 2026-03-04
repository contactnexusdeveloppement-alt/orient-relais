import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const client = new WooCommerceRestApi({
    url: process.env.NEXT_PUBLIC_WOOCOMMERCE_URL || "https://orient-relais.com",
    consumerKey: process.env.WC_CONSUMER_KEY || "",
    consumerSecret: process.env.WC_CONSUMER_SECRET || "",
    version: "wc/v3",
});

const enrichments: Record<string, { description: string; short_description: string; weight?: string; attributes?: { name: string; options: string[]; visible: boolean }[]; }> = {
    // ==================== SAVONS D'ALEP ====================
    "savon-dalep-traditionnel-40-laurier": {
        short_description: "Savon d'Alep authentique haute concentration en laurier (40%). Fabriqué artisanalement au chaudron.",
        description: `<h3>L'authentique savon d'Alep 40% huile de baie de laurier</h3>
<p>Ce savon d'Alep traditionnel est fabriqué artisanalement au chaudron selon un savoir-faire millénaire syrien. Avec <strong>40% d'huile de baie de laurier</strong>...`,
    },
    // The previous run already updated 17 products correctly.
    // Let's only list the ones that failed (the 31 mismatches) with their new keys:

    "savon-dalep-a-la-rose-de-damas-bio": {
        short_description: "Savon d'Alep enrichi à l'huile essentielle de rose de Damas bio. Un soin délicat au parfum envoûtant.",
        description: `<h3>Savon d'Alep à la Rose de Damas Bio</h3>
<p>Ce savon d'Alep enrichi à l'<strong>huile essentielle de rose de Damas bio</strong> offre une expérience sensorielle unique. La rose de Damas, reine des fleurs en Orient, est réputée pour ses propriétés régénérantes et apaisantes.</p>
<h4>Bienfaits</h4>
<ul>
<li><strong>Régénérant</strong> — Favorise le renouvellement cellulaire</li>
<li><strong>Apaisant</strong> — Calme les rougeurs et irritations</li>
<li><strong>Parfum délicat</strong> — Notes florales subtiles de rose de Damas</li>
<li><strong>Tous types de peaux</strong> — Convient aux peaux les plus sensibles</li>
</ul>
<h4>Composition</h4>
<p>Huile d'olive • Huile de baie de laurier • Huile essentielle de rose de Damas bio</p>`,
        weight: "100",
        attributes: [
            { name: "Marque", options: ["Najel"], visible: true },
            { name: "Contenance", options: ["100g"], visible: true },
            { name: "Certification", options: ["Bio"], visible: true },
        ],
    },
    "savon-dalep-ambre-et-oud": {
        short_description: "Savon d'Alep au parfum luxueux d'ambre et de oud. Une alliance rare et envoûtante.",
        description: `<h3>Savon d'Alep Ambre & Oud — L'Orient dans votre salle de bain</h3>
<p>Alliance luxueuse de l'<strong>ambre</strong> et du <strong>oud</strong> (bois d'agar), ce savon d'Alep offre un parfum envoûtant et raffiné. Le oud, bois précieux d'Orient, apporte une note boisée et chaleureuse à ce savon d'exception.</p>
<h4>Bienfaits</h4>
<ul>
<li><strong>Parfum longue tenue</strong> — Notes boisées, ambrées et orientales</li>
<li><strong>Hydratant</strong> — Huile d'olive nourrissante</li>
<li><strong>Luxueux</strong> — Un moment de bien-être premium sous la douche</li>
</ul>
<h4>Composition</h4>
<p>Huile d'olive • Huile de baie de laurier • Parfum ambre et oud</p>`,
        weight: "150",
        attributes: [
            { name: "Marque", options: ["Najel"], visible: true },
            { name: "Contenance", options: ["150g"], visible: true },
        ],
    },
    "savon-dalep-a-la-boue-de-la-mer-morte": {
        short_description: "Savon d'Alep enrichi à la boue de la Mer Morte. Détoxifiant et minéralisant pour les peaux à problèmes.",
        description: `<h3>Savon d'Alep à la Boue de la Mer Morte</h3>
<p>Ce savon combine les bienfaits ancestraux du <strong>savon d'Alep</strong> avec les <strong>minéraux de la boue de la Mer Morte</strong>. Un soin purifiant d'exception pour les peaux à problèmes.</p>
<h4>Bienfaits</h4>
<ul>
<li><strong>Détoxifiant</strong> — Élimine les impuretés en profondeur</li>
<li><strong>Minéralisant</strong> — Riche en magnésium, calcium et potassium</li>
<li><strong>Apaisant</strong> — Calme les irritations et démangeaisons</li>
</ul>`,
        weight: "100",
        attributes: [
            { name: "Marque", options: ["Najel"], visible: true },
            { name: "Contenance", options: ["100g"], visible: true },
            { name: "Type de peau", options: ["Peaux sensibles", "Peaux à problèmes"], visible: true },
        ],
    },
    "savon-dalep-a-lencens": {
        short_description: "Savon d'Alep parfumé à l'encens. Ambiance orientale authentique à petit prix.",
        description: `<h3>Savon d'Alep à l'Encens</h3>
<p>Ce savon d'Alep parfumé à l'<strong>encens</strong> vous transporte dans une ambiance orientale authentique. L'encens, utilisé depuis des millénaires dans les rituels de purification, apporte ses propriétés apaisantes à ce savon traditionnel.</p>
<h4>Bienfaits</h4>
<ul>
<li><strong>Purifiant</strong> — Nettoie la peau tout en douceur</li>
<li><strong>Parfum oriental</strong> — Notes chaudes et boisées d'encens</li>
<li><strong>Format voyage</strong> — Idéal pour découvrir le savon d'Alep</li>
</ul>`,
        weight: "20",
        attributes: [
            { name: "Marque", options: ["Najel"], visible: true },
            { name: "Contenance", options: ["20g"], visible: true },
        ],
    },
    "gel-douche-parfum-ambre-et-oud": {
        short_description: "Gel douche onctueux au parfum d'ambre et oud. Nettoie en préservant l'hydratation naturelle.",
        description: `<h3>Gel Douche Ambre & Oud</h3>
<p>Gel douche onctueux au parfum envoûtant d'<strong>ambre et de oud</strong>. Sa formule douce nettoie la peau en préservant son hydratation naturelle tout en laissant un sillage délicat et oriental.</p>
<h4>Bienfaits</h4>
<ul>
<li><strong>Hydratant</strong> — Ne dessèche pas la peau</li>
<li><strong>Parfum longue tenue</strong> — Notes ambrées et boisées</li>
<li><strong>Grand format</strong> — 500ml pour un usage prolongé</li>
</ul>`,
        weight: "500",
        attributes: [
            { name: "Marque", options: ["Najel"], visible: true },
            { name: "Contenance", options: ["500ml"], visible: true },
        ],
    },

    "musta-60-gelules": {
        short_description: "Souchet rond ayurvédique pour la digestion et le métabolisme. 60 gélules végétales.",
        description: `<h3>Musta (Souchet Rond) — Digestion & Métabolisme</h3>
<p>Le <strong>Musta</strong> (Cyperus rotundus) est traditionnellement utilisé en Ayurvéda pour soutenir la digestion, réguler l'appétit et favoriser un métabolisme sain.</p>
<h4>Bienfaits</h4>
<ul>
<li><strong>Digestion</strong> — Facilite la digestion après les repas</li>
<li><strong>Métabolisme</strong> — Favorise un métabolisme équilibré</li>
<li><strong>Appétit</strong> — Aide à réguler naturellement l'appétit</li>
</ul>`,
        weight: "30",
        attributes: [
            { name: "Marque", options: ["Orient Relais"], visible: true },
            { name: "Contenance", options: ["60 gélules végétales – 335mg"], visible: true },
        ],
    },
    "huile-de-nigelle-bio-120-capsules": {
        short_description: "Huile de Nigelle (Cumin noir) bio en capsules. Immunité, peau saine et défenses naturelles.",
        description: `<h3>Huile de Nigelle Bio — L'Or Noir des Pharaons</h3>
<p>L'<strong>huile de Nigelle</strong> (Nigella sativa), aussi appelée « graine bénie » ou cumin noir, en capsules pratiques. Renforce les <strong>défenses immunitaires</strong> et apaise les peaux à problèmes de l'intérieur.</p>
<h4>Bienfaits</h4>
<ul>
<li><strong>Immunité</strong> — Stimule les défenses naturelles (thymoquinone)</li>
<li><strong>Peau</strong> — Apaise eczéma, acné et problèmes cutanés</li>
<li><strong>Allergies</strong> — Atténue les réactions allergiques saisonnières</li>
</ul>`,
        weight: "60",
        attributes: [
            { name: "Marque", options: ["Orient Relais"], visible: true },
            { name: "Contenance", options: ["120 capsules"], visible: true },
            { name: "Certification", options: ["Bio"], visible: true },
        ],
    },
    "huile-onagre-bourrache-bio-120-capsules": {
        short_description: "Duo féminin Onagre + Bourrache bio. Beauté de la peau et confort hormonal.",
        description: `<h3>Huile Onagre-Bourrache Bio — Beauté & Équilibre Féminin</h3>
<p>Le duo féminin par excellence : riche en <strong>acides gras essentiels (GLA)</strong> pour l'éclat de la peau, l'hydratation profonde et le confort prémenstruel/ménopause.</p>
<h4>Bienfaits</h4>
<ul>
<li><strong>Peau éclatante</strong> — Nourrit et hydrate de l'intérieur</li>
<li><strong>Anti-âge</strong> — Préserve l'élasticité de la peau</li>
<li><strong>Confort féminin</strong> — Atténue les désagréments hormonaux</li>
</ul>`,
        weight: "60",
        attributes: [
            { name: "Marque", options: ["Orient Relais"], visible: true },
            { name: "Contenance", options: ["120 capsules"], visible: true },
            { name: "Certification", options: ["Bio"], visible: true },
        ],
    },
    "pollen-dabeille-bio-150g": {
        short_description: "Pollen polyfloral bio, concentré de vitalité. Riche en protéines végétales et vitamines.",
        description: `<h3>Pollen d'Abeille Bio — Superaliment de la Ruche</h3>
<p>Pollen polyfloral bio, véritable <strong>concentré de vitalité</strong>. Riche en protéines végétales, vitamines du groupe B et oligo-éléments, il est parfait pour les sportifs et les personnes fatiguées.</p>
<h4>Bienfaits</h4>
<ul>
<li><strong>Énergie</strong> — Combat la fatigue grâce aux vitamines B</li>
<li><strong>Protéines complètes</strong> — Tous les acides aminés essentiels</li>
<li><strong>Immunité</strong> — Renforce les défenses de l'organisme</li>
</ul>
<h4>Conseils d'utilisation</h4>
<p>1 cuillère à soupe par jour, à mâcher ou mélanger dans un yaourt, smoothie ou jus de fruits.</p>`,
        weight: "150",
        attributes: [
            { name: "Marque", options: ["Orient Relais"], visible: true },
            { name: "Contenance", options: ["150g"], visible: true },
            { name: "Certification", options: ["Bio"], visible: true },
        ],
    },
    "miel-de-bourdaine-250g": {
        short_description: "Miel de Bourdaine rare, texture fine et goût délicat. Douceur digestive naturelle.",
        description: `<h3>Miel de Bourdaine — 250g</h3>
<p>Un miel <strong>rare et recherché</strong> à la texture fine et au goût délicat, légèrement boisé. Le miel de Bourdaine est reconnu pour ses propriétés douces sur la digestion et son caractère apaisant.</p>
<h4>Caractéristiques</h4>
<ul>
<li><strong>Texture</strong> — Fine et crémeuse</li>
<li><strong>Goût</strong> — Doux, légèrement boisé</li>
<li><strong>Origine</strong> — Corrèze, France</li>
</ul>`,
        weight: "250",
        attributes: [
            { name: "Marque", options: ["Orient Relais"], visible: true },
            { name: "Contenance", options: ["250g"], visible: true },
            { name: "Origine", options: ["Corrèze, France"], visible: true },
        ],
    },
    "miel-de-montagne-250g": {
        short_description: "Miel toutes fleurs de montagne. Goût riche et authentique, reflet de la biodiversité préservée.",
        description: `<h3>Miel de Montagne — 250g</h3>
<p>Miel toutes fleurs récolté en altitude, offrant un <strong>goût riche et authentique</strong>, reflet de la biodiversité préservée des montagnes françaises.</p>
<h4>Caractéristiques</h4>
<ul>
<li><strong>Texture</strong> — Onctueuse et parfumée</li>
<li><strong>Goût</strong> — Riche, floral et complexe</li>
<li><strong>Terroir</strong> — Montagnes de France</li>
</ul>`,
        weight: "250",
        attributes: [
            { name: "Marque", options: ["Orient Relais"], visible: true },
            { name: "Contenance", options: ["250g"], visible: true },
            { name: "Origine", options: ["Montagnes de France"], visible: true },
        ],
    },
    "miel-de-bourdaine-500g": {
        short_description: "Miel de Bourdaine format familial 500g. Pour les amateurs de ce miel d'exception.",
        description: `<h3>Miel de Bourdaine — Format Familial 500g</h3>
<p>Le même miel de Bourdaine rare et délicat en <strong>format familial 500g</strong>. Économique pour les amateurs de ce miel d'exception de Corrèze.</p>`,
        weight: "500",
        attributes: [
            { name: "Marque", options: ["Orient Relais"], visible: true },
            { name: "Contenance", options: ["500g"], visible: true },
            { name: "Origine", options: ["Corrèze, France"], visible: true },
        ],
    },
    "andrographis-echinacee-dinde-60-gelules": {
        short_description: "Bouclier immunitaire naturel pour l'hiver. L'échinacée d'Inde en gélules.",
        description: `<h3>Andrographis — Le Bouclier Immunitaire</h3>
<p>L'<strong>Andrographis</strong> (échinacée d'Inde) est une plante majeure de la pharmacopée asiatique pour renforcer les défenses de l'organisme, particulièrement efficace en prévention hivernale.</p>
<h4>Bienfaits</h4>
<ul>
<li><strong>Immunité</strong> — Soutien puissant des défenses naturelles</li>
<li><strong>Hiver</strong> — Prépare l'organisme à la saison froide</li>
<li><strong>Voies respiratoires</strong> — Confort respiratoire</li>
</ul>`,
        weight: "30",
        attributes: [
            { name: "Marque", options: ["Orient Relais"], visible: true },
            { name: "Contenance", options: ["60 gélules"], visible: true },
        ],
    },
    "manjistha-garance-bio-poudre-100g": {
        short_description: "Poudre ayurvédique Manjistha bio. Éclat du teint et coloration capillaire naturelle.",
        description: `<h3>Manjistha (Garance) Bio — Poudre 100g</h3>
<p>Poudre ayurvédique de <strong>Manjistha</strong> (Rubia cordifolia), réputée pour l'éclat du teint (anti-taches) et comme coloration capillaire naturelle apportant de beaux reflets acajou.</p>
<h4>Utilisations</h4>
<ul>
<li><strong>Masque visage</strong> — Mélangée à de l'eau ou de l'hydrolat, en masque 15min</li>
<li><strong>Coloration capillaire</strong> — Mélangée au henné pour des reflets acajou</li>
<li><strong>Teint unifié</strong> — Atténue les taches pigmentaires</li>
</ul>`,
        weight: "100",
        attributes: [
            { name: "Marque", options: ["Orient Relais"], visible: true },
            { name: "Contenance", options: ["100g"], visible: true },
            { name: "Certification", options: ["Bio"], visible: true },
        ],
    },
    "baume-demaquillant-120g": {
        short_description: "Baume démaquillant fondant 120g. Élimine le maquillage sans dessécher la peau.",
        description: `<h3>Baume Démaquillant — 120g</h3>
<p>Baume fondant qui élimine efficacement le maquillage, même waterproof, et les impuretés <strong>sans dessécher la peau</strong>. Texture onctueuse qui se transforme en lait au contact de l'eau.</p>
<h4>Utilisation</h4>
<p>Appliquer sur peau sèche, masser en cercles, puis émulsionner avec un peu d'eau et rincer.</p>`,
        weight: "120",
        attributes: [
            { name: "Marque", options: ["Najel"], visible: true },
            { name: "Contenance", options: ["120g"], visible: true },
        ],
    },
    "elixir-aux-trois-huiles-fleur-doranger": {
        short_description: "Élixir aux trois huiles, parfum fleur d'oranger. Huile satinée pour le corps.",
        description: `<h3>Élixir aux Trois Huiles — Fleur d'Oranger — 125ml</h3>
<p>Huile de beauté satinée pour le corps, au parfum envoûtant de <strong>fleur d'oranger</strong>. Synergie de trois huiles précieuses pour une peau douce et lumineuse.</p>`,
        weight: "125",
        attributes: [
            { name: "Marque", options: ["Najel"], visible: true },
            { name: "Contenance", options: ["125ml"], visible: true },
        ],
    },
    "gommage-visage-argile-agrumes": {
        short_description: "Gommage visage argile et agrumes. Exfoliation douce, peau purifiée et éclatante.",
        description: `<h3>Gommage Visage Argile & Agrumes — 75ml</h3>
<p>Exfolie en douceur et purifie la peau grâce à l'<strong>argile</strong> naturelle. Les <strong>agrumes</strong> apportent éclat et fraîcheur pour un teint lumineux.</p>`,
        weight: "75",
        attributes: [
            { name: "Marque", options: ["Najel"], visible: true },
            { name: "Contenance", options: ["75ml"], visible: true },
        ],
    },
    "huile-essentielle-clou-de-girofle-10ml": {
        short_description: "HE Clou de Girofle bio 10ml. Purifiante, confort dentaire et tonique.",
        description: `<h3>Huile Essentielle de Clou de Girofle Bio — 10ml</h3>
<p>Huile essentielle <strong>100% pure et naturelle</strong>, reconnue pour ses propriétés purifiantes puissantes et son action apaisante sur le confort dentaire.</p>
<h4>Utilisations</h4>
<ul>
<li><strong>Confort dentaire</strong> — 1 goutte sur un coton-tige sur la zone sensible</li>
<li><strong>Purification</strong> — En diffusion pour assainir l'atmosphère</li>
<li><strong>Cuisine</strong> — 1 goutte pour aromatiser vos plats</li>
</ul>`,
        weight: "10",
        attributes: [
            { name: "Marque", options: ["Terra Etica"], visible: true },
            { name: "Contenance", options: ["10ml"], visible: true },
            { name: "Certification", options: ["Bio"], visible: true },
        ],
    },
    "huile-essentielle-cypres-bio-5ml": {
        short_description: "HE Cyprès bio 5ml. Alliée de la circulation, jambes légères et toniques.",
        description: `<h3>Huile Essentielle de Cyprès Bio — 5ml</h3>
<p>L'alliée de la <strong>circulation</strong>. Idéale en massage diluée dans une huile végétale pour des jambes légères et toniques.</p>
<h4>Utilisations</h4>
<ul>
<li><strong>Massage</strong> — Diluée à 5% dans une huile végétale, masser les jambes du bas vers le haut</li>
<li><strong>Diffusion</strong> — Favorise la concentration</li>
</ul>`,
        weight: "5",
        attributes: [
            { name: "Marque", options: ["Terra Etica"], visible: true },
            { name: "Contenance", options: ["5ml"], visible: true },
            { name: "Certification", options: ["Bio"], visible: true },
        ],
    },
    "huile-essentielle-laurier-noble-bio-5ml": {
        short_description: "HE Laurier Noble bio 5ml. Polyvalente : confort buccal, articulaire et confiance en soi.",
        description: `<h3>Huile Essentielle de Laurier Noble Bio — 5ml</h3>
<p>Huile <strong>polyvalente</strong> par excellence : confort buccal, soutien articulaire et renforcement de la confiance en soi.</p>
<h4>Utilisations</h4>
<ul>
<li><strong>Confort buccal</strong> — 1 goutte mélangée au dentifrice</li>
<li><strong>Articulations</strong> — En massage diluée</li>
<li><strong>Bien-être émotionnel</strong> — En olfaction pour la confiance</li>
</ul>`,
        weight: "5",
        attributes: [
            { name: "Marque", options: ["Terra Etica"], visible: true },
            { name: "Contenance", options: ["5ml"], visible: true },
            { name: "Certification", options: ["Bio"], visible: true },
        ],
    },
    "huile-essentielle-niaouli-bio-10ml": {
        short_description: "HE Niaouli bio 10ml. Purifiante et respiratoire, incontournable de l'hiver.",
        description: `<h3>Huile Essentielle de Niaouli Bio — 10ml</h3>
<p><strong>Purifiante et respiratoire</strong>, idéale pour passer l'hiver sereinement. Origine Madagascar.</p>
<h4>Utilisations</h4>
<ul>
<li><strong>Voies respiratoires</strong> — En inhalation ou en diffusion</li>
<li><strong>Massage thoracique</strong> — Diluée à 10%, en friction sur le thorax</li>
<li><strong>Purification</strong> — Assainit l'air ambiant</li>
</ul>`,
        weight: "10",
        attributes: [
            { name: "Marque", options: ["Terra Etica"], visible: true },
            { name: "Contenance", options: ["10ml"], visible: true },
            { name: "Certification", options: ["Bio"], visible: true },
            { name: "Origine", options: ["Madagascar"], visible: true },
        ],
    },
    "huile-essentielle-eucalyptus-globulus-5ml": {
        short_description: "HE Eucalyptus Globulus 5ml. Le classique de l'hiver pour dégager les voies respiratoires.",
        description: `<h3>Huile Essentielle d'Eucalyptus Globulus — 5ml</h3>
<p>Le <strong>grand classique de l'hiver</strong> pour dégager les voies respiratoires. Fraîcheur intense et effet décongestionnant immédiat.</p>
<h4>Utilisations</h4>
<ul>
<li><strong>Inhalation</strong> — 3 gouttes dans un bol d'eau chaude</li>
<li><strong>Diffusion</strong> — Purifie l'air et facilite la respiration</li>
<li><strong>Massage</strong> — Diluée, en friction sur le thorax</li>
</ul>`,
        weight: "5",
        attributes: [
            { name: "Marque", options: ["Terra Etica"], visible: true },
            { name: "Contenance", options: ["5ml"], visible: true },
        ],
    },
    "huile-essentielle-orange-douce-bio-10ml": {
        short_description: "HE Orange Douce bio 10ml. Détente, sommeil et parfum d'ambiance fruité.",
        description: `<h3>Huile Essentielle d'Orange Douce Bio — 10ml</h3>
<p>Parfum fruité et apaisant. Favorise la <strong>détente et le sommeil</strong>, parfume agréablement l'intérieur en diffusion.</p>
<h4>Utilisations</h4>
<ul>
<li><strong>Diffusion</strong> — Crée une atmosphère douce et relaxante</li>
<li><strong>Sommeil</strong> — Quelques gouttes sur l'oreiller</li>
<li><strong>Cuisine</strong> — 1 goutte dans vos desserts</li>
</ul>`,
        weight: "10",
        attributes: [
            { name: "Marque", options: ["Terra Etica"], visible: true },
            { name: "Contenance", options: ["10ml"], visible: true },
            { name: "Certification", options: ["Bio"], visible: true },
        ],
    },
    "huile-essentielle-ravintsara-bio-10ml": {
        short_description: "HE Ravintsara bio 10ml. L'indispensable de l'hiver : antivirale et immunité.",
        description: `<h3>Huile Essentielle de Ravintsara Bio — 10ml</h3>
<p><strong>L'indispensable de l'hiver !</strong> Le Ravintsara est reconnu comme l'une des huiles antivirales les plus puissantes. Soutien immunitaire pour toute la famille.</p>
<h4>Utilisations</h4>
<ul>
<li><strong>Prévention</strong> — 2 gouttes sur les poignets chaque matin en hiver</li>
<li><strong>Diffusion</strong> — Purifie l'air et booste l'immunité</li>
<li><strong>Massage</strong> — Diluée, le long de la colonne vertébrale</li>
</ul>`,
        weight: "10",
        attributes: [
            { name: "Marque", options: ["Terra Etica"], visible: true },
            { name: "Contenance", options: ["10ml"], visible: true },
            { name: "Certification", options: ["Bio"], visible: true },
            { name: "Origine", options: ["Madagascar"], visible: true },
        ],
    },
    "huile-essentielle-thym-a-thymol-bio-5ml": {
        short_description: "HE Thym à Thymol bio 5ml. Puissante, à large spectre d'action. Usage précautionneux.",
        description: `<h3>Huile Essentielle de Thym à Thymol Bio — 5ml</h3>
<p>Huile essentielle <strong>puissante à large spectre d'action</strong>. Le Thym à Thymol est l'une des HE les plus actives. À utiliser avec précaution et toujours diluée.</p>
<h4>Utilisations</h4>
<ul>
<li><strong>Immunité</strong> — Soutien puissant des défenses</li>
<li><strong>Tonique général</strong> — Revitalise l'organisme</li>
</ul>
<p><em>⚠️ Huile puissante, à utiliser diluée. Déconseillée aux femmes enceintes et enfants de moins de 12 ans.</em></p>`,
        weight: "5",
        attributes: [
            { name: "Marque", options: ["Terra Etica"], visible: true },
            { name: "Contenance", options: ["5ml"], visible: true },
            { name: "Certification", options: ["Bio"], visible: true },
        ],
    },
    "coffret-de-douceur-dhiver-najel": {
        short_description: "Coffret cocooning d'hiver Najel. Le cadeau idéal pour prendre soin de ses proches.",
        description: `<h3>Coffret de Douceur d'Hiver Najel</h3>
<p>Le <strong>cadeau idéal</strong> pour chouchouter ses proches cet hiver. Une sélection cocooning de soins Najel pour prendre soin de soi pendant la saison froide.</p>`,
        attributes: [
            { name: "Marque", options: ["Najel"], visible: true },
            { name: "Type", options: ["Coffret cadeau"], visible: true },
        ],
    },
    "coffret-cadeau-cocooning-najel": {
        short_description: "Coffret cadeau cocooning Najel. Transformez votre salle de bain en spa oriental.",
        description: `<h3>Coffret Cadeau Cocooning Najel</h3>
<p>Un ensemble de <strong>soins relaxants</strong> pour transformer sa salle de bain en spa. Détente et bien-être absolu garantis avec cette sélection Najel.</p>`,
        attributes: [
            { name: "Marque", options: ["Najel"], visible: true },
            { name: "Type", options: ["Coffret cadeau"], visible: true },
        ],
    },
    "coffret-cadeau-produits-de-la-mer-morte": {
        short_description: "Coffret Produits de la Mer Morte. Richesse minérale exceptionnelle pour la peau.",
        description: `<h3>Coffret Cadeau Produits de la Mer Morte</h3>
<p>Les <strong>bienfaits légendaires de la Mer Morte</strong> dans un coffret. Richesse minérale exceptionnelle (magnésium, calcium, potassium) pour une peau purifiée et revitalisée.</p>`,
        attributes: [
            { name: "Marque", options: ["Najel"], visible: true },
            { name: "Type", options: ["Coffret cadeau"], visible: true },
        ],
    },
    "coffret-cadeau-najel-decouverte-dalep": {
        short_description: "Coffret Découverte d'Alep. Initiation aux trésors du savon traditionnel et soins orientaux.",
        description: `<h3>Coffret Cadeau Najel — Découverte d'Alep</h3>
<p>Initiation aux <strong>trésors d'Alep</strong> : l'authenticité du savon traditionnel et des soins orientaux dans un coffret découverte soigneusement composé.</p>`,
        attributes: [
            { name: "Marque", options: ["Najel"], visible: true },
            { name: "Type", options: ["Coffret cadeau"], visible: true },
        ],
    },
    "sac-a-savon-sisal-et-coton": {
        short_description: "Sac à savon en sisal et coton bio. Zéro déchet et exfoliation douce sous la douche.",
        description: `<h3>Sac à Savon Sisal & Coton</h3>
<p>Accessoire <strong>zéro déchet</strong> indispensable. Permet d'utiliser ses savons jusqu'au bout et offre un gommage doux et naturel sous la douche grâce aux fibres de sisal.</p>`,
        attributes: [
            { name: "Marque", options: ["Najel"], visible: true },
            { name: "Matière", options: ["Sisal et Coton bio"], visible: true },
        ],
    },
    "spray-dambiance-cedre-citron-100ml": {
        short_description: "Spray d'ambiance naturel Cèdre & Citron. Fraîcheur boisée pour une maison saine.",
        description: `<h3>Spray d'Ambiance Cèdre Citron — 100ml</h3>
<p>Parfum d'ambiance 100% naturel pour une <strong>maison saine et fraîche</strong>. Notes boisées de cèdre associées à la vivacité du citron pour une atmosphère purifiée.</p>`,
        weight: "100",
        attributes: [
            { name: "Marque", options: ["Najel"], visible: true },
            { name: "Contenance", options: ["100ml"], visible: true },
        ],
    },
};

// ─── Main function ──────────────────────────────────────────────

async function enrichAllProducts() {
    console.log("🔄 Fetching all products from WooCommerce...");

    // Fetch all products (paginated)
    let allProducts: any[] = [];
    let page = 1;
    while (true) {
        const { data } = await client.get("products", { per_page: 50, page, status: "publish" });
        allProducts = allProducts.concat(data);
        if (data.length < 50) break;
        page++;
    }

    console.log(`📦 Found ${allProducts.length} products. Starting enrichment...\n`);

    let updated = 0;
    let skipped = 0;

    for (const product of allProducts) {
        const enrichment = enrichments[product.slug];
        if (!enrichment) {
            console.log(`⏭️  ${product.name} (${product.slug}) — No enrichment data, skipping`);
            skipped++;
            continue;
        }

        console.log(`✏️  Updating: ${product.name}...`);

        const updateData: any = {
            description: enrichment.description,
            short_description: enrichment.short_description,
        };

        if (enrichment.weight) {
            updateData.weight = enrichment.weight;
        }

        if (enrichment.attributes) {
            updateData.attributes = enrichment.attributes;
        }

        try {
            await client.put(`products/${product.id}`, updateData);
            console.log(`   ✅ Done!`);
            updated++;
        } catch (e: any) {
            console.error(`   ❌ Error:`, e.response?.data?.message || e.message);
        }
    }

    console.log(`\n🎉 Enrichment complete! Updated: ${updated}, Skipped: ${skipped}`);
}

enrichAllProducts();
