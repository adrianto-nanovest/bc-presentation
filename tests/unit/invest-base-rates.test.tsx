// THE BASE RATE, AND THE DEFAULT IT PRICES · slide tests. All three poses, and the rules
// gh#70's AC states — held over EVERY authored string, over the RENDERED stage, and over
// the COMPOSED decks rather than spot-checked.
//
// WHAT THIS FILE CAN AND CANNOT PROVE — its four `leader-invest` siblings' preamble and
// `gap-hardest-part.test.tsx`'s, inherited. jsdom has no layout and no media queries, so
// nothing here measures a painted pixel and `prefers-reduced-motion: reduce` cannot really
// be toggled. What a DOM-less runner is good for is what THIS slide is actually at risk of,
// and this slide's four risks are not its siblings':
//
//   1. AN INVENTED CITATION. The pair is the ONE statistic in this deck whose research
//      names no upstream owner at all — `docs/researches/2026-07-31-hr-group-agentic-org-
//      analysis.md` line 106 files it under "Reported context" and stops. B.1 at least
//      holds "BCG / McKinsey". So the failure this slide has that no sibling has is an
//      editor "strengthening" the attribution with a consultancy, a year, a study title or
//      an `n =` that nobody ever read. It is the single worst string this deck could print
//      — an invented source, on the opening slide of the section that asks for money — and
//      it is a forbidden-token sweep, not a review note. Every pattern in that sweep is
//      FIRED against a control corpus below, because a list of regexes that match nothing
//      would pass on a fabricated citation just as happily as on an honest one.
//   2. A THIRD FIGURE ARRIVING FROM THE SAME SENTENCE. The source line reads "Reported
//      context: 25–55% productivity improvement; 78% adoption versus 6% proper
//      implementation." TWO of those three figures are on the stage. Quoting the third
//      would invent nothing and would still make this slide a second argument, which
//      gh#70's AC forbids ("no other statistic is invented around them"). Held as a shape
//      rule over every rendered string at every pose — the only number-shaped tokens on
//      this stage are the two the source gives — rather than as a check for one absent
//      string, so a DIFFERENT third figure fails here too.
//   3. THE PAIR AND ITS DRAWING DISAGREEING. The two mark fields are cut from
//      `ADOPTION_SHARE` and `IMPLEMENTATION_SHARE`, which are 0.78 and 0.06 because
//      `content.ts`'s two figure strings say 78% and 6%. Nothing at runtime reads those
//      strings — `base-rates-geometry.ts` cannot import `content.ts` at all, for the
//      documented `@/` reason — so the weld is held HERE, as a cross-module assertion, and
//      it is the failure nobody would see on a projector: a reword that moved a percentage
//      and left the field alone renders perfectly and lies.
//   4. FOUR SIBLING FIGURES NOT STEPPING. gh#70 is a HEAD-OF-RUN insert. §11's 2026-08-05
//      amendments wrote its arrival in advance — `invest-own-proof` prints D.1 and
//      `invest-chicken-egg` D.2 "until this lands", and both step one number that day — and
//      all four rows behind it move with NO EDIT to any of their files. That is §3.5 doing
//      the work, and it is a composition fact, so it is asserted against the composer and
//      not against a literal list.
//
// WHAT IS LEFT TO THE BROWSER WALK: the reduce-mode half of the zero-SMIL AC that a media
// query actually decides (held here at every pose under BOTH a reduce-matching and a
// no-preference `matchMedia` stub, plus the structural fact that makes it true by
// construction — the figure mounts no `<svg>` at all); the real wrap of the one-line
// attribution against `SOURCE_HEIGHT`'s ≈185-character budget and of the two reading
// columns against their 578px measure; the painted colour ladder, including whether 84
// `--copper-500` squares on `--surface-dark` read as a countable field rather than a mass
// at the back of a room; and whether the six marks are legible beside the seventy-eight.
import { act, cleanup, render, screen } from "@testing-library/react";
import { afterAll, afterEach, describe, expect, test, vi } from "vitest";
import { readFileSync } from "node:fs";
import { basename, resolve } from "node:path";
import {
  BRANDS,
  VARIANTS,
  type Brand,
  type DeckSetId,
  type VariantId,
} from "@/deck-variants";
import { useDeck } from "@/deck/DeckContext";
import { composeDeck } from "@/deck/compose";
import { DECK_SET_COMPOSITION } from "@/deck/deck-sets";
import { slideCatalogue } from "@/deck/slide-catalogue";
import { resolveDeckSetSlides } from "@/deck/slots";
import { SlideHarness } from "../support/slide-harness";
import { restoreLocation } from "../harvest/deck-numbering";
import {
  InvestBaseRates,
  investBaseRatesSlide,
} from "@/slides/leader-invest/invest-base-rates";
import { BaseRatesBeats } from "@/slides/leader-invest/components/BaseRatesBeats";
import { investBaseRatesContent } from "@/slides/leader-invest/content";
// THE NEIGHBOURS WHOSE VOCABULARY THIS SLIDE MAY NOT SPEND, as MODULES rather than as
// sentences copied into this file. Every boundary pattern below is fired against the real
// strings of the slide that owns it, so a list that drifted out of date fails loudly
// instead of passing vacuously — the rule `gap-three-failures.test.tsx` establishes and
// this file inherits wholesale. `NOT_AUDITED`, `ownProofFor` and `priceAnchorFor` are
// imported for the same reason on the other side: they are the SHIPPED strings that the
// invented-provenance patterns are anchored to, where a shipped string exists to anchor to.
import {
  gapHardestPartContent,
  gapLadderContent,
  gapNoSopContent,
  gapThePatternContent,
} from "@/slides/leader-gap/content";
import {
  NOT_AUDITED,
  investChickenEggContent,
  investSecurityContent,
  investSubscriptionContent,
  onPremCallbackFor,
  ownProofFor,
  priceAnchorFor,
} from "@/slides/leader-invest/content";
import {
  ADOPTION_COUNT,
  ADOPTION_FIELD_HEIGHT,
  ADOPTION_LABEL_TOP,
  ADOPTION_SHARE,
  ADOPTION_TOP,
  CLOSER_HEIGHT,
  CLOSER_TOP,
  CONTENT_TOP,
  CONTENT_WIDTH,
  EYEBROW_HEIGHT,
  FIELD_COLS,
  FIELD_LEFT,
  FIELD_WIDTH,
  FIGURE_COL_WIDTH,
  FIGURE_HEIGHT,
  IMPLEMENTATION_COUNT,
  IMPLEMENTATION_FIELD_HEIGHT,
  IMPLEMENTATION_LABEL_TOP,
  IMPLEMENTATION_SHARE,
  IMPLEMENTATION_TOP,
  MARK_PITCH,
  MARK_SIZE,
  NAV_ZONE_CLEARANCE,
  NAV_ZONE_TOP,
  PER_HUNDRED,
  READING_COL_COUNT,
  READING_COL_WIDTH,
  READING_EYEBROW_TOP,
  READING_LINE_HEIGHT,
  READING_LINE_TOP,
  RULE_HEIGHT,
  RULE_TOP,
  SIDE_MARGIN,
  SOURCE_HEIGHT,
  SOURCE_TOP,
  STAGE,
  STATISTIC_EYEBROW_TOP,
  fieldHeight,
  fieldRows,
  fieldWidth,
  markLeft,
  markTop,
  readingColLeft,
} from "@/slides/leader-invest/base-rates-geometry";

const C = investBaseRatesContent;
const POSES = [0, 1, 2] as const;
const SLIDE_ID = "invest-base-rates";
const LEADER_BRANDS: readonly Brand[] = ["berau", "gems"];

/**
 * The four slides this one composes in front of, in the order §6.7 gives them.
 *
 * A LIST OF IDS AND NOT OF FIGURES. Every number those four print is derived per deck
 * (§3.5) and gh#70's own ticket may pin none of them — so what is written down here is the
 * ORDER, which is a composition fact this file reads off `DECK_SET_COMPOSITION`, and the
 * figures are computed from the composer in `the composed decks` below.
 */
const SIBLING_IDS: readonly string[] = [
  "invest-own-proof",
  "invest-chicken-egg",
  "invest-security",
  "invest-subscription",
];

/**
 * The position this slide holds in the decks that will run it.
 *
 * `at` IS required here, the case all four `leader-invest` siblings and all five
 * `leader-gap` ones document: unit tests resolve the default `general` deck, `general` has
 * no leader variant, and this slide reaches the two leader deck sets alone. D.1 because
 * `invest` is the leader decks' fourth run (§4.3) and this slide composes at its head — a
 * harness INPUT, not a claim the slide makes (§3.5), and the composed decks below are where
 * that pair is actually derived and checked. No file under `src/slides/leader-invest/` names
 * either half of it, which is the rule the derived-numbering block holds.
 */
const AT = { letter: "D", num: 1, sectionKey: "invest" } as const;

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
    <SlideHarness def={investBaseRatesSlide} at={AT}>
      <Nav />
      <InvestBaseRates />
    </SlideHarness>,
  );
  if (pose > 0) goToPose(pose);
  return out;
}

function goToPose(pose: number) {
  act(() => screen.getByTestId(`goto-${pose}`).click());
}

// ── the boxes, by pose ───────────────────────────────────────────────────────
//
// THIRTEEN BOXES AND EIGHTY-FOUR MARKS, and the two are kept apart everywhere below. A
// mark is not a box: it carries no reveal of its own, no text and no identity — it is one
// unit of a quantity, and the figure's own doc comment says why (a field arrives as ONE
// `Reveal`, because seventy-eight of them at the section's 90ms stagger would take seven
// seconds and the claim is the SIZE of the crowd, not the order it turned up in). Every
// census, sweep and bounds check below therefore splits the two rather than counting 97
// elements and hoping.

const POSE_0_IDS = [
  "base-rates-eyebrow",
  "base-rates-source",
  "base-rates-adoption-figure",
  "base-rates-adoption-label",
  "base-rates-adoption-field",
  "base-rates-implementation-figure",
  "base-rates-implementation-label",
  "base-rates-implementation-field",
];
const POSE_1_IDS = [
  "base-rates-rule",
  "base-rates-reading-eyebrow",
  "base-rates-adoption-reading",
  "base-rates-implementation-reading",
];
const POSE_2_IDS = ["base-rates-closer"];

const REVEALED_AT: ReadonlyArray<readonly string[]> = [POSE_0_IDS, POSE_1_IDS, POSE_2_IDS];

const EVERY_BOX = REVEALED_AT.flat();

/** The two mark hooks. Named once so the split above cannot be quietly widened. */
const ADOPTION_MARK = "base-rates-adoption-mark";
const IMPLEMENTATION_MARK = "base-rates-implementation-mark";
const MARK_IDS = new Set([ADOPTION_MARK, IMPLEMENTATION_MARK]);

/** The three boxes with no text of their own — the copper rule's wrapper and the two field
 *  wrappers, whose entire content is marks. Named once, so the "the copy is there, not
 *  merely the box" checks below cannot be quietly widened. */
const TEXTLESS_IDS = new Set([
  "base-rates-rule",
  "base-rates-adoption-field",
  "base-rates-implementation-field",
]);

/**
 * The element whose class carries a box's reveal — the sibling files' two-shape reader.
 * Every box but one IS a `Reveal`; `base-rates-rule`'s testid sits on a positioned wrapper
 * around a `CopperRule`, because that primitive spreads no `data-*` props.
 */
function fade(id: string): HTMLElement {
  const el = screen.getByTestId(id);
  if (el.classList.contains("fade")) return el;
  const inner = el.querySelector<HTMLElement>(".copper-rule");
  if (!inner) {
    throw new Error(
      `"${id}" is neither a .fade box nor a wrapper around a .copper-rule — the ` +
        `renderer's hook or its primitive changed.`,
    );
  }
  return inner;
}

const revealed = (id: string) => fade(id).classList.contains("on");

/** How many milliseconds into its pose a box arrives. Throws on an unrevealed box —
 *  `Reveal` zeroes `transitionDelay` while `on` is false, so there is no arrival. */
function arrival(id: string): number {
  const el = fade(id);
  if (!el.classList.contains("on")) {
    throw new Error(`"${id}" is not revealed at this pose, so it has no arrival`);
  }
  const ms = parseFloat(el.style.transitionDelay);
  if (!Number.isFinite(ms)) {
    throw new Error(`"${id}" carries no readable transitionDelay`);
  }
  return ms;
}

/** This slide's own boxes, marks excluded — thirteen elements at every pose. */
function stageBoxes(container: HTMLElement): HTMLElement[] {
  return [...container.querySelectorAll<HTMLElement>("[data-testid^='base-rates-']")].filter(
    (el) => !MARK_IDS.has(el.dataset.testid ?? ""),
  );
}

/** One field's marks, in DOM order. */
function marksOf(container: HTMLElement, testId: string): HTMLElement[] {
  return [...container.querySelectorAll<HTMLElement>(`[data-testid='${testId}']`)];
}

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

// ── the copy, as one set of strings ──────────────────────────────────────────

/** Every string reachable from `value` — the walk, not a hand list, for the sibling files'
 *  reason: a field added next month is inside every rule below the day it exists. */
function walkStrings(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) for (const item of value) walkStrings(item, out);
  else if (value !== null && typeof value === "object") {
    for (const item of Object.values(value)) walkStrings(item, out);
  }
  return out;
}

/** Every string this slide can put on a stage. ONE block, because this slide has no brand
 *  axis at all — see the `no brand variance` describe, which holds that as a rule rather
 *  than assuming it here. */
const authoredStrings = (): string[] => walkStrings(C);

/**
 * The FOUR PROSE strings, each with the `*Kw` sibling the copy module pairs it with.
 *
 * Four and not five: the two readings are prose, the headline is prose, the closer is
 * prose, and the ATTRIBUTION is not — it is a citation, and `highlight()` on one would read
 * as the deck editing its own source line. That single decision is the whole of why this
 * partition is worth writing down.
 */
const PROSE: ReadonlyArray<readonly [string, string, readonly string[]]> = [
  ["headline", C.headline, C.headlineKw],
  ["adoptionReading", C.adoptionReading, C.adoptionReadingKw],
  ["implementationReading", C.implementationReading, C.implementationReadingKw],
  ["closer", C.closer, C.closerKw],
];

/** The EIGHT LABEL strings, which carry no `*Kw` and may not gain one. Written out as a
 *  list on purpose: together with `PROSE` it is checked against what the STAGE actually
 *  prints, so a thirteenth printed string has to pick a side before it can render. */
const LABELS: readonly string[] = [
  C.figLabel,
  C.statisticEyebrow,
  C.statisticSource,
  C.adoptionFigure,
  C.adoptionLabel,
  C.implementationFigure,
  C.implementationLabel,
  C.readingEyebrow,
];

/** Every string this slide PRINTS — the two sides of the keyword rule, together. */
const printedStrings = (): string[] => [...PROSE.map(([, copy]) => copy), ...LABELS];

/** What the stage prints, read off the DOM: the headline, the fig label's own half, and
 *  every box that carries type. The two field wrappers and the rule carry none. */
function stagePrintedStrings(container: HTMLElement): string[] {
  const heading = container.querySelector("h1")?.textContent ?? "";
  const boxes = stageBoxes(container)
    .map((el) => el.textContent ?? "")
    .filter((text) => text !== "");
  return [heading, figLabelText(container), ...boxes];
}

// ── the source files, read from disk ─────────────────────────────────────────
//
// THREE FILES, AND THE RULES BELOW ARE ABOUT WHAT IS WRITTEN IN THEM rather than about what
// reaches the DOM. Two of gh#70's build rules cannot be checked any other way: "no hex
// literals" is a claim about a colour that is never authored, so a stage that happens to
// paint none today would pass a DOM sweep while a hex sat one branch away; and "imports no
// `VARIANT`" is a claim about a module's imports, which do not render.

const INVEST_DIR = resolve(__dirname, "../../src/slides/leader-invest");
const SLIDE_FILE = resolve(INVEST_DIR, "invest-base-rates.tsx");
const FIGURE_FILE = resolve(INVEST_DIR, "components/BaseRatesBeats.tsx");
const GEOMETRY_FILE = resolve(INVEST_DIR, "base-rates-geometry.ts");
const SOURCE_FILES: ReadonlyArray<readonly [string, string]> = [
  ["invest-base-rates.tsx", SLIDE_FILE],
  ["components/BaseRatesBeats.tsx", FIGURE_FILE],
  ["base-rates-geometry.ts", GEOMETRY_FILE],
];

const sourceOf = (file: string): string => readFileSync(file, "utf8");

/** Block and line comments removed, so a doc comment that NAMES the construction it forbids
 *  is not counted as that construction. `f8-your-agentic-os.test.tsx`'s stripper, reused
 *  rather than re-invented; the `[^:]` guard is what keeps `https://` intact. */
function stripComments(src: string): string {
  return src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:])\/\/.*$/gm, "$1");
}

// ── the slide def ────────────────────────────────────────────────────────────

describe("the slide def", () => {
  test("declares 3 poses with the fullest one canonical, and claims a number", () => {
    // THE ID IS THE FILE'S BASENAME, checked against the file this test actually reads
    // rather than against a second copy of the string. §4.1's slot lookup joins the
    // deck-set lists to the catalogue by id, and `deck-slide-ids.test.ts` holds the rule
    // deck-wide; what is added here is that the file the rule points at EXISTS, because
    // `readFileSync` below would throw if it did not.
    expect(investBaseRatesSlide.id).toBe(basename(SLIDE_FILE, ".tsx"));
    expect(investBaseRatesSlide.id).toBe(SLIDE_ID);
    expect(sourceOf(SLIDE_FILE).length).toBeGreaterThan(1000);

    expect(investBaseRatesSlide.steps).toBe(3);
    // The exported PDF and PPTX have no presenter attached, so the exported frame must be
    // the one that is safe to read alone. Anything lower would export a stage whose largest
    // objects are two of somebody else's percentages with no sentence saying what this deck
    // concludes from them — and for THIS slide in particular that is the one way it travels
    // badly: a page that shows a base rate and asks for nothing is a page somebody else can
    // re-caption.
    expect(investBaseRatesSlide.canonicalPose).toBe(2);
    expect(investBaseRatesSlide.canonicalPose).toBe(investBaseRatesSlide.steps - 1);
    expect(investBaseRatesSlide.animationMode).toBe("step-reveal");
    expect(investBaseRatesSlide.surface).toBe("dark");
    expect(investBaseRatesSlide.sectionKey).toBe("invest");

    // `numbered` IS NOT SET, AND ITS ABSENCE IS THE ASSERTION. The composer reads
    // `def.numbered !== false` (§3.4 R3), so `numbered: false` would make this slide claim
    // no figure — and `FigLabel` throws on a slide that prints a caption with `num === null`
    // (`src/components/FigLabel.tsx`). Setting it here would therefore turn the head of the
    // WHY INVEST run into a crash, and setting it `true` would be the one field in this
    // file that restated a default. Held as a key absence AND as the composed consequence
    // below, where the row's `num` comes back as 1 rather than null.
    expect("numbered" in investBaseRatesSlide).toBe(false);
    expect(investBaseRatesSlide.numbered).toBeUndefined();
  });

  test("canonicalPose is the FULLEST pose — every box on the stage is revealed at it", () => {
    // "Fullest" is a claim about the reveal state and not about the pose index, so it is
    // checked as one: at the exported pose every one of the thirteen boxes is `on`. A pose
    // map that grew a fourth band without moving `canonicalPose` would export a stage with
    // its conclusion missing, and that is exactly the export failure the pose is chosen for.
    const { unmount } = renderSlide(investBaseRatesSlide.canonicalPose);
    for (const id of EVERY_BOX) expect(revealed(id), id).toBe(true);
    unmount();
  });
});

describe("the pose count the component actually distinguishes", () => {
  test("is exactly 3 — poses 0, 1 and 2 differ, and there is no fourth", () => {
    // `steps` IS A CONTRACT WITH `DeckProvider`, and nothing else checks that the number in
    // the def is the number of stages the figure draws. Held by rendering the figure BARE at
    // four pose indices and comparing markup: 0 → 1 → 2 must each change the stage, and 3
    // must change nothing, because the figure's two gates are `pose >= 1` and `pose >= 2`.
    //
    // A `steps: 4` with no fourth gate would give the room a dead click at the end of the
    // slide; a fourth gate with `steps: 3` would hide a band the author wrote. Both fail
    // here, and neither fails anywhere else in the suite.
    const markup = [0, 1, 2, 3].map((pose) => {
      const { container, unmount } = render(<BaseRatesBeats pose={pose} />);
      const html = container.innerHTML;
      unmount();
      return html;
    });
    expect(markup[0]).not.toBe(markup[1]);
    expect(markup[1]).not.toBe(markup[2]);
    expect(markup[2]).toBe(markup[3]);
    expect(new Set(markup).size).toBe(investBaseRatesSlide.steps);
    // Not vacuously: the figure renders something at every one of them.
    for (const html of markup) expect(html.length).toBeGreaterThan(2000);
  });
});

// ── AC · the statistic pair ──────────────────────────────────────────────────

describe("the pair, and only the pair", () => {
  test("prints 78% and 6% verbatim, as the source's own two rates", () => {
    // PINNED WHOLE, not by `toContain`. These two strings are somebody else's quantities
    // quoted verbatim from `docs/researches/2026-07-31-hr-group-agentic-org-analysis.md`
    // line 106 ("78% adoption versus 6% proper implementation"), and the edits that break a
    // quoted figure are the invisible ones — a rounded 80, a "~6%", a "6 per cent".
    expect(C.adoptionFigure).toBe("78%");
    expect(C.implementationFigure).toBe("6%");
    // Each figure is a NUMBER AND NOTHING ELSE, so the label beside it carries the subject.
    // A figure string that grew its own predicate ("78% have adopted AI") would put the
    // claim inside the 36px mono register, where the deck's type ladder says QUANTITY.
    expect(C.adoptionFigure).toMatch(/^\d+%$/);
    expect(C.implementationFigure).toMatch(/^\d+%$/);
    // …and the two labels are the predicates, in the source's own terms: adoption against
    // PROPER implementation. Dropping "PROPERLY" would collapse the pair into one rate
    // measured twice, which is the misreading the whole slide exists to prevent.
    expect(C.adoptionLabel).toBe("HAVE ADOPTED AI");
    expect(C.implementationLabel).toBe("HAVE IMPLEMENTED IT PROPERLY");
    expect(C.implementationLabel).toMatch(/PROPERLY/);
  });

  test("renders both figures unedited and unhighlighted, from pose 0", () => {
    const { unmount } = renderSlide(0);
    for (const [id, copy] of [
      ["base-rates-adoption-figure", C.adoptionFigure],
      ["base-rates-implementation-figure", C.implementationFigure],
      ["base-rates-adoption-label", C.adoptionLabel],
      ["base-rates-implementation-label", C.implementationLabel],
    ] as const) {
      const box = screen.getByTestId(id);
      expect(box.textContent, id).toBe(copy);
      expect(revealed(id), id).toBe(true);
      // NOT A COPPER ITALIC INSIDE A QUANTITY — the keyword rule's sharpest case anywhere in
      // `leader-invest/content.ts`. An `<em>` here would emphasise a FRAGMENT of a number.
      expect(box.querySelector("em"), `<em> inside ${id}`).toBeNull();
    }
    // Each figure and its own label share ONE step: a percentage without the thing it is a
    // percentage OF is not a fact yet, so the two never arrive apart.
    expect(arrival("base-rates-adoption-figure")).toBe(arrival("base-rates-adoption-label"));
    expect(arrival("base-rates-implementation-figure")).toBe(
      arrival("base-rates-implementation-label"),
    );
    unmount();
  });

  test("draws each rate as the number of organizations it counts, on one shared unit", () => {
    // THE FIGURE IS THE PAIR, TWICE — and the second telling is what makes "6%" stop reading
    // as a rhetorical number. Held as three facts: the counts, the shared unit, and the
    // shared grid. Everything about the lower row is identical to the upper one except HOW
    // MANY, which is the only difference the source states ("78% adoption VERSUS 6% proper
    // implementation" — never "of which").
    const { container, unmount } = renderSlide(0);
    const adoption = marksOf(container, ADOPTION_MARK);
    const implementation = marksOf(container, IMPLEMENTATION_MARK);
    expect(adoption).toHaveLength(78);
    expect(implementation).toHaveLength(6);
    for (const mark of [...adoption, ...implementation]) {
      expect(parseFloat(mark.style.width)).toBe(MARK_SIZE);
      expect(parseFloat(mark.style.height)).toBe(MARK_SIZE);
      // ONE TIER FOR BOTH FIELDS. Colouring the small field differently would claim either
      // a different kind of object or a subset relation, and the deck holds neither.
      expect(mark.style.background).toBe("var(--copper-500)");
    }
    // NO THIRD QUANTITY IS DRAWN. Painting the twenty-two that adopted nothing would put a
    // number on the stage that the source never states, which gh#70's AC forbids as firmly
    // as it forbids printing one.
    expect(adoption.length + implementation.length).toBe(84);
    expect(adoption.length + implementation.length).not.toBe(PER_HUNDRED);
    unmount();
  });
});

// ── AC · the source is ON the slide, and claims nothing it cannot ────────────

describe("the attribution", () => {
  test("says where the pair was read and stops there", () => {
    expect(C.statisticSource).toBe(
      "Reported as context in the group HR agentic-organization deck, which names no " +
        "upstream study — a pair this deck quotes rather than measures.",
    );
    // THE THREE THINGS IT DOES CLAIM, spelled out so a failure above says which half moved:
    // where we read it, that the deck we read it in names no upstream owner, and that this
    // deck quotes rather than measures.
    expect(C.statisticSource).toMatch(/group HR agentic-organization deck/);
    expect(C.statisticSource).toMatch(/names no upstream study/);
    expect(C.statisticSource).toMatch(/quotes rather than measures/);
    // AND THE WORD "STUDY" APPEARS ONLY IN THE DENIAL OF ONE. A blanket ban would fail the
    // honest sentence; what is actually forbidden is the word applied to something we hold,
    // so the rule is that every occurrence of it in this slide's copy sits inside the phrase
    // that says there is none. `content.ts`'s block header states it in exactly these terms.
    for (const copy of authoredStrings()) {
      const hits = [...copy.matchAll(/\bstud(?:y|ies)\b/gi)];
      if (hits.length === 0) continue;
      expect(hits.length, `more than one "study" in ${JSON.stringify(copy)}`).toBe(1);
      expect(copy, `"study" outside the denial in ${JSON.stringify(copy)}`).toContain(
        "names no upstream study",
      );
    }
  });

  test("renders ON the slide, and BEFORE either percentage", () => {
    // THE AC's SECOND CLAUSE IS A RENDERING FACT, not a copy fact: "78% and 6% render with
    // their source attributed ON-slide". So it is checked in the SAME rendered tree as the
    // two figures — a footnote in another component, a presenter note or a comment would all
    // satisfy a copy check and none of them reaches a projector.
    const { container, unmount } = renderSlide(0);
    const box = screen.getByTestId("base-rates-source");
    expect(box.textContent).toBe(C.statisticSource);
    expect(revealed("base-rates-source")).toBe(true);
    expect(container.contains(box)).toBe(true);
    expect(container.contains(screen.getByTestId("base-rates-adoption-figure"))).toBe(true);
    expect(container.contains(screen.getByTestId("base-rates-implementation-figure"))).toBe(true);
    // A CITATION IS NOT A QUOTATION: it carries no emphasis either, so the deck can never be
    // read as editing its own attribution.
    expect(box.querySelector("em")).toBeNull();

    // AND IT IS BOUND TO THE PAIR IN TIME, which is the half a static check cannot see. The
    // attribution arrives SECOND — after the eyebrow that says what is being attributed and
    // before BOTH percentages — so no frame of this slide ever shows an unattributed number.
    // That is one step earlier than B.1 puts its own citation, and the reason is the
    // provenance: when the strongest thing sayable about a figure is where it was read, the
    // stage says it first.
    const sourceAt = arrival("base-rates-source");
    expect(sourceAt).toBeGreaterThan(arrival("base-rates-eyebrow"));
    expect(sourceAt).toBeLessThan(arrival("base-rates-adoption-figure"));
    expect(sourceAt).toBeLessThan(arrival("base-rates-implementation-figure"));
    unmount();

    // AND ABOVE THEM ON THE STAGE, not merely earlier in time — the geometric half of the
    // same decision, and the opposite of B.1's arrangement.
    expect(SOURCE_TOP).toBeLessThan(ADOPTION_TOP);
    expect(SOURCE_TOP).toBeLessThan(IMPLEMENTATION_TOP);
  });

  test("the eyebrow declares the unit before a single mark is drawn", () => {
    // A FIELD OF MARKS WITH NO STATED UNIT IS DECORATION. The eyebrow is the one string that
    // carries the denominator, and it carries it in WORDS — "IN A HUNDRED" — which is what
    // lets the stage state its own unit without printing a third numeral.
    expect(C.statisticEyebrow).toBe(
      "THE REPORTED BASE RATE · ONE MARK IS ONE ORGANIZATION IN A HUNDRED",
    );
    expect(C.statisticEyebrow).toContain("ONE MARK IS ONE ORGANIZATION");
    expect(C.statisticEyebrow).toContain("IN A HUNDRED");
    expect(C.statisticEyebrow).not.toMatch(/\d/);
    expect(C.statisticEyebrow).toMatch(/REPORTED/);

    const { unmount } = renderSlide(0);
    expect(screen.getByTestId("base-rates-eyebrow").textContent).toBe(C.statisticEyebrow);
    const eyebrowAt = arrival("base-rates-eyebrow");
    for (const id of POSE_0_IDS.filter((x) => x !== "base-rates-eyebrow")) {
      expect(arrival(id), `${id} arrives before the unit is declared`).toBeGreaterThan(eyebrowAt);
    }
    unmount();
  });
});

// ── AC · no other statistic is invented around the pair ──────────────────────

/**
 * The 25–55% productivity improvement, one regex per spelling it could arrive in.
 *
 * IT IS IN THE SAME SOURCE SENTENCE AS THE PAIR, which is exactly why it needs a rule. The
 * whole of line 106 reads "Reported context: 25–55% productivity improvement; 78% adoption
 * versus 6% proper implementation." Quoting the third figure would INVENT NOTHING — it is
 * as sourced as the other two — and would still make this slide two arguments, so gh#70's
 * "no other statistic is invented around them" is enforced here as a hard absence rather
 * than left to a reviewer noticing a plausible number.
 *
 * The source spells the range with an EN DASH, which is why only that spelling is in the
 * fired list below; the hyphen form has no source sentence to fire against and is kept in a
 * bucket of its own rather than quietly padded in beside the rest.
 */
const THIRD_FIGURE: ReadonlyArray<readonly [string, RegExp]> = [
  ["25", /\b25\b/],
  ["55", /\b55\b/],
  ["25–55, en dash", /\b25\s*–\s*55\b/],
  ["productivity", /\bproductivit\w*\b/i],
  ["improvement", /\bimprovement\b/i],
];

/**
 * The hyphen spelling of the same range — refused, and with NO source sentence to fire
 * against, said out loud rather than padded into the list above.
 *
 * `gap-three-failures.test.tsx` keeps the same split for the same reason: a regex that
 * fires on nothing would make the rule it belongs to pass on copy lifted verbatim, so a
 * pattern whose control corpus does not spell it has to be declared, not hidden. The
 * research writes "25–55%" with an en dash; a hyphen is what a copy edit produces on the way
 * in, and at the back of a room the two render identically — so the form is refused here and
 * its ABSENCE from the source line is asserted below, which is what makes this bucket a
 * measurement rather than an excuse.
 */
const THIRD_FIGURE_UNSOURCED: ReadonlyArray<readonly [string, RegExp]> = [
  ["25-55, hyphen", /\b25\s*-\s*55\b/],
];

/** The research's own sentence, transcribed from
 *  `docs/researches/2026-07-31-hr-group-agentic-org-analysis.md` line 106 on 2026-08-08 —
 *  the control corpus for the patterns above, and the same call `gap-three-failures.test.tsx`
 *  makes for §6.3's cut outcomes: a control written to make a regex fire proves the writing,
 *  not the pattern. */
const SOURCE_LINE =
  "Reported context: 25–55% productivity improvement; 78% adoption versus 6% proper " +
  "implementation.";

describe("no other statistic is invented around the pair", () => {
  test("the only number-shaped tokens on the stage are 78% and 6%, at every pose", () => {
    // A SHAPE RULE AND NOT A LIST OF ABSENT STRINGS. Checking for the one figure this slide
    // is most likely to gain would miss the second most likely; sweeping every digit off the
    // rendered stage catches any of them, including one nobody thought of.
    //
    // THE FIG LABEL IS STRIPPED FIRST and it is the only thing stripped: it prints "FIG.
    // D.1", which is the COMPOSER's number and not this slide's to author (§3.5). Everything
    // else that renders is inside the sweep.
    //
    // RUN AT EVERY POSE, which is worth saying why: `Reveal` mounts its children whatever
    // its `on` state, so today's box tree is pose-invariant and the sweep would pass at pose
    // 0 alone. A future gate that MOUNTED conditionally — the obvious way somebody adds a
    // fourth band — would put a string on the stage that only the later poses see, and the
    // sweep already covers it.
    const { container, unmount } = renderSlide(0);
    for (const pose of POSES) {
      goToPose(pose);
      const stage = stageTextWithoutFigLabel(container);
      expect(stage.length, `pose ${pose}: a sweep over an empty stage proves nothing`).toBeGreaterThan(
        400,
      );
      const numerals = [...stage.matchAll(/\d[\d.,]*\s*%?/g)].map((m) => m[0].trim());
      expect(numerals.sort(), `number-shaped tokens at pose ${pose}`).toEqual(["6%", "78%"]);
      // AND THE FIG LABEL REALLY WAS THERE TO STRIP, so the sweep cannot be passing because
      // it was handed an empty document.
      expect(container.querySelector(".fig-label")?.textContent).toContain(
        `${AT.letter}.${AT.num}`,
      );
    }
    unmount();
  });

  test("the two figure strings are the ONLY authored strings carrying a digit", () => {
    // The copy-side half of the same rule, and it catches what the DOM sweep cannot: an
    // authored string that carries a figure and does not render TODAY. A field added to the
    // block next month is inside this the day it exists, because `authoredStrings()` walks
    // rather than lists.
    const withDigits = authoredStrings().filter((copy) => /\d/.test(copy));
    expect(withDigits.sort()).toEqual([C.adoptionFigure, C.implementationFigure].sort());
  });

  test("the 25–55% productivity figure from the same source sentence is ABSENT", () => {
    const { container, unmount } = renderSlide(investBaseRatesSlide.canonicalPose);
    const stage = stageTextWithoutFigLabel(container);
    for (const [name, pattern] of [...THIRD_FIGURE, ...THIRD_FIGURE_UNSOURCED]) {
      for (const copy of authoredStrings()) {
        expect(pattern.test(copy), `"${name}" in ${JSON.stringify(copy)}`).toBe(false);
      }
      expect(pattern.test(stage), `"${name}" reached the stage`).toBe(false);
    }
    unmount();

    // EVERY PATTERN STILL FIRES ON THE RESEARCH SENTENCE IT WAS READ OFF. Five regexes that
    // matched nothing would make the rule above pass on copy lifted straight from line 106.
    for (const [name, pattern] of THIRD_FIGURE) {
      expect(pattern.test(SOURCE_LINE), `"${name}" no longer fires on the source line`).toBe(true);
    }
    // …and the hyphen spelling is excluded BY MEASUREMENT rather than by assertion: the
    // source really does use an en dash, so this pattern really does have nothing to fire
    // against, and the day the research is re-transcribed with a hyphen it moves buckets.
    for (const [name, pattern] of THIRD_FIGURE_UNSOURCED) {
      expect(
        pattern.test(SOURCE_LINE),
        `"${name}" is documented as having no source sentence`,
      ).toBe(false);
    }
    // …and the control line really is the one that carries this slide's own pair, so the
    // transcription above is the sentence it claims to be and not a paraphrase.
    expect(SOURCE_LINE).toContain(`${C.adoptionFigure} adoption`);
    expect(SOURCE_LINE).toContain(`${C.implementationFigure} proper implementation`);
  });
});

// ── AC · the attribution invents no provenance ───────────────────────────────

/**
 * Everything the attribution may NOT claim, one regex each.
 *
 * WHY THIS LIST IS LONGER THAN B.1's. `gap-hardest-part` quotes a statistic the research
 * names an upstream owner for and prints "Reported by BCG / McKinsey"; its own test forbids
 * only a date and a URL, because the publisher is real. THIS PAIR HAS NO NAMED OWNER AT ALL
 * — the research files it under "Reported context" — so every one of those categories is a
 * fabrication waiting to be typed, and the honest ceiling is WHERE WE READ IT.
 * `content.ts`'s block header states the ban in prose ("It must never gain a consultancy, a
 * year, an `n =`, or the word `study` applied to anything but the absence of one"); this is
 * that sentence, made checkable.
 *
 * THE FAILURE MODE IS INVENTION, NOT LEAKAGE, and that changes what a control corpus can be
 * — see `PROVENANCE_CONTROLS`.
 */
const INVENTED_PROVENANCE: ReadonlyArray<readonly [string, RegExp]> = [
  ["BCG", /\bBCG\b/],
  ["McKinsey", /\bMcKinsey\b/i],
  ["Bain", /\bBain\b/i],
  ["Gartner", /\bGartner\b/i],
  ["Forrester", /\bForrester\b/i],
  ["IDC", /\bIDC\b/],
  ["Deloitte", /\bDeloitte\b/i],
  ["Accenture", /\bAccenture\b/i],
  ["PwC", /\bPwC\b/i],
  ["KPMG", /\bKPMG\b/i],
  ["EY", /\bEY\b/],
  ["Capgemini", /\bCapgemini\b/i],
  ["MIT", /\bMIT\b/],
  ["Sloan", /\bSloan\b/i],
  ["Harvard", /\bHarvard\b/i],
  ["Stanford", /\bStanford\b/i],
  ["Google", /\bGoogle\b/i],
  ["Microsoft", /\bMicrosoft\b/i],
  ["a four-digit year", /\b(19|20)\d{2}\b/],
  ["an ISO read date", /\b\d{4}-\d{2}-\d{2}\b/],
  ["a sample size", /\bn\s*=\s*\d/i],
  ["respondents", /\brespondents?\b/i],
  ["a survey", /\bsurvey\w*\b/i],
  ["a sample", /\bsampl\w*\b/i],
  ["a URL", /https?:\/\/|www\.|\.com\b|\bdoi\./i],
  ["a page or slide citation", /\b(?:p\.|pp\.|page|slide)\s*\d/i],
  ["a quoted title", /["“][^"”]{8,}["”]/],
  ["according to", /\baccording to\b/i],
  ["as reported by", /\bas reported by\b/i],
  ["published", /\bpublish\w*\b/i],
  ["a benchmark", /\bbenchmark\w*\b/i],
  ["independently", /\bindependent\w*\b/i],
  ["audited", /\baudit\w*\b/i],
];

/**
 * The SHIPPED strings the patterns above are anchored to, imported rather than transcribed.
 *
 * Four real attributions from three slides in this deck, each of which legitimately carries
 * something this slide may not: B.1's names its two consultancies and calls its figure a
 * benchmark; D.5's Berau anchor carries a read date, which is both a four-digit year and an
 * ISO date; `NOT_AUDITED` is the negation D.2 prints on four rows; and D.2's GEMS source
 * line names a publisher and calls the story published. Anchoring to them is what keeps the
 * list honest in the one direction a fabricated control cannot: these patterns demonstrably
 * fire on real deck copy, so the sweep is not testing a straw man.
 */
/** D.5's Berau anchor line, narrowed to the arm that carries an attribution at all.
 *  `PriceAnchor` is a discriminated union whose `no-organisation` arm has no `source` field,
 *  so the narrow is a type requirement rather than a courtesy — `invest-subscription.test.tsx`
 *  makes the same one — and the throw names the arm, so a re-shaped union fails here by
 *  name instead of quietly handing this file an empty control. */
function berauAnchorSource(): string {
  const anchor = priceAnchorFor("berau");
  if (anchor.kind !== "organizer-prize") {
    throw new Error(
      `the Berau price anchor is no longer an "organizer-prize" arm (it is ` +
        `"${anchor.kind}"), so it carries no attribution for the year and read-date ` +
        `patterns below to be anchored to.`,
    );
  }
  return anchor.source;
}

const SHIPPED_PROVENANCE: readonly string[] = [
  gapHardestPartContent.statisticSource,
  berauAnchorSource(),
  NOT_AUDITED,
  ...walkStrings(ownProofFor("gems")),
];

/**
 * The FABRICATIONS — and the fact that they had to be written here is the point.
 *
 * `gap-three-failures.test.tsx` fires its cut-outcome list against the research's own
 * sentences, because those outcomes EXIST somewhere and the risk is that one leaks back in.
 * The risk on this slide is the opposite: the tokens below exist NOWHERE — not in the
 * research, not in the spec, not in this repo — because nobody ever read them. A control
 * corpus drawn from a source is therefore impossible for most of this list, and padding the
 * list down to what a source can fire would delete exactly the entries that matter.
 *
 * So the corpus is four invented citations, written once, in a test file, marked as
 * inventions. They are the sentences this slide must never print, and they are here rather
 * than anywhere near `src/`.
 */
const FABRICATED_CITATIONS: readonly string[] = [
  "Reported by BCG and McKinsey; Bain, Gartner, Forrester and IDC report the same.",
  "Deloitte, Accenture, PwC, KPMG, EY and Capgemini surveyed 1,200 respondents (n = 1,200).",
  "MIT Sloan Management Review, Harvard and Stanford published the finding in 2024.",
  'According to "The Agentic Organization Benchmark", as reported by Google and ' +
    "Microsoft — independently audited on a random sample. See https://example.com/r.pdf, " +
    "p. 14, slide 3, read 2026-08-08.",
];

const PROVENANCE_CONTROLS: readonly string[] = [
  ...SHIPPED_PROVENANCE,
  ...FABRICATED_CITATIONS,
];

describe("the attribution invents no provenance", () => {
  test("names no publisher, no consultancy, no study title, no year and no sample", () => {
    const authored = authoredStrings();
    expect(authored.length, "a rule over an empty set proves nothing").toBeGreaterThan(14);

    const { container, unmount } = renderSlide(investBaseRatesSlide.canonicalPose);
    // THE WHOLE STAGE, fig label included this time. The rule is about what a room can read,
    // and the fig label is rendered text like any other; it carries a letter and a number
    // and nothing that looks like a source.
    const stage = container.textContent ?? "";
    expect(stage.length, "a rule over an empty stage proves nothing").toBeGreaterThan(400);
    for (const [name, pattern] of INVENTED_PROVENANCE) {
      for (const copy of authored) {
        expect(pattern.test(copy), `invented "${name}" in ${JSON.stringify(copy)}`).toBe(false);
      }
      expect(pattern.test(stage), `invented "${name}" reached the stage`).toBe(false);
    }
    unmount();
  });

  test("every pattern in that list actually fires — on shipped copy where it exists", () => {
    // THIRTY-THREE REGEXES THAT MATCHED NOTHING would make the rule above pass on a
    // fabricated citation, which is the one failure this whole block exists to catch. So
    // each is fired, and the corpus is split so a reader can see which half proves what.
    for (const [name, pattern] of INVENTED_PROVENANCE) {
      expect(
        PROVENANCE_CONTROLS.some((line) => pattern.test(line)),
        `"${name}" fires on nothing at all — it cannot be guarding anything`,
      ).toBe(true);
    }
    // The four categories a REAL string in this deck already carries, named individually so
    // a failure says which shipped attribution changed rather than "one of four".
    expect(/\bBCG\b/.test(gapHardestPartContent.statisticSource)).toBe(true);
    expect(/\bMcKinsey\b/i.test(gapHardestPartContent.statisticSource)).toBe(true);
    expect(/\bbenchmark\w*\b/i.test(gapHardestPartContent.statisticSource)).toBe(true);
    expect(/\b(19|20)\d{2}\b/.test(berauAnchorSource())).toBe(true);
    expect(/\b\d{4}-\d{2}-\d{2}\b/.test(berauAnchorSource())).toBe(true);
    expect(/\bindependent\w*\b/i.test(NOT_AUDITED)).toBe(true);
    expect(/\baudit\w*\b/i.test(NOT_AUDITED)).toBe(true);
    expect(walkStrings(ownProofFor("gems")).some((s) => /\bGoogle\b/.test(s))).toBe(true);
    expect(walkStrings(ownProofFor("gems")).some((s) => /\bpublish\w*\b/i.test(s))).toBe(true);
    // AND THE FABRICATIONS ARE FABRICATIONS — not sentences quietly lifted from a source
    // this deck holds. None of them appears in any content module this file imports, which
    // is what makes "written here and nowhere else" a checked claim rather than a promise.
    const shipped = [
      ...walkStrings(gapHardestPartContent),
      ...walkStrings(gapNoSopContent),
      ...walkStrings(gapLadderContent),
      ...walkStrings(gapThePatternContent),
      ...walkStrings(investChickenEggContent),
      ...walkStrings(investSubscriptionContent),
      ...authoredStrings(),
    ];
    for (const invented of FABRICATED_CITATIONS) {
      expect(shipped, `a fabrication that is actually shipped copy`).not.toContain(invented);
    }
  });
});

// ── AC · the keyword rule: kw on prose only ──────────────────────────────────

describe("the keyword rule", () => {
  test("exactly the four prose strings carry a *Kw sibling, every keyword verbatim", () => {
    // The directory's rule, stated at the top of `src/slides/leader-invest/content.ts` and
    // restated in this slide's own block header, applied without an exception. PROSE is the
    // headline, the two readings and the closer. THE TWO FIGURES ARE THE SHARPEST CASE THE
    // RULE HAS ANYWHERE IN THAT FILE — they are somebody else's quantities — and the
    // ATTRIBUTION is the second sharpest, because emphasis inside a citation reads as the
    // deck editing its own source line.
    //
    // HELD OVER THE BLOCK'S WHOLE KEY SET, so a seventeenth key cannot be added at either
    // side without failing here first.
    expect(Object.keys(C).sort()).toEqual([
      "adoptionFigure",
      "adoptionLabel",
      "adoptionReading",
      "adoptionReadingKw",
      "closer",
      "closerKw",
      "figLabel",
      "headline",
      "headlineKw",
      "implementationFigure",
      "implementationLabel",
      "implementationReading",
      "implementationReadingKw",
      "readingEyebrow",
      "statisticEyebrow",
      "statisticSource",
    ]);
    const kwKeys = Object.keys(C).filter((k) => k.endsWith("Kw"));
    expect(kwKeys.sort()).toEqual([
      "adoptionReadingKw",
      "closerKw",
      "headlineKw",
      "implementationReadingKw",
    ]);
    for (const kwKey of kwKeys) {
      const proseKey = kwKey.slice(0, -2) as keyof typeof C;
      const prose = C[proseKey];
      const kws = C[kwKey as keyof typeof C];
      expect(typeof prose, `${kwKey} has no prose sibling`).toBe("string");
      expect(Array.isArray(kws), kwKey).toBe(true);
      expect((kws as readonly string[]).length, `${kwKey} carries no keyword`).toBeGreaterThan(0);
      for (const kw of kws as readonly string[]) {
        // VERBATIM SUBSTRING OF ITS OWN SIBLING. `highlight()` splits on the literal, so a
        // keyword that is not in its prose silently highlights nothing and the emphasis the
        // author wrote never appears.
        expect(prose as string, `${kwKey}: "${kw}" is not in its prose`).toContain(kw);
      }
    }
    // FIGURES AND STATISTICS CARRY NO KEYWORDS — named one by one, so the list above cannot
    // be widened by accident and a failure says which label reached for emphasis.
    for (const forbidden of [
      "figLabelKw",
      "statisticEyebrowKw",
      "statisticSourceKw",
      "adoptionFigureKw",
      "adoptionLabelKw",
      "implementationFigureKw",
      "implementationLabelKw",
      "readingEyebrowKw",
    ]) {
      expect(Object.keys(C), `${forbidden} exists`).not.toContain(forbidden);
    }
    // A LABEL AND A PROSE STRING MAY NOT BE THE SAME STRING, which is what makes the
    // partition above a partition rather than two overlapping lists.
    expect(new Set(printedStrings()).size).toBe(printedStrings().length);
    expect(printedStrings()).toHaveLength(12);
  });

  test("every keyword actually highlights, and every label renders with none", () => {
    const { container, unmount } = renderSlide(investBaseRatesSlide.canonicalPose);

    // THE PROSE BOXES CARRY THEIRS, one `<em>` per keyword — the half that proves the
    // absences below are not passing because emphasis stopped rendering everywhere.
    const proseBoxes: ReadonlyArray<readonly [string, readonly string[]]> = [
      ["base-rates-adoption-reading", C.adoptionReadingKw],
      ["base-rates-implementation-reading", C.implementationReadingKw],
      ["base-rates-closer", C.closerKw],
    ];
    for (const [id, kws] of proseBoxes) {
      const ems = [...screen.getByTestId(id).querySelectorAll("em")].map((em) => em.textContent);
      expect(ems, id).toHaveLength(kws.length);
      for (const kw of kws) expect(ems, `${id} · ${kw}`).toContain(kw);
    }
    // The headline lives on the slide file rather than the figure, so it is read off the
    // heading instead of a testid.
    const heading = container.querySelector("h1");
    expect(heading?.textContent).toBe(C.headline);
    expect([...(heading?.querySelectorAll("em") ?? [])].map((em) => em.textContent)).toEqual([
      ...C.headlineKw,
    ]);

    // …and every LABEL renders with none.
    for (const id of [
      "base-rates-eyebrow",
      "base-rates-source",
      "base-rates-adoption-figure",
      "base-rates-adoption-label",
      "base-rates-implementation-figure",
      "base-rates-implementation-label",
      "base-rates-reading-eyebrow",
    ]) {
      expect(screen.getByTestId(id).querySelectorAll("em").length, `<em> inside ${id}`).toBe(0);
    }
    expect(container.querySelector(".fig-label")?.querySelectorAll("em").length).toBe(0);
    unmount();
  });

  test("the stage prints exactly the twelve strings the rule partitions", () => {
    // THE CENSUS IS EXACT IN BOTH DIRECTIONS: what the stage prints IS the twelve strings
    // `PROSE` and `LABELS` divide between them, no more and no fewer. A thirteenth printed
    // string cannot render without landing in one of the two lists first — which is what
    // makes the keyword rule a partition of the SLIDE rather than of a list somebody keeps.
    const { container, unmount } = renderSlide(investBaseRatesSlide.canonicalPose);
    expect(stagePrintedStrings(container).sort()).toEqual(printedStrings().sort());
    expect(figLabelText(container)).toBe(C.figLabel);
    expect(C.figLabel).toBe("THE BASE RATE, AND THE DEFAULT IT PRICES");
    // The boxes, counted: nothing on the stage is missing and nothing is drawn twice.
    const ids = stageBoxes(container).map((el) => el.dataset.testid);
    expect(ids.sort()).toEqual([...EVERY_BOX].sort());
    expect(ids).toHaveLength(13);
    unmount();
  });
});

// ── AC · derived numbering: no authored figure, anywhere ─────────────────────

describe("no rendered string names a letter or a figure", () => {
  test("authored copy and the rendered stage both stay figure-free at every pose", () => {
    // §3.4 R2 / §3.5. This slide composes as the FIRST of the `invest` run, which today
    // means D.1 — and the four rows behind it just proved how cheap that is to move, so a
    // literal figure in this copy would be a lie on a projector within the week.
    //
    // HELD OVER AUTHORED VALUES AND THE RENDERED STAGE, which is the checkable form of the
    // rule: the doc comments in `src/slides/leader-invest/` DO name sections and figures,
    // because that is how a spec reference is written, and a rule over comments would forbid
    // the provenance this slide is required to record.
    const FIGURE = /\b[A-Z]\.\d/;
    for (const copy of authoredStrings()) {
      expect(copy, copy).not.toMatch(FIGURE);
      expect(copy, copy).not.toMatch(/\b[A-N]\.\d+\b/);
      expect(copy, copy).not.toMatch(/\bsections?\s+[A-N]\b/i);
      // No count of its own successors either — the run this slide OPENS is composed per
      // deck set (§3.4), so a sentence that numbered the slides behind it would go stale the
      // first time one was inserted or cut. This slide is the newest proof of that: it just
      // moved four of them.
      expect(copy, copy).not.toMatch(/\bnext (two|three|four|five)\b/i);
      expect(copy, copy).not.toMatch(/\b(slide|figure)\b/i);
    }

    const { container, unmount } = renderSlide(0);
    for (const pose of POSES) {
      goToPose(pose);
      // The derived reference IS there to strip, so the stage sweep below cannot pass
      // because nothing rendered.
      expect(container.querySelector(".fig-label")?.textContent).toContain(
        `${AT.letter}.${AT.num}`,
      );
      const stage = stageTextWithoutFigLabel(container);
      expect(stage.length, `pose ${pose}`).toBeGreaterThan(400);
      expect(stage, `pose ${pose}`).not.toMatch(FIGURE);
    }
    unmount();
  });
});

// ── AC · the composed decks: head of the invest run, leader decks only ───────

describe("the composed decks", () => {
  /**
   * The deck a brand × deck set actually runs, composed the way the app composes it.
   *
   * BUILT FROM THE TABLES, NOT FROM `@/deck/registry`. The registry resolves `VARIANT` once
   * at module scope and this epoch's variant is the default `general`, which has no leader
   * deck at all — so reading the registry here would answer about the wrong deck, and
   * re-pointing `window.location` per brand would need `vi.resetModules()` and cost this
   * file the module identity every other assertion in it depends on. The three inputs are
   * pure data (§4.1): the deck-set list, the slide pool, and the brand's own `practiceLab`
   * flag. `gap-hardest-part.test.tsx` established the helper for the other head-of-run
   * insert this tree has taken; it is reused unchanged.
   */
  function composedFor(deckSet: DeckSetId, brand: Brand, drop?: string) {
    const set = DECK_SET_COMPOSITION[deckSet];
    const list = drop ? { ...set, slides: set.slides.filter((id) => id !== drop) } : set;
    return composeDeck(
      resolveDeckSetSlides(list, {
        defs: slideCatalogue,
        brand,
        practiceLab: BRANDS[brand].practiceLab,
      }),
    );
  }

  /** id → the figure the composer derived for it, as the two halves the screen prints. */
  function figuresOf(deck: ReturnType<typeof composedFor>) {
    return new Map(
      deck.slides.map((row) => [row.def.id, { letter: row.letter, num: row.num }] as const),
    );
  }

  test("opens the invest run in BOTH leader decks — and it is the run's jump target", () => {
    // WHAT IS CHECKED HERE AND NOT IN `deck-slots.test.ts`: that one is about the authored
    // list, this is about what `composeDeck` DERIVES from it — the run this slide belongs
    // to, the row in front of it, the row behind it, and the fact that a section jump now
    // lands HERE rather than on `invest-own-proof`, which held that position from gh#56
    // until today.
    //
    // NO LETTER AND NO NUMBER IS TYPED IN THIS TEST. Both are read off the composed row;
    // `AT` above is a harness input and not this.
    for (const brand of LEADER_BRANDS) {
      const { slides, sectionFirstIndex, letterOf } = composedFor("leader", brand);
      const at = slides.findIndex((s) => s.def.id === SLIDE_ID);
      expect(at, brand).toBeGreaterThan(-1);

      const row = slides[at];
      expect(row.sectionKey, brand).toBe("invest");
      expect(row.letter, brand).toBe(letterOf("invest"));

      // THE HEAD OF THE RUN, stated as the two facts that make it one: the row in front
      // carries another key, so this slide STARTS the run, and the row behind it is the
      // run's second slide. A slide that had landed at the run's END would pass a
      // `toContain` check and fail both of these.
      expect(slides[at - 1].sectionKey, brand).not.toBe("invest");
      expect(slides[at + 1].def.id, brand).toBe(SIBLING_IDS[0]);
      // …and it is the FIRST invest row by index, which is the same claim said in the one
      // form a reordering inside the list cannot dodge.
      const investIndices = slides.filter((s) => s.sectionKey === "invest").map((s) => s.index);
      expect(Math.min(...investIndices), brand).toBe(at);

      // AND THE WHOLE RUN, which is now §4.3's five and FINAL: gh#70 closed the second of
      // the four leader-only runs, after `gap` (gh#67). A sixth `invest` id would be a slide
      // §4.3 does not ask for, and this is where it fails.
      expect(
        slides.filter((s) => s.sectionKey === "invest").map((s) => s.def.id),
        brand,
      ).toEqual([SLIDE_ID, ...SIBLING_IDS]);

      // R5 — the run's jump target is its first NUMBERED slide, and this slide is numbered,
      // so pressing the `invest` run's letter lands on this stage. The letter is read off the
      // composed row rather than typed.
      expect(sectionFirstIndex.get(row.letter), brand).toBe(at);
    }
  });

  test("composes as the run's FIRST figure, and its four siblings one further along each", () => {
    // THE FIGURES, DERIVED. What is asserted is the RELATIONSHIP — this slide is number 1 of
    // the run and each sibling is one further along, all under one letter — and the composed
    // pair `D.1 … D.5` is then read back as a consequence rather than typed as the source of
    // truth. §6.7 numbers these five D.1–D.5 and, for the first time since gh#56 opened the
    // run, the composed figures and §6.7's agree; that agreement is the RECORD of today, and
    // the derivation above is what would still be true if a section landed in front of
    // `invest` tomorrow and the letter became E.
    for (const brand of LEADER_BRANDS) {
      const deck = composedFor("leader", brand);
      const run = deck.slides.filter((s) => s.sectionKey === "invest");
      const letter = deck.letterOf("invest");

      expect(run[0].def.id, brand).toBe(SLIDE_ID);
      expect(run[0].num, brand).toBe(1);
      run.forEach((r, i) => {
        expect(r.num, `${brand} · ${r.def.id}`).toBe((run[0].num ?? 0) + i);
        expect(r.letter, `${brand} · ${r.def.id}`).toBe(letter);
      });
      // Read back: the five figures the two leader rooms actually see today.
      expect(
        run.map((r) => `${r.letter}.${r.num}`),
        brand,
      ).toEqual(["D.1", "D.2", "D.3", "D.4", "D.5"]);
      expect(letter, brand).toBe("D");
    }
  });

  test("its arrival moved FOUR numbers and NO letter — proved against the deck without it", () => {
    // THE AC's THIRD CLAUSE, HELD AS AN EXPERIMENT RATHER THAN AS A MEMORY. "One figure
    // higher than before" is a claim about two decks: the one this repo composes today and
    // the one it composed yesterday. Yesterday's is not a fixture here — it is RECOMPOSED,
    // by dropping this slide's id from the leader list and running the same composer over
    // what is left. That is the only form of the claim that cannot go stale, and it is what
    // §11's 2026-08-05 amendments predicted in advance: `invest-own-proof` printed D.1 and
    // `invest-chicken-egg` D.2 "until this lands", and both step one number that day.
    //
    // WITH NO EDIT TO EITHER SLIDE, which is the half that makes it §3.5 rather than four
    // ticket-sized copy changes: neither file is imported here, because neither has anything
    // to say about its own number.
    for (const brand of LEADER_BRANDS) {
      const after = figuresOf(composedFor("leader", brand));
      const before = composedFor("leader", brand, SLIDE_ID);
      const beforeFigures = figuresOf(before);

      // The counterfactual deck really is one row shorter and really has lost this slide.
      expect(before.slides).toHaveLength(after.size - 1);
      expect(beforeFigures.has(SLIDE_ID), brand).toBe(false);

      for (const id of SIBLING_IDS) {
        const then = beforeFigures.get(id);
        const now = after.get(id);
        expect(then, `${brand} · ${id} is missing from the counterfactual deck`).toBeDefined();
        expect(now, `${brand} · ${id} is missing from today's deck`).toBeDefined();
        expect(now?.num, `${brand} · ${id} did not step`).toBe((then?.num ?? 0) + 1);
        expect(now?.letter, `${brand} · ${id} changed letter`).toBe(then?.letter);
      }

      // NOTHING ELSE MOVED AT ALL — the property that makes a head-of-run insert cheap, and
      // the one a reader is most likely to doubt. Every row in the counterfactual deck keeps
      // its letter, and every row outside the `invest` run keeps its number too.
      for (const row of before.slides) {
        const now = after.get(row.def.id);
        expect(now?.letter, `${brand} · ${row.def.id} changed letter`).toBe(row.letter);
        if (row.sectionKey !== "invest") {
          expect(now?.num, `${brand} · ${row.def.id} changed number`).toBe(row.num);
        }
      }
      // …and the four that DID move are exactly the four, counted rather than trusted.
      const moved = before.slides.filter((row) => after.get(row.def.id)?.num !== row.num);
      expect(moved.map((row) => row.def.id).sort(), brand).toEqual([...SIBLING_IDS].sort());
    }
  });

  test("reaches NO standard deck — asked once per registered variant, all five", () => {
    // The other half of a leader-only slide, and it is not implied by the positive: the id
    // written into `STANDARD_SLIDE_IDS` would open a run between the agenda and the
    // landscape for an audience with no leader in the room, and renumber every letter behind
    // it.
    //
    // ASKED PER VARIANT AND NOT PER DECK SET, because a variant is what a URL resolves to
    // and it is the only unit a reader can check against a browser. All five are walked off
    // `VARIANTS` rather than listed here, so a sixth is inside the rule the day it registers.
    const seen: VariantId[] = [];
    for (const variant of Object.values(VARIANTS)) {
      const { slides } = composedFor(variant.deckSet, variant.brand);
      const present = slides.some((s) => s.def.id === SLIDE_ID);
      expect(present, `${variant.id} runs ${SLIDE_ID}`).toBe(variant.deckSet === "leader");
      if (variant.deckSet !== "leader") {
        // Not just this slide: a standard deck holds no `invest` row at all, so there is no
        // run for it to have been appended to by mistake.
        expect(slides.some((s) => s.sectionKey === "invest"), variant.id).toBe(false);
      }
      seen.push(variant.id);
    }
    expect(seen.sort()).toEqual([
      "berau-leader",
      "berau-middle-mgmt",
      "gems-leader",
      "gems-middle-mgmt",
      "general",
    ]);
    // The authored list says the same thing one layer down, which is where a typo would put
    // the id if the composer were ever taught to be forgiving.
    expect(DECK_SET_COMPOSITION.standard.slides).not.toContain(SLIDE_ID);
    expect(DECK_SET_COMPOSITION.leader.slides).toContain(SLIDE_ID);
    // And the two variants that DO run it are the two leader ones, read off the variant
    // table rather than assumed from the brand names.
    expect(
      Object.values(VARIANTS)
        .filter((v) => v.deckSet === "leader")
        .map((v) => v.brand)
        .sort(),
    ).toEqual([...LEADER_BRANDS].sort());
  });
});

// ── AC · every pose is complete, and rests on the right thing ────────────────

describe("the pose walk", () => {
  test("every pose is complete at every stop, in both directions", () => {
    const { container, unmount } = renderSlide();
    const walk = [...POSES, ...[...POSES].reverse()];
    for (const pose of walk) {
      goToPose(pose);
      for (let band = 0; band < REVEALED_AT.length; band++) {
        for (const id of REVEALED_AT[band]) {
          // A pose is everything argued so far: revealed iff its band's pose has been
          // reached, at every stop in BOTH directions — `on` is derived from the pose and
          // not accumulated, so walking back to 0 must un-reveal 1 and 2.
          expect(revealed(id), `${id} at pose ${pose}`).toBe(band <= pose);
          // AND THE COPY IS THERE, not merely the box: a path that dropped children would
          // still pass a class check. The rule wrapper and the two field wrappers are the
          // three boxes with no text of their own.
          if (band <= pose && !TEXTLESS_IDS.has(id)) {
            expect(screen.getByTestId(id).textContent, `${id} at pose ${pose}`).not.toBe("");
          }
        }
      }
      // …and the two fields are drawn, which is what "complete" means for the three boxes the
      // clause above has to skip.
      expect(marksOf(container, ADOPTION_MARK), `pose ${pose}`).toHaveLength(ADOPTION_COUNT);
      expect(marksOf(container, IMPLEMENTATION_MARK), `pose ${pose}`).toHaveLength(
        IMPLEMENTATION_COUNT,
      );
      // ZERO SMIL NODES AT EVERY STOP — the AC's jsdom half, under the default motion
      // preference. The `reduce` half is below and in the browser walk.
      expect(
        container.querySelectorAll("animate, animateTransform, animateMotion, set").length,
        `SMIL at pose ${pose}`,
      ).toBe(0);
    }
    unmount();
  });

  test("no pose rests on evidence with its conclusion missing", () => {
    // THE PROPERTY THE POSE MAP IS CHECKED AGAINST, rather than the pose count — and the one
    // decision §6.7 does not make for this slide. The obvious fourth pose is a split of pose
    // 0, adoption first and proper implementation second, and it is refused because a pose is
    // a RESTING STATE: a stage resting on "78% HAVE ADOPTED AI" with nothing beside it argues
    // the opposite of this slide. The check below is what that refusal looks like as an
    // assertion — every pose's LAST arrival is its conclusion.
    const { unmount } = renderSlide();

    // POSE 0 — the six marks land last, and that is the pose's whole argument: the room has
    // just watched a field it cannot count, and the answer to it is one short row on the same
    // grid. A pose that ended on the seventy-eight would end on the good news.
    goToPose(0);
    const sixAt = arrival("base-rates-implementation-field");
    for (const id of POSE_0_IDS.filter((x) => x !== "base-rates-implementation-field")) {
      expect(arrival(id), `${id} must not outlast the six marks`).toBeLessThan(sixAt);
    }
    // …and each FIELD follows its own figure, because the field is the same claim in a second
    // form and nothing rests on it that the number did not already say.
    expect(arrival("base-rates-adoption-field")).toBeGreaterThan(
      arrival("base-rates-adoption-figure"),
    );
    expect(sixAt).toBeGreaterThan(arrival("base-rates-implementation-figure"));
    // …and the whole lower row follows the whole upper one, so the pair reads as a comparison
    // in one direction rather than as two rows filling at once.
    expect(arrival("base-rates-implementation-figure")).toBeGreaterThan(
      arrival("base-rates-adoption-field"),
    );

    // POSE 1 — the RARE position lands last. The common one first because it is where the
    // room already is; the rare one last because it is what the rest of this section is for.
    // A pose ending on "holding it proves nothing" would rest on the diagnosis.
    goToPose(1);
    const rareAt = arrival("base-rates-implementation-reading");
    for (const id of POSE_1_IDS.filter((x) => x !== "base-rates-implementation-reading")) {
      expect(arrival(id), `${id} must not outlast the rare position`).toBeLessThan(rareAt);
    }
    // The rule and the band's eyebrow are ONE beat: a rule with no heading under it is a
    // stray hairline, and a heading with no rule above it does not close the evidence.
    expect(arrival("base-rates-rule")).toBe(arrival("base-rates-reading-eyebrow"));

    // POSE 2 — the closer is ALONE in its pose, which is what "last arrival" means on a
    // step-reveal slide: arrivals are delays WITHIN a pose, so the only way to prove nothing
    // outlasts the closer is to prove nothing else arrives with it.
    goToPose(2);
    expect(POSE_2_IDS).toEqual(["base-rates-closer"]);
    expect(revealed("base-rates-closer")).toBe(true);
    expect(C.closer).toBe("Doing what everyone does buys what everyone gets.");
    expect(C.closerKw).toEqual(["what everyone gets"]);
    unmount();
  });

  test("mounts no <svg> at all — zero SMIL by construction, not by discipline", () => {
    // The figure's own doc comment stakes the claim: eighty-four marks are eighty-four
    // `div`s, the copper rule is a `div`, the rows are placed text, and a SMIL node cannot
    // appear without an author adding a whole element class. That structural fact is what
    // makes the reduce-mode zero below a CONSTRUCTION rather than a promise — and it is the
    // reason an SVG `<rect>` grid was refused for the fields, which would have re-opened a
    // question this deck has had to answer with a `matchMedia` gate three times elsewhere.
    for (const pose of POSES) {
      const { container, unmount } = renderSlide(pose);
      expect(container.querySelectorAll("svg").length, `pose ${pose}`).toBe(0);
      unmount();
    }
  });
});

// ── AC · prefers-reduced-motion: reduce ──────────────────────────────────────

describe("prefers-reduced-motion: reduce", () => {
  const realMatchMedia = window.matchMedia;

  /** A `matchMedia` that answers `matches` for the motion query and false for everything
   *  else — so a component that asked a DIFFERENT media question would not accidentally be
   *  handed the motion answer. */
  function stubMatchMedia(prefersReduce: boolean) {
    window.matchMedia = ((query: string) => ({
      matches: query.includes("prefers-reduced-motion") ? prefersReduce : false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    })) as unknown as typeof window.matchMedia;
  }

  afterEach(() => {
    window.matchMedia = realMatchMedia;
  });

  interface PoseSnapshot {
    census: string[];
    html: string;
    smil: number;
    svg: number;
    revealedIds: string[];
    marks: [number, number];
  }

  /**
   * One full pose walk under a stated motion preference, snapshotted per pose.
   *
   * THE CENSUS IS TAG + HOOK + CLASS FOR EVERY ELEMENT, which is the form that makes
   * "complete" checkable rather than "non-empty". `class` is in it deliberately: it carries
   * `.fade.on`, so an element that MOUNTED under both preferences but was left un-revealed
   * under one would still differ here. `html` is kept beside it as the strictest form of the
   * same claim — the inline `transitionDelay` a reveal writes is in it too.
   */
  function walkUnder(prefersReduce: boolean): PoseSnapshot[] {
    stubMatchMedia(prefersReduce);
    const { container, unmount } = renderSlide();
    const out: PoseSnapshot[] = [];
    for (const pose of POSES) {
      goToPose(pose);
      out.push({
        census: [...container.querySelectorAll<HTMLElement>("*")].map(
          (el) =>
            `${el.tagName}|${el.dataset.testid ?? ""}|${el.getAttribute("class") ?? ""}`,
        ),
        html: container.innerHTML,
        smil: container.querySelectorAll("animate, animateTransform, animateMotion, set").length,
        svg: container.querySelectorAll("svg").length,
        revealedIds: EVERY_BOX.filter((id) => revealed(id)),
        marks: [
          marksOf(container, ADOPTION_MARK).length,
          marksOf(container, IMPLEMENTATION_MARK).length,
        ],
      });
    }
    unmount();
    return out;
  }

  test("zero SMIL at every pose under BOTH preferences, and the two renders are identical", () => {
    // SMIL is invisible to the global `prefers-reduced-motion` rule in
    // `src/styles/globals.css` — that rule squashes CSS `animation-duration` and
    // `transition-duration` to 0.01ms and touches SMIL not at all — so a SMIL node would have
    // to be gated at MOUNT, the way `E12MindsetDiptych`, `E12LoopAnatomy` and
    // `E9DistractionMotion` each gate theirs by reading `matchMedia` at render time. THIS
    // SLIDE HAS NOTHING TO GATE, and that is the claim being held: the census is identical
    // under either preference because nothing under this slide reads `matchMedia` at all.
    //
    // BOTH STUBS, NOT ONE. A test that only ever mounts under `reduce` proves the reduce
    // render is complete and says nothing about whether it is the SAME render; a test that
    // only ever mounts under no-preference proves nothing about the AC. The pair is what
    // makes "preference-independent" a checked property — and it is the form that would
    // catch the likeliest future regression, which is not a stray `<animate>` but a
    // well-meaning `if (reduced) return null` around a band.
    const reduce = walkUnder(true);
    const normal = walkUnder(false);
    expect(reduce).toHaveLength(POSES.length);
    expect(normal).toHaveLength(POSES.length);

    for (const pose of POSES) {
      const r = reduce[pose];
      const n = normal[pose];
      expect(r.smil, `reduce · pose ${pose}`).toBe(0);
      expect(n.smil, `no-preference · pose ${pose}`).toBe(0);
      expect(r.svg, `reduce · pose ${pose}`).toBe(0);
      expect(n.svg, `no-preference · pose ${pose}`).toBe(0);
      // EQUIVALENT IN ELEMENT CENSUS — not merely non-empty. The two lists are compared
      // whole and in order, so a dropped mark, a dropped band or a class that stopped being
      // written all fail by position.
      expect(r.census, `census at pose ${pose}`).toEqual(n.census);
      expect(r.html, `markup at pose ${pose}`).toBe(n.html);
      // …and the census is a real one: 13 boxes, 84 marks, plus the harness's own nodes.
      expect(r.census.length, `pose ${pose}`).toBeGreaterThan(100);
      expect(r.marks, `marks at pose ${pose}`).toEqual([ADOPTION_COUNT, IMPLEMENTATION_COUNT]);
    }
  });

  test("every pose still renders COMPLETE under reduce — same boxes, same copy", () => {
    // The completeness half, stated as the reveal state rather than as a byte comparison:
    // everything the pose is supposed to show is `on`, everything it is not supposed to show
    // yet is not, and every box that carries type has its type. Completeness is a claim about
    // THIS pose and not about the last one, which is why the second loop exists.
    stubMatchMedia(true);
    const { container, unmount } = renderSlide();
    for (const pose of POSES) {
      goToPose(pose);
      for (let band = 0; band <= pose; band++) {
        for (const id of REVEALED_AT[band]) {
          expect(revealed(id), `reduce · pose ${pose} · ${id}`).toBe(true);
          if (!TEXTLESS_IDS.has(id)) {
            expect(
              screen.getByTestId(id).textContent,
              `reduce · pose ${pose} · ${id} is empty`,
            ).not.toBe("");
          }
        }
      }
      for (let band = pose + 1; band < REVEALED_AT.length; band++) {
        for (const id of REVEALED_AT[band]) {
          expect(revealed(id), `reduce · pose ${pose} · ${id} is not reached yet`).toBe(false);
        }
      }
      // The two fields survive reduce whole — the one place on this stage where "complete"
      // means a COUNT rather than a string.
      expect(marksOf(container, ADOPTION_MARK), `reduce · pose ${pose}`).toHaveLength(78);
      expect(marksOf(container, IMPLEMENTATION_MARK), `reduce · pose ${pose}`).toHaveLength(6);
    }
    unmount();
  });
});

// ── AC · no brand variance ───────────────────────────────────────────────────

describe("no brand variance", () => {
  test("imports no VARIANT, takes no props, and names no organisation", () => {
    // §4.4's seven brand × deckSet slots do not list this slide: the pair is a third party's
    // reported context about organizations in general, and NOT ONE ORGANISATION IS NAMED ON
    // THIS STAGE — so a `Record<Brand, …>` here would be one honest entry and two written by
    // inventing evidence. Held three ways, because each catches a different edit.
    //
    // FIRST, THE IMPORT — a claim about the module, which no render can see. Checked against
    // the file with its comments stripped, because this slide's header discusses `VARIANT` at
    // length and a raw grep would fail on the argument for not importing it.
    const slideCode = stripComments(sourceOf(SLIDE_FILE));
    expect(slideCode, "the slide file imports @/variant").not.toMatch(/from\s+["']@\/variant["']/);
    expect(slideCode, "the slide file names VARIANT in code").not.toMatch(/\bVARIANT\b/);
    expect(slideCode, "the slide file resolves a brand block").not.toMatch(/\bFor\(\s*\w*brand/i);
    // …and the stripper really did leave the code behind, so the absences above are not the
    // absence of a file.
    expect(slideCode).toMatch(/export const investBaseRatesSlide/);
    expect(slideCode).toMatch(/import type \{ SlideDef \}/);
    // The figure takes no resolved brand block either — unlike three of this directory's
    // four other figures, which each take one.
    const figureCode = stripComments(sourceOf(FIGURE_FILE));
    expect(figureCode).not.toMatch(/\bVARIANT\b/);
    expect(figureCode).not.toMatch(/from\s+["']@\/variant["']/);

    // SECOND, THE COMPONENT'S ARITY. `InvestBaseRates` takes no props at all, so there is no
    // `…For(brand)` resolver for a caller to pass one to.
    expect(InvestBaseRates.length).toBe(0);

    // THIRD, THE VOCABULARY. No organisation is named — not the two rooms, not the deck's own
    // company, not the source's.
    for (const copy of authoredStrings()) {
      expect(copy, `an organisation in ${JSON.stringify(copy)}`).not.toMatch(
        /\b(GEMS|GEMVIS|Berau|DigiTech|MineTech|Nanovest|Sinar Mas)\b/i,
      );
    }
  });

  test("the content block is plain data — no resolver hiding in it", () => {
    // A `Record<Brand, …>` reachable from this block would be a brand axis nobody declared,
    // and the shape it would arrive in is a function: every other brand-varying block in this
    // module is reached through one (`ownProofFor`, `onPremCallbackFor`, `priceAnchorFor`).
    const walk = (value: unknown, path: string): void => {
      if (typeof value === "function") throw new Error(`a function at ${path}`);
      if (Array.isArray(value)) value.forEach((v, i) => walk(v, `${path}[${i}]`));
      else if (value !== null && typeof value === "object") {
        for (const [k, v] of Object.entries(value)) walk(v, `${path}.${k}`);
      }
    };
    expect(() => walk(C, "investBaseRatesContent")).not.toThrow();
    // POSITIVE CONTROL — the walk is alive and would find a resolver one level down.
    expect(() => walk({ nested: { baseRatesFor: () => C } }, "control")).toThrow(
      /a function at control\.nested\.baseRatesFor/,
    );
  });
});

describe("both leader decks print the same stage", () => {
  // BRAND INVARIANCE IS A CLAIM ABOUT MODULE EPOCHS — `VARIANT` resolves once at module scope
  // — so it cannot be checked inside the one epoch every test above runs in. Two epochs, byte
  // for byte, following `gap-three-failures.test.tsx`, `gap-no-sop.test.tsx` and
  // `mandate-enablement.test.tsx`, which are the shipped precedents for the leader slides
  // with no brand axis at all.
  //
  // NOT `SlideHarness`, deliberately: it imports `composedDeck` statically and would hand a
  // freshly loaded slide a stale context object. This is the same-epoch dynamic-import
  // pattern `variant-composition.test.tsx` documents.
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
        import("@/slides/leader-invest/invest-base-rates"),
      ]);

    // THE POSITION IS READ OFF THE COMPOSED DECK, which for these two variants is the real
    // one — this slide composes into both, so the fallback below is dead code kept for the
    // shape of the helper rather than for this slide. WHERE it composes is asserted in `the
    // composed decks` above; what is asserted here is that the two leader rooms read the same
    // bytes at the same position.
    const row = composedDeck.slides.find((s) => s.def.id === SLIDE_ID);
    const at = row ? { letter: row.letter, num: row.num, sectionKey: row.sectionKey } : AT;

    function AdvanceTo({ step }: { step: number }) {
      const { goTo } = useDeckIn();
      return <button data-testid="goto-epoch" onClick={() => goTo(0, step)} />;
    }

    const { container } = render(
      <DeckProvider stepCounts={[slide.investBaseRatesSlide.steps]}>
        <SlideNumberProvider value={at}>
          <AdvanceTo step={slide.investBaseRatesSlide.canonicalPose} />
          <slide.InvestBaseRates />
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
    // MARKUP AND TEXT BOTH: a brand axis could move a colour token, a delay or a mark count
    // without changing a word, and `textContent` alone would not see it.
    expect(berau.html).toBe(gems.html);
    expect(berau.text).toBe(gems.text);
    // Not vacuously: a stage that rendered nothing would also be equal. Every one of this
    // slide's four arguments is in both rooms — the claim, the pair, the readings, the price
    // of the default — and so is the DERIVED figure, which is the one thing on the stage that
    // could legitimately have differed between two decks and does not.
    for (const stage of [berau.text, gems.text]) {
      expect(stage).toContain(C.headline);
      expect(stage).toContain(C.statisticSource);
      expect(stage).toContain(C.adoptionFigure);
      expect(stage).toContain(C.implementationFigure);
      expect(stage).toContain(C.adoptionReading);
      expect(stage).toContain(C.implementationReading);
      expect(stage).toContain(C.closer);
      expect(stage).toContain("D.1");
    }
  });
});

// ── AC · rank is a colour tier, never opacity ────────────────────────────────

describe("rank is a colour tier, never opacity", () => {
  test("every painted colour on the stage is a CSS var, and no box ranks by opacity", () => {
    // TWO RULES IN ONE SWEEP, over the RENDERED inline styles rather than over the source, so
    // a colour arriving from a helper is inside the rule too.
    //
    // OPACITY ON THIS STAGE MEANS TIME. `.fade` owns it — it is how "not argued yet" is
    // drawn — so an inline `opacity` on any box would overload the one channel this deck
    // reserves. The sharpest case is the six-mark field: it is a rare thing, and a rare thing
    // drawn faint would say "not argued yet" in a deck where that is exactly what faint means.
    const { container, unmount } = renderSlide(investBaseRatesSlide.canonicalPose);
    const painted = [...container.querySelectorAll<HTMLElement>("[data-testid^='base-rates-']")];
    expect(painted.length).toBe(13 + ADOPTION_COUNT + IMPLEMENTATION_COUNT);
    for (const el of painted) {
      const id = el.dataset.testid;
      expect(el.style.opacity, `${id} ranks by opacity`).toBe("");
      for (const channel of [el.style.color, el.style.background] as const) {
        if (channel === "") continue;
        expect(channel, `${id} paints a literal colour`).toMatch(/^var\(--[a-z0-9-]+\)$/);
      }
    }
    // …and the sweep really saw colours, so the loop above is not passing on empty strings.
    const styles = painted.map((el) => el.getAttribute("style") ?? "").join(" ");
    expect(styles.length).toBeGreaterThan(2000);
    expect(styles).toMatch(/var\(--copper-200\)/); // the two percentages
    expect(styles).toMatch(/var\(--copper-400\)/); // the four mono caps rows
    expect(styles).toMatch(/var\(--copper-500\)/); // every mark
    expect(styles).toMatch(/var\(--neutral-300\)/); // the attribution
    expect(styles).toMatch(/var\(--neutral-100\)/); // the closer
    unmount();
  });

  test("both fields take ONE tier — the only difference the drawing makes is HOW MANY", () => {
    // THE DECISION THE WHOLE FIGURE RESTS ON. The two fields count the SAME thing (an
    // organization in a hundred) and the source says "78% adoption VERSUS 6% proper
    // implementation" — never that the six are drawn from the seventy-eight — so colouring
    // the small field differently would claim either a different kind of object or a subset
    // relation, and the deck holds neither.
    const { container, unmount } = renderSlide(0);
    const adoption = marksOf(container, ADOPTION_MARK);
    const implementation = marksOf(container, IMPLEMENTATION_MARK);
    const backgrounds = new Set(
      [...adoption, ...implementation].map((el) => el.style.background),
    );
    expect(backgrounds.size, "the two fields are drawn in more than one colour").toBe(1);
    const sizes = new Set([...adoption, ...implementation].map((el) => el.style.width));
    expect(sizes.size, "the two fields are drawn at more than one mark size").toBe(1);
    // The two figures beside them share their own tier for the same reason: both are
    // quotations, and copper on this stage means A THING QUOTED FROM SOMEWHERE ELSE.
    expect(screen.getByTestId("base-rates-adoption-figure").style.color).toBe(
      screen.getByTestId("base-rates-implementation-figure").style.color,
    );
    // …while the deck's OWN voice is neutral, which is the epistemics drawn in colour: the
    // attribution is this deck's note about a source, so it is not copper.
    expect(screen.getByTestId("base-rates-source").style.color).toMatch(/^var\(--neutral-/);
    expect(screen.getByTestId("base-rates-closer").style.color).toMatch(/^var\(--neutral-/);
    unmount();
  });

  test("zero hex literals in all three of this slide's source files", () => {
    // CSS VARS ONLY — gh#70's build rule, held over the FILES rather than over the DOM.
    // A DOM sweep proves that today's stage paints no hex; this proves that none is written
    // down, including on a branch nothing currently renders and inside a constant nothing
    // currently reads.
    //
    // THE HEX CHECK RUNS ON RAW SOURCE AND THE rgba() CHECK ON STRIPPED SOURCE, and the
    // asymmetry is deliberate: no comment in these three files spells a hex, so the stricter
    // form costs nothing there — while `BaseRatesBeats.tsx`'s header legitimately NAMES the
    // construction it forbids ("CSS VARS ONLY, NO HEX AND NO rgba() LITERALS"), and a raw
    // check would fail a file for documenting its own rule.
    for (const [name, file] of SOURCE_FILES) {
      const raw = sourceOf(file);
      expect(raw.length, `${name} is empty`).toBeGreaterThan(500);
      expect(raw, `a hex literal in ${name}`).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
      expect(stripComments(raw), `an rgba() literal in ${name}`).not.toMatch(/\brgba?\(/i);
      // …and no `hsl()` either, which is the other literal a colour edit reaches for.
      expect(stripComments(raw), `an hsl() literal in ${name}`).not.toMatch(/\bhsla?\(/i);
    }
    // POSITIVE CONTROL — the patterns are alive, and the stripper does not eat code.
    expect(/#[0-9a-fA-F]{3,8}\b/.test("background: #c98a4b")).toBe(true);
    expect(/\brgba?\(/i.test(stripComments("color: rgba(0,0,0,.5)"))).toBe(true);
    expect(stripComments("const x = 1; // #ffffff")).toContain("const x = 1;");
  });
});

// ── AC · the stage's own arithmetic ──────────────────────────────────────────

describe("the geometry", () => {
  test("is a 1280×720 absolute stage, and pure enough to read without a bundler", () => {
    expect(STAGE).toEqual({ width: 1280, height: 720 });
    expect(CONTENT_WIDTH).toBe(STAGE.width - 2 * SIDE_MARGIN);
    expect(SIDE_MARGIN).toBe(48);
    // THE FLOOR IS THE HOVER BAND AND NOT `.slide-content`'s BOTTOM — `.nav-zone` is
    // `bottom: 0; height: 88px`, so nothing on this stage may cross y=632.
    expect(NAV_ZONE_TOP).toBe(STAGE.height - 88);
    expect(CONTENT_TOP).toBe(156);

    // NO RUNTIME IMPORT ANYWHERE IN THE MODULE, which is the checkable form of the property
    // every geometry module in this directory claims: a coordinate can be read from bare Node
    // with `--experimental-strip-types` and no bundler, so a stage can be verified without
    // standing up React. The file's only reference to a sibling is
    // `typeof import("./geometry")` — a TYPE position, which both tsc and Node's stripper
    // erase. An `import { … } from "@/…"` added here would be resolvable by Vitest and by
    // nothing else, and this is where that would be caught.
    const geometry = sourceOf(GEOMETRY_FILE);
    expect(geometry, "a runtime import in the geometry module").not.toMatch(/^\s*import\s/m);
    expect(geometry, "a require() in the geometry module").not.toMatch(/\brequire\(/);
    expect(geometry).toMatch(/typeof import\("\.\/geometry"\)/);
  });

  test("the two counts are DERIVED from the copy's own percentages, not typed beside them", () => {
    // THE WELD, and it is the reason this test file exists at all as far as
    // `base-rates-geometry.ts` is concerned — its own header says so: "this module CANNOT
    // import `./content.ts` for the value, so the test is the other end of the weld".
    //
    // A CROSS-MODULE COMPARISON IN BOTH DIRECTIONS, so neither side can be a
    // self-comparison. The copy string is parsed rather than re-typed, so a reword that
    // moved "78%" to "80%" and left `ADOPTION_SHARE` at 0.78 fails HERE — which is the one
    // failure this slide has that nobody would see on a projector, because the drawing would
    // still look like a drawing.
    const quoted = (figure: string) => Number(figure.replace("%", ""));
    expect(quoted(C.adoptionFigure)).toBe(78);
    expect(quoted(C.implementationFigure)).toBe(6);
    expect(ADOPTION_SHARE).toBe(0.78);
    expect(IMPLEMENTATION_SHARE).toBe(0.06);
    expect(ADOPTION_COUNT).toBe(quoted(C.adoptionFigure));
    expect(IMPLEMENTATION_COUNT).toBe(quoted(C.implementationFigure));
    // …and the share is the figure as a fraction of the denominator the eyebrow states in
    // words, which is what makes "%" the unit rather than a decoration.
    expect(PER_HUNDRED).toBe(100);
    expect(Math.round(ADOPTION_SHARE * PER_HUNDRED)).toBe(quoted(C.adoptionFigure));
    expect(Math.round(IMPLEMENTATION_SHARE * PER_HUNDRED)).toBe(quoted(C.implementationFigure));
    expect(C.statisticEyebrow).toContain("IN A HUNDRED");

    // THE COUNTS ARE INTEGERS, WHICH IS THE PROPERTY THE FIELDS ACTUALLY NEED — a
    // non-integer count would make `fieldRows` open a row holding a fraction of a mark, and
    // `Array.from({ length })` in `BaseRatesBeats.tsx` would silently truncate it.
    expect(Number.isInteger(ADOPTION_COUNT)).toBe(true);
    expect(Number.isInteger(IMPLEMENTATION_COUNT)).toBe(true);
    expect(fieldRows(ADOPTION_COUNT)).toBe(3);
    //
    // AND THE MODULE'S STATED REASON FOR ITS `Math.round` IS WRONG, measured rather than
    // repeated — recorded here because the codebase's own convention is to keep a correction
    // beside the thing corrected rather than delete it quietly. `base-rates-geometry.ts`'s
    // `ADOPTION_COUNT` doc says "`0.78 * 100` is `78.00000000000001` in IEEE 754 doubles",
    // and `IMPLEMENTATION_COUNT`'s says "`0.06 * 100` is `6.000000000000001`". Neither is
    // true. Both products are EXACT in a double, on 2026-08-08:
    //
    //   $ node -e 'console.log((0.78*100).toPrecision(20), (0.06*100).toPrecision(20))'
    //   78.000000000000000000 6.0000000000000000000
    //
    // The general worry is real — `0.29 * 100` is `28.999999999999996` — so the `Math.round`
    // is correct defensive arithmetic and nothing on the stage is wrong; what is wrong is the
    // two literals the comment picked to illustrate it. The assertions below therefore pin
    // what IS true (the products are exact today, and the rounding is a no-op for these two
    // shares) instead of pinning a drift that does not happen, which would be a test written
    // to agree with a comment rather than with the machine.
    expect(ADOPTION_SHARE * PER_HUNDRED).toBe(78);
    expect(IMPLEMENTATION_SHARE * PER_HUNDRED).toBe(6);
    expect(0.29 * 100).not.toBe(29);
  });

  test("the drawn fields are cut from those counts, and the DOM draws exactly them", () => {
    // The third link in the same chain: copy → count → field. Held against the DOM, so a
    // renderer that drew a literal 78 would pass the two assertions above and fail here.
    expect(fieldRows(ADOPTION_COUNT)).toBe(3);
    expect(fieldRows(IMPLEMENTATION_COUNT)).toBe(1);
    expect(fieldWidth(ADOPTION_COUNT)).toBe(FIELD_WIDTH);
    expect(fieldWidth(IMPLEMENTATION_COUNT)).toBe(IMPLEMENTATION_COUNT * MARK_PITCH - 8);
    expect(fieldHeight(ADOPTION_COUNT)).toBe(ADOPTION_FIELD_HEIGHT);
    expect(fieldHeight(IMPLEMENTATION_COUNT)).toBe(IMPLEMENTATION_FIELD_HEIGHT);
    // A SIX-MARK FIELD IS SIX MARKS WIDE, not 824px of mostly-empty box: any check that
    // measured "the field" would otherwise measure the box rather than the marks.
    expect(fieldWidth(IMPLEMENTATION_COUNT)).toBeLessThan(fieldWidth(ADOPTION_COUNT));
    // A full row tiles the field exactly, so no mark is a fractional pixel and the count has
    // no ragged last line to explain — a remainder would draw the eye to a number the source
    // does not state.
    expect(FIELD_WIDTH).toBe(FIELD_COLS * MARK_SIZE + (FIELD_COLS - 1) * 8);
    expect(ADOPTION_COUNT % FIELD_COLS).toBe(0);

    const { container, unmount } = renderSlide(0);
    const adoptionField = screen.getByTestId("base-rates-adoption-field");
    const implementationField = screen.getByTestId("base-rates-implementation-field");
    expect(parseFloat(adoptionField.style.width)).toBe(fieldWidth(ADOPTION_COUNT));
    expect(parseFloat(adoptionField.style.height)).toBe(ADOPTION_FIELD_HEIGHT);
    expect(parseFloat(implementationField.style.width)).toBe(fieldWidth(IMPLEMENTATION_COUNT));
    expect(parseFloat(implementationField.style.height)).toBe(IMPLEMENTATION_FIELD_HEIGHT);
    // Every mark sits where the module's row-major placement functions put it — FIELD-LOCAL,
    // which is the one place in this directory where a placement function is not measured
    // against the stage, and the reveal is the reason (a field arrives as ONE box).
    marksOf(container, ADOPTION_MARK).forEach((el, i) => {
      expect(parseFloat(el.style.left), `adoption mark ${i}`).toBe(markLeft(i));
      expect(parseFloat(el.style.top), `adoption mark ${i}`).toBe(markTop(i));
    });
    marksOf(container, IMPLEMENTATION_MARK).forEach((el, i) => {
      expect(parseFloat(el.style.left), `implementation mark ${i}`).toBe(markLeft(i));
      expect(parseFloat(el.style.top), `implementation mark ${i}`).toBe(markTop(i));
    });
    // ROW-MAJOR, and it matters: the marks are a QUANTITY, so reading order is the only order
    // there is. A column-major fill would make the field's first row read 0, 3, 6 …
    expect(markTop(0)).toBe(markTop(FIELD_COLS - 1));
    expect(markTop(FIELD_COLS)).toBe(MARK_PITCH);
    expect(markLeft(FIELD_COLS)).toBe(markLeft(0));
    unmount();
  });

  test("nothing is positioned outside the stage or across the NavBar band", () => {
    // Held over every box AND every mark the figure actually paints, read off the DOM, so a
    // box placed with a literal instead of a geometry export is inside the rule too. The
    // marks need their field's origin added back, because their coordinates are the wrapper's.
    const { container, unmount } = renderSlide(investBaseRatesSlide.canonicalPose);

    for (const el of stageBoxes(container)) {
      const id = el.dataset.testid;
      const left = parseFloat(el.style.left);
      const top = parseFloat(el.style.top);
      const width = parseFloat(el.style.width);
      // `base-rates-rule` declares no height — `.copper-rule` takes its 1px from the
      // stylesheet, which jsdom does not compute — so it falls back to the geometry module's
      // own constant rather than letting NaN pass as a number.
      const height = id === "base-rates-rule" ? RULE_HEIGHT : parseFloat(el.style.height);
      expect(Number.isFinite(left), `${id} left`).toBe(true);
      expect(Number.isFinite(top), `${id} top`).toBe(true);
      expect(Number.isFinite(width), `${id} width`).toBe(true);
      expect(Number.isFinite(height), `${id} height`).toBe(true);
      expect(left, `${id} left edge`).toBeGreaterThanOrEqual(SIDE_MARGIN);
      expect(top, `${id} top edge`).toBeGreaterThanOrEqual(CONTENT_TOP);
      expect(left + width, `${id} right edge`).toBeLessThanOrEqual(STAGE.width - SIDE_MARGIN);
      expect(top + height, `${id} vs the NavBar band`).toBeLessThanOrEqual(NAV_ZONE_TOP);
    }

    for (const [testId, fieldTop] of [
      [ADOPTION_MARK, ADOPTION_TOP],
      [IMPLEMENTATION_MARK, IMPLEMENTATION_TOP],
    ] as const) {
      marksOf(container, testId).forEach((el, i) => {
        const left = FIELD_LEFT + parseFloat(el.style.left);
        const top = fieldTop + parseFloat(el.style.top);
        expect(left, `${testId} ${i} left edge`).toBeGreaterThanOrEqual(SIDE_MARGIN);
        expect(left + MARK_SIZE, `${testId} ${i} right edge`).toBeLessThanOrEqual(
          STAGE.width - SIDE_MARGIN,
        );
        expect(top, `${testId} ${i} top edge`).toBeGreaterThanOrEqual(CONTENT_TOP);
        expect(top + MARK_SIZE, `${testId} ${i} vs the NavBar band`).toBeLessThanOrEqual(
          NAV_ZONE_TOP,
        );
      });
    }
    unmount();

    // The field ends ON the right margin rather than near it, which is what makes the figure
    // column the REMAINDER of the measure chain rather than a measured guess.
    expect(FIELD_LEFT + FIELD_WIDTH).toBe(STAGE.width - SIDE_MARGIN);
    expect(FIGURE_COL_WIDTH).toBe(CONTENT_WIDTH - 28 - FIELD_WIDTH);
    // Band 3's two columns are EQUAL and tile the content width — the band is NOT cut 78/6,
    // because the two claims are the same SIZE of claim and cutting the columns to the rates
    // would say the majority reading matters thirteen times more.
    expect(READING_COL_COUNT).toBe(2);
    expect(readingColLeft(0)).toBe(SIDE_MARGIN);
    expect(readingColLeft(1) + READING_COL_WIDTH).toBe(STAGE.width - SIDE_MARGIN);
    expect(READING_COL_WIDTH).toBe((CONTENT_WIDTH - 28) / READING_COL_COUNT);

    // AND THE CLEARANCE IS DERIVED FROM BOTH ENDS, so an edit anywhere above moves it and
    // this fails before the stage crosses the band.
    expect(NAV_ZONE_CLEARANCE).toBe(NAV_ZONE_TOP - (CLOSER_TOP + CLOSER_HEIGHT));
    expect(NAV_ZONE_CLEARANCE).toBeGreaterThan(0);
    expect(NAV_ZONE_CLEARANCE).toBe(27);
  });

  test("the renderer reads the module's shelves, not private copies", () => {
    // Spot-welds between DOM style and geometry export — one per band, so a renderer that
    // re-derived a shelf locally fails here by name. The bands read top to bottom.
    const { unmount } = renderSlide(investBaseRatesSlide.canonicalPose);
    const top = (id: string) => parseFloat(screen.getByTestId(id).style.top);
    expect(top("base-rates-eyebrow")).toBe(STATISTIC_EYEBROW_TOP);
    expect(top("base-rates-source")).toBe(SOURCE_TOP);
    expect(top("base-rates-adoption-figure")).toBe(ADOPTION_TOP);
    expect(top("base-rates-adoption-field")).toBe(ADOPTION_TOP);
    expect(top("base-rates-adoption-label")).toBe(ADOPTION_LABEL_TOP);
    expect(top("base-rates-implementation-figure")).toBe(IMPLEMENTATION_TOP);
    expect(top("base-rates-implementation-field")).toBe(IMPLEMENTATION_TOP);
    expect(top("base-rates-implementation-label")).toBe(IMPLEMENTATION_LABEL_TOP);
    expect(top("base-rates-rule")).toBe(RULE_TOP);
    expect(top("base-rates-reading-eyebrow")).toBe(READING_EYEBROW_TOP);
    expect(top("base-rates-adoption-reading")).toBe(READING_LINE_TOP);
    expect(top("base-rates-implementation-reading")).toBe(READING_LINE_TOP);
    expect(top("base-rates-closer")).toBe(CLOSER_TOP);
    // A NUMERAL AND THE MARKS IT COUNTS START ON THE SAME LINE, which is the whole of what
    // binds them — asserted as one equality per row rather than as two shelves that happen to
    // agree today.
    expect(top("base-rates-adoption-figure")).toBe(top("base-rates-adoption-field"));
    expect(top("base-rates-implementation-figure")).toBe(top("base-rates-implementation-field"));
    // Widths: the two full-bleed bands span the content width; the figure column and the two
    // reading columns take their own.
    const width = (id: string) => parseFloat(screen.getByTestId(id).style.width);
    expect(width("base-rates-eyebrow")).toBe(CONTENT_WIDTH);
    expect(width("base-rates-source")).toBe(CONTENT_WIDTH);
    expect(width("base-rates-rule")).toBe(CONTENT_WIDTH);
    expect(width("base-rates-closer")).toBe(CONTENT_WIDTH);
    expect(width("base-rates-adoption-figure")).toBe(FIGURE_COL_WIDTH);
    expect(width("base-rates-adoption-reading")).toBe(READING_COL_WIDTH);
    expect(parseFloat(screen.getByTestId("base-rates-adoption-reading").style.left)).toBe(
      readingColLeft(0),
    );
    expect(parseFloat(screen.getByTestId("base-rates-implementation-reading").style.left)).toBe(
      readingColLeft(1),
    );
    // Heights, one per register, so a box cut for one line cannot silently be cut for two.
    expect(parseFloat(screen.getByTestId("base-rates-eyebrow").style.height)).toBe(EYEBROW_HEIGHT);
    expect(parseFloat(screen.getByTestId("base-rates-source").style.height)).toBe(SOURCE_HEIGHT);
    expect(parseFloat(screen.getByTestId("base-rates-adoption-figure").style.height)).toBe(
      FIGURE_HEIGHT,
    );
    expect(parseFloat(screen.getByTestId("base-rates-adoption-reading").style.height)).toBe(
      READING_LINE_HEIGHT,
    );
    expect(parseFloat(screen.getByTestId("base-rates-closer").style.height)).toBe(CLOSER_HEIGHT);
    unmount();
  });

  test("the placement guards refuse a third field, a fourth row and a third column", () => {
    // THE GUARDS ARE THE MODULE'S OWN ARGUMENT, MADE EXECUTABLE, and each message names what
    // the illegal call would MEAN rather than what it would compute — "a third field would be
    // a third rate, and the source states two". That is the same sentence gh#70's AC writes,
    // so a caller who trips one of these reads the AC in the stack trace.
    for (const [name, fn] of [
      ["fieldRows", fieldRows],
      ["fieldWidth", fieldWidth],
      ["fieldHeight", fieldHeight],
    ] as const) {
      expect(() => fn(0), name).toThrow(/no field of 0 marks/);
      expect(() => fn(ADOPTION_COUNT + 1), name).toThrow(/no field of 79 marks/);
      expect(() => fn(1.5), name).toThrow(/no field of 1.5 marks/);
      expect(() => fn(Number.NaN), name).toThrow(/no field of NaN marks/);
      expect(() => fn(-1), name).toThrow(/A third field would be a third rate/);
      // …and both real counts are placed by all three.
      for (const count of [ADOPTION_COUNT, IMPLEMENTATION_COUNT]) {
        expect(Number.isFinite(fn(count)), `${name}(${count})`).toBe(true);
      }
    }
    for (const [name, fn] of [
      ["markLeft", markLeft],
      ["markTop", markTop],
    ] as const) {
      expect(() => fn(ADOPTION_COUNT), name).toThrow(/no mark 78/);
      expect(() => fn(ADOPTION_COUNT), name).toThrow(new RegExp(name));
      expect(() => fn(ADOPTION_COUNT), name).toThrow(/NavBar band/);
      expect(() => fn(-1), name).toThrow(/no mark -1/);
      expect(() => fn(1.5), name).toThrow(/no mark 1.5/);
      // BOTH GUARD THEIR OWN INDEX rather than leaning on the other's: `78 % 26` is a legal
      // column, so a 79th mark would otherwise be placed silently on top of the 53rd.
      for (let i = 0; i < ADOPTION_COUNT; i += 1) {
        expect(Number.isFinite(fn(i)), `${name}(${i})`).toBe(true);
      }
    }
    // Band 3 holds the two readings of ONE pair, and a third column would be a reading of a
    // rate the source does not state.
    expect(() => readingColLeft(READING_COL_COUNT)).toThrow(/no column 2/);
    expect(() => readingColLeft(-1)).toThrow(/no column -1/);
    expect(() => readingColLeft(0.5)).toThrow(/no column 0.5/);
  });
});

// ── the boundaries: what a sibling already spent ─────────────────────────────

/**
 * What this slide may not say, and which slide owns each thing.
 *
 * `content.ts`'s block header lists these as prose ("WHAT THIS SLIDE MAY NOT SAY, because a
 * sibling owns each of these"); this is that list made checkable. EVERY PATTERN IS FIRED
 * against the real strings of the slide that owns it — measured on 2026-08-08 — so a list
 * that drifted out of date fails loudly instead of passing vacuously.
 *
 * THE FIRST ENTRIES ARE SPEC CONSTRAINTS, NOT STYLE RULES. §6.2 binds the deck's three
 * shadow-AI passes to share no image and no statistic; §6.1 owns the 70% and the split bar,
 * and gh#70 applies the same disjointness test ACROSS sections, which is why the figure here
 * is a repeated mark rather than a second partitioned bar.
 */
const SIBLING_TOKENS: ReadonlyArray<readonly [string, RegExp, string]> = [
  ["70%", /\b70\s*%/, "B.1"],
  ["30%", /\b30\s*%/, "B.1"],
  ["people & process", /people\s*&\s*process/i, "B.1"],
  ["tool access", /\btool access\b/i, "B.1"],
  ["capability", /\bcapabilit\w*\b/i, "B.1 · B.4 · B.5"],
  ["70/30", /\b70\s*\/\s*30\b/, "B.5"],
  ["L1–L5", /\bL[1-5]\b/, "B.5"],
  ["rungs", /\brungs?\b/i, "B.5"],
  ["ladder", /\bladder\b/i, "B.5"],
  ["improvise", /\bimprovis\w*\b/i, "B.2 · §6.2"],
  ["the pattern", /\bpattern\b/i, "B.4"],
  ["shadow", /\bshadow\b/i, "§6.2 · D.4"],
  ["SOP", /\bSOPs?\b/, "§6.2 · D.4"],
  ["deadlock", /\bdeadlock\w*\b/i, "D.3"],
  ["shared accounts", /\bshared account\w*\b/i, "D.3"],
  ["seats", /\bseats?\b/i, "D.3 · D.5"],
  ["a price", /(?:USD|US\$|IDR|Rp|EUR|€|\$)\s?\d/, "D.2 · D.5"],
];

/** The corpora the patterns above are fired against, by owner. Modules, not transcriptions —
 *  a token can migrate either way and only the receiving file notices. */
const SIBLING_CORPORA: Readonly<Record<string, () => string[]>> = {
  "B.1": () => walkStrings(gapHardestPartContent),
  "B.2": () => walkStrings(gapNoSopContent),
  "B.4": () => walkStrings(gapThePatternContent),
  "B.5": () => walkStrings(gapLadderContent),
  "D.3": () => walkStrings(investChickenEggContent),
  "D.4": () => [
    ...walkStrings(investSecurityContent),
    ...walkStrings(onPremCallbackFor("berau")),
    ...walkStrings(onPremCallbackFor("gems")),
  ],
  "D.5": () => [
    ...walkStrings(investSubscriptionContent),
    ...walkStrings(priceAnchorFor("berau")),
    ...walkStrings(priceAnchorFor("gems")),
  ],
};

/**
 * §6.2's spelling that NO sibling renders, kept anyway and said out loud rather than quietly
 * padded into the list above.
 *
 * "no guidance" is the SPEC's phrasing for B.2's argument; `gap-no-sop` renders its own image
 * instead and never prints it. `gap-three-failures.test.tsx` records the same split for the
 * same token. It is refused here because a later author is as likely to lift the spec's
 * sentence as the neighbour's copy, and it is controlled against the spec sentence — which is
 * where it is still the only source.
 */
const SPEC_ONLY_TOKENS: ReadonlyArray<readonly [string, RegExp]> = [
  ["no guidance", /\bno guidance\b/i],
  ["no SOP", /\bno[-\s]SOP\b/i],
];

const SPEC_SENTENCES: readonly string[] = [
  "There is no guidance, so people improvise.",
  "gap-no-sop",
];

describe("the sibling boundaries", () => {
  test("spends no image or statistic a sibling already owns", () => {
    const authored = authoredStrings();
    const { container, unmount } = renderSlide(investBaseRatesSlide.canonicalPose);
    const stage = stageTextWithoutFigLabel(container);
    expect(stage.length, "a rule over an empty stage proves nothing").toBeGreaterThan(400);

    for (const [name, pattern, owner] of [
      ...SIBLING_TOKENS,
      ...SPEC_ONLY_TOKENS.map(([n, p]) => [n, p, "§6.2"] as const),
    ]) {
      for (const copy of authored) {
        expect(pattern.test(copy), `${owner}'s "${name}" in ${JSON.stringify(copy)}`).toBe(false);
      }
      expect(pattern.test(stage), `${owner}'s "${name}" reached the stage`).toBe(false);
    }
    unmount();

    // THE FOUR UNRELATED 70/30s THIS SLIDE STAYS OUT OF, and two of them sit within a page of
    // this pair in the SAME source deck: §6.5's L3 decision contract, §6.1's adoption-failure
    // split, the older execution/planning split on the research's own slide 3 (line 105,
    // directly above the pair's line 106), and HR slide 12's sharpen-the-axe principle. Four
    // splits, one number, no relation between any two — so no string here prints 70 or 30 in
    // any form, and no drawing on this stage partitions anything into two complementary parts.
    for (const copy of [...authored, stage]) {
      expect(copy, `a bare 70 or 30 in ${JSON.stringify(copy)}`).not.toMatch(/\b(70|30)\b/);
    }
  });

  test("every boundary pattern still fires on the slide it was read off", () => {
    // NINETEEN REGEXES THAT MATCHED NOTHING would make the rule above pass on copy lifted
    // verbatim from any of six neighbours, so each is fired against that slide's REAL strings.
    for (const [name, pattern, owner] of SIBLING_TOKENS) {
      const owners = owner.split(" · ");
      expect(
        owners.some((key) => (SIBLING_CORPORA[key]?.() ?? []).some((copy) => pattern.test(copy))),
        `"${name}" is not ${owner}'s any more`,
      ).toBe(true);
    }
    // The two spec-only spellings, controlled against §6.2's own sentence and the slide id it
    // names — and asserted NOT to be rendered by B.2, which is the split that keeps the
    // control honest rather than assumed.
    for (const [name, pattern] of SPEC_ONLY_TOKENS) {
      expect(SPEC_SENTENCES.some((line) => pattern.test(line)), name).toBe(true);
      expect(
        SIBLING_CORPORA["B.2"]().some((line) => pattern.test(line)),
        `${name} is rendered by B.2 after all — move it into SIBLING_TOKENS`,
      ).toBe(false);
    }
    // And each corpus is a real one, so "fires on nothing" cannot be hiding behind an empty
    // list of strings.
    for (const [key, corpus] of Object.entries(SIBLING_CORPORA)) {
      expect(corpus().length, `${key}'s corpus is empty`).toBeGreaterThan(10);
    }
  });

  test("tells no story, names no organisation, and makes no turn to the room", () => {
    // The three registers this slide is NOT in, each owned elsewhere: §6.3's first-person
    // confession, D.2's local evidence, and D.3's / M.1's turn to the room. This slide states
    // a base rate about everybody else and prices the default — which is why it can be the
    // same bytes in both leader rooms, and the `no brand variance` block above is the other
    // end of that argument.
    for (const copy of authoredStrings()) {
      expect(copy, `first person in ${JSON.stringify(copy)}`).not.toMatch(
        /\b(we|we're|we've|our|ours|us|I|I'm|I've|my|mine)\b/i,
      );
      expect(copy, `second person in ${JSON.stringify(copy)}`).not.toMatch(
        /\b(you|your|yours|you're|you've)\b/i,
      );
    }
    // POSITIVE CONTROL, fired against the slide that IS allowed to make the turn — its own
    // string, not a sentence written here to make the regex fire.
    expect(/\b(you|your)\b/i.test(investChickenEggContent.turn)).toBe(true);
  });
});
