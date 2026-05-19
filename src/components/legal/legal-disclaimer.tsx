import { cn } from "@/lib/utils";
import { ShieldCheck } from "lucide-react";

interface LegalDisclaimerProps {
  compact?: boolean;
  className?: string;
}

export function LegalDisclaimer({ compact = false, className }: LegalDisclaimerProps) {
  if (compact) {
    return (
      <p
        className={cn(
          "flex items-start gap-1.5 text-xs leading-relaxed text-slate-500 dark:text-slate-400",
          className
        )}
      >
        <ShieldCheck
          size={12}
          className="mt-0.5 shrink-0 text-slate-400 dark:text-slate-500"
        />
        Drivers listed on SafeSobati are independent transport providers. SafeSobati acts as a
        technology and booking facilitation platform only. Vehicle permits, insurance, and
        transport compliance remain the driver&rsquo;s responsibility.
      </p>
    );
  }

  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 dark:border-slate-700 dark:bg-slate-900/50",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <ShieldCheck
          size={16}
          className="mt-0.5 shrink-0 text-slate-400 dark:text-slate-500"
        />
        <div className="space-y-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
          <p>
            <strong className="font-semibold text-slate-600 dark:text-slate-300">
              Platform disclaimer
            </strong>{" "}
            &mdash; Drivers listed on SafeSobati are independent transport providers, not
            employees or agents of SafeSobati Technologies Pvt. Ltd.
          </p>
          <p>
            SafeSobati acts as a technology and booking facilitation platform. We connect
            riders with commercial transport providers. Vehicle permits, insurance, and all
            applicable transport compliance obligations remain the sole responsibility of the
            individual driver.
          </p>
        </div>
      </div>
    </div>
  );
}
