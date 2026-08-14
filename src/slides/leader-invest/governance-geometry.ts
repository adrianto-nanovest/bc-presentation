// THE THREE DOORS AND THE FOUR SWITCHES — stage coordinates for D.4 on a 1280×720 stage.
//
// ═══ WHAT THIS FILE MEASURES. One slide in two acts, replacing the two slides of type this
// figure was cut from. Every number below belongs to one of the two acts.
//
//   ACT 1 · THE THREE DOORS (pose 0)        ACT 2 · THE FOUR SWITCHES (poses 1…3)
//
//              ┌────────┐                     ┌───────────────┐     ┌───────────────┐
//              │ screen │                     │ audit it      │─○ ─ │               │
//              └───┬────┘                     ├───────────────┤     ├───────────────┤
//          ┌───────┼───────┐              ◯   │ revoke it     │─○ ─ │               │
//       ┌──┴──┐ ┌──┴──┐ ┌──┴──┐          who  ├───────────────┤     ├───────────────┤
//       │door │ │door │ │door │               │ produce it    │─○ ─ │               │
//       └─────┘ └─────┘ └─────┘               ├───────────────┤     ├───────────────┤
//        leaks    kept    never               │ price it      │─○ ─ │               │
//                         moves               └───────────────┘     └───────────────┘
//
// ═══ WHY THREE DOORS AND THEN FOUR SWITCHES, because every coordinate follows from it. The
// argument this slide has to land on a board is that the ACCOUNT decides the contract, and the
// two things a room must SEE are (1) that one screen has three destinations, only one of which
// keeps the data — which is a FAN, the one shape that says "same source, different ends"
// without a word — and (2) that the four things nobody can do today are four SWITCHES that a
// managed seat turns on. A switch is the only picture of governance a board reads instantly:
// it has two states, somebody flips it, and the flip is visible from the back of a room.
//
// THE OBJECT THAT SURVIVES THE ACT CHANGE IS THE DOOR ({@link DOOR_TRAVEL_X}). Act 1's first
// destination is drawn as an open door with something leaving through it; at pose 1 that same
// door travels to the left margin and becomes the token the four rows belong to, and at pose 2
// it SHUTS. The room watches the thing that leaked become the thing that closes, which is a
// claim no caption has to make.
//
// ═══ THE VERTICAL BUDGET, top to bottom, and it is arithmetic rather than measurement.
// `.fig-label` sits at y=36 and `.slide-headline-row` at y=80; a one-line
// `.slide-headline.small` is 40px on 1.05, so the headline row ends at y=122 and the figure
// takes the stage from {@link BAND_TOP} = 156 — `.slide-content`'s own top.
//
//   ─────────────── ACT 1 · THE THREE DOORS (pose 0, alone on the stage) ───────────────
//   156  the screen's eyebrow · 11px mono caps, centred, full width       → 170
//   180  the screen · 148×84, centred on x=640                           → 264
//   306  the bus · one horizontal at y=306, three drops off it
//   344  the three doors · 372×132                                       → 476
//        360  a door's label · 11px mono caps                            → 374
//        384  a door's glyph · 34px square, centred                      → 418
//        426  a door's contract · 13px sans, up to two lines             → 462
//   500  the verdict · 17px serif, ONE line, full width                  → 526
//
//   ─────────────── ACT 2 · THE FOUR SWITCHES (poses 1…3) ──────────────────────────────
//   156  the exposure · 17px serif, ONE line, full width       (pose 1)   → 182
//   198  the two column labels · 11px mono caps                (1 and 2)  → 212
//   220  row 0 · 54 tall, gap 430 | switch 72 | control 430    (1 and 2)  → 274
//   292  row 1                                                            → 346
//   364  row 2                                                            → 418
//   436  row 3                                                            → 490
//   355  the owner token · r=32 at x=90, centred on the row block
//   399  the token's label · 84×14 at x=48, centred on its token          → 413
//   508  the answer · 17px serif, ONE line, full width         (pose 2)   → 534
//
//   ─────────────── THE FLOOR · THE THESIS, MEASURED UP FROM THE NAVBAR ────────────────
//   553  copper rule ···· spans the full width                 (pose 3)   → 554
//   590  the thesis · 19px serif, full width, ONE line         (pose 3)   → 616
//   ────────────────────────────────────────────────────────────────────────────────────
//   floor y=632 · lowest painted box 616 · {@link NAV_ZONE_CLEARANCE} = 16
//
// ═══ THE FLOOR IS THE HOVER BAND AND NOT `.slide-content`'s BOTTOM — the rule every geometry
// module in this directory keeps. `.nav-zone` is `bottom: 0; height: 88px`, so nothing on this
// stage may cross y=632, and `bottom: 80px` (which `.slide-content` declares) would put a box
// 8px INSIDE the band the presenter's own pointer fades the chrome up over.
//
// ═══ THE THESIS BAND IS D.1's, D.2's AND D.3's, TO THE PIXEL. {@link NAV_ZONE_CLEARANCE} = 16,
// a 19px thesis in a 26px box, a rule 36px above it. That is not a coincidence and it is not
// this file's decision: the leader deck has ONE thesis shelf, and a room that reads four slides
// in a row wants the last line in the same place every time.
//
// ═══ ONE COLUMN GRID FOR BOTH HALVES OF ACT 2, AND IT IS THE FIGURE'S SHARPEST CLAIM. Row `i`
// of the deficit and row `i` of the offer are the SAME row — one box, one switch, one box, on
// one centre line — so the room reads a CIRCUIT rather than two lists that happen to be the
// same length. That is the one thing the two columns of type this figure replaced could never
// say: the old stage put four gaps on the left and four capabilities on the right with nothing
// between them, and nothing between them is exactly what the argument is about.
//
// Pure data and pure functions. No React, no DOM, and no work at module scope beyond the
// arithmetic below — so it stays importable from bare Node:
//
//   $ node --experimental-strip-types -e \
//       'import("./src/slides/leader-invest/governance-geometry.ts")
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
 * This slide's copy, as a TYPE only — the other end of the two count pins
 * ({@link DOOR_COUNT}, {@link ROW_COUNT}). Type-space again: bare Node cannot load that module
 * at all (its `@/` runtime import is the point of it), and this reference does not ask it to.
 */
type GovernanceCopy = (typeof import("./content"))["investGovernanceContent"];

/**
 * The stage. 1280×720, PINNED to `./geometry.ts`'s own `STAGE`.
 *
 * The annotation is the lock: `./geometry.ts` declares `STAGE` with `as const`, so its type is
 * `{ readonly width: 1280; readonly height: 720 }`, and a stage resized there stops this file
 * compiling.
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

// ───────────────────── the two counts, pinned to the copy ─────────────────────

/**
 * Three destinations, and the TYPE says so.
 *
 * THREE IS THE ARGUMENT AND NOT A LIST LENGTH. An account is personal, company-managed, or the
 * company's own metal; there is no fourth kind and a fourth column would be a vendor. Pinned to
 * `./content.ts`'s tuple through the type-only alias above, so a fourth destination fails to
 * compile HERE, at the number the fan is drawn from, rather than painting a fourth drop off a
 * bus cut for three.
 */
export const DOOR_COUNT: GovernanceCopy["destinations"]["length"] = 3;

/**
 * Four rows, and the TYPE says so — one per thing nobody can do today.
 *
 * PINNED TO THE DEFICIT AND CHECKED AGAINST THE OFFER. `./content.ts` holds two four-tuples and
 * this figure draws them as ONE four-row circuit, so the two counts have to agree or there is no
 * circuit. The agreement is asserted below rather than assumed.
 */
export const ROW_COUNT: GovernanceCopy["exposures"]["length"] = 4;

/** The offer's own count. Pinned, and DELIBERATELY EQUAL TO {@link ROW_COUNT}. */
export const CONTROL_COUNT: GovernanceCopy["controls"]["length"] = 4;

/**
 * How many rows the circuit has: 4.
 *
 * ONE ROW FOR EACH PAIR, WHICH IS THE FIGURE'S SHARPEST CLAIM AND ITS ONE FRAGILE JOINT. A gap
 * and the control that closes it are the SAME row, wired through one switch, so a room reads a
 * circuit rather than two lists. That only works while the counts match, so the equality is
 * asserted here instead of assumed: a copy edit that adds a fifth control without a fifth gap
 * stops the build at this line with the reason attached.
 *
 * @throws at module load if the two counts diverge. A geometry module that throws is a blank
 *         stage at first paint, which is the loudest possible failure and exactly the right one:
 *         the alternative is a stage that silently wires four switches to five boxes.
 */
export const CIRCUIT_ROWS: number = (() => {
  if (ROW_COUNT !== CONTROL_COUNT) {
    throw new Error(
      `governance-geometry: ${ROW_COUNT} exposures against ${CONTROL_COUNT} controls. ` +
        "Each row is ONE gap wired through ONE switch to the ONE control that closes it; " +
        "unequal counts have no circuit. Change the copy or redraw the figure.",
    );
  }
  return ROW_COUNT;
})();

// ───────────────────── the floor · the thesis, measured up from the NavBar ─────────────────────
//
// Declared FIRST because the figure's own bottom edge is checked against it — the stage is cut
// from the floor upward, and a `const` read before its declaration is a temporal-dead-zone
// throw at module load, which for a geometry module means a blank stage at first paint.

/** What is left between the thesis and the NavBar's hover band: 16px — the same 16 D.1, D.2 and
 *  D.3 keep, because the thesis is the last thing the room reads and the closest thing to the
 *  edge of the stage. */
export const NAV_ZONE_CLEARANCE = 16;

/** The thesis' box: 26, cut for ONE line of 19px serif on 1.3 (24.70 line box). */
export const THESIS_HEIGHT = 26;

/** The thesis' shelf: 590. Full width, alone, and as low as the NavBar band allows — DERIVED
 *  BACKWARDS from {@link NAV_ZONE_CLEARANCE}, exactly as its three siblings are. */
export const THESIS_TOP = NAV_ZONE_TOP - NAV_ZONE_CLEARANCE - THESIS_HEIGHT;

/** `.copper-rule` is `height: 1px` in `src/styles/globals.css` — restated, because jsdom
 *  computes no stylesheet and a test that read this box's height off the DOM would read
 *  `NaN`. */
export const RULE_HEIGHT = 1;

/** The air between the rule and the sentence it opens for: 36 — D.1's own number. Wider than
 *  any gap inside the figure, because the rule divides the SLIDE and not two bands of it. */
const RULE_TO_THESIS = 36;

/** The copper rule's shelf: 553. Above it is what the room is looking at; below it the one line
 *  this deck asks it to leave with. */
export const RULE_TOP = THESIS_TOP - RULE_TO_THESIS - RULE_HEIGHT;

/** The thesis' register: 19px serif, full width — D.1's own. */
export const THESIS_TEXT_SIZE = 19;

// ───────────────────── the figure's band, and the two prose registers ─────────────────────

/** Where the figure starts: 156 — `.slide-content`'s own top in `src/styles/globals.css`, and
 *  the shelf the deck declares for content under a headline row. This slide has no eyebrow band
 *  to cross first. */
export const BAND_TOP = 156;

/** The prose lines' register: 17px serif on 1.3 (22.10 line box) in a 26px box. ONE LINE each,
 *  which is a budget and not an observation — three sentences carry this whole slide and none of
 *  them may wrap. */
export const BEAT_HEIGHT = 26;
export const BEAT_TEXT_SIZE = 17;

/** A mono label's box: 14, cut for ONE line of 11px mono caps on 1.3 (14.30 painted). */
export const LABEL_HEIGHT = 14;

/** Every mono label on this stage except the token's: 11px at 0.16em. The token's is smaller and
 *  says why at {@link TOKEN_LABEL_SIZE}. */
export const LABEL_SIZE = 11;
export const LABEL_TRACKING = 0.16;

/** The list face, both halves of act 2 and all three doors: 13px sans on 1.4. Above gh#50's
 *  10.5px prose floor with room to spare, and the smallest type on this stage. */
export const ITEM_TEXT_SIZE = 13;

// ───────────────────── act 1 · one screen, three doors ─────────────────────

/** The screen's eyebrow: y=156, full width, CENTRED over the screen it names. */
export const SCREEN_EYEBROW_TOP = BAND_TOP;

/**
 * The screen: 148 × 84, centred on the stage at x=640, y=180…264.
 *
 * IT IS THE ONE THING ON THIS SLIDE EVERY PERSON IN THE ROOM HAS ALREADY USED, which is why the
 * figure opens on it rather than on a destination. Drawn as a bezel, a caret and two keys — no
 * brand, no logo, no product: the whole claim of act 1 is that the picture is IDENTICAL whatever
 * account is behind it, and a recognisable interface would make the slide about one vendor.
 */
export const SCREEN_W = 148;
export const SCREEN_H = 84;
export const SCREEN_CX = STAGE.width / 2;
export const SCREEN_TOP = 180;
export const SCREEN_LEFT = SCREEN_CX - SCREEN_W / 2;
export const SCREEN_BOTTOM = SCREEN_TOP + SCREEN_H;

/**
 * The bus: one horizontal at y=306, with a drop from the screen into it and a drop out of it
 * into each door.
 *
 * ORTHOGONAL AND NOT A FAN OF DIAGONALS. Three straight lines from one point read as a beam
 * splitting; a bus with three taps off it reads as a SYSTEM, which is what this is — one input,
 * three routings, decided by configuration and not by the user. It is also the only routing that
 * keeps every drop the same length, so no destination is drawn as nearer than another.
 */
export const BUS_Y = 306;

/** A door: 372 × 132, at y=344…476. Three of them across the full content width with 34px of
 *  air between, so the row starts on the deck's own margin and ends on it. */
export const DOOR_GAP = 34;
export const DOOR_W = (CONTENT_WIDTH - (DOOR_COUNT - 1) * DOOR_GAP) / DOOR_COUNT;
export const DOOR_TOP = 344;
export const DOOR_H = 132;
export const DOOR_BOTTOM = DOOR_TOP + DOOR_H;

/**
 * Door `index`'s left edge: 48, 454, 860.
 *
 * @throws on a door the row does not have.
 */
export function doorLeft(index: number): number {
  if (!Number.isInteger(index) || index < 0 || index >= DOOR_COUNT) {
    throw new Error(
      `doorLeft: no door ${index} in a ${DOOR_COUNT}-door row (0…${DOOR_COUNT - 1}). ` +
        "An account is personal, company-managed, or the company's own metal; a fourth " +
        "column would be a vendor, and this slide asserts no vendor's terms.",
    );
  }
  return SIDE_MARGIN + index * (DOOR_W + DOOR_GAP);
}

/** Where door `index`'s drop leaves the bus, and where its glyph is centred: 234, 640, 1046.
 *  The middle door's centre IS the stage's centre, which is what makes the bus symmetric. */
export function doorCenterX(index: number): number {
  return doorLeft(index) + DOOR_W / 2;
}

/** A door's own padding: 16. */
export const DOOR_PAD = 16;

/** A door's label shelf: 360 — the mono name of the account type. */
export const DOOR_LABEL_TOP = DOOR_TOP + DOOR_PAD;

/**
 * A door's glyph: 38 tall, centred in the box at y=382…420.
 *
 * THE THREE GLYPHS ARE THE ARGUMENT AT A GLANCE — a door ajar with something leaving through it,
 * the same door shut with a badge on it, and a rack that never opens — so the type under them is
 * a caption and not the claim. That is the whole reason this figure exists instead of the
 * three-column table of contract sentences it replaced.
 *
 * 38 AND NOT 34, WHICH IS A MEASUREMENT OFF A RENDERED FRAME. At 34 in a 372×132 card the glyph
 * photographed as a bullet beside its own caption rather than as the card's subject; the
 * DOOR_FRAME_W ratio below is what keeps it a door at the larger size instead of a square.
 */
export const DOOR_GLYPH_SIZE = 38;
export const DOOR_GLYPH_TOP = 382;

/** A door's frame: 28 wide against 38 tall. TALLER THAN IT IS WIDE, because that is the one
 *  proportion that reads as a door and not as a picture frame — and it is the proportion the
 *  token has to survive at 1.15× as well. */
export const DOOR_FRAME_W = 28;
export const DOOR_GLYPH_CY = DOOR_GLYPH_TOP + DOOR_GLYPH_SIZE / 2;

/**
 * A door's contract: 13px sans in a 34px box at y=428, cut for TWO lines and CENTRED in them.
 *
 * EVERY ONE OF THE THREE STRINGS IS TWO SHORT SENTENCES — what happens to the words, then who is
 * in charge — so the three read as one comparison and not as three different kinds of remark.
 *
 * CUT FOR TWO LINES AND CENTRED FOR ONE, which is the compromise a fixed box owes a string that
 * is 49 characters against a 316px measure: all three set ONE line in Chromium today and any of
 * them is one reword away from two. A box cut for one line would clip; a box cut for two with
 * the type flush to its top leaves a card that photographs bottom-heavy. Flex-centring costs
 * nothing and is right at either count.
 */
export const DOOR_TEXT_TOP = 428;
export const DOOR_TEXT_HEIGHT = 34;

/** Beat 1's verdict: y=500, full width, under the three doors it settles. */
export const VERDICT_TOP = 500;

// ───────────────────── act 2 · four rows, one circuit each ─────────────────────

/** The exposure sentence: y=156, on the figure's own top shelf. The one line that turns the
 *  slide from a comparison of contracts into a statement about the room. */
export const EXPOSURE_TOP = BAND_TOP;

/** The two column labels: y=198, one over each column of the circuit. */
export const COLUMN_LABEL_TOP = 198;

/**
 * A row: 54 tall on a 72 pitch, from y=220 — so the four of them run 220…490.
 *
 * 54 AND NOT 62 (D.3's cost box), because every string in both columns is cut for ONE line at
 * this width and D.3's were cut for two. 18px of air between rows is enough that four boxes read
 * as four rows and little enough that a column reads as one list.
 */
export const ROW_TOP = 220;
export const ROW_H = 54;
export const ROW_PITCH = 72;

/**
 * Row `index`'s top edge: 220, 292, 364, 436.
 *
 * ONE FUNCTION FOR BOTH COLUMNS AND THE SWITCH BETWEEN THEM — see the header. Control `i` sits
 * on the same centre line as gap `i` because all three call this, not because three lists
 * happened to be laid out the same way.
 *
 * @throws on a row the circuit does not have.
 */
export function rowTop(index: number): number {
  if (!Number.isInteger(index) || index < 0 || index >= CIRCUIT_ROWS) {
    throw new Error(
      `rowTop: no row ${index} in a ${CIRCUIT_ROWS}-row circuit (0…${CIRCUIT_ROWS - 1}). ` +
        "A gap and the control that closes it share a row, so a fifth of either needs a " +
        "fifth of both.",
    );
  }
  return ROW_TOP + index * ROW_PITCH;
}

/** Row `index`'s centre line — the wire, the switch and both boxes are one horizontal. */
export function rowCenterY(index: number): number {
  return rowTop(index) + ROW_H / 2;
}

/** The row block's own extent: 220…490. Used by the token, which is centred on it. */
export const ROWS_TOP = ROW_TOP;
export const ROWS_BOTTOM = ROW_TOP + (CIRCUIT_ROWS - 1) * ROW_PITCH + ROW_H;

/**
 * The circuit's five columns, left to right, and they add up to the content width exactly:
 *
 *   132 ── gap box 430 ── 562 ─ wire 84 ─ 646 ─ switch 72 ─ 718 ─ wire 84 ─ 802 ── control 430 ── 1232
 *
 * THE TWO WIRES ARE EQUAL AND THAT IS THE POINT. A switch with a longer lead on one side reads
 * as belonging to that side; equal leads make it the JOINT between the two columns, which is
 * what the figure claims it is. The gap box and the control box are equal for the same reason:
 * nothing but colour and content separates a deficit from what closes it, which is exactly
 * enough and is why the two columns can be read as a comparison with no caption saying so.
 *
 * THE LEFT COLUMN STARTS AT 132 AND NOT AT 48, which is the token's 84px ({@link TOKEN_LABEL_W})
 * plus nothing — the same gutter D.3 leaves for the same object.
 */
export const CIRCUIT_LEFT = 132;
export const GAP_W = 430;
export const WIRE_W = 84;
export const SWITCH_W = 72;
export const GAP_LEFT = CIRCUIT_LEFT;
export const SWITCH_LEFT = GAP_LEFT + GAP_W + WIRE_W;
export const CONTROL_LEFT = SWITCH_LEFT + SWITCH_W + WIRE_W;
export const CONTROL_W = GAP_W;

/**
 * The switch: 72 × 26, and the knob throws 46px.
 *
 * A TWO-STATE OBJECT AND NOTHING ELSE. No ticks, no crosses, no traffic lights: the whole reason
 * a switch is on this stage is that a board reads its state from across a room and knows, without
 * being told, that somebody flipped it. `--gv-throw` carries the distance into
 * `./components/governance.css`, which owns the motion; this module owns where the two rest
 * positions are, because they are layout.
 */
export const SWITCH_H = 26;
export const SWITCH_PAD = 4;
export const KNOB_R = 9;
export const KNOB_OFF_CX = SWITCH_LEFT + SWITCH_PAD + KNOB_R;
export const KNOB_ON_CX = SWITCH_LEFT + SWITCH_W - SWITCH_PAD - KNOB_R;
export const SWITCH_THROW = KNOB_ON_CX - KNOB_OFF_CX;

/** A row box's own padding: 14 either side, 12 top and bottom. */
export const ITEM_PAD_X = 14;
export const ITEM_PAD_Y = 12;

/** Beat 3's answer: y=508, full width, under the circuit it explains. */
export const ANSWER_TOP = 508;

// ───────────────────── the owner token · who answers for it ─────────────────────

/**
 * The token: a 32px-radius circle at x=90, centred on the row block at y=355.
 *
 * IT ANSWERS THE FIGURE'S OWN LABEL. The slide is called "where the data goes, and WHO answers
 * for it", and this is the who: at pose 1 an open door with nobody behind it, at pose 2 a shut
 * door with a badge on it. One object, two states, and the four rows hang off it — which is what
 * says the four gaps are one person's absence rather than four unrelated defects.
 *
 * 90 AND NOT 94, AND THE FOUR PIXELS ARE THE LABEL'S — D.3's own derivation, kept because the
 * two slides put the same object in the same gutter and a room reads them ten seconds apart. A
 * symmetric caption box can only be twice the narrower of the two gaps around the token, and at
 * 90 that is 2 × (132 − 90) = 84, which is exactly {@link SIDE_MARGIN} to {@link CIRCUIT_LEFT} —
 * the whole of the room there is.
 */
export const TOKEN_CX = 90;
export const TOKEN_R = 32;
export const TOKEN_CY = (ROWS_TOP + ROWS_BOTTOM) / 2;

/** The token's label: 84 × 14 at x=48…132, CENTRED on the token, 12px clear of its rim. */
export const TOKEN_LABEL_W = 2 * (CIRCUIT_LEFT - TOKEN_CX);
export const TOKEN_LABEL_LEFT = TOKEN_CX - TOKEN_LABEL_W / 2;
export const TOKEN_LABEL_HEIGHT = 14;
export const TOKEN_LABEL_DROP = TOKEN_R + 12;
export const TOKEN_LABEL_TOP = TOKEN_CY + TOKEN_LABEL_DROP;

/**
 * A token label's type: 9.5px mono at 0.10em — the SMALLEST type on this stage, and the only
 * place in this figure that goes to gh#50's mono floor rather than sitting above it.
 *
 * IT IS A WIDTH PROBLEM, AS IT IS ON D.3. The label has 84px between the stage's own margin and
 * the circuit, and the longer of its two strings has to fit with air on both sides now that it
 * is centred. JetBrains Mono's advance is 0.6em, so "NOBODY OWNS IT" — 14 characters — sets
 * 14 × (5.70 + tracking); at 0.10em that is ≈93px and overflows, which is why the two strings
 * are cut to nine characters and under. `scripts/d4-figure-verify.mjs` owns both channels that
 * can see this go wrong: `scrollWidth > clientWidth` for the string, and the box's own right edge
 * against {@link CIRCUIT_LEFT} for the box.
 */
export const TOKEN_LABEL_SIZE = 9.5;
export const TOKEN_LABEL_TRACKING = 0.1;

/**
 * How far the first door travels to become the token, and how much it grows: (−144, −46) at
 * 1.15×.
 *
 * BOTH OFFSETS ARE DIFFERENCES BETWEEN TWO PLACEMENTS THIS FILE ALREADY DECLARES, so re-cutting
 * either end re-cuts the journey with it — a hard-coded pair in a stylesheet is how a redraw of
 * the door row leaves the glyph landing 30px outside its own token.
 *
 * IT GROWS RATHER THAN SHRINKS, which is the opposite of D.3's padlock and is the right way
 * round for this figure. D.3's lock leaves a hero ring and becomes one token among two; this
 * door leaves a row of three and becomes the SUBJECT of everything under it. 34px × 1.15 = 39.1
 * inside a 64px circle leaves ≈12px of margin on the narrow axis.
 */
export const DOOR_TRAVEL_X = TOKEN_CX - doorCenterX(0);
export const DOOR_TRAVEL_Y = TOKEN_CY - DOOR_GLYPH_CY;
export const DOOR_TOKEN_SCALE = 1.15;

// ───────────────────── the one check the stage cannot fail quietly ─────────────────────

/**
 * The lowest thing the FIGURE paints: 534, the answer's own bottom edge.
 *
 * ASSERTED RATHER THAN TRUSTED, because everything above it is a fixed shelf and a fixed shelf
 * is exactly what a later edit moves without arithmetic. If either act ever grows past the rule,
 * the stage does not overlap subtly at projection scale — it refuses to load.
 *
 * BOTH ACTS ARE MEASURED, not just the taller one. Act 1 ends at the verdict (526) and act 2 at
 * the answer (534), and a redraw is as likely to grow the shorter one.
 *
 * @throws at module load if either act reaches the thesis band.
 */
export const FIGURE_BOTTOM: number = (() => {
  const act1 = VERDICT_TOP + BEAT_HEIGHT;
  const act2 = ANSWER_TOP + BEAT_HEIGHT;
  const bottom = Math.max(act1, act2);
  if (bottom > RULE_TOP) {
    throw new Error(
      `governance-geometry: the figure ends at y=${bottom} (act 1 at ${act1}, act 2 at ` +
        `${act2}), past the copper rule at y=${RULE_TOP}. The thesis band is measured up ` +
        `from the NavBar (${NAV_ZONE_TOP}) and does not move; cut the figure, not the floor.`,
    );
  }
  return bottom;
})();
