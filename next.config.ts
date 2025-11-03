import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "unisouk-dev.s3.ap-south-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
