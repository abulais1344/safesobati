import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BadgeCheck, CalendarDays, Car, Clock3, Languages, MapPin, ShieldCheck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getApprovedMarketplaceDrivers } from "@/lib/marketplace-drivers";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const drivers = await getApprovedMarketplaceDrivers();
  const profile = drivers.find((driver) => driver.slug === slug);
  if (!profile) {
    return { title: "Driver not found" };
  }

  return {
    title: `${profile.name} Driver Profile`,
    description: `View verified profile, vehicle gallery and trust details for ${profile.name}.`,
  };
}

export default async function DriverProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const drivers = await getApprovedMarketplaceDrivers();
  const profile = drivers.find((driver) => driver.slug === slug);
  if (!profile) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-semibold text-slate-900 dark:text-white">Driver profile</h1>
      <Card className="mt-4 overflow-hidden border-white/20 bg-slate-950/55 p-0 text-slate-100">
        <div className="grid gap-0 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="p-5 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <Image
                  src={profile.profileImage}
                  alt={`${profile.name} photo`}
                  width={72}
                  height={72}
                  className="h-16 w-16 rounded-2xl object-cover ring-2 ring-emerald-300/40"
                />
                <div>
                  <p className="text-xl font-semibold">{profile.name}</p>
                  <p className="inline-flex items-center gap-1 text-xs text-slate-300">
                    <MapPin size={12} /> {profile.city}
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-3 py-1 text-sm font-semibold text-emerald-200 ring-1 ring-emerald-300/30">
                <BadgeCheck size={14} /> Verified Driver
              </span>
            </div>

            <p className="mt-4 text-sm text-slate-300">
              Trusted local driver for airport rides, outstation trips, family travel, and special
              occasion bookings. Personal contact details remain private until booking is confirmed.
            </p>

            <div className="mt-5 grid gap-2 text-xs sm:grid-cols-3">
              <div className="rounded-lg bg-white/8 p-2">
                <p className="text-slate-300">Rating</p>
                <p className="mt-0.5 inline-flex items-center gap-1 font-medium">
                  <Star size={12} className="text-amber-300" /> {profile.rating}
                </p>
              </div>
              <div className="rounded-lg bg-white/8 p-2">
                <p className="text-slate-300">Rides completed</p>
                <p className="mt-0.5 font-medium">{profile.ridesCompleted.toLocaleString()}</p>
              </div>
              <div className="rounded-lg bg-white/8 p-2">
                <p className="text-slate-300">Experience</p>
                <p className="mt-0.5 font-medium">{profile.yearsOfExperience} years</p>
              </div>
              <div className="rounded-lg bg-white/8 p-2">
                <p className="text-slate-300">Response time</p>
                <p className="mt-0.5 inline-flex items-center gap-1 font-medium">
                  <Clock3 size={12} /> {profile.responseTime}
                </p>
              </div>
              <div className="rounded-lg bg-white/8 p-2">
                <p className="text-slate-300">Response rate</p>
                <p className="mt-0.5 font-medium">{profile.responseRate}</p>
              </div>
              <div className="rounded-lg bg-white/8 p-2">
                <p className="text-slate-300">Joined</p>
                <p className="mt-0.5 inline-flex items-center gap-1 font-medium">
                  <CalendarDays size={12} /> {profile.joinedDate}
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-200">
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-700/60 px-2.5 py-1">
                <Car size={12} /> {profile.vehicleModel}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-700/60 px-2.5 py-1">
                {profile.ac ? "AC" : "Non-AC"}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-700/60 px-2.5 py-1">
                {profile.seats} seats
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-700/60 px-2.5 py-1">
                <Languages size={12} /> {profile.languages.join(", ")}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2 text-xs text-emerald-100">
              {profile.rideCategories.map((category) => (
                <span key={category} className="rounded-full bg-emerald-700/35 px-2.5 py-1 ring-1 ring-emerald-300/30">
                  {category}
                </span>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <Link href="/booking">
                <Button size="sm">Request Availability</Button>
              </Link>
              <Link href="/booking">
                <Button size="sm" variant="outline">Get Price</Button>
              </Link>
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-700/60 px-3 py-1 text-xs text-slate-200">
                <ShieldCheck size={12} /> Contact unlocks only after confirmation
              </span>
            </div>
          </div>

          <div className="grid grid-rows-3 gap-1">
            {profile.vehicleImages.slice(0, 3).map((image, idx) => (
              <div key={`${profile.slug}-gallery-${idx}`} className="relative min-h-28">
                <Image
                  src={image}
                  alt={`${profile.vehicleModel} gallery image ${idx + 1}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 28vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card className="mt-4 border-emerald-300/40 bg-emerald-500/10 p-4 text-sm text-emerald-100">
        <p className="font-semibold">SafeSobati trust protocol</p>
        <p className="mt-1 text-emerald-50/90">
          Driver and customer contact details are private during enquiry and comparison. Phone and
          WhatsApp details are shared only after a booking is confirmed by the customer.
        </p>
      </Card>
    </div>
  );
}
