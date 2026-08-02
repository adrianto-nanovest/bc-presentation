// PROTOTYPE gh#15 — supplemental shots: E5 pinned island panel, E9 active pitfall.
import { chromium } from "@playwright/test";

const base = "http://localhost:5199";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

for (const t of ["A", "B", "C"]) {
  // E5 — click the first use-case card to pin the detail popover (dark island)
  await page.goto(`${base}/?slide=22&theme=light&ltv=${t}`, { waitUntil: "networkidle" });
  await page.keyboard.press("Space");
  await page.waitForTimeout(400);
  await page.locator("text=DRAFT AN EMAIL").first().click();
  await page.waitForTimeout(2600);
  await page.screenshot({ path: `prototype-gh15-shots/s22-e5-island--light-${t}.png` });
  console.log(`e5 island light-${t}`);
}

// E9 — advance far enough that a pitfall is active on the right canvas
for (const q of ["theme=dark", "theme=light&ltv=B"]) {
  await page.goto(`${base}/?slide=26&${q}`, { waitUntil: "networkidle" });
  for (let i = 0; i < 4; i++) {
    await page.keyboard.press("Space");
    await page.waitForTimeout(300);
  }
  await page.waitForTimeout(1500);
  const tag = q.includes("dark") ? "dark" : "light-B";
  await page.screenshot({ path: `prototype-gh15-shots/s26-e9-active--${tag}.png` });
  console.log(`e9 active ${tag}`);
}

await browser.close();
