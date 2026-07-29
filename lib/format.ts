const inrFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

/** Formats a number/Decimal as Indian Rupees with lakh/crore grouping, e.g. ₹1,29,999. */
export function formatINR(amount: number | string): string {
  const value = typeof amount === "string" ? Number(amount) : amount;
  return inrFormatter.format(value);
}

const dateFormatter = new Intl.DateTimeFormat("en-IN", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

/** Formats a date as DD/MM/YYYY, the Indian convention. */
export function formatDateIN(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return dateFormatter.format(d);
}

const timeFormatter = new Intl.DateTimeFormat("en-IN", {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

/** Formats a date+time as "DD/MM/YYYY, h:mm AM/PM". */
export function formatDateTimeIN(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return `${formatDateIN(d)}, ${timeFormatter.format(d)}`;
}
