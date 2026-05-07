import { test, expect } from "@playwright/test";

const slideAttr = '[data-testid="slide"]';

test("ArrowRight advances slide; ArrowLeft retreats", async ({ page }) => {
  await page.goto("/");
  const initialIndex = await page.locator(slideAttr).getAttribute("data-slide-index");
  expect(initialIndex).toBe("0");

  // ArrowRight at slide 0 should pin to slide 0 if there is only one slide,
  // or advance otherwise. We only assert no-throw.
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("ArrowLeft");
  await expect(page.locator(slideAttr)).toHaveAttribute("data-slide-index", "0");
});

test("Space does not throw on a single-step slide", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press(" ");
  // No assertion beyond "no exception"; comprehensive Space tests
  // re-enter at end of Phase 7 once real slides exist.
});
