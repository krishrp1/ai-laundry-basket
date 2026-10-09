import assert from "node:assert/strict";
import { test } from "node:test";

import { consentSchema } from "./consent";

test("consent is accepted only for a ticked checkbox value", () => {
  assert.equal(consentSchema.safeParse("on").success, true);
  assert.equal(consentSchema.safeParse("true").success, true);
});

test("missing, empty, or other consent values are rejected", () => {
  for (const value of [undefined, null, "", "off", "false", "yes"]) {
    assert.equal(consentSchema.safeParse(value).success, false, String(value));
  }
});
