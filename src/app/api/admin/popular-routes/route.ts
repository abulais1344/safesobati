import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

type CreatePopularRoutePayload = {
  fromCity: string;
  toCity: string;
  distance: string;
  travelTime: string;
  baseFare: string;
  imageUrl: string;
  sortOrder?: number;
  isActive?: boolean;
};

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("popular_routes")
      .select("id, from_city, to_city, distance, travel_time, base_fare, image_url, is_active, sort_order, created_at")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ routes: data ?? [] });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch popular routes" },
      { status: 400 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreatePopularRoutePayload;

    if (!body.fromCity || !body.toCity || !body.distance || !body.travelTime || !body.baseFare || !body.imageUrl) {
      return NextResponse.json({ error: "All route fields are required" }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from("popular_routes")
      .insert({
        from_city: body.fromCity,
        to_city: body.toCity,
        distance: body.distance,
        travel_time: body.travelTime,
        base_fare: body.baseFare,
        image_url: body.imageUrl,
        sort_order: body.sortOrder ?? 100,
        is_active: body.isActive ?? true,
      })
      .select("id, from_city, to_city, distance, travel_time, base_fare, image_url, is_active, sort_order, created_at")
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ route: data }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create popular route" },
      { status: 400 }
    );
  }
}
