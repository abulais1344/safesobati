"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { type Locale, localeLabels, locales } from "@/lib/i18n";

export function LanguageToggle() {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      className="flex items-center rounded-lg border border-slate-200 bg-white p-0.5 dark:border-slate-700 dark:bg-slate-900"
      role="group"
      aria-label="Select language"
    >
      {locales.map((l: Locale) => (
        <button
          key={l}
          type="button"
          onClick={() => setLocale(l)}
          aria-pressed={locale === l}
          className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-all ${
            locale === l
              ? "bg-brand text-white shadow-sm"
              : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          }`}
        >
          {localeLabels[l]}
        </button>
      ))}
    </div>
  );
}
