"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  ArrowLeft,
  Car,
  CheckCircle2,
  Clock3,
  Info,
  Landmark,
  MessageCircle,
  Minus,
  Phone,
  Plane,
  Plus,
  Route as RouteIcon,
  Star,
  Sun,
} from "lucide-react";
import { type LucideIcon } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/components/providers/language-provider";
import type { TranslationKey } from "@/lib/i18n";

// ── Types ─────────────────────────────────────────────────────────────────────

type FormState = {
  tripType: string;
  pickup: string;
  drop: string;
  date: "today" | "scheduled";
  scheduledDate: string;
  time: "now" | "later";
  scheduledTime: string;
  passengers: number;
  phone: string;
};

type MockDriver = {
  id: string;
  initials: string;
  avatarColor: string;
  name: string;
  vehicle: string;
  rating: number;
  eta: string;
  responseRate: string;
  fare: number;
  isBestMatch: boolean;
  phone: string;
};

type SortMode = "all" | "nearest" | "best_rated" | "lowest_fare";

// ── Static data ───────────────────────────────────────────────────────────────

const MOCK_DRIVERS: MockDriver[] = [
  {
    id: "driver-1",
    initials: "AK",
    avatarColor: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200",
    name: "Abulais Khatib",
    vehicle: "Maruti Ertiga · AC · 4 seats",
    rating: 5.0,
    eta: "3 min",
    responseRate: "97%",
    fare: 320,
    isBestMatch: true,
    phone: "918856931402",
  },
  {
    id: "driver-2",
    initials: "RS",
    avatarColor: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
    name: "Raju Shinde",
    vehicle: "Toyota Innova · AC · 6 seats",
    rating: 4.8,
    eta: "7 min",
    responseRate: "91%",
    fare: 380,
    isBestMatch: false,
    phone: "918856931402",
  },
];

const LOCATION_CHIPS = [
  "Nanded Railway Station",
  "Hazur Sahib Gurudwara",
  "Dr. Shankarrao Chavan Govt Hospital",
];

const SORT_OPTIONS: { mode: SortMode; label: string }[] = [
  { mode: "all", label: "All" }, // TODO: add to i18n
  { mode: "nearest", label: "Nearest" }, // TODO: add to i18n
  { mode: "best_rated", label: "Best rated" }, // TODO: add to i18n
  { mode: "lowest_fare", label: "Lowest fare" }, // TODO: add to i18n
];

const INITIAL_FORM: FormState = {
  tripType: "",
  pickup: "",
  drop: "",
  date: "today",
  scheduledDate: new Date().toISOString().split("T")[0],
  time: "now",
  scheduledTime: "",
  passengers: 2,
  phone: "",
};

const STEP_VARIANTS = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

// ── Shared sub-components ─────────────────────────────────────────────────────

function DriverAvatar({ initials, colorClass }: { initials: string; colorClass: string }) {
  return (
    <div
      className={cn(
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
        colorClass,
      )}
    >
      {initials}
    </div>
  );
}

function DriverNameRow({ driver }: { driver: MockDriver }) {
  return (
    <div className="flex items-center gap-3">
      <DriverAvatar initials={driver.initials} colorClass={driver.avatarColor} />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-sm font-semibold">{driver.name}</span>
          <Badge variant="success" className="px-2 py-0.5 text-[10px] leading-none">
            KYC ✓
          </Badge>
        </div>
        <p className="mt-0.5 text-xs text-muted">{driver.vehicle}</p>
      </div>
    </div>
  );
}

function ToggleButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex-1 rounded-xl border py-2.5 text-sm font-medium transition-all",
        active
          ? "border-brand bg-orange-50 text-brand dark:bg-orange-950/20"
          : "border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300",
      )}
    >
      {children}
    </button>
  );
}

function LocationChips({
  prefix,
  onSelect,
}: {
  prefix: string;
  onSelect: (chip: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {LOCATION_CHIPS.map((chip) => (
        <button
          key={`${prefix}-${chip}`}
          type="button"
          onClick={() => onSelect(chip)}
          className="rounded-full border border-amber-200/80 bg-white px-3 py-1 text-xs text-slate-700 transition-colors hover:border-brand hover:text-brand dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-brand dark:hover:text-brand"
        >
          {chip}
        </button>
      ))}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

type BookingFormProps = {
  onStepChange?: (step: number) => void;
};

export function BookingForm({ onStepChange }: BookingFormProps) {
  const { t } = useLanguage();

  // ── Core state ──────────────────────────────────────────────────────────────
  const [step, setStep] = useState(1);

  useEffect(() => {
    onStepChange?.(step);
  }, [step, onStepChange]);
  const [formState, setFormState] = useState<FormState>(INITIAL_FORM);

  // ── Step 4 ──────────────────────────────────────────────────────────────────
  const [sortMode, setSortMode] = useState<SortMode>("all");
  const [selectedDriver, setSelectedDriver] = useState<MockDriver | null>(null);

  // ── Step 3 OTP ──────────────────────────────────────────────────────────────
  const [otpSent, setOtpSent] = useState(false);
  const [otpDigits, setOtpDigits] = useState(["", "", "", ""]);
  const [resendCountdown, setResendCountdown] = useState(0);
  // Refs must be called individually to satisfy Rules of Hooks
  const otpRef0 = useRef<HTMLInputElement>(null);
  const otpRef1 = useRef<HTMLInputElement>(null);
  const otpRef2 = useRef<HTMLInputElement>(null);
  const otpRef3 = useRef<HTMLInputElement>(null);
  const otpRefs = [otpRef0, otpRef1, otpRef2, otpRef3];

  // ── Step 5 ──────────────────────────────────────────────────────────────────
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ── Step 6 ──────────────────────────────────────────────────────────────────

  // ── OTP resend countdown ────────────────────────────────────────────────────
  useEffect(() => {
    if (resendCountdown <= 0) return;
    const id = setTimeout(() => setResendCountdown((c) => c - 1), 1000);
    return () => clearTimeout(id);
  }, [resendCountdown]);

  // ── Derived ─────────────────────────────────────────────────────────────────
  const todayStr = new Date().toISOString().split("T")[0];
  const isOtpComplete = otpDigits.every((d) => d !== "");

  const sortedDrivers = (() => {
    const list = [...MOCK_DRIVERS];
    if (sortMode === "nearest") return list.sort((a, b) => parseInt(a.eta) - parseInt(b.eta));
    if (sortMode === "best_rated") return list.sort((a, b) => b.rating - a.rating);
    if (sortMode === "lowest_fare") return list.sort((a, b) => a.fare - b.fare);
    return list;
  })();

  const tripTypeOptions: { value: string; Icon: LucideIcon; key: TranslationKey }[] = [
    { value: "city", Icon: Car, key: "trip_city" },
    { value: "outstation", Icon: RouteIcon, key: "trip_outstation" },
    { value: "full_day", Icon: Sun, key: "trip_full_day" },
    { value: "hospital", Icon: Activity, key: "trip_hospital" },
    { value: "airport", Icon: Plane, key: "trip_airport" },
    { value: "religious", Icon: Landmark, key: "trip_religious" },
  ];

  // ── Helpers ─────────────────────────────────────────────────────────────────
  const updateForm = (updates: Partial<FormState>) =>
    setFormState((prev) => ({ ...prev, ...updates }));

  const goNext = () => setStep((s) => s + 1);
  const goBack = () => setStep((s) => s - 1);

  const reset = () => {
    setStep(1);
    setFormState(INITIAL_FORM);
    setSelectedDriver(null);
    setSortMode("all");
    setOtpSent(false);
    setOtpDigits(["", "", "", ""]);
    setResendCountdown(0);
  };

  const handleSendOtp = () => {
    const masked = `${formState.phone.slice(0, 2)}XXXXXX${formState.phone.slice(-2)}`;
    toast.success(`OTP sent to +91 ${masked}`); // TODO: add to i18n
    setOtpSent(true);
    setOtpDigits(["", "", "", ""]);
    setResendCountdown(30);
    setTimeout(() => otpRef0.current?.focus(), 60);
  };

  const handleOtpChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    setOtpDigits((prev) => {
      const next = [...prev];
      next[index] = digit;
      return next;
    });
    if (digit && index < 3) otpRefs[index + 1].current?.focus();
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      otpRefs[index - 1].current?.focus();
    }
  };

  const handleConfirm = async () => {
    if (!selectedDriver) return;
    setIsSubmitting(true);
    try {
      const today = new Date().toISOString().split("T")[0];
      const dateStr =
        formState.date === "scheduled" && formState.scheduledDate
          ? formState.scheduledDate
          : today;
      const timeStr =
        formState.time === "later" && formState.scheduledTime
          ? formState.scheduledTime
          : new Date().toTimeString().slice(0, 5);
      const scheduledAt = `${dateStr}T${timeStr}`;

      const res = await fetch("/api/ride-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formState.phone,
          phone: formState.phone,
          city: "Nanded",
          pickup: formState.pickup,
          drop: formState.drop,
          tripType: formState.tripType,
          schedule: scheduledAt,
          notes: `Passengers: ${formState.passengers}. Driver preference: ${selectedDriver.name}`,
          paymentMode: "cash",
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error ?? "Unable to create booking request"); // TODO: add to i18n
        return;
      }
      goNext();
    } catch {
      toast.error("Something went wrong. Please try again."); // TODO: add to i18n
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-4">
      {/* ── Progress dots: steps 1–5 only ── */}
      {step <= 5 && (
        <div className="flex items-center justify-center gap-2">
          {[1, 2, 3, 4, 5].map((dot) => (
            <div
              key={dot}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                step === dot
                  ? "w-6 bg-brand"
                  : step > dot
                    ? "w-2 bg-brand/40"
                    : "w-2 bg-slate-200 dark:bg-slate-700",
              )}
            />
          ))}
        </div>
      )}

      {/* ── Back button: steps 2–5 ── */}
      {step >= 2 && step <= 5 && (
        <button
          type="button"
          onClick={goBack}
          className="flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
        >
          <ArrowLeft size={16} />
          <span>Back</span> {/* TODO: add to i18n */}
        </button>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          variants={STEP_VARIANTS}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.2 }}
        >
          {/* ════════════════════════════════════════════════════════════════════
              STEP 1 — Trip type
          ═══════════════════════════════════════════════════════════════════ */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <h2 className="font-display text-xl font-semibold">
                  Choose your trip type {/* TODO: add to i18n */}
                </h2>
                <p className="mt-1 text-sm text-muted">
                  What kind of ride do you need? {/* TODO: add to i18n */}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {tripTypeOptions.map(({ value, Icon, key }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => updateForm({ tripType: value })}
                    className={cn(
                      "rounded-2xl border p-4 text-left shadow-[0_4px_20px_-8px_rgba(19,32,50,0.3)] transition-all duration-150",
                      formState.tripType === value
                        ? "border-brand bg-orange-50 dark:bg-orange-950/20"
                        : "border-[color:var(--surface-border)] bg-[color:var(--surface)] hover:border-brand/40",
                    )}
                  >
                    <Icon
                      size={22}
                      className={
                        formState.tripType === value
                          ? "text-brand"
                          : "text-slate-500 dark:text-slate-400"
                      }
                    />
                    <p
                      className={cn(
                        "mt-2 text-sm font-medium",
                        formState.tripType === value
                          ? "text-brand"
                          : "text-slate-900 dark:text-slate-100",
                      )}
                    >
                      {t(key)}
                    </p>
                  </button>
                ))}
              </div>

              {!formState.tripType && (
                <p className="text-xs text-center text-muted-foreground mt-2 mb-1">
                  Tap a card above to continue
                </p>
              )}

              <Button className="w-full" disabled={!formState.tripType} onClick={goNext}>
                Next {/* TODO: add to i18n */}
              </Button>
            </div>
          )}

          {/* ════════════════════════════════════════════════════════════════════
              STEP 2 — Route & time
          ═══════════════════════════════════════════════════════════════════ */}
          {step === 2 && (
            <div className="space-y-5">
              <h2 className="font-display text-xl font-semibold">
                Your route &amp; schedule {/* TODO: add to i18n */}
              </h2>

              {/* Pickup */}
              <div className="space-y-2">
                <label className="text-sm font-medium">{t("booking_pickup")}</label>
                <Input
                  placeholder={t("search_pickup")}
                  value={formState.pickup}
                  onChange={(e) => updateForm({ pickup: e.target.value })}
                />
                <LocationChips prefix="pickup" onSelect={(chip) => updateForm({ pickup: chip })} />
              </div>

              {/* Drop */}
              <div className="space-y-2">
                <label className="text-sm font-medium">{t("booking_drop")}</label>
                <Input
                  placeholder={t("search_drop")}
                  value={formState.drop}
                  onChange={(e) => updateForm({ drop: e.target.value })}
                />
                <LocationChips prefix="drop" onSelect={(chip) => updateForm({ drop: chip })} />
              </div>

              {/* Date toggle */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Date {/* TODO: add to i18n */}
                </label>
                <div className="flex gap-2">
                  <ToggleButton
                    active={formState.date === "today"}
                    onClick={() => updateForm({ date: "today" })}
                  >
                    Today {/* TODO: add to i18n */}
                  </ToggleButton>
                  <ToggleButton
                    active={formState.date === "scheduled"}
                    onClick={() => updateForm({ date: "scheduled" })}
                  >
                    Schedule {/* TODO: add to i18n */}
                  </ToggleButton>
                </div>
                {formState.date === "scheduled" && (
                  <Input
                    type="date"
                    min={todayStr}
                    value={formState.scheduledDate}
                    onChange={(e) => updateForm({ scheduledDate: e.target.value })}
                  />
                )}
              </div>

              {/* Time toggle */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Time {/* TODO: add to i18n */}
                </label>
                <div className="flex gap-2">
                  <ToggleButton
                    active={formState.time === "now"}
                    onClick={() => updateForm({ time: "now" })}
                  >
                    Now {/* TODO: add to i18n */}
                  </ToggleButton>
                  <ToggleButton
                    active={formState.time === "later"}
                    onClick={() => updateForm({ time: "later" })}
                  >
                    Later {/* TODO: add to i18n */}
                  </ToggleButton>
                </div>
                {formState.time === "later" && (
                  <Input
                    type="time"
                    value={formState.scheduledTime}
                    onChange={(e) => updateForm({ scheduledTime: e.target.value })}
                  />
                )}
              </div>

              {/* Passengers stepper */}
              <div className="space-y-2">
                <label className="text-sm font-medium">{t("search_passengers")}</label>
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    disabled={formState.passengers <= 1}
                    onClick={() => updateForm({ passengers: Math.max(1, formState.passengers - 1) })}
                  >
                    <Minus size={16} />
                  </Button>
                  <span className="w-6 text-center text-base font-semibold">
                    {formState.passengers}
                  </span>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    disabled={formState.passengers >= 8}
                    onClick={() => updateForm({ passengers: Math.min(8, formState.passengers + 1) })}
                  >
                    <Plus size={16} />
                  </Button>
                </div>
              </div>

              <Button
                className="w-full"
                disabled={!formState.pickup.trim() || !formState.drop.trim()}
                onClick={goNext}
              >
                Next {/* TODO: add to i18n */}
              </Button>
            </div>
          )}

          {/* ════════════════════════════════════════════════════════════════════
              STEP 3 — Phone + OTP
          ═══════════════════════════════════════════════════════════════════ */}
          {step === 3 && (
            <div className="space-y-5">
              <div>
                <h2 className="font-display text-xl font-semibold">
                  Verify your number {/* TODO: add to i18n */}
                </h2>
                <p className="mt-1 text-sm text-muted">
                  We send a one-time code to confirm your ride {/* TODO: add to i18n */}
                </p>
              </div>

              {/* Phone input with +91 prefix */}
              <div className="space-y-1">
                <label className="text-sm font-medium">{t("booking_phone")}</label>
                <div className="flex overflow-hidden rounded-xl border border-amber-200/80 bg-white shadow-sm transition-all focus-within:ring-2 focus-within:ring-brand dark:border-slate-700 dark:bg-slate-900">
                  <span className="flex items-center border-r border-amber-200/80 px-3 text-sm font-medium text-slate-600 dark:border-slate-700 dark:text-slate-400">
                    +91
                  </span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    placeholder="9999999999"
                    maxLength={10}
                    value={formState.phone}
                    onChange={(e) =>
                      updateForm({ phone: e.target.value.replace(/\D/g, "").slice(0, 10) })
                    }
                    className="h-11 flex-1 bg-transparent px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-slate-100"
                  />
                </div>
              </div>

              {/* Send OTP button — shown before OTP is sent */}
              {!otpSent && (
                <Button
                  className="w-full"
                  disabled={formState.phone.length !== 10}
                  onClick={handleSendOtp}
                >
                  Send OTP {/* TODO: add to i18n */}
                </Button>
              )}

              {/* OTP digit boxes — shown after OTP is sent */}
              {otpSent && (
                <div className="space-y-4">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Enter the 4-digit code sent to your number {/* TODO: add to i18n */}
                  </p>

                  <div className="flex gap-3">
                    {otpDigits.map((digit, index) => (
                      <input
                        key={index}
                        ref={otpRefs[index]}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        className="h-14 w-14 rounded-xl border border-amber-200/80 bg-white text-center text-xl font-semibold text-slate-900 shadow-sm transition-all focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                      />
                    ))}
                  </div>

                  <Button className="w-full" disabled={!isOtpComplete} onClick={goNext}>
                    Verify &amp; see drivers {/* TODO: add to i18n */}
                  </Button>

                  <div className="text-center text-sm">
                    {resendCountdown > 0 ? (
                      <span className="text-slate-500 dark:text-slate-400">
                        Resend in {resendCountdown}s {/* TODO: add to i18n */}
                      </span>
                    ) : (
                      <button
                        type="button"
                        className="font-medium text-brand hover:text-brand-dark"
                        onClick={handleSendOtp}
                      >
                        Resend OTP {/* TODO: add to i18n */}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ════════════════════════════════════════════════════════════════════
              STEP 4 — Driver quotes
          ═══════════════════════════════════════════════════════════════════ */}
          {step === 4 && (
            <div className="space-y-4">
              <h2 className="font-display text-xl font-semibold">
                Available drivers {/* TODO: add to i18n */}
              </h2>

              {/* Sort pills */}
              <div className="flex flex-wrap gap-2">
                {SORT_OPTIONS.map(({ mode, label }) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setSortMode(mode)}
                    className={cn(
                      "rounded-full border px-3 py-1 text-xs font-medium transition-all",
                      sortMode === mode
                        ? "border-brand bg-orange-50 text-brand dark:bg-orange-950/20"
                        : "border-slate-200 bg-white text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400",
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Driver cards */}
              <div className="space-y-3">
                {sortedDrivers.map((driver) => (
                  <Card
                    key={driver.id}
                    className={cn("p-4", driver.isBestMatch && "border-brand/40")}
                  >
                    <div className="space-y-3">
                      {driver.isBestMatch && (
                        <div>
                          <Badge>Best match</Badge> {/* TODO: add to i18n */}
                        </div>
                      )}

                      <DriverNameRow driver={driver} />

                      {/* Stats row */}
                      <div className="grid grid-cols-3 gap-2 text-center text-xs">
                        <div className="rounded-lg bg-slate-50 p-2 dark:bg-slate-800/50">
                          <div className="flex items-center justify-center gap-1 font-semibold">
                            <Star size={12} className="text-amber-400" />
                            {driver.rating.toFixed(1)}
                          </div>
                          <div className="mt-0.5 text-muted">
                            Rating {/* TODO: add to i18n */}
                          </div>
                        </div>
                        <div className="rounded-lg bg-slate-50 p-2 dark:bg-slate-800/50">
                          <div className="flex items-center justify-center gap-1 font-semibold">
                            <Clock3 size={12} className="text-teal-600 dark:text-teal-400" />
                            {driver.eta}
                          </div>
                          <div className="mt-0.5 text-muted">ETA</div>
                        </div>
                        <div className="rounded-lg bg-slate-50 p-2 dark:bg-slate-800/50">
                          <div className="font-semibold">{driver.responseRate}</div>
                          <div className="mt-0.5 text-muted">
                            Response {/* TODO: add to i18n */}
                          </div>
                        </div>
                      </div>

                      {/* Fare + action buttons */}
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-base font-bold text-brand">
                            Get quote {/* TODO: add to i18n */}
                          </span>
                          <span className="ml-1.5 text-xs text-muted">
                            Driver will call to confirm price {/* TODO: add to i18n */}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            Profile {/* TODO: add to i18n */}
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => {
                              setSelectedDriver(driver);
                              goNext();
                            }}
                          >
                            Request {/* TODO: add to i18n */}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* ════════════════════════════════════════════════════════════════════
              STEP 5 — Confirm booking
          ═══════════════════════════════════════════════════════════════════ */}
          {step === 5 && selectedDriver && (
            <div className="space-y-5">
              <h2 className="font-display text-xl font-semibold">
                Confirm booking {/* TODO: add to i18n */}
              </h2>

              <DriverNameRow driver={selectedDriver} />

              {/* Trip summary */}
              <Card className="p-4">
                <div className="divide-y divide-[color:var(--surface-border)] text-sm">
                  <div className="flex justify-between py-2.5">
                    <span className="text-muted">From</span> {/* TODO: add to i18n */}
                    <span className="font-medium">{formState.pickup}</span>
                  </div>
                  <div className="flex justify-between py-2.5">
                    <span className="text-muted">To</span> {/* TODO: add to i18n */}
                    <span className="font-medium">{formState.drop}</span>
                  </div>
                  <div className="flex justify-between py-2.5">
                    <span className="text-muted">When</span> {/* TODO: add to i18n */}
                    <span className="font-medium">
                      {formState.date === "today"
                        ? `Today${formState.time === "later" && formState.scheduledTime ? `, ${formState.scheduledTime}` : ""}` // TODO: add to i18n
                        : `${formState.scheduledDate}${formState.scheduledTime ? `, ${formState.scheduledTime}` : ""}`}
                    </span>
                  </div>
                  <div className="flex justify-between py-2.5">
                    <span className="text-muted">Fare</span> {/* TODO: add to i18n */}
                    <span className="font-bold text-brand">
                      Get quote {/* TODO: add to i18n */}
                    </span>
                  </div>
                </div>
              </Card>

              {/* Cash note callout */}
              <div className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3 dark:border-amber-400/30 dark:bg-amber-500/10">
                <Info size={18} className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-400" />
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  Driver will call you to confirm. Pay cash directly to driver. {/* TODO: add to i18n */}
                </p>
              </div>

              <Button className="w-full" disabled={isSubmitting} onClick={handleConfirm}>
                {isSubmitting
                  ? t("booking_submitting")
                  : "Confirm & connect" /* TODO: add to i18n */}
              </Button>
            </div>
          )}

          {/* ════════════════════════════════════════════════════════════════════
              STEP 6 — Confirmed
          ═══════════════════════════════════════════════════════════════════ */}
          {step === 6 && selectedDriver && (
            <div className="space-y-6 py-4 text-center">
              {/* Animated checkmark */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900"
              >
                <CheckCircle2 size={44} className="text-teal-600 dark:text-teal-400" />
              </motion.div>

              <div>
                <h2 className="font-display text-2xl font-semibold">
                  Request sent! {/* TODO: add to i18n */}
                </h2>
                <p className="mt-2 text-sm text-muted">
                  {selectedDriver.name} will call you to confirm the ride and fare. If they don&apos;t call in 5 minutes, call them directly. {/* TODO: add to i18n */}
                </p>
              </div>

              {/* Share + Call */}
              <div className="flex gap-3">
                <a
                  href={`https://wa.me/${selectedDriver.phone}?text=${encodeURIComponent(
                    `Hi, I just sent a ride request on SafeSobati.\nFrom: ${formState.pickup}\nTo: ${formState.drop}\nPlease confirm my booking.`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button variant="ghost" className="w-full gap-2">
                    <MessageCircle size={16} />
                    Message driver on WhatsApp {/* TODO: add to i18n */}
                  </Button>
                </a>
                <a href={`tel:+${selectedDriver.phone}`} className="flex-1">
                  <Button variant="ghost" className="w-full gap-2">
                    <Phone size={16} />
                    Call driver {/* TODO: add to i18n */}
                  </Button>
                </a>
              </div>

              <button
                type="button"
                onClick={reset}
                className="text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
              >
                Book another ride {/* TODO: add to i18n */}
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
