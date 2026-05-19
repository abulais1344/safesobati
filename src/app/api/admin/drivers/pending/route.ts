import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("drivers")
      .select(
        "id, status, aadhaar_verified, license_verified, aadhaar_url, license_url, rc_url, insurance_url, insurance_expiry, puc_url, puc_expiry, approved_by, approved_at, rejection_reason, user_id, users!drivers_user_id_fkey(name, phone, city), vehicles(id, vehicle_type, brand, model, seat_count, ac, registration_number)"
      )
      .in("status", ["pending", "rejected", "suspended"])
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
