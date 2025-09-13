import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Ignores ESLint errors during build
  },
  typescript: {
    ignoreBuildErrors: true, // Ignores TypeScript errors during build
  },
}

export default nextConfig;
