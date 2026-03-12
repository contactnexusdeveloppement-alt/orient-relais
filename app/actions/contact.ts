"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(formData: FormData) {
    try {
        const nom = formData.get("nom") as string;
        const prenom = formData.get("prenom") as string;
        const email = formData.get("email") as string;
        const telephone = formData.get("telephone") as string;
        const sujet = formData.get("sujet") as string;
        const message = formData.get("message") as string;

        if (!nom || !email || !message) {
            return { error: "Veuillez remplir les champs obligatoires (Nom, Email, Message)." };
        }

        const data = await resend.emails.send({
            from: "Orient Relais Contact <onboarding@resend.dev>", // Utilisation par défaut pour les tests, à remplacer avec un domaine vérifié
            to: ["contact.nexus.developpement@gmail.com"], // Adresse de test spécifiée
            subject: `Nouveau message - ${sujet || "Contact Site Web"}`,
            html: `
                <h2>Nouveau message de contact via le sit web</h2>
                <p><strong>Nom :</strong> ${nom}</p>
                <p><strong>Prénom :</strong> ${prenom || 'Non renseigné'}</p>
                <p><strong>Email :</strong> ${email}</p>
                <p><strong>Téléphone :</strong> ${telephone || 'Non renseigné'}</p>
                <p><strong>Sujet :</strong> ${sujet || 'Non renseigné'}</p>
                <hr />
                <h3>Message :</h3>
                <p style="white-space: pre-line">${message}</p>
            `,
        });

        if (data.error) {
            console.error("Resend error:", data.error);
            return { error: "Erreur lors de l'envoi de l'email." };
        }

        return { success: true };
    } catch (error) {
        console.error("Failed to send email:", error);
        return { error: "Une erreur inattendue s'est produite." };
    }
}
