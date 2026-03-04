import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  // webpack: (config) => {
  //   config.experiments = {
  //     ...config.experiments,
  //     asyncWebAssembly: true,
  //     layers: true,
  //   };
  //   return config;
  // },
};

export default nextConfig;