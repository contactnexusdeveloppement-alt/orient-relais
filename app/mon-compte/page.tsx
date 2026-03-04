"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/context/WishlistContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
    Package, User, Heart, LogOut, ChevronRight,
    AlertCircle, CheckCircle, Loader2, ShoppingBag, X
} from "lucide-react";
import { WooProduct } from "@/lib/woocommerce-types";

type Tab = "orders" | "info" | "wishlist";

interface OrderItem {
    id: number;
    name: string;
    quantity: number;
    total: string;
    image: string;
}

interface Order {
    id: number;
    number: string;
    status: string;
    total: string;
    currency: string;
    date_created: string;
    line_items: OrderItem[];
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
    pending: { label: "En attente de paiement", color: "bg-yellow-100 text-yellow-800" },
    processing: { label: "En cours", color: "bg-blue-100 text-blue-800" },
    shipped: { label: "Expédié", color: "bg-purple-100 text-purple-800" },
    "on-hold": { label: "En attente", color: "bg-yellow-100 text-yellow-800" },
    completed: { label: "Livrée", color: "bg-green-100 text-green-800" },
    cancelled: { label: "Annulée", color: "bg-red-100 text-red-800" },
    refunded: { label: "Remboursée", color: "bg-stone-100 text-stone-800" },
    failed: { label: "Échouée", color: "bg-red-100 text-red-800" },
};

export default function MonComptePage() {
    const { user, isLoading: authLoading, isAuthenticated, logout, updateProfile } = useAuth();
    const { items: wishlistItems, toggleWishlist } = useWishlist();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<Tab>("orders");
    const [orders, setOrders] = useState<Order[]>([]);
    const [ordersLoading, setOrdersLoading] = useState(true);
    const [wishlistProducts, setWishlistProducts] = useState<WooProduct[]>([]);
    const [wishlistLoading, setWishlistLoading] = useState(false);

    // Profile form
    const [profileForm, setProfileForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        zip: "",
        city: "",
        password: "",
        confirmPassword: "",
    });
    const [profileSuccess, setProfileSuccess] = useState(false);
    const [profileError, setProfileError] = useState<string | null>(null);
    const [profileLoading, setProfileLoading] = useState(false);

    // Redirect if not authenticated
    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.push("/login?redirect=/mon-compte");
        }
    }, [authLoading, isAuthenticated, router]);

    // Load user data into form
    useEffect(() => {
        if (user) {
            setProfileForm((prev) => ({
                ...prev,
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                email: user.email || "",
                phone: user.billing?.phone || "",
                address: user.billing?.address_1 || "",
                zip: user.billing?.postcode || "",
                city: user.billing?.city || "",
            }));
        }
    }, [user]);

    // Fetch orders
    useEffect(() => {
        if (isAuthenticated && activeTab === "orders") {
            fetchOrders();
        }
    }, [isAuthenticated, activeTab]);

    // Fetch wishlist products
    useEffect(() => {
        if (activeTab === "wishlist" && wishlistItems.length > 0) {
            fetchWishlistProducts();
        }
    }, [activeTab, wishlistItems]);

    const fetchOrders = async () => {
        setOrdersLoading(true);
        try {
            const res = await fetch("/api/account/orders");
            if (res.ok) {
                const data = await res.json();
                setOrders(data.orders || []);
            }
        } catch {
            console.error("Failed to fetch orders");
        } finally {
            setOrdersLoading(false);
        }
    };

    const fetchWishlistProducts = async () => {
        setWishlistLoading(true);
        try {
            const ids = wishlistItems.join(",");
            const res = await fetch(`/api/products?include=${ids}`);
            if (res.ok) {
                const data = await res.json();
                setWishlistProducts(data.products || data || []);
            }
        } catch {
            console.error("Failed to fetch wishlist products");
        } finally {
            setWishlistLoading(false);
        }
    };

    const handleProfileSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setProfileError(null);
        setProfileSuccess(false);

        if (profileForm.password && profileForm.password !== profileForm.confirmPassword) {
            setProfileError("Les mots de passe ne correspondent pas.");
            return;
        }

        setProfileLoading(true);
        const updateData: Record<string, string> = {
            firstName: profileForm.firstName,
            lastName: profileForm.lastName,
            email: profileForm.email,
            phone: profileForm.phone,
            address: profileForm.address,
            zip: profileForm.zip,
            city: profileForm.city,
        };
        if (profileForm.password) {
            updateData.password = profileForm.password;
        }

        const result = await updateProfile(updateData);

        if (result.success) {
            setProfileSuccess(true);
            setProfileForm((prev) => ({ ...prev, password: "", confirmPassword: "" }));
            setTimeout(() => setProfileSuccess(false), 4000);
        } else {
            setProfileError(result.error || "Erreur lors de la mise à jour.");
        }
        setProfileLoading(false);
    };

    const handleLogout = async () => {
        await logout();
        router.push("/");
    };

    if (authLoading) {
        return (
            <div className="container mx-auto px-4 py-24 flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!isAuthenticated) return null;

    const tabs = [
        { id: "orders" as Tab, label: "Mes commandes", icon: Package, count: orders.length },
        { id: "info" as Tab, label: "Mes informations", icon: User },
        { id: "wishlist" as Tab, label: "Mes favoris", icon: Heart, count: wishlistItems.length },
    ];

    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="font-serif text-3xl font-bold text-stone-900">
                        Bonjour {user?.firstName} 👋
                    </h1>
                    <p className="text-stone-500 mt-1">{user?.email}</p>
                </div>
                <Button variant="outline" onClick={handleLogout} className="gap-2 text-stone-500 hover:text-red-600 hover:border-red-200">
                    <LogOut className="h-4 w-4" />
                    Déconnexion
                </Button>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Tabs */}
                <div className="w-full md:w-64 flex-shrink-0">
                    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-5 py-4 text-sm font-medium transition-all border-l-3 ${activeTab === tab.id
                                    ? "bg-primary/5 text-primary border-l-primary border-l-[3px]"
                                    : "text-stone-600 hover:bg-stone-50 border-l-transparent border-l-[3px]"
                                    }`}
                            >
                                <tab.icon className="h-4 w-4" />
                                {tab.label}
                                {tab.count !== undefined && tab.count > 0 && (
                                    <span className="ml-auto text-xs bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full">
                                        {tab.count}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    {/* Orders Tab */}
                    {activeTab === "orders" && (
                        <div className="space-y-4">
                            <h2 className="font-serif text-xl font-bold text-stone-900">Mes commandes</h2>

                            {ordersLoading ? (
                                <div className="flex justify-center py-12">
                                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                                </div>
                            ) : orders.length === 0 ? (
                                <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center">
                                    <ShoppingBag className="h-12 w-12 text-stone-300 mx-auto mb-4" />
                                    <p className="text-stone-500 mb-4">Vous n'avez pas encore de commandes.</p>
                                    <Link href="/boutique">
                                        <Button>Découvrir nos produits</Button>
                                    </Link>
                                </div>
                            ) : (
                                orders.map((order) => {
                                    const status = STATUS_LABELS[order.status] || { label: order.status, color: "bg-stone-100 text-stone-800" };
                                    return (
                                        <div key={order.id} className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
                                            <div className="flex items-center justify-between px-5 py-4 bg-stone-50 border-b border-stone-100">
                                                <div className="flex items-center gap-4">
                                                    <span className="text-sm font-bold text-stone-900">
                                                        Commande #{order.number}
                                                    </span>
                                                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${status.color}`}>
                                                        {status.label}
                                                    </span>
                                                </div>
                                                <span className="text-sm text-stone-500">
                                                    {new Date(order.date_created).toLocaleDateString("fr-FR", {
                                                        day: "numeric",
                                                        month: "long",
                                                        year: "numeric",
                                                    })}
                                                </span>
                                            </div>
                                            <div className="px-5 py-4">
                                                <div className="space-y-3">
                                                    {order.line_items.map((item) => (
                                                        <div key={item.id} className="flex items-center gap-3">
                                                            {item.image && (
                                                                <div className="h-10 w-10 rounded-lg bg-stone-100 overflow-hidden flex-shrink-0 relative">
                                                                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                                                                </div>
                                                            )}
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-sm font-medium text-stone-900 truncate">{item.name}</p>
                                                                <p className="text-xs text-stone-400">Qté: {item.quantity}</p>
                                                            </div>
                                                            <span className="text-sm font-medium text-stone-700">{item.total} €</span>
                                                        </div>
                                                    ))}
                                                </div>
                                                <Separator className="my-3" />
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-stone-500">Total</span>
                                                    <span className="font-bold text-primary">{order.total} €</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    )}

                    {/* Info Tab */}
                    {activeTab === "info" && (
                        <div className="space-y-4">
                            <h2 className="font-serif text-xl font-bold text-stone-900">Mes informations</h2>
                            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6">
                                <form onSubmit={handleProfileSubmit} className="space-y-5">
                                    {profileSuccess && (
                                        <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                                            <CheckCircle className="h-4 w-4" />
                                            Informations mises à jour avec succès !
                                        </div>
                                    )}
                                    {profileError && (
                                        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                                            <AlertCircle className="h-4 w-4" />
                                            {profileError}
                                        </div>
                                    )}

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Prénom</Label>
                                            <Input value={profileForm.firstName} onChange={(e) => setProfileForm({ ...profileForm, firstName: e.target.value })} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Nom</Label>
                                            <Input value={profileForm.lastName} onChange={(e) => setProfileForm({ ...profileForm, lastName: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Email</Label>
                                        <Input type="email" value={profileForm.email} onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Téléphone</Label>
                                        <Input value={profileForm.phone} onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })} />
                                    </div>

                                    <Separator />

                                    <div className="space-y-2">
                                        <Label>Adresse</Label>
                                        <Input value={profileForm.address} onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })} />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Code postal</Label>
                                            <Input value={profileForm.zip} onChange={(e) => setProfileForm({ ...profileForm, zip: e.target.value })} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Ville</Label>
                                            <Input value={profileForm.city} onChange={(e) => setProfileForm({ ...profileForm, city: e.target.value })} />
                                        </div>
                                    </div>

                                    <Separator />

                                    <p className="text-sm text-stone-500">Laisser vide pour garder le mot de passe actuel.</p>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Nouveau mot de passe</Label>
                                            <Input type="password" value={profileForm.password} onChange={(e) => setProfileForm({ ...profileForm, password: e.target.value })} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Confirmer</Label>
                                            <Input type="password" value={profileForm.confirmPassword} onChange={(e) => setProfileForm({ ...profileForm, confirmPassword: e.target.value })} />
                                        </div>
                                    </div>

                                    <Button type="submit" disabled={profileLoading} className="font-bold">
                                        {profileLoading ? (
                                            <span className="flex items-center gap-2">
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                Mise à jour...
                                            </span>
                                        ) : (
                                            "Enregistrer les modifications"
                                        )}
                                    </Button>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Wishlist Tab */}
                    {activeTab === "wishlist" && (
                        <div className="space-y-4">
                            <h2 className="font-serif text-xl font-bold text-stone-900">Mes favoris</h2>
                            {wishlistItems.length === 0 ? (
                                <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center">
                                    <Heart className="h-12 w-12 text-stone-300 mx-auto mb-4" />
                                    <p className="text-stone-500 mb-4">Vous n'avez pas encore de favoris.</p>
                                    <Link href="/boutique">
                                        <Button>Découvrir nos produits</Button>
                                    </Link>
                                </div>
                            ) : wishlistLoading ? (
                                <div className="flex justify-center py-12">
                                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {wishlistProducts.map((product) => {
                                        const imageSrc = product.images?.[0]?.src || "/images/placeholder.png";
                                        const price = parseFloat(product.price);
                                        const formattedPrice = isNaN(price) ? "N/A" : price.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
                                        return (
                                            <div key={product.id} className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden flex items-center gap-4 p-4">
                                                <Link href={`/produit/${product.slug}`} className="h-20 w-20 rounded-xl bg-stone-50 overflow-hidden flex-shrink-0 relative">
                                                    <Image src={imageSrc} alt={product.name} fill className="object-contain p-2" />
                                                </Link>
                                                <div className="flex-1 min-w-0">
                                                    <Link href={`/produit/${product.slug}`} className="font-serif font-medium text-stone-900 hover:text-primary transition-colors line-clamp-1">
                                                        {product.name}
                                                    </Link>
                                                    <p className="text-sm font-bold text-primary mt-1">{formattedPrice}</p>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => toggleWishlist(String(product.id))}
                                                    className="flex-shrink-0 text-stone-400 hover:text-red-500 hover:bg-red-50 h-9 w-9 rounded-full"
                                                    title="Retirer des favoris"
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
