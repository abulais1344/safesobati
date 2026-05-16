"use client";

import Link from "next/link";
import { Menu, ShieldCheck, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { useLanguage } from "@/components/providers/language-provider";

const navHrefs = [
  { href: "/search", key: "nav_search" },
  { href: "/driver/register", key: "nav_driver_reg" },
  { href: "/auth/sign-in", key: "nav_sign_in" },
  { href: "/safety", key: "nav_safety" },
  { href: "/faqs", key: "nav_faqs" },
  { href: "/contact", key: "nav_contact" },
] as const;

export function SiteHeader() {
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 border-b border-white/40 bg-white/70 backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-950/70">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-white shadow-lg">
            <ShieldCheck size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold leading-none">SafeSobati</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{t("header_tagline")}</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-5 md:flex">
          {navHrefs.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
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
          <Button variant="secondary" size="icon" className="md:hidden" aria-label="Open menu">
            <Menu size={18} />
          </Button>
        </div>
      </div>

      <div className="mx-auto hidden w-full max-w-7xl items-center justify-between px-4 pb-3 text-xs text-slate-500 sm:flex sm:px-6 lg:px-8">
        <p>{t("header_sub")}</p>
        <div className="flex items-center gap-2">
          <Smartphone size={14} />
          <span>App-like mobile booking flow</span>
        </div>
      </div>
    </header>
  );
}
