import assert from "node:assert/strict";
import { test } from "node:test";

import { brushStroke, type BrushOptions } from "./brush";

const options: BrushOptions = { seed: 11, width: 200, spine: [[[150, 600], [520, 330], [1080, 170], [1560, 360]]] };

test("the same options always draw the same stroke (server and client markup must match)", () => {
  assert.deepEqual(brushStroke(options), brushStroke(options));
  assert.notEqual(brushStroke(options).body, brushStroke({ ...options, seed: 12 }).body);
});

test("strokes are valid SVG geometry", () => {
  const b = brushStroke({ ...options, splatter: 30 });
  for (const d of [b.body, b.sheen, b.spinePath, ...b.bristles.map((g) => g.d)]) {
    assert.match(d, /^M/);
    assert.doesNotMatch(d, /NaN|Infinity|undefined/);
  }
  assert.equal(b.dots.length, 30);
  assert.ok(b.dots.every((d) => Number.isFinite(d.x) && Number.isFinite(d.y) && d.r > 0));
  // the spine of this curve is a little over 1,500 units long
  assert.ok(b.length > 1400 && b.length < 1800, `length ${b.length}`);
});
