// The four levers and the form beside them, as numbers — stage coordinates for a
// 1280×720 stage.
//
// WHY THIS IS A THIRD GEOMETRY MODULE AND NOT MORE OF EITHER SIBLING.
// `./geometry.ts` is entirely about ONE figure: two columns of different row
// counts that have to bottom out on the same line, plus the lane arithmetic that
// keeps three track bars ordinal. `./phases-gates-geometry.ts` is entirely about
// another: a staircase whose baseline is derived downward from four equal columns.
// Not one export of either means anything here — this stage is a SINGLE column of
// rows with a four-column FORM ruled off to its right — and not one export below
// means anything there. The section's rule is the one those two files already
// state: a figure's arithmetic lives with the figure, and what the figures print
// AS ONE OBJECT lives in `./geometry.ts` and `./type-registers.ts`.
//
// THE LIFT `./phases-gates-geometry.ts` ASKS FOR IS DEFERRED, DELIBERATELY, AND
// HERE IS THE DEBT WRITTEN DOWN. That module's header says: "If a third slide
// lands in this section (`mandate-levers`, K.3, Phase 7) those eight should be
// lifted into a section-level module and both figures should import from it."
// The third slide is this one and the eight are unmoved. Two reasons, and the
// second is the real one:
//
//   · THE LIFT IS AN EDIT TO TWO SHIPPED SLIDES. It rewrites `./geometry.ts`'s
//     export surface and `./phases-gates-geometry.ts`'s import block, and both
//     are covered by tests that read those modules by name. A new-slide ticket
//     that also refactors the two slides in front of it is a ticket whose failure
//     mode is "which half broke K.2?".
//   · NOTHING IS LOST BY WAITING, BECAUSE THE DIRECTION OF THE IMPORT IS ALREADY
//     RIGHT. This module reads the shared constants FROM `./geometry.ts`, exactly
//     as `./phases-gates-geometry.ts` does. All three slides therefore share ONE
//     declaration of the closer shelf and the band's gutters today; the lift would
//     move that declaration to a better address, not create it. What it would buy
//     is a reader no longer having to know that K.1's module is also the section's,
//     which is a naming problem and not a correctness one.
//
// THE EXACT DEBT, so whoever pays it does not have to re-derive the list:
// `STAGE`, `SIDE_MARGIN`, `CONTENT_WIDTH`, `NAV_ZONE_TOP`, `CLOSER_TOP`,
// `CLOSER_HEIGHT`, `BAND_PADDING_X`, `BAND_PADDING_Y` — eight constants, now read
// by three modules, declared in the one that belongs to K.1.
//
// THE VERTICAL BUDGET IS WORKED FROM THE FLOOR UPWARD, as both siblings' are, and
// for the same reason: the bottom two objects are FIXED (a closer on the shelf all
// three slides stand on, and a band whose height is dictated by the three lines
// inside it), so the rows get what is left rather than the ask floating on the
// count of levers somebody authored.
//
//   ─── the two headings, one shelf ────────────────────────────────────────────
//   134  `THE LEVERS · …` and `WHAT EACH ONE NEEDS …` · 11px mono caps    → 149
//
//   ─── the form's head, over the four authority columns from x=740 ────────────
//   162  four authority heads · 10px mono caps, centred in their columns   → 175
//   181  the head rule · 1px, spans the form only                          → 182
//
//   ─── the board · four lever rows, pitch 59.925 ──────────────────────────────
//   194  lever row · mono label (15) + 5 + one prose line (18.225)         → 232
//   205      its four cells, centred on the row · 48 × 16                  → 221
//   254  lever row                                                         → 292
//   314  lever row                                                         → 352
//   374  lever row                                                         → 412
//
//   ─── the band, then the ask ─────────────────────────────────────────────────
//   432  band · eyebrow + statement + provenance, bordered                 → 548
//   572  closer · 20px serif italic, full width, ONE line                  → 600
//   ─────────────────────────────────────────────────────────────────────────────
//   floor y=632 · lowest painted box 600 · {@link NAV_ZONE_CLEARANCE} = 32
//
// THE FLOOR IS THE HOVER BAND AND NOT `.slide-content`'s BOTTOM, the rule every
// geometry module in the leader tree keeps: `.nav-zone` is `bottom: 0;
// height: 88px`, so nothing on this stage may cross y=632.
//
// Pure data and pure functions. No React, no DOM, no work at module scope beyond
// the arithmetic below.
//
// IT IS NOT BARE-NODE IMPORTABLE, AND THAT IS THE PRICE OF THE IMPORT BELOW —
// stated because most geometry modules in this tree claim the property and a
// reader will expect this one to. Bare Node ESM wants a file extension on
// `./geometry` and `allowImportingTsExtensions` is off in `tsconfig.json`, so the
// specifier cannot carry one. `./phases-gates-geometry.ts` pays the identical
// price for the identical import and prices it at the same length. The
// alternative was re-typing the eight constants above, which is the drift the
// import exists to prevent, and the closer shelf is the one that would have hurt:
// three slides run in a row in the only decks that compose them, and a room
// watching the deck's own ask jump between two consecutive clicks would have no
// way to name what was wrong.
import {
  BAND_PADDING_X,
  BAND_PADDING_Y,
  CLOSER_HEIGHT,
  CLOSER_TOP,
  CONTENT_WIDTH,
  NAV_ZONE_TOP,
  SIDE_MARGIN,
  STAGE,
} from "./geometry";

// Re-exported so this figure has ONE geometry import site, the call
// `./phases-gates-geometry.ts` makes and for the same reason: the component and
// the test read eight shared constants and two dozen local ones, and a file that
// reached into both modules would make "which slide owns this number?" a question
// a reader answers per import rather than per module.
export {
  BAND_PADDING_X,
  BAND_PADDING_Y,
  CLOSER_HEIGHT,
  CLOSER_TOP,
  CONTENT_WIDTH,
  NAV_ZONE_TOP,
  SIDE_MARGIN,
  STAGE,
};

/** What is left under the closer before the NavBar's hover band starts.
 *  Re-derived here rather than imported: it is the same arithmetic over the same
 *  two shared constants, and a slide that asserts its own clearance is a slide
 *  that cannot inherit a stale one. */
export const NAV_ZONE_CLEARANCE = NAV_ZONE_TOP - (CLOSER_TOP + CLOSER_HEIGHT);

/** One line of 11px mono at 1.35 — both headings on the shelf below. */
export const HEADING_HEIGHT = 15;

/** Both headings hang from y=134 — the shelf `leader-gap` puts its provenance
 *  line on, `leader-invest` its eyebrow, K.1 its two column headings and K.2 its
 *  ladder heading. Five leader slides, one shelf; this one puts TWO there, as
 *  K.1 does, because it also asks two questions of one object. */
export const HEADING_TOP = 134;

// ───────────────────── the board and the form beside it ─────────────────────

/**
 * The four authority columns — the FORM. Their count is the figure's, not the
 * content module's: a fifth authority re-cuts the columns through
 * {@link authorityColX} and needs no width re-typed.
 *
 * EQUAL WIDTH IS AN ARGUMENT, not a default. The one whose cells are filled is
 * the same width as the three whose cells are not, so the image says "one of
 * four" rather than "the important one and some others". A wider first column
 * would be the figure conceding the point the empty cells are there to make.
 */
export const AUTHORITY_GAP_X = 12;

/**
 * What the form occupies, right-aligned to the content edge.
 *
 * CUT AGAINST THE LONGEST AUTHORITY HEAD AND NOT CHOSEN. At four columns this is
 * 114px each, and the longest head authored is fourteen characters of 10px mono
 * at 0.12em tracking ≈ 101px — see {@link AUTHORITY_LABEL_BUDGET_CHARS}, which is
 * the same arithmetic held over the copy. A narrower form would wrap a head onto
 * two lines and push the head rule into the first row of levers.
 */
export const FORM_WIDTH = 492;

/** The form's left edge — right-aligned to the content edge, so the four columns
 *  end where the band and the closer under them end. */
export const FORM_X = SIDE_MARGIN + CONTENT_WIDTH - FORM_WIDTH;

/** The air between the levers and the form. Wider than any gap inside either,
 *  which is what makes them two objects: an act on the left, and what the act
 *  waits on to its right. */
export const BLOCK_GAP_X = 48;

/** What one lever row's text gets. The residue — see {@link FORM_WIDTH} for which
 *  of the two is measured and which is what is left. */
export const LEVER_WIDTH = FORM_X - BLOCK_GAP_X - SIDE_MARGIN;

/** How wide one authority column is. Derived from the count so a fifth authority
 *  re-cuts the form instead of needing a width re-typed. */
export function authorityColWidth(count: number): number {
  if (!Number.isInteger(count) || count < 2) {
    throw new Error(
      `authorityColWidth: ${count} column(s) — the form is a COMPARISON between ` +
        `who has to be asked and who does not, so a single column states nothing ` +
        `and would render as one box with no alternative beside it.`,
    );
  }
  return (FORM_WIDTH - (count - 1) * AUTHORITY_GAP_X) / count;
}

/**
 * Authority column `index`'s left edge.
 *
 * @throws on a column the form does not have. A clamped column is two authority
 *         heads printed on top of one another, and it would look deliberate.
 */
export function authorityColX(index: number, count: number): number {
  if (!Number.isInteger(index) || index < 0 || index >= count) {
    throw new Error(
      `authorityColX: no column ${index} — this form has ${count} (0…${count - 1}).`,
    );
  }
  return FORM_X + index * (authorityColWidth(count) + AUTHORITY_GAP_X);
}

/** One line of 10px mono at 1.3 — the four authority heads. */
export const AUTHORITY_HEAD_HEIGHT = 13;
/** The heads' own shelf, 13px under the heading above them: far enough that the
 *  heading reads as a question and the heads as its four slots, close enough that
 *  the two are one block. */
export const AUTHORITY_HEAD_TOP = 162;

/** The form's head rule — 1px, and it spans the FORM ONLY.
 *
 *  NOT THE FULL CONTENT WIDTH, which is the whole reason it is safe to draw at
 *  all: a rule running under both headings would draw a box around the stage and
 *  the levers would read as rows of one table with the form. They are not. The
 *  levers are the deck's ask; the form is a claim ABOUT the ask, and the rule is
 *  what marks where one stops and the other starts. */
export const HEAD_RULE_HEIGHT = 1;
export const HEAD_RULE_TOP = 181;

/** Where the four lever rows start. */
export const BOARD_TOP = 194;

// ───────────────────── the floor, worked upward ─────────────────────

/** The three lines inside the band, top to bottom: the mono eyebrow, the
 *  statement, and the provenance.
 *
 *  K.2's NUMBERS EXACTLY, AND THAT IS THE POINT OF NOT ROUNDING THEM. The band is
 *  the same object on all three slides in this run, and the two that shipped
 *  already differ by 2px in height — `./geometry.ts` budgets a 28px statement on a
 *  20px serif, `./phases-gates-geometry.ts` a 27px one on a 19px serif. That 2px is
 *  pre-existing drift, it is not this ticket's to reconcile, and the honest thing a
 *  third printing can do is pick one of the two and say which: this is K.2's, the
 *  more recent, and this band's statement is set at K.2's 19px for the same reason
 *  — it is one sentence in the deck's own voice under a bordered hairline, and a
 *  third size would be a third answer to a question two slides have already
 *  answered. */
const BAND_EYEBROW_GAP = 6;
const BAND_STATEMENT_HEIGHT = 27;
const BAND_STATEMENT_GAP = 8;
const BAND_PROVENANCE_HEIGHT = 32;

/** Derived from the three lines above, so a reworded band cannot silently
 *  overflow its own border. */
export const BAND_HEIGHT =
  2 * BAND_PADDING_Y +
  HEADING_HEIGHT +
  BAND_EYEBROW_GAP +
  BAND_STATEMENT_HEIGHT +
  BAND_STATEMENT_GAP +
  BAND_PROVENANCE_HEIGHT;

/** The air between the band and the closer. It has to read as a TURN — the
 *  playbook the four came from stops, then the ask arrives — which is why it is
 *  larger than any gap inside the band.
 *
 *  NOT EXPORTED: an input to {@link BAND_TOP} with no outside reader, and an
 *  exported constant nothing reads is a number two places could come to disagree
 *  about for no gain. Both sibling geometry modules make the same call. */
const BAND_GAP = 24;

export const BAND_TOP = CLOSER_TOP - BAND_GAP - BAND_HEIGHT;

/** The air between the board and the band. Smaller than {@link BAND_GAP}: the
 *  band is a statement ABOUT the four levers above it, so it sits closer to them
 *  than the ask sits to either. */
const BOARD_GAP_Y = 20;

/** What the four rows actually get. The residue, and deliberately so — see the
 *  header on which objects are fixed and which one flexes. */
export const BOARD_HEIGHT = BAND_TOP - BOARD_GAP_Y - BOARD_TOP;

// ───────────────────── one lever row ─────────────────────

/**
 * One line of prose, at the register `components/LeverBoard.tsx` actually sets:
 * `fontSize: 13.5` against `lineHeight: 1.35`.
 *
 * WRITTEN AS THE PRODUCT AND NOT AS 18, for the reason `./geometry.ts` records
 * from a measurement: 13.5 × 1.35 is 18.225, and a row that budgets 18 for its
 * last line is 0.225px short of its own ink — which, because {@link leverRowPitch}
 * lands the last row's bottom exactly on the board's bottom edge, comes off the
 * end of the column rather than out of the slack between rows.
 */
const PROSE_LINE = 13.5 * 1.35;

/** A lever row: a 12px mono label at 1.25 (15), 5px of air, one prose line. The
 *  same construction K.1's pillar rows use, and deliberately — see
 *  `components/LeverBoard.tsx` on why the ROW is the section's shared idiom and
 *  the FORM beside it is what makes this stage its own image. */
export const LEVER_LABEL_HEIGHT = 12 * 1.25;
export const LEVER_LABEL_GAP = 5;
export const LEVER_ROW_HEIGHT = LEVER_LABEL_HEIGHT + LEVER_LABEL_GAP + PROSE_LINE;

/**
 * How far apart two of `count` rows sit, so the first starts at
 * {@link BOARD_TOP} and the last ENDS on the board's bottom edge.
 *
 * `(BOARD_HEIGHT - LEVER_ROW_HEIGHT) / (count - 1)` — "one past the end"
 * arithmetic, the same `./geometry.ts` uses for two columns at once. Here there
 * is one column, so the pitch buys something narrower and worth naming: a fifth
 * lever re-cuts the board and cannot push the band down.
 *
 * @throws on fewer than two rows. A single-row board has no pitch and the
 *         division would hand back `Infinity`, which lays out as a row placed
 *         somewhere no browser will admit to rather than as an error.
 */
export function leverRowPitch(count: number): number {
  if (!Number.isInteger(count) || count < 2) {
    throw new Error(
      `leverRowPitch: ${count} row(s) — this stage lays out ${LEVER_ROW_HEIGHT}px ` +
        `lever rows in one ${BOARD_HEIGHT}px board, and a board of one has no pitch.`,
    );
  }
  return (BOARD_HEIGHT - LEVER_ROW_HEIGHT) / (count - 1);
}

/**
 * Lever row `index`'s top edge, IN STAGE COORDINATES.
 *
 * ABSOLUTE AND NOT BODY-RELATIVE, which is where this differs from
 * `./geometry.ts`'s `rowTop` and is worth one line. That module returns an offset
 * because TWO columns are placed against one body origin and neither may know the
 * other's row count. This stage has one column of rows, and the form's cells are
 * placed against the same rows ({@link cellTop}) — so a shared origin buys nothing
 * and an offset every caller has to add back is one more place to forget it.
 *
 * @throws on a row the board does not have. A silently clamped row is a lever
 *         drawn on top of another lever, and it would look deliberate.
 */
export function leverRowTop(index: number, count: number): number {
  if (!Number.isInteger(index) || index < 0 || index >= count) {
    throw new Error(`leverRowTop: no row ${index} — this board holds ${count} (0…${count - 1}).`);
  }
  return BOARD_TOP + index * leverRowPitch(count);
}

// ───────────────────── the form's cells ─────────────────────

/**
 * One cell of the form. A box, not a tick and not a glyph: the figure's whole
 * claim is a COUNT of filled boxes in one column against empty ones in three, and
 * a glyph would invite the room to read the mark instead of the column.
 *
 * WIDE ENOUGH TO BE COMPARED ACROSS 492px OF FORM, narrow enough that four of
 * them do not close up into a bar. 48 × 16 leaves 33px of air on each side of a
 * 114px column, so the four columns read as four slots rather than as one ruled
 * strip.
 */
export const CELL_WIDTH = 48;
export const CELL_HEIGHT = 16;

/** How far the filled mark sits inside its cell. The cell is a hairline FRAME and
 *  the mark is what is put in it, so the frame has to survive the fill — an inset
 *  of 0 would paint over the border and the filled cells would stop being the same
 *  object as the empty ones. */
export const MARK_INSET = 3;

/** The mark itself, derived from the cell it sits in so a wider cell cannot leave
 *  a mark rattling around inside it. */
export const MARK_WIDTH = CELL_WIDTH - 2 * MARK_INSET;
export const MARK_HEIGHT = CELL_HEIGHT - 2 * MARK_INSET;

/** Cell `index`'s left edge, centred in authority column `index`. Centred and not
 *  left-aligned: the head above it is centred too, and a cell hugging the left of
 *  its column would read as belonging to the column to its left. */
export function cellX(index: number, count: number): number {
  return authorityColX(index, count) + (authorityColWidth(count) - CELL_WIDTH) / 2;
}

/**
 * Cell top for lever row `index`, CENTRED ON THE ROW.
 *
 * Centred on the whole row — label and prose line together — rather than aligned
 * to the label's baseline, because the cell answers a question about the LEVER and
 * not about its name. A cell hung off the label would read as an annotation on the
 * two words above it.
 */
export function cellTop(index: number, count: number): number {
  return leverRowTop(index, count) + (LEVER_ROW_HEIGHT - CELL_HEIGHT) / 2;
}

/**
 * The mark's own left edge and top, in STAGE coordinates.
 *
 * A SIBLING OF ITS CELL AND NOT A CHILD OF IT, which is why these two exist at
 * all. A mark nested inside its cell would be positioned against the cell's
 * PADDING edge, so the 1px hairline would silently eat a pixel off the inset and
 * the frame and its fill would be one pixel out of agreement — and, worse, the
 * mark's reveal would sit inside the cell's, multiplying two opacities to say one
 * thing on a stage whose whole rule is that opacity means TIME. Placed on the
 * stage beside it, the frame and what is put in the frame are two boxes arriving
 * at two poses, sharing no arithmetic but these two functions.
 */
export function markX(index: number, count: number): number {
  return cellX(index, count) + MARK_INSET;
}

export function markTop(index: number, count: number): number {
  return cellTop(index, count) + MARK_INSET;
}

// ───────────────────── the copy budgets ─────────────────────
//
// jsdom computes no text, so nothing measures these at render time. Each is a
// width divided by an estimated advance, taken down for slack, and meant to be
// held over the COPY — where an author can act on it — rather than discovered on
// a projector. Same construction, and the same admission, as
// `ONE_LINE_BUDGET_CHARS` in `./geometry.ts`.

/**
 * How long a lever's prose line may be before it wraps into the next row's air.
 *
 * ONE LINE PER LEVER, and that is a layout constraint rather than a preference:
 * {@link LEVER_ROW_HEIGHT} budgets exactly one, so a wrapped line does not
 * overflow a box — it overlaps the row beneath it, which renders as two sentences
 * printed on top of one another and reads on a projector as a font that failed to
 * load. {@link LEVER_WIDTH} is 644px over ≈7.5px per character — 13.5px Inter at
 * ≈0.50em, widened for a system fallback, which is the rate `./geometry.ts`
 * measured for the identical register — giving ≈85, taken down to 84 for slack.
 */
export const LEVER_LINE_BUDGET_CHARS = 84;

/**
 * How long an authority head may be.
 *
 * THE BINDING BUDGET ON THIS STAGE, because it is the only one whose box is
 * narrow. `authorityColWidth(4)` is 114px over ≈7.2px per character — 10px mono at
 * ≈0.60em plus 0.12em tracking — giving ≈15. A head that wraps does not overflow
 * its column; it pushes the head rule into the first lever row, which is why this
 * is enforced on the copy rather than left to the browser.
 */
export const AUTHORITY_LABEL_BUDGET_CHARS = 15;
