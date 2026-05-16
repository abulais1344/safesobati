import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

type DriverOnboardPayload = {
  fullName: string;
  phone: string;
  city: string;
  vehicleType: "auto" | "hatchback" | "sedan" | "suv" | "taxi";
  vehicleNumber: string;
  yearsOfExperience: number;
  aadhaarUrl?: string;
  licenseUrl?: string;
  rcUrl?: string;
  brand: string;
  model: string;
  seatCount: number;
  ac: boolean;
  photos?: string[];
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as DriverOnboardPayload;

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
        brand: body.brand,
        model: body.model,
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
