import { test } from "node:test";
import assert from "node:assert/strict";

import { resolveSiteUrl } from "./site-url";

test("no env vars set falls back to localhost", () => {
  assert.equal(resolveSiteUrl({}), "http://localhost:3000");
});

test("only VERCEL_URL set (typical no-custom-domain deploy)", () => {
  assert.equal(
    resolveSiteUrl({ VERCEL_URL: "ai-laundry-basket-abc123.vercel.app" }),
    "https://ai-laundry-basket-abc123.vercel.app"
  );
});

test("only VERCEL_PROJECT_PRODUCTION_URL set", () => {
  assert.equal(
    resolveSiteUrl({ VERCEL_PROJECT_PRODUCTION_URL: "ai-laundry-basket.vercel.app" }),
    "https://ai-laundry-basket.vercel.app"
  );
});

test("production URL wins over per-deployment URL when both are set", () => {
  assert.equal(
    resolveSiteUrl({
      VERCEL_PROJECT_PRODUCTION_URL: "ai-laundry-basket.vercel.app",
      VERCEL_URL: "ai-laundry-basket-git-feature-abc123.vercel.app",
    }),
    "https://ai-laundry-basket.vercel.app"
  );
});

test("explicit NEXT_PUBLIC_SITE_URL overrides both Vercel-provided URLs", () => {
  assert.equal(
    resolveSiteUrl({
      NEXT_PUBLIC_SITE_URL: "https://ailaundrybasket.com",
      VERCEL_PROJECT_PRODUCTION_URL: "ai-laundry-basket.vercel.app",
      VERCEL_URL: "ai-laundry-basket-abc123.vercel.app",
    }),
    "https://ailaundrybasket.com"
  );
});

test("empty-string env vars are treated as unset, not used verbatim", () => {
  assert.equal(
    resolveSiteUrl({
      NEXT_PUBLIC_SITE_URL: "",
      VERCEL_PROJECT_PRODUCTION_URL: "",
      VERCEL_URL: "",
    }),
    "http://localhost:3000"
  );
});

test("empty NEXT_PUBLIC_SITE_URL falls through to VERCEL_URL rather than short-circuiting", () => {
  assert.equal(
    resolveSiteUrl({
      NEXT_PUBLIC_SITE_URL: "",
      VERCEL_URL: "ai-laundry-basket-abc123.vercel.app",
    }),
    "https://ai-laundry-basket-abc123.vercel.app"
  );
});

test("NEXT_PUBLIC_SITE_URL already including a scheme is not double-prefixed", () => {
  assert.equal(
    resolveSiteUrl({ NEXT_PUBLIC_SITE_URL: "http://localhost:3000" }),
    "http://localhost:3000"
  );
});
