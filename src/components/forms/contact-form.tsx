"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactInput } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    setSent(true);
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Name</label>
          <Input {...register("name")} />
          {errors.name ? <p className="mt-1 text-xs text-rose-600">{errors.name.message}</p> : null}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Email</label>
          <Input type="email" {...register("email")} />
          {errors.email ? <p className="mt-1 text-xs text-rose-600">{errors.email.message}</p> : null}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Phone</label>
          <Input {...register("phone")} />
          {errors.phone ? <p className="mt-1 text-xs text-rose-600">{errors.phone.message}</p> : null}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Message</label>
          <Textarea {...register("message")} />
          {errors.message ? <p className="mt-1 text-xs text-rose-600">{errors.message.message}</p> : null}
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending" : "Send message"}
        </Button>
      </form>

      {sent ? <p className="mt-3 text-sm text-emerald-700">Our team will reach out shortly.</p> : null}
    </Card>
  );
}
