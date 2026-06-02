"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/providers/language-provider";

export function StickyMobileCTA() {
  const pathname = usePathname();
  const { t } = useLanguage();
  if (pathname === "/booking") return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200/70 bg-white p-3 md:hidden dark:border-slate-700 dark:bg-slate-950">
      <div className="mx-auto grid max-w-lg grid-cols-2 gap-2">
        <Link href="/search">
          <Button className="w-full" size="sm">
            <Search size={15} />
            {t("mobile_book_now")}
          </Button>
        </Link>
        <a href="https://wa.me/918421222893" target="_blank" rel="noreferrer">
          <Button variant="secondary" className="w-full" size="sm">
            <MessageCircle size={15} />
            {t("mobile_whatsapp")}
          </Button>
        </a>
      </div>
    </div>
  );
}
