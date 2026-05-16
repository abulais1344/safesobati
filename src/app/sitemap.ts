import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://safesobati.com";
  const routes = [
    "",
    "/search",
    "/driver/register",
    "/booking",
    "/driver/dashboard",
    "/admin/dashboard",
    "/about",
    "/contact",
    "/safety",
    "/faqs",
    "/terms",
    "/privacy",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
