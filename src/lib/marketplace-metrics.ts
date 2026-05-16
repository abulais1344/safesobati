import { supabaseAdmin } from "@/lib/supabase/admin";

export type MarketplaceMetrics = {
  driversApproved: number;
  driversAvailable: number;
  rideRequests: number;
  activeQuotes: number;
  acceptedRides: number;
  citiesActive: number;
};

async function countRows(table: string, filter?: { column: string; value: string | boolean }) {
  let query = supabaseAdmin.from(table).select("id", { count: "exact", head: true });

  if (filter) {
    query = query.eq(filter.column, filter.value);
  }

  const { count, error } = await query;
  if (error) {
    throw error;
  }

  return count ?? 0;
}

export async function getMarketplaceMetrics(): Promise<MarketplaceMetrics> {
  const [driversApproved, driversAvailable, rideRequests, activeQuotes, acceptedRides, citiesData] =
    await Promise.all([
      countRows("drivers", { column: "status", value: "approved" }),
      countRows("drivers", { column: "available", value: true }),
      countRows("ride_requests"),
      countRows("driver_quotes", { column: "status", value: "active" }),
      countRows("ride_requests", { column: "status", value: "accepted" }),
      supabaseAdmin.from("ride_requests").select("city"),
    ]);

  if (citiesData.error) {
    throw citiesData.error;
  }

  const citiesActive = new Set((citiesData.data ?? []).map((row) => row.city)).size;

  return {
    driversApproved,
    driversAvailable,
    rideRequests,
    activeQuotes,
    acceptedRides,
    citiesActive,
  };
}
