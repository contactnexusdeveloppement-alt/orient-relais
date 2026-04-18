import { NextRequest } from 'next/server';
import * as https from 'https';
import * as tls from 'tls';

// We intercept /wp-admin, /wp-login.php, /wp-json, /wp-content, /wp-includes
const WP_BACKEND_IP = process.env.WP_BACKEND_IP || '51.91.236.255';
const WP_DOMAIN = process.env.WP_BACKEND_DOMAIN || 'www.orient-relais.com';
const IS_DEV = process.env.NODE_ENV !== 'production';
// Strict TLS verification for the OVH backend.
//
// OVH mutualise presents a cluster-wide cert (CN=cluster129.hosting.ovh.net)
// rather than a cert for www.orient-relais.com, so validating against
// WP_DOMAIN always fails. The right middle-ground is to validate against the
// OVH cluster hostname: the cert is issued by a real CA and OVH routes the
// right virtual host via SNI, so checking the cluster identity is a
// meaningful improvement over rejectUnauthorized:false.
//
// Set WP_PROXY_STRICT_TLS=1 on Vercel to enable. Override the expected cert
// hostname via WP_PROXY_STRICT_TLS_HOSTNAME if OVH ever migrates clusters
// (look at `openssl s_client -connect <IP>:443 -servername <domain>` Subject).
const STRICT_TLS = process.env.WP_PROXY_STRICT_TLS === '1';
const STRICT_TLS_HOSTNAME =
    process.env.WP_PROXY_STRICT_TLS_HOSTNAME || 'cluster129.hosting.ovh.net';

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
    // Set X-Forwarded-Host so WordPress generates correct internal URLs (solves WP Admin CORS)
    headers['x-forwarded-host'] = WP_DOMAIN;

    // In dev, next.js adds some headers, remove them just in case
    delete headers['x-invoke-path'];
    delete headers['x-invoke-query'];

    return new Promise<Response>((resolve) => {
        const options: https.RequestOptions = {
            hostname: WP_BACKEND_IP,
            port: 443,
            path: pathAndQuery,
            method: request.method,
            headers: headers,
            servername: WP_DOMAIN, // SNI for OVH shared hosting
            rejectUnauthorized: STRICT_TLS,
            // When strict mode is on, validate the peer cert against the OVH
            // cluster hostname (the actual cert subject for mutualise hosting)
            // instead of the raw backend IP.
            checkServerIdentity: STRICT_TLS
                ? (_host, cert) => tls.checkServerIdentity(STRICT_TLS_HOSTNAME, cert)
                : () => undefined,
        };

        const proxyReq = https.request(options, (proxyRes) => {
            if (IS_DEV) {
                console.log(`[Proxy] ${proxyRes.statusCode} ${pathAndQuery}`);
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
                            if (IS_DEV) console.log(`[Proxy] Rewrite Location: ${value} -> ${finalValue}`);
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
