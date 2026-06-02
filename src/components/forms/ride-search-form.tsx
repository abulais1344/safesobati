"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { searchRideSchema, type SearchRideInput } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/components/providers/language-provider";
import type { TranslationKey } from "@/lib/i18n";

const tripTypeKeys: { value: string; key: TranslationKey }[] = [
  { value: "city", key: "trip_city" },
  { value: "full_day", key: "trip_full_day" },
  { value: "half_day", key: "trip_half_day" },
  { value: "evening", key: "trip_evening" },
  { value: "hospital", key: "trip_hospital" },
  { value: "airport", key: "trip_airport" },
  { value: "station", key: "trip_station" },
  { value: "outstation", key: "trip_outstation" },
  { value: "religious", key: "trip_religious" },
];

type RideSearchFormProps = {
  compact?: boolean;
  showAdvancedByDefault?: boolean;
};

function getDefaultRideDate() {
  const date = new Date();
  date.setMinutes(date.getMinutes() + 45);
  date.setSeconds(0, 0);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function RideSearchForm({ compact = false, showAdvancedByDefault = false }: RideSearchFormProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { t } = useLanguage();
  const [showAdvanced, setShowAdvanced] = useState(showAdvancedByDefault);
  const defaultRideDate = useMemo(() => getDefaultRideDate(), []);
  const tripTypes = tripTypeKeys.map((item) => item.value) as SearchRideInput["tripType"][];
  const queryTripType = searchParams.get("tripType") ?? "city";
  const tripType: SearchRideInput["tripType"] = tripTypes.includes(queryTripType as SearchRideInput["tripType"])
    ? (queryTripType as SearchRideInput["tripType"])
    : "city";
  const queryPassengers = Number(searchParams.get("passengers") ?? 1);
  const passengers = Number.isFinite(queryPassengers) ? Math.max(1, Math.min(8, queryPassengers)) : 1;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SearchRideInput>({
    resolver: zodResolver(searchRideSchema),
    defaultValues: {
      pickup: searchParams.get("pickup") ?? "",
      drop: searchParams.get("drop") ?? "",
      tripType,
      rideDate: searchParams.get("rideDate") ?? defaultRideDate,
      passengers,
    },
  });

  const onSubmit = (data: SearchRideInput) => {
    const params = new URLSearchParams({
      pickup: data.pickup,
      drop: data.drop,
      tripType: data.tripType,
      rideDate: data.rideDate,
      passengers: String(data.passengers),
    });

    const targetPath = pathname === "/search" ? pathname : "/search";
    router.push(`${targetPath}?${params.toString()}`);
  };

  return (
    <Card className={compact ? "p-4" : "p-5 sm:p-6"}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_auto]">
          <div>
            <Input placeholder={t("search_pickup")} {...register("pickup")} />
            {errors.pickup ? <p className="mt-1 text-xs text-rose-600">{errors.pickup.message}</p> : null}
          </div>

          <div>
            <Input placeholder={t("search_drop")} {...register("drop")} />
            {errors.drop ? <p className="mt-1 text-xs text-rose-600">{errors.drop.message}</p> : null}
          </div>

          <div className="flex items-center gap-2 sm:col-span-2 lg:col-span-1">
            <Button type="submit" className="h-11 flex-1 lg:min-w-32" disabled={isSubmitting}>
              <Search size={16} />
              {isSubmitting ? "..." : t("search_btn")}
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="h-11"
              onClick={() => setShowAdvanced((open) => !open)}
              aria-expanded={showAdvanced}
            >
              {t("search_advanced")}
              {showAdvanced ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </Button>
          </div>
        </div>

        <div className={`${showAdvanced ? "grid" : "hidden"} gap-3 sm:grid-cols-2 lg:grid-cols-3`}>
            <div>
              <select
                className="h-11 w-full rounded-xl border border-amber-200/80 bg-white px-3 text-sm text-slate-900 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                {...register("tripType")}
              >
                {tripTypeKeys.map((item) => (
                  <option key={item.value} value={item.value}>
                    {t(item.key)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Input type="datetime-local" {...register("rideDate")} />
              {errors.rideDate ? <p className="mt-1 text-xs text-rose-600">{errors.rideDate.message}</p> : null}
            </div>

            <div>
              <Input
                type="number"
                min={1}
                max={8}
                placeholder={t("search_passengers")}
                {...register("passengers", { valueAsNumber: true })}
              />
            </div>
        </div>

        <div className="text-xs text-slate-600 dark:text-slate-300">
          {!showAdvanced ? t("search_advanced_hint") : t("search_result_msg")}
        </div>
      </form>
    </Card>
  );
}
