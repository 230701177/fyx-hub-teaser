import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // @ts-ignore: Some environments have conflicting NextConfig type definitions
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
