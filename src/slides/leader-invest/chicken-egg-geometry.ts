// THE LOCK AND THE TWO ROADS — stage coordinates for D.3 on a 1280×720 stage.
//
// ═══ WHAT THIS FILE MEASURES, AFTER THE 2026-08-14 REDRAW. The slide used to be two columns
// of type: a story on the left, an offer on the right, and no drawn object anywhere on the
// stage. It is now ONE FIGURE IN TWO ACTS, and every number below belongs to one of them.
//
//   ACT 1 · THE LOCK (pose 0)          ACT 2 · THE TWO ROADS (poses 1…3)
//
//        NO BUDGET WITHOUT PROOF            ○ ─────────── the short road ──────────▶ ┐
//        ╭───────────────────────╮          YOU  │    │    │    │                    │
//   ┌────┤                       ├────┐          [term][term][term][term]            │
//   │ BUD│        🔒 (lock)      │PROOF│                                          ┌──┴───┐
//   └────┤                       ├────┘     🔒 ─⊘─────── the long road ─────────▶ │PROOF │
//        ╰───────────────────────╯          │    │    │    │    │                 └──────┘
//        NO PROOF WITHOUT BUDGET            └──  [cost][cost][cost][cost]
//
// ═══ WHY A LOOP AND THEN TWO ROADS, because every coordinate below follows from it. §6.7's
// D.3 is a TRADE told in four beats, and the two things a room has to SEE are (1) that the
// opening condition has no exit — which is what a closed cycle is, and the one shape in this
// deck that says it without a word — and (2) that the expensive route we took and the cheap
// route the room can authorise END IN THE SAME PLACE. Two roads to one destination is the
// whole argument drawn: same end, four costs against four limits, and the second one short.
//
// THE DESTINATION IS `PROOF`, AND THAT IS WHAT CLOSES THE LOOP. Act 1's cycle is BUDGET ⇄
// PROOF; act 2's plate is the PROOF plate, TRANSLATED AND GROWN out of the ring
// ({@link PROOF_HERO_LEFT} → {@link DEST_LEFT}). The room watches the thing the deadlock made
// unobtainable become the thing both roads reach, which is a claim no caption has to make.
//
// ═══ THE VERTICAL BUDGET, top to bottom, and it is arithmetic rather than measurement.
// `.fig-label` sits at y=36 and `.slide-headline-row` at y=80; a one-line
// `.slide-headline.small` is 40px on 1.05, so the headline row ends at y=122 and the figure
// takes the stage from {@link BAND_TOP} = 156 — `.slide-content`'s own top.
//
//   ─────────────── ACT 1 · THE LOCK (pose 0, alone on the stage) ──────────────────────
//   190  clause 0 · 15px mono caps, centred over the top arc              → 214
//   224  the ring's top arc                     (cy 352 − ry 128)
//   316  the two poles · 216×72, each a 26px glyph + its word            → 388
//   480  the ring's bottom arc                  (cy 352 + ry 128)
//   490  clause 1 · centred under the bottom arc                         → 514
//
//   ─────────────── ACT 2 · THE TWO ROADS (poses 1…3) ──────────────────────────────────
//   156  the turn · 17px serif, ONE line, full width          (pose 2)   → 182
//   192  the pilot's eyebrow · 11px mono caps, x=132          (pose 2)   → 206
//   226  THE SHORT ROAD, x=132…1044, and its key token        (pose 2)
//   262  the four terms · 206×36                              (pose 2)   → 298
//   262  the key token's label · x=48, centred on its token   (pose 2)   → 276
//   318  the act · 17px serif, ONE line, full width           (pose 1)   → 344
//   396  THE LONG ROAD, x=132…1044, and its lock token        (pose 1)
//   414  the bill's eyebrow · 11px mono caps, x=132           (pose 1)   → 428
//   434  the four costs · 206×62                              (pose 1)   → 496
//   434  the lock token's label · x=48, centred on its token  (pose 1)   → 448
//   506  the verdict · 17px serif, ONE line                   (pose 1)   → 530
//
//   ─────────────── THE FLOOR · THE THESIS, MEASURED UP FROM THE NAVBAR ────────────────
//   553  copper rule ···· spans the full width                (pose 3)   → 554
//   590  the thesis · 19px serif, full width, ONE line        (pose 3)   → 616
//   ────────────────────────────────────────────────────────────────────────────────────
//   floor y=632 · lowest painted box 616 · {@link NAV_ZONE_CLEARANCE} = 16
//
// ═══ THE FLOOR IS THE HOVER BAND AND NOT `.slide-content`'s BOTTOM — the rule every geometry
// module in this directory keeps. `.nav-zone` is `bottom: 0; height: 88px`, so nothing on this
// stage may cross y=632, and `bottom: 80px` (which `.slide-content` declares) would put a box
// 8px INSIDE the band the presenter's own pointer fades the chrome up over.
//
// ═══ THE THESIS BAND IS D.1's AND D.2's, TO THE PIXEL. {@link NAV_ZONE_CLEARANCE} = 16, a
// 19px thesis in a 26px box, a rule 36px above it. That is not a coincidence and it is not
// this file's decision: §4.5 gives the leader deck ONE thesis shelf, and a room that reads
// three slides in a row wants the last line in the same place every time. It is also the
// half of this redraw the owner asked for by name — the sentence that used to be the LOUDEST
// thing on this stage (26px, two lines, at y=533) is 19px on one line on the floor, and it
// arrives last.
//
// ═══ TWO PROSE LINES ON THE FLOOR AND NOT ONE, WHICH IS A CONSTRAINT AND NOT A PREFERENCE.
// {@link VERDICT_TOP} carries §6.7's beat 3 and {@link THESIS_TOP} carries the deck's closer,
// and the reason they are two boxes is #57's AC: "no pose of the slide ends on beat 2". The
// verdict has to be on the stage in the SAME pose as the bill above it — otherwise a presenter
// resting on pose 1 leaves a room looking at an account of a workaround with the sentence that
// licenses it not yet spoken — and the closer has to be LAST, which is a different pose. One
// box cannot be in two poses. See `./components/ChickenEggBeats.tsx` for the arrival order.
//
// ═══ EVERY ROW ON THIS STAGE SHARES ONE COLUMN GRID. The four costs and the four terms are
// laid out by the same {@link itemLeft}, on the same pitch, at the same width, between the
// same two x — so the bill and the offer are legible AS a comparison: term `i` sits directly
// above cost `i`, four against four, and the eye can travel down. That is the one thing a
// two-column layout of this copy could never say.
//
// Pure data and pure functions. No React, no DOM, and no work at module scope beyond the
// arithmetic below — so it stays importable from bare Node:
//
//   $ node --experimental-strip-types -e \
//       'import("./src/slides/leader-invest/chicken-egg-geometry.ts")
//          .then(m => console.log(Object.keys(m).length, "exports"))'

// ───────────────────── the stage, restated and pinned ─────────────────────

/**
 * The ledger module, as a TYPE only — the pin's other end.
 *
 * `typeof import(…)` is a type-space construct: tsc resolves it, Node's type stripper deletes
 * it, and no runtime import exists to resolve. That is what lets this module hold `./geometry`'s
 * numbers to account without borrowing its resolution problem — no specifier for a `.ts` sibling
 * satisfies both tsc and bare Node under this repo's `tsconfig.json` (`allowImportingTsExtensions`
 * is `false`), which is why the four stage facts below are RESTATED rather than imported.
 */
type Ledger = typeof import("./geometry");

/**
 * This slide's copy, as a TYPE only — the other end of the three count pins
 * ({@link DEADLOCK_CLAUSE_COUNT}, {@link COST_COUNT}, {@link CONSTRAINT_COUNT}). Type-space
 * again: bare Node cannot load that module at all (its `@/` runtime import is the point of it),
 * and this reference does not ask it to.
 */
type ChickenEggCopy = (typeof import("./content"))["investChickenEggContent"];

/**
 * The stage. 1280×720, PINNED to `./geometry.ts`'s own `STAGE`.
 *
 * The annotation is the lock: `./geometry.ts` declares `STAGE` with `as const`, so its type is
 * `{ readonly width: 1280; readonly height: 720 }`, and a stage resized there stops this file
 * compiling. What the pin does NOT do is survive a widened declaration there — the browser
 * harness is the other half, and it measures the stage element rather than reading either
 * module's copy.
 */
export const STAGE: Ledger["STAGE"] = { width: 1280, height: 720 };

/** The deck's side margin — `.fig-label`, `.slide-headline-row` and `.slide-content` all sit at
 *  `left: 48px` in `src/styles/globals.css`. PINNED, like {@link STAGE}. */
export const SIDE_MARGIN: Ledger["SIDE_MARGIN"] = 48;

/** The width every full-bleed box on this stage gets: 1184. Re-derived from the two pinned
 *  facts above rather than pinned itself — `./geometry.ts` computes its own, so its declared
 *  type is the widened `number`, and an annotation of `number` is a check that cannot fail. */
export const CONTENT_WIDTH = STAGE.width - 2 * SIDE_MARGIN;

/** The right edge everything on this stage stops at: 1232. */
export const CONTENT_RIGHT = SIDE_MARGIN + CONTENT_WIDTH;

/** `.nav-zone` is `bottom: 0; height: 88px`, so its top edge is y=632 — the floor for slide
 *  content. Re-derived, not pinned, for the reason {@link CONTENT_WIDTH} gives. */
export const NAV_ZONE_TOP = STAGE.height - 88;

// ───────────────────── the three counts, pinned to the copy ─────────────────────

/**
 * Two clauses, and the TYPE says so — a two-clause cycle is what a deadlock IS.
 *
 * Pinned to `./content.ts`'s tuple through the type-only alias above, so a third clause fails
 * to compile HERE, at the number the figure is drawn from, rather than painting a third label
 * over an ellipse that has two ends.
 */
export const DEADLOCK_CLAUSE_COUNT: ChickenEggCopy["deadlockClauses"]["length"] = 2;

/** §6.7's four costs. Pinned. A fifth is a different argument, not a longer list. */
export const COST_COUNT: ChickenEggCopy["costs"]["length"] = 4;

/** The pilot's four limits. Pinned, and DELIBERATELY EQUAL TO {@link COST_COUNT} — see
 *  {@link ITEM_COUNT}, which is where the two are required to agree. */
export const CONSTRAINT_COUNT: ChickenEggCopy["pilotConstraints"]["length"] = 4;

/**
 * How many columns the item grid has: 4.
 *
 * ONE GRID FOR BOTH ROWS, WHICH IS THE FIGURE'S SHARPEST CLAIM AND ITS ONE FRAGILE JOINT. The
 * bill and the offer are drawn as four boxes each, at one width and one pitch, so a room reads
 * them as a COMPARISON — four things it cost against four things that bound it — rather than as
 * two unrelated lists. That only works while the counts match, so the equality is asserted here
 * instead of assumed: a copy edit that adds a fifth pilot term without a fifth cost stops the
 * build at this line with the reason attached.
 *
 * @throws at module load if the two counts diverge. A geometry module that throws is a blank
 *         stage at first paint, which is the loudest possible failure and exactly the right one:
 *         the alternative is a stage that silently draws five boxes over four.
 */
export const ITEM_COUNT: number = (() => {
  if (COST_COUNT !== CONSTRAINT_COUNT) {
    throw new Error(
      `chicken-egg-geometry: ${COST_COUNT} costs against ${CONSTRAINT_COUNT} pilot terms. ` +
        "The bill and the offer share ONE column grid so the room can read them as four " +
        "against four; unequal counts have no grid. Change the copy or redraw the figure.",
    );
  }
  return COST_COUNT;
})();

// ───────────────────── the floor · the thesis, measured up from the NavBar ─────────────────────
//
// Declared FIRST because the figure's own bottom edge is derived from it — the stage is cut
// from the floor upward, and a `const` read before its declaration is a temporal-dead-zone
// throw at module load, which for a geometry module means a blank stage at first paint.

/** What is left between the thesis and the NavBar's hover band: 16px — the same 16 D.1 and D.2
 *  keep, because the thesis is the last thing the room reads and the closest thing to the edge
 *  of the stage. */
export const NAV_ZONE_CLEARANCE = 16;

/** The thesis' box: 26, cut for ONE line of 19px serif on 1.3 (24.70 line box). */
export const THESIS_HEIGHT = 26;

/** The thesis' shelf: 590. Full width, alone, and as low as the NavBar band allows — DERIVED
 *  BACKWARDS from {@link NAV_ZONE_CLEARANCE}, exactly as its two siblings are. */
export const THESIS_TOP = NAV_ZONE_TOP - NAV_ZONE_CLEARANCE - THESIS_HEIGHT;

/** `.copper-rule` is `height: 1px` in `src/styles/globals.css` — restated, because jsdom
 *  computes no stylesheet and a test that read this box's height off the DOM would read
 *  `NaN`. */
export const RULE_HEIGHT = 1;

/** The air between the rule and the sentence it opens for: 36 — D.1's own number. Wider than
 *  any gap inside the figure, because the rule divides the SLIDE and not two bands of it. */
const RULE_TO_THESIS = 36;

/** The copper rule's shelf: 553. Above it is what happened; below it is the one line this deck
 *  asks the room to leave with. */
export const RULE_TOP = THESIS_TOP - RULE_TO_THESIS - RULE_HEIGHT;

// ───────────────────── the figure's band ─────────────────────

/** Where the figure starts: 156 — `.slide-content`'s own top in `src/styles/globals.css`, and
 *  the shelf the deck declares for content under a headline row. This slide has no eyebrow band
 *  to cross first. */
export const BAND_TOP = 156;

// ───────────────────── act 1 · the lock ─────────────────────

/**
 * The ring: an ELLIPSE at (640, 352), 272 × 128.
 *
 * WIDER THAN IT IS TALL, AND THAT IS THE WHOLE PLACEMENT ARGUMENT. A circle big enough to carry
 * two 216px poles at its extremes would be 544px across AND 544px tall, which does not fit
 * between y=156 and the floor. The ellipse keeps the horizontal reach — the poles land where a
 * room expects two opposed things to be — and spends only 256px of height, which leaves a clause
 * label above the top arc and another under the bottom one INSIDE the band.
 *
 * IT IS NOT A PIE, A DIAL OR A CYCLE-OF-N. Two nodes and two arcs, nothing else on the ring: a
 * deadlock has exactly two participants and any third mark would make it a process.
 */
export const RING_CX = 640;
export const RING_CY = 352;
export const RING_RX = 272;
export const RING_RY = 128;

/** The ring's top and bottom apexes: y=224 and y=480. The two arrowheads sit here — at an
 *  ellipse's apex the tangent is horizontal, so a head placed here points cleanly along the
 *  direction of travel and needs no rotation. */
export const RING_TOP_Y = RING_CY - RING_RY;
export const RING_BOTTOM_Y = RING_CY + RING_RY;

/** A pole: 216 × 72 — one for BUDGET, one for PROOF, centred on the ring's own extremes. Both
 *  are the same box, because the deadlock ranks neither: each one is waiting on the other. */
export const POLE_W = 216;
export const POLE_H = 72;

/** The BUDGET pole's box: centred on (368, 352), so x=260…476, y=316…388. */
export const BUDGET_LEFT = RING_CX - RING_RX - POLE_W / 2;
export const POLE_TOP = RING_CY - POLE_H / 2;

/** The PROOF pole's HERO box: centred on (912, 352), so x=804…1020.
 *
 *  THIS IS THE ONE BOX ON THE STAGE THAT MOVES BETWEEN POSES rather than arriving or leaving.
 *  At pose 1 it travels to {@link DEST_LEFT} and grows into the destination plate — see the
 *  header. Its two placements are declared 200 lines apart on purpose: the transition is
 *  between two independently-argued positions, not a nudge. */
export const PROOF_HERO_LEFT = RING_CX + RING_RX - POLE_W / 2;

/** The pole label's register: 26px display serif, in a 34px box centred in the pole. */
export const POLE_LABEL_SIZE = 26;

/**
 * The glyph that stands to the LEFT of each pole's word: 26px square, 12px clear of the type.
 *
 * TWO GLYPHS, ONE PER POLE, AND THEY ARE THE POLES' OWN NOUNS — a banknote for BUDGET, a signed
 * sheet for PROOF. Act 1's argument is that neither of the two things a division needs can be had
 * without the other, and until the redraw the room had to READ both of them: two words in boxes,
 * with the only drawn object on the stage the padlock between them. A glyph beside each word is
 * the same claim at a glance, in the register the padlock and the key already set in this figure
 * (primitives, not an icon set — see `./components/ChickenEggBeats.tsx`).
 *
 * THE PAIR IS LAID OUT BY FLEXBOX AND NOT BY THIS MODULE, which is why only a size and a gap are
 * declared here. The glyph and the word are centred TOGETHER inside the pole, so the block's own
 * width is whatever the display face sets — a number this module cannot know and must not guess.
 */
export const POLE_GLYPH_SIZE = 26;
export const POLE_GLYPH_GAP = 12;

/** A clause label's box: 24, cut for ONE line of 15px mono caps on 1.5 (22.50 painted). */
export const CLAUSE_HEIGHT = 24;

/** The air between an arc's apex and the clause label outside it: 10. Close enough that the
 *  label reads as the arc's caption and not as a free line of type. */
const ARC_TO_CLAUSE = 10;

/** A clause label's measure: 480, centred on the ring's own centre — x=400…880. Both strings
 *  are 23 characters of 15px mono at 0.18em tracking (≈244px measured), so the box is roughly
 *  double what either needs and neither can wrap. */
export const CLAUSE_W = 480;
export const CLAUSE_LEFT = RING_CX - CLAUSE_W / 2;

/**
 * Clause `index`'s shelf: 190 above the top arc, 490 below the bottom one.
 *
 * OUTSIDE THE RING AND NOT INSIDE IT. The interior is the lock's, and a caption inside an
 * ellipse has to be short enough to clear the curve at its own height — which for these two
 * strings it is not. Outside, each label is simply the arc it belongs to, read in the direction
 * that arc travels.
 *
 * @throws on a clause the copy does not have.
 */
export function clauseTop(index: number): number {
  if (!Number.isInteger(index) || index < 0 || index >= DEADLOCK_CLAUSE_COUNT) {
    throw new Error(
      `clauseTop: no clause ${index} — the deadlock has ${DEADLOCK_CLAUSE_COUNT} ` +
        "(0…1, the cycle's two directions). A third clause is a queue, not a deadlock.",
    );
  }
  return index === 0
    ? RING_TOP_Y - ARC_TO_CLAUSE - CLAUSE_HEIGHT
    : RING_BOTTOM_Y + ARC_TO_CLAUSE;
}

/**
 * The padlock, at the ring's centre: 60 wide, 76 tall (shackle included), centred on (640, 352).
 *
 * THE ONE PICTORIAL GLYPH ON THIS STAGE, and it earns its place by being the only mark that
 * says WHAT the cycle amounts to without a word of English — which for a room that reads slides
 * in its second language is the difference between a diagram and a caption. It is drawn from
 * primitives (a rounded body, an arc for the shackle, a keyhole), not imported: no icon set in
 * this deck ships a lock at a stroke weight that survives projection.
 */
export const LOCK_W = 60;
export const LOCK_H = 76;

// ───────────────────── act 2 · the two roads ─────────────────────

/** Where both roads start and stop: x=132 and x=1044. The left end clears the token that heads
 *  the road ({@link TOKEN_CX} + {@link TOKEN_R} = 122, plus 10px of air); the right end is the
 *  destination plate's own left edge, so an arrowhead lands ON the plate rather than near it. */
export const LANE_LEFT = 132;

/** The two lanes' centre lines: 226 and 396.
 *
 * 170px APART, WHICH IS THE FIGURE'S RANKING. Everything the short road owns lives above y=310
 * and everything the long road owns below y=380, so the stage splits into two readable halves
 * with the act's own sentence in the gap between them. Any closer and the two rows of boxes
 * read as one eight-column table; any further and the long road falls into the thesis band.
 */
export const SHORT_LANE_Y = 226;
export const LONG_LANE_Y = 396;

/** A road's own weight: 2px for the short one, 2px for the long one. Equal, deliberately — the
 *  difference between them is drawn in DASH and COLOUR, never in weight, because a thicker line
 *  would rank one route as more real than the other and both of them happened. */
export const ROAD_WEIGHT = 2;

/**
 * A token: a 32px-radius circle at x=90, on its own lane's centre line. The lock heads the long
 * road, the key heads the short one.
 *
 * 90 AND NOT 94, AND THE FOUR PIXELS ARE THE LABEL'S. A token's caption is centred on it
 * ({@link TOKEN_LABEL_W}), so a symmetric caption box can only be twice the narrower of the two
 * gaps around the token — and at 94 that is 2 × (132 − 94) = 76, which "THE DEADLOCK" fills to
 * within 0.4px (75.25px, measured in Chromium at 9.5px/0.06em). A caption that touches the first
 * box of the bill beside it is the failure this figure has already had once, at a different
 * tier.
 *
 * AT 90 THE TWO CONSTRAINTS LINE UP EXACTLY: the caption box becomes 2 × (132 − 90) = 84, which
 * is {@link SIDE_MARGIN} to {@link LANE_LEFT} — the whole of the room there is — so the same
 * string sits centred with 4.4px of air on BOTH sides and the box lands on the deck's own margin
 * rather than 8px inside it. What it costs is 4px of the air between the token and the lane,
 * which had 6 and now has 10, and nothing else on the stage is measured from this number that is
 * not derived from it ({@link LOCK_TRAVEL_X}, the key, the ban seal's clearance).
 */
export const TOKEN_CX = 90;
export const TOKEN_R = 32;

/** How far the hero lock shrinks to become the long road's token: 0.55.
 *
 *  DERIVED FROM THE TOKEN, NOT CHOSEN: {@link LOCK_W} × 0.55 = 33 and {@link LOCK_H} × 0.55 =
 *  41.8, which sits inside a 64px circle with ≈11px of margin on the narrow axis. The lock is
 *  the ONE object that survives the act change — it does not fade out and fade back in
 *  somewhere else, it travels — so a room that looks away for a second still knows which mark
 *  it is looking at. */
export const LOCK_TOKEN_SCALE = 0.55;

/** How far the hero lock travels to reach the long road's token: (−550, +44). Both are
 *  DIFFERENCES between two placements this file already declares, so re-cutting either end
 *  re-cuts the journey with it — a hard-coded pair here is how a redraw of the ring leaves the
 *  lock landing 30px outside its own token. */
export const LOCK_TRAVEL_X = TOKEN_CX - RING_CX;
export const LOCK_TRAVEL_Y = LONG_LANE_Y - RING_CY;

/**
 * A token label's box: 84 × 14, at x=48…132 — CENTRED ON ITS OWN TOKEN, at x=90.
 *
 * IT WAS LEFT-ALIGNED UNTIL 2026-08-14, and the note here argued for it: both strings are wider
 * than the 64px circle, so a centred label was said to hang past the stage's own margin. THAT IS
 * TRUE ONLY OF A LABEL CENTRED ON A TOKEN THE BOX CANNOT REACH AROUND. Left-aligned, "YOU" —
 * three characters, ≈19px of ink — sits centred at x≈57, THIRTY-THREE PIXELS left of the circle
 * it is the caption for, and reads as a label belonging to the stage edge rather than to the
 * token. That is the defect the owner review named.
 *
 * SO THE BOX IS SYMMETRIC ABOUT {@link TOKEN_CX} AND THE TOKEN MOVED 4px TO MEET IT — see
 * {@link TOKEN_CX}, which carries that argument. The two ends land on the two things that were
 * already there:
 *
 *   left  = TOKEN_CX − W/2 = 48 = {@link SIDE_MARGIN}, the deck's own margin
 *   right = TOKEN_CX + W/2 = 132 = {@link LANE_LEFT}, where the item grid starts
 *
 * MEASURED, NOT ASSUMED: "THE DEADLOCK" sets 75.25px in Chromium at 9.5px/0.06em, so it rests
 * with 4.4px of air on each side. `scripts/d3-figure-verify.mjs` owns both channels that can see
 * this go wrong — `scrollWidth > clientWidth` for the string, and the box's own right edge
 * against {@link LANE_LEFT} for the box.
 */
export const TOKEN_LABEL_W = 2 * (LANE_LEFT - TOKEN_CX);
export const TOKEN_LABEL_LEFT = TOKEN_CX - TOKEN_LABEL_W / 2;
export const TOKEN_LABEL_HEIGHT = 14;

/** How far under its own lane a token's label hangs: 12px clear of the circle's rim. */
export const TOKEN_LABEL_DROP = TOKEN_R + 12;

/**
 * A token label's type: 9.5px mono at 0.10em — the SMALLEST type on this stage, and the only
 * place in this figure that goes to gh#50's mono floor rather than sitting above it.
 *
 * IT IS A WIDTH PROBLEM AND THE MEASUREMENT IS THE REASON. The label has 84px between the stage's
 * own margin and the item grid ({@link TOKEN_LABEL_W}), and the longer of the two strings has to
 * fit it with air on both sides now that it is CENTRED rather than flush left. MEASURED IN
 * CHROMIUM rather than estimated, in JetBrains Mono, whose advance is 0.6em: "THE DEADLOCK" is 12
 * characters, so it sets 12 × (5.70 + tracking) and the whole budget is the tracking. At 0.10em —
 * what this label carried while it was left-aligned — that is 80.0px, which leaves 2px a side. At
 * 0.06em it is 75.25px and leaves 4.4. At 10.5px/0.16em, the tier every other mono label on this
 * stage uses, the same string sets ≈88px and crosses the first cost box, which is what the first
 * render of this figure did.
 *
 * SO THE TRACKING BUYS THE AIR, AND THE SIZE DOES NOT. 9.5px is this deck's mono floor and the
 * label stays on it; what gives is 0.04em of letter-spacing, which is the cheapest thing on the
 * stage to spend — it is invisible at three characters and it is not a legibility floor. Both
 * channels of `scripts/d3-figure-verify.mjs` hold the result: `scrollWidth > clientWidth` on a
 * `nowrap` label is the only check that can see an overflow of a few px, and the box's own right
 * edge against {@link LANE_LEFT} is the only one that can see it hit the grid.
 */
export const TOKEN_LABEL_SIZE = 9.5;
export const TOKEN_LABEL_TRACKING = 0.06;

/** A road label's box: 14, cut for ONE line of 11px mono caps on 1.3 (14.30 painted). */
export const ROAD_LABEL_HEIGHT = 14;

/** The pilot's eyebrow, above the short road: y=192. The widest string in the figure's label
 *  register — "INSTEAD — A 30-DAY PROOF PILOT" measured 270.61px at 11px/0.16em — and it has
 *  the whole lane to run in, so it cannot wrap. */
export const SHORT_LABEL_TOP = 192;

/** The bill's eyebrow, above the long road: y=362 — the same 20px over its own lane that
 *  {@link SHORT_LABEL_TOP} keeps over the other. BOTH ROAD LABELS SIT ABOVE THEIR ROAD, which
 *  leaves the whole band under each road to the boxes that hang off it and gives the two lanes
 *  one grammar: a name over the line, the marks on it, the words under it. */
export const LONG_LABEL_TOP = 362;

// ───────────────────── the destination plate ─────────────────────

/**
 * The plate both roads end on: x=1044…1232, y=192…492.
 *
 * A TALL COLUMN AND NOT A CARD, because it has to be the terminus of two lanes 170px apart. Its
 * left edge is where both arrowheads land, and its height spans from above the short road to
 * below the long one — so the picture reads as two roads arriving at ONE door rather than as two
 * roads arriving at two boxes that happen to be stacked.
 *
 * 188 WIDE IS WHAT IS LEFT, AND IT IS ENOUGH. The item grid needs 890 of the stage
 * ({@link ITEM_PITCH} × 4), the roads start at 132, and the stage stops at 1232. What remains
 * holds a 42px display word and a two-line mono eyebrow with 16px of padding either side.
 */
export const DEST_LEFT = 1044;
export const DEST_W = CONTENT_RIGHT - DEST_LEFT;
export const DEST_TOP = 192;
export const DEST_BOTTOM = 496;
export const DEST_H = DEST_BOTTOM - DEST_TOP;

/** A road label's measure: 912 — the road's own run, from {@link LANE_LEFT} to the destination
 *  plate's left edge. NOT the stage's full {@link CONTENT_WIDTH}: these two boxes start at 132,
 *  so a full-width measure would end at x=1316, 84px past the stage. Neither string can wrap
 *  (both are `nowrap`), so what this width actually decides is whether the box overhangs the
 *  stage — which is a thing a margin check can see and a reader cannot. */
export const ROAD_LABEL_W = DEST_LEFT - LANE_LEFT;

/** The plate's own padding: 16. */
export const DEST_PAD = 16;

/** The plate's eyebrow box: 30, cut for TWO lines of 10.5px mono caps on 1.4 (29.40 painted) —
 *  "WHAT UNLOCKS THE BUDGET" is 23 characters at ≈168px against the 156px this plate leaves,
 *  so it wraps by design and the box is cut for the wrap rather than against it. */
export const DEST_EYEBROW_HEIGHT = 30;

/** The word on the plate: 42px display serif, in a 50px box centred in what the eyebrow leaves.
 *  The largest type on the stage under the headline — this is the thing both roads are for. */
export const DEST_WORD_SIZE = 42;
export const DEST_WORD_HEIGHT = 50;

/**
 * Where the word's box sits inside the POLE: 11 — `(72 − 50) / 2`.
 *
 * DERIVED, AND IT USED TO BE ZERO, which is the whole reason this constant exists. The PROOF word
 * is ONE absolutely-placed box in TWO placements, {@link DEST_WORD_HEIGHT} tall in both, and at
 * the destination it is centred on the plate by arithmetic. At the pole it was pinned to `top: 0`
 * — so a 50px line box sat at the top of a 72px pole and the word rode 11px HIGH of the pole's
 * own middle, out of line with the flex-centred BUDGET beside it. That is the defect the
 * 2026-08-14 owner review caught on the shipped frame, and the fix is arithmetic rather than a
 * nudge: both placements are now centred, each in the box it is centred IN.
 *
 * DECLARED HERE AND NOT BESIDE {@link POLE_LABEL_SIZE}, 170 lines up, because `const` has a
 * temporal dead zone: reading {@link DEST_WORD_HEIGHT} before its own declaration throws at module
 * load, and a geometry module that throws is a blank stage at first paint.
 */
export const POLE_WORD_TOP = (POLE_H - DEST_WORD_HEIGHT) / 2;

// ───────────────────── the item grid · four costs over four terms ─────────────────────

/** The air between two items: 22. Enough that four boxes read as four items rather than as one
 *  table, and little enough that a row reads as one bill. */
export const ITEM_GAP = 22;

/**
 * One item: 206 wide.
 *
 * CUT FOR THE LONGEST STRING IN EITHER ROW, WHICH IS A COST AND NOT A TERM. §6.7's fourth cost —
 * "Usage invisible to the people who later have to approve it", 57 characters — sets ≈2 lines of
 * 13px Inter inside the 184px this width leaves after padding, and every other string in both
 * rows is shorter. The four terms are one line each at the same width, which is why the offer
 * row is 26px shorter than the bill row and not padded out to match it.
 *
 * DERIVED FROM THE LANE, NOT MEASURED INTO IT: the grid spans {@link LANE_LEFT} to the
 * destination plate's left edge less one gap, so moving either end re-cuts the boxes rather than
 * leaving them overlapping the plate. What a browser has to check is the LINE COUNT inside the
 * box, which jsdom cannot see — `scripts/d3-figure-verify.mjs` owns that.
 */
export const ITEM_PITCH = Math.floor((DEST_LEFT - LANE_LEFT) / ITEM_COUNT);
export const ITEM_W = ITEM_PITCH - ITEM_GAP;

/** Every item box's own padding: 11 either side, 12 top and bottom. */
export const ITEM_PAD_X = 11;
export const ITEM_PAD_Y = 12;

/**
 * Item `index`'s left edge: 132, 360, 588, 816.
 *
 * ONE FUNCTION FOR BOTH ROWS — see the header. Term `i` sits directly above cost `i` because
 * both call this, not because two lists happened to be laid out the same way.
 *
 * @throws on a column the grid does not have.
 */
export function itemLeft(index: number): number {
  if (!Number.isInteger(index) || index < 0 || index >= ITEM_COUNT) {
    throw new Error(
      `itemLeft: no column ${index} in a ${ITEM_COUNT}-column grid (0…${ITEM_COUNT - 1}). ` +
        "The bill and the offer share the grid, so a fifth of either needs a fifth of both.",
    );
  }
  return LANE_LEFT + index * ITEM_PITCH;
}

/** Where item `index`'s marker sits ON its road: the column's own centre. The node, the tick
 *  that drops from it and the box under it are one vertical, which is what binds a mark on a
 *  road to the words that price it. */
export function itemCenterX(index: number): number {
  return itemLeft(index) + ITEM_W / 2;
}

/** The four terms: 206 × 36, at y=262 — one line of 13px sans with 12px of padding, hung 36px
 *  under the short road. */
export const TERM_TOP = 262;
export const TERM_HEIGHT = 36;

/** The four costs: 206 × 62, at y=434 — two lines of 13px sans with 12px of padding, hung 38px
 *  under the long road. Two lines, because one of §6.7's four strings needs them and equal boxes
 *  are what make the row a bill rather than four unrelated notes. */
export const COST_TOP = 434;
export const COST_HEIGHT = 62;

/** The item's own text: 13px sans on 1.4. Above gh#50's 10.5px prose floor with room to spare,
 *  and the smallest type on this stage. */
export const ITEM_TEXT_SIZE = 13;

/** A toll node on the long road, and a term node on the short one: 9 and 5. The bill's markers
 *  are the larger pair because each one is an event that happened; a term's is a tick, because a
 *  limit is a property of the road rather than something that befell it. */
export const TOLL_R = 9;
export const TERM_NODE_R = 5;

/** The ban seal, on the long road between the token and the first toll: r=13 at x=180. ONE seal
 *  and not three — "repeatedly" is a word in the copy, and a drawn count would be a quantity this
 *  slide's own copy rule forbids it from asserting (the only quantity D.3 prints is 30-DAY). The
 *  repetition is carried by MOTION instead: the seal re-stamps itself for as long as the slide is
 *  up. See `./components/chicken-egg.css`.
 *
 *  x=168 IS MEASURED AGAINST ITS TWO NEIGHBOURS AND NOT CENTRED BETWEEN THEM. The token's rim is
 *  at 122 and the first toll is at 235; a seal at the midpoint would sit 56px from each, and the
 *  two circles it has to be told apart from are the TOLLS. So it is pushed left, 32px clear of
 *  the token and 67 clear of the nearest toll — and it carries a slash, which no toll does. */
export const BAN_R = 14;
export const BAN_CX = 168;

// ───────────────────── the prose ─────────────────────

/** The three beat lines' register: 17px serif on 1.3 (22.10 line box) in a 26px box. ONE LINE
 *  each, which is a budget and not an observation — the longest of the three is the verdict at
 *  78 characters, ≈718px of a 1000px measure. */
export const BEAT_HEIGHT = 26;
export const BEAT_TEXT_SIZE = 17;

/** Beat 4's turn: y=156, full width, on the figure's own top shelf and directly above the road
 *  it is the caption for. */
export const TURN_TOP = BAND_TOP;

/** Beat 2's act: y=318, in the gap between the two lanes. The one sentence that belongs to
 *  NEITHER road — it is why the long one exists — so it sits between them. */
export const ACT_TOP = 318;

/** Beat 3's verdict: y=506, under the bill it settles. */
export const VERDICT_TOP = 506;

/**
 * THE MEASURE FOR THE TWO BEATS THAT RUN AT THE PLATE'S OWN HEIGHT: 996 — they stop short of
 * the destination rather than running under it.
 *
 * IT WAS `VERDICT_W` AND IT HELD FOR THE WRONG BEAT UNTIL 2026-08-14. The verdict sits at
 * {@link VERDICT_TOP} = 506, and the plate's band is 192 to 496 ({@link DEST_TOP} +
 * {@link DEST_H}) — so the verdict never reached it and the measure was a precaution. The beat
 * that DOES cross the plate is the ACT, at {@link ACT_TOP} = 318, and it was full width.
 *
 * TWO THINGS GO WRONG WHEN A BEAT'S BOX PASSES BEHIND THE PLATE, and only the first was known
 * when this constant was written. A sentence long enough to reach the plate reads as two
 * fragments — that is the typographic half. The other half is that the box is a HIT TARGET the
 * whole of its width, ink or no ink: the act's box lay across the plate from y=318 to y=344 and
 * took every pointer in that band, so the plate lit everywhere except a 26px stripe through the
 * top half of the word PROOF. Capping the measure fixes both at once, which is why the fix is
 * here and not a `pointer-events` rule in the component.
 *
 * THE TURN KEEPS THE FULL WIDTH and does not need this: it ends at 182, ten pixels above the
 * plate's top edge. It is the caption for the road that arrives AT the plate, and a caption cut
 * short of the thing it points at would be the odd one out on the shelf.
 */
export const BEAT_W = DEST_LEFT - ITEM_GAP - SIDE_MARGIN;

/** The thesis' register: 19px serif, full width — D.1's own. */
export const THESIS_TEXT_SIZE = 19;

// ───────────────────── the one check the stage cannot fail quietly ─────────────────────

/**
 * The lowest thing the FIGURE paints: 530, the verdict's own bottom edge.
 *
 * ASSERTED RATHER THAN TRUSTED, because everything above it is a fixed shelf and a fixed shelf
 * is exactly what a later edit moves without arithmetic. If the figure ever grows past the rule,
 * the stage does not overlap subtly at projection scale — it refuses to load.
 *
 * @throws at module load if the figure reaches the thesis band.
 */
export const FIGURE_BOTTOM: number = (() => {
  const bottom = VERDICT_TOP + BEAT_HEIGHT;
  if (bottom > RULE_TOP) {
    throw new Error(
      `chicken-egg-geometry: the figure ends at y=${bottom}, past the copper rule at ` +
        `y=${RULE_TOP}. The thesis band is measured up from the NavBar (${NAV_ZONE_TOP}) and ` +
        "does not move; cut the figure, not the floor.",
    );
  }
  return bottom;
})();
