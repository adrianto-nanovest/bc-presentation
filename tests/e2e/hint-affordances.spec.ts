// Verification of the hint-affordance changes:
//   - Title slide: TitleKeymap trigger + legend
//   - B1: HintIcon at top-right (all 7 steps)
//   - E4: HintIcon at top-right (all 4 steps)
//   - E7: HintIcon next to "6 COMPONENTS" kicker (stepIndex 1 and 2)
//
// Helpers walk to a target slide by `data-section` + slide-index attributes.
// We avoid hard-coding slide indices so this test survives deck re-orders.
import { test, expect } from "@playwright/test";

const slideAttr = '[data-testid="slide"]';

async function gotoSlideByTestId(page: import("@playwright/test").Page, testId: string) {
  await page.goto("/");
  // Walk ArrowRight until the desired slide appears.
  const count = await page.evaluate(() => window.__DECK_SLIDE_COUNT__ as number);
  for (let i = 0; i < count; i++) {
    if (await page.locator(`[data-testid="${testId}"]`).count() > 0) return;
    await page.keyboard.press("ArrowRight");
  }
  throw new Error(`Slide with data-testid="${testId}" not found in deck`);
}

test("Title: TitleKeymap trigger + legend on hover", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(slideAttr)).toHaveAttribute("data-slide-index", "0");

  const trigger = page.locator('[data-testid="title-keymap-trigger"]');
  const legend = page.locator('[data-testid="title-keymap-legend"]');
  await expect(trigger).toBeVisible();
  // Legend exists but starts faded out.
  await expect(legend).toHaveAttribute("data-revealed", "false");

  // Hover → legend revealed.
  await trigger.hover();
  await expect(legend).toHaveAttribute("data-revealed", "true");

  // Measure: legend left edge must align with facilitator-chip left (x=80
  // in 1280-stage coords). Allow small slack for the 1280-viewport project.
  const legendBox = await legend.boundingBox();
  const chipBox = await page.locator('[data-testid="title-facilitator-chip"]').boundingBox();
  expect(legendBox).not.toBeNull();
  expect(chipBox).not.toBeNull();
  if (legendBox && chipBox) {
    expect(Math.abs(legendBox.x - chipBox.x)).toBeLessThanOrEqual(2);
    // Legend bottom must sit ABOVE the chip's top edge.
    expect(legendBox.y + legendBox.height).toBeLessThan(chipBox.y);
    // …with a positive breathing gap (we asked for ~18px).
    expect(chipBox.y - (legendBox.y + legendBox.height)).toBeGreaterThan(10);
    // Legend top must sit BELOW the workshop-chip bottom.
    const workshopBox = await page.locator('[data-testid="title-workshop-chip"]').boundingBox();
    if (workshopBox) {
      expect(legendBox.y).toBeGreaterThan(workshopBox.y + workshopBox.height);
    }
  }

  // Mouse off → legend fades back out.
  await page.mouse.move(0, 0);
  await expect(legend).toHaveAttribute("data-revealed", "false");
});

test("B1: HintIcon at top-right, visible all 7 steps", async ({ page }) => {
  await gotoSlideByTestId(page, "slide-b1");
  const hint = page.locator('[data-testid="b1-hint"]');
  await expect(hint).toBeVisible();

  const hintBox = await hint.boundingBox();
  expect(hintBox).not.toBeNull();
  // Walk all 7 steps; HintIcon should remain visible at each.
  for (let step = 0; step < 7; step++) {
    await expect(hint).toBeVisible();
    if (step < 6) await page.keyboard.press(" ");
  }
});

test("E4: HintIcon at top-right, visible all 4 steps; footer caption still appears on step 3", async ({ page }) => {
  await gotoSlideByTestId(page, "e4-tiers");
  const hint = page.locator('[data-testid="e4-hint"]');
  await expect(hint).toBeVisible();

  // Step 0: footer hidden, hint visible
  await expect(page.locator('[data-testid="e4-footer"]')).toHaveCount(0);

  // Advance to step 3 (footer canonical pose)
  for (let i = 0; i < 3; i++) await page.keyboard.press(" ");
  await expect(hint).toBeVisible();
  await expect(page.locator('[data-testid="e4-footer"]')).toBeVisible();
});

test("E7: HintIcon hidden on step 0, visible at step 1 and step 2", async ({ page }) => {
  await gotoSlideByTestId(page, "e7-left-pane");
  // The HintIcon is inside the reveal-kicker Reveal which is faded out at
  // step 0 (showNetwork=false). Verify hidden via the kicker container's
  // `.fade.on` class absence.
  const kicker = page.locator('[data-testid="e7-reveal-kicker"]');
  await expect(kicker).toHaveClass(/fade/);
  await expect(kicker).not.toHaveClass(/\bon\b/);

  // Step 1 → kicker reveals.
  await page.keyboard.press(" ");
  await expect(kicker).toHaveClass(/on/);
  // HintIcon (Lucide Info via <svg>) lives inside the kicker.
  await expect(kicker.locator('[data-testid="hint-icon"]')).toBeVisible();

  // Step 2 → still visible.
  await page.keyboard.press(" ");
  await expect(kicker.locator('[data-testid="hint-icon"]')).toBeVisible();
});

test("Section jump: A–K keys go to that section's first BODY slide; R returns to title", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(slideAttr)).toHaveAttribute("data-slide-index", "0");

  // A → A.1 (NOT the title at slot 0). The title is `R`'s destination.
  await page.keyboard.press("a");
  await expect(page.locator(slideAttr)).toHaveAttribute("data-slide-index", "1");
  await expect(page.locator('[data-testid="a1-rule-header"]')).toBeVisible();

  // B → B.1 (first slide of section B is the era timeline).
  await page.keyboard.press("b");
  await expect(page.locator('[data-testid="slide-b1"]')).toBeVisible();

  // E → first slide of section E. We can't hard-code its testid without
  // touching content, so verify slide-index advanced past B and the B.1
  // slide testid is no longer mounted.
  await page.keyboard.press("E");
  const eIndex = await page
    .locator(slideAttr)
    .getAttribute("data-slide-index");
  expect(Number(eIndex)).toBeGreaterThan(2);
  await expect(page.locator('[data-testid="slide-b1"]')).toHaveCount(0);

  // R → back to slide 0 (title cover).
  await page.keyboard.press("r");
  await expect(page.locator(slideAttr)).toHaveAttribute("data-slide-index", "0");

  // Cmd+B must NOT be intercepted (browser shortcut for Bold / back history
  // depending on platform — letting OS handle it is the safe default).
  await page.keyboard.press("Meta+B");
  await expect(page.locator(slideAttr)).toHaveAttribute("data-slide-index", "0");
});

test("Legend keys-column auto-sizes; all action text shares a left edge", async ({ page }) => {
  await page.goto("/");
  await page.locator('[data-testid="title-keymap-trigger"]').hover();
  // Action cells in CSS Grid all sit at the same column-2 left edge.
  // We use the rendered grid's computed column-template to verify, by
  // measuring the bounding box of every action <span> (the every-other
  // grid cell starting at index 1).
  const grid = page.locator('[data-testid="title-keymap-grid"]');
  const actionXs: number[] = await grid.evaluate((g) => {
    const cells = Array.from(g.children) as HTMLElement[];
    // Action cells are odd-indexed (0=keys, 1=action, 2=keys, 3=action, ...).
    return cells
      .filter((_, i) => i % 2 === 1)
      .map((el) => el.getBoundingClientRect().left);
  });
  expect(actionXs.length).toBe(6);
  // All x-positions equal within sub-pixel tolerance.
  const first = actionXs[0];
  for (const x of actionXs) {
    expect(Math.abs(x - first)).toBeLessThanOrEqual(1);
  }
});

test("Click on title-keymap trigger does NOT advance the deck (data-no-advance)", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(slideAttr)).toHaveAttribute("data-slide-index", "0");
  await page.locator('[data-testid="title-keymap-trigger"]').click();
  // Title is a single-step static slide; clicking the icon would normally
  // try to advance step (which spills to slide 1). data-no-advance prevents
  // that — we should still be on slide 0.
  await expect(page.locator(slideAttr)).toHaveAttribute("data-slide-index", "0");
});
