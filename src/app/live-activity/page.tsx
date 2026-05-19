import type { Metadata } from "next";
import { LiveMarketplaceSection } from "@/components/sections/live-marketplace-section";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(
  "Live Activity | SafeSobati",
  "See live marketplace activity, recent bookings, and verified transport demand signals.",
  "/live-activity",
  ["live marketplace", "ride activity", "nanded transport"]
);

export default function LiveActivityPage() {
  return (
    <div className="pb-10">
      <LiveMarketplaceSection />
    </div>
  );
}
