// Two hundreds of squares, filled to a rate each, and what each rate is worth.
//
// THE FIGURE IS THE RATE, TWICE. Each plate prints a percentage and then paints that
// percentage as SQUARES — one per organization in a hundred, out of a hundred that are always
// all drawn. That repetition is the whole construction: a room that reads "6%" as rhetoric
// stops doing so once the six are six squares inside a frame of a hundred it can see. The
// counts are not typed here — `../base-rates-geometry.ts` derives both from `ADOPTION_SHARE`
// and `IMPLEMENTATION_SHARE`, which are 0.88 and 0.06 because `../content.ts`'s two figure
// strings say 88% and 6%.
//
// ═══ THREE POSES, ONE PLATE EACH, THEN THE PRICE — the 2026-08-14 owner cut, and it replaced
// a five-pose map. `../invest-base-rates.tsx` carries the map as prose. What matters here is
// what changed in the drawing:
//
//   1. NO POSE SHOWS AN EMPTY HUNDRED. The plates used to stand from pose 0 as empty frames
//      and fill later, so the room's first sight of this stage was two hundred outlines that
//      meant nothing yet. A plate now ARRIVES ALREADY FILLED, frame and fill in one motion, at
//      the pose that argues it.
//   2. THE LEFT PLATE IS MEASURED ONCE. It used to fill to 78 at one pose and on to 88 at the
//      next, which spent a pose on a year-over-year rise this slide never concluded anything
//      from. There is no `===` gate anywhere in this file now, and no figure supersedes
//      another.
//   3. THE READINGS ARE BOXED. Each plate's reading sits in a dashed box with the deck's
//      travelling-ants border (`.gap-box-live`) — see {@link PlateReading}.
//
// ═══ A SQUARE REVEALS ITSELF, AND THE PLATE IS NOT A `Reveal`. Each square carries its own
// opacity, scale and {@link markDelay}, so a plate BUILDS in reading order — a hundred squares
// over about six-tenths of a second, frame and fill arriving together. That is the difference
// between this cut and the last one: the old figure faded a finished frame in as one object
// and then transitioned `background` inside it, which drew a denominator before there was
// anything to be a denominator OF. The plate wrapper is now a plain positioned box; its
// hundred children are the reveal. It is still ONE element's worth of reveal machinery and not
// a hundred `Reveal`s — the section's 90ms box stagger across a hundred squares would take
// nine seconds.
//
// ═══ ONE UNIT, TWO PLATES, AND {@link TIER} GIVES BOTH FILLS THE SAME COLOUR — the decision
// the whole figure rests on. The two plates count the SAME thing (an organization in a
// hundred), the survey never says the six are what is left of the eighty-eight, so colouring
// one fill differently would claim either a different kind of object or a subset relation, and
// the deck holds neither. The only difference this stage draws is HOW MANY.
//
// ═══ IT READS NO VARIANT AND NO BRAND, and unlike three of this directory's four other
// figures it takes no resolved brand block either: this slide has no brand axis at all.
// `../content.ts` carries the argument; the short form is that one publisher's survey of
// organisations in general is nobody's local fact, so §4.4's seven slots do not list this
// slide. A reader arriving from `./ProofLedger.tsx`, `./SecurityBeats.tsx` or
// `./SubscriptionBeats.tsx` will look for a `…For(brand)` prop here and there is not one —
// `./ChickenEggBeats.tsx` is the sibling that made the same call first.
//
// ═══ CSS VARS ONLY, NO HEX AND NO rgba() LITERALS — including the squares, whose fill and
// frame are both ramp tokens and not computed tints.
//
// ═══ RANK IS A COLOUR TIER BETWEEN ROLES — see {@link TIER} — and opacity means "not revealed
// yet", i.e. TIME, never rank. The squares' own inline opacity is the sharpest case and it is
// the rule rather than an exception to it: a square at opacity 0 has NOT ARRIVED, and every
// square that has arrived sits at 1. The right plate's six are a full-strength colour at full
// opacity, identical to the eighty-eight beside them, and NOT a faded copy.
//
// ═══ ZERO SMIL NODES, at every pose, under any motion preference — and closed BY
// CONSTRUCTION exactly as `./SubscriptionBeats.tsx`, `./SecurityBeats.tsx` and
// `leader-gap/components/HardestPartBeats.tsx` close it: THIS FIGURE MOUNTS NO `<svg>` AT ALL,
// so there is no `<animate>`, `<animateTransform>`, `<animateMotion>` or `<set>` to gate at
// mount. Two hundred squares are two hundred `div`s for exactly that reason — an SVG `<rect>`
// grid would have bought nothing and would have re-opened a question the deck has had to
// answer with a `matchMedia` gate three times elsewhere (`E12LoopAnatomy`, `E12MindsetDiptych`,
// `E9DistractionMotion`). The whole motion budget here is `.fade`'s transition pair, the
// squares' own opacity/transform transition, `.copper-rule`'s `scaleX` and `.gap-box-live`'s
// travelling border — and the global `prefers-reduced-motion: reduce` rules in
// `src/styles/globals.css` squash the first three to 0.01ms and remove the fourth outright, so
// every pose rests on its finished frame under either preference. NO NEW KEYFRAME, NO NEW
// CLASS, NO NEW FONT: the reading box reuses `.gap-box-live`, which B.4's open marker already
// stands in.
import type { CSSProperties, JSX } from "react";
// Section E's copy, which is the tree's de facto shared reveal primitive. `./ProofLedger.tsx`
// and `./ChickenEggBeats.tsx` carry a census of its importers and `./SecurityBeats.tsx` and
// `./SubscriptionBeats.tsx` both decline to re-quote it; this file was the FIFTH importer under
// this directory and the numbers are not re-quoted here either. A sixth copy of the primitive
// would still be the wrong answer to three that already exist elsewhere. `CopperRule` comes
// from the same file for the same reason.
import { CopperRule, Reveal } from "@/slides/foundation-core-section-e/components/Reveal";
import { highlight } from "@/components/highlight";
import {
  ADOPTION_COUNT,
  CITATION_HEIGHT,
  CITATION_TOP,
  CLOSER_HEIGHT,
  CLOSER_TOP,
  CONTENT_WIDTH,
  EYEBROW_HEIGHT,
  FIGURE_HEIGHT,
  FIGURE_TOP,
  GRID_SIZE,
  GRID_TOP,
  IMPLEMENTATION_COUNT,
  LABEL_HEIGHT,
  LABEL_TOP,
  MARK_BORDER,
  MARK_SIZE,
  NOTE_TOP,
  PER_HUNDRED,
  READING_BORDER,
  READING_BOX_HEIGHT,
  READING_PAD_X,
  READING_PAD_Y,
  READING_TOP,
  RULE_TOP,
  SIDE_MARGIN,
  TEXT_COL_WIDTH,
  UNIT_EYEBROW_TOP,
  isFilled,
  markLeft,
  markTop,
  plateLeft,
  textColLeft,
} from "../base-rates-geometry";
import { investBaseRatesContent as C } from "../content";

// ───────────────────── the tiers, in one table ─────────────────────

/**
 * One tier per ROLE, and not one per box. The ladder is this section's, with the same
 * hand-derived luminances (WCAG relative luminance over `src/styles/globals.css`'s hexes)
 * `./SecurityBeats.tsx` and `./SubscriptionBeats.tsx` use, so the section's five slides rank
 * at one scale. Brightest first, under the headline's `--neutral-50` (0.9131):
 *
 *   role       token           luminance   register
 *   verdict    --neutral-100    0.7835     19px serif — the closer
 *   claim      --neutral-200    0.6584     15px serif — the two readings
 *   quotation  --copper-200     0.5917     48px display — the two percentages
 *   citation   --neutral-300    0.3663     10.5px mono — the survey, and the two notes
 *   label      --copper-400     0.2967     11px mono caps — the eyebrow and the two labels
 *   fill       --copper-500     0.2168     the filled squares, both plates
 *   box        --copper-700     0.0900     the dashed border round a reading
 *   frame      --copper-800     0.0480     the outline every square carries
 *
 * THE TWO PERCENTAGES ARE THE ONLY COPPER PROSE-WEIGHT TEXT ON THIS STAGE, AND THAT IS THE
 * EPISTEMICS DRAWN IN COLOUR — the rule `./SubscriptionBeats.tsx` records and this file
 * inherits: copper means A THING QUOTED FROM SOMEWHERE ELSE, and the neutral tiers are the
 * deck's own voice. Both figures are the survey's, so they are copper; the two readings and
 * the closer are this deck's claims, so they are neutral. Nothing the slide asserts is copper
 * and nothing it quotes is not.
 *
 * SO THE CENTREPIECE SITS THIRD ON THE LUMINANCE LADDER, AND ITS RANK IS CARRIED BY SIZE. The
 * percentages are 48px, the largest thing on the stage under the 40px headline; the two tiers
 * above them are 19px and 15px — colour says WHOSE numbers they are, size says which object
 * matters most. The thing neither carries is opacity, which on every step-reveal slide in this
 * deck means "not argued yet".
 *
 * THE CITATION IS **NOT** COPPER, which looks like an exception and is not: it is a CITATION,
 * not a quotation — the deck's own note about where the figures came from — and it takes the
 * quietest legal-text tier, `--neutral-300`, exactly as its four siblings' citations do. It
 * does not go below gh#50's floor: this string is what keeps the two figures above it honest.
 * THE TWO PLATE NOTES SHARE THAT TIER for the same reason — each one says WHICH survey a rate
 * was measured in, which is citation work rather than claim work.
 *
 * THE SQUARES AND THE READING BOX'S BORDER ARE THE TWO PLACES ON THIS STAGE WHERE A TIER IS
 * NOT TEXT, so neither is held to the text floor — a square is not read, it is counted, and a
 * border is not read at all. `--copper-500` against `--surface-dark` clears WCAG's 3:1 floor
 * for a non-text graphic with room to spare, and it is the same token B.1 gives the larger of
 * its two bar segments, which keeps a QUANTITY drawn in copper reading as a quantity across the
 * deck. `--copper-800` for the unfilled frame is BELOW that floor deliberately: the frame is
 * not a quantity, it is the denominator, and it must be visible without competing with the fill
 * it contains. `--copper-700` for the reading box is one step up from that and one step under
 * the fill: the box must find its own edge without ranking above the plate it reads.
 *
 * ONE TIER FOR BOTH PLATES AND FOR ALL EIGHTY-EIGHT SQUARES OF THE LEFT ONE — see the header.
 * Ranking six organizations over eighty-eight is a claim the copy makes in words and the
 * drawing must not make twice.
 *
 * `--copper-400` UNDER `--neutral-300` FOR THE MONO CAPS is the shipped precedent all four
 * sibling figures cite — exactly this token in exactly this register, 11px mono caps — and it
 * is precedent, not a documented exemption.
 */
const TIER = {
  /** The two percentages — 48px display, the only copper text on the stage. */
  quotation: "var(--copper-200)",
  /** The survey line, and the two notes under the labels. Quiet, never below the floor. */
  citation: "var(--neutral-300)",
  /** The mono caps rows: band 1's eyebrow and the two plate labels. */
  label: "var(--copper-400)",
  /** Every filled square, in both plates. ONE TIER, and the figure rests on that. */
  fill: "var(--copper-500)",
  /** The dashed border round each reading. Under the fill, over the frame. */
  box: "var(--copper-700)",
  /** The outline every square carries, filled or not — the hundred, drawn. */
  frame: "var(--copper-800)",
  /** The two readings — descriptions, one tier under the verdict. */
  claim: "var(--neutral-200)",
  /** The closer. The brightest text under the headline row. */
  verdict: "var(--neutral-100)",
} as const;

// ───────────────────── type registers ─────────────────────

/** The mono register, in three sizes on this stage. `upper` is the default because every mono
 *  LABEL in this deck is uppercase; the one exception here is the one every sibling makes — a
 *  sentence-length citation in caps is a wall nobody in the back row reads. It drops the
 *  transform and keeps the register. */
function mono(size: number, color: string, ls: number, upper = true): CSSProperties {
  return {
    fontFamily: "var(--mono)",
    fontSize: size,
    letterSpacing: `${ls}em`,
    ...(upper ? { textTransform: "uppercase" as const } : null),
    color,
  };
}

/** The display register — the two figures only. Instrument Serif, the face the deck's
 *  headlines are set in, at the one size on this stage that is larger than a headline's. */
function figure(): CSSProperties {
  return {
    fontFamily: "var(--display)",
    fontWeight: 400,
    fontSize: 48,
    lineHeight: 1.05,
    letterSpacing: "-0.01em",
    color: TIER.quotation,
    margin: 0,
  };
}

/** The prose register — the two readings and the closer. Upright serif; the only italics on
 *  this stage are the keywords `highlight()` places, and no figure, note or citation gets one
 *  (`../content.ts`'s keyword rule). */
function prose(size: number, color: string): CSSProperties {
  return {
    fontFamily: "var(--serif)",
    fontSize: size,
    lineHeight: 1.4,
    color,
    margin: 0,
  };
}

// ───────────────────── the stagger ─────────────────────

/** The section's two numbers — 120ms of lead-in, 90ms between boxes. A section's slides reveal
 *  at one speed or the section has five. */
const LEAD_MS = 120;
const STAGGER_MS = 90;

/** How many steps into a pose a box arrives, as milliseconds of delay. */
const delay = (step: number) => LEAD_MS + step * STAGGER_MS;

/**
 * How long after its plate's own arrival square `index` appears: 6ms per square.
 *
 * SIX AND NOT NINETY. The section's box stagger would take nine seconds across a hundred
 * squares; 6ms builds a whole plate in {@link FLOOD_MS} — about six-tenths of a second — which
 * is long enough to read as a BUILD and short enough that the room is not waiting.
 */
const MARK_STAGGER_MS = 6;

/** How long a whole plate takes to arrive: 600ms. The reading that prices a plate waits for
 *  it, so this is a shelf in TIME the way `READING_TOP` is one in space. */
const FLOOD_MS = MARK_STAGGER_MS * PER_HUNDRED;

/**
 * POSE 0's OPENING — the unit, then WHERE THE FIGURES CAME FROM.
 *
 * THE CITATION ARRIVES SECOND, BEFORE ANY PERCENTAGE, which is one step earlier than B.1 puts
 * its own citation and one position higher on the stage. No frame of this slide ever shows an
 * unattributed number, and the eyebrow before it declares the unit, so a room reads WHAT it is
 * looking at and WHOSE it is before it is shown a single square.
 */
const STAGE_STEP = {
  eyebrow: 0,
  citation: 1,
} as const;

/**
 * A PLATE'S OWN ARRIVAL ORDER, shared by both plates — the hundred squares, then the figure
 * and its label together, then the note, then the reading once the plate has finished building.
 *
 * THE PLATE COMES FIRST because it is the pose's largest object and the thing the figure beside
 * it is a reading OF. A FIGURE AND ITS LABEL SHARE ONE STEP, because a percentage without the
 * thing it is a percentage OF is not a fact yet. The note follows, because it qualifies a fact
 * that has already landed. The reading is last and is timed off {@link FLOOD_MS} rather than
 * off a step, because it prices a plate the room has to have SEEN.
 */
const PLATE_STEP = {
  grid: 0,
  figure: 1,
  label: 1,
  note: 2,
} as const;

/**
 * How many steps of band 1 a plate waits behind on its own pose.
 *
 * The left plate shares pose 0 with the eyebrow and the citation, so it starts two steps in;
 * the right plate has pose 1 to itself and starts at zero. One table, so the two plates keep
 * one internal rhythm and only their offset differs.
 */
const PLATE_OFFSET = [Object.keys(STAGE_STEP).length, 0] as const;

/** When square `index` of plate `plate` arrives. */
const markDelay = (plate: number, index: number) =>
  delay(PLATE_OFFSET[plate] + PLATE_STEP.grid) + index * MARK_STAGGER_MS;

/** When plate `plate`'s reading arrives: one beat after its last square. */
const readingDelay = (plate: number) =>
  delay(PLATE_OFFSET[plate] + PLATE_STEP.grid) + FLOOD_MS + STAGGER_MS;

/**
 * THE LAST POSE'S ARRIVAL ORDER — the rule, then the price.
 *
 * The rule divides the stage before the sentence under it lands, so the closer arrives into a
 * band that already exists rather than opening one.
 */
const PRICE_STEP = {
  rule: 0,
  closer: 1,
} as const;

// ───────────────────── the squares ─────────────────────

/**
 * One plate's hundred squares, as plain positioned boxes that reveal themselves.
 *
 * NOT `Reveal`s, and the plate around them is not one either — see the header. Every square is
 * MOUNTED at every pose and every square is drawn at its final fill; what `on` changes is
 * opacity and scale, staggered by {@link markDelay}, so the plate builds in reading order with
 * frame and fill arriving together. `key` is the index because a square has no identity — it is
 * a unit of a quantity, and `../content.ts` deliberately holds no list for it to be keyed by.
 *
 * THE DELAY IS DROPPED WHEN `on` IS FALSE, which is `Reveal`'s own rule applied by hand: a walk
 * BACKWARDS off this pose must clear the stage at once, not unbuild it square by square.
 *
 * `boxSizing: "border-box"` IS LOAD-BEARING. This deck does not set a global box-sizing rule,
 * so a 22px box with a 1px outline would paint 24px and a ten-square row would overrun
 * `GRID_SIZE` by 20px. The outline is inside the square by declaration.
 *
 * `data-filled` is what the test counts, because jsdom resolves no `var()` and comparing
 * `style.background` to a token string is comparing the component to itself.
 */
function squares(plate: number, count: number, on: boolean, testId: string): JSX.Element[] {
  return Array.from({ length: PER_HUNDRED }, (_, index) => {
    const filled = isFilled(index, count);
    const ms = on ? markDelay(plate, index) : 0;
    return (
      <div
        key={index}
        data-testid={testId}
        data-filled={filled ? "true" : "false"}
        style={{
          position: "absolute",
          left: markLeft(index),
          top: markTop(index),
          width: MARK_SIZE,
          height: MARK_SIZE,
          boxSizing: "border-box",
          border: `${MARK_BORDER}px solid ${TIER.frame}`,
          background: filled ? TIER.fill : "transparent",
          opacity: on ? 1 : 0,
          transform: on ? "scale(1)" : "scale(0.55)",
          // SPLIT RATHER THAN SHORTHAND, so the delay is a property a test can read the way it
          // reads a `Reveal`'s. A shorthand would bury it inside a string.
          transitionProperty: "opacity, transform",
          transitionDuration: "0.3s",
          transitionTimingFunction: "var(--ease)",
          transitionDelay: `${ms}ms`,
        }}
      />
    );
  });
}

// ───────────────────── one plate ─────────────────────

/** A plate's hundred squares, in one plain positioned wrapper. The wrapper never animates:
 *  it is a coordinate system, and the reveal belongs to the squares inside it. */
function PlateGrid({
  plate,
  on,
  count,
  markTestId,
  testId,
}: {
  plate: number;
  on: boolean;
  count: number;
  markTestId: string;
  testId: string;
}) {
  return (
    <div
      data-testid={testId}
      style={{
        position: "absolute",
        left: plateLeft(plate),
        top: GRID_TOP,
        width: GRID_SIZE,
        height: GRID_SIZE,
      }}
    >
      {squares(plate, count, on, markTestId)}
    </div>
  );
}

/** A plate's figure box. One line, no `highlight()`: a figure is a LABEL by `../content.ts`'s
 *  keyword rule, and it is the rule's sharpest case — an `<em>` here would emphasise a
 *  fragment of a number. */
function PlateFigure({
  plate,
  on,
  copy,
  testId,
}: {
  plate: number;
  on: boolean;
  copy: string;
  testId: string;
}) {
  return (
    <Reveal
      on={on}
      delay={delay(PLATE_OFFSET[plate] + PLATE_STEP.figure)}
      data-testid={testId}
      style={{
        position: "absolute",
        left: textColLeft(plate),
        top: FIGURE_TOP,
        width: TEXT_COL_WIDTH,
        height: FIGURE_HEIGHT,
        ...figure(),
        whiteSpace: "nowrap",
      }}
    >
      {copy}
    </Reveal>
  );
}

/** A plate's label box — what the figure above it is a percentage OF. */
function PlateLabel({
  plate,
  on,
  copy,
  testId,
}: {
  plate: number;
  on: boolean;
  copy: string;
  testId: string;
}) {
  return (
    <Reveal
      on={on}
      delay={delay(PLATE_OFFSET[plate] + PLATE_STEP.label)}
      data-testid={testId}
      style={{
        position: "absolute",
        left: textColLeft(plate),
        top: LABEL_TOP,
        width: TEXT_COL_WIDTH,
        height: LABEL_HEIGHT,
        ...mono(11, TIER.label, 0.22),
        lineHeight: 1.3,
      }}
    >
      {copy}
    </Reveal>
  );
}

/** A plate's note box — the string that binds the figure above it to the survey the citation
 *  names, so the two plates can never read as two studies disagreeing. */
function PlateNote({
  plate,
  on,
  copy,
  testId,
}: {
  plate: number;
  on: boolean;
  copy: string;
  testId: string;
}) {
  return (
    <Reveal
      on={on}
      delay={delay(PLATE_OFFSET[plate] + PLATE_STEP.note)}
      data-testid={testId}
      style={{
        position: "absolute",
        left: textColLeft(plate),
        top: NOTE_TOP,
        width: TEXT_COL_WIDTH,
        height: EYEBROW_HEIGHT,
        ...mono(11, TIER.citation, 0.16),
        lineHeight: 1.3,
        whiteSpace: "nowrap",
      }}
    >
      {copy}
    </Reveal>
  );
}

/**
 * A plate's READING — what this deck concludes from the hundred squares beside it — inside a
 * dashed box with a travelling border.
 *
 * THE BOX IS `.gap-box-live`, AND IT IS REUSED RATHER THAN REBUILT. That class is declared once
 * in `src/styles/globals.css` for B.4's open marker: a 1px dashed border with a `::after`
 * overlay of four copper dashes that travel the perimeter on a 3200ms loop, removed outright —
 * not merely shortened — under `prefers-reduced-motion: reduce`. A second copy of it here would
 * be a second keyframe doing one job. The two slides now use one visual grammar for one kind of
 * object: A SENTENCE THE DECK IS ASKING THE ROOM TO SIT WITH.
 *
 * IT IS THE ONLY BORDERED TEXT ON THIS STAGE, which is what the border is for. Everything else
 * here is either quoted (the figures, the labels, the citation) or a verdict on the floor of the
 * stage (the closer). The two readings are the only place the deck argues FROM the evidence
 * beside it, so they are the only place drawn as a held thought.
 *
 * THE TYPE IS CENTRED INSIDE A FIXED BOX. The two sentences do not wrap to the same number of
 * lines and the two boxes are the same height; centring is what stops the shorter one from
 * reading as an unfinished box. See `../base-rates-geometry.ts`'s `READING_BOX_HEIGHT`.
 *
 * `.box-hover` IS THE SECOND CLASS OFF THE SAME SHELF, and these two boxes are the whole of what
 * carries it on this stage: they are the only bordered TEXT here, which is the sentence above
 * restated from the hover side. THE TWO HUNDRED SQUARES DO NOT CARRY IT — a square is a unit of a
 * quantity and not a box a room can be invited to inspect, and two hundred hover targets over one
 * waffle chart is a stage that flickers under a moving pointer.
 */
function PlateReading({
  plate,
  on,
  copy,
  kw,
  testId,
}: {
  plate: number;
  on: boolean;
  copy: string;
  kw: readonly string[];
  testId: string;
}) {
  return (
    <Reveal
      on={on}
      delay={readingDelay(plate)}
      className="gap-box-live box-hover"
      data-testid={testId}
      style={{
        position: "absolute",
        left: textColLeft(plate),
        top: READING_TOP,
        width: TEXT_COL_WIDTH,
        height: READING_BOX_HEIGHT,
        boxSizing: "border-box",
        border: `${READING_BORDER}px dashed ${TIER.box}`,
        padding: `${READING_PAD_Y}px ${READING_PAD_X}px`,
        display: "flex",
        alignItems: "center",
      }}
    >
      <p style={prose(15, TIER.claim)}>{highlight(copy, kw)}</p>
    </Reveal>
  );
}

// ───────────────────── the figure ─────────────────────

export interface BaseRatesBeatsProps {
  /** 0…2. See `../invest-base-rates.tsx` for what each pose argues. */
  pose: number;
}

export function BaseRatesBeats({ pose }: BaseRatesBeatsProps) {
  // Band 1 AND THE WHOLE LEFT PLATE need no gate: both stand from pose 0 and never leave, so
  // `on` is hardcoded true below rather than written as `pose >= 0`, which is a check that
  // cannot fail and which this tree deletes on sight. The rest are `>=` and not `===` for the
  // reason every step-reveal slide in the deck is — a pose is everything argued so far. THERE
  // IS NO EXCEPTION ON THIS STAGE ANY MORE: the supersession that made the left plate's figure
  // a `===` gate went with the year-ago rate.
  const showImplementation = pose >= 1;
  const showPrice = pose >= 2;

  return (
    <>
      {/* ───── BAND 1 · THE UNIT, AND THE SURVEY ─────
          `on` is hardcoded true: `pose >= 0` is a check that cannot fail, and this tree
          deletes those on sight. The eyebrow declares the UNIT before a square arrives. */}
      <Reveal
        on
        delay={delay(STAGE_STEP.eyebrow)}
        data-testid="base-rates-eyebrow"
        style={{
          position: "absolute",
          left: SIDE_MARGIN,
          top: UNIT_EYEBROW_TOP,
          width: CONTENT_WIDTH,
          height: EYEBROW_HEIGHT,
          ...mono(11, TIER.label, 0.22),
          lineHeight: 1.3,
          whiteSpace: "nowrap",
        }}
      >
        {C.unitEyebrow}
      </Reveal>

      {/* THE CITATION, ABOVE THE NUMBERS IT ATTRIBUTES, and ONE line for both plates because
          there is one survey. Rendered whole and unhighlighted: it is a citation, and
          `highlight()` on one would read as the deck editing its own source line. */}
      <Reveal
        on
        delay={delay(STAGE_STEP.citation)}
        data-testid="base-rates-citation"
        style={{
          position: "absolute",
          left: SIDE_MARGIN,
          top: CITATION_TOP,
          width: CONTENT_WIDTH,
          height: CITATION_HEIGHT,
          ...mono(10.5, TIER.citation, 0.02, false),
          lineHeight: 1.4,
        }}
      >
        {C.citation}
      </Reveal>

      {/* ───── THE LEFT PLATE · THE COMMON RATE ─────
          Pose 0, whole: a hundred squares that build to eighty-eight filled, the rate, what
          the rate is of, whose survey it is, and what holding that position proves. */}
      <PlateGrid
        plate={0}
        on
        count={ADOPTION_COUNT}
        markTestId="base-rates-adoption-mark"
        testId="base-rates-grid-adoption"
      />
      <PlateFigure
        plate={0}
        on
        copy={C.adoptionFigure}
        testId="base-rates-adoption-figure"
      />
      <PlateLabel
        plate={0}
        on
        copy={C.adoptionLabel}
        testId="base-rates-adoption-label"
      />
      <PlateNote
        plate={0}
        on
        copy={C.adoptionNote}
        testId="base-rates-adoption-note"
      />
      <PlateReading
        plate={0}
        on
        copy={C.adoptionReading}
        kw={C.adoptionReadingKw}
        testId="base-rates-adoption-reading"
      />

      {/* ───── THE RIGHT PLATE · THE RARE RATE ─────
          Pose 1, and identical to the left plate in every measure except how many squares are
          filled — which is the whole slide. */}
      <PlateGrid
        plate={1}
        on={showImplementation}
        count={IMPLEMENTATION_COUNT}
        markTestId="base-rates-implementation-mark"
        testId="base-rates-grid-implementation"
      />
      <PlateFigure
        plate={1}
        on={showImplementation}
        copy={C.implementationFigure}
        testId="base-rates-implementation-figure"
      />
      <PlateLabel
        plate={1}
        on={showImplementation}
        copy={C.implementationLabel}
        testId="base-rates-implementation-label"
      />
      <PlateNote
        plate={1}
        on={showImplementation}
        copy={C.implementationNote}
        testId="base-rates-implementation-note"
      />
      <PlateReading
        plate={1}
        on={showImplementation}
        copy={C.implementationReading}
        kw={C.implementationReadingKw}
        testId="base-rates-implementation-reading"
      />

      {/* THE RULE THAT CLOSES THE EVIDENCE — full width, because it divides the SLIDE: above
          it what was reported and what each rate buys, below it what this deck concludes. A
          `div` with the deck's own `.copper-rule` `scaleX`; a `<line>` would be the first
          `<svg>` on the slide. The testid sits on a positioned WRAPPER because `CopperRule`
          spreads no `data-*` props. */}
      <div
        data-testid="base-rates-rule"
        style={{ position: "absolute", left: SIDE_MARGIN, top: RULE_TOP, width: CONTENT_WIDTH }}
      >
        <CopperRule on={showPrice} delay={delay(PRICE_STEP.rule)} width="100%" />
      </div>

      {/* ───── THE CLOSER — THE SLIDE'S LAST ARRIVAL, ON THE FLOOR OF THE STAGE ─────
          Full width, alone in its band, 16px above the NavBar's hover band: the price of
          everything above it, and the only sentence here addressed to the rest of the
          section. */}
      <Reveal
        on={showPrice}
        as="p"
        delay={delay(PRICE_STEP.closer)}
        data-testid="base-rates-closer"
        style={{
          position: "absolute",
          left: SIDE_MARGIN,
          top: CLOSER_TOP,
          width: CONTENT_WIDTH,
          height: CLOSER_HEIGHT,
          ...prose(19, TIER.verdict),
          lineHeight: 1.3,
        }}
      >
        {highlight(C.closer, C.closerKw)}
      </Reveal>
    </>
  );
}
