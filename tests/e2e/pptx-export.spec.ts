import { test, expect } from "@playwright/test";
import { spawnSync } from "node:child_process";
import { existsSync, statSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { chromium } from "playwright";

declare global {
  interface Window {
    __DECK_SLIDE_COUNT__: number;
  }
}

test("export-pptx.mjs produces a non-empty .pptx whose internal slide count matches the deck", async () => {
  // Resolve current slide count from the running deck, so we don't
  // need to update this test as new section sub-specs land.
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("http://localhost:5173", { waitUntil: "networkidle" });
  const expectedSlides = await page.evaluate(() => window.__DECK_SLIDE_COUNT__);
  await browser.close();

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
  expect(unique.size).toBe(expectedSlides);
});
