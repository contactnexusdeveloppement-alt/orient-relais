import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const client = new WooCommerceRestApi({
    url: process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://orient-relais.com",
    consumerKey: process.env.WC_CONSUMER_KEY || "",
    consumerSecret: process.env.WC_CONSUMER_SECRET || "",
    version: "wc/v3",
    queryStringAuth: true // Force auth in query params to bypass proxy header stripping
});

interface NewProduct {
    name: string;
    sku: string;
    regular_price: string;
    category_names: string[];
    short_description: string;
    description: string;
    attributes: { name: string; options: string[]; visible?: boolean; variation?: boolean }[];
    tags: string[];
}

const productsToCreate: NewProduct[] = [
    // === ACCESSOIRES ===
    {
        name: "Porte Savon Aimanté à Ventouse Najel",
        sku: "POR05NJ/6",
        regular_price: "9.90",
        category_names: ["Accessoires"],
        short_description: "Porte savon minimaliste et pratique. Prolonge la durée de vie de vos savons d'Alep en les gardant au sec.",
        description: `<h3>Le porte savon aimanté innovant</h3>
<p>Dites adieu aux savons qui fondent sur le bord du lavabo ! Ce porte savon aimanté à ventouse se fixe facilement sur le carrelage, le miroir ou la paroi de douche sans aucun perçage. Le savon lévite, ce qui lui permet de <strong>sécher intégralement sur toutes ses faces</strong> et de durer beaucoup plus longtemps.</p>
<h4>Avantages</h4>
<ul>
<li><strong>Pratique & Sans perçage</strong> — Se fixe instantanément grâce à sa ventouse puissante</li>
<li><strong>Économique</strong> — Le savon sèche vite, ne fond pas et dure plus longtemps</li>
<li><strong>Minimaliste</strong> — Presque invisible, il met en valeur votre savon d'Alep</li>
</ul>`,
        attributes: [{ name: "Marque", options: ["Najel"] }],
        tags: ["Accessoire", "Zéro Déchet"]
    },
    {
        name: "Porte Savon en Bois Najel",
        sku: "POR04NJ/2",
        regular_price: "4.50",
        category_names: ["Accessoires"],
        short_description: "Porte savon traditionnel en bois rainuré. Naturel et élégant pour votre salle de bain.",
        description: `<h3>L'élégance naturelle dans votre salle de bain</h3>
<p>Ce porte savon en bois naturel strié est l'accessoire indispensable pour conserver vos savons solides dans des conditions optimales. Ses rainures profondes permettent à l'eau de s'écouler facilement, évitant ainsi à votre savon d'Alep de stagner dans l'humidité.</p>
<h4>Caractéristiques</h4>
<ul>
<li><strong>Matériau</strong> — Bois naturel non traité</li>
<li><strong>Design</strong> — Rainuré pour un drainage parfait de l'eau</li>
<li><strong>Durabilité</strong> — Allie esthétisme naturel et praticité</li>
</ul>`,
        attributes: [{ name: "Marque", options: ["Najel"] }],
        tags: ["Accessoire", "Bois"]
    },
    {
        name: "Éponge de Mer Naturelle Najel",
        sku: "EPO02NJ/6",
        regular_price: "9.90",
        category_names: ["Accessoires"],
        short_description: "Éponge de mer naturelle (9-10cm) péchée en Méditerranée. Douceur absolue pour la peau.",
        description: `<h3>L'exfoliation la plus douce offerte par la nature</h3>
<p>Véritable trésor de la mer Méditerranée, cette <strong>éponge de mer naturelle</strong> est réputée pour son incroyable douceur et sa grande capacité d'absorption. Contrairement aux éponges synthétiques, elle est hypoallergénique, résistante et respecte le film hydrolipidique de la peau, même les plus sensibles comme celle des bébés.</p>
<h4>Bienfaits</h4>
<ul>
<li><strong>Ultra-douce</strong> — Idéale pour le nettoyage quotidien du visage et du corps</li>
<li><strong>100% Naturelle & Biodégradable</strong> — Pêchée de manière responsable</li>
<li><strong>Hygiénique</strong> — Ne retient pas les odeurs et se rince facilement</li>
</ul>`,
        attributes: [{ name: "Marque", options: ["Najel"] }],
        tags: ["Accessoire", "Soin Corps"]
    },
    {
        name: "Gant Noir de Gommage Najel",
        sku: "GAN01NJ/6",
        regular_price: "6.90",
        category_names: ["Accessoires"],
        short_description: "Le véritable gant de gommage oriental. Exfoliation profonde et rituel du Hammam.",
        description: `<h3>Le secret de beauté du Hammam oriental</h3>
<p>Associé au fameux savon noir, ce <strong>gant de gommage noir</strong> (type Kessa) est l'accessoire indispensable du traditionnel rituel du Hammam. Son tissage spécifique permet d'exfolier la peau en profondeur et d'éliminer les cellules mortes sans irriter.</p>
<h4>Bienfaits</h4>
<ul>
<li><strong>Exfoliation profonde</strong> — Peau lisse, douce et régénérée</li>
<li><strong>Micro-circulation</strong> — Le massage stimule le renouvellement cellulaire</li>
<li><strong>Éclat</strong> — Prépare la peau à recevoir des huiles ou beurres hydratants</li>
</ul>
<p><em>Conseil : S'utilise humide, de préférence après s'être enduit de savon noir et avoir rincé. Frictionner vigoureusement sur peau chaude.</em></p>`,
        attributes: [{ name: "Marque", options: ["Najel"] }],
        tags: ["Accessoire", "Hammam", "Gommage"]
    },

    // === COSMETIQUES ET SOINS ===
    {
        name: "Élixir aux 3 Huiles 125ml Najel — Cosmos Organic",
        sku: "C-HUI05NJ/6",
        regular_price: "10.90",
        category_names: ["Cosmétiques"],
        short_description: "Synergie d'huiles précieuses bio (Olive, Cumin Noir, Amande douce). Huile de soin sublimatrice.",
        description: `<h3>L'Élixir de beauté aux 3 Huiles Précieuses</h3>
<p>Cet élixir merveilleux certifié <strong>Cosmos Organic</strong> par Ecocert rassemble les trésors de l'Orient en un seul flacon. Une synergie parfaite combinant la noblesse de l'<strong>Huile d'Olive</strong>, la puissance de l'<strong>Huile de Nigelle</strong> (Cumin noir) et la douceur de l'<strong>Huile d'Amande Douce</strong>.</p>
<h4>Bienfaits</h4>
<ul>
<li><strong>Nourrissant</strong> — Pénètre rapidement pour satiner la peau du corps et adoucir les cheveux</li>
<li><strong>Apaisant</strong> — Soulage les peaux tiraillées grâce aux propriétés de la Nigelle</li>
<li><strong>Senteur envoûtante</strong> — Un délicat parfum 100% d'origine naturelle</li>
</ul>`,
        attributes: [
            { name: "Marque", options: ["Najel"] },
            { name: "Contenance", options: ["125ml"] }
        ],
        tags: ["Cosmos Organic", "Ecocert", "Huile", "Bio", "Naturel"]
    },
    {
        name: "Baume à Lèvres Karité 12g Najel",
        sku: "C-BAU02NJ/6-V2",
        regular_price: "5.90",
        category_names: ["Cosmétiques"],
        short_description: "Baume à lèvres intensif au beurre de Karité pur certifié Cosmos Organic.",
        description: `<h3>Le soin réparateur au Karité pur</h3>
<p>Composé d'une formule certifiée <strong>Cosmos Organic</strong>, ce baume à lèvres est un véritable concentré d'hydratation. Riche en beurre de Karité brut, il nourrit intensément, répare et protège durablement les lèvres sèches et gercées contre le froid et les agressions extérieures.</p>
<h4>Bienfaits</h4>
<ul>
<li><strong>Ultra-Nourrissant</strong> — Riche en vitamines A, D, E et F</li>
<li><strong>Protecteur</strong> — Forme un léger film protecteur pour affronter l'hiver</li>
<li><strong>Format Pratique</strong> — Pot de 12g facile à glisser dans la poche</li>
</ul>`,
        attributes: [{ name: "Marque", options: ["Najel"] }, { name: "Poids", options: ["12g"] }],
        tags: ["Cosmos Organic", "Karité", "Soins Visage", "Bio"]
    },
    {
        name: "Baume à Lèvres Vanille 12g Najel",
        sku: "C-BAU04NJ/6-V2",
        regular_price: "6.50",
        category_names: ["Cosmétiques"],
        short_description: "Soin des lèvres gourmand à la Vanille, formule bio Cosmos Organic.",
        description: `<h3>Gourmandise et douceur à la Vanille</h3>
<p>Succombez à la douceur enveloppante de ce baume à lèvres naturel au parfum subtil de <strong>Vanille</strong>. Certifié <strong>Cosmos Organic</strong>, il allie la richesse des beurres végétaux et des cires naturelles pour restaurer la souplesse de vos lèvres tout en y déposant une note gourmande irrésistible.</p>
<h4>Bienfaits</h4>
<ul>
<li><strong>Réparation</strong> — Soulage immédiatement les tiraillements</li>
<li><strong>Senteur Vanille</strong> — Parfum naturel doux et réconfortant</li>
<li><strong>Texture fondante</strong> — S'applique facilement et laisse les lèvres douces</li>
</ul>`,
        attributes: [{ name: "Marque", options: ["Najel"] }, { name: "Poids", options: ["12g"] }],
        tags: ["Cosmos Organic", "Vanille", "Soins Visage", "Bio"]
    },
    {
        name: "Crème Visage Hydratation Intense 50ml Najel",
        sku: "C-CRE02NJ/6",
        regular_price: "11.90",
        category_names: ["Cosmétiques"],
        short_description: "Crème hydratation intense peaux sèches. Enrichie aux 3 beurres et huiles végétales bio.",
        description: `<h3>Hydratation suprême pour les peaux assoiffées</h3>
<p>Spécialement formulée pour les peaux sèches et sensibles, cette crème certifiée <strong>Cosmos Organic</strong> gorge votre peau d'hydratation et de nutriments. Son secret ? Un cocktail exclusif de <strong>3 beurres végétaux</strong> (Karité, Olive, Cacao) associés à l'huile d'olive et de baies de laurier (HO + HBL).</p>
<h4>Bienfaits</h4>
<ul>
<li><strong>Hydratation 24h</strong> — Restaure la barrière cutanée des peaux fragiles</li>
<li><strong>Confort immédiat</strong> — Fini les zones de sécheresse et les tiraillements</li>
<li><strong>Certifié Ecocert</strong> — Des ingrédients nobles et bio pour votre visage</li>
</ul>`,
        attributes: [{ name: "Marque", options: ["Najel"] }, { name: "Contenance", options: ["50ml"] }],
        tags: ["Cosmos Organic", "Crème", "Soins Visage", "Ecocert", "Bio"]
    },
    {
        name: "Crème Visage Matifiante Rose Myrte 50ml Najel",
        sku: "C-CRE04NJ/6",
        regular_price: "10.90",
        category_names: ["Cosmétiques"],
        short_description: "Crème matifiante anti-brillance au Citron, Aloe Vera et Myrte rose. Cosmos Organic.",
        description: `<h3>Le soin perfecteur des peaux mixtes à grasses</h3>
<p>Dites adieu aux brillances indésirables avec cette <strong>Crème Visage Matifiante</strong> certifiée Cosmos Organic. L'action astringente du Citron et de la Rose Myrte s'associe aux vertus apaisantes de l'Aloe Vera et du célèbre duo Huile d'Olive / Huile de Laurier. Résultat : une peau rééquilibrée, hydratée sans aucun effet gras, au fini mat et poudré.</p>
<h4>Bienfaits</h4>
<ul>
<li><strong>Action Matifiante</strong> — Régule l'excès de sébum et resserre les pores</li>
<li><strong>Éclat du teint</strong> — Le citron ravive et unifie le teint</li>
<li><strong>Protection</strong> — Légère et non comédogène, protège tout au long de la journée</li>
</ul>`,
        attributes: [{ name: "Marque", options: ["Najel"] }, { name: "Contenance", options: ["50ml"] }, { name: "Type de peau", options: ["Peaux grasses", "Peaux mixtes"] }],
        tags: ["Cosmos Organic", "Crème", "Soins Visage", "Bio"]
    },
    {
        name: "Crème Visage Antirides Globale 50ml Najel",
        sku: "C-CRE03NJ/6",
        regular_price: "12.50",
        category_names: ["Cosmétiques"],
        short_description: "Soin anti-âge complet à la Figue de Barbarie et Eau de Rose. Lisse et raffermit.",
        description: `<h3>L'alliance anti-âge par excellence</h3>
<p>Cette merveille de la nature, certifiée <strong>Cosmos Organic</strong>, associe les absolus végétaux de la jeunesse cutanée. En son cœur, un puissant duo <strong>Huile et Extrait de Figue de Barbarie</strong> (réputée pour sa richesse en vitamine E anti-radicalaire), couplé à la délicatesse de l'Eau de Rose régénérante. L'extrait de Marronnier d'Inde relance la micro-circulation pour un teint sublimé, et la base Olive/Laurier vient parfaire cette formule globale.</p>
<h4>Bienfaits</h4>
<ul>
<li><strong>Anti-rides profond</strong> — Lisse visiblement les ridules et prévient le relâchement</li>
<li><strong>Tonus & Fermeté</strong> — La peau est repulpée et gagne en élasticité</li>
<li><strong>Éclat Jeunesse</strong> — Un visage reposé, lumineux et nourri</li>
</ul>`,
        attributes: [{ name: "Marque", options: ["Najel"] }, { name: "Contenance", options: ["50ml"] }],
        tags: ["Cosmos Organic", "Anti-âge", "Crème", "Soins Visage", "Bio"]
    },
    {
        name: "Beurre de Karité Parfum Cacao 100g — Cosmos Organic Najel",
        sku: "C-BEU11NJ/6",
        regular_price: "7.90",
        category_names: ["Cosmétiques"],
        short_description: "Beurre de karité biologique au parfum naturel et gourmand de Cacao.",
        description: `<h3>L'incontournable soin SOS, ultra gourmand</h3>
<p>Fusion exquise entre le soin profond du <strong>beurre de Karité biologique</strong> et la gourmandise du <strong>parfum naturel de Cacao</strong>. Certifié Cosmos Organic, il s'agit du baume de secours familial parfait, qui fond sur la peau ou les pointes de cheveux pour les réparer instantanément dans un effluve réconfortant.</p>
<h4>Bienfaits</h4>
<ul>
<li><strong>Réparation SOS</strong> — Idéal sur les zones ultra-sèches (coudes, genoux, talons, lèvres)</li>
<li><strong>Cheveux sublimes</strong> — En masque avant-shampoing sur pointes sèches</li>
<li><strong>Expérience Sensorielle</strong> — Un pur moment de gourmandise chocolatée sans calories !</li>
</ul>`,
        attributes: [{ name: "Marque", options: ["Najel"] }, { name: "Poids", options: ["100g"] }],
        tags: ["Cosmos Organic", "Karité", "Soins Corps", "Bio"]
    },
    {
        name: "Savon Noir l'Huile d'Argan Bio et Olive 180g Najel",
        sku: "C-SAV53NJ/6",
        regular_price: "6.90",
        category_names: ["Cosmétiques"],
        short_description: "Pâte de savon noir traditionnel enrichie à l'Argan Bio. L'indispensable du gommage.",
        description: `<h3>Le purifiant oriental pour une peau de velours</h3>
<p>Retrouvez l'authenticité du rituel oriental à la maison avec cette pâte de <strong>Savon Noir</strong> certifiée Cosmos Natural. Formulée à base d'Huile d'Olive et miraculeusement enrichie à l'<strong>Huile d'Argan Bio</strong> régénératrice, cette pâte onctueuse prépare idéalement la peau au gommage.</p>
<h4>Bienfaits & Utilisation</h4>
<ul>
<li><strong>Exfoliation douce</strong> — Ramollit les peaux mortes avant le passage du gant de gommage (Kessa)</li>
<li><strong>Nourrissant</strong> — Ne décape pas la peau grâce à la richesse de l'olive et de l'argan</li>
<li><strong>Soin spa</strong> — Laisse un grain de peau incroyablement soyeux et affiné</li>
</ul>
<p><em>Utilisation : Appliquer sur peau chaude et humide. Laisser poser 5 minutes, rincer, puis frotter vigoureusement avec un gant noir de gommage pour éliminer les impuretés.</em></p>`,
        attributes: [{ name: "Marque", options: ["Najel"] }, { name: "Poids", options: ["180g"] }],
        tags: ["Cosmos Natural", "Savon Noir", "Argan", "Gommage"]
    },

    // === COFFRETS CADEAUX ===
    {
        name: "Coffret Najel \"Soins de la Mer Morte\"",
        sku: "COF08NJ/4",
        regular_price: "34.90",
        category_names: ["Coffrets", "Idées Cadeaux"],
        short_description: "Les trésors minéraux d'orient réunis : Savon, Eau de la mer morte, Sels de bain et Boue purifiante.",
        description: `<h3>Cure thermale et minéralité marine à la maison</h3>
<p>Offrez-vous ou offrez les bienfaits mythiques des minéraux ancestraux ! Ce magnifique coffret complet est un véritable concentré d'actifs ciblés (Magnésium, Potassium, Calcium) réputés pour apaiser drastiquement les peaux réactives ou fragiles.</p>
<h4>Contenu du Coffret Exceptionnel</h4>
<ul>
<li><strong>1 Savon d'Alep à la boue de la mer Morte (100g)</strong> — Nettoie en purifiant les pores en profondeur.</li>
<li><strong>1 Eau de la mer Morte certifiée Cosmos Natural (200ml)</strong> — Lotion tonique reminéralisante hautement concentrée.</li>
<li><strong>Sels de la mer Morte Cosmos Natural (180g)</strong> — L'évasion totale pour un bain délassant, apaisant les muscles et l'esprit.</li>
<li><strong>Boue de la mer Morte Cosmos Natural (300g)</strong> — Le masque corps/visage suprême pour détoxifier et revitaliser intensément.</li>
</ul>`,
        attributes: [{ name: "Marque", options: ["Najel"] }],
        tags: ["Coffret", "Cadeau", "Mer Morte", "Soin Corps"]
    },
    {
        name: "Coffret Najel \"Pour Lui\"",
        sku: "COF07NJ/4-V2",
        regular_price: "34.90",
        category_names: ["Coffrets", "Idées Cadeaux"],
        short_description: "L'essentiel du soin masculin au naturel : Savon Citron, Huile de Nigelle, Pierre d'alun et Porte-savon.",
        description: `<h3>L'attention Parfaite pour les Hommes</h3>
<p>Un assortiment judicieux d'indispensables ciblés pour les besoins de la peau masculine, permettant d'adopter une routine beauté saine, simple et authentique. Idéal pour apaiser le feu du rasoir et réguler le derme.</p>
<h4>Contenu du Coffret "Pour Lui"</h4>
<ul>
<li><strong>1 Savon d'Alep au Citron</strong> — Un effet coup de fouet matinal, purifiant et frais, parfait pour le visage et nettoyer la barbe.</li>
<li><strong>1 Huile Végétale de Nigelle</strong> — Apaisante, purifiante et anti-inflammatoire, c'est l'atout majeur après le rasage ou en soin pour la barbe.</li>
<li><strong>1 Pierre d'Alun naturelle</strong> — Le déodorant minéral ancestral, hypoallergénique et très économique, efficace toute la journée.</li>
<li><strong>1 Porte-savon en bois rainuré</strong> — Pratique et élégant pour conserver son savon d'Alep durablement au sec.</li>
</ul>`,
        attributes: [{ name: "Marque", options: ["Najel"] }],
        tags: ["Coffret", "Cadeau", "Homme"]
    },
    {
        name: "Coffret Najel \"Routine du Désert\" 🏜️",
        sku: "COF16NJ/4",
        regular_price: "39.90",
        category_names: ["Coffrets", "Idées Cadeaux"],
        short_description: "Le rituel oriental d'exception : Savon traditionnel, Beurre Karité, Gel Jasmin et Trésor de Figue de Barbarie.",
        description: `<h3>L'Évasion Sensorielle Suprême</h3>
<p>Un magnifique voyage au cœur des splendeurs du désert oriental ! Ce luxueux grand coffret cadeau compile les soins orientaux les plus emblématiques et parfumés pour une réhydratation majestueuse du corps.</p>
<h4>Le Rituel du Désert contient</h4>
<ul>
<li><strong>1 Gel Douche parfumé au Jasmin (500ml)</strong> — Un grand format généreux pour s'envelopper d'un sillage floral enivrant sous la douche.</li>
<li><strong>1 Savon d'Alep Traditionnel (185g - 40% HBL)</strong> — Le maître des savons, hyper concentré en huile de laurier pour apaiser les peaux sensibles.</li>
<li><strong>1 Beurre de Karité brut (100g)</strong> — La nutrition sauvage à l'état pur pour soigner les peaux déshydratées du désert (ou affronter l'hiver).</li>
<li><strong>1 Huile Précieuse de Graines de Figue de Barbarie (80ml)</strong> — L'élixir anti-âge le plus rare et prodigieux, bouclier antioxydant aux effets liftants miracles.</li>
</ul>`,
        attributes: [{ name: "Marque", options: ["Najel"] }],
        tags: ["Coffret", "Cadeau", "Prestige"]
    },
    {
        name: "Coffret Cocooning Najel (Nouvelle Charte)",
        sku: "COF04NJ/4-V2",
        regular_price: "34.90",
        category_names: ["Coffrets", "Idées Cadeaux"],
        short_description: "L'instant réconfort total : Eau de fleur d'oranger, Argile blanche, Karité brut et Huile d'amande douce.",
        description: `<h3>Créez vos cosmétiques "Maison" ou profitez-en purs !</h3>
<p>Pensé pour un moment 100% "Me-Time", ce coffret est un concentré de douceur inoffensive et universelle. Ces 4 incontournables purs peuvent s'utiliser seuls, ou se combiner pour fabriquer vos propres recettes (masque apaisant argile + fleur d'oranger, soin protecteur karité + amande...).</p>
<h4>Le Coffret Cocooning contient</h4>
<ul>
<li><strong>1 Eau Florale de Fleur d'Oranger</strong> — Apporte un parfum calmant, rafraîchit et apaise la peau au réveil ou après le démaquillage.</li>
<li><strong>1 Poudre d'Argile Blanche</strong> — La plus douce des argiles, parfaite pour un masque visage purifiant et illuminateur respectueux des peaux sensibles.</li>
<li><strong>1 Beurre de Karité Pur</strong> — L'allié inébranlable contre la sécheresse corporelle, des mains aux lèvres gercées.</li>
<li><strong>1 Huile Végétale d'Amande Douce</strong> — Protectrice et veloutée, pour démaquiller délicatement ou masser le corps et les bébés avec une tolérance optimale.</li>
</ul>`,
        attributes: [{ name: "Marque", options: ["Najel"] }],
        tags: ["Coffret", "Cadeau", "Cocooning", "Douceur"]
    },
    {
        name: "Coffret Découverte d'Alep Najel",
        sku: "COF05NJ/4",
        regular_price: "34.90",
        category_names: ["Coffrets", "Idées Cadeaux"],
        short_description: "La quintessence de la Syrie : Savon solide, Savon liquide, Éponge de mer naturelle et Eau de Rose.",
        description: `<h3>L'initiation Parfaite aux traditions Lavantes du Levant</h3>
<p>Vous souhaitez découvrir ou faire découvrir le légendaire savon d'Alep ? Ce coffret complet permet de décliner l'expérience sous toutes ses formes de la plus merveilleuse des façons, accompagné du tonique naturel le plus prisé d'Orient.</p>
<h4>Contenu de la Boîte Découverte</h4>
<ul>
<li><strong>1 Savon d'Alep 5% HBL authentique (190g)</strong> — Le pain classique solide, formulé pour l'usage quotidien adoucissant pour toute la famille.</li>
<li><strong>1 Grand Savon d'Alep Liquide Cosmos Organic (500ml)</strong> — L'ultra praticité réunie avec la formulation Alep, idéal pour le lavabo ou la douche de tous les jours.</li>
<li><strong>1 Éponge Naturelle de la Mer Méditerranée (10cm)</strong> — Complément idéal du savon d'alep fluide, elle produit une mousse fine et offre le nettoyage le plus doux qu'il soit.</li>
<li><strong>1 Eau de Rose de Damas certifiée Cosmos Organic (200ml)</strong> — En spray, l'eau des mille et une nuits, pour parfaire le nettoyage du visage par ses vertus tenseurs et rafraîchissantes incomparables.</li>
</ul>`,
        attributes: [{ name: "Marque", options: ["Najel"] }],
        tags: ["Coffret", "Cadeau", "Découverte"]
    },
    {
        name: "Coffret Najel \"Douceur d'Hiver\" ❄️",
        sku: "COF17NJ/4",
        regular_price: "29.90",
        category_names: ["Coffrets", "Idées Cadeaux"],
        short_description: "L'évasion à petit prix : Baume Coco, Lait corporel Tiaré, Savon Jasmin et Gant Loofah.",
        description: `<h3>Un voyage paradisiaque en plein hiver</h3>
<p>Ce coffret à petit prix réchauffe les corps et les cœurs lors des journées froides avec ses irrésistibles senteurs exotiques et fleuries de Polynésie et d'Orient !</p>
<h4>L'escapade Sensorielle comprend</h4>
<ul>
<li><strong>1 Baume Fondant nourrissant Coco (100g)</strong> — La gourmandise des îles sous son format baume généreux, ultra-réparateur et protecteur du dessèchement.</li>
<li><strong>1 Lait Corporel au délicieux parfum Tiaré (200ml)</strong> — Fluide et hydratant, laisse une peau souple et une odeur de vacances dépaysante.</li>
<li><strong>1 Savon d'Alep naturel Parfumé au Jasmin Bio (100g)</strong> — La fleur des nuits orientales associée aux vertus lavantes de l'olive pour une douche ensoleillée et parfumée.</li>
<li><strong>1 Gant Loofah végétal véritable</strong> — Le coussin exfoliant naturel, idéal en friction sur les cuisses et le corps pour stimuler la circulation, éliminer les peaux mortes et décupler la douceur du lait hydratant.</li>
</ul>`,
        attributes: [{ name: "Marque", options: ["Najel"] }],
        tags: ["Coffret", "Cadeau", "Petit Prix"]
    }

];

async function createProducts() {
    console.log("🚀 Starting to retrieve or create categories...");

    // 1. Fetch categories to map category names to IDs
    let allCategories: any[] = [];
    let page = 1;
    while (true) {
        const { data } = await client.get("products/categories", { per_page: 100, page });
        allCategories = allCategories.concat(data);
        if (data.length < 100) break;
        page++;
    }

    const categoryMap = new Map<string, number>();
    for (const cat of allCategories) {
        categoryMap.set(cat.name.toLowerCase(), cat.id);
    }

    // Helper to get or create category
    async function getOrCreateCategoryId(name: string): Promise<number> {
        const lowerName = name.toLowerCase();
        if (categoryMap.has(lowerName)) {
            return categoryMap.get(lowerName)!;
        }

        console.log(`➕ Creating missing category: ${name}`);
        try {
            const { data } = await client.post("products/categories", { name });
            categoryMap.set(lowerName, data.id);
            return data.id;
        } catch (error: any) {
            console.error(`❌ Failed to create category ${name}:`, error.response?.data?.message || error.message);
            throw error;
        }
    }

    // 2. Fetch existing products to avoid duplicates
    console.log("🔍 Fetching existing products to prevent duplicates...");
    let existingProducts: any[] = [];
    page = 1;
    while (true) {
        const { data } = await client.get("products", { per_page: 100, page });
        existingProducts = existingProducts.concat(data);
        if (data.length < 100) break;
        page++;
    }
    const existingSkus = new Set(existingProducts.map(p => p.sku).filter(Boolean));
    const existingNames = new Set(existingProducts.map(p => p.name));

    console.log(`📦 Creating ${productsToCreate.length} products (Status: DRAFT)...`);

    for (const pConfig of productsToCreate) {
        if (existingSkus.has(pConfig.sku) || existingNames.has(pConfig.name)) {
            console.log(`⏭️  Skipping existing product: ${pConfig.name} (SKU: ${pConfig.sku})`);
            continue;
        }

        // Map categories
        const categoryIds = [];
        for (const catName of pConfig.category_names) {
            categoryIds.push({ id: await getOrCreateCategoryId(catName) });
        }

        // Format tags
        const formattedTags = pConfig.tags.map(t => ({ name: t }));

        const productData = {
            name: pConfig.name,
            type: "simple",
            status: "draft", // IMPORTANT : drafted so the user can verify price and image before publish
            regular_price: pConfig.regular_price,
            sku: pConfig.sku,
            short_description: pConfig.short_description,
            description: pConfig.description,
            categories: categoryIds,
            tags: formattedTags,
            attributes: pConfig.attributes.map(attr => ({
                name: attr.name,
                visible: attr.visible !== false,
                variation: attr.variation || false,
                options: attr.options
            })),
            tax_status: "taxable",
            // You can omit images here, user will upload them
        };

        try {
            console.log(`⏳ Creating: ${pConfig.name}...`);
            const { data } = await client.post("products", productData);
            console.log(`✅ Success: ${data.name} (ID: ${data.id})`);
        } catch (error: any) {
            console.error(`❌ Failed to create ${pConfig.name}:`, error.response?.data?.message || error.message);
        }
    }

    console.log("🎉 All new products have been processed!");
}

createProducts().catch(console.error);
