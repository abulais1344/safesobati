import type { Metadata } from "next";
import { FileCheck2, ShieldAlert, Users2 } from "lucide-react";
import { MarketplaceSnapshot } from "@/components/marketplace-snapshot";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AdminDriverApproval } from "@/components/admin-driver-approval";
import { AdminDriverKitManager } from "@/components/admin-driver-kit-manager";
import { AdminPopularRoutesManager } from "@/components/admin-popular-routes-manager";
import { buildMetadata } from "@/lib/seo";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = buildMetadata(
  "Admin Dashboard",
  "Review driver verification, manage bookings and monitor marketplace quality.",
  "/admin/dashboard"
);

type DashboardMetric = {
  title: string;
  value: string;
  trend: string;
};

type QueueDriver = {
  id: string;
  status: string;
  users?: {
    name: string;
  } | null;
  vehicles: Array<{
    vehicle_type: string;
  }>;
};

async function getDashboardData() {
  const supabase = await createSupabaseServerClient();

  const [
    bookingsRes,
    approvedDriversRes,
    pendingDriversRes,
    avgRatingRes,
    queueRes,
    overdueRidesRes,
    cancelledRidesRes,
    openRequestsRes,
    acceptedQuotesRes,
    totalQuotesRes,
    completedRidesRes,
    totalDriversRes,
  ] = await Promise.all([
    supabase.from("ride_requests").select("id", { count: "exact", head: true }),
    supabase.from("drivers").select("id", { count: "exact", head: true }).eq("status", "approved"),
    supabase.from("drivers").select("id", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("drivers").select("rating"),
    supabase
      .from("drivers")
      .select("id, status, users!drivers_user_id_fkey(name), vehicles(vehicle_type)")
      .in("status", ["pending", "rejected"])
      .order("created_at", { ascending: false })
      .limit(5),
    // Safety: rides past their scheduled date still open
    supabase
      .from("ride_requests")
      .select("id", { count: "exact", head: true })
      .in("status", ["pending", "responded"])
      .lt("date", new Date().toISOString()),
    // Safety: total cancelled bookings
    supabase.from("ride_requests").select("id", { count: "exact", head: true }).eq("status", "cancelled"),
    // Safety: open requests awaiting any quote
    supabase.from("ride_requests").select("id", { count: "exact", head: true }).eq("status", "pending"),
    // Health: accepted driver quotes
    supabase.from("driver_quotes").select("id", { count: "exact", head: true }).eq("status", "accepted"),
    // Health: all driver quotes submitted
    supabase.from("driver_quotes").select("id", { count: "exact", head: true }),
    // Health: completed rides
    supabase.from("ride_requests").select("id", { count: "exact", head: true }).eq("status", "completed"),
    // Health: total drivers (for active ratio)
    supabase.from("drivers").select("id", { count: "exact", head: true }),
  ]);

  const ratings = (avgRatingRes.data ?? [])
    .map((row) => Number((row as { rating: number | string }).rating))
    .filter((value) => Number.isFinite(value));

  const averageRating = ratings.length
    ? (ratings.reduce((sum, value) => sum + value, 0) / ratings.length).toFixed(1)
    : "-";

  const metrics: DashboardMetric[] = [
    {
      title: "Total Bookings",
      value: String(bookingsRes.count ?? 0),
      trend: "Live",
    },
    {
      title: "Verified Drivers",
      value: String(approvedDriversRes.count ?? 0),
      trend: "Approved",
    },
    {
      title: "Pending Verification",
      value: String(pendingDriversRes.count ?? 0),
      trend: "Awaiting review",
    },
    {
      title: "Avg Rider Rating",
      value: averageRating,
      trend: ratings.length ? `${ratings.length} drivers` : "No ratings yet",
    },
  ];

  const overdue = overdueRidesRes.count ?? 0;
  const cancelled = cancelledRidesRes.count ?? 0;
  const openRequests = openRequestsRes.count ?? 0;

  const acceptedQuotes = acceptedQuotesRes.count ?? 0;
  const totalQuotes = totalQuotesRes.count ?? 0;
  const completedRides = completedRidesRes.count ?? 0;
  const approvedDrivers = approvedDriversRes.count ?? 0;
  const totalDrivers = totalDriversRes.count ?? 0;

  const quoteAcceptanceRate =
    totalQuotes > 0 ? Math.round((acceptedQuotes / totalQuotes) * 100) : null;
  const completionRate =
    completedRides + cancelled > 0
      ? Math.round((completedRides / (completedRides + cancelled)) * 100)
      : null;

  return {
    metrics,
    queue: (queueRes.data as QueueDriver[] | null) ?? [],
    safety: { overdue, cancelled, openRequests },
    health: { quoteAcceptanceRate, completionRate, approvedDrivers, totalDrivers },
  };
}

export default async function AdminDashboardPage() {
  const { metrics, queue, safety, health } = await getDashboardData();

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-semibold">Admin operations dashboard</h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        Verification-first command center for trust, supply quality and booking health.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
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
            {queue.length === 0 ? (
              <p className="text-slate-500">No pending records.</p>
            ) : (
              queue.map((item) => (
                <div key={item.id} className="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
                  <p className="font-semibold">{item.users?.name ?? "Driver"}</p>
                  <p className="text-slate-500">{item.vehicles?.[0]?.vehicle_type ?? "Vehicle pending"}</p>
                  <Badge variant="neutral" className="mt-2 capitalize">
                    {item.status}
                  </Badge>
                </div>
              ))
            )}
          </div>
        </Card>

        <Card>
          <h3 className="inline-flex items-center gap-2 font-semibold">
            <ShieldAlert size={16} /> Safety alerts
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li className="flex items-start gap-2">
              <span className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${safety.overdue > 0 ? "bg-red-500" : "bg-emerald-500"}`} />
              <span>
                <strong>{safety.overdue}</strong> overdue ride{safety.overdue !== 1 ? "s" : ""} past scheduled time still open.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${safety.openRequests > 0 ? "bg-amber-500" : "bg-emerald-500"}`} />
              <span>
                <strong>{safety.openRequests}</strong> open request{safety.openRequests !== 1 ? "s" : ""} awaiting driver quotes.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-slate-400" />
              <span>
                <strong>{safety.cancelled}</strong> total cancelled booking{safety.cancelled !== 1 ? "s" : ""} on record.
              </span>
            </li>
          </ul>
        </Card>

        <Card>
          <h3 className="inline-flex items-center gap-2 font-semibold">
            <Users2 size={16} /> Marketplace health
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
              <span>
                Driver acceptance rate:{" "}
                <strong>{health.quoteAcceptanceRate !== null ? `${health.quoteAcceptanceRate}%` : "—"}</strong>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
              <span>
                Completed trip success:{" "}
                <strong>{health.completionRate !== null ? `${health.completionRate}%` : "—"}</strong>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
              <span>
                Active drivers:{" "}
                <strong>{health.approvedDrivers}</strong> of <strong>{health.totalDrivers}</strong> registered.
              </span>
            </li>
          </ul>
        </Card>
      </div>

      <AdminDriverApproval />
      <AdminDriverKitManager />
      <AdminPopularRoutesManager />

      <MarketplaceSnapshot title="Live operations snapshot" compact />
    </div>
  );
}
