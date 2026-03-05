import { NextRequest } from 'next/server';
import * as https from 'https';

// We intercept /wp-admin, /wp-login.php, /wp-json, /wp-content, /wp-includes
const WP_BACKEND_IP = '51.91.236.255'; // The OVH Server IP
const WP_DOMAIN = 'www.orient-relais.com';

export async function GET(request: NextRequest) { return handleProxy(request); }
export async function POST(request: NextRequest) { return handleProxy(request); }
export async function PUT(request: NextRequest) { return handleProxy(request); }
export async function DELETE(request: NextRequest) { return handleProxy(request); }
export async function PATCH(request: NextRequest) { return handleProxy(request); }
export async function OPTIONS(request: NextRequest) { return handleProxy(request); }

async function handleProxy(request: NextRequest) {
    const url = new URL(request.url);
    // Strip the local API prefix so the backend receives the correct path
    const pathAndQuery = url.pathname.replace(/^\/api\/wp-proxy/, '') + url.search;

    const headers: Record<string, string> = {};
    request.headers.forEach((value, key) => {
        headers[key] = value;
    });

    // Force the host header so OVH routes it to the right virtual host
    headers['host'] = WP_DOMAIN;

    // Tell WordPress the connection is secure to avoid redirect loops (ERR_TOO_MANY_REDIRECTS)
    headers['x-forwarded-proto'] = 'https';
    headers['x-forwarded-ssl'] = 'on';

    // Remove headers that might cause issues with proxying
    delete headers['connection'];
    delete headers['accept-encoding']; // We want raw uncompressed data to stream easily without decoding issues
    delete headers['x-forwarded-host'];

    // In dev, next.js adds some headers, remove them just in case
    delete headers['x-invoke-path'];
    delete headers['x-invoke-query'];

    return new Promise<Response>((resolve) => {
        const options = {
            hostname: WP_BACKEND_IP,
            port: 443, // Utiliser HTTPS vers OVH pour éviter sa redirection 301 interne
            path: pathAndQuery,
            method: request.method,
            headers: headers,
            servername: WP_DOMAIN, // Vital pour le SNI sur hébergement mutualisé
            rejectUnauthorized: false // L'IP ne matchera pas le sujet du cert (orient-relais.com)
        };

        const proxyReq = https.request(options, (proxyRes) => {
            console.log(`[Proxy] Response from OVH: ${proxyRes.statusCode} for ${pathAndQuery}`);
            if (proxyRes.statusCode && proxyRes.statusCode >= 300 && proxyRes.statusCode < 400) {
                console.log(`[Proxy] Redirect Location: ${proxyRes.headers.location}`);
            }

            const responseHeaders = new Headers();
            for (const [key, value] of Object.entries(proxyRes.headers)) {
                if (value) {
                    if (Array.isArray(value)) {
                        value.forEach(v => responseHeaders.append(key, v));
                    } else {
                        // Special handling for redirect location header
                        let finalValue = value as string;
                        if (key.toLowerCase() === 'location') {
                            // On réécrit systématiquement vers la version canonique www.orient-relais.com
                            // On retire le port :443 s'il est présent (généré par OVH parfois)
                            finalValue = finalValue.replace(/https?:\/\/(www\.)?orient-relais\.com(:443)?/gi, `https://www.orient-relais.com`);
                            finalValue = finalValue.replace(`http://${WP_BACKEND_IP}`, `https://www.orient-relais.com`);

                            // On ne touche plus au slash final car trailingSlash: true est activé dans next.config.ts
                            console.log(`[Proxy] Rewriting Location: ${value} -> ${finalValue}`);
                        }
                        responseHeaders.set(key, finalValue);
                    }
                }
            }

            // Remove problematic chunk/encoding headers as Next.js will handle the transfer encoding natively
            responseHeaders.delete('transfer-encoding');
            responseHeaders.delete('content-encoding');

            // Set up streaming response
            const stream = new ReadableStream({
                start(controller) {
                    proxyRes.on('data', (chunk) => controller.enqueue(new Uint8Array(chunk)));
                    proxyRes.on('end', () => controller.close());
                    proxyRes.on('error', (err) => controller.error(err));
                }
            });

            resolve(new Response(stream, {
                status: proxyRes.statusCode || 500,
                statusText: proxyRes.statusMessage || 'OK',
                headers: responseHeaders,
            }));
        });

        proxyReq.on('error', (err) => {
            console.error('Proxy request error:', err);
            resolve(new Response('Bad Gateway', { status: 502 }));
        });

        if (request.body) {
            // request.body is a ReadableStream in Next.js App Router
            const reader = request.body.getReader();
            const pump = async () => {
                try {
                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) {
                            proxyReq.end();
                            break;
                        }
                        if (value) proxyReq.write(value);
                    }
                } catch (err) {
                    proxyReq.destroy(err as Error);
                    resolve(new Response('Proxy Body Error', { status: 500 }));
                }
            };
            pump();
        } else {
            proxyReq.end();
        }
    });
}
