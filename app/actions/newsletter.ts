"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function subscribeNewsletter(formData: FormData) {
    try {
        const email = formData.get("email") as string;

        if (!email) {
            return { error: "Veuillez renseigner votre email." };
        }

        // Notification de nouvel abonné
        const data = await resend.emails.send({
            from: "Orient Relais <onboarding@resend.dev>",
            to: ["contact.nexus.developpement@gmail.com"], // À changer par contact@orient-relais.com plus tard
            subject: `Nouvel abonné Newsletter : ${email}`,
            html: `
                <h2>Nouvel abonné à la newsletter !</h2>
                <p><strong>Email :</strong> ${email}</p>
                <p>Cet email souhaite recevoir les offres et les -10% de bienvenue.</p>
            `,
        });

        if (data.error) {
            console.error("Resend error (Newsletter):", data.error);
            return { error: "Erreur lors de l'inscription à la newsletter." };
        }

        return { success: true };
    } catch (error) {
        console.error("Failed to subscribe newsletter:", error);
        return { error: "Une erreur inattendue s'est produite." };
    }
}
