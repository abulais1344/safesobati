import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const { data, error } = await supabaseAdmin
      .from("driver_quotes")
      .select(
        "id, quote_amount, message, status, created_at, driver_id, drivers!inner(id, rating, status, user_id, users!inner(name, phone, city))"
      )
      .eq("ride_request_id", id)
      .order("quote_amount", { ascending: true });

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ quotes: data ?? [] });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch quotes" },
      { status: 400 }
    );
  }
}
