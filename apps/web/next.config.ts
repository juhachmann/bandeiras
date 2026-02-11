import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  typescript: {
    ignoreBuildErrors: true,
  },
  transpilePackages: ['@flags/game'],
};

export default nextConfig;
