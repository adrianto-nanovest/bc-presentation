// Two reported rates, each drawn as the number of organizations it counts, and what each
// one is worth.
//
// THE FIGURE IS THE PAIR, TWICE. Each row of band 2 prints a percentage and then paints
// that percentage as MARKS — one 24px square per organization in a hundred. That
// repetition is the whole construction: a room that reads "78%" and "6%" as rhetoric
// stops doing so once the 78 is a field it cannot count and the 6 is a row it can. The
// counts are not typed here — `../base-rates-geometry.ts` derives both from
// `ADOPTION_SHARE` and `IMPLEMENTATION_SHARE`, which are 0.78 and 0.06 because
// `../content.ts`'s two figure strings say 78% and 6%.
//
// ONE UNIT, TWO COUNTS, AND {@link TIER} GIVES BOTH FIELDS THE SAME COLOUR — the decision
// the whole figure rests on. The two fields count the SAME thing (an organization in a
// hundred), the source says "78% adoption versus 6% proper implementation" and never says
// the six are drawn from the seventy-eight, so colouring the small field differently would
// claim either a different kind of object or a subset relation, and the deck holds neither.
// The only difference this stage draws is HOW MANY, because it is the only difference the
// source states. `../base-rates-geometry.ts` carries the same argument against drawing the
// pair as a bar.
//
// A FIELD ARRIVES AS ONE BOX AND NOT AS SEVENTY-EIGHT. Each field is a single `Reveal`
// wrapper with plain, unanimated marks inside it: at the section's 90ms stagger a
// mark-by-mark fill would take seven seconds, and the claim is the SIZE of the crowd
// rather than the order it turned up in. That is also why the two mark placement functions
// are the one pair in this directory that returns FIELD-LOCAL coordinates — see their doc
// comments.
//
// IT READS NO VARIANT AND NO BRAND, and unlike three of this directory's four other
// figures it takes no resolved brand block either: this slide has no brand axis at all.
// `../content.ts` carries the argument; the short form is that a base rate about
// organizations in general is nobody's local fact, so §4.4's seven slots do not list this
// slide. A reader arriving from `./ProofLedger.tsx`, `./SecurityBeats.tsx` or
// `./SubscriptionBeats.tsx` will look for a `…For(brand)` prop here and there is not one —
// `./ChickenEggBeats.tsx` is the sibling that made the same call first.
//
// CSS VARS ONLY, NO HEX AND NO rgba() LITERALS — including the marks, whose colour is a
// ramp token and not a computed tint.
//
// RANK IS A COLOUR TIER BETWEEN ROLES — see {@link TIER} — and opacity means "not revealed
// yet", i.e. TIME, never rank. The sharpest case on this stage is the six-mark field: it
// is a full-strength colour at full opacity, identical to the seventy-eight above it, and
// NOT a faded copy of it. A rare thing drawn at low opacity would say "not argued yet" in
// a deck where that is exactly what opacity means.
//
// ZERO SMIL NODES, at every pose, under any motion preference — and closed BY CONSTRUCTION
// exactly as `./SubscriptionBeats.tsx`, `./SecurityBeats.tsx` and
// `leader-gap/components/HardestPartBeats.tsx` close it: THIS FIGURE MOUNTS NO `<svg>` AT
// ALL, so there is no `<animate>`, `<animateTransform>`, `<animateMotion>` or `<set>` to
// gate at mount. Eighty-four marks are eighty-four `div`s for exactly that reason — an
// SVG `<rect>` grid would have bought nothing and would have re-opened a question the deck
// has had to answer with a `matchMedia` gate three times elsewhere (`E12LoopAnatomy`,
// `E12MindsetDiptych`, `E9DistractionMotion`). The whole motion budget here is `.fade`'s
// transition pair plus `.copper-rule`'s `scaleX`, and the global
// `prefers-reduced-motion: reduce` rule in `src/styles/globals.css` squashes both to
// 0.01ms — so every pose rests on its finished frame under either preference. NO NEW
// KEYFRAME, NO NEW CLASS, NO NEW FONT.
import type { CSSProperties, JSX } from "react";
// Section E's copy, which is the tree's de facto shared reveal primitive. `./ProofLedger.tsx`
// and `./ChickenEggBeats.tsx` carry a census of its importers and `./SecurityBeats.tsx` and
// `./SubscriptionBeats.tsx` both decline to re-quote it; this file is the FIFTH importer
// under this directory and moves that count again, so the numbers are not re-quoted here
// either. A sixth copy of the primitive would still be the wrong answer to three that
// already exist elsewhere. `CopperRule` comes from the same file for the same reason.
import { CopperRule, Reveal } from "@/slides/foundation-core-section-e/components/Reveal";
import { highlight } from "@/components/highlight";
import {
  ADOPTION_COUNT,
  ADOPTION_FIELD_HEIGHT,
  ADOPTION_LABEL_TOP,
  ADOPTION_TOP,
  CLOSER_HEIGHT,
  CLOSER_TOP,
  CONTENT_WIDTH,
  EYEBROW_HEIGHT,
  FIELD_LEFT,
  FIGURE_COL_WIDTH,
  FIGURE_HEIGHT,
  IMPLEMENTATION_COUNT,
  IMPLEMENTATION_FIELD_HEIGHT,
  IMPLEMENTATION_LABEL_TOP,
  IMPLEMENTATION_TOP,
  MARK_SIZE,
  READING_COL_WIDTH,
  READING_EYEBROW_TOP,
  READING_LINE_HEIGHT,
  READING_LINE_TOP,
  RULE_TOP,
  SIDE_MARGIN,
  SOURCE_HEIGHT,
  SOURCE_TOP,
  STATISTIC_EYEBROW_TOP,
  fieldWidth,
  markLeft,
  markTop,
  readingColLeft,
} from "../base-rates-geometry";
import { investBaseRatesContent as C } from "../content";

// ───────────────────── the tiers, in one table ─────────────────────

/**
 * One tier per ROLE, and not one per box. The ladder is this section's, with the same
 * hand-derived luminances (WCAG relative luminance over `src/styles/globals.css`'s hexes)
 * `./SecurityBeats.tsx` and `./SubscriptionBeats.tsx` use, so the section's five slides
 * rank at one scale. Brightest first, under the headline's `--neutral-50` (0.9131):
 *
 *   role       token           luminance   register
 *   verdict    --neutral-100    0.7835     22px serif — the closer
 *   claim      --neutral-200    0.6584     17px serif — the two readings
 *   quotation  --copper-200     0.5917     36px mono — the two percentages
 *   citation   --neutral-300    0.3663     10.5px mono — the attribution
 *   label      --copper-400     0.2967     11px mono caps — four label rows
 *   mark       --copper-500     0.2168     the 84 squares, both fields
 *
 * THE TWO PERCENTAGES ARE THE ONLY COPPER TEXT ON THIS STAGE, AND THAT IS THE EPISTEMICS
 * DRAWN IN COLOUR — the rule `./SubscriptionBeats.tsx` records and this file inherits:
 * copper means A THING QUOTED FROM SOMEWHERE ELSE, and the neutral tiers are the deck's
 * own voice. The pair is the source deck's, so it is copper; the two readings and the
 * closer are this deck's claims, so they are neutral. Nothing the slide asserts is copper
 * and nothing it quotes is not.
 *
 * SO THE CENTREPIECE SITS THIRD ON THE LUMINANCE LADDER, AND ITS RANK IS CARRIED BY SIZE.
 * The percentages are 36px, the largest thing on the stage under the 40px headline, and
 * the two tiers above them are 22px and 17px — colour says WHOSE numbers they are, size
 * says which object matters most. The thing neither carries is opacity, which on every
 * step-reveal slide in this deck means "not argued yet".
 *
 * THE ATTRIBUTION IS **NOT** COPPER, which looks like an exception and is not: it is a
 * CITATION, not a quotation — the deck's own note about where the pair came from — and it
 * takes the quietest legal-text tier, `--neutral-300`, exactly as its four siblings'
 * citations do. It does not go below gh#50's floor: this string is what keeps the two
 * figures under it honest, and on this slide more than any other, because the pair has no
 * named upstream owner at all.
 *
 * THE MARKS ARE THE ONE PLACE ON THIS STAGE WHERE A TIER IS A MASS rather than text, so
 * they are not held to the text floor — a square is not read, it is counted.
 * `--copper-500` against `--surface-dark` clears WCAG's 3:1 floor for a non-text graphic
 * with room to spare, and it is the same token B.1 gives the larger of its two bar
 * segments, which keeps a QUANTITY drawn in copper reading as a quantity across the deck.
 *
 * ONE TIER FOR BOTH FIELDS — see the header. Ranking six organizations over
 * seventy-eight, or the reverse, is a claim the copy makes in words and the drawing must
 * not make twice.
 *
 * `--copper-400` UNDER `--neutral-300` FOR THE MONO LABELS is the shipped precedent all
 * four sibling figures cite — exactly this token in exactly this register, 11px mono caps
 * — and it is precedent, not a documented exemption.
 */
const TIER = {
  /** The two percentages — 36px mono, the only copper text on the stage. */
  quotation: "var(--copper-200)",
  /** The attribution. Quiet, and never below the floor. */
  citation: "var(--neutral-300)",
  /** All four mono caps rows: band 1's eyebrow, the two row labels, band 3's eyebrow. */
  label: "var(--copper-400)",
  /** Every mark in both fields. ONE TIER, and the figure rests on that. */
  mark: "var(--copper-500)",
  /** The two readings — descriptions, one tier under the verdict. */
  claim: "var(--neutral-200)",
  /** The closer. The brightest text under the headline row. */
  verdict: "var(--neutral-100)",
} as const;

// ───────────────────── type registers ─────────────────────

/** The mono register, in three sizes on this stage. `upper` is the default because every
 *  mono LABEL in this deck is uppercase; the two exceptions here are the ones every
 *  sibling makes — a QUANTITY is already typeset as it should read, and a sentence-length
 *  citation in caps is a wall nobody in the back row reads. Both drop the transform and
 *  keep the register. */
function mono(size: number, color: string, ls: number, upper = true): CSSProperties {
  return {
    fontFamily: "var(--mono)",
    fontSize: size,
    letterSpacing: `${ls}em`,
    ...(upper ? { textTransform: "uppercase" as const } : null),
    color,
  };
}

/** The prose register — the two readings and the closer. Upright serif; the only italics
 *  on this stage are the keywords `highlight()` places, and neither percentage nor the
 *  attribution gets one (`../content.ts`'s keyword rule). */
function prose(size: number, color: string): CSSProperties {
  return {
    fontFamily: "var(--serif)",
    fontSize: size,
    lineHeight: 1.3,
    color,
    margin: 0,
  };
}

// ───────────────────── the stagger ─────────────────────

/** The section's two numbers — 120ms of lead-in, 90ms between boxes. A section's slides
 *  reveal at one speed or the section has five. */
const LEAD_MS = 120;
const STAGGER_MS = 90;

/** How many steps into a pose a box arrives, as milliseconds of delay. */
const delay = (step: number) => LEAD_MS + step * STAGGER_MS;

/**
 * POSE 0's ARRIVAL ORDER — the eyebrow, then WHERE THE PAIR CAME FROM, then each rate as
 * a number and immediately as its field.
 *
 * THE ATTRIBUTION ARRIVES SECOND, BEFORE EITHER PERCENTAGE, which is one step earlier
 * than B.1 puts its own citation and one position higher on the stage. The reason is the
 * provenance: this pair names no upstream study, so the honest thing to say first is
 * where it was read. No frame of this slide ever shows an unattributed number.
 *
 * EACH FIGURE AND ITS LABEL SHARE ONE STEP, because a percentage without the thing it is
 * a percentage OF is not a fact yet; each FIELD follows its own figure, because the field
 * is the same claim in a second form and nothing rests on it that the number did not
 * already say.
 *
 * THE SIX MARKS ARE THE LAST ARRIVAL OF THE POSE, and that is the pose's whole argument:
 * the room has just watched a field it cannot count, and the answer to it is one short
 * row on the same grid.
 */
const PAIR_STEP = {
  eyebrow: 0,
  source: 1,
  adoption: 2,
  adoptionField: 3,
  implementation: 4,
  implementationField: 5,
} as const;

/**
 * POSE 1's ARRIVAL ORDER — the rule and the eyebrow together, then the common position,
 * then the rare one LAST.
 *
 * THE ORDER IS THE ARGUMENT: the common position first because it is where the room
 * already is, the rare one last because it is what the rest of this section is for. A
 * pose that ended on "holding it proves nothing" would rest on the diagnosis.
 */
const READING_STEP = {
  rule: 0,
  eyebrow: 0,
  common: 1,
  rare: 2,
} as const;

// ───────────────────── the marks ─────────────────────

/**
 * One field's worth of marks, as plain positioned boxes.
 *
 * NOT `Reveal`s. The caller wraps the whole field in one, for the reason the header gives;
 * these carry no class, no delay and no transition of their own, so a field is one
 * animated element whatever its count. `key` is the index because a mark has no identity —
 * it is a unit of a quantity, and `../content.ts` deliberately holds no list for it to be
 * keyed by.
 */
function marks(count: number, testId: string): JSX.Element[] {
  return Array.from({ length: count }, (_, index) => (
    <div
      key={index}
      data-testid={testId}
      style={{
        position: "absolute",
        left: markLeft(index),
        top: markTop(index),
        width: MARK_SIZE,
        height: MARK_SIZE,
        background: TIER.mark,
      }}
    />
  ));
}

// ───────────────────── the figure ─────────────────────

export interface BaseRatesBeatsProps {
  /** 0…2. See `../invest-base-rates.tsx` for what each pose argues. */
  pose: number;
}

export function BaseRatesBeats({ pose }: BaseRatesBeatsProps) {
  // Bands 1 and 2 need no gate: they stand from pose 0 and never leave. The two below are
  // `>=` and not `===` for the reason every step-reveal slide in the deck is — a pose is
  // everything argued so far.
  const showReading = pose >= 1;
  const showCloser = pose >= 2;

  return (
    <>
      {/* ───── BAND 1 · WHAT THIS IS, AND WHERE IT CAME FROM ─────
          `on` is hardcoded true: `pose >= 0` is a check that cannot fail, and this tree
          deletes those on sight. The eyebrow declares the UNIT before a mark is drawn. */}
      <Reveal
        on
        delay={delay(PAIR_STEP.eyebrow)}
        data-testid="base-rates-eyebrow"
        style={{
          position: "absolute",
          left: SIDE_MARGIN,
          top: STATISTIC_EYEBROW_TOP,
          width: CONTENT_WIDTH,
          height: EYEBROW_HEIGHT,
          ...mono(11, TIER.label, 0.22),
          lineHeight: 1.3,
          whiteSpace: "nowrap",
        }}
      >
        {C.statisticEyebrow}
      </Reveal>

      {/* THE ATTRIBUTION, ABOVE THE NUMBERS IT ATTRIBUTES — the opposite of B.1's
          arrangement, and `../content.ts` argues why at length. Rendered whole and
          unhighlighted: it is a citation, and `highlight()` on one would read as the deck
          editing its own source line. */}
      <Reveal
        on
        delay={delay(PAIR_STEP.source)}
        data-testid="base-rates-source"
        style={{
          position: "absolute",
          left: SIDE_MARGIN,
          top: SOURCE_TOP,
          width: CONTENT_WIDTH,
          height: SOURCE_HEIGHT,
          ...mono(10.5, TIER.citation, 0.02, false),
          lineHeight: 1.3,
        }}
      >
        {C.statisticSource}
      </Reveal>

      {/* ───── BAND 2 · ROW A · THE COMMON RATE ─────
          The percentage and its label in the left column, the field of marks to the
          right of them on the same shelf. No `highlight()` on either: both are labels by
          `../content.ts`'s keyword rule, and the percentage is the sharpest case it has. */}
      <Reveal
        on
        delay={delay(PAIR_STEP.adoption)}
        data-testid="base-rates-adoption-figure"
        style={{
          position: "absolute",
          left: SIDE_MARGIN,
          top: ADOPTION_TOP,
          width: FIGURE_COL_WIDTH,
          height: FIGURE_HEIGHT,
          // A quantity's tracking, not a label's, and no transform: a percentage is
          // already typeset as it should read.
          ...mono(36, TIER.quotation, 0.01, false),
          lineHeight: 1.1,
          whiteSpace: "nowrap",
        }}
      >
        {C.adoptionFigure}
      </Reveal>

      <Reveal
        on
        delay={delay(PAIR_STEP.adoption)}
        data-testid="base-rates-adoption-label"
        style={{
          position: "absolute",
          left: SIDE_MARGIN,
          top: ADOPTION_LABEL_TOP,
          width: FIGURE_COL_WIDTH,
          height: EYEBROW_HEIGHT,
          ...mono(11, TIER.label, 0.22),
          lineHeight: 1.3,
          whiteSpace: "nowrap",
        }}
      >
        {C.adoptionLabel}
      </Reveal>

      <Reveal
        on
        delay={delay(PAIR_STEP.adoptionField)}
        data-testid="base-rates-adoption-field"
        style={{
          position: "absolute",
          left: FIELD_LEFT,
          top: ADOPTION_TOP,
          width: fieldWidth(ADOPTION_COUNT),
          height: ADOPTION_FIELD_HEIGHT,
        }}
      >
        {marks(ADOPTION_COUNT, "base-rates-adoption-mark")}
      </Reveal>

      {/* ───── BAND 2 · ROW B · THE RARE RATE ─────
          The same three boxes, on the same grid, at the same mark size and the same
          colour. Everything about this row is identical to the one above it except the
          count, which is the slide. */}
      <Reveal
        on
        delay={delay(PAIR_STEP.implementation)}
        data-testid="base-rates-implementation-figure"
        style={{
          position: "absolute",
          left: SIDE_MARGIN,
          top: IMPLEMENTATION_TOP,
          width: FIGURE_COL_WIDTH,
          height: FIGURE_HEIGHT,
          ...mono(36, TIER.quotation, 0.01, false),
          lineHeight: 1.1,
          whiteSpace: "nowrap",
        }}
      >
        {C.implementationFigure}
      </Reveal>

      <Reveal
        on
        delay={delay(PAIR_STEP.implementation)}
        data-testid="base-rates-implementation-label"
        style={{
          position: "absolute",
          left: SIDE_MARGIN,
          top: IMPLEMENTATION_LABEL_TOP,
          width: FIGURE_COL_WIDTH,
          height: EYEBROW_HEIGHT,
          ...mono(11, TIER.label, 0.22),
          lineHeight: 1.3,
          whiteSpace: "nowrap",
        }}
      >
        {C.implementationLabel}
      </Reveal>

      <Reveal
        on
        delay={delay(PAIR_STEP.implementationField)}
        data-testid="base-rates-implementation-field"
        style={{
          position: "absolute",
          left: FIELD_LEFT,
          top: IMPLEMENTATION_TOP,
          width: fieldWidth(IMPLEMENTATION_COUNT),
          height: IMPLEMENTATION_FIELD_HEIGHT,
        }}
      >
        {marks(IMPLEMENTATION_COUNT, "base-rates-implementation-mark")}
      </Reveal>

      {/* THE RULE THAT CLOSES THE EVIDENCE — full width, because it divides the SLIDE:
          above it what was reported, below it what this deck concludes from it. A `div`
          with the deck's own `.copper-rule` `scaleX`; a `<line>` would be the first
          `<svg>` on the slide. The testid sits on a positioned WRAPPER because
          `CopperRule` spreads no `data-*` props. */}
      <div
        data-testid="base-rates-rule"
        style={{ position: "absolute", left: SIDE_MARGIN, top: RULE_TOP, width: CONTENT_WIDTH }}
      >
        <CopperRule on={showReading} delay={delay(READING_STEP.rule)} width="100%" />
      </div>

      {/* ───── BAND 3 · WHAT EACH RATE BUYS ─────
          Two EQUAL columns — see `../base-rates-geometry.ts` on why this band is not cut
          to the rates it reads. */}
      <Reveal
        on={showReading}
        delay={delay(READING_STEP.eyebrow)}
        data-testid="base-rates-reading-eyebrow"
        style={{
          position: "absolute",
          left: SIDE_MARGIN,
          top: READING_EYEBROW_TOP,
          width: CONTENT_WIDTH,
          height: EYEBROW_HEIGHT,
          ...mono(11, TIER.label, 0.22),
          lineHeight: 1.3,
          whiteSpace: "nowrap",
        }}
      >
        {C.readingEyebrow}
      </Reveal>

      <Reveal
        on={showReading}
        as="p"
        delay={delay(READING_STEP.common)}
        data-testid="base-rates-adoption-reading"
        style={{
          position: "absolute",
          left: readingColLeft(0),
          top: READING_LINE_TOP,
          width: READING_COL_WIDTH,
          height: READING_LINE_HEIGHT,
          ...prose(17, TIER.claim),
        }}
      >
        {highlight(C.adoptionReading, C.adoptionReadingKw)}
      </Reveal>

      <Reveal
        on={showReading}
        as="p"
        delay={delay(READING_STEP.rare)}
        data-testid="base-rates-implementation-reading"
        style={{
          position: "absolute",
          left: readingColLeft(1),
          top: READING_LINE_TOP,
          width: READING_COL_WIDTH,
          height: READING_LINE_HEIGHT,
          ...prose(17, TIER.claim),
        }}
      >
        {highlight(C.implementationReading, C.implementationReadingKw)}
      </Reveal>

      {/* ───── BAND 4 · THE CLOSER — THE SLIDE'S LAST ARRIVAL ─────
          Full width, alone in its band: the price of everything above it, and the only
          sentence here addressed to the rest of the section. */}
      <Reveal
        on={showCloser}
        as="p"
        delay={delay(0)}
        data-testid="base-rates-closer"
        style={{
          position: "absolute",
          left: SIDE_MARGIN,
          top: CLOSER_TOP,
          width: CONTENT_WIDTH,
          height: CLOSER_HEIGHT,
          ...prose(22, TIER.verdict),
        }}
      >
        {highlight(C.closer, C.closerKw)}
      </Reveal>
    </>
  );
}
