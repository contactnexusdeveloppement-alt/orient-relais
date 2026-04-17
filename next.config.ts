import type { NextConfig } from "next";

const WP_BACKEND = process.env.WP_BACKEND_URL || "https://orient-relais.com";

const nextConfig: NextConfig = {
  trailingSlash: false,
  env: {
    NEXT_PUBLIC_WOOCOMMERCE_URL: "https://www.orient-relais.com",
    NEXT_PUBLIC_WORDPRESS_URL: "https://www.orient-relais.com",
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.orient-relais.com',
      },
      {
        protocol: 'https',
        hostname: 'orient-relais.com',
      },
      {
        protocol: 'https',
        hostname: '*.woocommerce.com',
      },
    ],
  },
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
        { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        { key: 'X-DNS-Prefetch-Control', value: 'on' },
        {
          key: 'Content-Security-Policy',
          value: [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' https://js.stripe.com https://widget.mondialrelay.com https://www.googletagmanager.com https://www.google-analytics.com",
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            "img-src 'self' data: https://www.orient-relais.com https://orient-relais.com https://*.stripe.com https://www.google-analytics.com https://www.googletagmanager.com",
            "font-src 'self' https://fonts.gstatic.com",
            "connect-src 'self' https://api.stripe.com https://www.orient-relais.com https://www.google-analytics.com https://analytics.google.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com",
            "frame-src https://js.stripe.com https://widget.mondialrelay.com",
            "object-src 'none'",
            "base-uri 'self'",
          ].join('; '),
        },
      ],
    },
  ],
  rewrites: async () => [
    { source: '/wp-admin/:path*', destination: '/api/wp-proxy/wp-admin/:path*' },
    { source: '/wp-login.php', destination: '/api/wp-proxy/wp-login.php' },
    { source: '/wp-json/:path*', destination: '/api/wp-proxy/wp-json/:path*' },
    { source: '/wp-content/:path*', destination: '/api/wp-proxy/wp-content/:path*' },
    { source: '/wp-includes/:path*', destination: '/api/wp-proxy/wp-includes/:path*' },
  ],
};

export default nextConfig;

