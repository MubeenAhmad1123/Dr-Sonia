import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // Useful for direct exports without Vercel-specific image loaders
    formats: ['image/avif', 'image/webp'],
  },
  // Requested CSS layer optimization injection
  experimental: {
    optimizeCss: true,
  }
};

export default nextConfig;
