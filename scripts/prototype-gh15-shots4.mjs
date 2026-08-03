import { chromium } from "@playwright/test";
const base = "http://localhost:5199";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const shots = [
  { n: 4, tag: "b3", v: "B" },
  { n: 8, tag: "c2", v: "B" },
  { n: 25, tag: "e8", v: "B" },
  { n: 45, tag: "g7", v: "B", hover: "PERSISTENT AI CONFIG" },
  { n: 51, tag: "h2", v: "A" },
  { n: 54, tag: "i2", v: "A" },
];
for (const s of shots) {
  await page.goto(`${base}/?slide=${s.n}&theme=light&ltv=${s.v}`, { waitUntil: "networkidle" });
  const el = page.locator('[data-testid="slide"]');
  await el.waitFor();
  const pose = Number(await el.getAttribute("data-canonical-pose")) || 0;
  for (let i = 0; i < pose; i++) { await page.keyboard.press("Space"); await page.waitForTimeout(200); }
  if (s.hover) await page.locator(`text=${s.hover}`).first().hover().catch(() => {});
  await page.waitForTimeout(1800);
  await page.screenshot({ path: `prototype-gh15-shots/v2/x${String(s.n).padStart(2,"0")}-${s.tag}--${s.v}.png` });
  console.log(`${s.tag} done`);
}
await browser.close();
