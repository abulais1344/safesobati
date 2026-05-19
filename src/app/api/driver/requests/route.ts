import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const driverId = url.searchParams.get("driverId");

    if (!driverId) {
      return NextResponse.json({ error: "driverId query param is required" }, { status: 400 });
    }

    const { data: driver, error: driverError } = await supabaseAdmin
      .from("drivers")
      .select("id, status, user_id")
      .eq("id", driverId)
      .single();

    if (driverError || !driver) {
      return NextResponse.json({ error: "Driver not found" }, { status: 404 });
    }

    if (driver.status !== "approved") {
      return NextResponse.json({ requests: [] });
    }

    const { data: user, error: userError } = await supabaseAdmin
      .from("users")
      .select("city")
      .eq("id", driver.user_id)
      .single();

    if (userError || !user) {
      return NextResponse.json({ error: "Driver city not found" }, { status: 404 });
    }

    const { data, error } = await supabaseAdmin
      .from("ride_requests")
      .select("id, pickup, drop, trip_type, date, status, city, created_at")
      .in("status", ["pending", "responded", "shortlisted"])
      .eq("city", user.city)
      .order("created_at", { ascending: false })
      .limit(40);

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ requests: data ?? [] });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch driver requests" },
      { status: 400 }
    );
  }
}
