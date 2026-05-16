import Image from "next/image";
import { Star } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { SectionHeading } from "@/components/section-heading";
import { Card } from "@/components/ui/card";
import { testimonials } from "@/lib/constants";

export function TestimonialsSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Customer Voices"
          title="Built for real riders, families and frequent travelers"
          description="Trust grows when riders see real people, verified drivers, and consistent service quality."
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <FadeIn key={item.name} delay={0.08 * index}>
              <Card className="h-full border-white/20 bg-slate-950/55 text-slate-100">
                <div className="mb-3 flex items-center gap-3">
                  <Image
                    src={item.avatar}
                    alt={`${item.name} customer profile`}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full object-cover ring-2 ring-white/25"
                  />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-xs text-slate-300">{item.role}</p>
                  </div>
                </div>
                <div className="mb-4 flex gap-1 text-amber-500">
                  {Array.from({ length: item.rating }).map((_, ratingIndex) => (
                    <Star key={ratingIndex} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="text-sm text-slate-200">&ldquo;{item.quote}&rdquo;</p>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
