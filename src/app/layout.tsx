import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Sora, Space_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { LanguageProvider } from "@/components/providers/language-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { StickyMobileCTA } from "@/components/sticky-mobile-cta";
import { defaultMetadata } from "@/lib/seo";

const bodyFont = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const displayFont = Sora({
  variable: "--font-display",
  subsets: ["latin"],
});

const monoFont = Space_Mono({
  variable: "--font-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased">
      <body className={`${bodyFont.variable} ${displayFont.variable} ${monoFont.variable} min-h-full`}>
        <ThemeProvider>
          <LanguageProvider>
            <div className="flex min-h-screen flex-col">
              <SiteHeader />
              <main className="flex-1 pb-20 md:pb-0">{children}</main>
              <SiteFooter />
              <StickyMobileCTA />
            </div>
            <Toaster position="top-center" richColors closeButton />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
