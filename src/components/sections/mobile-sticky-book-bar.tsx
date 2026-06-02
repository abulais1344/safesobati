"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { MessageCircle, Navigation } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { Button } from "@/components/ui/button";

function buildWhatsAppLink() {
  const phone = (process.env.NEXT_PUBLIC_SUPPORT_WHATSAPP_NUMBER ?? "").replace(/\D/g, "");
  if (!phone) {
    return "/contact";
  }

  const text = encodeURIComponent("Hi SafeSobati, I need help booking a ride.");
  return `https://wa.me/${phone}?text=${text}`;
}

export function MobileStickyBookBar() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const whatsappHref = useMemo(() => buildWhatsAppLink(), []);

  useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.scrollY > 420);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-amber-200/70 bg-[#fff8ef] p-3 md:hidden dark:border-slate-700 dark:bg-slate-950 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      } transition-transform duration-300`}
      aria-hidden={!isVisible}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center gap-2">
        <Link href="/booking" className="flex-1">
          <Button className="h-11 w-full">
            <Navigation size={16} />
            {t("mobile_book_now")}
          </Button>
        </Link>

        <Link
          href={whatsappHref}
          target={whatsappHref.startsWith("http") ? "_blank" : undefined}
          rel={whatsappHref.startsWith("http") ? "noreferrer" : undefined}
          className="flex-1"
        >
          <Button variant="secondary" className="h-11 w-full">
            <MessageCircle size={16} />
            {t("mobile_whatsapp")}
          </Button>
        </Link>
      </div>
    </div>
  );
}
