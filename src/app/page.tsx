import type { Metadata } from "next";
import { DriverCTASection } from "@/components/sections/driver-cta-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { HeroSection } from "@/components/sections/hero-section";
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
      <FeaturesSection />
      <TrustSection />
      <DriverCTASection />
    </div>
  );
}
