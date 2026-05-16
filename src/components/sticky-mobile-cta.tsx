import Link from "next/link";
import { MessageCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function StickyMobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200/70 bg-white/95 p-3 backdrop-blur-xl md:hidden dark:border-slate-700 dark:bg-slate-950/90">
      <div className="mx-auto grid max-w-lg grid-cols-2 gap-2">
        <Link href="/search">
          <Button className="w-full" size="sm">
            <Search size={15} />
            Find Ride
          </Button>
        </Link>
        <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer">
          <Button variant="secondary" className="w-full" size="sm">
            <MessageCircle size={15} />
            WhatsApp
          </Button>
        </a>
      </div>
    </div>
  );
}
