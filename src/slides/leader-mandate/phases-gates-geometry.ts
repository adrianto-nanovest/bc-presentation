// PHASES AND GATES, as numbers — stage coordinates for a 1280×720 stage.
//
// ═══ RE-CUT 2026-08-15 (owner's call), AND THE RE-CUT IS THIS FILE. What this module
// described was ONE STAGE HOLDING EVERYTHING: a small staircase across the top, four
// phase columns under it, a bordered band under those, and the ask under that — five
// bands of content, thirteen named objects, four poses that only ever ADDED. Three
// complaints retired it, and they are the same three that retired K.1's two-column
// figure a day earlier:
//
//   1. THE STAGE WAS FULL AND NOTHING ON IT WAS BIG. This is a top-management slide,
//      and a staircase drawn at an 18px rise so that four columns and a band could fit
//      under it is a staircase nobody reads from the back row. The slide now spends
//      THREE POSES ON THREE HEROES — the ladder alone at a 52px rise, then the four
//      phases with their dates, then the four gates — and recaps all three in the
//      fourth. Nothing has to share a stage with anything it is not being compared to.
//   2. THE HEADING SHELF WAS y=134, twelve pixels under a 40px display headline, so the
//      room read the title and the first mono line as one wrapped line. {@link
//      EYEBROW_TOP} is 156 now — `.slide-content`'s own top, and the same 34px of air
//      K.1 and `leader-invest`'s D.1…D.4 cut for the identical complaint.
//   3. THE ASK WAS 20px SERIF ITALIC ON A SHELF AT 572, and K.1's is 19px UPRIGHT at
//      590 over a copper rule. Two adjacent slides ended their arguments in two
//      registers. This slide now stands on K.1's shelf; see {@link THESIS_TOP} for what
//      that costs and who still stands on the old one.
//
// ═══ FIVE POSES, and the vertical budget is worked SEPARATELY FOR EACH because the
// heroes are mutually exclusive. Only two things are shared by all five: the eyebrow
// shelf at the top and the thesis shelf at the bottom. Everything between them belongs
// to one pose, which is exactly what makes each pose's own budget generous.
//
// ═══ WHAT IS READ FROM `./geometry.ts` RATHER THAN RE-TYPED. Four constants, and all
// four are facts about the STAGE rather than about any figure: `STAGE`, `SIDE_MARGIN`,
// `CONTENT_WIDTH`, `NAV_ZONE_TOP`. Two copies of a side margin in one directory is
// exactly the drift that produces a slide 4px off its neighbour's edge.
//
// THE BAND CONSTANTS AND THE CLOSER SHELF ARE NO LONGER READ FROM IT, and as of
// 2026-08-15 they are no longer THERE — they were deleted from `./geometry.ts` with the
// band they described. That file argued at length that `CLOSER_TOP` was load-bearing
// BECAUSE K.2 and K.3 are adjacent slides that both ended on a serif-italic ask, and that
// two shelves one edit apart from disagreeing would show a room the deck's own ask jumping
// between two clicks. The argument was right and the answer was not a shared 572: K.1 and
// K.2 are ALSO adjacent, K.1 had already moved to 590 with a rule over it, and a slide
// cannot stand on two shelves. This file followed K.1; K.3 followed one day later. All
// three now derive the same shelf from the NavBar's own floor, so the property those
// constants existed for holds across the whole section without any of them.
//
// Pure data and pure functions. No React, no DOM, no work at module scope beyond the
// arithmetic below.
//
// IT IS NOT BARE-NODE IMPORTABLE, AND THAT IS THE PRICE OF THE IMPORT BELOW — stated
// because sibling geometry modules claim the property and a reader will expect this one
// to. `node --experimental-strip-types -e
// 'import("./src/slides/leader-mandate/phases-gates-geometry.ts")'` fails on
// `./geometry`: bare Node ESM wants the file extension, and `allowImportingTsExtensions`
// is off in `tsconfig.json`, so the specifier cannot carry one. A verification script
// that needs numbers off this stage should read this module through Vite, exactly as
// `scripts/d2-figure-verify.mjs` reads its slide's.
import { CONTENT_WIDTH, NAV_ZONE_TOP, SIDE_MARGIN, STAGE } from "./geometry";

// Re-exported so this figure has ONE geometry import site. The component and the test
// read four shared constants and several dozen local ones, and a file that reached into
// both modules would make "which slide owns this number?" a question a reader has to
// answer per import rather than per module.
export { CONTENT_WIDTH, NAV_ZONE_TOP, SIDE_MARGIN, STAGE };

// ───────────────────── the two shelves every pose shares ─────────────────────

/**
 * Where the headline stops.
 *
 * `.slide-headline-row` is `top: 80px` and `.slide-headline.small` is 40px on 1.05, so
 * the last descender lands at ≈122. NOT A STYLE THIS FILE SETS — it is a measurement of
 * one the stylesheet already made, recorded here because {@link EYEBROW_TOP} is derived
 * from it and the test asserts the clearance rather than trusting the shelf.
 */
export const HEADLINE_BOTTOM = 122;

/**
 * THE EYEBROW SHELF, and the whole of complaint 2 in the header.
 *
 * 156 is `.slide-content`'s own top (`src/styles/globals.css`), so the 34px of air under
 * the headline is the deck's own default rather than a number this slide invented. The
 * shelf it replaced was 134, which left 12px — and 12px under a 40px display line is not
 * air, it is leading, so the room read two lines of one title.
 */
export const EYEBROW_TOP = 156;

/** One line of 11px mono caps at 1.3 (14.30 painted). Every eyebrow on the slide. */
export const LABEL_HEIGHT = 14;
export const LABEL_SIZE = 11;
/** In em. K.1's, and the two slides print the same labels one click apart. */
export const LABEL_TRACKING = 0.16;

/** The air between an eyebrow and the scene it titles. */
const EYEBROW_TO_BODY = 26;

/** Where a scene may start. Derived, so a re-cut eyebrow moves every scene with it. */
export const BODY_TOP = EYEBROW_TOP + LABEL_HEIGHT + EYEBROW_TO_BODY;

/** What is left under the thesis before the NavBar's hover band starts. K.1's number,
 *  and `leader-invest`'s before that. */
export const NAV_ZONE_CLEARANCE = 16;

/** One line of 19px serif at 1.3 (24.7 painted), in a 26px box. */
export const THESIS_HEIGHT = 26;
export const THESIS_TEXT_SIZE = 19;

/**
 * THE THESIS SHELF, derived UPWARD FROM THE FLOOR, and the same one all three slides in
 * this section now stand on.
 *
 * 632 − 16 − 26 = 590, which is `leader-invest`'s thesis register and the shelf K.1 moved
 * to on the owner's call. This slide followed it and K.3 followed one day later, which is
 * why `./geometry.ts` no longer carries a closer shelf at all: the ask cannot stand on two
 * shelves, and it turned out not to need a shared constant to stand on one.
 *
 * EVERY SCENE'S FLOOR IS MEASURED AGAINST THIS AND NOT THE OTHER WAY ROUND, so a
 * reworded gate or a sixth rung cuts the figure and never the ask.
 */
export const THESIS_TOP = NAV_ZONE_TOP - NAV_ZONE_CLEARANCE - THESIS_HEIGHT;

export const RULE_HEIGHT = 1;

/** The air between the copper rule and the thesis under it. K.1's, to the pixel. */
const RULE_TO_THESIS = 36;

/**
 * The rule over the thesis — THE LAST POSE ONLY, and the one geometric mark that
 * separates the deck's closing ask from the three scene lines that stand on the same
 * shelf before it. Rank on this stage is a colour tier; the rule is the exception, and
 * it is spent once.
 */
export const RULE_TOP = THESIS_TOP - RULE_TO_THESIS - RULE_HEIGHT;

/** The floor every scene has to clear. The RULE's shelf and not the thesis' — the recap
 *  shares pose 4 with the rule, so a recap measured against 590 would collide with the
 *  one object that arrives over it. K.1's floor guard makes the same call. */
export const SCENE_FLOOR = RULE_TOP;

// ───────────────────── the counts ─────────────────────

type PhasesGatesCopy = (typeof import("./content"))["mandatePhasesGatesContent"];

/**
 * Four phases and five rungs, PINNED IN TYPE SPACE rather than typed as numbers.
 *
 * `PHASE_COUNT` reads the content module's own tuple length, so a fifth phase is a
 * compile error in the module that TILES the columns rather than a fifth card drawn off
 * the right edge of the stage. `RUNG_COUNT` cannot do the same — the rungs are
 * `gap-capability-ladder`'s and arrive as a `readonly Rung[]` — so it is asserted at
 * module load instead, one screen down, where {@link HERO_TREADS} is cut against it.
 */
export const PHASE_COUNT: PhasesGatesCopy["phases"]["length"] = 4;
export const RUNG_COUNT = 5;

// ───────────────────── scene 0 · the ladder, at hero size ─────────────────────
//
// `gap-capability-ladder`'s staircase, at its own scale and in its own idiom — an SVG
// `<path>` that draws itself in under a `stroke-dashoffset` sweep, over a left-to-right
// copper gradient. §6.5 says that slide and this one are "the same object seen twice",
// and this pose is where the deck finally spends that: same five rungs, same names, same
// display-serif label with a copper level token, same dashed treatment for a step nobody
// has built.
//
// ═══ THE "ZERO <svg> IN THIS DIRECTORY" RULE IS GONE, AND IT WENT BEFORE THIS TICKET.
// This module and `./components/PhaseLadder.tsx` both used to argue that keeping the
// whole of `src/slides/leader-mandate/` free of `<svg>` closed the SMIL question by
// construction. K.1's recap draws four connectors in an `<svg class="svg-layer">`, so
// the property was already lost, and it was lost for the right reason: a curve between
// two boxes is not a rectangle. The rule that survives is the one that was actually
// load-bearing — ZERO SMIL. No `<animate>`, `<animateTransform>`, `<animateMotion>`,
// `<set>` or `<animateColor>` at any pose, because SMIL is invisible to the
// reduced-motion squash in `src/styles/globals.css` and would need a `matchMedia` gate
// at mount. Every mark here is drawn by a CSS animation, which is not and does not.
//
// THE RISE IS 52 AND NOT B.4's 56. That slide's staircase owns its whole stage from the
// headline down; this one starts at an eyebrow shelf 34px lower and still has to leave
// {@link SCENE_FLOOR} clear under an L1 label. 52 × 4 = 208 is what fits, and it is
// close enough that a room an hour later reads the same figure.

/** One tread. `x1` is its left end, `x2` its right, `y` its height on the stage. */
export interface Tread {
  x1: number;
  x2: number;
  y: number;
}

export interface Point {
  x: number;
  y: number;
}

/** One step of the hero staircase. */
export const HERO_RISE = 52;
/** How wide one tread is. */
const HERO_RUN = 220;
/** The staircase's own left edge — B.4's, and wider than the deck's `SIDE_MARGIN`
 *  because a staircase that started on the text margin would read as a chart axis. */
const HERO_LEFT = 88;
/** L1's tread, and the staircase's baseline. See {@link HERO_LADDER_FLOOR} for what
 *  fixes it: the rung label block that hangs under it has to clear {@link SCENE_FLOOR}. */
export const HERO_BASE_TREAD_Y = 470;

/**
 * The five treads, L1 (lowest, left) to L5 (highest, right).
 *
 * Indexed by RUNG INDEX, so `HERO_TREADS[2]` is L3 — the same index `../content.ts`'s
 * `phasesOnRung` takes. There is no separate rung→tread table on purpose: one of the two
 * would drift, and it would drift silently because a phase attached to the wrong tread
 * still renders.
 *
 * THE LAST RUN IS 4px WIDER so the path ends at 1192 — an 88px right margin, matching
 * the left one. B.4 spends the same 4px in the same place; L5's label needs it least.
 */
export const HERO_TREADS: readonly Tread[] = Array.from({ length: RUNG_COUNT }, (_, i) => ({
  x1: HERO_LEFT + i * HERO_RUN,
  x2: HERO_LEFT + (i + 1) * HERO_RUN + (i === RUNG_COUNT - 1 ? 4 : 0),
  y: HERO_BASE_TREAD_Y - i * HERO_RISE,
}));

/** How far a rung's label block is inset from its own tread's left end, and how much of
 *  the tread's right end it gives back to its neighbour. B.4's 10/20. */
export const HERO_RUNG_LABEL_INSET = 10;
export const HERO_RUNG_LABEL_GUTTER = 20;
/** The air between a tread and the name hanging under it. */
export const HERO_RUNG_LABEL_GAP = 10;
/** The name: 19px display on 1.15. The definition under it: 11.5px sans on 1.3, two
 *  lines budgeted, 4px under the name. All four numbers are B.4's, because the two
 *  figures have to read as one object. */
export const HERO_RUNG_NAME_SIZE = 19;
export const HERO_RUNG_NAME_LEADING = 1.15;
export const HERO_RUNG_SUB_SIZE = 11.5;
export const HERO_RUNG_SUB_LEADING = 1.3;
export const HERO_RUNG_SUB_GAP = 4;
const HERO_RUNG_SUB_LINES = 2;

/**
 * How deep a rung's label block hangs below its own tread.
 *
 * DERIVED AND NOT MEASURED, so a reworded definition that needs a second line cannot
 * quietly push L1's label through the copper rule. It is the number {@link
 * HERO_BASE_TREAD_Y} is chosen against.
 */
export const HERO_RUNG_LABEL_DEPTH =
  HERO_RUNG_LABEL_GAP +
  HERO_RUNG_NAME_SIZE * HERO_RUNG_NAME_LEADING +
  HERO_RUNG_SUB_GAP +
  HERO_RUNG_SUB_LINES * HERO_RUNG_SUB_SIZE * HERO_RUNG_SUB_LEADING;

/** Where the lowest rung's definition stops. The scene's own floor, and the number the
 *  test holds against {@link SCENE_FLOOR}. */
export const HERO_LADDER_FLOOR = HERO_BASE_TREAD_Y + HERO_RUNG_LABEL_DEPTH;

/**
 * Every corner of a staircase, in climbing order — two per tread.
 *
 * THE PATHS ARE SUB-WALKS OF THIS ONE POLYLINE, which is what makes them incapable of
 * drifting off each other: a tread starts exactly where the one below it finished, so
 * the RISERS fall out as the segments between corners and no separate riser table can
 * disagree with the treads. B.4's geometry is built the same way and for the same reason.
 */
function cornersOf(treads: readonly Tread[]): readonly Point[] {
  return treads.flatMap((tread) => [
    { x: tread.x1, y: tread.y },
    { x: tread.x2, y: tread.y },
  ]);
}

/**
 * The stretch of `treads` between two corners, as one `<path>` `d`.
 *
 * CORNER INDEXES AND NOT COORDINATES, which is the one place this differs from B.4's
 * `stairPathBetween`. That slide attaches markers at fractions along a tread and
 * therefore needs a point→path lookup with an epsilon in it; this one only ever cuts a
 * staircase at its own corners, so an index is exact.
 *
 * Corner `2i` is rung `i`'s left end and `2i + 1` its right end.
 *
 * PARAMETERISED BY THE TREAD TABLE, because this slide draws the SAME STAIRCASE TWICE at
 * two scales — once as the whole of pose 0 and once as the coordinate system pose 3's
 * columns hang off. Two copies of this walk is how the recap's risers would come to
 * disagree with the hero's.
 *
 * @throws on an index the staircase does not have, or on a stretch that does not climb.
 *         A silently clamped path is a lit run over the wrong steps, and it would look
 *         deliberate.
 */
export function stairPath(treads: readonly Tread[], from: number, to: number): string {
  const corners = cornersOf(treads);
  const last = corners.length - 1;
  if (!Number.isInteger(from) || !Number.isInteger(to) || from < 0 || to > last) {
    throw new Error(
      `stairPath: no corner ${from}…${to} — this staircase has ${corners.length} ` +
        `(0…${last}), two per rung.`,
    );
  }
  if (to <= from) {
    throw new Error(
      `stairPath: corner ${to} does not climb above ${from} — a stretch of this ` +
        `staircase runs one way.`,
    );
  }
  return corners
    .slice(from, to + 1)
    .map((corner, i) => `${i === 0 ? "M" : "L"} ${corner.x} ${corner.y}`)
    .join(" ");
}

/** Which rung the lowest phase lands on, and which the highest does. READ FROM THE
 *  CONTENT AT RENDER TIME BY THE FIGURE — these two are the DEFAULTS the geometry cuts
 *  its three paths against, and `../content.ts`'s `phasesOnRung` is what proves them.
 *  The test holds the two in step. */
export const PLAN_LOW_RUNG = 1;
export const PLAN_HIGH_RUNG = 3;

/** The corner a stretch starts and stops at, derived from the two rungs above so that
 *  moving a phase to a different rung re-cuts all three paths rather than needing three
 *  indexes re-typed. */
const PLAN_FROM_CORNER = 2 * PLAN_LOW_RUNG - 1;
const PLAN_TO_CORNER = 2 * PLAN_HIGH_RUNG + 1;
const LAST_CORNER = 2 * RUNG_COUNT - 1;

/** L1's tread — the approach, and no phase's. Drawn dashed. */
export const HERO_PATH_BELOW = stairPath(HERO_TREADS, 0, PLAN_FROM_CORNER);
/** The riser onto L2 and every tread the plan reaches, up to L4's right end. Drawn
 *  solid, over a gradient, and drawn LAST so it paints over both dashed ends.
 *
 *  IT STARTS ON THE RISER AND NOT ON THE TREAD, which is content rather than drafting:
 *  the climb from L1 to L2 is P0's work, so the lit run has to include it or the figure
 *  would show the plan beginning on a rung it is supposed to earn. */
export const HERO_PATH_PLAN = stairPath(HERO_TREADS, PLAN_FROM_CORNER, PLAN_TO_CORNER);
/** The riser to L5 and L5's own tread — the step nobody has built. Drawn dashed, which
 *  is `gap-capability-ladder`'s own mark for "not claimed", spent on a step. */
export const HERO_PATH_ABOVE = stairPath(HERO_TREADS, PLAN_TO_CORNER, LAST_CORNER);

/** The staircase's line weights. The lit run is heavier than the two dead ends, which
 *  is the same rank the colour tier carries, said twice. */
export const HERO_STROKE_PLAN = 2.5;
export const HERO_STROKE_OFF = 2;
/** The dash the two unreached stretches wear. B.4's `9 8`. */
export const HERO_DASH_OFF = "9 8";

// ── the two notes, and the tag ──────────────────────────────────────────────
//
// THREE ANNOTATION SLOTS, EACH MEASURED AGAINST THE STAIRCASE RATHER THAN EYEBALLED.
// The staircase leaves two large empty pockets — above L1's run on the left, and under
// L5's run on the right — and both notes sit in one, clear of every tread, every riser
// and every rung label. The test asserts that; the numbers below are the reason it can.

/** Both notes' inner padding, and the type inside them. */
export const NOTE_PAD_X = 14;
export const NOTE_PAD_Y = 12;
export const NOTE_LABEL_SIZE = 10;
export const NOTE_LABEL_TRACKING = 0.2;
export const NOTE_LABEL_HEIGHT = 14;
export const NOTE_LINE_GAP = 6;
export const NOTE_LINE_SIZE = 11.5;
export const NOTE_LINE_LEADING = 1.35;
const NOTE_LINE_ROWS = 2;

/** Derived, so a reworded note cannot overflow its own dashed border. */
export const NOTE_HEIGHT =
  2 * NOTE_PAD_Y +
  NOTE_LABEL_HEIGHT +
  NOTE_LINE_GAP +
  Math.round(NOTE_LINE_ROWS * NOTE_LINE_SIZE * NOTE_LINE_LEADING);

export const NOTE_WIDTH = 300;

/** The left pocket — above L1's tread, left of the L2–L3 riser. Its leader drops
 *  straight onto L1's tread. */
export const LOW_NOTE = { left: HERO_LEFT, top: 200 } as const;
/** The right pocket — above L4's run and left of L5's. Its leader turns once, which is
 *  what lets it point at a tread that is neither under it nor beside it. */
export const HIGH_NOTE = { left: 640, top: 186 } as const;

/** How far a leader stops short of the tread it points at, so the arrowhead sits ON the
 *  line rather than through it. B.4's number. */
export const LEADER_GAP = 10;

/** The low note's leader: straight down, from the note's own underside to L1's tread. */
export const LOW_LEADER_X = LOW_NOTE.left + 110;
export const LOW_LEADER_TOP = LOW_NOTE.top + NOTE_HEIGHT;
export const LOW_LEADER_BOTTOM = HERO_TREADS[0].y - LEADER_GAP;

/** The high note's leader: out of its right-hand side, then down onto L5's tread. TWO
 *  SEGMENTS AND ONE TURN, because the note cannot sit over the rung it names — L5's own
 *  label is under that tread and a box above it would be inside the eyebrow's shelf. */
export const HIGH_LEADER_Y = HIGH_NOTE.top + Math.round(NOTE_HEIGHT / 2);
export const HIGH_LEADER_X0 = HIGH_NOTE.left + NOTE_WIDTH;
export const HIGH_LEADER_X1 = HERO_TREADS[4].x1 + 112;
export const HIGH_LEADER_BOTTOM = HERO_TREADS[4].y - LEADER_GAP;

/** The tag over the lit run — hung above L3's tread, at the middle of the three rungs
 *  the plan reaches, so it names the bright stretch without pointing at one rung of it. */
export const PLAN_TAG = {
  left: HERO_TREADS[2].x1 + HERO_RUNG_LABEL_INSET,
  top: HERO_TREADS[2].y - 24,
  width: 200,
} as const;

// ───────────────────── scenes 1 and 2 · the four cards ─────────────────────
//
// ONE SHELF, ONE HEIGHT, ONE WIDTH, TWO SCENES — and that is the decision the whole pair
// of poses rests on. The phases and the gates are not two figures; they are ONE row of
// four columns, printed twice with a different body. Given one card, the click swaps the
// organisation's dates for the deck's gates in place, and the headline's claim is made
// by the stage rather than asserted by a sentence. Given two, the room would read a new
// figure and the comparison would be gone.

export const CARD_TOP = BODY_TOP;

/** 288, and the number is the citation's doing. The cards could be K.1's 330 and bottom
 *  out at 526; scene 1 also has to print the organisation's own quoted roadmap under
 *  them, which needs two lines of mono and 21px of air over the rule. 288 buys that and
 *  still leaves the mark its full 88. */
export const CARD_HEIGHT = 288;

/** The gutter between two cards. 24 across four boxes is 72 of gutter, which is what
 *  keeps a 278px measure — the narrowest column on the slide, and the one every copy
 *  budget below is cut against. */
const CARD_GUTTER = 24;

export const CARD_WIDTH = (CONTENT_WIDTH - (PHASE_COUNT - 1) * CARD_GUTTER) / PHASE_COUNT;

/**
 * Where card `index` starts.
 *
 * @throws on a column the row does not have. A clamped index draws two phases on top of
 *         each other, and it would look deliberate.
 */
export function cardLeft(index: number): number {
  assertIndex("cardLeft", index, PHASE_COUNT, "phase card");
  return SIDE_MARGIN + index * (CARD_WIDTH + CARD_GUTTER);
}

/** A card's inner padding. 22 and not K.1's 26, because this card is 278 wide against
 *  that one's 296 and the measure is what the copy budget is spent on. */
export const CARD_PAD_X = 22;
export const CARD_PAD_Y = 24;

/** The phase's own name — `P0`. 12.5px mono caps on 1.35, in a 17px box. */
export const CARD_LABEL_SIZE = 12.5;
export const CARD_LABEL_HEIGHT = 17;

/** The rung and the state, on the same line as the name and hard against the card's
 *  right edge — `L2 · CLAIMED`. One tier down and half a point smaller, because it is a
 *  POINTER at the staircase the room has just read and not a claim of its own. */
export const CARD_TARGET_SIZE = 10.5;
export const CARD_TARGET_TRACKING = 0.14;

/** The rule between what a card is CALLED and what it SHOWS. K.1's card puts one in the
 *  same place, and it is the one element on the card that brightens with the border
 *  under the pointer. */
export const CARD_HAIRLINE_OFFSET = 60;

/** The mark: 88 square, centred, and the same 88 in both scenes. A glyph drawn larger in
 *  one scene than the other would rank a date over a gate. */
export const GLYPH_SIZE = 88;

/** A gate line: 15px sans on 1.4 (21 painted), THREE lines budgeted. Two are spent; the
 *  third is what a system fallback face costs. */
export const CARD_LINE_SIZE = 15;
export const CARD_LINE_LEADING = 1.4;
export const CARD_LINE_ROWS = 3;
export const CARD_LINE_HEIGHT = Math.round(CARD_LINE_SIZE * CARD_LINE_LEADING * CARD_LINE_ROWS);

/** The air under a card's last line. */
const CARD_PAD_BOTTOM = 26;

/**
 * Where a card's BODY starts — the calendar in scene 1, the gate in scene 2, at the same
 * offset in both.
 *
 * ONE OFFSET AND NOT TWO, which is what makes the click a swap rather than a re-layout.
 * Measured UP from the card's own floor, so the body sits the same distance off the
 * bottom edge whatever the card's height.
 */
export const CARD_BODY_OFFSET = CARD_HEIGHT - CARD_PAD_BOTTOM - CARD_LINE_HEIGHT;

/** Where a card's mark starts — the middle of the band between the hairline and the
 *  body. Derived, so a re-cut card height moves the mark with it. */
export const CARD_GLYPH_OFFSET = Math.round(
  CARD_HAIRLINE_OFFSET + (CARD_BODY_OFFSET - CARD_HAIRLINE_OFFSET - GLYPH_SIZE) / 2,
);

/** A card's text measure — the number every budget below is cut against. */
export const CARD_TEXT_WIDTH = CARD_WIDTH - 2 * CARD_PAD_X;

/** One calendar row: 10.5px mono at 0.06em tracking, in a 16px box, THREE budgeted.
 *
 *  A FIXED COUNT FOR ALL FOUR COLUMNS, whatever any one brand authored. The rows are the
 *  only part of a card whose LENGTH varies by brand — three for a three-stage P0, two for
 *  a programme name and its window, none at all for the `ours` arm — and a slot sized to
 *  its own contents would leave four cards' bodies starting at four different heights. */
export const CALENDAR_ROWS = 3;
export const CALENDAR_ROW_SIZE = 10.5;
export const CALENDAR_ROW_HEIGHT = 16;

/** Where the citation stands — under the four cards, on scene 1 only. */
export const PROVENANCE_TOP = 500;
export const PROVENANCE_SIZE = 10.5;
export const PROVENANCE_LEADING = 1.5;
const PROVENANCE_ROWS = 2;
export const PROVENANCE_HEIGHT = Math.round(
  PROVENANCE_ROWS * PROVENANCE_SIZE * PROVENANCE_LEADING,
);

// ───────────────────── scene 3 · the whole plan, in one frame ─────────────────────
//
// THE RECAP ADDS THE ONE THING NO HERO POSE CAN SHOW: which phase stands on which rung.
// The staircase and the columns have each been read alone; here the chips on the treads
// and the headers of the columns print the SAME phase labels, and that repetition is the
// only thing tying the two bands together. Nothing else on this pose is new — every
// string was on the stage one, two or three clicks ago, at three times the size.

/** The recap staircase's own step and baseline. A fifth of the size of the hero's rise,
 *  because here the staircase is a coordinate system for the columns under it rather
 *  than the whole argument. */
export const RECAP_RISE = 20;
export const RECAP_BASE_TREAD_Y = 300;
/** Its line weight — one number for treads and risers alike. */
export const RECAP_STROKE = 2;

/** How wide one recap tread is. Derived from the count, so a ladder of a different
 *  length re-cuts the staircase instead of needing a width re-typed. */
export const RECAP_RUN = CONTENT_WIDTH / RUNG_COUNT;

export const RECAP_TREADS: readonly Tread[] = Array.from({ length: RUNG_COUNT }, (_, i) => ({
  x1: SIDE_MARGIN + i * RECAP_RUN,
  x2: SIDE_MARGIN + (i + 1) * RECAP_RUN,
  y: RECAP_BASE_TREAD_Y - i * RECAP_RISE,
}));

/** The same three stretches, cut at the same corners, over the recap's own treads —
 *  which is the whole reason {@link stairPath} takes a tread table. The room reads the
 *  identical shape three clicks later at a fifth of the rise, and the lit run is lit in
 *  exactly the same place because both cuts are the same arithmetic. */
export const RECAP_PATH_BELOW = stairPath(RECAP_TREADS, 0, PLAN_FROM_CORNER);
export const RECAP_PATH_PLAN = stairPath(RECAP_TREADS, PLAN_FROM_CORNER, PLAN_TO_CORNER);
export const RECAP_PATH_ABOVE = stairPath(RECAP_TREADS, PLAN_TO_CORNER, LAST_CORNER);

/** A recap rung's name: 12.5px display on 1.25, hung under its tread. NAME ONLY, NO
 *  DEFINITION — the definitions were read at hero size three clicks earlier, and
 *  reprinting five of them would cost 65px of a pose that has four columns to show. */
export const RECAP_RUNG_LABEL_GAP = 8;
export const RECAP_RUNG_LABEL_HEIGHT = 16;
export const RECAP_RUNG_LABEL_SIZE = 12.5;
/** MEASURED AGAINST THE RISER, not chosen for looks: the riser out of rung i−1 is drawn
 *  at the right edge of that rung's column, which IS the left edge of rung i's, so a
 *  label at inset 0 starts two pixels from a line it overlaps in y. */
export const RECAP_RUNG_LABEL_INSET = 8;
export const RECAP_RUNG_LABEL_GUTTER = 12;

/** The phase chips, above the tread they land on: 10px mono in a hairline box. */
export const CHIP_HEIGHT = 18;
export const CHIP_GAP_X = 6;
const CHIP_GAP_Y = 6;
/** What a chip row occupies above its tread. Reserved for EVERY rung, including the two
 *  no phase reaches, because the staircase's shape must not change when a phase moves. */
export const CHIP_BLOCK_HEIGHT = CHIP_HEIGHT + CHIP_GAP_Y;

/** Where rung `index`'s chip row starts. @throws as {@link recapTread} does. */
export function chipTop(index: number): number {
  return recapTread(index).y - CHIP_BLOCK_HEIGHT;
}

/** Rung `index`'s recap tread. @throws on a rung the ladder does not have — a clamped
 *  tread is a chip printed on another rung's step. */
export function recapTread(index: number): Tread {
  assertIndex("recapTread", index, RUNG_COUNT, "rung");
  return RECAP_TREADS[index];
}

/** Where the recap's four columns start. Under the staircase and its labels, with the
 *  air that says the two bands are two things. */
export const RECAP_COL_TOP = 352;

export const RECAP_PAD_X = 14;
export const RECAP_PAD_Y = 14;
/** The chip-size mark, and the air between it and the header beside it. */
export const RECAP_GLYPH_SIZE = 26;
export const RECAP_GLYPH_GAP = 10;
/** `P0 · L2 · CLAIMED`, one line of 11px mono. */
export const RECAP_HEAD_SIZE = 11;
const RECAP_HEAD_GAP = 12;
/** A recap calendar row: 10px mono in a 14px box, three budgeted — the same fixed count
 *  the cards budget, for the same reason. */
export const RECAP_CAL_SIZE = 10;
export const RECAP_CAL_ROW_HEIGHT = 14;
const RECAP_CAL_GAP = 12;
/** A recap gate: 12.5px sans on 1.36 (17 painted), two lines budgeted. */
export const RECAP_GATE_SIZE = 12.5;
export const RECAP_GATE_LINE_HEIGHT = 17;
export const RECAP_GATE_LINES = 2;

export const RECAP_CAL_OFFSET = RECAP_PAD_Y + RECAP_GLYPH_SIZE + RECAP_HEAD_GAP;
export const RECAP_GATE_OFFSET =
  RECAP_CAL_OFFSET + CALENDAR_ROWS * RECAP_CAL_ROW_HEIGHT + RECAP_CAL_GAP;

/** Derived from its own contents, so a fifth calendar row re-cuts the column rather than
 *  printing under its own bottom edge. */
export const RECAP_COL_HEIGHT =
  RECAP_GATE_OFFSET + RECAP_GATE_LINES * RECAP_GATE_LINE_HEIGHT + RECAP_PAD_Y;

/** The recap's columns stand on the SAME GRID as the hero cards — same width, same
 *  gutter, same left edges. Three clicks apart, the room's eye does not have to find a
 *  new column. */
export const recapColLeft = cardLeft;
export const RECAP_COL_WIDTH = CARD_WIDTH;

/** The recap's own floor, and the number the test holds against {@link SCENE_FLOOR}. */
export const RECAP_FLOOR = RECAP_COL_TOP + RECAP_COL_HEIGHT;

// ───────────────────── the copy budgets ─────────────────────
//
// jsdom computes no text, so nothing measures these at render time. Each is a width
// divided by an estimated advance, taken down for slack, and held over the COPY by
// `tests/unit/mandate-phases-gates.test.tsx` — where an author can act on it — rather
// than discovered on a projector.

/**
 * How long a gate line may be.
 *
 * {@link CARD_TEXT_WIDTH} (234px) over ≈7.6px per character — 15px Inter at ≈0.50em,
 * widened for a system fallback — gives ≈30 per line, so the three lines {@link
 * CARD_LINE_ROWS} budgets are ≈92, taken down to 88.
 */
export const GATE_BUDGET_CHARS = 88;

/**
 * How long one calendar row may be.
 *
 * {@link CARD_TEXT_WIDTH} over ≈6.93px — 10.5px mono at 0.06em tracking, widened for a
 * fallback — gives ≈33.7, taken down to 34 and held at exactly that. A row that wraps
 * does not overflow a box; it pushes the row under it off the card's floor.
 */
export const CALENDAR_ROW_BUDGET_CHARS = 34;

/**
 * How long the citation may be.
 *
 * `CONTENT_WIDTH` over ≈6.93px is ≈170 per line, and {@link PROVENANCE_HEIGHT} budgets
 * two — so ≈341, taken down to 320. IT IS THE ONE STRING ON THIS SLIDE ALLOWED TO BE
 * LONG, because a citation trimmed to fit has stopped being one.
 */
export const PROVENANCE_BUDGET_CHARS = 320;

/**
 * How long a rung's printed name — `L2 · Copilot at scale` — may be.
 *
 * ONE RECAP COLUMN WIDE AND NO WIDER, because the rung labels are the one thing on this
 * stage this slide does not own: they come from `leader-gap/content.ts`, and a rung
 * retitled there must fail a test HERE rather than silently run into its neighbour's
 * column. The RECAP is the binding case — {@link RECAP_RUN} is 236.8px, less the inset
 * and the gutter, over ≈5.9px per character at 12.5px display — ≈36, taken down to 34.
 */
export const RUNG_LABEL_BUDGET_CHARS = 34;

/**
 * How long a rung's DEFINITION may be, on the hero pose only.
 *
 * A hero tread is 220px less {@link HERO_RUNG_LABEL_INSET} and {@link
 * HERO_RUNG_LABEL_GUTTER}, over ≈5.4px per character at 11.5px Inter — ≈37 per line,
 * times the two lines budgeted, taken down to 68. Same source, same risk: the `sub`
 * strings belong to `gap-capability-ladder` and a reword there has to fail here.
 */
export const RUNG_SUB_BUDGET_CHARS = 68;

/** How long a note's line may be. {@link NOTE_WIDTH} less its padding, over ≈5.4px, is
 *  ≈50 per line, times {@link NOTE_HEIGHT}'s two, taken down to 96. */
export const NOTE_LINE_BUDGET_CHARS = 96;

/** How long a recap gate may be. `RECAP_COL_WIDTH` less its padding, over ≈6.5px at
 *  12.5px Inter, is ≈38 per line, times the two budgeted, taken down to 74. */
export const RECAP_GATE_BUDGET_CHARS = 74;

// ───────────────────── the one guard the whole module shares ─────────────────────

/** The bound every index lookup here shares. One function, so the two that need it
 *  cannot come to disagree about what "no such column" means. */
function assertIndex(fn: string, index: number, count: number, noun: string): void {
  if (!Number.isInteger(index) || index < 0 || index >= count) {
    throw new Error(`${fn}: no ${noun} ${index} — this stage lays out ${count} (0…${count - 1}).`);
  }
}
