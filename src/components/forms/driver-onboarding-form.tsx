"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { driverOnboardingSchema } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/components/providers/language-provider";
import { vehicleBrands, getModelsByBrand, type VehicleBrand } from "@/lib/vehicles";
import type { z } from "zod";

type DriverOnboardingValues = z.infer<typeof driverOnboardingSchema>;

export function DriverOnboardingForm() {
  const [done, setDone] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const [aadhaarFile, setAadhaarFile] = useState<File | null>(null);
  const [licenseFile, setLicenseFile] = useState<File | null>(null);
  const [rcFile, setRcFile] = useState<File | null>(null);
  const { t } = useLanguage();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<DriverOnboardingValues>({
    resolver: zodResolver(driverOnboardingSchema),
    defaultValues: {
      vehicleType: "sedan",
      yearsOfExperience: 1,
      vehicleBrand: "maruti",
      vehicleModel: "swift",
      registrationYear: new Date().getFullYear() - 2,
      seatCount: 4,
      ac: false,
      aadhaarUrl: "",
      licenseUrl: "",
      rcUrl: "",
      consent: false,
    },
  });

  const watchedBrand = watch("vehicleBrand") as VehicleBrand;
  const models = getModelsByBrand(watchedBrand);
  const isCustomBrand = watchedBrand === "other";

  const uploadDocument = async (file: File, fileType: "aadhaar" | "license" | "rc") => {
    const signedUrlResponse = await fetch("/api/uploads/signed-url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileName: file.name, fileType }),
    });

    const signedUrlData = await signedUrlResponse.json();

    if (!signedUrlResponse.ok) {
      throw new Error(signedUrlData.error ?? `Unable to create signed URL for ${fileType}`);
    }

    const uploadResponse = await fetch(signedUrlData.signedUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type || "application/octet-stream",
        "x-upsert": "true",
      },
      body: file,
    });

    if (!uploadResponse.ok) {
      throw new Error(`Unable to upload ${fileType}`);
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!supabaseUrl) {
      return "";
    }

    return `${supabaseUrl}/storage/v1/object/public/${signedUrlData.bucket}/${signedUrlData.path}`;
  };

  const onSubmit = async (values: DriverOnboardingValues) => {
    setResultMessage("");

    let aadhaarUrl = values.aadhaarUrl;
    let licenseUrl = values.licenseUrl;
    let rcUrl = values.rcUrl;

    if (aadhaarFile) {
      aadhaarUrl = await uploadDocument(aadhaarFile, "aadhaar");
    }
    if (licenseFile) {
      licenseUrl = await uploadDocument(licenseFile, "license");
    }
    if (rcFile) {
      rcUrl = await uploadDocument(rcFile, "rc");
    }

    const response = await fetch("/api/drivers/onboard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: values.fullName,
        phone: values.phone,
        city: values.city,
        vehicleType: values.vehicleType,
        vehicleNumber: values.vehicleNumber,
        yearsOfExperience: values.yearsOfExperience,
        aadhaarUrl,
        licenseUrl,
        rcUrl,
        vehicleBrand: values.vehicleBrand,
        vehicleModel: values.vehicleModel,
        registrationYear: values.registrationYear,
        seatCount: values.seatCount,
        ac: Boolean(values.ac),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setResultMessage(data.error ?? "Unable to submit onboarding");
      setDone(false);
      return;
    }

    setResultMessage(`Application submitted. Driver ID: ${data.driverId}. Status: ${data.status}.`);
    setDone(true);
  };

  if (done) {
    return (
      <Card className="p-6">
        <div className="text-center">
          <p className="text-sm font-medium text-emerald-700">{resultMessage}</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <form className="grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit(onSubmit)}>
        {/* Personal Info */}
        <div>
          <label className="mb-1 block text-sm font-medium">{t("driver_name")}</label>
          <Input {...register("fullName")} />
          {errors.fullName ? <p className="mt-1 text-xs text-rose-600">{errors.fullName.message}</p> : null}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">{t("driver_phone")}</label>
          <Input {...register("phone")} />
          {errors.phone ? <p className="mt-1 text-xs text-rose-600">{errors.phone.message}</p> : null}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">{t("driver_city")}</label>
          <Input placeholder="Nanded" {...register("city")} />
          {errors.city ? <p className="mt-1 text-xs text-rose-600">{errors.city.message}</p> : null}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">{t("driver_years_exp")}</label>
          <Input type="number" min={0} max={40} {...register("yearsOfExperience", { valueAsNumber: true })} />
        </div>

        {/* Vehicle Info */}
        <div>
          <label className="mb-1 block text-sm font-medium">{t("driver_vehicle_type")}</label>
          <select
            className="h-11 w-full rounded-xl border border-slate-200 bg-white/80 px-3 text-sm dark:border-slate-700 dark:bg-slate-900/80"
            {...register("vehicleType")}
          >
            <option value="sedan">Sedan</option>
            <option value="suv">SUV</option>
            <option value="hatchback">Hatchback</option>
            <option value="auto">Auto</option>
            <option value="taxi">Taxi</option>
            <option value="school_bus">School Bus</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">{t("driver_vehicle_brand")}</label>
          <select
            className="h-11 w-full rounded-xl border border-slate-200 bg-white/80 px-3 text-sm dark:border-slate-700 dark:bg-slate-900/80"
            {...register("vehicleBrand")}
          >
            {vehicleBrands.map((b) => (
              <option key={b.value} value={b.value}>
                {b.label}
              </option>
            ))}
          </select>
        </div>

        {isCustomBrand ? (
          <div>
            <label className="mb-1 block text-sm font-medium">{t("driver_custom_brand")}</label>
            <Input placeholder="e.g., Skoda, BMW" {...register("vehicleModel")} />
          </div>
        ) : (
          <div>
            <label className="mb-1 block text-sm font-medium">{t("driver_vehicle_model")}</label>
            <select
              className="h-11 w-full rounded-xl border border-slate-200 bg-white/80 px-3 text-sm dark:border-slate-700 dark:bg-slate-900/80"
              {...register("vehicleModel")}
            >
              {models.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className="mb-1 block text-sm font-medium">{t("driver_reg_year")}</label>
          <Input
            type="number"
            min={1990}
            max={new Date().getFullYear() + 1}
            placeholder={t("driver_reg_year_placeholder")}
            {...register("registrationYear", { valueAsNumber: true })}
          />
          {errors.registrationYear ? (
            <p className="mt-1 text-xs text-rose-600">{errors.registrationYear.message}</p>
          ) : null}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">{t("driver_vehicle_number")}</label>
          <Input
            placeholder={t("driver_vehicle_number_placeholder")}
            {...register("vehicleNumber")}
          />
          {errors.vehicleNumber ? (
            <p className="mt-1 text-xs text-rose-600">{errors.vehicleNumber.message}</p>
          ) : null}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">{t("driver_seats")}</label>
          <Input
            type="number"
            min={1}
            max={8}
            {...register("seatCount", { valueAsNumber: true })}
          />
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white/50 px-3 py-2 dark:border-slate-700 dark:bg-slate-900/50">
          <input type="checkbox" className="h-4 w-4 rounded" {...register("ac")} id="ac-check" />
          <label htmlFor="ac-check" className="text-sm font-medium cursor-pointer flex-1">
            {t("driver_ac")}
          </label>
        </div>

        {/* Document Uploads */}
        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium">{t("driver_aadhaar")}</label>
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={(e) => setAadhaarFile(e.target.files?.[0] || null)}
            className="h-10 w-full rounded-xl border border-slate-200 bg-white/80 px-3 text-sm dark:border-slate-700 dark:bg-slate-900/80"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium">{t("driver_license")}</label>
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={(e) => setLicenseFile(e.target.files?.[0] || null)}
            className="h-10 w-full rounded-xl border border-slate-200 bg-white/80 px-3 text-sm dark:border-slate-700 dark:bg-slate-900/80"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium">{t("driver_rc")}</label>
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={(e) => setRcFile(e.target.files?.[0] || null)}
            className="h-10 w-full rounded-xl border border-slate-200 bg-white/80 px-3 text-sm dark:border-slate-700 dark:bg-slate-900/80"
          />
        </div>

        {/* Consent */}
        <div className="sm:col-span-2 flex items-center gap-3 rounded-xl border border-slate-200 bg-white/50 px-3 py-2 dark:border-slate-700 dark:bg-slate-900/50">
          <input
            type="checkbox"
            className="h-4 w-4 rounded"
            {...register("consent")}
            id="consent-check"
          />
          <label htmlFor="consent-check" className="text-sm font-medium cursor-pointer flex-1">
            {t("driver_consent")}
          </label>
        </div>
        {errors.consent ? <p className="text-xs text-rose-600 sm:col-span-2">{errors.consent.message}</p> : null}

        <Button className="sm:col-span-2" type="submit" disabled={isSubmitting}>
          {isSubmitting ? t("driver_submitting") : t("driver_submit")}
        </Button>
      </form>

      {resultMessage && <p className="mt-4 text-sm text-rose-700">{resultMessage}</p>}
    </Card>
  );
}
