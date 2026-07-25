import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Reveal } from "@/components/motion/reveal";
import { Field, SectionHeading } from "./fields";
import { pickupTimes, urgencyOptions } from "./types";
import type { FormErrors, QuoteFormValues, Urgency } from "./types";

export function SchedulingSection({
  values,
  errors,
  updateField,
  minDate,
}: {
  values: QuoteFormValues;
  errors: FormErrors;
  updateField: <K extends keyof QuoteFormValues>(field: K, value: QuoteFormValues[K]) => void;
  minDate: string;
}) {
  return (
    <Reveal delay={0.15}>
      <Card>
        <CardContent className="flex flex-col gap-5">
          <SectionHeading index={4} title="Scheduling" />

          <div className="grid gap-5 sm:grid-cols-2">
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
                  className="w-full"
                  aria-invalid={Boolean(errors.pickupTime)}
                  aria-describedby={
                    errors.pickupTime ? "quote-pickup-time-error" : undefined
                  }
                >
                  <SelectValue placeholder="Choose a window" />
                </SelectTrigger>
                <SelectContent>
                  {pickupTimes.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field
              label="Delivery date (optional)"
              htmlFor="quote-delivery-date"
              error={errors.deliveryDate}
            >
              <Input
                id="quote-delivery-date"
                type="date"
                min={values.pickupDate || minDate || undefined}
                value={values.deliveryDate}
                onChange={(e) => updateField("deliveryDate", e.target.value)}
                aria-invalid={Boolean(errors.deliveryDate)}
                aria-describedby={
                  errors.deliveryDate ? "quote-delivery-date-error" : undefined
                }
              />
              <p className="text-xs text-muted-foreground">
                Leave blank for standard turnaround.
              </p>
            </Field>
          </div>

          <fieldset className="flex flex-col gap-2">
            <legend className="text-sm leading-none font-medium">Urgency level</legend>
            <RadioGroup
              value={values.urgency}
              onValueChange={(value) => updateField("urgency", value as Urgency)}
              className="grid gap-2 sm:grid-cols-3"
            >
              {urgencyOptions.map((option) => (
                <Label
                  key={option.value}
                  htmlFor={`quote-urgency-${option.value}`}
                  className="flex cursor-pointer flex-col gap-1 rounded-lg border border-border px-3 py-2.5 font-normal has-[[data-checked]]:border-primary has-[[data-checked]]:bg-primary/5"
                >
                  <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <RadioGroupItem
                      id={`quote-urgency-${option.value}`}
                      value={option.value}
                    />
                    <option.icon className="size-4 text-primary" />
                    {option.label}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {option.description}
                  </span>
                </Label>
              ))}
            </RadioGroup>
          </fieldset>
        </CardContent>
      </Card>
    </Reveal>
  );
}
