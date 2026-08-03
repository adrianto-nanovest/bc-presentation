// PROTOTYPE gh#15 — probe all slides in light theme for:
//  (a) elements whose computed background is dark → their inline background literal
//  (b) elements whose computed text color is near-white → their inline color literal
// Output: distinct literals + slide indices, to drive CSS overrides / var swaps.
import { chromium } from "@playwright/test";

const base = "http://localhost:5199";
const SKIP = new Set([0, 12, 29, 38, 49, 52, 54, 56]); // opt-out slides stay dark

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto(`${base}/?slide=1&theme=light&ltv=A`, { waitUntil: "networkidle" });
const count = await page.evaluate(() => window.__DECK_SLIDE_COUNT__);

const darkBg = new Map(); // literal -> Set(slides)
const lightText = new Map();

for (let i = 0; i < count; i++) {
  if (SKIP.has(i)) continue;
  await page.goto(`${base}/?slide=${i}&theme=light&ltv=A`, { waitUntil: "domcontentloaded" });
  await page.waitForSelector('[data-testid="slide"]');
  // reach canonical pose so step-revealed panels exist
  const pose = Number(await page.locator('[data-testid="slide"]').getAttribute("data-canonical-pose")) || 0;
  for (let s = 0; s < pose; s++) {
    await page.keyboard.press("Space");
    await page.waitForTimeout(120);
  }
  await page.waitForTimeout(400);
  const found = await page.evaluate(() => {
    const lum = (r, g, b) => (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    const parse = (c) => {
      const m = c.match(/rgba?\(([\d.]+), ([\d.]+), ([\d.]+)(?:, ([\d.]+))?\)/);
      if (!m) return null;
      return { r: +m[1], g: +m[2], b: +m[3], a: m[4] === undefined ? 1 : +m[4] };
    };
    const bgs = [];
    const texts = [];
    for (const el of document.querySelectorAll("[data-testid='slide'] *")) {
      const cs = getComputedStyle(el);
      const styleAttr = el.getAttribute("style") || "";
      const bg = parse(cs.backgroundColor);
      if (bg && bg.a >= 0.3 && lum(bg.r, bg.g, bg.b) < 0.3) {
        // find the literal in the inline style, else blame stylesheet
        const m = styleAttr.match(/background[^;]*/);
        bgs.push(m ? m[0].slice(0, 90) : `(stylesheet) ${cs.backgroundColor}`);
      }
      const col = parse(cs.color);
      if (col && lum(col.r, col.g, col.b) > 0.72 && el.textContent?.trim()) {
        const m = styleAttr.match(/(?:^|;)\s*color[^;]*/);
        texts.push(m ? m[0].slice(0, 60) : `(inherited/sheet) ${cs.color}`);
      }
    }
    return { bgs, texts };
  });
  for (const b of found.bgs) {
    if (!darkBg.has(b)) darkBg.set(b, new Set());
    darkBg.get(b).add(i);
  }
  for (const t of found.texts) {
    if (!lightText.has(t)) lightText.set(t, new Set());
    lightText.get(t).add(i);
  }
}

console.log("=== DARK BACKGROUNDS (light theme) ===");
for (const [lit, slides] of [...darkBg].sort((a, b) => b[1].size - a[1].size))
  console.log(`[${[...slides].join(",")}]  ${lit}`);
console.log("\n=== NEAR-WHITE TEXT (light theme) ===");
for (const [lit, slides] of [...lightText].sort((a, b) => b[1].size - a[1].size))
  console.log(`[${[...slides].join(",")}]  ${lit}`);

await browser.close();
