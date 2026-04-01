// Blog articles data
export interface Article {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    image: string;
    date: string;
    readTime: string;
    slug: string;
}

export const ARTICLES: Article[] = [
    {
        id: 1,
        title: "Le Savon d'Alep : 9 mois de séchage pour des bienfaits uniques",
        excerpt: "Découvrez pourquoi le véritable savon d'Alep nécessite 9 mois de séchage et comment ce processus ancestral lui confère ses propriétés exceptionnelles.",
        category: "Savon d'Alep",
        image: "/bento-soap.webp",
        date: "28 Jan 2026",
        readTime: "6 min",
        slug: "savon-alep-9-mois-sechage",
        content: `
## L'artisanat d'antan

On ne peut pas simplement mélanger de l'huile d'olive avec de l'huile de baie de laurier et espérer obtenir un véritable savon d'Alep. Un tel mélange manquerait d'homogénéité et de maturation.

Le véritable savon d'Alep est fabriqué dans de grands chaudrons et en quantité importante. **Pourquoi en produit-on une seule fois par an ?** Parce que ce savon doit sécher à l'air libre pendant 9 mois.

## Le rythme des saisons

Ce processus unique repose sur l'utilisation de deux mêmes huiles végétales tendres, ce qui rend le savon tendre à l'origine. Il durcit ensuite grâce à l'hiver et acquiert sa consistance finale sous la chaleur de l'été.

Ce savoir-faire reflète l'artisanat d'autrefois, avec un profond respect pour le rythme des saisons et la maturation.

## Les bienfaits de la patience

Grâce à cette maturation lente :
- Le savon devient plus doux pour la peau
- Les propriétés antiseptiques du laurier sont préservées
- Le pH se stabilise naturellement
- La mousse devient plus onctueuse

**Le savon d'Alep existe depuis des siècles et est toujours apprécié aujourd'hui pour ses bienfaits remarquables.**
        `
    },
    {
        id: 2,
        title: "Huile de Nigelle : le trésor des Pharaons",
        excerpt: "Surnommée 'graine bénie' dans la tradition orientale, l'huile de Nigelle possède des vertus extraordinaires pour la santé et la beauté.",
        category: "Compléments",
        image: "/bento-spices.webp",
        date: "25 Jan 2026",
        readTime: "5 min",
        slug: "huile-nigelle-tresor-pharaons",
        content: `
## Une histoire millénaire

L'huile de Nigelle (Nigella sativa) est utilisée depuis plus de 3000 ans. On en a même retrouvé dans la tombe de Toutankhamon ! Les Égyptiens l'appelaient le "remède universel".

## Ses bienfaits pour la santé

- **Système immunitaire** : Renforce les défenses naturelles
- **Digestion** : Apaise les troubles digestifs
- **Peau** : Anti-inflammatoire naturel
- **Cheveux** : Nourrit et fortifie

## Comment l'utiliser ?

**En cure interne** : 1 cuillère à café le matin à jeun pendant 3 semaines.

**En application externe** : Quelques gouttes sur les zones à traiter, massez délicatement.

Notre huile de Nigelle est 100% pure, pressée à froid pour préserver tous ses principes actifs.
        `
    },
    {
        id: 3,
        title: "Les 5 fausses idées sur le Savon d'Alep",
        excerpt: "Est-il trop asséchant ? Sent-il mauvais ? Démêlons le vrai du faux sur ce trésor millénaire.",
        category: "Décryptage",
        image: "/bento-soap.webp",
        date: "20 Jan 2026",
        readTime: "4 min",
        slug: "fausses-idees-savon-alep",
        content: `
## Idée reçue n°1 : "Il assèche la peau"

**FAUX !** Contrairement aux savons industriels, le savon d'Alep contient de l'huile d'olive surgras qui nourrit la peau. C'est un allié des peaux sèches et sensibles.

## Idée reçue n°2 : "Il sent mauvais"

**PARTIELLEMENT VRAI.** Le savon d'Alep traditionnel a une odeur caractéristique de laurier qui peut surprendre. Cette odeur disparaît rapidement après rinçage et certains l'apprécient beaucoup !

## Idée reçue n°3 : "Il ne mousse pas"

**FAUX !** Il mousse moins qu'un gel douche chimique, mais il mousse ! Cette mousse fine et crémeuse est plus respectueuse de la peau.

## Idée reçue n°4 : "Il est trop cher"

**FAUX !** Un pain de savon d'Alep de 200g dure 3 à 4 mois. Au final, c'est plus économique qu'un gel douche !

## Idée reçue n°5 : "Il ne convient qu'au corps"

**FAUX !** Le savon d'Alep peut s'utiliser sur le visage, le corps ET les cheveux. C'est un produit multi-usage par excellence.
        `
    },
    {
        id: 4,
        title: "Moringa, Gingembre, Guduchi : les super-plantes ayurvédiques",
        excerpt: "Ces plantes utilisées depuis des millénaires en Inde arrivent enfin chez vous. Découvrez leurs bienfaits extraordinaires.",
        category: "Ayurvéda",
        image: "/bento-spices.webp",
        date: "15 Jan 2026",
        readTime: "7 min",
        slug: "plantes-ayurvediques",
        content: `
## Le Moringa : l'arbre de vie

Appelé "arbre miracle", le Moringa contient :
- 7 fois plus de vitamine C que l'orange
- 4 fois plus de calcium que le lait
- 2 fois plus de protéines que le yaourt

**Utilisation** : En poudre dans vos smoothies ou en gélules.

## Le Gingembre : le réchauffant

Le Gingembre est reconnu pour :
- Stimuler la digestion
- Réchauffer le corps
- Soutenir le système immunitaire

**Utilisation** : En infusion, en cuisine ou en complément.

## Le Guduchi : l'immortel

Cette plante légendaire est surnommée "Amrit" (nectar des dieux). Elle :
- Renforce l'immunité
- Purifie le sang
- Équilibre les trois doshas

**Utilisation** : En gélules, en cure de 3 semaines.
        `
    },
    {
        id: 5,
        title: "Comment choisir son huile essentielle ?",
        excerpt: "Bio, pure, 100% naturelle... Décryptez les étiquettes et faites le bon choix pour votre aromathérapie.",
        category: "Huiles Essentielles",
        image: "/blog-winter.webp",
        date: "10 Jan 2026",
        readTime: "5 min",
        slug: "choisir-huile-essentielle",
        content: `
## Les critères essentiels

### 1. La certification Bio
Garantit l'absence de pesticides et une culture respectueuse.

### 2. La mention "100% pure et naturelle"
Évitez les huiles coupées avec des additifs synthétiques.

### 3. Le nom latin
Une huile de qualité indique toujours le nom latin de la plante (ex: Eucalyptus globulus).

### 4. Le chémotype
Pour certaines plantes comme le Thym, le chémotype précise la molécule dominante.

## Nos huiles Terra Etica

Nous avons sélectionné la marque Terra Etica pour :
- Certification bio
- Traçabilité complète
- Commerce équitable

Découvrez nos huiles de Ravintsara, Eucalyptus, Niaouli et bien d'autres !
        `
    },
    {
        id: 6,
        title: "Routine peau sensible : le protocole savon d'Alep",
        excerpt: "Votre peau réagit à tout ? Voici comment le savon d'Alep peut devenir votre meilleur allié.",
        category: "Conseils",
        image: "/bento-soap.webp",
        date: "5 Jan 2026",
        readTime: "4 min",
        slug: "routine-peau-sensible",
        content: `
## Pourquoi le savon d'Alep ?

Le savon d'Alep est idéal pour les peaux sensibles car :
- **Sans parfum synthétique** : Pas de risque d'allergie
- **Sans conservateur** : Formule minimaliste
- **Riche en laurier** : Propriétés apaisantes naturelles

## Le protocole en 3 étapes

### Matin
1. Humidifiez votre visage à l'eau tiède
2. Faites mousser le savon dans vos mains
3. Appliquez délicatement, rincez à l'eau froide

### Soir
Le même rituel + une crème hydratante naturelle.

### 1 fois par semaine
Masque au savon d'Alep : appliquez la mousse, laissez 2 minutes, rincez.

## Notre recommandation

Pour les peaux sensibles, privilégiez un savon avec **20-25% d'huile de laurier**. Les taux plus élevés (40%+) sont réservés aux peaux à problèmes (eczéma, psoriasis).
        `
    }
];

export function getArticleBySlug(slug: string): Article | undefined {
    return ARTICLES.find(a => a.slug === slug);
}

export function getRelatedArticles(currentSlug: string, limit: number = 2): Article[] {
    return ARTICLES.filter(a => a.slug !== currentSlug).slice(0, limit);
}
