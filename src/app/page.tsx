import type { Metadata } from "next";
import { DriverCTASection } from "@/components/sections/driver-cta-section";
import { FeaturedDriversSection } from "@/components/sections/featured-drivers-section";
import { HeroSection } from "@/components/sections/hero-section";
import { HowItWorksStrip } from "@/components/sections/how-it-works-strip";
import { MobileStickyBookBar } from "@/components/sections/mobile-sticky-book-bar";
import { PopularRoutesSection } from "@/components/sections/popular-routes-section";
import { TrustSection } from "@/components/sections/trust-section";
import { RideSearchForm } from "@/components/forms/ride-search-form";
import { getApprovedMarketplaceDrivers } from "@/lib/marketplace-drivers";
import { getPopularRoutesForDisplay } from "@/lib/popular-routes";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(
  "Trusted Local Rides in Nanded",
  "Compare verified cab and SUV drivers for airport, family, hospital and outstation travel. SafeSobati is a privacy-first booking marketplace.",
  "/",
  ["Nanded taxi", "verified cab booking", "Nanded to Hyderabad airport cab"]
);

export default async function Home() {
  const approvedDrivers = await getApprovedMarketplaceDrivers();
  const popularRoutes = await getPopularRoutesForDisplay();

  return (
    <div className="pb-10">
      <HeroSection />
      
      {/* Search Section */}
      <section className="py-8 sm:py-12">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <HowItWorksStrip />
          <div className="mt-4">
          <RideSearchForm />
          </div>
        </div>
      </section>
      
      <FeaturedDriversSection drivers={approvedDrivers} />
      <PopularRoutesSection routes={popularRoutes} />
      <TrustSection />
      <DriverCTASection />
      <MobileStickyBookBar />
    </div>
  );
}
