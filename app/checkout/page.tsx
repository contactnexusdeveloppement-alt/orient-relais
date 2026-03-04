"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronRight, CreditCard, Lock, MapPin, Truck, User, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { MondialRelayWidget, RelayPoint } from "@/components/checkout/MondialRelayWidget";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { getStripe } from "@/lib/stripe";

// Stripe Payment Form component (used inside Elements provider)
function StripePaymentForm({
    amount,
    onSuccess,
    onBack,
}: {
    amount: number;
    onSuccess: (paymentIntentId: string) => void;
    onBack: () => void;
}) {
    const stripe = useStripe();
    const elements = useElements();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setIsLoading(true);
        setErrorMessage(null);

        try {
            const { error, paymentIntent } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: `${window.location.origin}/checkout/success`,
                },
                redirect: "if_required",
            });

            if (error) {
                setErrorMessage(error.message || "Une erreur est survenue lors du paiement.");
            } else if (paymentIntent && paymentIntent.status === "succeeded") {
                onSuccess(paymentIntent.id);
            }
        } catch (err) {
            setErrorMessage("Une erreur inattendue est survenue.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <section className="bg-white p-6 md:p-8 rounded-xl border border-stone-200 shadow-sm">
                <h2 className="text-xl font-serif font-bold text-stone-900 mb-6 flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    Paiement sécurisé
                </h2>

                <div className="mb-6">
                    <PaymentElement
                        options={{
                            layout: "tabs",
                        }}
                    />
                </div>

                {errorMessage && (
                    <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                        <AlertCircle className="h-4 w-4 flex-shrink-0" />
                        <p>{errorMessage}</p>
                    </div>
                )}

                <div className="flex items-center gap-2 text-xs text-stone-500 mt-4">
                    <Lock className="h-3.5 w-3.5" />
                    <span>Paiement 100% sécurisé par Stripe. Vos données sont chiffrées.</span>
                </div>
            </section>

            <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={onBack}>
                    Retour
                </Button>
                <Button
                    type="submit"
                    disabled={isLoading || !stripe || !elements}
                    size="lg"
                    className="font-bold w-full md:w-auto min-w-[200px]"
                >
                    {isLoading ? (
                        <span className="flex items-center gap-2">
                            <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Traitement...
                        </span>
                    ) : (
                        `Payer ${amount.toFixed(2)} €`
                    )}
                </Button>
            </div>
        </form>
    );
}

export default function CheckoutPage() {
    const { items, subtotal, cartCount, clearCart } = useCart();
    const { user, isAuthenticated, isLoading: authLoading } = useAuth();
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [paymentError, setPaymentError] = useState<string | null>(null);
    const [isCreatingIntent, setIsCreatingIntent] = useState(false);
    const [cgvAccepted, setCgvAccepted] = useState(false);

    // Shipping method state
    const [shippingMethod, setShippingMethod] = useState<"colissimo" | "mondialrelay">("colissimo");
    const [selectedRelay, setSelectedRelay] = useState<RelayPoint | null>(null);

    const shippingCost = shippingMethod === "mondialrelay" ? 3.90 : 4.90;
    const total = subtotal + shippingCost;

    const handleRelaySelect = useCallback((point: RelayPoint) => {
        setSelectedRelay(point);
    }, []);

    // Form state
    const [formData, setFormData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        address: "",
        zip: "",
        city: "",
        phone: ""
    });

    // Redirect if not authenticated
    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.push("/login?redirect=/checkout");
        }
    }, [authLoading, isAuthenticated, router]);

    // Pre-fill form with user data
    useEffect(() => {
        if (user) {
            setFormData((prev) => ({
                email: user.email || prev.email,
                firstName: user.firstName || prev.firstName,
                lastName: user.lastName || prev.lastName,
                address: user.billing?.address_1 || prev.address,
                zip: user.billing?.postcode || prev.zip,
                city: user.billing?.city || prev.city,
                phone: user.billing?.phone || prev.phone,
            }));
        }
    }, [user]);

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault();
        setStep(3);
        window.scrollTo(0, 0);
    };

    // Create PaymentIntent when moving to step 4 (payment)
    const goToPayment = async () => {
        setIsCreatingIntent(true);
        setPaymentError(null);

        try {
            const response = await fetch("/api/create-payment-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    items: items.map(item => ({
                        id: item.id,
                        title: item.title,
                        price: item.price,
                        quantity: item.quantity,
                    })),
                    shippingCost: Math.round(shippingCost * 100),
                    customerInfo: formData,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Erreur lors de la préparation du paiement.");
            }

            setClientSecret(data.clientSecret);
            setStep(4);
            window.scrollTo(0, 0);
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Erreur inconnue";
            setPaymentError(message);
        } finally {
            setIsCreatingIntent(false);
        }
    };

    const handlePaymentSuccess = async (paymentIntentId: string) => {
        // Create WooCommerce order
        try {
            const res = await fetch("/api/orders/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    paymentIntentId,
                    items: items.map(item => ({
                        id: item.id,
                        title: item.title,
                        quantity: item.quantity,
                        price: item.price,
                    })),
                    customerInfo: formData,
                    shippingMethod,
                    shippingCost,
                    selectedRelay,
                }),
            });
            const data = await res.json();
            clearCart();
            router.push(`/checkout/success?payment_intent=${paymentIntentId}&order=${data.orderNumber || ""}`);
        } catch {
            // Order still succeeded even if WC order creation fails
            clearCart();
            router.push(`/checkout/success?payment_intent=${paymentIntentId}`);
        }
    };

    if (authLoading) {
        return (
            <div className="container mx-auto py-24 flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!isAuthenticated) return null;

    if (items.length === 0 && !clientSecret) {
        return (
            <div className="container mx-auto py-24 text-center">
                <h1 className="text-3xl font-serif font-bold text-stone-900 mb-4">Votre panier est vide</h1>
                <Button asChild>
                    <Link href="/boutique">Retourner à la boutique</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-stone-50">
            <div className="container mx-auto px-4 py-8 lg:py-12">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">

                    {/* Left Column: Form Steps */}
                    <div className="flex-1 space-y-8">
                        {/* Breadcrumb / Steps Visual */}
                        <div className="flex items-center justify-center sm:justify-start text-sm font-medium text-stone-400 mb-8 bg-stone-100 rounded-full px-4 py-2 w-fit">
                            <span className={`transition-colors ${step >= 1 ? "text-primary font-bold" : ""}`}>Panier</span>
                            <ChevronRight className="h-4 w-4 mx-2" />
                            <span className={`transition-colors ${step >= 2 ? "text-primary font-bold" : ""}`}>Information</span>
                            <ChevronRight className="h-4 w-4 mx-2" />
                            <span className={`transition-colors ${step >= 3 ? "text-primary font-bold" : ""}`}>Livraison</span>
                            <ChevronRight className="h-4 w-4 mx-2" />
                            <span className={`transition-colors ${step >= 4 ? "text-primary font-bold" : ""}`}>Paiement</span>
                        </div>

                        {/* Step 1: Information & Address */}
                        {step <= 2 && (
                            <form onSubmit={handleNext} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                {/* Identification */}
                                <section className="bg-white p-6 md:p-8 rounded-xl border border-stone-200 shadow-sm">
                                    <h2 className="text-xl font-serif font-bold text-stone-900 mb-6 flex items-center gap-2">
                                        <User className="h-5 w-5 text-primary" />
                                        Coordonnées
                                    </h2>
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="email">Email</Label>
                                                <Input required type="email" id="email" placeholder="votre@email.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="phone">Téléphone</Label>
                                                <Input type="tel" id="phone" placeholder="06 12 34 56 78" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* Shipping Address */}
                                <section className="bg-white p-6 md:p-8 rounded-xl border border-stone-200 shadow-sm">
                                    <h2 className="text-xl font-serif font-bold text-stone-900 mb-6 flex items-center gap-2">
                                        <MapPin className="h-5 w-5 text-primary" />
                                        Adresse de livraison
                                    </h2>
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="firstname">Prénom</Label>
                                                <Input required id="firstname" placeholder="Jean" value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="lastname">Nom</Label>
                                                <Input required id="lastname" placeholder="Dupont" value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })} />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="address">Adresse</Label>
                                            <Input required id="address" placeholder="123 rue de la Paix" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="zip">Code Postal</Label>
                                                <Input required id="zip" placeholder="75000" value={formData.zip} onChange={e => setFormData({ ...formData, zip: e.target.value })} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="city">Ville</Label>
                                                <Input required id="city" placeholder="Paris" value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} />
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <div className="flex justify-end">
                                    <Button type="submit" size="lg" className="w-full md:w-auto font-bold">
                                        Vers la livraison <ChevronRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                            </form>
                        )}

                        {/* Step 3: Delivery Method */}
                        {step === 3 && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                                <section className="bg-white p-6 md:p-8 rounded-xl border border-stone-200 shadow-sm">
                                    <h2 className="text-xl font-serif font-bold text-stone-900 mb-6 flex items-center gap-2">
                                        <Truck className="h-5 w-5 text-primary" />
                                        Mode de livraison
                                    </h2>
                                    <div className="space-y-3">
                                        {/* Option 1: Colissimo */}
                                        <div
                                            onClick={() => { setShippingMethod("colissimo"); setSelectedRelay(null); }}
                                            className={`flex items-center space-x-4 border rounded-lg p-4 cursor-pointer transition-all ${shippingMethod === "colissimo"
                                                ? "border-primary bg-primary/5 ring-1 ring-primary"
                                                : "border-stone-200 hover:border-stone-300 bg-stone-50"
                                                }`}
                                        >
                                            <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${shippingMethod === "colissimo" ? "border-primary" : "border-stone-300"
                                                }`}>
                                                {shippingMethod === "colissimo" && (
                                                    <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-base font-medium text-stone-900">🏠 Colissimo Domicile</p>
                                                <p className="text-sm text-stone-500">Livraison à domicile en 2-3 jours ouvrés</p>
                                            </div>
                                            <span className="font-bold text-stone-900">4,90 €</span>
                                        </div>

                                        {/* Option 2: Mondial Relay */}
                                        <div
                                            onClick={() => setShippingMethod("mondialrelay")}
                                            className={`flex items-center space-x-4 border rounded-lg p-4 cursor-pointer transition-all ${shippingMethod === "mondialrelay"
                                                ? "border-primary bg-primary/5 ring-1 ring-primary"
                                                : "border-stone-200 hover:border-stone-300 bg-stone-50"
                                                }`}
                                        >
                                            <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${shippingMethod === "mondialrelay" ? "border-primary" : "border-stone-300"
                                                }`}>
                                                {shippingMethod === "mondialrelay" && (
                                                    <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-base font-medium text-stone-900">📦 Mondial Relay</p>
                                                <p className="text-sm text-stone-500">Retrait en Point Relais — 3-5 jours ouvrés</p>
                                            </div>
                                            <span className="font-bold text-stone-900">3,90 €</span>
                                        </div>
                                    </div>
                                </section>

                                {/* Mondial Relay Widget */}
                                {shippingMethod === "mondialrelay" && (
                                    <section className="bg-white p-6 md:p-8 rounded-xl border border-stone-200 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-300">
                                        <h3 className="text-lg font-serif font-bold text-stone-900 mb-4 flex items-center gap-2">
                                            <MapPin className="h-5 w-5 text-primary" />
                                            Choisissez votre Point Relais
                                        </h3>
                                        <MondialRelayWidget
                                            postcode={formData.zip}
                                            onSelect={handleRelaySelect}
                                        />
                                        {selectedRelay && (
                                            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                                                <p className="text-sm font-bold text-green-800">✅ Point Relais sélectionné :</p>
                                                <p className="text-sm text-green-700 mt-1">
                                                    {selectedRelay.name} — {selectedRelay.address}, {selectedRelay.postcode} {selectedRelay.city}
                                                </p>
                                            </div>
                                        )}
                                    </section>
                                )}

                                {paymentError && (
                                    <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                                        <AlertCircle className="h-4 w-4 flex-shrink-0" />
                                        <p>{paymentError}</p>
                                    </div>
                                )}

                                {/* CGV Acceptance */}
                                <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm">
                                    <label className="flex items-start gap-3 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={cgvAccepted}
                                            onChange={(e) => setCgvAccepted(e.target.checked)}
                                            className="mt-1 h-4 w-4 rounded border-stone-300 text-primary focus:ring-primary cursor-pointer"
                                        />
                                        <span className="text-sm text-stone-600 leading-relaxed">
                                            J'ai lu et j'accepte les{" "}
                                            <Link href="/cgv" target="_blank" className="text-primary hover:underline font-medium">
                                                Conditions Générales de Vente
                                            </Link>{" "}
                                            et la{" "}
                                            <Link href="/confidentialite" target="_blank" className="text-primary hover:underline font-medium">
                                                Politique de Confidentialité
                                            </Link>.
                                        </span>
                                    </label>
                                </div>

                                <div className="flex justify-between">
                                    <Button variant="outline" onClick={() => setStep(2)}>Retour</Button>
                                    <Button
                                        onClick={goToPayment}
                                        disabled={isCreatingIntent || !cgvAccepted || (shippingMethod === "mondialrelay" && !selectedRelay)}
                                        size="lg"
                                        className="font-bold"
                                    >
                                        {isCreatingIntent ? (
                                            <span className="flex items-center gap-2">
                                                <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                Préparation...
                                            </span>
                                        ) : (
                                            <>Vers le paiement <ChevronRight className="ml-2 h-4 w-4" /></>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* Step 4: Stripe Payment */}
                        {step === 4 && clientSecret && (
                            <Elements
                                stripe={getStripe()}
                                options={{
                                    clientSecret,
                                    appearance: {
                                        theme: "stripe",
                                        variables: {
                                            colorPrimary: "#b8860b",
                                            colorBackground: "#ffffff",
                                            colorText: "#1c1917",
                                            colorDanger: "#dc2626",
                                            fontFamily: "system-ui, sans-serif",
                                            borderRadius: "8px",
                                        },
                                    },
                                    locale: "fr",
                                }}
                            >
                                <StripePaymentForm
                                    amount={total}
                                    onSuccess={handlePaymentSuccess}
                                    onBack={() => setStep(3)}
                                />
                            </Elements>
                        )}
                    </div>

                    {/* Right Column: Order Summary (Sticky) */}
                    <div className="w-full lg:w-[380px] flex-shrink-0">
                        <div className="sticky top-24 bg-white p-6 rounded-2xl border border-stone-200 shadow-xl shadow-stone-200/50 relative overflow-hidden">
                            {/* Top accent line */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-amber-400 to-primary" />

                            <h3 className="font-serif text-lg font-bold text-stone-900 mb-4">Récapitulatif</h3>
                            <div className="space-y-4 mb-6">
                                {items.map((item) => (
                                    <div key={`${item.id}-${item.variant}`} className="flex gap-3">
                                        <div className="relative h-12 w-12 rounded-lg bg-stone-100 flex-shrink-0 overflow-hidden border border-stone-200">
                                            <Image src={item.image} alt={item.title} fill className="object-cover" />
                                            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-white text-[10px] flex items-center justify-center font-bold border-2 border-white">
                                                {item.quantity}
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-stone-900 truncate">{item.title}</p>
                                            <p className="text-xs text-stone-500">{item.variant}</p>
                                        </div>
                                        <div className="text-sm font-bold text-stone-700">
                                            {(item.price * item.quantity).toFixed(2)}€
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Separator className="my-4" />

                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between text-stone-600">
                                    <span>Sous-total</span>
                                    <span>{subtotal.toFixed(2)} €</span>
                                </div>
                                <div className="flex justify-between text-stone-600">
                                    <span>Livraison</span>
                                    <span>{shippingCost.toFixed(2)} €</span>
                                </div>
                            </div>

                            <Separator className="my-4" />

                            <div className="flex justify-between items-end">
                                <span className="font-bold text-lg text-stone-900">Total</span>
                                <div className="text-right">
                                    <span className="text-xs text-stone-500 block mb-0.5">TVA incluse</span>
                                    <span className="font-bold text-2xl text-primary">{total.toFixed(2)} €</span>
                                </div>
                            </div>

                            <div className="mt-6 bg-gradient-to-r from-primary/5 to-amber-50 p-3 rounded-xl text-xs text-stone-600 flex gap-2 border border-primary/10">
                                <Lock className="h-4 w-4 flex-shrink-0 text-primary" />
                                <p>Transactions sécurisées et cryptées SSL. Vos données sont protégées.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
