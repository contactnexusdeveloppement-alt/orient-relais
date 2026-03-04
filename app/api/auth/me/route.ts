import { NextRequest, NextResponse } from "next/server";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { jwtVerify } from "jose";

const client = new WooCommerceRestApi({
    url: process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://orient-relais.com",
    consumerKey: process.env.WC_CONSUMER_KEY || "",
    consumerSecret: process.env.WC_CONSUMER_SECRET || "",
    version: "wc/v3",
});

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || "orient-relais-jwt-secret-key-change-in-production"
);

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get("auth-token")?.value;

        if (!token) {
            return NextResponse.json({ user: null }, { status: 401 });
        }

        // Verify JWT
        const { payload } = await jwtVerify(token, JWT_SECRET);
        const customerId = payload.customerId as number;

        if (!customerId) {
            return NextResponse.json({ user: null }, { status: 401 });
        }

        // Fetch fresh customer data
        const response = await client.get(`customers/${customerId}`);
        const customer = response.data;

        return NextResponse.json({
            user: {
                id: customer.id,
                email: customer.email,
                firstName: customer.first_name,
                lastName: customer.last_name,
                billing: customer.billing,
                shipping: customer.shipping,
            },
        });
    } catch {
        // Token expired or invalid
        const res = NextResponse.json({ user: null }, { status: 401 });
        res.cookies.set("auth-token", "", { maxAge: 0, path: "/" });
        return res;
    }
}
