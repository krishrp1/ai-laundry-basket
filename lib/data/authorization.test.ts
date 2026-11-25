import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";

// Layout checks do not protect page data (they render in parallel), so every
// function that reads admin data must authorize before doing anything else.
const dir = join(process.cwd(), "lib/data");
const NO_DATABASE = new Set(["list-params.ts"]);

test("every data access function authorizes first", () => {
  const files = readdirSync(dir).filter((f) => f.endsWith(".ts") && !f.endsWith(".test.ts") && !NO_DATABASE.has(f));
  assert.ok(files.length >= 5);
  for (const file of files) {
    const source = readFileSync(join(dir, file), "utf8");
    const functions = source.split(/^export async function /m).slice(1);
    assert.ok(functions.length > 0, `${file}: no exported functions found`);
    for (const body of functions) {
      const name = body.slice(0, body.indexOf("("));
      assert.match(body, /\)[^\n]*\{\n\s*await (getCurrentAdmin|requireSuperAdmin)\(\);/, `${file}: ${name}`);
    }
  }
});
