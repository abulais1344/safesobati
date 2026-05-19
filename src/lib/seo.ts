import type { Metadata } from "next";

const siteName = "Safeसोबती";
const siteDescription =
  "Premium trusted mobility platform connecting riders with verified taxi, cab and auto drivers in tier-2 and tier-3 Indian cities.";
const baseUrl = "https://safesobati.com";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${siteName} | Trusted Mobility for Smaller Cities`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  openGraph: {
    title: `${siteName} | Trusted Mobility for Smaller Cities`,
    description: siteDescription,
    siteName,
    locale: "en_IN",
    type: "website",
    url: baseUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | Trusted Mobility for Smaller Cities`,
    description: siteDescription,
  },
  alternates: {
    canonical: baseUrl,
  },
  keywords: [
    "Nanded taxi booking",
    "verified cab drivers",
    "tier 2 city mobility",
    "outstation cabs Nanded",
    "Safeसोबती",
  ],
};

export function buildMetadata(
  title: string,
  description: string,
  path = "/",
  keywords: string[] = []
): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: path,
    },
    twitter: {
      title,
      description,
    },
    keywords: [...defaultMetadata.keywords!, ...keywords],
  };
}
