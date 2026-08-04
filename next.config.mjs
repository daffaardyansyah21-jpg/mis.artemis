/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'pub-*.r2.dev',
      },
    ],
  },
  // Cloudflare Pages compatibility
  experimental: {
    // Enable if deploying to Cloudflare Pages with Edge runtime
    // runtime: 'edge',
  },
};

export default nextConfig;
