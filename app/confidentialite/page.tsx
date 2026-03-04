import { Separator } from "@/components/ui/separator";

export const metadata = {
    title: "Politique de Confidentialité | Orient Relais",
    description: "Politique de confidentialité et protection des données personnelles du site Orient Relais.",
};

export default function ConfidentialitePage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-3xl">
            <h1 className="font-serif text-4xl font-bold text-stone-900 mb-2">Politique de Confidentialité</h1>
            <p className="text-sm text-stone-500 mb-8">Dernière mise à jour : mars 2026</p>

            <div className="prose prose-stone max-w-none">
                <section className="mb-8">
                    <h2 className="font-serif text-2xl font-bold text-stone-800 mb-4">Responsable du traitement</h2>
                    <p className="text-stone-600 leading-relaxed">
                        Le responsable du traitement de vos données personnelles est :<br />
                        <strong>HARB GEORGES</strong> (Orient Relais)<br />
                        Entrepreneur individuel — SIRET 924 298 540 00015<br />
                        48 avenue de Touraine, 78310 MAUREPAS, France<br />
                        Email : Contact@orient-relais.com
                    </p>
                </section>

                <Separator className="my-8" />

                <section className="mb-8">
                    <h2 className="font-serif text-2xl font-bold text-stone-800 mb-4">Données collectées</h2>
                    <p className="text-stone-600 leading-relaxed">
                        Orient Relais collecte les données que vous nous fournissez lors de votre commande :
                    </p>
                    <ul className="list-disc list-inside text-stone-600 mt-3 space-y-2">
                        <li>Nom et prénom</li>
                        <li>Adresse email</li>
                        <li>Adresse de livraison et de facturation</li>
                        <li>Numéro de téléphone</li>
                        <li>Données de navigation (cookies, adresse IP)</li>
                    </ul>
                    <p className="text-stone-600 leading-relaxed mt-3">
                        <strong>Les informations de paiement</strong> (numéro de carte bancaire) ne sont jamais stockées
                        sur nos serveurs. Elles sont traitées directement par notre prestataire de paiement Stripe.
                    </p>
                </section>

                <Separator className="my-8" />

                <section className="mb-8">
                    <h2 className="font-serif text-2xl font-bold text-stone-800 mb-4">Finalités du traitement</h2>
                    <p className="text-stone-600 leading-relaxed">
                        Vos données personnelles sont utilisées pour :
                    </p>
                    <ul className="list-disc list-inside text-stone-600 mt-3 space-y-2">
                        <li>Traiter et expédier vos commandes</li>
                        <li>Gérer la relation client (SAV, suivi de commande)</li>
                        <li>Vous contacter concernant votre commande</li>
                        <li>Vous envoyer notre newsletter (uniquement si vous y avez consenti)</li>
                        <li>Améliorer nos services et l'expérience utilisateur</li>
                        <li>Respecter nos obligations légales et comptables</li>
                    </ul>
                    <p className="text-stone-600 leading-relaxed mt-3">
                        <strong>Base légale :</strong> exécution du contrat (commande), consentement (newsletter),
                        et intérêt légitime (amélioration des services).
                    </p>
                </section>

                <Separator className="my-8" />

                <section className="mb-8">
                    <h2 className="font-serif text-2xl font-bold text-stone-800 mb-4">Durée de conservation</h2>
                    <p className="text-stone-600 leading-relaxed">
                        Vos données personnelles sont conservées pendant les durées suivantes :
                    </p>
                    <ul className="list-disc list-inside text-stone-600 mt-3 space-y-2">
                        <li><strong>Données de commande :</strong> 5 ans à compter de la dernière commande (obligations comptables)</li>
                        <li><strong>Données de prospection :</strong> 3 ans à compter du dernier contact</li>
                        <li><strong>Cookies :</strong> 13 mois maximum</li>
                    </ul>
                </section>

                <Separator className="my-8" />

                <section className="mb-8">
                    <h2 className="font-serif text-2xl font-bold text-stone-800 mb-4">Sous-traitants et destinataires</h2>
                    <p className="text-stone-600 leading-relaxed">
                        Vos données peuvent être transmises aux prestataires suivants, dans le cadre strict de l'exécution
                        de nos services :
                    </p>
                    <ul className="list-disc list-inside text-stone-600 mt-3 space-y-2">
                        <li><strong>Stripe Inc.</strong> (USA) — traitement des paiements par carte bancaire</li>
                        <li><strong>Vercel Inc.</strong> (USA) — hébergement du site internet</li>
                        <li><strong>OVH SAS</strong> (France) — hébergement du back-office</li>
                        <li><strong>Mondial Relay</strong> (France) — livraison des colis en point relais</li>
                    </ul>
                </section>

                <Separator className="my-8" />

                <section className="mb-8">
                    <h2 className="font-serif text-2xl font-bold text-stone-800 mb-4">Transferts hors Union Européenne</h2>
                    <p className="text-stone-600 leading-relaxed">
                        Certains de nos prestataires (Stripe, Vercel) sont basés aux États-Unis. Ces transferts
                        sont encadrés par les clauses contractuelles types de la Commission Européenne et/ou le
                        EU-US Data Privacy Framework, garantissant un niveau de protection adéquat de vos données.
                    </p>
                </section>

                <Separator className="my-8" />

                <section className="mb-8">
                    <h2 className="font-serif text-2xl font-bold text-stone-800 mb-4">Cookies</h2>
                    <p className="text-stone-600 leading-relaxed">
                        Notre site utilise des cookies strictement nécessaires au bon fonctionnement du site
                        (panier d'achat, session). Aucun cookie publicitaire ou de traçage n'est utilisé.
                        Vous pouvez configurer votre navigateur pour refuser les cookies, mais cela pourrait
                        altérer votre expérience de navigation.
                    </p>
                </section>

                <Separator className="my-8" />

                <section className="mb-8">
                    <h2 className="font-serif text-2xl font-bold text-stone-800 mb-4">Protection des données</h2>
                    <p className="text-stone-600 leading-relaxed">
                        Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées
                        pour protéger vos données contre tout accès non autorisé, altération, divulgation ou
                        destruction. Les échanges de données sont chiffrés via le protocole HTTPS/TLS.
                    </p>
                </section>

                <Separator className="my-8" />

                <section>
                    <h2 className="font-serif text-2xl font-bold text-stone-800 mb-4">Vos droits</h2>
                    <p className="text-stone-600 leading-relaxed">
                        Conformément au RGPD (Règlement UE 2016/679) et à la loi Informatique et Libertés,
                        vous disposez des droits suivants :
                    </p>
                    <ul className="list-disc list-inside text-stone-600 mt-3 space-y-2">
                        <li><strong>Droit d'accès</strong> — obtenir une copie de vos données</li>
                        <li><strong>Droit de rectification</strong> — corriger vos données inexactes</li>
                        <li><strong>Droit de suppression</strong> — demander l'effacement de vos données</li>
                        <li><strong>Droit de limitation</strong> — restreindre le traitement de vos données</li>
                        <li><strong>Droit d'opposition</strong> — vous opposer au traitement de vos données</li>
                        <li><strong>Droit à la portabilité</strong> — recevoir vos données dans un format structuré</li>
                    </ul>
                    <p className="text-stone-600 leading-relaxed mt-4">
                        Pour exercer ces droits, contactez-nous à : <strong>Contact@orient-relais.com</strong>
                    </p>
                    <p className="text-stone-600 leading-relaxed mt-2">
                        Vous disposez également du droit d'introduire une réclamation auprès de la{" "}
                        <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            CNIL (Commission Nationale de l'Informatique et des Libertés)
                        </a>.
                    </p>
                </section>
            </div>
        </div>
    );
}
