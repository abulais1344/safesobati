"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Clock3, MapPinned, Shield, Sparkles, Zap } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";

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
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,132,45,0.16),transparent_35%),radial-gradient(circle_at_15%_20%,rgba(234,88,12,0.2),transparent_30%),radial-gradient(circle_at_85%_15%,rgba(20,184,166,0.2),transparent_35%)]" />
      <div className="absolute -left-20 top-20 h-52 w-52 rounded-full bg-orange-400/25 blur-3xl" />
      <div className="absolute -right-16 top-8 h-60 w-60 rounded-full bg-teal-400/25 blur-3xl" />
      <div className="absolute inset-x-0 top-24 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <FadeIn>
            <Badge className="mb-3 w-fit bg-slate-900/90 text-amber-100 ring-1 ring-amber-300/30 dark:bg-slate-100 dark:text-slate-900">
              {t("hero_badge")}
            </Badge>
            <h1 className="max-w-4xl text-balance font-display text-3xl font-semibold leading-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
              {t("hero_headline")}
            </h1>
            <p className="mt-4 max-w-2xl text-pretty text-sm text-slate-700 sm:text-base dark:text-slate-200">
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
                <Button size="lg" variant="secondary" className="bg-slate-900 text-amber-50 ring-slate-800 hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:ring-slate-200 dark:hover:bg-white">
                  {t("hero_cta_secondary")}
                </Button>
              </Link>
            </div>
            <div className="mt-5 flex flex-wrap gap-3 text-xs text-slate-700 sm:text-sm dark:text-slate-200">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1.5 ring-1 ring-amber-200/70 backdrop-blur-xl dark:bg-white/10 dark:ring-white/20">
                <Shield size={14} /> {t("hero_chip_verified")}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1.5 ring-1 ring-amber-200/70 backdrop-blur-xl dark:bg-white/10 dark:ring-white/20">
                <Zap size={14} /> {t("hero_chip_hire")}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1.5 ring-1 ring-amber-200/70 backdrop-blur-xl dark:bg-white/10 dark:ring-white/20">
                <MapPinned size={14} /> {t("hero_chip_routes")}
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="rounded-3xl border border-amber-200/60 bg-white/70 p-3 backdrop-blur-2xl dark:border-white/20 dark:bg-white/10">
              <div className="relative overflow-hidden rounded-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80"
                  alt="Trusted taxi and ride services for local travel"
                  width={1200}
                  height={900}
                  className="h-56 w-full object-cover sm:h-72"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/10 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 rounded-xl bg-slate-950/70 p-3 text-white ring-1 ring-white/20 backdrop-blur-xl">
                  <p className="text-xs text-amber-300">{t("hero_live_tag")}</p>
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
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-200">
                <div className="rounded-xl bg-white/80 px-3 py-2 ring-1 ring-amber-200 dark:bg-white/10 dark:ring-white/20">{t("hero_tile_wedding")}</div>
                <div className="rounded-xl bg-white/80 px-3 py-2 ring-1 ring-amber-200 dark:bg-white/10 dark:ring-white/20">{t("hero_tile_hospital")}</div>
                <div className="rounded-xl bg-white/80 px-3 py-2 ring-1 ring-amber-200 dark:bg-white/10 dark:ring-white/20">{t("hero_tile_airport")}</div>
                <div className="rounded-xl bg-white/80 px-3 py-2 ring-1 ring-amber-200 dark:bg-white/10 dark:ring-white/20">{t("hero_tile_rates")}</div>
              </div>
            </div>
          </FadeIn>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {heroStats.map((item, index) => (
            <FadeIn key={index} delay={0.05 * index}>
              <div className="rounded-2xl border border-amber-200/80 bg-white/80 p-4 text-slate-900 backdrop-blur-2xl dark:border-white/20 dark:bg-white/10 dark:text-white">
                <p className="text-2xl font-semibold sm:text-3xl">{item.value}</p>
                <p className="mt-1 text-xs text-slate-600 sm:text-sm dark:text-slate-200">{t(statKeys[index])}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-4" delay={0.12}>
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/70 bg-amber-100 px-4 py-2 text-xs font-medium text-amber-900 dark:border-amber-300/30 dark:bg-amber-500/20 dark:text-amber-100">
            <Sparkles size={14} />
            {t("hero_sparkle")}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
