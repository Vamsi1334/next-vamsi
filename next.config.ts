import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // ⭐ Add this
  images: {
    unoptimized: true, // ⭐ Add this if you are using next/image
  },
};

export default nextConfig;
