// PROTOTYPE gh#15 v2 — re-shoot every slide flagged in the first review,
// in light A + B, plus the dark opt-outs. Clicks pin the flagged panels.
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";

const base = "http://localhost:5199";
mkdirSync("prototype-gh15-shots/v2", { recursive: true });

const slides = [
  { n: 0, tag: "title", dark: true },
  { n: 1, tag: "a1" },
  { n: 4, tag: "b3" },
  { n: 8, tag: "c2" },
  { n: 12, tag: "c6-bridge", dark: true },
  { n: 14, tag: "d2" },
  { n: 15, tag: "d3" },
  { n: 20, tag: "e3", click: "ROLE" },
  { n: 22, tag: "e5", click: "DRAFT AN EMAIL" },
  { n: 25, tag: "e8" },
  { n: 28, tag: "e11" },
  { n: 33, tag: "f4", click: "WHAT IT IS" },
  { n: 36, tag: "f7", click: "WHEN TO USE WHICH" },
  { n: 40, tag: "g2" },
  { n: 45, tag: "g7", click: "PERSISTENT AI CONFIG" },
  { n: 51, tag: "h2" },
  { n: 54, tag: "i2", dark: true },
  { n: 55, tag: "i3" },
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

for (const s of slides) {
  const variants = s.dark ? ["A"] : ["A", "B"];
  for (const v of variants) {
    await page.goto(`${base}/?slide=${s.n}&theme=light&ltv=${v}`, { waitUntil: "networkidle" });
    const slideEl = page.locator('[data-testid="slide"]');
    await slideEl.waitFor();
    const pose = Number(await slideEl.getAttribute("data-canonical-pose")) || 0;
    for (let i = 0; i < pose; i++) {
      await page.keyboard.press("Space");
      await page.waitForTimeout(200);
    }
    if (s.click) {
      await page.locator(`text=${s.click}`).first().click().catch(() => {});
    }
    await page.waitForTimeout(1800);
    await page.screenshot({ path: `prototype-gh15-shots/v2/s${String(s.n).padStart(2, "0")}-${s.tag}--${v}.png` });
    console.log(`s${s.n} ${s.tag} ${v}`);
  }
}
await browser.close();
