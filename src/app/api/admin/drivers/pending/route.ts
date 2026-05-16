import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("drivers")
      .select("id, status, aadhaar_verified, license_verified, user_id, users!inner(name, phone, city)")
      .in("status", ["pending", "rejected"])
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ drivers: data ?? [] });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch pending drivers" },
      { status: 400 }
    );
  }
}
