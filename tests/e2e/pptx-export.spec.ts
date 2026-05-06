import { test, expect } from "@playwright/test";
import { spawnSync } from "node:child_process";
import { existsSync, statSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

test("export-pptx.mjs produces a non-empty .pptx whose internal slide count matches the deck", async () => {
  const out = resolve("exports/smoke-deck.pptx");
  const result = spawnSync("node", ["scripts/export-pptx.mjs", out], {
    stdio: "inherit",
  });
  expect(result.status).toBe(0);
  expect(existsSync(out)).toBe(true);
  expect(statSync(out).size).toBeGreaterThan(50_000);

  // .pptx is a zip. Count slide*.xml entries — they encode
  // one entry per actual slide and the count is therefore exact.
  const buf = readFileSync(out);
  const haystack = buf.toString("latin1");
  const matches = haystack.match(/ppt\/slides\/slide\d+\.xml/g) ?? [];
  // Each slide is referenced from multiple zip locations (content type +
  // relationships + the slide itself). Dedupe on filename.
  const unique = new Set(matches);
  expect(unique.size).toBe(7);
});
