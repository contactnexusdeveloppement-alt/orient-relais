import type { NextConfig } from "next";

const WP_BACKEND = process.env.WP_BACKEND_URL || "https://orient-relais.com";

const nextConfig: NextConfig = {
  trailingSlash: false,
  env: {
    NEXT_PUBLIC_WOOCOMMERCE_URL: "https://www.orient-relais.com",
    NEXT_PUBLIC_WORDPRESS_URL: "https://www.orient-relais.com",
  },
  images: {
    formats: ['image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
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

