"use client";

import { Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type StepperProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  /** Used to build accessible labels, e.g. "T-Shirts" -> "Increase T-Shirts". */
  label: string;
  className?: string;
};

function Stepper({
  value,
  onChange,
  min = 0,
  max = 99,
  step = 1,
  label,
  className,
}: StepperProps) {
  return (
    <div
      className={cn("flex items-center gap-2.5", className)}
      role="group"
      aria-label={`${label} quantity`}
    >
      <Button
        type="button"
        variant="outline"
        size="icon-sm"
        disabled={value <= min}
        aria-label={`Decrease ${label}`}
        onClick={() => onChange(Math.max(min, value - step))}
      >
        <Minus className="size-3.5" />
      </Button>
      <span
        className="w-6 text-center text-sm font-semibold tabular-nums"
        aria-live="polite"
      >
        {value}
      </span>
      <Button
        type="button"
        variant="outline"
        size="icon-sm"
        disabled={value >= max}
        aria-label={`Increase ${label}`}
        onClick={() => onChange(Math.min(max, value + step))}
      >
        <Plus className="size-3.5" />
      </Button>
    </div>
  );
}

export { Stepper };
