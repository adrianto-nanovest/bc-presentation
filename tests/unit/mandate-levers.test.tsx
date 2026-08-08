// THE FOUR LEVERS · slide tests. All five poses, and the rules gh#69's ACs state — held
// over EVERY authored string and over the RENDERED stage rather than spot-checked.
//
// WHAT THIS FILE CAN AND CANNOT PROVE — the two siblings' preamble, inherited. jsdom has no
// layout and no media queries, so nothing here measures a pixel a browser would place and
// `prefers-reduced-motion: reduce` cannot really be toggled. Every geometric claim below is
// therefore asserted as THE ONE NUMBER both sides read
// (`../../src/slides/leader-mandate/levers-geometry.ts`), and the composition itself was
// walked at 1280×720. What a DOM-less runner IS good for is what this slide is actually at
// risk of, and none of the four is a layout fault:
//
//   1. THE SLIDE'S WHOLE CLAIM BECOMING A SENTENCE INSTEAD OF A COUNT. "Not one of them
//      needs a signature but yours" is a headline; the figure is what makes it checkable —
//      sixteen boxes drawn, four filled, all four in one column. That claim is DERIVED from
//      `Lever.needs` and from nothing else, so the assertions below compute the expected
//      marks from the data rather than counting to four. A lever flipped to another
//      authority has to move a mark, and the mark it moves has to fail something here.
//   2. A THIRD LADDER GROWING BACK (§6.6). "Learn → Experiment → Build → Integrate → Own"
//      was cut so the deck would carry ONE ordered vocabulary — `gap-capability-ladder`'s
//      L1–L5 and K.2's P0–P3 — and four unranked acts are exactly the shape a third one
//      would take if it ever did. Held as a forbidden-token list whose every pattern is
//      fired against the deck's OWN live ladder vocabulary, plus the structural half a grep
//      cannot do: the four labels take one colour tier, so no rank is expressed at all.
//   3. THE BRAND AXIS ARRIVING BY ACCIDENT. §4.4 lists no slot for this slide and
//      `./content.ts` argues at length why. That is a claim about MODULE EPOCHS, so it is
//      proved by rendering both, and by reading the source for the import that would create
//      one.
//   4. A NUMBER OR A LETTER BEING AUTHORED. `FigLabel` takes a label only and every figure
//      reference on this stage is the composer's (§3.5). This slide prints no quantity at
//      all — not a date, not a count — so the rule is checkable as a SHAPE: no digit reaches
//      any rendered string.
//
// WHAT IS LEFT TO THE BROWSER WALK: the reduce-mode half of the zero-SMIL AC (held here at
// every pose under BOTH preferences, plus the structural fact that makes it true by
// construction — the figure mounts no `<svg>` at all); the real wrap of the four lever lines
// and the four authority heads against the measures `levers-geometry.ts` budgets; and the
// painted colour tiers, including the hairline cell frames against their fills.
//
// DECK COMPOSITION *IS* ASSERTED HERE, unlike in the `gap` run's files, and it is gh#69's
// first AC: this slide is the TAIL of the `mandate` run and the run is complete at §4.3's
// three. `deck-registry.test.ts` and the numbering fixture own the letters and the numbers;
// what this file owns is the ORDER inside the run and the absence from every standard deck,
// read off `DECK_SET_COMPOSITION` exactly as `variant-composition.test.tsx` and
// `mandate-phases-gates.test.tsx` read it.
//
// ONE EPOCH FOR EVERYTHING EXCEPT THE LAST BLOCK. The slide file resolves no brand block and
// the figure reads no `VARIANT`, so the whole stage mounts in the default `general` epoch
// through `SlideHarness`. The brand-invariance block at the foot is the exception and says
// why it has to be.
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { act, cleanup, render, screen } from "@testing-library/react";
import { afterAll, afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { useDeck } from "@/deck/DeckContext";
import { SlideHarness } from "../support/slide-harness";
import { restoreLocation } from "../harvest/deck-numbering";
import { VARIANTS, type DeckSetId, type VariantId } from "@/deck-variants";
import { DECK_SET_COMPOSITION } from "@/deck/deck-sets";
import { leaderMandateSlides } from "@/slides/leader-mandate";
import { MandateLevers, mandateLeversSlide } from "@/slides/leader-mandate/mandate-levers";
import {
  SOLE_AUTHORITY,
  AUTHORITY_IDS,
  mandateLeversContent,
  mandatePhasesGatesContent,
  phasesGatesFor,
} from "@/slides/leader-mandate/content";
// THE TWO ORDERED VOCABULARIES THIS SLIDE MAY NOT BECOME A THIRD OF, as modules rather than
// as a copy kept here. `gap-capability-ladder`'s rungs are L1–L5 and K.2's phases are P0–P3;
// both are imported so the §6.6 token list below is CONTROLLED against what the deck
// actually says today instead of against a transcription that can go stale while still
// passing.
import { gapLadderContent, capabilityLadderFor } from "@/slides/leader-gap/content";
import {
  AUTHORITY_HEAD_TOP,
  AUTHORITY_LABEL_BUDGET_CHARS,
  BAND_HEIGHT,
  BAND_TOP,
  BOARD_HEIGHT,
  BOARD_TOP,
  CELL_HEIGHT,
  CELL_WIDTH,
  CLOSER_HEIGHT,
  CLOSER_TOP,
  CONTENT_WIDTH,
  FORM_WIDTH,
  FORM_X,
  HEADING_TOP,
  HEAD_RULE_TOP,
  LEVER_LINE_BUDGET_CHARS,
  LEVER_ROW_HEIGHT,
  LEVER_WIDTH,
  MARK_HEIGHT,
  MARK_INSET,
  MARK_WIDTH,
  NAV_ZONE_CLEARANCE,
  NAV_ZONE_TOP,
  SIDE_MARGIN,
  STAGE,
  authorityColWidth,
  authorityColX,
  cellTop,
  cellX,
  leverRowPitch,
  leverRowTop,
  markTop,
  markX,
} from "@/slides/leader-mandate/levers-geometry";

const C = mandateLeversContent;
const POSES = [0, 1, 2, 3, 4] as const;

/** The four acts and the four columns, read off the content module rather than re-listed:
 *  the rows, the cells, the marks and every rule below index the same two arrays, and a
 *  literal here would let this file disagree with the figure it is checking. */
const LEVERS = C.levers;
const AUTHORITIES = C.authorities;

/**
 * The position the slide holds in the decks that actually run it.
 *
 * `at` IS required here, and it is the case `SlideHarness` documents: unit tests resolve the
 * default `general` deck, `general` has no leader variant, and this slide reaches the two
 * leader deck sets ALONE.
 *
 * A HARNESS INPUT AND NOT A CLAIM THE SLIDE MAKES (§3.5). K.3 is what the composed leader
 * decks derive today; nothing under `src/slides/leader-mandate/` names either half, which is
 * the rule the figure-freedom block below holds. If a Phase 7 run ever landed in front of
 * `mandate` this constant would move while no source file did.
 */
const AT = { letter: "K", num: 3, sectionKey: "mandate" } as const;

/** One button per pose, so a test can WALK the slide inside one mounted tree. */
function Nav() {
  const { goTo } = useDeck();
  return (
    <>
      {POSES.map((s) => (
        <button key={s} data-testid={`goto-${s}`} onClick={() => goTo(0, s)} />
      ))}
    </>
  );
}

function renderSlide(pose = 0) {
  const out = render(
    <SlideHarness def={mandateLeversSlide} at={AT}>
      <Nav />
      <MandateLevers />
    </SlideHarness>,
  );
  if (pose > 0) goToPose(pose);
  return out;
}

function goToPose(pose: number) {
  act(() => screen.getByTestId(`goto-${pose}`).click());
}

function textOf(id: string): string {
  return screen.getByTestId(id).textContent ?? "";
}

function boxOf(id: string): HTMLElement {
  return screen.getByTestId(id) as HTMLElement;
}

/** The inline style as AUTHORED, not as jsdom re-parsed it. `border: 1px solid var(--…)` and
 *  `font-family: var(--mono)` are shorthands cssstyle drops rather than stores, so the rules
 *  that are about those two read the attribute the component actually set. */
function styleAttr(id: string): string {
  return boxOf(id).getAttribute("style") ?? "";
}

// ── the boxes, by pose ───────────────────────────────────────────────────────
//
// Derived from the content wherever the renderer keys on an `id`, so a reworded lever or a
// fifth authority moves these hooks with it.

const leverId = (i: number) => `mandate-lever-${LEVERS[i].id}`;

/** Every cell of the form — one per (lever, authority) pair, and SIXTEEN is the product of
 *  the two counts rather than a number typed here. */
const CELL_IDS: readonly string[] = AUTHORITIES.flatMap((a) =>
  LEVERS.map((l) => `mandate-levers-cell-${l.id}-${a.id}`),
);

/**
 * Every mark the form draws — DERIVED FROM `Lever.needs` AND FROM NOTHING ELSE, which is the
 * whole point of computing it here instead of writing four ids down.
 *
 * The figure fills a cell where `lever.needs.includes(authority.id)`; this list is that same
 * predicate over the same data. A lever that claimed a second authority would lengthen BOTH
 * sides at once — which is why the count assertions below are checked against the twelve
 * EMPTY cells and against the one column, neither of which this derivation can move.
 */
const MARK_IDS: readonly string[] = AUTHORITIES.flatMap((a) =>
  LEVERS.filter((l) => l.needs.includes(a.id)).map((l) => `mandate-levers-mark-${l.id}-${a.id}`),
);

/** What each pose ADDS. The four lever rows stand from pose 0 and never leave; the form, the
 *  marks, the band and the ask arrive one click each. */
const REVEALED_AT: ReadonlyArray<readonly string[]> = [
  LEVERS.map((_, i) => leverId(i)),
  CELL_IDS,
  MARK_IDS,
  ["mandate-levers-band"],
  ["mandate-levers-closer"],
];

/** Every gated box on the stage, flattened — the list `REVEALED_AT` is checked to be
 *  COMPLETE against, so "every pose is complete" cannot pass by naming fewer boxes than the
 *  figure draws. */
const EVERY_REVEAL = REVEALED_AT.flat();

/** The boxes that carry no text of their own — the sixteen frames and the four fills. Named
 *  once, so the "the copy is there, not merely the box" checks cannot be quietly widened. */
const TEXTLESS_IDS = new Set<string>([...CELL_IDS, ...MARK_IDS]);

/**
 * The boxes that are NOT reveals at all — two headings, four column heads and the form's head
 * rule.
 *
 * THEY STAND FROM POSE 0 BY HAVING NO GATE, which is the call K.1 makes about its empty right
 * column and this stage makes about an empty form: a half-drawn stage under no heading reads
 * as a slide that failed to finish, and the same half under its own question reads as a
 * promise. Listed apart from `REVEALED_AT` because they carry no `.fade` class and a reveal
 * check over them would pass for the wrong reason.
 */
const STANDING_IDS: readonly string[] = [
  "mandate-levers-heading",
  "mandate-levers-authority-heading",
  "mandate-levers-head-rule",
  ...AUTHORITIES.map((a) => `mandate-levers-authority-${a.id}`),
];

const revealed = (id: string) => boxOf(id).classList.contains("on");

// ── the copy, as one set of strings ──────────────────────────────────────────

/** Every string reachable from `value` — the walk, not a hand list, for the sibling files'
 *  reason: a field added next month is inside every rule below the day it exists. It collects
 *  `id` fields too, deliberately: those reach the DOM as `data-testid`, and a forbidden word
 *  written into a hook is the same defect written somewhere less visible. */
function walkStrings(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) for (const item of value) walkStrings(item, out);
  else if (value !== null && typeof value === "object") {
    for (const item of Object.values(value)) walkStrings(item, out);
  }
  return out;
}

/** Every string this slide can put on a stage. ONE block, because this slide has no brand
 *  axis — see the `no brand axis` describes below, which hold that as a rule. */
const authoredStrings = (): string[] => walkStrings(C);

/**
 * The TEN PROSE strings, each with the `*Kw` sibling the copy module pairs it with.
 *
 * The headline, the four lever lines, the band's statement and the closer — seven, and the
 * only strings on this stage the highlighter may touch. Everything else is a LABEL.
 */
const PROSE: ReadonlyArray<readonly [string, string, readonly string[]]> = [
  ["headline", C.headline, C.headlineKw],
  ...LEVERS.map((l): readonly [string, string, readonly string[]] => [
    `lever.${l.id}`,
    l.line,
    l.lineKw,
  ]),
  ["playbook.statement", C.playbook.statement, C.playbook.statementKw],
  ["closer", C.closer, C.closerKw],
];

/** The MONO LABEL register — every string that may never be rendered through the highlighter,
 *  and may never gain a `*Kw`. The fig label, both headings, the four lever labels, the four
 *  authority heads, the band's eyebrow and the band's citation. Written out as a list on
 *  purpose: together with `PROSE` it is checked against what the STAGE actually prints, so a
 *  new string has to pick a side before it can render. */
const LABELS: readonly string[] = [
  C.figLabel,
  C.leversHeading,
  C.authorityHeading,
  ...LEVERS.map((l) => l.label),
  ...AUTHORITIES.map((a) => a.label),
  C.playbook.eyebrow,
  C.playbook.provenance,
];

/** The `data-testid`s the LABEL strings above are printed into. */
const LABEL_BOXES: readonly string[] = [
  "mandate-levers-heading",
  "mandate-levers-authority-heading",
  ...LEVERS.map((l) => `mandate-lever-label-${l.id}`),
  ...AUTHORITIES.map((a) => `mandate-levers-authority-${a.id}`),
  "mandate-levers-band-eyebrow",
  "mandate-levers-band-provenance",
];

/** The `data-testid`s the PROSE strings are printed into, headline excepted — that one is the
 *  `<h1>` and has no hook of its own. */
const PROSE_BOXES: ReadonlyArray<readonly [string, readonly string[]]> = [
  ...LEVERS.map((l): readonly [string, readonly string[]] => [
    `mandate-lever-line-${l.id}`,
    l.lineKw,
  ]),
  ["mandate-levers-band-statement", C.playbook.statementKw],
  ["mandate-levers-closer", C.closerKw],
];

/** Every string this slide PRINTS — the two sides of the keyword rule, together. */
const printedStrings = (): string[] => [...PROSE.map(([, copy]) => copy), ...LABELS];

/** Everything the stage renders, minus the one element that legitimately prints a DERIVED
 *  figure reference. Stripped from a CLONE: React owns those nodes and removing one behind
 *  its back throws on the next commit. */
function stageTextWithoutFigLabel(container: HTMLElement): string {
  const stripped = container.cloneNode(true) as HTMLElement;
  stripped.querySelector(".fig-label")?.remove();
  return stripped.textContent ?? "";
}

/** The label half of the `FigLabel` — its last span, which is the only part of that element
 *  this slide authors. The reference in front of it is the composer's. */
function figLabelText(container: HTMLElement): string {
  const spans = container.querySelectorAll(".fig-label span");
  return spans[spans.length - 1]?.textContent ?? "";
}

/** What the stage prints, read off the DOM: the headline, the fig label's own half, and every
 *  box that carries type. */
function stagePrintedStrings(container: HTMLElement): string[] {
  const heading = container.querySelector("h1")?.textContent ?? "";
  const boxes = [...container.querySelectorAll<HTMLElement>("[data-testid^='mandate-lever']")]
    .map((el) => el.textContent ?? "")
    .filter((text) => text !== "");
  return [heading, figLabelText(container), ...boxes];
}

// ── the slide def (gh#69's fifth AC, and the canonical-pose half) ────────────

describe("the slide def", () => {
  test("is the file's basename, five steps, closing on the fullest pose", () => {
    // The id is the basename (`deck-slide-ids.test.ts` owns the rule; this pins the value).
    expect(mandateLeversSlide.id).toBe("mandate-levers");
    expect(mandateLeversSlide.steps).toBe(5);
    expect(mandateLeversSlide.sectionKey).toBe("mandate");
    expect(mandateLeversSlide.animationMode).toBe("step-reveal");
    expect(mandateLeversSlide.surface).toBe("dark");
  });

  test("exports the closer, because the canonical pose IS the last pose", () => {
    // THE EXPORTS PRINT `canonicalPose` AND NOTHING ELSE. A canonical pose of 3 would ship a
    // PDF of the section's entire ask with the ask's own conclusion missing: four things a
    // room can do, and no sentence saying what happens if it does none of them. On the slide
    // that ENDS the mandate that is the one way this deck could travel badly.
    //
    // BOTH HALVES, because the number alone proves nothing — a `steps` bumped to 6 with the
    // closer still gated at 4 would satisfy the arithmetic and export a blank shelf.
    expect(mandateLeversSlide.canonicalPose).toBe(4);
    expect(mandateLeversSlide.canonicalPose).toBe(mandateLeversSlide.steps - 1);
    const { unmount } = renderSlide(mandateLeversSlide.canonicalPose);
    expect(revealed("mandate-levers-closer")).toBe(true);
    expect(textOf("mandate-levers-closer")).toBe(C.closer);
    unmount();
  });
});

// ── gh#69's first AC · where the slide composes ──────────────────────────────

describe("the mandate run ends here", () => {
  /** The run, as its own section module authors it — §6.8's three slides in §6.8's order. */
  const RUN_IDS = leaderMandateSlides.map((def) => def.id);

  /** Every registered deck set, split by the variants that resolve it. Walked rather than
   *  listed, so a third deck set is inside these rules the day somebody registers it. */
  const VARIANTS_BY_DECK_SET = new Map<DeckSetId, VariantId[]>();
  for (const variant of Object.values(VARIANTS)) {
    const row = VARIANTS_BY_DECK_SET.get(variant.deckSet) ?? [];
    row.push(variant.id);
    VARIANTS_BY_DECK_SET.set(variant.deckSet, row);
  }

  test("the section module puts this slide last, under the run's own key", () => {
    // `leaderMandateSlides` is the ORDER §6.8 gives the section; `deck-sets.ts` is which
    // decks run it. This is the first half, and it is an identity check: a copy of the def
    // would satisfy a `toEqual` forever while drifting.
    expect(leaderMandateSlides.at(-1)).toBe(mandateLeversSlide);
    expect(mandateLeversSlide.sectionKey).toBe("mandate");
    // THREE, AND THE RUN IS FULL. §4.3 gives `mandate` three slides; a fourth would be a spec
    // change first and an edit second, and it would fail here by count before it failed
    // anywhere it costs more to read.
    expect(RUN_IDS).toEqual(["mandate-enablement", "mandate-phases-gates", "mandate-levers"]);
  });

  test("both leader variants compose the run in that order, with this slide at the tail", () => {
    // READ OFF `DECK_SET_COMPOSITION`, which is what `variant-composition.test.tsx` and
    // `mandate-phases-gates.test.tsx` read. The two leader VARIANTS resolve one leader deck
    // set today; the rule is written per variant anyway, because "both leader decks" is the
    // AC's wording and a second leader list is a thing this repo could grow without warning.
    const leaderVariants = VARIANTS_BY_DECK_SET.get("leader") ?? [];
    expect(leaderVariants.sort()).toEqual(["berau-leader", "gems-leader"]);
    for (const variant of leaderVariants) {
      const { slides } = DECK_SET_COMPOSITION[VARIANTS[variant].deckSet];
      // The whole run, in order — not merely "contains", which a shuffled run also satisfies.
      expect(slides.filter((id) => RUN_IDS.includes(id)), variant).toEqual(RUN_IDS);
      // And CONTIGUOUS, so §6.8's three read as one run rather than as three slides that
      // happen to share a key. R4 throws at load on a split run; "adjacent" is stronger and
      // is what the ordering asks for.
      const at = slides.indexOf("mandate-levers");
      expect(at, variant).toBeGreaterThan(-1);
      expect(slides[at - 1], variant).toBe("mandate-phases-gates");
      expect(slides[at - 2], variant).toBe("mandate-enablement");
      // THE TAIL, stated as the property rather than as an index: nothing else in the deck
      // set carries a `mandate` id behind this one.
      expect(slides.filter((id) => RUN_IDS.includes(id)).at(-1), variant).toBe("mandate-levers");
    }
  });

  test("no standard deck set composes it, or any other row of the run", () => {
    // The failure every leader-only ticket has had to stay clear of: one of these three ids
    // written into `STANDARD_SLIDE_IDS` by accident would insert a leader run into a deck
    // with no leader in the room — between `pitfalls` and `meta`, renumbering only the last
    // eleven slides, which is the quiet kind and therefore the kind that reaches a projector.
    const standardVariants = VARIANTS_BY_DECK_SET.get("standard") ?? [];
    expect(standardVariants.length, "a rule over no standard variant proves nothing").toBe(3);
    for (const variant of standardVariants) {
      const { slides } = DECK_SET_COMPOSITION[VARIANTS[variant].deckSet];
      expect(slides, variant).not.toContain("mandate-levers");
      expect(slides.filter((id) => RUN_IDS.includes(id)), variant).toEqual([]);
    }
  });
});

// ── gh#69's second AC · the four levers, and the signature form beside them ──

describe("the four levers", () => {
  test("are the content module's four, in deck order, each with its label and its line", () => {
    // FOUR, from the content module's own array rather than a literal here: the rows, the
    // pitch, the cells and the reveal stagger all index that array.
    renderSlide(0);
    expect(LEVERS).toHaveLength(4);
    LEVERS.forEach((lever) => {
      expect(textOf(`mandate-lever-label-${lever.id}`)).toBe(lever.label);
      expect(textOf(`mandate-lever-line-${lever.id}`)).toBe(lever.line);
    });
    // IN DECK ORDER on the stage, not merely all present. The order is the order they get
    // pulled in — the time is blocked before anybody is named to fill it — and a shuffled
    // board still renders four correct rows.
    expect(screen.getAllByTestId(/^mandate-lever-label-/).map((el) => el.textContent)).toEqual(
      LEVERS.map((l) => l.label),
    );
    expect(screen.getAllByTestId(/^mandate-lever-line-/).map((el) => el.textContent)).toEqual(
      LEVERS.map((l) => l.line),
    );
  });

  test("stand from pose 0 and never leave", () => {
    // The four acts are the figure the other four poses are laid over; a reveal written
    // per-pose is one keystroke from making the last of them arrive with the marks — and the
    // room would then be shown a form for a lever it had not been asked for yet.
    const { unmount } = renderSlide(0);
    for (const pose of POSES) {
      goToPose(pose);
      LEVERS.forEach((_, i) => expect(revealed(leverId(i)), `pose ${pose}`).toBe(true));
    }
    unmount();
  });

  test("every one of them waits on the person in the room, and on nobody else", () => {
    // §6.8's CRITERION, as a property of the data rather than as a tone the copy takes. The
    // content module throws at load on a lever that fails it (`authorizableAlone`) — the two
    // are not redundant, they fail at different moments and to different people: the throw
    // stops the edit, this stops the merge.
    //
    // `toEqual([SOLE_AUTHORITY])` AND NOT `toContain`: a lever that ALSO needed the committee
    // would satisfy "contains you" while drawing a second filled column under a headline that
    // denies one exists.
    expect(SOLE_AUTHORITY).toBe("you");
    expect(AUTHORITY_IDS).toContain(SOLE_AUTHORITY);
    LEVERS.forEach((lever) => {
      expect(lever.needs, lever.id).toEqual([SOLE_AUTHORITY]);
    });
    // And the property stated the other way round, which is the half that would survive a
    // future lever whose `needs` grew: no lever names an authority that is not the sole one.
    const named = new Set(LEVERS.flatMap((l) => [...l.needs]));
    expect([...named]).toEqual([SOLE_AUTHORITY]);
  });

  test("is an act and not a structure — every line is an imperative", () => {
    // THE LEVER / PILLAR BOUNDARY, from this side. K.1's pillars name what has to EXIST; a
    // lever names what the leader DOES, with the "you" left implicit. The mechanical form of
    // it: every line opens on a capitalised verb and none opens on an article or on "There".
    LEVERS.forEach((lever) => {
      expect(lever.line, lever.id).toMatch(/^[A-Z][a-z]+ /);
      expect(lever.line, lever.id).not.toMatch(/^(The|A|An|There|Someone|Somebody)\b/);
    });
  });
});

describe("the signature form", () => {
  test("draws a column for each authority and a cell for each pair — sixteen boxes", () => {
    // SIXTEEN IS A PRODUCT, NOT A NUMBER. Four acts against four things an act could wait on;
    // a fifth authority re-cuts the form through `authorityColWidth` and adds four cells
    // without a count being re-typed anywhere.
    renderSlide(1);
    expect(AUTHORITIES).toHaveLength(4);
    expect(AUTHORITIES.map((a) => a.id)).toEqual([...AUTHORITY_IDS]);
    expect(AUTHORITIES.map((a) => a.label)).toEqual([
      "YOU",
      "THE COMMITTEE",
      "GROUP HR",
      "A BUDGET CYCLE",
    ]);
    const cells = screen.getAllByTestId(/^mandate-levers-cell-/);
    expect(cells).toHaveLength(LEVERS.length * AUTHORITIES.length);
    expect(cells.map((el) => el.getAttribute("data-testid")).sort()).toEqual([...CELL_IDS].sort());
    // Every column head is on the stage from pose 0, over the column its cells sit in.
    AUTHORITIES.forEach((a) => {
      expect(textOf(`mandate-levers-authority-${a.id}`)).toBe(a.label);
    });
  });

  test("fills one cell per lever, all of them in the YOU column, and derives the rest empty", () => {
    // THE FIGURE'S WHOLE CLAIM, AND IT IS A COUNT. Nothing on the stage says "you can
    // authorize all four alone"; the marks say it, and a count is the one kind of claim a
    // room can check from the back row.
    //
    // EVERY NUMBER BELOW IS READ FROM THE DATA. `MARK_IDS` is `lever.needs` applied by the
    // same predicate the figure applies, so a lever flipped to another authority moves both
    // sides at once — which is exactly why the assertions that MATTER are the ones it cannot
    // move: that the filled column is one column, and that the column is `SOLE_AUTHORITY`'s.
    renderSlide(2);
    const marks = screen.getAllByTestId(/^mandate-levers-mark-/);
    const expectedMarks = LEVERS.reduce((n, l) => n + l.needs.length, 0);
    expect(marks).toHaveLength(expectedMarks);
    expect(marks.map((el) => el.getAttribute("data-testid")).sort()).toEqual([...MARK_IDS].sort());
    // ONE PER LEVER — no row is unsigned and no row is signed twice.
    LEVERS.forEach((lever) => {
      const own = marks.filter((el) =>
        (el.getAttribute("data-testid") ?? "").startsWith(`mandate-levers-mark-${lever.id}-`),
      );
      expect(own, lever.id).toHaveLength(lever.needs.length);
      expect(own, lever.id).toHaveLength(1);
    });
    // ONE COLUMN, AND IT IS THE FIRST ONE. Derived from the mark ids by their authority
    // suffix, so this is a claim about what is PAINTED rather than about what was authored.
    const columns = new Set(
      marks.map((el) => (el.getAttribute("data-testid") ?? "").split("-").at(-1)),
    );
    expect(columns.size).toBe(1);
    expect([...columns]).toEqual([SOLE_AUTHORITY]);
    // AND TWELVE CELLS STAY EMPTY — the residue, computed rather than listed. There is no
    // list of empty cells anywhere in this section, and this is what says so.
    const empty = CELL_IDS.filter(
      (id) => !MARK_IDS.includes(id.replace("-cell-", "-mark-")),
    );
    expect(empty).toHaveLength(LEVERS.length * AUTHORITIES.length - expectedMarks);
    expect(empty).toHaveLength(12);
    empty.forEach((id) => {
      // Drawn, and drawn as a HAIRLINE FRAME rather than as a dimmed fill: an empty cell at
      // 30% of a filled one would read as a cell the slide had not finished revealing, which
      // on a step-reveal deck is a specific and wrong meaning.
      expect(styleAttr(id), id).toContain("border: 1px solid var(--copper-800)");
      expect(styleAttr(id), id).not.toContain("opacity");
      expect(textOf(id), id).toBe("");
    });
  });

  test("keeps three columns empty for the rest of the slide", () => {
    // The three refusals are named ONLY to stay empty, and they have to stay empty at the two
    // poses that follow the answer as well. A mark that arrived with the band would turn the
    // citation into a fifth ask.
    const { unmount } = renderSlide(2);
    for (const pose of [2, 3, 4]) {
      goToPose(pose);
      const refused = AUTHORITIES.filter((a) => a.id !== SOLE_AUTHORITY);
      expect(refused).toHaveLength(3);
      refused.forEach((a) => {
        LEVERS.forEach((l) => {
          expect(
            screen.queryByTestId(`mandate-levers-mark-${l.id}-${a.id}`),
            `pose ${pose} · ${l.id}/${a.id}`,
          ).toBeNull();
        });
      });
    }
    unmount();
  });

  test("asks the question one click before it answers it", () => {
    // POSE 1 IS THE FORM AND POSE 2 IS THE ANSWER, and the click between them is what the
    // whole figure is worth: a form that arrived already filled would land the question and
    // its answer in the same glance, and the four marks would be decoration rather than a
    // result.
    const { unmount } = renderSlide(0);
    CELL_IDS.forEach((id) => expect(revealed(id), `pose 0 · ${id}`).toBe(false));
    goToPose(1);
    CELL_IDS.forEach((id) => expect(revealed(id), `pose 1 · ${id}`).toBe(true));
    MARK_IDS.forEach((id) => expect(revealed(id), `pose 1 · ${id}`).toBe(false));
    goToPose(2);
    MARK_IDS.forEach((id) => expect(revealed(id), `pose 2 · ${id}`).toBe(true));
    unmount();
  });
});

// ── gh#69's build rules · §6.6, no third ladder ──────────────────────────────

/**
 * The ordered vocabularies this slide may not become another of, one regex each.
 *
 * EVERY PATTERN HERE FIRES ON THE CONTROL CORPUS BELOW, which is the deck's OWN two ladders
 * as live modules plus the two sentences §6.6's cut was written against. A list that drifted
 * out of date would otherwise pass vacuously over copy that had quietly grown a third one.
 *
 * WHY THE WORDS AND NOT ONLY THE CUT PHRASE. §6.6 cut a specific five-stage sequence, but the
 * failure it was protecting against is generic: four acts printed with a rank on them ARE a
 * ladder, whatever they are called. So the list is the vocabulary a rank would have to be
 * expressed in, and the structural half — one colour tier for all four — sits beside it.
 */
const LADDER_TOKENS: ReadonlyArray<readonly [string, RegExp]> = [
  ["Learn → Experiment", /\bLearn\s*[→>,·—–-]+\s*Experiment\b/i],
  ["Build → Integrate", /\bBuild\s*[→>,·—–-]+\s*Integrate\b/i],
  ["Integrate → Own", /\bIntegrate\s*[→>,·—–-]+\s*Own\b/i],
  ["maturity", /\bmaturity\b/i],
  ["level", /\blevels?\b/i],
  ["rung", /\brungs?\b/i],
  ["ladder", /\bladders?\b/i],
  ["phase", /\bphases?\b/i],
  ["stage", /\bstages?\b/i],
  ["L1–L5", /\bL[1-5]\b/],
  ["P0–P3", /\bP[0-3]\b/],
];

/**
 * The two spellings with NO sentence in the control corpus to fire against, kept anyway and
 * said out loud rather than quietly padded into the list above.
 *
 * `tier` is what this deck calls its COLOUR ramp — a word the source files use constantly and
 * no rendered string anywhere uses — so a tier printed on this stage would be a rank named in
 * the deck's own internal vocabulary, and there is nothing to control it against. `step one`
 * is the shape a numbered lever would take. Both are refused here; neither can be controlled,
 * and a regex that fires on nothing would make the rule above pass on copy that had grown a
 * ladder in a word the corpus does not happen to contain.
 */
const LADDER_UNSOURCED_TOKENS: ReadonlyArray<readonly [string, RegExp]> = [
  ["tier", /\btiers?\b/i],
  ["step one…five", /\bstep\s+(one|two|three|four|five)\b/i],
];

/**
 * §6.6's own sentence and the source it was written against, transcribed on 2026-08-08.
 *
 * THE CONTROL CORPUS IS THE SOURCE AND NOT A SET OF SENTENCES WRITTEN TO MAKE THE REGEXES
 * FIRE, which is the call `gap-three-failures.test.tsx` records: a control that edits its own
 * input proves the edit and not the pattern.
 *
 *   · `docs/specs/2026-08-03-gems-catalyst-implementation-spec.md` §6.6, the line that cuts
 *     the sequence and names the two ladders it would be a third of.
 *   · `docs/researches/internal-townhall-aisc.md`, the source deck's own summary of the
 *     journey, which is where the five stages and the words "maturity model" come from.
 */
const CUT_LADDER_SOURCES: readonly string[] = [
  '"Learn → Experiment → Build → Integrate → Own" is out: it would be a third ladder alongside L1–L5 and P0–P3.',
  "Department journey: Learn → Experiment → Build → Integrate → Own (5-stage maturity model)",
];

/** The deck's two LIVE ordered vocabularies, plus the sentences above. Imported rather than
 *  transcribed wherever it can be: a rung retitled in `leader-gap` or a phase reworded in K.2
 *  keeps controlling this rule instead of silently ceasing to. */
const LADDER_CONTROL = (): string[] => [
  ...walkStrings(gapLadderContent),
  ...walkStrings(capabilityLadderFor("gems")),
  ...walkStrings(capabilityLadderFor("berau")),
  ...walkStrings(mandatePhasesGatesContent),
  ...walkStrings(phasesGatesFor("gems")),
  ...walkStrings(phasesGatesFor("berau")),
  ...CUT_LADDER_SOURCES,
];

describe("§6.6 · the four levers are not a third ladder", () => {
  test("no authored string and no rendered string names a level, a rung, a phase or a stage", () => {
    const authored = authoredStrings();
    expect(authored.length, "a rule over an empty set proves nothing").toBeGreaterThan(20);

    const { container, unmount } = renderSlide(4);
    const stage = stageTextWithoutFigLabel(container);
    expect(stage.length, "a rule over an empty stage proves nothing").toBeGreaterThan(600);
    for (const [name, pattern] of [...LADDER_TOKENS, ...LADDER_UNSOURCED_TOKENS]) {
      for (const copy of authored) {
        expect(pattern.test(copy), `"${name}" in ${JSON.stringify(copy)}`).toBe(false);
      }
      expect(pattern.test(stage), `"${name}" reached the stage`).toBe(false);
    }
    unmount();
  });

  test("every pattern still fires on the vocabulary it was read off", () => {
    // ELEVEN REGEXES THAT MATCHED NOTHING would make the rule above pass on a slide that had
    // grown a ladder. The two unsourced spellings are excluded by construction and argued at
    // their declaration.
    const control = LADDER_CONTROL();
    expect(control.length, "a control over an empty corpus proves nothing").toBeGreaterThan(50);
    for (const [name, pattern] of LADDER_TOKENS) {
      expect(
        control.some((line) => pattern.test(line)),
        `"${name}" no longer fires on the deck's own ladder vocabulary`,
      ).toBe(true);
    }
    for (const [name, pattern] of LADDER_UNSOURCED_TOKENS) {
      expect(
        control.some((line) => pattern.test(line)),
        `"${name}" is documented as having no source sentence`,
      ).toBe(false);
    }
  });

  test("ranks none of the four — one colour tier for the labels, one for the lines", () => {
    // THE STRUCTURAL HALF OF §6.6, AND THE HALF A GREP CANNOT DO. The four acts can only
    // become a ladder if they read as a sequence with a rank on it, and nothing on this stage
    // expresses one: reading top to bottom the ink does not change. A future edit that
    // brightened the later rows would turn a list of four acts into a ladder by accident,
    // without a word being added.
    renderSlide(2);
    const colours = (ids: readonly string[]) =>
      new Set(ids.map((id) => boxOf(id).style.color));
    const labelColours = colours(LEVERS.map((l) => `mandate-lever-label-${l.id}`));
    const lineColours = colours(LEVERS.map((l) => `mandate-lever-line-${l.id}`));
    expect(labelColours.size).toBe(1);
    expect(lineColours.size).toBe(1);
    // Painted, rather than identically absent.
    expect([...labelColours][0]).toMatch(/^var\(--/);
    expect([...lineColours][0]).toMatch(/^var\(--/);
    // The label tier and the line tier DIFFER, which is what keeps "one tier for all four"
    // from passing on a stage that had lost its tiers altogether.
    expect([...labelColours][0]).not.toBe([...lineColours][0]);
    // THE FOUR MARKS ARE ONE SHAPE AND ONE COLOUR TOO. A larger or brighter mark on any row
    // would rank the acts in the figure while the type said they were equal.
    const marks = MARK_IDS.map((id) => boxOf(id).style);
    expect(new Set(marks.map((s) => `${s.width}|${s.height}|${s.background}`)).size).toBe(1);
    expect(marks[0].background).not.toBe("");
  });

  test("prints YOU at exactly the tier of the three columns it is being compared with", () => {
    // LOAD-BEARING, and the one tier decision on this stage that could look like a kindness.
    // The head row asks the question; the CELLS answer it. A brighter first head would answer
    // it before the form was drawn, and the slide would be asserting in colour what it is
    // about to demonstrate in a count.
    renderSlide(1);
    const heads = new Set(
      AUTHORITIES.map((a) => boxOf(`mandate-levers-authority-${a.id}`).style.color),
    );
    expect(heads.size).toBe(1);
    expect([...heads][0]).toMatch(/^var\(--/);
  });

  test("gives the levers no ordinal of any kind — no number, no order field", () => {
    // The other way a ladder arrives: not a word, a FIELD. A `level`, `order` or `index` on
    // `Lever` would be a rank the figure would eventually read, and the four labels carry no
    // numeral either.
    LEVERS.forEach((lever) => {
      expect(Object.keys(lever).sort(), lever.id).toEqual(["id", "label", "line", "lineKw", "needs"]);
      expect(lever.label, lever.id).not.toMatch(/\d/);
      expect(lever.label, lever.id).not.toMatch(/^(first|second|third|fourth|last)\b/i);
    });
  });
});

// ── the poses ────────────────────────────────────────────────────────────────

describe("the five poses", () => {
  test("arrive in order and nothing that arrived ever leaves", () => {
    // The whole reveal contract in one walk. Each pose adds one band and the slide never
    // subtracts — attention is bought with added light, never taken away.
    const { container, unmount } = renderSlide(0);
    // THE LIST IS THE WHOLE STAGE. Every `.fade` box this figure mounts is accounted for in
    // `REVEALED_AT`, so a box added to the stage and not to this file cannot slip through the
    // completeness walks below — they would simply never look at it.
    expect(
      [...container.querySelectorAll<HTMLElement>(".fade[data-testid]")]
        .map((el) => el.getAttribute("data-testid") ?? "")
        .sort(),
    ).toEqual([...EVERY_REVEAL].sort());
    for (const pose of POSES) {
      goToPose(pose);
      for (let band = 0; band <= pose; band += 1) {
        for (const id of REVEALED_AT[band]) {
          expect(revealed(id), `pose ${pose} · ${id} has arrived`).toBe(true);
        }
      }
      for (let band = pose + 1; band < REVEALED_AT.length; band += 1) {
        for (const id of REVEALED_AT[band]) {
          expect(revealed(id), `pose ${pose} · ${id} is not reached yet`).toBe(false);
        }
      }
      // The headings, the four column heads and the head rule are on the stage at every pose
      // — including pose 0, where the form under them holds nothing at all.
      for (const id of STANDING_IDS) {
        expect(screen.getByTestId(id), `pose ${pose} · ${id}`).toBeInTheDocument();
      }
    }
    unmount();
  });

  test("walks backwards to the same poses it walked forwards through", () => {
    // Every gate is a function of the pose alone — no state, no "previously shown" — so
    // stepping back is arithmetic rather than cleanup. Asserted because `ArrowLeft` is a key a
    // presenter actually presses.
    const { unmount } = renderSlide(4);
    goToPose(0);
    expect(revealed("mandate-levers-closer")).toBe(false);
    expect(revealed("mandate-levers-band")).toBe(false);
    MARK_IDS.forEach((id) => expect(revealed(id), id).toBe(false));
    CELL_IDS.forEach((id) => expect(revealed(id), id).toBe(false));
    // And the four acts, which pose 0 owns, are exactly as they were.
    LEVERS.forEach((_, i) => expect(revealed(leverId(i))).toBe(true));
    unmount();
  });

  test("puts the band before the ask, and the ask last", () => {
    // ORDER IS THE ARGUMENT. A room that has just been shown that all four are theirs can
    // hear "and these are not even ours" as provenance; the same band first would read as a
    // disclaimer on an ask that had not been made yet. And the closer is the last arrival on
    // the stage, which is what makes the canonical pose safe to export.
    const { unmount } = renderSlide(3);
    expect(revealed("mandate-levers-band")).toBe(true);
    expect(revealed("mandate-levers-closer")).toBe(false);
    expect(textOf("mandate-levers-band-eyebrow")).toBe(C.playbook.eyebrow);
    expect(textOf("mandate-levers-band-statement")).toBe(C.playbook.statement);
    expect(textOf("mandate-levers-band-provenance")).toBe(C.playbook.provenance);
    goToPose(4);
    expect(revealed("mandate-levers-closer")).toBe(true);
    unmount();
  });

  test("cites the playbook the four were reworded from, in the source's own words", () => {
    // "Reworded to the room" is a claim about somebody else's document, and the band is what
    // stops it being a thing the deck says about itself. The four SOURCE labels are quoted
    // verbatim and in the source's own order — which is also the order of the four rows above
    // — so a room that wants to check the rewording can read straight across.
    renderSlide(3);
    const provenance = textOf("mandate-levers-band-provenance");
    ["Convene", "Champion", "Unblock access", "Sustain the rhythm"].forEach((label) =>
      expect(provenance, label).toContain(label),
    );
    expect(provenance).toMatch(/“[^”]+”/);
    // The deck's OWN sentence carries no quotation marks — a paraphrase inside quotes is the
    // small lie the band's three-line split exists to make impossible. Same rule as K.1's
    // bottleneck and K.2's statement, one and two clicks earlier.
    expect(textOf("mandate-levers-band-statement")).not.toMatch(/[“”"]/);
  });

  test("prints the fig label from the composed position, and no letter of its own", () => {
    const { container, unmount } = renderSlide(0);
    const fig = container.querySelector(".fig-label")?.textContent ?? "";
    expect(fig).toContain(C.figLabel);
    // The letter and number come from `SlideNumberContext`, which the harness supplied — see
    // `AT`. Nothing under `src/slides/leader-mandate/` names one.
    expect(fig).toContain(`${AT.letter}.${AT.num}`);
    unmount();
  });
});

// ── gh#69's fifth AC · zero SMIL, every pose complete, under either preference ─

/** The census, run at one pose. Scoped to what this DIRECTORY renders and not to `document`,
 *  because that is the claim: `src/slides/leader-mandate/` mounts no SVG. `.fig-label` — the
 *  deck's own caption, which this slide only calls — is excluded, so a marker added to that
 *  shared component later is a failure of ITS suite rather than of all three of this
 *  section's. */
function smilCensus(container: HTMLElement, where: string) {
  const figLabel = container.querySelector(".fig-label");
  for (const tag of ["animate", "animateTransform", "animateMotion", "set", "svg"]) {
    const ours = [...container.querySelectorAll(tag)].filter((el) => !figLabel?.contains(el));
    expect(ours, `${where} · <${tag}>`).toHaveLength(0);
  }
}

/** Every box the pose has reached is revealed AND carries its text; nothing it has not
 *  reached is. "Complete" is a claim about THIS pose, not about the last one. */
function poseIsComplete(pose: number, where: string) {
  for (let band = 0; band <= pose; band += 1) {
    for (const id of REVEALED_AT[band]) {
      expect(revealed(id), `${where} · ${id}`).toBe(true);
      if (!TEXTLESS_IDS.has(id)) {
        expect(textOf(id), `${where} · ${id} is empty`).not.toBe("");
      }
    }
  }
  for (let band = pose + 1; band < REVEALED_AT.length; band += 1) {
    for (const id of REVEALED_AT[band]) {
      expect(revealed(id), `${where} · ${id} is not reached yet`).toBe(false);
    }
  }
  for (const id of STANDING_IDS) {
    expect(screen.getByTestId(id), `${where} · ${id}`).toBeInTheDocument();
  }
}

describe("motion", () => {
  const realMatchMedia = window.matchMedia;

  afterEach(() => {
    window.matchMedia = realMatchMedia;
  });

  test("mounts no <svg> at all, at any pose, with no preference mocked", () => {
    // ZERO BY CONSTRUCTION, AND THIS IS THE ASSERTION THAT MAKES IT A CONSTRUCTION. SMIL is
    // invisible to the global `prefers-reduced-motion` rule in `globals.css` — that rule
    // squashes CSS durations only — so a SMIL node has to be gated at mount, as
    // `E12LoopAnatomy` gates its `<animateMotion>`. This figure has nothing to gate: the
    // sixteen cells, the four marks and the head rule are plain boxes. The cheapest way to
    // break that contract is to reach for one `<rect>`, and the rect is not what would go
    // wrong — it is the `<animate>` somebody adds to it next.
    for (const pose of POSES) {
      const { container, unmount } = renderSlide(pose);
      smilCensus(container, `default · pose ${pose}`);
      unmount();
    }
  });

  describe("under prefers-reduced-motion: reduce", () => {
    beforeEach(() => {
      window.matchMedia = ((query: string) => ({
        matches: query.includes("prefers-reduced-motion"),
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      })) as unknown as typeof window.matchMedia;
    });

    test("mounts zero SMIL nodes at every pose, and every pose still renders complete", () => {
      // WHAT THIS CAN AND CANNOT SAY. jsdom runs no animation, so "the pose rests on its
      // finished frame" is not checkable here — the global rule squashes a duration jsdom
      // never computes. What is checkable is that the MARKUP is preference-independent:
      // nothing under this slide reads `matchMedia` at all, so the census is identical under
      // either preference and every box the pose has reached is mounted, revealed and
      // carrying its text.
      const { container, unmount } = renderSlide(0);
      for (const pose of POSES) {
        goToPose(pose);
        smilCensus(container, `reduce · pose ${pose}`);
        poseIsComplete(pose, `reduce · pose ${pose}`);
      }
      unmount();
    });
  });

  test("every pose is complete under the default preference too", () => {
    // The same walk without the mock, so the reduce-mode result above cannot pass because the
    // stage renders identically badly in both conditions.
    const { unmount } = renderSlide(0);
    for (const pose of POSES) {
      goToPose(pose);
      poseIsComplete(pose, `default · pose ${pose}`);
    }
    unmount();
  });

  test("ranks nothing by opacity — no inline opacity anywhere on the stage", () => {
    // §6.8's build rule, and the reason the empty cells are a hairline frame rather than a
    // dimmed fill. On a step-reveal deck opacity means TIME: an object at 30% is one the
    // slide has not finished revealing. A rank expressed that way would say "this lever is
    // still arriving", which is a claim nobody authored.
    const { container, unmount } = renderSlide(4);
    const styles = [...container.querySelectorAll<HTMLElement>("[data-testid^='mandate-lever']")]
      .map((el) => el.getAttribute("style") ?? "")
      .join(" ");
    expect(styles.length, "a rule over empty styles proves nothing").toBeGreaterThan(400);
    expect(styles).not.toMatch(/\bopacity\s*:/i);
    unmount();
  });
});

// ── gh#69's build rules · figures and letters are derived, never authored ────

describe("no rendered string names a letter, a figure or any number at all", () => {
  test("every string on every pose is free of a figure reference and of a digit", () => {
    // §3.4 R2 / §3.5. `FigLabel` takes a LABEL only: the letter and the number in front of it
    // are the composer's, derived from where the run falls in each deck. `mandate` takes K
    // today and this slide takes K.3, and both would move the first time a Phase 7 run landed
    // in front of the mandate — so a literal here would be a lie on a projector within the
    // week.
    //
    // AND NO DIGIT AT ALL, which is stronger than the figure rule and is a shape rather than a
    // list. This slide prints no quantity: no date, no count, no percentage. That makes "no
    // authored number" checkable in one pass instead of as a growing set of patterns, and it
    // is the property that would break first if somebody numbered the four levers.
    const FIGURE = /\b[A-N]\.\d+\b/;
    for (const pose of POSES) {
      const { container, unmount } = renderSlide(pose);
      // The derived reference IS on the stage — asserted first, so the strip below is proved
      // to be removing something.
      expect(
        container.querySelector(".fig-label")?.textContent,
        `pose ${pose}: the derived reference is there to strip`,
      ).toContain(`${AT.letter}.${AT.num}`);
      const strings = stagePrintedStrings(container);
      expect(strings.length, `pose ${pose}`).toBeGreaterThan(10);
      for (const rendered of strings) {
        expect(rendered, `pose ${pose}: ${JSON.stringify(rendered)}`).not.toMatch(FIGURE);
        expect(rendered, `pose ${pose}: ${JSON.stringify(rendered)}`).not.toMatch(/\d/);
        expect(rendered, `pose ${pose}: ${JSON.stringify(rendered)}`).not.toMatch(
          /\bSECTIONS?\s+[A-N]\b/i,
        );
      }
      // And over the whole stripped stage in one string, so a digit in a box this file forgot
      // to hook is inside the rule too.
      expect(stageTextWithoutFigLabel(container), `pose ${pose}`).not.toMatch(/\d/);
      unmount();
    }
  });

  test("no authored string names a section letter, a figure number or a slide", () => {
    // Held over the authored VALUES as well as the stage: the doc comments under
    // `src/slides/leader-mandate/` DO name sections, because that is how a spec reference is
    // written, and a rule over comments would forbid the provenance this slide is required to
    // record.
    const authored = authoredStrings();
    expect(authored.length).toBeGreaterThan(20);
    for (const copy of authored) {
      expect(copy, copy).not.toMatch(/\b[A-N]\.\d+\b/);
      expect(copy, copy).not.toMatch(/\bSECTIONS?\s+[A-N]\b/i);
      expect(copy, copy).not.toMatch(/\b(slide|figure)\b/i);
      expect(copy, copy).not.toMatch(/\d/);
    }
  });

  test("carries no stray markup — the data is plain strings", () => {
    authoredStrings().forEach((copy) => expect(copy).not.toContain("<em"));
  });
});

// ── gh#69's build rules · no brand axis ─────────────────────────────────────

describe("no brand axis", () => {
  /** The three files this slide owns. `../content.ts` is deliberately NOT among them: it is
   *  the section's module and K.2's brand pick lives in it, so a `VARIANT` rule held over it
   *  would be a rule about another slide. */
  const OWN_FILES = [
    "mandate-levers.tsx",
    "components/LeverBoard.tsx",
    "levers-geometry.ts",
  ].map((name) => resolve(__dirname, "../../src/slides/leader-mandate", name));

  /** Comments legitimately argue at length about the `VARIANT` this slide does not import —
   *  the slide file says so twice — so only executable code is under test. The `[^:]` guard
   *  keeps a `https://` inside a comment from eating the rest of a line. */
  const codeOf = (file: string) =>
    readFileSync(file, "utf8")
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/(^|[^:])\/\/.*$/gm, "$1");

  test("imports no VARIANT and resolves no brand block, in any file it owns", () => {
    // THE SOURCE-LEVEL HALF, which is the one that says WHY the two epochs below are equal.
    // `deck-variants.test.ts` holds the same kind of rule over `src/deck-variants.ts`'s import
    // block; this one is narrower and reads only for the axis.
    for (const file of OWN_FILES) {
      const code = codeOf(file);
      expect(code.length, `${file}: nothing left after stripping comments`).toBeGreaterThan(200);
      expect(code, file).not.toMatch(/\bVARIANT\b/);
      expect(code, file).not.toMatch(/from\s+["']@\/variant["']/);
      expect(code, file).not.toMatch(/\bBrand\b/);
      expect(code, file).not.toMatch(/\w+For\(/);
    }
    // POSITIVE CONTROL — the stripper leaves the imports alone and would find one. K.2 is the
    // slide in this section that DOES resolve a brand, so it is the corpus that proves the
    // rule above is not passing over an empty string.
    const k2 = codeOf(resolve(__dirname, "../../src/slides/leader-mandate/mandate-phases-gates.tsx"));
    expect(k2).toMatch(/\bVARIANT\b/);
    // …and that the comments the rule ignores really do name it, so "stripped" is doing work.
    expect(readFileSync(OWN_FILES[0], "utf8")).toMatch(/VARIANT/);
  });

  test("the component takes no props, so there is no block to hand it", () => {
    // K.2 takes its resolved brand block as a prop; this one takes nothing, which is the
    // shape of "there is no axis" rather than "the axis is unused".
    expect(MandateLevers.length).toBe(0);
  });

  test("the content block is plain data — no resolver hiding in it", () => {
    // A `Record<Brand, …>` reachable from this block would be an axis nobody declared. Every
    // value is a string, a readonly array of strings, or a record of levers and authorities —
    // and no value is a function.
    const walk = (value: unknown, path: string): void => {
      if (typeof value === "function") throw new Error(`a function at ${path}`);
      if (Array.isArray(value)) value.forEach((v, i) => walk(v, `${path}[${i}]`));
      else if (value !== null && typeof value === "object") {
        for (const [k, v] of Object.entries(value)) walk(v, `${path}.${k}`);
      }
    };
    expect(() => walk(C, "mandateLeversContent")).not.toThrow();
    // POSITIVE CONTROL — the walk is alive and would find a resolver one level down.
    expect(() => walk({ nested: { leversFor: () => C } }, "control")).toThrow(
      /a function at control\.nested\.leversFor/,
    );
  });

  test("names no organisation on the stage", () => {
    // The subject of this stage is THE PERSON IN THE ROOM, and that person is the same person
    // in both rooms. The one exception is the CITATION, which names the organisation whose
    // playbook the four levers were lifted from — a different Group HR from the form's third
    // column, and the two may never be collapsed.
    const { container, unmount } = renderSlide(4);
    const ORGS = /\b(GEMS|GEMVIS|Berau|DigiTech|MineTech|Sinar Mas)\b/i;
    expect(stageTextWithoutFigLabel(container)).not.toMatch(ORGS);
    // The citation is the one string that names one, asserted as a POSITIVE so "reworded
    // from" has an owner rather than being a claim the deck makes about itself.
    expect(textOf("mandate-levers-band-provenance")).toContain("Nanovest");
    // …and the form's third column is BARE, so nothing on the stage says the room's own HR
    // wrote its levers.
    const groupHr = AUTHORITIES.find((a) => a.id === "groupHr");
    expect(groupHr?.label).toBe("GROUP HR");
    expect(groupHr?.label).not.toMatch(/Nanovest/i);
    unmount();
  });
});

describe("both leader decks print the same stage", () => {
  // BRAND INVARIANCE IS A CLAIM ABOUT MODULE EPOCHS — `VARIANT` resolves once at module scope
  // — so it cannot be checked inside the one epoch every test above runs in. Two epochs, byte
  // for byte, following `mandate-enablement.test.tsx`, which holds K.1's identical property
  // and is the shipped precedent in this very section.
  //
  // NOT `SlideHarness`, deliberately: it imports `composedDeck` statically and would hand a
  // freshly loaded slide a stale context object. This is the same-epoch dynamic-import pattern
  // `variant-composition.test.tsx` documents.
  const LEADER_VARIANTS: VariantId[] = ["berau-leader", "gems-leader"];

  async function stageFor(variant: VariantId): Promise<{ html: string; text: string }> {
    Object.defineProperty(window, "location", {
      configurable: true,
      writable: true,
      value: new URL(`http://localhost:5173/?variant=${variant}`),
    });
    vi.resetModules();
    cleanup();

    const [{ composedDeck }, { DeckProvider, useDeck: useDeckIn }, { SlideNumberProvider }, slide] =
      await Promise.all([
        import("@/deck/registry"),
        import("@/deck/DeckContext"),
        import("@/deck/SlideNumberContext"),
        import("@/slides/leader-mandate/mandate-levers"),
      ]);

    const row = composedDeck.slides.find((s) => s.def.id === "mandate-levers");
    if (!row) throw new Error(`${variant} composes no mandate-levers`);

    function AdvanceTo({ step }: { step: number }) {
      const { goTo } = useDeckIn();
      return <button data-testid="goto-epoch" onClick={() => goTo(0, step)} />;
    }

    const { container } = render(
      <DeckProvider stepCounts={[slide.mandateLeversSlide.steps]}>
        <SlideNumberProvider
          value={{ letter: row.letter, num: row.num, sectionKey: row.sectionKey }}
        >
          <AdvanceTo step={slide.mandateLeversSlide.canonicalPose} />
          <slide.MandateLevers />
        </SlideNumberProvider>
      </DeckProvider>,
    );
    act(() => screen.getByTestId("goto-epoch").click());
    return { html: container.innerHTML, text: container.textContent ?? "" };
  }

  afterAll(restoreLocation);

  test("byte for byte, at the fullest pose", async () => {
    // SEQUENTIALLY, not `Promise.all`. Each call re-points `window.location`, resets the
    // module registry and renders into the SAME document — run concurrently they interleave,
    // two stages share one DOM, and every query finds two elements.
    const berau = await stageFor(LEADER_VARIANTS[0]);
    const gems = await stageFor(LEADER_VARIANTS[1]);
    // MARKUP AND TEXT BOTH: an axis could move a colour token or a delay without changing a
    // word, and `textContent` alone would not see it.
    expect(berau.html).toBe(gems.html);
    expect(berau.text).toBe(gems.text);
    // Includes the fig label, so this also says the two decks compose the slide at the same
    // position — which they do, from one shared `LEADER_SLIDE_IDS`.
    expect(berau.text).toContain(`${AT.letter}.${AT.num}`);
    // Not vacuously: a stage that rendered nothing would also be equal.
    expect(berau.text).toContain(C.headline);
    expect(berau.text).toContain(LEVERS[0].label);
    expect(berau.text).toContain(LEVERS.at(-1)!.line);
    expect(berau.text).toContain(C.playbook.provenance);
    expect(berau.text).toContain(C.closer);
  });
});

// ── gh#69's build rules · the keyword register split ─────────────────────────

describe("the keyword rule", () => {
  test("exactly the prose strings carry a *Kw sibling, and every keyword is real", () => {
    // The directory's rule, stated at the top of `../../src/slides/leader-mandate/content.ts`
    // and applied here without an exception. PROSE is the headline, the four lever lines, the
    // band's statement and the closer; everything else is a LABEL.
    //
    // HELD OVER THE BLOCK'S OWN KEYS IN EVERY LAYER, so a `labelKw` cannot be added at any
    // level without failing here first.
    expect(Object.keys(C).sort()).toEqual([
      "authorities",
      "authorityHeading",
      "closer",
      "closerKw",
      "figLabel",
      "headline",
      "headlineKw",
      "levers",
      "leversHeading",
      "playbook",
    ]);
    AUTHORITIES.forEach((a) => expect(Object.keys(a).sort(), a.id).toEqual(["id", "label"]));
    expect(Object.keys(C.playbook).sort()).toEqual([
      "eyebrow",
      "provenance",
      "statement",
      "statementKw",
    ]);
    for (const [name, copy, kws] of PROSE) {
      expect(Array.isArray(kws), name).toBe(true);
      // `highlight()` is a `String.includes` match that NO-OPS SILENTLY: a typo drops a copper
      // highlight with no error anywhere.
      expect(kws.length, `${name} carries no keyword`).toBeGreaterThan(0);
      for (const kw of kws) {
        expect(copy, `${name}Kw: "${kw}" is not in its prose`).toContain(kw);
      }
    }
    // A LABEL AND A PROSE STRING MAY NOT BE THE SAME STRING, which is what makes the partition
    // above a partition rather than two overlapping lists.
    expect(new Set(printedStrings()).size).toBe(printedStrings().length);
  });

  test("every mono label renders with no emphasis, in the mono register", () => {
    // Rendered check, not an authored one: `<em>` is what a highlight IS on the stage. The
    // CITATION is the sharpest case — a copper italic inside somebody else's quoted sentence
    // is the deck emphasising a fragment of a source it is supposed to be reporting — and the
    // four AUTHORITY HEADS are the second, because they are a question the cells answer and
    // an emphasised `YOU` would answer it in ink.
    const { container, unmount } = renderSlide(4);
    for (const id of LABEL_BOXES) {
      expect(boxOf(id).querySelectorAll("em"), id).toHaveLength(0);
      // AND IN THE MONO REGISTER, which is the half that says these are labels rather than
      // short prose that happens to carry no keyword.
      expect(styleAttr(id), id).toContain("font-family: var(--mono)");
    }
    // The fig label is a label too, and the only copper text on the stage that is not mono —
    // it takes no emphasis either.
    expect(container.querySelector(".fig-label")?.querySelectorAll("em")).toHaveLength(0);
    unmount();
  });

  test("every prose box carries its highlight, one <em> per keyword", () => {
    // The other direction, and not implied by the one above: a `*Kw` array that silently
    // stopped matching leaves copy that still reads, so nothing on the stage says the emphasis
    // was lost.
    const { container, unmount } = renderSlide(4);
    for (const [id, kws] of PROSE_BOXES) {
      const ems = [...boxOf(id).querySelectorAll("em")].map((em) => em.textContent);
      expect(ems, id).toHaveLength(kws.length);
      for (const kw of kws) expect(ems, `${id} · ${kw}`).toContain(kw);
    }
    const heading = container.querySelector("h1");
    expect([...(heading?.querySelectorAll("em") ?? [])].map((em) => em.textContent)).toEqual([
      ...C.headlineKw,
    ]);
    // The four lever LINES are the sans INSTRUCTION register — a mono instruction under a mono
    // label reads as part of the label, which is exactly the collapse this slide cannot
    // afford: the label is the act's name and the line is the act.
    LEVERS.forEach((l) =>
      expect(styleAttr(`mandate-lever-line-${l.id}`), l.id).toContain("font-family: var(--sans)"),
    );
    unmount();
  });

  test("prints exactly the strings the copy block authors, and nothing else", () => {
    // The two registers checked against the STAGE, so a new string has to pick a side before
    // it can render. Every printed box's text is one of the authored strings; every authored
    // string reaches a box.
    const { container, unmount } = renderSlide(4);
    const stage = stagePrintedStrings(container);
    for (const copy of printedStrings()) {
      expect(stage.some((rendered) => rendered.includes(copy)), JSON.stringify(copy)).toBe(true);
    }
    unmount();
  });
});

// ── the geometry, as the two sides agree on it ───────────────────────────────

describe("geometry", () => {
  test("stacks board, band and closer without overlap, clear of the NavBar's hover band", () => {
    // The vertical budget, worked from the floor upward. `.nav-zone` is `bottom: 0;
    // height: 88px`, so anything under y=632 sits behind the presenter's own hover target.
    expect(HEADING_TOP).toBeLessThan(AUTHORITY_HEAD_TOP);
    expect(AUTHORITY_HEAD_TOP).toBeLessThan(HEAD_RULE_TOP);
    expect(HEAD_RULE_TOP).toBeLessThan(BOARD_TOP);
    expect(BOARD_TOP + BOARD_HEIGHT).toBeLessThan(BAND_TOP);
    expect(BAND_TOP + BAND_HEIGHT).toBeLessThan(CLOSER_TOP);
    expect(CLOSER_TOP + CLOSER_HEIGHT).toBeLessThanOrEqual(NAV_ZONE_TOP);
    expect(NAV_ZONE_CLEARANCE).toBeGreaterThan(0);
  });

  test("right-aligns the form to the content edge and splits it into equal columns", () => {
    // EQUAL WIDTH IS AN ARGUMENT, not a default: the column whose cells are filled is the same
    // width as the three whose cells are not, so the image says "one of four" rather than "the
    // important one and some others".
    const count = AUTHORITIES.length;
    expect(FORM_X + FORM_WIDTH).toBe(SIDE_MARGIN + CONTENT_WIDTH);
    expect(SIDE_MARGIN + CONTENT_WIDTH).toBe(STAGE.width - SIDE_MARGIN);
    expect(authorityColX(0, count)).toBe(FORM_X);
    expect(authorityColX(count - 1, count) + authorityColWidth(count)).toBeCloseTo(
      FORM_X + FORM_WIDTH,
      6,
    );
    // And the levers get the residue, clear of the form.
    expect(SIDE_MARGIN + LEVER_WIDTH).toBeLessThan(FORM_X);
  });

  test("lands the last lever row on the board's bottom edge, whatever the count", () => {
    // "One past the end" arithmetic — a fifth lever re-cuts the board and cannot push the band
    // down. Derived, so this holds for any count rather than for today's four.
    for (const count of [2, 4, 6]) {
      expect(leverRowTop(0, count), `${count} rows`).toBe(BOARD_TOP);
      expect(leverRowTop(count - 1, count) + LEVER_ROW_HEIGHT, `${count} rows`).toBeCloseTo(
        BOARD_TOP + BOARD_HEIGHT,
        6,
      );
    }
  });

  test("centres every cell in its column and on its row, and every mark inside its cell", () => {
    // THE WELD BETWEEN THE FIGURE AND ITS ARITHMETIC. A cell placed with a literal would pass
    // every rule above and land beside the wrong lever on a projector — the one failure this
    // figure is actually at risk of.
    const { unmount } = renderSlide(2);
    const columns = AUTHORITIES.length;
    const rows = LEVERS.length;
    AUTHORITIES.forEach((a, ai) => {
      LEVERS.forEach((l, li) => {
        const cell = boxOf(`mandate-levers-cell-${l.id}-${a.id}`);
        expect(parseFloat(cell.style.left), `${l.id}/${a.id}`).toBeCloseTo(cellX(ai, columns), 6);
        expect(parseFloat(cell.style.top), `${l.id}/${a.id}`).toBeCloseTo(cellTop(li, rows), 6);
        expect(parseFloat(cell.style.width), `${l.id}/${a.id}`).toBe(CELL_WIDTH);
        expect(parseFloat(cell.style.height), `${l.id}/${a.id}`).toBe(CELL_HEIGHT);
        if (!l.needs.includes(a.id)) return;
        const mark = boxOf(`mandate-levers-mark-${l.id}-${a.id}`);
        expect(parseFloat(mark.style.left), `${l.id}/${a.id}`).toBeCloseTo(markX(ai, columns), 6);
        expect(parseFloat(mark.style.top), `${l.id}/${a.id}`).toBeCloseTo(markTop(li, rows), 6);
        expect(parseFloat(mark.style.width), `${l.id}/${a.id}`).toBe(MARK_WIDTH);
        expect(parseFloat(mark.style.height), `${l.id}/${a.id}`).toBe(MARK_HEIGHT);
      });
      // The cell sits centred under its head rather than hugging the column's left edge,
      // which would read as belonging to the column to its left.
      expect(cellX(ai, columns) - authorityColX(ai, columns)).toBeCloseTo(
        (authorityColWidth(columns) - CELL_WIDTH) / 2,
        6,
      );
    });
    // A MARK IS A SIBLING OF ITS CELL, NOT A CHILD OF IT — the inset is the same on both
    // sides, so the hairline frame survives the fill.
    expect(MARK_WIDTH).toBe(CELL_WIDTH - 2 * MARK_INSET);
    expect(MARK_HEIGHT).toBe(CELL_HEIGHT - 2 * MARK_INSET);
    // And the lever rows are where the module puts them.
    LEVERS.forEach((_, i) =>
      expect(parseFloat(boxOf(leverId(i)).style.top), `row ${i}`).toBeCloseTo(
        leverRowTop(i, rows),
        6,
      ),
    );
    expect(parseFloat(boxOf("mandate-levers-closer").style.top)).toBe(CLOSER_TOP);
    unmount();
  });

  test("refuses a column or a row the figure does not have", () => {
    // A silently clamped column is two authority heads printed on top of one another, and a
    // clamped row is a lever drawn on top of another lever — both look deliberate on a stage,
    // which is why these throw rather than saturate.
    expect(() => authorityColX(AUTHORITIES.length, AUTHORITIES.length)).toThrow(/no column 4/);
    expect(() => authorityColX(-1, 4)).toThrow(/no column -1/);
    expect(() => authorityColWidth(1)).toThrow(/COMPARISON/);
    expect(() => leverRowTop(LEVERS.length, LEVERS.length)).toThrow(/no row 4/);
    expect(() => leverRowTop(1.5, 4)).toThrow(/no row 1.5/);
    expect(() => leverRowPitch(1)).toThrow(/no pitch/);
  });

  test("keeps every lever line and every authority head inside its budget", () => {
    // `../levers-geometry.ts` budgets exactly ONE line per lever row, so a line that wraps does
    // not overflow a box — it overlaps the row beneath it, which reads on a projector as a font
    // that failed to load. The authority head is the BINDING budget: a head that wraps pushes
    // the form's head rule down into the first lever row. Enforced on the COPY, where an author
    // can act on it, because jsdom computes no text width.
    LEVERS.forEach((l) =>
      expect(l.line.length, `lever ${l.id}: ${l.line.length} chars`).toBeLessThanOrEqual(
        LEVER_LINE_BUDGET_CHARS,
      ),
    );
    AUTHORITIES.forEach((a) =>
      expect(a.label.length, `head ${a.id}: "${a.label}"`).toBeLessThanOrEqual(
        AUTHORITY_LABEL_BUDGET_CHARS,
      ),
    );
  });

  test("no hex literal and no rgba() anywhere the figure paints", () => {
    // CSS VARS ONLY. Held over the rendered inline styles rather than over the source, so a
    // colour arriving from a helper is inside the rule too.
    const { container, unmount } = renderSlide(4);
    const styles = [...container.querySelectorAll<HTMLElement>("[data-testid^='mandate-lever']")]
      .map((el) => el.getAttribute("style") ?? "")
      .join(" ");
    expect(styles.length, "a rule over empty styles proves nothing").toBeGreaterThan(400);
    expect(styles).not.toMatch(/#[0-9a-f]{3,8}\b/i);
    expect(styles).not.toMatch(/rgba?\(/i);
    expect(styles).toMatch(/var\(--copper-500\)/);
    expect(styles).toMatch(/var\(--copper-800\)/);
    unmount();
  });
});
