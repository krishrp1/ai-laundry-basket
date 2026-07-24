import * as React from "react";
import { EmailLayout, EmailField, Section, Text, emailSectionStyle } from "./layout";

export function ContactAcknowledgementEmail({
  name,
  requestId,
}: {
  name: string;
  requestId: string;
}) {
  return (
    <EmailLayout
      previewText={`We received your message ${requestId}`}
      heading={`Thanks for reaching out, ${name.split(" ")[0] || "there"}`}
    >
      <Text style={{ fontSize: "14px" }}>
        Our support team will get back to you using your preferred contact method
        within one business day.
      </Text>
      <Section style={emailSectionStyle}>
        <EmailField label="Reference" value={requestId} />
      </Section>
    </EmailLayout>
  );
}
