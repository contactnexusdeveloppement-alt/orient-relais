import DOMPurify from "isomorphic-dompurify";

const ALLOWED_TAGS = [
    "p", "br", "b", "i", "em", "strong", "u", "a", "ul", "ol", "li",
    "h1", "h2", "h3", "h4", "h5", "h6", "span", "div", "table", "thead",
    "tbody", "tr", "td", "th", "img", "blockquote", "hr", "sup", "sub",
];

const ALLOWED_ATTR = [
    "href", "src", "alt", "title", "class", "id", "width", "height",
    "target", "rel", "colspan", "rowspan",
];

export function sanitizeHtml(html: string): string {
    if (!html) return "";
    return DOMPurify.sanitize(html, {
        ALLOWED_TAGS,
        ALLOWED_ATTR,
        ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto|tel):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
        FORBID_TAGS: ["script", "style", "iframe", "object", "embed", "form", "input", "button", "select", "textarea"],
        FORBID_ATTR: ["onerror", "onload", "onclick", "onmouseover", "onfocus", "onblur", "onchange", "onsubmit"],
        KEEP_CONTENT: true,
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
