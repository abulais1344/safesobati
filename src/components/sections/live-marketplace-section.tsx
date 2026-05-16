import { Clock3, MessageCircle, ShieldCheck } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { MarketplaceSnapshot } from "@/components/marketplace-snapshot";
import { SectionHeading } from "@/components/section-heading";
import { Card } from "@/components/ui/card";
import { recentBookings } from "@/lib/constants";

export async function LiveMarketplaceSection() {
  return (
    <section className="py-14 sm:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Live Marketplace"
          title="Marketplace energy you can feel before booking"
          description="Real-time driver supply with recent booking activity builds confidence and urgency."
        />

        <div className="mt-8 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-white/15 bg-slate-950/45 p-4 backdrop-blur-2xl">
            <MarketplaceSnapshot title="SafeSobati Live Activity" compact />
          </div>

          <FadeIn delay={0.1}>
            <Card className="h-full border-white/20 bg-slate-950/55 p-4 text-slate-100">
              <p className="text-sm font-semibold">Recent bookings</p>
              <p className="mt-1 text-xs text-slate-300">Updated from active city requests and accepted quotes.</p>

              <div className="mt-4 space-y-3">
                {recentBookings.map((booking) => (
                  <div
                    key={`${booking.rider}-${booking.route}`}
                    className="rounded-xl border border-white/10 bg-white/5 p-3"
                  >
                    <p className="text-sm font-medium">{booking.route}</p>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-300">
                      <span>{booking.rider}</span>
                      <span className="text-slate-500">•</span>
                      <span>{booking.fare}</span>
                      <span className="text-slate-500">•</span>
                      <span>{booking.bookedAgo}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 grid grid-cols-1 gap-2 text-xs sm:grid-cols-3">
                <div className="rounded-lg bg-emerald-400/15 p-2 text-emerald-200">
                  <p className="inline-flex items-center gap-1">
                    <ShieldCheck size={12} /> Verified first
                  </p>
                </div>
                <div className="rounded-lg bg-sky-400/15 p-2 text-sky-200">
                  <p className="inline-flex items-center gap-1">
                    <Clock3 size={12} /> Fast ETA cards
                  </p>
                </div>
                <div className="rounded-lg bg-teal-400/15 p-2 text-teal-200">
                  <p className="inline-flex items-center gap-1">
                    <MessageCircle size={12} /> WhatsApp ready
                  </p>
                </div>
              </div>
            </Card>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
