import assert from "node:assert/strict";
import { test } from "node:test";

import { todayIST } from "./format";
import { estimateDelivery } from "./scheduling";

test("todayIST returns the IST calendar date, not the UTC one", () => {
  // 20:00 UTC on 9 Nov is 01:30 IST on 10 Nov.
  assert.equal(todayIST(new Date("2026-11-09T20:00:00Z")), "2026-11-10");
  assert.equal(todayIST(new Date("2026-11-09T10:00:00Z")), "2026-11-09");
});

test("standard delivery is estimated 48h after the pickup window ends", () => {
  const now = new Date(2026, 10, 1, 8, 0);
  const result = estimateDelivery(
    { pickupDate: new Date(2026, 10, 9), pickupWindowEndHour: 11, express: false },
    now
  );
  assert.equal(result.date.getDate(), 11);
  assert.equal(result.date.getHours(), 11);
});

test("express delivery is estimated 24h after the pickup window ends", () => {
  const now = new Date(2026, 10, 1, 8, 0);
  const result = estimateDelivery(
    { pickupDate: new Date(2026, 10, 9), pickupWindowEndHour: 11, express: true },
    now
  );
  assert.equal(result.date.getDate(), 10);
  assert.equal(result.date.getHours(), 11);
});
