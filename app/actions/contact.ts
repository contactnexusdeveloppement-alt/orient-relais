"use server";

import nodemailer from "nodemailer";

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

        // Configuration SMTP standard
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 465,
            secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        const mailOptions = {
            from: `"Orient Relais Web" <${process.env.SMTP_USER}>`,
            to: "contact@orient-relais.com", // Adresse finale de réception
            replyTo: email,
            subject: `Nouveau message - ${sujet || "Contact Site Web"}`,
            html: `
                <h2>Nouveau message de contact via le site web</h2>
                <p><strong>Nom :</strong> ${nom}</p>
                <p><strong>Prénom :</strong> ${prenom || 'Non renseigné'}</p>
                <p><strong>Email :</strong> ${email}</p>
                <p><strong>Téléphone :</strong> ${telephone || 'Non renseigné'}</p>
                <p><strong>Sujet :</strong> ${sujet || 'Non renseigné'}</p>
                <hr />
                <h3>Message :</h3>
                <p style="white-space: pre-line">${message}</p>
            `,
        };

        await transporter.sendMail(mailOptions);
        return { success: true };

    } catch (error) {
        console.error("Failed to send email via SMTP:", error);
        return { error: "Une erreur inattendue s'est produite avec le serveur d'envoi." };
    }
}
