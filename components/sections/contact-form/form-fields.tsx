import { m } from "framer-motion";
import { Loader2, Send } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { HONEYPOT_FIELD } from "@/lib/spam-guard-constants";
import type { ContactMethod, FormErrors, FormValues } from "./types";

export function ContactFormFields({
  values,
  errors,
  formError,
  submitting,
  updateField,
  onSubmit,
}: {
  values: FormValues;
  errors: FormErrors;
  formError: string | null;
  submitting: boolean;
  updateField: <K extends keyof FormValues>(field: K, value: FormValues[K]) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <m.form
      key="form"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onSubmit={onSubmit}
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
            onChange={(event) => updateField("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
          />
          {errors.name && (
            <p id="contact-name-error" className="text-xs text-destructive">
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
            onChange={(event) => updateField("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
          />
          {errors.email && (
            <p id="contact-email-error" className="text-xs text-destructive">
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
            onChange={(event) => updateField("phone", event.target.value)}
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
            onChange={(event) => updateField("location", event.target.value)}
          />
        </div>
      </div>

      <fieldset className="flex flex-col gap-2">
        <legend className="text-sm font-medium">Preferred contact method</legend>
        <RadioGroup
          value={values.contactMethod}
          onValueChange={(value) => updateField("contactMethod", value as ContactMethod)}
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
              <RadioGroupItem id={`contact-method-${option.value}`} value={option.value} />
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
          onChange={(event) => updateField("message", event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
        />
        {errors.message && (
          <p id="contact-message-error" className="text-xs text-destructive">
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
        <Button type="submit" disabled={submitting} className="w-full gap-1.5 sm:w-auto">
          {submitting ? (
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
  );
}
