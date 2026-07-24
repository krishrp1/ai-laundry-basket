"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function StatusSelectForm({
  action,
  currentStatus,
  options,
  className,
}: {
  action: (formData: FormData) => void | Promise<void>;
  currentStatus: string;
  options: { value: string; label: string }[];
  className?: string;
}) {
  const formRef = React.useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = React.useTransition();

  return (
    <form ref={formRef} action={action}>
      <select
        name="status"
        defaultValue={currentStatus}
        disabled={isPending}
        onChange={() => {
          startTransition(() => {
            formRef.current?.requestSubmit();
          });
        }}
        className={cn(
          "h-8 rounded-lg border border-input bg-transparent px-2 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-50",
          className
        )}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </form>
  );
}
