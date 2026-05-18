"use client";

import Link from "next/link";
import { ArrowRight, BadgeIndianRupee, ShieldCheck } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { useLanguage } from "@/components/providers/language-provider";
import { Button } from "@/components/ui/button";

export function DriverCTASection() {
  const { t } = useLanguage();

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="overflow-hidden rounded-3xl bg-slate-900 p-8 text-white sm:p-10">
            <div className="max-w-3xl">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs">
                <ShieldCheck size={14} /> {t("driver_cta_badge")}
              </p>
              <h3 className="mt-4 text-3xl font-semibold sm:text-4xl">
                {t("driver_cta_title")}
              </h3>
              <p className="mt-3 text-sm text-slate-300 sm:text-base">
                {t("driver_cta_desc")}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/driver/register">
                  <Button variant="default" size="lg">
                    {t("driver_cta_primary")}
                    <ArrowRight size={16} />
                  </Button>
                </Link>
                <Link href="/driver/dashboard">
                  <Button variant="secondary" size="lg">
                    <BadgeIndianRupee size={16} />
                    {t("driver_cta_secondary")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
