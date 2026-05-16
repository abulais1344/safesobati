"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type PendingDriver = {
  id: string;
  status: "pending" | "approved" | "rejected" | "suspended";
  aadhaar_verified: boolean;
  license_verified: boolean;
  users: {
    name: string;
    phone: string;
    city: string;
  };
};

export function AdminDriverApproval() {
  const [pendingDrivers, setPendingDrivers] = useState<PendingDriver[]>([]);
  const [message, setMessage] = useState("");

  const loadPendingDrivers = async () => {
    const response = await fetch("/api/admin/drivers/pending");
    const data = await response.json();

    if (!response.ok) {
      setMessage(data.error ?? "Unable to load pending drivers");
      return;
    }

    setPendingDrivers(data.drivers ?? []);
    setMessage("");
  };

  const updateApproval = async (
    driverId: string,
    status: "approved" | "rejected" | "suspended",
    aadhaarVerified: boolean,
    licenseVerified: boolean
  ) => {
    const response = await fetch(`/api/admin/drivers/${driverId}/approval`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status,
        aadhaarVerified,
        licenseVerified,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setMessage(data.error ?? "Unable to update approval status");
      return;
    }

    setMessage(`Updated ${driverId} to ${data.status}`);
    await loadPendingDrivers();
  };

  return (
    <Card className="mt-6 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-semibold">Driver approval workflow</h3>
        <Button variant="secondary" onClick={loadPendingDrivers}>
          Refresh pending drivers
        </Button>
      </div>

      <div className="mt-4 space-y-3">
        {pendingDrivers.length === 0 ? (
          <p className="text-sm text-slate-600 dark:text-slate-300">No pending records loaded yet.</p>
        ) : (
          pendingDrivers.map((driver) => (
            <div key={driver.id} className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
              <p className="font-semibold">{driver.users.name}</p>
              <p className="text-xs text-slate-500">
                {driver.users.phone} • {driver.users.city} • {driver.status}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button
                  size="sm"
                  onClick={() => updateApproval(driver.id, "approved", true, true)}
                >
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    updateApproval(driver.id, "rejected", driver.aadhaar_verified, driver.license_verified)
                  }
                >
                  Reject
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() =>
                    updateApproval(driver.id, "suspended", driver.aadhaar_verified, driver.license_verified)
                  }
                >
                  Suspend
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {message ? <p className="mt-3 text-sm text-emerald-700">{message}</p> : null}
    </Card>
  );
}
