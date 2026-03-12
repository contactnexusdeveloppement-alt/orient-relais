"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";
import { sendContactEmail } from "@/app/actions/contact";
import { toast } from "sonner";

export default function ContactPage() {
    const [isPending, setIsPending] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsPending(true);

        const formData = new FormData(event.currentTarget);
        const result = await sendContactEmail(formData);

        setIsPending(false);

        if (result?.error) {
            toast.error(result.error);
        } else {
            toast.success("Votre message a bien été envoyé. Nous vous répondrons dans les plus brefs délais.");
            (event.target as HTMLFormElement).reset();
        }
    }

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-2xl mx-auto text-center mb-16">
                <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary bg-primary/5 px-4 py-1.5 rounded-full border border-primary/10 mb-4">
                    <Mail className="h-4 w-4" /> Contactez-nous
                </span>
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-stone-900 mt-2 mb-4">À votre écoute</h1>
                <p className="text-stone-600 text-lg">
                    Une question sur un produit ? Un conseil personnalisé ? <br />
                    Notre équipe vous répond sous 24h ouvrées.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto">
                {/* Contact Info */}
                <div className="space-y-8">
                    <div className="bg-gradient-to-br from-amber-50/50 to-stone-50 p-8 rounded-2xl border border-primary/10 shadow-sm">
                        <h3 className="font-serif text-2xl font-bold text-stone-900 mb-6">Nos Coordonnées</h3>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4 group">
                                <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm transition-all group-hover:scale-110 group-hover:shadow-md group-hover:shadow-primary/20">
                                    <Mail className="h-5 w-5" />
                                </div>
                                <div>
                                    <span className="block font-bold text-stone-900">Email</span>
                                    <a href="mailto:Contact@orient-relais.com" className="text-stone-600 hover:text-primary">Contact@orient-relais.com</a>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 group">
                                <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm transition-all group-hover:scale-110 group-hover:shadow-md group-hover:shadow-primary/20">
                                    <Phone className="h-5 w-5" />
                                </div>
                                <div>
                                    <span className="block font-bold text-stone-900">Téléphone</span>
                                    <span className="text-stone-600">06 99 55 69 77</span>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 group">
                                <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm transition-all group-hover:scale-110 group-hover:shadow-md group-hover:shadow-primary/20">
                                    <MapPin className="h-5 w-5" />
                                </div>
                                <div>
                                    <span className="block font-bold text-stone-900">Adresse</span>
                                    <p className="text-stone-600">
                                        48 avenue de Touraine,<br /> 78310 MAUREPAS, France
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-serif text-xl font-bold text-stone-900 mb-4 flex items-center gap-2">
                            <span className="h-6 w-6 bg-primary/10 rounded-full flex items-center justify-center text-primary text-sm">?</span>
                            Questions Fréquentes
                        </h3>
                        <div className="space-y-3">
                            <details className="bg-white border border-stone-200 rounded-xl p-4 cursor-pointer group hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 transition-all">
                                <summary className="font-medium text-stone-900 group-hover:text-primary transition-colors">Quels sont les délais de livraison ?</summary>
                                <p className="text-sm text-stone-600 mt-3 pl-4 border-l-2 border-primary/30">
                                    Nous expédions vos commandes sous 24h. La livraison en France met généralement 48h à 72h ouvrées (Colissimo ou Mondial Relay).
                                </p>
                            </details>
                            <details className="bg-white border border-stone-200 rounded-xl p-4 cursor-pointer group hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 transition-all">
                                <summary className="font-medium text-stone-900 group-hover:text-primary transition-colors">Vos produits sont-ils certifiés Bio ?</summary>
                                <p className="text-sm text-stone-600 mt-3 pl-4 border-l-2 border-primary/30">
                                    Absolument. Nos savons et huiles sont certifiés par Ecocert et proviennent de l'agriculture biologique.
                                </p>
                            </details>
                            <details className="bg-white border border-stone-200 rounded-xl p-4 cursor-pointer group hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 transition-all">
                                <summary className="font-medium text-stone-900 group-hover:text-primary transition-colors">Comment utiliser le savon d'Alep ?</summary>
                                <p className="text-sm text-stone-600 mt-3 pl-4 border-l-2 border-primary/30">
                                    Humidifiez le savon et faites-le mousser entre vos mains. Appliquez sur peau mouillée puis rincez. Laissez sécher à l'air libre entre utilisations.
                                </p>
                            </details>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="relative bg-white p-8 rounded-3xl border border-stone-200 shadow-xl shadow-stone-200/50 overflow-hidden">
                    {/* Corner accent */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/5 to-transparent" />
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-amber-400 to-primary" />

                    <h3 className="font-serif text-2xl font-bold text-stone-900 mb-6">Envoyez-nous un message</h3>
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="prenom" className="text-sm font-bold text-stone-700">Prénom</label>
                                <Input id="prenom" name="prenom" placeholder="Votre prénom" className="h-11 rounded-xl border-stone-200 focus:border-primary focus:ring-primary" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="nom" className="text-sm font-bold text-stone-700">Nom *</label>
                                <Input id="nom" name="nom" required placeholder="Votre nom" className="h-11 rounded-xl border-stone-200 focus:border-primary focus:ring-primary" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-bold text-stone-700">Email *</label>
                                <Input id="email" name="email" required type="email" placeholder="votre@email.com" className="h-11 rounded-xl border-stone-200 focus:border-primary focus:ring-primary" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="telephone" className="text-sm font-bold text-stone-700">Téléphone</label>
                                <Input id="telephone" name="telephone" placeholder="06 00 00 00 00" className="h-11 rounded-xl border-stone-200 focus:border-primary focus:ring-primary" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="sujet" className="text-sm font-bold text-stone-700">Sujet</label>
                            <Input id="sujet" name="sujet" placeholder="Information produit, Commande..." className="h-11 rounded-xl border-stone-200 focus:border-primary focus:ring-primary" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-bold text-stone-700">Message *</label>
                            <Textarea id="message" name="message" required placeholder="Comment pouvons-nous vous aider ?" className="min-h-[150px] rounded-xl border-stone-200 focus:border-primary focus:ring-primary" />
                        </div>
                        <Button disabled={isPending} type="submit" className="w-full h-12 font-bold rounded-xl bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all mt-4">
                            {isPending ? "Envoi en cours..." : "Envoyer le message"}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

