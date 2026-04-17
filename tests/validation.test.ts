import { describe, expect, it } from "vitest";
import { registerSchema, loginSchema, firstErrorMessage } from "@/lib/validation";

const strongPassword = "Str0ng!Passw0rd";

describe("registerSchema", () => {
    it("accepts a well-formed registration", () => {
        const result = registerSchema.safeParse({
            email: "Jane@Example.COM",
            password: strongPassword,
            firstName: "Jane",
            lastName: "Doe",
        });
        expect(result.success).toBe(true);
        if (result.success) {
            expect(result.data.email).toBe("jane@example.com");
            expect(result.data.firstName).toBe("Jane");
        }
    });

    it("rejects malformed emails", () => {
        const r = registerSchema.safeParse({
            email: "not-an-email",
            password: strongPassword,
            firstName: "Jane",
            lastName: "Doe",
        });
        expect(r.success).toBe(false);
        if (!r.success) expect(firstErrorMessage(r.error)).toMatch(/email/i);
    });

    it("rejects passwords shorter than 10 characters", () => {
        const r = registerSchema.safeParse({
            email: "jane@example.com",
            password: "Short1!",
            firstName: "Jane",
            lastName: "Doe",
        });
        expect(r.success).toBe(false);
        if (!r.success) expect(firstErrorMessage(r.error)).toMatch(/10 car/i);
    });

    it("rejects passwords without uppercase", () => {
        const r = registerSchema.safeParse({
            email: "jane@example.com",
            password: "alllowercase1!",
            firstName: "Jane",
            lastName: "Doe",
        });
        expect(r.success).toBe(false);
        if (!r.success) expect(firstErrorMessage(r.error)).toMatch(/majuscule/i);
    });

    it("rejects passwords without digit", () => {
        const r = registerSchema.safeParse({
            email: "jane@example.com",
            password: "NoDigitsHere!",
            firstName: "Jane",
            lastName: "Doe",
        });
        expect(r.success).toBe(false);
        if (!r.success) expect(firstErrorMessage(r.error)).toMatch(/chiffre/i);
    });

    it("rejects passwords without symbol", () => {
        const r = registerSchema.safeParse({
            email: "jane@example.com",
            password: "NoSymbols12345",
            firstName: "Jane",
            lastName: "Doe",
        });
        expect(r.success).toBe(false);
        if (!r.success) expect(firstErrorMessage(r.error)).toMatch(/sp\u00e9cial/i);
    });

    it("rejects empty first/last name", () => {
        const r = registerSchema.safeParse({
            email: "jane@example.com",
            password: strongPassword,
            firstName: "   ",
            lastName: "Doe",
        });
        expect(r.success).toBe(false);
    });
});

describe("loginSchema", () => {
    it("accepts a well-formed login", () => {
        const r = loginSchema.safeParse({
            email: "jane@example.com",
            password: "anything-non-empty",
        });
        expect(r.success).toBe(true);
    });

    it("rejects empty password", () => {
        const r = loginSchema.safeParse({
            email: "jane@example.com",
            password: "",
        });
        expect(r.success).toBe(false);
    });

    it("does not enforce the register password policy on login", () => {
        const r = loginSchema.safeParse({ email: "jane@example.com", password: "x" });
        expect(r.success).toBe(true);
    });
});
