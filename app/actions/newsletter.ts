"use server";

import nodemailer from "nodemailer";

export async function subscribeNewsletter(formData: FormData) {
    try {
        const email = formData.get("email") as string;

        if (!email) {
            return { error: "Veuillez renseigner votre email." };
        }

        // Configuration SMTP standard
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 465,
            secure: Number(process.env.SMTP_PORT) === 465,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        const mailOptions = {
            from: `"Orient Relais Web" <${process.env.SMTP_USER}>`,
            to: "contact.nexus.developpement@gmail.com", // Pour les tests
            subject: `Nouvel abonné Newsletter : ${email}`,
            html: `
                <h2>Nouvel abonné à la newsletter !</h2>
                <p><strong>Email :</strong> ${email}</p>
                <p>Cet email souhaite recevoir les offres et les -10% de bienvenue.</p>
            `,
        };

        await transporter.sendMail(mailOptions);
        return { success: true };

    } catch (error) {
        console.error("Failed to subscribe newsletter:", error);
        return { error: "Une erreur inattendue s'est produite avec le serveur d'envoi." };
    }
}
