import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, CarFront, Clock3, Languages, MapPin, MessageCircle, Sofa, Star } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { featuredDrivers } from "@/lib/constants";

export function FeaturedDriversSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Featured Drivers"
          title="Meet the trusted captains powering local mobility"
          description="Human-first profiles, verified identity, and transparent service quality for every booking."
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {featuredDrivers.map((driver, index) => (
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
                      <div className="rounded-lg bg-white/8 p-2">
                        <p className="text-slate-300">Rating</p>
                        <p className="mt-0.5 inline-flex items-center gap-1 font-medium">
                          <Star size={12} className="text-amber-300" /> {driver.rating}
                        </p>
                      </div>
                      <div className="rounded-lg bg-white/8 p-2">
                        <p className="text-slate-300">Rides completed</p>
                        <p className="mt-0.5 font-medium">{driver.ridesCompleted.toLocaleString()}</p>
                      </div>
                      <div className="rounded-lg bg-white/8 p-2">
                        <p className="text-slate-300">ETA</p>
                        <p className="mt-0.5 inline-flex items-center gap-1 font-medium">
                          <Clock3 size={12} /> {driver.eta}
                        </p>
                      </div>
                      <div className="rounded-lg bg-white/8 p-2">
                        <p className="text-slate-300">Response time</p>
                        <p className="mt-0.5 font-medium">{driver.responseTime}</p>
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
                      <span className="inline-flex items-center gap-1 rounded-full bg-slate-700/60 px-2.5 py-1">
                        <Languages size={12} /> {driver.languages.join(", ")}
                      </span>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <Link href="/booking">
                        <Button size="sm">Request Quote</Button>
                      </Link>
                      <Link
                        href={`https://wa.me/${driver.whatsapp}?text=Hi%20${encodeURIComponent(driver.name)}%2C%20I%20want%20a%20SafeSobati%20ride%20quote.`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Button size="sm" variant="secondary" className="bg-white/10 text-white ring-white/30 hover:bg-white/20">
                          <MessageCircle size={14} />
                          WhatsApp Driver
                        </Button>
                      </Link>
                    </div>
                  </div>

                  <div className="relative min-h-52 sm:min-h-full">
                    <Image
                      src={driver.vehicleImage}
                      alt={`${driver.vehicleModel} vehicle photo`}
                      fill
                      sizes="(max-width: 640px) 100vw, 40vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 to-transparent" />
                  </div>
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
