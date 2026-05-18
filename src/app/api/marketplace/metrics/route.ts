import { NextResponse } from "next/server";
import { getMarketplaceMetrics } from "@/lib/marketplace-metrics";

const fallbackMetrics = {
  driversApproved: 0,
  driversAvailable: 0,
  rideRequests: 0,
  activeQuotes: 0,
  confirmedRides: 0,
  citiesActive: 0,
};

export async function GET() {
  try {
    const metrics = await getMarketplaceMetrics();
    return NextResponse.json(metrics);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to fetch marketplace metrics";
    console.warn("Marketplace metrics fallback response:", message);

    return NextResponse.json(
      {
        ...fallbackMetrics,
        degraded: true,
        error: message,
      },
      { status: 200 }
    );
  }
}
