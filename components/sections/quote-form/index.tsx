"use client";

import * as React from "react";
import { m } from "framer-motion";
import { CheckCircle2, Loader2, Send } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";
import { weightTiers } from "@/config/pricing";
import { submitQuoteRequest } from "@/lib/actions/quote";
import { HONEYPOT_FIELD, FORM_TIMESTAMP_FIELD } from "@/lib/spam-guard-constants";
import { Field } from "./fields";
import { defaultFormValues, serviceTypes, pickupTimes, validate } from "./types";
import type { CustomerType, FormErrors, QuoteFormValues } from "./types";

export type { QuoteFormValues } from "./types";

const inputClass = "h-12 text-base";
const selectTriggerClass = "h-12 w-full text-base";

export function QuoteForm({
  initialValues,
}: {
  initialValues?: Partial<QuoteFormValues>;
} = {}) {
  const [values, setValues] = React.useState<QuoteFormValues>(() => ({
    ...defaultFormValues,
    ...initialValues,
  }));
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [status, setStatus] = React.useState<
    "idle" | "submitting" | "success"
  >("idle");
  const [formError, setFormError] = React.useState<string | null>(null);
  const [requestId, setRequestId] = React.useState<string | null>(null);
  const [isPending, startTransition] = React.useTransition();
  const renderedAtRef = React.useRef(0);

  React.useEffect(() => {
    renderedAtRef.current = Date.now();
  }, []);

  const minDate = React.useSyncExternalStore(
    () => () => {},
    () => new Date().toISOString().split("T")[0],
    () => ""
  );

  function updateField<K extends keyof QuoteFormValues>(
    field: K,
    value: QuoteFormValues[K]
  ) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(values, minDate);
    setErrors(nextErrors);
    setFormError(null);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setStatus("submitting");

    const formData = new FormData();
    formData.set("name", values.name);
    formData.set("email", values.email);
    formData.set("phone", values.phone);
    formData.set("address", values.address);
    formData.set("city", values.city);
    formData.set("zip", values.zip);
    formData.set("customerType", values.customerType);
    formData.set("serviceType", values.serviceType);
    formData.set("estimatedWeight", values.estimatedWeight);
    formData.set("recurring", values.recurring);
    formData.set("pickupDate", values.pickupDate);
    formData.set("pickupTime", values.pickupTime);
    formData.set("deliveryDate", values.deliveryDate);
    formData.set("urgency", values.urgency);
    formData.set("specialInstructions", values.specialInstructions);
    formData.set("contactMethod", values.contactMethod);
    formData.set("consent", values.consent ? "on" : "");
    // Read the honeypot's real DOM value (via the actual <form> element, not
    // React state — this field is intentionally uncontrolled) instead of
    // hardcoding "", which previously discarded whatever a bot had filled in.
    const honeypotInput = event.currentTarget.elements.namedItem(
      HONEYPOT_FIELD
    ) as HTMLInputElement | null;
    formData.set(HONEYPOT_FIELD, honeypotInput?.value ?? "");
    formData.set(FORM_TIMESTAMP_FIELD, String(renderedAtRef.current));

    startTransition(async () => {
      const result = await submitQuoteRequest({ status: "idle" }, formData);

      if (result.status === "success") {
        setRequestId(result.requestId);
        setStatus("success");
        return;
      }

      if (result.status === "error") {
        const fieldErrors: FormErrors = {};
        for (const [field, messages] of Object.entries(result.errors)) {
          if (messages?.[0]) {
            fieldErrors[field as keyof QuoteFormValues] = messages[0];
          }
        }
        setErrors(fieldErrors);
        setFormError(result.formError ?? null);
      }
      setStatus("idle");
    });
  }

  function handleReset() {
    setValues(defaultFormValues);
    setErrors({});
    setFormError(null);
    setRequestId(null);
    setStatus("idle");
    renderedAtRef.current = Date.now();
  }

  if (status === "success") {
    return (
      <Reveal>
        <Card>
          <CardContent>
            <m.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center gap-3 py-14 text-center"
            >
              <span className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <CheckCircle2 className="size-7" />
              </span>
              <p className="font-heading text-2xl font-semibold">
                Quote request received
              </p>
              <p className="max-w-sm text-base text-muted-foreground">
                Thanks, {values.name.split(" ")[0] || "there"}. We will call
                or message you within one business day with pricing and a
                pickup time.
              </p>
              {requestId && (
                <Badge variant="outline" className="text-sm font-normal">
                  Reference: {requestId}
                </Badge>
              )}
              <Button
                variant="outline"
                size="lg"
                className="h-12 px-6 text-base"
                onClick={handleReset}
              >
                Submit another request
              </Button>
            </m.div>
          </CardContent>
        </Card>
      </Reveal>
    );
  }

  return (
    <Reveal>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-7">
            <div>
              <p className="font-heading text-2xl font-semibold">Get a quote</p>
              <p className="mt-1 text-base text-muted-foreground">
                Fill this in and we will call you back with pricing.
              </p>
            </div>

            <fieldset className="flex flex-col gap-2">
              <legend className="text-base font-semibold">
                Is this for your home or a business?
              </legend>
              <div className="grid grid-cols-2 gap-3">
                {(
                  [
                    { value: "residential" as const, label: "Home" },
                    { value: "commercial" as const, label: "Business" },
                  ]
                ).map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => updateField("customerType", option.value as CustomerType)}
                    aria-pressed={values.customerType === option.value}
                    className={cn(
                      "flex h-14 items-center justify-center rounded-lg border-2 text-base font-semibold transition-colors",
                      values.customerType === option.value
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/40"
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </fieldset>

            <Field label="Your name" htmlFor="quote-name" error={errors.name} required>
              <Input
                id="quote-name"
                autoComplete="name"
                className={inputClass}
                value={values.name}
                onChange={(e) => updateField("name", e.target.value)}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "quote-name-error" : undefined}
              />
            </Field>

            <Field label="Phone number" htmlFor="quote-phone" error={errors.phone} required>
              <Input
                id="quote-phone"
                type="tel"
                autoComplete="tel"
                placeholder="+91 90199 61091"
                className={inputClass}
                value={values.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? "quote-phone-error" : undefined}
              />
            </Field>

            <Field label="Email" htmlFor="quote-email" error={errors.email} required>
              <Input
                id="quote-email"
                type="email"
                autoComplete="email"
                className={inputClass}
                value={values.email}
                onChange={(e) => updateField("email", e.target.value)}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "quote-email-error" : undefined}
              />
            </Field>

            <Field
              label="Address"
              htmlFor="quote-address"
              error={errors.address}
              hint="Flat / Apartment, Street, Area"
              required
            >
              <Input
                id="quote-address"
                autoComplete="street-address"
                placeholder="e.g. Flat 204, Prestige Tower, 100 Feet Road"
                className={inputClass}
                value={values.address}
                onChange={(e) => updateField("address", e.target.value)}
                aria-invalid={Boolean(errors.address)}
                aria-describedby={errors.address ? "quote-address-error" : undefined}
              />
            </Field>

            <Field label="City" htmlFor="quote-city" error={errors.city} required>
              <Input
                id="quote-city"
                autoComplete="address-level2"
                placeholder="e.g. Bengaluru"
                className={inputClass}
                value={values.city}
                onChange={(e) => updateField("city", e.target.value)}
                aria-invalid={Boolean(errors.city)}
                aria-describedby={errors.city ? "quote-city-error" : undefined}
              />
            </Field>

            <Field label="PIN code" htmlFor="quote-zip" error={errors.zip} required>
              <Input
                id="quote-zip"
                inputMode="numeric"
                autoComplete="postal-code"
                placeholder="e.g. 560070"
                maxLength={6}
                className={inputClass}
                value={values.zip}
                onChange={(e) => updateField("zip", e.target.value)}
                aria-invalid={Boolean(errors.zip)}
                aria-describedby={errors.zip ? "quote-zip-error" : undefined}
              />
            </Field>

            <Field
              label="What do you need cleaned?"
              htmlFor="quote-service-type"
              error={errors.serviceType}
              required
            >
              <Select
                value={values.serviceType}
                onValueChange={(value) => updateField("serviceType", value as string)}
              >
                <SelectTrigger
                  id="quote-service-type"
                  className={selectTriggerClass}
                  aria-invalid={Boolean(errors.serviceType)}
                  aria-describedby={
                    errors.serviceType ? "quote-service-type-error" : undefined
                  }
                >
                  <SelectValue placeholder="Choose a service" />
                </SelectTrigger>
                <SelectContent>
                  {serviceTypes.map((service) => (
                    <SelectItem key={service} value={service} className="py-2.5 text-base">
                      {service}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field
              label="About how much laundry?"
              htmlFor="quote-weight"
              error={errors.estimatedWeight}
              required
            >
              <Select
                value={values.estimatedWeight}
                onValueChange={(value) => updateField("estimatedWeight", value as string)}
              >
                <SelectTrigger
                  id="quote-weight"
                  className={selectTriggerClass}
                  aria-invalid={Boolean(errors.estimatedWeight)}
                  aria-describedby={
                    errors.estimatedWeight ? "quote-weight-error" : undefined
                  }
                >
                  <SelectValue placeholder="Choose an estimate" />
                </SelectTrigger>
                <SelectContent>
                  {weightTiers.map((tier) => (
                    <SelectItem key={tier} value={tier} className="py-2.5 text-base">
                      {tier}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field
              label="Pickup date"
              htmlFor="quote-pickup-date"
              error={errors.pickupDate}
              required
            >
              <Input
                id="quote-pickup-date"
                type="date"
                min={minDate || undefined}
                className={inputClass}
                value={values.pickupDate}
                onChange={(e) => updateField("pickupDate", e.target.value)}
                aria-invalid={Boolean(errors.pickupDate)}
                aria-describedby={
                  errors.pickupDate ? "quote-pickup-date-error" : undefined
                }
              />
            </Field>

            <Field
              label="Preferred pickup time"
              htmlFor="quote-pickup-time"
              error={errors.pickupTime}
              required
            >
              <Select
                value={values.pickupTime}
                onValueChange={(value) => updateField("pickupTime", value as string)}
              >
                <SelectTrigger
                  id="quote-pickup-time"
                  className={selectTriggerClass}
                  aria-invalid={Boolean(errors.pickupTime)}
                  aria-describedby={
                    errors.pickupTime ? "quote-pickup-time-error" : undefined
                  }
                >
                  <SelectValue placeholder="Choose a window" />
                </SelectTrigger>
                <SelectContent>
                  {pickupTimes.map((time) => (
                    <SelectItem key={time} value={time} className="py-2.5 text-base">
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <div className="flex items-start gap-3">
              <Checkbox
                id="quote-consent"
                className="mt-0.5 size-5"
                checked={values.consent}
                onCheckedChange={(checked) => updateField("consent", Boolean(checked))}
                aria-invalid={Boolean(errors.consent)}
                aria-describedby={errors.consent ? "quote-consent-error" : undefined}
              />
              <Label htmlFor="quote-consent" className="text-base font-normal">
                I agree to be contacted about this quote request.
              </Label>
            </div>
            {errors.consent && (
              <p id="quote-consent-error" className="-mt-4 text-sm text-destructive">
                {errors.consent}
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
              <p role="alert" className="text-base text-destructive">
                {formError}
              </p>
            )}

            <Button
              type="submit"
              size="lg"
              disabled={status === "submitting" || isPending}
              className="h-14 w-full gap-2 text-lg"
            >
              {status === "submitting" || isPending ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Submitting
                </>
              ) : (
                <>
                  <Send className="size-5" />
                  Get Instant Quote
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Reveal>
  );
}
