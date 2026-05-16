import type { Metadata } from "next";
import { FeaturedDriversSection } from "@/components/sections/featured-drivers-section";
import { DriverCTASection } from "@/components/sections/driver-cta-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { HeroSection } from "@/components/sections/hero-section";
import { LiveMarketplaceSection } from "@/components/sections/live-marketplace-section";
import { PopularRoutesSection } from "@/components/sections/popular-routes-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { TrustSection } from "@/components/sections/trust-section";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(
  "Trusted Local Rides in Nanded",
  "Book verified taxi, cab and auto drivers with SafeSobati. Premium local mobility platform designed for trust, speed and safety.",
  "/",
  ["Nanded taxi", "trusted cab booking", "auto booking Nanded"]
);

export default function Home() {
  return (
    <div className="pb-10">
      <HeroSection />
      <LiveMarketplaceSection />
      <FeaturedDriversSection />
      <FeaturesSection />
      <TrustSection />
      <PopularRoutesSection />
      <TestimonialsSection />
      <DriverCTASection />
    </div>
  );
}
