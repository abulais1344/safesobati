"use client";

import { FadeIn } from "@/components/motion/fade-in";
import { useLanguage } from "@/components/providers/language-provider";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { trustFeatures } from "@/lib/constants";

export function TrustSection() {
  const { t } = useLanguage();

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={t("trust_badge")}
          title={t("trust_title")}
          description={t("trust_desc")}
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {trustFeatures.map((feature, index) => (
            <FadeIn key={feature.title} delay={0.06 * index}>
              <Card>
                <div className="mb-4 inline-flex rounded-xl bg-emerald-100 p-2 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                  <feature.icon size={20} />
                </div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription className="mt-2">{feature.description}</CardDescription>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
