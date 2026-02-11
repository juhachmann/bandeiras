import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/bandeiras' : '',
  typescript: {
    ignoreBuildErrors: true,
  },
  transpilePackages: ['@flags/game'],
};

export default nextConfig;
