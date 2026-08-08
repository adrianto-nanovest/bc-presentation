// Three organisational bands, and the two directions out of the middle one.
//
// THE FIGURE IS AN ORG CHART THAT RANKS THE WRONG ROW ON PURPOSE. Three full-width
// strips, top to bottom — the board and the C-suite, BU and division heads, the teams
// — identical in size, in position and in shape, so that the ONE thing that separates
// them is what each one says about itself. Then, at the last claim pose, the MIDDLE
// strip gets brighter than the one above it. That inversion is the whole argument, and
// it is made in colour rather than in a sentence: authority is at the top, the work is
// at the bottom, and the only band that holds both — plus the one thing neither holds,
// people who copy what it does — is the one in the middle. `../content.ts` writes the
// words; this file is the only place the ranking is drawn.
//
// WHAT THE FIGURE REFUSES TO SAY, and each refusal is enforced by something concrete:
//
//   · NO LADDER, NO SCALE, NO MATURITY MODEL. `../middle-out-geometry.ts` gives all
//     three bands one height, one left edge, one width and one placement function, so
//     no band can be indented, inset, widened or grown to rank it — and nothing here
//     adds a halo, a shadow or a scale that would grow a band's painted box beyond the
//     rectangle that module cut for it. The rank is border, ground and label tier, all
//     three of which stay inside the box.
//   · NO INDEX, NO ORDINAL, NO NUMERAL ON A BAND. The mono row label is a band's whole
//     identity (guardrail 1 in `../content.ts`), and nothing is rendered beside it.
//   · NO ARROWHEAD AND NO SINGLE AXIS. The two direction rules arrive TOGETHER on one
//     pose, are the same length, and sit 28px apart in x — two marks, never one dashed
//     axis with a stop in the middle of it. Which direction each one carries is said by
//     which band it reaches and by where its copy sits, and by nothing else.
//   · NO LETTER AND NO FIGURE NUMBER. `FigLabel` takes a LABEL only; the composer
//     supplies the rest (§3.5). Nothing under this directory names one.
//
// RANK IS A COLOUR TIER AND OPACITY IS TIME — see {@link TIER}, which is the one place
// either decision is made. Opacity on this stage means "has not arrived yet"; the
// middle band has been on the stage since pose 0, so its prominence cannot be spent in
// that channel. The other half of the same rule is that the two OUTER bands lose
// nothing when the middle lights: their border, their ground, their label tier, their
// claim rows and their opacity are byte-identical at pose 4 and at pose 0. Attention is
// bought with added light, never subtracted (§7.1), and a reader who could read rank
// out of the opacity channel would be reading a reveal as a ranking.
//
// ZERO SMIL NODES, at every pose, under any motion preference — and closed BY
// CONSTRUCTION the way `leader-gap/components/NoSopBeats.tsx` closes it: THIS FIGURE
// MOUNTS NO `<svg>` AT ALL, so there is no `<animate>`, `<animateTransform>`,
// `<animateMotion>`, `<set>` or `<animateColor>` to gate at mount and nothing for a
// reduced-motion census to inspect. The three band boxes, the two direction rules and
// the origin bar are plain absolutely-positioned `<div>`s for exactly that reason —
// `../middle-out-geometry.ts` is shaped to make that possible and says so at its head.
// The whole motion budget is `.fade`'s transition pair plus the two tier transitions
// below, and the global `prefers-reduced-motion: reduce` rule in
// `src/styles/globals.css` squashes both to 0.01ms, so every pose rests on its finished
// frame under either preference and there is no `matchMedia` gate to write.
// NO NEW KEYFRAME, NO NEW CLASS, NO NEW FONT.
//
// CSS VARS ONLY, NO HEX AND NO rgba() LITERAL, anywhere — including the two graphic
// tiers (the rules and the origin bar) and the band grounds.
//
// EVERY COORDINATE IS READ AND EVERY GATE IS ASKED. Not one number below is computed
// here: the placements come from `../middle-out-geometry.ts` and the poses from
// `../middle-out-walk.ts`, which is what stops this component forming its own opinion
// about where a band sits or what a pose means. The literals that DO appear are type
// registers — font sizes, tracking, line heights, a 1px border — and each one is a
// number that geometry module already assumed when it cut its boxes (see its vertical
// budget: 11px mono on 1.3, 15px sans, 17px serif, 22px serif).
//
// IT READS NO VARIANT AND NO BRAND, like `leader-gap/components/NoSopBeats.tsx` and
// unlike `./PillarOrbit.tsx` next door: issue #68 gives this slide no brand axis at all,
// so there is no `…For(brand)` prop to look for and both leader rooms read identical
// bytes off one stage.
// `Fragment` is imported for its KEY and for nothing else: each band contributes three
// absolutely-positioned boxes to one list, and a wrapping `<div>` would put a static
// block box into `.stage`'s own flow for no reason. A keyed fragment groups them without
// adding an element.
import { Fragment, type CSSProperties } from "react";
// Section E's copy, the tree's de facto shared reveal primitive — the same import
// `NoSopBeats.tsx` and `EnablementModel.tsx` make. `CopperRule` is deliberately NOT
// taken: it animates `scaleX` from the left, which reads as a line being DRAWN, and a
// translation rule that drew itself in one direction would say "first this, then that"
// about two marks that are simultaneous by construction.
import { Reveal } from "@/slides/foundation-core-section-e/components/Reveal";
import { highlight } from "@/components/highlight";
import {
  BAND_HEIGHT,
  BAND_LEFT,
  BAND_WIDTH,
  BOTTOM_BAND_INDEX,
  CLAIM_LEFT,
  CLAIM_TEXT_LEFT,
  CLAIM_TEXT_WIDTH,
  CLAIM_WIDTH,
  CLOSER_HEIGHT,
  CLOSER_LEFT,
  CLOSER_TOP,
  CLOSER_WIDTH,
  CONTENT_WIDTH,
  DOWNWARD_RULE_LEFT,
  DOWNWARD_RULE_TOP,
  EYEBROW_HEIGHT,
  EYEBROW_WIDTH,
  KICKER_TOP,
  MIDDLE_BAND_INDEX,
  ORIGIN_BAR_HEIGHT,
  ORIGIN_BAR_LEFT,
  ORIGIN_BAR_TOP,
  ORIGIN_BAR_WIDTH,
  ROW_HEIGHT,
  RULE_HEIGHT,
  RULE_THICKNESS,
  SIDE_MARGIN,
  TOP_BAND_INDEX,
  TRANSLATION_EYEBROW_TOP,
  TRANSLATION_HEIGHT,
  TRANSLATION_LEFT,
  TRANSLATION_WIDTH,
  UPWARD_RULE_LEFT,
  UPWARD_RULE_TOP,
  bandLabelTop,
  bandTop,
  claimRowTop,
  translationTop,
} from "../middle-out-geometry";
import { shapeMiddleOutContent as C } from "../content";
import {
  isMiddleLit,
  showsBandClaims,
  showsCloser,
  showsTranslations,
} from "../middle-out-walk";

// ───────────────────── the tiers, in one table ─────────────────────

/**
 * One tier per ROLE, and the ONLY rank on this stage is `band.rest` → `band.lit`.
 *
 * Hand-derived WCAG relative luminances over `src/styles/globals.css`'s hexes,
 * brightest first, under the headline's `--neutral-50` (0.9131):
 *
 *   role            token            luminance   what it paints
 *   verdict         --neutral-100     0.7835     22px serif — the closer
 *   claim           --neutral-200     0.6584     17px serif — the two translations
 *   band.lit.name   --copper-100      0.7897     11px mono caps — the MIDDLE band's name
 *   band.lit.edge   --copper-300      0.4200     the MIDDLE band's 1px border
 *   row             --neutral-300     0.3663     15px sans — all six claim rows
 *   band.rest.name  --copper-300      0.4200     11px mono caps — a band's own name
 *   label           --copper-400      0.2967     11px mono caps — every other label
 *   rule            --copper-600      0.1480     the two direction rules, 2px
 *   band.rest.edge  --copper-700      0.0865     a band's 1px border — the deck's own
 *                                                hairline token (`.copper-rule`)
 *   band.lit.fill   --copper-950      0.0100     the MIDDLE band's ground
 *   band.rest.fill  --neutral-900     0.0056     the stage's own — an unfilled box
 *
 * ═══ `band.rest` AND `band.lit` ARE ONE PAIR AND MUST STAY THE SAME SHAPE. Every key
 * present in one is present in the other, for the reason `./PillarOrbit.tsx`'s `REST`
 * writes `boxHalo: "none"` out longhand: a property only the lit tier declares is a
 * property with no RELEASE, so React drops the declaration on the un-light render
 * instead of transitioning back to it — and stepping the deck backwards from 4 to 0 is
 * an acceptance criterion here, not a hypothetical.
 *
 * ═══ EVERY LIT VALUE IS BRIGHTER THAN ITS RESTING COUNTERPART, AND THAT IS THE
 * INVARIANT TO CHECK THIS TABLE AGAINST BEFORE ANYTHING ELSE: `--copper-300` over
 * `--copper-700` on the border (six rungs), `--copper-950` over the stage's own
 * `--neutral-900` on the ground, `--copper-100` over `--copper-300` on the name. Not one
 * of the three is a subtraction, so the two unlit bands need no adjustment for the
 * middle one to stand out — and they get none. That is what makes the ranking legible
 * in a still: at `canonicalPose` the middle band is the brightest object on the stage
 * and the two beside it are exactly what they were at pose 0.
 *
 * ═══ RANKING THE MIDDLE ABOVE THE TOP IS THE ARGUMENT, NOT A DECORATION. An org chart
 * whose brightest row is the top row is a picture the room already has. The one thing
 * this slide has to leave behind is that the row with the least authority in it is the
 * one adoption actually moves through, and a figure that hedged that — a middle band
 * ranked equal to the top, or ranked by size instead of by light — would be arguing the
 * opposite of its own headline.
 *
 * ═══ THE BAND'S GROUND IS THE STAGE'S OWN UNTIL IT LIGHTS. Three filled strips at rest
 * would make the chart a table; three outlined ones read as one organisation seen in
 * section, which is what the full-bleed width in `../middle-out-geometry.ts` is for. It
 * also leaves the fill channel unspent, so the middle band can GAIN a ground rather than
 * change one.
 *
 * ═══ NO HALO, deliberately, though `./PillarOrbit.tsx` next door uses one. A halo is
 * painted OUTSIDE the box's own edge, so it would put the middle band's painted
 * rectangle outside the box `bandTop`/`BAND_HEIGHT` cut for it — and equal geometry is
 * the whole no-new-ladder guarantee (see that module's header). The rank stays inside
 * the rectangle.
 *
 * ═══ `--copper-400` FOR THE MONO LABELS is the shipped precedent all three sibling
 * leader figures cite — exactly this token in exactly this register, 11px mono caps.
 * The band NAMES sit one tier above it at `--copper-300`, because a band's name is what
 * stands in place of an index (guardrail 1 in `../content.ts`) and reads as the chart's
 * own row heading rather than as one more eyebrow under it.
 *
 * ═══ THE TWO GRAPHIC TIERS ARE NOT HELD TO THE TEXT FLOOR, for the reason
 * `NoSopBeats.tsx`'s marks are not: a rule is compared, not read. `--copper-600` at 2px
 * is what survives a projector at the back of a room, and the ORIGIN BAR is painted in
 * `band.lit.edge` — the MIDDLE band's own tier, which `../middle-out-geometry.ts`
 * requires in as many words. One origin, two directions, and the origin is the room.
 */
const TIER = {
  /**
   * THE THREE BANDS, AS A RANK PAIR — and the only place on this stage where two
   * objects of the same kind are painted differently.
   */
  band: {
    /** All three bands until the middle one's claim lands, and the two outer bands
     *  for ever after. Nothing in here changes at any pose. */
    rest: {
      edge: "var(--copper-700)",
      fill: "var(--neutral-900)",
      name: "var(--copper-300)",
    },
    /** The MIDDLE band, from the pose its own claims arrive — `isMiddleLit` in
     *  `../middle-out-walk.ts` owns WHEN, and this table owns WHAT. */
    lit: {
      edge: "var(--copper-300)",
      fill: "var(--copper-950)",
      name: "var(--copper-100)",
    },
  },
  /** Every mono caps string that is not a band's own name: the standing kicker, the six
   *  claim eyebrows and the label the two translations share. ONE TIER FOR ALL EIGHT —
   *  ranking an eyebrow would make a claim about a band that the band's own chrome
   *  already makes. */
  label: "var(--copper-400)",
  /** All six claim rows, in all three bands. ONE TIER FOR ALL SIX: a `holds` row and a
   *  `qualifier` row are the same register making two different claims, the eyebrow
   *  beside each already says which kind it is, and the band the row sits in carries
   *  every rank this figure draws. */
  row: "var(--neutral-300)",
  /** The two translations — descriptions, one tier under the verdict. */
  claim: "var(--neutral-200)",
  /** The closer. The brightest text under the headline row. */
  verdict: "var(--neutral-100)",
  /** The two direction rules. Not the origin bar — see the header. */
  rule: "var(--copper-600)",
} as const;

/** A band box's border weight. `1px` is the deck's own, and `boxSizing: border-box`
 *  below keeps it INSIDE the rectangle `../middle-out-geometry.ts` cut, so a border is
 *  not a coordinate this file invented. Written as a whole declaration the way
 *  `./PillarOrbit.tsx` writes its own, so only the colour differs between the tiers. */
const bandBorder = (edge: string) => `1px solid ${edge}`;

// ───────────────────── type registers ─────────────────────

/** The mono LABEL register — 11px caps at 0.22em, the size and tracking
 *  `../middle-out-geometry.ts` cut `EYEBROW_HEIGHT` and every mono budget against.
 *  Uppercase, because every mono string on this stage is a heading. */
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

/** The sans register — all six claim rows, cut for ONE line each (`ROW_HEIGHT`). */
const rowStyle: CSSProperties = {
  fontFamily: "var(--sans)",
  fontSize: 15,
  lineHeight: 1.3,
  color: TIER.row,
};

/** The prose register — the two translations at 17 and the closer at 22. Upright
 *  serif; the only italics on this stage are the keywords `highlight()` places, and the
 *  mono LABEL register gets none of those (`../content.ts`'s keyword rule). */
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
 * 120ms of lead-in, 90ms between boxes — the leader tree's two numbers, taken from
 * `leader-mandate/type-registers.ts` and used unchanged by every leader figure that has
 * a stagger at all. 120 keeps the first box off the same frame as the click.
 */
const LEAD_MS = 120;
const STAGGER_MS = 90;

/** How many steps into a pose a box arrives, as milliseconds of delay. */
const delay = (step: number) => LEAD_MS + step * STAGGER_MS;

/**
 * A band's two claim rows, as a ROW INDEX and as an ARRIVAL STEP — which are the same
 * number, because the reading order and the arrival order of the two rows are one fact.
 *
 * NAMED HERE RATHER THAN WRITTEN TWICE AS A LITERAL. `../content.ts` models the two
 * rows as two named FIELDS on `Band` (`holds` / `qualifier`) rather than as an array —
 * it argues that at length — so there is nothing to map over and the index has to be
 * stated. `claimRowTop(i, row)` in `../middle-out-geometry.ts` throws on a third row,
 * and its `CLAIM_ROWS` is the count both ends are held to.
 *
 * WHAT IT MEANS AS A STEP: what a band HAS lands first, then the one further thing that
 * is true of it. On the two outer bands that is a limit, on the middle band it is the
 * claim neither of them can make — and in all three the second row is the one the pose
 * has to rest on, so it arrives last.
 */
const CLAIM_ROW = { holds: 0, qualifier: 1 } as const;

/**
 * THE LAST POSE'S ARRIVAL ORDER — the rail and its label, then both translations, then
 * the closer.
 *
 * THE TWO TRANSLATIONS SHARE ONE STEP, and that is not tidiness. The slide's claim is
 * that the middle translates in BOTH directions at once; staggering the two lines
 * against each other by even 90ms would say "first this, then that" about the one pair
 * of marks the no-new-ladder guardrail exists to protect. `showsTranslations` in
 * `../middle-out-walk.ts` holds the same line at pose granularity — one gate for all
 * five objects — and this table holds it at millisecond granularity.
 *
 * THE CLOSER IS LAST WITHIN THE POSE, which is the separation `../middle-out-walk.ts`
 * buys instead of spending a sixth step on it: the two translations ARE the closer's
 * subject, so it needs to land after them and does not need a pose of its own.
 */
const CLOSING_STEP = { rail: 0, eyebrow: 0, translation: 1, closer: 2 } as const;

/**
 * The one duration a TIER change transitions over — `.fade`'s own, so the middle band's
 * light and the two rows that explain it read as one arrival at one pace.
 *
 * NO DELAY IS EVER ATTACHED TO IT, at any pose, and that is the same call
 * `./PillarOrbit.tsx` records: a delay on a tier property lands on the RELEASE too, so
 * stepping backwards out of pose 3 would un-light the middle band late.
 */
const TIER_TRANSITION = "0.45s var(--ease)";

// ───────────────────── the figure ─────────────────────

export interface MiddleOutBandsProps {
  /** 0…4. See `../shape-middle-out.tsx` for what each pose argues, and
   *  `../middle-out-walk.ts` for the two that are named and the three that are counted. */
  pose: number;
}

export function MiddleOutBands({ pose }: MiddleOutBandsProps) {
  // THE POSE, ASKED WHERE IT IS ANSWERED. Every question goes to
  // `../middle-out-walk.ts` and none is re-derived from a comparison here, so no branch
  // in this tree can form its own opinion about what pose 3 means. The two below are the
  // ones more than one element needs; `showsBandClaims` and `showsCloser` are asked at
  // the elements that need them.
  const middleLit = isMiddleLit(pose);
  const showClose = showsTranslations(pose);

  return (
    <>
      {/* ───── THE STANDING KICKER ─────
          On the stage at every pose, and never gated: it is what stops the chart being
          about somebody else, and the room has to read all three bands already knowing
          which one it is in. A kicker that arrived with the middle band's claim would
          let the room spend two beats deciding whether this is a diagram about them or
          about a layer of management they are being asked to manage. No `Reveal`
          wrapper for the same reason `./PillarOrbit.tsx`'s kicker has none — there is no
          pose it is absent at. */}
      <div
        data-testid="middle-out-kicker"
        style={{
          position: "absolute",
          left: SIDE_MARGIN,
          top: KICKER_TOP,
          width: CONTENT_WIDTH,
          height: EYEBROW_HEIGHT,
          ...mono(TIER.label),
          whiteSpace: "nowrap",
        }}
      >
        {C.kicker}
      </div>

      {/* ───── THE THREE BAND BOXES ─────
          Plain positioned `div`s and NOT `Reveal`s: all three stand from pose 0, so
          there is no arrival to animate, and the one thing that DOES change on them —
          the middle band's tier — needs an inline `transition` of its own, which would
          override `.fade`'s. The box is the chart; the boxes' equality is the figure's
          promise that this is an organisation and not a scale.

          `data-lit` PUTS THE RANK IN THE DOM. The unit test and the browser harness read
          which band is bright from this attribute rather than from a parsed style
          string — "which row is the argument about" is a fact about the figure, and
          reading it back out of a border colour would make every check a check of the
          tier table's spelling instead. Exactly one band answers "true", and only from
          {@link isMiddleLit}'s pose onward. */}
      {C.bands.map((band, i) => {
        const lit = middleLit && i === MIDDLE_BAND_INDEX;
        const tier = lit ? TIER.band.lit : TIER.band.rest;
        return (
          <div
            key={band.id}
            data-testid={`middle-out-band-${band.id}`}
            data-lit={lit ? "true" : "false"}
            style={{
              position: "absolute",
              left: BAND_LEFT,
              top: bandTop(i),
              width: BAND_WIDTH,
              height: BAND_HEIGHT,
              border: bandBorder(tier.edge),
              // `border-box`, so the 1px border paints INSIDE the rectangle the
              // geometry module cut. A content-box border would make every band 114
              // tall against a chart budgeted at 112 and push the whole stage 6px down.
              boxSizing: "border-box",
              backgroundColor: tier.fill,
              // `background-color` AND NOT the `background` shorthand: only the colour
              // moves between the two tiers, and a transition list should name the
              // property that actually changes.
              transition:
                `border-color ${TIER_TRANSITION}, background-color ${TIER_TRANSITION}`,
            }}
          />
        );
      })}

      {/* ───── EVERY BAND'S NAME, AND ITS TWO CLAIM ROWS ─────
          MOUNTED AT EVERY POSE AND GATED BY FLAGS, never swapped: the six rows are six
          blocks, each with its own `showsBandClaims`, so nothing that has arrived can be
          removed by a later pose and stepping backwards asks the same question of a
          smaller number. A single panel whose text swapped per band would have to render
          SOMETHING at poses 0 and 4, and every available answer is wrong in front of a
          room (`./PillarOrbit.tsx` records the three of them).

          THE NAME IS NOT GATED. All three row labels stand from pose 0 — pose 0 IS the
          organisation, named and nothing else — and the middle one's TIER is the only
          thing about it that ever changes. */}
      {C.bands.map((band, i) => {
        const lit = middleLit && i === MIDDLE_BAND_INDEX;
        const tier = lit ? TIER.band.lit : TIER.band.rest;
        const shown = showsBandClaims(i, pose);
        // The two rows, in reading order, which is also arrival order — see
        // {@link CLAIM_ROW}. `slot` is a DOM handle only; no string here reaches the
        // stage.
        const rows = [
          {
            slot: "holds",
            row: CLAIM_ROW.holds,
            eyebrow: band.holdsEyebrow,
            text: band.holds,
            kw: band.holdsKw,
          },
          {
            slot: "qualifier",
            row: CLAIM_ROW.qualifier,
            eyebrow: band.qualifierEyebrow,
            text: band.qualifier,
            kw: band.qualifierKw,
          },
        ];
        return (
          <Fragment key={band.id}>
            <div
              data-testid={`middle-out-band-${band.id}-name`}
              style={{
                position: "absolute",
                left: CLAIM_LEFT,
                top: bandLabelTop(i),
                width: CLAIM_WIDTH,
                height: EYEBROW_HEIGHT,
                ...mono(tier.name),
                whiteSpace: "nowrap",
                transition: `color ${TIER_TRANSITION}`,
              }}
            >
              {/* NO `highlight()` HERE, AND NONE ON ANY MONO STRING BELOW EITHER. The
                  band labels are the chart's row names and carry no `*Kw` sibling by
                  construction (`../content.ts`'s keyword rule); a copper italic inside
                  an 11px uppercase mono label would emphasise a fragment of somebody's
                  job title and read as a rendering fault. */}
              {band.label}
            </div>

            {rows.map((row) => (
              // THE EYEBROW AND ITS CLAIM ARRIVE ON THE SAME STEP, always. The eyebrow
              // is not a beat of its own — it is how the row is labelled — and a HOLDS
              // standing alone over an empty measure for 90ms is a row that looks like
              // it failed to load.
              <Reveal
                key={row.slot}
                on={shown}
                delay={delay(row.row)}
                data-testid={`middle-out-${band.id}-${row.slot}-eyebrow`}
                style={{
                  position: "absolute",
                  left: CLAIM_LEFT,
                  top: claimRowTop(i, row.row),
                  width: EYEBROW_WIDTH,
                  height: EYEBROW_HEIGHT,
                  ...mono(TIER.label),
                  whiteSpace: "nowrap",
                }}
              >
                {row.eyebrow}
              </Reveal>
            ))}

            {rows.map((row) => (
              <Reveal
                key={row.slot}
                on={shown}
                as="p"
                delay={delay(row.row)}
                data-testid={`middle-out-${band.id}-${row.slot}`}
                style={{
                  position: "absolute",
                  left: CLAIM_TEXT_LEFT,
                  top: claimRowTop(i, row.row),
                  width: CLAIM_TEXT_WIDTH,
                  height: ROW_HEIGHT,
                  ...rowStyle,
                  margin: 0,
                }}
              >
                {highlight(row.text, row.kw)}
              </Reveal>
            ))}
          </Fragment>
        );
      })}

      {/* ───── THE RAIL · TWO DIRECTIONS, ONE ORIGIN ─────
          Three plain boxes, declared after the bands so they paint over the grounds they
          cross — positioned elements at `z-index: auto` paint in DOM order, which is the
          whole z-index policy this figure needs.

          THE TWO RULES ARE ONE ARRIVAL AT ONE DELAY. Same gate, same step, same length
          (`RULE_HEIGHT`, which IS `BAND_PITCH`), 28px apart in x. Two rules of different
          lengths would rank one translation over the other; two rules on one x would be
          a single dashed axis with a stop in the middle of it, which is a scale. Neither
          carries an arrowhead: the direction each one means is said by which band it
          reaches and by where its copy sits. */}
      <Reveal
        on={showClose}
        delay={delay(CLOSING_STEP.rail)}
        data-testid="middle-out-rule-downward"
        style={{
          position: "absolute",
          left: DOWNWARD_RULE_LEFT,
          top: DOWNWARD_RULE_TOP,
          width: RULE_THICKNESS,
          height: RULE_HEIGHT,
          backgroundColor: TIER.rule,
        }}
      />
      <Reveal
        on={showClose}
        delay={delay(CLOSING_STEP.rail)}
        data-testid="middle-out-rule-upward"
        style={{
          position: "absolute",
          left: UPWARD_RULE_LEFT,
          top: UPWARD_RULE_TOP,
          width: RULE_THICKNESS,
          height: RULE_HEIGHT,
          backgroundColor: TIER.rule,
        }}
      />
      {/* THE ORIGIN BAR — the only horizontal mark on the stage, 30×2, on the MIDDLE
          band's own centre line, joining the two rules rather than sitting under one of
          them. It is painted in `TIER.band.lit.edge` and not in `TIER.rule`, which
          `../middle-out-geometry.ts` requires in as many words: it is the MIDDLE band's
          tier, so the figure says "both directions leave from here, and here is the
          room" a second time in colour. It can only ever be drawn at a pose where that
          band is already lit — `TRANSLATION_POSE` is past `LAST_CLAIM_POSE` — so the two
          can never disagree. A second and third bar at the outer bands' centre lines
          were drawn and cut: three evenly spaced marks on a vertical rail are a scale. */}
      <Reveal
        on={showClose}
        delay={delay(CLOSING_STEP.rail)}
        data-testid="middle-out-origin-bar"
        style={{
          position: "absolute",
          left: ORIGIN_BAR_LEFT,
          top: ORIGIN_BAR_TOP,
          width: ORIGIN_BAR_WIDTH,
          height: ORIGIN_BAR_HEIGHT,
          backgroundColor: TIER.band.lit.edge,
        }}
      />

      {/* ───── THE TRANSLATION COLUMN ─────
          ONE LABEL FOR BOTH LINES, level with the MIDDLE band and between them rather
          than above either — it sits at the ORIGIN of both. Two eyebrows would have had
          to name the two directions, and UPWARD / DOWNWARD printed as headings is the
          closest this stage could come to drawing a scale by accident. */}
      <Reveal
        on={showClose}
        delay={delay(CLOSING_STEP.eyebrow)}
        data-testid="middle-out-translation-eyebrow"
        style={{
          position: "absolute",
          left: TRANSLATION_LEFT,
          top: TRANSLATION_EYEBROW_TOP,
          width: TRANSLATION_WIDTH,
          height: EYEBROW_HEIGHT,
          ...mono(TIER.label),
          whiteSpace: "nowrap",
        }}
      >
        {C.translationEyebrow}
      </Reveal>

      {/* THE COPY LANDS IN THE BAND IT REACHES, which is the layout's one real idea: the
          translation that travels UP prints inside the TOP band, on that band's own
          centre line — the line the upward rule terminates on — and the one that travels
          DOWN prints inside the BOTTOM band. So the upward line sits high on the stage
          and the downward line sits low, and that is the only place either direction is
          drawn. Both indices are read from `../middle-out-geometry.ts`; neither is a 0
          or a 2 typed here. */}
      <Reveal
        on={showClose}
        as="p"
        delay={delay(CLOSING_STEP.translation)}
        data-testid="middle-out-upward"
        style={{
          position: "absolute",
          left: TRANSLATION_LEFT,
          top: translationTop(TOP_BAND_INDEX),
          width: TRANSLATION_WIDTH,
          height: TRANSLATION_HEIGHT,
          ...prose(17, TIER.claim),
        }}
      >
        {highlight(C.upward, C.upwardKw)}
      </Reveal>
      <Reveal
        on={showClose}
        as="p"
        delay={delay(CLOSING_STEP.translation)}
        data-testid="middle-out-downward"
        style={{
          position: "absolute",
          left: TRANSLATION_LEFT,
          top: translationTop(BOTTOM_BAND_INDEX),
          width: TRANSLATION_WIDTH,
          height: TRANSLATION_HEIGHT,
          ...prose(17, TIER.claim),
        }}
      >
        {highlight(C.downward, C.downwardKw)}
      </Reveal>

      {/* ───── THE CLOSER ─────
          Full width, outside all three bands, and the last thing to arrive on the last
          pose. It is the only sentence here that belongs to no band and the only
          first-person word on the stage — the presenter saying that the deck is not the
          delivery mechanism. `CLOSER_TOP` puts its lowest pixel at y = 600 against the
          NavBar hover band at y = 632; the 32px between them is `NAV_ZONE_CLEARANCE` and
          nothing below this element spends any of it. */}
      <Reveal
        on={showsCloser(pose)}
        as="p"
        delay={delay(CLOSING_STEP.closer)}
        data-testid="middle-out-closer"
        style={{
          position: "absolute",
          left: CLOSER_LEFT,
          top: CLOSER_TOP,
          width: CLOSER_WIDTH,
          height: CLOSER_HEIGHT,
          ...prose(22, TIER.verdict),
        }}
      >
        {highlight(C.closer, C.closerKw)}
      </Reveal>
    </>
  );
}
