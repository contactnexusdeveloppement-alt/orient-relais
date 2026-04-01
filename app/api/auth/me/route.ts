import { NextRequest, NextResponse } from "next/server";
import { wooClient } from "@/lib/wc-client";
import { verifyToken } from "@/lib/auth";

const client = wooClient;

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get("auth-token")?.value;

        if (!token) {
            return NextResponse.json({ user: null }, { status: 401 });
        }

        // Verify JWT
        const { payload } = await verifyToken(token);
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
