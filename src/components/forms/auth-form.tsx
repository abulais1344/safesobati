"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AuthForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"sign-in" | "sign-up">("sign-in");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const action =
      mode === "sign-in"
        ? supabaseClient.auth.signInWithPassword({ email, password })
        : supabaseClient.auth.signUp({ email, password });

    const { error } = await action;

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    setMessage(mode === "sign-in" ? "Signed in successfully" : "Account created successfully");
    setLoading(false);
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div>
        <label className="mb-1 block text-sm font-medium">Email</label>
        <Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Password</label>
        <Input
          type="password"
          minLength={6}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Please wait" : mode === "sign-in" ? "Sign in" : "Create account"}
      </Button>

      <button
        type="button"
        className="text-left text-sm font-medium text-brand-dark"
        onClick={() => setMode(mode === "sign-in" ? "sign-up" : "sign-in")}
      >
        {mode === "sign-in" ? "Need an account? Sign up" : "Already have an account? Sign in"}
      </button>

      {message ? <p className="text-sm text-slate-600 dark:text-slate-300">{message}</p> : null}
    </form>
  );
}
