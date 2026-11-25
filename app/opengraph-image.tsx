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
          justifyContent: "center",
          padding: 96,
          background: "#173f8f",
          color: "#ffffff",
          fontFamily: "sans-serif",
          borderBottom: "24px solid #f2b63c",
        }}
      >
        <div style={{ display: "flex", fontSize: 80, fontWeight: 700 }}>
          {siteConfig.name}
        </div>
        <div style={{ display: "flex", marginTop: 32, fontSize: 36 }}>
          {siteConfig.tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}
