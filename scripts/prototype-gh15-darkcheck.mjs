import { chromium } from "@playwright/test";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:5199/?slide=55&theme=dark", { waitUntil: "networkidle" });
await page.keyboard.press("Space");
await page.waitForTimeout(2000);
await page.screenshot({ path: "prototype-gh15-shots/v2/x55-i3--dark-regression.png" });
await browser.close();
console.log("done");
