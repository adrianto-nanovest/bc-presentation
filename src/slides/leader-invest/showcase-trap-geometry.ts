// THE SURFACE AND THE SOURCE — stage coordinates for D.2 on a 1280×720 stage.
//
// ═══ WHAT THIS FILE MEASURES. One chart, drawn three times: alone, over the four rows that
// hold it up, and beside a twin that has nothing under it. Then three boxes that turn the
// three findings into three questions, and the floor.
//
//   ACT 1 · THE CHART (pose 0)              ACT 2 · WHAT IS UNDER IT (pose 1)
//
//   ┌──────────────────────┐   ▁            ┌──────────────────────┐   █
//   │ QUARTERLY VIEW       │  ███           │ QUARTERLY VIEW       │  ███
//   │  ▁▃▂▅▄█▃             │  ███  ← 3px    │  ▁▃▂▅▄█▃             │  ███  ← 240px
//   └──────────────────────┘  ███           └──────────────────────┘  ███
//                                           ┌ THE SOURCE ─────────┐
//   ACT 3 · TWO CHARTS (pose 2)             ┌ THE MEANING ────────┐
//                                           ┌ THE MATCH ──────────┐
//   ┌────────────┐  ┌────────────┐          ┌ THE CHECK ──────────┐
//   │ ▁▃▂▅▄█▃    │  │ ▁▃▂▅▄█▃    │
//   └────────────┘  └────────────┘
//   ┌ THE SOURCE ┐  ┌ · · · · · ·┐
//   ┌ THE MEANING┐  │  NOTHING   │
//   ┌ THE MATCH  ┐  │  UNDER IT  │
//   ┌ THE CHECK  ┐  └ · · · · · ·┘
//
// ═══ THE EFFORT COLUMN IS THE ONLY QUANTITY ON THIS STAGE, AND IT IS ARITHMETIC RATHER
// THAN ILLUSTRATION. The slide prints two of our own measurements — thirty minutes and five
// days — BESIDE this column rather than in its title ({@link
// investShowcaseTrapContent.surfaceReading} and `.sourceReading`, plus the two act
// eyebrows), and {@link EFFORT_RATIO} is their quotient over an eight-hour day: 80.
// {@link METER_HEIGHT} is cut as a multiple of it, so {@link SURFACE_FILL} is a whole 3px
// against 240 and the drawing cannot disagree with the strings beside it. A reworded reading
// that left this file alone fails `tests/unit/invest-showcase-trap.test.tsx`.
//
// THE RATIO IS NOT COMPRESSED FOR THE STAGE. A pair of bars at 1:80 is the one figure in
// this deck where the honest drawing is also the vivid one: three pixels is not a small
// bar, it is a bar a room has to look for, which is the claim.
//
// THE TEMPO IS THE SECOND ENCODING AND IT LIVES IN `./components/showcase-trap.css`, not
// here — pose 0's chart snaps together and pose 1's four rows draw one at a time. Nothing
// in this module times anything; see that stylesheet's header for why the two acts run at
// different speeds and why neither duration claims to be the ratio.
//
// ═══ THE VERTICAL BUDGET, top to bottom, and it is arithmetic rather than measurement.
// `.fig-label` sits at y=36 and `.slide-headline-row` at y=80; a one-line
// `.slide-headline.small` is 40px on 1.05, so the headline row ends at y=122 and NOTHING AT
// ALL is painted between there and {@link EYEBROW_TOP} = 156.
//
//   156  the pose's own eyebrow · 11px mono caps, one of four                → 170
//   502  the pose's own line · 17px serif, ONE line, full width — an act line on
//        poses 0…2, and nothing on poses 3…4                                → 528
//
//   ─────────────── ACTS 1…3 · THE CHART (poses 0…2) ──────────────────────────────────
//   196  the hero plate · 528 × 132                                          → 328
//        210  its title    · 11px mono caps                                  → 224
//        232  its hairline
//        244  its drawing  · seven bars on a 70px band, baseline 314         → 314
//   340  row 0 · 528 × 32, pitch 38                            (poses 1, 2)  → 372
//   378  row 1                                                               → 410
//   416  row 2                                                               → 448
//   454  row 3                                                               → 486
//
//   ─────────────── THE RIGHT HALF · one region, two tenants ──────────────────────────
//   196  the effort column · 44 × 240, filled from its foot   (poses 0, 1)   → 436
//   196  its head reading  · 11px mono caps                       (pose 1)   → 210
//   422  its foot reading  · 11px mono caps                    (poses 0, 1)  → 436
//   456  the mark          · 9.5px mono caps                   (poses 0, 1)  → 470
//   196  the twin plate    · 528 × 132, the hero's geometry           (pose 2)  → 328
//   340  the hollow frame  · 528 × 146, dashed, one centred label    (pose 2)  → 486
//
//   ─────────────── THE RECAP (poses 3 AND 4) ─────────────────────────────────────────
//   196  three boxes · 368 × 262, gutter 40                                  → 458
//        220  a box's label    · 11px mono caps                              → 234
//        246  a box's hairline
//        263  a box's glyph    · 88 square, centred both ways               → 351
//        368  a box's finding  · 13px sans, up to two lines                  → 405
//        417  a box's question · 15px serif, ONE line                        → 439
//
//   ─────────────── THE FLOOR · THE THESIS (pose 4, UNDER the recap) ──────────────────
//   553  copper rule ···· spans the full width                               → 554
//   590  the thesis · 19px serif, full width, ONE line                       → 616
//   ───────────────────────────────────────────────────────────────────────────────────
//   floor y=632 · lowest painted box 616 · {@link NAV_ZONE_CLEARANCE} = 16
//   the acts end at 528, so there is 25px of air between them and the rule.
//
// ═══ THE FLOOR IS THE HOVER BAND AND NOT `.slide-content`'s BOTTOM — the rule every
// geometry module in this directory keeps. `.nav-zone` is `bottom: 0; height: 88px`, so
// nothing on this stage may cross y=632.
//
// ═══ THE RIGHT HALF IS ONE REGION WITH TWO TENANTS, and that is a composition decision
// rather than a saving. The effort column occupies exactly the rectangle the twin plate
// later takes ({@link TWIN_LEFT}, {@link PLATE_WIDTH}), so pose 2 does not add an object
// beside the argument — it REPLACES the thing that was measuring the cost with the thing
// that has not paid it. Two tenants in one region is also why `./components/
// ShowcaseTrapBeats.tsx` mounts them conditionally instead of gating them: two gated
// scenes in one rectangle cross-fade into each other.
//
// Pure data and pure functions. No React, no DOM, and no work at module scope beyond the
// arithmetic below — so it stays importable from bare Node:
//
//   $ node --experimental-strip-types -e \
//       'import("./src/slides/leader-invest/showcase-trap-geometry.ts")
//          .then(m => console.log(Object.keys(m).length, "exports"))'

// ───────────────────── the stage, restated and pinned ─────────────────────

/**
 * The ledger module, as a TYPE only — the pin's other end.
 *
 * `typeof import(…)` is a type-space construct: tsc resolves it, Node's type stripper
 * deletes it, and no runtime import exists to resolve. That is what lets this module hold
 * `./geometry`'s numbers to account without borrowing its resolution problem.
 */
type Ledger = typeof import("./geometry");

/**
 * This slide's copy, as a TYPE only — the other end of the two count pins
 * ({@link LAYER_COUNT}, {@link QUESTION_COUNT}). Type-space again: bare Node cannot load
 * that module at all (its `@/` runtime import is the point of it), and this reference does
 * not ask it to.
 */
type ShowcaseTrapCopy = (typeof import("./content"))["investShowcaseTrapContent"];

/** The stage. 1280×720, PINNED to `./geometry.ts`'s own `STAGE`. */
export const STAGE: Ledger["STAGE"] = { width: 1280, height: 720 };

/** The deck's side margin — `.fig-label`, `.slide-headline-row` and `.slide-content` all
 *  sit at `left: 48px` in `src/styles/globals.css`. PINNED, like {@link STAGE}. */
export const SIDE_MARGIN: Ledger["SIDE_MARGIN"] = 48;

/** The width every full-bleed box on this stage gets: 1184. Re-derived from the two pinned
 *  facts above rather than pinned itself. */
export const CONTENT_WIDTH = STAGE.width - 2 * SIDE_MARGIN;

/** The right edge everything on this stage stops at: 1232. */
export const CONTENT_RIGHT = SIDE_MARGIN + CONTENT_WIDTH;

/** `.nav-zone` is `bottom: 0; height: 88px`, so its top edge is y=632 — the floor for
 *  slide content. Re-derived, not pinned. */
export const NAV_ZONE_TOP = STAGE.height - 88;

// ───────────────────── the two counts, pinned to the copy ─────────────────────

/**
 * Four rows under the chart, and the TYPE says so.
 *
 * TYPED AS THE TUPLE'S OWN `length` AND ASSIGNED THE LITERAL, which is the device that
 * makes a re-cut list a compile error HERE rather than a fifth row drawn through the act
 * line. `./content.ts` types `layers` as `Four<HiddenLayer>`, so `["length"]` is the
 * literal `4`; writing a fifth layer fails on this line, in the module that decides how
 * tall the stack is.
 */
export const LAYER_COUNT: ShowcaseTrapCopy["layers"]["length"] = 4;

/** Three questions in the recap, pinned the same way. Three is not a copy edit: one per
 *  act, and a fourth would be a question no pose on this stage proved. */
export const QUESTION_COUNT: ShowcaseTrapCopy["questions"]["length"] = 3;

// ───────────────────── the shelves ─────────────────────

/**
 * The eyebrow shelf — 156, `.slide-content`'s own top.
 *
 * Nothing at all is painted between y=122 (where a one-line `.slide-headline.small` ends)
 * and this shelf, which is the same 34px of air D.1, D.3, D.4, D.5, K.1 and K.2 each cut
 * for the same complaint: a mono line twelve pixels under a display headline reads as the
 * headline's second, wrapped line. The gap is not a margin anywhere — it is the difference
 * between two numbers, and this comment is the only place it is written down.
 */
export const EYEBROW_TOP = 156;

/**
 * How many characters the HEADLINE may hold, and this one is a hard floor rather than a
 * preference.
 *
 * ONE LINE OR THE EYEBROW SHELF IS GONE. `.slide-headline-row` is `top: 80` and
 * `.slide-headline.small` is 40px on 1.05, so ONE line ends at y=122 and {@link EYEBROW_TOP}
 * starts at 156 — but TWO lines end at 164 and print straight through the shelf and into the
 * figure. Nothing catches that in jsdom, which computes no text, so the ceiling is held on
 * the COPY instead: 1184px over ≈21px per character — 40px Instrument Serif at ≈0.52em,
 * widened for a system fallback — is ≈56, taken down to 52 for slack.
 *
 * THE SLIDE ALREADY SHIPPED A HEADLINE THAT WAS TOO LONG FOR ITS OWN CLAIM AND NEARLY TOO
 * LONG FOR THIS BOX: "The chart took thirty minutes. The data took five days." is 55, one
 * character inside the estimate and four over the budget. It was replaced for being evidence
 * rather than a claim, and this constant is the second reason it could not have stayed.
 */
export const HEADLINE_BUDGET_CHARS = 52;

/** A mono label's box: 14, cut for ONE line of 11px mono caps on 1.3 (14.30 painted). */
export const LABEL_HEIGHT = 14;

/** Every eyebrow on this stage: 11px at 0.16em, `--copper-400` — the register D.1…D.5 and
 *  K.1…K.3 put their mono line in. */
export const LABEL_SIZE = 11;
export const LABEL_TRACKING = 0.16;

/** The air under the eyebrow before a scene starts: 26 — K.1's number. Wider than any gap
 *  INSIDE a box, so the eyebrow reads as a title for the row rather than as its first
 *  row. */
const EYEBROW_TO_BODY = 26;

/** Where every scene starts: 196. */
export const BODY_TOP = EYEBROW_TOP + LABEL_HEIGHT + EYEBROW_TO_BODY;

// ───────────────────── the floor, derived up from the NavBar ─────────────────────

export const NAV_ZONE_CLEARANCE = 16;

/** The thesis' box: 26, cut for ONE line of 19px serif on 1.3 (24.70 painted). */
export const THESIS_HEIGHT = 26;

/** 19px upright serif — `leader-invest`'s thesis size, shared by all five rows of this
 *  run and by `leader-mandate`'s three. */
export const THESIS_TEXT_SIZE = 19;

/** The thesis' shelf: 590. DERIVED BACKWARDS from the NavBar clearance, exactly as its
 *  four siblings are. */
export const THESIS_TOP = NAV_ZONE_TOP - NAV_ZONE_CLEARANCE - THESIS_HEIGHT;

export const RULE_HEIGHT = 1;

/** The air between the rule and the sentence it opens for: 36 — D.1's own number. */
const RULE_TO_THESIS = 36;

/** 553. */
export const RULE_TOP = THESIS_TOP - RULE_TO_THESIS - RULE_HEIGHT;

/** A tautology today, and the point is that it stays one. */
export const THESIS_CLEARANCE = NAV_ZONE_TOP - (THESIS_TOP + THESIS_HEIGHT);

// ───────────────────── the act line, one shelf for three poses ─────────────────────

/** The act line's box: 26, cut for ONE line of 17px serif on 1.4 (23.80 painted). */
export const ACT_LINE_HEIGHT = 26;

/** 17px — one size under the thesis, which is what puts the closer above three acts that
 *  each carry a sentence of their own. */
export const ACT_LINE_SIZE = 17;

/** 502 — one shelf, three poses. Poses 0, 1 and 2 each print exactly one sentence here,
 *  so the room's eye does not hunt for the act's conclusion when the drawing changes. */
export const ACT_LINE_TOP = 502;

/**
 * How many characters an act line may hold.
 *
 * AN ESTIMATE, AND SAID SO. jsdom computes no text, so nothing measures this at render
 * time; the number is {@link CONTENT_WIDTH} (1184px) over ≈8.0px per character — 17px
 * Source Serif at ≈0.47em, widened for a system fallback — which gives ≈148 on one line,
 * taken down hard for slack because the constraint that matters is ASD-STE100's, not the
 * box's. `tests/unit/invest-showcase-trap.test.tsx` holds every authored line against
 * this, so the limit is enforced on the COPY, where an author can act on it.
 */
export const ACT_LINE_BUDGET_CHARS = 80;

/** The thesis' own budget, one register up: 1184px over ≈8.9px per character at 19px. */
export const THESIS_BUDGET_CHARS = 80;

// ───────────────────── the plate, and the chart inside it ─────────────────────

/**
 * A plate: 528 wide.
 *
 * CUT FROM THE TWIN CASE AND NOT FROM THE HERO CASE, which is the one sizing decision on
 * this stage. Two plates plus a gap have to fit inside {@link CONTENT_WIDTH}, so 528 is
 * what makes pose 2 possible — and the hero is drawn at the SAME 528 in poses 0 and 1 so
 * that the chart the room admires and the chart it later cannot distinguish are the same
 * object at the same size. A hero cut to fill the stage and then shrunk for its twin would
 * make pose 2 read as two thumbnails of something bigger.
 */
export const PLATE_WIDTH = 528;

/** A plate: 132 tall. */
export const PLATE_HEIGHT = 132;

/** Both plates sit on {@link BODY_TOP}. */
export const PLATE_TOP = BODY_TOP;

/** The hero plate's left edge — the content margin, so the stack under it is flush with
 *  every other full-bleed box on the stage. */
export const HERO_LEFT = SIDE_MARGIN;

/** The twin plate's left edge: 704, so its right edge is {@link CONTENT_RIGHT}. The gap
 *  between the two plates is 128 — where the scan travels and nothing else is drawn. */
export const TWIN_LEFT = CONTENT_RIGHT - PLATE_WIDTH;

/** The gap between the two plates: 128. Re-derived so a re-cut plate width moves it. */
export const TWIN_GAP = TWIN_LEFT - (HERO_LEFT + PLATE_WIDTH);

/** A plate's inner padding. */
export const PLATE_PAD = 14;

/** Where a plate's title sits, relative to the plate's own top. */
export const PLATE_TITLE_OFFSET = 14;

/** Where a plate's hairline sits, relative to the plate's own top. */
export const PLATE_HAIRLINE_OFFSET = 36;

/** Where a plate's drawing band starts, relative to the plate's own top. */
export const CHART_OFFSET = 48;

/** The drawing band: 70 tall, so its baseline lands 118 below the plate's top and leaves
 *  the plate's own bottom padding under it. */
export const CHART_HEIGHT = 70;

/** How many bars the chart draws.
 *
 *  SEVEN, AND IT IS NOT PINNED TO ANYTHING, because the chart is not data. It is the
 *  shape of a finished chart, and the one property it must have is that a room reads it
 *  as one — seven bars is the fewest that stops reading as a diagram of something. It
 *  carries no legend, no axis label and no number for the same reason. */
export const BAR_COUNT = 7;

export const BAR_WIDTH = 34;
export const BAR_PITCH = 68;

/**
 * The seven bar heights, as fractions of {@link CHART_HEIGHT}.
 *
 * ORDINAL AND DELIBERATELY MEANINGLESS. There is no trend here and there must not be: the
 * moment this list rises or falls the room starts reading the chart instead of the
 * argument about charts, and a room that has found a story in the specimen is a room that
 * has stopped listening. One bar reaches the top so the band is used; the rest are
 * scattered.
 */
export const BAR_FRACTIONS: readonly number[] = [0.42, 0.68, 0.5, 0.86, 0.61, 1, 0.55];

/** The x of bar `index`, absolute, for a plate whose left edge is `plateLeft`. */
export function barLeft(plateLeft: number, index: number): number {
  assertIndex("barLeft", index, BAR_COUNT, "bar");
  return plateLeft + PLATE_PAD + 12 + index * BAR_PITCH;
}

/** The height of bar `index`, in pixels. */
export function barHeight(index: number): number {
  assertIndex("barHeight", index, BAR_COUNT, "bar");
  const fraction = BAR_FRACTIONS[index];
  if (fraction === undefined) {
    throw new Error(`showcase-trap-geometry: barHeight has no fraction for bar ${index}.`);
  }
  return Math.round(CHART_HEIGHT * fraction);
}

/** The drawing band's baseline, absolute: 314. */
export const CHART_BASELINE = PLATE_TOP + CHART_OFFSET + CHART_HEIGHT;

// ───────────────────── the four rows under the chart ─────────────────────

/** The stack starts 12 under the plate it hangs off. */
export const LAYER_TOP = PLATE_TOP + PLATE_HEIGHT + 12;

export const LAYER_HEIGHT = 32;
export const LAYER_PITCH = 38;

/** A row's inner padding. */
export const LAYER_PAD_X = 14;

/** A row's name column: 112, which at 11px mono on 0.16em (≈7.0px per character) holds
 *  sixteen characters — two more than the longest name `./content.ts` authors. */
export const LAYER_LABEL_WIDTH = 112;

/** The air between a row's name and its sentence. */
export const LAYER_LABEL_GAP = 14;

/** A row's sentence: 13px sans. */
export const LAYER_LINE_SIZE = 13;

/** What is left for a row's sentence: 374. */
export const LAYER_LINE_WIDTH =
  PLATE_WIDTH - 2 * LAYER_PAD_X - LAYER_LABEL_WIDTH - LAYER_LABEL_GAP;

/** A row's sentence budget: ≈374px over ≈6.6px per character at 13px, one line, taken
 *  down for slack. */
export const LAYER_LINE_BUDGET_CHARS = 52;

/** The top of row `index`, absolute. */
export function layerTop(index: number): number {
  assertIndex("layerTop", index, LAYER_COUNT, "layer");
  return LAYER_TOP + index * LAYER_PITCH;
}

/** Where the stack ends: 486. */
export const LAYER_STACK_BOTTOM = layerTop(LAYER_COUNT - 1) + LAYER_HEIGHT;

// ───────────────────── the hollow frame under the twin ─────────────────────

/** The twin's frame occupies exactly the band the four rows occupy — same top, same
 *  bottom — so pose 2 is a comparison of two equal rectangles and not of a tall thing
 *  against a short one. */
export const HOLLOW_TOP = LAYER_TOP;
export const HOLLOW_HEIGHT = LAYER_STACK_BOTTOM - LAYER_TOP;

// ───────────────────── the effort column ─────────────────────

/** Thirty minutes, as the headline prints it. */
export const SURFACE_MINUTES = 30;

/** Five days, as the headline prints it. */
export const SOURCE_DAYS = 5;

/** A working day, and it is the one assumption this figure makes out loud. Five CALENDAR
 *  days would be 240 and the drawing would overstate our own claim; eight hours is the
 *  reading that is fair to the room. */
export const WORKDAY_HOURS = 8;

/**
 * 80 — the whole quantity on this stage.
 *
 * Five days of eight hours is 2,400 minutes, against thirty. Written as the quotient of
 * the three constants above rather than as `80`, so a reworded headline moves the drawing
 * instead of contradicting it.
 */
export const EFFORT_RATIO = (SOURCE_DAYS * WORKDAY_HOURS * 60) / SURFACE_MINUTES;

/** The column's track: 44 wide. */
export const METER_WIDTH = 44;

/**
 * The column's track: 240 tall, and it is CUT AS A MULTIPLE OF {@link EFFORT_RATIO}.
 *
 * 240 is 3 × 80, so {@link SURFACE_FILL} is a whole three pixels. A track of, say, 250
 * would put the surface at 3.125 and hand the browser a sub-pixel bar to round however it
 * likes — which on this figure is not a rendering detail, it is the claim.
 */
export const METER_HEIGHT = 3 * EFFORT_RATIO;

/** Three pixels. The chart's whole cost, drawn to the same scale as the data's. */
export const SURFACE_FILL = METER_HEIGHT / EFFORT_RATIO;

/** The column sits in the twin's region, at its own inset. */
export const METER_LEFT = TWIN_LEFT + 36;

export const METER_TOP = BODY_TOP;

/** Where the column's fill starts from: its foot. */
export const METER_BOTTOM = METER_TOP + METER_HEIGHT;

/** The readings' column, to the right of the track. */
export const READING_LEFT = METER_LEFT + METER_WIDTH + 32;

/** What is left for a reading: 416. */
export const READING_WIDTH = CONTENT_RIGHT - READING_LEFT;

/** The head reading sits on the track's top edge; the foot reading is bottom-aligned to
 *  the track's foot, so each label is beside the thing it measures. */
export const READING_HEAD_TOP = METER_TOP;
export const READING_FOOT_TOP = METER_BOTTOM - LABEL_HEIGHT;

/** The mark: 20 under the column's foot. */
export const MARK_TOP = METER_BOTTOM + 20;

/** The mark: 9.5px mono at 0.10em — the token register D.4 and D.5 use for a label that
 *  is a footnote rather than a heading. */
export const MARK_SIZE = 9.5;
export const MARK_TRACKING = 0.1;

/** The mark's budget: ≈416px over ≈6.65px per character at 9.5px on 0.10em. */
export const MARK_BUDGET_CHARS = 60;

// ───────────────────── the recap ─────────────────────

/** The three boxes sit on {@link BODY_TOP}, the same shelf the plates use — so the click
 *  from pose 2 to pose 3 re-tiles the stage and moves no shelf. */
export const BOX_TOP = BODY_TOP;

export const BOX_HEIGHT = 262;

const BOX_GUTTER = 40;

/** 368 — three boxes and two gutters across {@link CONTENT_WIDTH}. */
export const BOX_WIDTH = Math.round((CONTENT_WIDTH - (QUESTION_COUNT - 1) * BOX_GUTTER) / QUESTION_COUNT);

export const BOX_PAD_X = 20;

/** The left edge of box `index`. */
export function boxLeft(index: number): number {
  assertIndex("boxLeft", index, QUESTION_COUNT, "question");
  return SIDE_MARGIN + index * (BOX_WIDTH + BOX_GUTTER);
}

/** Where a box's name sits, relative to the box's own top. */
export const BOX_LABEL_OFFSET = 24;

/** Where a box's hairline sits, relative to the box's own top. */
export const BOX_HAIRLINE_OFFSET = 50;

/** The mark: 88 square, centred on the box in BOTH axes — K.1's and K.2's number, so a
 *  room that has seen the mandate's cards reads these three at the same rank. */
export const GLYPH_SIZE = 88;

/** Where a box's finding sits, relative to the box's own top. */
export const BOX_FINDING_OFFSET = 172;

/** A finding: 13px sans on 1.4, up to two lines. */
export const BOX_FINDING_SIZE = 13;
export const BOX_FINDING_ROWS = 2;
export const BOX_FINDING_HEIGHT = Math.round(BOX_FINDING_SIZE * 1.4 * BOX_FINDING_ROWS);

/**
 * Where a box's mark starts — the middle of the band between the hairline and the finding.
 *
 * Stated as a derived number rather than a chosen one, so a re-cut box or a third finding
 * line moves the mark with it. K.1's device, and for K.1's reason.
 */
export const BOX_GLYPH_OFFSET = Math.round(
  BOX_HAIRLINE_OFFSET + (BOX_FINDING_OFFSET - BOX_HAIRLINE_OFFSET - GLYPH_SIZE) / 2,
);

/** Where a box's question sits, relative to the box's own top. */
export const BOX_QUESTION_OFFSET = 221;

/** A question: 15px serif on 1.4, ONE line. */
export const BOX_QUESTION_SIZE = 15;
export const BOX_QUESTION_HEIGHT = Math.round(BOX_QUESTION_SIZE * 1.4);

/** What is left for a box's text: 328. */
export const BOX_TEXT_WIDTH = BOX_WIDTH - 2 * BOX_PAD_X;

/** A finding's budget: ≈328px over ≈6.6px per character at 13px, two lines, cut hard for
 *  slack — the copy rule is one short sentence, not two lines of one. */
export const BOX_FINDING_BUDGET_CHARS = 56;

/** A question's budget: ≈328px over ≈7.1px per character at 15px, ONE line. A question
 *  that wrapped would be the one wrap on this stage a room could not miss. */
export const BOX_QUESTION_BUDGET_CHARS = 40;

/** Where the recap ends: 458. */
export const RECAP_BOTTOM = BOX_TOP + BOX_HEIGHT;

// ───────────────────── guards ─────────────────────

/** A silently clamped index draws one box on top of another, and it would look
 *  deliberate. */
function assertIndex(fn: string, index: number, count: number, what: string): void {
  if (!Number.isInteger(index) || index < 0 || index >= count) {
    throw new Error(
      `showcase-trap-geometry: ${fn} was asked for ${what} ${index}, and this stage draws ` +
        `${count} — there is no ${what} ${index}.`,
    );
  }
}

/**
 * The surface's fill must be a whole number of pixels, and this is the only place that can
 * be checked.
 *
 * It is the figure's ENTIRE quantitative claim. A fractional bar is rounded by the
 * browser, differently at different zoom levels, and a room comparing three pixels to two
 * hundred and forty is comparing the one number this slide asks it to trust.
 */
export const SURFACE_FILL_IS_WHOLE: number = (() => {
  if (!Number.isInteger(SURFACE_FILL) || SURFACE_FILL <= 0) {
    throw new Error(
      `showcase-trap-geometry: the surface's fill is ${SURFACE_FILL}px, which is not a whole ` +
        `positive number. METER_HEIGHT (${METER_HEIGHT}) must be a multiple of EFFORT_RATIO ` +
        `(${EFFORT_RATIO}); cut the track, not the ratio.`,
    );
  }
  return SURFACE_FILL;
})();

/**
 * Nothing on this stage may cross the copper rule, and both scenes are checked at module
 * load rather than in a browser.
 */
export const FIGURE_BOTTOM: number = (() => {
  const walls: readonly (readonly [string, number])[] = [
    ["the act line", ACT_LINE_TOP + ACT_LINE_HEIGHT],
    ["the four rows", LAYER_STACK_BOTTOM],
    ["the hollow frame", HOLLOW_TOP + HOLLOW_HEIGHT],
    ["the mark", MARK_TOP + LABEL_HEIGHT],
    ["the recap", RECAP_BOTTOM],
  ];
  let lowest = 0;
  for (const [name, bottom] of walls) {
    if (bottom > RULE_TOP) {
      throw new Error(
        `showcase-trap-geometry: ${name} ends at y=${bottom}, past the copper rule at ` +
          `y=${RULE_TOP}. The thesis band is measured up from the NavBar (${NAV_ZONE_TOP}) ` +
          "and does not move; cut the figure, not the floor.",
      );
    }
    if (bottom > lowest) lowest = bottom;
  }
  return lowest;
})();
