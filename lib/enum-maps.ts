import type {
  ContactMethod,
  CustomerType,
  Urgency,
  RecurringFrequency,
} from "@/generated/prisma/client";

export const contactMethodMap: Record<string, ContactMethod> = {
  email: "EMAIL",
  phone: "PHONE",
  text: "TEXT",
};

export const customerTypeMap: Record<string, CustomerType> = {
  residential: "RESIDENTIAL",
  commercial: "COMMERCIAL",
};

export const urgencyMap: Record<string, Urgency> = {
  standard: "STANDARD",
  rush: "RUSH",
  "same-day": "SAME_DAY",
};

export const recurringMap: Record<string, RecurringFrequency> = {
  "one-time": "ONE_TIME",
  weekly: "WEEKLY",
  biweekly: "BIWEEKLY",
  monthly: "MONTHLY",
};
