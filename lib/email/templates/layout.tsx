import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

const BRAND_COLOR = "#1E88E5";

export function EmailLayout({
  previewText,
  heading,
  children,
}: {
  previewText: string;
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={{ backgroundColor: "#f4f4f5", fontFamily: "Helvetica, Arial, sans-serif" }}>
        <Container
          style={{
            backgroundColor: "#ffffff",
            margin: "40px auto",
            padding: "32px",
            borderRadius: "12px",
            maxWidth: "480px",
          }}
        >
          <Text style={{ fontSize: "14px", fontWeight: 700, color: BRAND_COLOR, margin: 0 }}>
            A&I Laundry Basket
          </Text>
          <Heading style={{ fontSize: "20px", marginTop: "16px", marginBottom: "16px" }}>
            {heading}
          </Heading>
          {children}
          <Hr style={{ margin: "32px 0", borderColor: "#e4e4e7" }} />
          <Text style={{ fontSize: "12px", color: "#71717a" }}>
            A&I Laundry Basket &middot; This is an automated message, please don&apos;t reply
            directly to this email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export function EmailField({ label, value }: { label: string; value: string }) {
  return (
    <Text style={{ fontSize: "14px", margin: "4px 0" }}>
      <strong>{label}:</strong> {value}
    </Text>
  );
}

export const emailSectionStyle: React.CSSProperties = {
  backgroundColor: "#f9fafb",
  borderRadius: "8px",
  padding: "16px",
  margin: "16px 0",
};

export { Section, Text };
