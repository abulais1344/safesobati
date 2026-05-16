import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[50vh] w-full max-w-3xl flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">404</p>
      <h1 className="mt-3 font-display text-3xl font-semibold">This route is not available yet</h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        We are scaling SafeSobati rapidly. Let us take you back to active booking routes.
      </p>
      <Link href="/" className="mt-5">
        <Button>Go to homepage</Button>
      </Link>
    </div>
  );
}
