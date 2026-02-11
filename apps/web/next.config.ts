import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/bandeiras',
  typescript: {
    ignoreBuildErrors: true,
  },
  transpilePackages: ['@flags/game'],
};

export default nextConfig;
