import type {
  OrderStatus,
  QuoteStatus,
  ContactStatus,
  CustomerType,
  ContactMethod,
  Urgency,
  RecurringFrequency,
} from "@/generated/prisma/client";

export const orderStatusLabels: Record<OrderStatus, string> = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  PICKUP_SCHEDULED: "Pickup Scheduled",
  PICKED_UP: "Picked Up",
  CLEANING: "Cleaning",
  QUALITY_CHECK: "Quality Check",
  READY_FOR_DELIVERY: "Ready for Delivery",
  OUT_FOR_DELIVERY: "Out for Delivery",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

export const quoteStatusLabels: Record<QuoteStatus, string> = {
  NEW: "New",
  CONTACTED: "Contacted",
  CONVERTED: "Converted",
  CLOSED: "Closed",
};

export const contactStatusLabels: Record<ContactStatus, string> = {
  NEW: "New",
  READ: "Read",
  REPLIED: "Replied",
  SPAM: "Spam",
};

export const customerTypeLabels: Record<CustomerType, string> = {
  RESIDENTIAL: "Residential",
  COMMERCIAL: "Commercial",
};

export const contactMethodLabels: Record<ContactMethod, string> = {
  EMAIL: "Email",
  PHONE: "Phone",
  TEXT: "Text",
};

export const urgencyLabels: Record<Urgency, string> = {
  STANDARD: "Standard",
  RUSH: "Rush",
  SAME_DAY: "Same-day",
};

export const recurringLabels: Record<RecurringFrequency, string> = {
  ONE_TIME: "One-time",
  WEEKLY: "Weekly",
  BIWEEKLY: "Every two weeks",
  MONTHLY: "Monthly",
};
