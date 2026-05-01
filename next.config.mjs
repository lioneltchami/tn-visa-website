import withPWAInit from 'next-pwa'

const withPWA = withPWAInit({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/tnvisaguide\.ca\/(documents|border-interview|employer-letter|faq|professions)$/,
      handler: 'StaleWhileRevalidate',
      options: { cacheName: 'guide-pages', expiration: { maxEntries: 20, maxAgeSeconds: 7 * 24 * 60 * 60 } },
    },
    {
      urlPattern: /\/_next\/data\/.+\.json$/,
      handler: 'StaleWhileRevalidate',
      options: { cacheName: 'next-data', expiration: { maxEntries: 50, maxAgeSeconds: 24 * 60 * 60 } },
    },
  ],
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.supabase.co' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
    ],
  },
  poweredByHeader: false,
  headers: async () => [
    {
      source: '/((?!_next/static|_next/image|favicon.ico).*)',
      headers: [
        { key: 'X-DNS-Prefetch-Control', value: 'on' },
        { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://plausible.io https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://*.supabase.co wss://*.supabase.co https://plausible.io https://api.openai.com https://cloudflareinsights.com; frame-src 'self' https://www.youtube.com https://player.vimeo.com https://checkout.stripe.com" },
      ],
    },
  ],
}

export default withPWA(nextConfig)
