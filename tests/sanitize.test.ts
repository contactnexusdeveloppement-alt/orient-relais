import { describe, expect, it } from "vitest";
import { sanitizeHtml, escapeHtml } from "@/lib/sanitize";

describe("sanitizeHtml", () => {
    it("returns empty string for falsy input", () => {
        expect(sanitizeHtml("")).toBe("");
        expect(sanitizeHtml(null as unknown as string)).toBe("");
        expect(sanitizeHtml(undefined as unknown as string)).toBe("");
    });

    it("keeps allowlisted tags and attributes", () => {
        const html = '<p class="intro">Bonjour <strong>monde</strong></p>';
        expect(sanitizeHtml(html)).toContain("<strong>monde</strong>");
        expect(sanitizeHtml(html)).toContain('class="intro"');
    });

    it("strips <script> tags entirely", () => {
        const html = "<p>ok</p><script>alert(1)</script>";
        const out = sanitizeHtml(html);
        expect(out).not.toContain("<script");
        expect(out).not.toContain("alert(1)");
    });

    it("neutralises the classic SVG onload XSS payload", () => {
        const out = sanitizeHtml("<svg/onload=alert(1)>");
        expect(out).not.toMatch(/onload/i);
        expect(out).not.toMatch(/alert\(1\)/);
    });

    it("removes javascript: URLs from href attributes", () => {
        const out = sanitizeHtml('<a href="javascript:alert(1)">x</a>');
        expect(out).not.toMatch(/javascript:/i);
    });

    it("strips inline event handlers on allowed tags", () => {
        const out = sanitizeHtml('<img src="x" onerror="alert(1)">');
        expect(out).not.toMatch(/onerror/i);
    });

    it("drops <iframe> and <object> tags", () => {
        const html = '<iframe src="https://evil.example"></iframe><object data="x"></object>';
        const out = sanitizeHtml(html);
        expect(out).not.toContain("<iframe");
        expect(out).not.toContain("<object");
    });

    it("keeps img src with https scheme", () => {
        const out = sanitizeHtml('<img src="https://cdn.example/x.jpg" alt="ok">');
        expect(out).toContain('src="https://cdn.example/x.jpg"');
    });

    it("strips data: URLs in img src", () => {
        const out = sanitizeHtml('<img src="data:text/html,<script>alert(1)</script>">');
        expect(out).not.toContain("data:");
    });
});

describe("escapeHtml", () => {
    it("escapes the five HTML-significant characters", () => {
        expect(escapeHtml(`<a href="x">'&"</a>`)).toBe(
            "&lt;a href=&quot;x&quot;&gt;&#x27;&amp;&quot;&lt;/a&gt;"
        );
    });

    it("returns empty string for falsy input", () => {
        expect(escapeHtml("")).toBe("");
    });
});
