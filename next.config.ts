import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["picsum.photos","res.cloudinary.com"], // Replace with your actual domain
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*", // for now it support photos form any host
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
