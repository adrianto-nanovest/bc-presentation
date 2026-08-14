// The phases, their gates and the staircase they land on, as numbers — stage
// coordinates for a 1280×720 stage.
//
// WHY THIS IS A SECOND FILE AND NOT MORE OF `./geometry.ts`. That module is
// entirely about ONE figure: a two-column body whose columns hold different row
// counts and have to bottom out on the same line, plus the lane arithmetic that
// keeps three track bars ordinal. Not one of its exports means anything here, and
// not one of this file's means anything there. Merged, the section would have a
// single 600-line module in which every export serves exactly one of two slides
// and a reader has to check which before trusting a number — which is the failure
// a shared geometry module is supposed to prevent, arrived at from the other side.
// NO SIBLING SPLITS THIS WAY AND NONE HAS HAD TO: `leader-gap`, `leader-shape` and
// `leader-invest` each hold ONE slide, so each holds one `geometry.ts`. The nearest
// thing in the tree is `leader-shape/walk.ts`, which is a split by CONCERN — that
// module owns WHEN, not where — and is therefore not a precedent for this one.
//
// WHAT IS READ FROM `./geometry.ts` RATHER THAN RE-TYPED, and why each one:
//
//   · `STAGE`, `SIDE_MARGIN`, `CONTENT_WIDTH`, `NAV_ZONE_TOP` — facts about the
//     stage, not about either figure. Two copies in one directory is exactly the
//     drift that produces a slide 4px off its neighbour's margin.
//   · `CLOSER_TOP` and `CLOSER_HEIGHT` — THE LOAD-BEARING ONE. K.1 and K.2 are
//     ADJACENT SLIDES in the only decks that compose them, and both end on a
//     serif-italic ask on a fixed shelf. Two shelves that agree today and are one
//     edit apart from disagreeing would show the room the deck's own ask jumping
//     between two consecutive clicks. Sharing the constant makes that impossible;
//     a test asserting the two are equal would only report it afterwards.
//   · `BAND_PADDING_X` and `BAND_PADDING_Y` — the bordered band is the SAME OBJECT
//     on both slides, one click apart, and its gutters are the thing a room would
//     notice differing without being able to name. THESE TWO WERE RE-TYPED HERE
//     FIRST AND THE Y HAD ALREADY DRIFTED — 13 against `./geometry.ts`'s 14, under
//     a comment on this very declaration claiming the two matched "to the pixel".
//     The import is that comment's claim made by the code instead, which is the
//     only form of it a later edit cannot falsify.
//
// If a third slide lands in this section (`mandate-levers`, K.3, Phase 7) those
// eight should be lifted into a section-level module and both figures should import
// from it. That is a cleanup this ticket is not — the same call
// `components/EnablementModel.tsx` makes about the three copies of `Reveal`.
//
// THE VERTICAL BUDGET IS WORKED FROM THE FLOOR UPWARD, as K.1's is, and for a
// sharper reason: this slide's bottom two bands are FIXED (the closer's shared
// shelf, and a band whose height is dictated by the three lines in it), its middle
// band has a derived height (four columns of identical structure), and the
// STAIRCASE at the top is the one object that can absorb what is left without
// losing a line of copy. Bottom to top:
//
//   · `.nav-zone` is `bottom: 0; height: 88px`, so nothing may sit below y=632.
//   · The closer sits on K.1's shelf. See above.
//   · The band hangs above it, at a height derived from its three lines.
//   · The four phase columns hang above that, at a height derived from THEIR
//     lines — one budget for all four, which is what makes them bottom out
//     together whatever any one brand's calendar holds.
//   · The staircase's BASELINE ({@link BASE_TREAD_Y}) is what is left, so a
//     reworded gate slides the whole staircase rather than reflowing anything.
//     {@link RISE} is the one number here that is typed rather than derived, and
//     it is the knob to turn — never the baseline — if the headroom assertion in
//     the test ever fails.
//
// Pure data and pure functions. No React, no DOM, no work at module scope beyond
// the arithmetic below.
//
// IT IS NOT BARE-NODE IMPORTABLE, AND THAT IS THE PRICE OF THE IMPORT BELOW —
// stated because four sibling geometry modules claim the property and a reader
// will expect this one to. `node --experimental-strip-types -e
// 'import("./src/slides/leader-mandate/phases-gates-geometry.ts")'` fails on
// `./geometry`: bare Node ESM wants the file extension, and
// `allowImportingTsExtensions` is off in `tsconfig.json`, so the specifier cannot
// carry one. MEASURED, not assumed — `./geometry.ts` on its own still imports
// clean, so the property was lost by this file and nothing else.
//
// The alternative was re-typing the eight constants below, which is the drift this
// import exists to prevent, and the closer shelf is the one that would have hurt.
// A verification script that needs numbers off this stage should import
// `./geometry.ts` for the shared eight and read the rest through Vite, exactly as
// `scripts/d2-figure-verify.mjs` reads its slide's.
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

// Re-exported so this figure has ONE geometry import site. The component and the
// test read eight shared constants and a dozen local ones, and a file that reached
// into both modules would make "which slide owns this number?" a question a
// reader has to answer per import rather than per module.
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

/** What is left under the closer before the NavBar's hover band starts. Re-derived
 *  here rather than imported: it is the same arithmetic over the same two shared
 *  constants, and a slide that asserts its own clearance is a slide that cannot
 *  inherit a stale one. */
export const NAV_ZONE_CLEARANCE = NAV_ZONE_TOP - (CLOSER_TOP + CLOSER_HEIGHT);

/**
 * Where the headline stops.
 *
 * `.slide-headline-row` is `top: 80px` and `.slide-headline.small` is 40px on
 * 1.05, so the last descender lands at ≈122. NOT A STYLE THIS FILE SETS — it is a
 * measurement of one the stylesheet already made, recorded here because the top
 * tread of the staircase is the only thing on this stage that gets anywhere near
 * it, and the test asserts the clearance rather than trusting the rise.
 */
export const HEADLINE_BOTTOM = 122;

/** Both band headings hang from y=134 — the shelf `leader-gap` puts its
 *  provenance line on, `leader-invest` its eyebrow, and K.1 its two column
 *  headings. Four leader slides, one shelf. */
export const LADDER_HEADING_TOP = 134;

/** One line of 11px mono at 1.35. Both headings and the band's eyebrow. */
export const HEADING_HEIGHT = 15;

// ───────────────────── the band, and the closer under it ─────────────────────

// The bordered band's own inner padding is K.1's, TO THE PIXEL AND BY IMPORT —
// see the header. The two are the same object one slide apart and a reader should
// not be able to tell them apart by their gutters, which a re-typed pair of numbers
// could not promise and did not keep.

/** The three lines inside the band, top to bottom: the mono eyebrow, the
 *  statement, and the provenance. The PROVENANCE gets two lines' worth — it is
 *  the one string on this slide allowed to be long (a citation trimmed to fit has
 *  stopped being one), and at 10.5px mono over `CONTENT_WIDTH` minus the padding
 *  it lands on one line in the shipped face and two in a fallback. Budgeting two
 *  costs 16px and removes the failure. */
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
 *  organisation's own words stop, then the ask arrives — which is why it is
 *  larger than any gap inside the band.
 *
 *  NOT EXPORTED: an input to {@link BAND_TOP} with no outside reader, and an
 *  exported constant nothing reads is a number two places could come to disagree
 *  about for no gain (`./geometry.ts` and `leader-invest/geometry.ts` both make
 *  the same call). */
const BAND_GAP = 24;

export const BAND_TOP = CLOSER_TOP - BAND_GAP - BAND_HEIGHT;

// ───────────────────── the four phase columns ─────────────────────

/** Four columns, and the gap between them. EQUAL WIDTH IS AN ARGUMENT: the four
 *  phases are not four sizes of work — P0 is months and P3 may be years — and a
 *  width that tracked duration would turn a plan into a Gantt chart the deck has
 *  no data to draw. */
export const PHASE_COUNT = 4;
export const PHASE_GAP_X = 24;
export const PHASE_COL_WIDTH = (CONTENT_WIDTH - (PHASE_COUNT - 1) * PHASE_GAP_X) / PHASE_COUNT;

/** Where phase `index` starts. @throws on a column the figure does not have —
 *  a clamped column is two phases drawn on top of each other, and it would look
 *  deliberate. */
export function phaseColX(index: number): number {
  if (!Number.isInteger(index) || index < 0 || index >= PHASE_COUNT) {
    throw new Error(`phaseColX: no column ${index} — this stage lays out ${PHASE_COUNT} (0…3).`);
  }
  return SIDE_MARGIN + index * (PHASE_COL_WIDTH + PHASE_GAP_X);
}

/** The header line — `P0 · L2 · CLAIMED`, 11px mono at 1.3. */
export const PHASE_HEADER_HEIGHT = 15;
const PHASE_HEADER_GAP = 8;

/**
 * How many calendar rows a column budgets, and how tall each one is.
 *
 * A FIXED COUNT FOR ALL FOUR COLUMNS, whatever any one brand authored. The rows
 * are the only part of a column whose LENGTH varies by brand — three for a
 * three-stage P0, two for a programme name and its window, none at all for the
 * `ours` arm — and a slot sized to its own contents would leave the four gate
 * lines starting at four different heights, which reads as four different kinds
 * of statement. Three is the longest any authored calendar is; the test holds
 * every brand to it, so the failure is a copy failure the author can act on and
 * not a column that quietly grew into the band.
 */
export const CALENDAR_ROWS = 3;
export const CALENDAR_ROW_HEIGHT = 14;
export const CALENDAR_HEIGHT = CALENDAR_ROWS * CALENDAR_ROW_HEIGHT;

/** The air between the calendar and the gate — WIDER THAN ANY LEADING IN EITHER,
 *  which is what makes them two blocks rather than one.
 *
 *  IT IS CUT FOR THE `ours` COLUMNS, not for the `theirs` ones. Where a brand has
 *  published rows, the mono/sans register split separates the two on its own; where
 *  it has not, the slot holds a SENTENCE above a sentence in the same face, and 12px
 *  of air left the four lines reading as one paragraph on the walked stage. The
 *  extra 4px comes out of the staircase's HEADROOM — {@link BASE_TREAD_Y} is
 *  derived downward from here, so the whole staircase slides up rather than
 *  flattening, and {@link RISE} is untouched. */
const CALENDAR_GAP = 16;

/** Three lines of 12.5px sans at 1.35 for the gate. THREE BUDGETED, TWO SPENT —
 *  see {@link GATE_BUDGET_CHARS}. */
export const GATE_LINES = 3;
export const GATE_LINE_HEIGHT = 17;

/** What one phase column occupies, header to last gate line. Derived, so a fifth
 *  line in any of the four re-cuts the whole band rather than overflowing one
 *  column into the band beneath it. */
export const PHASE_COL_HEIGHT =
  PHASE_HEADER_HEIGHT +
  PHASE_HEADER_GAP +
  CALENDAR_HEIGHT +
  CALENDAR_GAP +
  GATE_LINES * GATE_LINE_HEIGHT;

/** Where the header, the calendar and the gate sit inside a column. Offsets and
 *  not absolute y values, so the whole band moves as one when the band below it
 *  is reworded. */
export const CALENDAR_TOP_IN_COL = PHASE_HEADER_HEIGHT + PHASE_HEADER_GAP;
export const GATE_TOP_IN_COL = CALENDAR_TOP_IN_COL + CALENDAR_HEIGHT + CALENDAR_GAP;

/** The air between the columns and the band. Smaller than {@link BAND_GAP}: the
 *  band is a statement ABOUT the plan above it, so it sits closer to the plan
 *  than the ask sits to either. */
const PHASE_GAP_Y = 20;

export const PHASE_COL_TOP = BAND_TOP - PHASE_GAP_Y - PHASE_COL_HEIGHT;

const PHASES_HEADING_GAP = 12;

export const PHASES_HEADING_TOP = PHASE_COL_TOP - PHASES_HEADING_GAP - HEADING_HEIGHT;

// ───────────────────── the staircase ─────────────────────
//
// `gap-capability-ladder`'s figure, re-cut small. The shape is the same and
// deliberately so (§6.5: its B.5 and K.2 are the same object seen twice — B.5 is
// the SPEC's designation for that slide, which the composed decks derive B.1 for
// today; see `./mandate-phases-gates.tsx`). Three things about it are different
// here, and each one is a consequence of what this slide is FOR:
//
//   · IT IS DRAWN IN BOXES, NOT AS AN SVG `<path>`. That slide's staircase draws
//     itself in with a `stroke-dashoffset` sweep, which is what a `<path>` buys and
//     the only thing it buys — this one does not animate, its treads and risers are
//     axis-aligned, and a rect would be an `<svg>` layer whose sole content is
//     four straight lines. Keeping the whole of `src/slides/leader-mandate/` free
//     of `<svg>` closes the SMIL question BY CONSTRUCTION for both slides in the
//     section rather than by discipline in each.
//   · THE TREADS ARE EQUAL WIDTH. `gap-capability-ladder` widens its last run by
//     4px so the path ends on a margin matching the left one; here every rung is a
//     column that also has to hold a label and a chip row, so the columns are cut
//     evenly and the staircase inherits their edges.
//   · THE RISE IS SMALL. That slide spends 56px a step because the staircase is its
//     whole stage. Here it is a coordinate system for the band below it, and the
//     rise is the residue after the phases and the band have been paid.

/** The staircase's own line weight — treads and risers alike. Thick enough to
 *  read as one drawn object from the back row at this rise, thin enough not to
 *  compete with the phase columns it exists to index. */
export const STAIR_THICKNESS = 2;

/** One line of 12.5px display at 1.25, hung under its tread — `gap-capability-ladder`
 *  hangs its rung block under the tread too, which is half of why the two read as
 *  one figure.
 *
 *  NAME ONLY, NO DEFINITION. That slide prints `sub` under every rung name and this
 *  one does not: the definitions were taught there, and reprinting five of them
 *  would cost 65px of a stage that has four gates to show. What the definitions
 *  cash out to is in the gates instead — P2's names L3's decision contract, P3's
 *  names L4's escalation path — which is the same content doing more work. */
export const RUNG_LABEL_GAP = 8;
export const RUNG_LABEL_HEIGHT = 16;

/** How far the rung's name is inset from its column's left edge.
 *
 *  MEASURED AGAINST THE RISER, not chosen for looks. The riser out of rung i−1 is
 *  drawn at the right edge of that rung's column, which IS the left edge of rung
 *  i's — so a label at inset 0 starts two pixels from a line it overlaps in y, and
 *  the walked stage showed the level token touching it. `gap-capability-ladder`
 *  insets its rung block by 10 for the same collision; 8 plus the riser's own 2 is
 *  that number. */
export const RUNG_LABEL_INSET = 8;
/** The gutter that keeps a rung's name off its neighbour's. */
export const RUNG_LABEL_GUTTER = 12;

/** The phase chips, above the tread they land on: 10px mono in a hairline box. */
export const CHIP_HEIGHT = 18;
export const CHIP_GAP_X = 6;
/** Air between the chip row and the tread under it. */
const CHIP_GAP_Y = 6;
/** What a chip row occupies above its tread — 0 for a rung no phase reaches, but
 *  the space is reserved for every rung all the same, because the staircase's
 *  shape must not change when a phase moves rungs. */
export const CHIP_BLOCK_HEIGHT = CHIP_HEIGHT + CHIP_GAP_Y;

/** The air between the staircase and the phases' heading. */
const LADDER_GAP_Y = 22;

/** The lowest tread — L1's, and the staircase's baseline. Derived downward from
 *  the phases' heading, so the staircase is what absorbs a reworded gate. */
export const BASE_TREAD_Y = PHASES_HEADING_TOP - LADDER_GAP_Y - RUNG_LABEL_GAP - RUNG_LABEL_HEIGHT;

/**
 * One step of the staircase.
 *
 * SPENT LAST, AND IT IS THE ONLY NUMBER ON THIS STAGE THAT COULD HAVE BEEN
 * ANYTHING ELSE. Five rungs is four rises, so at 18 the whole staircase is 72px
 * tall and its top tread sits at {@link BASE_TREAD_Y} − 72 = 137, which is 15px
 * clear of the headline. THE BINDING CLEARANCE IS NOT THAT ONE, THOUGH: it is the
 * CHIP ROW above the highest rung a phase actually lands on — L4, whose chips
 * start at 131 — because L5 takes no phase and so may sit higher than any chip
 * could. `tests/unit/mandate-phases-gates.test.tsx` asserts exactly that, over
 * the chipped rungs rather than over all five, and it is what fails first if this
 * number grows.
 */
export const RISE = 18;

/** How wide one rung's column is. Derived from the count so a ladder of a
 *  different length re-cuts the staircase instead of needing a width re-typed —
 *  and the count comes from `gap-capability-ladder`'s own rung array, which this
 *  slide does not own. */
export function rungColumnWidth(count: number): number {
  if (!Number.isInteger(count) || count < 2) {
    throw new Error(
      `rungColumnWidth: ${count} rung(s) — a staircase needs at least two, and this ` +
        `slide maps phases onto the Capability Ladder's five (§6.5).`,
    );
  }
  return CONTENT_WIDTH / count;
}

/** Rung `index`'s left edge. `index` 0 is L1, at the bottom left. */
export function rungX(index: number, count: number): number {
  assertRung(index, count);
  return SIDE_MARGIN + index * rungColumnWidth(count);
}

/**
 * Rung `index`'s tread, in stage coordinates. L1 (index 0) is the LOWEST, so the
 * staircase climbs left to right exactly as `gap-capability-ladder`'s does.
 *
 * @throws on a rung the ladder does not have. A clamped tread is a rung label
 *         printed on another rung's step, and it would look deliberate.
 */
export function treadY(index: number, count: number): number {
  assertRung(index, count);
  return BASE_TREAD_Y - index * RISE;
}

/** Where rung `index`'s chip row starts. Above the tread, so the chips read as
 *  standing ON the step rather than hanging off it. */
export function chipTop(index: number, count: number): number {
  return treadY(index, count) - CHIP_BLOCK_HEIGHT;
}

/**
 * The riser rising OUT OF rung `below` — the vertical segment joining two treads,
 * at the x the two share.
 *
 * @throws on a riser above the top tread, for the reason `leader-gap`'s
 *         `anchorPoint` throws on the same input: a riser needs the tread above
 *         it, and one silently clamped to the top would draw a 0-height box that
 *         reads as a staircase with a step missing.
 */
export function riserY(below: number, count: number): { top: number; height: number } {
  if (!Number.isInteger(below) || below < 0 || below >= count - 1) {
    throw new Error(
      `riserY: no riser above rung ${below} — a riser needs the tread above it, and ` +
        `this ladder has ${count} rungs (0…${count - 1}).`,
    );
  }
  return { top: treadY(below + 1, count), height: RISE };
}

/** The bound every rung lookup shares. One function so the three that need it
 *  cannot come to disagree about what "no such rung" means. */
function assertRung(index: number, count: number): void {
  if (!Number.isInteger(index) || index < 0 || index >= count) {
    throw new Error(`no rung ${index} — this ladder has ${count} (0…${count - 1}).`);
  }
}

// ───────────────────── the copy budgets ─────────────────────
//
// jsdom computes no text, so nothing measures these at render time. Each is a
// width divided by an estimated advance, taken down for slack, and held over the
// COPY by `tests/unit/mandate-phases-gates.test.tsx` — where an author can act on
// it — rather than discovered on a projector. Same construction, and the same
// admission, as `ONE_LINE_BUDGET_CHARS` in `./geometry.ts`.

/**
 * How long a gate line may be.
 *
 * `PHASE_COL_WIDTH` (278px) over ≈6.5px per character — 12.5px Inter at ≈0.50em,
 * widened for a system fallback — gives ≈43 per line, so two lines is ≈86, taken
 * down to 84. The column budgets THREE ({@link GATE_LINES}): the third is what a
 * fallback face spends, and a gate that needs it has not overlapped the band.
 */
export const GATE_BUDGET_CHARS = 84;

/**
 * How long one calendar row may be.
 *
 * `PHASE_COL_WIDTH` over ≈7.2px — 10px mono at 0.06em tracking, widened for a
 * fallback — gives ≈38, taken down to 34. A row that wraps does not overflow a
 * box; it pushes the gate under it into the band, which is why this is enforced
 * on the copy and not left to the browser.
 */
export const CALENDAR_ROW_BUDGET_CHARS = 34;

/**
 * How long a rung's printed name — `L2 · Copilot at scale` — may be.
 *
 * ONE COLUMN WIDE AND NO WIDER, because the rung labels are the one thing on this
 * stage this slide does not own: they come from `leader-gap/content.ts` through
 * {@link LADDER_RUNGS}, and a rung retitled there must fail a test HERE rather
 * than silently run into its neighbour's column. `rungColumnWidth(5)` is 236.8px,
 * less {@link RUNG_LABEL_INSET} and {@link RUNG_LABEL_GUTTER}, over ≈5.9px per
 * character at 12.5px display — ≈36, taken down to 34.
 */
export const RUNG_LABEL_BUDGET_CHARS = 34;
