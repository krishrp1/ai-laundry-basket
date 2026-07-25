import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Reveal } from "@/components/motion/reveal";
import { Field, SectionHeading } from "./fields";
import type { ContactMethod, FormErrors, QuoteFormValues } from "./types";

export function ContactInfoSection({
  values,
  errors,
  updateField,
}: {
  values: QuoteFormValues;
  errors: FormErrors;
  updateField: <K extends keyof QuoteFormValues>(field: K, value: QuoteFormValues[K]) => void;
}) {
  return (
    <Reveal>
      <Card>
        <CardContent className="flex flex-col gap-5">
          <SectionHeading index={1} title="Contact information" />

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Name" htmlFor="quote-name" error={errors.name} required>
              <Input
                id="quote-name"
                autoComplete="name"
                value={values.name}
                onChange={(e) => updateField("name", e.target.value)}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "quote-name-error" : undefined}
              />
            </Field>

            <Field label="Email" htmlFor="quote-email" error={errors.email} required>
              <Input
                id="quote-email"
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={(e) => updateField("email", e.target.value)}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "quote-email-error" : undefined}
              />
            </Field>

            <Field label="Phone" htmlFor="quote-phone" error={errors.phone} required>
              <Input
                id="quote-phone"
                type="tel"
                autoComplete="tel"
                placeholder="+91 90199 61091"
                value={values.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? "quote-phone-error" : undefined}
              />
            </Field>

            <fieldset className="flex flex-col gap-1.5">
              <legend className="text-sm leading-none font-medium">
                Preferred contact method
              </legend>
              <RadioGroup
                value={values.contactMethod}
                onValueChange={(value) => updateField("contactMethod", value as ContactMethod)}
                className="grid grid-cols-3 gap-2"
              >
                {(
                  [
                    { value: "email", label: "Email" },
                    { value: "phone", label: "Phone" },
                    { value: "text", label: "Text" },
                  ] as const
                ).map((option) => (
                  <Label
                    key={option.value}
                    htmlFor={`quote-contact-method-${option.value}`}
                    className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-border px-2 py-2 text-xs font-normal has-[[data-checked]]:border-primary has-[[data-checked]]:bg-primary/5"
                  >
                    <RadioGroupItem
                      id={`quote-contact-method-${option.value}`}
                      value={option.value}
                    />
                    {option.label}
                  </Label>
                ))}
              </RadioGroup>
            </fieldset>
          </div>
        </CardContent>
      </Card>
    </Reveal>
  );
}
