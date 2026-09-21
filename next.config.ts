import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    // Firebase Hosting is static — Next's built-in image optimizer needs a
    // running server (or a custom loader), neither of which exists here.
    unoptimized: true,
  },
};

export default nextConfig;
