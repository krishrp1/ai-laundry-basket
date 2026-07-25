import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Reveal } from "@/components/motion/reveal";
import { weightTiers } from "@/config/pricing";
import { Field, SectionHeading } from "./fields";
import { recurringOptions, serviceTypes } from "./types";
import type { FormErrors, QuoteFormValues } from "./types";

export function ServiceDetailsSection({
  values,
  errors,
  updateField,
}: {
  values: QuoteFormValues;
  errors: FormErrors;
  updateField: <K extends keyof QuoteFormValues>(field: K, value: QuoteFormValues[K]) => void;
}) {
  return (
    <Reveal delay={0.1}>
      <Card>
        <CardContent className="flex flex-col gap-5">
          <SectionHeading index={3} title="Service details" />

          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Service type"
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
                  className="w-full"
                  aria-invalid={Boolean(errors.serviceType)}
                  aria-describedby={
                    errors.serviceType ? "quote-service-type-error" : undefined
                  }
                >
                  <SelectValue placeholder="Choose a service" />
                </SelectTrigger>
                <SelectContent>
                  {serviceTypes.map((service) => (
                    <SelectItem key={service} value={service}>
                      {service}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field
              label="Estimated laundry weight"
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
                  className="w-full"
                  aria-invalid={Boolean(errors.estimatedWeight)}
                  aria-describedby={
                    errors.estimatedWeight ? "quote-weight-error" : undefined
                  }
                >
                  <SelectValue placeholder="Choose an estimate" />
                </SelectTrigger>
                <SelectContent>
                  {weightTiers.map((tier) => (
                    <SelectItem key={tier} value={tier}>
                      {tier}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>

          <Field label="Recurring service" htmlFor="quote-recurring">
            <Select
              value={values.recurring}
              onValueChange={(value) => updateField("recurring", value as string)}
            >
              <SelectTrigger id="quote-recurring" className="w-full sm:w-64">
                <SelectValue placeholder="Choose a frequency" />
              </SelectTrigger>
              <SelectContent>
                {recurringOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </CardContent>
      </Card>
    </Reveal>
  );
}
