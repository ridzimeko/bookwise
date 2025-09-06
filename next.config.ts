import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      allowedOrigins: ["*github.dev", "localhost:3000"]
    }
  },
  images: {
    remotePatterns: [
      new URL('https://m.media-amazon.com/**'),
      new URL('https://ik.imagekit.io/**'),
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
