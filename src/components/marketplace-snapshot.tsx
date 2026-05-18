"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatedNumber } from "@/components/animated-number";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { MarketplaceMetrics } from "@/lib/marketplace-metrics";

type MarketplaceSnapshotProps = {
  title?: string;
  compact?: boolean;
};

export function MarketplaceSnapshot({
  title = "Live Marketplace Snapshot",
  compact = false,
}: MarketplaceSnapshotProps) {
  const [metrics, setMetrics] = useState<MarketplaceMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadMetrics = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/marketplace/metrics", { method: "GET", cache: "no-store" });
        const data = await response.json();

        if (!response.ok || !isMounted) {
          return;
        }

        setMetrics(data);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadMetrics();
    const interval = window.setInterval(loadMetrics, 30000);

    return () => {
      isMounted = false;
      window.clearInterval(interval);
    };
  }, []);

  const cards = useMemo(
    () => [
      { label: "Approved drivers", value: metrics?.driversApproved ?? 0 },
      { label: "Drivers online", value: metrics?.driversAvailable ?? 0 },
      { label: "Ride requests", value: metrics?.rideRequests ?? 0 },
      { label: "Active quotes", value: metrics?.activeQuotes ?? 0 },
      { label: "Confirmed rides", value: metrics?.confirmedRides ?? 0 },
      { label: "Active cities", value: metrics?.citiesActive ?? 0 },
    ],
    [metrics]
  );

  return (
    <section className={compact ? "mt-6" : "mt-10"}>
      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-semibold">{title}</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Real-time marketplace activity from SafeSobati production schema.
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Card key={card.label} className={compact ? "p-4" : "p-5"}>
            <p className="text-sm text-slate-600 dark:text-slate-300">{card.label}</p>
            {loading ? (
              <Skeleton className="mt-2 h-9 w-20" />
            ) : (
              <p className="mt-1 text-3xl font-semibold">
                <AnimatedNumber value={card.value} />
              </p>
            )}
          </Card>
        ))}
      </div>
    </section>
  );
}
