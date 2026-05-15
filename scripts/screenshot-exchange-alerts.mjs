import { chromium } from "@playwright/test";

const url = "http://localhost:5173/?slide=12";
const out = "screenshots/exchange-alerts-verify.png";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto(url, { waitUntil: "domcontentloaded" });
await page.waitForSelector('[data-testid="slide"]');
await page.waitForTimeout(800);
// Probe wide range — sections added since the e2e test was written.
await page.goto(`http://localhost:5173/?slide=0`, { waitUntil: "domcontentloaded" });
await page.waitForSelector('[data-testid="slide"]');
const total = await page.evaluate(() => window.__DECK_SLIDE_COUNT__);
console.log("total slides:", total);
for (let i = 0; i < total; i++) {
  await page.goto(`http://localhost:5173/?slide=${i}`, { waitUntil: "domcontentloaded" });
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
console.log("wrote", out);
