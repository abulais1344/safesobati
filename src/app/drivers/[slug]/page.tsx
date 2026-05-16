import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BadgeCheck, Car, Languages, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { DriverProfile } from "@/lib/types";

const driverProfiles: DriverProfile[] = [
  {
    id: "1",
    slug: "rakesh-kale",
    fullName: "Rakesh Kale",
    city: "Nanded",
    vehicleType: "auto",
    rating: 4.9,
    rides: 1240,
    verified: true,
    languages: ["Marathi", "Hindi"],
  },
  {
    id: "2",
    slug: "nazia-shaikh",
    fullName: "Nazia Shaikh",
    city: "Nanded",
    vehicleType: "sedan",
    rating: 4.8,
    rides: 890,
    verified: true,
    languages: ["Marathi", "Hindi", "English"],
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const profile = driverProfiles.find((driver) => driver.slug === slug);
  if (!profile) {
    return { title: "Driver not found" };
  }

  return {
    title: `${profile.fullName} Driver Profile`,
    description: `View verified profile, rating and vehicle details for ${profile.fullName}.`,
  };
}

export default async function DriverProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const profile = driverProfiles.find((driver) => driver.slug === slug);
  if (!profile) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-semibold">Driver profile</h1>
      <Card className="mt-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-2xl font-semibold">{profile.fullName}</p>
            <p className="text-sm text-slate-500">{profile.city}</p>
          </div>
          {profile.verified ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
              <BadgeCheck size={14} /> Verified
            </span>
          ) : null}
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <p className="inline-flex items-center gap-2 text-sm">
            <Car size={15} /> Vehicle: {profile.vehicleType}
          </p>
          <p className="inline-flex items-center gap-2 text-sm">
            <Star size={15} /> Rating: {profile.rating} ({profile.rides} rides)
          </p>
          <p className="inline-flex items-center gap-2 text-sm sm:col-span-2">
            <Languages size={15} /> Languages: {profile.languages.join(", ")}
          </p>
        </div>
      </Card>
    </div>
  );
}
