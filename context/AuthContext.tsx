"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    billing?: {
        phone?: string;
        address_1?: string;
        postcode?: string;
        city?: string;
    };
    shipping?: {
        address_1?: string;
        postcode?: string;
        city?: string;
    };
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    register: (data: { email: string; password: string; firstName: string; lastName: string }) => Promise<{ success: boolean; error?: string }>;
    logout: () => Promise<void>;
    refreshUser: () => Promise<void>;
    updateProfile: (data: Record<string, string>) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const refreshUser = useCallback(async () => {
        try {
            const res = await fetch("/api/auth/me");
            if (res.ok) {
                const data = await res.json();
                setUser(data.user);
            } else {
                setUser(null);
            }
        } catch {
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        refreshUser();
    }, [refreshUser]);

    const login = async (email: string, password: string) => {
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                return { success: false, error: data.error || "Erreur de connexion." };
            }

            setUser(data.user);
            return { success: true };
        } catch {
            return { success: false, error: "Erreur réseau." };
        }
    };

    const register = async (formData: { email: string; password: string; firstName: string; lastName: string }) => {
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                return { success: false, error: data.error || "Erreur lors de l'inscription." };
            }

            setUser(data.user);
            return { success: true };
        } catch {
            return { success: false, error: "Erreur réseau." };
        }
    };

    const logout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        setUser(null);
    };

    const updateProfile = async (data: Record<string, string>) => {
        try {
            const res = await fetch("/api/account/update", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (!res.ok) {
                return { success: false, error: result.error || "Erreur lors de la mise à jour." };
            }

            setUser(result.user);
            return { success: true };
        } catch {
            return { success: false, error: "Erreur réseau." };
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                isAuthenticated: !!user,
                login,
                register,
                logout,
                refreshUser,
                updateProfile,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
