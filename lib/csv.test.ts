import assert from "node:assert/strict";
import { test } from "node:test";

import { toCsv } from "./csv";

test("toCsv quotes separators, keeps numbers, blanks nulls and defuses formulas", () => {
  const out = toCsv(["a", "b", "c", "d"], [['say "hi", ok', -4, null, "=HYPERLINK(1)"]]);
  assert.equal(out, "﻿a,b,c,d\r\n\"say \"\"hi\"\", ok\",-4,,'=HYPERLINK(1)");
});
