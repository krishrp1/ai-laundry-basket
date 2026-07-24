import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 32,
          background: "linear-gradient(135deg, #2563EB 0%, #1E3A8A 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 120,
            height: 120,
            borderRadius: 28,
            background: "rgba(255,255,255,0.15)",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              border: "8px solid #fafafa",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 700,
            color: "#fafafa",
          }}
        >
          {siteConfig.name}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            color: "rgba(250,250,250,0.85)",
          }}
        >
          Laundry day, solved by AI.
        </div>
      </div>
    ),
    { ...size }
  );
}
