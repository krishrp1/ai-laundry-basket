"use client";

import * as React from "react";
import { m } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import { submitQuoteRequest } from "@/lib/actions/quote";
import { HONEYPOT_FIELD, FORM_TIMESTAMP_FIELD } from "@/lib/spam-guard-constants";
import { ContactInfoSection } from "./contact-info-section";
import { ServiceLocationSection } from "./service-location-section";
import { ServiceDetailsSection } from "./service-details-section";
import { SchedulingSection } from "./scheduling-section";
import { AdditionalDetailsSection } from "./additional-details-section";
import { ConsentSubmitSection } from "./consent-submit-section";
import { defaultFormValues, validate } from "./types";
import type { FormErrors, QuoteFormValues } from "./types";

export type { QuoteFormValues } from "./types";

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
    formData.set(HONEYPOT_FIELD, "");
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
              <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <CheckCircle2 className="size-6" />
              </span>
              <p className="font-heading text-xl font-semibold">
                Quote request received
              </p>
              <p className="max-w-sm text-sm text-muted-foreground">
                Thanks, {values.name.split(" ")[0] || "there"}. Our team will
                review your request and follow up using your preferred
                contact method within one business day with pricing and
                scheduling options.
              </p>
              {requestId && (
                <Badge variant="outline" className="font-normal">
                  Reference: {requestId}
                </Badge>
              )}
              <Button variant="outline" onClick={handleReset}>
                Submit another request
              </Button>
            </m.div>
          </CardContent>
        </Card>
      </Reveal>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <ContactInfoSection values={values} errors={errors} updateField={updateField} />
      <ServiceLocationSection values={values} errors={errors} updateField={updateField} />
      <ServiceDetailsSection values={values} errors={errors} updateField={updateField} />
      <SchedulingSection
        values={values}
        errors={errors}
        updateField={updateField}
        minDate={minDate}
      />
      <AdditionalDetailsSection values={values} updateField={updateField} />
      <ConsentSubmitSection
        consent={values.consent}
        consentError={errors.consent}
        formError={formError}
        submitting={status === "submitting" || isPending}
        updateField={updateField}
      />
    </form>
  );
}
