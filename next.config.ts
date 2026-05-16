import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";
const devPort = process.env.PORT;

const nextConfig: NextConfig = {
  // Avoid chunk/cache collisions when running multiple dev servers on different ports.
  distDir: isDev && devPort ? `.next-${devPort}` : ".next",
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
