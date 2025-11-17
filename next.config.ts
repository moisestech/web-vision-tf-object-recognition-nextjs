import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: [
      '@tensorflow/tfjs',
      '@tensorflow-models/coco-ssd',
      '@tensorflow-models/blazeface',
    ],
  },
};

export default nextConfig;
