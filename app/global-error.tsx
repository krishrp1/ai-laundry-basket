"use client";

// Next.js already logs the full error server-side (with a matching `digest`)
// whenever it crosses this boundary — logging `error` again here would only
// print to the visitor's own browser console, not anywhere we can see it.
export default function GlobalError({
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          padding: 24,
          textAlign: "center",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif",
          color: "#171717",
          background: "#ffffff",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 56,
            height: 56,
            borderRadius: 16,
            alignItems: "center",
            justifyContent: "center",
            background: "#fdecec",
            color: "#c0392b",
            fontSize: 28,
          }}
        >
          !
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 600, margin: 0 }}>
          A&I Laundry Basket hit a snag
        </h1>
        <p style={{ maxWidth: 420, color: "#555555", margin: 0 }}>
          Something went wrong loading the application. Please try again in
          a moment.
        </p>
        <button
          onClick={() => unstable_retry()}
          style={{
            marginTop: 8,
            padding: "10px 20px",
            borderRadius: 8,
            border: "none",
            background: "#1E88E5",
            color: "#fafafa",
            fontSize: 14,
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
