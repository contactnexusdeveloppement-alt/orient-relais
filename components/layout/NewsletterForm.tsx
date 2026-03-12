"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Sparkles } from "lucide-react";
import { subscribeNewsletter } from "@/app/actions/newsletter";
import { toast } from "sonner";

export function NewsletterForm() {
    const [isPending, setIsPending] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsPending(true);

        const formData = new FormData(event.currentTarget);
        const result = await subscribeNewsletter(formData);

        setIsPending(false);

        if (result?.error) {
            toast.error(result.error);
        } else {
            toast.success("Merci ! Vous êtes bien inscrit(e) à notre newsletter.", {
                description: "Votre code promo de -10% vous sera envoyé prochainement."
            });
            (event.target as HTMLFormElement).reset();
        }
    }

    return (
        <div className="p-5 rounded-2xl bg-gradient-to-br from-stone-800/80 to-stone-800/40 border border-stone-700/50">
            <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">-10% sur la 1ère commande</span>
            </div>
            <p className="text-sm text-stone-400 mb-4">
                Recevez nos conseils bien-être et offres exclusives.
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
                <Input
                    name="email"
                    type="email"
                    required
                    placeholder="Votre email"
                    className="bg-stone-900/50 border-stone-600 text-stone-100 placeholder:text-stone-500 focus-visible:ring-primary focus-visible:border-primary rounded-xl"
                />
                <Button disabled={isPending} type="submit" className="w-full font-semibold rounded-xl gap-2 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 text-white transition-all">
                    {isPending ? "Inscription..." : (
                        <>Je m'inscris <ArrowRight className="h-4 w-4" /></>
                    )}
                </Button>
            </form>
        </div>
    );
}
