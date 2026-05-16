import type { Metadata } from "next";
import { AuthForm } from "@/components/forms/auth-form";
import { Card } from "@/components/ui/card";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(
  "Sign In",
  "Secure authentication for riders, drivers and admin users.",
  "/auth/sign-in"
);

export default function SignInPage() {
  return (
    <div className="mx-auto flex w-full max-w-md px-4 py-16 sm:px-6 lg:px-8">
      <Card className="w-full p-6">
        <h1 className="font-display text-2xl font-semibold">Welcome to SafeSobati</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Sign in to manage bookings, rides and profile securely.
        </p>
        <div className="mt-5">
          <AuthForm />
        </div>
      </Card>
    </div>
  );
}
