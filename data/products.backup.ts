// Complete Product Catalog for Orient Relais
// Based on real data from orient-relais.com
// Updated: 18/02/2026

export interface Product {
    id: string;
    title: string;
    slug: string;
    price: number;
    originalPrice?: number; // For promo items
    description: string;
    shortDescription: string;
    image: string;
    images?: string[];
    category: string;
    subcategory?: string;
    badges?: { text: string; color: "green" | "orange" | "stone" | "blue" | "pink" }[];
    rating: number;
    reviews: number;
    inStock: boolean;
    featured?: boolean;
    benefits?: string[];
    ingredients?: string[];
    detailedBenefits?: string; // HTML content for the Benefits tab
    usage?: string;
    characteristics?: string; // HTML content for the Characteristics tab
    weight?: string;
    certifications?: string[]; // e.g. ['bio', 'cosmos', 'ecocert', 'france', 'vegan', 'ab', 'gelules']
    details?: Record<string, string>; // e.g. { "EAN": "..." }
}

// ==========================================
// SAVONS BIO
// ==========================================
export const SAVONS: Product[] = [
    {
        id: "savon-traditionnel-40",
        title: "Savon d'Alep traditionnel 40% laurier",
        slug: "savon-dalep-traditionnel-40-laurier",
        price: 6.50,
        originalPrice: 8.00,
        description: "Le savon d'Alep authentique avec 40% d'huile de baie de laurier. Cette concentration élevée en laurier lui confère des propriétés antiseptiques et purifiantes exceptionnelles, idéal pour les peaux grasses ou à problèmes.",
        shortDescription: "Savon d'Alep authentique haute concentration en laurier (40%).",
        image: "/products/savon-traditionnel-40.webp",
        category: "savons",
        badges: [{ text: "Best-seller", color: "orange" }, { text: "40% Laurier", color: "green" }],
        rating: 4.9,
        reviews: 234,
        inStock: true,
        featured: true,
        benefits: ["Antiseptique", "Purifiant", "Peaux grasses", "Acné"],
        ingredients: ["60% Huile d'olive", "40% Huile de baie de laurier"],
        weight: "185g"
    },
    {
        id: "savon-rose-damas",
        title: "Savon d'Alep à la rose de Damas bio",
        slug: "savon-dalep-rose-damas-bio",
        price: 4.50,
        originalPrice: 5.00,
        description: "Ce savon d'Alep enrichi à l'huile essentielle de rose de Damas offre une expérience sensorielle unique. La rose de Damas, connue pour ses propriétés régénérantes et apaisantes, sublime ce savon traditionnel pour un soin délicat de votre peau.",
        shortDescription: "Savon d'Alep enrichi à l'huile essentielle de rose de Damas bio.",
        image: "/products/savon-rose-damas.webp",
        category: "savons",
        badges: [{ text: "Promo", color: "orange" }, { text: "Bio", color: "green" }],
        rating: 4.8,
        reviews: 67,
        inStock: true,
        benefits: ["Régénérant", "Apaisant", "Parfum délicat", "Tous types de peaux"],
        ingredients: ["Huile d'olive", "Huile de baie de laurier", "Huile essentielle de rose de Damas"],
        usage: "Faire mousser sur peau humide, masser délicatement puis rincer.",
        weight: "100g"
    },
    {
        id: "savon-ambre-oud",
        title: "Savon d'Alep Ambre et Oud",
        slug: "savon-dalep-ambre-oud",
        price: 6.00,
        originalPrice: 7.00,
        description: "Alliance luxueuse de l'ambre et du oud, ce savon d'Alep offre un parfum envoûtant et raffiné. Le oud, bois précieux d'Orient, apporte une note boisée et chaleureuse à ce savon d'exception.",
        shortDescription: "Savon d'Alep au parfum envoûtant d'ambre et de oud.",
        image: "/products/savon-ambre-oud.webp",
        category: "savons",
        badges: [{ text: "Promo", color: "orange" }, { text: "Luxe", color: "stone" }],
        rating: 4.9,
        reviews: 89,
        inStock: true,
        featured: true,
        benefits: ["Parfum luxueux", "Hydratant", "Longue tenue"],
        weight: "150g"
    },
    {
        id: "savon-mer-morte",
        title: "Savon d'Alep à la boue de la mer Morte",
        slug: "savon-dalep-boue-mer-morte",
        price: 3.50,
        originalPrice: 4.50,
        description: "Ce savon combine les bienfaits du savon d'Alep traditionnel avec les minéraux de la boue de la mer Morte. Idéal pour les peaux à problèmes, il nettoie en profondeur tout en apaisant les irritations.",
        shortDescription: "Savon d'Alep enrichi à la boue de la mer Morte.",
        image: "/products/savon-mer-morte.webp",
        category: "savons",
        badges: [{ text: "Promo", color: "orange" }, { text: "Peaux sensibles", color: "green" }],
        rating: 4.7,
        reviews: 56,
        inStock: true,
        benefits: ["Détoxifiant", "Minéraux", "Peaux à problèmes", "Apaisant"],
        weight: "100g"
    },
    {
        id: "savon-encens",
        title: "Savon d'Alep à l'encens",
        slug: "savon-dalep-encens",
        price: 1.50,
        description: "Ce savon d'Alep parfumé à l'encens vous transporte dans une ambiance orientale authentique. L'encens, utilisé depuis des millénaires, apporte ses propriétés purifiantes à ce savon traditionnel.",
        shortDescription: "Savon d'Alep traditionnel parfumé à l'encens.",
        image: "/products/savon-encens.webp",
        category: "savons",
        badges: [{ text: "Petit prix", color: "stone" }],
        rating: 4.6,
        reviews: 42,
        inStock: true,
        benefits: ["Purifiant", "Parfum oriental", "Économique"],
        weight: "20g"
    },
    {
        id: "savon-liquide",
        title: "Savon d'Alep liquide 5% laurier",
        slug: "savon-dalep-liquide-5-laurier",
        price: 5.00,
        originalPrice: 6.00,
        description: "Version liquide du savon d'Alep traditionnel, pratique pour un usage quotidien. Avec 5% d'huile de laurier, il convient à toute la famille pour le corps et les mains.",
        shortDescription: "Savon d'Alep liquide pratique pour usage quotidien.",
        image: "/products/savon-liquide.webp",
        category: "savons",
        subcategory: "savon-liquide",
        badges: [{ text: "Pratique", color: "stone" }],
        rating: 4.5,
        reviews: 78,
        inStock: true,
        benefits: ["Usage quotidien", "Toute la famille", "Pratique"],
        weight: "200ml"
    },
    {
        id: "gel-douche-ambre-oud",
        title: "Gel douche parfum Ambre et Oud",
        slug: "gel-douche-ambre-oud",
        price: 8.00,
        originalPrice: 10.00,
        description: "Gel douche onctueux au parfum envoûtant d'ambre et de oud. Sa formule douce nettoie la peau en préservant son hydratation naturelle tout en laissant un parfum délicat.",
        shortDescription: "Gel douche au parfum luxueux d'ambre et oud.",
        image: "/products/gel-douche.webp",
        category: "savons",
        subcategory: "savon-liquide",
        badges: [{ text: "Promo", color: "orange" }],
        rating: 4.7,
        reviews: 34,
        inStock: true,
        weight: "500ml"
    }
];

// ==========================================
// COMPLÉMENTS ALIMENTAIRES BIO
// ==========================================
export const COMPLEMENTS: Product[] = [
    {
        id: "shilajit",
        title: "Shilajit",
        slug: "shilajit",
        price: 21.99,
        description: "Le Shilajit est une résine minérale rare de l'Himalaya, riche en acide fulvique et minéraux, connue comme revitalisant puissant.",
        shortDescription: "Résine minérale revitalisante de l'Himalaya.",
        image: "/products/shilajit.webp",
        category: "complements-alimentaires",
        badges: [{ text: "Puissant", color: "stone" }, { text: "Rare", color: "orange" }],
        rating: 4.9,
        reviews: 12,
        inStock: true,
        featured: true,
        benefits: ["Énergie", "Vitalité", "Récupération", "Mémoire"],
        weight: "60 gélules"
    },
    {
        id: "guduchi",
        title: "Guduchi Bio – 60 gélules",
        slug: "guduchi-bio-60-gelules",
        price: 12.99,
        description: "Le Guduchi (Giloy) est une plante ayurvédique majeure pour renforcer le système immunitaire et détoxifier l'organisme. Surnommé 'l'Amrita' (nectar d'immortalité).",
        shortDescription: "Plante ayurvédique pour l'immunité et la détoxification.",
        image: "/products/guduchi.webp",
        category: "complements-alimentaires",
        badges: [{ text: "Bio", color: "green" }, { text: "Ayurvéda", color: "stone" }],
        rating: 5.0,
        reviews: 15,
        inStock: true,
        benefits: ["Immunité", "Détox", "Tonus", "Résistance"],
        weight: "60 gélules"
    },
    {
        id: "bilva",
        title: "Bilva Bio – 60 gélules",
        slug: "bilva-bio-60-gelules",
        price: 11.99,
        description: "Le Bilva est un fruit sacré en Inde, utilisé pour le confort digestif et l'équilibre intestinal. Il aide à réguler le transit et apaiser les intestins sensibles.",
        shortDescription: "Soutien digestif et équilibre intestinal.",
        image: "/products/bilva.webp",
        category: "complements-alimentaires",
        badges: [{ text: "Bio", color: "green" }],
        rating: 4.4,
        reviews: 28,
        inStock: true,
        benefits: ["Digestion", "Transit", "Confort intestinal"],
        weight: "60 gélules"
    },
    {
        id: "musta",
        title: "Musta – 60 gélules",
        slug: "musta-60-gellules-vegetales-335-mg",
        price: 12.50,
        description: "Le Musta (Souchet rond) est traditionnellement utilisé pour soutenir la digestion, réguler l'appétit et favoriser un métabolisme sain.",
        shortDescription: "Plante ayurvédique pour la digestion et le métabolisme.",
        image: "/products/musta.webp",
        category: "complements-alimentaires",
        badges: [{ text: "Ayurvéda", color: "green" }],
        rating: 4.5,
        reviews: 10,
        inStock: true,
        benefits: ["Digestion", "Métabolisme", "Appétit"],
        weight: "60 gélules"
    },
    {
        id: "rasavana",
        title: "Rasavana bio – 60 gélules",
        slug: "rasavana-bio-60-gelules",
        price: 14.50,
        originalPrice: 16.00,
        description: "Un complexe ayurvédique unique (Rasayana) pour la régénération et la vitalité. Mélange de plantes adaptogènes pour soutenir l'organisme face au stress.",
        shortDescription: "Complexe revitalisant et anti-stress.",
        image: "/products/rasavana.webp",
        category: "complements-alimentaires",
        badges: [{ text: "Promo", color: "orange" }, { text: "Complexe", color: "stone" }],
        rating: 4.8,
        reviews: 32,
        inStock: true,
        benefits: ["Vitalité", "Anti-stress", "Adaptogène"],
        weight: "60 gélules"
    },

    {
        id: "gingembre-indien",
        title: "Gingembre indien bio (Andraka) – 60 gélules",
        slug: "gingembre-indien-bio-andraka-60-gelules",
        price: 13.50,
        originalPrice: 15.00,
        description: "Variété indienne du gingembre, particulièrement riche en principes actifs pour une efficacité renforcée sur la digestion et l'inflammation.",
        shortDescription: "Gingembre indien concentré.",
        image: "/products/gingembre.webp",
        category: "complements-alimentaires",
        badges: [{ text: "Bio", color: "green" }, { text: "Intense", color: "orange" }],
        rating: 4.8,
        reviews: 45,
        inStock: true,
        weight: "60 gélules"
    },
    {
        id: "curcuma-pepper",
        title: "Curcuma Pepper – 60 gélules",
        slug: "curcuma-pepper-60-gelules",
        price: 13.50,
        description: "Synergie de Curcuma et Poivre noir pour une absorption maximale de la curcumine. Puissant anti-inflammatoire naturel et antioxydant.",
        shortDescription: "Curcuma et Poivre noir pour les articulations.",
        image: "/products/curcuma-pepper.webp",
        category: "complements-alimentaires",
        badges: [{ text: "Articulations", color: "orange" }],
        rating: 4.7,
        reviews: 58,
        inStock: true,
        benefits: ["Articulations", "Anti-inflammatoire", "Mobilité"],
        weight: "60 gélules"
    },
    {
        id: "vidanga",
        title: "Vidanga Extrait – 60 gélules",
        slug: "vidanga-extrait-60-gelules",
        price: 14.50,
        originalPrice: 18.00,
        description: "Le Vidanga est utilisé en Ayurvéda pour purifier le système digestif et maintenir une flore intestinale saine. Action détoxifiante.",
        shortDescription: "Purifiant digestif et flore intestinale.",
        image: "/products/vidanga.webp",
        category: "complements-alimentaires",
        badges: [{ text: "Promo", color: "orange" }, { text: "Détox", color: "green" }],
        rating: 4.6,
        reviews: 38,
        inStock: true,
        benefits: ["Détox", "Flore intestinale", "Purification"],
        weight: "60 gélules"
    },
    {
        id: "moringa",
        title: "Moringa – 60 gélules",
        slug: "moringa-60-gelules",
        price: 10.00,
        originalPrice: 12.00,
        description: "Le 'Miracle Tree' dans une gélule. Exceptionnellement riche en nutriments, vitamines et acides aminés pour combler les carences et booster l'énergie.",
        shortDescription: "Superaliment complet pour la vitalité.",
        image: "/products/moringa.webp",
        category: "complements-alimentaires",
        badges: [{ text: "Promo", color: "orange" }, { text: "Superfood", color: "stone" }],
        rating: 4.7,
        reviews: 65,
        inStock: true,
        benefits: ["Nutrition", "Énergie", "Vitamines"],
        weight: "60 gélules"
    },
    {
        id: "lithotamne",
        title: "Lithotamne – 90 gélules",
        slug: "lithotamne-90-gelules",
        price: 9.90,
        description: "Algue calcaire naturellement riche en calcium et magnésium biodisponibles. Idéal pour reminéraliser l'organisme et apaiser l'acidité gastrique.",
        shortDescription: "Calcium végétal et équilibre acido-basique.",
        image: "/products/lithotamne.webp",
        category: "complements-alimentaires",
        badges: [{ text: "Minéraux", color: "blue" }],
        rating: 4.5,
        reviews: 47,
        inStock: true,
        benefits: ["Calcium", "Os solides", "Anti-acide"],
        weight: "90 gélules"
    },
    {
        id: "myrtille-acerola",
        title: "Myrtille Acérola bio – 90 gélules",
        slug: "myrtille-acerola-bio-90-gelules",
        price: 10.00,
        originalPrice: 12.00,
        description: "Duo antioxydant puissant : la Myrtille pour la vision et l'Acérola (Vitamine C) pour le tonus et l'immunité.",
        shortDescription: "Vision et Tonus (Vitamine C).",
        image: "/products/myrtille-acerola.webp",
        category: "complements-alimentaires",
        badges: [{ text: "Promo", color: "orange" }, { text: "Bio", color: "green" }],
        rating: 4.8,
        reviews: 22,
        inStock: true,
        benefits: ["Vision", "Tonus", "Antioxydant"],
        weight: "90 gélules"
    },
    {
        id: "huile-nigelle-capsules",
        title: "Huile de Nigelle Bio – 120 capsules",
        slug: "huile-nigelle-bio-120-capsules",
        price: 12.00,
        originalPrice: 15.90,
        description: "L'huile de nigelle (Cumin noir) en capsules pratiques. Renforce les défenses naturelles et apaise les peaux à problèmes de l'intérieur.",
        shortDescription: "Immunité et peau saine.",
        image: "/products/nigelle-capsules.webp",
        category: "complements-alimentaires",
        badges: [{ text: "Promo", color: "orange" }, { text: "Bio", color: "green" }],
        rating: 4.9,
        reviews: 156,
        inStock: true,
        featured: true,
        benefits: ["Immunité", "Peau", "Allergies"],
        weight: "120 capsules"
    },
    {
        id: "onagre-bourrache",
        title: "Huile Onagre-Bourrache Bio – 120 capsules",
        slug: "huile-onagre-bourrache-bio",
        price: 12.50,
        originalPrice: 15.00,
        description: "Le duo féminin par excellence. Riche en acides gras essentiels (GLA) pour l'éclat de la peau, l'hydratation et le confort prémenstruel/ménopause.",
        shortDescription: "Beauté de la peau et équilibre féminin.",
        image: "/products/onagre-bourrache.webp",
        category: "complements-alimentaires",
        subcategory: "femme",
        badges: [{ text: "Promo", color: "orange" }, { text: "Femme", color: "pink" }],
        rating: 4.7,
        reviews: 89,
        inStock: true,
        benefits: ["Hydratation", "Anti-âge", "Confort féminin"],
        weight: "120 capsules"
    },
    {
        id: "pollen",
        title: "Pollen d'abeille bio – 150g",
        slug: "pollen-abeille-bio",
        price: 7.00,
        description: "Pollen polyfloral bio, véritable concentré de vitalité. Riche en protéines végétales, il est parfait pour les sportifs et les personnes fatiguées.",
        shortDescription: "Superaliment de la ruche.",
        image: "/products/pollen.webp",
        category: "complements-alimentaires",
        badges: [{ text: "Bio", color: "green" }, { text: "Vitalité", color: "orange" }],
        rating: 4.8,
        reviews: 92,
        inStock: true,
        benefits: ["Énergie", "Protéines", "Immunité"],
        weight: "150g"
    },
    {
        id: "miel-bourdaine-250",
        title: "Miel de Bourdaine – 250g",
        slug: "miel-bourdaine-250g",
        price: 7.00,
        description: "Un miel rare à la texture fine et au goût délicat. Reconnu pour ses propriétés douces sur la digestion.",
        shortDescription: "Miel rare et digestif.",
        image: "/products/miel-de-bourdaine.webp",
        category: "complements-alimentaires",
        subcategory: "miels",
        badges: [{ text: "Rare", color: "stone" }],
        rating: 4.8,
        reviews: 52,
        inStock: true,
        weight: "250g"
    },
    {
        id: "miel-montagne-250",
        title: "Miel de montagne – 250g",
        slug: "miel-montagne-250g",
        price: 7.00,
        description: "Le miel toutes fleurs de nos montagnes. Un goût riche et authentique, reflet de la biodiversité préservée des altitudes.",
        shortDescription: "Miel authentique des montagnes.",
        image: "/products/miel-montagne.webp",
        category: "complements-alimentaires",
        subcategory: "miels",
        badges: [{ text: "Terroir", color: "green" }],
        rating: 4.9,
        reviews: 38,
        inStock: true,
        weight: "250g"
    },
    {
        id: "miel-bourdaine-500",
        title: "Miel de Bourdaine – 500g",
        slug: "miel-de-bourdaine-500-g",
        price: 12.50,
        description: "Format familial 500g du Miel de Bourdaine. Pour les amateurs de ce miel d'exception.",
        shortDescription: "Miel de Bourdaine grand format.",
        image: "/products/miel-de-bourdaine.webp",
        category: "complements-alimentaires",
        subcategory: "miels",
        badges: [{ text: "Eco", color: "stone" }],
        rating: 4.9,
        reviews: 0,
        inStock: true,
        weight: "500g"
    },
    {
        id: "miel-montagne-500",
        title: "Miel de Montagne – 500g",
        slug: "miel-de-montagne-500g",
        price: 12.50,
        description: "Format familial 500g du Miel de Montagne. Idéal pour toute la famille.",
        shortDescription: "Miel de Montagne grand format.",
        image: "/products/miel-montagne.webp",
        category: "complements-alimentaires",
        subcategory: "miels",
        badges: [{ text: "Famille", color: "green" }],
        rating: 4.9,
        reviews: 0,
        inStock: true,
        weight: "500g"
    },
    {
        id: "andrographis",
        title: "Andrographis (Echinacée d'Inde) – 60 gélules",
        slug: "andrographis-60-gelules",
        price: 12.00,
        description: "Soutien immunitaire naturel pour préparer l'hiver. L'Andrographis est une plante majeure pour les défenses de l'organisme.",
        shortDescription: "Bouclier immunitaire naturel.",
        image: "/products/andrographis.webp",
        category: "complements-alimentaires",
        badges: [{ text: "Rupture", color: "stone" }],
        rating: 4.5,
        reviews: 41,
        inStock: false,
        benefits: ["Immunité", "Hiver", "Respiratoire"],
        weight: "60 gélules"
    }
];

// ==========================================
// HUILES ESSENTIELLES BIO (Terra Etica)
// ==========================================
export const HUILES_ESSENTIELLES: Product[] = [
    {
        id: "he-girofle",
        title: "Huile Essentielle Clou de Girofle – 10ml",
        slug: "huile-essentielle-clou-de-girofle-10ml-terra-etica",
        price: 6.00,
        originalPrice: 7.50,
        description: "Huile essentielle puissante, reconnue pour ses propriétés purifiantes et apaisantes (confort dentaire).",
        shortDescription: "Purifiante et confort dentaire.",
        image: "/products/he-clou-girofle.webp",
        category: "huiles-essentielles",
        badges: [{ text: "Promo", color: "orange" }, { text: "Bio", color: "green" }],
        rating: 4.8,
        reviews: 45,
        inStock: true,
        benefits: ["Purifiant", "Dentaire", "Tonique"],
        weight: "10ml"
    },
    {
        id: "he-cypres",
        title: "Huile Essentielle Cyprès Bio – 5ml",
        slug: "huile-essentielle-de-cypres-bio-5ml-terra-etica",
        price: 6.50,
        originalPrice: 8.00,
        description: "L'alliée de la circulation. Idéale en massage pour des jambes légères et toniques.",
        shortDescription: "Circulation et jambes légères.",
        image: "/products/he-cypres.webp",
        category: "huiles-essentielles",
        badges: [{ text: "Promo", color: "orange" }, { text: "Circulation", color: "blue" }],
        rating: 4.6,
        reviews: 32,
        inStock: true,
        benefits: ["Circulation", "Jambes légères", "Tonique"],
        weight: "5ml"
    },
    {
        id: "he-laurier",
        title: "Huile Essentielle Laurier Noble Bio – 5ml",
        slug: "huile-essentielle-de-laurier-noble-bio-5ml-terra-etica",
        price: 6.50,
        originalPrice: 7.50,
        description: "Huile polyvalente par excellence : confort buccal, articulaire et confiance en soi.",
        shortDescription: "Polyvalente : bouche, muscles, mental.",
        image: "/products/he-laurier.webp",
        category: "huiles-essentielles",
        badges: [{ text: "Promo", color: "orange" }, { text: "Bio", color: "green" }],
        rating: 4.8,
        reviews: 28,
        inStock: true,
        benefits: ["Bouche", "Articulations", "Confiance"],
        weight: "5ml"
    },
    {
        id: "he-niaouli",
        title: "Huile Essentielle Niaouli Bio – 10ml",
        slug: "huile-essentielle-de-niaouli-bio-10ml-terra-etica",
        price: 6.00,
        originalPrice: 7.50,
        description: "Purifiante et respiratoire, elle est idéale pour passer l'hiver sereinement. Origine Madagascar.",
        shortDescription: "Respiratoire et purifiante.",
        image: "/products/he-niaouli.webp",
        category: "huiles-essentielles",
        badges: [{ text: "Promo", color: "orange" }, { text: "Respiratoire", color: "blue" }],
        rating: 4.7,
        reviews: 67,
        inStock: true,
        benefits: ["Respiration", "Hiver", "Purifiant"],
        weight: "10ml"
    },
    {
        id: "he-eucalyptus",
        title: "Huile Essentielle Eucalyptus Globulus – 5ml",
        slug: "huile-essentielle-eucalyptus-globulus-5ml-terra-etica",
        price: 5.00,
        originalPrice: 6.00,
        description: "Le grand classique de l'hiver pour dégager les voies respiratoires. Fraîcheur intense.",
        shortDescription: "Libère la respiration.",
        image: "/products/he-eucalyptus.webp",
        category: "huiles-essentielles",
        badges: [{ text: "Promo", color: "orange" }, { text: "Hiver", color: "stone" }],
        rating: 4.6,
        reviews: 53,
        inStock: true,
        benefits: ["Respiration", "Rafraîchissant", "Hiver"],
        weight: "5ml"
    },
    {
        id: "he-orange",
        title: "Huile Essentielle Orange Douce Bio – 10ml",
        slug: "huile-essentielle-orange-douce-10ml-terra-etica",
        price: 6.00,
        originalPrice: 6.50,
        description: "Parfum fruité et apaisant. Favorise la détente, le sommeil et parfume agréablement l'intérieur en diffusion.",
        shortDescription: "Détente, sommeil et diffusion.",
        image: "/products/he-orange.webp",
        category: "huiles-essentielles",
        badges: [{ text: "Promo", color: "orange" }, { text: "Détente", color: "pink" }],
        rating: 4.8,
        reviews: 89,
        inStock: true,
        benefits: ["Sommeil", "Calme", "Diffusion"],
        weight: "10ml"
    },
    {
        id: "he-ravintsara",
        title: "Huile Essentielle Ravintsara Bio – 10ml",
        slug: "huile-essentielle-de-ravintsara-bio-10ml-terra-etica",
        price: 6.00,
        originalPrice: 6.50,
        description: "L'indispensable de l'hiver ! Antivirale puissante et soutien immunitaire pour toute la famille.",
        shortDescription: "Immunité et protection hivernale.",
        image: "/products/he-ravintsara.webp",
        category: "huiles-essentielles",
        badges: [{ text: "Best-seller", color: "orange" }, { text: "Indispensable", color: "stone" }],
        rating: 4.9,
        reviews: 124,
        inStock: true,
        featured: true,
        benefits: ["Immunité", "Hiver", "Famille"],
        weight: "10ml"
    },
    {
        id: "he-thym",
        title: "Huile Essentielle Thym à Thymol Bio – 5ml",
        slug: "huile-essentielle-thym-thymol-5ml-terra-etica",
        price: 6.00,
        originalPrice: 7.50,
        description: "Huile essentielle à large spectre d'action, très puissante. À utiliser avec précaution pour un soutien fort.",
        shortDescription: "Action puissante à large spectre.",
        image: "/products/he-thym.webp",
        category: "huiles-essentielles",
        badges: [{ text: "Puissant", color: "stone" }],
        rating: 4.5,
        reviews: 37,
        inStock: true,
        benefits: ["Puissant", "Large spectre"],
        weight: "5ml"
    }
];

// ==========================================
// SOINS & COSMÉTIQUES
// ==========================================
export const SOINS: Product[] = [
    {
        id: "manjistha",
        title: "Manjistha (Garance) Bio – Poudre 100g",
        slug: "manjistha-certifie-bio-100-g",
        price: 14.50,
        originalPrice: 17.00,
        description: "Poudre ayurvédique réputée pour l'éclat du teint (anti-taches) et la coloration capillaire naturelle (reflets acajou).",
        shortDescription: "Éclat du teint et coloration naturelle.",
        image: "/products/manjistha.webp",
        category: "soins",
        badges: [{ text: "Promo", color: "orange" }, { text: "Teint", color: "pink" }],
        rating: 5.0,
        reviews: 1,
        inStock: true,
        weight: "100g"
    },
    {
        id: "baume-demaquillant",
        title: "Baume démaquillant – 120g",
        slug: "baume-demaquillant",
        price: 13.00,
        originalPrice: 15.00,
        description: "Baume fondant qui élimine efficacement le maquillage et les impuretés sans dessécher la peau.",
        shortDescription: "Démaquillage efficace et douceur.",
        image: "/products/baume-demaquillant.webp",
        category: "soins",
        badges: [{ text: "Promo", color: "orange" }],
        rating: 4.5,
        reviews: 0,
        inStock: true,
        weight: "120g"
    },
    {
        id: "baume-coco",
        title: "Baume soin Coco",
        slug: "baume-soin-coco",
        price: 10.00,
        originalPrice: 12.00,
        description: "Soin multi-usages à la coco pour nourrir intensément corps et cheveux. Parfum gourmand.",
        shortDescription: "Nutrition corps et cheveux.",
        image: "/products/baume-soin-coco.webp",
        category: "soins",
        badges: [{ text: "Promo", color: "orange" }, { text: "Gourmand", color: "stone" }],
        rating: 4.6,
        reviews: 0,
        inStock: true,
    },
    {
        id: "creme-mains",
        title: "Crème hydratante mains et ongles",
        slug: "creme-hydratante-mains-et-ongles",
        price: 6.00,
        originalPrice: 8.00,
        description: "Hydratation et protection pour des mains douces au quotidien. Ne colle pas.",
        shortDescription: "Mains douces et protégées.",
        image: "/products/creme-mains.webp",
        category: "soins",
        badges: [{ text: "Promo", color: "orange" }],
        rating: 5.0,
        reviews: 1,
        inStock: true,
        weight: "75ml"
    },
    {
        id: "elixir-oranger",
        title: "Élixir aux trois huiles (fleur d'oranger)",
        slug: "elixir-aux-trois-huiles-fleur-oranger",
        price: 10.00,
        originalPrice: 12.00,
        description: "Huile de beauté satinée pour le corps, au parfum envoûtant de fleur d'oranger.",
        shortDescription: "Huile satinée corps.",
        image: "/products/elixir-huiles.webp",
        category: "soins",
        badges: [{ text: "Promo", color: "orange" }],
        rating: 4.8,
        reviews: 0,
        inStock: true,
        weight: "125ml"
    },
    {
        id: "gommage-argile",
        title: "Gommage visage Argile & Agrumes",
        slug: "gommage-visage-a-largile-et-aux-agrumes",
        price: 9.00,
        originalPrice: 10.00,
        description: "Exfolie en douceur et purifie la peau grâce à l'argile. Les agrumes apportent éclat et fraîcheur.",
        shortDescription: "Exfoliation douce et éclat.",
        image: "/products/gommage-argile.webp",
        category: "soins",
        badges: [{ text: "Promo", color: "orange" }],
        rating: 4.7,
        reviews: 0,
        inStock: true,
        weight: "75ml"
    },
    {
        id: "huile-dattier",
        title: "Huile sèche de Dattier du désert",
        slug: "huile-seche-de-dattier-du-desert",
        price: 17.50,
        originalPrice: 18.00,
        description: "Une huile précieuse, sèche et pénétrante, pour nourrir et réparer la peau sans effet gras.",
        shortDescription: "Huile sèche réparatrice.",
        image: "/products/huile-dattier.webp",
        category: "soins",
        badges: [{ text: "Précieux", color: "stone" }],
        rating: 4.7,
        reviews: 0,
        inStock: true,
        weight: "80ml"
    },
    {
        id: "huile-figue",
        title: "Huile de graines de Figue de Barbarie",
        slug: "huile-de-graines-de-figue-de-barbarie",
        price: 22.00,
        originalPrice: 25.00,
        description: "L'élixir de jeunesse absolu. Exceptionnellement riche en vitamine E et stérols pour lutter contre les signes de l'âge.",
        shortDescription: "Anti-âge puissant.",
        image: "/products/huile-figue-barbarie.webp",
        category: "soins",
        badges: [{ text: "Promo", color: "orange" }, { text: "Luxe", color: "stone" }],
        rating: 4.9,
        reviews: 0,
        inStock: true,
        weight: "80ml"
    }
];

// ==========================================
// COFFRETS CADEAUX
// ==========================================
export const COFFRETS: Product[] = [
    {
        id: "coffret-hiver",
        title: "Coffret de douceur d'hiver Najel",
        slug: "coffret-douceur-hiver-najel",
        price: 30.00,
        originalPrice: 35.00,
        description: "Le cadeau idéal pour chouchouter ses proches cet hiver. Une sélection cocooning pour prendre soin de soi.",
        shortDescription: "Cocooning et douceur d'hiver.",
        image: "/products/coffret-hiver.webp",
        category: "coffrets",
        badges: [{ text: "Promo", color: "orange" }, { text: "Idée cadeau", color: "stone" }],
        rating: 4.9,
        reviews: 45,
        inStock: true,
        featured: true,
        benefits: ["Cadeau", "Cocooning", "Soin complet"]
    },
    {
        id: "coffret-cocooning",
        title: "Coffret cadeau cocooning Najel",
        slug: "coffret-cocooning-najel",
        price: 30.00,
        originalPrice: 35.00,
        description: "Un ensemble de soins relaxants pour transformer sa salle de bain en spa. Détente assurée.",
        shortDescription: "Détente et bien-être absolu.",
        image: "/products/coffret-cocooning.webp", // UPDATED IMAGE
        category: "coffrets",
        badges: [{ text: "Promo", color: "orange" }, { text: "Relaxation", color: "blue" }],
        rating: 4.8,
        reviews: 38,
        inStock: true,
        benefits: ["Spa à la maison", "Détente", "Plaisir"]
    },
    {
        id: "coffret-mer-morte",
        title: "Coffret cadeau Produits de la Mer Morte",
        slug: "coffret-cadeau-mer-morte",
        price: 30.00,
        description: "Les bienfaits légendaires de la Mer Morte dans un coffret. Richesse minérale exceptionnelle pour la peau.",
        shortDescription: "Minéraux et pureté de la Mer Morte.",
        image: "/products/coffret-mer-morte.webp", // UPDATED IMAGE
        category: "coffrets",
        badges: [{ text: "Best-seller", color: "stone" }],
        rating: 4.7,
        reviews: 29,
        inStock: true,
        benefits: ["Minéraux", "Pureté", "Soin unique"]
    },
    {
        id: "coffret-decouverte",
        title: "Coffret cadeau Najel Découverte d’Alep",
        slug: "coffret-cadeau-najel-decouverte-alep",
        price: 30.00,
        description: "Initiation aux trésors d'Alep. L'authenticité du savon traditionnel et des soins orientaux.",
        shortDescription: "Authenticité et tradition d'Alep.",
        image: "/products/coffret-najel-decouverte.webp", // UPDATED IMAGE
        category: "coffrets",
        badges: [{ text: "Tradition", color: "green" }],
        rating: 4.8,
        reviews: 0,
        inStock: true,
        benefits: ["Authentique", "Voyage", "Découverte"]
    }
];

// ==========================================
// ACCESSOIRES
// ==========================================
export const ACCESSOIRES: Product[] = [
    {
        id: "sac-savon",
        title: "Sac à savon Sisal et Coton",
        slug: "sac-savon-sisal-coton",
        price: 4.00,
        description: "Accessoire zéro déchet indispensable. Permet d'utiliser ses savons jusqu'au bout et offre un gommage doux sous la douche.",
        shortDescription: "Zéro déchet et exfoliation douce.",
        image: "/products/sac-savon.webp",
        category: "accessoires",
        badges: [{ text: "Eco", color: "green" }],
        rating: 4.6,
        reviews: 87,
        inStock: true,
        featured: true,
        benefits: ["Anti-gaspillage", "Exfoliant", "Naturel"]
    },
    {
        id: "spray-cedre",
        title: "Spray d'ambiance Cèdre Citron – 100ml",
        slug: "spray-ambiance-cedre-citron",
        price: 10.00,
        originalPrice: 12.50,
        description: "Parfum d'ambiance naturel pour une maison saine et fraîche. Notes boisées et citronnées vivifiantes.",
        shortDescription: "Fraîcheur boisée pour la maison.",
        image: "/products/spray-cedre.webp",
        category: "accessoires",
        badges: [{ text: "Promo", color: "orange" }, { text: "Maison", color: "stone" }],
        rating: 4.7,
        reviews: 34,
        inStock: true,
        weight: "100ml"
    }
];

export const ALL_PRODUCTS: Product[] = [
    ...SAVONS,
    ...COMPLEMENTS,
    ...SOINS,
    ...HUILES_ESSENTIELLES,
    ...COFFRETS,
    ...ACCESSOIRES
];

// ==========================================
// HELPER FUNCTIONS
// ==========================================
export function getProductBySlug(slug: string): Product | undefined {
    return ALL_PRODUCTS.find(p => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
    return ALL_PRODUCTS.filter(p => p.category === category);
}

export function getFeaturedProducts(): Product[] {
    return ALL_PRODUCTS.filter(p => p.featured);
}

export function getPromoProducts(): Product[] {
    return ALL_PRODUCTS.filter(p =>
        // Products with a discounted price
        (p.originalPrice && p.originalPrice > p.price) ||
        // Products with a PROMO badge (orange color)
        p.badges?.some(badge => badge.text.toLowerCase().includes("promo") || badge.color === "orange")
    );
}

export function getRelatedProducts(currentProduct: Product, limit = 4): Product[] {
    return ALL_PRODUCTS
        .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
        .slice(0, limit);
}

// ==========================================
// CATEGORIES
// ==========================================
export const CATEGORIES = [
    {
        slug: "savons",
        title: "Nos Savons d'Alep Bio",
        description: "Découvrez l'authentique savon d'Alep, ancêtre de tous les savons durs. Saponifié au chaudron selon la méthode traditionnelle depuis des siècles.",
        image: "/bento-soap.webp"
    },
    {
        slug: "huiles-essentielles",
        title: "Huiles Essentielles Bio",
        description: "Des huiles essentielles 100% pures et naturelles Terra Etica pour votre bien-être au quotidien.",
        image: "/images/categories/Huiles essentiels.webp"
    },
    {
        slug: "complements-alimentaires",
        title: "Compléments Alimentaires",
        description: "Plantes ayurvédiques et produits de la ruche pour renforcer naturellement votre vitalité.",
        image: "/images/categories/Compléments alimentaires.webp"
    },
    {
        slug: "coffrets",
        title: "Coffrets Cadeaux",
        description: "Offrez le meilleur de l'Orient avec nos coffrets soigneusement composés.",
        image: "/images/categories/Coffrets.webp"
    },
    {
        slug: "soins",
        title: "Soins & Cosmétiques",
        description: "Baumes, crèmes et soins naturels pour le corps.",
        image: "/products/baume-soin-coco.webp"
    },
    {
        slug: "accessoires",
        title: "Accessoires",
        description: "Accessoires naturels pour vos rituels beauté.",
        image: "/products/sac-savon.webp"
    }
];
