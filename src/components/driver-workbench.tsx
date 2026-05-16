"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

type DriverRequest = {
  id: string;
  pickup: string;
  drop: string;
  trip_type: string;
  date: string;
  status: string;
};

export function DriverWorkbench() {
  const [driverId, setDriverId] = useState("");
  const [available, setAvailable] = useState(false);
  const [requests, setRequests] = useState<DriverRequest[]>([]);
  const [quoteAmountByRequest, setQuoteAmountByRequest] = useState<Record<string, string>>({});
  const [messageByRequest, setMessageByRequest] = useState<Record<string, string>>({});
  const [statusMessage, setStatusMessage] = useState("");
  const [loadingRequests, setLoadingRequests] = useState(false);

  const loadRequests = async () => {
    setLoadingRequests(true);
    setStatusMessage("");
    const response = await fetch(`/api/driver/requests?driverId=${driverId}`);
    const data = await response.json();

    if (!response.ok) {
      setStatusMessage(data.error ?? "Unable to load requests");
      setLoadingRequests(false);
      return;
    }

    setRequests(data.requests ?? []);
    setLoadingRequests(false);
  };

  const toggleAvailability = async () => {
    const nextValue = !available;
    const response = await fetch(`/api/drivers/${driverId}/availability`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ available: nextValue }),
    });

    const data = await response.json();

    if (!response.ok) {
      setStatusMessage(data.error ?? "Unable to update availability");
      return;
    }

    setAvailable(nextValue);
    setStatusMessage(`Availability updated to ${nextValue ? "ON" : "OFF"}`);
  };

  const submitQuote = async (rideRequestId: string) => {
    const quoteAmount = Number(quoteAmountByRequest[rideRequestId] ?? 0);
    const message = messageByRequest[rideRequestId] ?? "";

    const response = await fetch("/api/driver-quotes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        rideRequestId,
        driverId,
        quoteAmount,
        message,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setStatusMessage(data.error ?? "Unable to submit quote");
      return;
    }

    setStatusMessage(`Quote sent for request ${rideRequestId}`);
  };

  return (
    <Card className="mt-6 p-5">
      <h2 className="text-lg font-semibold">Driver live workflow</h2>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
        Enter approved driver ID, toggle availability and quote active requests.
      </p>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        <Input
          placeholder="Driver ID"
          value={driverId}
          onChange={(event) => setDriverId(event.target.value)}
        />
        <Button variant="secondary" onClick={loadRequests} disabled={!driverId}>
          {loadingRequests ? "Loading" : "Load requests"}
        </Button>
        <Button onClick={toggleAvailability} disabled={!driverId}>
          {available ? "Go offline" : "Go online"}
        </Button>
      </div>

      <div className="mt-5 space-y-4">
        {loadingRequests
          ? Array.from({ length: 2 }).map((_, index) => (
              <div key={`driver-request-skeleton-${index}`} className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="mt-2 h-4 w-1/2" />
                <div className="mt-3 grid gap-2 sm:grid-cols-3">
                  <Skeleton className="h-11" />
                  <Skeleton className="h-11" />
                  <Skeleton className="h-11" />
                </div>
              </div>
            ))
          : requests.map((item) => (
          <div key={item.id} className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
            <p className="font-semibold">
              {item.pickup} to {item.drop}
            </p>
            <p className="mt-1 text-xs text-slate-500">{item.trip_type} • {new Date(item.date).toLocaleString()}</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              <Input
                type="number"
                placeholder="Quote amount"
                value={quoteAmountByRequest[item.id] ?? ""}
                onChange={(event) =>
                  setQuoteAmountByRequest((prev) => ({ ...prev, [item.id]: event.target.value }))
                }
              />
              <Input
                placeholder="Message"
                value={messageByRequest[item.id] ?? ""}
                onChange={(event) =>
                  setMessageByRequest((prev) => ({ ...prev, [item.id]: event.target.value }))
                }
              />
              <Button onClick={() => submitQuote(item.id)}>Send quote</Button>
            </div>
          </div>
        ))}
      </div>

      {statusMessage ? <p className="mt-4 text-sm text-emerald-700">{statusMessage}</p> : null}
    </Card>
  );
}
