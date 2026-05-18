"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type PendingDriver = {
  id: string;
  status: "pending" | "approved" | "rejected" | "suspended";
  aadhaar_verified: boolean;
  license_verified: boolean;
  insurance_expiry: string | null;
  puc_expiry: string | null;
  aadhaar_url: string | null;
  license_url: string | null;
  rc_url: string | null;
  insurance_url: string | null;
  puc_url: string | null;
  approved_by: string | null;
  approved_at: string | null;
  rejection_reason: string | null;
  users?: {
    name: string;
    phone: string;
    city: string;
  } | null;
  vehicles: Array<{
    id: string;
    vehicle_type: "auto" | "hatchback" | "sedan" | "suv" | "taxi";
    brand: string;
    model: string;
    seat_count: number;
    ac: boolean;
    registration_number: string;
  }>;
};

type DriverDraft = {
  fullName: string;
  phone: string;
  city: string;
  aadhaarVerified: boolean;
  licenseVerified: boolean;
  insuranceExpiry: string;
  pucExpiry: string;
  vehicleType: "auto" | "hatchback" | "sedan" | "suv" | "taxi";
  vehicleBrand: string;
  vehicleModel: string;
  seatCount: number;
  ac: boolean;
  registrationNumber: string;
  rejectionReason: string;
};

function toDisplayDate(value: string | null): string {
  if (!value) return "";
  const isoMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!isoMatch) return value;
  return `${isoMatch[3]}/${isoMatch[2]}/${isoMatch[1]}`;
}

function buildDraft(driver: PendingDriver): DriverDraft {
  const vehicle = driver.vehicles?.[0];
  return {
    fullName: driver.users?.name ?? "",
    phone: driver.users?.phone ?? "",
    city: driver.users?.city ?? "",
    aadhaarVerified: driver.aadhaar_verified,
    licenseVerified: driver.license_verified,
    insuranceExpiry: toDisplayDate(driver.insurance_expiry),
    pucExpiry: toDisplayDate(driver.puc_expiry),
    vehicleType: vehicle?.vehicle_type ?? "sedan",
    vehicleBrand: vehicle?.brand ?? "",
    vehicleModel: vehicle?.model ?? "",
    seatCount: vehicle?.seat_count ?? 4,
    ac: vehicle?.ac ?? false,
    registrationNumber: vehicle?.registration_number ?? "",
    rejectionReason: driver.rejection_reason ?? "",
  };
}

export function AdminDriverApproval() {
  const [pendingDrivers, setPendingDrivers] = useState<PendingDriver[]>([]);
  const [drafts, setDrafts] = useState<Record<string, DriverDraft>>({});
  const [busyId, setBusyId] = useState<string | null>(null);
  const [activeDriverId, setActiveDriverId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const activeDriver = useMemo(
    () => pendingDrivers.find((driver) => driver.id === activeDriverId) ?? null,
    [pendingDrivers, activeDriverId]
  );

  const activeDraft = activeDriverId ? drafts[activeDriverId] : null;

  const loadPendingDrivers = async () => {
    const response = await fetch("/api/admin/drivers/pending");
    const data = await response.json();

    if (!response.ok) {
      setMessage(data.error ?? "Unable to load pending drivers");
      return;
    }

    const drivers = (data.drivers ?? []) as PendingDriver[];
    const nextDrafts: Record<string, DriverDraft> = {};
    for (const driver of drivers) {
      nextDrafts[driver.id] = drafts[driver.id] ?? buildDraft(driver);
    }

    setPendingDrivers(drivers);
    setDrafts(nextDrafts);
  };

  useEffect(() => {
    loadPendingDrivers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setDraftField = <K extends keyof DriverDraft>(driverId: string, key: K, value: DriverDraft[K]) => {
    setDrafts((prev) => ({
      ...prev,
      [driverId]: {
        ...prev[driverId],
        [key]: value,
      },
    }));
  };

  const saveDriverDetails = async (driverId: string) => {
    const draft = drafts[driverId];
    if (!draft) return true;

    setBusyId(driverId);
    const response = await fetch(`/api/admin/drivers/${driverId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(draft),
    });
    const data = await response.json();
    setBusyId(null);

    if (!response.ok) {
      setMessage(data.error ?? "Unable to save driver details");
      return false;
    }

    return true;
  };

  const sendDriverKit = async (driverId: string) => {
    setBusyId(driverId);
    const response = await fetch(`/api/admin/drivers/${driverId}/send-kit`, {
      method: "POST",
    });
    const data = await response.json();
    setBusyId(null);

    if (!response.ok) {
      setMessage(data.error ?? "Unable to send driver kit");
      return;
    }

    setMessage(data.delivered ? "Driver kit WhatsApp sent" : `Driver kit queued/stubbed: ${data.reason ?? "n/a"}`);
  };

  const updateApproval = async (driverId: string, status: "approved" | "rejected" | "suspended") => {
    const draft = drafts[driverId];
    if (!draft) return;

    if ((status === "rejected" || status === "suspended") && !draft.rejectionReason.trim()) {
      setMessage("Reason is mandatory for reject or suspend actions");
      return;
    }

    const saved = await saveDriverDetails(driverId);
    if (!saved) return;

    setBusyId(driverId);
    const response = await fetch(`/api/admin/drivers/${driverId}/approval`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status,
        aadhaarVerified: draft.aadhaarVerified,
        licenseVerified: draft.licenseVerified,
        rejectionReason: draft.rejectionReason,
      }),
    });

    const data = await response.json();
    setBusyId(null);

    if (!response.ok) {
      setMessage(data.error ?? "Unable to update approval status");
      return;
    }

    setMessage(`Updated ${driverId} to ${data.status}`);
    setActiveDriverId(null);
    await loadPendingDrivers();
  };

  return (
    <Card className="mt-6 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-semibold">Driver approval workflow</h3>
        <Button variant="secondary" onClick={loadPendingDrivers}>
          Refresh list
        </Button>
      </div>

      <div className="mt-4 space-y-3">
        {pendingDrivers.length === 0 ? (
          <p className="text-sm text-slate-600 dark:text-slate-300">No pending/rejected/suspended drivers found.</p>
        ) : (
          pendingDrivers.map((driver) => (
            <div key={driver.id} className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-semibold">{driver.users?.name ?? "Driver"}</p>
                  <p className="text-xs text-slate-500">
                    {driver.users?.phone ?? "Phone unavailable"} • {driver.users?.city ?? "City unavailable"} • {driver.status}
                  </p>
                </div>
                <Button size="sm" variant="secondary" onClick={() => setActiveDriverId(driver.id)}>
                  Review
                </Button>
              </div>
              {driver.rejection_reason ? (
                <p className="mt-2 text-xs text-amber-700">Last reason: {driver.rejection_reason}</p>
              ) : null}
            </div>
          ))
        )}
      </div>

      {activeDriver && activeDraft ? (
        <div className="fixed inset-0 z-50 bg-black/40">
          <div className="absolute inset-x-0 bottom-0 max-h-[92vh] overflow-y-auto rounded-t-2xl bg-white p-4 shadow-xl dark:bg-slate-900 md:inset-y-0 md:right-0 md:left-auto md:w-[680px] md:rounded-none md:rounded-l-2xl">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h4 className="text-base font-semibold">Review driver: {activeDriver.users?.name ?? "Driver"}</h4>
              <Button variant="outline" size="sm" onClick={() => setActiveDriverId(null)}>
                Close
              </Button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <p className="mb-1 text-xs text-slate-500">Full name</p>
                <input
                  className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm dark:border-slate-700 dark:bg-slate-900"
                  value={activeDraft.fullName}
                  onChange={(e) => setDraftField(activeDriver.id, "fullName", e.target.value)}
                />
              </div>
              <div>
                <p className="mb-1 text-xs text-slate-500">Phone</p>
                <input
                  className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm dark:border-slate-700 dark:bg-slate-900"
                  value={activeDraft.phone}
                  onChange={(e) => setDraftField(activeDriver.id, "phone", e.target.value)}
                />
              </div>
              <div>
                <p className="mb-1 text-xs text-slate-500">City</p>
                <input
                  className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm dark:border-slate-700 dark:bg-slate-900"
                  value={activeDraft.city}
                  onChange={(e) => setDraftField(activeDriver.id, "city", e.target.value)}
                />
              </div>
              <div>
                <p className="mb-1 text-xs text-slate-500">Vehicle type</p>
                <select
                  className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm dark:border-slate-700 dark:bg-slate-900"
                  value={activeDraft.vehicleType}
                  onChange={(e) =>
                    setDraftField(activeDriver.id, "vehicleType", e.target.value as DriverDraft["vehicleType"])
                  }
                >
                  <option value="auto">Auto</option>
                  <option value="hatchback">Hatchback</option>
                  <option value="sedan">Sedan</option>
                  <option value="suv">SUV</option>
                  <option value="taxi">Taxi</option>
                </select>
              </div>
              <div>
                <p className="mb-1 text-xs text-slate-500">Brand</p>
                <input
                  className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm dark:border-slate-700 dark:bg-slate-900"
                  value={activeDraft.vehicleBrand}
                  onChange={(e) => setDraftField(activeDriver.id, "vehicleBrand", e.target.value)}
                />
              </div>
              <div>
                <p className="mb-1 text-xs text-slate-500">Model</p>
                <input
                  className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm dark:border-slate-700 dark:bg-slate-900"
                  value={activeDraft.vehicleModel}
                  onChange={(e) => setDraftField(activeDriver.id, "vehicleModel", e.target.value)}
                />
              </div>
              <div>
                <p className="mb-1 text-xs text-slate-500">Registration number</p>
                <input
                  className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm dark:border-slate-700 dark:bg-slate-900"
                  value={activeDraft.registrationNumber}
                  onChange={(e) => setDraftField(activeDriver.id, "registrationNumber", e.target.value)}
                />
              </div>
              <div>
                <p className="mb-1 text-xs text-slate-500">Seat count</p>
                <input
                  type="number"
                  min={1}
                  max={8}
                  className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm dark:border-slate-700 dark:bg-slate-900"
                  value={activeDraft.seatCount}
                  onChange={(e) => setDraftField(activeDriver.id, "seatCount", Number(e.target.value || 4))}
                />
              </div>
              <div>
                <p className="mb-1 text-xs text-slate-500">Insurance expiry (DD/MM/YYYY)</p>
                <input
                  className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm dark:border-slate-700 dark:bg-slate-900"
                  value={activeDraft.insuranceExpiry}
                  onChange={(e) => setDraftField(activeDriver.id, "insuranceExpiry", e.target.value)}
                />
              </div>
              <div>
                <p className="mb-1 text-xs text-slate-500">PUC expiry (DD/MM/YYYY)</p>
                <input
                  className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm dark:border-slate-700 dark:bg-slate-900"
                  value={activeDraft.pucExpiry}
                  onChange={(e) => setDraftField(activeDriver.id, "pucExpiry", e.target.value)}
                />
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-3">
              <label className="inline-flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={activeDraft.aadhaarVerified}
                  onChange={(e) => setDraftField(activeDriver.id, "aadhaarVerified", e.target.checked)}
                />
                Aadhaar verified
              </label>
              <label className="inline-flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={activeDraft.licenseVerified}
                  onChange={(e) => setDraftField(activeDriver.id, "licenseVerified", e.target.checked)}
                />
                License verified
              </label>
              <label className="inline-flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={activeDraft.ac}
                  onChange={(e) => setDraftField(activeDriver.id, "ac", e.target.checked)}
                />
                AC
              </label>
            </div>

            <div className="mt-3 flex flex-wrap gap-2 text-xs text-blue-700">
              {activeDriver.aadhaar_url ? (
                <a className="underline" href={activeDriver.aadhaar_url} target="_blank" rel="noreferrer">
                  Aadhaar file
                </a>
              ) : null}
              {activeDriver.license_url ? (
                <a className="underline" href={activeDriver.license_url} target="_blank" rel="noreferrer">
                  License file
                </a>
              ) : null}
              {activeDriver.rc_url ? (
                <a className="underline" href={activeDriver.rc_url} target="_blank" rel="noreferrer">
                  RC file
                </a>
              ) : null}
              {activeDriver.insurance_url ? (
                <a className="underline" href={activeDriver.insurance_url} target="_blank" rel="noreferrer">
                  Insurance file
                </a>
              ) : null}
              {activeDriver.puc_url ? (
                <a className="underline" href={activeDriver.puc_url} target="_blank" rel="noreferrer">
                  PUC file
                </a>
              ) : null}
            </div>

            <div className="mt-4">
              <p className="mb-1 text-xs text-slate-500">Reason (mandatory for reject/suspend)</p>
              <textarea
                rows={3}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
                value={activeDraft.rejectionReason}
                onChange={(e) => setDraftField(activeDriver.id, "rejectionReason", e.target.value)}
                placeholder="Add rejection/suspension reason"
              />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => sendDriverKit(activeDriver.id)}
                disabled={busyId === activeDriver.id}
              >
                Resend driver kit
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => saveDriverDetails(activeDriver.id)}
                disabled={busyId === activeDriver.id}
              >
                Save details
              </Button>
              <Button
                size="sm"
                onClick={() => updateApproval(activeDriver.id, "approved")}
                disabled={busyId === activeDriver.id}
              >
                Approve
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => updateApproval(activeDriver.id, "rejected")}
                disabled={busyId === activeDriver.id}
              >
                Reject
              </Button>
              <Button
                size="sm"
                variant="danger"
                onClick={() => updateApproval(activeDriver.id, "suspended")}
                disabled={busyId === activeDriver.id}
              >
                Suspend
              </Button>
            </div>

            {activeDriver.approved_at ? (
              <p className="mt-3 text-xs text-slate-500">
                Last decision at: {new Date(activeDriver.approved_at).toLocaleString()}
              </p>
            ) : null}
          </div>
        </div>
      ) : null}

      {message ? <p className="mt-3 text-sm text-emerald-700">{message}</p> : null}
    </Card>
  );
}
