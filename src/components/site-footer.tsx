"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandMark } from "@/components/brand-mark";

export function SiteFooter() {
  const pathname = usePathname();
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
            Startup-grade trusted mobility platform for tier-2 and tier-3 India.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Company</h4>
          <ul className="mt-2 space-y-2 text-sm text-slate-700 dark:text-slate-300">
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/safety">Safety</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Platform</h4>
          <ul className="mt-2 space-y-2 text-sm text-slate-700 dark:text-slate-300">
            <li>
              <Link href="/live-activity">Live activity</Link>
            </li>
            <li>
              <Link href="/search">Search rides</Link>
            </li>
            <li>
              <Link href="/driver/register">Become a driver</Link>
            </li>
            <li>
              <Link href="/driver/dashboard">Driver dashboard</Link>
            </li>
            <li>
              <Link href="/admin/dashboard">Admin dashboard</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Legal</h4>
          <ul className="mt-2 space-y-2 text-sm text-slate-700 dark:text-slate-300">
            <li>
              <Link href="/terms">Terms</Link>
            </li>
            <li>
              <Link href="/privacy">Privacy</Link>
            </li>
            <li>
              <Link href="/driver-agreement">Driver Agreement</Link>
            </li>
            <li>
              <Link href="/safety">Safety</Link>
            </li>
            <li>
              <Link href="/faqs">FAQs</Link>
            </li>
            <li>
              <Link href="/contact">Contact Support</Link>
            </li>
          </ul>
        </div>
      </div>
      <p className="mt-10 text-center text-xs text-slate-600 dark:text-slate-400">
        © {new Date().getFullYear()} Safeसोबती Technologies Pvt. Ltd. All rights reserved.
      </p>
    </footer>
  );
}
