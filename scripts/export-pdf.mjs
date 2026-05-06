import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

// Walks the smoke deck slide-by-slide. For each slide, advances to the
// canonical screenshot pose (data-canonical-pose) by pressing Space the
// right number of times, then captures a single-page PDF, then concats
// them via the chromium PDF print pipeline.
//
// Output: a single PDF where each page is one slide at its canonical pose.

const URL = process.env.DECK_URL ?? "http://localhost:5173";
const OUT = resolve(process.argv[2] ?? "exports/smoke-deck.pdf");
mkdirSync(dirname(OUT), { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1920, height: 1080 },
});
const page = await context.newPage();
await page.goto(URL, { waitUntil: "networkidle" });

const slideCount = await page.evaluate(() =>
  Number(
    document.querySelector('[data-testid="slide"]')?.getAttribute("data-slide-count") ??
      // Fall back: read the registered stepCounts length via window globals if exposed.
      window.__DECK_SLIDE_COUNT__ ?? 7,
  ),
);

const pdfBuffers = [];

for (let i = 0; i < slideCount; i++) {
  // Wait until the active slide's index matches.
  await page.waitForFunction(
    (idx) =>
      document.querySelector('[data-testid="slide"]')?.getAttribute(
        "data-slide-index",
      ) === String(idx),
    i,
  );
  // Walk to the canonical pose by pressing Space N times.
  const canonicalPose = Number(
    await page.evaluate(
      () =>
        document
          .querySelector('[data-testid="slide"]')
          ?.getAttribute("data-canonical-pose") ?? 0,
    ),
  );
  for (let s = 0; s < canonicalPose; s++) {
    await page.keyboard.press(" ");
  }
  // Give framer-motion a beat to settle.
  await page.waitForTimeout(150);

  const buf = await page.pdf({
    width: "1920px",
    height: "1080px",
    printBackground: true,
    margin: { top: "0", right: "0", bottom: "0", left: "0" },
  });
  pdfBuffers.push(buf);

  if (i < slideCount - 1) {
    await page.keyboard.press("ArrowRight");
  }
}

await browser.close();

// Stitch via pdf-lib so we end up with one multipage PDF. Install if missing.
const { PDFDocument } = await import("pdf-lib");
const merged = await PDFDocument.create();
for (const buf of pdfBuffers) {
  const src = await PDFDocument.load(buf);
  const pages = await merged.copyPages(src, src.getPageIndices());
  pages.forEach((p) => merged.addPage(p));
}
const out = await merged.save({ useObjectStreams: false });
const { writeFileSync } = await import("node:fs");
writeFileSync(OUT, out);
console.log(`wrote ${OUT} (${out.length.toLocaleString()} bytes, ${slideCount} pages)`);
