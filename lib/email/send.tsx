import "server-only";
import { render } from "@react-email/components";
import { getResendClient, EMAIL_FROM, BUSINESS_NOTIFICATION_EMAIL } from "@/lib/email/client";
import { QuoteConfirmationEmail } from "@/lib/email/templates/quote-confirmation";
import { BookingConfirmationEmail } from "@/lib/email/templates/booking-confirmation";
import { OrderStatusUpdateEmail } from "@/lib/email/templates/order-status-update";
import { InternalNewLeadEmail } from "@/lib/email/templates/internal-new-lead";
import { ContactAcknowledgementEmail } from "@/lib/email/templates/contact-acknowledgement";

type SendArgs = {
  to: string;
  subject: string;
  react: React.ReactElement;
};

const EMAIL_SEND_TIMEOUT_MS = 8000;

/** Bounds how long a stalled/hanging external call can block the caller. */
function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error) => {
        clearTimeout(timer);
        reject(error);
      }
    );
  });
}

/**
 * Every email send is best-effort: failures are logged, never thrown, so a
 * Resend outage can't roll back or fail a form submission that already
 * persisted to the database. Also time-boxed: the Resend SDK has no built-in
 * request timeout, so a hung connection during an outage would otherwise
 * block the calling server action (and the customer's HTTP response)
 * indefinitely instead of just failing this one email.
 */
async function sendEmail({ to, subject, react }: SendArgs) {
  const client = getResendClient();
  if (!client) {
    console.warn(`[email] RESEND_API_KEY not set, skipping email to ${to}: ${subject}`);
    return;
  }

  try {
    const html = await render(react);
    const { error } = await withTimeout(
      client.emails.send({ from: EMAIL_FROM, to, subject, html }),
      EMAIL_SEND_TIMEOUT_MS,
      "Resend send"
    );
    if (error) {
      console.error(`[email] Resend error sending "${subject}" to ${to}:`, error);
    }
  } catch (error) {
    console.error(`[email] Failed to send "${subject}" to ${to}:`, error);
  }
}

async function sendInternalAlert(args: {
  kind: "Quote Request" | "Contact Message" | "Laundry Booking";
  requestId: string;
  name: string;
  email: string;
  phone?: string | null;
  summary: string;
}) {
  if (!BUSINESS_NOTIFICATION_EMAIL) {
    console.warn("[email] BUSINESS_NOTIFICATION_EMAIL not set, skipping internal alert");
    return;
  }
  await sendEmail({
    to: BUSINESS_NOTIFICATION_EMAIL,
    subject: `New ${args.kind}: ${args.name}`,
    react: <InternalNewLeadEmail {...args} />,
  });
}

export async function sendQuoteConfirmation(args: {
  to: string;
  name: string;
  requestId: string;
  serviceType: string;
  pickupDate: string;
  pickupTime: string;
}) {
  await Promise.all([
    sendEmail({
      to: args.to,
      subject: `We received your quote request (${args.requestId})`,
      react: <QuoteConfirmationEmail {...args} />,
    }),
    sendInternalAlert({
      kind: "Quote Request",
      requestId: args.requestId,
      name: args.name,
      email: args.to,
      summary: `Service: ${args.serviceType}\nPickup: ${args.pickupDate} ${args.pickupTime}`,
    }),
  ]);
}

export async function sendContactAcknowledgement(args: {
  to: string;
  name: string;
  requestId: string;
  phone?: string | null;
  message: string;
}) {
  await Promise.all([
    sendEmail({
      to: args.to,
      subject: `We received your message (${args.requestId})`,
      react: <ContactAcknowledgementEmail name={args.name} requestId={args.requestId} />,
    }),
    sendInternalAlert({
      kind: "Contact Message",
      requestId: args.requestId,
      name: args.name,
      email: args.to,
      phone: args.phone,
      summary: args.message,
    }),
  ]);
}

export async function sendBookingConfirmation(args: {
  to: string;
  name: string;
  orderId: string;
  serviceType: string;
  pickupDate: string | null;
  pickupTime: string | null;
}) {
  await Promise.all([
    sendEmail({
      to: args.to,
      subject: `Your booking is confirmed (${args.orderId})`,
      react: <BookingConfirmationEmail {...args} />,
    }),
    sendInternalAlert({
      kind: "Laundry Booking",
      requestId: args.orderId,
      name: args.name,
      email: args.to,
      summary: `Service: ${args.serviceType}`,
    }),
  ]);
}

export async function sendOrderStatusUpdate(args: {
  to: string;
  name: string;
  orderId: string;
  statusLabel: string;
  note?: string | null;
}) {
  await sendEmail({
    to: args.to,
    subject: `Order ${args.orderId}: ${args.statusLabel}`,
    react: <OrderStatusUpdateEmail {...args} />,
  });
}
