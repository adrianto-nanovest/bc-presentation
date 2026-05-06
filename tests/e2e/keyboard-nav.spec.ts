import { test, expect } from "@playwright/test";

const slideAttr = '[data-testid="slide"]';

test("ArrowRight advances slide; Space advances step within step-reveal slide", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(slideAttr)).toHaveAttribute("data-slide-index", "0");

  await page.keyboard.press("ArrowRight");
  await expect(page.locator(slideAttr)).toHaveAttribute("data-slide-index", "1");

  await page.keyboard.press("ArrowRight");
  await expect(page.locator(slideAttr)).toHaveAttribute(
    "data-animation-mode",
    "step-reveal",
  );

  // The step-reveal slide has 3 children. Press Space twice — last child should reveal.
  await page.keyboard.press(" ");
  await page.keyboard.press(" ");
  // The final child carries text "3. Harness"
  await expect(page.getByText("3. Harness — what it can act on")).toBeVisible();
});

test("ArrowLeft returns to step 0 of the previous slide (does not preserve step state)", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("ArrowRight"); // slide 1
  await page.keyboard.press("ArrowRight"); // slide 2 (step-reveal)
  await page.keyboard.press(" "); // step 1
  await page.keyboard.press("ArrowLeft"); // back to slide 1
  await expect(page.locator(slideAttr)).toHaveAttribute("data-slide-index", "1");
  await page.keyboard.press("ArrowRight"); // forward to slide 2 — step should be 0
  await expect(page.locator(slideAttr)).toHaveAttribute("data-slide-index", "2");
});

test("interactive-mode slide does not advance on stage clicks outside the comparator button", async ({ page }) => {
  await page.goto("/");
  for (let i = 0; i < 5; i++) await page.keyboard.press("ArrowRight"); // → slide 5 (interactive)
  await expect(page.locator(slideAttr)).toHaveAttribute(
    "data-animation-mode",
    "interactive",
  );
  // Click on the slide background (top-left corner — not on the button)
  await page.locator(slideAttr).click({ position: { x: 10, y: 10 } });
  await expect(page.locator(slideAttr)).toHaveAttribute("data-slide-index", "5");
});
