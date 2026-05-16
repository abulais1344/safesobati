"use client";

import { useEffect, useRef, useState } from "react";

type AnimatedNumberProps = {
  value: number;
  durationMs?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};

export function AnimatedNumber({
  value,
  durationMs = 900,
  prefix = "",
  suffix = "",
  className,
}: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const previousValueRef = useRef(0);

  useEffect(() => {
    const startValue = previousValueRef.current;
    const startTime = performance.now();

    let frameId: number;

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / durationMs, 1);

      // Ease-out cubic for a smoother marketplace counter animation.
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = Math.round(startValue + (value - startValue) * eased);
      setDisplayValue(next);

      if (progress < 1) {
        frameId = window.requestAnimationFrame(step);
      } else {
        previousValueRef.current = value;
      }
    };

    frameId = window.requestAnimationFrame(step);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [durationMs, value]);

  return <span className={className}>{`${prefix}${displayValue.toLocaleString()}${suffix}`}</span>;
}
