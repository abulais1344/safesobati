import { NextResponse } from "next/server";
import { getMarketplaceMetrics } from "@/lib/marketplace-metrics";

export async function GET() {
  try {
    const metrics = await getMarketplaceMetrics();
    return NextResponse.json(metrics);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to fetch marketplace metrics" },
      { status: 500 }
    );
  }
}
