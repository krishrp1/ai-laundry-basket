import { pickupWindows, type PickupWindow } from "@/config/pricing";
import { formatDateIN } from "@/lib/format";

/** Business hours per day-of-week (0 = Sunday .. 6 = Saturday), matching siteConfig.contact.hours. */
const BUSINESS_HOURS: Record<number, { open: number; close: number }> = {
  0: { open: 9, close: 21 }, // Sunday
  1: { open: 9, close: 21 }, // Monday
  2: { open: 9, close: 21 },
  3: { open: 9, close: 21 },
  4: { open: 9, close: 21 },
  5: { open: 9, close: 21 },
  6: { open: 9, close: 21 }, // Saturday
};

const STANDARD_TURNAROUND_HOURS = 24;
const EXPRESS_TURNAROUND_HOURS = 8;

export function getBusinessHours(dayOfWeek: number) {
  return BUSINESS_HOURS[dayOfWeek];
}

function isSameCalendarDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function addHours(date: Date, hours: number) {
  const d = new Date(date);
  d.setHours(d.getHours() + hours);
  return d;
}

function addDays(date: Date, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function combine(date: Date, hour: number) {
  const d = new Date(date);
  d.setHours(hour, 0, 0, 0);
  return d;
}

export function formatHour(hour: number): string {
  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${displayHour}:00 ${period}`;
}

/**
 * Standard pickup windows still available for the given date — filters out
 * windows that have already ended if the date is today.
 */
export function getAvailablePickupWindows(date: Date, now: Date = new Date()): PickupWindow[] {
  if (!isSameCalendarDay(date, now)) return pickupWindows;
  const currentHour = now.getHours() + now.getMinutes() / 60;
  return pickupWindows.filter((window) => window.endHour > currentHour);
}

export type DeliveryEstimateInput = {
  pickupDate: Date;
  pickupWindowEndHour: number;
  express: boolean;
};

export type DeliveryEstimateResult = {
  date: Date;
  dayLabel: string;
  timeLabel: string;
};

/**
 * Computes a realistic delivery estimate from the pickup date/window and
 * whether Express Delivery is enabled, clamped to business hours — never
 * hardcoded.
 */
export function estimateDelivery(
  { pickupDate, pickupWindowEndHour, express }: DeliveryEstimateInput,
  now: Date = new Date()
): DeliveryEstimateResult {
  const pickupMoment = combine(pickupDate, pickupWindowEndHour);
  const turnaroundHours = express ? EXPRESS_TURNAROUND_HOURS : STANDARD_TURNAROUND_HOURS;
  let deliveryMoment = addHours(pickupMoment, turnaroundHours);
  let cappedAtClose = false;

  let hours = getBusinessHours(deliveryMoment.getDay());
  if (deliveryMoment.getHours() >= hours.close) {
    // Turnaround pushes past today's close — deliver by tomorrow's close instead.
    deliveryMoment = addDays(deliveryMoment, 1);
    hours = getBusinessHours(deliveryMoment.getDay());
    deliveryMoment = combine(deliveryMoment, hours.close);
    cappedAtClose = true;
  } else if (deliveryMoment.getHours() < hours.open) {
    // Turnaround finishes overnight — ready sometime during that day's hours.
    deliveryMoment = combine(deliveryMoment, hours.close);
    cappedAtClose = true;
  }

  const dayLabel = getDayLabel(deliveryMoment, now);
  const timeLabel = cappedAtClose
    ? `Before ${formatHour(hours.close)}`
    : `Around ${formatHour(deliveryMoment.getHours())}`;

  return { date: deliveryMoment, dayLabel, timeLabel };
}

export function getDayLabel(date: Date, now: Date = new Date()): string {
  if (isSameCalendarDay(date, now)) return "Today";
  if (isSameCalendarDay(date, addDays(now, 1))) return "Tomorrow";
  return formatDateIN(date);
}
