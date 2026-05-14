import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 2 });

let foundIndex = -1;
for (let i = 0; i < 80; i++) {
  await page.goto(`http://localhost:5173/?slide=${i}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(80);
  const fig = await page.locator(".fig-label").first().textContent().catch(() => "");
  if (fig && /FIG\.\s*J\.4/.test(fig)) {
    foundIndex = i;
    console.log("found J.4 at slide index", i);
    break;
  }
}
if (foundIndex < 0) { console.error("J.4 not found"); process.exit(1); }

await page.goto(`http://localhost:5173/?slide=${foundIndex}`, { waitUntil: "networkidle" });
await page.waitForTimeout(900);
await page.screenshot({ path: "/tmp/j4-step1.png", fullPage: false });
console.log("step 1 captured");

await page.keyboard.press(" ");
await page.waitForTimeout(700);
await page.screenshot({ path: "/tmp/j4-step2.png", fullPage: false });
console.log("step 2 captured");

await browser.close();
