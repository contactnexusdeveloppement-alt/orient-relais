"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, AlertCircle, CheckCircle } from "lucide-react";

export default function MotDePasseOubliePage() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const res = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();
            setSuccess(true);
        } catch {
            setError("Erreur réseau. Veuillez réessayer.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-16 md:py-24 max-w-md">
            <div className="space-y-3 text-center mb-8">
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-stone-900">Mot de passe oublié</h1>
                <p className="text-stone-500">
                    Entrez votre adresse email pour recevoir un lien de réinitialisation.
                </p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl border border-stone-200 shadow-lg shadow-stone-200/50">
                {success ? (
                    <div className="text-center py-6">
                        <div className="h-16 w-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="h-8 w-8 text-green-600" />
                        </div>
                        <h2 className="font-serif text-xl font-bold text-stone-900 mb-2">Email envoyé !</h2>
                        <p className="text-sm text-stone-500 mb-6">
                            Si un compte existe avec l'adresse <strong>{email}</strong>, vous recevrez un email avec un lien de réinitialisation.
                        </p>
                        <Link href="/login">
                            <Button variant="outline" className="font-medium">
                                Retour à la connexion
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {error && (
                            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                                <p>{error}</p>
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="email">Adresse email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                                <Input
                                    required
                                    id="email"
                                    type="email"
                                    placeholder="votre@email.com"
                                    className="pl-10"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full font-bold py-6 text-base"
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Envoi...
                                </span>
                            ) : (
                                "Réinitialiser le mot de passe"
                            )}
                        </Button>
                    </form>
                )}

                <div className="mt-6 text-center text-sm text-stone-500">
                    <Link href="/login" className="text-primary hover:underline">
                        ← Retour à la connexion
                    </Link>
                </div>
            </div>
        </div>
    );
}
