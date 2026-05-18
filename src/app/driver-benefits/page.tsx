import type { Metadata } from "next";
import { BadgeCheck, Handshake, Plane, Shield, Users, Video } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(
  "Driver Benefits",
  "Join the SafeSobati Verified Driver Partner program and access trusted leads, airport rides, wedding trips, and premium visibility.",
  "/driver-benefits"
);

const benefits = [
  {
    title: "More customers",
    description: "Get verified local ride enquiries from trusted families and professionals.",
    icon: Users,
  },
  {
    title: "Airport rides",
    description: "Priority visibility for high-value airport transfers and outstation corridors.",
    icon: Plane,
  },
  {
    title: "Wedding trips",
    description: "Capture premium wedding, event, and family booking demand.",
    icon: Handshake,
  },
  {
    title: "Verified badge",
    description: "Stand out as a SafeSobati Verified Driver Partner in customer-facing cards.",
    icon: BadgeCheck,
  },
  {
    title: "Support",
    description: "Structured onboarding and WhatsApp-led support communication.",
    icon: Video,
  },
  {
    title: "Trust network",
    description: "Be part of a local, trusted partner network with long-term lead consistency.",
    icon: Shield,
  },
];

export default function DriverBenefitsPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-semibold">Verified Driver Partner Program</h1>
      <p className="mt-2 max-w-3xl text-sm text-slate-600 dark:text-slate-300">
        Many drivers join platforms for trust, status, and consistent leads. SafeSobati&apos;s professional onboarding
        gives you all three.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map((item) => (
          <Card key={item.title}>
            <div className="mb-2 inline-flex rounded-lg bg-brand/10 p-2 text-brand-dark">
              <item.icon size={16} />
            </div>
            <h2 className="font-semibold">{item.title}</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <h2 className="text-lg font-semibold">Driver kit after approval</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-300">
          <li>Welcome WhatsApp message</li>
          <li>Onboarding guide (downloadable)</li>
          <li>Verified partner badge / sticker image</li>
          <li>Onboarding video link</li>
        </ol>

        <div className="mt-4 flex flex-wrap gap-2">
          <a href="/api/driver-kit/onboarding-pdf" target="_blank" rel="noreferrer">
            <Button size="sm" variant="secondary">Download onboarding guide (PDF)</Button>
          </a>
          <a href="/driver-kit/verified-driver-partner-badge.svg" target="_blank" rel="noreferrer">
            <Button size="sm" variant="secondary">Download badge</Button>
          </a>
          <a href="/driver-benefits/video">
            <Button size="sm">Watch onboarding video</Button>
          </a>
        </div>
      </Card>
    </div>
  );
}
