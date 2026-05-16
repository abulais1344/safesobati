"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingSchema, type BookingInput } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { CustomerQuotesPanel } from "@/components/customer-quotes-panel";

export function BookingForm() {
  const [requestId, setRequestId] = useState("");
  const [message, setMessage] = useState("");
  const { t } = useLanguage();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      tripType: "city",
      paymentMode: "cash",
      notes: "",
    },
  });

  const onSubmit = async (values: BookingInput) => {
    setMessage("");
    setRequestId("");

    const response = await fetch("/api/ride-requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: values.name,
        phone: values.phone,
        city: "Nanded",
        pickup: values.pickup,
        drop: values.drop,
        tripType: values.tripType,
        schedule: values.schedule,
        notes: values.notes,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setMessage(data.error ?? "Unable to create booking request");
      return;
    }

    setRequestId(data.requestId);
    setMessage(`Request ${data.requestId} created and ${data.notifiedDrivers} drivers notified.`);
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">{t("booking_name")}</label>
          <Input {...register("name")} />
          {errors.name ? <p className="mt-1 text-xs text-rose-600">{errors.name.message}</p> : null}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">{t("booking_phone")}</label>
          <Input {...register("phone")} />
          {errors.phone ? <p className="mt-1 text-xs text-rose-600">{errors.phone.message}</p> : null}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">{t("booking_pickup")}</label>
          <Input {...register("pickup")} />
          {errors.pickup ? <p className="mt-1 text-xs text-rose-600">{errors.pickup.message}</p> : null}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">{t("booking_drop")}</label>
          <Input {...register("drop")} />
          {errors.drop ? <p className="mt-1 text-xs text-rose-600">{errors.drop.message}</p> : null}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">{t("booking_trip_type")}</label>
          <select
            className="h-11 w-full rounded-xl border border-slate-200 bg-white/80 px-3 text-sm dark:border-slate-700 dark:bg-slate-900/80"
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
          <label className="mb-1 block text-sm font-medium">{t("booking_schedule")}</label>
          <Input type="datetime-local" {...register("schedule")} />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium">{t("booking_notes")}</label>
          <Textarea placeholder={t("booking_notes_placeholder")} {...register("notes")} />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium">{t("booking_payment")}</label>
          <div className="grid grid-cols-3 gap-2">
            <label className="rounded-xl border border-slate-200 px-3 py-2 text-sm">
              <input type="radio" value="cash" {...register("paymentMode")} /> {t("booking_cash")}
            </label>
            <label className="rounded-xl border border-slate-200 px-3 py-2 text-sm">
              <input type="radio" value="online" {...register("paymentMode")} /> {t("booking_online")}
            </label>
            <label className="rounded-xl border border-slate-200 px-3 py-2 text-sm">
              <input type="radio" value="wallet" {...register("paymentMode")} /> {t("booking_wallet")}
            </label>
          </div>
        </div>

        <Button className="sm:col-span-2" type="submit" disabled={isSubmitting}>
          {isSubmitting ? t("booking_submitting") : t("booking_submit")}
        </Button>
      </form>

      {message ? <p className="mt-4 text-sm text-emerald-700">{message}</p> : null}

      {requestId ? <CustomerQuotesPanel requestId={requestId} /> : null}
    </Card>
  );
}
