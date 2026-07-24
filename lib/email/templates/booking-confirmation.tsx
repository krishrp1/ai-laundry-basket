import * as React from "react";
import { EmailLayout, EmailField, Section, Text, emailSectionStyle } from "./layout";

export function BookingConfirmationEmail({
  name,
  orderId,
  serviceType,
  pickupDate,
  pickupTime,
}: {
  name: string;
  orderId: string;
  serviceType: string;
  pickupDate: string | null;
  pickupTime: string | null;
}) {
  return (
    <EmailLayout
      previewText={`Your booking ${orderId} is confirmed`}
      heading={`Your booking is confirmed, ${name.split(" ")[0] || "there"}!`}
    >
      <Text style={{ fontSize: "14px" }}>
        We&apos;ve scheduled your laundry service. You can track its status any time by
        referencing the order ID below.
      </Text>
      <Section style={emailSectionStyle}>
        <EmailField label="Order ID" value={orderId} />
        <EmailField label="Service" value={serviceType} />
        {pickupDate && (
          <EmailField
            label="Pickup"
            value={pickupTime ? `${pickupDate} · ${pickupTime}` : pickupDate}
          />
        )}
      </Section>
      <Text style={{ fontSize: "14px" }}>
        We&apos;ll email you again as your order moves through pickup, cleaning, and
        delivery.
      </Text>
    </EmailLayout>
  );
}
