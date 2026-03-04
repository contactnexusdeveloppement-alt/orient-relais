import { NextRequest, NextResponse } from "next/server";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { jwtVerify, SignJWT } from "jose";

const client = new WooCommerceRestApi({
    url: process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://orient-relais.com",
    consumerKey: process.env.WC_CONSUMER_KEY || "",
    consumerSecret: process.env.WC_CONSUMER_SECRET || "",
    version: "wc/v3",
});

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || "orient-relais-jwt-secret-key-change-in-production"
);

async function getCustomerIdFromToken(request: NextRequest): Promise<number | null> {
    const token = request.cookies.get("auth-token")?.value;
    if (!token) return null;
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        return payload.customerId as number;
    } catch {
        return null;
    }
}

export async function PUT(request: NextRequest) {
    try {
        const customerId = await getCustomerIdFromToken(request);
        if (!customerId) {
            return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
        }

        const { firstName, lastName, email, phone, address, zip, city, password } = await request.json();

        // Build update data
        const updateData: Record<string, unknown> = {};
        if (firstName) updateData.first_name = firstName;
        if (lastName) updateData.last_name = lastName;
        if (email) updateData.email = email;
        if (password) updateData.password = password;

        // Update billing info
        if (phone || address || zip || city) {
            updateData.billing = {
                ...(firstName && { first_name: firstName }),
                ...(lastName && { last_name: lastName }),
                ...(email && { email }),
                ...(phone && { phone }),
                ...(address && { address_1: address }),
                ...(zip && { postcode: zip }),
                ...(city && { city }),
                country: "FR",
            };
            updateData.shipping = {
                ...(firstName && { first_name: firstName }),
                ...(lastName && { last_name: lastName }),
                ...(address && { address_1: address }),
                ...(zip && { postcode: zip }),
                ...(city && { city }),
                country: "FR",
            };
        }

        const response = await client.put(`customers/${customerId}`, updateData);
        const customer = response.data;

        // Refresh JWT token with updated info
        const token = await new SignJWT({
            customerId: customer.id,
            email: customer.email,
            firstName: customer.first_name,
            lastName: customer.last_name,
        })
            .setProtectedHeader({ alg: "HS256" })
            .setExpirationTime("7d")
            .sign(JWT_SECRET);

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
    } catch (error) {
        console.error("Account update error:", error);
        return NextResponse.json({ error: "Erreur lors de la mise à jour." }, { status: 500 });
    }
}
