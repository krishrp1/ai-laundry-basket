"use client";

import * as React from "react";
import { AnimatePresence, m } from "framer-motion";
import { CheckCircle2, Loader2, Send } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Reveal } from "@/components/motion/reveal";
import { submitContactMessage } from "@/lib/actions/contact";
import { HONEYPOT_FIELD, FORM_TIMESTAMP_FIELD } from "@/lib/spam-guard-constants";

type ContactMethod = "email" | "phone" | "text";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  location: string;
  contactMethod: ContactMethod;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  name: "",
  email: "",
  phone: "",
  location: "",
  contactMethod: "email",
  message: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Please enter your name.";
  }

  if (!values.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!emailPattern.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.message.trim()) {
    errors.message = "Please add a short message so we know how to help.";
  }

  return errors;
}

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
    formData.set(HONEYPOT_FIELD, "");
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
                <m.div
                  key="success"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center gap-3 py-10 text-center"
                >
                  <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <CheckCircle2 className="size-6" />
                  </span>
                  <p className="font-heading text-lg font-semibold">
                    Message sent
                  </p>
                  <p className="max-w-sm text-sm text-muted-foreground">
                    Thanks for reaching out. Our team will get back to you
                    using your preferred contact method within one business
                    day.
                  </p>
                  {requestId && (
                    <Badge variant="outline" className="font-normal">
                      Reference: {requestId}
                    </Badge>
                  )}
                  <Button variant="outline" onClick={handleReset}>
                    Send another message
                  </Button>
                </m.div>
              ) : (
                <m.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={handleSubmit}
                  noValidate
                  className="flex flex-col gap-5"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="contact-name">
                        Name <span aria-hidden="true">*</span>
                      </Label>
                      <Input
                        id="contact-name"
                        name="name"
                        autoComplete="name"
                        value={values.name}
                        onChange={(event) =>
                          updateField("name", event.target.value)
                        }
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={
                          errors.name ? "contact-name-error" : undefined
                        }
                      />
                      {errors.name && (
                        <p
                          id="contact-name-error"
                          className="text-xs text-destructive"
                        >
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="contact-email">
                        Email <span aria-hidden="true">*</span>
                      </Label>
                      <Input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={values.email}
                        onChange={(event) =>
                          updateField("email", event.target.value)
                        }
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={
                          errors.email ? "contact-email-error" : undefined
                        }
                      />
                      {errors.email && (
                        <p
                          id="contact-email-error"
                          className="text-xs text-destructive"
                        >
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="contact-phone">Phone</Label>
                      <Input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="+91 90199 61091"
                        value={values.phone}
                        onChange={(event) =>
                          updateField("phone", event.target.value)
                        }
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="contact-location">Area</Label>
                      <Input
                        id="contact-location"
                        name="location"
                        placeholder="e.g. Jayanagar, Bengaluru"
                        autoComplete="address-level2"
                        value={values.location}
                        onChange={(event) =>
                          updateField("location", event.target.value)
                        }
                      />
                    </div>
                  </div>

                  <fieldset className="flex flex-col gap-2">
                    <legend className="text-sm font-medium">
                      Preferred contact method
                    </legend>
                    <RadioGroup
                      value={values.contactMethod}
                      onValueChange={(value) =>
                        updateField("contactMethod", value as ContactMethod)
                      }
                      className="grid grid-cols-1 gap-2 sm:grid-cols-3"
                    >
                      {(
                        [
                          { value: "email", label: "Email" },
                          { value: "phone", label: "Phone call" },
                          { value: "text", label: "Text message" },
                        ] as const
                      ).map((option) => (
                        <Label
                          key={option.value}
                          htmlFor={`contact-method-${option.value}`}
                          className="flex cursor-pointer items-center gap-2 rounded-lg border border-border px-3 py-2 font-normal has-[[data-checked]]:border-primary has-[[data-checked]]:bg-primary/5"
                        >
                          <RadioGroupItem
                            id={`contact-method-${option.value}`}
                            value={option.value}
                          />
                          {option.label}
                        </Label>
                      ))}
                    </RadioGroup>
                  </fieldset>

                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="contact-message">
                      Message <span aria-hidden="true">*</span>
                    </Label>
                    <Textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      value={values.message}
                      onChange={(event) =>
                        updateField("message", event.target.value)
                      }
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={
                        errors.message ? "contact-message-error" : undefined
                      }
                    />
                    {errors.message && (
                      <p
                        id="contact-message-error"
                        className="text-xs text-destructive"
                      >
                        {errors.message}
                      </p>
                    )}
                  </div>

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

                  <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
                    <Badge variant="outline" className="font-normal">
                      Typical reply time: one business day
                    </Badge>
                    <Button
                      type="submit"
                      disabled={status === "submitting" || isPending}
                      className="w-full gap-1.5 sm:w-auto"
                    >
                      {status === "submitting" || isPending ? (
                        <>
                          <Loader2 className="size-4 animate-spin" />
                          Sending
                        </>
                      ) : (
                        <>
                          <Send className="size-4" />
                          Send message
                        </>
                      )}
                    </Button>
                  </div>
                </m.form>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </Reveal>
    </section>
  );
}
