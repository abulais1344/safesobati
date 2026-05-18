import { createSupabaseServerClient } from "@/lib/supabase/server";

export type MarketplaceDriver = {
  slug: string;
  name: string;
  city: string;
  rating: number;
  ridesCompleted: number;
  languages: string[];
  responseTime: string;
  responseRate: string;
  yearsOfExperience: number;
  joinedDate: string;
  rideCategories: string[];
  profileImage: string;
  vehicleModel: string;
  vehicleImages: string[];
  eta: string;
  seats: number;
  ac: boolean;
};

const fallbackVehicleImages = [
  "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80",
];

const fallbackProfileImage =
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=480&q=80";

type DriverRow = {
  id: string;
  rating: number;
  created_at: string;
  languages: string[] | null;
  users: {
    name: string;
    city: string;
  };
  vehicles: Array<{
    vehicle_type: "hatchback" | "sedan" | "suv" | "taxi";
    brand: string;
    model: string;
    seat_count: number;
    ac: boolean;
    photos: string[] | null;
  }>;
};

function slugifyDriver(name: string, id: string) {
  const namePart = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

  return `${namePart}-${id.slice(0, 8)}`;
}

function mapVehicleTypeToRideCategories(vehicleType: string) {
  if (vehicleType === "suv") {
    return ["Outstation", "Family", "Airport"];
  }

  if (vehicleType === "taxi") {
    return ["Station", "City", "Hospital"];
  }

  return ["City", "Airport", "Outstation"];
}

function estimateResponseTime(rating: number) {
  if (rating >= 4.8) return "1.4 min";
  if (rating >= 4.5) return "2.1 min";
  return "2.8 min";
}

function estimateResponseRate(rating: number) {
  if (rating >= 4.8) return "97%";
  if (rating >= 4.5) return "94%";
  return "90%";
}

function formatJoinedDate(isoDate: string) {
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-IN", { month: "short", year: "numeric" });
}

function getSafeVehicleImages(photos: string[] | null | undefined) {
  const cleaned = (photos ?? []).map((item) => item?.trim()).filter((item): item is string => Boolean(item));

  if (cleaned.length >= 3) {
    return cleaned;
  }

  return [...cleaned, ...fallbackVehicleImages].slice(0, 3);
}

export async function getApprovedMarketplaceDrivers(): Promise<MarketplaceDriver[]> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("drivers")
    .select("id, rating, created_at, languages, users!drivers_user_id_fkey!inner(name, city), vehicles!inner(vehicle_type, brand, model, seat_count, ac, photos)")
    .eq("status", "approved")
    .eq("available", true)
    .order("created_at", { ascending: false })
    .limit(24);

  if (error || !data) {
    return [];
  }

  return (data as unknown as DriverRow[]).map((driver, index) => {
    const vehicle = driver.vehicles[0];
    const vehicleImages = getSafeVehicleImages(vehicle?.photos);
    const rating = Number(driver.rating || 4.6);

    return {
      slug: slugifyDriver(driver.users.name, driver.id),
      name: driver.users.name,
      city: driver.users.city,
      rating,
      ridesCompleted: 120 + index * 37,
      languages: (driver.languages ?? []).filter(Boolean),
      responseTime: estimateResponseTime(rating),
      responseRate: estimateResponseRate(rating),
      yearsOfExperience: 2 + (index % 8),
      joinedDate: formatJoinedDate(driver.created_at),
      rideCategories: mapVehicleTypeToRideCategories(vehicle?.vehicle_type ?? "sedan"),
      profileImage: fallbackProfileImage,
      vehicleModel: `${vehicle?.brand ?? "Car"} ${vehicle?.model ?? ""}`.trim(),
      vehicleImages,
      eta: `${5 + (index % 6)} min`,
      seats: vehicle?.seat_count ?? 4,
      ac: Boolean(vehicle?.ac),
    };
  });
}
