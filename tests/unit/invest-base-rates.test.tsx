// THE BASE RATE, AND WHAT IT EARNS · slide tests. All five poses, and the rules the
// 2026-08-14 rework states — held over EVERY authored string, over the RENDERED stage, and
// over the COMPOSED decks rather than spot-checked.
//
// WHAT THIS FILE CAN AND CANNOT PROVE — its four `leader-invest` siblings' preamble and
// `gap-hardest-part.test.tsx`'s, inherited. jsdom has no layout and no media queries, so
// nothing here measures a painted pixel and `prefers-reduced-motion: reduce` cannot really be
// toggled. What a DOM-less runner is good for is what THIS slide is actually at risk of, and
// this slide's five risks are not its siblings':
//
//   1. A CITATION THAT DRIFTS OFF THE REPORT IT NAMES. This slide's provenance rule INVERTED
//      on 2026-08-14. gh#70 built it on a pair the research named no owner for, so the whole
//      risk was an editor "strengthening" the attribution with a consultancy, a year or an
//      `n =` nobody ever read, and the test was a forbidden-token sweep. The pair turned out
//      to be a cross-wave mashup that no study states (`content.ts`'s block header carries the
//      trace), and the stage now quotes ONE McKinsey report. So the rule is now two-sided: the
//      citation MUST carry the publisher, the report title, the month, the sample size, the
//      nation count and the field window, and it must carry NO OTHER publisher, no URL, no
//      page reference, no read date and no claim that this deck verified anything. Both halves
//      are held below, and every forbidden pattern is fired against a control corpus.
//   2. A FIGURE FROM A DIFFERENT STUDY ARRIVING BESIDE THESE THREE. Six real published
//      numbers were considered and rejected while resourcing this slide — 1%, 4%, 5%, 25%,
//      26%, 55%, 95%, 5.5% — each from a different population. Quoting any of them would
//      invent nothing and would still make this slide two arguments. Held as a shape rule over
//      the whole rendered stage (the only number-shaped tokens outside the citation are the
//      three the report gives) rather than as a check for one absent string.
//   3. THE RATES AND THEIR DRAWING DISAGREEING. Each grid's fill is cut from `PRIOR_SHARE`,
//      `ADOPTION_SHARE` and `IMPLEMENTATION_SHARE`, which are 0.78, 0.88 and 0.06 because
//      `content.ts`'s three figure strings say 78%, 88% and 6%. Nothing at runtime reads those
//      strings — `base-rates-geometry.ts` cannot import `content.ts` at all, for the
//      documented `@/` reason — so the weld is held HERE, as a cross-module assertion, and it
//      is the failure nobody would see on a projector: a reword that moved a percentage and
//      left the fill alone renders perfectly and lies.
//   4. THE SUPERSESSION LEAKING. The left plate prints TWO figures in one slot: 78% at pose 1
//      only, 88% from pose 2 on. That is the one non-monotonic gate on the stage, and the two
//      ways it can break are both invisible to a screenshot of the canonical pose — the two
//      figures showing at once, or the earlier rate vanishing from the stage entirely (it must
//      survive inside `adoptionNote`, or the room is asked to take a rise on trust).
//   5. FOUR SIBLING FIGURES NOT STEPPING. This slide is a HEAD-OF-RUN insert. §11's
//      2026-08-05 amendments wrote its arrival in advance and all four rows behind it move
//      with NO EDIT to any of their files. That is §3.5 doing the work, and it is a
//      composition fact, so it is asserted against the composer and not against a literal
//      list.
//
// WHAT IS LEFT TO THE BROWSER WALK: the reduce-mode half of the zero-SMIL AC that a media
// query actually decides (held here at every pose under BOTH a reduce-matching and a
// no-preference `matchMedia` stub, plus the structural fact that makes it true by construction
// — the figure mounts no `<svg>` at all); the real wrap of the two-line citation against
// `CITATION_HEIGHT`, of the two labels against their 256px column and of the two readings
// against `READING_HEIGHT`; the painted colour ladder, including whether an unfilled
// `--copper-800` square reads as a frame rather than as a smudge at the back of a room; and
// whether the fill sweep reads as a flood rather than as a flicker.
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
// strings of the slide that owns it, so a list that drifted out of date fails loudly instead
// of passing vacuously — the rule `gap-three-failures.test.tsx` establishes and this file
// inherits wholesale (from `gap-failures-pattern.test.tsx` now — the rule outlived the file
// that established it). `NOT_AUDITED` and `ownProofFor` are imported for the
// same reason on the other side: they are the SHIPPED strings the forbidden-provenance
// patterns are anchored to, where a shipped string exists to anchor to. `priceAnchorFor` used
// to be a third; the `invest` merge retired the slide that exported it, and the one pattern it
// anchored is now controlled against an invention — see `SHIPPED_PROVENANCE`. `b5Content` is
// imported for a reason none of the others is — see `the E.5 overlap` at the bottom.
import {
  gapHardestPartContent,
  gapLadderContent,
  gapNoSopContent,
  gapFailuresPatternContent,
} from "@/slides/leader-gap/content";
import {
  NOT_AUDITED,
  investChickenEggContent,
  investGovernanceContent,
  ownProofFor,
} from "@/slides/leader-invest/content";
import { b5Content } from "@/slides/landscape-section-b/content";
import {
  ADOPTION_COUNT,
  ADOPTION_SHARE,
  CITATION_HEIGHT,
  CITATION_TOP,
  CLOSER_HEIGHT,
  CLOSER_TOP,
  CONTENT_TOP,
  CONTENT_WIDTH,
  EYEBROW_HEIGHT,
  FIGURE_HEIGHT,
  FIGURE_TOP,
  GRID_BOTTOM,
  GRID_COLS,
  GRID_ROWS,
  GRID_SIZE,
  GRID_TOP,
  IMPLEMENTATION_COUNT,
  IMPLEMENTATION_SHARE,
  LABEL_HEIGHT,
  LABEL_TOP,
  MARK_BORDER,
  MARK_PITCH,
  MARK_SIZE,
  NAV_ZONE_CLEARANCE,
  NAV_ZONE_TOP,
  NOTE_BOTTOM,
  NOTE_TOP,
  PER_HUNDRED,
  PLATE_COUNT,
  PLATE_GAP,
  PLATE_WIDTH,
  READING_BORDER,
  READING_BOX_HEIGHT,
  READING_PAD_X,
  READING_PAD_Y,
  READING_TEXT_WIDTH,
  READING_TOP,
  RULE_HEADROOM,
  RULE_HEIGHT,
  RULE_TOP,
  SIDE_MARGIN,
  STAGE,
  TEXT_COL_WIDTH,
  UNIT_EYEBROW_TOP,
  isFilled,
  markLeft,
  markTop,
  plateLeft,
  textColLeft,
} from "@/slides/leader-invest/base-rates-geometry";

const C = investBaseRatesContent;
const POSES = [0, 1, 2] as const;
const SLIDE_ID = "invest-base-rates";
const LEADER_BRANDS: readonly Brand[] = ["berau", "gems"];

/**
 * The four slides this one composes in front of, in the order §6.7 gives them.
 *
 * A LIST OF IDS AND NOT OF FIGURES. Every number those four print is derived per deck (§3.5)
 * and this slide's ticket may pin none of them — so what is written down here is the ORDER,
 * which is a composition fact this file reads off `DECK_SET_COMPOSITION`, and the figures are
 * computed from the composer in `the composed decks` below.
 */
// THREE AND NOT FOUR SINCE THE `invest` MERGE. `invest-security` and `invest-subscription`
// were the run's last two rows and are one row now, `invest-governance`; the run is four long,
// so this slide has three siblings behind it. Every count in this file that reads "four
// siblings" or "FOUR numbers moved" is derived from this list rather than typed beside it.
const SIBLING_IDS: readonly string[] = [
  "invest-own-proof",
  "invest-chicken-egg",
  "invest-governance",
];

/**
 * The position this slide holds in the decks that will run it.
 *
 * `at` IS required here, the case all four `leader-invest` siblings and all five `leader-gap`
 * ones document: unit tests resolve the default `general` deck, `general` has no leader
 * variant, and this slide reaches the two leader deck sets alone. D.1 because `invest` is the
 * leader decks' fourth run (§4.3) and this slide composes at its head — a harness INPUT, not a
 * claim the slide makes (§3.5), and the composed decks below are where that pair is actually
 * derived and checked. No file under `src/slides/leader-invest/` names either half of it,
 * which is the rule the derived-numbering block holds.
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
// FOURTEEN BOXES AND TWO HUNDRED SQUARES, and the two are kept apart everywhere below. A
// square is not a box: it carries no `Reveal` of its own, no text and no identity — it is one
// unit of a quantity. Every census, sweep and bounds check below therefore splits the two
// rather than counting 214 elements and hoping.
//
// ALL FOURTEEN ARE MONOTONIC — revealed at their band's pose and never again hidden. THERE IS
// NO SUPERSEDED BOX ANY MORE: the left plate used to print two figures in one slot (78% at
// pose 1 only, 88% from pose 2 on) and the year-ago rate went with the 2026-08-14 owner cut,
// so this stage has no non-monotonic gate left to police.
//
// TWO OF THE FOURTEEN ARE NOT `Reveal`s. The two grid wrappers are plain positioned boxes —
// the plate's reveal belongs to its hundred SQUARES, each of which fades and scales in on its
// own delay, which is what makes a plate BUILD rather than appear. `revealed()` and
// `arrival()` below read those two off the squares instead of off a `.fade` class.

const POSE_0_IDS = [
  "base-rates-eyebrow",
  "base-rates-citation",
  "base-rates-grid-adoption",
  "base-rates-adoption-figure",
  "base-rates-adoption-label",
  "base-rates-adoption-note",
  "base-rates-adoption-reading",
];
const POSE_1_IDS = [
  "base-rates-grid-implementation",
  "base-rates-implementation-figure",
  "base-rates-implementation-label",
  "base-rates-implementation-note",
  "base-rates-implementation-reading",
];
const POSE_2_IDS = ["base-rates-rule", "base-rates-closer"];

const MONOTONIC_AT: ReadonlyArray<readonly string[]> = [POSE_0_IDS, POSE_1_IDS, POSE_2_IDS];

const EVERY_BOX = MONOTONIC_AT.flat();

/** The two square hooks. Named once so the split above cannot be quietly widened. */
const ADOPTION_MARK = "base-rates-adoption-mark";
const IMPLEMENTATION_MARK = "base-rates-implementation-mark";
const MARK_IDS = new Set([ADOPTION_MARK, IMPLEMENTATION_MARK]);

/** The two boxes whose reveal is carried by their children rather than by a `.fade` class. */
const GRID_IDS = new Set(["base-rates-grid-adoption", "base-rates-grid-implementation"]);

/** The three boxes with no text of their own — the copper rule's wrapper and the two grid
 *  wrappers, whose entire content is squares. Named once, so the "the copy is there, not
 *  merely the box" checks below cannot be quietly widened. */
const TEXTLESS_IDS = new Set([
  "base-rates-rule",
  "base-rates-grid-adoption",
  "base-rates-grid-implementation",
]);

/**
 * The element whose class carries a box's reveal — the sibling files' two-shape reader. Ten of
 * the fourteen boxes ARE `Reveal`s; `base-rates-rule`'s testid sits on a positioned wrapper
 * around a `CopperRule`, because that primitive spreads no `data-*` props; and the two grids
 * are not `.fade` boxes at all, so this throws on them by design — {@link revealed} and
 * {@link arrival} route those to their squares instead.
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

/** One plate's squares, read off the wrapper rather than off the document, so a grid's own
 *  reveal state is a question about ITS squares. */
function gridMarks(id: string): HTMLElement[] {
  return [...screen.getByTestId(id).querySelectorAll<HTMLElement>("[data-filled]")];
}

/**
 * Is this box on the stage at this pose?
 *
 * TWO READERS BEHIND ONE NAME, and the split is the figure's construction rather than a
 * convenience: a `Reveal` says so with `.fade.on`, and a PLATE says so by every one of its
 * hundred squares sitting at full opacity. A plate that revealed half its squares would be
 * neither, and would fail here rather than pass on the wrapper's class.
 */
function revealed(id: string): boolean {
  if (GRID_IDS.has(id)) {
    const marks = gridMarks(id);
    if (marks.length !== PER_HUNDRED) {
      throw new Error(`"${id}" holds ${marks.length} squares, not ${PER_HUNDRED}`);
    }
    return marks.every((el) => el.style.opacity === "1");
  }
  return fade(id).classList.contains("on");
}

/** How many milliseconds into its pose a box arrives. Throws on an unrevealed box — both the
 *  `Reveal` primitive and this figure's squares zero their delay while `on` is false, so there
 *  is no arrival to read. A plate's arrival is its FIRST square's, which is the moment the
 *  build starts. */
function arrival(id: string): number {
  if (GRID_IDS.has(id)) {
    if (!revealed(id)) {
      throw new Error(`"${id}" is not revealed at this pose, so it has no arrival`);
    }
    const first = gridMarks(id)[0];
    const ms = parseFloat(first.style.transitionDelay);
    if (!Number.isFinite(ms)) throw new Error(`"${id}" carries no readable square delay`);
    return ms;
  }
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

/** How long after its plate's first square the LAST one arrives: 594ms — 99 gaps of 6. The
 *  figure's own `FLOOD_MS` is a hundred of them; this is what the DOM can actually show. */
const FLOOD_SPAN_MS = 594;

/** This slide's own boxes, squares excluded — fourteen elements at every pose. */
function stageBoxes(container: HTMLElement): HTMLElement[] {
  return [...container.querySelectorAll<HTMLElement>("[data-testid^='base-rates-']")].filter(
    (el) => !MARK_IDS.has(el.dataset.testid ?? ""),
  );
}

/** One plate's squares, in DOM order — always a hundred of them. */
function marksOf(container: HTMLElement, testId: string): HTMLElement[] {
  return [...container.querySelectorAll<HTMLElement>(`[data-testid='${testId}']`)];
}

/** How many of one plate's squares are FILLED. `data-filled` is what the component writes,
 *  because jsdom resolves no `var()` and comparing a background to a token string would be
 *  comparing the component to itself.
 *
 *  A PLATE IS ALWAYS DRAWN AT ITS FINAL FILL, at every pose, which is the 2026-08-14 change
 *  this helper's callers all turn on: the fill is no longer derived from the pose, the plate's
 *  ARRIVAL is. {@link revealed} is what says whether the room can see it. */
function filledCount(container: HTMLElement, testId: string): number {
  return marksOf(container, testId).filter((el) => el.dataset.filled === "true").length;
}

/** Everything the stage renders, minus the one element that legitimately prints a DERIVED
 *  figure reference. Stripped from a CLONE: React owns those nodes and removing one behind its
 *  back throws on the next commit. */
function stageTextWithoutFigLabel(container: HTMLElement): string {
  const stripped = container.cloneNode(true) as HTMLElement;
  stripped.querySelector(".fig-label")?.remove();
  return stripped.textContent ?? "";
}

/** The same, minus the CITATION too — the one box on this stage that legitimately carries
 *  numerals of its own (a publication month, a sample size, a nation count). The two-rates
 *  sweep runs on this; the citation's own numerals are pinned separately, so neither can hide a
 *  new figure behind the other. */
function stageTextWithoutFigLabelOrCitation(container: HTMLElement): string {
  const stripped = container.cloneNode(true) as HTMLElement;
  stripped.querySelector(".fig-label")?.remove();
  stripped.querySelector("[data-testid='base-rates-citation']")?.remove();
  return stripped.textContent ?? "";
}

/** The label half of the `FigLabel` — its last span, which is the only part of that element
 *  this slide authors. The reference in front of it is the composer's. */
function figLabelText(container: HTMLElement): string {
  const spans = container.querySelectorAll(".fig-label span");
  return spans[spans.length - 1]?.textContent ?? "";
}

/** Every number-shaped token in a string, as the set of what it prints. A SET and not a list,
 *  because "78%" legitimately appears twice on this stage — once as the superseded figure and
 *  once inside the note that keeps it checkable. */
function numeralsIn(text: string): string[] {
  return [...new Set([...text.matchAll(/\d[\d.,]*\s*%?/g)].map((m) => m[0].trim()))].sort();
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

/** Every string this slide can put on a stage. ONE block, because this slide has no brand axis
 *  at all — see the `no brand variance` describe, which holds that as a rule rather than
 *  assuming it here. */
const authoredStrings = (): string[] => walkStrings(C);

/**
 * The FOUR PROSE strings, each with the `*Kw` sibling the copy module pairs it with.
 *
 * Four and not five: the two readings are prose, the headline is prose, the closer is prose,
 * and the CITATION is not — it is a citation, and `highlight()` on one would read as the deck
 * editing its own source line. That single decision is the whole of why this partition is
 * worth writing down.
 */
const PROSE: ReadonlyArray<readonly [string, string, readonly string[]]> = [
  ["headline", C.headline, C.headlineKw],
  ["adoptionReading", C.adoptionReading, C.adoptionReadingKw],
  ["implementationReading", C.implementationReading, C.implementationReadingKw],
  ["closer", C.closer, C.closerKw],
];

/** The NINE LABEL strings, which carry no `*Kw` and may not gain one. Written out as a list
 *  on purpose: together with `PROSE` it is checked against what the STAGE actually prints, so
 *  a fourteenth printed string has to pick a side before it can render. */
const LABELS: readonly string[] = [
  C.figLabel,
  C.unitEyebrow,
  C.citation,
  C.adoptionFigure,
  C.adoptionLabel,
  C.adoptionNote,
  C.implementationFigure,
  C.implementationLabel,
  C.implementationNote,
];

/** Every string this slide PRINTS — the two sides of the keyword rule, together. */
const printedStrings = (): string[] => [...PROSE.map(([, copy]) => copy), ...LABELS];

/**
 * What the stage prints, read off the DOM: the headline, the fig label's own half, and every
 * box that carries type. The two grid wrappers and the rule carry none.
 *
 * POSE-INVARIANT. `Reveal` mounts its children whatever its `on` state, so the right plate's
 * "6%" is in the document from pose 0 — un-revealed, but present. That is the property the
 * sweeps below rely on: a string that only a later pose SHOWS is still inside every rule here.
 */
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
// reaches the DOM. Two of this slide's build rules cannot be checked any other way: "no hex
// literals" is a claim about a colour that is never authored, so a stage that happens to paint
// none today would pass a DOM sweep while a hex sat one branch away; and "imports no
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

/** Block and line comments removed, so a doc comment that NAMES the construction it forbids is
 *  not counted as that construction. `f8-your-agentic-os.test.tsx`'s stripper, reused rather
 *  than re-invented; the `[^:]` guard is what keeps `https://` intact. */
function stripComments(src: string): string {
  return src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:])\/\/.*$/gm, "$1");
}

// ── the slide def ────────────────────────────────────────────────────────────

describe("the slide def", () => {
  test("declares 3 poses with the fullest one canonical, and claims a number", () => {
    // THE ID IS THE FILE'S BASENAME, checked against the file this test actually reads rather
    // than against a second copy of the string. §4.1's slot lookup joins the deck-set lists to
    // the catalogue by id, and `deck-slide-ids.test.ts` holds the rule deck-wide; what is added
    // here is that the file the rule points at EXISTS, because `readFileSync` below would throw
    // if it did not.
    expect(investBaseRatesSlide.id).toBe(basename(SLIDE_FILE, ".tsx"));
    expect(investBaseRatesSlide.id).toBe(SLIDE_ID);
    expect(sourceOf(SLIDE_FILE).length).toBeGreaterThan(1000);

    // THREE, AND IT WAS FIVE THIS MORNING. The 2026-08-14 rework cut three poses into five,
    // one job each — the unit and the source, last year's rate, this year's, what it earned,
    // and the price. The owner's cut the same afternoon took two of them back out: the
    // year-ago rate was a second argument, and a pose whose whole content was two EMPTY
    // hundreds was a pose that argued nothing. What is left is one pose per plate and one for
    // the price.
    expect(investBaseRatesSlide.steps).toBe(3);
    // The exported PDF and PPTX have no presenter attached, so the exported frame must be the
    // one that is safe to read alone. Anything lower would export a stage whose largest objects
    // are two of somebody else's percentages with no sentence saying what this deck concludes
    // from them — and for THIS slide in particular that is the one way it travels badly: a page
    // that shows a base rate and asks for nothing is a page somebody else can re-caption.
    expect(investBaseRatesSlide.canonicalPose).toBe(2);
    expect(investBaseRatesSlide.canonicalPose).toBe(investBaseRatesSlide.steps - 1);
    expect(investBaseRatesSlide.animationMode).toBe("step-reveal");
    expect(investBaseRatesSlide.surface).toBe("dark");
    expect(investBaseRatesSlide.sectionKey).toBe("invest");

    // `numbered` IS NOT SET, AND ITS ABSENCE IS THE ASSERTION. The composer reads
    // `def.numbered !== false` (§3.4 R3), so `numbered: false` would make this slide claim no
    // figure — and `FigLabel` throws on a slide that prints a caption with `num === null`
    // (`src/components/FigLabel.tsx`). Setting it here would therefore turn the head of the WHY
    // INVEST run into a crash, and setting it `true` would be the one field in this file that
    // restated a default. Held as a key absence AND as the composed consequence below, where
    // the row's `num` comes back as 1 rather than null.
    expect("numbered" in investBaseRatesSlide).toBe(false);
    expect(investBaseRatesSlide.numbered).toBeUndefined();
  });

  test("canonicalPose is the fullest pose — every box is revealed and nothing is withheld", () => {
    // "Fullest" is a claim about the reveal state and not about the pose index, so it is checked
    // as one. IT IS ALSO SIMPLER THAN IT WAS: the exported frame used to show fourteen of
    // sixteen boxes, because the left plate's earlier figure and its note were superseded on
    // purpose. Every box on this stage is now monotonic, so the canonical pose shows all
    // fourteen and an exported page withholds nothing.
    const { container, unmount } = renderSlide(investBaseRatesSlide.canonicalPose);
    for (const id of EVERY_BOX) expect(revealed(id), id).toBe(true);
    expect(stageBoxes(container).map((el) => el.dataset.testid).sort()).toEqual(
      [...EVERY_BOX].sort(),
    );
    unmount();
  });
});

describe("the pose count the component actually distinguishes", () => {
  test("is exactly 3 — poses 0…2 each change the stage, and there is no fourth", () => {
    // `steps` IS A CONTRACT WITH `DeckProvider`, and nothing else checks that the number in the
    // def is the number of stages the figure draws. Held by rendering the figure BARE at four
    // pose indices and comparing markup: 0 → 1 → 2 must each change the stage, and 3 must
    // change nothing.
    //
    // A `steps: 4` with no fourth gate would give the room a dead click at the end of the
    // slide; a fourth gate with `steps: 3` would hide a band the author wrote. Both fail here,
    // and neither fails anywhere else in the suite.
    const markup = [0, 1, 2, 3].map((pose) => {
      const { container, unmount } = render(<BaseRatesBeats pose={pose} />);
      const html = container.innerHTML;
      unmount();
      return html;
    });
    for (let i = 0; i < 2; i += 1) {
      expect(markup[i], `pose ${i} and pose ${i + 1} render the same stage`).not.toBe(
        markup[i + 1],
      );
    }
    expect(markup[2]).toBe(markup[3]);
    expect(new Set(markup).size).toBe(investBaseRatesSlide.steps);
    // Not vacuously: the figure renders something at every one of them, and two hundred squares
    // means every pose is a long document.
    for (const html of markup) expect(html.length).toBeGreaterThan(20000);
  });
});

// ── AC · the three rates ─────────────────────────────────────────────────────

describe("the two rates, and only the two", () => {
  test("prints 88% and 6% verbatim, as the report's own figures", () => {
    // PINNED WHOLE, not by `toContain`. These are somebody else's quantities quoted from one
    // report — "88 percent report regular AI use in at least one business function" and "about
    // 6 percent of respondents" — and the edits that break a quoted figure are the invisible
    // ones: a rounded 90, a "~6%", a "6 per cent".
    expect(C.adoptionFigure).toBe("88%");
    expect(C.implementationFigure).toBe("6%");
    // Each figure is a NUMBER AND NOTHING ELSE, so the label beside it carries the subject. A
    // figure string that grew its own predicate ("88% use AI") would put the claim inside the
    // 48px display register, where the deck's type ladder says QUANTITY.
    for (const figure of [C.adoptionFigure, C.implementationFigure]) {
      expect(figure).toMatch(/^\d+%$/);
    }
    // THE TWO RATES ARE ONE SURVEY'S, AND THE STAGE SAYS SO ON BOTH PLATES. Without the notes
    // the two fields read as two studies disagreeing rather than as one survey's two answers.
    expect(C.adoptionNote).toBe("THIS SURVEY");
    expect(C.implementationNote).toMatch(/THIS SURVEY/);
    expect(C.implementationNote).toMatch(/SAME RESPONDENTS/);
  });

  test("the year-ago rate is gone from the copy, the geometry and the stage", () => {
    // THE OWNER CUT OF 2026-08-14, held as an absence rather than as a memory. The report's own
    // "compared with 78 percent a year ago" was sourced and correctly dated; it was also a
    // SECOND ARGUMENT, and the two poses it cost said "adoption is rising", which is not what
    // this slide concludes. Three ends of it are checked, because a revert could come back
    // through any one of them.
    expect("priorFigure" in C).toBe(false);
    expect("priorNote" in C).toBe(false);
    for (const copy of authoredStrings()) {
      expect(copy, `a year-ago rate in ${JSON.stringify(copy)}`).not.toMatch(/\b78\s*(?:%|percent\b)/i);
      expect(copy, `a year-ago clause in ${JSON.stringify(copy)}`).not.toMatch(
        /\ba year (?:ago|earlier)\b/i,
      );
      expect(copy, `a rise in ${JSON.stringify(copy)}`).not.toMatch(/\bup from\b/i);
    }
    // AND THE GEOMETRY MODULE HOLDS NO THIRD SHARE. `PRIOR_SHARE` and `PRIOR_COUNT` are gone,
    // which is checked against the file rather than against an import — a deleted export is not
    // something a passing import can prove.
    const geometry = stripComments(sourceOf(GEOMETRY_FILE));
    expect(geometry).not.toMatch(/\bPRIOR_(?:SHARE|COUNT)\b/);
    expect(geometry).toMatch(/\bADOPTION_SHARE\b/);
    // …and the stage prints neither the figure nor the clause, at any pose.
    const { container, unmount } = renderSlide(0);
    for (const pose of POSES) {
      goToPose(pose);
      const stage = stageTextWithoutFigLabel(container);
      expect(stage, `pose ${pose}`).not.toMatch(/78/);
      expect(stage, `pose ${pose}`).not.toMatch(/\bup from\b/i);
    }
    unmount();
  });

  test("names the report's own class and never claims 'properly'", () => {
    // THE CORRECTION THE REWORK EXISTS FOR. The right plate used to read "HAVE IMPLEMENTED IT
    // PROPERLY", which no source says: the report defines this class FINANCIALLY — at least
    // five percent of EBIT attributed to AI use, plus self-reported significant value — and
    // calls it AI high performers. The label is the term; the definition is in the citation.
    expect(C.implementationLabel).toBe("ARE AI HIGH PERFORMERS");
    // AND THE LEFT LABEL IS THE SAME CLAIM IN PLAIN WORDS. It carried the report's own
    // predicate whole — "REPORT REGULAR AI USE IN ONE BUSINESS FUNCTION OR MORE" — which is
    // survey grammar a room has to parse before it can read the figure above it. "SOMEWHERE IN
    // THE BUSINESS" is what "at least one business function" means, said the way a person says
    // it.
    expect(C.adoptionLabel).toBe("USE AI REGULARLY, SOMEWHERE IN THE BUSINESS");
    // "REGULAR" IS LOAD-BEARING and is the report's own word: this is not "have bought
    // licences", it is regular use.
    expect(C.adoptionLabel).toMatch(/REGULAR/);
    // …and the qualifier survived the rewrite. A label that said only "USE AI" would claim
    // org-wide deployment, which the report does not measure.
    expect(C.adoptionLabel).toMatch(/SOMEWHERE/);
    // AND THE WORD "PROPERLY" IS GONE FROM EVERY AUTHORED STRING, in any form. It is the one
    // word on the old stage that claimed more than any source said, so its absence is a sweep
    // rather than a review note.
    for (const copy of authoredStrings()) {
      expect(copy, `"properly" in ${JSON.stringify(copy)}`).not.toMatch(/\bproperl?y?\b/i);
      expect(copy, `"mature" in ${JSON.stringify(copy)}`).not.toMatch(/\bmatur\w*\b/i);
    }
  });

  test("renders every figure unedited and unhighlighted, each with its own label", () => {
    const { unmount } = renderSlide(investBaseRatesSlide.canonicalPose);
    for (const [id, copy] of [
      ["base-rates-adoption-figure", C.adoptionFigure],
      ["base-rates-adoption-label", C.adoptionLabel],
      ["base-rates-adoption-note", C.adoptionNote],
      ["base-rates-implementation-figure", C.implementationFigure],
      ["base-rates-implementation-label", C.implementationLabel],
      ["base-rates-implementation-note", C.implementationNote],
    ] as const) {
      const box = screen.getByTestId(id);
      expect(box.textContent, id).toBe(copy);
      // NOT A COPPER ITALIC INSIDE A QUANTITY — the keyword rule's sharpest case anywhere in
      // `leader-invest/content.ts`. An `<em>` here would emphasise a FRAGMENT of a number.
      expect(box.querySelector("em"), `<em> inside ${id}`).toBeNull();
    }
    unmount();
  });

  test("draws each rate as a fill inside a whole hundred, on one shared unit", () => {
    // THE FIGURE IS THE RATE, TWICE — and the second telling is what makes "6%" stop reading as
    // a rhetorical number. Held as four facts: every plate draws ALL HUNDRED squares at every
    // pose, the fills are the two quoted counts, the unit is shared, and the grid is shared.
    const { container, unmount } = renderSlide(0);
    for (const testId of [ADOPTION_MARK, IMPLEMENTATION_MARK]) {
      expect(marksOf(container, testId), testId).toHaveLength(PER_HUNDRED);
    }

    // A PLATE IS DRAWN AT ITS FINAL FILL AT EVERY POSE, and what the pose changes is whether it
    // has ARRIVED. That is the 2026-08-14 change: no frame of this slide ever shows an empty
    // hundred, because a denominator with nothing in it is a shape rather than a rate.
    for (const pose of POSES) {
      goToPose(pose);
      expect(filledCount(container, ADOPTION_MARK), `adoption fill at pose ${pose}`).toBe(
        ADOPTION_COUNT,
      );
      expect(
        filledCount(container, IMPLEMENTATION_MARK),
        `implementation fill at pose ${pose}`,
      ).toBe(IMPLEMENTATION_COUNT);
    }

    // ONE UNIT AND ONE TIER FOR EVERY SQUARE ON THE STAGE. Colouring one plate's fill
    // differently would claim either a different kind of object or a subset relation, and the
    // deck holds neither.
    const all = [...marksOf(container, ADOPTION_MARK), ...marksOf(container, IMPLEMENTATION_MARK)];
    expect(all).toHaveLength(2 * PER_HUNDRED);
    const filledBackgrounds = new Set(
      all.filter((el) => el.dataset.filled === "true").map((el) => el.style.background),
    );
    expect(filledBackgrounds.size, "the fills are drawn in more than one colour").toBe(1);
    expect([...filledBackgrounds][0]).toBe("var(--copper-500)");
    const sizes = new Set(all.map((el) => `${el.style.width}×${el.style.height}`));
    expect(sizes.size, "the squares are drawn at more than one size").toBe(1);
    // AN UNFILLED SQUARE PAINTS NO COLOUR AT ALL — it is a frame, drawn by its border, and
    // "transparent" is the absence of a fill rather than a dimmer one. A faded fill would say
    // "not argued yet" in a deck where that is exactly what faint means.
    const emptyBackgrounds = new Set(
      all.filter((el) => el.dataset.filled === "false").map((el) => el.style.background),
    );
    expect([...emptyBackgrounds]).toEqual(["transparent"]);
    unmount();
  });

  test("a plate BUILDS — square by square, in reading order, frame and fill together", () => {
    // THE REVEAL IS THE SQUARE'S AND NOT THE PLATE'S, which is what the owner asked for and
    // what a screenshot cannot see. Three facts make it one: every square carries its own
    // delay, the delays rise in reading order, and a square arrives ALREADY FILLED — its
    // `data-filled` never changes, only its opacity does.
    const { container, unmount } = renderSlide(investBaseRatesSlide.canonicalPose);
    for (const [testId, gridId] of [
      [ADOPTION_MARK, "base-rates-grid-adoption"],
      [IMPLEMENTATION_MARK, "base-rates-grid-implementation"],
    ] as const) {
      const marks = marksOf(container, testId);
      const delays = marks.map((el) => parseFloat(el.style.transitionDelay));
      // Strictly increasing, by one constant step: a plate cannot flood out of reading order.
      for (let i = 1; i < delays.length; i += 1) {
        expect(delays[i] - delays[i - 1], `${testId} square ${i}`).toBe(6);
      }
      expect(delays[0]).toBe(arrival(gridId));
      expect(delays[delays.length - 1] - delays[0]).toBe(FLOOD_SPAN_MS);
      // AND EVERY SQUARE IS AT FULL OPACITY ONCE THE PLATE HAS ARRIVED. Opacity here is TIME,
      // and a plate that stopped halfway would be a denominator with a hole in it.
      for (const el of marks) {
        expect(el.style.opacity, testId).toBe("1");
        expect(el.style.transform, testId).toBe("scale(1)");
      }
    }
    unmount();
  });

  test("a plate the room has not reached is invisible, and its delay is dropped", () => {
    // THE OTHER HALF OF THE SAME MACHINE. At pose 0 the right plate is mounted, filled and
    // placed — and every one of its squares is at opacity 0 with NO delay, so a walk backwards
    // off pose 1 clears it at once instead of unbuilding it square by square. That is
    // `Reveal`'s own rule, applied by hand because these squares are not `Reveal`s.
    const { container, unmount } = renderSlide(0);
    const hidden = marksOf(container, IMPLEMENTATION_MARK);
    expect(hidden).toHaveLength(PER_HUNDRED);
    for (const el of hidden) {
      expect(el.style.opacity).toBe("0");
      expect(el.style.transitionDelay).toBe("0ms");
    }
    expect(revealed("base-rates-grid-implementation")).toBe(false);
    // …and the LEFT plate at the same pose is the positive control: same markup, arrived.
    expect(revealed("base-rates-grid-adoption")).toBe(true);
    unmount();
  });
});

// ── AC · the citation says what the report says, and nothing more ─────────────

/**
 * What the citation MUST carry, one pattern each, and every one of them is IN the report.
 *
 * THIS LIST IS THE HALF THAT DID NOT EXIST BEFORE 2026-08-14. gh#70's citation could claim
 * nothing but where the pair had been read, because the research named no upstream owner; the
 * figures are now one published report's, so the citation is required to identify it well
 * enough that a reader can go and check. Publisher, title, month, sample, nations, field
 * window, and the definition the 6% is the 6% OF.
 */
const CITATION_REQUIRED: ReadonlyArray<readonly [string, RegExp]> = [
  ["the publisher", /\bMcKinsey\b/],
  ["the report title", /the state of AI in 2025/i],
  ["the month of publication", /\bNovember 2025\b/],
  ["the sample size", /\b1,993\b/],
  ["the nation count", /\b105 nations\b/],
  ["the definition of the rare class", /\bEBIT\b/],
  ["the value threshold, in words", /\bfive percent\b/i],
  ["the report's own significance test", /significant/i],
];

/**
 * WHAT THE 2026-08-14 TRIM TOOK OUT OF THE CITATION, and it is listed rather than silently
 * dropped from {@link CITATION_REQUIRED}: the report's subtitle, the field window, and the
 * words "published", "respondents across" and "attributed to". Every one of them was IN the
 * report and none of them is a fact a reader needs to find it — the publisher, the title and
 * the month identify one document, and the old line cost the room a second wall of 10.5px
 * mono over the evidence it licensed.
 *
 * THE THRESHOLD MAY NOT BE SPELLED WITH A NUMERAL. "five percent" in words is what keeps the
 * stage's number-shaped tokens down to the two rates this slide quotes; "5%" would read as a
 * third statistic on a stage that holds two, and it is the SAME failure the whole
 * `REFUSED_FIGURES` sweep below exists for.
 */
const CITATION_FORBIDDEN: ReadonlyArray<readonly [string, RegExp]> = [
  ["the report's subtitle", /Agents, innovation, and transformation/i],
  ["the field window", /\bfielded\b/i],
  ["the threshold as a numeral", /\b5\s*%/],
];

/**
 * Everything the citation may NOT claim, one regex each — the surviving half of gh#70's sweep,
 * re-cut for a citation that now legitimately names a publisher, a year and a sample.
 *
 * WHAT LEFT THE LIST AND WHY. "McKinsey", "a four-digit year", "respondents", "a survey", "a
 * sample", "published" and "a quoted title" were all forbidden when the figures had no named
 * owner. Every one of them is now REQUIRED above, so keeping them here would forbid the
 * citation this slide is built on. WHAT STAYED: every OTHER publisher, because naming a second
 * one would say two studies; and every claim of verification, page-level precision or
 * independent audit, because this deck holds none of that. WHAT WAS ADDED: the four phrases of
 * the OLD attribution, so a revert cannot happen by copy-paste.
 */
const FORBIDDEN_PROVENANCE: ReadonlyArray<readonly [string, RegExp]> = [
  ["BCG", /\bBCG\b/],
  ["Bain", /\bBain\b/i],
  ["Gartner", /\bGartner\b/i],
  ["Forrester", /\bForrester\b/i],
  ["IDC", /\bIDC\b/],
  ["Deloitte", /\bDeloitte\b/i],
  ["Accenture", /\bAccenture\b/i],
  ["PwC", /\bPwC\b/i],
  ["KPMG", /\bKPMG\b/i],
  ["Capgemini", /\bCapgemini\b/i],
  ["MIT", /\bMIT\b/],
  ["NANDA", /\bNANDA\b/i],
  ["Sloan", /\bSloan\b/i],
  ["Harvard", /\bHarvard\b/i],
  ["Stanford", /\bStanford\b/i],
  ["Cisco", /\bCisco\b/i],
  ["Google", /\bGoogle\b/i],
  ["Microsoft", /\bMicrosoft\b/i],
  ["an ISO read date", /\b\d{4}-\d{2}-\d{2}\b/],
  ["a URL", /https?:\/\/|www\.|\.com\b|\bdoi\./i],
  ["a page or slide citation", /\b(?:p\.|pp\.|page|slide)\s*\d/i],
  ["according to", /\baccording to\b/i],
  ["as reported by", /\bas reported by\b/i],
  ["a benchmark", /\bbenchmark\w*\b/i],
  ["independently", /\bindependent\w*\b/i],
  ["audited", /\baudit\w*\b/i],
  // The OLD attribution, phrase by phrase. It named where the pair had been read and stopped,
  // which was honest for a pair with no owner and is now false: these figures have one.
  ["the old HR-deck reading", /\bgroup HR\b/i],
  ["the old deck name", /agentic-organization deck/i],
  ["the old no-study denial", /names no upstream/i],
  ["the old quotes-rather-than-measures clause", /quotes rather than measures/i],
  ["the old reported-context filing", /\breported (?:as )?context\b/i],
];

/**
 * The SHIPPED strings the forbidden patterns are anchored to, imported rather than transcribed.
 *
 * Real attributions from two slides in this deck, each of which legitimately carries something
 * this slide may not: B.1's names a second consultancy and calls its figure a benchmark;
 * `NOT_AUDITED` is the negation D.2 prints on four rows; and D.2's GEMS block names a vendor.
 * Anchoring to them is what keeps the list honest in the one direction a fabricated control
 * cannot: these patterns demonstrably fire on real deck copy, so the sweep is not testing a
 * straw man.
 *
 * ONE PATTERN LOST ITS SHIPPED ANCHOR AT THE `invest` MERGE, and it is said out loud here
 * rather than quietly dropped. "An ISO read date" used to fire on D.5's Berau price anchor;
 * that slide is gone, and NO string this deck renders carries an ISO date any more — the merged
 * D.4 is a standalone deliverable and prints no date at all. So the pattern is controlled
 * against `FABRICATED_CITATIONS`' fourth entry, which is written in this file and marked as an
 * invention, and the block below asserts that rather than pretending a shipped anchor exists.
 */
const SHIPPED_PROVENANCE: readonly string[] = [
  gapHardestPartContent.statisticSource,
  NOT_AUDITED,
  ...walkStrings(ownProofFor("gems")),
];

/**
 * The FABRICATIONS — and the fact that they had to be written here is the point.
 *
 * `gap-three-failures.test.tsx` fires its cut-outcome list against the research's own
 * sentences, because those outcomes EXIST somewhere and the risk is that one leaks back in. The
 * risk on this slide is mostly the opposite: several of the tokens below exist NOWHERE in this
 * repo, because nobody ever read them. A control corpus drawn from a source is therefore
 * impossible for part of this list, and padding the list down to what a source can fire would
 * delete exactly the entries that matter.
 *
 * So the corpus is six invented citations, written once, in a test file, marked as inventions.
 * They are the sentences this slide must never print, and they are here rather than anywhere
 * near `src/`. The FIFTH is the one that is not an invention at all — it is the attribution
 * this slide shipped until 2026-08-14 — and it is kept as the control for the old-attribution
 * patterns, which is what makes a revert-by-copy-paste fail loudly. The SIXTH spells the
 * research's own filing heading, which the shipped string reworded ("Reported AS context") and
 * which the pattern above therefore has to match in both forms.
 */
const FABRICATED_CITATIONS: readonly string[] = [
  "Reported by BCG and Bain; Gartner, Forrester and IDC report the same.",
  "Deloitte, Accenture, PwC, KPMG and Capgemini audited it independently.",
  "MIT Sloan Management Review, MIT NANDA, Harvard and Stanford ran the benchmark.",
  "According to Cisco, as reported by Google and Microsoft — see https://example.com/r.pdf, " +
    "p. 14, slide 3, read 2026-08-08.",
  "Reported as context in the group HR agentic-organization deck, which names no upstream " +
    "study — a pair this deck quotes rather than measures.",
  "Reported context: a pair filed under that heading, with no upstream owner named.",
];

const PROVENANCE_CONTROLS: readonly string[] = [
  ...SHIPPED_PROVENANCE,
  ...FABRICATED_CITATIONS,
];

describe("the citation", () => {
  test("identifies one report well enough to be checked, in one line", () => {
    for (const [name, pattern] of CITATION_REQUIRED) {
      expect(pattern.test(C.citation), `the citation carries no ${name}`).toBe(true);
    }
    // AND IT IS SHORT ENOUGH TO BE ONE LINE. `CITATION_HEIGHT` is cut for a single line of
    // 10.5px mono now, so a reword back past ≈180 characters would paint into the plates under
    // it — which jsdom cannot see and this can. The old string ran 360.
    expect(C.citation.length).toBeLessThanOrEqual(180);
    expect(C.citation.length, "a citation this short cannot identify a report").toBeGreaterThan(
      100,
    );
    for (const [name, pattern] of CITATION_FORBIDDEN) {
      expect(pattern.test(C.citation), `the citation still carries ${name}`).toBe(false);
    }
    // ONE CITATION AND NOT TWO, which is the credibility this slide runs on: all three rates
    // come from the same survey of the same respondents. A second citation string would say two
    // studies, and two studies is exactly what the figure this slide replaced turned out to be.
    const citationLike = authoredStrings().filter((copy) => /\bMcKinsey\b/.test(copy));
    expect(citationLike).toEqual([C.citation]);
    // …and the notes are what bind the rates to it, so no figure on the stage is undated.
    expect(C.implementationNote).toMatch(/SAME RESPONDENTS/);
  });

  test("renders ON the slide, and BEFORE any percentage", () => {
    // A RENDERING FACT, not a copy fact: a footnote in another component, a presenter note or a
    // comment would all satisfy a copy check and none of them reaches a projector.
    const { container, unmount } = renderSlide(0);
    const box = screen.getByTestId("base-rates-citation");
    expect(box.textContent).toBe(C.citation);
    expect(revealed("base-rates-citation")).toBe(true);
    expect(container.contains(box)).toBe(true);
    // A CITATION IS NOT A QUOTATION: it carries no emphasis, so the deck can never be read as
    // editing its own attribution.
    expect(box.querySelector("em")).toBeNull();

    // AND IT IS BOUND TO THE RATES IN TIME, which is the half a static check cannot see. It
    // arrives SECOND — after the eyebrow that says what is being attributed, and on the pose
    // BEFORE any figure is revealed — so no frame of this slide ever shows an unattributed
    // number.
    const citationAt = arrival("base-rates-citation");
    expect(citationAt).toBeGreaterThan(arrival("base-rates-eyebrow"));
    expect(citationAt).toBeLessThan(arrival("base-rates-adoption-figure"));
    for (const id of [...POSE_1_IDS, ...POSE_2_IDS]) {
      expect(revealed(id), `${id} at pose 0`).toBe(false);
    }
    unmount();

    // AND ABOVE THEM ON THE STAGE, not merely earlier in time — the geometric half of the same
    // decision.
    expect(CITATION_TOP).toBeLessThan(FIGURE_TOP);
    expect(CITATION_TOP).toBeLessThan(GRID_TOP);
  });

  test("the eyebrow declares the unit, and it declares nothing else", () => {
    // A FIELD OF SQUARES WITH NO STATED UNIT IS DECORATION. The eyebrow is the one string that
    // carries the denominator, and it carries it in WORDS — "A HUNDRED" — which is what lets
    // the stage state its own unit without printing a third numeral.
    //
    // IT USED TO CARRY TWO DUTIES AND 79 CHARACTERS: "THE REPORTED BASE RATE · EACH FIELD IS A
    // HUNDRED ORGANIZATIONS, ONE SQUARE EACH". The first clause said again what the figure
    // caption above it already says, and the second said the same thing twice. What a room
    // needs before it looks at a hundred squares is the unit, once.
    expect(C.unitEyebrow).toBe("ONE SQUARE IS ONE ORGANIZATION IN A HUNDRED");
    expect(C.unitEyebrow).toContain("ONE SQUARE");
    expect(C.unitEyebrow).toContain("A HUNDRED");
    expect(C.unitEyebrow).toContain("ORGANIZATION");
    expect(C.unitEyebrow).not.toMatch(/\d/);
    // …and it is HALF the length it was, which is the whole of the owner's note about it.
    expect(C.unitEyebrow.length).toBeLessThanOrEqual(48);
    // The clause it lost may not come back: the figure caption is where a slide says what kind
    // of object it is about.
    expect(C.unitEyebrow).not.toMatch(/REPORTED|BASE RATE|EACH FIELD/);

    const { unmount } = renderSlide(0);
    expect(screen.getByTestId("base-rates-eyebrow").textContent).toBe(C.unitEyebrow);
    const eyebrowAt = arrival("base-rates-eyebrow");
    for (const id of POSE_0_IDS.filter((x) => x !== "base-rates-eyebrow")) {
      expect(arrival(id), `${id} arrives before the unit is declared`).toBeGreaterThan(eyebrowAt);
    }
    unmount();
  });

  test("claims no second publisher, no page, no URL and no audit", () => {
    const authored = authoredStrings();
    expect(authored.length, "a rule over an empty set proves nothing").toBeGreaterThan(18);

    const { container, unmount } = renderSlide(investBaseRatesSlide.canonicalPose);
    // THE WHOLE STAGE, fig label included this time. The rule is about what a room can read,
    // and the fig label is rendered text like any other.
    const stage = container.textContent ?? "";
    expect(stage.length, "a rule over an empty stage proves nothing").toBeGreaterThan(400);
    for (const [name, pattern] of FORBIDDEN_PROVENANCE) {
      for (const copy of authored) {
        expect(pattern.test(copy), `forbidden "${name}" in ${JSON.stringify(copy)}`).toBe(false);
      }
      expect(pattern.test(stage), `forbidden "${name}" reached the stage`).toBe(false);
    }
    unmount();
  });

  test("every forbidden pattern actually fires — on shipped copy where it exists", () => {
    // THIRTY-ONE REGEXES THAT MATCHED NOTHING would make the rule above pass on a fabricated
    // citation, which is the one failure this whole block exists to catch. So each is fired,
    // and the corpus is split so a reader can see which half proves what.
    for (const [name, pattern] of FORBIDDEN_PROVENANCE) {
      expect(
        PROVENANCE_CONTROLS.some((line) => pattern.test(line)),
        `"${name}" fires on nothing at all — it cannot be guarding anything`,
      ).toBe(true);
    }
    // The categories a REAL string in this deck already carries, named individually so a failure
    // says which shipped attribution changed rather than "one of four".
    expect(/\bBCG\b/.test(gapHardestPartContent.statisticSource)).toBe(true);
    expect(/\bbenchmark\w*\b/i.test(gapHardestPartContent.statisticSource)).toBe(true);
    // AND THE ONE PATTERN WITH NO SHIPPED ANCHOR LEFT, fired against the invention that
    // controls it — see `SHIPPED_PROVENANCE` for why no rendered string in this deck carries an
    // ISO date any more. Asserted against the fabricated corpus ALONE, so a date that reappeared
    // in shipped copy would not be able to satisfy this line quietly.
    expect(FABRICATED_CITATIONS.some((line) => /\b\d{4}-\d{2}-\d{2}\b/.test(line))).toBe(true);
    expect(SHIPPED_PROVENANCE.some((line) => /\b\d{4}-\d{2}-\d{2}\b/.test(line))).toBe(false);
    expect(/\bindependent\w*\b/i.test(NOT_AUDITED)).toBe(true);
    expect(/\baudit\w*\b/i.test(NOT_AUDITED)).toBe(true);
    expect(walkStrings(ownProofFor("gems")).some((s) => /\bGoogle\b/.test(s))).toBe(true);
    // AND THE REQUIRED PATTERNS FIRE TOO, on the one string that is supposed to satisfy them —
    // so this file cannot be passing because nine regexes stopped matching anything.
    for (const [name, pattern] of CITATION_REQUIRED) {
      expect(pattern.test(C.citation), `the required "${name}" no longer fires`).toBe(true);
    }
    // AND THE FABRICATIONS ARE FABRICATIONS — not sentences quietly lifted from a source this
    // deck holds. None of them appears in any content module this file imports, which is what
    // makes "written here and nowhere else" a checked claim rather than a promise. The fifth is
    // the exception that proves the rule: it IS a sentence this deck once shipped, and its
    // absence from every module below is the assertion that the revert did not happen.
    const shipped = [
      ...walkStrings(gapHardestPartContent),
      ...walkStrings(gapNoSopContent),
      ...walkStrings(gapLadderContent),
      ...walkStrings(gapFailuresPatternContent),
      ...walkStrings(investChickenEggContent),
      ...walkStrings(investGovernanceContent),
      ...authoredStrings(),
    ];
    for (const invented of FABRICATED_CITATIONS) {
      expect(shipped, `a fabrication that is actually shipped copy`).not.toContain(invented);
    }
  });
});

// ── AC · no other statistic is invented around the three rates ────────────────

/**
 * The published figures this slide REFUSED while it was being resourced, one regex per spelling
 * each could arrive in.
 *
 * EVERY ONE OF THEM IS REAL, WHICH IS EXACTLY WHY THEY NEED A RULE. `content.ts`'s block header
 * lists them with their owners: 1% is the 2024 wave's maturity figure, 5% and 95% are MIT
 * NANDA's pilots-to-production and zero-return shares, 4% and 26% are BCG's future-built and
 * past-proof-of-concept shares, 25–55% is the productivity range that sits in the same sentence
 * as the pair this slide used to quote, and 25% / 5.5% are E.5's own two lower bars. Quoting any
 * of them would INVENT NOTHING and would still make this slide two arguments.
 *
 * SPELLED FOR THE `%` AND THE WORD BOTH, because the citation's own definition uses the word
 * ("at least five percent of EBIT") and a numeral-only sweep would miss "twenty-six percent".
 *
 * THE WORD BOUNDARY SITS INSIDE THE ALTERNATION AND NOT AFTER IT, which is a measured fix
 * rather than a style choice: `%` is a non-word character, so `(?:%|percent)\b` can never match
 * "4% are" — the position after `%` is not a boundary when a space follows. An earlier draft
 * wrote it that way and every `%`-spelled pattern in this list silently matched nothing, which
 * the control loop below caught.
 */
const REFUSED_FIGURES: ReadonlyArray<readonly [string, RegExp]> = [
  ["1%", /\b1\s*(?:%|percent\b)/i],
  ["4%", /\b4\s*(?:%|percent\b)/i],
  ["5%", /\b5\s*(?:%|percent\b)/i],
  ["5.5%", /\b5\.5\s*(?:%|percent\b)/i],
  ["25%", /\b25\s*(?:%|percent\b)/i],
  ["26%", /\b26\s*(?:%|percent\b)/i],
  ["55%", /\b55\s*(?:%|percent\b)/i],
  ["95%", /\b95\s*(?:%|percent\b)/i],
  ["25–55, en dash", /\b25\s*–\s*55\b/],
  ["productivity", /\bproductivit\w*\b/i],
  ["a pilot", /\bpilots?\b/i],
  ["ROI", /\bROI\b/],
  ["zero return", /\bzero return\b/i],
  ["proof of concept", /\bproofs? of concept\b/i],
];

/**
 * The sentences those patterns are fired against — TRANSCRIBED from the reports and from the
 * research on 2026-08-14, so a control written to make a regex fire proves the writing rather
 * than the pattern.
 *
 * The last entry is not a transcription at all: it is E.5's OWN content, read off the module, so
 * the two lower bars of the deck's other adoption slide are a live control rather than a copy.
 */
const REFUSED_SENTENCES: readonly string[] = [
  "Reported context: 25–55% productivity improvement; 78% adoption versus 6% proper implementation.",
  "In a complementary survey in a set of developed markets, only 1 percent of company " +
    "executives describe their gen AI rollouts as mature.",
  "95% of organizations are getting zero return. Just 5% of integrated AI pilots are " +
    "extracting millions in value, and just 5 percent reached production.",
  "Of the companies at least experimenting with AI, only 26% have developed the capabilities " +
    "to move beyond proofs of concept, and only 4% are at the forefront of AI innovation.",
  ...b5Content.bars.map((bar) => `${bar.pct}% ${bar.label}`),
];

describe("no other statistic is invented around the three rates", () => {
  test("the only number-shaped tokens outside the citation are 88% and 6%", () => {
    // A SHAPE RULE AND NOT A LIST OF ABSENT STRINGS. Checking for the one figure this slide is
    // most likely to gain would miss the second most likely; sweeping every digit off the
    // rendered stage catches any of them, including one nobody thought of.
    //
    // TWO THINGS ARE STRIPPED AND BOTH ARE NAMED. The FIG LABEL prints "FIG. D.1", which is the
    // COMPOSER's number and not this slide's to author (§3.5). The CITATION carries a month, a
    // sample size, a nation count and a field window, all of which are numerals and all of which
    // are the point of a citation — so it is swept SEPARATELY below, exactly, rather than
    // excused.
    //
    // RUN AT EVERY POSE, which is worth saying why: `Reveal` mounts its children whatever its
    // `on` state, so today's box tree is pose-invariant and the sweep would pass at pose 0
    // alone. A future gate that MOUNTED conditionally — the obvious way somebody adds a sixth
    // band — would put a string on the stage that only the later poses see, and the sweep
    // already covers it.
    const { container, unmount } = renderSlide(0);
    for (const pose of POSES) {
      goToPose(pose);
      const stage = stageTextWithoutFigLabelOrCitation(container);
      expect(
        stage.length,
        `pose ${pose}: a sweep over an empty stage proves nothing`,
      ).toBeGreaterThan(300);
      expect(numeralsIn(stage), `number-shaped tokens at pose ${pose}`).toEqual(["6%", "88%"]);
      // AND THE FIG LABEL REALLY WAS THERE TO STRIP, so the sweep cannot be passing because it
      // was handed an empty document.
      expect(container.querySelector(".fig-label")?.textContent).toContain(
        `${AT.letter}.${AT.num}`,
      );
      // …and so was the citation.
      expect(screen.getByTestId("base-rates-citation").textContent).toBe(C.citation);
    }
    unmount();
  });

  test("the citation's own numerals are exactly the three the report gives", () => {
    // THE OTHER HALF OF THE SWEEP ABOVE, and the reason the citation could be stripped without
    // creating a hiding place: its numeral set is PINNED. A fourth number appearing inside it —
    // a page, a percentage, a second sample — fails here. THE EBIT THRESHOLD IS NOT IN THIS SET
    // and may not join it: the report's "5 percent or more" is spelled in WORDS on the stage,
    // because a numeral there would be a third percentage on a slide that quotes two.
    expect(numeralsIn(C.citation)).toEqual(["1,993", "105", "2025"]);
    expect(C.citation).toContain("five percent");
  });

  test("the three authored strings carrying a digit are the two figures and the citation", () => {
    // The copy-side half of the same rule, and it catches what the DOM sweep cannot: an authored
    // string that carries a figure and does not render TODAY. A field added to the block next
    // month is inside this the day it exists, because `authoredStrings()` walks rather than
    // lists. IT WAS FIVE STRINGS THIS MORNING: the year-ago figure, and the note that reprinted
    // it, are both gone.
    const withDigits = authoredStrings().filter((copy) => /\d/.test(copy));
    expect(withDigits.sort()).toEqual(
      [C.adoptionFigure, C.implementationFigure, C.citation].sort(),
    );
  });

  test("the eight refused figures from other studies are ABSENT", () => {
    const { container, unmount } = renderSlide(investBaseRatesSlide.canonicalPose);
    const stage = stageTextWithoutFigLabel(container);
    for (const [name, pattern] of REFUSED_FIGURES) {
      for (const copy of authoredStrings()) {
        expect(pattern.test(copy), `"${name}" in ${JSON.stringify(copy)}`).toBe(false);
      }
      expect(pattern.test(stage), `"${name}" reached the stage`).toBe(false);
    }
    unmount();

    // EVERY PATTERN STILL FIRES ON THE SENTENCE IT WAS READ OFF. Fourteen regexes that matched
    // nothing would make the rule above pass on copy lifted straight from any of four reports.
    for (const [name, pattern] of REFUSED_FIGURES) {
      expect(
        REFUSED_SENTENCES.some((line) => pattern.test(line)),
        `"${name}" no longer fires on any control sentence`,
      ).toBe(true);
    }
    // …and the first control really is the line this slide's old pair came from, so the
    // transcription is the sentence it claims to be and not a paraphrase.
    expect(REFUSED_SENTENCES[0]).toContain("78% adoption");
    expect(REFUSED_SENTENCES[0]).toContain("6% proper implementation");
  });
});

// ── AC · the keyword rule: kw on prose only ──────────────────────────────────

describe("the keyword rule", () => {
  test("exactly the four prose strings carry a *Kw sibling, every keyword verbatim", () => {
    // The directory's rule, stated at the top of `src/slides/leader-invest/content.ts` and
    // restated in this slide's own block header, applied without an exception. PROSE is the
    // headline, the two readings and the closer. THE THREE FIGURES ARE THE SHARPEST CASE THE
    // RULE HAS ANYWHERE IN THAT FILE — they are somebody else's quantities — and the CITATION is
    // the second sharpest, because emphasis inside a citation reads as the deck editing its own
    // source line.
    //
    // HELD OVER THE BLOCK'S WHOLE KEY SET, so a twentieth key cannot be added at either side
    // without failing here first.
    expect(Object.keys(C).sort()).toEqual([
      "adoptionFigure",
      "adoptionLabel",
      "adoptionNote",
      "adoptionReading",
      "adoptionReadingKw",
      "citation",
      "closer",
      "closerKw",
      "figLabel",
      "headline",
      "headlineKw",
      "implementationFigure",
      "implementationLabel",
      "implementationNote",
      "implementationReading",
      "implementationReadingKw",
      "unitEyebrow",
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
    // FIGURES, LABELS AND THE CITATION CARRY NO KEYWORDS — named one by one, so the list above
    // cannot be widened by accident and a failure says which label reached for emphasis.
    for (const forbidden of [
      "figLabelKw",
      "unitEyebrowKw",
      "citationKw",
      "adoptionFigureKw",
      "adoptionLabelKw",
      "adoptionNoteKw",
      "implementationFigureKw",
      "implementationLabelKw",
      "implementationNoteKw",
    ]) {
      expect(Object.keys(C), `${forbidden} exists`).not.toContain(forbidden);
    }
    // A LABEL AND A PROSE STRING MAY NOT BE THE SAME STRING, which is what makes the partition
    // above a partition rather than two overlapping lists.
    expect(new Set(printedStrings()).size).toBe(printedStrings().length);
    expect(printedStrings()).toHaveLength(13);
  });

  test("every keyword actually highlights, and every label renders with none", () => {
    const { container, unmount } = renderSlide(investBaseRatesSlide.canonicalPose);

    // THE PROSE BOXES CARRY THEIRS, one `<em>` per keyword — the half that proves the absences
    // below are not passing because emphasis stopped rendering everywhere.
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
    // The headline lives on the slide file rather than the figure, so it is read off the heading
    // instead of a testid.
    const heading = container.querySelector("h1");
    expect(heading?.textContent).toBe(C.headline);
    expect([...(heading?.querySelectorAll("em") ?? [])].map((em) => em.textContent)).toEqual([
      ...C.headlineKw,
    ]);

    // …and every LABEL renders with none.
    for (const id of [
      "base-rates-eyebrow",
      "base-rates-citation",
      "base-rates-adoption-figure",
      "base-rates-adoption-label",
      "base-rates-adoption-note",
      "base-rates-implementation-figure",
      "base-rates-implementation-label",
      "base-rates-implementation-note",
    ]) {
      expect(screen.getByTestId(id).querySelectorAll("em").length, `<em> inside ${id}`).toBe(0);
    }
    expect(container.querySelector(".fig-label")?.querySelectorAll("em").length).toBe(0);
    unmount();
  });

  test("the stage prints exactly the thirteen strings the rule partitions", () => {
    // THE CENSUS IS EXACT IN BOTH DIRECTIONS: what the stage prints IS the thirteen strings
    // `PROSE` and `LABELS` divide between them, no more and no fewer. A fourteenth printed
    // string cannot render without landing in one of the two lists first — which is what makes
    // the keyword rule a partition of the SLIDE rather than of a list somebody keeps.
    const { container, unmount } = renderSlide(investBaseRatesSlide.canonicalPose);
    expect(stagePrintedStrings(container).sort()).toEqual(printedStrings().sort());
    expect(figLabelText(container)).toBe(C.figLabel);
    expect(C.figLabel).toBe("THE BASE RATE, AND WHAT IT EARNS");
    // The boxes, counted: nothing on the stage is missing and nothing is drawn twice.
    const ids = stageBoxes(container).map((el) => el.dataset.testid);
    expect(ids.sort()).toEqual([...EVERY_BOX].sort());
    expect(ids).toHaveLength(14);
    unmount();
  });
});

// ── AC · derived numbering: no authored figure, anywhere ─────────────────────

describe("no rendered string names a letter or a figure", () => {
  test("authored copy and the rendered stage both stay figure-free at every pose", () => {
    // §3.4 R2 / §3.5. This slide composes as the FIRST of the `invest` run, which today means
    // D.1 — and the four rows behind it just proved how cheap that is to move, so a literal
    // figure in this copy would be a lie on a projector within the week.
    //
    // HELD OVER AUTHORED VALUES AND THE RENDERED STAGE, which is the checkable form of the rule:
    // the doc comments in `src/slides/leader-invest/` DO name sections and figures, because that
    // is how a spec reference is written, and a rule over comments would forbid the provenance
    // this slide is required to record.
    const FIGURE = /\b[A-Z]\.\d/;
    for (const copy of authoredStrings()) {
      expect(copy, copy).not.toMatch(FIGURE);
      expect(copy, copy).not.toMatch(/\b[A-N]\.\d+\b/);
      expect(copy, copy).not.toMatch(/\bsections?\s+[A-N]\b/i);
      // No count of its own successors either — the run this slide OPENS is composed per deck
      // set (§3.4), so a sentence that numbered the slides behind it would go stale the first
      // time one was inserted or cut. This slide is the newest proof of that: it just moved four
      // of them.
      expect(copy, copy).not.toMatch(/\bnext (two|three|four|five)\b/i);
      expect(copy, copy).not.toMatch(/\b(slide|figure)\b/i);
    }

    const { container, unmount } = renderSlide(0);
    for (const pose of POSES) {
      goToPose(pose);
      // The derived reference IS there to strip, so the stage sweep below cannot pass because
      // nothing rendered.
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
   * BUILT FROM THE TABLES, NOT FROM `@/deck/registry`. The registry resolves `VARIANT` once at
   * module scope and this epoch's variant is the default `general`, which has no leader deck at
   * all — so reading the registry here would answer about the wrong deck, and re-pointing
   * `window.location` per brand would need `vi.resetModules()` and cost this file the module
   * identity every other assertion in it depends on. The three inputs are pure data (§4.1): the
   * deck-set list, the slide pool, and the brand's own `practiceLab` flag.
   * `gap-hardest-part.test.tsx` established the helper for the other head-of-run insert this
   * tree has taken; it is reused unchanged.
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
    // WHAT IS CHECKED HERE AND NOT IN `deck-slots.test.ts`: that one is about the authored list,
    // this is about what `composeDeck` DERIVES from it — the run this slide belongs to, the row
    // in front of it, the row behind it, and the fact that a section jump lands HERE rather than
    // on `invest-own-proof`, which held that position from gh#56 until gh#70.
    //
    // NO LETTER AND NO NUMBER IS TYPED IN THIS TEST. Both are read off the composed row; `AT`
    // above is a harness input and not this.
    for (const brand of LEADER_BRANDS) {
      const { slides, sectionFirstIndex, letterOf } = composedFor("leader", brand);
      const at = slides.findIndex((s) => s.def.id === SLIDE_ID);
      expect(at, brand).toBeGreaterThan(-1);

      const row = slides[at];
      expect(row.sectionKey, brand).toBe("invest");
      expect(row.letter, brand).toBe(letterOf("invest"));

      // THE HEAD OF THE RUN, stated as the two facts that make it one: the row in front carries
      // another key, so this slide STARTS the run, and the row behind it is the run's second
      // slide. A slide that had landed at the run's END would pass a `toContain` check and fail
      // both of these.
      expect(slides[at - 1].sectionKey, brand).not.toBe("invest");
      expect(slides[at + 1].def.id, brand).toBe(SIBLING_IDS[0]);
      // …and it is the FIRST invest row by index, which is the same claim said in the one form a
      // reordering inside the list cannot dodge.
      const investIndices = slides.filter((s) => s.sectionKey === "invest").map((s) => s.index);
      expect(Math.min(...investIndices), brand).toBe(at);

      // AND THE WHOLE RUN, which is §4.3's five and FINAL. A sixth `invest` id would be a slide
      // §4.3 does not ask for, and this is where it fails.
      expect(
        slides.filter((s) => s.sectionKey === "invest").map((s) => s.def.id),
        brand,
      ).toEqual([SLIDE_ID, ...SIBLING_IDS]);

      // R5 — the run's jump target is its first NUMBERED slide, and this slide is numbered, so
      // pressing the `invest` run's letter lands on this stage. The letter is read off the
      // composed row rather than typed.
      expect(sectionFirstIndex.get(row.letter), brand).toBe(at);
    }
  });

  test("composes as the run's FIRST figure, and its siblings one further along each", () => {
    // THE FIGURES, DERIVED. What is asserted is the RELATIONSHIP — this slide is number 1 of the
    // run and each sibling is one further along, all under one letter — and the composed pair
    // `D.1 … D.5` is then read back as a consequence rather than typed as the source of truth.
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
      // Read back: the four figures the two leader rooms actually see today. It was five until
      // the `invest` merge folded the run's last two rows into `invest-governance`.
      expect(
        run.map((r) => `${r.letter}.${r.num}`),
        brand,
      ).toEqual(["D.1", "D.2", "D.3", "D.4"]);
      expect(letter, brand).toBe("D");
    }
  });

  test("its arrival moved every sibling's number and NO letter — proved against the deck without it", () => {
    // HELD AS AN EXPERIMENT RATHER THAN AS A MEMORY. "One figure higher than before" is a claim
    // about two decks: the one this repo composes today and the one it composed before this
    // slide existed. The second is not a fixture here — it is RECOMPOSED, by dropping this
    // slide's id from the leader list and running the same composer over what is left. That is
    // the only form of the claim that cannot go stale.
    //
    // WITH NO EDIT TO EITHER SLIDE, which is the half that makes it §3.5 rather than four
    // ticket-sized copy changes: neither file is imported here, because neither has anything to
    // say about its own number.
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

      // NOTHING ELSE MOVED AT ALL — the property that makes a head-of-run insert cheap, and the
      // one a reader is most likely to doubt. Every row in the counterfactual deck keeps its
      // letter, and every row outside the `invest` run keeps its number too.
      for (const row of before.slides) {
        const now = after.get(row.def.id);
        expect(now?.letter, `${brand} · ${row.def.id} changed letter`).toBe(row.letter);
        if (row.sectionKey !== "invest") {
          expect(now?.num, `${brand} · ${row.def.id} changed number`).toBe(row.num);
        }
      }
      // …and the rows that DID move are exactly this slide's siblings, counted rather than
      // trusted. Four when this test was written, three since the `invest` merge — which is why
      // the expectation is `SIBLING_IDS` and not a number.
      const moved = before.slides.filter((row) => after.get(row.def.id)?.num !== row.num);
      expect(moved.map((row) => row.def.id).sort(), brand).toEqual([...SIBLING_IDS].sort());
    }
  });

  test("reaches NO standard deck — asked once per registered variant, all five", () => {
    // The other half of a leader-only slide, and it is not implied by the positive: the id
    // written into `STANDARD_SLIDE_IDS` would open a run between the agenda and the landscape
    // for an audience with no leader in the room, and renumber every letter behind it.
    //
    // ASKED PER VARIANT AND NOT PER DECK SET, because a variant is what a URL resolves to and it
    // is the only unit a reader can check against a browser. All five are walked off `VARIANTS`
    // rather than listed here, so a sixth is inside the rule the day it registers.
    const seen: VariantId[] = [];
    for (const variant of Object.values(VARIANTS)) {
      const { slides } = composedFor(variant.deckSet, variant.brand);
      const present = slides.some((s) => s.def.id === SLIDE_ID);
      expect(present, `${variant.id} runs ${SLIDE_ID}`).toBe(variant.deckSet === "leader");
      if (variant.deckSet !== "leader") {
        // Not just this slide: a standard deck holds no `invest` row at all, so there is no run
        // for it to have been appended to by mistake.
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
    // The authored list says the same thing one layer down, which is where a typo would put the
    // id if the composer were ever taught to be forgiving.
    expect(DECK_SET_COMPOSITION.standard.slides).not.toContain(SLIDE_ID);
    expect(DECK_SET_COMPOSITION.leader.slides).toContain(SLIDE_ID);
    // And the two variants that DO run it are the two leader ones, read off the variant table
    // rather than assumed from the brand names.
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
      for (let band = 0; band < MONOTONIC_AT.length; band++) {
        for (const id of MONOTONIC_AT[band]) {
          // A pose is everything argued so far: revealed iff its band's pose has been reached,
          // at every stop in BOTH directions — `on` is derived from the pose and not
          // accumulated, so walking back to 0 must un-reveal everything above it.
          expect(revealed(id), `${id} at pose ${pose}`).toBe(band <= pose);
          // AND THE COPY IS THERE, not merely the box: a path that dropped children would still
          // pass a class check. The rule wrapper and the two grid wrappers are the three boxes
          // with no text of their own.
          if (band <= pose && !TEXTLESS_IDS.has(id)) {
            expect(screen.getByTestId(id).textContent, `${id} at pose ${pose}`).not.toBe("");
          }
        }
      }
      // …and the two plates are drawn whole AND FULL at every pose, which is what "complete"
      // means for the two boxes the clause above has to skip. NO FRAME OF THIS SLIDE EVER SHOWS
      // AN EMPTY HUNDRED — the property the owner's cut is for, and the one a pose walk is the
      // only place to prove.
      for (const [testId, count] of [
        [ADOPTION_MARK, ADOPTION_COUNT],
        [IMPLEMENTATION_MARK, IMPLEMENTATION_COUNT],
      ] as const) {
        expect(marksOf(container, testId), `${testId} at pose ${pose}`).toHaveLength(PER_HUNDRED);
        expect(filledCount(container, testId), `${testId} at pose ${pose}`).toBe(count);
      }
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
    // THE PROPERTY THE POSE MAP IS CHECKED AGAINST, rather than the pose count — and the
    // three-pose map answers it VERBALLY where the five-pose map answered it geometrically.
    // The second hundred is no longer standing empty beside the first, so what stops pose 0
    // from reading as good news is that the pose's LAST arrival is a sentence saying holding
    // the common position proves nothing.
    const { container, unmount } = renderSlide();

    // POSE 0 — the unit, the source, the plate, the rate, what the rate is of, whose survey it
    // is, and finally what holding it proves. The reading lands after the whole plate has
    // built, which is the one arrival on this stage timed off the flood rather than off a step.
    goToPose(0);
    const gridAt = arrival("base-rates-grid-adoption");
    expect(arrival("base-rates-eyebrow")).toBeLessThan(arrival("base-rates-citation"));
    expect(arrival("base-rates-citation")).toBeLessThan(gridAt);
    // A FIGURE AND ITS LABEL SHARE ONE STEP, because a percentage without the thing it is a
    // percentage OF is not a fact yet — and the note follows, because it qualifies a fact that
    // has already landed.
    expect(arrival("base-rates-adoption-figure")).toBe(arrival("base-rates-adoption-label"));
    expect(arrival("base-rates-adoption-note")).toBeGreaterThan(
      arrival("base-rates-adoption-figure"),
    );
    const leftReadingAt = arrival("base-rates-adoption-reading");
    for (const id of POSE_0_IDS.filter((x) => x !== "base-rates-adoption-reading")) {
      expect(arrival(id), `${id} must not outlast the reading`).toBeLessThan(leftReadingAt);
    }
    expect(leftReadingAt, "the reading must wait for the plate to finish building").toBeGreaterThan(
      gridAt + FLOOD_SPAN_MS,
    );
    // …and the right half of the stage is genuinely empty, not merely un-argued.
    expect(revealed("base-rates-grid-implementation")).toBe(false);
    expect(revealed("base-rates-implementation-figure")).toBe(false);

    // POSE 1 — the same shape, one plate to the right, and the six squares are the pose.
    goToPose(1);
    expect(filledCount(container, IMPLEMENTATION_MARK)).toBe(IMPLEMENTATION_COUNT);
    const rightGridAt = arrival("base-rates-grid-implementation");
    expect(arrival("base-rates-implementation-figure")).toBe(
      arrival("base-rates-implementation-label"),
    );
    expect(arrival("base-rates-implementation-note")).toBeGreaterThan(
      arrival("base-rates-implementation-figure"),
    );
    const rightReadingAt = arrival("base-rates-implementation-reading");
    for (const id of POSE_1_IDS.filter((x) => x !== "base-rates-implementation-reading")) {
      expect(arrival(id), `${id} must not outlast the reading`).toBeLessThan(rightReadingAt);
    }
    expect(rightReadingAt).toBeGreaterThan(rightGridAt + FLOOD_SPAN_MS);
    // THE TWO PLATES ARE THE SAME FIGURE DRAWN TWICE, and the clearest form of that claim is
    // that their internal rhythm is identical: every beat of the right plate sits the same
    // distance behind its own grid as the left one's does.
    expect(arrival("base-rates-implementation-figure") - rightGridAt).toBe(
      arrival("base-rates-adoption-figure") - gridAt,
    );
    expect(rightReadingAt - rightGridAt).toBe(leftReadingAt - gridAt);

    // POSE 2 — the CLOSER lands last, after the rule that opens the band for it.
    goToPose(2);
    const closerAt = arrival("base-rates-closer");
    expect(arrival("base-rates-rule")).toBeLessThan(closerAt);
    expect(C.closer).toBe("Doing what everyone does buys what everyone gets.");
    expect(C.closerKw).toEqual(["what everyone gets"]);
    unmount();
  });

  test("mounts no <svg> at all — zero SMIL by construction, not by discipline", () => {
    // The figure's own doc comment stakes the claim: two hundred squares are two hundred `div`s,
    // the copper rule is a `div`, the plates are placed text, and a SMIL node cannot appear
    // without an author adding a whole element class. That structural fact is what makes the
    // reduce-mode zero below a CONSTRUCTION rather than a promise — and it is the reason an SVG
    // `<rect>` grid was refused for the plates, which would have re-opened a question this deck
    // has had to answer with a `matchMedia` gate three times elsewhere.
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

  /** A `matchMedia` that answers `matches` for the motion query and false for everything else —
   *  so a component that asked a DIFFERENT media question would not accidentally be handed the
   *  motion answer. */
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
    fills: [number, number];
  }

  /**
   * One full pose walk under a stated motion preference, snapshotted per pose.
   *
   * THE CENSUS IS TAG + HOOK + CLASS FOR EVERY ELEMENT, which is the form that makes "complete"
   * checkable rather than "non-empty". `class` is in it deliberately: it carries `.fade.on`, so
   * an element that MOUNTED under both preferences but was left un-revealed under one would
   * still differ here. `html` is kept beside it as the strictest form of the same claim — the
   * inline `transitionDelay` a reveal writes and the per-square `transition` the fill writes are
   * both in it.
   */
  function walkUnder(prefersReduce: boolean): PoseSnapshot[] {
    stubMatchMedia(prefersReduce);
    const { container, unmount } = renderSlide();
    const out: PoseSnapshot[] = [];
    for (const pose of POSES) {
      goToPose(pose);
      out.push({
        census: [...container.querySelectorAll<HTMLElement>("*")].map(
          (el) => `${el.tagName}|${el.dataset.testid ?? ""}|${el.getAttribute("class") ?? ""}`,
        ),
        html: container.innerHTML,
        smil: container.querySelectorAll("animate, animateTransform, animateMotion, set").length,
        svg: container.querySelectorAll("svg").length,
        revealedIds: EVERY_BOX.filter((id) => revealed(id)),
        fills: [filledCount(container, ADOPTION_MARK), filledCount(container, IMPLEMENTATION_MARK)],
      });
    }
    unmount();
    return out;
  }

  test("zero SMIL at every pose under BOTH preferences, and the two renders are identical", () => {
    // SMIL is invisible to the global `prefers-reduced-motion` rule in
    // `src/styles/globals.css` — that rule squashes CSS `animation-duration` and
    // `transition-duration` to 0.01ms and touches SMIL not at all — so a SMIL node would have to
    // be gated at MOUNT, the way `E12MindsetDiptych`, `E12LoopAnatomy` and `E9DistractionMotion`
    // each gate theirs by reading `matchMedia` at render time. THIS SLIDE HAS NOTHING TO GATE,
    // and that is the claim being held: the census is identical under either preference because
    // nothing under this slide reads `matchMedia` at all.
    //
    // BOTH STUBS, NOT ONE. A test that only ever mounts under `reduce` proves the reduce render
    // is complete and says nothing about whether it is the SAME render; a test that only ever
    // mounts under no-preference proves nothing about the AC. The pair is what makes
    // "preference-independent" a checked property — and it is the form that would catch the
    // likeliest future regression, which is not a stray `<animate>` but a well-meaning
    // `if (reduced) return null` around a band, or a fill stagger that is skipped under reduce
    // and leaves a plate empty.
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
      // EQUIVALENT IN ELEMENT CENSUS — not merely non-empty. The two lists are compared whole
      // and in order, so a dropped square, a dropped band or a class that stopped being written
      // all fail by position.
      expect(r.census, `census at pose ${pose}`).toEqual(n.census);
      expect(r.html, `markup at pose ${pose}`).toBe(n.html);
      expect(r.revealedIds, `reveals at pose ${pose}`).toEqual(n.revealedIds);
      // …and the census is a real one: 14 boxes, 200 squares, plus the harness's own nodes.
      expect(r.census.length, `pose ${pose}`).toBeGreaterThan(200);
      expect(r.fills, `fills at pose ${pose}`).toEqual(n.fills);
    }
    // AND EVERY PLATE IS FULL AT EVERY POSE, under reduce, read back as one list. A plate's
    // fill is no longer a function of the pose — its ARRIVAL is — so this list is flat by
    // construction, and a row of zeroes appearing in it would be the empty-hundred frame the
    // owner's cut removed coming back.
    expect(reduce.map((s) => s.fills)).toEqual(
      POSES.map(() => [ADOPTION_COUNT, IMPLEMENTATION_COUNT]),
    );
  });

  test("every pose still renders COMPLETE under reduce — same boxes, same copy", () => {
    // The completeness half, stated as the reveal state rather than as a byte comparison:
    // everything the pose is supposed to show is `on`, everything it is not supposed to show yet
    // is not, and every box that carries type has its type. Completeness is a claim about THIS
    // pose and not about the last one, which is why the second loop exists.
    stubMatchMedia(true);
    const { container, unmount } = renderSlide();
    for (const pose of POSES) {
      goToPose(pose);
      for (let band = 0; band <= pose; band++) {
        for (const id of MONOTONIC_AT[band]) {
          expect(revealed(id), `reduce · pose ${pose} · ${id}`).toBe(true);
          if (!TEXTLESS_IDS.has(id)) {
            expect(
              screen.getByTestId(id).textContent,
              `reduce · pose ${pose} · ${id} is empty`,
            ).not.toBe("");
          }
        }
      }
      for (let band = pose + 1; band < MONOTONIC_AT.length; band++) {
        for (const id of MONOTONIC_AT[band]) {
          expect(revealed(id), `reduce · pose ${pose} · ${id} is not reached yet`).toBe(false);
        }
      }
      // The two plates survive reduce whole — the one place on this stage where "complete" means
      // a COUNT rather than a string.
      for (const testId of [ADOPTION_MARK, IMPLEMENTATION_MARK]) {
        expect(marksOf(container, testId), `reduce · pose ${pose}`).toHaveLength(100);
      }
    }
    unmount();
  });
});

// ── AC · no brand variance ───────────────────────────────────────────────────

describe("no brand variance", () => {
  test("imports no VARIANT, takes no props, and names no organisation", () => {
    // §4.4's seven brand × deckSet slots do not list this slide: the figures are one publisher's
    // survey of organizations in general, and NOT ONE ORGANISATION IS NAMED ON THIS STAGE as a
    // subject — so a `Record<Brand, …>` here would be one honest entry and two written by
    // inventing evidence. Held three ways, because each catches a different edit.
    //
    // FIRST, THE IMPORT — a claim about the module, which no render can see. Checked against the
    // file with its comments stripped, because this slide's header discusses `VARIANT` at length
    // and a raw grep would fail on the argument for not importing it.
    const slideCode = stripComments(sourceOf(SLIDE_FILE));
    expect(slideCode, "the slide file imports @/variant").not.toMatch(/from\s+["']@\/variant["']/);
    expect(slideCode, "the slide file names VARIANT in code").not.toMatch(/\bVARIANT\b/);
    expect(slideCode, "the slide file resolves a brand block").not.toMatch(/\bFor\(\s*\w*brand/i);
    // …and the stripper really did leave the code behind, so the absences above are not the
    // absence of a file.
    expect(slideCode).toMatch(/export const investBaseRatesSlide/);
    expect(slideCode).toMatch(/import type \{ SlideDef \}/);
    // The figure takes no resolved brand block either — unlike three of this directory's four
    // other figures, which each take one.
    const figureCode = stripComments(sourceOf(FIGURE_FILE));
    expect(figureCode).not.toMatch(/\bVARIANT\b/);
    expect(figureCode).not.toMatch(/from\s+["']@\/variant["']/);

    // SECOND, THE COMPONENT'S ARITY. `InvestBaseRates` takes no props at all, so there is no
    // `…For(brand)` resolver for a caller to pass one to.
    expect(InvestBaseRates.length).toBe(0);

    // THIRD, THE VOCABULARY. No organisation is named as a subject — not the two rooms, not the
    // deck's own company. The survey's publisher is a CITATION and is required to be there,
    // which is why it is not in this list.
    for (const copy of authoredStrings()) {
      expect(copy, `an organisation in ${JSON.stringify(copy)}`).not.toMatch(
        /\b(GEMS|GEMVIS|Berau|DigiTech|MineTech|Nanovest|Sinar Mas)\b/i,
      );
    }
  });

  test("the content block is plain data — no resolver hiding in it", () => {
    // A `Record<Brand, …>` reachable from this block would be a brand axis nobody declared, and
    // the shape it would arrive in is a function: every other brand-varying block in this module
    // is reached through one (`ownProofFor`, `onPremCallbackFor`, `priceAnchorFor`).
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
  // BRAND INVARIANCE IS A CLAIM ABOUT MODULE EPOCHS — `VARIANT` resolves once at module scope —
  // so it cannot be checked inside the one epoch every test above runs in. Two epochs, byte for
  // byte, following `gap-three-failures.test.tsx`, `gap-no-sop.test.tsx` and
  // `mandate-enablement.test.tsx`, which are the shipped precedents for the leader slides with
  // no brand axis at all.
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
        import("@/slides/leader-invest/invest-base-rates"),
      ]);

    // THE POSITION IS READ OFF THE COMPOSED DECK, which for these two variants is the real one —
    // this slide composes into both, so the fallback below is dead code kept for the shape of the
    // helper rather than for this slide.
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
    // SEQUENTIALLY, not `Promise.all`. Each call re-points `window.location`, resets the module
    // registry and renders into the SAME document — run concurrently they interleave, two stages
    // share one DOM, and every query finds two elements.
    const berau = await stageFor(LEADER_VARIANTS[0]);
    const gems = await stageFor(LEADER_VARIANTS[1]);
    // MARKUP AND TEXT BOTH: a brand axis could move a colour token, a delay or a fill count
    // without changing a word, and `textContent` alone would not see it.
    expect(berau.html).toBe(gems.html);
    expect(berau.text).toBe(gems.text);
    // Not vacuously: a stage that rendered nothing would also be equal. Every one of this slide's
    // arguments is in both rooms — the claim, the source, the three rates, the two readings, the
    // price of the default — and so is the DERIVED figure, which is the one thing on the stage
    // that could legitimately have differed between two decks and does not.
    for (const stage of [berau.text, gems.text]) {
      expect(stage).toContain(C.headline);
      expect(stage).toContain(C.citation);
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
  test("every painted colour on the stage is a CSS var, and no BOX ranks by opacity", () => {
    // TWO RULES IN ONE SWEEP, over the RENDERED inline styles rather than over the source, so a
    // colour arriving from a helper is inside the rule too.
    //
    // OPACITY ON THIS STAGE MEANS TIME, AND THE SQUARES ARE THE PROOF RATHER THAN THE
    // EXCEPTION. `.fade` owns opacity for the twelve boxes that are `Reveal`s — it is how "not
    // argued yet" is drawn — so an inline `opacity` on any of them would overload the one
    // channel this deck reserves. The two hundred SQUARES carry an inline opacity because they
    // ARE their plate's reveal: 0 means "has not arrived", 1 means "has", and there is no third
    // value anywhere on the stage. A square at 0.4 would be the rank-by-opacity failure this
    // rule exists for, and it fails here.
    //
    // "transparent" IS ALLOWED AND IS NAMED. An unfilled square paints no background at all — it
    // is a frame drawn by its border — and `transparent` is the absence of a colour rather than a
    // literal one. Every other value must be a token.
    const { container, unmount } = renderSlide(investBaseRatesSlide.canonicalPose);
    const painted = [...container.querySelectorAll<HTMLElement>("[data-testid^='base-rates-']")];
    expect(painted.length).toBe(14 + 2 * PER_HUNDRED);
    for (const el of painted) {
      const id = el.dataset.testid ?? "";
      const isMark = MARK_IDS.has(id);
      if (isMark) {
        expect(["0", "1"], `${id} ranks by opacity`).toContain(el.style.opacity);
      } else {
        expect(el.style.opacity, `${id} ranks by opacity`).toBe("");
      }
      for (const channel of [el.style.color, el.style.background] as const) {
        if (channel === "" || channel === "transparent") continue;
        expect(channel, `${id} paints a literal colour`).toMatch(/^var\(--[a-z0-9-]+\)$/);
      }
      // Two borders on this stage are written into a shorthand rather than into their own
      // property — a square's outline and a reading box's frame — and both are tokens.
      if (el.style.border !== "") {
        expect(el.style.border, `${id} outlines in a literal colour`).toMatch(
          /^\d+px (?:solid|dashed) var\(--[a-z0-9-]+\)$/,
        );
      }
    }
    // …and the sweep really saw colours, so the loop above is not passing on empty strings.
    const styles = painted.map((el) => el.getAttribute("style") ?? "").join(" ");
    expect(styles.length).toBeGreaterThan(2000);
    expect(styles).toMatch(/var\(--copper-200\)/); // the two percentages
    expect(styles).toMatch(/var\(--copper-400\)/); // the mono caps rows
    expect(styles).toMatch(/var\(--copper-500\)/); // every filled square
    expect(styles).toMatch(/var\(--copper-700\)/); // the two reading boxes
    expect(styles).toMatch(/var\(--copper-800\)/); // every square's frame
    expect(styles).toMatch(/var\(--neutral-300\)/); // the citation and the two notes
    expect(styles).toMatch(/var\(--neutral-100\)/); // the closer
    unmount();
  });

  test("the deck's own voice is neutral and everything it quotes is copper", () => {
    // THE EPISTEMICS DRAWN IN COLOUR. Copper on this stage means A THING QUOTED FROM SOMEWHERE
    // ELSE; the neutral tiers are the deck's own. So the two figures share one copper tier, and
    // the citation, the two notes, the two readings and the closer are all neutral — the citation
    // included, because it is the deck's note ABOUT a source rather than a quotation from one.
    const { unmount } = renderSlide(investBaseRatesSlide.canonicalPose);
    const colour = (id: string) => screen.getByTestId(id).style.color;
    expect(colour("base-rates-adoption-figure")).toBe(colour("base-rates-implementation-figure"));
    expect(colour("base-rates-adoption-figure")).toMatch(/^var\(--copper-/);
    for (const id of [
      "base-rates-citation",
      "base-rates-adoption-note",
      "base-rates-implementation-note",
      "base-rates-closer",
    ]) {
      expect(colour(id), `${id} is copper`).toMatch(/^var\(--neutral-/);
    }
    // The two READINGS carry their colour on the `<p>` inside the box, not on the box — the box
    // is a frame and has no type of its own.
    for (const id of ["base-rates-adoption-reading", "base-rates-implementation-reading"]) {
      const type = screen.getByTestId(id).querySelector("p");
      expect(type, `${id} holds no type`).not.toBeNull();
      expect(type?.style.color, `${id} is copper`).toMatch(/^var\(--neutral-/);
    }
    // The two mono caps LABELS are the documented precedent-based exception: `--copper-400` in
    // exactly this register, which all four sibling figures cite.
    for (const id of ["base-rates-eyebrow", "base-rates-adoption-label"]) {
      expect(colour(id), id).toBe("var(--copper-400)");
    }
    unmount();
  });

  test("each reading stands in the deck's own travelling-border box", () => {
    // THE ONE BORDERED OBJECT ON THIS STAGE, and it is B.4's box rather than a new one.
    // `.gap-box-live` is declared once in `src/styles/globals.css` — a dashed border with a
    // `::after` overlay of four copper dashes that travel the perimeter on a 3200ms loop, and
    // which that stylesheet REMOVES OUTRIGHT under `prefers-reduced-motion: reduce` rather than
    // shortening, because an infinite animation at 0.01ms is not a stop. Reusing it is what
    // keeps this deck at one visual grammar for one kind of object: a sentence the deck is
    // asking the room to sit with.
    //
    // jsdom computes no stylesheet, so what is checked here is the two halves this file CAN
    // see — the class is on the box, and the box is a box — plus the fact that the shared rule
    // exists in the stylesheet at all. The travel itself is the browser walk's.
    const css = readFileSync(resolve(__dirname, "../../src/styles/globals.css"), "utf8");
    expect(css).toMatch(/\.gap-box-live::after\s*\{/);
    expect(css).toMatch(/@keyframes gap-box-ants/);
    expect(css).toMatch(/prefers-reduced-motion/);

    const { unmount } = renderSlide(investBaseRatesSlide.canonicalPose);
    for (const id of ["base-rates-adoption-reading", "base-rates-implementation-reading"]) {
      const box = screen.getByTestId(id);
      expect(box.classList.contains("gap-box-live"), `${id} is not a live box`).toBe(true);
      expect(box.style.border, id).toBe(`${READING_BORDER}px dashed var(--copper-700)`);
      expect(box.style.boxSizing, id).toBe("border-box");
      expect(box.style.padding, id).toBe(`${READING_PAD_Y}px ${READING_PAD_X}px`);
      // THE TYPE IS CENTRED INSIDE A FIXED BOX, which is what stops the shorter of the two
      // sentences from reading as an unfinished box beside the longer one.
      expect(box.style.display, id).toBe("flex");
      expect(box.style.alignItems, id).toBe("center");
      expect(parseFloat(box.style.height), id).toBe(READING_BOX_HEIGHT);
    }
    // THE TWO BOXES ARE THE SAME BOX, which is the whole reason they can be read as a pair.
    const geom = (id: string) => {
      const el = screen.getByTestId(id);
      return `${el.style.width}|${el.style.height}|${el.style.border}|${el.style.padding}`;
    };
    expect(geom("base-rates-adoption-reading")).toBe(geom("base-rates-implementation-reading"));
    // …and nothing ELSE on this stage is bordered, so the frame means one thing.
    const bordered = [...screen.getByTestId("base-rates-closer").parentElement!.children]
      .filter((el): el is HTMLElement => el instanceof HTMLElement)
      .filter((el) => (el.dataset.testid ?? "").startsWith("base-rates-"))
      .filter((el) => !MARK_IDS.has(el.dataset.testid ?? ""))
      .filter((el) => el.style.border !== "");
    expect(bordered.map((el) => el.dataset.testid).sort()).toEqual([
      "base-rates-adoption-reading",
      "base-rates-implementation-reading",
    ]);
    unmount();
  });

  test("zero hex literals in all three of this slide's source files", () => {
    // CSS VARS ONLY — held over the FILES rather than over the DOM. A DOM sweep proves that
    // today's stage paints no hex; this proves that none is written down, including on a branch
    // nothing currently renders and inside a constant nothing currently reads.
    //
    // THE HEX CHECK RUNS ON RAW SOURCE AND THE rgba() CHECK ON STRIPPED SOURCE, and the asymmetry
    // is deliberate: no comment in these three files spells a hex, so the stricter form costs
    // nothing there — while `BaseRatesBeats.tsx`'s header legitimately NAMES the construction it
    // forbids ("CSS VARS ONLY, NO HEX AND NO rgba() LITERALS"), and a raw check would fail a file
    // for documenting its own rule.
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

    // NO RUNTIME IMPORT ANYWHERE IN THE MODULE, which is the checkable form of the property every
    // geometry module in this directory claims: a coordinate can be read from bare Node with
    // `--experimental-strip-types` and no bundler, so a stage can be verified without standing up
    // React. The file's only reference to a sibling is `typeof import("./geometry")` — a TYPE
    // position, which both tsc and Node's stripper erase. An `import { … } from "@/…"` added here
    // would be resolvable by Vitest and by nothing else, and this is where that would be caught.
    const geometry = sourceOf(GEOMETRY_FILE);
    expect(geometry, "a runtime import in the geometry module").not.toMatch(/^\s*import\s/m);
    expect(geometry, "a require() in the geometry module").not.toMatch(/\brequire\(/);
    expect(geometry).toMatch(/typeof import\("\.\/geometry"\)/);
  });

  test("the two counts are DERIVED from the copy's own percentages, not typed beside them", () => {
    // THE WELD, and it is the reason this test file exists at all as far as
    // `base-rates-geometry.ts` is concerned — its own header says so: "this module CANNOT import
    // `./content.ts` for the value, so the test is the other end of the weld".
    //
    // A CROSS-MODULE COMPARISON IN BOTH DIRECTIONS, so neither side can be a self-comparison. The
    // copy string is parsed rather than re-typed, so a reword that moved "88%" to "90%" and left
    // `ADOPTION_SHARE` at 0.88 fails HERE — which is the one failure this slide has that nobody
    // would see on a projector, because the drawing would still look like a drawing.
    const quoted = (figure: string) => Number(figure.replace("%", ""));
    expect(quoted(C.adoptionFigure)).toBe(88);
    expect(quoted(C.implementationFigure)).toBe(6);
    expect(ADOPTION_SHARE).toBe(0.88);
    expect(IMPLEMENTATION_SHARE).toBe(0.06);
    expect(ADOPTION_COUNT).toBe(quoted(C.adoptionFigure));
    expect(IMPLEMENTATION_COUNT).toBe(quoted(C.implementationFigure));
    // …and each share is its figure as a fraction of the denominator the eyebrow states in words,
    // which is what makes "%" the unit rather than a decoration.
    expect(PER_HUNDRED).toBe(100);
    expect(Math.round(ADOPTION_SHARE * PER_HUNDRED)).toBe(quoted(C.adoptionFigure));
    expect(Math.round(IMPLEMENTATION_SHARE * PER_HUNDRED)).toBe(quoted(C.implementationFigure));
    expect(C.unitEyebrow).toContain("A HUNDRED");

    // THE COUNTS ARE INTEGERS AND THEY FIT INSIDE ONE HUNDRED, which is the property the plates
    // actually need: `isFilled` guards its count against `PER_HUNDRED`, and a non-integer would
    // fill a fraction of a square.
    for (const count of [ADOPTION_COUNT, IMPLEMENTATION_COUNT]) {
      expect(Number.isInteger(count)).toBe(true);
      expect(count).toBeGreaterThan(0);
      expect(count).toBeLessThanOrEqual(PER_HUNDRED);
    }

    // THE `Math.round` IS DEFENSIVE AND THE MODULE SAYS SO — measured rather than repeated. Both
    // products are EXACT in a double today, which is why the rounding is a no-op; the general
    // worry it guards is real, which is why it stays.
    expect(ADOPTION_SHARE * PER_HUNDRED).toBe(88);
    expect(IMPLEMENTATION_SHARE * PER_HUNDRED).toBe(6);
    expect(0.29 * 100).not.toBe(29);
  });

  test("the grid is a hundred squares, and the DOM draws exactly them where the module says", () => {
    // The third link in the same chain: copy → count → fill. Held against the DOM, so a renderer
    // that drew a literal 88 would pass the assertions above and fail here.
    expect(GRID_COLS).toBe(10);
    expect(GRID_ROWS).toBe(10);
    expect(GRID_COLS * GRID_ROWS).toBe(PER_HUNDRED);
    expect(GRID_SIZE).toBe(GRID_COLS * MARK_SIZE + (GRID_COLS - 1) * (MARK_PITCH - MARK_SIZE));
    expect(GRID_BOTTOM).toBe(GRID_TOP + GRID_SIZE);
    // ROW-MAJOR, and it matters twice: the squares are a QUANTITY, so reading order is the only
    // order there is — and the FILL is staggered by index, so row-major is also the direction a
    // plate floods.
    expect(markTop(0)).toBe(markTop(GRID_COLS - 1));
    expect(markTop(GRID_COLS)).toBe(MARK_PITCH);
    expect(markLeft(GRID_COLS)).toBe(markLeft(0));
    expect(markLeft(GRID_COLS - 1)).toBe((GRID_COLS - 1) * MARK_PITCH);
    expect(markTop(PER_HUNDRED - 1)).toBe((GRID_ROWS - 1) * MARK_PITCH);
    // `isFilled` IS THE ONE PLACE THE FIGURE AND THE DRAWING MEET, and it is a prefix of the
    // reading order, so a plate never has a hole in it.
    for (const count of [ADOPTION_COUNT, IMPLEMENTATION_COUNT]) {
      expect(isFilled(count - 1, count), `${count} fills its last square`).toBe(true);
      expect(isFilled(count, count), `${count} fills one too many`).toBe(false);
      expect(isFilled(0, count), `${count} fills its first square`).toBe(true);
    }

    const { container, unmount } = renderSlide(investBaseRatesSlide.canonicalPose);
    for (const testId of [ADOPTION_MARK, IMPLEMENTATION_MARK]) {
      const squares = marksOf(container, testId);
      expect(squares).toHaveLength(PER_HUNDRED);
      squares.forEach((el, i) => {
        expect(parseFloat(el.style.left), `${testId} ${i} left`).toBe(markLeft(i));
        expect(parseFloat(el.style.top), `${testId} ${i} top`).toBe(markTop(i));
        expect(parseFloat(el.style.width), `${testId} ${i} width`).toBe(MARK_SIZE);
        expect(parseFloat(el.style.height), `${testId} ${i} height`).toBe(MARK_SIZE);
        // THE OUTLINE IS INSIDE THE SQUARE BY DECLARATION. This deck sets no global
        // box-sizing rule, so a 24px box with a 1px border would paint 26px and a ten-square row
        // would overrun `GRID_SIZE` by 20px.
        expect(el.style.boxSizing, `${testId} ${i} box-sizing`).toBe("border-box");
        expect(el.style.border, `${testId} ${i} border`).toContain(`${MARK_BORDER}px solid`);
      });
      // …and the fill really is the prefix `isFilled` describes, read off the DOM.
      const count = testId === ADOPTION_MARK ? ADOPTION_COUNT : IMPLEMENTATION_COUNT;
      squares.forEach((el, i) => {
        expect(el.dataset.filled, `${testId} ${i} fill`).toBe(isFilled(i, count) ? "true" : "false");
      });
    }
    // Both grids are the same box, at the same shelf: two hundreds at two sizes would rank one.
    for (const id of ["base-rates-grid-adoption", "base-rates-grid-implementation"]) {
      const el = screen.getByTestId(id);
      expect(parseFloat(el.style.width), id).toBe(GRID_SIZE);
      expect(parseFloat(el.style.height), id).toBe(GRID_SIZE);
      expect(parseFloat(el.style.top), id).toBe(GRID_TOP);
    }
    unmount();
  });

  test("nothing is positioned outside the stage or across the NavBar band", () => {
    // Held over every box AND every square the figure actually paints, read off the DOM, so a box
    // placed with a literal instead of a geometry export is inside the rule too. The squares need
    // their plate's origin added back, because their coordinates are the wrapper's.
    const { container, unmount } = renderSlide(investBaseRatesSlide.canonicalPose);

    for (const el of stageBoxes(container)) {
      const id = el.dataset.testid;
      const left = parseFloat(el.style.left);
      const top = parseFloat(el.style.top);
      const width = parseFloat(el.style.width);
      // `base-rates-rule` declares no height — `.copper-rule` takes its 1px from the stylesheet,
      // which jsdom does not compute — so it falls back to the geometry module's own constant
      // rather than letting NaN pass as a number.
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

    for (const [testId, plate] of [
      [ADOPTION_MARK, 0],
      [IMPLEMENTATION_MARK, 1],
    ] as const) {
      marksOf(container, testId).forEach((el, i) => {
        const left = plateLeft(plate) + parseFloat(el.style.left);
        const top = GRID_TOP + parseFloat(el.style.top);
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

    // THE TWO PLATES TILE THE CONTENT WIDTH EXACTLY, which is what makes the text column the
    // REMAINDER of the measure chain rather than a measured guess.
    expect(PLATE_COUNT).toBe(2);
    expect(plateLeft(0)).toBe(SIDE_MARGIN);
    expect(plateLeft(1) + PLATE_WIDTH).toBe(STAGE.width - SIDE_MARGIN);
    expect(PLATE_WIDTH).toBe((CONTENT_WIDTH - PLATE_GAP) / PLATE_COUNT);
    expect(TEXT_COL_WIDTH).toBe(PLATE_WIDTH - GRID_SIZE - 24);
    expect(textColLeft(0)).toBe(plateLeft(0) + GRID_SIZE + 24);
    expect(textColLeft(1) + TEXT_COL_WIDTH).toBe(STAGE.width - SIDE_MARGIN);
    // THE TWO PLATES ARE EQUAL. The counts are unequal; the two CLAIMS are the same size of
    // claim, and cutting the plates to the rates would say the majority reading matters fourteen
    // times more.
    expect(textColLeft(1) - textColLeft(0)).toBe(PLATE_WIDTH + PLATE_GAP);
  });

  test("band 3 is measured UP from the floor, and its headroom is derived", () => {
    // THE OTHER HALF OF THE 2026-08-14 REWORK, and the only band in this directory that is
    // anchored to the bottom of the stage rather than to the band above it. The closer's distance
    // from the NavBar band is the REQUIREMENT; `CLOSER_TOP` and `RULE_TOP` are both derived
    // backwards from it. That inverts the usual failure mode — a band that grows no longer pushes
    // the closer into the NavBar, it collides with the rule — and the module throws at load if it
    // ever does.
    expect(NAV_ZONE_CLEARANCE).toBe(16);
    expect(CLOSER_TOP).toBe(NAV_ZONE_TOP - NAV_ZONE_CLEARANCE - CLOSER_HEIGHT);
    expect(CLOSER_TOP + CLOSER_HEIGHT).toBe(NAV_ZONE_TOP - NAV_ZONE_CLEARANCE);
    expect(RULE_TOP).toBeLessThan(CLOSER_TOP);
    expect(CLOSER_TOP - (RULE_TOP + RULE_HEIGHT)).toBe(36);
    // THE HEADROOM IS THE SLACK AN EDIT TO BAND 2 SPENDS, and it is positive today with room to
    // watch: the module throws before it reaches zero.
    expect(RULE_HEADROOM).toBe(RULE_TOP - Math.max(GRID_BOTTOM, READING_TOP + READING_BOX_HEIGHT));
    expect(RULE_HEADROOM).toBeGreaterThan(0);
    expect(RULE_HEADROOM).toBe(53);
    // THE GRID IS THE DEEPER OF A PLATE'S TWO COLUMNS, which is what the guard is measured
    // against — a reading box that grew past the grid would move the datum without saying so.
    expect(READING_TOP + READING_BOX_HEIGHT).toBeLessThan(GRID_BOTTOM);
    // …and the box really is a box: its type gets the column minus its own padding and border.
    expect(READING_TEXT_WIDTH).toBe(TEXT_COL_WIDTH - 2 * READING_PAD_X - 2 * READING_BORDER);
    expect(READING_TEXT_WIDTH).toBeLessThan(TEXT_COL_WIDTH);
    // AND THE CLOSER IS THE LOWEST THING ON THE STAGE, which is the user-visible half of the
    // decision — checked against every other shelf rather than against a remembered list.
    for (const shelf of [
      UNIT_EYEBROW_TOP,
      CITATION_TOP,
      GRID_TOP,
      FIGURE_TOP,
      LABEL_TOP,
      NOTE_TOP,
      READING_TOP,
      RULE_TOP,
    ]) {
      expect(shelf).toBeLessThan(CLOSER_TOP);
    }
  });

  test("the renderer reads the module's shelves, not private copies", () => {
    // Spot-welds between DOM style and geometry export — one per band, so a renderer that
    // re-derived a shelf locally fails here by name. The bands read top to bottom.
    const { unmount } = renderSlide(investBaseRatesSlide.canonicalPose);
    const top = (id: string) => parseFloat(screen.getByTestId(id).style.top);
    const left = (id: string) => parseFloat(screen.getByTestId(id).style.left);
    const width = (id: string) => parseFloat(screen.getByTestId(id).style.width);
    const height = (id: string) => parseFloat(screen.getByTestId(id).style.height);

    expect(top("base-rates-eyebrow")).toBe(UNIT_EYEBROW_TOP);
    expect(top("base-rates-citation")).toBe(CITATION_TOP);
    expect(top("base-rates-grid-adoption")).toBe(GRID_TOP);
    expect(top("base-rates-grid-implementation")).toBe(GRID_TOP);
    expect(top("base-rates-rule")).toBe(RULE_TOP);
    expect(top("base-rates-closer")).toBe(CLOSER_TOP);
    // The two plates share every shelf, which is what makes them one figure drawn twice.
    for (const [figureId, labelId, noteId, readingId, plate] of [
      [
        "base-rates-adoption-figure",
        "base-rates-adoption-label",
        "base-rates-adoption-note",
        "base-rates-adoption-reading",
        0,
      ],
      [
        "base-rates-implementation-figure",
        "base-rates-implementation-label",
        "base-rates-implementation-note",
        "base-rates-implementation-reading",
        1,
      ],
    ] as const) {
      expect(top(figureId)).toBe(FIGURE_TOP);
      expect(top(labelId)).toBe(LABEL_TOP);
      expect(top(noteId)).toBe(NOTE_TOP);
      expect(top(readingId)).toBe(READING_TOP);
      for (const id of [figureId, labelId, noteId, readingId]) {
        expect(left(id), id).toBe(textColLeft(plate));
        expect(width(id), id).toBe(TEXT_COL_WIDTH);
      }
      expect(height(figureId)).toBe(FIGURE_HEIGHT);
      expect(height(labelId)).toBe(LABEL_HEIGHT);
      expect(height(noteId)).toBe(EYEBROW_HEIGHT);
      expect(height(readingId)).toBe(READING_BOX_HEIGHT);
    }
    // A FIGURE AND THE HUNDRED IT IS A RATE OF START ON THE SAME LINE.
    expect(top("base-rates-adoption-figure")).toBe(top("base-rates-grid-adoption"));
    expect(top("base-rates-implementation-figure")).toBe(top("base-rates-grid-implementation"));
    // Widths: the two full-bleed bands span the content width.
    for (const id of ["base-rates-eyebrow", "base-rates-citation", "base-rates-rule", "base-rates-closer"]) {
      expect(width(id), id).toBe(CONTENT_WIDTH);
    }
    // Heights, one per register, so a box cut for one line cannot silently be cut for two.
    expect(height("base-rates-eyebrow")).toBe(EYEBROW_HEIGHT);
    expect(height("base-rates-citation")).toBe(CITATION_HEIGHT);
    expect(height("base-rates-closer")).toBe(CLOSER_HEIGHT);
    // The note's own bottom is exported and is what the reading is derived from, so the two
    // cannot drift apart.
    expect(NOTE_BOTTOM).toBe(NOTE_TOP + EYEBROW_HEIGHT);
    expect(READING_TOP).toBeGreaterThan(NOTE_BOTTOM);
    unmount();
  });

  test("the placement guards refuse a 101st square, a fourth count and a third plate", () => {
    // THE GUARDS ARE THE MODULE'S OWN ARGUMENT, MADE EXECUTABLE, and each message names what the
    // illegal call would MEAN rather than what it would compute — "a fourth count would be a rate
    // this deck does not quote". A caller who trips one reads the reasoning in the stack trace.
    for (const [name, fn] of [
      ["markLeft", markLeft],
      ["markTop", markTop],
    ] as const) {
      expect(() => fn(PER_HUNDRED), name).toThrow(/no square 100/);
      expect(() => fn(PER_HUNDRED), name).toThrow(new RegExp(name));
      expect(() => fn(PER_HUNDRED), name).toThrow(/NavBar band/);
      expect(() => fn(-1), name).toThrow(/no square -1/);
      expect(() => fn(1.5), name).toThrow(/no square 1.5/);
      // BOTH GUARD THEIR OWN INDEX rather than leaning on the other's: `100 % 10` is a legal
      // column, so a 101st square would otherwise be placed silently on top of the 91st.
      for (let i = 0; i < PER_HUNDRED; i += 1) {
        expect(Number.isFinite(fn(i)), `${name}(${i})`).toBe(true);
      }
    }
    // `isFilled` guards BOTH of its arguments, and its count message names the three rates.
    expect(() => isFilled(PER_HUNDRED, ADOPTION_COUNT)).toThrow(/no square 100/);
    expect(() => isFilled(0, 0)).toThrow(/no plate fills 0 squares/);
    expect(() => isFilled(0, PER_HUNDRED + 1)).toThrow(/no plate fills 101 squares/);
    expect(() => isFilled(0, 1.5)).toThrow(/no plate fills 1.5 squares/);
    expect(() => isFilled(0, -1)).toThrow(/a rate this deck does not quote/);
    // The stage holds one plate per quoted rate, and a third would be a rate this deck does not
    // quote.
    expect(() => plateLeft(PLATE_COUNT)).toThrow(/no plate 2/);
    expect(() => plateLeft(-1)).toThrow(/no plate -1/);
    expect(() => plateLeft(0.5)).toThrow(/no plate 0.5/);
    expect(() => textColLeft(PLATE_COUNT)).toThrow(/no plate 2/);
  });
});

// ── the boundaries: what a sibling already spent ─────────────────────────────

/**
 * What this slide may not say, and which slide owns each thing.
 *
 * `content.ts`'s block header lists these as prose ("WHAT THIS SLIDE MAY NOT SAY, because a
 * sibling owns each of these"); this is that list made checkable. EVERY PATTERN IS FIRED against
 * the real strings of the slide that owns it — measured on 2026-08-08 — so a list that drifted
 * out of date fails loudly instead of passing vacuously.
 *
 * THE FIRST ENTRIES ARE SPEC CONSTRAINTS, NOT STYLE RULES. §6.2 binds the deck's three shadow-AI
 * passes to share no image and no statistic; §6.1 owns the 70% and the split bar, and this slide
 * applies the same disjointness test ACROSS sections, which is why the figure here is a repeated
 * square rather than a second partitioned bar.
 */
const SIBLING_TOKENS: ReadonlyArray<readonly [string, RegExp, string]> = [
  ["70%", /\b70\s*%/, "B.1"],
  ["30%", /\b30\s*%/, "B.1"],
  ["people & process", /people\s*&\s*process/i, "B.1"],
  ["tool access", /\btool access\b/i, "B.1"],
  ["capability", /\bcapabilit\w*\b/i, "B.1 · B.5"],
  // "70/30" MOVED TO `SPEC_ONLY_TOKENS` on 2026-08-13 — see its declaration below.
  // It was the Capability Ladder's L3 rung and is now nobody's rendered string.
  ["L1–L5", /\bL[1-5]\b/, "B.5"],
  ["rungs", /\brungs?\b/i, "B.5"],
  ["ladder", /\bladder\b/i, "B.5"],
  // "shadow" AND "SOP" MOVED TO `SPEC_ONLY_TOKENS` at the `invest` merge — see their
  // declaration below. Both were D.4's; the merged D.4 draws the condition instead of naming it,
  // and neither spelling is rendered anywhere in this deck now.
  ["deadlock", /\bdeadlock\w*\b/i, "D.3"],
  ["shared accounts", /\bshared account\w*\b/i, "D.3"],
  ["seats", /\bseats?\b/i, "D.3 · D.4"],
  ["a price", /(?:USD|US\$|IDR|Rp|EUR|€|\$)\s?\d/, "D.2"],
];

/** The corpora the patterns above are fired against, by owner. Modules, not transcriptions — a
 *  token can migrate either way and only the receiving file notices. */
const SIBLING_CORPORA: Readonly<Record<string, () => string[]>> = {
  "B.1": () => walkStrings(gapHardestPartContent),
  "B.2": () => walkStrings(gapNoSopContent),
  // B.3 now, not B.4: §6.3 and §6.4 merged into `gap-failures-pattern` and the `gap` run lost a
  // row. The LABEL below is only what a failure message prints; the corpus is the module, which
  // is the point of naming modules rather than transcribing strings.
  "B.3 (§6.3 + §6.4)": () => walkStrings(gapFailuresPatternContent),
  "B.5": () => walkStrings(gapLadderContent),
  // D.2 IS IN THIS TABLE SINCE THE `invest` MERGE, and the price pattern is why. It used to
  // fire on D.5's rate card; that slide is gone, and the only currency figures the deck still
  // renders are D.2's own local ones — resolved per brand, so both arms are walked for the
  // reason `gap-no-sop.test.tsx` walked D.4's callback: the block is not exported and
  // resolving each registered arm is the only honest way to reach every string it can print.
  "D.2": () => [...walkStrings(ownProofFor("berau")), ...walkStrings(ownProofFor("gems"))],
  "D.3": () => walkStrings(investChickenEggContent),
  // ONE D.4 ENTRY AND NO D.5, and no brand arms either. The merge folded two slides into one and
  // dropped both of their brand axes: `invest-governance` names no organisation and no date, so
  // it prints the same bytes in both leader rooms and there is nothing to resolve per brand.
  "D.4": () => walkStrings(investGovernanceContent),
};

/**
 * SPEC spellings that NO sibling renders, kept anyway and said out loud rather than quietly
 * padded into the list above.
 *
 * "no guidance" is §6.2's phrasing for B.2's argument; `gap-no-sop` renders its own image instead
 * and never prints it. `improvise` joined this group on 2026-08-11, when B.2's fray redesign cut
 * the sentence that spelled the verb — the fan draws it now, and §6.2's own sentence is again the
 * only source this file can honestly fire the pattern against.
 *
 * "the pattern" JOINED THEM ON 2026-08-13, and for the third variety of the same reason. It was
 * B.4's, fired against `gapThePatternContent`; §6.3 and §6.4 then merged into
 * `gap-failures-pattern`, whose pose 1 makes the claim as three lessons and a shift and never
 * prints the noun. So the token has an owning SPEC SECTION and no owning STRING, which is exactly
 * the shape of the two above it.
 *
 * "70/30" JOINED THEM THE SAME DAY, and it is the fourth variety: the string was not lost to a
 * merge, it was DELETED as unreadable. §6.5 gives the Capability Ladder's L3 rung the definition
 * "Decision contract · 70/30 split", that rung was the only rendered string in the deck carrying
 * the ratio, and it now defines the decision contract in words instead — partly because the ratio
 * collided head-on with §6.1's unrelated adoption-failure 70/30 four slides earlier, which is a
 * collision this very file documents below. Spec section, no string.
 *
 * They are refused here because a later author is as likely to lift the spec's sentence as the
 * neighbour's copy, and each is controlled against the spec sentence below.
 */
const SPEC_ONLY_TOKENS: ReadonlyArray<readonly [string, RegExp]> = [
  ["no guidance", /\bno guidance\b/i],
  ["no SOP", /\bno[-\s]SOP\b/i],
  ["improvise", /\bimprovis\w*\b/i],
  ["the pattern", /\bpattern\b/i],
  ["70/30", /\b70\s*\/\s*30\b/],
  // "shadow" AND "SOP" JOINED THEM AT THE `invest` MERGE, and it is the fifth variety of the
  // same reason. Both were D.4's rendered strings — §6.7's beat 2 named shadow AI and its beat 3
  // named where the SOP starts — and the merged D.4 renders neither: the leaking account is
  // DRAWN as a door with something coming out of it, and the four governance domains left the
  // stage with the provenance line they could not ship without. Spec sections, no strings, which
  // is the shape of the four above.
  ["shadow", /\bshadow\b/i],
  ["SOP", /\bSOPs?\b/],
];

const SPEC_SENTENCES: readonly string[] = [
  "There is no guidance, so people improvise.",
  "gap-no-sop",
  "The pattern across the three failures.",
  "L3 Agentic, bounded (decision contract, 70/30 split)",
  "Your real exposure today is shadow AI, and there is no SOP for it.",
];

describe("the sibling boundaries", () => {
  test("spends no image or statistic a sibling already owns", () => {
    const authored = authoredStrings();
    const { container, unmount } = renderSlide(investBaseRatesSlide.canonicalPose);
    const stage = stageTextWithoutFigLabel(container);
    expect(stage.length, "a rule over an empty stage proves nothing").toBeGreaterThan(400);

    for (const [name, pattern, owner] of [
      ...SIBLING_TOKENS,
      ...SPEC_ONLY_TOKENS.map(([n, p]) => [n, p, "a spec section, no slide"] as const),
    ]) {
      for (const copy of authored) {
        expect(pattern.test(copy), `${owner}'s "${name}" in ${JSON.stringify(copy)}`).toBe(false);
      }
      expect(pattern.test(stage), `${owner}'s "${name}" reached the stage`).toBe(false);
    }
    unmount();

    // THE FOUR UNRELATED 70/30s THIS SLIDE STAYS OUT OF: §6.5's L3 decision contract, §6.1's
    // adoption-failure split, the older execution/planning split on the research's own slide 3,
    // and HR slide 12's sharpen-the-axe principle. Four splits, one number, no relation between
    // any two — so no string here prints 70 or 30 in any form, and no drawing on this stage
    // partitions anything into two complementary parts.
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
    // The spec-only spellings, controlled against §6.2's own sentence and the slide id it names —
    // and asserted NOT to be rendered by any sibling, which is the split that keeps the control
    // honest rather than assumed.
    for (const [name, pattern] of SPEC_ONLY_TOKENS) {
      expect(SPEC_SENTENCES.some((line) => pattern.test(line)), name).toBe(true);
      for (const [key, corpus] of Object.entries(SIBLING_CORPORA)) {
        expect(
          corpus().some((line) => pattern.test(line)),
          `${name} is rendered by ${key} after all — move it into SIBLING_TOKENS`,
        ).toBe(false);
      }
    }
    // And each corpus is a real one, so "fires on nothing" cannot be hiding behind an empty list
    // of strings.
    for (const [key, corpus] of Object.entries(SIBLING_CORPORA)) {
      expect(corpus().length, `${key}'s corpus is empty`).toBeGreaterThan(10);
    }
  });

  test("tells no story, names no organisation, and makes no turn to the room", () => {
    // The three registers this slide is NOT in, each owned elsewhere: §6.3's first-person
    // confession, D.2's local evidence, and D.3's / M.1's turn to the room. This slide states a
    // base rate about everybody else and prices the default — which is why it can be the same
    // bytes in both leader rooms, and the `no brand variance` block above is the other end of
    // that argument.
    for (const copy of authoredStrings()) {
      expect(copy, `first person in ${JSON.stringify(copy)}`).not.toMatch(
        /\b(we|we're|we've|our|ours|us|I|I'm|I've|my|mine)\b/i,
      );
      expect(copy, `second person in ${JSON.stringify(copy)}`).not.toMatch(
        /\b(you|your|yours|you're|you've)\b/i,
      );
    }
    // POSITIVE CONTROL, fired against the slide that IS allowed to make the turn — its own string,
    // not a sentence written here to make the regex fire.
    expect(/\b(you|your)\b/i.test(investChickenEggContent.turn)).toBe(true);
  });
});

// ── the E.5 overlap, recorded rather than hidden ──────────────────────────────

describe("the E.5 overlap", () => {
  test("shares the adoption figure with E.5 and nothing else", () => {
    // THE ONE BOUNDARY THIS FILE CANNOT ENFORCE AS AN ABSENCE, so it is enforced as an EXACT
    // OVERLAP instead. `b5-todays-landscape` opens on the same 88% from the same publisher one
    // letter-section later in the leader deck, captioned "of organizations have adopted AI", and
    // its chart title is "Adoption is not outcome." D.1 and E.5 therefore make adjacent arguments
    // off one shared figure. `content.ts`'s block header records the overlap as the owner's call
    // and refuses to paper over it by inventing a different statistic for D.1; what this test
    // does is pin the overlap to exactly ONE number, so it cannot quietly widen into two slides
    // saying the same thing.
    expect(b5Content.bigStat).toBe(Number(C.adoptionFigure.replace("%", "")));

    // …and NOTHING ELSE crosses. E.5's two lower bars, its pivot, its cliffhanger and its chart
    // title are all absent here — the `REFUSED_FIGURES` sweep above already forbids 25% and 5.5%,
    // and these are the words.
    const { container, unmount } = renderSlide(investBaseRatesSlide.canonicalPose);
    const stage = stageTextWithoutFigLabel(container);
    for (const copy of [
      b5Content.chartTitle,
      b5Content.chartSubtitle,
      b5Content.mechanism,
      b5Content.cliffhanger,
      b5Content.bigStatCaption,
      b5Content.bigStatSource,
      ...b5Content.bars.map((bar) => bar.label),
    ]) {
      expect(stage, `E.5's "${copy}" reached this stage`).not.toContain(copy);
      expect(authoredStrings(), `E.5's "${copy}" is authored here`).not.toContain(copy);
    }
    // AND THE TWO HEADLINES ARE DIFFERENT CLAIMS, not two phrasings of one. E.5 argues about
    // OUTCOME; this slide argues about MONEY, which is what the report's own EBIT definition
    // supports.
    expect(C.headline).not.toBe(b5Content.chartTitle);
    expect(C.headline).toMatch(/profits/);
    unmount();
  });
});
