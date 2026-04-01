import { NextRequest, NextResponse } from "next/server";
import { wooClient } from "@/lib/wc-client";
import { getCustomerIdFromRequest, signToken } from "@/lib/auth";

const client = wooClient;

export async function PUT(request: NextRequest) {
    try {
        const customerId = await getCustomerIdFromRequest(request);
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
        const token = await signToken({
            customerId: customer.id,
            email: customer.email,
            firstName: customer.first_name,
            lastName: customer.last_name,
        });

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
