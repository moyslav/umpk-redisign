import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "m-files.cdn1.cc" }],
  },
};

export default nextConfig;
