import type { Metadata } from "next";
import { CheckCheck, FileCheck2, ShieldAlert, Users2 } from "lucide-react";
import { MarketplaceSnapshot } from "@/components/marketplace-snapshot";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AdminDriverApproval } from "@/components/admin-driver-approval";
import { dashboardMetrics } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(
  "Admin Dashboard",
  "Review driver verification, manage bookings and monitor marketplace quality.",
  "/admin/dashboard"
);

const queue = [
  { name: "Rohan B.", vehicle: "Auto", status: "KYC pending" },
  { name: "Fatima S.", vehicle: "Sedan", status: "Vehicle docs review" },
  { name: "Ganesh K.", vehicle: "SUV", status: "Police verification" },
];

export default function AdminDashboardPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-semibold">Admin operations dashboard</h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        Verification-first command center for trust, supply quality and booking health.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {dashboardMetrics.map((metric) => (
          <Card key={metric.title}>
            <p className="text-sm text-slate-600 dark:text-slate-300">{metric.title}</p>
            <p className="mt-1 text-2xl font-semibold">{metric.value}</p>
            <p className="mt-1 text-xs text-emerald-700">{metric.trend}</p>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card>
          <h3 className="inline-flex items-center gap-2 font-semibold">
            <FileCheck2 size={16} /> Driver verification queue
          </h3>
          <div className="mt-3 space-y-2 text-sm">
            {queue.map((item) => (
              <div key={item.name} className="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
                <p className="font-semibold">{item.name}</p>
                <p className="text-slate-500">{item.vehicle}</p>
                <Badge variant="neutral" className="mt-2">
                  {item.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="inline-flex items-center gap-2 font-semibold">
            <ShieldAlert size={16} /> Safety alerts
          </h3>
          <ul className="mt-3 list-disc space-y-2 pl-4 text-sm text-slate-600 dark:text-slate-300">
            <li>2 delayed check-ins flagged for proactive support outreach.</li>
            <li>1 route anomaly auto-escalated to safety desk.</li>
            <li>0 unresolved critical incidents.</li>
          </ul>
        </Card>

        <Card>
          <h3 className="inline-flex items-center gap-2 font-semibold">
            <Users2 size={16} /> Marketplace health
          </h3>
          <ul className="mt-3 list-disc space-y-2 pl-4 text-sm text-slate-600 dark:text-slate-300">
            <li>Driver acceptance rate: 86%</li>
            <li>Average quote response: 1m 48s</li>
            <li>Completed trip success: 97.2%</li>
          </ul>
          <button className="mt-4 inline-flex items-center gap-2 rounded-xl bg-brand px-3 py-2 text-sm font-semibold text-white">
            <CheckCheck size={14} /> Approve batch actions
          </button>
        </Card>
      </div>

      <AdminDriverApproval />

      <MarketplaceSnapshot title="Live operations snapshot" compact />
    </div>
  );
}
