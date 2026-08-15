// THE SURFACE AND THE SOURCE — stage coordinates for D.2 on a 1280×720 stage.
//
// ═══ WHAT THIS FILE MEASURES. Two columns of one width, a dimension line under each, and a
// sentence shelf that never moves. Three acts tile those two columns; the recap re-tiles the
// same band into three cards. EVERY POSE ENDS ON THE SAME LINE — {@link SCENE_BOTTOM} — and
// that is the 2026-08-16 redraw's whole structural claim.
//
//   ACT 1 · THE PICTURE (pose 0)            ACT 2 · WHAT IS UNDER IT (pose 1)
//
//   ┌ QUARTERLY VIEW ─────┐ ┌ WHAT WE ─┐    ┌ QUARTERLY VIEW ─────┐ ┌ WHAT WE ─┐
//   │  ▁▃▂▅▄█▃            │ │  TYPED   │    │  ▁▃▂▅▄█▃            │ │  TYPED   │
//   └─────────────────────┘ │ › make…  │    └─────────────────────┘ │ › make…  │
//   ┌ · · · · · · · · · · ┐ │          │    ┌ THE SOURCE ─────────┐ │          │
//   ┌ · · · · · · · · · · ┐ │ IT ALSO  │    ┌ THE MEANING ────────┐ │ IT ALSO  │
//   ┌ · · · · · · · · · · ┐ │ BUILDS   │    ┌ THE MATCH ──────────┐ │ BUILDS   │
//   ┌ · · · · · · · · · · ┐ │  …       │    ┌ THE CHECK ──────────┐ │  …       │
//   THIRTY MINUTES          └──────────┘    THIRTY MINUTES  FIVE DAYS└──────────┘
//   ▌────────────────────                   ████████████████████████
//
//   ACT 3 · TWO CHARTS (pose 2)             THE RECAP (poses 3 · 4)
//
//   ┌ QUARTERLY VIEW ─┐ ┌ QUARTERLY VIEW ─┐ ┌ THE CHART ┐┌ THE DATA ┐┌ THE DECISION ┐
//   │  ▁▃▂▅▄█▃        │ │  ▁▃▂▅▄█▃        │ │ ▁▃▂▅▄█▃   ││ ════════ ││ ▁▃▂ │ ▁▃▂    │
//   └─────────────────┘ └─────────────────┘ │           ││ ════════ ││ ┌──┐ │ ·· ·· │
//   ┌ THE SOURCE ─────┐ ┌ · · · · · · · · ┐ │ Fast to   ││ Slow to  ││ Both look    │
//   ┌ THE MEANING ────┐ │   NOTHING       │ │ make.     ││ make…    ││ the same.    │
//   ┌ THE MATCH ──────┐ │   UNDER IT      │ │ How long…?││ Where…?  ││ Who checked…?│
//   ┌ THE CHECK ──────┐ └ · · · · · · · · ┘ └───────────┘└──────────┘└──────────────┘
//   ██████████ FIVE DAYS ▌──────── THIRTY MINUTES
//
// ═══ THE EFFORT LINE IS THE ONLY QUANTITY ON THIS STAGE, AND IT IS ARITHMETIC RATHER THAN
// ILLUSTRATION. The slide prints two of our own measurements — thirty minutes and five days —
// at the two ENDS of one dimension line ({@link investShowcaseTrapContent.surfaceReading} and
// `.sourceReading`, plus the two act eyebrows), and {@link EFFORT_RATIO} is their quotient
// over an eight-hour day: 80. {@link METER_WIDTH} is cut as a multiple of it, so
// {@link SURFACE_FILL} is a whole 6px against 480 and the drawing cannot disagree with the
// strings beside it. A reworded reading that left this file alone fails
// `tests/unit/invest-showcase-trap.test.tsx`.
//
// IT RUNS ACROSS THE STAGE AND NOT UP IT, and that is the redraw's second decision. The
// figure used to stand a 44×240 column in the middle of an otherwise empty right half: the
// ratio was honest and the drawing was a tall empty outline with a sliver nobody could find.
// A 16:9 stage is 1280 wide and 720 tall, so the LONG axis is the one that can carry 1:80 at
// a legible unit — and a horizontal bar filling left to right also reads as elapsed time,
// which is what the quantity actually is. Six pixels against four hundred and eighty is a bar
// a room has to look for, which is the claim.
//
// THE RATIO IS NOT COMPRESSED FOR THE STAGE, and pose 2 draws it TWICE. One dimension line
// per column, at one scale: the chart that paid five days and the chart that paid thirty
// minutes, under two surfaces the room has just failed to tell apart.
//
// THE TEMPO IS THE SECOND ENCODING AND IT LIVES IN `./components/showcase-trap.css`, not
// here — pose 0's chart snaps together and pose 1's four rows draw one at a time while the
// dimension line crawls eighty times its own head start. Nothing in this module times
// anything; see that stylesheet's header for why the two acts run at different speeds and why
// no duration claims to be the ratio.
//
// ═══ THE VERTICAL BUDGET, top to bottom, and it is arithmetic rather than measurement.
// `.fig-label` sits at y=36 and `.slide-headline-row` at y=80; a one-line
// `.slide-headline.small` is 40px on 1.05, so the headline row ends at y=122 and NOTHING AT
// ALL is painted between there and {@link EYEBROW_TOP} = 156.
//
//   156  the pose's own eyebrow · 11px mono caps, one of four               → 170
//        the provenance mark · 9.5px mono caps, RIGHT-aligned on that shelf → 170
//
//   ─────────────── THE SCENE · two columns of 528, poses 0…2 ─────────────────────────
//   196  a plate · 528 × 132 — the hero at x=48, the twin at x=704 (pose 2)  → 328
//        210  its title    · 11px mono caps                                 → 224
//        232  its hairline
//        244  its drawing  · seven bars on a 70px band, baseline 314        → 314
//   340  row 0 · 528 × 30, pitch 34 — FRAMED from pose 0, WRITTEN from pose 1 → 370
//   374  row 1                                                              → 404
//   408  row 2                                                              → 438
//   442  row 3                                                              → 472
//   340  the hollow frame · 528 × 132, dashed, one centred label   (pose 2)  → 472
//   490  the two readings · 11px mono caps, one per end of the line          → 504
//   510  the effort line · 480 × 16, filled from its left edge               → 526
//
//   ─────────────── THE RIGHT COLUMN, poses 0…1 ───────────────────────────────────────
//   196  the prompt card · 528 × 330 — what one prompt was, and what else it makes → 526
//
//   ─────────────── THE RECAP (poses 3 AND 4) ─────────────────────────────────────────
//   196  three cards · 368 × 330, gutter 40                                  → 526
//        220  a card's label      · 11px mono caps                           → 234
//        248  a card's hairline
//        272  a card's thumbnail  · 328 × 140, the act it recaps, drawn small → 412
//        436  a card's finding    · 13px sans, up to two lines               → 472
//        480  a card's question   · 15px serif, ONE line                     → 501
//
//   ─────────────── THE FLOOR · ONE SHELF, FIVE TENANTS ───────────────────────────────
//   553  copper rule ···· spans the full width                    (pose 4)   → 554
//   590  the pose's own sentence · 19px serif, full width, ONE line          → 616
//   ───────────────────────────────────────────────────────────────────────────────────
//   floor y=632 · lowest painted box 616 · {@link NAV_ZONE_CLEARANCE} = 16
//
// ═══ THE SENTENCE SHELF CARRIES EVERY POSE, AND THAT IS WHY THE STAGE HAS NO HOLE IN IT.
// The figure used to print its act line at y=502 and stop, which left 104 pixels of black
// between the lowest painted thing and the NavBar on three poses and 174 on a fourth. One
// shelf at {@link SENTENCE_TOP} with five tenants fixes both ends of that complaint: the
// bottom of the stage is occupied at every pose, and the room's eye never hunts for the
// pose's conclusion when the drawing changes. The RULE is still the finale's own mark — it
// arrives at pose 4 only, which is the register D.1, D.3, D.4 and D.5 all use — and the 37px
// between it and the sentence is the gap it was always going to land in.
//
// ═══ THE FLOOR IS THE HOVER BAND AND NOT `.slide-content`'s BOTTOM — the rule every
// geometry module in this directory keeps. `.nav-zone` is `bottom: 0; height: 88px`, so
// nothing on this stage may cross y=632.
//
// ═══ THE RIGHT COLUMN IS ONE REGION WITH TWO TENANTS, and that is a composition decision
// rather than a saving. The prompt card occupies exactly the rectangle the twin column later
// takes, so pose 2 does not add an object beside the argument — it REPLACES the thing that
// made the picture with a second picture that was made the same way and paid for nothing
// else. Two tenants in one region is also why `./components/ShowcaseTrapBeats.tsx` mounts
// them conditionally instead of gating them: two gated scenes in one rectangle cross-fade
// into each other.
//
// ═══ THE FOUR ROWS ARE FRAMED BEFORE THEY ARE WRITTEN, and that is the redraw's third
// decision. At pose 0 the four frames are already on the stage in {@link TIER}'s dimmest
// copper, holding the exact band pose 1 will write into. A room reads them as ruling on a
// page and looks straight past them — and then pose 1 says "not one of them shows" while
// they light up under a chart the room has been admiring for a minute. Nothing moves between
// those two poses: the frames gain light and gain text, which is §7.1 exactly.
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
 * This slide's copy, as a TYPE only — the other end of the three count pins
 * ({@link LAYER_COUNT}, {@link QUESTION_COUNT}, {@link DELIVERABLE_COUNT}). Type-space
 * again: bare Node cannot load that module at all (its `@/` runtime import is the point of
 * it), and this reference does not ask it to.
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

// ───────────────────── the three counts, pinned to the copy ─────────────────────

/**
 * Four rows under the chart, and the TYPE says so.
 *
 * TYPED AS THE TUPLE'S OWN `length` AND ASSIGNED THE LITERAL, which is the device that
 * makes a re-cut list a compile error HERE rather than a fifth row drawn through the
 * dimension line. `./content.ts` types `layers` as `Four<HiddenLayer>`, so `["length"]` is
 * the literal `4`; writing a fifth layer fails on this line, in the module that decides how
 * tall the stack is.
 */
export const LAYER_COUNT: ShowcaseTrapCopy["layers"]["length"] = 4;

/** Three questions in the recap, pinned the same way. Three is not a copy edit: one per
 *  act, and a fourth would be a question no pose on this stage proved. */
export const QUESTION_COUNT: ShowcaseTrapCopy["questions"]["length"] = 3;

/** Three things the same prompt also builds, pinned the same way. Three, because the card
 *  that holds them is a concession and not an inventory — a fourth line turns a generous
 *  aside into a list the room starts auditing. */
export const DELIVERABLE_COUNT: ShowcaseTrapCopy["promptBuilds"]["length"] = 3;

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
 */
export const HEADLINE_BUDGET_CHARS = 52;

/** A mono label's box: 14, cut for ONE line of 11px mono caps on 1.3 (14.30 painted). */
export const LABEL_HEIGHT = 14;

/** Every eyebrow on this stage: 11px at 0.16em, `--copper-400` — the register D.1…D.5 and
 *  K.1…K.3 put their mono line in. */
export const LABEL_SIZE = 11;
export const LABEL_TRACKING = 0.16;

/** A sub-label INSIDE a card: 10px at 0.16em. One step under {@link LABEL_SIZE}, because a
 *  heading inside a box may not out-rank the box's own name. */
export const SUBLABEL_SIZE = 10;

/** The air under the eyebrow before a scene starts: 26 — K.1's number. Wider than any gap
 *  INSIDE a box, so the eyebrow reads as a title for the row rather than as its first
 *  row. */
const EYEBROW_TO_BODY = 26;

/** Where every scene starts: 196. */
export const BODY_TOP = EYEBROW_TOP + LABEL_HEIGHT + EYEBROW_TO_BODY;

/** The mark: 9.5px mono at 0.10em — the token register D.4 and D.5 use for a label that is
 *  a footnote rather than a heading. It shares the eyebrow's shelf, RIGHT-aligned, which is
 *  the one place on this stage a second mono line cannot be read as a caption for a drawing
 *  or as a heading for the column under it. */
export const MARK_SIZE = 9.5;
export const MARK_TRACKING = 0.1;
export const MARK_TOP = EYEBROW_TOP;

/** The mark's field: the right 420px of the eyebrow shelf. ≈40 characters at 9.5px on
 *  0.10em is ≈266px, so the field holds it with room and no eyebrow reaches into it. */
export const MARK_WIDTH = 420;
export const MARK_LEFT = CONTENT_RIGHT - MARK_WIDTH;

/** The mark's budget: ≈420px over ≈6.65px per character at 9.5px on 0.10em. */
export const MARK_BUDGET_CHARS = 60;

// ───────────────────── the floor, derived up from the NavBar ─────────────────────

export const NAV_ZONE_CLEARANCE = 16;

/** The sentence's box: 26, cut for ONE line of 19px serif on 1.3 (24.70 painted). */
export const SENTENCE_HEIGHT = 26;

/**
 * ONE REGISTER FOR ALL FIVE SENTENCES: 19px upright serif.
 *
 * The three act lines used to be 17 against the closer's 19, on two different shelves. They
 * share a shelf now, so they share a size — a rectangle whose type changes size between
 * poses reads as a different object arriving, and the whole point of the shelf is that it is
 * the same object saying the next thing.
 */
export const SENTENCE_SIZE = 19;

/** The sentence shelf: 590. DERIVED BACKWARDS from the NavBar clearance, exactly as its
 *  four siblings are. */
export const SENTENCE_TOP = NAV_ZONE_TOP - NAV_ZONE_CLEARANCE - SENTENCE_HEIGHT;

export const RULE_HEIGHT = 1;

/** The air between the rule and the sentence it opens for: 36 — D.1's own number. */
const RULE_TO_SENTENCE = 36;

/** 553. The rule is the FINALE's mark and arrives at pose 4 only. */
export const RULE_TOP = SENTENCE_TOP - RULE_TO_SENTENCE - RULE_HEIGHT;

/** A tautology today, and the point is that it stays one. */
export const SENTENCE_CLEARANCE = NAV_ZONE_TOP - (SENTENCE_TOP + SENTENCE_HEIGHT);

/**
 * How many characters a sentence on the shelf may hold.
 *
 * AN ESTIMATE, AND SAID SO. jsdom computes no text, so nothing measures this at render
 * time; the number is {@link CONTENT_WIDTH} (1184px) over ≈8.9px per character — 19px
 * Source Serif at ≈0.47em, widened for a system fallback — which gives ≈133 on one line,
 * taken down hard for slack because the constraint that matters is ASD-STE100's, not the
 * box's. `tests/unit/invest-showcase-trap.test.tsx` holds every authored line against this,
 * so the limit is enforced on the COPY, where an author can act on it.
 */
export const SENTENCE_BUDGET_CHARS = 80;

// ───────────────────── the two columns ─────────────────────

/**
 * A column: 560 wide.
 *
 * CUT FROM THE TWIN CASE AND FROM THE RATIO, and it has to satisfy both. Two columns plus a
 * gap have to fit inside {@link CONTENT_WIDTH}, which is what makes pose 2 possible — and
 * the hero is drawn at the SAME width in poses 0 and 1 so that the chart the room admires
 * and the chart it later cannot distinguish are the same object at the same size.
 *
 * AND IT IS A WHOLE MULTIPLE OF {@link EFFORT_RATIO}, which is the second constraint and the
 * reason this number is 560 rather than 528. The effort line measures the column it sits
 * under, so it has to BE the column: a line cut to the nearest multiple of eighty inside a
 * column that is not one stops short of the plate and the four rows above it, and a
 * dimension line that does not reach the thing it dimensions reads as a progress bar that
 * has stalled. 560 is 80 × 7, so the line spans its column edge to edge and the picture's
 * own head start is a whole seven pixels.
 */
export const COLUMN_WIDTH = 560;

/** The left column's edge — the content margin, so every box in it is flush with the
 *  headline above it. */
export const LEFT_COL = SIDE_MARGIN;

/** The right column's edge: 704, so its right edge is {@link CONTENT_RIGHT}. */
export const RIGHT_COL = CONTENT_RIGHT - COLUMN_WIDTH;

/** The gap between the two columns: 128 — where the scan travels and nothing else is
 *  drawn. Re-derived so a re-cut column moves it. */
export const COLUMN_GAP = RIGHT_COL - (LEFT_COL + COLUMN_WIDTH);

/** Kept under the names the figure used before the redraw, because they name the two
 *  PLATES rather than the two columns and both readings are still true. */
export const PLATE_WIDTH = COLUMN_WIDTH;
export const HERO_LEFT = LEFT_COL;
export const TWIN_LEFT = RIGHT_COL;

// ───────────────────── the plate, and the chart inside it ─────────────────────

/** A plate: 132 tall. */
export const PLATE_HEIGHT = 132;

/** Both plates sit on {@link BODY_TOP}. */
export const PLATE_TOP = BODY_TOP;

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

/** The band the bars are laid out in: the plate, less its own padding. */
const CHART_BAND_WIDTH = COLUMN_WIDTH - 2 * PLATE_PAD;

/**
 * A bar's slot and a bar's width, DERIVED FROM THE PLATE rather than chosen.
 *
 * A RE-CUT COLUMN MUST NOT LEAVE THE CHART LOPSIDED. These were two literals cut for a
 * 528 plate, and widening the column to 560 left 64px of air on the chart's right and 26 on
 * its left — a specimen that reads as a chart with a missing eighth bar. Seven slots across
 * the band, each half bar and half air, put the same margin on both ends whatever the
 * column is next cut to.
 */
export const BAR_PITCH = Math.floor(CHART_BAND_WIDTH / BAR_COUNT);
export const BAR_WIDTH = Math.round(BAR_PITCH / 2);

/** Where the first bar's slot starts inside its plate. */
const BAR_INSET = PLATE_PAD + Math.round((BAR_PITCH - BAR_WIDTH) / 2);

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
  return plateLeft + BAR_INSET + index * BAR_PITCH;
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

export const LAYER_HEIGHT = 30;
export const LAYER_PITCH = 34;

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
  COLUMN_WIDTH - 2 * LAYER_PAD_X - LAYER_LABEL_WIDTH - LAYER_LABEL_GAP;

/** A row's sentence budget: ≈374px over ≈6.6px per character at 13px, one line, taken
 *  down for slack. */
export const LAYER_LINE_BUDGET_CHARS = 52;

/** The top of row `index`, absolute. */
export function layerTop(index: number): number {
  assertIndex("layerTop", index, LAYER_COUNT, "layer");
  return LAYER_TOP + index * LAYER_PITCH;
}

/** Where the stack ends: 472. */
export const LAYER_STACK_BOTTOM = layerTop(LAYER_COUNT - 1) + LAYER_HEIGHT;

// ───────────────────── the hollow frame under the twin ─────────────────────

/** The twin's frame occupies exactly the band the four rows occupy — same top, same
 *  bottom — so pose 2 is a comparison of two equal rectangles and not of a tall thing
 *  against a short one. */
export const HOLLOW_TOP = LAYER_TOP;
export const HOLLOW_HEIGHT = LAYER_STACK_BOTTOM - LAYER_TOP;

// ───────────────────── the effort line, one per column ─────────────────────

/** Thirty minutes, as the reading beside it prints it. */
export const SURFACE_MINUTES = 30;

/** Five days, as the reading beside it prints it. */
export const SOURCE_DAYS = 5;

/** A working day, and it is the one assumption this figure makes out loud. Five CALENDAR
 *  days would be 240 and the drawing would overstate our own claim; eight hours is the
 *  reading that is fair to the room. */
export const WORKDAY_HOURS = 8;

/**
 * 80 — the whole quantity on this stage.
 *
 * Five days of eight hours is 2,400 minutes, against thirty. Written as the quotient of
 * the three constants above rather than as `80`, so a reworded reading moves the drawing
 * instead of contradicting it.
 */
export const EFFORT_RATIO = (SOURCE_DAYS * WORKDAY_HOURS * 60) / SURFACE_MINUTES;

/**
 * How many pixels one "thirty minutes" is worth: 7.
 *
 * THE LENGTH IS THE COLUMN AND THE UNIT IS DERIVED, which is the 2026-08-16 correction to
 * this figure's own arithmetic. The line MEASURES the column it sits under — the plate, the
 * four rows and the line are one object seen three ways — so it has to span that column edge
 * to edge or it reads as a bar that stopped. {@link COLUMN_WIDTH} is therefore cut as a
 * multiple of {@link EFFORT_RATIO} and the unit falls out of the division: 560 over 80 is a
 * whole seven, so the browser is never handed a sub-pixel bar to round as it likes.
 */
export const METER_UNIT = COLUMN_WIDTH / EFFORT_RATIO;

/** The line: the column's own width, and a whole multiple of {@link EFFORT_RATIO}. */
export const METER_WIDTH = METER_UNIT * EFFORT_RATIO;

/** Seven pixels. The picture's whole cost, drawn to the same scale as the data's. */
export const SURFACE_FILL = METER_UNIT;

/** The line: 16 tall. */
export const METER_HEIGHT = 16;

/** The two readings sit ABOVE the line, one per end, so each figure is beside the mark it
 *  measures rather than under a bar that has covered it. */
export const READING_TOP = 490;
export const READING_HEIGHT = LABEL_HEIGHT;

/** 510. */
export const METER_TOP = READING_TOP + READING_HEIGHT + 6;

/** Where the scene ends, on EVERY pose: 526. */
export const SCENE_BOTTOM = METER_TOP + METER_HEIGHT;

/** The extension ticks that tie each reading to the point on the line it names — 1px, from
 *  the reading's foot to the line's head. A dimension line without them is a bar with two
 *  captions; with them it is a measurement. */
export const TICK_TOP = READING_TOP + READING_HEIGHT;
export const TICK_HEIGHT = METER_TOP - TICK_TOP;

/** The x of the head reading's tick, for a column whose left edge is `colLeft`: the point
 *  the picture's own cost reaches. */
export function meterHeadTick(colLeft: number): number {
  return colLeft + SURFACE_FILL;
}

/** The x of the foot reading's tick: the line's far end. */
export function meterFootTick(colLeft: number): number {
  return colLeft + METER_WIDTH;
}

/** A reading's field: 240px, which at 11px mono on 0.16em holds ≈34 characters — twice the
 *  longest either reading prints. */
export const READING_WIDTH = 240;

// ───────────────────── the prompt card ─────────────────────

/**
 * The right column's first tenant: 528 × 330, poses 0 and 1.
 *
 * IT IS THE CONCESSION, DRAWN. The slide's whole risk is a room that hears "the picture is
 * worthless"; this card says the opposite in the room's own terms — one line of typing, and
 * three more finished-looking things it also makes. A board that has approved work on
 * exactly this evidence is not being corrected here, it is being agreed with, and the
 * agreement has to be on the stage before pose 1 is allowed to say what it costs.
 */
export const PROMPT_TOP = BODY_TOP;
export const PROMPT_HEIGHT = SCENE_BOTTOM - PROMPT_TOP;
export const PROMPT_LEFT = RIGHT_COL;
export const PROMPT_WIDTH = COLUMN_WIDTH;

export const PROMPT_PAD_X = 24;

/** What is left inside the card for text: 480. */
export const PROMPT_TEXT_WIDTH = PROMPT_WIDTH - 2 * PROMPT_PAD_X;

/** Offsets inside the card, relative to its own top. */
export const PROMPT_LABEL_OFFSET = 24;
export const PROMPT_HAIRLINE_OFFSET = 52;
export const PROMPT_LINE_OFFSET = 76;
export const PROMPT_BUILDS_LABEL_OFFSET = 132;
export const PROMPT_BUILDS_FIRST_OFFSET = 158;
export const PROMPT_BUILDS_PITCH = 30;
export const PROMPT_FOOT_RULE_OFFSET = 268;
export const PROMPT_FOOT_OFFSET = 288;

/** The typed line: 14px mono, and it is the one string on this stage set in the register a
 *  room reads as a terminal rather than as prose. */
export const PROMPT_LINE_SIZE = 14;

/** A thing the same prompt also builds: 14px sans. */
export const PROMPT_BUILD_SIZE = 14;

/** The card's own closing line: 15px serif, one size under the shelf's 19. */
export const PROMPT_FOOT_SIZE = 15;

/** The chevron drawn in front of the typed line, and the gap after it. */
export const PROMPT_CHEVRON_WIDTH = 18;

/** ≈480px over ≈8.4px per character at 14px mono on 0.02em, less the chevron. */
export const PROMPT_LINE_BUDGET_CHARS = 46;

/** ≈480px over ≈7.1px per character at 14px sans, one line, cut hard for slack. */
export const PROMPT_BUILD_BUDGET_CHARS = 40;

/** ≈480px over ≈7.1px per character at 15px serif, one line. */
export const PROMPT_FOOT_BUDGET_CHARS = 46;

/** The top of build line `index`, relative to the card's own top. */
export function promptBuildTop(index: number): number {
  assertIndex("promptBuildTop", index, DELIVERABLE_COUNT, "deliverable");
  return PROMPT_BUILDS_FIRST_OFFSET + index * PROMPT_BUILDS_PITCH;
}

// ───────────────────── the recap ─────────────────────

/** The three cards sit on {@link BODY_TOP} and end on {@link SCENE_BOTTOM}, the same band
 *  the two columns use — so the click from pose 2 to pose 3 re-tiles the stage and moves no
 *  shelf, no top edge and no bottom edge. */
export const BOX_TOP = BODY_TOP;
export const BOX_HEIGHT = SCENE_BOTTOM - BOX_TOP;

const BOX_GUTTER = 40;

/** 368 — three cards and two gutters across {@link CONTENT_WIDTH}. */
export const BOX_WIDTH = Math.round(
  (CONTENT_WIDTH - (QUESTION_COUNT - 1) * BOX_GUTTER) / QUESTION_COUNT,
);

export const BOX_PAD_X = 20;

/** The left edge of card `index`. */
export function boxLeft(index: number): number {
  assertIndex("boxLeft", index, QUESTION_COUNT, "question");
  return SIDE_MARGIN + index * (BOX_WIDTH + BOX_GUTTER);
}

/** Where a card's name sits, relative to the card's own top. */
export const BOX_LABEL_OFFSET = 24;

/** Where a card's hairline sits, relative to the card's own top. */
export const BOX_HAIRLINE_OFFSET = 52;

/**
 * The thumbnail: 328 × 140, and it is the ACT it recaps rather than an emblem of it.
 *
 * THE RECAP USED TO CARRY THREE 88px PICTOGRAMS — a bar chart, four lines, two squares and
 * a tick — and each one was an abstraction of a scene the room had just watched, floating in
 * the middle of a card with air above and below it. A thumbnail of the scene itself does
 * three things a pictogram cannot: it fills the card, it lets the card's finding be read
 * against the thing it is about, and it lets the mark run the SAME motion the act ran, so a
 * room recognises which act it is looking at before it reads the name.
 */
export const THUMB_OFFSET = 76;
export const THUMB_HEIGHT = 140;

/** What is left for a card's text and its thumbnail: 328. */
export const BOX_TEXT_WIDTH = BOX_WIDTH - 2 * BOX_PAD_X;
export const THUMB_WIDTH = BOX_TEXT_WIDTH;

/** Where a card's finding sits, relative to the card's own top. */
export const BOX_FINDING_OFFSET = 240;

/** A finding: 13px sans on 1.4, up to two lines. */
export const BOX_FINDING_SIZE = 13;
export const BOX_FINDING_ROWS = 2;
export const BOX_FINDING_HEIGHT = Math.round(BOX_FINDING_SIZE * 1.4 * BOX_FINDING_ROWS);

/** Where a card's question sits, relative to the card's own top. */
export const BOX_QUESTION_OFFSET = 284;

/** A question: 15px serif on 1.4, ONE line. */
export const BOX_QUESTION_SIZE = 15;
export const BOX_QUESTION_HEIGHT = Math.round(BOX_QUESTION_SIZE * 1.4);

/** A finding's budget: ≈328px over ≈6.6px per character at 13px, two lines, cut hard for
 *  slack — the copy rule is one short sentence, not two lines of one. */
export const BOX_FINDING_BUDGET_CHARS = 56;

/** A question's budget: ≈328px over ≈7.1px per character at 15px, ONE line. A question
 *  that wrapped would be the one wrap on this stage a room could not miss. */
export const BOX_QUESTION_BUDGET_CHARS = 40;

/** Where the recap ends: 526 — {@link SCENE_BOTTOM}, by construction. */
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
 * The picture's fill must be a whole number of pixels, and this is the only place that can
 * be checked.
 *
 * It is the figure's ENTIRE quantitative claim. A fractional bar is rounded by the
 * browser, differently at different zoom levels, and a room comparing six pixels to four
 * hundred and eighty is comparing the one number this slide asks it to trust.
 */
export const SURFACE_FILL_IS_WHOLE: number = (() => {
  if (!Number.isInteger(SURFACE_FILL) || SURFACE_FILL <= 0) {
    throw new Error(
      `showcase-trap-geometry: the picture's fill is ${SURFACE_FILL}px, which is not a whole ` +
        `positive number. COLUMN_WIDTH (${COLUMN_WIDTH}) must be a multiple of EFFORT_RATIO ` +
        `(${EFFORT_RATIO}); cut the column, not the ratio.`,
    );
  }
  return SURFACE_FILL;
})();

/**
 * THE LINE IS THE COLUMN, and this is where that is enforced.
 *
 * A dimension line that stops short of the thing it dimensions is the defect this guard
 * exists for: it shipped once, at 480 inside a 528 column, and it read as a progress bar
 * that had stalled forty-eight pixels from the end. Equality rather than "fits", because
 * "fits" is exactly what was true when it was wrong.
 */
export const METER_SPANS_ITS_COLUMN: number = (() => {
  if (METER_WIDTH !== COLUMN_WIDTH) {
    throw new Error(
      `showcase-trap-geometry: the effort line is ${METER_WIDTH}px under a ` +
        `${COLUMN_WIDTH}px column. The line measures the column, so it has to BE the column ` +
        "— cut COLUMN_WIDTH to a whole multiple of EFFORT_RATIO and let METER_UNIT fall out " +
        "of the division.",
    );
  }
  return METER_WIDTH;
})();

/**
 * EVERY SCENE ENDS ON THE SAME LINE, and nothing on the stage may cross the rule. Both
 * halves are checked here, at module load, because "the stage has a hole in the bottom of
 * it" is exactly the defect a coordinate file can catch and a browser only reports by
 * looking wrong.
 */
export const FIGURE_BOTTOM: number = (() => {
  const walls: readonly (readonly [string, number])[] = [
    ["the four rows", LAYER_STACK_BOTTOM],
    ["the hollow frame", HOLLOW_TOP + HOLLOW_HEIGHT],
    ["the effort line", METER_TOP + METER_HEIGHT],
    ["the prompt card", PROMPT_TOP + PROMPT_HEIGHT],
    ["the recap", RECAP_BOTTOM],
  ];
  let lowest = 0;
  for (const [name, bottom] of walls) {
    if (bottom > RULE_TOP) {
      throw new Error(
        `showcase-trap-geometry: ${name} ends at y=${bottom}, past the copper rule at ` +
          `y=${RULE_TOP}. The sentence shelf is measured up from the NavBar (${NAV_ZONE_TOP}) ` +
          "and does not move; cut the figure, not the floor.",
      );
    }
    if (bottom > lowest) lowest = bottom;
  }
  if (lowest !== SCENE_BOTTOM) {
    throw new Error(
      `showcase-trap-geometry: the lowest scene ends at y=${lowest} and SCENE_BOTTOM is ` +
        `${SCENE_BOTTOM}. Every pose has to bottom out on one line — that is what keeps the ` +
        "stage from opening a hole above the NavBar on the poses that hold less.",
    );
  }
  return lowest;
})();
