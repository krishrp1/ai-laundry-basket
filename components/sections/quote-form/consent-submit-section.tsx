import { Loader2, Send } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Reveal } from "@/components/motion/reveal";
import { HONEYPOT_FIELD } from "@/lib/spam-guard-constants";
import type { QuoteFormValues } from "./types";

export function ConsentSubmitSection({
  consent,
  consentError,
  formError,
  submitting,
  updateField,
}: {
  consent: boolean;
  consentError?: string;
  formError: string | null;
  submitting: boolean;
  updateField: <K extends keyof QuoteFormValues>(field: K, value: QuoteFormValues[K]) => void;
}) {
  return (
    <Reveal delay={0.25}>
      <Card>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-start gap-3">
            <Checkbox
              id="quote-consent"
              checked={consent}
              onCheckedChange={(checked) => updateField("consent", Boolean(checked))}
              aria-invalid={Boolean(consentError)}
              aria-describedby={consentError ? "quote-consent-error" : undefined}
            />
            <Label htmlFor="quote-consent" className="font-normal">
              I agree to be contacted about this quote request and have read
              the Terms of Service and Privacy Policy.
            </Label>
          </div>
          {consentError && (
            <p id="quote-consent-error" className="text-xs text-destructive">
              {consentError}
            </p>
          )}

          {/* Honeypot: hidden from real users, bots tend to fill every field. */}
          <input
            type="text"
            name={HONEYPOT_FIELD}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="sr-only"
          />

          {formError && (
            <p role="alert" className="text-sm text-destructive">
              {formError}
            </p>
          )}

          <Separator />

          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
            <Badge variant="outline" className="font-normal">
              Typical reply time: one business day
            </Badge>
            <Button type="submit" disabled={submitting} className="w-full gap-1.5 sm:w-auto">
              {submitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Submitting
                </>
              ) : (
                <>
                  <Send className="size-4" />
                  Get Instant Quote
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </Reveal>
  );
}
