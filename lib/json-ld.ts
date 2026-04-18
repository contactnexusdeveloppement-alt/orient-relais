/**
 * Serialise a JSON-LD object for safe embedding in a <script> tag.
 *
 * `JSON.stringify` alone is not safe: if the payload contains `</script>`
 * (e.g. in a product description reflected into the structured data block),
 * the browser will terminate the script early and treat the rest as HTML,
 * which is a classic XSS vector.
 *
 * We escape the characters that can start an HTML closing tag or an HTML
 * comment inside a <script>, using the Unicode-escaped form that JSON
 * parsers accept natively.
 */
export function jsonLdScript(value: unknown): string {
    return JSON.stringify(value)
        .replace(/</g, "\\u003c")
        .replace(/>/g, "\\u003e")
        .replace(/&/g, "\\u0026")
        .replace(/\u2028/g, "\\u2028")
        .replace(/\u2029/g, "\\u2029");
}
