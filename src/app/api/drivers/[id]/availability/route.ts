import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

type AvailabilityPayload = {
  available: boolean;
};

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = (await request.json()) as AvailabilityPayload;

    const { data, error } = await supabaseAdmin
      .from("drivers")
      .update({ available: body.available })
      .eq("id", id)
      .eq("status", "approved")
      .select("id, available")
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Driver not found or not approved" }, { status: 404 });
    }

    return NextResponse.json({ driverId: data.id, available: data.available });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update availability" },
      { status: 400 }
    );
  }
}
