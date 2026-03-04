"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import { Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";

export default function LoginPage() {
    const { login } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get("redirect") || "/mon-compte";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        const result = await login(email, password);

        if (result.success) {
            router.push(redirect);
        } else {
            setError(result.error || "Email ou mot de passe incorrect.");
        }
        setIsLoading(false);
    };

    return (
        <div className="container mx-auto px-4 py-16 md:py-24 max-w-md">
            <div className="space-y-3 text-center mb-8">
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-stone-900">Connexion</h1>
                <p className="text-stone-500">
                    Accédez à votre compte pour suivre vos commandes et gérer vos préférences.
                </p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl border border-stone-200 shadow-lg shadow-stone-200/50">
                <form onSubmit={handleSubmit} className="space-y-5">
                    {error && (
                        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                            <AlertCircle className="h-4 w-4 flex-shrink-0" />
                            <p>{error}</p>
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="email">Adresse Email</Label>
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

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">Mot de passe</Label>
                            <Link
                                href="/mot-de-passe-oublie"
                                className="text-xs text-primary hover:underline"
                            >
                                Mot de passe oublié ?
                            </Link>
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                            <Input
                                required
                                id="password"
                                type={showPassword ? "text" : "password"}
                                className="pl-10 pr-10"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                            >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
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
                                Connexion...
                            </span>
                        ) : (
                            "Se connecter"
                        )}
                    </Button>
                </form>

                <div className="mt-6">
                    <Separator className="my-6" />
                    <div className="text-center text-sm text-stone-500">
                        Vous n'avez pas de compte ?{" "}
                        <Link href="/inscription" className="font-bold text-primary hover:underline">
                            Créer un compte
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
