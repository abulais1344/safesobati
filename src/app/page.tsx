import type { Metadata } from "next";
import { DriverCTASection } from "@/components/sections/driver-cta-section";
import { FeaturedDriversSection } from "@/components/sections/featured-drivers-section";
import { HeroSection } from "@/components/sections/hero-section";
import { PopularRoutesSection } from "@/components/sections/popular-routes-section";
import { TrustSection } from "@/components/sections/trust-section";
import { RideSearchForm } from "@/components/forms/ride-search-form";
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
      
      {/* Search Section */}
      <section className="py-8 sm:py-12">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <RideSearchForm />
        </div>
      </section>
      
      <FeaturedDriversSection />
      <PopularRoutesSection />
      <TrustSection />
      <DriverCTASection />
    </div>
  );
}
