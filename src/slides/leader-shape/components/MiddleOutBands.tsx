// Three organisational tiers, the two acts out of the middle one, and the three adoption
// approaches those acts are the difference between.
//
// ═══ REWORKED 2026-08-14, AND THE FILE KEPT ITS NAME. What it draws now is not three
// bands: it is a three-column figure — plates on the left, a double-headed arrow in the
// centre, approach cards on the right — built in ONE pose with a thesis on a second. The
// name stays because the slide's id, its testid prefix and every reference to this module
// in the tree say `middle-out`, and renaming a file is a diff nobody can review.
//
// THE FIGURE RANKS THE MIDDLE ROW ON PURPOSE. Three plates, one left edge, one width, and
// the middle one warmer, brighter and one row taller than the two beside it. That
// inversion is the whole argument and it is made in colour and in earned height rather
// than in a sentence: authority is at the top — which is where this room sits — the work
// is at the bottom, and the only tier that holds both, plus the one thing neither holds,
// is the one in between. `../content.ts` writes the words; this file is the only place the
// ranking is drawn.
//
// WHO IS BEING SPOKEN TO. The room is mostly TOP MANAGEMENT, so the THIS ROOM tag sits on
// the TOP plate and the second person means that room everywhere it appears. The middle
// plate is described in the third person, which is what makes the figure an ask rather
// than a compliment.
//
// WHAT THE FIGURE REFUSES TO SAY, and each refusal is enforced by something concrete:
//
//   · NO LADDER, NO SCALE, NO MATURITY MODEL. `../middle-out-geometry.ts` gives all three
//     plates one left edge, one width and one placement rule, so no plate can be indented,
//     inset or narrowed to rank it. The one unequal dimension is the middle plate's HEIGHT,
//     which is derived from the one row of copy only that plate has — and `top < middle >
//     bottom` is not the shape of a scale, which is monotonic.
//   · NO INDEX, NO ORDINAL, NO NUMERAL ON A PLATE. The mono name is a tier's whole identity
//     (guardrail 1 in `../content.ts`).
//   · NO STOPS ON THE AXIS. The rail is ONE line with an arrowhead at each end and a single
//     dot at its middle. A scale needs marks to count; there is nothing here to count, and
//     the two heads point away from each other, so the mark has no direction of travel.
//     The FIRST CUT of this figure offset the two shafts and joined them with a horizontal
//     bar; that drew a dimension-line elbow and was cut.
//   · NO LETTER AND NO FIGURE NUMBER. `FigLabel` takes a LABEL only; the composer supplies
//     the rest (§3.5). Nothing under this directory names one.
//
// RANK IS A COLOUR TIER AND OPACITY IS TIME — see {@link TIER}, which is the one place any
// of it is decided. Every plate arrives in the same build, so prominence cannot be spent
// in the opacity channel at all; and the two outer plates lose NOTHING for the middle one
// being bright, at rest or under the pointer (§7.1 — attention is bought with added light,
// never subtracted).
//
// THE POINTER IS THE ONE INTERACTION. Each tier is drawn TWICE — a plate and a card — and
// the claim that they are one thing is made by alignment, which a room takes on trust.
// Hovering either lights BOTH, so a presenter can point at "this row, and therefore this
// approach" mid-sentence without a click. The added light is capped so a hovered resting
// plate never out-shines the middle plate's standing rank: the ranking survives the
// pointer, which is the property to check this table against.
//
// ZERO SMIL NODES, at both poses, under any motion preference — and closed BY CONSTRUCTION
// the way `leader-gap/components/NoSopBeats.tsx` closes it: THIS FIGURE MOUNTS NO `<svg>`
// AT ALL. The plates, the cards, the two shafts and the origin dot are plain
// absolutely-positioned `<div>`s, and the two ARROWHEADS are CSS border triangles —
// `../middle-out-geometry.ts` is shaped to make that possible and says so at its head. The
// motion budget is `./middle-out.css`'s seven one-shot keyframes plus `.fade` for the
// thesis, and the global `prefers-reduced-motion: reduce` rule in `src/styles/globals.css`
// squashes both, with that file's own media block finishing the job. NO NEW FONT AND NO NEW
// GLOBAL CLASS.
//
// CSS VARS ONLY, NO HEX AND NO rgba() LITERAL, anywhere — including the arrow and the plate
// and card grounds.
//
// EVERY COORDINATE IS READ AND EVERY GATE IS ASKED. Not one placement below is computed
// here: the coordinates come from `../middle-out-geometry.ts` and the poses from
// `../middle-out-walk.ts`. The literals that DO appear are type registers and build delays
// — the registers are the sizes that geometry module already cut its boxes against, and the
// delays are the one thing this file owns (see {@link BUILD}).
//
// IT READS NO VARIANT AND NO BRAND, like `leader-gap/components/NoSopBeats.tsx` and unlike
// `./PillarOrbit.tsx` next door: issue #68 gives this slide no brand axis at all, so there
// is no `…For(brand)` prop to look for and both leader rooms read identical bytes off one
// stage.
import { Fragment, useState, type CSSProperties } from "react";
// The keyframes and the hover transition. Imported for its side effect, like
// `./agentic-org.css` next door — Vite emits it into the one stylesheet.
import "./middle-out.css";
// Section E's copy, the tree's shared reveal primitive. IT IS USED FOR THE THESIS AND FOR
// NOTHING ELSE: the thesis is the only box on this stage with a real POSE transition to
// make, and `.fade` is exactly the right thing for that. Every box in the FIGURE arrives
// through `./middle-out.css` instead, because `.fade` owns `transform` and this build needs
// three different directions of entry (that file's header argues it in full).
import { Reveal } from "@/slides/foundation-core-section-e/components/Reveal";
import { highlight } from "@/components/highlight";
import {
  ACT_TEXT_LEFT,
  ACT_TEXT_WIDTH,
  BOTTOM_TIER_INDEX,
  CARD_INNER_LEFT,
  CARD_INNER_WIDTH,
  CARD_LEFT,
  CARD_VERDICT_HEIGHT,
  CARD_WIDTH,
  CHIPS_HEIGHT,
  CHIPS_TOP,
  CLAIM_TEXT_LEFT,
  CLAIM_TEXT_WIDTH,
  DOWN_FLOW_TOP,
  DOWN_HEAD_TOP,
  DOWN_SHAFT_TOP,
  EYEBROW_HEIGHT,
  EYEBROW_WIDTH,
  FLOW_LENGTH,
  FLOW_TRAVEL,
  GLOSS_HEIGHT,
  HEAD_HEIGHT,
  HEAD_LEFT,
  HEAD_WIDTH,
  MIDDLE_TIER_INDEX,
  ORIGIN_DOT_LEFT,
  ORIGIN_DOT_SIZE,
  ORIGIN_DOT_TOP,
  PLATE_INNER_LEFT,
  PLATE_INNER_WIDTH,
  PLATE_LEFT,
  PLATE_WIDTH,
  ROW_HEIGHT,
  SHAFT_HEIGHT,
  SHAFT_LEFT,
  SHAFT_THICKNESS,
  THESIS_HEIGHT,
  THESIS_LEFT,
  THESIS_TOP,
  THESIS_WIDTH,
  TOP_TIER_INDEX,
  UP_FLOW_TOP,
  UP_HEAD_TOP,
  UP_SHAFT_TOP,
  actGlossTop,
  actLabelTop,
  cardLabelTop,
  cardVerdictTop,
  claimEyebrowTop,
  claimRowTop,
  plateHeight,
  plateNameTop,
  plateTop,
} from "../middle-out-geometry";
import { shapeMiddleOutContent as C } from "../content";
import { showsFigure, showsThesis } from "../middle-out-walk";

// ───────────────────── the tiers, in one table ─────────────────────

/**
 * One tier per ROLE, and the two ranks on this stage are `rest` → `lit` (the argument) and
 * `→ hover` (the pointer).
 *
 * Hand-derived WCAG relative luminances over `src/styles/globals.css`'s hexes:
 *
 *   token          luminance   where it appears here
 *   --copper-50     0.8916     a hovered MIDDLE plate's name
 *   --neutral-0     1.0000     a hovered MIDDLE card's verdict
 *   --copper-100    0.7897     the MIDDLE plate's name · the THIS ROOM tag
 *   --neutral-100   0.7835     the thesis · the MIDDLE card's verdict
 *   --copper-200    0.6584     a hovered resting plate's name
 *   --neutral-200   0.5289     a hovered plate's claim rows
 *   --copper-300    0.4200     a resting name · the chips · the act labels · the lit edge
 *   --neutral-300   0.3663     the claim rows · the glosses · a resting verdict
 *   --copper-400    0.2967     the claim eyebrows · a HOVERED resting edge
 *   --copper-500    0.1926     the two shafts and both heads
 *   --copper-700    0.0865     a resting plate's 1px border (`.copper-rule`'s own token)
 *   --copper-800    0.0508     a hovered lit ground
 *   --copper-900    0.0265     the MIDDLE plate's and card's ground
 *   --copper-950    0.0100     a hovered resting ground
 *   --neutral-900   0.0056     the stage's own — an unfilled box
 *
 * ═══ THE FOUR STATES ARE ONE SHAPE. `rest`, `restHover`, `lit` and `litHover` declare
 * exactly the same keys, for the reason `./PillarOrbit.tsx`'s `REST` writes `boxHalo:
 * "none"` out longhand: a property only one state declares is a property with no RELEASE,
 * so React drops the declaration instead of transitioning back to it — and the pointer
 * leaves as often as it arrives.
 *
 * ═══ THE RANK SURVIVES THE POINTER, WHICH IS THE INVARIANT TO CHECK FIRST. Every value in
 * `restHover` is DIMMER than the matching value in `lit`: `--copper-400` under
 * `--copper-300` on the edge, `--copper-950` under `--copper-900` on the ground,
 * `--copper-200` under `--copper-100` on the name. So hovering an outer plate cannot make
 * it look like the row the slide is about, and the middle plate is the brightest object on
 * the stage at every pointer position.
 *
 * ═══ AND NOTHING IS EVER SUBTRACTED. A hover adds light to one tier and changes nothing
 * about the other two — no dim, no desaturation, no opacity drop (§7.1). The two states a
 * tier can be in differ only in how much light they have.
 *
 * ═══ `--copper-900` AND NOT `--copper-950` FOR THE LIT GROUND, which is the one tier value
 * the rework changed rather than moved. At `--copper-950` (#21130a, luminance 0.0100) the
 * middle plate was a barely-warmer black on a black stage: correct on a calibrated monitor
 * and invisible from the back of a room with the lights up. `900` (#3d2413) is unmistakably
 * the hero plate and still leaves 5.4:1 against the claim rows on it and 10.9:1 against its
 * own name.
 *
 * ═══ THE ARROW IS NOT HELD TO THE TEXT FLOOR, for the reason `NoSopBeats.tsx`'s marks are
 * not: a mark is compared, not read. `--copper-500` at 4px with a 16px head is what
 * survives a projector at the back of a room. The ORIGIN DOT is painted in `plate.lit.edge`
 * — the MIDDLE plate's own tier — because one origin, two directions, and the origin is the
 * row the slide is about.
 */
const TIER = {
  /** THE THREE PLATES. `lit` is the middle one at every pose; the two `*Hover` states are
   *  the pointer's, and both are capped under `lit` (see above). */
  plate: {
    rest: {
      edge: "var(--copper-700)",
      fill: "var(--neutral-900)",
      name: "var(--copper-300)",
      row: "var(--neutral-300)",
    },
    restHover: {
      edge: "var(--copper-400)",
      fill: "var(--copper-950)",
      name: "var(--copper-200)",
      row: "var(--neutral-200)",
    },
    lit: {
      edge: "var(--copper-300)",
      fill: "var(--copper-900)",
      name: "var(--copper-100)",
      row: "var(--neutral-300)",
    },
    litHover: {
      edge: "var(--copper-200)",
      fill: "var(--copper-800)",
      name: "var(--copper-50)",
      row: "var(--neutral-200)",
    },
  },
  /** THE THREE CARDS — deliberately the same two moves as the plates', so a reader sees one
   *  ranking applied twice rather than two rankings. */
  card: {
    rest: {
      edge: "var(--copper-700)",
      fill: "var(--neutral-900)",
      label: "var(--copper-300)",
      verdict: "var(--neutral-300)",
    },
    restHover: {
      edge: "var(--copper-400)",
      fill: "var(--copper-950)",
      label: "var(--copper-200)",
      verdict: "var(--neutral-200)",
    },
    lit: {
      edge: "var(--copper-300)",
      fill: "var(--copper-900)",
      label: "var(--copper-100)",
      verdict: "var(--neutral-100)",
    },
    litHover: {
      edge: "var(--copper-200)",
      fill: "var(--copper-800)",
      label: "var(--copper-50)",
      verdict: "var(--neutral-0)",
    },
  },
  /** The six claim eyebrows — HOLDS, CANNOT, ALONE. ONE TIER FOR ALL SIX, and it does NOT
   *  move under the pointer: ranking an eyebrow would make a claim about a tier that the
   *  tier's own chrome already makes. */
  label: "var(--copper-400)",
  /** The middle plate's chips row — the four things a champion holds. */
  chips: "var(--copper-300)",
  /** THIS ROOM. The brightest mono string on the stage, and the only one addressed to a
   *  person rather than naming a thing. */
  tag: "var(--copper-100)",
  /** The two act labels — INFLUENCE UP and DRIVE DOWN. One tier above the claim eyebrows
   *  because they name what the figure's marks DO, which is the reading order the rail
   *  wants: arrow, then act, then what the act consists of. */
  act: "var(--copper-300)",
  /** The two acts' glosses. */
  gloss: "var(--neutral-300)",
  /** Both shafts and both arrowheads. Not the origin dot — see the header. */
  arrow: "var(--copper-500)",
  /** The thesis. The brightest text under the headline row. */
  thesis: "var(--neutral-100)",
} as const;

/** A plate's or a card's border weight. `1px` is the deck's own, and `boxSizing:
 *  border-box` below keeps it INSIDE the rectangle `../middle-out-geometry.ts` cut, so a
 *  border is not a coordinate this file invented. */
const boxBorder = (edge: string) => `1px solid ${edge}`;

// ───────────────────── type registers ─────────────────────

/** The mono LABEL register — 11px caps at 0.22em, the size and tracking
 *  `../middle-out-geometry.ts` cut `EYEBROW_HEIGHT` and every mono budget against. */
function mono(color: string): CSSProperties {
  return {
    fontFamily: "var(--mono)",
    fontSize: 11,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    lineHeight: 1.3,
    color,
  };
}

/** The sans register — the six claim rows at 15 (one line each) and the two act glosses at
 *  13 (up to three). */
function sans(size: number, color: string): CSSProperties {
  return {
    fontFamily: "var(--sans)",
    fontSize: size,
    lineHeight: size === 13 ? 1.35 : 1.3,
    color,
    margin: 0,
  };
}

/** The prose register — the three approach verdicts at 15 and the thesis at 18. Upright
 *  serif; the only italics on this stage are the keywords `highlight()` places, and the
 *  mono LABEL register gets none of those (`../content.ts`'s keyword rule). */
function serif(size: number, color: string): CSSProperties {
  return {
    fontFamily: "var(--serif)",
    fontSize: size,
    lineHeight: size === 15 ? 1.35 : 1.3,
    color,
    margin: 0,
  };
}

/**
 * EVERY BOX THAT CARRIES TYPE IS TRANSPARENT TO THE POINTER, and that is what makes the
 * hover work at all.
 *
 * The plates and cards are declared BEFORE their own copy, so the copy paints on top — and
 * a text box that accepted pointer events would swallow every `mouseenter` aimed at the
 * rectangle underneath it, so the highlight would flicker off wherever a claim row happens
 * to be. Six boxes are hover targets (three plates, three cards); everything else on this
 * stage is invisible to the pointer.
 */
const noPointer: CSSProperties = { pointerEvents: "none" };

/**
 * A box whose copy is VERTICALLY CENTRED inside it — the three card verdicts and the two
 * act glosses, which are the five boxes on this stage cut for MORE lines than their
 * shortest copy needs.
 *
 * `CARD_VERDICT_HEIGHT` is cut for two lines and two of the three verdicts take one;
 * `GLOSS_HEIGHT` is cut for three and one gloss takes two. Top-aligned, a one-line verdict
 * would hang 10px above its card's own centre line and the three cards would look mis-set.
 */
const centred: CSSProperties = { display: "flex", alignItems: "center" };

/**
 * The one child a {@link centred} box may have — and it exists because of a bug this figure
 * shipped for exactly one screenshot.
 *
 * `highlight()` RETURNS A LIST OF SPANS, one per run: the text either side of a keyword and
 * an `<em>` for the keyword itself. Inside a FLEX container each of those becomes its own
 * FLEX ITEM, so a sentence with one italic in it is laid out as three side-by-side columns
 * that each wrap independently — which is what the two act glosses rendered as the first
 * time they were centred (the upward gloss came out as "They tell this room / what works,
 * and / what blocks it", in ragged stacks — the copy has since been rewritten and the fault
 * has not). A single block-level child restores normal inline layout inside the box
 * while the box itself stays a flex container for the one thing it is one for.
 *
 * The three approach verdicts pass a bare string and do NOT need this — a text node in a
 * flex container is wrapped in ONE anonymous item and wraps normally — but they take it
 * anyway, because "boxes that centre their copy wrap it in this" is a rule a reader can
 * check, and "except when the copy happens to have no keyword in it" is not.
 */
const centredChild: CSSProperties = { display: "block", width: "100%" };

// ───────────────────── the build ─────────────────────

/**
 * THE BUILD, IN MILLISECONDS — one pose, three cascades and a drawn rail between them.
 *
 * WRITTEN AS EXPLICIT MILLISECONDS AND NOT AS A `120 + step × 90` LADDER, which is what
 * this figure shipped with and what the leader tree uses everywhere a stagger is a LIST.
 * This build is not a list: it is two-dimensional (three plates, each with two rows) and it
 * has a 560ms drawn mark in the middle of it that two other boxes have to land after. A
 * step ladder cannot express "when the shaft gets there", and faking it with a step index
 * that happens to multiply out to the right number is how a delay table stops meaning
 * anything.
 *
 * THE ORDER IS THE FIGURE'S OWN STRUCTURE, and each cascade enters from the side of the
 * stage it belongs to (`./middle-out.css` owns the directions):
 *
 *   120 → 280   THE PLATES, from the left, top to bottom. The organisation, named.
 *   260 → 500   WHAT EACH TIER HOLDS — two rows per plate, cascading down and across, so
 *               the reader's eye is walked down the chart rather than shown a table.
 *   560         THE ORIGIN DOT. Where both acts leave from, before either of them moves.
 *   620         BOTH SHAFTS, growing out of that dot in opposite directions, together —
 *               staggering the two by even a frame would say "first this, then that" about
 *               the one pair of marks the no-new-ladder guardrail exists to protect.
 *  1180         THE TWO ARROWHEADS, landing exactly as their shaft arrives
 *               ({@link BUILD.shaft} + {@link SHAFT_DRAW_MS}).
 *   760 → 840   THE TWO ACTS IN WORDS, settling up beside their own arrow.
 *   900 → 1060  THE THREE APPROACH CARDS, from the right. Last, because a verdict on an
 *               approach only means something once the room has seen what the middle can do
 *               that the other two cannot.
 *
 * 120ms OF LEAD-IN is the leader tree's own number, kept: it keeps the first box off the
 * same frame as the presenter's click.
 */
const BUILD = {
  /** The first plate. */
  plate: 120,
  /** …and each plate below it. 80ms is fast enough to read as one gesture. */
  plateStep: 80,
  /** The first plate's first claim row — 140ms behind its own plate, so the box is settled
   *  before its copy arrives inside it. */
  claim: 260,
  /** …and each row under it, within a plate. */
  claimRow: 40,
  /** The origin dot. */
  dot: 560,
  /** Both shafts. */
  shaft: 620,
  /** The upward act's copy; the downward act's follows one step later, which is the only
   *  place the two acts are staggered at all — their MARKS are simultaneous, their captions
   *  are read one after the other. */
  act: 760,
  actStep: 80,
  /** The first approach card. */
  card: 900,
  cardStep: 80,
} as const;

/**
 * How long a shaft takes to draw: 560ms — WHICH MUST MATCH `mo-shaft-grow` in
 * `./middle-out.css`, and is the only number in this file duplicated anywhere.
 *
 * IT IS HERE BECAUSE AN ARROWHEAD IS NOT A KEYFRAME. The heads arrive on their own
 * animation, so their delay has to be spelled as "when the shaft gets there" —
 * `BUILD.shaft + SHAFT_DRAW_MS` — and a CSS animation cannot tell a React prop when it
 * finished. The duplication is stated rather than hidden: retime the keyframe and this
 * constant moves with it, or the heads appear on a shaft that is still growing.
 */
const SHAFT_DRAW_MS = 560;

/** The two claim rows, as a ROW INDEX and as an ARRIVAL SLOT — which are the same number,
 *  because the reading order and the arrival order of the two rows are one fact.
 *  `../content.ts` models them as two named FIELDS on `Tier` (`holds` / `qualifier`) rather
 *  than as an array, so there is nothing to map over and the index has to be stated;
 *  `claimRowTop(i, row)` throws on a third. */
const CLAIM_ROW = { holds: 0, qualifier: 1 } as const;

/**
 * One box's entrance, as the two things every animated box on this stage needs: which
 * keyframe, and when.
 *
 * `shown` IS `showsFigure()`, THREADED THROUGH EVERY BOX IN THE FIGURE — which is what makes
 * that walk function load-bearing rather than decorative. It answers `true` at every pose
 * the deck can reach, so nothing below ever renders the hidden branch today; what it buys is
 * the seam. A figure whose boxes carried a bare `animationDelay` and no gate would have
 * nowhere for a second pose to attach, and the next author would reach for a comparison
 * against `pose` inside this file — which is the one thing every other slide in this tree is
 * built to prevent.
 */
const entrance = (shown: boolean, name: string, ms: number) => ({
  className: shown ? name : "",
  style: (shown ? { animationDelay: `${ms}ms` } : { opacity: 0 }) as CSSProperties,
});

// ───────────────────── the figure ─────────────────────

export interface MiddleOutBandsProps {
  /** 0 or 1. See `../middle-out-walk.ts` for what each pose carries. */
  pose: number;
}

export function MiddleOutBands({ pose }: MiddleOutBandsProps) {
  // THE POSE, ASKED WHERE IT IS ANSWERED. Both questions go to `../middle-out-walk.ts` and
  // neither is re-derived from a comparison here, so no branch in this tree can form its
  // own opinion about what pose 1 means.
  const figure = showsFigure();
  const thesis = showsThesis(pose);

  /**
   * WHICH TIER THE POINTER IS ON, by `id` — and `null` when it is nowhere.
   *
   * ONE PIECE OF STATE FOR SIX BOXES, which is what makes the pairing possible: a plate and
   * its card set and read the same value, so hovering either lights both. Keyed by the
   * content module's own `id` rather than by an index, so the two lists cannot drift.
   *
   * IT IS DELIBERATELY NOT A `:hover` RULE. The two boxes that share a highlight are
   * 236px apart with a rail between them and are siblings in an absolute layout — there is
   * no selector that reaches from one to the other.
   */
  const [hovered, setHovered] = useState<string | null>(null);

  /** The middle row, asked in one place, so a plate and the card beside it can never
   *  disagree about which row the argument is about. */
  const isMiddle = (index: number) => index === MIDDLE_TIER_INDEX;

  /** The four-state resolution, written once for the plates and once for the cards: the
   *  argument's rank first, then the pointer's. */
  const plateTier = (index: number, id: string) =>
    isMiddle(index)
      ? hovered === id
        ? TIER.plate.litHover
        : TIER.plate.lit
      : hovered === id
        ? TIER.plate.restHover
        : TIER.plate.rest;

  const cardTier = (index: number, id: string) =>
    isMiddle(index)
      ? hovered === id
        ? TIER.card.litHover
        : TIER.card.lit
      : hovered === id
        ? TIER.card.restHover
        : TIER.card.rest;

  return (
    <>
      {/* ───── THE THREE PLATES ─────
          The chart itself, entering from the left, top to bottom. THESE ARE TWO OF THE SIX
          HOVER TARGETS: the rectangle takes the pointer events for everything printed
          inside it, which is why every type box on this stage carries `noPointer`.

          `data-lit` PUTS THE RANK IN THE DOM and `data-hover` puts the pointer there. The
          unit test and the browser harness read both from attributes rather than from a
          parsed style string — "which row is the argument about" is a fact about the figure,
          and reading it back out of a border colour would make every check a check of the
          tier table's spelling instead. */}
      {C.tiers.map((tier, i) => {
        const lit = isMiddle(i);
        const t = plateTier(i, tier.id);
        const on = hovered === tier.id;
        return (
          <div
            key={tier.id}
            {...entrance(figure, "mo-in-left mo-hoverable", BUILD.plate + i * BUILD.plateStep)}
            data-testid={`middle-out-plate-${tier.id}`}
            data-lit={lit ? "true" : "false"}
            data-hover={on ? "true" : "false"}
            onMouseEnter={() => setHovered(tier.id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              position: "absolute",
              left: PLATE_LEFT,
              top: plateTop(i),
              width: PLATE_WIDTH,
              height: plateHeight(i),
              border: boxBorder(t.edge),
              // `border-box`, so the 1px border paints INSIDE the rectangle the geometry
              // module cut. A content-box border would make every plate 110 tall against a
              // chart budgeted at 108 and push the whole stage down.
              boxSizing: "border-box",
              backgroundColor: t.fill,
              animationDelay: `${BUILD.plate + i * BUILD.plateStep}ms`,
            }}
          />
        );
      })}

      {/* ───── EVERY PLATE'S NAME ROW, AND ITS TWO CLAIM ROWS ─────
          THE MIDDLE PLATE'S NAME ROW CARRIES TWO STRINGS — its name and the champions
          beside it — in ONE element, because the subname has to sit immediately after a
          name whose rendered width nothing in the geometry knows. THE TOP PLATE'S carries
          the THIS ROOM tag as its own right-aligned box, because that position is the
          addressing. */}
      {C.tiers.map((tier, i) => {
        const t = plateTier(i, tier.id);
        const at = BUILD.claim + i * BUILD.plateStep;
        // The two rows, in reading order, which is also arrival order. `slot` is a DOM
        // handle only; no string here reaches the stage.
        const rows = [
          {
            slot: "holds",
            row: CLAIM_ROW.holds,
            eyebrow: tier.holdsEyebrow,
            text: tier.holds,
            kw: tier.holdsKw,
          },
          {
            slot: "qualifier",
            row: CLAIM_ROW.qualifier,
            eyebrow: tier.qualifierEyebrow,
            text: tier.qualifier,
            kw: tier.qualifierKw,
          },
        ];
        return (
          <Fragment key={tier.id}>
            <div
              {...entrance(figure, "mo-in-left mo-hover-type", BUILD.plate + i * BUILD.plateStep)}
              data-testid={`middle-out-plate-${tier.id}-name`}
              style={{
                position: "absolute",
                left: PLATE_INNER_LEFT,
                top: plateNameTop(i),
                width: PLATE_INNER_WIDTH,
                height: EYEBROW_HEIGHT,
                ...mono(t.name),
                whiteSpace: "nowrap",
                ...noPointer,
                animationDelay: `${BUILD.plate + i * BUILD.plateStep}ms`,
              }}
            >
              {/* NO `highlight()` HERE, AND NONE ON ANY MONO STRING BELOW EITHER. The tier
                  names are the chart's row names and carry no `*Kw` sibling by construction
                  (`../content.ts`'s keyword rule); a copper italic inside an 11px uppercase
                  mono label would emphasise a fragment of somebody's job title and read as
                  a rendering fault. */}
              {tier.name}
              {isMiddle(i) && (
                <>
                  {/* THE SEPARATOR IS A MIDDOT AND NOT A DASH, and it is padded rather than
                      spaced: at 0.22em tracking a space either side of an em dash opens a
                      hole the row cannot afford, and a middot reads as "and also" rather
                      than as "which is". */}
                  <span style={{ padding: "0 10px", color: TIER.label }}>·</span>
                  <span style={{ color: TIER.label }}>{C.middleSubname}</span>
                </>
              )}
            </div>

            {/* THE ADDRESSING, AND IT SITS ON THE TOP PLATE. This deck's room is mostly TOP
                MANAGEMENT, so "THIS ROOM" is right-aligned inside the plate that names them
                — not the middle one, which is where the room's own managers are. Put it on
                the middle plate and the slide flatters people who are not in the chairs; put
                it here and the figure reads as the ask it is. `TOP_TIER_INDEX` is read from
                the geometry, never typed as a 0. */}
            {i === TOP_TIER_INDEX && (
              <div
                {...entrance(figure, "mo-in-up", at)}
                data-testid="middle-out-plate-tag"
                style={{
                  position: "absolute",
                  left: PLATE_INNER_LEFT,
                  top: plateNameTop(i),
                  width: PLATE_INNER_WIDTH,
                  height: EYEBROW_HEIGHT,
                  ...mono(TIER.tag),
                  textAlign: "right",
                  whiteSpace: "nowrap",
                  ...noPointer,
                  animationDelay: `${at}ms`,
                }}
              >
                {C.roomTag}
              </div>
            )}

            {rows.map((row) => (
              // THE EYEBROW AND ITS CLAIM ARRIVE TOGETHER, always. The eyebrow is not a beat
              // of its own — it is how the row is labelled — and a HOLDS standing alone over
              // an empty measure for 40ms is a row that looks like it failed to load.
              <Fragment key={row.slot}>
                {/* THE EYEBROW SITS ON ITS CLAIM'S BASELINE, WHICH IS 4px UNDER THE ROW'S
                    OWN TOP EDGE — `claimEyebrowTop` and not `claimRowTop`, and the
                    geometry module carries the arithmetic. Two boxes that share a `top`
                    do NOT share a baseline when one is 11px mono and the other 15px sans:
                    the smaller line box is shorter, so its type rides about four pixels
                    high, and at the back of a room a floating HOLDS reads as the label of
                    the row above it. */}
                <div
                  {...entrance(figure, "mo-in-left", at + row.row * BUILD.claimRow)}
                  data-testid={`middle-out-${tier.id}-${row.slot}-eyebrow`}
                  style={{
                    position: "absolute",
                    left: PLATE_INNER_LEFT,
                    top: claimEyebrowTop(i, row.row),
                    width: EYEBROW_WIDTH,
                    height: EYEBROW_HEIGHT,
                    ...mono(TIER.label),
                    whiteSpace: "nowrap",
                    ...noPointer,
                    animationDelay: `${at + row.row * BUILD.claimRow}ms`,
                  }}
                >
                  {row.eyebrow}
                </div>
                <p
                  {...entrance(
                    figure,
                    "mo-in-left mo-hover-type",
                    at + row.row * BUILD.claimRow,
                  )}
                  data-testid={`middle-out-${tier.id}-${row.slot}`}
                  style={{
                    position: "absolute",
                    left: CLAIM_TEXT_LEFT,
                    top: claimRowTop(i, row.row),
                    width: CLAIM_TEXT_WIDTH,
                    height: ROW_HEIGHT,
                    ...sans(15, t.row),
                    ...noPointer,
                    animationDelay: `${at + row.row * BUILD.claimRow}ms`,
                  }}
                >
                  {highlight(row.text, row.kw)}
                </p>
              </Fragment>
            ))}

            {/* THE ROW ONLY THE MIDDLE PLATE HAS, and the reason that plate is 28px taller
                than the other two — the height is earned by this string, and
                `MIDDLE_PLATE_HEIGHT` in `../middle-out-geometry.ts` is derived from its
                registers rather than typed. Delete the string and all three plates come out
                equal. */}
            {isMiddle(i) && (
              <div
                {...entrance(figure, "mo-in-up", at + CLAIM_ROW.qualifier * BUILD.claimRow)}
                data-testid="middle-out-plate-chips"
                style={{
                  position: "absolute",
                  left: PLATE_INNER_LEFT,
                  top: CHIPS_TOP,
                  width: PLATE_INNER_WIDTH,
                  height: CHIPS_HEIGHT,
                  ...mono(TIER.chips),
                  whiteSpace: "nowrap",
                  ...noPointer,
                  animationDelay: `${at + CLAIM_ROW.qualifier * BUILD.claimRow}ms`,
                }}
              >
                {C.middleChips}
              </div>
            )}
          </Fragment>
        );
      })}

      {/* ───── THE RAIL · ONE AXIS, TWO HEADS, ONE ORIGIN ─────
          Declared after the plates so the marks paint over any ground they cross —
          positioned elements at `z-index: auto` paint in DOM order, which is the whole
          z-index policy this figure needs. All four boxes are `noPointer`: the rail is not a
          hover target, because what a pointer means on this stage is "this tier", and the
          rail belongs to two of them at once.

          THE DOT FIRST. It opens from nothing on the middle plate's centre line, and it is
          painted in that plate's own edge tier rather than the arrow's — one origin, two
          directions, and the origin is the row the slide is about. */}
      <div
        {...entrance(figure, "mo-dot-in", BUILD.dot)}
        data-testid="middle-out-origin-dot"
        style={{
          position: "absolute",
          left: ORIGIN_DOT_LEFT,
          top: ORIGIN_DOT_TOP,
          width: ORIGIN_DOT_SIZE,
          height: ORIGIN_DOT_SIZE,
          borderRadius: "50%",
          backgroundColor: TIER.plate.lit.edge,
          ...noPointer,
          animationDelay: `${BUILD.dot}ms`,
        }}
      />

      {/* THE TWO SHAFTS — one x, one length, one delay, growing out of the dot in opposite
          directions. Each one's `transform-origin` is the end that touches the middle
          plate's centre line, which is what makes the growth OUTWARD; `./middle-out.css`
          states both. Together they read as a single 264px line, which is why they may not
          be staggered against each other. */}
      <div
        {...entrance(figure, "mo-shaft-up", BUILD.shaft)}
        data-testid="middle-out-shaft-up"
        style={{
          position: "absolute",
          left: SHAFT_LEFT,
          top: UP_SHAFT_TOP,
          width: SHAFT_THICKNESS,
          height: SHAFT_HEIGHT,
          backgroundColor: TIER.arrow,
          ...noPointer,
          animationDelay: `${BUILD.shaft}ms`,
        }}
      />
      <div
        {...entrance(figure, "mo-shaft-down", BUILD.shaft)}
        data-testid="middle-out-shaft-down"
        style={{
          position: "absolute",
          left: SHAFT_LEFT,
          top: DOWN_SHAFT_TOP,
          width: SHAFT_THICKNESS,
          height: SHAFT_HEIGHT,
          backgroundColor: TIER.arrow,
          ...noPointer,
          animationDelay: `${BUILD.shaft}ms`,
        }}
      />

      {/* THE TWO PULSES — the only motion on this stage that never stops, and the figure's
          claim rather than its decoration: a drawn arrow says the act happened once, a pulse
          leaving the middle every two and a bit seconds says it is what the middle DOES.
          Both leave together and travel outward, one per shaft.

          THEY START WHEN THE RAIL IS FINISHED, on the same delay as the arrowheads, so
          nothing runs along a line that is still growing.

          `--mo-travel` IS THE ONE COORDINATE THAT REACHES CSS, and it is read from the
          geometry like every other: `FLOW_TRAVEL` is `SHAFT_HEIGHT − FLOW_LENGTH`, so the
          pulse starts flush with the origin dot and stops flush against the head.

          THE GRADIENT IS BRIGHTEST AT THE LEADING EDGE — `to top` for the pulse going up,
          `to bottom` for the one going down — which is what gives a 48px box a direction
          without an arrowhead of its own. `--copper-200` is two rungs over the shaft it runs
          along, so the pulse is visible against its own line and still under the middle
          plate's name. */}
      <div
        {...entrance(figure, "mo-flow-up", BUILD.shaft + SHAFT_DRAW_MS)}
        data-testid="middle-out-flow-up"
        style={{
          position: "absolute",
          left: SHAFT_LEFT,
          top: UP_FLOW_TOP,
          width: SHAFT_THICKNESS,
          height: FLOW_LENGTH,
          backgroundImage:
            "linear-gradient(to top, transparent, var(--copper-200))",
          ...noPointer,
          animationDelay: `${BUILD.shaft + SHAFT_DRAW_MS}ms`,
          ["--mo-travel" as string]: `${FLOW_TRAVEL}px`,
        }}
      />
      <div
        {...entrance(figure, "mo-flow-down", BUILD.shaft + SHAFT_DRAW_MS)}
        data-testid="middle-out-flow-down"
        style={{
          position: "absolute",
          left: SHAFT_LEFT,
          top: DOWN_FLOW_TOP,
          width: SHAFT_THICKNESS,
          height: FLOW_LENGTH,
          backgroundImage:
            "linear-gradient(to bottom, transparent, var(--copper-200))",
          ...noPointer,
          animationDelay: `${BUILD.shaft + SHAFT_DRAW_MS}ms`,
          ["--mo-travel" as string]: `${FLOW_TRAVEL}px`,
        }}
      />

      {/* THE TWO ARROWHEADS — CSS border triangles, so the figure still mounts no `<svg>`.
          `boxSizing: border-box` with a zero content box is what makes a 16×12 element
          report 16×12 while painting a wedge: the three border widths sum to the box, and
          the two transparent sides cut the diagonals.

          THEY LAND AS THEIR SHAFT ARRIVES — `BUILD.shaft + SHAFT_DRAW_MS` — which is the one
          place this file has to know a keyframe's duration (see {@link SHAFT_DRAW_MS}). A
          head that appeared with its shaft's first frame would float 132px from the origin
          with nothing under it. */}
      <div
        {...entrance(figure, "mo-head-in", BUILD.shaft + SHAFT_DRAW_MS)}
        data-testid="middle-out-head-up"
        style={{
          position: "absolute",
          left: HEAD_LEFT,
          top: UP_HEAD_TOP,
          width: HEAD_WIDTH,
          height: HEAD_HEIGHT,
          boxSizing: "border-box",
          borderLeft: `${HEAD_WIDTH / 2}px solid transparent`,
          borderRight: `${HEAD_WIDTH / 2}px solid transparent`,
          borderBottom: `${HEAD_HEIGHT}px solid ${TIER.arrow}`,
          ...noPointer,
          animationDelay: `${BUILD.shaft + SHAFT_DRAW_MS}ms`,
        }}
      />
      <div
        {...entrance(figure, "mo-head-in", BUILD.shaft + SHAFT_DRAW_MS)}
        data-testid="middle-out-head-down"
        style={{
          position: "absolute",
          left: HEAD_LEFT,
          top: DOWN_HEAD_TOP,
          width: HEAD_WIDTH,
          height: HEAD_HEIGHT,
          boxSizing: "border-box",
          borderLeft: `${HEAD_WIDTH / 2}px solid transparent`,
          borderRight: `${HEAD_WIDTH / 2}px solid transparent`,
          borderTop: `${HEAD_HEIGHT}px solid ${TIER.arrow}`,
          ...noPointer,
          animationDelay: `${BUILD.shaft + SHAFT_DRAW_MS}ms`,
        }}
      />

      {/* ───── THE TWO ACTS, IN WORDS ─────
          One mono label and one gloss each, centred on their arrow's own midspan and taken
          from `actLabelTop`/`actGlossTop` — which are asked for the plate each arrow
          REACHES (`TOP_TIER_INDEX` for the upward act, `BOTTOM_TIER_INDEX` for the downward
          one), never for a 0 or a 2 typed here. So the upward act's copy sits high on the
          stage beside the upward arrow, and the downward act's sits low. */}
      {(
        [
          {
            id: "up",
            reaches: TOP_TIER_INDEX,
            label: C.upLabel,
            gloss: C.upGloss,
            kw: C.upGlossKw,
          },
          {
            id: "down",
            reaches: BOTTOM_TIER_INDEX,
            label: C.downLabel,
            gloss: C.downGloss,
            kw: C.downGlossKw,
          },
        ] as const
      ).map((act, order) => {
        const at = BUILD.act + order * BUILD.actStep;
        return (
          <Fragment key={act.id}>
            <div
              {...entrance(figure, "mo-in-up", at)}
              data-testid={`middle-out-act-${act.id}-label`}
              style={{
                position: "absolute",
                left: ACT_TEXT_LEFT,
                top: actLabelTop(act.reaches),
                width: ACT_TEXT_WIDTH,
                height: EYEBROW_HEIGHT,
                ...mono(TIER.act),
                whiteSpace: "nowrap",
                ...noPointer,
                animationDelay: `${at}ms`,
              }}
            >
              {act.label}
            </div>
            <p
              {...entrance(figure, "mo-in-up", at)}
              data-testid={`middle-out-act-${act.id}-gloss`}
              style={{
                position: "absolute",
                left: ACT_TEXT_LEFT,
                top: actGlossTop(act.reaches),
                width: ACT_TEXT_WIDTH,
                height: GLOSS_HEIGHT,
                ...sans(13, TIER.gloss),
                ...centred,
                ...noPointer,
                animationDelay: `${at}ms`,
              }}
            >
              <span style={centredChild}>{highlight(act.gloss, act.kw)}</span>
            </p>
          </Fragment>
        );
      })}

      {/* ───── THE THREE APPROACH CARDS ─────
          Each card is its plate's own box seen again on the right of the stage: same top
          edge, same height, same centre line, so the pairing is geometry rather than a
          caption. THESE ARE THE OTHER THREE HOVER TARGETS, and they set the same state their
          plate does — hover a card and the plate lights with it.

          They enter from the RIGHT and they enter LAST, because a verdict on an approach
          only means something once the room has seen what the middle can do that the other
          two cannot. */}
      {C.tiers.map((tier, i) => {
        const lit = isMiddle(i);
        const t = cardTier(i, tier.id);
        const on = hovered === tier.id;
        const at = BUILD.card + i * BUILD.cardStep;
        return (
          <Fragment key={tier.id}>
            <div
              {...entrance(figure, "mo-in-right mo-hoverable", at)}
              data-testid={`middle-out-card-${tier.id}`}
              data-lit={lit ? "true" : "false"}
              data-hover={on ? "true" : "false"}
              onMouseEnter={() => setHovered(tier.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                position: "absolute",
                left: CARD_LEFT,
                top: plateTop(i),
                width: CARD_WIDTH,
                height: plateHeight(i),
                border: boxBorder(t.edge),
                boxSizing: "border-box",
                backgroundColor: t.fill,
                animationDelay: `${at}ms`,
              }}
            />
            <div
              {...entrance(figure, "mo-in-right mo-hover-type", at)}
              data-testid={`middle-out-card-${tier.id}-label`}
              style={{
                position: "absolute",
                left: CARD_INNER_LEFT,
                top: cardLabelTop(i),
                width: CARD_INNER_WIDTH,
                height: EYEBROW_HEIGHT,
                ...mono(t.label),
                whiteSpace: "nowrap",
                ...noPointer,
                animationDelay: `${at}ms`,
              }}
            >
              {tier.approach}
            </div>
            <p
              {...entrance(figure, "mo-in-right mo-hover-type", at)}
              data-testid={`middle-out-card-${tier.id}-verdict`}
              style={{
                position: "absolute",
                left: CARD_INNER_LEFT,
                top: cardVerdictTop(i),
                width: CARD_INNER_WIDTH,
                height: CARD_VERDICT_HEIGHT,
                ...serif(15, t.verdict),
                ...centred,
                ...noPointer,
                animationDelay: `${at}ms`,
              }}
            >
              {/* NO `highlight()`: the verdicts are CAPTIONS and carry no `*Kw` sibling
                  (`../content.ts`'s keyword rule). Four words with an italic in them is a
                  stage trying to emphasise its way out of a short sentence. */}
              <span style={centredChild}>{tier.approachVerdict}</span>
            </p>
          </Fragment>
        );
      })}

      {/* ───── THE THESIS ─────
          The whole of pose 1, full width, outside every box, and the only sentence on this
          stage that belongs to no tier. THE ONE `Reveal` ON THIS SLIDE: it is the only box
          with a real pose transition to make, so `.fade` is exactly right for it and the
          figure's own keyframes would be wrong (they fire on mount, and this arrives on a
          click).

          `THESIS_TOP` puts its lowest pixel at y = 614 against the NavBar hover band at
          y = 632 — the 18px between them is `NAV_ZONE_CLEARANCE`, the tightest clearance in
          the leader tree, and it is the brief: the last sentence belongs directly above the
          navigation bar. */}
      <Reveal
        on={thesis}
        as="p"
        delay={BUILD.plate}
        data-testid="middle-out-thesis"
        style={{
          position: "absolute",
          left: THESIS_LEFT,
          top: THESIS_TOP,
          width: THESIS_WIDTH,
          height: THESIS_HEIGHT,
          ...serif(18, TIER.thesis),
          ...noPointer,
        }}
      >
        {highlight(C.thesis, C.thesisKw)}
      </Reveal>
    </>
  );
}
