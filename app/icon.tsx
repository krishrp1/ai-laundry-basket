import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#173f8f",
          color: "#ffffff",
          fontSize: 15,
          fontWeight: 700,
          borderRadius: 6,
          borderBottom: "3px solid #f2b63c",
        }}
      >
        A&I
      </div>
    ),
    { ...size }
  );
}
