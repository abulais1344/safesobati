import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Clock3, Route } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { SectionHeading } from "@/components/section-heading";
import { Card } from "@/components/ui/card";
import { popularRoutes } from "@/lib/constants";

export function PopularRoutesSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Popular Destinations"
          title="Visual route marketplace with predictable pricing"
          description="Browse high-demand corridors with estimated travel times and verified quote starting prices."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {popularRoutes.map((route, index) => (
            <FadeIn key={`${route.from}-${route.to}`} delay={0.04 * index}>
              <Card className="group overflow-hidden p-0 transition duration-300 hover:-translate-y-1 hover:border-white/60 hover:shadow-[0_28px_55px_-30px_rgba(15,118,110,0.55)]">
                <div className="relative">
                  <Image
                    src={route.image}
                    alt={`${route.from} to ${route.to} route preview`}
                    width={1200}
                    height={800}
                    className="h-40 w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-slate-900/10 to-transparent" />
                  <div className="absolute bottom-3 left-3 rounded-full bg-slate-950/70 px-3 py-1 text-xs text-slate-100 ring-1 ring-white/20">
                    {route.distance}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold">
                    {route.from} to {route.to}
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-600 dark:text-slate-300">
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-500/10 px-2.5 py-1">
                      <Clock3 size={12} /> {route.travelTime}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-500/10 px-2.5 py-1">
                      <Route size={12} /> High demand corridor
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">Starting quote {route.baseFare}</p>
                </div>
                <Link
                  href="/booking"
                  className="mx-4 mb-4 inline-flex items-center gap-1 text-sm font-semibold text-brand transition group-hover:translate-x-0.5"
                >
                  Book this route
                  <ArrowUpRight size={14} />
                </Link>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
