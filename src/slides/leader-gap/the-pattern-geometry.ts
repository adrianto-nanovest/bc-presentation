// The pattern across the three failures, as numbers — stage coordinates for a 1280×720
// stage.
//
// THREE BANDS, AND THE FIRST ONE IS A BRACE. Band 1 is a CONVERGENCE: three reductions
// stacked in a left column, a vertical hairline to their right spanning all three, a
// short horizontal stub leaving that hairline at its exact vertical centre, and ONE
// statement to the right of the stub, vertically centred against the brace. One copper
// rule closes it; band 2 is the verdict, full width, one line; band 3 is the closer,
// full width, alone.
//
// THE BRACE IS WHY THIS FILE EXISTS AND NOT A SIXTH COPY OF A COLUMN GRID. The leader
// tree already draws a split bar (`./hardest-part-geometry.ts`) and a lopsided diptych
// with four empty rules (`./no-sop-geometry.ts`); neither draws a MANY-INTO-ONE, and
// this slide's whole argument is that three separate failures were one absence. The
// image has to say that before the copy does, which is why {@link BRACE_TOP} and
// {@link BRACE_HEIGHT} are derived from {@link reductionRowTop} rather than typed —
// a hairline that did not span EXACTLY the three rows would be bracketing something
// other than the three things the slide reduces.
//
// THE STUB IS THE POINTER AND ITS SHELF IS ARITHMETIC. {@link STUB_TOP} is the brace's
// own centre ({@link BRACE_TOP} + ({@link BRACE_HEIGHT} − {@link STUB_HEIGHT}) / 2), and
// {@link SAME_EYEBROW_TOP} centres the whole right block on the same span. Both are
// derived, so a reworded reduction that changed the row register moves the pointer and
// the statement with it and the convergence cannot drift out of true.
//
// WHY {@link ROW_HEIGHT} IS 21 AND NOT THE TREE'S 20, which is the one register on this
// stage that departs from its neighbours. The brace's span is `2 × pitch + ROW_HEIGHT`,
// and `2 × pitch` is always even — so an EVEN row box makes the span even and puts a
// one-hairline stub's centre on a half pixel. A 1px box at y=259.5 antialiases into two
// half-intensity rows while the vertical hairline beside it, on an integer x, stays
// crisp: the two halves of ONE graphic would paint at two different weights. An odd row
// box costs 1.5px of leading and buys an integer shelf for the pointer.
//
// BAND 1 DOES NOT REACH THE RIGHT MARGIN, AND THAT IS THE IMAGE. The statement's box
// ends at x=1101, 131px short of the 1232 margin that bands 2 and 3 both run to. A
// convergence NARROWS; a brace whose right-hand block ran the full width would be a
// two-column table with a line between the columns. {@link PATTERN_WIDTH} is also
// exactly {@link REDUCTION_WIDTH} — the three and the one are given the SAME measure,
// so what the brace collapses is the COUNT and not the size.
//
// NOTHING IS PINNED TO `./geometry.ts`, `./hardest-part-geometry.ts` OR
// `./no-sop-geometry.ts`. The three modules in this directory that restate the stage
// restate it from `src/styles/globals.css` rather than from each other — a cross-import
// between two slides' geometry welds two stages that only happen to agree. So the stage
// facts below are RESTATED from that stylesheet (the authority for all four) and carry
// the arithmetic that would fail if one of them moved.
//
// Proved importable from bare Node, not assumed — the property every geometry module in
// this tree keeps, so a coordinate can be checked without a bundler:
//
//   $ node --experimental-strip-types -e \
//       'import("./src/slides/leader-gap/the-pattern-geometry.ts")
//          .then(m => console.log(Object.keys(m).length, "exports"))'
//
// THE VERTICAL BUDGET, top to bottom, and it is arithmetic rather than measurement.
// `.fig-label` at y=36, `.slide-headline-row` at y=80; a one-line `.slide-headline.small`
// (40px on 1.05) ends the headline row at y=122; band 1 starts on {@link CONTENT_TOP} =
// 156, `.slide-content`'s own `top` — the call every recent leader slide makes.
//
//   ─── BAND 1 · THE BRACE ── reductions 480 · hairline at x=560 · statement 480 ───
//   156  reductionEyebrow · 11px mono caps, over the left column         → 172
//   184  reduction 0 · 15px sans, ONE line          ┐
//                                                   │  218  sameEyebrow  → 234
//   249  reduction 1                                ├─ 259 stub ──▸
//                                                   │  246  pattern · 20px serif,
//   314  reduction 2                                ┘        TWO lines  → 301
//        …the vertical hairline spans 184 → 335 at x=560, and the stub leaves it at
//        y=259, which is the exact centre of that span.
//
//   395  copper rule ···· spans the full width                           → 396
//
//   ─────────────── BAND 2 · THE VERDICT (full width) ──────────────────────────
//   456  capabilityLine · 17px serif, ONE line                           → 480
//
//   ─────────────── BAND 3 · THE CLOSER ────────────────────────────────────────
//   566  closer · 22px serif, full width, ONE line                       → 598
//   ────────────────────────────────────────────────────────────────────────────
//   floor y=632 · lowest painted box 598 · {@link NAV_ZONE_CLEARANCE} = 34
//
// THE GAPS ARE RANKED, and the ranking is the reading order: 12 (a label to the body it
// labels) < 44 (one reduction to the next) < 60 (one band to the next) < 86 (the verdict
// to the closer). This stage is airier than either of its neighbours' — it paints four
// rows of type where `./no-sop-geometry.ts` paints fifteen boxes — and the air is spent
// where it buys something: on the brace, which needs vertical extent to read as a
// bracket rather than as a tick, and under the verdict, which is the one gap the closer
// is set apart by.
//
// THE FLOOR IS THE HOVER BAND AND NOT `.slide-content`'s BOTTOM, the same rule the
// leader tree's other geometry modules keep: `.nav-zone` is `bottom: 0; height: 88px`,
// so nothing on this stage may cross y=632.
//
// Pure data and pure functions. No React, no DOM, and no work at module scope beyond
// the arithmetic below.

// ───────────────────── the stage, restated ─────────────────────

/**
 * This slide's copy, as a TYPE only — the other end of the count pin
 * ({@link REDUCTION_COUNT}). Type-space only, so bare Node never has to resolve it.
 */
type ThePatternCopy = (typeof import("./content"))["gapThePatternContent"];

/** The stage. 1280×720 — the deck's one stage size, restated (see the header for why
 *  there is nothing in this directory to pin it to). */
export const STAGE = { width: 1280, height: 720 } as const;

/** The deck's side margin — `.fig-label`, `.slide-headline-row` and `.slide-content`
 *  all sit at `left: 48px` in `src/styles/globals.css`. */
export const SIDE_MARGIN = 48;

/** The width every full-bleed box on this stage gets: 1184. Bands 2 and 3 take it;
 *  band 1 deliberately does not (see the header). */
export const CONTENT_WIDTH = STAGE.width - 2 * SIDE_MARGIN;

/** `.nav-zone` is `bottom: 0; height: 88px`, so its top edge is y=632 — the floor
 *  nothing on this stage may cross. */
export const NAV_ZONE_TOP = STAGE.height - 88;

/** The one shelf band 1 starts on: 156 — `.slide-content`'s own `top`, clearing the
 *  40px headline row that ends at y=122. */
export const CONTENT_TOP = 156;

// ───────────────────── the registers, as box heights ─────────────────────

/** A mono eyebrow's box: 16. 11px on 1.3 is a 14.30 line box; the box carries 1.70
 *  more. ONE CONSTANT FOR BOTH mono caps rows on this stage. */
export const EYEBROW_HEIGHT = 16;

/** The air between a label and the body it labels: 12 — the leader tree's binding gap,
 *  and the tightest gap here. Not exported. */
const LABEL_TO_BODY = 12;

/** A beat change: 60. Band 1 → the rule, and the rule → band 2. Not exported. */
const BAND_GAP = 60;

/**
 * A reduction row's box: 21, cut for ONE line of 15px sans.
 *
 * 15px on 1.3 is a 19.50 line box, so the box carries 1.50 spare — more than the tree's
 * usual 20px row, and the extra half-pixel-and-a-bit is bought on purpose. See the
 * header: the brace's span is `2 × pitch + ROW_HEIGHT`, an ODD row box is the only way
 * that span comes out odd, and an odd span is the only way a 1px stub centres on an
 * integer shelf.
 */
export const ROW_HEIGHT = 21;

// ───────────────────── band 1, left · the three reductions ─────────────────────

/** The left column's left edge: 48 — the stage's own margin. */
export const REDUCTION_LEFT = SIDE_MARGIN;

/**
 * The left column: 480 — one reduction per row.
 *
 * ≈64 characters of 15px sans (the measure `./no-sop-geometry.ts` calibrates at 420px ≈
 * 56), against a longest row of 42 characters in `./content.ts` — 22 characters of
 * headroom, which is what keeps all three on ONE line each. The three rows are ragged
 * well short of the hairline and that is correct: a brace brackets a COLUMN, not the
 * ends of its lines.
 */
export const REDUCTION_WIDTH = 480;

/** Both the eyebrow shelf and the top of the brace's own body. */
export const EYEBROW_TOP = CONTENT_TOP;

/** Where the three reductions start: 184. */
export const BODY_TOP = EYEBROW_TOP + EYEBROW_HEIGHT + LABEL_TO_BODY;

/**
 * How many failures the slide reduces: 3, PINNED to `./content.ts`'s tuple.
 *
 * THREE IS NOT A LAYOUT NUMBER HERE, it is the argument: a pattern across three things
 * is the smallest claim that is not an anecdote, and the run in front of this slide lays
 * down exactly three. The pin is the fixed-length-tuple idiom the leader tree uses
 * everywhere — the count lives in the copy and this module reads it.
 */
export const REDUCTION_COUNT: ThePatternCopy["reductions"]["length"] = 3;

/**
 * The air between two reductions: 44.
 *
 * TWICE ANY ROW GAP IN THE LEADER TREE, and it buys two things. Each row is a whole
 * failure reduced to one noun phrase, so the air is what stops three parallel `X, with
 * no Y` phrases reading as one wrapped sentence — and the same air is what gives the
 * brace beside them the vertical extent it needs to read as a bracket. Ranked below
 * {@link BAND_GAP}, so the three rows still group against the bands under them. Not
 * exported.
 */
const REDUCTION_ROW_GAP = 44;

/** How far apart two reductions sit: 65. Derived. Not exported. */
const REDUCTION_PITCH = ROW_HEIGHT + REDUCTION_ROW_GAP;

/** The guard {@link reductionRowTop} keeps, and the one place a fourth reduction is
 *  refused in stage coordinates. Not exported. */
function assertReduction(fn: string, index: number): void {
  if (!Number.isInteger(index) || index < 0 || index >= REDUCTION_COUNT) {
    throw new Error(
      `${fn}: no reduction ${index} — this stage reduces ${REDUCTION_COUNT} failures ` +
        `(0…${REDUCTION_COUNT - 1}), and the tuple in ./content.ts refuses a fourth ` +
        `first. A fourth row would deepen the column ${REDUCTION_PITCH}px, which moves ` +
        `three things at once: BRACE_HEIGHT grows by the same amount, STUB_TOP and ` +
        `SAME_EYEBROW_TOP both re-centre on the taller span — so the brace's pointer ` +
        `and the statement it points at land on new shelves — and RULE_TOP, ` +
        `CAPABILITY_TOP and CLOSER_TOP each fall ${REDUCTION_PITCH}px, taking ` +
        `NAV_ZONE_CLEARANCE from ${NAV_ZONE_CLEARANCE} to ` +
        `${NAV_ZONE_CLEARANCE - REDUCTION_PITCH} and crossing the NavBar band at ` +
        `y=${NAV_ZONE_TOP}.`,
    );
  }
}

/**
 * Reduction `index`'s top edge, in stage coordinates: 184, 249, 314.
 *
 * THE BRACE IS DERIVED FROM THIS FUNCTION AND FROM NOTHING ELSE — see
 * {@link BRACE_TOP} and {@link BRACE_HEIGHT} — so the hairline spans exactly the rows
 * it brackets at every count this stage will ever hold.
 *
 * @throws on a fourth reduction — see {@link assertReduction}.
 */
export function reductionRowTop(index: number): number {
  assertReduction("reductionRowTop", index);
  return BODY_TOP + index * REDUCTION_PITCH;
}

// ───────────────────── band 1, middle · the brace ─────────────────────

/** The air between the left column and the hairline: 32 — one beat wider than a row
 *  gap in this tree, because the hairline is a different KIND of thing from the rows it
 *  brackets. Not exported. */
const COL_TO_BRACE = 32;

/** The hairline's left edge: 560. Integer, which is what keeps the vertical half of the
 *  brace crisp on a projector (see the header on why the stub's shelf had to be made
 *  integer to match). */
export const BRACE_LEFT = REDUCTION_LEFT + REDUCTION_WIDTH + COL_TO_BRACE;

/** The hairline's thickness: 1 — `.copper-rule`'s own height, restated, because this
 *  line is a plain box rather than that class (see the component on why) and jsdom
 *  computes no stylesheet. */
export const HAIRLINE_WIDTH = 1;

/** Where the brace starts: 184 — the FIRST reduction's top edge, derived. */
export const BRACE_TOP = reductionRowTop(0);

/** Where the brace ends: 335 — the LAST reduction's bottom edge, derived. Not exported;
 *  {@link BRACE_HEIGHT} and {@link BAND_1_BOTTOM} carry it forward. */
const BRACE_BOTTOM = reductionRowTop(REDUCTION_COUNT - 1) + ROW_HEIGHT;

/**
 * The hairline's length: 151 — exactly the three reduction rows, top of the first to
 * bottom of the last.
 *
 * DERIVED FROM BOTH ENDS AND NOT TYPED. A hairline that ran past the rows would bracket
 * whitespace, and one that stopped short would bracket two of the three — either way it
 * would be making a different claim from the one the slide makes.
 */
export const BRACE_HEIGHT = BRACE_BOTTOM - BRACE_TOP;

/** The stub's thickness: 1 — the SAME hairline weight as the vertical, because the two
 *  are ONE graphic and a second thickness would read as two. */
export const STUB_HEIGHT = 1;

/** The stub's length: 36 — long enough to leave the hairline and reach clear of it,
 *  short enough that it reads as a pointer rather than as a second rule. */
export const STUB_WIDTH = 36;

/** The stub's left edge: 561 — flush against the hairline's right face, so the two meet
 *  with no seam. Derived. */
export const STUB_LEFT = BRACE_LEFT + HAIRLINE_WIDTH;

/**
 * The stub's shelf: 259 — the EXACT vertical centre of the hairline's span.
 *
 * DERIVED FROM THE SPAN, never typed: this is the coordinate the whole image rests on,
 * because a stub leaving the hairline anywhere but its centre reads as a branch off one
 * of the three rows rather than as a convergence of all three. It comes out integer
 * because {@link BRACE_HEIGHT} is odd, which is the entire reason {@link ROW_HEIGHT} is
 * 21 (see the header).
 */
export const STUB_TOP = BRACE_TOP + (BRACE_HEIGHT - STUB_HEIGHT) / 2;

// ───────────────────── band 1, right · the one statement ─────────────────────

/** The air between the stub's far end and the statement it points at: 24. Not
 *  exported. */
const STUB_TO_PATTERN = 24;

/** The statement block's left edge: 621. Derived from the stub, so the pointer always
 *  lands on the block. */
export const PATTERN_LEFT = STUB_LEFT + STUB_WIDTH + STUB_TO_PATTERN;

/**
 * The statement's measure: 480 — EXACTLY {@link REDUCTION_WIDTH}.
 *
 * TWO REASONS, AND THE FIRST IS THE ARGUMENT. The brace joins three blocks to one, and
 * giving the one a wider measure than the three would rank it by size for a difference
 * the colour tier and the type size already carry — what collapses here is the COUNT.
 *
 * The second is the wrap. ≈48 characters of 20px serif (the measure
 * `./no-sop-geometry.ts` calibrates at ≈8.47px per character of 17px serif), against an
 * 83-character statement in `./content.ts` — so it sets as TWO lines of roughly 44 and
 * 37, which is a balanced rag. The remainder of the stage's width would take the same
 * sentence in two lines of 60 and 21, i.e. a three-word widow, and that is the failure
 * mode a browser check sees and jsdom cannot.
 */
export const PATTERN_WIDTH = REDUCTION_WIDTH;

/**
 * The statement's box: 55, cut for TWO lines of 20px serif.
 *
 * 20px on 1.3 is a 26.00 line box, so two lines occupy 52.00 and paint 53.28 (Source
 * Serif 4's content area is ≈1.364em) — the box carries 1.72 spare. TWO LINES IS THE
 * CLAIM, and it is the measure's claim as much as the box's: see {@link PATTERN_WIDTH}.
 * A reword to a third line would push the block past the brace it is centred in, which
 * a browser check sees and jsdom cannot, so it is stated here rather than asserted.
 *
 * ODD, LIKE {@link ROW_HEIGHT}, and for the second half of the same reason: it is what
 * makes {@link SAME_BLOCK_HEIGHT} odd, which is what lands the centred block on an
 * integer shelf against the brace's odd span.
 */
export const PATTERN_HEIGHT = 55;

/** The statement block's own height: 83 — an eyebrow, the binding gap, and two lines.
 *  Not exported. */
const SAME_BLOCK_HEIGHT = EYEBROW_HEIGHT + LABEL_TO_BODY + PATTERN_HEIGHT;

/**
 * The right block's eyebrow shelf: 218 — the block CENTRED on the brace's span.
 *
 * THE CENTRING IS THE CONVERGENCE. The three reductions run 184 → 335; this block runs
 * 218 → 301, which leaves 34px of air above it and 34 below. A block aligned to the
 * first row's shelf instead would read as a fourth column beside the three, and the stub
 * pointing at its top would point at the eyebrow rather than at the statement.
 */
export const SAME_EYEBROW_TOP = BRACE_TOP + (BRACE_HEIGHT - SAME_BLOCK_HEIGHT) / 2;

/** The statement's own shelf: 246. */
export const PATTERN_TOP = SAME_EYEBROW_TOP + EYEBROW_HEIGHT + LABEL_TO_BODY;

/** Where band 1 ends: 335 — the DEEPER of the brace and the block centred in it, which
 *  is the brace by construction while the block is shorter than the span it centres on.
 *  Derived over both anyway, so the day a reword makes the block the deeper one the
 *  lower stage moves by arithmetic. Not exported — {@link RULE_TOP} carries it forward. */
const BAND_1_BOTTOM = Math.max(BRACE_BOTTOM, PATTERN_TOP + PATTERN_HEIGHT);

// ───────────────────── the rule that closes the brace ─────────────────────

/** The copper rule's shelf: 395. It spans the FULL width, not the brace's: above it is
 *  three failures collapsed to one sentence, below it is what that sentence means. */
export const RULE_TOP = BAND_1_BOTTOM + BAND_GAP;

/** `.copper-rule` is `height: 1px` in `src/styles/globals.css` — restated, because jsdom
 *  computes no stylesheet and a test that read this box's height off the DOM would read
 *  `NaN`. */
export const RULE_HEIGHT = 1;

// ───────────────────── band 2 · the verdict ─────────────────────

/** The verdict's shelf: 456 — 60px under the rule, matching the air above it. Full
 *  width, and alone in its band: it is one sentence and it has no eyebrow, because a
 *  label over a single line would be a heading for a paragraph of one. */
export const CAPABILITY_TOP = RULE_TOP + RULE_HEIGHT + BAND_GAP;

/**
 * The verdict's box: 24, cut for ONE line of 17px serif.
 *
 * 17px on 1.3 is a 22.10 line box painting 23.19 (Source Serif 4's content area), so the
 * box carries 0.81 spare. ONE LINE IS THE CLAIM: `./content.ts`'s verdict is 104
 * characters, which measures ≈881px in a 1184px box — 33 characters of headroom — and
 * the failure mode of a reword past that is a wrap into the air under it, which a
 * browser check sees and jsdom cannot.
 */
export const CAPABILITY_HEIGHT = 24;

// ───────────────────── band 3 · the closer ─────────────────────

/** The air between the verdict and the closer: 86 — the biggest gap on the stage and
 *  the one place it spends its slack, ranked above {@link BAND_GAP} in the same ratio
 *  `./no-sop-geometry.ts` uses (40 against 28). The closer is the only sentence here
 *  addressed to the room rather than to the three failures. Not exported. */
const VERDICT_TO_CLOSER = 86;

/** The closer's shelf: 566. Full width. */
export const CLOSER_TOP = CAPABILITY_TOP + CAPABILITY_HEIGHT + VERDICT_TO_CLOSER;

/** The closer's box: 32, cut for ONE line of 22px serif — a 28.60 line box painting
 *  30.01, 1.99 spare. The same box every 22px verdict in the leader tree takes, and
 *  `./content.ts`'s closer is 75 characters, ≈822px in a 1184px box. */
export const CLOSER_HEIGHT = 32;

/** Where the stage's lowest box ends: 598. Not exported — the clearance below carries
 *  its whole content. */
const CLOSER_BOTTOM = CLOSER_TOP + CLOSER_HEIGHT;

/** What is left between the closer and the NavBar's hover band: 34px. Derived from both
 *  ends, so an edit anywhere above moves it and a test fails on it before the stage
 *  crosses the band. */
export const NAV_ZONE_CLEARANCE = NAV_ZONE_TOP - CLOSER_BOTTOM;
