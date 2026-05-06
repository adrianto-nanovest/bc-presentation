import { test, expect } from "@playwright/test";
import { spawnSync } from "node:child_process";
import { existsSync, statSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

test("export-pdf.mjs produces a non-empty PDF with one page per slide", async () => {
  const out = resolve("exports/smoke-deck.pdf");
  const result = spawnSync("node", ["scripts/export-pdf.mjs", out], {
    stdio: "inherit",
  });
  expect(result.status).toBe(0);
  expect(existsSync(out)).toBe(true);
  expect(statSync(out).size).toBeGreaterThan(10_000);

  // Cheap PDF page count: count "/Type /Page" occurrences (not /Pages).
  const buf = readFileSync(out);
  const matches = buf.toString("latin1").match(/\/Type\s*\/Page[^s]/g) ?? [];
  expect(matches.length).toBe(7);
});
