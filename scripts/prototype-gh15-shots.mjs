// PROTOTYPE gh#15 — screenshot representative slides in dark + light A/B/C,
// then exercise the toggle contract (t key, v key, reload persistence).
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";

const base = "http://localhost:5199";
const outDir = "prototype-gh15-shots";
mkdirSync(outDir, { recursive: true });

const slides = [
  { n: 7, tag: "c1-typeled" },
  { n: 22, tag: "e5-codepanel" },
  { n: 26, tag: "e9-svgcanvas" },
  { n: 53, tag: "i1-canvas" },
  { n: 55, tag: "i3-simulations" },
];
const themes = [
  { q: "theme=dark", tag: "dark" },
  { q: "theme=light&ltv=A", tag: "light-A" },
  { q: "theme=light&ltv=B", tag: "light-B" },
  { q: "theme=light&ltv=C", tag: "light-C" },
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

for (const s of slides) {
  for (const t of themes) {
    await page.goto(`${base}/?slide=${s.n}&${t.q}`, { waitUntil: "networkidle" });
    const slideEl = page.locator('[data-testid="slide"]');
    await slideEl.waitFor({ timeout: 5000 });
    const pose = Number(await slideEl.getAttribute("data-canonical-pose")) || 0;
    for (let i = 0; i < pose; i++) {
      await page.keyboard.press("Space");
      await page.waitForTimeout(250);
    }
    await page.waitForTimeout(1500);
    await page.screenshot({ path: `${outDir}/s${s.n}-${s.tag}--${t.tag}.png` });
    console.log(`shot s${s.n} ${t.tag} (pose ${pose})`);
  }
}

// ---- toggle contract checks -------------------------------------------
const attr = () => page.evaluate(() => [
  document.documentElement.dataset.theme,
  document.documentElement.dataset.ltVariant,
]);

await page.goto(`${base}/?slide=7&theme=dark`, { waitUntil: "networkidle" });
console.log("initial:", await attr());
await page.keyboard.press("t");
await page.waitForTimeout(200);
console.log("after t:", await attr(), "url:", page.url());
await page.keyboard.press("v");
await page.waitForTimeout(200);
console.log("after v:", await attr(), "url:", page.url());
// slide nav must not reset theme
await page.keyboard.press("ArrowRight");
await page.waitForTimeout(300);
console.log("after ArrowRight:", await attr());
// reload WITHOUT params — localStorage must restore
await page.goto(`${base}/`, { waitUntil: "networkidle" });
console.log("reload, no params:", await attr(), "url:", page.url());

await browser.close();
