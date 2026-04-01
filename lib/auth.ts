import { jwtVerify, SignJWT } from "jose";
import { NextRequest } from "next/server";

// Fail-fast: JWT_SECRET must be set in production
function getJwtSecret(): Uint8Array {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error(
            "JWT_SECRET environment variable is not set. " +
            "Generate one with: openssl rand -hex 32"
        );
    }
    return new TextEncoder().encode(secret);
}

export const JWT_SECRET = getJwtSecret();

export async function signToken(payload: {
    customerId: number;
    email: string;
    firstName: string;
    lastName: string;
}): Promise<string> {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("7d")
        .sign(JWT_SECRET);
}

export async function verifyToken(token: string) {
    return jwtVerify(token, JWT_SECRET);
}

export async function getCustomerIdFromRequest(request: NextRequest): Promise<number | null> {
    const token = request.cookies.get("auth-token")?.value;
    if (!token) return null;
    try {
        const { payload } = await verifyToken(token);
        return (payload.customerId as number) || null;
    } catch {
        return null;
    }
}
