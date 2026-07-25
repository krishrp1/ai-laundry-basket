import { Building2, House } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Reveal } from "@/components/motion/reveal";
import { Field, SectionHeading } from "./fields";
import type { CustomerType, FormErrors, QuoteFormValues } from "./types";

export function ServiceLocationSection({
  values,
  errors,
  updateField,
}: {
  values: QuoteFormValues;
  errors: FormErrors;
  updateField: <K extends keyof QuoteFormValues>(field: K, value: QuoteFormValues[K]) => void;
}) {
  return (
    <Reveal delay={0.05}>
      <Card>
        <CardContent className="flex flex-col gap-5">
          <SectionHeading index={2} title="Service location" />

          <Field
            label="Address (Flat / Apartment, Street, Area)"
            htmlFor="quote-address"
            error={errors.address}
            required
          >
            <Input
              id="quote-address"
              autoComplete="street-address"
              placeholder="e.g. Flat 204, Prestige Tower, 100 Feet Road"
              value={values.address}
              onChange={(e) => updateField("address", e.target.value)}
              aria-invalid={Boolean(errors.address)}
              aria-describedby={errors.address ? "quote-address-error" : undefined}
            />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="City" htmlFor="quote-city" error={errors.city} required>
              <Input
                id="quote-city"
                autoComplete="address-level2"
                placeholder="e.g. Bengaluru"
                value={values.city}
                onChange={(e) => updateField("city", e.target.value)}
                aria-invalid={Boolean(errors.city)}
                aria-describedby={errors.city ? "quote-city-error" : undefined}
              />
            </Field>

            <Field label="PIN Code" htmlFor="quote-zip" error={errors.zip} required>
              <Input
                id="quote-zip"
                inputMode="numeric"
                autoComplete="postal-code"
                placeholder="e.g. 560070"
                maxLength={6}
                value={values.zip}
                onChange={(e) => updateField("zip", e.target.value)}
                aria-invalid={Boolean(errors.zip)}
                aria-describedby={errors.zip ? "quote-zip-error" : undefined}
              />
            </Field>
          </div>

          <fieldset className="flex flex-col gap-1.5">
            <legend className="text-sm leading-none font-medium">
              Residential or commercial
            </legend>
            <RadioGroup
              value={values.customerType}
              onValueChange={(value) => updateField("customerType", value as CustomerType)}
              className="grid grid-cols-2 gap-2"
            >
              {(
                [
                  { value: "residential" as const, label: "Residential", icon: House },
                  { value: "commercial" as const, label: "Commercial", icon: Building2 },
                ]
              ).map((option) => (
                <Label
                  key={option.value}
                  htmlFor={`quote-customer-type-${option.value}`}
                  className="flex cursor-pointer items-center gap-2 rounded-lg border border-border px-3 py-2.5 font-normal has-[[data-checked]]:border-primary has-[[data-checked]]:bg-primary/5"
                >
                  <RadioGroupItem
                    id={`quote-customer-type-${option.value}`}
                    value={option.value}
                  />
                  <option.icon className="size-4 text-primary" />
                  {option.label}
                </Label>
              ))}
            </RadioGroup>
          </fieldset>
        </CardContent>
      </Card>
    </Reveal>
  );
}
