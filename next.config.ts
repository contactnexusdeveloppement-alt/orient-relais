import type { NextConfig } from "next";

const WP_BACKEND = process.env.WP_BACKEND_URL || "https://orient-relais.com";

const nextConfig: NextConfig = {
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
    {
      source: '/wp-admin/:path*',
      headers: [{ key: 'Host', value: 'orient-relais.com' }],
    },
    {
      source: '/wp-login.php',
      headers: [{ key: 'Host', value: 'orient-relais.com' }],
    },
    {
      source: '/wp-json/:path*',
      headers: [{ key: 'Host', value: 'orient-relais.com' }],
    },
    {
      source: '/wp-content/:path*',
      headers: [{ key: 'Host', value: 'orient-relais.com' }],
    },
    {
      source: '/wp-includes/:path*',
      headers: [{ key: 'Host', value: 'orient-relais.com' }],
    },
  ],
  rewrites: async () => [
    // Proxy WordPress admin panel to OVH server
    {
      source: '/wp-admin/:path*',
      destination: `${WP_BACKEND}/wp-admin/:path*`,
    },
    // Proxy WordPress login
    {
      source: '/wp-login.php',
      destination: `${WP_BACKEND}/wp-login.php`,
    },
    // Proxy WordPress REST API (used by WooCommerce)
    {
      source: '/wp-json/:path*',
      destination: `${WP_BACKEND}/wp-json/:path*`,
    },
    // Proxy WordPress content (uploaded images, etc.)
    {
      source: '/wp-content/:path*',
      destination: `${WP_BACKEND}/wp-content/:path*`,
    },
    // Proxy WordPress includes (scripts, styles)
    {
      source: '/wp-includes/:path*',
      destination: `${WP_BACKEND}/wp-includes/:path*`,
    },
  ],
};

export default nextConfig;

