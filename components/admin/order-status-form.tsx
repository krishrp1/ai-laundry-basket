"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function OrderStatusForm({
  action,
  currentStatus,
  options,
}: {
  action: (formData: FormData) => void | Promise<void>;
  currentStatus: string;
  options: { value: string; label: string }[];
}) {
  const [isPending, startTransition] = React.useTransition();
  const formRef = React.useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        startTransition(async () => {
          await action(formData);
          formRef.current?.reset();
        });
      }}
      className="flex flex-col gap-3"
    >
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="order-status">Update status</Label>
        <select
          id="order-status"
          name="status"
          defaultValue={currentStatus}
          className="h-9 rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="order-note">Note (optional, included in the customer email)</Label>
        <Textarea id="order-note" name="note" rows={2} />
      </div>
      <Button type="submit" disabled={isPending} className="w-fit gap-1.5">
        {isPending && <Loader2 className="size-4 animate-spin" />}
        Save status
      </Button>
    </form>
  );
}
