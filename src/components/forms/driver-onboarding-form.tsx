"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
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
  const [insuranceFile, setInsuranceFile] = useState<File | null>(null);
  const [pucFile, setPucFile] = useState<File | null>(null);
  const [vehicleFiles, setVehicleFiles] = useState<File[]>([]);
  const [insuranceExpiry, setInsuranceExpiry] = useState("");
  const [pucExpiry, setPucExpiry] = useState("");
  const [insuranceParsing, setInsuranceParsing] = useState(false);
  const [pucParsing, setPucParsing] = useState(false);
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
      insuranceUrl: "",
      pucUrl: "",
      languages: "",
      consent: false,
    },
  });

  const watchedBrand = watch("vehicleBrand") as VehicleBrand;
  const models = getModelsByBrand(watchedBrand);
  const isCustomBrand = watchedBrand === "other";

  const uploadDocument = async (
    file: File,
    fileType: "aadhaar" | "license" | "rc" | "insurance" | "puc" | "vehicle"
  ) => {
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

  const parseDocumentExpiry = async (file: File): Promise<string | null> => {
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await fetch("/api/drivers/parse-document", { method: "POST", body: fd });
      const data = await res.json() as { expiry?: string | null };
      return data.expiry ?? null;
    } catch {
      return null;
    }
  };

  const handleInsuranceChange = async (file: File | null) => {
    setInsuranceFile(file);
    if (!file || file.type !== "application/pdf") return;
    setInsuranceParsing(true);
    const expiry = await parseDocumentExpiry(file);
    setInsuranceParsing(false);
    if (expiry) setInsuranceExpiry(expiry);
  };

  const handlePucChange = async (file: File | null) => {
    setPucFile(file);
    if (!file || file.type !== "application/pdf") return;
    setPucParsing(true);
    const expiry = await parseDocumentExpiry(file);
    setPucParsing(false);
    if (expiry) setPucExpiry(expiry);
  };

  const onSubmit = async (values: DriverOnboardingValues) => {
    setResultMessage("");

    let aadhaarUrl = values.aadhaarUrl;
    let licenseUrl = values.licenseUrl;
    let rcUrl = values.rcUrl;
    let insuranceUrl = values.insuranceUrl;
    let pucUrl = values.pucUrl;
    let vehiclePhotoUrls: string[] = [];

    if (aadhaarFile) {
      aadhaarUrl = await uploadDocument(aadhaarFile, "aadhaar");
    }
    if (licenseFile) {
      licenseUrl = await uploadDocument(licenseFile, "license");
    }
    if (rcFile) {
      rcUrl = await uploadDocument(rcFile, "rc");
    }
    if (insuranceFile) {
      insuranceUrl = await uploadDocument(insuranceFile, "insurance");
    }
    if (pucFile) {
      pucUrl = await uploadDocument(pucFile, "puc");
    }
    if (vehicleFiles.length > 0) {
      vehiclePhotoUrls = await Promise.all(vehicleFiles.map((file) => uploadDocument(file, "vehicle")));
    }

    const parsedLanguages = (values.languages ?? "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
      .slice(0, 8);

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
        insuranceUrl,
        insuranceExpiry: insuranceExpiry || undefined,
        pucUrl,
        pucExpiry: pucExpiry || undefined,
        vehicleBrand: values.vehicleBrand,
        vehicleModel: values.vehicleModel,
        languages: parsedLanguages,
        registrationYear: values.registrationYear,
        seatCount: values.seatCount,
        ac: Boolean(values.ac),
        photos: vehiclePhotoUrls,
        consentGivenAt: new Date().toISOString(),
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
          <Input type="number" min={0} max={40} {...register("yearsOfExperience", { setValueAs: (v: string) => (v === "" ? undefined : Number(v)) })} />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium">Languages known (comma separated)</label>
          <Input placeholder="Hindi, Marathi, English" {...register("languages")} />
          <p className="mt-1 text-xs text-slate-500">Example: Hindi, Marathi, English</p>
        </div>

        {/* Vehicle Info */}
        <div>
          <label className="mb-1 block text-sm font-medium">{t("driver_vehicle_type")}</label>
          <select
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-900"
            {...register("vehicleType")}
          >
            <option value="sedan">Sedan</option>
            <option value="suv">SUV</option>
            <option value="hatchback">Hatchback</option>
            <option value="taxi">Taxi</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">{t("driver_vehicle_brand")}</label>
          <select
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-900"
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
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-900"
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
            {...register("registrationYear", { setValueAs: (v: string) => (v === "" ? undefined : Number(v)) })}
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
            {...register("seatCount", { setValueAs: (v: string) => (v === "" ? undefined : Number(v)) })}
          />
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900">
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
            className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-900"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium">{t("driver_license")}</label>
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={(e) => setLicenseFile(e.target.files?.[0] || null)}
            className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-900"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium">{t("driver_rc")}</label>
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={(e) => setRcFile(e.target.files?.[0] || null)}
            className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-900"
          />
          <p className="mt-1 text-xs text-slate-500">Optional — you can submit this later</p>
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium">Vehicle photos (up to 5)</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              const files = Array.from(e.target.files ?? []).slice(0, 5);
              setVehicleFiles(files);
            }}
            className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-900"
          />
          <p className="mt-1 text-xs text-slate-500">{vehicleFiles.length} / 5 selected</p>
        </div>

        {/* Insurance */}
        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium">{t("driver_insurance")}</label>
          <input
            type="file"
            accept=".pdf,application/pdf"
            onChange={(e) => handleInsuranceChange(e.target.files?.[0] || null)}
            className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-900"
          />
          <p className="mt-1 text-xs text-slate-500">Optional — you can submit this later</p>
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium">
            {t("driver_insurance_expiry")}
            {insuranceParsing && (
              <span className="ml-2 inline-flex items-center gap-1 text-xs font-normal text-slate-500">
                <Loader2 size={12} className="animate-spin" /> {t("driver_parsing")}
              </span>
            )}
          </label>
          <Input
            placeholder={t("driver_insurance_expiry_placeholder")}
            value={insuranceExpiry}
            onChange={(e) => setInsuranceExpiry(e.target.value)}
          />
          <p className="mt-1 text-xs text-slate-500">Format: DD/MM/YYYY — auto-filled when you upload insurance PDF above.</p>
        </div>

        {/* PUC */}
        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium">{t("driver_puc")}</label>
          <input
            type="file"
            accept=".pdf,application/pdf"
            onChange={(e) => handlePucChange(e.target.files?.[0] || null)}
            className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-900"
          />
          <p className="mt-1 text-xs text-slate-500">Optional — you can submit this later</p>
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium">
            {t("driver_puc_expiry")}
            {pucParsing && (
              <span className="ml-2 inline-flex items-center gap-1 text-xs font-normal text-slate-500">
                <Loader2 size={12} className="animate-spin" /> {t("driver_parsing")}
              </span>
            )}
          </label>
          <Input
            placeholder={t("driver_puc_expiry_placeholder")}
            value={pucExpiry}
            onChange={(e) => setPucExpiry(e.target.value)}
          />
          <p className="mt-1 text-xs text-slate-500">Format: DD/MM/YYYY — auto-filled when you upload PUC PDF above.</p>
        </div>

        {/* Consent */}
        <div className="sm:col-span-2 flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900">
          <input
            type="checkbox"
            className="h-4 w-4 rounded"
            {...register("consent")}
            id="consent-check"
          />
          <label htmlFor="consent-check" className="text-sm font-medium cursor-pointer flex-1">
            {t("driver_consent")}{" "}
            <a
              href="/driver-agreement"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-dotted text-orange-600 dark:text-orange-400 hover:text-orange-700"
            >
              View Driver Agreement
            </a>
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
