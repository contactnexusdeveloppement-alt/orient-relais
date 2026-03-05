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
    { source: '/wp-admin/:path*', destination: '/api/wp-proxy/wp-admin/:path*' },
    { source: '/wp-login.php', destination: '/api/wp-proxy/wp-login.php' },
    { source: '/wp-json/:path*', destination: '/api/wp-proxy/wp-json/:path*' },
    { source: '/wp-content/:path*', destination: '/api/wp-proxy/wp-content/:path*' },
    { source: '/wp-includes/:path*', destination: '/api/wp-proxy/wp-includes/:path*' },
  ],
};

export default nextConfig;

