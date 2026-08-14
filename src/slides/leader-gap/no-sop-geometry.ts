// The rule nobody wrote, as numbers — figure coordinates for the one persistent scene
// the 2026-08-11 redesign made of B.2 (owner call, productionized from the B.2
// prototype's variant D "BOXES × FRAY"; the prototype directory left the tree in the
// same change).
//
// RE-CUT 2026-08-14, OWNER CALL, AND THE THREE COMPLAINTS ARE WORTH RECORDING BECAUSE
// EVERY NUMBER BELOW ANSWERS ONE OF THEM: the boxes did not look like `gap-failures-
// pattern`'s or the Capability Ladder's next door (a grey `--neutral-800` panel against
// their translucent black, and a box whose whole content was one sentence); POSE 0 WAS
// MORE THAN HALF EMPTY STAGE (three 120px boxes over 300px of nothing); and the four
// questions read as riddles with a hairline under them that said nothing about itself.
// So the issued row is now a TRIPTYCH OF PLATE CARDS at pose 0 — a live picture over a
// hairline over a mono title over one line of prose, which is `gap-failures-pattern`'s
// card grammar exactly — and it CONTRACTS TO RECEIPTS one beat earlier than it used to,
// at pose 1, which is what buys the question cards the height they need to carry a
// domain label, a plain question, and an ANSWER FIELD that says what it is.
//
// ONE SCENE, TWO STATES PER BAND, AND EVERY BOX KEEPS ONE PAIR OF EDGES. Each of the
// three issued boxes and the four question boxes is HERO-sized while it is being argued
// and compacts into a chip when the argument moves on — and the compaction is a
// height/width collapse inside ONE left edge and ONE right edge ({@link BAND_LEFT},
// {@link BAND_RIGHT}), hero and chip alike, so nothing drifts sideways while it shrinks.
// Below the boxes runs the SPINE: a rollout line that draws to a first labelled dot
// (what was handed out), extends to a second (where the writing stopped), and at the
// fray pose RISES into the freed space and fans out into two dozen swaying private
// hairlines. The stopped-and-frayed line plus the question cards' EMPTY answer fields
// are §6.2's image for this pass — `./content.ts` records the comparison against D.3's
// and D.4's.
//
// THE TWO BANDS NO LONGER COMPACT ON THE SAME BEAT, which is the one structural change
// in this re-cut and the reason the vertical budget below has three columns instead of
// two:
//
//   pose 0 — issued cards HERO (a plate each). No question band yet.
//   pose 1 — issued cards CHIP; the four question cards arrive HERO under them.
//   pose 2 — question cards CHIP too; the spine rises and frays into the freed space.
//   pose 3 — the marching line and the verdict, over the dimmed fan.
//
// FIGURE COORDINATES, NOT STAGE COORDINATES — the convention the redesign set, and the
// reason is the SVG: the spine, the fan and the marching closer line live in one `<svg>`
// whose viewBox must agree with the boxes layered over it, so everything below is
// authored in the space of a single figure wrapper the component mounts at stage
// ({@link FIGURE_LEFT}, {@link FIGURE_TOP}) — `.slide-content`'s own shelf. Add those two
// numbers to any coordinate below to get stage space; the floor arithmetic at the bottom
// of this file does exactly that, because the NavBar band is a STAGE fact.
//
// NOTHING IS PINNED TO `./geometry.ts` OR TO `./hardest-part-geometry.ts` — the rule
// this module kept through both redesigns: the stage facts are RESTATED from
// `src/styles/globals.css` (the authority for all four gap modules) rather than
// imported from a sibling, because a cross-import between two slides' geometry welds
// two stages that only happen to agree.
//
// Proved importable from bare Node, not assumed — the property every geometry module
// in this tree keeps, so a coordinate can be checked without a bundler:
//
//   $ node --experimental-strip-types -e \
//       'import("./src/slides/leader-gap/no-sop-geometry.ts")
//          .then(m => console.log(Object.keys(m).length, "exports"))'
//
// THE VERTICAL BUDGET, top to bottom, in FIGURE coordinates (add 156 for stage):
//
//   0    band 1's title · 11px mono caps            (stage 156, CONTENT_TOP itself)
//   26   issued row — HERO 330 tall → 356           CHIP 36 tall → 62 (poses 1–3)
//        · plate      18 → 218                      · icon + title, one 36px row
//        · hairline   236
//        · title      250 → 264
//        · line       274 → 315 (two lines of 14px serif)
//   76   band 2's title                             (poses 1–3, one shelf, never moves)
//   102  question grid — HERO 2×2, 130 tall,        CHIP row at 102, 36 tall → 138
//        rows at 102/240 → 370
//        · domain     18 → 33
//        · ask        42 → 64
//        · field note 88 → 100  · the rule at 106
//   180  band 3's title, the fray's                 (poses 2–3)
//   280  the RISEN spine and the fan's origin       (poses 2–3)
//   400  the verdict · TWO lines of 24px serif, 70 tall → 470   (pose 3)
//   420  the LOW spine (poses 0–1); dot captions at 432, ≈13 tall → 445
//   ──────────────────────────────────────────────────────────────────────────
//   floor: NavBar band at stage y=632 = figure y=476. Poses 0–1 end at the dot
//   captions' 445 (31px clear); poses 2–3 at the verdict's 470 (6px clear), which is
//   the tighter of the two and the one this stage actually broke once.
//
// Pure data and pure functions. No React, no DOM, no colour tokens — the fray's tints
// are the component's to assign; this file hands it a TINT INDEX so the palette stays
// where every other colour decision in the figure lives.

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

/** `.nav-zone` is `bottom: 0; height: 88px`, so its top edge is y=632 — the STAGE
 *  floor nothing painted may cross. */
export const NAV_ZONE_TOP = STAGE.height - 88;

/** The figure wrapper's stage position: `.slide-content`'s own shelf, clearing the
 *  40px headline row that ends at y=122 — the call every recent leader slide makes. */
export const FIGURE_TOP = 156;

/** The wrapper's left edge: the stage's own margin. */
export const FIGURE_LEFT = SIDE_MARGIN;

/** The figure's width: 1184 — the full content measure between the two margins. */
export const FIGURE_WIDTH = STAGE.width - 2 * SIDE_MARGIN;

/**
 * The figure's height — and the SVG viewBox's. 484 is the CANVAS, not the paint: the
 * wrapper draws nothing of its own, and the floor is held by the painted marks (the
 * arithmetic at {@link NAV_ZONE_CLEARANCE}), not by this box's bottom edge.
 */
export const FIGURE_HEIGHT = 484;

// ───────────────────── the shared band edges ─────────────────────

/** EVERY band spans {@link BAND_LEFT}..{@link BAND_RIGHT} at EVERY pose (owner call):
 *  the three issued boxes and the four question boxes share one left edge and one
 *  right edge, hero and chip alike, so the compaction reads as the SAME items
 *  shrinking rather than as new furniture arriving. */
export const BAND_LEFT = 8;

/** The right edge: 1148. Derived from the issued row's own tiling below, and shared by
 *  the question grid, the chip rows and the marching closer line. */
export const BAND_RIGHT = 1148;

/** The width every band tiles: 1140. Not exported — the per-box widths below carry it. */
const BAND_WIDTH = BAND_RIGHT - BAND_LEFT;

// ───────────────────── the issued band ─────────────────────

/**
 * How many things the organisation handed out: 3, PINNED to `./content.ts`'s tuple.
 *
 * Three is the copy's own reading — a login, a demonstration, an encouragement — and
 * the number the issued row's tiling divides by: a fourth box re-cuts every width.
 */
export const ISSUED_COUNT: NoSopCopy["issued"]["length"] = 3;

/** The air between two issued boxes: 18 (owner call, round 4) — wide enough that every
 *  issued title holds ONE line at the width the tiling leaves. Not exported. */
const ISSUED_GUTTER = 18;

/** An issued box's width, hero and chip alike: 368.
 *  `3 × 368 + 2 × 18 = 1140`, so the row tiles the band exactly. */
export const ISSUED_BOX_WIDTH = (BAND_WIDTH - (ISSUED_COUNT - 1) * ISSUED_GUTTER) / ISSUED_COUNT;

/** The three issued boxes' left edges: 8, 394, 780 — hero and chip alike, so the
 *  compaction is a HEIGHT collapse only and the row's edges cannot drift. */
export const issuedBoxLeft = (index: number): number => {
  assertIssued("issuedBoxLeft", index);
  return BAND_LEFT + index * (ISSUED_BOX_WIDTH + ISSUED_GUTTER);
};

/** The issued row's one shelf, both states: 26 — 12px of air under band 1's title,
 *  which ends at ≈14 (11px mono caps at the figure's own top). */
export const ISSUED_TOP = 26;

/**
 * The issued hero's height: 330 — and it is a POSE-0-ONLY height, which is the re-cut's
 * whole answer to "pose 0 feels empty".
 *
 * The card is `gap-failures-pattern`'s: a live plate, a hairline, a mono title, one line
 * of prose. Three of them fill the stage from the band title down to 356, and the
 * rollout line runs 64px under them — where the first cut left three 120px boxes over
 * 300px of black.
 */
export const ISSUED_HERO_HEIGHT = 330;

/** The chip height, issued and question alike: 36 — one mono caps line with an icon
 *  beside it, and nothing else. ONE height for both rows: two chip registers would
 *  rank receipts. */
export const CHIP_HEIGHT = 36;

/** Every card's own left/right padding: 20 — the inner measure is the box width less
 *  twice this. Shared by the plate, the hairline, the title and the line, so one rail
 *  runs down the whole card (`gap-failures-pattern`'s `CARD_PAD_X`). */
export const CARD_PAD_X = 20;

/** An issued card's inner measure: 328 — the plate's width, the hairline's, and the
 *  measure both type rows wrap inside. */
export const CARD_INNER_WIDTH = ISSUED_BOX_WIDTH - 2 * CARD_PAD_X;

/** The plate — the live picture at the top of every issued card. 328×200, the largest
 *  drawing surface on the stage, and the one the room looks at while the presenter says
 *  what a competent rollout issues. */
export const PLATE_WIDTH = CARD_INNER_WIDTH;
export const PLATE_HEIGHT = 200;
export const PLATE_TOP = 18;

/** The plate's own rule — picture above, words below (`gap-failures-pattern`'s
 *  `CARD_HAIRLINE_Y`, same idiom, same 1px). 236: 18px of air under the plate. */
export const CARD_HAIRLINE_Y = PLATE_TOP + PLATE_HEIGHT + 18;
export const CARD_HAIRLINE_HEIGHT = 1;

/** The mono title's shelf: 250 — 13px under the hairline. One 11px caps row, ≈14 tall. */
export const ISSUED_TITLE_Y = 250;

/** The prose line's shelf: 274 — TWO lines of 14px serif on 1.45 measure 41, ending at
 *  315, which leaves 15px of floor inside the 330 card. Two and not one: the widest of
 *  the three lines wraps at this measure, and a row of cards whose text blocks start at
 *  different heights reads as three different cards. */
export const ISSUED_LINE_Y = 274;
export const ISSUED_LINE_HEIGHT = 41;

/** The guard the issued placements share. Not exported. */
function assertIssued(fn: string, index: number): void {
  if (!Number.isInteger(index) || index < 0 || index >= ISSUED_COUNT) {
    throw new Error(
      `${fn}: no issued box ${index} — the row holds ${ISSUED_COUNT} ` +
        `(0…${ISSUED_COUNT - 1}). The tuple in ./content.ts refuses the extra entry ` +
        `first, and a fourth box would re-cut ISSUED_BOX_WIDTH's tiling.`,
    );
  }
}

// ───────────────────── the question grid ─────────────────────

/**
 * How many questions were never answered: 4, PINNED to `./content.ts`'s tuple.
 *
 * Four is the copy's own escalation — permission, prohibition, arbitration,
 * disclosure — and both of this band's tilings divide by it: 2×2 at the hero pose,
 * one four-chip row after.
 */
export const QUESTION_COUNT: NoSopCopy["questions"]["length"] = 4;

/** The hero grid's columns: 2 — four questions read as two pairs, and a 1×4 row of
 *  521px-measure sentences would not hold one line each. Not exported. */
const Q_HERO_COLS = 2;

/** The air inside the hero grid, both axes' seams: 18 across (the issued row's own
 *  gutter, so the two bands read as one system) — but 8 down: the two grid rows are
 *  one list, not two beats. Not exported. */
const Q_HERO_GUTTER_X = 18;
const Q_HERO_GUTTER_Y = 8;

/** A question hero's width: 561. `2 × 561 + 18 = 1140` — the grid tiles the band. */
export const QUESTION_HERO_WIDTH = (BAND_WIDTH - Q_HERO_GUTTER_X) / Q_HERO_COLS;

/**
 * A question hero's height: 130 — 42 more than the first cut's 88, and every one of
 * them is spent on making the card say what it is.
 *
 * The card holds THREE rows: the domain this rule would have belonged to, the question
 * as the person at the desk asks it, and the ANSWER FIELD — a dashed rule with a
 * blinking caret parked on it and one dim mono note beside the caret. The first cut had
 * a bare hairline under each question and nothing that said what the hairline was.
 */
export const QUESTION_HERO_HEIGHT = 130;

/** A question card's own padding: 22 — one step wider than the issued card's, because
 *  the measure is 561 and not 368 and the type inside is bigger. */
export const QUESTION_PAD_X = 22;

/** A question card's inner measure: 517. */
export const QUESTION_INNER_WIDTH = QUESTION_HERO_WIDTH - 2 * QUESTION_PAD_X;

/** Row 1 — the domain label's shelf: 18. Icon and 11px mono caps, ≈15 tall. */
export const QUESTION_DOMAIN_Y = 18;

/** Row 2 — the question's shelf: 42. One line of 17px serif on 1.3, ≈22 tall. */
export const QUESTION_ASK_Y = 42;

/** Row 3 — THE ANSWER FIELD, and it is two marks and a note rather than one hairline:
 *  the note and the caret sit on 88, the dashed rule they rest on at 106. 24px of floor
 *  under the rule, so the field reads as a line somebody was supposed to write on. */
export const QUESTION_FIELD_NOTE_Y = 88;
export const QUESTION_FIELD_RULE_Y = 106;
export const QUESTION_FIELD_RULE_HEIGHT = 1.5;

/** The caret parked at the head of the empty field: 2×15, its foot on the rule. */
export const QUESTION_CARET_WIDTH = 2;
export const QUESTION_CARET_HEIGHT = 15;

/** The hero grid's shelf: 102 — under band 2's title at 76, which itself clears the
 *  issued CHIP row (26 → 62) by 14. The issued row is already compact when this band
 *  arrives, which is what pays for the 130px cards. */
export const QUESTION_HERO_TOP = 102;

/** Question hero `index`'s left edge: 8, 587, 8, 587. */
export const questionHeroLeft = (index: number): number => {
  assertQuestion("questionHeroLeft", index);
  return BAND_LEFT + (index % Q_HERO_COLS) * (QUESTION_HERO_WIDTH + Q_HERO_GUTTER_X);
};

/** Question hero `index`'s top edge: 102, 102, 240, 240. */
export const questionHeroTop = (index: number): number => {
  assertQuestion("questionHeroTop", index);
  return (
    QUESTION_HERO_TOP + Math.floor(index / Q_HERO_COLS) * (QUESTION_HERO_HEIGHT + Q_HERO_GUTTER_Y)
  );
};

/** The chip row's gutter: 16 — one step tighter than the hero gutter, because chips
 *  are receipts and the air between them is not carrying an argument. Not exported. */
const Q_CHIP_GUTTER = 16;

/** A question chip's width: 273. `4 × 273 + 3 × 16 = 1140` — the row tiles the band. */
export const QUESTION_CHIP_WIDTH = (BAND_WIDTH - (QUESTION_COUNT - 1) * Q_CHIP_GUTTER) / QUESTION_COUNT;

/** The question chips' one shelf: 102 — THE HERO GRID'S FIRST ROW, exactly. The two
 *  cards on that row contract in place and the two below fly up into them, which is the
 *  clearest available reading of "the same four items, now receipts". */
export const QUESTION_CHIP_TOP = QUESTION_HERO_TOP;

/** Question chip `index`'s left edge: 8, 297, 586, 875. */
export const questionChipLeft = (index: number): number => {
  assertQuestion("questionChipLeft", index);
  return BAND_LEFT + index * (QUESTION_CHIP_WIDTH + Q_CHIP_GUTTER);
};

/** The guard the question placements share. Not exported. */
function assertQuestion(fn: string, index: number): void {
  if (!Number.isInteger(index) || index < 0 || index >= QUESTION_COUNT) {
    throw new Error(
      `${fn}: no question box ${index} — the band holds ${QUESTION_COUNT} ` +
        `(0…${QUESTION_COUNT - 1}). The tuple in ./content.ts refuses a fifth first, ` +
        `and both of this band's tilings divide by the count.`,
    );
  }
}

// ───────────────────── the band titles ─────────────────────

/**
 * Band 2's title: 76, at every pose it exists on, and it NO LONGER MOVES.
 *
 * The first cut rode it down to 176 while the issued heroes were tall and back up to 76
 * when they compacted. The issued row is now compact from pose 1 — the beat this title
 * arrives on — so there is only ever one shelf for it, and a heading that never moves is
 * one less thing crossing the stage while four questions are landing.
 */
export const UNWRITTEN_TITLE_TOP = 76;

/** Band 3's title — the fray's: 180, on the compacted stage only, over the space the
 *  risen spine fans into. */
export const CONDITION_TITLE_TOP = 180;

// ───────────────────── the step diagram ─────────────────────

/** The spine's authored (LOW) baseline: 420 — under the issued triptych at pose 0 (which
 *  ends at 356) and under the question grid at pose 1 (which ends at 370). Poses 0–1. */
export const SPINE_Y = 420;

/** How far the whole spine group rides UP when the stage compacts: 140. The risen
 *  baseline — 280 — is where the fan is authored, so the strands never move relative
 *  to their own origin. */
export const SPINE_RISE = 140;

/** The risen baseline, derived: 280. */
export const SPINE_Y_RISEN = SPINE_Y - SPINE_RISE;

/** Where the rollout line enters: the band's own left edge. */
export const SPINE_X0 = BAND_LEFT;

/** The first labelled dot — HANDED OUT: 170. Under the first issued box, a stop the
 *  rollout actually reached. */
export const DOT_ISSUED_X = 170;

/** The second labelled dot — NEVER WRITTEN: 470. Where guidance stops; the fan's
 *  origin and the marching closer line's start. */
export const DOT_UNWRITTEN_X = 470;

/** The fan's origin: the second dot, at the RISEN baseline — authored where it
 *  appears, because the fan exists only after the spine has risen. */
export const FAN_ORIGIN = { x: DOT_UNWRITTEN_X, y: SPINE_Y_RISEN } as const;

/** A dot caption's box: 200 wide, centred on its dot, 12px under the baseline. The
 *  10px mono caption on 1.3 ends ≈13 later. */
export const DOT_LABEL_WIDTH = 200;
export const DOT_LABEL_OFFSET_Y = 12;

/** The waiting ping's radius: 26 — the largest transient mark on the spine, and the
 *  bound the floor arithmetic uses for it. */
export const PING_RADIUS = 26;

// ───────────────────── the fray ─────────────────────

/** How many private rules the fan draws: 24 — enough to read as "everybody" from the
 *  back of the room, few enough that single hairlines survive a projector. */
export const FRAY_STRAND_COUNT = 24;

/** How many tints the component spreads the strands over. The palette itself is the
 *  component's (this module carries no colour tokens); what is fixed here is that a
 *  strand's tint is part of the deterministic build. */
export const FRAY_TINT_COUNT = 4;

/** One private rule: a cubic from {@link FAN_ORIGIN}, its end tick, and the timing
 *  texture that keeps two dozen strands from moving as one object. */
export interface FrayStrand {
  /** The SVG path, authored at the RISEN baseline. */
  d: string;
  /** 0…{@link FRAY_TINT_COUNT}-1 — which of the component's tints this strand takes. */
  tint: number;
  /** 0.5…0.9. TEXTURE WITHIN ONE ROLE, not rank: all 24 strands are the same claim
   *  ("a private rule"), and the spread is what stops the fan reading as a solid
   *  wedge. Rank between ROLES stays a colour tier, the deck's rule. */
  opacity: number;
  /** Draw-in delay, ms — the rules appear one desk at a time, not as a fan snapping
   *  open. */
  delay: number;
  /** The sway's period (s) and negative phase offset (s). */
  swayDur: number;
  swayDelay: number;
  /** The short bar across the strand's end — a rule that STOPS somewhere private. */
  tick: { x: number; y: number; rot: number };
}

/**
 * Mulberry32 — the deterministic PRNG the fan is built with, so every mount of this
 * slide shows the SAME two dozen private rules. A fan that reshuffled between the
 * pose walk and the export would read as new evidence arriving; this one is a fixed
 * drawing that happens to be generated.
 */
export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** The seed. An arbitrary constant, fixed so the drawing is fixed; changing it redraws
 *  the fan and nothing else. */
const FRAY_SEED = 6622;

/**
 * The fan, built once at module scope — pure arithmetic, importable from bare Node.
 *
 * THE ENVELOPE IS THE ARGUMENT'S GEOMETRY: endpoints land in a 428-wide, ≈240-tall
 * band right of centre (x from 720, y from 168) — clear of the chip row above, the
 * verdict shelf below, and fanned wide enough that no two strands read as one. The
 * cubics' control points pull every strand through the same first ≈100px so the fan
 * visibly leaves ONE point: the dot where the writing stopped.
 */
export const FRAY_STRANDS: readonly FrayStrand[] = (() => {
  const rand = mulberry32(FRAY_SEED);
  const strands: FrayStrand[] = [];
  for (let i = 0; i < FRAY_STRAND_COUNT; i++) {
    const ex = 720 + rand() * 428;
    const ey = 168 + (i / (FRAY_STRAND_COUNT - 1)) * 240 + (rand() - 0.5) * 26;
    const c1x = 560 + rand() * 60;
    const c1y = FAN_ORIGIN.y + (ey - FAN_ORIGIN.y) * (0.05 + rand() * 0.2);
    const c2x = 640 + rand() * 90;
    const c2y = FAN_ORIGIN.y + (ey - FAN_ORIGIN.y) * (0.55 + rand() * 0.3);
    strands.push({
      d: `M ${FAN_ORIGIN.x} ${FAN_ORIGIN.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${ex} ${ey}`,
      tint: Math.floor(rand() * FRAY_TINT_COUNT),
      opacity: 0.5 + rand() * 0.4,
      delay: rand() * 1300,
      swayDur: 3.4 + rand() * 3,
      swayDelay: -(rand() * 5),
      tick: { x: ex, y: ey, rot: -40 + rand() * 80 },
    });
  }
  return strands;
})();

// ───────────────────── the verdict ─────────────────────

/** The closer's measure: 900, centred — `(1184 − 900) / 2 = 142`. One sentence,
 *  addressed to the room, under the marching line — set narrow ON PURPOSE, so the
 *  24px serif breaks into TWO centred lines and reads as a verdict rather than as a
 *  caption. Two lines of 24px on 1.45 measure 70px, and that height is what the
 *  floor arithmetic below carries. */
export const VERDICT_WIDTH = 900;
export const VERDICT_LEFT = (FIGURE_WIDTH - VERDICT_WIDTH) / 2;

/** The two centred lines' measured box: 70 — `2 × 24 × 1.45`, verified in Chromium at
 *  1280×720. Not exported; {@link VERDICT_CLEARANCE} carries it. */
const VERDICT_HEIGHT = 70;

/** The closer's shelf: 400 — under the fan's envelope, over the strip the low spine
 *  vacated when it rose. 400 and not the prototype's 420: two lines from 420 end at
 *  stage y=646, through the NavBar band — the one place the owner-approved geometry
 *  had to move to keep the tree's floor rule, and it spends air the marching line
 *  (at 280) has plenty of. */
export const VERDICT_TOP = 400;

// ───────────────────── the floor ─────────────────────

/** The lowest RESTING paint at poses 0–1, in figure coordinates: the two dot captions
 *  at the LOW baseline — 420 + 12 + ≈13 of 10px mono on 1.3. From pose 2 the whole
 *  spine group rides 140 higher. */
const DOT_LABEL_BOTTOM = SPINE_Y + DOT_LABEL_OFFSET_Y + 13;

/**
 * What is left between that caption and the NavBar's hover band: 31px, in STAGE space —
 * `632 − (156 + 445)`. Derived from both ends so an edit anywhere above moves it and a
 * test fails on it before the stage crosses the band.
 *
 * IT WAS 3px UNTIL 2026-08-14 and the re-cut spent none of that clearance on type: the
 * spine came up 28px because the issued row now compacts at pose 1, so the question
 * grid starts 100px higher than the first cut's did and the low baseline no longer has
 * to clear two hero bands at once. (The waiting ping's transient ring reaches 1px lower
 * still — {@link SPINE_Y} + {@link PING_RADIUS} — and spends its whole life fading out.)
 */
export const NAV_ZONE_CLEARANCE = NAV_ZONE_TOP - (FIGURE_TOP + DOT_LABEL_BOTTOM);

/**
 * The same margin under the closer's SECOND line: 6px, in stage space —
 * `632 − (156 + 400 + 70)`. Derived and exported separately because it is the floor
 * this stage actually broke once: the prototype's 420 shelf put the wrapped line at
 * 646, through the band, and a one-line assumption is exactly the mistake a derived
 * number refuses to survive. It is now the TIGHTEST of the two floors on this stage.
 */
export const VERDICT_CLEARANCE = NAV_ZONE_TOP - (FIGURE_TOP + VERDICT_TOP + VERDICT_HEIGHT);
