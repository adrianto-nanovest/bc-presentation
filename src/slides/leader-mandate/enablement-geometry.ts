// The enablement model, as numbers — stage coordinates for a 1280×720 stage, and
// FOUR SCENES plus a thesis rather than one accumulating stage.
//
// ═══ WHY THIS FILE EXISTS AT ALL, when `./geometry.ts` next door already held an
// enablement geometry. It held the geometry of a DIFFERENT figure: two columns
// bottoming out on one line over a bordered band, everything on the stage at once,
// argued in four reveals. The 2026-08-14 re-cut replaced that with four exclusive
// scenes — blocks, pillars, tracks, then all three condensed into one frame — and a
// fifth pose that clears the stage for the thesis. Almost nothing survived: the two
// columns are gone, the band is gone, the shared body height they were derived from
// has no consumer. What DID survive is the part K.2 and K.3 import — the stage facts,
// the band padding and the closer shelf those two slides stand on — so `./geometry.ts`
// stays where it is as THE SECTION'S LEDGER and this module holds K.1's own numbers.
// Its header records the split from the other side.
//
// ═══ THE THREE HEROES ARE MUTUALLY EXCLUSIVE AND THE RECAP AND THE THESIS ARE NOT,
// WHICH IS THE ONE THING TO UNDERSTAND BEFORE READING A COORDINATE. The sibling leader
// slides are `step-reveal` in the strict sense — a pose is everything argued so far, and
// nothing that has arrived ever leaves. This one is that for its last two poses only.
//
// Each of the first three poses gets ONE hero and REPLACES the one before it, so the same
// region of stage carries three different figures and the budget below is three budgets
// sharing two shelves (the eyebrow's and the body's top) rather than one stack. The fourth
// pose recaps all three at chip size; the FIFTH LEAVES THAT FRAME EXACTLY WHERE IT IS and
// adds a rule and one line under it (owner's correction, 2026-08-14: the thesis is what the
// recap is for, so it does not replace it).
//
// WHICH GIVES THE RECAP A DIFFERENT FLOOR FROM THE OTHER THREE, and that is the only place
// in this file where the walls are not the same for every scene. The three heroes may run
// down to {@link BODY_BOTTOM}, because the thesis band is never on stage with them. The
// recap may not: it shares pose 4 with the rule, so its floor is {@link RULE_TOP}.
// {@link SCENE_FLOOR_CLEARANCE} checks each scene against its own wall and throws if either
// is crossed.
//
// ═══ THE VERTICAL BUDGET, top to bottom. `.fig-label` sits at y=36 and
// `.slide-headline-row` at y=80; a one-line `.slide-headline.small` is 40px on 1.05,
// so the headline row ends at y=122 and NOTHING AT ALL is painted between there and
// {@link EYEBROW_TOP} = 156.
//
//   156  the pose's own eyebrow · 11px mono caps, one of four                 → 170
//   590  the pose's own bottom line · 19px serif, ONE line — a scene mini-thesis on
//        poses 0…2 and the closer on pose 4, on ONE shelf              → 616
//
//   ─────────────── SCENE 0 · THE BLOCKS (pose 0, alone) ───────────────────────────
//   196  three cards · 376 × 330, gutter 28                                   → 526
//        222  a card's label   · 12.5px mono caps                            → 239
//        258  a card's hairline
//        303  a card's glyph   · 88 square, centred both ways                → 391
//        435  a card's line    · 15px sans, up to three lines                → 498
//
//   ─────────────── SCENE 1 · THE PILLARS (pose 1, alone) ──────────────────────────
//   196  four cards · 278 × 330, gutter 24 — the SAME shelf and the SAME height as
//        scene 0's, so the click between them re-tiles a row and moves nothing else.
//
//   ─────────────── SCENE 2 · THE TRACKS (pose 2, alone) ───────────────────────────
//   200  row 0 · full width × 104, pitch 120                                 → 304
//   320  row 1                                                               → 424
//   440  row 2                                                               → 544
//        · a row's mark 44 square inside its own left padding
//        · +16 the name · +40 the lane bar, 14 thick · +64 the line
//
//   ─────────────── SCENE 3 · THE WHOLE MODEL (poses 3 AND 4) ──────────────────────
//   196  three column heads · 10.5px mono caps                               → 209
//   222  chip row 0 · 52 tall, pitch 68 — three columns of 356, gutter 58
//   290  chip row 1
//   358  chip row 2
//   426  chip row 3 · the pillars' column only                               → 478
//        · connectors drawn in the 58px gutter between column 1 and column 2
//        · a hairline divider down the middle of the gutter between 2 and 3
//
//   ─────────────── THE FLOOR · THE THESIS (pose 4, UNDER the recap) ───────────────
//   553  copper rule ···· spans the full width                               → 554
//   590  the thesis · 19px serif, full width, ONE line                       → 616
//   ────────────────────────────────────────────────────────────────────────────────
//   floor y=632 · lowest painted box 616 · {@link NAV_ZONE_CLEARANCE} = 16
//   the recap ends at 478, so there is 75px of air between it and the rule.
//
// ═══ THE FLOOR IS DECLARED FIRST AND THE SCENES ARE CHECKED AGAINST IT, which is
// `leader-invest/governance-geometry.ts`'s declaration order and its reason: the
// figure's own bottom edge is compared with the thesis band's top, and a `const` read
// before its declaration is a temporal-dead-zone throw at module load. The thesis
// band is measured UP from the NavBar and does not move; a scene that grew too tall
// is cut, not the floor.
//
// ═══ THE BOTTOM LINE OF THE SLIDE IS ONE SHELF SEEN FOUR TIMES. Poses 0, 1 and 2 each
// close on their own mini-thesis and pose 4 on the closer, all at {@link THESIS_TOP} in the
// same box at the same size. Only the closer gets {@link RULE_TOP}'s copper rule over it,
// because only the closer is about the WHOLE model rather than about the frame above it —
// so the rule is the one geometric thing that separates the four, and a room that has read
// one bottom line knows where to look for the next.
//
// WHICH ALSO SETS THE THREE HEROES' FLOOR. A hero shares its pose with a mini-thesis, so it
// may not reach {@link THESIS_TOP}; the recap shares pose 4 with the RULE, so it may not
// reach {@link RULE_TOP}. Neither wall is {@link BODY_BOTTOM}, which is why that constant
// is now only the outer bound the two tighter walls are checked to be inside.
//
// ═══ THE THESIS SHELF IS 590 AND NOT `./geometry.ts`'s 572, AND THAT IS DELIBERATE
// (owner's call, 2026-08-14: "follow D.4 on the font size and vertical position").
// 590 is the shelf `leader-invest`'s four slides derive from a 16px NavBar clearance
// and a 26px box, and it is the deck's own thesis shelf. `./geometry.ts` keeps 572
// because K.2 and K.3 import it, and their headers argue that the three slides share
// one shelf so "a room watching the deck's own ask jump between two consecutive
// clicks" has nothing to see. THAT ARGUMENT NO LONGER REACHES K.1: its thesis is now
// ALONE on a cleared stage, K.2's closer sits under a full figure three clicks later,
// and the two are never adjacent frames. Moving K.2 and K.3 with it would be a change
// to two slides nobody asked about, so the divergence is recorded here instead of
// being propagated.
//
// Pure data and pure functions. No React, no DOM, no colour. Every number is derived
// where it can be. Importable from bare Node:
//
//   $ node --experimental-strip-types -e \
//       'import("./src/slides/leader-mandate/enablement-geometry.ts")
//          .then(m => console.log(Object.keys(m).length, "exports"))'

/**
 * The section ledger, in TYPE SPACE ONLY — the four stage facts this module restates.
 *
 * PINNED RATHER THAN IMPORTED AS VALUES, which is `governance-geometry.ts`'s idiom and
 * the same trade: a type-only reference is erased at compile time, so this module keeps
 * its bare-Node importability while the compiler still fails if `./geometry.ts` ever
 * changes what a stage is. A runtime `import { STAGE } from "./geometry"` would have
 * been one character shorter and would have coupled this module's load to a module K.2
 * and K.3 also load.
 */
type Ledger = typeof import("./geometry");

/** Content, in TYPE SPACE ONLY — the other end of the pin between this module and the
 *  copy. See {@link BLOCK_COUNT}. */
type EnablementCopy = (typeof import("./content"))["mandateEnablementContent"];

export const STAGE: Ledger["STAGE"] = { width: 1280, height: 720 };

/** The deck's standard side margin, and `.fig-label`'s own left edge — the reference
 *  every box on this slide is measured from. */
export const SIDE_MARGIN: Ledger["SIDE_MARGIN"] = 48;

/** The width every full-bleed box on this stage gets. */
export const CONTENT_WIDTH = STAGE.width - 2 * SIDE_MARGIN;

/** `.nav-zone` is `bottom: 0; height: 88px`. Its top edge is the floor for slide
 *  content: a box under it is a box the presenter's own hover target covers. */
export const NAV_ZONE_TOP = STAGE.height - 88;

// ───────────────────── the counts, pinned to the copy ─────────────────────

/**
 * How many blocks the first scene tiles.
 *
 * TYPED AS THE TUPLE'S OWN `length` AND ASSIGNED THE LITERAL, which is the device that
 * makes a re-cut list a compile error HERE rather than a fourth card drawn off the
 * right edge of the stage. `./content.ts` types `blocks` as `Three<Block>`, so
 * `["length"]` is the literal `3`; writing a fourth block fails on this line, in the
 * module that decides how wide a card is.
 */
export const BLOCK_COUNT: EnablementCopy["blocks"]["length"] = 3;
export const PILLAR_COUNT: EnablementCopy["pillars"]["length"] = 4;
export const TRACK_COUNT: EnablementCopy["tracks"]["length"] = 3;

// ───────────────────── the floor, declared first ─────────────────────

/** What is left between the thesis and the NavBar's hover band: 16px — the number
 *  `leader-invest`'s D.1…D.4 keep, because the thesis is the last thing the room reads
 *  and the closest thing to the edge of the stage. */
export const NAV_ZONE_CLEARANCE = 16;

/** The thesis' box: 26, cut for ONE line of 19px serif on 1.3 (24.70 painted). */
export const THESIS_HEIGHT = 26;

/** 19px — one size over the beat register anywhere else on this stage, which is what a
 *  shelf is for, and `leader-invest`'s own thesis size. It is also UPRIGHT serif and
 *  not the italic K.1 used to close on: an italic sentence alone on a cleared stage
 *  reads as a caption for a picture that is missing. */
export const THESIS_TEXT_SIZE = 19;

/** The thesis' shelf — DERIVED BACKWARDS from the NavBar clearance, exactly as its
 *  four `leader-invest` siblings are. */
export const THESIS_TOP = NAV_ZONE_TOP - NAV_ZONE_CLEARANCE - THESIS_HEIGHT;

export const RULE_HEIGHT = 1;

/** The air between the rule and the sentence it opens for: 36 — D.1's own number.
 *  Wider than any gap inside any scene, because the rule divides the SLIDE rather than
 *  two bands of one figure.
 *
 *  NOT EXPORTED: an input to {@link RULE_TOP} with no outside reader. */
const RULE_TO_THESIS = 36;

export const RULE_TOP = THESIS_TOP - RULE_TO_THESIS - RULE_HEIGHT;

// ───────────────────── the two shelves every scene shares ─────────────────────

/**
 * The eyebrow shelf — 156, `.slide-content`'s own top, and THE 2026-08-14 FIX.
 *
 * IT WAS 134, twelve pixels under a 40px display headline, and the owner's note on it
 * was that the two lines read as one wrapped line. Nothing at all is painted between
 * y=122 (where a one-line `.slide-headline.small` ends) and this shelf, which is the
 * same 34px of air `leader-invest`'s D.1…D.4 and `leader-shape`'s C.4 each cut for the
 * identical complaint. The gap is not a margin anywhere: it is the difference between
 * two numbers, and this comment is the only place it is written down.
 */
export const EYEBROW_TOP = 156;

/** A mono label's box: 14, cut for ONE line of 11px mono caps on 1.3 (14.30 painted). */
export const LABEL_HEIGHT = 14;

/** Every eyebrow on this stage: 11px at 0.16em, `--copper-400`. The register
 *  `leader-invest`'s four slides put their mono line in, and the tracking that keeps a
 *  30-character eyebrow from reading as a second headline. */
export const LABEL_SIZE = 11;
export const LABEL_TRACKING = 0.16;

/** The air under the eyebrow before a scene starts: 26. Wider than any gap INSIDE a
 *  card, so the eyebrow reads as a title for the row rather than as its first row. */
const EYEBROW_TO_BODY = 26;

/** Where every scene starts. */
export const BODY_TOP = EYEBROW_TOP + LABEL_HEIGHT + EYEBROW_TO_BODY;

/**
 * The outer bound — what a box on this stage may never cross, whatever pose it is on.
 *
 * NO SCENE IS ACTUALLY CHECKED AGAINST THIS ANY MORE, and that is worth saying plainly
 * rather than leaving a reader to notice. Every pose carries a bottom line, so the three
 * heroes are walled at {@link THESIS_TOP} and the recap at {@link RULE_TOP}, both of which
 * are tighter. This stays because it is the fact those two walls are derived from — the
 * NavBar's hover band is the presenter's own target at every pose — and because
 * {@link SCENE_FLOOR_CLEARANCE} asserts the two tighter walls are inside it.
 */
export const BODY_BOTTOM = NAV_ZONE_TOP - NAV_ZONE_CLEARANCE;

export const BODY_HEIGHT = BODY_BOTTOM - BODY_TOP;

// ───────────────────── scenes 0 and 1 · one card, two tilings ─────────────────────

/**
 * ONE CARD HEIGHT AND ONE CARD SHELF FOR BOTH SCENES, which is the decision that makes
 * the click between them cheap.
 *
 * The blocks and the pillars are two rows of the same object — a label, a rule, a mark
 * and a line — and the only thing that differs is how many of them there are. Given two
 * heights, the click from three cards to four would drop the row's baseline as well as
 * re-tile it, and a room reads that as the stage settling rather than as a list being
 * answered. Given one, the row re-tiles in place: three boxes become four, at the same
 * top and the same bottom, and the connector the recap later draws between them is
 * believable because the two sets have already been seen on one shelf.
 */
export const CARD_TOP = 196;

/**
 * 330, AND THE NUMBER IS THE MINI-THESIS' DOING. It was 296 while the thesis was a pose of
 * its own: the cards bottomed at 492 with the floor at 616, and 124px of unused stage under
 * a card is air nobody notices. Poses 0 and 1 now carry a sentence at
 * {@link THESIS_TOP}, so the gap became 98px of nothing between a row of cards and the line
 * that argues about them — visible, and read as the cards having failed to fill their own
 * scene. 330 closes it to 64, which is within a few pixels of the gap the tracks' three rows
 * leave, so all three heroes breathe the same amount over their own bottom line.
 *
 * IT ALSO BOUGHT THE MARK 16 MORE PIXELS. See {@link GLYPH_SIZE}: the extra height went to
 * the one element on the card whose whole job is to be read from the back row.
 */
export const CARD_HEIGHT = 330;

/** A card's inner padding. Wider than it is tall at the top, because the label sits
 *  against a 1px hairline the room can see and needs air on both sides of it. */
export const CARD_PAD_X = 26;
export const CARD_PAD_Y = 26;

/** A card's own name: 12.5px mono caps on 1.35 (16.88 painted), in a 17px box. Half a
 *  point over the eyebrow that titles the row, because a card's name is the thing the
 *  room's eye lands on and the eyebrow is the thing it read first. */
export const CARD_LABEL_SIZE = 12.5;
export const CARD_LABEL_HEIGHT = 17;

/** The rule between a card's name and its picture. `leader-gap`'s plate cards put one
 *  in the same place for the same reason: it separates what a thing is CALLED from what
 *  it DOES, and it is the one element on the card that brightens with the border under
 *  the pointer. */
export const CARD_HAIRLINE_OFFSET = 62;

/** The mark: 88 square, centred on the card in BOTH axes, and the same 88 in both scenes. A
 *  glyph drawn larger in one scene than the other would rank a block over a pillar.
 *
 *  CENTRED VERTICALLY IN THE BAND BETWEEN THE HAIRLINE AND THE LINE, which is what
 *  {@link CARD_GLYPH_OFFSET} is: 62 (the hairline) plus half of what is left after the
 *  three-line text block and its bottom padding. Stated as a derived number rather than a
 *  chosen one, so a re-cut card height or a fourth text line moves the mark with it. */
export const GLYPH_SIZE = 88;

/** A card's line: 15px sans on 1.4 (21 painted), THREE lines budgeted. */
export const CARD_LINE_SIZE = 15;
export const CARD_LINE_LEADING = 1.4;
export const CARD_LINE_ROWS = 3;
export const CARD_LINE_HEIGHT = Math.round(CARD_LINE_SIZE * CARD_LINE_LEADING * CARD_LINE_ROWS);

/** The air under a card's last line. Two pixels over {@link CARD_PAD_Y} rather than equal to
 *  it, because the text block's own line box already carries descender space at the top and
 *  an equal pad reads as slightly top-heavy. */
const CARD_PAD_BOTTOM = 28;

/** Where a card's line starts — measured UP from the card's own floor, so the three lines
 *  always sit the same distance off the bottom edge whatever the card's height. */
export const CARD_LINE_OFFSET = CARD_HEIGHT - CARD_PAD_BOTTOM - CARD_LINE_HEIGHT;

/** Where a card's mark starts — the middle of the band between the hairline and the line. */
export const CARD_GLYPH_OFFSET = Math.round(
  CARD_HAIRLINE_OFFSET + (CARD_LINE_OFFSET - CARD_HAIRLINE_OFFSET - GLYPH_SIZE) / 2,
);

/** The gutter between two block cards, and between two pillar cards. The pillars get a
 *  tighter one because there are four of them in the same 1184: 28 across three boxes
 *  is 56 of gutter, 24 across four is 72, and holding both at 28 would take 12px off
 *  every pillar card's measure to keep a number the same. */
const BLOCK_GUTTER = 28;
const PILLAR_GUTTER = 24;

export const BLOCK_CARD_WIDTH =
  (CONTENT_WIDTH - (BLOCK_COUNT - 1) * BLOCK_GUTTER) / BLOCK_COUNT;
export const PILLAR_CARD_WIDTH =
  (CONTENT_WIDTH - (PILLAR_COUNT - 1) * PILLAR_GUTTER) / PILLAR_COUNT;

/**
 * A card's text measure — the narrower of the two, and the one the copy budget is cut
 * against.
 *
 * THE PILLARS' CARD IS ALWAYS THE NARROW ONE while there are more pillars than blocks,
 * and this constant does not assume that: it takes the minimum, so a fifth block would
 * move the budget without anybody remembering to.
 */
export const CARD_TEXT_WIDTH = Math.min(BLOCK_CARD_WIDTH, PILLAR_CARD_WIDTH) - 2 * CARD_PAD_X;

/**
 * How many characters a card's line may hold.
 *
 * AN ESTIMATE, AND SAID SO. jsdom computes no text, so nothing measures this at render
 * time; the number is {@link CARD_TEXT_WIDTH} (226px) over ≈7.6px per character — 15px
 * Inter at ≈0.50em, widened for a system fallback — which gives ≈29 per line, times the
 * three lines {@link CARD_LINE_ROWS} budgets, taken down for slack. A fourth line does
 * not overflow a box: it prints under the card's bottom edge, on the stage's own ground,
 * where it reads as a font that failed to load.
 * `tests/unit/mandate-enablement.test.tsx` holds every authored card line against this,
 * so the constraint is enforced on the COPY, where an author can act on it.
 */
export const CARD_LINE_BUDGET_CHARS = 82;

/**
 * Where block card `index` starts.
 *
 * @throws on a card the row does not have. A silently clamped index draws one card on
 *         top of another, and it would look deliberate.
 */
export function blockCardLeft(index: number): number {
  assertIndex("blockCardLeft", index, BLOCK_COUNT, "block card");
  return SIDE_MARGIN + index * (BLOCK_CARD_WIDTH + BLOCK_GUTTER);
}

/** Where pillar card `index` starts. @throws as {@link blockCardLeft} does. */
export function pillarCardLeft(index: number): number {
  assertIndex("pillarCardLeft", index, PILLAR_COUNT, "pillar card");
  return SIDE_MARGIN + index * (PILLAR_CARD_WIDTH + PILLAR_GUTTER);
}

// ───────────────────── scene 2 · the three lanes ─────────────────────

/**
 * A track row, AND IT IS A BOX LIKE EVERY OTHER PIECE OF CONTENT ON THIS SLIDE.
 *
 * IT WAS NOT, IN THE FIRST CUT, and the correction is the owner's rule: every box-shaped
 * piece of content on this stage answers the pointer, and the whole of it does. A bare
 * row of a name over a bar has no rectangle to hover — the presenter would have had
 * three cards and four cards they could point at and three lanes they could not. So the
 * row gets a border, a ground and `.box-hover`, and the mark moves inside it.
 *
 * FULL STAGE WIDTH, because the lane's own width is the figure's claim and a lane inside
 * a column would be measuring itself against a box rather than against the other lanes.
 */
export const TRACK_ROW_TOP = 200;
export const TRACK_ROW_HEIGHT = 104;
export const TRACK_ROW_PITCH = 120;
export const TRACK_PAD_X = 22;
export const TRACK_PAD_Y = 16;

/** The mark beside a lane: 44 square, inside the row's own left padding. Smaller than a
 *  card's {@link GLYPH_SIZE} because it stands beside 1076px of bar rather than over
 *  226px of text — an 88px mark here would out-weigh the lane it belongs to. */
export const LANE_GLYPH_SIZE = 44;

/** The air between the mark and the name beside it. */
const LANE_GUTTER = 20;

/** Where a track row's name, bar and line start, clear of the mark — measured from the
 *  ROW BOX's own left edge, because that is what the component positions against. */
export const LANE_TEXT_X = TRACK_PAD_X + LANE_GLYPH_SIZE + LANE_GUTTER;

/** The widest a lane can be: what is left of the row after the mark and both paddings. */
export const LANE_FULL_WIDTH = CONTENT_WIDTH - LANE_TEXT_X - TRACK_PAD_X;

/** The lane bar's own thickness. Thick enough that the widest lane and the narrowest are
 *  two different objects from the back row, thin enough that three of them do not read
 *  as a bar chart with a missing axis. */
export const LANE_HEIGHT = 14;

// NO `TRACK_NAME_HEIGHT` AND NO `TRACK_LINE_HEIGHT` (removed 2026-08-15). Both were
// exported, both were 18 and 22, and NOTHING read either one — in this file, in
// `./components/EnablementModel.tsx`, in the tests or in the scripts. The track name and
// the track line are the two boxes on this figure that are NOT given a height: they are
// absolutely positioned by their offset and left to flow, which is correct for one line of
// text that may reflow at a different font stack. A height constant nobody applies is a
// second opinion about a box's size that the box has never been told about.
export const TRACK_NAME_SIZE = 13;
export const TRACK_NAME_OFFSET = TRACK_PAD_Y;
export const LANE_BAR_OFFSET = TRACK_PAD_Y + 24;
export const TRACK_LINE_SIZE = 15;
export const TRACK_LINE_OFFSET = TRACK_PAD_Y + 48;

/**
 * How many characters a track line may hold. Looser than the cards' by a wide margin
 * and deliberately so: a track row is nearly full stage width, so one line at 15px over
 * 1120px is ≈145 characters. The budget is set at 100 — comfortably inside one line,
 * and tight enough that a two-line track line still fails the test rather than the eye.
 */
export const LANE_LINE_BUDGET_CHARS = 100;

/**
 * The fraction of the row the NARROWEST lane keeps — measured, not chosen.
 *
 * The longest track name is eight characters of 13px mono at 0.16em ≈ 96px, and the lane
 * under it must be visibly shorter than the lane above without going under its own
 * name. 0.42 of 1120px is 470px, which holds the name many times over and — the half
 * that actually binds — is 325px shorter than the lane above it. A floor of 0.7 would
 * order the lanes so weakly the room would read three equal bars; a floor of 0.2 would
 * make the third lane look like a rounding error rather than a track.
 */
export const NARROWEST_LANE = 0.42;

/**
 * Where track row `index` sits.
 *
 * @throws on a row the scene does not have.
 */
export function trackRowTop(index: number): number {
  assertIndex("trackRowTop", index, TRACK_COUNT, "track row");
  return TRACK_ROW_TOP + index * TRACK_ROW_PITCH;
}

/**
 * How far down the lanes `index` sits — 0 at the first, 1 at the last.
 *
 * THE ONE PROGRESSION, READ BY BOTH ENCODINGS. The lane carries two ordinal facts at
 * once — its WIDTH says fewer people than the lane above, its COLOUR TIER says more
 * depth than the lane above — and both are cut from this fraction. A component that
 * stepped the tier by its own rule while the geometry stepped the width by this one
 * would let the brightest lane stop being the narrowest, which is a figure making two
 * different claims about the same track and looking finished while it does it.
 *
 * @throws on fewer than two lanes — one lane makes no ordinal statement — and on a lane
 *         the figure does not have.
 */
export function laneFraction(index: number, count: number = TRACK_COUNT): number {
  if (!Number.isInteger(count) || count < 2) {
    throw new Error(
      `laneFraction: ${count} lane(s) — the lanes are ORDINAL, so a single lane states ` +
        "nothing and would render as a bar with no comparison.",
    );
  }
  assertIndex("laneFraction", index, count, "lane");
  return index / (count - 1);
}

/**
 * How wide lane `index` is.
 *
 * ORDINAL, AND ONLY ORDINAL. The widths say "fewer people reach this track than the one
 * above it" and nothing more: there is no axis on the stage, no scale, no printed share,
 * and no headcount anywhere in `./content.ts`. That restraint is not decoration — the
 * deck holds NO adoption data for either organisation (§6.5, confirmed on #8), so a lane
 * drawn at "18% of the org" would be a measurement nobody made, printed as geometry,
 * where it is harder to challenge than a sentence would be.
 *
 * SPREAD ACROSS THE COUNT rather than stepped by a fixed amount, so writing a fourth
 * track into `./content.ts` re-cuts the figure and cannot break it.
 */
export function laneWidth(index: number, count: number = TRACK_COUNT): number {
  return LANE_FULL_WIDTH * (1 - laneFraction(index, count) * (1 - NARROWEST_LANE));
}

// ───────────────────── scene 3 · the whole model, in one frame ─────────────────────

/**
 * THREE COLUMNS AND NOT THREE STACKED BANDS, which was the rejected shape and is worth
 * one paragraph.
 *
 * Stacked, the recap would have needed three band titles inside 420px of body, and the
 * connectors between the blocks and the pillars would have had to run VERTICALLY through
 * the space a title wanted. In columns the connectors get a 58px gutter to themselves,
 * the three titles sit on one shelf where the room reads them as a set, and the figure
 * reads left to right — which is the direction the argument runs: this stops us, so we
 * build this, and it reaches these people.
 */
const RECAP_COLUMNS = 3;
export const RECAP_GUTTER = 58;
export const RECAP_COLUMN_WIDTH =
  (CONTENT_WIDTH - (RECAP_COLUMNS - 1) * RECAP_GUTTER) / RECAP_COLUMNS;

/** The three column heads, on one shelf. 10.5px rather than the eyebrow's 11: they are
 *  captions over columns, one tier under the eyebrow that titles the whole frame. */
export const RECAP_HEAD_TOP = 196;
export const RECAP_HEAD_SIZE = 10.5;
export const RECAP_HEAD_HEIGHT = 13;

/** A chip: 52 tall on a 68 pitch. The 16px of air between two chips is where the
 *  connectors land, so it is not slack. */
export const CHIP_TOP = 222;
export const CHIP_HEIGHT = 52;
export const CHIP_PITCH = 68;
export const CHIP_PAD_X = 14;

/** A chip's mark: 26 square. The third size on the slide, and the smallest — a chip is
 *  a reminder of a card the room has already read, so its mark is a reminder too. */
export const CHIP_GLYPH_SIZE = 26;
export const CHIP_LABEL_SIZE = 11.5;

/** The gap between a chip's mark and its name. */
export const CHIP_GLYPH_GAP = 10;

/** Where recap column `index` starts. Column 0 is the blocks, 1 the pillars, 2 the
 *  tracks — the order the argument runs, which is also the order the connectors need.
 *
 *  @throws on a column the frame does not have. */
export function recapColumnLeft(index: number): number {
  assertIndex("recapColumnLeft", index, RECAP_COLUMNS, "recap column");
  return SIDE_MARGIN + index * (RECAP_COLUMN_WIDTH + RECAP_GUTTER);
}

/** Where chip `index` of a recap column sits. The tallest column is the pillars' at
 *  {@link PILLAR_COUNT}, so that is the ceiling every column's rows are checked
 *  against. @throws on a row no column has. */
export function chipTop(index: number): number {
  assertIndex("chipTop", index, PILLAR_COUNT, "recap chip row");
  return CHIP_TOP + index * CHIP_PITCH;
}

/** A chip's own vertical middle — where a connector meets it. */
export function chipCenterY(index: number): number {
  return chipTop(index) + CHIP_HEIGHT / 2;
}

/** The right edge of the blocks' column, where every connector leaves. */
export const CONNECTOR_X0 = recapColumnLeft(0) + RECAP_COLUMN_WIDTH;

/** The left edge of the pillars' column, where every connector arrives. */
export const CONNECTOR_X1 = recapColumnLeft(1);

/**
 * One connector, as an SVG `d` string — from a block chip to the pillar chip that
 * answers it.
 *
 * A CUBIC WITH BOTH HANDLES HORIZONTAL, so the line leaves the block and arrives at the
 * pillar travelling left-to-right and never doubles back. The handles are at 45% of the
 * gutter, which is what keeps four curves crossing the same 58px readable: a straighter
 * line would make the two that share a source overlap for most of their length, and a
 * looser one would push them out of the gutter and under the chips.
 *
 * AUTHORED CAUSE-FIRST — the path starts at the BLOCK. Every draw animation in this
 * figure walks `stroke-dashoffset` from 1 to 0, which paints from the start of the path,
 * so a path authored the other way round would draw four answers reaching back to their
 * problems.
 */
export function connectorPath(fromRow: number, toRow: number): string {
  const y0 = chipCenterY(fromRow);
  const y1 = chipCenterY(toRow);
  const bend = (CONNECTOR_X1 - CONNECTOR_X0) * 0.45;
  return (
    `M ${CONNECTOR_X0} ${y0} ` +
    `C ${CONNECTOR_X0 + bend} ${y0}, ${CONNECTOR_X1 - bend} ${y1}, ${CONNECTOR_X1} ${y1}`
  );
}

/** The hairline between the pillars' column and the tracks'. It falls in the middle of
 *  the second gutter, and it is a DIVIDER and not a connector: the tracks are not caused
 *  by the pillars, they are who the pillars reach. Drawing a fifth curve there would
 *  claim a wiring nobody authored. */
export const RECAP_DIVIDER_X =
  recapColumnLeft(1) + RECAP_COLUMN_WIDTH + RECAP_GUTTER / 2;

/**
 * A recap lane bar, in the tracks' column. Same ordinal rule as {@link laneWidth}, re-cut to what
 * is left of a chip.
 *
 * 120 AND NOT THE CHIP'S OWN MEASURE, which is the one number in this section a reader will want
 * checked. A chip holds a 26px mark, a gap, a name and then this bar, all in one flex row: the
 * widest lane cut from the chip's full 328px inner width would leave nothing for the two things in
 * front of it and the name would be pushed out of the box. 120 leaves the longest track name
 * (eight characters of 11.5px mono at 0.16em ≈ 70px) more than 100px of slack, and — the half that
 * binds — the three bars still come out 120 / 85 / 50, which is visibly the same descent the hero
 * scene draws at nine times the size.
 */
const RECAP_LANE_FULL_WIDTH = 120;

export function recapLaneWidth(index: number, count: number = TRACK_COUNT): number {
  return RECAP_LANE_FULL_WIDTH * (1 - laneFraction(index, count) * (1 - NARROWEST_LANE));
}

export const RECAP_LANE_HEIGHT = 8;

// ───────────────────── the guards ─────────────────────

/**
 * One index check for every accessor above.
 *
 * @throws with the count and the range in the message, because the caller that trips
 *         this is a `map` over a list somebody has just changed, and the useful thing to
 *         print is what the geometry believes the list to be.
 */
function assertIndex(fn: string, index: number, count: number, what: string): void {
  if (!Number.isInteger(index) || index < 0 || index >= count) {
    throw new Error(
      `${fn}: no ${what} ${index} — this figure has ${count} (0…${count - 1}). The tuple ` +
        "in ./content.ts refuses the extra entry first; if it compiled, the count in this " +
        "module is the one that is wrong.",
    );
  }
}

/**
 * How much room the DEEPEST of the four scenes leaves over the NavBar's hover band —
 * asserted at module load rather than trusted.
 *
 * A THROWING IIFE, which is `governance-geometry.ts`'s call for this class of defect. A
 * scene that reaches under the NavBar does not look broken: it looks like a slide whose
 * last row the presenter's own hover target happens to cover, and it is found in a room
 * rather than in a diff. A module that throws paints a blank stage, which is the loudest
 * failure available.
 *
 * @throws if any scene's lowest painted edge is under {@link BODY_BOTTOM}.
 */
export const SCENE_FLOOR_CLEARANCE: number = (() => {
  // EACH SCENE AGAINST ITS OWN WALL — see {@link BODY_BOTTOM}. The three heroes share
  // their poses with a mini-thesis and are walled at its shelf; the recap shares pose 4
  // with the closer's RULE and is walled 37px higher again. Neither wall is the body's
  // floor, and the last line below asserts that both are inside it.
  const scenes: readonly [string, number, number, string][] = [
    ["the blocks", CARD_TOP + CARD_HEIGHT, THESIS_TOP, "its own scene mini-thesis"],
    ["the pillars", CARD_TOP + CARD_HEIGHT, THESIS_TOP, "its own scene mini-thesis"],
    [
      "the tracks",
      trackRowTop(TRACK_COUNT - 1) + TRACK_ROW_HEIGHT,
      THESIS_TOP,
      "its own scene mini-thesis",
    ],
    [
      "the whole model",
      chipTop(PILLAR_COUNT - 1) + CHIP_HEIGHT,
      RULE_TOP,
      "the closer's rule, which it shares a pose with",
    ],
  ];
  let tightest = Number.POSITIVE_INFINITY;
  for (const [what, bottom, wall, wallName] of scenes) {
    if (bottom > wall) {
      throw new Error(
        `enablement-geometry: "${what}" ends at y=${bottom}, past ${wallName} at y=${wall} ` +
          `(the NavBar band starts at ${NAV_ZONE_TOP} and the deck keeps ` +
          `${NAV_ZONE_CLEARANCE} clear of it). Cut the scene, not the floor.`,
      );
    }
    tightest = Math.min(tightest, wall - bottom);
    if (wall > BODY_BOTTOM) {
      throw new Error(
        `enablement-geometry: "${what}" is walled at y=${wall}, which is itself under the ` +
          `body's floor at y=${BODY_BOTTOM}. The walls are derived from the NavBar band and ` +
          "cannot be looser than it.",
      );
    }
  }
  return tightest;
})();

/**
 * What is left between the thesis and the NavBar — the same number
 * {@link NAV_ZONE_CLEARANCE} declares, RE-DERIVED from the shelf it produced.
 *
 * A tautology today, and the point is that it stays one. The thesis shelf is derived
 * from the clearance; this reads the clearance back out of the shelf, so the day
 * somebody types a literal into {@link THESIS_TOP} the two stop agreeing and the test
 * that compares them fails.
 */
export const THESIS_CLEARANCE = NAV_ZONE_TOP - (THESIS_TOP + THESIS_HEIGHT);
