import * as React from "react";
import { EmailLayout, EmailField, Section, Text, emailSectionStyle } from "./layout";

export function QuoteConfirmationEmail({
  name,
  requestId,
  serviceType,
  pickupDate,
  pickupTime,
}: {
  name: string;
  requestId: string;
  serviceType: string;
  pickupDate: string;
  pickupTime: string;
}) {
  return (
    <EmailLayout
      previewText={`We received your quote request ${requestId}`}
      heading={`Thanks, ${name.split(" ")[0] || "there"}!`}
    >
      <Text style={{ fontSize: "14px" }}>
        We&apos;ve received your quote request and our team will follow up within one
        business day with pricing and scheduling options.
      </Text>
      <Section style={emailSectionStyle}>
        <EmailField label="Request ID" value={requestId} />
        <EmailField label="Service" value={serviceType} />
        <EmailField label="Requested pickup" value={`${pickupDate} · ${pickupTime}`} />
      </Section>
      <Text style={{ fontSize: "14px" }}>
        Keep this request ID handy if you need to reference it when we contact you.
      </Text>
    </EmailLayout>
  );
}
