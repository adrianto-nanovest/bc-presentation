// PROTOTYPE A of the B.3 + B.4 merge — "THE VIGNETTE TRIPTYCH", in stage coordinates.
//
// THE FIGURE. Three tall cards in a row. Each is one phase of the record: a small
// animated plate that draws the failure without words, the phase's name, its
// confession, the four things that happened inside it, and the one line it taught. At
// the second pose all three cards CONTRACT to the lesson they reduce to, and the space
// they give up is where the shift those three lessons license is written.
//
// WHY A TRIPTYCH AND NOT THE PARENT'S LEDGER. `./three-failures-geometry.ts` draws the
// same three failures as a VERTICAL ledger — a dated margin with entries hanging off a
// spine — and it argues at length that a fourth horizontal figure in a row of four
// slides is how a run starts reading as one long slide. That argument holds against a
// fourth ledger just as hard: this slide sits directly after that one in the review
// run, and repeating its spine would make the merge look like a re-run rather than a
// replacement. So the merge takes the one shape the parent could not: three PARALLEL
// columns, because the whole claim of the merged slide is that the three entries are
// the SAME SHAPE, and sameness is an argument you make side by side, never down a list.
//
// WHY THE PROSE CAME BACK ONTO THE CARDS. An earlier cut of this prototype put `did`
// and `cost` in a shared hover band and left the cards holding a picture and three
// labels — which reads beautifully and leaves a room that is NOT being presented to
// with nothing to read. The record is now printed in full on the three cards, on ONE
// pose, and the band underneath is spent on the conclusion instead. The plate pays for
// it by dropping from 105px to {@link PLATE_HEIGHT} = 64.
//
// NOTHING IS PINNED TO ANY NEIGHBOUR'S GEOMETRY MODULE — `./three-failures-geometry.ts`
// records the reason (a cross-import welds two stages that only happen to agree today),
// so the stage facts below are RESTATED from `src/styles/globals.css`, the authority
// for all of them.
//
// Proved importable from bare Node, the property every geometry module in this tree
// keeps, so a coordinate can be checked without a bundler:
//
//   $ node --experimental-strip-types -e \
//       'import("./src/slides/leader-gap/gap-failures-pattern-geometry.ts")
//          .then(m => console.log(Object.keys(m).length, "exports"))'
//
// THE VERTICAL BUDGET, top to bottom, and it is arithmetic rather than measurement.
// `.fig-label` at y=36, `.slide-headline-row` at y=80; a one-line `.slide-headline.small`
// (40px on 1.05) ends the headline row at y=122; the figure starts on
// {@link CONTENT_TOP} = 156, `.slide-content`'s own `top`.
//
//   ─────────────── THE EYEBROW · one shelf, two headings ──────────────────────
//   156  eyebrow · 11px mono caps, NO rule under it (cut 2026-08-16) → 178
//        pose 0 "THE RECORD, IN ORDER" · pose 1 "THREE FAILURES, THREE LESSONS"
//
//   ─────────────── POSE 0 · THE RECORD · x = 48 / 452 / 856 ───────────────────
//   192  card top ─────────────────────────────────────────────────────┐
//   206      the plate · 340 × 64, one per failure                     │
//   282      the card's own hairline                                   │
//   293      period    · 11px mono caps, copper-500                    │ 418
//   312      title     · 14px mono caps, copper-100                    │
//   336      subtitle  · 13px serif italic, neutral-300 · 2 lines      │
//   385      WHAT HAPPENED · 10px mono caps                            │
//   407      four happenings · 12.5px serif, 2-line boxes, step 40     │
//   576      the lesson · 13.5px serif italic, on a copper rail        │
//   610  card bottom ──────────────────────────────────────────────────┘
//
//   ─────────────── POSE 1 · THE LESSONS + THE SHIFT ───────────────────────────
//   192  card top ─────────────────────────────────────────────────────┐
//   206      the plate · STILL RUNNING, the same loop pose 0 started   │ 182
//   282      the card's own hairline                                   │
//   293      phase     · 11px mono caps, copper-500                    │
//   312      lesson    · 14px mono caps, copper-100                    │
//   339      quote     · 14px serif italic, neutral-100                │
//   374  card bottom ──────────────────────────────────────────────────┘
//   392  the CopperRule draws · full width
//   405  THE SHIFT · 11px mono caps
//   433  two BOXES, x = 48 / 656, each 576 × 136 ─────────────────────┐
//        445  column title  · 15px serif 600                          │ 136
//        473  bullets       · 12.5px serif on a copper marker,        │
//             one line each, step 22 → 557                            │
//   569  box bottom ───────────────────────────────────────────────────┘
//   585  the mindset row · LABEL + the closing sentence, 17px serif → 610
//   ─────────────────────────────────────────────────────────────────────────────
//   floor y=632 · lowest painted box 610 (pose 0) / 610 (pose 1)
//
// THE FLOOR IS THE NAVBAR'S HOVER BAND AND NOT `.slide-content`'s BOTTOM, the rule every
// geometry module in this directory keeps: `.nav-zone` is `bottom: 0; height: 88px`, so
// nothing on this stage may cross y=632. {@link NAV_ZONE_CLEARANCE_RECORD} and
// {@link NAV_ZONE_CLEARANCE_SHIFT} are derived from BOTH poses' lowest boxes, so an edit
// anywhere above moves them and a negative one is a bug with a name.
//
// THE TWO POSES ARE TWO CARD HEIGHTS AND NOT TWO STAGES. One card box, animated between
// {@link CARD_HEIGHT_RECORD} and {@link CARD_HEIGHT_LESSON}, with the record's face and
// the lesson's face cross-faded inside it and the box clipping whatever is still
// leaving. That is what makes the contraction read as the SAME three things being
// reduced rather than as one figure replaced by another.
//
// Pure data and pure functions. No React, no DOM, no colour, and no work at module scope
// beyond the arithmetic below.

/**
 * This slide's copy, as a TYPE only — the other end of the count pins
 * ({@link CARD_COUNT}, {@link HAPPENING_COUNT}). Type-space only, so bare Node never
 * has to resolve it.
 */
type FailuresCopy = (typeof import("./content"))["gapFailuresPatternContent"];

// ───────────────────── the stage, restated ─────────────────────

/** The stage. 1280×720 — the deck's one stage size, restated from
 *  `src/styles/globals.css` (`.stage-wrap`). */
export const STAGE = { width: 1280, height: 720 } as const;

/** The deck's side margin — `.fig-label`, `.slide-headline-row` and `.slide-content`
 *  all sit at `left: 48px`. */
export const SIDE_MARGIN = 48;

/** The width every full-bleed box on this stage gets: 1184. */
export const CONTENT_WIDTH = STAGE.width - 2 * SIDE_MARGIN;

/** `.nav-zone` is `bottom: 0; height: 88px`, so its top edge is y=632 — the floor
 *  nothing on this stage may cross. */
export const NAV_ZONE_TOP = STAGE.height - 88;

/** The shelf the figure starts on: 156 — `.slide-content`'s own `top`, clearing the
 *  40px headline row that ends at y=122. */
export const CONTENT_TOP = 156;

// ───────────────────── the registers, as box heights ─────────────────────

/** An 11px mono caps row's box: 16. 11px on 1.3 is a 14.30 line box; the box carries
 *  1.70 more. One constant for the eyebrow, the three period labels and the three phase
 *  labels — one register in three places. */
export const MONO_ROW_HEIGHT = 16;

/** A 10px mono caps row's box: 14 — the sub-heading register, used once per card for
 *  `WHAT HAPPENED`. Smaller than {@link MONO_ROW_HEIGHT} on purpose: it labels a list
 *  INSIDE a card and must not compete with the card's own period line. */
export const SMALL_MONO_ROW_HEIGHT = 14;

/** A 14px mono caps row's box: 19. 14px on 1.3 is 18.20. The card titles and the lesson
 *  titles share it — the two poses print different words on the SAME shelf. */
export const TITLE_ROW_HEIGHT = 19;

// ───────────────────── the eyebrow ─────────────────────

/** The eyebrow's shelf: 156. It carries `recordEyebrow` at pose 0 and `lessonsEyebrow`
 *  at pose 1 — one line, two headings, cross-faded, so the heading never twitches. */
export const EYEBROW_TOP = CONTENT_TOP;

/**
 * The air under the eyebrow's text box: 6. Not exported.
 *
 * IT USED TO BE AN UNDERLINE — `padding-bottom: 5` plus a 1px copper-700 hairline, the
 * `SectionTitle` idiom B.4 settled. The rule is cut (owner call, 2026-08-16) and the
 * SPACE IS KEPT, which is why this constant survives its own name change: reclaiming
 * the 6px would lift {@link CARD_TOP} and every shelf measured from it, and this was a
 * change to what the band LOOKS like, not to where the triptych sits. A heading with no
 * rule under it also wants more air than a rule did, not less.
 */
const EYEBROW_TRAILING_AIR = 6;

/** The air between the eyebrow's band and the triptych: 14. Not exported. */
const EYEBROW_TO_CARDS = 14;

// ───────────────────── the triptych ─────────────────────

/**
 * How many failures are on the record: 3, PINNED to `./content.ts`'s tuple.
 *
 * Three is the copy's own count — the headline says three, the figure label says three
 * — and it is also what this stage is cut for: three columns tile
 * {@link CONTENT_WIDTH} exactly at {@link CARD_WIDTH} = 376. A fourth card would cut
 * every column to 275, which is 30 characters of 14px mono — narrower than the longest
 * title in `./content.ts` — and the triptych would start wrapping its own labels.
 */
export const CARD_COUNT: FailuresCopy["cards"]["length"] = 3;

/**
 * How many things happened inside one phase: 4, PINNED to `./content.ts`'s tuple.
 *
 * FOUR ON ALL THREE CARDS, and the count is the argument as much as the copy is: a
 * triptych that claims the three phases are the same shape cannot have one column with
 * three rows and another with five. It is also the last row the budget affords — a
 * fifth would cost 40px and this stage has {@link NAV_ZONE_CLEARANCE_RECORD} = 22.
 */
export const HAPPENING_COUNT: FailuresCopy["cards"][number]["happenings"]["length"] = 4;

/** The air between two cards: 28. Wide enough that three bordered boxes read as three
 *  separate records rather than as one table with rules in it. */
export const CARD_GAP = 28;

/** One card's width: 376 — derived, so the three columns and their two gutters tile
 *  {@link CONTENT_WIDTH} exactly. */
export const CARD_WIDTH = (CONTENT_WIDTH - (CARD_COUNT - 1) * CARD_GAP) / CARD_COUNT;

/** The triptych's shelf: 192. Both poses start here — the cards contract DOWNWARDS. */
export const CARD_TOP =
  EYEBROW_TOP + MONO_ROW_HEIGHT + EYEBROW_TRAILING_AIR + EYEBROW_TO_CARDS;

/** A card's inner left/right padding: 18. */
export const CARD_PAD_X = 18;

/** A card's inner top/bottom padding: 14. */
export const CARD_PAD_Y = 14;

/**
 * The measure a card's text gets: 340.
 *
 * EVERY ROW ON THE CARD IS CUT AGAINST IT, and the two that decide the card's height
 * are the subtitle and the happenings. Source Serif 4 advances ≈0.498em a character by
 * the deck's own measured datum, so 13px gives ≈52 characters a line and 12.5px ≈54;
 * the happenings lose 18 to their marker and get ≈51. `./content.ts` cuts the longest
 * subtitle at 61 characters (two lines) and the longest happening at 100 (two lines),
 * which is what makes {@link SUBTITLE_HEIGHT} and {@link HAPPENING_HEIGHT} facts rather
 * than hopes.
 *
 * THE HAPPENINGS' CEILING IS 102 AND THE LONGEST IS 100 (2026-08-16), which is the
 * tightest row on this slide and the reason a test now holds it: "AISC formed" became
 * "AI Steering Committee (AISC) formed" — the acronym spelled out on first use, now
 * that C.1's hub names the body — and that row went from 76 characters to 100. It fits
 * two lines by ≈22px of 644, so the next row that grows past it is CLIPPED rather than
 * wrapped ({@link HAPPENING_HEIGHT} is a fixed box with `overflow: hidden` on it).
 * `tests/unit/gap-failures-pattern.test.tsx` fails on the overshoot.
 */
export const CARD_INNER_WIDTH = CARD_WIDTH - 2 * CARD_PAD_X;

// ── the plate ──

/** The plate's box: 340 × 64 — the card's full measure. It was 105 while the record
 *  lived in a hover band; the record moving onto the card is what it paid. */
export const PLATE_WIDTH = CARD_INNER_WIDTH;
export const PLATE_HEIGHT = 64;

/** The plate's own top, INSIDE the card: 14. Every shelf below is measured from the
 *  card's box rather than from the stage, so a card that moves takes its whole
 *  contents with it. */
export const PLATE_Y = CARD_PAD_Y;

/** The air between the plate and the card's own hairline: 12. Not exported. */
const PLATE_TO_HAIRLINE = 12;

/** The card's own hairline — a 1px copper rule between the picture and the words, so
 *  the plate reads as a plate and everything under it as its caption. BOTH POSES KEEP
 *  IT ON THE SAME SHELF, which is what makes the contraction read as the card losing
 *  its lower half rather than as the whole card being redrawn. */
export const CARD_HAIRLINE_HEIGHT = 1;

/** The hairline's own top, inside the card: 90. Derived. */
export const CARD_HAIRLINE_Y = PLATE_Y + PLATE_HEIGHT + PLATE_TO_HAIRLINE;

/** The air between the card's hairline and the label under it: 10. Not exported. */
const HAIRLINE_TO_LABEL = 10;

// ── pose 0 · the record's rows, inside the card ──

/** The period's top, inside the card: 101. Shared with {@link PHASE_Y} — pose 1 prints
 *  `PHASE 1` where pose 0 printed `PHASE 1 · Q1 2025`. Derived. */
export const PERIOD_Y = CARD_HAIRLINE_Y + CARD_HAIRLINE_HEIGHT + HAIRLINE_TO_LABEL;

/** The air between the period and the title: 3 — the binding gap, and the tightest on
 *  the card: the phase's date and the phase's name are one unit. Not exported. */
const PERIOD_TO_TITLE = 3;

/** The title's top, inside the card: 120. Shared with {@link LESSON_TITLE_Y}. */
export const TITLE_Y = PERIOD_Y + MONO_ROW_HEIGHT + PERIOD_TO_TITLE;

/** The air between the title and the confession under it: 5. Not exported. */
const TITLE_TO_SUBTITLE = 5;

/** The subtitle's top, inside the card: 144. */
export const SUBTITLE_Y = TITLE_Y + TITLE_ROW_HEIGHT + TITLE_TO_SUBTITLE;

/** A TWO-line 13px serif row's box: 36. 13px on 1.35 is a 17.55 line box; two of them
 *  are 35.10. Two lines on every card even where one is used, because the three cards
 *  are one shape and the shelf below them has to be the same shelf. */
export const SUBTITLE_HEIGHT = 36;

/** The air between the confession and the list it introduces: 13. Not exported. */
const SUBTITLE_TO_HAPPENED = 13;

/** The `WHAT HAPPENED` label's top, inside the card: 193. */
export const HAPPENED_LABEL_Y = SUBTITLE_Y + SUBTITLE_HEIGHT + SUBTITLE_TO_HAPPENED;

/** The air between that label and the first happening: 8. Not exported. */
const HAPPENED_TO_LIST = 8;

/** The first happening's top, inside the card: 215. */
export const HAPPENING_Y0 =
  HAPPENED_LABEL_Y + SMALL_MONO_ROW_HEIGHT + HAPPENED_TO_LIST;

/** A TWO-line 12.5px serif row's box: 34. 12.5px on 1.35 is a 16.88 line box; two of
 *  them are 33.75. Fixed at two on every row of every card — see {@link CARD_INNER_WIDTH}
 *  for the character counts `./content.ts` is cut against. */
export const HAPPENING_HEIGHT = 34;

/** The air between two happenings: 6. Not exported. */
const HAPPENING_GAP = 6;

/** One happening to the next: 40. */
export const HAPPENING_STEP = HAPPENING_HEIGHT + HAPPENING_GAP;

/** The marker's own column, left of a happening's text: 18 — a 4px copper square and
 *  the 14 of air that keeps the two-line prose off it. */
export const HAPPENING_INDENT = 18;

/** The copper square that marks one happening: 4. */
export const HAPPENING_MARKER = 4;

/**
 * Happening `index`'s top inside the card: 215, 255, 295, 335.
 *
 * @throws on a fifth — the tuple in `./content.ts` refuses it first, and this stage has
 *   no 40px left to give it.
 */
export function happeningY(index: number): number {
  if (!Number.isInteger(index) || index < 0 || index >= HAPPENING_COUNT) {
    throw new Error(
      `happeningY: no happening ${index} — a phase records ${HAPPENING_COUNT} ` +
        `(0…${HAPPENING_COUNT - 1}). A fifth costs ${HAPPENING_STEP}px and the record ` +
        `pose has ${NAV_ZONE_CLEARANCE_RECORD}px of clearance left above the navbar.`,
    );
  }
  return HAPPENING_Y0 + index * HAPPENING_STEP;
}

/** Where the four happenings end, inside the card: 369. Not exported. */
const HAPPENINGS_BOTTOM =
  HAPPENING_Y0 + (HAPPENING_COUNT - 1) * HAPPENING_STEP + HAPPENING_HEIGHT;

/** The air between the last happening and the lesson: 15 — the biggest gap inside the
 *  card, and the only place the record spends slack. Everything above it is what
 *  happened; the last line is the only one that concludes. Not exported. */
const HAPPENINGS_TO_LEARNED = 15;

/** The lesson's top, inside the card: 384. */
export const LEARNED_Y = HAPPENINGS_BOTTOM + HAPPENINGS_TO_LEARNED;

/** A ONE-line 13.5px serif row's box: 20. 13.5px on 1.4 is an 18.90 line box. ONE line
 *  and never two — `./content.ts` cuts all three lessons at ≤48 characters against the
 *  {@link LEARNED_MEASURE} the rail leaves them. */
export const LEARNED_HEIGHT = 20;

/** The copper rail the lesson hangs off: 2px, with 12 of air after it. */
export const LEARNED_RAIL_WIDTH = 2;
export const LEARNED_RAIL_GAP = 12;

/** The measure the lesson gets: 326 — the card's inner width less its rail. */
export const LEARNED_MEASURE = CARD_INNER_WIDTH - LEARNED_RAIL_WIDTH - LEARNED_RAIL_GAP;

/**
 * One card's height at pose 0: 418. Derived over every row and gap inside it, so a
 * register change moves the card, the shift block and the clearance together.
 */
export const CARD_HEIGHT_RECORD = LEARNED_Y + LEARNED_HEIGHT + CARD_PAD_Y;

/** Where the record's triptych ends: 610. */
export const CARD_BOTTOM_RECORD = CARD_TOP + CARD_HEIGHT_RECORD;

/** What is left between the record's cards and the NavBar's hover band: 22px. */
export const NAV_ZONE_CLEARANCE_RECORD = NAV_ZONE_TOP - CARD_BOTTOM_RECORD;

// ── pose 1 · the lesson's rows, on the same shelves ──

/** The phase label's top, inside the card: 101 — the period's own shelf. */
export const PHASE_Y = PERIOD_Y;

/** The lesson title's top, inside the card: 120 — the card title's own shelf. */
export const LESSON_TITLE_Y = TITLE_Y;

/** The air between the lesson's name and the sentence it is said as: 8. Not exported. */
const LESSON_TITLE_TO_QUOTE = 8;

/** The quote's top, inside the card: 147. */
export const QUOTE_Y = LESSON_TITLE_Y + TITLE_ROW_HEIGHT + LESSON_TITLE_TO_QUOTE;

/** A ONE-line 14px serif row's box: 21. 14px on 1.45 is a 20.30 line box. The longest
 *  quote in `./content.ts` is 42 characters — ≈293px in a 340px measure. */
export const QUOTE_HEIGHT = 21;

/** One card's height at pose 1: 182 — 236 less than the record it contracts from, and
 *  every one of those pixels is spent below. */
export const CARD_HEIGHT_LESSON = QUOTE_Y + QUOTE_HEIGHT + CARD_PAD_Y;

/** Where the lessons' triptych ends: 374. */
export const CARD_BOTTOM_LESSON = CARD_TOP + CARD_HEIGHT_LESSON;

/**
 * Card `index`'s left edge: 48, 452, 856.
 *
 * @throws on a fourth card — see the guard's own message.
 */
export function cardLeft(index: number): number {
  if (!Number.isInteger(index) || index < 0 || index >= CARD_COUNT) {
    throw new Error(
      `cardLeft: no card ${index} — the record holds ${CARD_COUNT} ` +
        `(0…${CARD_COUNT - 1}). The tuple in ./content.ts refuses the extra entry ` +
        `first, and a fourth column would cut every card from ${CARD_WIDTH} to 275px, ` +
        `narrower than the 27-character title the longest entry already carries.`,
    );
  }
  return SIDE_MARGIN + index * (CARD_WIDTH + CARD_GAP);
}

// ───────────────────── pose 1 · the shift ─────────────────────

/**
 * The air between the contracted cards and the rule under them: 18.
 *
 * TIGHTENED FROM 24 WHEN THE COLUMNS BECAME BOXES. A box costs its own border and two
 * paddings — 26px the two rails never charged — and every pixel of it was found in the
 * three gaps between the cards and the columns rather than taken off the closing line's
 * clearance. Not exported.
 */
const CARDS_TO_SHIFT_RULE = 18;

/** The rule's own line: 392. The `CopperRule` DRAWS here when the conclusion lands —
 *  there is no resting hairline under it, because at pose 0 the cards reach to y=610
 *  and this shelf is inside them. */
export const SHIFT_RULE_Y = CARD_BOTTOM_LESSON + CARDS_TO_SHIFT_RULE;

/** `.copper-rule` is `height: 1px` in `src/styles/globals.css` — restated, because
 *  jsdom computes no stylesheet. */
export const SHIFT_RULE_HEIGHT = 1;

/** The air between the rule and `THE SHIFT`: 12. Not exported. */
const RULE_TO_SHIFT_EYEBROW = 12;

/** `THE SHIFT`'s shelf: 405. */
export const SHIFT_EYEBROW_TOP = SHIFT_RULE_Y + SHIFT_RULE_HEIGHT + RULE_TO_SHIFT_EYEBROW;

/** The air between that heading and the two boxes: 12. Not exported. */
const SHIFT_EYEBROW_TO_COLUMNS = 12;

/** The boxes' shelf: 433. */
export const SHIFT_COL_TOP = SHIFT_EYEBROW_TOP + MONO_ROW_HEIGHT + SHIFT_EYEBROW_TO_COLUMNS;

/** How many columns the shift is written in: 2 — the same move from two ends. */
export const SHIFT_COL_COUNT = 2;

/** The air between them: 32. */
export const SHIFT_COL_GAP = 32;

/** One column's width: 576 — derived, so the two tile {@link CONTENT_WIDTH} exactly. */
export const SHIFT_COL_WIDTH =
  (CONTENT_WIDTH - (SHIFT_COL_COUNT - 1) * SHIFT_COL_GAP) / SHIFT_COL_COUNT;

/** Column `index`'s left edge: 48, 656. */
export function shiftColLeft(index: number): number {
  if (!Number.isInteger(index) || index < 0 || index >= SHIFT_COL_COUNT) {
    throw new Error(
      `shiftColLeft: no column ${index} — the shift is written in ${SHIFT_COL_COUNT}.`,
    );
  }
  return SIDE_MARGIN + index * (SHIFT_COL_WIDTH + SHIFT_COL_GAP);
}

/**
 * A shift column is a BOX and no longer a rail: 1px border, 18 of inner padding across
 * and 12 down, the phase cards' own chrome one tier quieter.
 *
 * WHY A BOX. The two halves of the shift are the SAME move seen from two ends, and a
 * 2px rail down the left of each was drawing that as two lists that happen to be next
 * to each other. A border closes each half into a thing with an inside, which is what
 * makes the pair read as two objects being compared rather than as one column of prose
 * that wrapped. It costs 26px of height — see {@link CARDS_TO_SHIFT_RULE} for where
 * those pixels came from.
 */
export const SHIFT_BOX_PAD_X = 18;
export const SHIFT_BOX_PAD_Y = 12;

/** The box's own border: 1px, the card's weight. */
export const SHIFT_BOX_BORDER = 1;

/** The marker's own column, left of a bullet's text: 18 — a 4px copper square and the
 *  14 of air after it, the record's own {@link HAPPENING_INDENT}. The two lists on this
 *  stage are marked the same way or they are not the same kind of list. */
export const SHIFT_BULLET_INDENT = HAPPENING_INDENT;

/** The copper square that marks one bullet: 4 — the record's own. */
export const SHIFT_BULLET_MARKER = HAPPENING_MARKER;

/** The measure a column's prose gets inside the box: 522 — the box less its two
 *  paddings and the marker column. The longest bullet in `./content.ts` is 60
 *  characters — ≈373px of 12.5px serif, 71% of it — so every bullet is one line. */
export const SHIFT_COL_MEASURE = SHIFT_COL_WIDTH - 2 * SHIFT_BOX_PAD_X - SHIFT_BULLET_INDENT;

/** A column title's box: 20. 15px Source Serif 4 at weight 600 on 1.3 is 19.50. */
export const SHIFT_COL_TITLE_HEIGHT = 20;

/** The air between a column's title and its first bullet: 8. Not exported. */
const SHIFT_TITLE_TO_BULLETS = 8;

/** The title's own shelf inside the box: 12 — the box's top padding. */
export const SHIFT_TITLE_INSET = SHIFT_BOX_PAD_Y;

/** The first bullet's shelf, inside the box: 40. */
export const SHIFT_BULLET_INSET =
  SHIFT_TITLE_INSET + SHIFT_COL_TITLE_HEIGHT + SHIFT_TITLE_TO_BULLETS;

/** The first bullet's shelf on the stage: 473. */
export const SHIFT_BULLET_Y0 = SHIFT_COL_TOP + SHIFT_BULLET_INSET;

/** A ONE-line 12.5px serif row's box: 18. 12.5px on 1.4 is a 17.50 line box. */
export const SHIFT_BULLET_HEIGHT = 18;

/** The air between two bullets: 4 — 2 tighter than the rail cut, and the last of the
 *  26px the border and the paddings cost. Not exported. */
const SHIFT_BULLET_GAP = 4;

/** One bullet to the next: 22. */
export const SHIFT_BULLET_STEP = SHIFT_BULLET_HEIGHT + SHIFT_BULLET_GAP;

/** The longest column: 4 bullets — and since 2026-08-16 BOTH columns run four, where the
 *  second used to run three into a box cut for four. The box was always the same height
 *  either way, because two boxes side by side that bottom out at different heights read
 *  as one of them being unfinished; what the fourth bullet bought is that the right box
 *  no longer LOOKS emptier than the left inside equal borders. */
export const SHIFT_BULLET_MAX = 4;

/**
 * One shift box's height: 136 — cut for {@link SHIFT_BULLET_MAX} and used by BOTH
 * columns, so the pair is one shelf top and bottom.
 */
export const SHIFT_BOX_HEIGHT =
  SHIFT_BULLET_INSET +
  (SHIFT_BULLET_MAX - 1) * SHIFT_BULLET_STEP +
  SHIFT_BULLET_HEIGHT +
  SHIFT_BOX_PAD_Y;

/** Where the two boxes end: 569. Not exported. */
const SHIFT_COLUMNS_BOTTOM = SHIFT_COL_TOP + SHIFT_BOX_HEIGHT;

/** The air between the boxes and the sentence that closes the slide: 16. Not
 *  exported. */
const COLUMNS_TO_MINDSET = 16;

/** The mindset row's shelf: 585 — the slide's last arrival, and one row rather than two
 *  because the clearance below it is {@link NAV_ZONE_CLEARANCE_SHIFT} = 22 and a
 *  separate heading would eat all of it. */
export const MINDSET_TOP = SHIFT_COLUMNS_BOTTOM + COLUMNS_TO_MINDSET;

/** The LABEL's own column, left of the sentence: 152 — `THE MINDSET SHIFT` is 17
 *  characters of 10px JetBrains Mono at `letter-spacing: 0.22em`, which advances 8.2px
 *  a character (139px), plus 13 of air. */
export const MINDSET_LABEL_WIDTH = 152;

/** A ONE-line 17px serif row's box: 25. 17px on 1.45 is a 24.65 line box. The
 *  84-character sentence is ≈711px in the 1032 the label leaves it. */
export const MINDSET_HEIGHT = 25;

/** Where the shift pose's lowest box ends: 610. Not exported. */
const MINDSET_BOTTOM = MINDSET_TOP + MINDSET_HEIGHT;

/** What is left between the closing sentence and the NavBar's hover band: 22px. */
export const NAV_ZONE_CLEARANCE_SHIFT = NAV_ZONE_TOP - MINDSET_BOTTOM;

// ═════════════════════ plate 1 · TOOLS, AND NO METHOD ════════════════════════
//
// Five tool glyphs scattered over the plate, each drifting on an orbit of its own.
// FIVE IS THE COPY'S OWN NUMBER — "5+ AI coding tools explored" — so this tuple is data
// and not decoration, and it is five whatever the plate is resized to.
//
// THE ORBITS ARE WHY THE STILL FRAME STILL ARGUES. Frozen — at pose 1, or under
// `prefers-reduced-motion` — the drift is gone and five icons in a scatter could be
// read as a toolkit. The dashed ellipse under each glyph is what makes the frozen frame
// say the thing the motion says: five paths, five centres, no shared one. Nothing here
// aligns with anything else on either axis, on purpose: no row, no column, no centre.
//
// RE-CUT FOR 64px. The scatter below is the 105px one squeezed onto the shorter plate:
// every glyph box and every orbit is inside 0…340 × 0…64 with at least 3px to spare, and
// the drift keyframes in ./components/failures-pattern.css were cut from ±11px to
// ±5px for the same reason — an orbit that fits and a drift that does not is the same
// bug arriving two seconds later.

/** One tool glyph's placement on the 340×64 plate. `orbit` is the dashed ellipse it
 *  drifts around; `drift` names its keyframe (see ./components/failures-pattern.css)
 *  and `dur`/`delay` are its own, so no two glyphs ever share a phase. */
export interface ToolGlyph {
  /** The lucide icon's name, resolved by the component's own table. */
  readonly icon: "Sparkles" | "Terminal" | "PenLine" | "Wrench" | "Bot";
  /** The glyph's centre. */
  readonly x: number;
  readonly y: number;
  /** The glyph's box: 22 or 24, varied so the five read as five unlike things. */
  readonly size: number;
  readonly orbit: { readonly rx: number; readonly ry: number; readonly rot: number };
  readonly drift: "a" | "b" | "c";
  readonly dur: number;
  readonly delay: number;
}

/**
 * The five, in no order — the point of the picture.
 *
 * CUT ACROSS THE WHOLE PLATE AND NOT ALONG A BAND THROUGH THE MIDDLE OF IT. x steps
 * 28 · 92 · 162 · 232 · 306 (gaps of 64, 70, 70, 74 — near-alike but never equal) and
 * y 20 · 46 · 16 · 44 · 24, so no two glyphs share a row, and neither does any pair of
 * their orbits.
 */
export const TOOL_GLYPHS: readonly ToolGlyph[] = [
  { icon: "Sparkles", x: 28, y: 20, size: 22, orbit: { rx: 18, ry: 10, rot: -18 }, drift: "a", dur: 8.5, delay: 0 },
  { icon: "Terminal", x: 92, y: 46, size: 24, orbit: { rx: 16, ry: 12, rot: 24 }, drift: "b", dur: 10.5, delay: 1.4 },
  { icon: "PenLine", x: 162, y: 16, size: 22, orbit: { rx: 20, ry: 9, rot: 8 }, drift: "c", dur: 7.2, delay: 0.6 },
  { icon: "Wrench", x: 232, y: 44, size: 22, orbit: { rx: 14, ry: 12, rot: -32 }, drift: "a", dur: 11.5, delay: 2.1 },
  { icon: "Bot", x: 306, y: 24, size: 24, orbit: { rx: 17, ry: 11, rot: 40 }, drift: "b", dur: 9.2, delay: 0.9 },
];

// ═════════════════════ plate 2 · TEN CONNECTORS, TWO LEFT ════════════════════
//
// THE ARITHMETIC IS THE PICTURE AND IT IS THE COPY'S OWN. `./content.ts`: "8 of 10 AI
// connectors — scrapped, official versions replaced them in months", and "2 connectors"
// among what held. The count has moved twice now (the 2026-08 recount cut it to six of
// ten; the owner's 2026-08-13 recount to eight); it is written in ONE place here —
// {@link SURVIVOR_INDICES} — and {@link CONNECTOR_STRUCK} derives from it, because a
// picture that disagreed with its own sentence would be the one fault on this stage a
// room would take for a lie rather than for a design.
//
// A TURNING RING AND NO LONGER A 5 × 2 GRID. Ten connectors ride one closed ellipse and
// go round it forever, and the whole plate is that one motion. Three reasons, in order:
//
//   · IT IS WHAT THE PHASE WAS. "BUILDING WITHOUT STRATEGY" is nine months of going
//     round — build, get overtaken, build again — and a ring is that sentence drawn. A
//     static grid says a set was owned; a ring says the set kept coming back round.
//   · THE PLATE IS 340 × 64. A true circle inside 64px of height is a 48px figure in a
//     340px box, so the "circular motion" this plate is cut for is an ELLIPSE — 150 × 18
//     — which uses the whole plate and still reads as one closed orbit.
//   · IT SURVIVES THE POSE WALK. The plates no longer freeze at pose 1 (see
//     ./components/failures-pattern.css), so this figure is running whenever the slide
//     is on the stage, and its 0% and 100% frames are the same frame.
//
// EIGHT LEAVE WHILE THE RING TURNS. Every node starts FILLED — ten orange squares going
// round — and one at a time eight of them lose the fill, take a neutral border and a
// struck diagonal, and keep riding the ring as empty boxes. The two that held stay
// filled and keep breathing. Nothing is removed: ten were built, and the ring still
// carries all ten.

/** One connector node's box: 14 — square, 0px radius, the deck's own corner. Down from
 *  20 with the move onto the ring, which spends the plate's height on the orbit. */
export const NODE_SIZE = 14;

/** How many connectors were written: 10 — the number `./content.ts`'s own copy states
 *  out loud ("8 of 10 AI connectors"). */
export const NODE_COUNT = 10;

/** The ring's centre: the plate's own, 170 × 32. */
export const RING_CX = PLATE_WIDTH / 2;
export const RING_CY = PLATE_HEIGHT / 2;

/**
 * The ring's radii: 150 × 18.
 *
 * BOTH ARE CUT AGAINST THE PLATE AND THE NODE THAT RIDES THEM. A node's half box is 7
 * and the survivor's breathing ring adds 2 more, so the deepest mark on this plate sits
 * at 32 + 18 + 9 = 59 of 64 and the widest at 170 + 150 + 9 = 329 of 340. Both clear,
 * and `tests/unit/gap-failures-pattern.test.tsx` holds the arithmetic from the far end.
 */
export const RING_RX = 150;
export const RING_RY = 18;

/** The survivor's breathing ring, drawn outside the node's box: 2 a side. */
export const NODE_RING_INSET = 2;

/**
 * The track, as a CSS `path()` argument — TWO half-arcs and a close, because `path()`
 * has no ellipse primitive. Derived from the four constants above, so the dashed ellipse
 * the plate paints under the nodes and the line the nodes actually travel can never
 * disagree: `M 20 32 A 150 18 0 1 1 320 32 A 150 18 0 1 1 20 32 Z`.
 *
 * `offset-path: path(…)` resolves against the element's containing block — the plate's
 * own 340 × 64 box — which is why every number here is in plate coordinates.
 */
export const RING_PATH =
  `M ${RING_CX - RING_RX} ${RING_CY} ` +
  `A ${RING_RX} ${RING_RY} 0 1 1 ${RING_CX + RING_RX} ${RING_CY} ` +
  `A ${RING_RX} ${RING_RY} 0 1 1 ${RING_CX - RING_RX} ${RING_CY} Z`;

/** One turn of the ring: 24s. The ellipse is ≈612px round, so a node moves ≈25px a
 *  second — slow enough to be ambient under a spoken sentence, fast enough that a room
 *  sees it move without watching for it. */
export const RING_TURN_S = 24;

/**
 * Node `index`'s resting place on the ring, as a percentage of the path: 0, 10, … 90.
 *
 * EVENLY SPACED BY DISTANCE ALONG THE PATH and not by angle — `offset-distance` measures
 * arc length, so ten equal steps are ten equal gaps whatever the ellipse does at its
 * ends. It is also the animation's start frame: each node runs its own turn from here to
 * here + 100%, which on a closed path is the same point, so the loop has no seam.
 *
 * @throws on an eleventh — see the guard's own message.
 */
export function ringStart(index: number): number {
  if (!Number.isInteger(index) || index < 0 || index >= NODE_COUNT) {
    throw new Error(
      `ringStart: no connector ${index} — the plate draws ${NODE_COUNT}, which is the ` +
        `count ./content.ts states ("8 of 10 AI connectors").`,
    );
  }
  return (index * 100) / NODE_COUNT;
}

/**
 * The two that survived, by index: 2 and 6.
 *
 * NEITHER ADJACENT NOR OPPOSITE. Two neighbours on the ring read as one surviving pair —
 * a corner of the set that happened to be built well — and 0 with 5, or any other pair
 * four steps apart, sits diametrically opposite and reads as a designed result. Two and
 * six are three steps apart one way and seven the other: two that happened to hold.
 */
export const SURVIVOR_INDICES: readonly number[] = [2, 6];

/** The eight that are gone, in strike order — derived from {@link SURVIVOR_INDICES}, so
 *  the picture's arithmetic can only ever be 10 − 2. */
export const CONNECTOR_STRUCK: readonly number[] = Array.from(
  { length: NODE_COUNT },
  (_, i) => i,
).filter((i) => !SURVIVOR_INDICES.includes(i));

/** How long the plate waits before the first strike lands: 900ms — past the card's own
 *  arrival, so the room sees TEN FILLED connectors going round before any of them is
 *  crossed out. That first second is the whole reason the picture works. */
export const STRIKE_START_MS = 900;

/** The gap between two strikes: 105ms. Eight of them run in 735ms. */
export const STRIKE_STEP_MS = 105;

// ═════════════════════ plate 3 · ONE GATE, AND A QUEUE ═══════════════════════
//
// Departments funnel in from the left, and every one of them has to pass a slot one
// item wide. `./content.ts`: "AISC became the bottleneck — small team, growing demand".
// So the plate draws the funnel, the gate, the pile that backs up behind it — and ONE
// dot on the far side, leaving, on a loop long enough that the room feels the wait.
//
// THE PILE IS A WEDGE AND EVERY DOT IN IT IS INSIDE THE FUNNEL. The two funnel lines
// converge, so a column of three dots fits at x=143 and does not fit at x=199; the
// tuple below is cut against {@link funnelSpanAt} rather than eyeballed, which is what
// keeps a 4px dot from sitting outside the wall that is supposed to be holding it.

/** The funnel's mouth and throat, in plate coordinates — re-cut for the 64px plate. */
export const FUNNEL = {
  x0: 6,
  x1: 206,
  topY0: 3,
  topY1: 24,
  bottomY0: 61,
  bottomY1: 40,
} as const;

/** The gate: two bars with a 12px slot between them — the whole picture in one
 *  measurement, and the brightest mark on the plate. Four pixels wide and not one:
 *  everything else here is a hairline, and the one thing every department cannot get
 *  past has to out-weigh the walls that funnelled them into it. */
export const GATE = {
  x: 212,
  width: 4,
  topBar: { y: 6, height: 20 },
  bottomBar: { y: 38, height: 20 },
} as const;

/** The line out the other side, and the height everything in the throat centres on. */
export const EXIT = { x0: 220, x1: 334, y: 32 } as const;

/** The vertical space between the funnel's two walls at plate x — the guard the queue
 *  tuple below is cut against. */
export function funnelSpanAt(x: number): { top: number; bottom: number } {
  const t = (x - FUNNEL.x0) / (FUNNEL.x1 - FUNNEL.x0);
  return {
    top: FUNNEL.topY0 + t * (FUNNEL.topY1 - FUNNEL.topY0),
    bottom: FUNNEL.bottomY0 + t * (FUNNEL.bottomY1 - FUNNEL.bottomY0),
  };
}

/** One department, waiting. */
export interface QueueDot {
  readonly x: number;
  readonly y: number;
}

/** The pile, front to back: one at the slot, then twos, then threes as the funnel opens
 *  — eighteen departments and one way through. Ordered FRONT FIRST, which is the order
 *  they arrive in and therefore the order the queue is seen to back up in. */
export const QUEUE_DOTS: readonly QueueDot[] = [
  { x: 199, y: 32 },
  { x: 187, y: 27 },
  { x: 187, y: 37 },
  { x: 173, y: 26 },
  { x: 173, y: 38 },
  { x: 158, y: 24 },
  { x: 158, y: 32 },
  { x: 158, y: 40 },
  { x: 143, y: 23 },
  { x: 143, y: 32 },
  { x: 143, y: 41 },
  { x: 124, y: 21 },
  { x: 124, y: 32 },
  { x: 124, y: 43 },
  { x: 102, y: 19 },
  { x: 102, y: 45 },
  { x: 76, y: 16 },
  { x: 76, y: 48 },
];

/** A department's dot: r=4. */
export const QUEUE_DOT_RADIUS = 4;

/** How long the plate waits before the first dot lands: 700ms — as with the strikes,
 *  past the card's own arrival. */
export const QUEUE_START_MS = 700;

/** The gap between two arrivals: 70ms. Eighteen of them pile up in 1.19s. */
export const QUEUE_STEP_MS = 70;

/** How far left a dot comes from: 46px. Far enough to read as an approach, near enough
 *  that it is on the plate for the whole of it. */
export const QUEUE_APPROACH_X = 46;
