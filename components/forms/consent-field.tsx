"use client";

import Link from "next/link";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { siteConfig } from "@/config/site";

/**
 * Required consent checkbox shared by the public forms. The policy link opens
 * in a new tab so the visitor never loses what they have typed.
 */
export function ConsentField({
  id,
  checked,
  onCheckedChange,
  error,
}: {
  id: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  error?: string;
}) {
  const errorId = `${id}-error`;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-start gap-3">
        <Checkbox
          id={id}
          className="mt-0.5 size-5"
          checked={checked}
          onCheckedChange={(next) => onCheckedChange(Boolean(next))}
          aria-required="true"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
        />
        <Label htmlFor={id} className="text-base font-normal">
          <span>
            I have read the{" "}
            <Link
              href="/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary underline underline-offset-2"
            >
              Privacy Policy
              <span className="sr-only"> (opens in a new tab)</span>
            </Link>{" "}
            and agree to {siteConfig.name} using the details I enter here to
            respond to this request. <span aria-hidden="true">*</span>
          </span>
        </Label>
      </div>
      {error && (
        <p id={errorId} className="text-sm font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
