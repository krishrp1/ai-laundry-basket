import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Reveal } from "@/components/motion/reveal";
import { Field, SectionHeading } from "./fields";
import type { QuoteFormValues } from "./types";

export function AdditionalDetailsSection({
  values,
  updateField,
}: {
  values: QuoteFormValues;
  updateField: <K extends keyof QuoteFormValues>(field: K, value: QuoteFormValues[K]) => void;
}) {
  return (
    <Reveal delay={0.2}>
      <Card>
        <CardContent className="flex flex-col gap-5">
          <SectionHeading index={5} title="Additional details" />

          <Field label="Special instructions" htmlFor="quote-instructions">
            <Textarea
              id="quote-instructions"
              rows={4}
              placeholder="Allergies, fabric care notes, gate codes, or anything else we should know."
              value={values.specialInstructions}
              onChange={(e) => updateField("specialInstructions", e.target.value)}
            />
          </Field>
        </CardContent>
      </Card>
    </Reveal>
  );
}
