import type { Metadata } from "next";
import { BadgeIndianRupee, ShieldCheck, UserRoundCheck } from "lucide-react";
import { DriverOnboardingForm } from "@/components/forms/driver-onboarding-form";
import { Card } from "@/components/ui/card";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(
  "Driver Registration",
  "Onboard as a verified SafeSobati driver and access quality local demand.",
  "/driver/register"
);

const benefits = [
  {
    title: "High-intent demand",
    description: "Quote-based bookings with serious riders and transparent trip details.",
    icon: BadgeIndianRupee,
  },
  {
    title: "Trust-first branding",
    description: "Get discovered by families and professionals who prioritize safety.",
    icon: ShieldCheck,
  },
  {
    title: "Professional profile",
    description: "Verified badges, ratings and driver performance scorecards.",
    icon: UserRoundCheck,
  },
];

export default function DriverRegistrationPage() {
  return (
    <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:px-8">
      <div>
        <h1 className="font-display text-3xl font-semibold">Join SafeSobati as a verified driver</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Launch your driver business with premium brand trust and reliable ride requests.
        </p>

        <div className="mt-6 grid gap-4">
          {benefits.map((item) => (
            <Card key={item.title}>
              <div className="mb-2 inline-flex rounded-lg bg-brand/10 p-2 text-brand-dark">
                <item.icon size={16} />
              </div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <DriverOnboardingForm />
      </div>
    </div>
  );
}
