"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandMark } from "@/components/brand-mark";
import { useLanguage } from "@/components/providers/language-provider";

export function SiteFooter() {
  const pathname = usePathname();
  const { t } = useLanguage();
  if (pathname === "/booking") return null;

  return (
    <footer className="border-t border-amber-200/60 bg-[#fff8ef] py-10 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white ring-1 ring-slate-900/10 dark:bg-slate-950 dark:ring-white/10">
              <BrandMark size={28} />
            </div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">Safeसोबती</h3>
          </div>
          <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
            {t("footer.tagline")}
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{t("footer.company")}</h4>
          <ul className="mt-2 space-y-2 text-sm text-slate-700 dark:text-slate-300">
            <li><Link href="/about">{t("footer.about")}</Link></li>
            <li><Link href="/safety">{t("footer.safety")}</Link></li>
            <li><Link href="/contact">{t("footer.contact")}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{t("footer.platform")}</h4>
          <ul className="mt-2 space-y-2 text-sm text-slate-700 dark:text-slate-300">
            <li><Link href="/live-activity">{t("footer.liveActivity")}</Link></li>
            <li><Link href="/search">{t("footer.searchRides")}</Link></li>
            <li><Link href="/driver/register">{t("driver.becomeDriver")}</Link></li>
            <li><Link href="/driver/dashboard">Driver dashboard</Link></li>
            <li><Link href="/admin/dashboard">Admin dashboard</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{t("footer.legal")}</h4>
          <ul className="mt-2 space-y-2 text-sm text-slate-700 dark:text-slate-300">
            <li><Link href="/terms">{t("footer.terms")}</Link></li>
            <li><Link href="/privacy">{t("footer.privacy")}</Link></li>
            <li><Link href="/driver-agreement">{t("footer.driverAgreement")}</Link></li>
            <li><Link href="/safety">{t("footer.safety")}</Link></li>
            <li><Link href="/faqs">FAQs</Link></li>
            <li><Link href="/contact">{t("footer.contactSupport")}</Link></li>
          </ul>
        </div>
      </div>
      <p className="mt-10 text-center text-xs text-slate-600 dark:text-slate-400">
        © {new Date().getFullYear()} Safeसोबती Technologies Pvt. Ltd. All rights reserved.
      </p>
    </footer>
  );
}
