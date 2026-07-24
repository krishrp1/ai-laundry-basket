import * as React from "react";
import { EmailLayout, EmailField, Section, Text, emailSectionStyle } from "./layout";

export function OrderStatusUpdateEmail({
  name,
  orderId,
  statusLabel,
  note,
}: {
  name: string;
  orderId: string;
  statusLabel: string;
  note?: string | null;
}) {
  return (
    <EmailLayout
      previewText={`Order ${orderId} is now ${statusLabel}`}
      heading={`Update on your order, ${name.split(" ")[0] || "there"}`}
    >
      <Text style={{ fontSize: "14px" }}>Your laundry order status has changed.</Text>
      <Section style={emailSectionStyle}>
        <EmailField label="Order ID" value={orderId} />
        <EmailField label="Status" value={statusLabel} />
        {note && <EmailField label="Note" value={note} />}
      </Section>
    </EmailLayout>
  );
}
