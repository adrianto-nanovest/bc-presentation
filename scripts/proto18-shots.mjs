// PROTOTYPE gh#18 — throwaway screenshot helper. Delete with the prototype.
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";

const OUT = "/tmp/proto18-shots";
mkdirSync(OUT, { recursive: true });

const HOVER = { A: "va-station", B: "vb-decision", C: "vc-field" };

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
page.on("console", (m) => {
  if (m.type() === "error") console.log(`  [console.error] ${m.text()}`);
});
page.on("pageerror", (e) => console.log(`  [pageerror] ${e.message}`));

for (const v of ["A", "B", "C"]) {
  await page.goto(`http://localhost:5173/?dev=proto18&variant=${v}`);
  await page.waitForSelector('[data-testid="slide"]');
  await page.waitForTimeout(1400);
  await page.screenshot({ path: `${OUT}/${v}-step0.png` });

  await page.hover(`[data-testid="${HOVER[v]}-budget"]`);
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${OUT}/${v}-step0-hover-budget.png` });

  await page.mouse.move(4, 4);
  await page.waitForTimeout(300);
  await page.keyboard.press("Space");
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${OUT}/${v}-step1.png` });
  console.log(`${v} ok`);
}

await browser.close();
