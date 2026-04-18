"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Surface the error to the Vercel runtime logs so we can diagnose
        // without leaking the stack to the client.
        console.error("[app/error] caught:", error);
    }, [error]);

    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
            <div className="max-w-md text-center space-y-6">
                <div className="mx-auto h-14 w-14 rounded-full bg-red-50 flex items-center justify-center border border-red-100">
                    <AlertCircle className="h-7 w-7 text-red-600" />
                </div>
                <div className="space-y-2">
                    <h1 className="font-serif text-3xl font-bold text-stone-900">
                        Une erreur est survenue
                    </h1>
                    <p className="text-stone-500">
                        Désolé, quelque chose s&apos;est mal passé. Vous pouvez réessayer ou
                        revenir à l&apos;accueil.
                    </p>
                </div>
                {error.digest && (
                    <p className="text-xs text-stone-400 font-mono">
                        Référence&nbsp;: {error.digest}
                    </p>
                )}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button onClick={reset} size="lg" className="font-bold">
                        Réessayer
                    </Button>
                    <Button asChild variant="outline" size="lg">
                        <Link href="/">Retour à l&apos;accueil</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
