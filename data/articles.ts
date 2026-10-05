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
        id: 7,
        title: "Savon d'Alep et eczéma : le guide complet pour bien choisir un savon doux",
        excerpt: "Peau qui tiraille, qui réagit au moindre gel douche ? Quand on a de l'eczéma ou une peau atopique, le choix du savon compte. Guide complet sur le savon d'Alep : quel pourcentage de laurier choisir, comment l'utiliser, les erreurs à éviter. Sans jamais remplacer l'avis de votre médecin.",
        category: "Savon d'Alep",
        image: "/bento-soap.webp",
        date: "18 Avr 2026",
        readTime: "12 min",
        slug: "savon-alep-eczema-guide",
        content: `
## Eczéma, peau sèche, peau atopique : pourquoi le savon d'Alep revient sur le devant de la scène

Si vous avez de l'eczéma ou une peau atopique et que vous cherchez un savon qui **nettoie sans agresser**, vous avez probablement déjà fait le tour des rayons. Syndets, pains surgras, huiles lavantes… L'offre est vaste, et chaque peau réagit à sa façon : ce qui convient à l'un tiraille chez l'autre.

Le **savon d'Alep**, lui, traverse les siècles sans changer de recette : deux huiles végétales, une cuisson au chaudron et de longs mois de séchage. On le choisit souvent pour sa formule courte et sa douceur : **il nettoie sans décaper**.

Dans ce guide, on va voir **pourquoi il peut convenir aux peaux sensibles et atopiques**, **quel pourcentage de laurier choisir**, **comment l'utiliser correctement** (parce qu'il y a quelques pièges) et **quelles erreurs éviter**. Un rappel avant de commencer : l'eczéma est une maladie de peau, qui se prend en charge avec un médecin. Un savon n'est pas un traitement. Son rôle est de laver la peau sans l'agresser davantage, et c'est déjà beaucoup.

## Comprendre l'eczéma en deux minutes : ce que votre peau essaie de vous dire

L'eczéma n'a rien à voir avec un manque d'hygiène. C'est une **maladie inflammatoire de la peau**, souvent liée à une barrière cutanée fragilisée. Concrètement, la peau retient moins bien l'eau : elle se dessèche, craquelle, et laisse plus facilement passer des irritants extérieurs (lessives, parfums, tensioactifs agressifs). Démangeaisons et plaques rouges en sont les signes les plus connus.

Les deux grandes familles que l'on rencontre :

- **L'eczéma atopique** (dermatite atopique) : chronique, souvent dès l'enfance, associé à un terrain allergique
- **L'eczéma de contact** : réaction à une substance précise (nickel, parfum, conservateur), apparaît en quelques heures à quelques jours

Dans les deux cas, on cherche à éviter **tout ce qui décape le film hydrolipidique** de la peau. C'est pour cela que le choix du produit lavant compte.

## Pourquoi le savon d'Alep peut convenir aux peaux sensibles et atopiques

Le **savon d'Alep véritable** est fabriqué à partir de deux huiles seulement : **l'huile d'olive** et **l'huile de baie de laurier**, saponifiées avec de la soude et de l'eau. Ni parfum ajouté, ni colorant, ni conservateur : la liste d'ingrédients tient en une ligne.

Cette simplicité est son premier atout pour une peau réactive : **moins d'ingrédients, c'est moins d'occasions de réagir**, et il est plus facile de repérer ce qui ne vous convient pas. Attention cependant, moins ne veut pas dire zéro : l'huile de baie de laurier peut elle-même irriter certaines peaux, d'où l'intérêt du test décrit dans la FAQ.

Au-delà de sa formule courte, voici ce qu'il faut savoir sur ses ingrédients et sur son pH :

### 1. L'huile d'olive : une base douce et nourrissante

L'huile d'olive représente l'essentiel du savon d'Alep. C'est elle qui lui donne sa douceur : une mousse fine, qui lave sans laisser la peau rêche.

Riche en acide oléique, elle rend le savon confortable à l'usage : la peau tire moins après la douche qu'avec un produit lavant plus décapant. Ce confort ne remplace pas un soin hydratant, mais il évite d'ajouter de la sécheresse à une peau qui en a déjà assez.

### 2. L'huile de baie de laurier : la signature purifiante

Elle signe l'odeur si caractéristique du savon d'Alep. L'huile de baie de laurier (*Laurus nobilis*) est utilisée depuis des siècles dans la savonnerie alépine pour son côté **purifiant** : plus sa proportion est élevée, plus le savon purifie, et plus il s'adresse aux peaux mixtes à grasses.

C'est aussi l'ingrédient le plus « actif » de la formule, et celui qui peut gêner les peaux les plus réactives. Sur une peau atopique, plus n'est donc pas mieux : un pourcentage faible est en général mieux toléré au quotidien. Et en cas de plaies, de suintement ou de signe d'infection, ce n'est pas au savon de s'en occuper : consultez un médecin.

### 3. Le pH : ce qu'il faut savoir

Comme tous les vrais savons, le savon d'Alep est **alcalin** : son pH est nettement plus élevé que celui de la peau, qui tourne autour de 5,5. Ce n'est pas un défaut propre à l'Alep, c'est la nature même du savon. Sur une peau atopique, cela a deux conséquences pratiques : bien rincer, et appliquer un émollient juste après la toilette. Si votre peau supporte mal tout savon, même doux, un pain sans savon (syndet) au pH plus proche de celui de la peau peut mieux vous convenir : parlez-en à votre pharmacien.

## Quel pourcentage de laurier choisir selon votre type de peau ?

C'est **la** question qu'on nous pose le plus souvent en boutique. Selon les fabricants, les savons d'Alep se déclinent en plusieurs concentrations d'huile de baie de laurier, de quelques pour cent à plus de 40 %. Voici les grands repères :

| Pourcentage laurier | Caractère du savon | Pour quelle peau |
|---|---|---|
| **5–10 %** | Très doux, usage quotidien | Peaux sensibles, sèches ou à tendance atopique |
| **15–20 %** | Doux, légèrement purifiant | Peaux normales |
| **30 %** | Purifiant | Peaux mixtes |
| **40 % et plus** | Très purifiant | Peaux grasses, plutôt en usage ponctuel |

### La règle d'or pour une peau à tendance atopique

Commencez par un savon **faiblement dosé en laurier**, et gardez-le plusieurs semaines si votre peau le tolère bien. Les savons très dosés (40 % et plus) sont plus purifiants, donc plus susceptibles de dessécher : ils ne sont pas pensés pour les peaux sèches ou atopiques, et en aucun cas pour « traiter » une poussée. Une plaque d'eczéma en crise relève de votre médecin, pas d'un changement de savon.

Pour un enfant ou un bébé, demandez d'abord l'avis de votre pédiatre ou de votre médecin. Si le savon d'Alep est retenu, on choisit un **faible pourcentage de laurier**.

## Comment utiliser le savon d'Alep sur une peau atopique : les bons gestes

Le produit ne fait pas tout. Le **geste** compte autant que le savon. Voici la routine de toilette douce que nous partageons en boutique à Maurepas, en complément des conseils de votre médecin :

### Le matin (toutes peaux)

1. **Eau tiède, jamais chaude.** L'eau chaude dissout le film lipidique, même sans savon. Plus chaude que 37 °C, c'est déjà trop pour une peau atopique.
2. **Humidifiez le savon**, pas la peau. Faites monter la mousse directement entre vos mains ou sur un gant doux.
3. **Massez la mousse** délicatement sur le visage et le corps, **sans frotter**. Inutile de la laisser poser : quelques secondes suffisent pour laver.
4. **Rincez abondamment.** Des résidus de savon laissés sur une peau atopique peuvent la faire tirailler ou gratter ensuite.
5. **Séchez en tamponnant**, pas en frottant. Puis appliquez un soin émollient sur peau encore humide.

### Le soir (en période de poussée)

Même routine, en encore plus doux : contact bref, rinçage soigneux, ni gant ni frottement sur les plaques. Si une zone est très irritée, à vif ou suintante, lavez-la simplement à l'eau tiède et suivez le traitement prescrit par votre médecin. Le savon n'a pas à rester sur une poussée.

### Les premières semaines : observez votre peau

Changer de produit lavant demande un peu de recul : il faut **quelques semaines** pour juger si un savon vous convient vraiment. Mais être patient ne veut pas dire insister coûte que coûte. Si la peau rougit, pique, démange davantage ou si l'eczéma s'aggrave après le changement, arrêtez le savon et demandez conseil à votre médecin ou à votre pharmacien.

## Les 5 erreurs à éviter

1. **Prendre un savon trop "fort".** Utiliser un 40 % laurier sur tout le corps, c'est le meilleur moyen de dessécher une peau déjà fragile. Restez sur un faible pourcentage.
2. **Utiliser de l'eau chaude.** On l'a déjà dit, on le répète : l'eau chaude dessèche la peau, et une peau atopique le supporte mal.
3. **Sauter l'émollient après la douche.** Le savon d'Alep lave, mais il ne remplace ni une crème hydratante ni les soins prescrits par votre médecin. Les deux vont ensemble.
4. **Se fier au seul nom "savon d'Alep".** L'appellation n'est pas protégée : certains savons vendus sous ce nom sont fabriqués industriellement, séchés en quelques semaines, ou parfumés pour imiter l'odeur du laurier. Cherchez la mention **"saponifié au chaudron"** et lisez la **composition INCI** : *Olea europaea fruit oil, Laurus nobilis fruit oil, Sodium hydroxide, Aqua*, ou leur équivalent après saponification (*Sodium olivate*…). Si un parfum (*Parfum*) figure dans la liste, c'est une version parfumée : agréable au quotidien, mais à éviter quand on a une peau atopique.
5. **Changer de savon tous les 3 jours.** Votre peau a besoin de stabilité. Laissez quelques semaines à un nouveau savon avant de juger s'il vous convient, sauf s'il provoque une réaction : dans ce cas, arrêtez-le.

## Quels savons d'Alep choisir chez Orient Relais pour une peau sensible ou atopique ?

Chez nous, les savons d'Alep sont de la marque **Najel**, fabriqués au chaudron selon la méthode traditionnelle.

Deux références de la gamme se distinguent par leur teneur en laurier :

- **Le Savon d'Alep liquide 5 % laurier Najel** : faiblement dosé en laurier, c'est le plus doux de notre sélection, pratique en flacon pour la toilette de tous les jours.
- **Le Savon d'Alep traditionnel 40 % laurier Najel** : le pain traditionnel, très purifiant, plutôt destiné aux peaux mixtes à grasses. Sur une peau sèche ou atopique, il risque de dessécher : ce n'est pas notre premier conseil dans ce cas.

Vous les trouverez dans notre [catégorie Savons d'Alep](/categorie/savons-dalep), avec livraison offerte dès 39 € ou retrait gratuit à la boutique de Maurepas. Nos pains parfumés ou enrichis (rose de Damas, jasmin, miel, lait de chèvre…) sont agréables au quotidien, mais sur une peau atopique, lisez bien leur composition avant de les adopter.

Avant d'utiliser un nouveau savon sur tout le corps, faites le test du pli du coude décrit plus bas, et n'hésitez pas à montrer la composition à votre pharmacien ou à votre dermatologue.

## Au-delà du savon : les gestes qui comptent

Le savon n'est qu'un élément de la toilette. Pour une peau atopique, le suivi médical reste central, et quelques habitudes simples aident à garder une peau plus confortable au quotidien :

### Lessive et vêtements : limiter les irritants

Une lessive sans parfum, un rinçage supplémentaire en machine, des vêtements en coton plutôt qu'en laine directement sur la peau : ces détails comptent autant que le savon. Évitez aussi les adoucissants parfumés.

### L'huile végétale d'argan en émollient

Après la douche, un émollient appliqué sur peau encore humide limite la sensation de sécheresse. Certaines personnes aiment utiliser une huile végétale comme l'huile d'argan, qui nourrit la peau et pénètre sans coller. Si votre médecin vous a prescrit ou conseillé un émollient, gardez-le : une huile peut le compléter, pas le remplacer. Et comme pour le savon, testez-la d'abord sur une petite zone.

### Alimentation et compléments : à voir avec votre médecin

Une alimentation variée et équilibrée reste la base. Si vous envisagez de prendre un complément alimentaire, parlez-en d'abord à votre médecin ou à votre pharmacien : aucun complément ne soigne l'eczéma, et certains peuvent interagir avec un traitement en cours.

## FAQ : les questions qu'on nous pose le plus souvent

### Le savon d'Alep convient-il aux bébés qui ont de l'eczéma ?

C'est d'abord une question pour votre **pédiatre ou votre dermatologue** : la peau du nourrisson est encore plus fragile que celle d'un adulte, et on ne saute pas l'étape médicale. Si le savon d'Alep est retenu, on choisit un faible pourcentage de laurier, sans parfum, en toute petite quantité, et on rince soigneusement.

### Combien de temps dure un pain de savon d'Alep ?

Tout dépend de son poids et de l'usage. À titre indicatif, un pain d'environ **200 g** dure souvent **3 à 4 mois** en utilisation quotidienne douche + visage, à condition de le laisser sécher entre deux utilisations sur un porte-savon aéré. Rapporté au mois, cela reste très économique.

### Peut-on utiliser le savon d'Alep sur les cheveux en cas d'eczéma du cuir chevelu ?

Sur un cuir chevelu en bonne santé, le savon d'Alep peut servir de shampoing doux, suivi d'un rinçage à l'eau tiède légèrement vinaigrée (1 c. à s. de vinaigre de cidre dans 500 ml d'eau) pour faciliter le démêlage. En revanche, des plaques, des squames ou des démangeaisons du cuir chevelu doivent être vues par un médecin : elles peuvent avoir plusieurs causes (eczéma, dermite séborrhéique, psoriasis…) qui ne se soignent pas de la même façon, et ce n'est pas un savon qui les fera disparaître.

### Faut-il arrêter ses crèmes cortisonées ?

**Non, jamais sans avis médical.** Le savon d'Alep est un produit d'hygiène, pas un traitement : il ne remplace pas les soins prescrits et ne permet pas d'en réduire les doses. Toute modification de traitement se décide avec votre médecin ou votre dermatologue.

### Le savon d'Alep peut-il provoquer des allergies ?

Oui, c'est possible, notamment à cause de l'huile de baie de laurier qui peut sensibiliser certaines peaux. Avant la première utilisation sur une zone étendue, **faites un test sur le pli du coude pendant 48 h**, sur une peau sans eczéma. Si aucune rougeur ni démangeaison n'apparaît, vous pouvez l'utiliser plus largement, en restant attentif. En cas de réaction, arrêtez et parlez-en à votre médecin ou à votre pharmacien.

### 9 mois de séchage, pourquoi c'est important ?

Le séchage lent permet au savon de perdre son excès d'eau : il durcit, s'use moins vite et gagne en douceur à l'usage. C'est tout l'intérêt de la méthode traditionnelle, bien plus lente que les séchages accélérés en quelques semaines.

## Conclusion : commencez simple, observez votre peau

L'eczéma est une maladie aux causes multiples, et **aucun savon ne le soigne ni ne le guérit** : sa prise en charge passe par votre médecin, votre dermatologue ou votre pharmacien. Ce qu'un bon savon peut faire, c'est laver votre peau sans l'agresser davantage. Si les gels douche parfumés vous tiraillent, un savon d'Alep **faiblement dosé en laurier, saponifié au chaudron et sans parfum ajouté** est une option simple, et très ancienne, à essayer.

Les bons gestes sont simples : **eau tiède, mousse délicate, rinçage complet, émollient sur peau humide**. Observez votre peau pendant quelques semaines, et arrêtez au moindre signe d'irritation.

Si vous voulez essayer, notre sélection Najel est fabriquée selon la méthode traditionnelle : le [Savon d'Alep liquide 5 % laurier](/categorie/savons-dalep), le plus doux, ou le [Savon d'Alep traditionnel 40 % laurier](/categorie/savons-dalep), plus purifiant, pour les peaux mixtes à grasses. Livraison offerte dès 39 € partout en France, ou retrait à notre boutique du 48 avenue de Touraine à Maurepas (78).

Des questions sur nos savons ? Écrivez-nous à **contact@orient-relais.com** : on vous répond sous 24 h ouvrées. Pour tout ce qui concerne votre eczéma lui-même, le bon interlocuteur reste votre médecin.
        `
    },
    {
        id: 1,
        title: "Le Savon d'Alep : pourquoi 9 mois de séchage ?",
        excerpt: "Découvrez pourquoi le véritable savon d'Alep sèche traditionnellement 9 mois et ce que ce long processus ancestral change pour le savon.",
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

## Ce que change la patience

Grâce à cette maturation lente :
- Le savon perd son excès d'eau, durcit et s'use moins vite
- Il gagne en douceur à l'usage
- L'huile de baie de laurier garde son parfum caractéristique
- La mousse devient plus onctueuse

**Le savon d'Alep existe depuis des siècles et reste apprécié aujourd'hui pour sa douceur et la simplicité de sa recette.**
        `
    },
    {
        id: 2,
        title: "Huile de Nigelle : le trésor des Pharaons",
        excerpt: "Surnommée 'graine bénie' dans la tradition orientale, la nigelle accompagne depuis des millénaires la cuisine et les rituels de beauté. Histoire, usages traditionnels et conseils pour bien choisir son huile de nigelle.",
        category: "Compléments",
        image: "/bento-spices.webp",
        date: "25 Jan 2026",
        readTime: "5 min",
        slug: "huile-nigelle-tresor-pharaons",
        content: `
## Une histoire millénaire

La nigelle (*Nigella sativa*) accompagne l'humanité depuis plus de 3000 ans. On a même retrouvé de ses graines dans la tombe de Toutankhamon ! Dans le monde arabe, on l'appelle « habba sawda », la graine noire, ou encore « la graine bénie ».

## Une plante au cœur des traditions

- **Botanique** : une petite plante aux fleurs bleu pâle, cultivée du bassin méditerranéen jusqu'à l'Inde, dont les graines noires donnent l'huile
- **Cuisine** : ses graines au goût légèrement poivré parfument les pains, les fromages et de nombreux plats orientaux
- **Tradition** : elle occupe une place de choix dans les usages traditionnels du Moyen-Orient, d'Afrique du Nord et d'Asie, transmis de génération en génération
- **Beauté** : son huile entre dans la composition de soins orientaux pour la peau et les cheveux

## Comment l'utiliser ?

**En complément alimentaire** : chez Orient Relais, nous proposons l'**Huile de Nigelle Bio en 120 capsules** de la marque Graine Sauvage. Respectez la dose journalière indiquée sur l'emballage et ne la dépassez pas. Un complément alimentaire ne remplace pas une alimentation variée et équilibrée ni un mode de vie sain. Demandez conseil à un professionnel de santé avant de commencer, notamment en cas de grossesse, d'allaitement ou de traitement en cours. À tenir hors de portée des jeunes enfants.

**En cuisine** : les graines de nigelle se saupoudrent sur le pain, les salades ou les légumes rôtis, pour une note légèrement poivrée.

Pour la composition et le conseil d'utilisation de nos capsules, référez-vous toujours à l'emballage.
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

**PAS FORCÉMENT.** Riche en huile d'olive, le savon d'Alep est un savon doux qui nettoie sans décaper. Tout dépend en fait de sa teneur en laurier : faiblement dosé, il convient aux peaux sèches et sensibles ; très dosé (40 % et plus), il devient plus purifiant et peut dessécher les peaux sèches. Choisissez donc le pourcentage selon votre type de peau.

## Idée reçue n°2 : "Il sent mauvais"

**PARTIELLEMENT VRAI.** Le savon d'Alep traditionnel a une odeur caractéristique de laurier qui peut surprendre. Cette odeur disparaît rapidement après rinçage et certains l'apprécient beaucoup !

## Idée reçue n°3 : "Il ne mousse pas"

**FAUX !** Il mousse moins qu'un gel douche classique, mais il mousse ! Sa mousse est fine et crémeuse, et c'est elle qui lave : inutile de chercher des montagnes de bulles.

## Idée reçue n°4 : "Il est trop cher"

**FAUX !** Bien entretenu, sur un porte-savon qui s'égoutte, un pain d'environ 200 g peut durer 3 à 4 mois en usage quotidien. Rapporté au nombre de douches, il revient souvent moins cher qu'un gel douche !

## Idée reçue n°5 : "Il ne convient qu'au corps"

**FAUX !** Le savon d'Alep peut s'utiliser sur le visage (en évitant le contour des yeux), le corps ET les cheveux. C'est un produit multi-usage par excellence.
        `
    },
    {
        id: 4,
        title: "Moringa, Gingembre, Guduchi : trois plantes phares de l'ayurvéda",
        excerpt: "Ces plantes utilisées depuis des millénaires en Inde arrivent enfin chez vous. Découvrez leur histoire, leurs usages traditionnels dans l'ayurvéda et sous quelle forme on les trouve.",
        category: "Ayurvéda",
        image: "/bento-spices.webp",
        date: "15 Jan 2026",
        readTime: "7 min",
        slug: "plantes-ayurvediques",
        content: `
## Le Moringa : l'arbre aux mille usages

Originaire du pied de l'Himalaya, le *Moringa oleifera* est un arbre qui pousse vite et résiste à la sécheresse. En Inde, presque tout se consomme :
- les gousses, appelées « drumsticks », mijotent dans les currys et le sambar du sud de l'Inde
- les feuilles se cuisinent comme un légume vert, fraîches ou séchées en poudre
- les graines donnent une huile, l'huile de ben, déjà utilisée en parfumerie dans l'Antiquité

**Utilisation** : chez nous, le Moringa est proposé en gélules par la marque Ayur-vana, à prendre en suivant la dose journalière indiquée sur l'emballage.

## Le Gingembre : le réchauffant

Le gingembre (*Zingiber officinale*) est une épice incontournable de la cuisine indienne et de la tradition ayurvédique. On le retrouve :
- dans les plats du quotidien : currys, dal, chutneys
- dans le chai, le thé épicé indien, ou en infusion de racine fraîche
- dans les textes ayurvédiques, qui le classent parmi les épices dites « chauffantes »

**Utilisation** : en infusion, en cuisine, ou en gélules avec le Gingembre indien bio (Andraka) d'Ayur-vana, en suivant la dose indiquée sur l'emballage.

## Le Guduchi : la liane « Amrita »

Le Guduchi (*Tinospora cordifolia*) est une liane grimpante d'Inde aux feuilles en forme de cœur. En sanskrit, on le surnomme « Amrita », du nom du nectar d'immortalité de la mythologie hindoue : un surnom poétique, à lire comme un héritage culturel et non comme une promesse. Dans la tradition :
- il fait partie des « rasayana », une catégorie de plantes décrite dans les textes classiques de l'ayurvéda
- on utilisait ses tiges en décoction ou réduites en poudre
- coupée, sa tige peut reprendre racine et repartir, d'où sa réputation de plante « qui ne meurt pas »

**Utilisation** : en gélules avec le Guduchi Bio d'Ayur-vana, selon la dose journalière et la durée indiquées sur l'emballage.

**Bon à savoir** : ces plantes sont proposées sous forme de compléments alimentaires. Un complément alimentaire ne remplace pas une alimentation variée et équilibrée ni un mode de vie sain. Respectez la dose journalière indiquée et ne la dépassez pas. Demandez conseil à un professionnel de santé avant de commencer, notamment en cas de grossesse, d'allaitement, de traitement en cours ou de problème de santé. À tenir hors de portée des jeunes enfants.
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
Elle garantit une culture sans pesticides ni engrais chimiques de synthèse, contrôlée par un organisme certificateur. Repérez le logo AB ou l'Eurofeuille sur le flacon.

### 2. La mention "100% pure et naturelle"
Évitez les huiles coupées avec des additifs synthétiques. Cette mention est un minimum, pas un label : vérifiez aussi les critères suivants.

### 3. Le nom latin
Une huile de qualité indique le nom latin de la plante (ex: Eucalyptus globulus), qui évite toute confusion entre espèces voisines.

### 4. Le chémotype
Pour certaines plantes comme le Thym, le chémotype précise la molécule dominante (thym à thymol, thym à linalol…).

## Nos huiles Terra Etica

Une partie de nos huiles essentielles vient de la marque Terra Etica. Avant de choisir, regardez sur chaque fiche :
- La mention Bio dans le nom : seules les références qui la portent sont certifiées, ce n'est pas le cas de toutes nos huiles
- Le nom latin de la plante
- Les précautions d'emploi indiquées sur le flacon

Vous trouverez notamment chez nous du Ravintsara, du Niaouli et de l'Eucalyptus globulus, et bien d'autres ! Les huiles essentielles sont des produits très concentrés : tenez-les hors de portée des enfants, et demandez l'avis d'un professionnel de santé avant de les utiliser pendant la grossesse, l'allaitement ou chez un jeune enfant.
        `
    },
    {
        id: 6,
        title: "Routine peau sensible : le protocole savon d'Alep",
        excerpt: "Votre peau réagit à tout ? Voici comment intégrer le savon d'Alep à une routine douce pour peau sensible.",
        category: "Conseils",
        image: "/bento-soap.webp",
        date: "5 Jan 2026",
        readTime: "4 min",
        slug: "routine-peau-sensible",
        content: `
## Pourquoi le savon d'Alep ?

Le savon d'Alep traditionnel est souvent choisi pour les peaux sensibles car :
- **Sans parfum ajouté** (dans sa version traditionnelle) : moins d'allergènes potentiels
- **Sans conservateur** : une formule minimaliste
- **Huile d'olive et laurier** : deux huiles végétales pour un lavage doux

## Le protocole en 3 étapes

### Matin
1. Humidifiez votre visage à l'eau tiède
2. Faites mousser le savon dans vos mains
3. Appliquez délicatement, rincez à l'eau froide

### Soir
Le même rituel + une crème hydratante naturelle.

### 1 fois par semaine
Masque au savon d'Alep : appliquez la mousse, laissez poser une minute au plus, rincez abondamment. Si votre peau tiraille ou rougit, passez-vous de cette étape.

## Notre recommandation

Pour les peaux sensibles, privilégiez un savon d'Alep **faiblement dosé en laurier**, de préférence sans parfum ajouté (vérifiez la composition). Dans notre sélection Najel, le plus faiblement dosé est le **Savon d'Alep liquide 5 % laurier**. Les taux élevés, comme notre **Savon d'Alep traditionnel 40 % laurier**, donnent un savon plus purifiant, plutôt destiné aux peaux mixtes à grasses. Dans tous les cas, faites un essai sur une petite zone avant d'adopter un nouveau savon. Et si votre peau présente une maladie (eczéma, psoriasis…), demandez conseil à votre médecin ou à votre pharmacien.
        `
    }
];

export function getArticleBySlug(slug: string): Article | undefined {
    return ARTICLES.find(a => a.slug === slug);
}

export function getRelatedArticles(currentSlug: string, limit: number = 2): Article[] {
    return ARTICLES.filter(a => a.slug !== currentSlug).slice(0, limit);
}
