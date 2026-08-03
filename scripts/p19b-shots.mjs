// PROTOTYPE gh#19b verification harness — throwaway, deleted with the prototype.
// Captures the 1280×720 stage at each step and each hover/pin state, and
// reports console errors plus interaction assertions.
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";

const OUT = "/tmp/p19b";
mkdirSync(OUT, { recursive: true });

const URL = "http://localhost:5173/?dev=proto19b";
const PARTS = ["heartbeat", "beat", "checker", "spine"];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 920 } });

const errors = [];
page.on("console", (m) => {
  if (m.type() === "error" || m.type() === "warning") errors.push(`${m.type()}: ${m.text()}`);
});
page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));

await page.goto(URL, { waitUntil: "networkidle" });
const stage = page.locator('[data-testid="slide"]');
await stage.waitFor();

const shot = async (name) => stage.screenshot({ path: `${OUT}/${name}.png` });
const panel = () => page.getAttribute('[data-testid="p19b-canvas"]', "data-panel");

// step 0 — mid-entry, then settled (ambient loops keep running)
await page.waitForTimeout(400);
await shot("00-step0-mid");
await page.waitForTimeout(1600);
await shot("01-step0-done");
await page.waitForTimeout(1700);
await shot("02-step0-later"); // relay/comet should have visibly moved

// step 1 — idle shows the ONE BEAT panel
await page.keyboard.press("Space");
await page.waitForTimeout(1100);
console.log("step1 idle panel:", await panel());
await shot("03-step1-idle");

// hover each part — panel swaps, card lights
for (const id of PARTS) {
  await page.locator(`[data-testid="p19b-card-${id}"]`).hover();
  await page.waitForTimeout(750);
  console.log(`step1 hover ${id}: panel=${await panel()}, card-active=${await page.getAttribute(`[data-testid="p19b-card-${id}"]`, "data-active")}`);
  await shot(`04-step1-${id}`);
}

// un-hover releases back to the default panel
await page.mouse.move(640, 880);
await page.waitForTimeout(500);
console.log("step1 after un-hover: panel =", await panel());
const activeAfter = await page.$$eval('[data-testid^="p19b-card-"]', (els) =>
  els.filter((e) => e.getAttribute("data-active") === "true").map((e) => e.dataset.testid),
);
console.log("step1 after un-hover, active cards:", JSON.stringify(activeAfter));
await shot("05-step1-released");

// pin holds after the pointer leaves
await page.locator('[data-testid="p19b-card-checker"]').click();
await page.mouse.move(640, 880);
await page.waitForTimeout(500);
console.log("step1 pinned checker: panel =", await panel());
await shot("06-step1-pinned-checker");
await page.locator('[data-testid="p19b-card-checker"]').click(); // unpin
await page.mouse.move(640, 880);
await page.waitForTimeout(300);

// step 2 — the triage flow + footnote
await page.keyboard.press("Space");
await page.waitForTimeout(1600);
console.log("step2 panel:", await panel());
console.log("step2 footnote visible:", await page.locator('[data-testid="p19b-footnote"]').isVisible());
await shot("07-step2-idle");

for (const id of PARTS) {
  await page.locator(`[data-testid="p19b-card-${id}"]`).hover();
  await page.waitForTimeout(500);
  await shot(`08-step2-${id}`);
}
await page.mouse.move(640, 880);
await page.waitForTimeout(400);

// backwards: 2 → 1 → 0 all render
await page.keyboard.press("Backspace");
await page.waitForTimeout(700);
console.log("back to step1: panel =", await panel());
await shot("09-back-step1");
await page.keyboard.press("Backspace");
await page.waitForTimeout(900);
await shot("10-back-step0");

console.log("console errors/warnings:", errors.length ? JSON.stringify(errors, null, 2) : "none");
await browser.close();
