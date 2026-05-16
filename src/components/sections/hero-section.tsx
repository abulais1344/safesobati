"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Clock3, MapPinned, Shield, Sparkles, Zap } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { RideSearchForm } from "@/components/forms/ride-search-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { heroStats } from "@/lib/constants";
import { useLanguage } from "@/components/providers/language-provider";

const statKeys = [
  "stat_verified_drivers",
  "stat_cities",
  "stat_pickup_time",
  "stat_safety_rating",
] as const;

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden pt-6 sm:pt-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_20%,rgba(45,212,191,0.18),transparent_34%),radial-gradient(circle_at_88%_12%,rgba(59,130,246,0.22),transparent_32%)]" />
      <div className="absolute -left-20 top-20 h-52 w-52 rounded-full bg-teal-400/20 blur-3xl" />
      <div className="absolute -right-16 top-8 h-60 w-60 rounded-full bg-sky-400/25 blur-3xl" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <FadeIn>
            <Badge className="mb-3 w-fit bg-emerald-500/20 text-emerald-200 ring-1 ring-emerald-300/30">
              {t("hero_badge")}
            </Badge>
            <h1 className="max-w-4xl text-balance font-display text-3xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              {t("hero_headline")}
            </h1>
            <p className="mt-4 max-w-2xl text-pretty text-sm text-slate-200 sm:text-base">
              {t("hero_desc")}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/booking">
                <Button size="lg">
                  {t("hero_cta_primary")}
                  <ArrowRight size={16} />
                </Button>
              </Link>
              <Link href="/search">
                <Button size="lg" variant="secondary" className="bg-white/10 text-white ring-white/30 hover:bg-white/20">
                  {t("hero_cta_secondary")}
                </Button>
              </Link>
            </div>
            <div className="mt-5 flex flex-wrap gap-3 text-xs text-slate-200 sm:text-sm">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 ring-1 ring-white/20 backdrop-blur-xl">
                <Shield size={14} /> {t("hero_chip_verified")}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 ring-1 ring-white/20 backdrop-blur-xl">
                <Zap size={14} /> {t("hero_chip_hire")}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 ring-1 ring-white/20 backdrop-blur-xl">
                <MapPinned size={14} /> {t("hero_chip_routes")}
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="rounded-3xl border border-white/20 bg-white/10 p-3 backdrop-blur-2xl">
              <div className="relative overflow-hidden rounded-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=80"
                  alt="Premium local cab available for city rides"
                  width={1200}
                  height={900}
                  className="h-56 w-full object-cover sm:h-72"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/10 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 rounded-xl bg-slate-950/65 p-3 text-white ring-1 ring-white/20 backdrop-blur-xl">
                  <p className="text-xs text-emerald-300">{t("hero_live_tag")}</p>
                  <p className="text-sm font-semibold">{t("hero_live_drivers")}</p>
                  <div className="mt-1 flex items-center gap-3 text-xs text-slate-200">
                    <span className="inline-flex items-center gap-1">
                      <Clock3 size={12} /> {t("hero_live_response")}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <CheckCircle2 size={12} /> {t("hero_live_rated")}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-200">
                <div className="rounded-xl bg-white/10 px-3 py-2 ring-1 ring-white/20">{t("hero_tile_wedding")}</div>
                <div className="rounded-xl bg-white/10 px-3 py-2 ring-1 ring-white/20">{t("hero_tile_hospital")}</div>
                <div className="rounded-xl bg-white/10 px-3 py-2 ring-1 ring-white/20">{t("hero_tile_airport")}</div>
                <div className="rounded-xl bg-white/10 px-3 py-2 ring-1 ring-white/20">{t("hero_tile_rates")}</div>
              </div>
            </div>
          </FadeIn>
        </div>

        <FadeIn className="mt-6" delay={0.1}>
          <RideSearchForm />
        </FadeIn>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {heroStats.map((item, index) => (
            <FadeIn key={index} delay={0.05 * index}>
              <div className="rounded-2xl border border-white/20 bg-white/10 p-4 text-white backdrop-blur-2xl">
                <p className="text-2xl font-semibold sm:text-3xl">{item.value}</p>
                <p className="mt-1 text-xs text-slate-200 sm:text-sm">{t(statKeys[index])}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-4" delay={0.12}>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-500/20 px-4 py-2 text-xs font-medium text-emerald-100">
            <Sparkles size={14} />
            {t("hero_sparkle")}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
