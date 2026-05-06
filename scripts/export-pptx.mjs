import { chromium } from "playwright";
import PptxGenJS from "pptxgenjs";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const URL = process.env.DECK_URL ?? "http://localhost:5173";
const OUT = resolve(process.argv[2] ?? "exports/smoke-deck.pptx");
mkdirSync(dirname(OUT), { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1920, height: 1080 },
  deviceScaleFactor: 2, // retina capture for sharp projection
});
const page = await context.newPage();
await page.goto(URL, { waitUntil: "networkidle" });

const slideCount = await page.evaluate(
  () => window.__DECK_SLIDE_COUNT__ ?? 7,
);

const screenshots = [];
for (let i = 0; i < slideCount; i++) {
  await page.waitForFunction(
    (idx) =>
      document
        .querySelector('[data-testid="slide"]')
        ?.getAttribute("data-slide-index") === String(idx),
    i,
  );
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
  await page.waitForTimeout(150);
  const buf = await page.screenshot({ type: "png", fullPage: false });
  screenshots.push(buf);
  if (i < slideCount - 1) {
    await page.keyboard.press("ArrowRight");
  }
}
await browser.close();

const pptx = new PptxGenJS();
// 16:9 widescreen at 13.333" × 7.5" — PowerPoint default for new decks.
pptx.layout = "LAYOUT_WIDE";
pptx.defineLayout({ name: "BCE", width: 13.333, height: 7.5 });
pptx.layout = "BCE";

for (const png of screenshots) {
  const slide = pptx.addSlide();
  const dataUrl = `data:image/png;base64,${png.toString("base64")}`;
  slide.addImage({
    data: dataUrl,
    x: 0,
    y: 0,
    w: 13.333,
    h: 7.5,
  });
}

const buf = await pptx.write({ outputType: "nodebuffer" });
const outBuf = Buffer.isBuffer(buf) ? buf : Buffer.from(buf, "base64");
writeFileSync(OUT, outBuf);
console.log(`wrote ${OUT} (${outBuf.length.toLocaleString()} bytes, ${slideCount} slides)`);
