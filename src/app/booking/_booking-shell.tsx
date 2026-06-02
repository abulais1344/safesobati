"use client";

import { useState } from "react";
import { BookingForm } from "@/components/forms/booking-form";

export function BookingShell() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <>
      {currentStep === 1 && (
        <div>
          <h1 className="font-display text-3xl font-semibold">Create your booking request</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Get quotes from verified nearby drivers, compare options and confirm confidently.
          </p>
        </div>
      )}
      <div className={currentStep === 1 ? "mt-6" : ""}>
        <BookingForm onStepChange={setCurrentStep} />
      </div>
    </>
  );
}
