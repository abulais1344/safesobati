"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
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
};

export function RideSearchForm({ compact = false }: RideSearchFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const { t } = useLanguage();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SearchRideInput>({
    resolver: zodResolver(searchRideSchema),
    defaultValues: {
      pickup: "",
      drop: "",
      tripType: "city",
      rideDate: "",
      passengers: 1,
    },
  });

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 650));
    setSubmitted(true);
  };

  return (
    <Card className={compact ? "p-4" : "p-5 sm:p-6"}>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-1">
          <Input placeholder={t("search_pickup")} {...register("pickup")} />
          {errors.pickup ? <p className="mt-1 text-xs text-rose-600">{errors.pickup.message}</p> : null}
        </div>

        <div className="lg:col-span-1">
          <Input placeholder={t("search_drop")} {...register("drop")} />
          {errors.drop ? <p className="mt-1 text-xs text-rose-600">{errors.drop.message}</p> : null}
        </div>

        <div>
          <select
            className="h-11 w-full rounded-xl border border-amber-200/80 bg-white/85 px-3 text-sm text-slate-900 shadow-sm dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-100"
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

        <div className="flex gap-2">
          <Input type="number" min={1} max={8} placeholder={t("search_passengers")} {...register("passengers", { valueAsNumber: true })} />
          <Button type="submit" className="min-w-28" disabled={isSubmitting}>
            <Search size={16} />
            {isSubmitting ? "..." : t("search_btn")}
          </Button>
        </div>
      </form>
      {submitted ? <p className="mt-3 text-sm text-teal-700 dark:text-teal-300">{t("search_result_msg")}</p> : null}
    </Card>
  );
}
