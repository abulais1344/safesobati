import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

type UpdatePopularRoutePayload = {
  fromCity?: string;
  toCity?: string;
  distance?: string;
  travelTime?: string;
  baseFare?: string;
  imageUrl?: string;
  sortOrder?: number;
  isActive?: boolean;
};

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = (await request.json()) as UpdatePopularRoutePayload;

    const updatePayload: Record<string, unknown> = {};

    if (typeof body.fromCity === "string") updatePayload.from_city = body.fromCity;
    if (typeof body.toCity === "string") updatePayload.to_city = body.toCity;
    if (typeof body.distance === "string") updatePayload.distance = body.distance;
    if (typeof body.travelTime === "string") updatePayload.travel_time = body.travelTime;
    if (typeof body.baseFare === "string") updatePayload.base_fare = body.baseFare;
    if (typeof body.imageUrl === "string") updatePayload.image_url = body.imageUrl;
    if (typeof body.sortOrder === "number") updatePayload.sort_order = body.sortOrder;
    if (typeof body.isActive === "boolean") updatePayload.is_active = body.isActive;

    if (Object.keys(updatePayload).length === 0) {
      return NextResponse.json({ error: "No fields provided to update" }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from("popular_routes")
      .update(updatePayload)
      .eq("id", id)
      .select("id, from_city, to_city, distance, travel_time, base_fare, image_url, is_active, sort_order, created_at")
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ route: data });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update popular route" },
      { status: 400 }
    );
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const { error } = await supabaseAdmin.from("popular_routes").delete().eq("id", id);

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete popular route" },
      { status: 400 }
    );
  }
}
