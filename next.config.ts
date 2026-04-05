import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  // typedRoutes: true,
  experimental: {
    typedEnv: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      }
    ]
  }
  /* config options here */
};

export default nextConfig;
