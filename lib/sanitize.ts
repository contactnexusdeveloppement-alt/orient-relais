import sanitizeHtmlLib from "sanitize-html";

const ALLOWED_TAGS = [
    "p", "br", "b", "i", "em", "strong", "u", "a", "ul", "ol", "li",
    "h1", "h2", "h3", "h4", "h5", "h6", "span", "div", "table", "thead",
    "tbody", "tr", "td", "th", "img", "blockquote", "hr", "sup", "sub",
];

const ALLOWED_ATTRS: Record<string, string[]> = {
    a: ["href", "title", "target", "rel"],
    img: ["src", "alt", "title", "width", "height"],
    "*": ["class", "id"],
    td: ["colspan", "rowspan"],
    th: ["colspan", "rowspan"],
};

export function sanitizeHtml(html: string): string {
    if (!html) return "";
    return sanitizeHtmlLib(html, {
        allowedTags: ALLOWED_TAGS,
        allowedAttributes: ALLOWED_ATTRS,
        allowedSchemes: ["http", "https", "mailto", "tel"],
        allowedSchemesByTag: { img: ["http", "https"] },
        allowProtocolRelative: false,
        disallowedTagsMode: "discard",
    });
}

export function escapeHtml(text: string): string {
    if (!text) return "";
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#x27;");
}
