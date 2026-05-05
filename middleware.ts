import { NextResponse, type NextRequest } from "next/server";

/**
 * Maintenance middleware — short-circuit all incoming requests with a 503
 * "site temporarily unavailable" response while we wait on the contract.
 *
 * Why a single self-contained HTML response instead of an `app/maintenance`
 * route?
 *   1. The root layout fetches WooCommerce categories at request time, which
 *      we don't want to keep hitting WP for during the maintenance window.
 *   2. We need an *honest* HTTP 503 + Retry-After header so Google does not
 *      drop us from the index. A normal Next.js page rewrite returns 200.
 *   3. Restoration = delete this file (or `git revert`) and redeploy. No
 *      cleanup of stale pages required.
 */

const MAINTENANCE_HTML = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Maintenance technique — Orient Relais</title>
<link rel="icon" href="/favicon.ico">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700&family=Playfair+Display:wght@700&display=swap" rel="stylesheet">
<style>
  *, *::before, *::after { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  body {
    font-family: 'Manrope', system-ui, -apple-system, sans-serif;
    background: linear-gradient(135deg, #fef3c7 0%, #f5f5f4 100%);
    color: #1c1917;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    -webkit-font-smoothing: antialiased;
  }
  .card {
    max-width: 480px;
    width: 100%;
    background: #ffffff;
    border: 1px solid rgba(217, 119, 6, 0.15);
    border-radius: 24px;
    padding: 3rem 2rem;
    text-align: center;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.08);
  }
  .accent {
    width: 48px;
    height: 3px;
    background: linear-gradient(90deg, #d97706, #fbbf24);
    border-radius: 2px;
    margin: 0 auto 1.5rem auto;
  }
  .badge {
    display: inline-block;
    padding: 0.4rem 1rem;
    background: rgba(217, 119, 6, 0.08);
    color: #b45309;
    border: 1px solid rgba(217, 119, 6, 0.2);
    border-radius: 999px;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 1.5rem;
  }
  h1 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: clamp(1.75rem, 4vw, 2.25rem);
    font-weight: 700;
    color: #1c1917;
    margin: 0 0 1rem 0;
    line-height: 1.2;
  }
  p {
    color: #57534e;
    font-size: 1rem;
    line-height: 1.6;
    margin: 0 0 0.75rem 0;
  }
  p:last-of-type { margin-bottom: 0; }
  .brand {
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid #f5f5f4;
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: #b45309;
    letter-spacing: 0.05em;
  }
</style>
</head>
<body>
  <main class="card" role="main">
    <div class="accent"></div>
    <span class="badge">Maintenance technique</span>
    <h1>Site temporairement indisponible</h1>
    <p>Notre site est actuellement en maintenance technique.</p>
    <p>Nous serons de retour très prochainement. Merci de votre patience.</p>
    <div class="brand">Orient Relais</div>
  </main>
</body>
</html>`;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow Next.js build assets and explicit static files through. Everything
  // else (pages, API routes, sitemap, robots.txt) gets the maintenance page.
  if (
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico" ||
    /\.(png|jpe?g|svg|gif|webp|ico|css|js|woff2?|ttf|map)$/i.test(pathname)
  ) {
    return NextResponse.next();
  }

  return new NextResponse(MAINTENANCE_HTML, {
    status: 503,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      // Tell Google to come back in 7 days. Crucial: without this header a
      // long 503 streak gets pages dropped from the index.
      "Retry-After": "604800",
      "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}

export const config = {
  // Match every path except Next.js internals (matched explicitly above too,
  // belt-and-braces).
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
