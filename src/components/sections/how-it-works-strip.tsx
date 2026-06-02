"use client";

import { BadgeCheck, CircleDotDashed, SendToBack } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";

const steps = [
  { icon: CircleDotDashed, titleKey: "how_step_1_title", descKey: "how_step_1_desc" },
  { icon: SendToBack, titleKey: "how_step_2_title", descKey: "how_step_2_desc" },
  { icon: BadgeCheck, titleKey: "how_step_3_title", descKey: "how_step_3_desc" },
] as const;

export function HowItWorksStrip() {
  const { t } = useLanguage();

  return (
    <div className="rounded-2xl border border-amber-200/70 bg-white p-4 dark:border-white/20 dark:bg-slate-800">
      <p className="text-xs font-semibold tracking-wide text-slate-700 dark:text-slate-200">
        {t("how_title")}
      </p>
      <div className="mt-3 grid gap-2 sm:grid-cols-3">
        {steps.map((step) => (
          <div key={step.titleKey} className="rounded-xl bg-white p-3 ring-1 ring-amber-200/70 dark:bg-slate-700 dark:ring-white/20">
            <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-800 dark:text-slate-100">
              <step.icon size={14} /> {t(step.titleKey)}
            </p>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">{t(step.descKey)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
