import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      allowedOrigins: ["*github.dev", "localhost:3000"]
    }
  },
  images: {
    remotePatterns: [new URL('https://m.media-amazon.com/**')],
  },
};

export default nextConfig;
