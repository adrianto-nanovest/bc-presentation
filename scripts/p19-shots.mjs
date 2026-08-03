// PROTOTYPE gh#19 verification harness — throwaway, deleted with the prototype.
// Captures the 1280×720 stage at each step and each hover state, and reports
// console errors plus a few geometry assertions.
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";

const OUT = "/tmp/p19";
mkdirSync(OUT, { recursive: true });

const URL = "http://localhost:5173/?dev=proto19";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

const errors = [];
page.on("console", (m) => {
  if (m.type() === "error" || m.type() === "warning") errors.push(`${m.type()}: ${m.text()}`);
});
page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));

await page.goto(URL, { waitUntil: "networkidle" });
const stage = page.locator('[data-testid="slide"]');
await stage.waitFor();

const shot = async (name) => {
  await stage.screenshot({ path: `${OUT}/${name}.png` });
  return name;
};

const phase = () => page.getAttribute('[data-testid="p19-figure"]', "data-phase");

// step 0 — mid-draw, then settled
await page.waitForTimeout(900);
await shot("00-hero-mid");
await page.waitForTimeout(2200);
await shot("01-hero-done");
console.log("phase after hero:", await phase());

// step 0 -> 1: merge at centre, then dock
await page.keyboard.press("Space");
await page.waitForTimeout(600);
await shot("02-merge");
console.log("phase mid-merge:", await phase());
await page.waitForTimeout(1500);
await shot("03-ring");
console.log("phase after dock:", await phase());

// hover at step 1 — one apparatus group mounts at a time, nothing else
const GROUPS = { trigger: "p19-clock", memory: "p19-memory", condition: "p19-condition", budget: "p19-budget" };
for (const [id, group] of Object.entries(GROUPS)) {
  await page.locator(`[data-testid="p19-row-${id}"]`).hover();
  await page.waitForTimeout(500);
  await shot(`04-step1-${id}`);
  const mounted = [];
  for (const g of Object.values(GROUPS)) if (await page.$(`[data-testid="${g}"]`)) mounted.push(g);
  console.log(`step1 hover ${id}: mounted = ${JSON.stringify(mounted)}`);
}
await page.mouse.move(20, 760);
await page.waitForTimeout(500);
const idleMounted = [];
for (const g of Object.values(GROUPS)) if (await page.$(`[data-testid="${g}"]`)) idleMounted.push(g);
console.log("step1 idle: mounted =", JSON.stringify(idleMounted));
await shot("04-step1-idle");

// step 2 — apparatus
await page.keyboard.press("Space");
await page.waitForTimeout(900);
await shot("05-full-idle");
console.log("phase at step 2:", await phase());

for (const id of ["trigger", "memory", "condition", "budget", "gate"]) {
  await page.locator(`[data-testid="p19-row-${id}"]`).hover();
  await page.waitForTimeout(750);
  await shot(`06-${id}`);
  const on = await page.getAttribute(`[data-testid="p19-row-${id}"]`, "data-active");
  console.log(`hover ${id}: data-active=${on}`);
}

// un-hover must RELEASE
await page.mouse.move(20, 760);
await page.waitForTimeout(500);
const stillActive = await page.$$eval('[data-testid^="p19-row-"]', (els) =>
  els.filter((e) => e.getAttribute("data-active") === "true").map((e) => e.dataset.testid),
);
console.log("after un-hover, still active:", JSON.stringify(stillActive));
await shot("07-released");

// click-to-pin must hold
await page.locator('[data-testid="p19-row-budget"]').click();
await page.mouse.move(20, 760);
await page.waitForTimeout(500);
const pinned = await page.$$eval('[data-testid^="p19-row-"]', (els) =>
  els.filter((e) => e.getAttribute("data-active") === "true").map((e) => e.dataset.testid),
);
console.log("after pin+leave, still active:", JSON.stringify(pinned));
await shot("08-pinned-budget");
await page.locator('[data-testid="p19-row-budget"]').click();
// Playwright's click leaves the pointer ON the row, which is a real hover.
// Move it off, or the next assertion measures the pointer, not the step.
await page.mouse.move(20, 760);
await page.waitForTimeout(400);

// backwards: 2 -> 1 must NOT replay the merge
await page.keyboard.press("Backspace");
await page.waitForTimeout(120);
console.log("phase immediately after retreat 2->1:", await phase());
await page.waitForTimeout(500);
await shot("09-back-to-ring");

// no ghosts: at step 1, idle, no apparatus group may be in the DOM
const back1 = [];
for (const g of ["p19-clock", "p19-memory", "p19-condition", "p19-budget"]) {
  if (await page.$(`[data-testid="${g}"]`)) back1.push(g);
}
console.log("step 1 after retreat, mounted groups:", JSON.stringify(back1));

// 1 -> 0 must replay the hero
await page.keyboard.press("Backspace");
await page.waitForTimeout(700);
console.log("phase after retreat 1->0:", await phase());
await shot("10-back-to-hero");

// no partial-opacity resting states anywhere in the figure
const opacities = await page.$$eval('[data-testid="p19-figure"] *', (els) =>
  els
    .map((e) => ({ tag: e.tagName, o: getComputedStyle(e).opacity }))
    .filter((r) => Number(r.o) > 0.001 && Number(r.o) < 0.999),
);
console.log("partial-opacity nodes:", JSON.stringify(opacities));

console.log("console errors/warnings:", errors.length ? JSON.stringify(errors, null, 2) : "none");
await browser.close();
