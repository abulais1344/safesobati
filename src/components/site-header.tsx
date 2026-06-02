"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { useLanguage } from "@/components/providers/language-provider";
import { BrandMark } from "@/components/brand-mark";

const navHrefs = [
  { href: "/search", key: "nav_search" },
  { href: "/driver-benefits", key: "nav_driver_benefits" },
  { href: "/driver/register", key: "nav_driver_reg" },
  { href: "/auth/sign-in", key: "nav_sign_in" },
  { href: "/safety", key: "nav_safety" },
  { href: "/faqs", key: "nav_faqs" },
  { href: "/contact", key: "nav_contact" },
] as const;

export function SiteHeader() {
  const { t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-amber-200/60 bg-[#fff8ef] dark:border-slate-700/80 dark:bg-slate-950">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-[0_10px_26px_-12px_rgba(234,88,12,0.45)] ring-1 ring-slate-900/10 dark:bg-slate-950 dark:ring-white/10">
            <BrandMark size={32} />
          </div>
          <div>
            <p className="text-sm font-semibold leading-none text-slate-900 dark:text-white">Safeसोबती</p>
            <p className="text-xs text-slate-600 dark:text-slate-300">{t("header_tagline")}</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-amber-200/80 bg-white p-1 md:flex dark:border-slate-700 dark:bg-slate-900">
          {navHrefs.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-amber-100 hover:text-amber-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
          <Link href="/booking" className="hidden sm:block">
            <Button size="sm">{t("header_book_ride")}</Button>
          </Link>
          <Button
            variant="secondary"
            size="icon"
            className="md:hidden"
            aria-label="Open menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav-menu"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
          >
            <Menu size={18} />
          </Button>
        </div>
      </div>

      <div
        id="mobile-nav-menu"
        className={`mx-auto w-full max-w-7xl px-4 pb-3 sm:px-6 md:hidden lg:px-8 ${
          isMobileMenuOpen ? "block" : "hidden"
        }`}
      >
        <nav className="space-y-1 rounded-2xl border border-amber-200/80 bg-white p-2 dark:border-slate-700 dark:bg-slate-900">
          {navHrefs.map((item) => (
            <Link
              key={`mobile-${item.href}`}
              href={item.href}
              className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-amber-100 hover:text-amber-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t(item.key)}
            </Link>
          ))}
          <Link href="/booking" className="block" onClick={() => setIsMobileMenuOpen(false)}>
            <Button size="sm" className="mt-1 w-full">
              {t("header_book_ride")}
            </Button>
          </Link>
        </nav>
      </div>

      <div className="mx-auto hidden w-full max-w-7xl items-center justify-between px-4 pb-3 text-xs text-slate-600 sm:flex sm:px-6 lg:px-8 dark:text-slate-300">
        <p className="font-medium">{t("header_sub")}</p>
        <div className="flex items-center gap-2">
          <Smartphone size={14} className="text-brand" />
          <span>Live route bidding and instant driver replies</span>
        </div>
      </div>
    </header>
  );
}
