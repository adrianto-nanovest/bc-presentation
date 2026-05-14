import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 2 });

let foundIndex = -1;
for (let i = 0; i < 90; i++) {
  await page.goto(`http://localhost:5173/?slide=${i}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(80);
  const fig = await page.locator(".fig-label").first().textContent().catch(() => "");
  if (fig && /FIG\.\s*J\.3/.test(fig)) {
    foundIndex = i;
    console.log("found J.3 at slide index", i);
    break;
  }
}

if (foundIndex < 0) {
  console.error("J.3 not found");
  await browser.close();
  process.exit(1);
}

// Step 1 — cards stagger in on mount
await page.goto(`http://localhost:5173/?slide=${foundIndex}`, { waitUntil: "networkidle" });
await page.waitForTimeout(900);
await page.screenshot({ path: "/tmp/j3-step1.png", fullPage: false });

// Step 2 — footer reveals
await page.keyboard.press(" ");
await page.waitForTimeout(700);
await page.screenshot({ path: "/tmp/j3-step2.png", fullPage: false });

// Hover any card to verify highlight animation
await page.locator('[data-testid="j3-card"]').nth(1).hover();
await page.waitForTimeout(400);
await page.screenshot({ path: "/tmp/j3-hover.png", fullPage: false });

// Get measured per-card heights for the title and practice blocks
const titleBlocks = await page.locator('[data-testid="j3-title-block"]').evaluateAll((els) =>
  els.map((e) => e.getBoundingClientRect().height)
);
const practiceBlocks = await page.locator('[data-testid="j3-practice-block"]').evaluateAll((els) =>
  els.map((e) => e.getBoundingClientRect().height)
);
const cards = await page.locator('[data-testid="j3-card"]').evaluateAll((els) =>
  els.map((e) => {
    const r = e.getBoundingClientRect();
    return { width: r.width, height: r.height };
  })
);
console.log("titleBlocks h:", titleBlocks);
console.log("practiceBlocks h:", practiceBlocks);
console.log("cards:", cards);

await browser.close();
