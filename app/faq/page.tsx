"use client";

import Link from "next/link";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { jsonLdScript } from "@/lib/json-ld";

const FAQ_SECTIONS = [
    {
        title: "Produits",
        questions: [
            {
                q: "Vos produits sont-ils vraiment Bio ?",
                a: "Oui, tous nos produits sont certifiés bio ou fabriqués à partir d'ingrédients naturels. Nous travaillons avec des marques de confiance comme DP Nature, Najel et Terra Etica qui garantissent des produits sans ingrédients chimiques."
            },
            {
                q: "Quelle est la différence entre les savons à 20% et 40% de laurier ?",
                a: "Le pourcentage indique la concentration en huile de baie de laurier. Plus le pourcentage est élevé, plus le savon est purifiant et recommandé pour les peaux à problèmes (eczéma, psoriasis). Le 20% convient aux peaux normales, le 40% aux peaux grasses ou à problèmes."
            },
            {
                q: "Combien de temps dure un savon d'Alep ?",
                a: "Un pain de 200g dure généralement 3 à 4 mois en utilisation quotidienne. Astuce : laissez-le sécher entre chaque utilisation sur un porte-savon aéré pour prolonger sa durée de vie."
            },
            {
                q: "Puis-je utiliser le savon d'Alep sur le visage ?",
                a: "Absolument ! Le savon d'Alep est multi-usage : visage, corps et même cheveux. Son surgras naturel le rend très doux pour tous types de peaux."
            }
        ]
    },
    {
        title: "Commande & Livraison",
        questions: [
            {
                q: "Quels sont les délais de livraison ?",
                a: "Nous expédions sous 24-48h ouvrées. La livraison prend ensuite 2 à 4 jours en France métropolitaine avec Mondial Relay ou Colissimo."
            },
            {
                q: "La livraison est-elle gratuite ?",
                a: "Oui, la livraison est offerte dès 39€ d'achat en France métropolitaine avec Mondial Relay. En dessous, les frais sont de 3,90€ à 6,90€ selon le poids."
            },
            {
                q: "Livrez-vous à l'international ?",
                a: "Nous livrons actuellement en France métropolitaine, Belgique et Luxembourg. Pour d'autres destinations, contactez-nous."
            },
            {
                q: "Comment suivre ma commande ?",
                a: "Un email avec le numéro de suivi vous est envoyé dès l'expédition. Vous pouvez suivre votre colis sur le site du transporteur."
            }
        ]
    },
    {
        title: "Paiement",
        questions: [
            {
                q: "Quels moyens de paiement acceptez-vous ?",
                a: "Nous acceptons les cartes bancaires (Visa, Mastercard), PayPal et le paiement par virement. Tous les paiements sont sécurisés."
            },
            {
                q: "Le paiement est-il sécurisé ?",
                a: "Oui, nous utilisons un système de paiement sécurisé avec cryptage SSL. Vos données bancaires ne sont jamais stockées sur nos serveurs."
            }
        ]
    },
    {
        title: "Retours & SAV",
        questions: [
            {
                q: "Puis-je retourner un produit ?",
                a: "Oui, vous disposez de 14 jours après réception pour retourner un produit non ouvert et dans son emballage d'origine. Les frais de retour sont à votre charge."
            },
            {
                q: "Comment contacter le service client ?",
                a: "Par email à contact@orient-relais.com ou par téléphone au 06 99 55 69 77. Nous répondons sous 24h ouvrées."
            },
            {
                q: "Que faire si mon produit est endommagé ?",
                a: "Contactez-nous immédiatement avec des photos du produit. Nous procéderons à un échange ou un remboursement."
            }
        ]
    }
];

// Build the FAQPage JSON-LD payload from the sections above. Google rich
// results support up to ~10 Q&A entries with reasonable length.
const FAQ_JSON_LD = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_SECTIONS.flatMap((section) =>
        section.questions.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: {
                "@type": "Answer",
                text: item.a,
            },
        }))
    ),
};

export default function FAQPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: jsonLdScript(FAQ_JSON_LD) }}
            />
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="text-sm font-bold uppercase tracking-widest text-primary">Aide</span>
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-stone-900 mb-4 mt-2">
                    Questions Fréquentes
                </h1>
                <p className="text-stone-600 text-lg">
                    Retrouvez les réponses aux questions les plus posées. Vous ne trouvez pas votre réponse ?{" "}
                    <Link href="/contact" className="text-primary hover:underline">Contactez-nous</Link>
                </p>
            </div>

            {/* FAQ Sections */}
            <div className="max-w-3xl mx-auto space-y-12">
                {FAQ_SECTIONS.map((section, sectionIndex) => (
                    <section key={sectionIndex}>
                        <h2 className="font-serif text-2xl font-bold text-stone-900 mb-6 pb-2 border-b border-stone-200">
                            {section.title}
                        </h2>
                        <Accordion type="single" collapsible className="space-y-3">
                            {section.questions.map((item, index) => (
                                <AccordionItem
                                    key={index}
                                    value={`${sectionIndex}-${index}`}
                                    className="bg-white border border-stone-200 rounded-xl overflow-hidden hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 transition-all duration-300 px-5"
                                >
                                    <AccordionTrigger className="text-stone-900 font-medium text-left hover:no-underline hover:text-primary transition-colors py-5">
                                        {item.q}
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <p className="text-stone-600 leading-relaxed border-l-2 border-primary pl-4">
                                            {item.a}
                                        </p>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </section>
                ))}
            </div>

            {/* Contact CTA */}
            <div className="max-w-3xl mx-auto mt-16 bg-gradient-to-r from-amber-50/70 to-stone-50 rounded-2xl p-8 text-center border border-primary/10">
                <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">Vous avez une autre question ?</h3>
                <p className="text-stone-600 mb-4">Notre équipe est disponible pour vous aider.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/contact" className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                        Nous contacter
                    </Link>
                    <a href="tel:0699556977" className="inline-flex items-center justify-center px-6 py-3 bg-white border border-stone-200 rounded-lg font-semibold text-stone-900 hover:bg-stone-50 transition-colors">
                        06 99 55 69 77
                    </a>
                </div>
            </div>
        </div>
    );
}
