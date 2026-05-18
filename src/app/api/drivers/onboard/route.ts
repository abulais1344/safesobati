import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

type DriverOnboardPayload = {
  fullName: string;
  phone: string;
  city: string;
  vehicleType: "hatchback" | "sedan" | "suv" | "taxi";
  vehicleNumber: string;
  yearsOfExperience: number;
  aadhaarUrl?: string;
  licenseUrl?: string;
  rcUrl?: string;
  insuranceUrl?: string;
  insuranceExpiry?: string;
  pucUrl?: string;
  pucExpiry?: string;
  vehicleBrand: string;
  vehicleModel: string;
  languages?: string[];
  seatCount: number;
  ac: boolean;
  photos?: string[];
};

function normalizeDateForDb(value?: string): string | null {
  if (!value) return null;
  const input = value.trim();
  if (!input) return null;

  const isoMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(input);
  if (isoMatch) {
    return input;
  }

  const dmyMatch = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(input);
  if (dmyMatch) {
    const [, dd, mm, yyyy] = dmyMatch;
    return `${yyyy}-${mm}-${dd}`;
  }

  return null;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as DriverOnboardPayload;
    const insuranceExpiry = normalizeDateForDb(body.insuranceExpiry);
    const pucExpiry = normalizeDateForDb(body.pucExpiry);

    const { data: existingUser } = await supabaseAdmin
      .from("users")
      .select("id")
      .eq("phone", body.phone)
      .maybeSingle();

    let userId = existingUser?.id as string | undefined;

    if (!userId) {
      const { data: newUser, error: userError } = await supabaseAdmin
        .from("users")
        .insert({
          name: body.fullName,
          phone: body.phone,
          role: "driver",
          city: body.city,
        })
        .select("id")
        .single();

      if (userError) {
        throw new Error(userError.message);
      }

      userId = newUser.id as string;
    }

    const { data: driver, error: driverError } = await supabaseAdmin
      .from("drivers")
      .upsert(
        {
          user_id: userId,
          aadhaar_verified: false,
          license_verified: false,
          aadhaar_url: body.aadhaarUrl ?? null,
          license_url: body.licenseUrl ?? null,
          rc_url: body.rcUrl ?? null,
          insurance_url: body.insuranceUrl ?? null,
          insurance_expiry: insuranceExpiry,
          puc_url: body.pucUrl ?? null,
          puc_expiry: pucExpiry,
          languages: body.languages ?? [],
          status: "pending",
          available: false,
        },
        { onConflict: "user_id" }
      )
      .select("id, status")
      .single();

    if (driverError) {
      throw new Error(driverError.message);
    }

    const { error: vehicleError } = await supabaseAdmin.from("vehicles").upsert(
      {
        driver_id: driver.id,
        vehicle_type: body.vehicleType,
        brand: body.vehicleBrand,
        model: body.vehicleModel,
        seat_count: body.seatCount,
        ac: body.ac,
        registration_number: body.vehicleNumber,
        photos: body.photos ?? [],
      },
      { onConflict: "registration_number" }
    );

    if (vehicleError) {
      throw new Error(vehicleError.message);
    }

    return NextResponse.json({ driverId: driver.id, status: driver.status }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to onboard driver" },
      { status: 400 }
    );
  }
}
