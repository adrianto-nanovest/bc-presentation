import { chromium } from "@playwright/test";
import { deckUrl, parseVariantArgOrExit, scriptUsage } from "./lib/variant-arg.mjs";

const USAGE = scriptUsage({
  script: "scripts/screenshot-exchange-alerts.mjs",
  outArg: "out.png",
  outDefault: "screenshots/exchange-alerts-verify.png",
});

// Parsed before the browser launches, so a bad id costs no chromium boot.
const { variant, positionals } = parseVariantArgOrExit(process.argv.slice(2), USAGE);

// The variant is appended to every goto, never inherited: a bare localhost
// resolves to `general`, so the shot would silently be of the wrong deck (gh#27).
const base = process.env.DECK_URL ?? "http://localhost:5173";
const out = positionals[0] ?? "screenshots/exchange-alerts-verify.png";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto(deckUrl(base, variant, { slide: 12 }), { waitUntil: "domcontentloaded" });
await page.waitForSelector('[data-testid="slide"]');
await page.waitForTimeout(800);
// Probe wide range — sections added since the e2e test was written.
await page.goto(deckUrl(base, variant, { slide: 0 }), { waitUntil: "domcontentloaded" });
await page.waitForSelector('[data-testid="slide"]');
const total = await page.evaluate(() => window.__DECK_SLIDE_COUNT__);
console.log(`variant ${variant} — total slides:`, total);
for (let i = 0; i < total; i++) {
  await page.goto(deckUrl(base, variant, { slide: i }), { waitUntil: "domcontentloaded" });
  await page.waitForSelector('[data-testid="slide"]');
  await page.waitForTimeout(300);
  const wp = await page.locator('[data-testid="workflows-panel"]').count();
  if (wp > 0) {
    console.log("found at slide", i);
    await page.locator('[data-testid="workflows-subtab-exchange-alerts"]').click();
    // Wait ~5s so revealLoop has reached pathLength=1 for all inter-agent beziers
    // (their delays are 2.0 / 2.6 / 3.4; pathLength hits 1 at delay + 9*0.45 ≈ +4s).
    await page.waitForTimeout(5200);
    break;
  }
}
await page.screenshot({ path: out, fullPage: false });
await browser.close();
console.log("wrote", out, `(variant ${variant})`);
