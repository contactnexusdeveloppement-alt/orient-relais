import { NextRequest } from 'next/server';

// We intercept /wp-admin, /wp-login.php, /wp-json, /wp-content, /wp-includes
const WP_BACKEND_IP = '51.91.236.255'; // The OVH Server IP
const WP_DOMAIN = 'orient-relais.com';

export async function GET(request: NextRequest) {
    return handleProxy(request);
}

export async function POST(request: NextRequest) {
    return handleProxy(request);
}

export async function PUT(request: NextRequest) {
    return handleProxy(request);
}

export async function DELETE(request: NextRequest) {
    return handleProxy(request);
}

export async function PATCH(request: NextRequest) {
    return handleProxy(request);
}

export async function OPTIONS(request: NextRequest) {
    return handleProxy(request);
}

async function handleProxy(request: NextRequest) {
    try {
        const url = new URL(request.url);
        // Strip the local API prefix so the backend receives the correct path
        const pathAndQuery = url.pathname.replace(/^\/api\/wp-proxy/, '') + url.search;

        // Construct the backend URL using HTTPS and the direct IP or cluster URL.
        // However, since OVH's SNI needs the exact domain, we will construct the fetch to the IP
        // but pass the Host header.
        // Due to Node's strict SSL Hostname verification matching the certificate (which is for orient-relais.com, not the IP),
        // we bypass SSL verification for this specific internal proxy fetch by using the cluster URL instead if SSL fails,
        // OR we just fetch http://51.91.236.255 and let OVH handle it internally if it accepts HTTP internally.
        // Let's test the direct HTTP IP approach as we verified `curl -H "Host: orient-relais.com" http://51.91.236.255/wp-login.php` worked and returned a redirect.
        // Actually, WooCommerce API needs HTTPS. Let's use the technical OVH cluster URL as the base.

        // Use the cluster URL which has valid SSL for the OVH environment, but we MIGHT still need to pass Host.
        // Wait, the previous test showed cluster URL returned 'Site non installé'.
        // The only thing that worked perfectly was: curl -H "Host: orient-relais.com" https://51.91.236.255/... --insecure

        // In Next.js Edge/Serverless, we can't easily bypass SSL (`--insecure`). 
        // Wait, `fetch` in standard Next.js (Node.js runtime) allows custom agents, but it's complex.

        // Let's try fetching the actual domain, but appending a special query param or header? No, DNS points to Vercel.

        // What if we use the REST API via the technical URL?
        // Let's try to proxy to the cluster URL but pass the Host header? No, cluster URL + Host header = OVH sees 'orient-relais.com', but checks if the node (cluster029) handles it. It should...

        const backendUrl = `http://${WP_BACKEND_IP}${pathAndQuery}`; // Try HTTP first to bypass SSL cert mismatch on IP

        const headers = new Headers(request.headers);
        // Force the host header so OVH routes it to the right virtual host
        headers.set('Host', WP_DOMAIN);

        // Remove headers that might cause issues with proxying
        headers.delete('connection');
        headers.delete('accept-encoding');
        // Important: remove x-forwarded-host if it exists
        headers.delete('x-forwarded-host');

        const fetchOptions: RequestInit = {
            method: request.method,
            headers: headers,
            redirect: 'manual', // Don't follow redirects automatically, pass them to the client
            // body is only allowed for POST/PUT/PATCH etc.
            body: ['GET', 'HEAD'].includes(request.method) ? undefined : await request.arrayBuffer(),
            // Prevent caching of admin/api requests
            cache: 'no-store',
        };

        const response = await fetch(backendUrl, fetchOptions);

        // Reconstruct the response to send back to the client
        const responseHeaders = new Headers(response.headers);
        // Ensure we don't pass back problematic headers
        responseHeaders.delete('content-encoding');
        responseHeaders.delete('transfer-encoding');

        // If it's a redirect (like wp-login.php does to HTTPS), we need to rewrite the Location header
        // so it doesn't redirect them to the http:// backend IP.
        if (responseHeaders.has('location')) {
            let location = responseHeaders.get('location');
            if (location) {
                location = location.replace(`http://${WP_BACKEND_IP}`, `https://${WP_DOMAIN}`);
                responseHeaders.set('location', location);
            }
        }

        return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: responseHeaders,
        });

    } catch (error) {
        console.error('Proxy error:', error);
        return new Response('Proxy Error', { status: 500 });
    }
}
