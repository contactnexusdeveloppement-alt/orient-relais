import { NextRequest, NextResponse } from "next/server";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { SignJWT } from "jose";

const client = new WooCommerceRestApi({
    url: process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://orient-relais.com",
    consumerKey: process.env.WC_CONSUMER_KEY || "",
    consumerSecret: process.env.WC_CONSUMER_SECRET || "",
    version: "wc/v3",
});

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || "orient-relais-xK9mP2vL7nQ4wR8tB5cY6fH3jA0eU1dS"
);

export async function POST(request: NextRequest) {
    try {
        const { email, password, firstName, lastName } = await request.json();

        if (!email || !password || !firstName || !lastName) {
            return NextResponse.json(
                { error: "Tous les champs sont requis." },
                { status: 400 }
            );
        }

        if (password.length < 6) {
            return NextResponse.json(
                { error: "Le mot de passe doit contenir au moins 6 caractères." },
                { status: 400 }
            );
        }

        // Check if customer already exists
        try {
            const existing = await client.get("customers", { email, per_page: 1 });
            if (existing.data && existing.data.length > 0) {
                return NextResponse.json(
                    { error: "Un compte existe déjà avec cette adresse email." },
                    { status: 409 }
                );
            }
        } catch {
            // If error checking, proceed with creation
        }

        // Create WooCommerce customer
        let customer;
        try {
            const response = await client.post("customers", {
                email,
                first_name: firstName,
                last_name: lastName,
                username: email,
                password,
            });
            customer = response.data;
        } catch (wcError: unknown) {
            console.error("WooCommerce customer creation error:", JSON.stringify(wcError));
            // Extract WooCommerce specific error message
            const wcErr = wcError as { response?: { data?: { message?: string; code?: string } } };
            const wcMessage = wcErr?.response?.data?.message || "";
            const wcCode = wcErr?.response?.data?.code || "";

            if (wcCode === "registration-error-email-exists" || wcMessage.toLowerCase().includes("email")) {
                return NextResponse.json(
                    { error: "Cette adresse email est déjà utilisée. Veuillez vous connecter ou utiliser une autre adresse." },
                    { status: 409 }
                );
            }
            if (wcMessage) {
                return NextResponse.json({ error: wcMessage }, { status: 400 });
            }
            throw wcError; // Re-throw to be caught by outer catch
        }

        // Create JWT token
        const token = await new SignJWT({
            customerId: customer.id,
            email: customer.email,
            firstName: customer.first_name,
            lastName: customer.last_name,
        })
            .setProtectedHeader({ alg: "HS256" })
            .setExpirationTime("7d")
            .sign(JWT_SECRET);

        // Set cookie
        const res = NextResponse.json({
            user: {
                id: customer.id,
                email: customer.email,
                firstName: customer.first_name,
                lastName: customer.last_name,
            },
        });

        res.cookies.set("auth-token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60, // 7 days
            path: "/",
        });

        return res;
    } catch (error: unknown) {
        console.error("Registration error:", JSON.stringify(error));
        const message = error instanceof Error ? error.message : "Erreur lors de l'inscription. Veuillez réessayer.";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
