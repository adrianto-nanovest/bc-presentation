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

test("export-pdf.mjs produces a non-empty PDF with one page per slide", async () => {
  // Resolve current slide count from the running deck, so we don't
  // need to update this test as new section sub-specs land.
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("http://localhost:5173", { waitUntil: "networkidle" });
  const expectedPages = await page.evaluate(() => window.__DECK_SLIDE_COUNT__);
  await browser.close();

  const out = resolve("exports/smoke-deck.pdf");
  const result = spawnSync("node", ["scripts/export-pdf.mjs", out], {
    stdio: "inherit",
  });
  expect(result.status).toBe(0);
  expect(existsSync(out)).toBe(true);
  expect(statSync(out).size).toBeGreaterThan(10_000);

  const buf = readFileSync(out);
  const matches = buf.toString("latin1").match(/\/Type\s*\/Page[^s]/g) ?? [];
  expect(matches.length).toBe(expectedPages);
});
