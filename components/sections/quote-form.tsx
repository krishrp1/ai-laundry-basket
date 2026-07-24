"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Building2,
  CheckCircle2,
  Clock,
  FileText,
  House,
  Loader2,
  Send,
  Siren,
  Upload,
  X,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Reveal } from "@/components/motion/reveal";
import { submitQuoteRequest } from "@/lib/actions/quote";
import { HONEYPOT_FIELD, FORM_TIMESTAMP_FIELD } from "@/lib/spam-guard-constants";

type CustomerType = "residential" | "commercial";
type ContactMethod = "email" | "phone" | "text";
type Urgency = "standard" | "rush" | "same-day";

type QuoteFormValues = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
  customerType: CustomerType;
  serviceType: string;
  estimatedWeight: string;
  recurring: string;
  pickupDate: string;
  pickupTime: string;
  deliveryDate: string;
  urgency: Urgency;
  specialInstructions: string;
  contactMethod: ContactMethod;
  consent: boolean;
};

type FormErrors = Partial<Record<keyof QuoteFormValues, string>>;

const initialValues: QuoteFormValues = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  zip: "",
  customerType: "residential",
  serviceType: "",
  estimatedWeight: "",
  recurring: "one-time",
  pickupDate: "",
  pickupTime: "",
  deliveryDate: "",
  urgency: "standard",
  specialInstructions: "",
  contactMethod: "email",
  consent: false,
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const zipPattern = /^\d{5}(-\d{4})?$/;
const MAX_IMAGE_BYTES = 10 * 1024 * 1024;

const serviceTypes = [
  "Wash & Fold",
  "Dry Cleaning",
  "Pickup & Delivery",
  "Commercial Laundry",
  "Ironing & Pressing",
  "Stain Treatment",
];

const weightTiers = [
  "Under 10 lbs (1-2 small bags)",
  "10-25 lbs (about 1 hamper)",
  "25-50 lbs (2-3 hampers)",
  "50+ lbs (large household or commercial)",
];

const pickupTimes = [
  "Morning (7am - 11am)",
  "Afternoon (11am - 3pm)",
  "Evening (3pm - 8pm)",
];

const recurringOptions = [
  { value: "one-time", label: "One-time pickup" },
  { value: "weekly", label: "Weekly" },
  { value: "biweekly", label: "Every two weeks" },
  { value: "monthly", label: "Monthly" },
];

const urgencyOptions = [
  {
    value: "standard" as const,
    icon: Clock,
    label: "Standard",
    description: "Ready in 2-3 business days",
  },
  {
    value: "rush" as const,
    icon: Zap,
    label: "Rush",
    description: "Next-day, additional fee applies",
  },
  {
    value: "same-day" as const,
    icon: Siren,
    label: "Same-day",
    description: "Subject to availability, additional fee applies",
  },
];

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) {
    return `${Math.round(bytes / 1024)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function validate(values: QuoteFormValues, minDate: string): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) errors.name = "Please enter your name.";

  if (!values.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!emailPattern.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.phone.trim()) errors.phone = "Please enter a phone number.";

  if (!values.address.trim()) errors.address = "Please enter your address.";

  if (!values.city.trim()) errors.city = "Please enter your city.";

  if (!values.zip.trim()) {
    errors.zip = "Please enter your ZIP code.";
  } else if (!zipPattern.test(values.zip.trim())) {
    errors.zip = "Please enter a valid ZIP code.";
  }

  if (!values.serviceType) errors.serviceType = "Please choose a service.";

  if (!values.estimatedWeight) {
    errors.estimatedWeight = "Please choose an estimated weight.";
  }

  if (!values.pickupDate) {
    errors.pickupDate = "Please choose a pickup date.";
  } else if (minDate && values.pickupDate < minDate) {
    errors.pickupDate = "Pickup date cannot be in the past.";
  }

  if (!values.pickupTime) {
    errors.pickupTime = "Please choose a pickup window.";
  }

  if (values.deliveryDate && values.pickupDate) {
    if (values.deliveryDate < values.pickupDate) {
      errors.deliveryDate = "Delivery date cannot be before pickup date.";
    }
  }

  if (!values.consent) {
    errors.consent = "Please agree before submitting your request.";
  }

  return errors;
}

export function QuoteForm() {
  const [values, setValues] = React.useState<QuoteFormValues>(initialValues);
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [status, setStatus] = React.useState<
    "idle" | "submitting" | "success"
  >("idle");
  const [formError, setFormError] = React.useState<string | null>(null);
  const [requestId, setRequestId] = React.useState<string | null>(null);
  const [isPending, startTransition] = React.useTransition();
  const [image, setImage] = React.useState<File | null>(null);
  const [imageError, setImageError] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
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

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      setImage(null);
      setImageError(null);
      return;
    }

    if (!file.type.startsWith("image/")) {
      setImage(null);
      setImageError("Please upload an image file.");
      return;
    }

    if (file.size > MAX_IMAGE_BYTES) {
      setImage(null);
      setImageError("Image must be smaller than 10 MB.");
      return;
    }

    setImageError(null);
    setImage(file);
  }

  function removeImage() {
    setImage(null);
    setImageError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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
    if (image) {
      formData.set("image", image);
    }
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
    setValues(initialValues);
    setErrors({});
    setFormError(null);
    setRequestId(null);
    setImage(null);
    setImageError(null);
    setStatus("idle");
    renderedAtRef.current = Date.now();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  if (status === "success") {
    return (
      <Reveal>
        <Card>
          <CardContent>
            <motion.div
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
            </motion.div>
          </CardContent>
        </Card>
      </Reveal>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      {/* Section 1: Contact information */}
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
                  value={values.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? "quote-phone-error" : undefined}
                />
              </Field>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="quote-contact-method-email">
                  Preferred contact method
                </Label>
                <RadioGroup
                  value={values.contactMethod}
                  onValueChange={(value) =>
                    updateField("contactMethod", value as ContactMethod)
                  }
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
              </div>
            </div>
          </CardContent>
        </Card>
      </Reveal>

      {/* Section 2: Service location */}
      <Reveal delay={0.05}>
        <Card>
          <CardContent className="flex flex-col gap-5">
            <SectionHeading index={2} title="Service location" />

            <Field label="Street address" htmlFor="quote-address" error={errors.address} required>
              <Input
                id="quote-address"
                autoComplete="street-address"
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
                  value={values.city}
                  onChange={(e) => updateField("city", e.target.value)}
                  aria-invalid={Boolean(errors.city)}
                  aria-describedby={errors.city ? "quote-city-error" : undefined}
                />
              </Field>

              <Field label="ZIP code" htmlFor="quote-zip" error={errors.zip} required>
                <Input
                  id="quote-zip"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  value={values.zip}
                  onChange={(e) => updateField("zip", e.target.value)}
                  aria-invalid={Boolean(errors.zip)}
                  aria-describedby={errors.zip ? "quote-zip-error" : undefined}
                />
              </Field>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="quote-customer-type-residential">
                Residential or commercial
              </Label>
              <RadioGroup
                value={values.customerType}
                onValueChange={(value) =>
                  updateField("customerType", value as CustomerType)
                }
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
            </div>
          </CardContent>
        </Card>
      </Reveal>

      {/* Section 3: Service details */}
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
                  onValueChange={(value) =>
                    updateField("serviceType", value as string)
                  }
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
                  onValueChange={(value) =>
                    updateField("estimatedWeight", value as string)
                  }
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

      {/* Section 4: Scheduling */}
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
                  onValueChange={(value) =>
                    updateField("pickupTime", value as string)
                  }
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

            <div className="flex flex-col gap-2">
              <Label>Urgency level</Label>
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
            </div>
          </CardContent>
        </Card>
      </Reveal>

      {/* Section 5: Additional details */}
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
                onChange={(e) =>
                  updateField("specialInstructions", e.target.value)
                }
              />
            </Field>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="quote-image">Photo (optional)</Label>
              <input
                ref={fileInputRef}
                id="quote-image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="sr-only"
                aria-describedby={imageError ? "quote-image-error" : undefined}
              />
              {image ? (
                <div className="flex items-center justify-between gap-3 rounded-lg border border-border px-3 py-2.5">
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <FileText className="size-4 shrink-0 text-primary" />
                    <span className="truncate text-sm">{image.name}</span>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {formatFileSize(image.size)}
                    </span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    aria-label="Remove image"
                    onClick={removeImage}
                  >
                    <X className="size-4" />
                  </Button>
                </div>
              ) : (
                <Label
                  htmlFor="quote-image"
                  className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border border-dashed border-border px-4 py-6 text-center font-normal text-muted-foreground hover:border-primary/40 hover:text-foreground"
                >
                  <Upload className="size-5" />
                  <span className="text-sm">
                    Click to upload a photo of your laundry or a stain
                  </span>
                  <span className="text-xs">PNG or JPG, up to 10 MB</span>
                </Label>
              )}
              {imageError && (
                <p id="quote-image-error" className="text-xs text-destructive">
                  {imageError}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </Reveal>

      {/* Consent and submit */}
      <Reveal delay={0.25}>
        <Card>
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <Checkbox
                id="quote-consent"
                checked={values.consent}
                onCheckedChange={(checked) =>
                  updateField("consent", Boolean(checked))
                }
                aria-invalid={Boolean(errors.consent)}
                aria-describedby={errors.consent ? "quote-consent-error" : undefined}
              />
              <Label htmlFor="quote-consent" className="font-normal">
                I agree to be contacted about this quote request and have
                read the Terms of Service and Privacy Policy.
              </Label>
            </div>
            {errors.consent && (
              <p id="quote-consent-error" className="text-xs text-destructive">
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
              <p role="alert" className="text-sm text-destructive">
                {formError}
              </p>
            )}

            <Separator />

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
                    Submitting
                  </>
                ) : (
                  <>
                    <Send className="size-4" />
                    Submit request
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </Reveal>
    </form>
  );
}

function SectionHeading({ index, title }: { index: number; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex size-7 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
        {index}
      </span>
      <h2 className="text-lg font-semibold">{title}</h2>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  error,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={htmlFor}>
        {label} {required && <span aria-hidden="true">*</span>}
      </Label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
