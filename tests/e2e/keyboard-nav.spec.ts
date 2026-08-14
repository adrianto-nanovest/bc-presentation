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
// itself changed five times now, which is why this asserts through the PRINTED
// FIGURE AND ITS LABEL and never through a slide index: gh#41's F cut took the
// leader deck to ten sections closing at J, gh#53's `gap` run took it back to
// eleven closing at K, gh#54's `shape` run took it to twelve closing at L,
// gh#56's `invest` run took it to thirteen closing at M, and gh#60's `mandate`
// run takes it to FOURTEEN closing at N — §4.3's finished shape, A–N. Nothing in
// `useKeyboardNav` was edited any of the five times; the map is the composed
// deck's (§3.5).
//
// SO THE FIGURE ALONE IS NOT ENOUGH, and gh#54 is where that stopped being a
// theory. `k` prints K.1 in both decks and means two different sections — and it
// has meant FOUR different things in THIS deck: the practice lab at the gh#53
// shape, PRINCIPLES after gh#54, THE META-PROCESS after gh#56, THE MANDATE after
// gh#60. A test that read `/K\.1/` and stopped would have passed all four while
// asserting the wrong section, so every jump below names the label it lands on.
//
// gh#57, gh#58 AND gh#59 ARE ABSENT FROM THAT LIST ON PURPOSE: each appended
// inside the `invest` run, so none of them moved a letter and this test did not
// change for any of them. A new SLIDE is not a new RUN, and only runs reach this
// file.
//
// gh#65 IS THE EXCEPTION TO THAT SENTENCE, AND IT MOVED NO LETTER EITHER. It inserted
// `gap-hardest-part` at the HEAD of the `gap` run, which already had its letter — so
// `b` still jumps to `b`'s section, but R5 lands on the run's FIRST numbered slide and
// that is now a different slide with a different label. This file changed because the
// jump TARGET moved, not because the letter did, and the label assertion below is the
// only thing that could tell the two apart.
//
// gh#66 IS BACK ON THE OTHER SIDE OF IT: `gap-no-sop` went in BETWEEN
// `gap-hardest-part` and the ladder, so the `gap` run's FIRST numbered slide is
// unchanged and no assertion in this file moved. The run is one row longer and every
// jump below lands exactly where it did — which is the point of asserting on the
// printed figure and label rather than on an index. gh#67 did the same thing with TWO
// rows, `gap-three-failures` and `gap-the-pattern`, closing the run at §4.3's five:
// still no assertion moved, and `gap` will not grow again.
//
// gh#68 AND gh#69 ARE ABSENT FROM THIS FILE TOO, and for a third reason worth naming:
// each appended at a run's TAIL — `shape-middle-out` onto `shape`, `mandate-levers` onto
// `mandate` — so `c` and `k` still land on their run's FIRST numbered slide and no jump
// in this file could have noticed either. A tail append is the
// only insert shape that is invisible to R5 by construction.
//
// gh#70 IS gh#65's CASE A SECOND TIME, ON `d` INSTEAD OF `b`. `invest-base-rates` went
// in at the HEAD of the `invest` run, which has held D since gh#56 — so `d` jumps to
// the same letter and R5 still lands on D.1, and the SLIDE printing D.1 is a different
// slide with a different label. Two tickets have now changed this file without moving
// a letter, and in both of them the FIGURE assertion passed unchanged while the LABEL
// assertion was the whole of the diff. That is the strongest argument this file makes
// for why every jump names both.
test("the leader deck's own letters jump, and a letter it does not claim is a no-op", async ({
  page,
}) => {
  const problems: string[] = [];
  page.on("pageerror", (err) => problems.push(`pageerror: ${err.message}`));
  page.on("console", (msg) => {
    if (msg.type() === "error") problems.push(`console: ${msg.text()}`);
  });

  // A STARTING POINT, NOT A CLAIM ABOUT WHICH SLIDE IS THERE. Index 6 held E.1 until
  // gh#57 inserted D.2 in front of it, then D.2 until gh#65 inserted a row at index 2
  // and pushed it along to D.1, then C.2 once gh#66 pushed it again, and it holds B.5 —
  // the capability ladder — since gh#67 pushed it twice more. Five slides at one index
  // in five tickets, and then THREE tickets running that left it alone: gh#68's row went
  // in at index 9, gh#69's at index 60 and gh#70's at index 10, every one of them BEHIND
  // this one, and an insert cannot
  // renumber or displace what precedes it. Either way
  // nothing below reads the
  // starting slide, every assertion is about where a letter LANDS, and the index
  // assertion here only says the deck honoured `?slide=`. (The console watch above does
  // now cover whichever slide that is, which is a gain rather than a coupling.)
  await page.goto("/?variant=berau-leader&slide=6");
  await expect(page.locator(slideAttr)).toHaveAttribute("data-slide-index", "6");

  // `b` is THE GAP here — the leader-only run gh#53 put in front of the
  // curriculum. On a standard deck the same key lands on the landscape.
  //
  // AND IT LANDS ON A DIFFERENT SLIDE THAN IT DID BEFORE gh#65, at the same figure:
  // that ticket inserted §6.1's slide at the head of this run, so R5's "first NUMBERED
  // slide of the run" is now THE HARDEST PART and the capability ladder — which held
  // this figure while it was the run's only slide — sits one row behind it. The letter
  // did not move and the figure did not either; the SLIDE under them did, which is what
  // the label assertion is here to catch.
  await page.keyboard.press("b");
  await expect(page.locator(".fig-label")).toHaveText(/FIG\.\s*B\.1/);
  await expect(page.locator(".fig-label")).toHaveText(/THE HARDEST PART/);

  // `c` is THE SHAPE — the run gh#54 inserted, and the reason every letter behind
  // it moved. R5 lands the jump on the run's first numbered slide, so this is C.1
  // and not the relocated F.8 sitting behind it at C.2.
  await page.keyboard.press("c");
  await expect(page.locator(".fig-label")).toHaveText(/FIG\.\s*C\.1/);
  await expect(page.locator(".fig-label")).toHaveText(/THE AGENTIC ORGANIZATION/);

  // `d` is WHY INVEST — the run gh#56 inserted, and on a standard deck the same key
  // is PROCESS & METHODOLOGY. The run holds FOUR slides: gh#70's D.1 at its head, then
  // gh#56's, gh#57's and — since the merge that folded gh#58's and gh#59's two rows into
  // `invest-governance` — one D.4. So R5's "first NUMBERED slide of the run" is a real
  // distinction here and not a one-slide coincidence: `d` must land on D.1 and not on the
  // D.2, D.3 or D.4 behind it. FOUR IS FINAL — the run argues for no fifth.
  //
  // AND IT LANDS ON A DIFFERENT SLIDE THAN IT DID BEFORE gh#70, AT THE SAME FIGURE —
  // the `b` case above, repeated on this key. `invest` has held D since gh#56 and R5
  // still resolves to D.1; what changed is which slide prints D.1. PROOF FROM INSIDE
  // THE COMPANY held it while it was the run's first row and prints D.2 now, one row
  // behind. The figure line below did not move and could not have; the label line is
  // the whole of what gh#70 cost this file, and a test that read `/D\.1/` and stopped
  // would have gone on passing while landing somewhere else.
  //
  // THE LABEL LINE MOVED A SECOND TIME ON 2026-08-14, for a different reason and with the
  // figure line again untouched: D.1 was re-cut and re-sourced, and its label went from
  // THE BASE RATE, AND THE DEFAULT IT PRICES to THE BASE RATE, AND WHAT IT EARNS. Same
  // slide, same figure, same key — which is exactly the case this assertion is written to
  // notice.
  await page.keyboard.press("d");
  await expect(page.locator(".fig-label")).toHaveText(/FIG\.\s*D\.1/);
  await expect(page.locator(".fig-label")).toHaveText(/THE BASE RATE, AND WHAT IT EARNS/);

  // `k` is THE MANDATE as of gh#60 — the FOURTH section this one key has meant in
  // this deck, and the sharpest case in the file. It printed K.1 at every one of
  // those four shapes: the practice lab at gh#53, PRINCIPLES after gh#54, THE
  // META-PROCESS after gh#56, the enablement model now. Four sections, one figure,
  // one key — which is exactly why the label below is the assertion and a bare
  // `/K\.1/` would have passed all four while meaning something different each time.
  await page.keyboard.press("k");
  await expect(page.locator(".fig-label")).toHaveText(/FIG\.\s*K\.1/);
  await expect(page.locator(".fig-label")).toHaveText(/THE ENABLEMENT MODEL/);

  // `l` is THE META-PROCESS now, pushed off K by the `mandate` run. It was a no-op
  // here until gh#54, the practice lab from gh#54 to gh#56, and PRINCIPLES until
  // gh#60 — moved with the deck each time rather than deleted, which is the only way
  // this file records that the letters move.
  await page.keyboard.press("l");
  await expect(page.locator(".fig-label")).toHaveText(/FIG\.\s*L\.1/);
  await expect(page.locator(".fig-label")).toHaveText(/THE PROCESS/);

  // `m` is PRINCIPLES now — the practice lab held it from gh#56 until gh#60.
  await page.keyboard.press("m");
  await expect(page.locator(".fig-label")).toHaveText(/FIG\.\s*M\.1/);
  await expect(page.locator(".fig-label")).toHaveText(/THE RECIPE/);

  // `n` NOW CLAIMS A SECTION — the practice lab, pushed to N by the `mandate` run,
  // and the no-op case below until gh#60. This is §4.3's finished shape: the leader
  // deck runs A–N, and gh#60 was the last run it was waiting on.
  await page.keyboard.press("n");
  await expect(page.locator(".fig-label")).toHaveText(/FIG\.\s*N\.1/);
  await expect(page.locator(".fig-label")).toHaveText(/PRACTICE · LAB/);
  const at = await page.getAttribute(slideAttr, "data-slide-index");

  // `o` is the unclaimed letter in THIS deck now — and unlike every shape before
  // gh#60, no further run is coming to claim it: §4.3 ends at N. The failure this
  // guards is unchanged: a throw on the undefined lookup, or a fall-through that
  // sends the deck to slide 0 mid-talk.
  await page.keyboard.press("o");
  await expect(page.locator(slideAttr)).toHaveAttribute("data-slide-index", String(at));
  await expect(page.locator(".fig-label")).toHaveText(/FIG\.\s*N\.1/);
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
