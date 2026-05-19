import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

type DriverUpdatePayload = {
  fullName?: string;
  phone?: string;
  city?: string;
  aadhaarVerified?: boolean;
  licenseVerified?: boolean;
  insuranceExpiry?: string | null;
  pucExpiry?: string | null;
  vehicleType?: "auto" | "hatchback" | "sedan" | "suv" | "taxi";
  vehicleBrand?: string;
  vehicleModel?: string;
  seatCount?: number;
  ac?: boolean;
  registrationNumber?: string;
};

function normalizeDateForDb(value?: string | null): string | null {
  if (!value) return null;
  const input = value.trim();
  if (!input) return null;

  const isoMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(input);
  if (isoMatch) return input;

  const dmyMatch = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(input);
  if (dmyMatch) {
    const [, dd, mm, yyyy] = dmyMatch;
    return `${yyyy}-${mm}-${dd}`;
  }

  return null;
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = (await request.json()) as DriverUpdatePayload;

    const { data: driver, error: driverLookupError } = await supabaseAdmin
      .from("drivers")
      .select("id, user_id")
      .eq("id", id)
      .single();

    if (driverLookupError || !driver) {
      return NextResponse.json({ error: "Driver not found" }, { status: 404 });
    }

    const userPatch: Record<string, string> = {};
    if (typeof body.fullName === "string") userPatch.name = body.fullName.trim();
    if (typeof body.phone === "string") userPatch.phone = body.phone.trim();
    if (typeof body.city === "string") userPatch.city = body.city.trim();

    if (Object.keys(userPatch).length > 0) {
      const { error: userUpdateError } = await supabaseAdmin
        .from("users")
        .update(userPatch)
        .eq("id", driver.user_id);

      if (userUpdateError) {
        return NextResponse.json({ error: userUpdateError.message }, { status: 400 });
      }
    }

    const driverPatch: Record<string, unknown> = {};
    if (typeof body.aadhaarVerified === "boolean") driverPatch.aadhaar_verified = body.aadhaarVerified;
    if (typeof body.licenseVerified === "boolean") driverPatch.license_verified = body.licenseVerified;
    if (body.insuranceExpiry !== undefined) driverPatch.insurance_expiry = normalizeDateForDb(body.insuranceExpiry);
    if (body.pucExpiry !== undefined) driverPatch.puc_expiry = normalizeDateForDb(body.pucExpiry);

    if (Object.keys(driverPatch).length > 0) {
      const { error: adminUpdateError } = await supabaseAdmin
        .from("drivers")
        .update(driverPatch)
        .eq("id", id);

      if (adminUpdateError) {
        return NextResponse.json({ error: adminUpdateError.message }, { status: 400 });
      }
    }

    const vehiclePatch: Record<string, unknown> = {};
    if (body.vehicleType) vehiclePatch.vehicle_type = body.vehicleType;
    if (typeof body.vehicleBrand === "string") vehiclePatch.brand = body.vehicleBrand.trim();
    if (typeof body.vehicleModel === "string") vehiclePatch.model = body.vehicleModel.trim();
    if (typeof body.seatCount === "number") vehiclePatch.seat_count = body.seatCount;
    if (typeof body.ac === "boolean") vehiclePatch.ac = body.ac;
    if (typeof body.registrationNumber === "string") {
      vehiclePatch.registration_number = body.registrationNumber.trim();
    }

    if (Object.keys(vehiclePatch).length > 0) {
      const { error: vehicleUpdateError } = await supabaseAdmin
        .from("vehicles")
        .update(vehiclePatch)
        .eq("driver_id", id);

      if (vehicleUpdateError) {
        return NextResponse.json({ error: vehicleUpdateError.message }, { status: 400 });
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update driver details" },
      { status: 400 }
    );
  }
}
