// PROTOTYPE gh#16 — throwaway screenshot harness.
//   node src/slides/prototype-gh16-leader-slides/shoot.mjs
// Writes /tmp/proto16/<slide>-<variant>-<brand>-s<step>.png
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";

const OUT = "/tmp/proto16";
const BASE = "http://localhost:5173";

// The steps worth looking at, not every step.
const SHOTS = {
  pillars: [0, 1, 2, 5, 8],
  ladder: [0, 1, 2, 3, 4],
};

mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));

for (const slide of Object.keys(SHOTS)) {
  for (const variant of ["a", "b", "c"]) {
    for (const brand of ["gems", "berau"]) {
      await page.goto(`${BASE}/?dev=proto16&p=${slide}&v=${variant}&brand=${brand}`);
      await page.waitForSelector('[data-testid="slide"]');
      let cur = 0;
      for (const step of SHOTS[slide]) {
        // step 0 is the mount state; walk forward to each requested step.
        for (; cur < step; cur++) await page.keyboard.press("Space");
        await page.waitForTimeout(700);
        const stage = await page.$(".stage");
        await stage.screenshot({ path: `${OUT}/${slide}-${variant}-${brand}-s${step}.png` });
      }
    }
  }
}

await browser.close();
console.log(errors.length ? `ERRORS:\n${[...new Set(errors)].join("\n")}` : "no page errors");
