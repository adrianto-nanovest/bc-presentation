// The rule nobody wrote, as numbers — stage coordinates for a 1280×720 stage.
//
// FOUR BANDS, AND THE FIRST ONE IS A DIPTYCH THAT IS DELIBERATELY LOPSIDED. Band 1
// is two columns side by side: on the left, what the organisation HANDED OUT — three
// short rows, each with a small filled mark beside it; on the right, what it NEVER
// WROTE DOWN — four questions, each followed by a full-width EMPTY RULE where the
// answer would have been written. One copper rule closes the diptych; band 2 states
// the condition the empty column produces, in two lines; band 3 is the closer, full
// width, alone.
//
// THE EMPTY ANSWER RULES ARE WHY THIS FILE EXISTS AND NOT A SIXTH COPY OF A COLUMN
// GRID. Every other geometry module in the leader tree lays out boxes that contain
// something. This one's right column budgets space for FOUR THINGS THAT ARE NOT THERE:
// {@link ANSWER_RULE_HEIGHT} is a 1px line under each question, with
// {@link QUESTION_TO_ANSWER} binding it to the question it belongs to and
// {@link ANSWER_TO_NEXT} — a much bigger number — holding the blank open underneath
// it. That asymmetric pair of gaps IS the image: the blank has to read as a space
// somebody was supposed to write in, and a rule sitting equidistant between two
// questions reads as a divider instead.
//
// THE TWO COLUMNS ARE UNEQUAL, AND NOT BY THEIR ITEM COUNTS. 456 against 696, which
// is not `1184/2` and not a ratio derived from three rows against four. The right
// column is the slide's argument and its rows are QUESTIONS — full sentences that must
// each hold one line — while the left column's rows are short inventory labels. The
// widths are cut for those two measures. Nothing on this stage encodes a statistic as
// a length: `./hardest-part-geometry.ts` next door does exactly that (its bar IS its
// slide's quoted figure), and this slide carries no figure to encode — see
// `./content.ts` on why it deliberately carries none at all.
//
// THE COLUMNS ALSO END AT DIFFERENT HEIGHTS, ON PURPOSE. The left column bottoms out
// at y=268 and the right at y=381, so {@link DIPTYCH_BOTTOM} is derived as the MAX of
// the two rather than from either — the band that decides the floor is whichever one
// is deeper today, and a fourth issued row or a fifth question must move the whole
// lower stage by arithmetic rather than by an edit somebody forgot.
//
// NOTHING IS PINNED TO `./geometry.ts` OR TO `./hardest-part-geometry.ts`. The ladder's
// module exports treads and slots and no stage constants at all, and the two
// section-`gap` figure modules that do restate the stage restate it from
// `src/styles/globals.css` rather than from each other — a cross-import between two
// slides' geometry welds two stages that only happen to agree. So the stage facts below
// are RESTATED from that stylesheet (the authority for all four) and carry the
// arithmetic that would fail if one of them moved.
//
// Proved importable from bare Node, not assumed — the property every geometry module
// in this tree keeps, so a coordinate can be checked without a bundler:
//
//   $ node --experimental-strip-types -e \
//       'import("./src/slides/leader-gap/no-sop-geometry.ts")
//          .then(m => console.log(Object.keys(m).length, "exports"))'
//
// THE VERTICAL BUDGET, top to bottom, and it is arithmetic rather than measurement.
// `.fig-label` at y=36, `.slide-headline-row` at y=80; a one-line
// `.slide-headline.small` (40px on 1.05) ends the headline row at y=122; band 1 starts
// on {@link CONTENT_TOP} = 156, `.slide-content`'s own `top` — the call every recent
// leader slide makes.
//
//   ─── BAND 1 · THE DIPTYCH ── left column 456 · gutter 32 · right column 696 ───
//   156  both eyebrows · 11px mono caps                                    → 172
//        LEFT — what was handed out                RIGHT — what was not written
//   184  issued row 0                    → 204     question 0              → 204
//                                                  its empty rule at 212   → 213
//   216  issued row 1                    → 236     question 1 at 240       → 260
//                                                  its empty rule at 268   → 269
//   248  issued row 2                    → 268     question 2 at 296       → 316
//                                                  its empty rule at 324   → 325
//                                                  question 3 at 352       → 372
//                                                  its empty rule at 380   → 381
//
//   409  copper rule ···· spans the full width                             → 410
//
//   ─────────────── BAND 2 · THE CONDITION (full width) ─────────────────────────
//   438  eyebrow · 11px mono caps                                          → 454
//   466  condition line · 17px serif, ONE line                             → 490
//   502  consequence line · 17px serif, ONE line                           → 526
//
//   ─────────────── BAND 3 · THE CLOSER ────────────────────────────────────────
//   566  closer · 22px serif, full width, ONE line                         → 598
//   ─────────────────────────────────────────────────────────────────────────────
//   floor y=632 · lowest painted box 598 · {@link NAV_ZONE_CLEARANCE} = 34
//
// THE FLOOR IS THE HOVER BAND AND NOT `.slide-content`'s BOTTOM, the same rule the
// leader tree's other five geometry modules keep: `.nav-zone` is `bottom: 0; height:
// 88px`, so nothing on this stage may cross y=632.
//
// Pure data and pure functions. No React, no DOM, and no work at module scope beyond
// the arithmetic below.

// ───────────────────── the stage, restated ─────────────────────

/**
 * This slide's copy, as a TYPE only — the other end of the two count pins
 * ({@link ISSUED_COUNT}, {@link QUESTION_COUNT}). Type-space only, so bare Node never
 * has to resolve it.
 */
type NoSopCopy = (typeof import("./content"))["gapNoSopContent"];

/** The stage. 1280×720 — the deck's one stage size, restated (see the header for why
 *  there is nothing in this directory to pin it to). */
export const STAGE = { width: 1280, height: 720 } as const;

/** The deck's side margin — `.fig-label`, `.slide-headline-row` and `.slide-content`
 *  all sit at `left: 48px` in `src/styles/globals.css`. */
export const SIDE_MARGIN = 48;

/** The width every full-bleed box on this stage gets: 1184. */
export const CONTENT_WIDTH = STAGE.width - 2 * SIDE_MARGIN;

/** `.nav-zone` is `bottom: 0; height: 88px`, so its top edge is y=632 — the floor
 *  nothing on this stage may cross. */
export const NAV_ZONE_TOP = STAGE.height - 88;

/** The one shelf band 1 starts on: 156 — `.slide-content`'s own `top`, clearing the
 *  40px headline row that ends at y=122. */
export const CONTENT_TOP = 156;

// ───────────────────── the registers, as box heights ─────────────────────

/** A mono eyebrow's box: 16. 11px on 1.3 is a 14.30 line box; the box carries 1.70
 *  more. ONE CONSTANT FOR ALL THREE mono caps rows on this stage — the diptych's two
 *  headings and band 2's. */
export const EYEBROW_HEIGHT = 16;

/** The air between a label and the body it labels: 12 — the leader tree's binding gap.
 *  Not exported. */
const LABEL_TO_BODY = 12;

/** A beat change: 28. Two bands start on one of these. Not exported. */
const BAND_GAP = 28;

/** A 15px sans row's box: 20 — one 19.50 line box with 0.50 spare, cut for ONE line.
 *  ONE HEIGHT FOR BOTH COLUMNS: an issued row and a question are the same register in
 *  two different measures, and giving the questions a taller box would rank them by
 *  size for a difference the copy already carries. */
export const ROW_HEIGHT = 20;

// ───────────────────── band 1 · the two columns ─────────────────────

/** The gutter between the two columns: 32 — one beat wider than a row gap, because the
 *  two columns are two different claims rather than two halves of one list. Not
 *  exported. */
const COL_GAP = 32;

/**
 * The left column: 456 — what was handed out.
 *
 * CUT FOR ITS CONTENTS AND NOT FOR ITS SHARE OF THE STAGE. Its rows are short
 * inventory labels indented past a mark ({@link ISSUED_TEXT_LEFT}), so the measure
 * that matters is 420, which is ≈56 characters of 15px sans — comfortably more than
 * the longest row `./content.ts` holds.
 */
export const ISSUED_WIDTH = 456;

/** The right column: 696 — derived as the REMAINDER, so the two columns and the gutter
 *  tile {@link CONTENT_WIDTH} exactly whatever the left one is set to. ≈94 characters
 *  of 15px sans, which is what makes every question a one-liner. */
export const UNWRITTEN_WIDTH = CONTENT_WIDTH - ISSUED_WIDTH - COL_GAP;

/** The left column's left edge: 48 — the stage's own margin. */
export const ISSUED_LEFT = SIDE_MARGIN;

/** The right column's left edge: 536. `536 + 696 = 1232 = 1280 − 48`, so the diptych
 *  ends on the right margin. */
export const UNWRITTEN_LEFT = ISSUED_LEFT + ISSUED_WIDTH + COL_GAP;

/** Both eyebrows sit on one shelf: 156. They are a PAIR — the diptych is only an
 *  argument if the room reads the two headings against each other — so neither may be
 *  given its own shelf. */
export const EYEBROW_TOP = CONTENT_TOP;

/** Where both columns' bodies start: 184. */
export const BODY_TOP = EYEBROW_TOP + EYEBROW_HEIGHT + LABEL_TO_BODY;

// ───────────────────── band 1, left · what was handed out ─────────────────────

/**
 * How many things the organisation handed out: 3, PINNED to `./content.ts`'s tuple.
 *
 * Three is the copy's own reading — a login, a demonstration, an encouragement — and a
 * fourth would deepen this column past the right one's four questions and take
 * {@link DIPTYCH_BOTTOM} with it.
 */
export const ISSUED_COUNT: NoSopCopy["issued"]["length"] = 3;

/** The air between two issued rows: 12. Not exported. */
const ISSUED_ROW_GAP = 12;

/** How far apart two issued rows sit: 32. Derived. Not exported. */
const ISSUED_ROW_PITCH = ROW_HEIGHT + ISSUED_ROW_GAP;

/**
 * The small filled mark beside each issued row: 20 × 2, at the column's own left edge.
 *
 * IT IS THE OTHER HALF OF THE IMAGE. The right column's answer rules are long and
 * EMPTY; these are short and FILLED, in a brighter tier, and they sit where a reader's
 * eye lands first on each row. Without them the left column is three sentences and the
 * right column's blanks read as a list style rather than as an absence.
 */
export const MARK_WIDTH = 20;

/** The mark's thickness: 2 — twice `.copper-rule`'s 1px, because it is a MARK and not
 *  a divider, and 1px at the back of a room is the first thing a projector loses. */
export const MARK_HEIGHT = 2;

/** The air between the mark and the text it marks: 16. Not exported. */
const MARK_TO_TEXT = 16;

/** Where an issued row's text starts: 84. */
export const ISSUED_TEXT_LEFT = ISSUED_LEFT + MARK_WIDTH + MARK_TO_TEXT;

/** The measure an issued row's text gets: 420. */
export const ISSUED_TEXT_WIDTH = ISSUED_WIDTH - MARK_WIDTH - MARK_TO_TEXT;

/** The guard both left-column placement functions share, so an index one of them
 *  accepts is always an index the other places. Not exported. */
function assertIssued(fn: string, index: number): void {
  if (!Number.isInteger(index) || index < 0 || index >= ISSUED_COUNT) {
    throw new Error(
      `${fn}: no issued row ${index} — the left column holds ${ISSUED_COUNT} ` +
        `(0…${ISSUED_COUNT - 1}). The tuple in ./content.ts refuses the extra entry ` +
        `first, and a fourth row would deepen this column past the ` +
        `${QUESTION_COUNT} questions beside it and move DIPTYCH_BOTTOM.`,
    );
  }
}

/**
 * Issued row `index`'s top edge, in stage coordinates: 184, 216, 248.
 *
 * @throws on a fourth row — see {@link assertIssued}.
 */
export function issuedRowTop(index: number): number {
  assertIssued("issuedRowTop", index);
  return BODY_TOP + index * ISSUED_ROW_PITCH;
}

/**
 * The top edge of issued row `index`'s mark: 193, 225, 257 — centred on the row's box.
 *
 * DERIVED FROM THE ROW AND NOT TYPED, so the mark cannot drift off the line it marks
 * when the row register changes.
 *
 * @throws on a fourth row — see {@link assertIssued}.
 */
export function issuedMarkTop(index: number): number {
  assertIssued("issuedMarkTop", index);
  return issuedRowTop(index) + (ROW_HEIGHT - MARK_HEIGHT) / 2;
}

/** Where the left column ends: 268. Not exported — {@link DIPTYCH_BOTTOM} carries it
 *  forward. */
const ISSUED_BOTTOM = BODY_TOP + (ISSUED_COUNT - 1) * ISSUED_ROW_PITCH + ROW_HEIGHT;

// ───────────────────── band 1, right · what was never written ─────────────────────

/**
 * How many questions were never answered: 4, PINNED to `./content.ts`'s tuple.
 *
 * Four is the copy's own escalation — permission, prohibition, arbitration, disclosure
 * — and it is the count this column's depth, and therefore the whole lower stage, is
 * derived from.
 */
export const QUESTION_COUNT: NoSopCopy["questions"]["length"] = 4;

/**
 * The air between a question and the empty rule under it: 8.
 *
 * THE TIGHTEST GAP ON THE STAGE, and the adjacency the image cannot lose: the blank
 * belongs to the question above it, exactly as a citation belongs to the claim above
 * it. Not exported.
 */
const QUESTION_TO_ANSWER = 8;

/** The empty answer rule's thickness: 1 — `.copper-rule`'s own height, restated,
 *  because these rules are plain boxes rather than that class (see the component on
 *  why) and jsdom computes no stylesheet. */
export const ANSWER_RULE_HEIGHT = 1;

/**
 * The air under an empty rule before the next question: 27.
 *
 * MORE THAN THREE TIMES {@link QUESTION_TO_ANSWER}, and that asymmetry is the whole
 * device. A rule sitting halfway between two questions is a divider; a rule sitting
 * directly under one question with a held-open space beneath it is a line somebody was
 * supposed to write on. Not exported.
 */
const ANSWER_TO_NEXT = 27;

/** How far apart two question-and-blank pairs sit: 56. Derived. Not exported. */
const QUESTION_PITCH =
  ROW_HEIGHT + QUESTION_TO_ANSWER + ANSWER_RULE_HEIGHT + ANSWER_TO_NEXT;

/** The guard both right-column placement functions share. Not exported. */
function assertQuestion(fn: string, index: number): void {
  if (!Number.isInteger(index) || index < 0 || index >= QUESTION_COUNT) {
    throw new Error(
      `${fn}: no question ${index} — the right column holds ${QUESTION_COUNT} ` +
        `(0…${QUESTION_COUNT - 1}), each with one empty rule under it. A fifth ` +
        `would push RULE_TOP and the whole lower stage down ${QUESTION_PITCH}px, ` +
        `and the closer already ends ${NAV_ZONE_CLEARANCE}px above the NavBar band ` +
        `at y=${NAV_ZONE_TOP}. The tuple in ./content.ts refuses it first.`,
    );
  }
}

/**
 * Question `index`'s top edge, in stage coordinates: 184, 240, 296, 352.
 *
 * @throws on a fifth question — see {@link assertQuestion}.
 */
export function questionTop(index: number): number {
  assertQuestion("questionTop", index);
  return BODY_TOP + index * QUESTION_PITCH;
}

/**
 * The top edge of question `index`'s EMPTY answer rule: 212, 268, 324, 380.
 *
 * @throws on a fifth question — see {@link assertQuestion}.
 */
export function answerRuleTop(index: number): number {
  assertQuestion("answerRuleTop", index);
  return questionTop(index) + ROW_HEIGHT + QUESTION_TO_ANSWER;
}

/** Where the right column ends: 381. Not exported — {@link DIPTYCH_BOTTOM} carries it
 *  forward. */
const UNWRITTEN_BOTTOM =
  BODY_TOP +
  (QUESTION_COUNT - 1) * QUESTION_PITCH +
  ROW_HEIGHT +
  QUESTION_TO_ANSWER +
  ANSWER_RULE_HEIGHT;

/**
 * Where band 1 ends: 381 — the DEEPER of the two columns.
 *
 * Derived over both, because either column can be the one that decides the floor: three
 * issued rows against four questions-with-blanks today, and the moment either grows the
 * whole lower stage moves and {@link NAV_ZONE_CLEARANCE} is what reports it.
 */
export const DIPTYCH_BOTTOM = Math.max(ISSUED_BOTTOM, UNWRITTEN_BOTTOM);

// ───────────────────── the rule that closes the diptych ─────────────────────

/** The copper rule's shelf: 409. It spans the FULL width, not one column: above it is
 *  what was handed out and what was not, below it is the condition the pair produces. */
export const RULE_TOP = DIPTYCH_BOTTOM + BAND_GAP;

/** `.copper-rule` is `height: 1px` in `src/styles/globals.css` — restated, because
 *  jsdom computes no stylesheet and a test that read this box's height off the DOM
 *  would read `NaN`. */
export const RULE_HEIGHT = 1;

// ───────────────────── band 2 · the condition ─────────────────────

/** Band 2's eyebrow: 438 — 28px under the rule, matching the air above it. */
export const CONDITION_EYEBROW_TOP = RULE_TOP + RULE_HEIGHT + BAND_GAP;

/** Band 2's first line: 466. */
export const CONDITION_LINE_TOP = CONDITION_EYEBROW_TOP + EYEBROW_HEIGHT + LABEL_TO_BODY;

/**
 * A band 2 line's box: 24, cut for ONE line of 17px serif.
 *
 * 17px on 1.3 is a 22.10 line box painting 23.19 (Source Serif 4's content area), so
 * the box carries 0.81 spare. ONE LINE IS THE CLAIM: 124 characters of 17px serif
 * measure ≈1050px in a 1184px box, and the failure mode of a reword past that is a wrap
 * into the line under it — which a browser check sees and jsdom cannot, so it is stated
 * here rather than asserted.
 */
export const CONDITION_LINE_HEIGHT = 24;

/** The air between band 2's two lines: 12. Not exported. */
const CONDITION_LINE_GAP = 12;

/** How far apart band 2's two lines sit: 36. Derived. Not exported. */
const CONDITION_LINE_PITCH = CONDITION_LINE_HEIGHT + CONDITION_LINE_GAP;

/** How many lines band 2 holds: 2 — a literal `const`, so the weld at
 *  {@link conditionLineTop} is compile-visible. The two are the condition and what it
 *  leaves behind; a third would be a second argument in a band cut for one. */
export const CONDITION_LINE_COUNT = 2;

/**
 * Band 2 line `index`'s top edge, in stage coordinates: 466, 502.
 *
 * FULL WIDTH AND STACKED, not two columns. `./hardest-part-geometry.ts` cuts its own
 * closing band into two equal columns because its two lines are a PAIR — one thing
 * bought against one thing built, read across. These two are SEQUENTIAL — what happens,
 * then what it leaves behind — and a reader who takes them side by side takes the
 * consequence as an alternative rather than as a result.
 *
 * @throws on a third line — see {@link CONDITION_LINE_COUNT}.
 */
export function conditionLineTop(index: number): number {
  if (!Number.isInteger(index) || index < 0 || index >= CONDITION_LINE_COUNT) {
    throw new Error(
      `conditionLineTop: no line ${index} — band 2 holds ` +
        `${CONDITION_LINE_COUNT} (0…${CONDITION_LINE_COUNT - 1}): the condition, ` +
        `and what it leaves behind.`,
    );
  }
  return CONDITION_LINE_TOP + index * CONDITION_LINE_PITCH;
}

/** Where band 2 ends: 526. Not exported — {@link CLOSER_TOP} carries it forward. */
const CONDITION_BOTTOM =
  CONDITION_LINE_TOP + (CONDITION_LINE_COUNT - 1) * CONDITION_LINE_PITCH + CONDITION_LINE_HEIGHT;

// ───────────────────── band 3 · the closer ─────────────────────

/** The air between band 2 and the closer: 40 — the biggest gap on the stage, and the
 *  one place this slide spends its slack. The closer is the only sentence here that is
 *  not about the condition, so it is set apart from it. Not exported. */
const CONDITION_TO_CLOSER = 40;

/** The closer's shelf: 566. Full width — the one sentence addressed to every band above
 *  it. */
export const CLOSER_TOP = CONDITION_BOTTOM + CONDITION_TO_CLOSER;

/** The closer's box: 32, cut for ONE line of 22px serif — a 28.60 line box painting
 *  30.01, 1.99 spare. The same box every 22px verdict in the leader tree takes. */
export const CLOSER_HEIGHT = 32;

/** Where the stage's lowest box ends: 598. Not exported — the clearance below carries
 *  its whole content. */
const CLOSER_BOTTOM = CLOSER_TOP + CLOSER_HEIGHT;

/** What is left between the closer and the NavBar's hover band: 34px. Derived from both
 *  ends, so an edit anywhere above moves it and a test fails on it before the stage
 *  crosses the band. */
export const NAV_ZONE_CLEARANCE = NAV_ZONE_TOP - CLOSER_BOTTOM;
