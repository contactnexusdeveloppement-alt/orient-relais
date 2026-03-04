import { Separator } from "@/components/ui/separator";

export const metadata = {
    title: "Conditions Générales de Vente | Orient Relais",
    description: "Conditions générales de vente du site Orient Relais. Informations sur les prix, commandes, livraisons, paiements et droit de rétractation.",
};

export default function CGVPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-3xl">
            <h1 className="font-serif text-4xl font-bold text-stone-900 mb-2">Conditions Générales de Vente</h1>
            <p className="text-sm text-stone-500 mb-8">Dernière mise à jour : mars 2026</p>

            <div className="prose prose-stone max-w-none">
                <section className="mb-8">
                    <h2 className="font-serif text-2xl font-bold text-stone-800 mb-4">Article 1 — Objet</h2>
                    <p className="text-stone-600 leading-relaxed">
                        Les présentes conditions générales de vente (CGV) régissent l'ensemble des ventes de produits
                        effectuées par Orient Relais (entreprise individuelle HARB GEORGES, SIRET 924 298 540 00015)
                        via son site internet <strong>orient-relais.com</strong>.
                    </p>
                    <p className="text-stone-600 leading-relaxed mt-2">
                        Toute commande implique l'acceptation sans réserve des présentes CGV.
                    </p>
                </section>

                <Separator className="my-8" />

                <section className="mb-8">
                    <h2 className="font-serif text-2xl font-bold text-stone-800 mb-4">Article 2 — Prix</h2>
                    <p className="text-stone-600 leading-relaxed">
                        Les prix de nos produits sont indiqués en euros toutes taxes comprises (TTC), hors frais de livraison.
                        Orient Relais se réserve le droit de modifier ses prix à tout moment, étant entendu que le prix figurant
                        sur le site au moment de la validation de la commande sera le seul applicable à l'acheteur.
                    </p>
                </section>

                <Separator className="my-8" />

                <section className="mb-8">
                    <h2 className="font-serif text-2xl font-bold text-stone-800 mb-4">Article 3 — Commande</h2>
                    <p className="text-stone-600 leading-relaxed">
                        Toute commande passée sur le site constitue la formation d'un contrat conclu à distance
                        entre le client et Orient Relais. La validation de la commande par le client vaut acceptation
                        des prix et descriptions des produits disponibles à la vente ainsi que des présentes CGV.
                    </p>
                    <p className="text-stone-600 leading-relaxed mt-2">
                        Un email de confirmation de commande est envoyé au client après validation du paiement.
                    </p>
                </section>

                <Separator className="my-8" />

                <section className="mb-8">
                    <h2 className="font-serif text-2xl font-bold text-stone-800 mb-4">Article 4 — Paiement</h2>
                    <p className="text-stone-600 leading-relaxed">
                        Le règlement des commandes s'effectue par carte bancaire (Visa, Mastercard) via la plateforme
                        sécurisée <strong>Stripe</strong>. Les données de paiement sont cryptées et ne transitent jamais
                        par nos serveurs. Le débit est effectué au moment de la validation de la commande.
                    </p>
                    <p className="text-stone-600 leading-relaxed mt-2">
                        Les moyens de paiement acceptés sont : Carte bancaire, Apple Pay et Google Pay.
                    </p>
                </section>

                <Separator className="my-8" />

                <section className="mb-8">
                    <h2 className="font-serif text-2xl font-bold text-stone-800 mb-4">Article 5 — Livraison</h2>
                    <p className="text-stone-600 leading-relaxed">
                        Les produits sont livrés à l'adresse de livraison indiquée au cours du processus de commande.
                        Les modes de livraison proposés sont :
                    </p>
                    <ul className="list-disc list-inside text-stone-600 mt-3 space-y-2">
                        <li>Livraison en point relais (Mondial Relay) : 2 à 5 jours ouvrés</li>
                        <li>Livraison à domicile : 2 à 5 jours ouvrés</li>
                    </ul>
                    <p className="text-stone-600 leading-relaxed mt-3">
                        <strong>La livraison est offerte à partir de 39 € d'achat</strong> pour la France métropolitaine.
                    </p>
                </section>

                <Separator className="my-8" />

                <section className="mb-8">
                    <h2 className="font-serif text-2xl font-bold text-stone-800 mb-4">Article 6 — Droit de rétractation</h2>
                    <p className="text-stone-600 leading-relaxed">
                        Conformément aux articles L.221-18 et suivants du Code de la consommation, vous disposez d'un
                        délai de <strong>14 jours</strong> à compter de la réception de votre commande pour exercer
                        votre droit de rétractation, sans avoir à justifier de motifs ni à payer de pénalités.
                    </p>
                    <p className="text-stone-600 leading-relaxed mt-2">
                        Les frais de retour sont à la charge du client. Les produits doivent être retournés dans leur
                        emballage d'origine, en parfait état et accompagnés de la facture. Le remboursement sera effectué
                        dans un délai de 14 jours suivant la réception du retour.
                    </p>
                    <p className="text-stone-600 leading-relaxed mt-2">
                        <strong>Exceptions :</strong> Le droit de rétractation ne s'applique pas aux produits descellés
                        après livraison et ne pouvant être renvoyés pour des raisons d'hygiène ou de protection de la santé
                        (articles L.221-28 du Code de la consommation).
                    </p>
                </section>

                <Separator className="my-8" />

                <section className="mb-8">
                    <h2 className="font-serif text-2xl font-bold text-stone-800 mb-4">Article 7 — Garantie légale de conformité</h2>
                    <p className="text-stone-600 leading-relaxed">
                        Conformément aux articles L.217-4 et suivants du Code de la consommation, le consommateur
                        bénéficie de la garantie légale de conformité pour les produits achetés. En cas de défaut de
                        conformité, le consommateur peut demander la réparation ou le remplacement du bien, ou à défaut,
                        une réduction du prix ou la résolution du contrat.
                    </p>
                    <p className="text-stone-600 leading-relaxed mt-2">
                        Le consommateur bénéficie également de la garantie légale des vices cachés (articles 1641 à 1649
                        du Code civil).
                    </p>
                </section>

                <Separator className="my-8" />

                <section className="mb-8">
                    <h2 className="font-serif text-2xl font-bold text-stone-800 mb-4">Article 8 — Médiation</h2>
                    <p className="text-stone-600 leading-relaxed">
                        Conformément aux articles L.612-1 et suivants du Code de la consommation, en cas de litige
                        non résolu, le consommateur peut recourir gratuitement au service de médiation. Nous vous
                        invitons à nous contacter au préalable à l'adresse Contact@orient-relais.com pour tenter de
                        résoudre le différend à l'amiable.
                    </p>
                    <p className="text-stone-600 leading-relaxed mt-2">
                        Vous pouvez également déposer votre réclamation sur la plateforme européenne de
                        résolution des litiges en ligne :{" "}
                        <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            https://ec.europa.eu/consumers/odr
                        </a>
                    </p>
                </section>

                <Separator className="my-8" />

                <section className="mb-8">
                    <h2 className="font-serif text-2xl font-bold text-stone-800 mb-4">Article 9 — Droit applicable</h2>
                    <p className="text-stone-600 leading-relaxed">
                        Les présentes CGV sont soumises au droit français. En cas de litige, et à défaut d'accord amiable,
                        les tribunaux français seront seuls compétents.
                    </p>
                </section>

                <Separator className="my-8" />

                <section>
                    <h2 className="font-serif text-2xl font-bold text-stone-800 mb-4">Article 10 — Contact</h2>
                    <p className="text-stone-600 leading-relaxed">
                        Pour toute question relative à votre commande :<br />
                        <strong>Orient Relais</strong> — HARB GEORGES<br />
                        Email : Contact@orient-relais.com<br />
                        Téléphone : 06 99 55 69 77 (Lun-Ven, 9h-18h)<br />
                        48 avenue de Touraine, 78310 MAUREPAS, France
                    </p>
                </section>
            </div>
        </div>
    );
}
