import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

// Static-site-safe CSP (no nonces): this project is fully statically
// prerendered. Nonce-based CSP requires dynamic rendering on every page
// (see Next.js docs), which would remove static optimization and CDN
// caching site-wide. 'unsafe-inline' is required here for two reasons
// specific to this stack, not general laziness:
//   - script-src: Next.js streams RSC hydration payloads via inline
//     <script> tags (self.__next_f.push(...)) with no nonce in static mode.
//   - style-src: base-ui (Select/DropdownMenu/NavigationMenu) positions
//     floating popups by setting inline `style` via JS at runtime.
// Removing either would break hydration or dropdown/select positioning.
//
// 'unsafe-eval' is appended to script-src ONLY when NODE_ENV !== "production"
// (i.e. `next dev`). React Fast Refresh and React's dev-mode debugging
// helpers (reconstructing component stacks) call eval(); React never calls
// eval() in production builds, so `next build`/`next start` never gets it.
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""};
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob:;
  font-src 'self';
  connect-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`
  .replace(/\s{2,}/g, " ")
  .trim();

const securityHeaders = [
  { key: "Content-Security-Policy", value: cspHeader },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
