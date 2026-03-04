import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json(
                { error: "Adresse email requise." },
                { status: 400 }
            );
        }

        // Call WordPress password reset endpoint
        const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://orient-relais.com";

        const response = await fetch(`${wpUrl}/wp-json/custom/v1/forgot-password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        // Always return success to avoid email enumeration attacks
        return NextResponse.json({
            message: "Si un compte existe avec cet email, vous recevrez un lien de réinitialisation.",
        });
    } catch (error) {
        console.error("Forgot password error:", error);
        return NextResponse.json({
            message: "Si un compte existe avec cet email, vous recevrez un lien de réinitialisation.",
        });
    }
}
