"use client";

import { useState } from "react";
import { BookingForm } from "@/components/forms/booking-form";
import { useLanguage } from "@/components/providers/language-provider";
import type { TranslationKey } from "@/lib/i18n";

const SIDEBAR_POINTS: TranslationKey[] = [
  "sidebar.point1",
  "sidebar.point2",
  "sidebar.point3",
  "sidebar.point4",
];

export function BookingShell() {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <>
      <div className="lg:col-span-3">
        {currentStep === 1 && (
          <div>
            <h1 className="font-display text-3xl font-semibold">{t("booking.pageTitle")}</h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              {t("booking.pageSubtitle")}
            </p>
          </div>
        )}
        <div className={currentStep === 1 ? "mt-6" : ""}>
          <BookingForm onStepChange={setCurrentStep} />
        </div>
      </div>

      <div className="hidden lg:col-span-2 lg:block">
        <div className="space-y-3 rounded-2xl border border-[color:var(--surface-border)] bg-[color:var(--surface)] p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted">
            {t("sidebar.whyTitle")}
          </p>
          {SIDEBAR_POINTS.map((key) => (
            <div key={key} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
              <span className="mt-0.5 text-brand">✓</span>
              <span>{t(key)}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
