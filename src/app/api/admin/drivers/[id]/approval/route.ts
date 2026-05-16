import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

type ApprovalPayload = {
  status: "approved" | "rejected" | "suspended";
  aadhaarVerified: boolean;
  licenseVerified: boolean;
};

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = (await request.json()) as ApprovalPayload;

    const { data, error } = await supabaseAdmin
      .from("drivers")
      .update({
        status: body.status,
        aadhaar_verified: body.aadhaarVerified,
        license_verified: body.licenseVerified,
        available: body.status === "approved",
      })
      .eq("id", id)
      .select("id, status, available")
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Driver not found" }, { status: 404 });
    }

    return NextResponse.json({
      driverId: data.id,
      status: data.status,
      available: data.available,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update driver approval" },
      { status: 400 }
    );
  }
}
