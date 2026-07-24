import * as React from "react";
import { EmailLayout, EmailField, Section, Text, emailSectionStyle } from "./layout";

export function InternalNewLeadEmail({
  kind,
  requestId,
  name,
  email,
  phone,
  summary,
}: {
  kind: "Quote Request" | "Contact Message" | "Laundry Booking";
  requestId: string;
  name: string;
  email: string;
  phone?: string | null;
  summary: string;
}) {
  return (
    <EmailLayout previewText={`New ${kind}: ${name}`} heading={`New ${kind}`}>
      <Section style={emailSectionStyle}>
        <EmailField label="Reference" value={requestId} />
        <EmailField label="Name" value={name} />
        <EmailField label="Email" value={email} />
        {phone && <EmailField label="Phone" value={phone} />}
      </Section>
      <Text style={{ fontSize: "14px", whiteSpace: "pre-wrap" }}>{summary}</Text>
    </EmailLayout>
  );
}
