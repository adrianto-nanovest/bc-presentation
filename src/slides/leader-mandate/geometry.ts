// The enablement model, as numbers — stage coordinates for a 1280×720 stage.
//
// THIS FILE EXISTS FOR TWO REASONS, and neither of them is tidiness.
//
//   1. THE TWO COLUMNS HOLD DIFFERENT NUMBERS OF ROWS — four pillars against
//      three tracks — and they have to bottom out on the SAME LINE, because the
//      band under them spans both. A layout that spaced each column by a
//      hand-picked pitch would drift the moment a fifth pillar or a fourth track
//      was written, and the drift is invisible in the column the author happened
//      to be looking at. {@link rowPitch} derives both pitches from ONE body
//      height, so `pillarTop(3) + PILLAR_ROW_HEIGHT` and
//      `trackTop(2) + TRACK_ROW_HEIGHT` are equal by construction, not by luck.
//   2. THE TRACK LANE WIDTHS ARE ORDINAL AND MUST STAY ORDINAL. See
//      {@link laneWidth}: they encode "fewer people than the lane above" and
//      NOTHING ELSE — no share, no headcount, no percentage. Deriving them from
//      the track count in one place is what stops a later edit from typing three
//      widths that happen to look like a split somebody could read a number off.
//
// THE VERTICAL BUDGET IS WORKED FROM THE FLOOR UPWARD, which is the opposite of
// how the sibling leader slides do it and is deliberate: this slide's lowest two
// bands are FIXED objects (a bordered band and a one-line closer) and its top
// band is the flexible one, so the rows get whatever is left rather than the band
// getting whatever is left. Bottom to top:
//
//   · `.nav-zone` is `bottom: 0; height: 88px`, so nothing may sit below y=632.
//     {@link NAV_ZONE_CLEARANCE} is what is left under the closer — asserted,
//     not assumed.
//   · The closer sits at a FIXED shelf. It is the sentence the room leaves with,
//     and a closer that landed higher or lower depending on how many pillars were
//     authored would move the deck's own ask around the stage.
//   · The bottleneck band hangs directly above it, at a height derived from the
//     three lines it holds ({@link BAND_HEIGHT}) rather than from a round number,
//     because the source line inside it is the one string on this slide that is
//     allowed to be long.
//   · Everything above that is the BODY: the two columns.
//
// Pure data and pure functions. No React, no DOM, no work at module scope beyond
// the arithmetic below — importable from a node test.

export const STAGE = { width: 1280, height: 720 } as const;

/** The deck's standard side margin, and `.fig-label`'s own left edge — the
 *  reference every box on this slide is measured from. */
export const SIDE_MARGIN = 48;

/** The width every full-bleed box on this stage gets. */
export const CONTENT_WIDTH = STAGE.width - 2 * SIDE_MARGIN;

/** `.nav-zone` is `bottom: 0; height: 88px`. Its top edge is the floor for slide
 *  content: a box under it is a box the presenter's own hover target covers. */
export const NAV_ZONE_TOP = STAGE.height - 88;

// ───────────────────── the two columns ─────────────────────

/**
 * The gap between the two columns — and, because the columns split what is left
 * evenly, the reason {@link DIVIDER_X} lands on the stage's exact centre.
 *
 * THE COLUMNS ARE EQUAL WIDTH AND THAT IS AN ARGUMENT, not a default. The
 * pillars say what the programme is made of and the tracks say who it reaches;
 * neither is the other's caption, and a 2:1 split would make one of them read as
 * the slide's subject and the other as its footnote.
 */
export const COLUMN_GAP = 64;
export const COLUMN_WIDTH = (CONTENT_WIDTH - COLUMN_GAP) / 2;

export const PILLAR_COL_X = SIDE_MARGIN;
export const TRACK_COL_X = SIDE_MARGIN + COLUMN_WIDTH + COLUMN_GAP;

/** The hairline between the columns. Falls on x=640 — the stage's centre — which
 *  is a CONSEQUENCE of the equal split above and not a number typed here. */
export const DIVIDER_X = SIDE_MARGIN + COLUMN_WIDTH + COLUMN_GAP / 2;

/** Both column headings hang from one shelf — y=134, the same one `leader-gap`
 *  hangs its provenance line on and `leader-invest` its eyebrow (whose own
 *  `EYEBROW_TOP` derives it: `.slide-headline-row` sits at 80 and the headline is
 *  40px on 1.05, so it ends at ≈122). The three sibling leader slides put their
 *  mono line in the same place, and this one puts TWO there. */
export const HEADING_TOP = 134;

/** Where the rows start. 42px under the heading shelf — the same breath
 *  `leader-invest` leaves between its eyebrow and its slot, and what keeps a
 *  heading reading as a heading rather than as its column's first row. */
export const BODY_TOP = 176;

// ───────────────────── the floor, worked upward ─────────────────────

/** One line of 20px serif italic at 1.35.
 *
 *  ONE LINE, and it has a whole stage width to do it in: at 20px serif over
 *  `CONTENT_WIDTH` that is ≈120 characters, against the ≈72 a BODY line gets
 *  ({@link ONE_LINE_BUDGET_CHARS}) in a half-width column. So the closer is not
 *  held to the body's budget and must not be — the two numbers answer the same
 *  question about two different boxes, and sharing one would make the deck's ask
 *  as short as a pillar's caption. */
export const CLOSER_HEIGHT = 28;

/** The closer's shelf — FIXED. See the header: the ask does not move with the
 *  number of pillars somebody authored. */
export const CLOSER_TOP = 572;

/** What is left under the closer before the NavBar's hover band starts. */
export const NAV_ZONE_CLEARANCE = NAV_ZONE_TOP - (CLOSER_TOP + CLOSER_HEIGHT);

/** The bordered band's own inner padding. Wider than it is tall, because the
 *  band is 1184px of stage and its type would otherwise start at the very edge
 *  of a hairline the room can see. */
export const BAND_PADDING_X = 20;
export const BAND_PADDING_Y = 14;

/** The three lines inside the band, top to bottom: the mono eyebrow, the
 *  statement, and the source. The SOURCE gets two lines' worth — it is the one
 *  string on this slide allowed to be long (a citation that is trimmed to fit is
 *  a citation that stops being one), and at 10.5px mono over `CONTENT_WIDTH`
 *  minus the padding it lands on one line in the shipped face and two in a
 *  fallback. Budgeting two costs 16px and removes the failure. */
const EYEBROW_HEIGHT = 15;
const EYEBROW_GAP = 6;
const STATEMENT_HEIGHT = 28;
const STATEMENT_GAP = 9;
const SOURCE_HEIGHT = 32;

/** Derived from the three lines above, so a reworded band cannot silently
 *  overflow its own border. */
export const BAND_HEIGHT =
  2 * BAND_PADDING_Y +
  EYEBROW_HEIGHT +
  EYEBROW_GAP +
  STATEMENT_HEIGHT +
  STATEMENT_GAP +
  SOURCE_HEIGHT;

/** The air between the band and the closer. It has to read as a TURN — the
 *  evidence stops, then the ask arrives — which is why it is larger than any gap
 *  inside the band.
 *
 *  NOT EXPORTED: an input to {@link BAND_TOP} with no outside reader, and an
 *  exported constant nothing reads is a number two places could come to disagree
 *  about for no gain (`leader-invest/geometry.ts` makes the same call). */
const BAND_GAP = 26;

/** The band's top edge — derived downward-up from the closer's fixed shelf. */
export const BAND_TOP = CLOSER_TOP - BAND_GAP - BAND_HEIGHT;

/** The air between the columns and the band. Smaller than {@link BAND_GAP}: the
 *  band is a statement ABOUT the model above it, so it sits closer to the model
 *  than to the ask. */
const BODY_GAP = 22;

/** What the two columns actually get. The residue, and deliberately so — see the
 *  header on which bands are fixed and which one flexes. */
export const BODY_HEIGHT = BAND_TOP - BODY_GAP - BODY_TOP;

// ───────────────────── the rows ─────────────────────

/** The lane bar's own thickness. Thick enough that a 246px lane and a 560px one
 *  are two different objects from the back row, thin enough that three of them
 *  do not read as a bar chart with a missing axis. */
export const LANE_HEIGHT = 10;

/**
 * One line of body copy, at the register `EnablementModel` actually sets:
 * `fontSize: 13.5` against `lineHeight: 1.35`.
 *
 * WRITTEN AS THE PRODUCT AND NOT AS 18, which is what both row heights below
 * said until `scripts/gh60-61-verify.mjs` measured them. 13.5 × 1.35 is 18.225,
 * so a row that budgeted 18 for its last line was 0.225px short of its own ink —
 * and because {@link rowPitch} lands the LAST row's bottom exactly on the body's
 * bottom edge, that 0.225px came off the end of the column rather than out of
 * the slack between rows. Nothing was visibly wrong and nothing collided; the
 * defect was that the doc comments stated an arithmetic the browser did not
 * agree with, which is the one thing a geometry module may not do.
 *
 * So the parts are multiplied here rather than rounded by hand. A change to the
 * body register now moves both rows, and neither comment can go stale against it.
 */
const BODY_LINE = 13.5 * 1.35;

/** A pillar row: a 12px mono label at 1.25 (15), 5px of air, one body line. */
export const PILLAR_ROW_HEIGHT = 12 * 1.25 + 5 + BODY_LINE;

/** A track row: a 12px mono name at 1.3 (15.6), 8px, the lane bar, 10px, one
 *  body line. */
export const TRACK_ROW_HEIGHT = 12 * 1.3 + 8 + LANE_HEIGHT + 10 + BODY_LINE;

/** The pillar mark: four identical vertical bars, one per row.
 *
 *  IDENTICAL IS THE WHOLE POINT, and it is the geometric half of this slide's
 *  argument: four pillars of EQUAL weight beside three lanes of DELIBERATELY
 *  unequal width. A reader who takes nothing else off the stage should still see
 *  that the left column is not ranked and the right one is. */
export const PILLAR_MARK_WIDTH = 6;
export const PILLAR_MARK_HEIGHT = 34;
/** Where a pillar row's text starts, clear of its mark. */
export const PILLAR_TEXT_X = PILLAR_MARK_WIDTH + 14;
export const PILLAR_TEXT_WIDTH = COLUMN_WIDTH - PILLAR_TEXT_X;

/**
 * How far apart two rows of `count` rows sit, so the first starts at
 * {@link BODY_TOP} and the last ENDS on the body's bottom edge.
 *
 * `(BODY_HEIGHT - rowHeight) / (count - 1)` — "one past the end" arithmetic, and
 * it is what makes the two columns bottom out together without either column
 * knowing the other's row count.
 *
 * @throws on fewer than two rows. A single-row column has no pitch, and the
 *         division would hand back `Infinity` — which lays out as a row placed
 *         somewhere no browser will admit to rather than as an error.
 */
export function rowPitch(rowHeight: number, count: number): number {
  if (!Number.isInteger(count) || count < 2) {
    throw new Error(
      `rowPitch: ${count} rows — a column needs at least two for a pitch to mean ` +
        `anything, and this stage lays out ${PILLAR_ROW_HEIGHT}px pillar rows ` +
        `against ${TRACK_ROW_HEIGHT}px track rows in one ${BODY_HEIGHT}px body.`,
    );
  }
  return (BODY_HEIGHT - rowHeight) / (count - 1);
}

/**
 * A row's top edge, INSIDE the body — add {@link BODY_TOP} for the stage
 * coordinate.
 *
 * Relative to the body and not to the stage, because the body is what the two
 * columns share: both are placed against the same origin, so a change to the
 * band's height moves both columns and cannot move one.
 *
 * @throws on a row the column does not have. A silently clamped row is a pillar
 *         drawn on top of another pillar, and it would look deliberate.
 */
export function rowTop(index: number, rowHeight: number, count: number): number {
  if (!Number.isInteger(index) || index < 0 || index >= count) {
    throw new Error(`rowTop: no row ${index} — this column holds ${count} (0…${count - 1}).`);
  }
  return index * rowPitch(rowHeight, count);
}

// ───────────────────── the lanes ─────────────────────

/**
 * The fraction of the column the NARROWEST lane keeps — measured, not chosen.
 *
 * The longest track name is eight characters of 12px mono at 0.16em tracking
 * ≈ 88px, plus the 20px the lane's own left inset gives it and slack for a
 * fallback face. 0.44 of a 560px column is 246px, which holds that with room to
 * spare and — the half that actually binds — is still visibly SHORTER than the
 * lane above it at 84px of difference. A floor of 0.7 would hold the name and
 * lose the ordering; a floor of 0.2 would order the lanes and lose the name.
 */
export const NARROWEST_LANE = 0.44;

/**
 * How far down the lanes `index` of `count` sits — 0 at the first, 1 at the last.
 *
 * THE ONE PROGRESSION, READ BY BOTH ENCODINGS. The lane carries two ordinal
 * facts at once — its WIDTH says fewer people than the lane above, its COLOUR
 * TIER says more depth than the lane above — and both are cut from this fraction.
 * A component that stepped the tier by its own rule while the geometry stepped
 * the width by this one would let the brightest lane stop being the narrowest,
 * which is a figure making two different claims about the same track and looking
 * finished while it does it.
 *
 * @throws on fewer than two lanes — one lane makes no ordinal statement, and a
 *         figure whose only claim is a comparison should not render with nothing
 *         to compare — and on a lane the figure does not have.
 */
export function laneFraction(index: number, count: number): number {
  if (!Number.isInteger(count) || count < 2) {
    throw new Error(
      `laneFraction: ${count} lane(s) — the lanes are ORDINAL, so a single lane ` +
        `states nothing and would render as a bar with no comparison.`,
    );
  }
  if (!Number.isInteger(index) || index < 0 || index >= count) {
    throw new Error(`laneFraction: no lane ${index} — this figure has ${count} (0…${count - 1}).`);
  }
  return index / (count - 1);
}

/**
 * How wide lane `index` of `count` is.
 *
 * ORDINAL, AND ONLY ORDINAL. The widths say "fewer people reach this track than
 * the one above it" and nothing more: there is no axis on the stage, no scale,
 * no printed share, and no headcount anywhere in `./content.ts`. That restraint
 * is not decoration — the deck holds NO adoption data for either organisation
 * (§6.5, confirmed on #8), so a lane drawn at "18% of the org" would be a
 * measurement nobody made, printed as geometry, where it is harder to challenge
 * than a sentence would be.
 *
 * SPREAD ACROSS THE COUNT rather than stepped by a fixed amount. With a fixed
 * step, a fourth track would either run past {@link NARROWEST_LANE} or need the
 * step re-typed; here the first lane is always the full column, the last is
 * always the measured floor, and the ones between divide the difference. So
 * writing a track into `./content.ts` re-cuts the figure and cannot break it.
 */
export function laneWidth(index: number, count: number): number {
  return COLUMN_WIDTH * (1 - laneFraction(index, count) * (1 - NARROWEST_LANE));
}

// ───────────────────── the one-line rule ─────────────────────

/**
 * How many characters a body line may hold before it wraps into the next row's
 * air.
 *
 * BOTH COLUMNS RUN ONE LINE PER ROW, and that is a layout constraint rather than
 * a style preference: {@link PILLAR_ROW_HEIGHT} and {@link TRACK_ROW_HEIGHT} each
 * budget exactly one, so a wrapped line does not overflow a box — it overlaps the
 * row beneath it, which renders as two sentences printed on top of one another
 * and reads on a projector as a font that failed to load.
 *
 * AN ESTIMATE, AND SAID SO. jsdom computes no text, so nothing measures this at
 * render time; the number is `PILLAR_TEXT_WIDTH` (540px, the narrower of the two
 * text widths) over ≈7.2px per character — 13.5px Inter at ≈0.50em, widened for a
 * system fallback — which gives ≈75, taken down to 72 for slack.
 * `tests/unit/mandate-enablement.test.tsx` holds every authored body line against
 * it, so the constraint is enforced on the COPY, where an author can act on it,
 * rather than discovered on the stage.
 */
export const ONE_LINE_BUDGET_CHARS = 72;
