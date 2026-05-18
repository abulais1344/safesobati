import { popularRoutes, type RouteCard } from "@/lib/constants";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type ManagedPopularRoute = {
  id: string;
  fromCity: string;
  toCity: string;
  distance: string;
  travelTime: string;
  baseFare: string;
  imageUrl: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
};

type PopularRouteRow = {
  id: string;
  from_city: string;
  to_city: string;
  distance: string;
  travel_time: string;
  base_fare: string;
  image_url: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
};

function toManagedRoute(row: PopularRouteRow): ManagedPopularRoute {
  return {
    id: row.id,
    fromCity: row.from_city,
    toCity: row.to_city,
    distance: row.distance,
    travelTime: row.travel_time,
    baseFare: row.base_fare,
    imageUrl: row.image_url,
    isActive: row.is_active,
    sortOrder: row.sort_order,
    createdAt: row.created_at,
  };
}

function toRouteCard(route: ManagedPopularRoute): RouteCard {
  return {
    from: route.fromCity,
    to: route.toCity,
    distance: route.distance,
    travelTime: route.travelTime,
    baseFare: route.baseFare,
    image: route.imageUrl,
  };
}

export async function getPopularRoutesForDisplay(): Promise<RouteCard[]> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("popular_routes")
    .select("id, from_city, to_city, distance, travel_time, base_fare, image_url, is_active, sort_order, created_at")
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error || !data || data.length === 0) {
    return popularRoutes;
  }

  return (data as PopularRouteRow[]).map((row) => toRouteCard(toManagedRoute(row)));
}
