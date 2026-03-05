"use client";

import { useEffect, useState } from "react";
import { Star, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface Review {
    id: number;
    rating: number;
    review: string;
    reviewer: string;
    reviewer_email?: string;
    date_created: string;
}

interface ProductReviewsProps {
    productId: number;
    rating: number;
    count: number;
}

export function ProductReviews({ productId, rating, count }: ProductReviewsProps) {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);

    // Form state
    const [newRating, setNewRating] = useState(5);
    const [newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newComment, setNewComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState("");

    useEffect(() => {
        async function fetchReviews() {
            try {
                const res = await fetch(`/api/products/${productId}/reviews`);
                if (res.ok) {
                    const data = await res.json();
                    setReviews(data);
                }
            } catch (err) {
                console.error("Error fetching reviews", err);
            } finally {
                setIsLoading(false);
            }
        }
        fetchReviews();
    }, [productId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError("");
        setSubmitSuccess(false);

        try {
            const res = await fetch(`/api/products/${productId}/reviews`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    rating: newRating,
                    reviewer: newName,
                    reviewer_email: newEmail,
                    review: newComment,
                })
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Une erreur est survenue.");
            }

            setSubmitSuccess(true);
            setIsFormOpen(false);
            setNewName("");
            setNewEmail("");
            setNewComment("");
            setNewRating(5);
        } catch (err: any) {
            setSubmitError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-12">
            {/* Summary */}
            <div className="flex flex-col md:flex-row gap-12 items-start md:items-center bg-stone-50 p-6 md:p-8 rounded-2xl">
                <div className="text-center md:text-left space-y-2 shrink-0">
                    <div className="text-5xl font-serif font-bold text-stone-900">{rating}</div>
                    <div className="flex gap-1 justify-center md:justify-start">
                        {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                                key={s}
                                className={`w-5 h-5 ${s <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-stone-300"}`}
                            />
                        ))}
                    </div>
                    <div className="text-sm text-stone-500">{count} avis</div>
                </div>

                <div className="flex-1 w-full space-y-2 hidden md:block">
                    {/* Simplified progress bars */}
                    {[5, 4, 3, 2, 1].map((star) => {
                        const starCount = reviews.filter(r => r.rating === star).length;
                        const percent = count > 0 ? (starCount / count) * 100 : 0;
                        return (
                            <div key={star} className="flex items-center gap-4 text-sm">
                                <span className="w-3 font-medium text-stone-600">{star}</span>
                                <Star className="w-4 h-4 text-stone-300" />
                                <Progress value={percent} className="h-2" />
                            </div>
                        );
                    })}
                </div>

                <div className="shrink-0 w-full md:w-auto">
                    <Button
                        onClick={() => setIsFormOpen(!isFormOpen)}
                        className="w-full bg-stone-900 hover:bg-primary text-white transition-colors"
                    >
                        {isFormOpen ? "Annuler l'avis" : "Écrire un avis"}
                    </Button>
                </div>
            </div>

            {/* Form */}
            {isFormOpen && (
                <div className="bg-white p-6 md:p-8 rounded-2xl border border-stone-200 shadow-sm transition-all">
                    <h3 className="text-xl font-serif font-bold text-stone-900 mb-6">Laissez votre avis</h3>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {submitError && (
                            <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
                                {submitError}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-stone-700 mb-2">Votre note</label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <button
                                        key={s}
                                        type="button"
                                        onClick={() => setNewRating(s)}
                                        className="focus:outline-none transition-transform hover:scale-110"
                                    >
                                        <Star className={`w-8 h-8 ${s <= newRating ? "fill-amber-400 text-amber-400" : "text-stone-300"} transition-colors`} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-stone-700">Nom / Prénom</label>
                                <input
                                    type="text"
                                    required
                                    value={newName}
                                    onChange={e => setNewName(e.target.value)}
                                    className="w-full rounded-lg border-stone-300 focus:border-primary focus:ring-primary/20 h-12 transition-shadow"
                                    placeholder="Votre nom"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-stone-700">Email</label>
                                <input
                                    type="email"
                                    required
                                    value={newEmail}
                                    onChange={e => setNewEmail(e.target.value)}
                                    className="w-full rounded-lg border-stone-300 focus:border-primary focus:ring-primary/20 h-12 transition-shadow"
                                    placeholder="votre@email.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-stone-700">Votre avis</label>
                            <textarea
                                required
                                rows={4}
                                value={newComment}
                                onChange={e => setNewComment(e.target.value)}
                                className="w-full rounded-lg border-stone-300 focus:border-primary focus:ring-primary/20 resize-none p-4 transition-shadow"
                                placeholder="Partagez votre expérience avec ce produit..."
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full md:w-auto bg-primary hover:bg-stone-900 text-white min-w-[200px]"
                        >
                            {isSubmitting ? "Envoi en cours..." : "Publier l'avis"}
                        </Button>
                    </form>
                </div>
            )}

            {submitSuccess && !isFormOpen && (
                <div className="p-4 bg-green-50 text-green-700 rounded-lg border border-green-100 flex items-center gap-3">
                    <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                    Merci pour votre avis ! Il est en attente de validation et sera publié très prochainement.
                </div>
            )}

            {/* Reviews List */}
            <div className="space-y-8">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-12 gap-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        <span className="text-sm text-stone-500">Chargement des avis...</span>
                    </div>
                ) : reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div key={review.id} className="border-b border-stone-100 pb-8 last:border-0">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-stone-100 flex items-center justify-center border border-stone-200">
                                        <User className="w-5 h-5 text-stone-400" />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-stone-900">{review.reviewer}</div>
                                        <div className="text-xs text-stone-500">
                                            {new Date(review.date_created).toLocaleDateString("fr-FR", {
                                                year: "numeric", month: "long", day: "numeric"
                                            })}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-0.5">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <Star key={s} className={`w-4 h-4 ${s <= review.rating ? "fill-amber-400 text-amber-400" : "text-stone-200"}`} />
                                    ))}
                                </div>
                            </div>
                            <div
                                className="text-stone-600 leading-relaxed prose prose-stone max-w-none text-base"
                                dangerouslySetInnerHTML={{ __html: review.review }}
                            />
                        </div>
                    ))
                ) : (
                    <div className="text-center py-16 bg-stone-50/50 rounded-2xl border border-stone-100 border-dashed">
                        <User className="w-12 h-12 text-stone-300 mx-auto mb-4" />
                        <h4 className="font-serif font-bold text-stone-900 text-lg">Aucun avis pour le moment</h4>
                        <p className="text-stone-500 mt-2">Soyez le premier à donner votre avis sur ce produit !</p>
                    </div>
                )}
            </div>
        </div>
    );
}
