// B.2 pose shots — a working harness for the boxes-and-fray redesign of 2026-08-14.
//
// Walks `gap-no-sop` in one leader deck, four poses, and writes one PNG per pose plus a
// report of every stage box's rect. Usage:
//
//   node scripts/b2-shots.mjs [outDir] [variant]
//
// Not an acceptance script: `scripts/*-verify.mjs` are the ones that assert. This one
// looks, so a human can see the stage the change actually paints.
import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

const OUT = process.argv[2] ?? "/tmp/b2-shots";
const VARIANT = process.argv[3] ?? "berau-leader";
const BASE = process.env.DECK_URL ?? "http://localhost:5173";
const REDUCED = process.env.REDUCED === "1";

const ISSUED = ["login", "demonstration", "encouragement"];
const QUESTIONS = ["may-go-in", "may-never", "who-decides", "who-hears"];

/** Every `nowrap` row on the stage — the boxes whose copy is cut to a measure, and the
 *  channel a line count is blind to (`scrollWidth > clientWidth` on a nowrap box). */
const IDS = [
  "no-sop-issued-eyebrow",
  "no-sop-unwritten-eyebrow",
  "no-sop-condition-eyebrow",
  "no-sop-dot-label-issued",
  "no-sop-dot-label-unwritten",
  "no-sop-closer",
  ...ISSUED.flatMap((id) => [`no-sop-issued-title-${id}`, `no-sop-issued-line-${id}`]),
  ...QUESTIONS.flatMap((id) => [
    `no-sop-question-domain-${id}`,
    `no-sop-question-ask-${id}`,
    `no-sop-blank-note-${id}`,
    `no-sop-question-chip-${id}`,
  ]),
];

async function findSlide(page) {
  await page.goto(`${BASE}?variant=${VARIANT}`, { waitUntil: "networkidle" });
  const count = await page.evaluate(() => window.__DECK_SLIDE_COUNT__);
  for (let i = 0; i < count; i += 1) {
    await page.goto(`${BASE}?variant=${VARIANT}&slide=${i}`, { waitUntil: "networkidle" });
    if (await page.locator('[data-testid="no-sop-diagram"]').count()) return i;
  }
  throw new Error(`${VARIANT}: no slide renders a no-sop-diagram`);
}

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1280, height: 720 },
  deviceScaleFactor: 2,
  reducedMotion: REDUCED ? "reduce" : "no-preference",
});
const page = await context.newPage();
const errors = [];
page.on("console", (m) => {
  if (m.type() === "error" && !/ws:\/\/localhost|\[vite\]|React DevTools/.test(m.text())) {
    errors.push(m.text());
  }
});
page.on("pageerror", (e) => errors.push(String(e)));

await mkdir(OUT, { recursive: true });
const slide = await findSlide(page);
await page.goto(`${BASE}?variant=${VARIANT}&slide=${slide}`, { waitUntil: "networkidle" });
await page.waitForSelector('[data-testid="no-sop-diagram"]');
await page.waitForTimeout(2200);

const report = { slide, variant: VARIANT, reduced: REDUCED, poses: [], errors };
for (const pose of [0, 1, 2, 3]) {
  if (pose > 0) {
    await page.keyboard.press("ArrowDown");
    await page.waitForTimeout(2000);
  }
  const tag = REDUCED ? `reduced-pose${pose}` : `pose${pose}`;
  await page.screenshot({ path: `${OUT}/${tag}.png` });
  const facts = await page.evaluate((ids) => {
    const stage = document.querySelector(".slide-stage, .slide, #root > div").getBoundingClientRect();
    const rect = (el) => {
      const r = el.getBoundingClientRect();
      return {
        left: Math.round(r.left - stage.left),
        top: Math.round(r.top - stage.top),
        right: Math.round(r.right - stage.left),
        bottom: Math.round(r.bottom - stage.top),
      };
    };
    const out = { boxes: {}, smil: 0, svg: 0, overflow: [] };
    out.smil = document.querySelectorAll(
      "animate, animateTransform, animateMotion, set, animateColor",
    ).length;
    out.svg = document.querySelectorAll("#root svg").length;
    for (const el of document.querySelectorAll("[data-testid^='no-sop-']")) {
      out.boxes[el.dataset.testid] = { ...rect(el), opacity: el.style.opacity || "" };
    }
    for (const id of ids) {
      const el = document.querySelector(`[data-testid="${id}"]`);
      if (el && el.scrollWidth > el.clientWidth + 1) {
        out.overflow.push(`${id}: ${el.scrollWidth} > ${el.clientWidth}`);
      }
    }
    return out;
  }, IDS);
  report.poses.push({ pose, ...facts });
}

// …and back, one pose at a time: the walk backwards has to leave the stage in the state
// the walk forwards found it in, and it is where a one-way animation shows up.
report.back = [];
for (const pose of [2, 1, 0]) {
  await page.keyboard.press("ArrowUp");
  await page.waitForTimeout(1400);
  await page.screenshot({ path: `${OUT}/${REDUCED ? "reduced-" : ""}back-pose${pose}.png` });
  report.back.push({
    pose,
    gates: await page.evaluate(() => {
      const out = {};
      for (const el of document.querySelectorAll("[data-testid^='no-sop-']")) {
        if (el.style.opacity) out[el.dataset.testid] = el.style.opacity;
      }
      return out;
    }),
  });
}

await writeFile(`${OUT}/report.json`, JSON.stringify(report, null, 2));
console.log(
  JSON.stringify(
    {
      slide,
      errors,
      smil: report.poses.map((p) => p.smil),
      svg: report.poses.map((p) => p.svg),
      overflow: report.poses.map((p) => p.overflow),
    },
    null,
    2,
  ),
);
await browser.close();
