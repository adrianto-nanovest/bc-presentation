import { test, expect } from "@playwright/test";

declare global {
  interface Window {
    __DECK_SLIDE_COUNT__: number;
  }
}

test("every slide fits inside the viewport with no overflow", async ({ page }) => {
  await page.goto("/");
  const SLIDES = await page.evaluate(() => window.__DECK_SLIDE_COUNT__);
  for (let i = 0; i < SLIDES; i++) {
    const overflow = await page.evaluate(() => {
      const slide = document.querySelector('[data-testid="slide"]') as HTMLElement;
      if (!slide) return null;
      // overflow occurs when scroll size exceeds client size in either axis
      return {
        verticalOverflow: slide.scrollHeight > slide.clientHeight,
        horizontalOverflow: slide.scrollWidth > slide.clientWidth,
      };
    });
    expect(overflow, `slide ${i}`).not.toBeNull();
    expect(overflow!.verticalOverflow, `slide ${i} vertical overflow`).toBe(false);
    expect(overflow!.horizontalOverflow, `slide ${i} horizontal overflow`).toBe(false);
    if (i < SLIDES - 1) {
      await page.keyboard.press("ArrowRight");
      await page.waitForFunction(
        (idx) => {
          const el = document.querySelector('[data-testid="slide"]');
          return el?.getAttribute("data-slide-index") === String(idx);
        },
        i + 1,
      );
    }
  }
});
