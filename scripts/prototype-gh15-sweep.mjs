// PROTOTYPE gh#15 — sweep the deck, print slide index → fig-label map.
import { chromium } from "@playwright/test";

const base = "http://localhost:5199";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto(`${base}/?slide=0&theme=dark`, { waitUntil: "networkidle" });
const count = await page.evaluate(() => window.__DECK_SLIDE_COUNT__);
console.log(`slides: ${count}`);

for (let i = 0; i < count; i++) {
  await page.goto(`${base}/?slide=${i}&theme=dark`, { waitUntil: "domcontentloaded" });
  await page.waitForSelector('[data-testid="slide"]', { timeout: 5000 });
  const label = await page
    .locator(".fig-label")
    .first()
    .textContent({ timeout: 700 })
    .catch(() => "(no fig-label)");
  console.log(`${String(i).padStart(2, "0")}  ${label?.trim().slice(0, 80)}`);
}
await browser.close();
