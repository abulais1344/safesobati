import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Safeसोबती",
    short_name: "Safeसोबती",
    description: "Trusted taxi, cab and auto booking for tier-2 and tier-3 India.",
    start_url: "/",
    display: "standalone",
    background_color: "#f3f8f8",
    theme_color: "#0f766e",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
