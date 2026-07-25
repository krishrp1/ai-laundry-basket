import { Clock, Siren, Zap } from "lucide-react";

import { services, pickupWindows } from "@/config/pricing";

export type CustomerType = "residential" | "commercial";
export type ContactMethod = "email" | "phone" | "text";
export type Urgency = "standard" | "rush" | "same-day";

export type QuoteFormValues = {
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

export type FormErrors = Partial<Record<keyof QuoteFormValues, string>>;

export const defaultFormValues: QuoteFormValues = {
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
const zipPattern = /^\d{6}$/;

export const serviceTypes = services.map((service) => service.label);

export const pickupTimes = pickupWindows.map((window) => window.label);

export const recurringOptions = [
  { value: "one-time", label: "One-time pickup" },
  { value: "weekly", label: "Weekly" },
  { value: "biweekly", label: "Every two weeks" },
  { value: "monthly", label: "Monthly" },
];

export const urgencyOptions = [
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

export function validate(values: QuoteFormValues, minDate: string): FormErrors {
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
    errors.zip = "Please enter your PIN code.";
  } else if (!zipPattern.test(values.zip.trim())) {
    errors.zip = "Please enter a valid 6-digit PIN code.";
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
