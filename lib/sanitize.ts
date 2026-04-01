/**
 * Sanitize HTML to prevent XSS attacks.
 * Allows safe tags used in product descriptions while stripping dangerous elements.
 */

const ALLOWED_TAGS = new Set([
    'p', 'br', 'b', 'i', 'em', 'strong', 'u', 'a', 'ul', 'ol', 'li',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'div', 'table', 'thead',
    'tbody', 'tr', 'td', 'th', 'img', 'blockquote', 'hr', 'sup', 'sub',
]);

const ALLOWED_ATTRS = new Set([
    'href', 'src', 'alt', 'title', 'class', 'id', 'width', 'height',
    'target', 'rel', 'colspan', 'rowspan',
]);

export function sanitizeHtml(html: string): string {
    if (!html) return '';

    return html
        // Remove script tags and their content
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        // Remove event handlers (onclick, onerror, onload, etc.)
        .replace(/\s*on\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]*)/gi, '')
        // Remove javascript: URLs
        .replace(/javascript\s*:/gi, '')
        // Remove data: URLs in src attributes (potential XSS vector)
        .replace(/(<[^>]+\s)src\s*=\s*["']?\s*data:/gi, '$1src="')
        // Remove style tags and their content
        .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
        // Remove iframe, object, embed tags
        .replace(/<\/?(?:iframe|object|embed|form|input|button|select|textarea)\b[^>]*>/gi, '');
}

/**
 * Escape HTML entities for safe text rendering (e.g. in emails)
 */
export function escapeHtml(text: string): string {
    if (!text) return '';
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;');
}
