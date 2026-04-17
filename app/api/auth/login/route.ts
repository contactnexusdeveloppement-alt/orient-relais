import { NextRequest, NextResponse } from "next/server";
import { wooClient } from "@/lib/wc-client";
import { signToken } from "@/lib/auth";
import { loginSchema, firstErrorMessage } from "@/lib/validation";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

const client = wooClient;

export async function POST(request: NextRequest) {
    try {
        const ip = getClientIp(request);
        const rl = checkRateLimit(`login:${ip}`, 5, 15 * 60 * 1000);
        if (!rl.allowed) {
            return NextResponse.json(
                { error: "Trop de tentatives. Réessayez dans quelques minutes." },
                { status: 429, headers: { "Retry-After": String(rl.retryAfterSec) } }
            );
        }

        const body = await request.json().catch(() => null);
        const parsed = loginSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json(
                { error: firstErrorMessage(parsed.error) },
                { status: 400 }
            );
        }
        const { email, password } = parsed.data;

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
        const token = await signToken({
            customerId: customer.id,
            email: customer.email,
            firstName: customer.first_name,
            lastName: customer.last_name,
        });

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
