// A quoted statistic, that statistic drawn as one split bar, what is inside each
// half, and the gap the split names.
//
// THE FIGURE IS THE STATISTIC, TWICE. Band 1 prints the quotation; band 2 draws the
// same number as two masses; band 3 fills each mass with what it contains. That
// repetition is the whole construction: a room that reads "70%" as a rhetorical
// number stops doing so once the 70% is a rectangle with five named things inside it
// and the 30% is a smaller rectangle with three things money buys. The ratio is not
// typed here — `../hardest-part-geometry.ts` derives both segment widths from
// `PEOPLE_SHARE`, which is 0.70 because the quoted string says 70%.
//
// IT READS NO VARIANT AND NO BRAND, and unlike this directory's other figure
// (`./CapabilityLadder.tsx`) it takes no resolved brand block either: this slide has
// no brand axis at all. `../content.ts` carries the argument; the short form is that
// the statistic is a third party's and the gap is nobody's local fact, so §4.4's
// seven slots do not list this slide. A reader arriving from the ladder will look
// for a `…For(brand)` prop here and there is not one.
//
// CSS VARS ONLY, NO HEX AND NO rgba() LITERALS — including the two bar segments,
// whose colours are the two ends of the copper ramp and not a computed tint.
//
// RANK IS A COLOUR TIER BETWEEN ROLES — see {@link TIER} — and opacity means "not
// revealed yet", i.e. TIME, never rank. The sharpest case on this stage is the bar:
// the 30% segment is DARKER than the 70% one because it is a different role (what
// money already buys, against what it cannot), and it is a full-strength colour at
// full opacity, not a faded copy of its neighbour. A 30% mass drawn at 30% opacity
// would say "less revealed" in a deck where that means "not argued yet".
//
// ZERO SMIL NODES, at every pose, under any motion preference — and closed BY
// CONSTRUCTION exactly as `leader-invest/components/SubscriptionBeats.tsx` and
// `leader-mandate/components/EnablementModel.tsx` close it: THIS FIGURE MOUNTS NO
// `<svg>` AT ALL, so there is no `<animate>`, `<animateTransform>`, `<animateMotion>`
// or `<set>` to gate at mount. The split bar is two plain boxes for exactly that
// reason — an SVG `<rect>` pair would have bought nothing and would have re-opened a
// question the deck has had to answer with a `matchMedia` gate three times elsewhere
// (`E12LoopAnatomy`, `E12MindsetDiptych`, `E9DistractionMotion`), and `./CapabilityLadder.tsx`
// next door pays that cost because its four encodings genuinely need vector marks.
// The entire motion budget here is `.fade`'s transition pair plus `.copper-rule`'s
// `scaleX`, and the global `prefers-reduced-motion: reduce` rule in
// `src/styles/globals.css` squashes both to 0.01ms — so every pose rests on its
// finished frame under either preference. NO NEW KEYFRAME, NO NEW CLASS, NO NEW FONT.
import type { CSSProperties } from "react";
// Section E's copy, which is the tree's de facto shared reveal primitive. The census
// of its importers is kept by `leader-mandate/components/EnablementModel.tsx` and
// `leader-invest/components/SubscriptionBeats.tsx`; this file moves that count again
// and so does not re-quote it. A second copy under this directory would be the wrong
// answer to three that already exist elsewhere. `CopperRule` comes from the same file
// for the same reason.
import { CopperRule, Reveal } from "@/slides/foundation-core-section-e/components/Reveal";
import { highlight } from "@/components/highlight";
import {
  BAR_HEIGHT,
  BAR_TOP,
  CLOSER_HEIGHT,
  CLOSER_TOP,
  CONTENT_WIDTH,
  EYEBROW_HEIGHT,
  GAP_EYEBROW_TOP,
  GAP_LINE_HEIGHT,
  GAP_LINE_TOP,
  GAP_COL_WIDTH,
  HALF_LABEL_TOP,
  PEOPLE_LEFT,
  PEOPLE_WIDTH,
  ROW_HEIGHT,
  RULE_TOP,
  SIDE_MARGIN,
  SOURCE_HEIGHT,
  SOURCE_TOP,
  STATISTIC_EYEBROW_TOP,
  STATISTIC_HEIGHT,
  STATISTIC_TOP,
  SUB_COL_WIDTH,
  TECHNOLOGY_LEFT,
  TECHNOLOGY_WIDTH,
  bandRowTop,
  gapColLeft,
  peopleItemLeft,
  peopleItemTop,
} from "../hardest-part-geometry";
import { gapHardestPartContent as C } from "../content";

// ───────────────────── the tiers, in one table ─────────────────────

/**
 * One tier per ROLE, and not one per box. Hand-derived WCAG relative luminances over
 * `src/styles/globals.css`'s hexes, brightest first, under the headline's
 * `--neutral-50` (0.9131):
 *
 *   role            token           luminance   register
 *   verdict         --neutral-100    0.7835     22px serif — the closer
 *   claim           --neutral-200    0.6584     17px serif — the two gap lines
 *   quotation       --copper-200     0.5917     28px serif — the statistic
 *   listRow         --neutral-300    0.3663     15px sans — all eight rows
 *   citation        --neutral-300    0.3663     10.5px mono — the attribution
 *   label           --copper-400     0.2967     11px mono caps — four label rows
 *   peopleMass      --copper-500     0.2168     the 70% bar segment
 *   technologyMass  --copper-900     0.0230     the 30% bar segment
 *
 * THE STATISTIC IS THE ONLY COPPER TEXT ON THIS STAGE, AND THAT IS THE EPISTEMICS
 * DRAWN IN COLOUR — the rule `leader-invest/components/SubscriptionBeats.tsx` records
 * and this file inherits: copper means A THING QUOTED FROM SOMEWHERE ELSE, and the
 * neutral tiers are the deck's own voice. The statistic is BCG/McKinsey's sentence,
 * so it is copper; the gap lines and the closer are this deck's claims, so they are
 * neutral. Nothing the slide asserts is copper and nothing it quotes is not.
 *
 * SO THE CENTREPIECE SITS THIRD ON THE LUMINANCE LADDER, AND ITS RANK IS CARRIED BY
 * SIZE. The statistic is 28px, the largest thing on the stage under the 40px
 * headline, and the two tiers above it are 22px and 17px — colour says WHOSE sentence
 * it is, size says which sentence matters most. That split is `./CapabilityLadder.tsx`'s
 * own shipped call ("rank is carried by size and colour tier, never by opacity"), and
 * the thing neither of them uses for rank is opacity, which on every step-reveal
 * slide in this deck means "not argued yet".
 *
 * THE ATTRIBUTION IS **NOT** COPPER, which looks like an exception and is not: it is
 * a CITATION, not a quotation — the deck's own note about where the sentence came
 * from — and it takes the quietest legal-text tier, `--neutral-300`, exactly as that
 * file's `citation` role does. It does not go below gh#50's floor: this string is
 * what keeps the figure above it honest.
 *
 * THE TWO BAR SEGMENTS ARE THE ONE PLACE ON THIS STAGE WHERE A TIER IS A MASS rather
 * than text, so neither is held to the text floor — a background is not read, it is
 * compared. `--copper-500` against `--copper-900` is a 3.7:1 contrast ratio, over
 * WCAG's 3:1 floor for a non-text graphic; `--copper-800` for the narrow mass would
 * have been 2.8:1, which is why the ramp's far end is used and not its middle.
 *
 * `--copper-400` UNDER `--neutral-300` FOR THE MONO LABELS is the shipped precedent
 * both sibling leader figures cite — exactly this token in exactly this register,
 * 11px mono caps — and it is precedent, not a documented exemption.
 */
const TIER = {
  /** The quoted statistic — 28px serif, the one copper sentence on the stage. */
  quotation: "var(--copper-200)",
  /** Its attribution. Quiet, and never below the floor. */
  citation: "var(--neutral-300)",
  /** All four mono caps rows: band 1's eyebrow, the two half labels, band 4's. */
  label: "var(--copper-400)",
  /** The 70% mass. The brand copper — the subject of the slide. */
  peopleMass: "var(--copper-500)",
  /** The 30% mass. Full strength, nearly the surface, and NOT a faded copy of the
   *  segment beside it (see the header on opacity). */
  technologyMass: "var(--copper-900)",
  /** All eight list rows, in both halves. ONE TIER FOR BOTH: ranking a structural
   *  item over a thing money buys would be a claim the copy already makes in words,
   *  and ranking the eight against each other would be one nobody authored. */
  listRow: "var(--neutral-300)",
  /** The two gap lines — descriptions, one tier under the verdict. */
  claim: "var(--neutral-200)",
  /** The closer. The brightest text under the headline row. */
  verdict: "var(--neutral-100)",
} as const;

// ───────────────────── type registers ─────────────────────

/** The mono LABEL register. `upper` is the default because every mono label in this
 *  deck is uppercase; the ATTRIBUTION is the one exception — a sentence-length
 *  citation in caps is a wall nobody in the back row reads — and it keeps the
 *  register while dropping the transform, the same two-case helper both sibling
 *  leader figures ship. */
function mono(size: number, color: string, ls: number, upper = true): CSSProperties {
  return {
    fontFamily: "var(--mono)",
    fontSize: size,
    letterSpacing: `${ls}em`,
    ...(upper ? { textTransform: "uppercase" as const } : null),
    color,
  };
}

/** The sans register — every one of the eight rows, cut for one line each. */
const listRowStyle: CSSProperties = {
  fontFamily: "var(--sans)",
  fontSize: 15,
  lineHeight: 1.3,
  color: TIER.listRow,
};

/** The prose register — the statistic, the two gap lines, the closer. Upright serif;
 *  the only italics on this stage are the keywords `highlight()` places, and the
 *  statistic and its source get none of those (`../content.ts`'s keyword rule). */
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

/**
 * 120ms of lead-in, 90ms between boxes.
 *
 * 120 IS THE DECK'S NUMBER — `leader-mandate/type-registers.ts` states it once and
 * both other leader figures use it: it keeps the first box off the same frame as the
 * click. 90 is the leader tree's box-to-box stagger. This section had NO stagger to
 * inherit — `./CapabilityLadder.tsx` passes `Reveal` no delay at all, because its
 * marks arrive in ones and twos — so these are the tree's numbers rather than this
 * directory's, and a third number on a fourth leader figure would be the one worth
 * arguing about.
 */
const LEAD_MS = 120;
const STAGGER_MS = 90;

/** How many steps into a pose a box arrives, as milliseconds of delay. */
const delay = (step: number) => LEAD_MS + step * STAGGER_MS;

/**
 * POSE 0's ARRIVAL ORDER — the eyebrow, the quotation, its source, then the same
 * number drawn: the wide segment, the narrow one, and both labels together.
 *
 * THE SOURCE ARRIVES SECOND, NOT LAST. It is bound to the statistic (8px under it in
 * the geometry) and a citation that lands three boxes after the figure it attributes
 * has already let the room read the figure unattributed. The BAR lands last because
 * it is the same claim in a second form — nothing rests on it that the statistic did
 * not already say.
 *
 * The two half labels share one step: they are a pair, and staggering them would
 * imply the 70% is named before the 30% exists.
 */
const STATISTIC_STEP = {
  eyebrow: 0,
  statistic: 1,
  source: 2,
  peopleMass: 3,
  technologyMass: 4,
  halfLabels: 5,
} as const;

/**
 * POSE 2's ARRIVAL ORDER — the rule and the eyebrow together, then the bought half,
 * then the built half LAST.
 *
 * THE ORDER IS THE ARGUMENT: access first because it is what the room already has,
 * capability last because it is what the rest of the deck is for. A pose that ended
 * on "access is procured" would rest on the easy half.
 */
const GAP_STEP = {
  rule: 0,
  eyebrow: 0,
  access: 1,
  capability: 2,
} as const;

// ───────────────────── the figure ─────────────────────

export interface HardestPartBeatsProps {
  /** 0…3. See `../gap-hardest-part.tsx` for what each pose argues. */
  pose: number;
}

export function HardestPartBeats({ pose }: HardestPartBeatsProps) {
  // Band 1 and band 2 need no gate: they stand from pose 0 and never leave. The
  // three below are `>=` and not `===` for the reason every step-reveal slide in the
  // deck is — a pose is everything argued so far.
  const showContents = pose >= 1;
  const showGap = pose >= 2;
  const showCloser = pose >= 3;

  return (
    <>
      {/* ───── BAND 1 · THE QUOTED STATISTIC ─────
          `on` is hardcoded true: `pose >= 0` is a check that cannot fail, and this
          tree deletes those on sight. */}
      <Reveal
        on
        delay={delay(STATISTIC_STEP.eyebrow)}
        data-testid="hardest-part-statistic-eyebrow"
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

      {/* THE QUOTATION, RENDERED WHOLE AND UNHIGHLIGHTED. No `highlight()` call
          here, deliberately: it is somebody else's sentence (`../content.ts`'s
          keyword rule), and this file never splits, recomposes or emphasises a
          fragment of it. */}
      <Reveal
        on
        as="p"
        delay={delay(STATISTIC_STEP.statistic)}
        data-testid="hardest-part-statistic"
        style={{
          position: "absolute",
          left: SIDE_MARGIN,
          top: STATISTIC_TOP,
          width: CONTENT_WIDTH,
          height: STATISTIC_HEIGHT,
          ...prose(28, TIER.quotation),
        }}
      >
        {C.statistic}
      </Reveal>

      <Reveal
        on
        delay={delay(STATISTIC_STEP.source)}
        data-testid="hardest-part-source"
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

      {/* ───── BAND 2 · THE SAME NUMBER, DRAWN ─────
          Two plain boxes, not an `<svg>` and not one box with a gradient: the
          geometry derives both widths from the statistic's own fraction, and two
          elements are what let the wide mass arrive before the narrow one. */}
      <Reveal
        on
        delay={delay(STATISTIC_STEP.peopleMass)}
        data-testid="hardest-part-bar-people"
        style={{
          position: "absolute",
          left: PEOPLE_LEFT,
          top: BAR_TOP,
          width: PEOPLE_WIDTH,
          height: BAR_HEIGHT,
          background: TIER.peopleMass,
        }}
      />

      <Reveal
        on
        delay={delay(STATISTIC_STEP.technologyMass)}
        data-testid="hardest-part-bar-technology"
        style={{
          position: "absolute",
          left: TECHNOLOGY_LEFT,
          top: BAR_TOP,
          width: TECHNOLOGY_WIDTH,
          height: BAR_HEIGHT,
          background: TIER.technologyMass,
        }}
      />

      {/* THE TWO HALF LABELS — pose 0's last arrival, one step, both at once. Each
          sits 8px under the segment it names, so a label cannot be read against the
          wrong mass. They double as band 3's headings, which is why band 3 has no
          eyebrows of its own: the rows below arrive UNDER the label that already
          names them. */}
      <Reveal
        on
        delay={delay(STATISTIC_STEP.halfLabels)}
        data-testid="hardest-part-people-label"
        style={{
          position: "absolute",
          left: PEOPLE_LEFT,
          top: HALF_LABEL_TOP,
          width: PEOPLE_WIDTH,
          height: EYEBROW_HEIGHT,
          ...mono(11, TIER.label, 0.22),
          lineHeight: 1.3,
          whiteSpace: "nowrap",
        }}
      >
        {C.peopleLabel}
      </Reveal>

      <Reveal
        on
        delay={delay(STATISTIC_STEP.halfLabels)}
        data-testid="hardest-part-technology-label"
        style={{
          position: "absolute",
          left: TECHNOLOGY_LEFT,
          top: HALF_LABEL_TOP,
          width: TECHNOLOGY_WIDTH,
          height: EYEBROW_HEIGHT,
          ...mono(11, TIER.label, 0.22),
          lineHeight: 1.3,
          whiteSpace: "nowrap",
        }}
      >
        {C.technologyLabel}
      </Reveal>

      {/* ───── BAND 3 · WHAT IS INSIDE EACH HALF ─────
          THE TWO LISTS FILL IN PARALLEL, both indexed by the same step, so the two
          halves are read as one comparison rather than as two lists in sequence.
          The consequence is deliberate: the 30% column FINISHES FIRST, at step 2,
          while the 70% column keeps arriving to step 4 — the wide mass takes longer
          to fill, which is the slide's claim happening in the reveal itself. */}
      {C.peopleItems.map((item, i) => (
        <Reveal
          key={item.id}
          on={showContents}
          delay={delay(i)}
          data-testid={`hardest-part-people-${item.id}`}
          style={{
            position: "absolute",
            left: peopleItemLeft(i),
            top: peopleItemTop(i),
            width: SUB_COL_WIDTH,
            height: ROW_HEIGHT,
            ...listRowStyle,
          }}
        >
          {item.label}
        </Reveal>
      ))}

      {C.technologyItems.map((item, i) => (
        <Reveal
          key={item.id}
          on={showContents}
          delay={delay(i)}
          data-testid={`hardest-part-technology-${item.id}`}
          style={{
            position: "absolute",
            left: TECHNOLOGY_LEFT,
            top: bandRowTop(i),
            width: TECHNOLOGY_WIDTH,
            height: ROW_HEIGHT,
            ...listRowStyle,
          }}
        >
          {item.label}
        </Reveal>
      ))}

      {/* THE RULE THAT CLOSES THE SPLIT — full width, because it divides the SLIDE:
          above it what the split is, below it the gap the split names. A `div` with
          the deck's own `.copper-rule` `scaleX`; a `<line>` would be the first
          `<svg>` on the slide. The testid sits on a positioned WRAPPER because
          `CopperRule` spreads no `data-*` props. */}
      <div
        data-testid="hardest-part-rule"
        style={{ position: "absolute", left: SIDE_MARGIN, top: RULE_TOP, width: CONTENT_WIDTH }}
      >
        <CopperRule on={showGap} delay={delay(GAP_STEP.rule)} width="100%" />
      </div>

      {/* ───── BAND 4 · THE GAP ─────
          The eyebrow is the one string on the slide that calls it a gap; the two
          columns spell out the terms it abbreviates. Equal columns, unequal speeds
          — see `../hardest-part-geometry.ts` on why this band is NOT cut 70/30. */}
      <Reveal
        on={showGap}
        delay={delay(GAP_STEP.eyebrow)}
        data-testid="hardest-part-gap-eyebrow"
        style={{
          position: "absolute",
          left: SIDE_MARGIN,
          top: GAP_EYEBROW_TOP,
          width: CONTENT_WIDTH,
          height: EYEBROW_HEIGHT,
          ...mono(11, TIER.label, 0.22),
          lineHeight: 1.3,
          whiteSpace: "nowrap",
        }}
      >
        {C.gapEyebrow}
      </Reveal>

      <Reveal
        on={showGap}
        as="p"
        delay={delay(GAP_STEP.access)}
        data-testid="hardest-part-access"
        style={{
          position: "absolute",
          left: gapColLeft(0),
          top: GAP_LINE_TOP,
          width: GAP_COL_WIDTH,
          height: GAP_LINE_HEIGHT,
          ...prose(17, TIER.claim),
        }}
      >
        {highlight(C.accessLine, C.accessLineKw)}
      </Reveal>

      <Reveal
        on={showGap}
        as="p"
        delay={delay(GAP_STEP.capability)}
        data-testid="hardest-part-capability"
        style={{
          position: "absolute",
          left: gapColLeft(1),
          top: GAP_LINE_TOP,
          width: GAP_COL_WIDTH,
          height: GAP_LINE_HEIGHT,
          ...prose(17, TIER.claim),
        }}
      >
        {highlight(C.capabilityLine, C.capabilityLineKw)}
      </Reveal>

      {/* ───── BAND 5 · THE CLOSER — THE SLIDE'S LAST ARRIVAL ─────
          Full width, alone in its band: the frame on everything above it, and the
          only sentence here addressed to the rest of the deck. */}
      <Reveal
        on={showCloser}
        as="p"
        delay={delay(0)}
        data-testid="hardest-part-closer"
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
