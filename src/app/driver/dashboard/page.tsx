import type { Metadata } from "next";
import { BadgeIndianRupee, Car, Clock3, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { DriverWorkbench } from "@/components/driver-workbench";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(
  "Driver Dashboard",
  "Manage bookings, earnings and performance with a clean dashboard.",
  "/driver/dashboard"
);

const metrics = [
  { label: "Today earnings", value: "INR 3,420", icon: BadgeIndianRupee },
  { label: "Completed rides", value: "14", icon: Car },
  { label: "Online hours", value: "8h 40m", icon: Clock3 },
  { label: "Driver rating", value: "4.9", icon: Star },
];

export default function DriverDashboardPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-semibold">Driver dashboard</h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        Track performance, accept upcoming rides and monitor earnings in one place.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.label}>
            <div className="mb-3 inline-flex rounded-lg bg-brand/10 p-2 text-brand-dark">
              <metric.icon size={16} />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300">{metric.label}</p>
            <p className="mt-1 text-2xl font-semibold">{metric.value}</p>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card>
          <h2 className="font-semibold">Upcoming requests</h2>
          <div className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <p>Nanded Station to Shivaji Nagar, 9:40 AM, INR 280</p>
            <p>Hazur Sahib to Airport, 12:10 PM, INR 340</p>
            <p>Nanded to Basar, 2:00 PM, INR 1,420</p>
          </div>
        </Card>
        <Card>
          <h2 className="font-semibold">Performance notes</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-300">
            <li>Maintain low cancellation for better ranking.</li>
            <li>Keep profile photos and documents updated.</li>
            <li>Fast quote responses increase conversion rate.</li>
          </ul>
        </Card>
      </div>

      <DriverWorkbench />
    </div>
  );
}
