import { z } from "zod";

const passwordSchema = z
    .string()
    .min(10, "Le mot de passe doit contenir au moins 10 caractères.")
    .max(128, "Le mot de passe est trop long.")
    .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule.")
    .regex(/[a-z]/, "Le mot de passe doit contenir au moins une minuscule.")
    .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre.")
    .regex(/[^A-Za-z0-9]/, "Le mot de passe doit contenir au moins un caractère spécial.");

export const registerSchema = z.object({
    email: z.string().trim().toLowerCase().email("Adresse email invalide.").max(254),
    password: passwordSchema,
    firstName: z.string().trim().min(1, "Le prénom est requis.").max(50),
    lastName: z.string().trim().min(1, "Le nom est requis.").max(50),
});

export const loginSchema = z.object({
    email: z.string().trim().toLowerCase().email("Adresse email invalide.").max(254),
    password: z.string().min(1, "Le mot de passe est requis.").max(128),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

export function firstErrorMessage(error: z.ZodError): string {
    return error.issues[0]?.message ?? "Données invalides.";
}
