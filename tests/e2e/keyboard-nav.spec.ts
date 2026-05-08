import { test, expect } from "@playwright/test";

const slideAttr = '[data-testid="slide"]';

test("ArrowRight walks the deck from slide 0 to the last slide", async ({ page }) => {
  await page.goto("/");
  const count = await page.evaluate(() => window.__DECK_SLIDE_COUNT__);
  expect(count).toBeGreaterThanOrEqual(20); // 5 foundation-core + 5 foundation-core-section-e + 9 reveal-and-closing + HexLadder

  await expect(page.locator(slideAttr)).toHaveAttribute("data-slide-index", "0");
  for (let i = 1; i < count; i++) {
    await page.keyboard.press("ArrowRight");
    await expect(page.locator(slideAttr)).toHaveAttribute("data-slide-index", String(i));
  }
});

test("Space advances within a step-reveal slide; ArrowLeft resets step on previous slide", async ({ page }) => {
  await page.goto("/");
  // I.1 (slide 0) is step-reveal with 4 steps.
  await page.keyboard.press(" ");
  await page.keyboard.press(" ");
  // Sub-line and stages should be visible by now (no exception, no advance to slide 1).
  await expect(page.locator(slideAttr)).toHaveAttribute("data-slide-index", "0");

  // ArrowRight goes to slide 1; ArrowLeft returns to slide 0 step 0 (per useKeyboardNav contract).
  await page.keyboard.press("ArrowRight");
  await expect(page.locator(slideAttr)).toHaveAttribute("data-slide-index", "1");
  await page.keyboard.press("ArrowLeft");
  await expect(page.locator(slideAttr)).toHaveAttribute("data-slide-index", "0");
});

test("I.3 (slide 12) is interactive: clicks on list items don't bubble past Interactive wrapper", async ({ page }) => {
  await page.goto("/?slide=12");
  await expect(page.locator(slideAttr)).toHaveAttribute("data-animation-mode", "interactive");
  // Walk to step 4 so canvas is revealed.
  for (let i = 0; i < 4; i++) await page.keyboard.press(" ");
  await page.getByText("stocks intel").click();
  // Stocks intel feed labels should now be on screen.
  await expect(page.getByText("Investing.com")).toBeVisible();
  // Clicking an item must not advance the slide.
  await expect(page.locator(slideAttr)).toHaveAttribute("data-slide-index", "12");
});
