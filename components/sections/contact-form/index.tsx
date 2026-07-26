"use client";

import * as React from "react";
import { AnimatePresence } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import { submitContactMessage } from "@/lib/actions/contact";
import { FORM_TIMESTAMP_FIELD, HONEYPOT_FIELD } from "@/lib/spam-guard-constants";
import { ContactFormFields } from "./form-fields";
import { ContactFormSuccess } from "./success-state";
import { initialValues, validate } from "./types";
import type { FormErrors, FormValues } from "./types";

export function ContactForm() {
  const [values, setValues] = React.useState<FormValues>(initialValues);
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

  function updateField<K extends keyof FormValues>(
    field: K,
    value: FormValues[K]
  ) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(values);
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
    formData.set("location", values.location);
    formData.set("contactMethod", values.contactMethod);
    formData.set("message", values.message);
    // Read the honeypot's real DOM value (via the actual <form> element, not
    // React state — this field is intentionally uncontrolled) instead of
    // hardcoding "", which previously discarded whatever a bot had filled in.
    const honeypotInput = event.currentTarget.elements.namedItem(
      HONEYPOT_FIELD
    ) as HTMLInputElement | null;
    formData.set(HONEYPOT_FIELD, honeypotInput?.value ?? "");
    formData.set(FORM_TIMESTAMP_FIELD, String(renderedAtRef.current));

    startTransition(async () => {
      const result = await submitContactMessage({ status: "idle" }, formData);

      if (result.status === "success") {
        setRequestId(result.requestId);
        setStatus("success");
        return;
      }

      if (result.status === "error") {
        const fieldErrors: FormErrors = {};
        for (const [field, messages] of Object.entries(result.errors)) {
          if (messages?.[0]) {
            fieldErrors[field as keyof FormValues] = messages[0];
          }
        }
        setErrors(fieldErrors);
        setFormError(result.formError ?? null);
      }
      setStatus("idle");
    });
  }

  function handleReset() {
    setValues(initialValues);
    setErrors({});
    setFormError(null);
    setRequestId(null);
    setStatus("idle");
    renderedAtRef.current = Date.now();
  }

  return (
    <section
      id="contact-form"
      className="mx-auto max-w-3xl scroll-mt-24 px-4 py-24 sm:px-6 lg:px-8"
    >
      <Reveal className="text-center">
        <span className="text-sm font-semibold text-primary">
          Send a message
        </span>
        <h2 className="mt-3">Tell us how we can help</h2>
        <p className="mt-4 text-muted-foreground">
          Fill out the form below and our support team will follow up using
          your preferred contact method.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-10">
        <Card>
          <CardContent>
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <ContactFormSuccess requestId={requestId} onReset={handleReset} />
              ) : (
                <ContactFormFields
                  values={values}
                  errors={errors}
                  formError={formError}
                  submitting={status === "submitting" || isPending}
                  updateField={updateField}
                  onSubmit={handleSubmit}
                />
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </Reveal>
    </section>
  );
}
