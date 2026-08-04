import { test, expect, type Page } from "@playwright/test";

const slideAttr = '[data-testid="slide"]';

// The NavBar's own Step counter, "01 / 04" → { step: 1, of: 4 }. Read from the
// chrome rather than from a table of step counts in here: this file has already
// gone stale twice by naming a slide index and a step count that the deck later
// moved (gh#36).
async function stepCounter(page: Page): Promise<{ step: number; of: number }> {
  const text = (await page.locator(".nav-group-count").first().textContent()) ?? "";
  const [step, of] = text.split("/").map((n) => Number(n.trim()));
  return { step, of };
}

/** Walks forward to the first slide with more than `min` steps. Returns its index. */
async function firstSlideWithSteps(page: Page, min: number): Promise<number> {
  const count = await page.evaluate(() => window.__DECK_SLIDE_COUNT__);
  for (let i = 0; i < count; i++) {
    if ((await stepCounter(page)).of > min) return i;
    await page.keyboard.press("ArrowRight");
  }
  throw new Error(`no slide in the deck has more than ${min} steps`);
}

test("ArrowRight walks the deck from slide 0 to the last slide", async ({ page }) => {
  await page.goto("/");
  const count = await page.evaluate(() => window.__DECK_SLIDE_COUNT__);
  expect(count).toBeGreaterThanOrEqual(26); // 5 foundation-core + 12 foundation-core-section-e + 9 reveal-and-closing + HexLadder

  await expect(page.locator(slideAttr)).toHaveAttribute("data-slide-index", "0");
  for (let i = 1; i < count; i++) {
    await page.keyboard.press("ArrowRight");
    await expect(page.locator(slideAttr)).toHaveAttribute("data-slide-index", String(i));
  }
});

test("Space advances within a multi-step slide; ArrowLeft resets step on previous slide", async ({ page }) => {
  await page.goto("/");
  // Whichever slide that is. The cover used to be a 4-step slide and is now a
  // 1-step one, which is what broke this test's old `slide 0` premise.
  const target = await firstSlideWithSteps(page, 2);
  await expect(page.locator(slideAttr)).toHaveAttribute("data-slide-index", String(target));

  await page.keyboard.press(" ");
  await page.keyboard.press(" ");
  // Space walks steps within the slide — it does not spill until the last one.
  await expect(page.locator(slideAttr)).toHaveAttribute("data-slide-index", String(target));
  expect((await stepCounter(page)).step).toBe(3);

  // ArrowRight goes to the next slide; ArrowLeft returns to step 0 of this one
  // (per the useKeyboardNav contract).
  await page.keyboard.press("ArrowRight");
  await expect(page.locator(slideAttr)).toHaveAttribute("data-slide-index", String(target + 1));
  await page.keyboard.press("ArrowLeft");
  await expect(page.locator(slideAttr)).toHaveAttribute("data-slide-index", String(target));
  expect((await stepCounter(page)).step).toBe(1);
});

// §3.5 (gh#36) — the jump map is the composed deck's, and the key test is
// `/^[A-Za-z]$/` plus a lookup. These two cases are the halves of that: a letter
// the deck claims jumps, a letter it does not claim does nothing at all.
test("a live section letter jumps to that section's first numbered slide", async ({ page }) => {
  await page.goto("/?slide=6");
  await expect(page.locator(slideAttr)).toHaveAttribute("data-slide-index", "6");
  await page.keyboard.press("a");
  // Slide 0 is the cover (`numbered: false`) and slide 1 is A.1. R5 targets the
  // run's first NUMBERED slide, so `A` lands on A.1 with no index-0 exception.
  await expect(page.locator(slideAttr)).toHaveAttribute("data-slide-index", "1");
});

// The same two halves, on the deck whose letters DIFFER (§4.3). What differs has
// itself changed twice, which is why this asserts through the PRINTED FIGURE and
// never through a slide index: gh#41's F cut took the leader deck to ten sections
// closing at J, and gh#53's `gap` run took it back to eleven closing at K. So the
// two decks agree on `k` again — and disagree on `b`, which is THE LANDSCAPE in
// every standard deck and THE GAP here. Nothing in `useKeyboardNav` was edited
// either time; the map is the composed deck's (§3.5).
test("the leader deck's own letters jump, and a letter it does not claim is a no-op", async ({
  page,
}) => {
  const problems: string[] = [];
  page.on("pageerror", (err) => problems.push(`pageerror: ${err.message}`));
  page.on("console", (msg) => {
    if (msg.type() === "error") problems.push(`console: ${msg.text()}`);
  });

  await page.goto("/?variant=berau-leader&slide=6");
  await expect(page.locator(slideAttr)).toHaveAttribute("data-slide-index", "6");

  // `b` is THE GAP here — the leader-only run gh#53 put in front of the
  // curriculum. On a standard deck the same key lands on the landscape.
  await page.keyboard.press("b");
  await expect(page.locator(".fig-label")).toHaveText(/FIG\.\s*B\.1/);
  await expect(page.locator(".fig-label")).toHaveText(/THE CAPABILITY LADDER/);

  // `k` is THE PRACTICE LAB again. R5 lands the jump on the run's first numbered
  // slide, so this is K.1 and not the closer.
  await page.keyboard.press("k");
  await expect(page.locator(".fig-label")).toHaveText(/FIG\.\s*K\.1/);
  const at = await page.getAttribute(slideAttr, "data-slide-index");

  // `l` passes the letter test and owns no section in either deck, so it must do
  // nothing at all — the failure this guards is a jump to slide 0 mid-talk.
  await page.keyboard.press("l");
  await expect(page.locator(slideAttr)).toHaveAttribute("data-slide-index", String(at));
  await expect(page.locator(".fig-label")).toHaveText(/FIG\.\s*K\.1/);
  expect(problems).toEqual([]);
});

test("a letter that owns no section is a silent no-op", async ({ page }) => {
  const problems: string[] = [];
  page.on("pageerror", (err) => problems.push(`pageerror: ${err.message}`));
  page.on("console", (msg) => {
    if (msg.type() === "error") problems.push(`console: ${msg.text()}`);
  });

  await page.goto("/?slide=6");
  await expect(page.locator(slideAttr)).toHaveAttribute("data-slide-index", "6");
  // `z` passes the letter test but is absent from `sectionFirstIndex`. The two
  // failures this guards are a throw on the undefined lookup and a fall-through
  // that sends the deck to slide 0 mid-talk.
  await page.keyboard.press("z");
  await expect(page.locator(slideAttr)).toHaveAttribute("data-slide-index", "6");
  expect(problems).toEqual([]);
});

// I.3's monitor sits inside `<Interactive>` so the audience can explore it
// without the deck navigating away. Reached by pressing `i` and stepping twice —
// no slide index named here, which is what went stale before: the slide this
// once called "slide 12, animationMode interactive" was rewritten in May 2026
// into a step-reveal bezel monitor, and the list item it clicked no longer
// exists (the 30/70 CategoryList layout was retired).
test("I.3's monitor swallows clicks: clicking inside it does not advance the deck", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("i"); // → I.1
  await page.keyboard.press("ArrowRight"); // → I.2
  await page.keyboard.press("ArrowRight"); // → I.3
  const at = await page.getAttribute(slideAttr, "data-slide-index");

  const bezel = page.locator('[data-testid="portfolio-bezel"]');
  await expect(bezel).toBeVisible();
  const before = await stepCounter(page);
  await bezel.click({ position: { x: 8, y: 8 } });
  // Neither the slide nor the step moved — the Interactive wrapper stopped the
  // click before Slide.tsx's click-to-advance handler saw it.
  await expect(page.locator(slideAttr)).toHaveAttribute("data-slide-index", String(at));
  expect(await stepCounter(page)).toEqual(before);
});
