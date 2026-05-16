import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  Clock3,
  Filter,
  Languages,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Sofa,
  Snowflake,
  Star,
} from "lucide-react";
import { MarketplaceSnapshot } from "@/components/marketplace-snapshot";
import { RideSearchForm } from "@/components/forms/ride-search-form";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";
import { featuredDrivers } from "@/lib/constants";

export const metadata: Metadata = buildMetadata(
  "Search Rides",
  "Search and compare trusted local ride options from verified drivers.",
  "/search"
);

const quoteHints = ["INR 170", "INR 220", "INR 260", "INR 310"];

export default function SearchPage() {
  const results = featuredDrivers.map((driver, index) => ({
    ...driver,
    quote: quoteHints[index % quoteHints.length],
  }));

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-white/15 bg-slate-950/55 p-4 text-slate-100 backdrop-blur-2xl sm:p-6">
        <h1 className="font-display text-3xl font-semibold">Search trusted rides</h1>
        <p className="mt-2 text-sm text-slate-300">
          Compare verified driver profiles, get instant quote responses, and book with full local trust.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge className="bg-emerald-500/20 text-emerald-200 ring-1 ring-emerald-300/30">
            <ShieldCheck size={13} /> Only verified drivers
          </Badge>
          <Badge className="bg-sky-500/20 text-sky-200 ring-1 ring-sky-300/30">Live ETA and response time</Badge>
        </div>
      </div>

      <div className="mt-4">
        <RideSearchForm compact />
      </div>

      <div className="mt-5 flex items-center justify-between">
        <Badge variant="neutral">Showing verified results near your pickup</Badge>
        <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200/50 bg-white/10 px-3 py-2 text-sm text-slate-100 backdrop-blur-xl">
          <Filter size={15} />
          Filters
        </button>
      </div>

      <div className="mt-4 grid gap-3">
        {results.map((item, index) => (
          <Card
            key={item.name}
            className="group overflow-hidden border-white/15 bg-slate-950/55 p-0 text-slate-100 transition duration-300 hover:-translate-y-0.5 hover:border-white/30"
          >
            <div className="grid gap-0 sm:grid-cols-[1.45fr_0.55fr]">
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <Image
                    src={item.profileImage}
                    alt={`${item.name} profile photo`}
                    width={62}
                    height={62}
                    className="h-14 w-14 rounded-2xl object-cover ring-2 ring-emerald-300/35"
                  />

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-base font-semibold sm:text-lg">{item.name}</p>
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[11px] text-emerald-200 ring-1 ring-emerald-300/30">
                        <BadgeCheck size={12} /> Verified
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-slate-300 sm:text-sm">{item.vehicleModel}</p>

                    <div className="mt-2 flex flex-wrap gap-1.5 text-[11px] text-slate-200 sm:text-xs">
                      <span className="inline-flex items-center gap-1 rounded-full bg-slate-500/20 px-2 py-1">
                        <Snowflake size={12} /> {item.ac ? "AC" : "Non-AC"}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-slate-500/20 px-2 py-1">
                        <Sofa size={12} /> {item.seats} seats
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-slate-500/20 px-2 py-1">
                        <MapPin size={12} /> {item.city}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
                  <div className="rounded-lg bg-white/6 p-2">
                    <p className="text-slate-300">Rating</p>
                    <p className="mt-0.5 inline-flex items-center gap-1 font-medium">
                      <Star size={12} className="text-amber-300" /> {item.rating}
                    </p>
                  </div>
                  <div className="rounded-lg bg-white/6 p-2">
                    <p className="text-slate-300">Rides</p>
                    <p className="mt-0.5 font-medium">{item.ridesCompleted.toLocaleString()}</p>
                  </div>
                  <div className="rounded-lg bg-white/6 p-2">
                    <p className="text-slate-300">ETA</p>
                    <p className="mt-0.5 inline-flex items-center gap-1 font-medium">
                      <MapPin size={12} /> {item.eta}
                    </p>
                  </div>
                  <div className="rounded-lg bg-white/6 p-2">
                    <p className="text-slate-300">Response</p>
                    <p className="mt-0.5 inline-flex items-center gap-1 font-medium">
                      <Clock3 size={12} /> {item.responseTime}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-200">
                  <span className="inline-flex items-center gap-1 rounded-full bg-sky-500/15 px-2.5 py-1 text-sky-200">
                    <Languages size={12} /> {item.languages.join(", ")}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-1 text-emerald-200">
                    <ShieldCheck size={12} /> Only verified drivers
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Link href="/booking">
                    <Button size="sm">Request Quote</Button>
                  </Link>
                  <Link
                    href={`https://wa.me/${item.whatsapp}?text=Hi%20${encodeURIComponent(item.name)}%2C%20I%20need%20a%20ride%20quote%20from%20SafeSobati.`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button size="sm" variant="secondary" className="bg-white/10 text-white ring-white/30 hover:bg-white/20">
                      <MessageCircle size={14} />
                      WhatsApp Driver
                    </Button>
                  </Link>
                  <p className="ml-auto text-right text-sm text-slate-300 sm:text-base">
                    Starting <span className="font-semibold text-white">{item.quote}</span>
                  </p>
                </div>
              </div>

              <div className="relative min-h-40">
                <Image
                  src={item.vehicleImage}
                  alt={`${item.vehicleModel} thumbnail`}
                  fill
                  sizes="(max-width: 640px) 100vw, 28vw"
                  className="object-cover"
                  priority={index < 2}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <MarketplaceSnapshot title="Live demand and supply" compact />
    </div>
  );
}
