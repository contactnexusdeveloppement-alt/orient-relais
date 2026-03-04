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
    process.env.JWT_SECRET || "orient-relais-jwt-secret-key-change-in-production"
);

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email et mot de passe requis." },
                { status: 400 }
            );
        }

        // Try to authenticate via WordPress REST API
        const wpResponse = await fetch(
            `${process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://orient-relais.com"}/wp-json/jwt-auth/v1/token`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: email, password }),
            }
        );

        // If JWT plugin doesn't work, fall back to WooCommerce customer lookup
        if (!wpResponse.ok) {
            // Fallback: verify customer exists in WooCommerce
            // We can't verify password via WC API, so try WP auth endpoint
            const wpAuthResponse = await fetch(
                `${process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://orient-relais.com"}/wp-json/wp/v2/users/me`,
                {
                    headers: {
                        Authorization: "Basic " + Buffer.from(`${email}:${password}`).toString("base64"),
                    },
                }
            );

            if (!wpAuthResponse.ok) {
                return NextResponse.json(
                    { error: "Email ou mot de passe incorrect." },
                    { status: 401 }
                );
            }
        }

        // Get the WooCommerce customer data
        const customersResponse = await client.get("customers", {
            email,
            per_page: 1,
        });

        if (!customersResponse.data || customersResponse.data.length === 0) {
            return NextResponse.json(
                { error: "Aucun compte client trouvé avec cet email." },
                { status: 404 }
            );
        }

        const customer = customersResponse.data[0];

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
                billing: customer.billing,
                shipping: customer.shipping,
            },
        });

        res.cookies.set("auth-token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60,
            path: "/",
        });

        return res;
    } catch (error: unknown) {
        console.error("Login error:", error);
        const message = error instanceof Error ? error.message : "Erreur lors de la connexion.";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
