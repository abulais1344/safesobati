"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type Quote = {
  id: string;
  quote_amount: number;
  message: string | null;
  status: "active" | "accepted" | "rejected" | "expired";
  created_at: string;
  drivers?: {
    rating: number;
    users?: {
      name: string;
      city: string;
    };
  };
};

type Props = {
  requestId: string;
};

export function CustomerQuotesPanel({ requestId }: Props) {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(false);
  const [acceptingQuoteId, setAcceptingQuoteId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const hasAcceptedQuote = useMemo(
    () => quotes.some((quote) => quote.status === "accepted"),
    [quotes]
  );

  const loadQuotes = async () => {
    setLoading(true);
    setMessage("");

    const response = await fetch(`/api/ride-requests/${requestId}/quotes`, { method: "GET" });
    const data = await response.json();

    if (!response.ok) {
      setMessage(data.error ?? "Unable to load quotes");
      setLoading(false);
      return;
    }

    setQuotes(data.quotes ?? []);
    setLoading(false);
  };

  const acceptQuote = async (quoteId: string) => {
    setAcceptingQuoteId(quoteId);
    setMessage("");

    const response = await fetch(`/api/driver-quotes/${quoteId}/accept`, { method: "POST" });
    const data = await response.json();

    if (!response.ok) {
      setMessage(data.error ?? "Unable to accept quote");
      setAcceptingQuoteId(null);
      return;
    }

    setMessage("Driver confirmed. Contact details are now unlocked for this booking.");
    setAcceptingQuoteId(null);
    await loadQuotes();
  };

  return (
    <Card className="mt-6 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">Quotes for request {requestId}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Compare offers safely. Driver and customer contact details unlock only after confirmation.
          </p>
        </div>
        <Button variant="secondary" onClick={loadQuotes} disabled={loading}>
          {loading ? "Refreshing" : "Refresh quotes"}
        </Button>
      </div>

      <div className="mt-4 space-y-3">
        {loading ? (
          Array.from({ length: 2 }).map((_, index) => (
            <div key={`quote-skeleton-${index}`} className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
              <Skeleton className="h-6 w-28" />
              <Skeleton className="mt-3 h-4 w-full" />
              <Skeleton className="mt-2 h-4 w-2/3" />
              <Skeleton className="mt-4 h-9 w-28" />
            </div>
          ))
        ) : quotes.length === 0 ? (
          <p className="text-sm text-slate-600 dark:text-slate-300">No quotes yet. Drivers are being notified.</p>
        ) : (
          quotes.map((quote) => (
            <div
              key={quote.id}
              className="rounded-xl border border-slate-200 p-4 dark:border-slate-700"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xl font-semibold">INR {quote.quote_amount}</p>
                <p className="text-xs uppercase tracking-wide text-slate-500">{quote.status}</p>
              </div>
              {quote.drivers?.users?.name ? (
                <p className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-200">
                  {quote.drivers.users.name} • {quote.drivers.users.city}
                </p>
              ) : null}
              {typeof quote.drivers?.rating === "number" ? (
                <p className="mt-1 text-xs text-slate-500">Driver rating {quote.drivers.rating}</p>
              ) : null}
              {quote.message ? (
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{quote.message}</p>
              ) : null}
              {quote.status === "active" && !hasAcceptedQuote ? (
                <Button
                  className="mt-3"
                  onClick={() => acceptQuote(quote.id)}
                  disabled={acceptingQuoteId === quote.id}
                >
                  {acceptingQuoteId === quote.id ? "Confirming" : "Confirm this driver"}
                </Button>
              ) : null}
            </div>
          ))
        )}
      </div>

      {message ? <p className="mt-4 text-sm text-emerald-700">{message}</p> : null}
    </Card>
  );
}
