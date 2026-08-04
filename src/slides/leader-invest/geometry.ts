// The ledger, as numbers — stage coordinates for a 1280×720 stage.
//
// THIS FILE EXISTS FOR ONE REASON: THE COLUMN IS NOT THE SAME HEIGHT IN BOTH
// DECKS. GEMS renders four figures and Berau three (§6.7), so the source line
// under the column, and the amount of the band the column uses, are functions of
// a count the CONTENT owns — and a layout that hardcoded four would leave a row's
// worth of empty space above Berau's attribution, while one that hardcoded three
// would push GEMS' fourth row into the closer. Neither failure is visible in the
// deck the author happened to be looking at.
//
// THE VERTICAL BUDGET, top to bottom, and why these numbers and not rounder ones:
//
//   · `.fig-label` sits at y=36 and `.slide-headline-row` at y=80; the headline is
//     40px on 1.05 line-height, so it ends at ≈122. EYEBROW_TOP is 134 — the same
//     shelf `leader-gap` hangs its provenance line on, so the two sibling leader
//     slides put their mono line in the same place.
//   · The NavBar's hover band is the floor: `.nav-zone` is `bottom: 0;
//     height: 88px`, so nothing may sit below y=632. The closer is the lowest
//     thing on the stage and NAV_ZONE_CLEARANCE is what is left under it —
//     asserted, not assumed.
//   · Everything between is the SLOT: one rectangle that holds either the rows
//     and their attribution, or the one line a deck that names no organisation
//     prints instead. One slot for both fills, so "the band is never blank" is a
//     property of the layout and not of remembering to fill it.
//
// ROW_CAPACITY IS DERIVED FROM THAT BUDGET, not written down. A fifth figure under
// either brand would land 82px lower — inside the NavBar band — so `rowOffset`
// throws instead of drawing it there. A silently placed fifth row is a figure a
// leader cannot click past, and it would look deliberate.
//
// Pure data and pure functions. No React, no DOM, no work at module scope beyond
// the arithmetic below — importable from a node test.

export const STAGE = { width: 1280, height: 720 } as const;

/** The deck's standard side margin, and `.fig-label`'s own left edge — which is
 *  the reference every box on this slide is measured from. */
export const SIDE_MARGIN = 48;

/** The width every full-bleed box on this stage gets. */
export const CONTENT_WIDTH = STAGE.width - 2 * SIDE_MARGIN;

/** `.nav-zone` is `bottom: 0; height: 88px`. Its top edge is the floor for slide
 *  content: a box under it is a box the presenter's own hover target covers. */
export const NAV_ZONE_TOP = STAGE.height - 88;

/** The mono eyebrow's shelf — see the budget above. */
export const EYEBROW_TOP = 134;

// ───────────────────── the slot ─────────────────────

/** The slot's top edge. 42px under the eyebrow, which is the breath that keeps
 *  the eyebrow reading as the headline's tail rather than as the column's first
 *  row. */
export const SLOT_TOP = 190;

/**
 * A row's own height: one line of 26px mono on 1.1 line-height is 28.6px, and 34
 * leaves the descenders of a fallback font somewhere to go. It is the TYPE's
 * height and not a padded box — a box taller than its content would make every
 * assertion about the air between two rows off by the padding.
 */
export const ROW_HEIGHT = 34;

/**
 * The air between two rows. Generous for a table and correct for a projector: at
 * 26px, four figures 48px apart read as four separate statements from the back
 * row, and four figures 20px apart read as a paragraph of numbers.
 */
export const ROW_GAP = 48;

/** How far apart two rows sit. DERIVED, so "the air between two figures" is one
 *  number to change and the capacity below moves with it. */
export const ROW_PITCH = ROW_HEIGHT + ROW_GAP;

/** The gap between the last row and the source line, and the line's own height at
 *  10.5px mono. Small, because the attribution belongs TO the column — a bigger
 *  gap would let it read as a footnote to the slide instead. */
export const ATTRIBUTION_GAP = 14;
export const ATTRIBUTION_HEIGHT = 16;

/**
 * The closer's shelf — FIXED, and not stacked under the attribution.
 *
 * It is the one line both decks print byte for byte (§4.5, `LEADER_THESIS_LINE`),
 * and a thesis that landed 82px higher in one room than the other would be the
 * deck's own argument arriving in a different place each time. So the rows grow
 * downward from a fixed top and the closer waits at a fixed one.
 */
export const CLOSER_TOP = 556;
/** One line of 26px serif italic on 1.3 line-height. */
export const CLOSER_HEIGHT = 34;
/** The air between the slot's bottom edge and the closer. It has to read as a
 *  turn — the figures stop, then the sentence they are evidence for arrives. */
export const CLOSER_GAP = 26;

/** What is left under the closer before the NavBar's hover band starts. */
export const NAV_ZONE_CLEARANCE = NAV_ZONE_TOP - (CLOSER_TOP + CLOSER_HEIGHT);

/** The slot, from its own top edge to the closer's breathing room. */
export const SLOT_HEIGHT = CLOSER_TOP - CLOSER_GAP - SLOT_TOP;

/** What the rows themselves may use: the slot, minus the source line that hangs
 *  under them. */
export const ROWS_HEIGHT_BUDGET = SLOT_HEIGHT - ATTRIBUTION_GAP - ATTRIBUTION_HEIGHT;

/**
 * How many rows this band can hold — DERIVED, so raising the closer lowers the
 * capacity in the same edit.
 *
 * `n` rows occupy `(n - 1) * ROW_PITCH + ROW_HEIGHT`, so the budget allows
 * `floor((budget - ROW_HEIGHT) / ROW_PITCH) + 1`. It comes out at 4, which is
 * GEMS' count: the band is measured against the TALLER of the two decks, and
 * Berau's three rows simply end higher.
 */
export const ROW_CAPACITY = Math.floor((ROWS_HEIGHT_BUDGET - ROW_HEIGHT) / ROW_PITCH) + 1;

// ───────────────────── the three columns ─────────────────────
// A row is a figure, what it measures, and how it is known. The three tile
// CONTENT_WIDTH exactly, so a column cannot be widened without taking the width
// from another one — which is what stops the chip from being pushed past the
// right margin by a longer metric name.

export const COL_GAP = 24;

/**
 * The figure cell. 380px holds the longest figure either brand quotes —
 * "2 days → under 1 hour", 21 characters of 26px mono at ≈0.6em advance ≈ 333px
 * — with slack for a fallback font. The projected width is measured in a real
 * engine; jsdom computes no text.
 */
export const FIGURE_COL_W = 380;

/**
 * The chip cell. 168px holds the longer of the two marks —
 * "PARTICIPANT-CLAIMED", 19 characters of 10px mono at 0.14em tracking ≈ 141px,
 * plus 16px of the chip's own padding — without wrapping. A wrapped chip reads as
 * damage rather than as a caveat, so this is measured in a real engine too.
 */
export const MARK_COL_W = 168;

/** Whatever is left. The metric name is the most reworded string on the slide, so
 *  it gets the residue rather than a number of its own. */
export const METRIC_COL_W = CONTENT_WIDTH - FIGURE_COL_W - MARK_COL_W - 2 * COL_GAP;

// ───────────────────── the derivations ─────────────────────

/**
 * A row's top edge, INSIDE the slot.
 *
 * Relative to the slot and not to the stage, because the slot is what the two
 * fills share: the rows and the no-organisation line are placed against the same
 * origin, so the band cannot be in one place for one brand and another for the
 * next. Add `SLOT_TOP` for the stage coordinate.
 *
 * @throws on a row the band cannot hold. See ROW_CAPACITY.
 */
export function rowOffset(index: number): number {
  if (!Number.isInteger(index) || index < 0 || index >= ROW_CAPACITY) {
    throw new Error(
      `rowOffset: no row ${index} — this band holds ${ROW_CAPACITY} rows ` +
        `(0…${ROW_CAPACITY - 1}) above the NavBar's hover band at y=${NAV_ZONE_TOP}.`,
    );
  }
  return index * ROW_PITCH;
}

/**
 * How tall a column of `count` rows is.
 *
 * @throws on a count the band cannot hold, and on zero — a `figures` block with
 *         no figures is not a layout problem, it is a content one, and the type
 *         in `./content.ts` is what refuses it. This is the second lock.
 */
export function columnHeight(count: number): number {
  if (!Number.isInteger(count) || count < 1 || count > ROW_CAPACITY) {
    throw new Error(
      `columnHeight: ${count} rows — this band holds 1…${ROW_CAPACITY} rows above ` +
        `the NavBar's hover band at y=${NAV_ZONE_TOP}.`,
    );
  }
  return (count - 1) * ROW_PITCH + ROW_HEIGHT;
}

/**
 * Where the source line sits, INSIDE the slot, for a column of `count` rows.
 *
 * THE WHOLE POINT OF THIS FILE. It hangs off the count, so the attribution stays
 * attached to the column it attributes under both brands instead of floating a
 * row's worth of empty space above the closer in the shorter deck.
 */
export function attributionOffset(count: number): number {
  return columnHeight(count) + ATTRIBUTION_GAP;
}
