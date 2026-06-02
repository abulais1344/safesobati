"use client";

import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, CarFront, Clock3, Languages, MapPin, ShieldCheck, Sofa, Star } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { useLanguage } from "@/components/providers/language-provider";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { MarketplaceDriver } from "@/lib/marketplace-drivers";

type FeaturedDriversSectionProps = {
  drivers: MarketplaceDriver[];
};

export function FeaturedDriversSection({ drivers }: FeaturedDriversSectionProps) {
  const { t } = useLanguage();

  return (
    <section className="py-10 sm:py-14">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={t("featured_badge")}
          title={t("featured_title")}
          description={t("featured_desc")}
        />

        {drivers.length < 3 ? (
          <div className="mt-6 rounded-2xl border border-teal-200 bg-teal-50 p-8 text-center dark:border-teal-800 dark:bg-teal-950/30">
            <ShieldCheck size={40} className="mx-auto text-teal-600 dark:text-teal-400" />
            <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
              Verified drivers joining Nanded {/* TODO: add to i18n */}
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-600 dark:text-slate-300">
              We are onboarding and verifying local drivers. Check back soon or register as a driver. {/* TODO: add to i18n */}
            </p>
            <Link href="/driver/register" className="mt-5 inline-block">
              <Button variant="outline">Become a driver</Button> {/* TODO: add to i18n */}
            </Link>
          </div>
        ) : (
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {drivers.map((driver, index) => (
              <FadeIn key={driver.name} delay={0.06 * index}>
                <Card className="group overflow-hidden border-white/20 bg-slate-950/55 p-0 text-slate-100 transition duration-300 hover:-translate-y-0.5 hover:border-white/35">
                  <div className="grid gap-0 sm:grid-cols-[1.1fr_0.9fr]">
                    <div className="p-4 sm:p-5">
                      <div className="flex items-center gap-3">
                        <Image
                          src={driver.profileImage}
                          alt={`${driver.name} profile photo`}
                          width={72}
                          height={72}
                          className="h-16 w-16 rounded-2xl object-cover ring-2 ring-emerald-300/40"
                        />
                        <div>
                          <p className="text-lg font-semibold">{driver.name}</p>
                          <p className="text-xs text-slate-300">{driver.vehicleModel}</p>
                          <p className="mt-1 inline-flex items-center gap-1 text-xs text-emerald-300">
                            <BadgeCheck size={13} /> Verified by SafeSobati
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                        <div className="rounded-lg bg-slate-800 p-2">
                          <p className="text-slate-300">Rating</p>
                          <p className="mt-0.5 inline-flex items-center gap-1 font-medium">
                            <Star size={12} className="text-amber-300" /> {driver.rating}
                          </p>
                        </div>
                        <div className="rounded-lg bg-slate-800 p-2">
                          <p className="text-slate-300">Rides completed</p>
                          <p className="mt-0.5 font-medium">{driver.ridesCompleted.toLocaleString()}</p>
                        </div>
                        <div className="rounded-lg bg-slate-800 p-2">
                          <p className="text-slate-300">ETA</p>
                          <p className="mt-0.5 inline-flex items-center gap-1 font-medium">
                            <Clock3 size={12} /> {driver.eta}
                          </p>
                        </div>
                        <div className="rounded-lg bg-slate-800 p-2">
                          <p className="text-slate-300">Response time</p>
                          <p className="mt-0.5 font-medium">{driver.responseTime}</p>
                        </div>
                        <div className="rounded-lg bg-slate-800 p-2">
                          <p className="text-slate-300">Response rate</p>
                          <p className="mt-0.5 font-medium">{driver.responseRate}</p>
                        </div>
                        <div className="rounded-lg bg-slate-800 p-2">
                          <p className="text-slate-300">Experience</p>
                          <p className="mt-0.5 font-medium">{driver.yearsOfExperience} years</p>
                        </div>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-200">
                        <span className="inline-flex items-center gap-1 rounded-full bg-slate-700/60 px-2.5 py-1">
                          <CarFront size={12} /> {driver.ac ? "AC" : "Non-AC"}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-slate-700/60 px-2.5 py-1">
                          <Sofa size={12} /> {driver.seats} seats
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-slate-700/60 px-2.5 py-1">
                          <MapPin size={12} /> {driver.city}
                        </span>
                        {driver.languages.length > 0 ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-slate-700/60 px-2.5 py-1">
                            <Languages size={12} /> {driver.languages.join(", ")}
                          </span>
                        ) : null}
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-700/40 px-2.5 py-1 text-emerald-100">
                          {t("featured_response_chip")} {driver.responseTime}
                        </span>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <Link href={`/drivers/${driver.slug}`}>
                          <Button size="sm" variant="secondary" className="bg-slate-700 text-white ring-slate-600 hover:bg-slate-600">
                            {t("featured_compare")}
                          </Button>
                        </Link>
                        <Link href="/booking">
                          <Button size="sm">{t("featured_request_availability")}</Button>
                        </Link>
                      </div>
                    </div>

                    <div className="relative min-h-52 sm:min-h-full">
                      <Image
                        src={driver.vehicleImages[0]}
                        alt={`${driver.vehicleModel} vehicle photo`}
                        fill
                        sizes="(max-width: 640px) 100vw, 40vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 to-transparent" />
                      <div className="absolute bottom-2 left-2 right-2 flex gap-2">
                        {driver.vehicleImages.slice(1, 3).map((image, imgIndex) => (
                          <div key={`${driver.name}-thumb-${imgIndex}`} className="relative h-14 flex-1 overflow-hidden rounded-lg ring-1 ring-white/30">
                            <Image
                              src={image}
                              alt={`${driver.vehicleModel} view ${imgIndex + 2}`}
                              fill
                              sizes="120px"
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
