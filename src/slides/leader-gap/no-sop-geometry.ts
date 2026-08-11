// The rule nobody wrote, as numbers — figure coordinates for the one persistent scene
// the 2026-08-11 redesign made of B.2 (owner call, productionized from the B.2
// prototype's variant D "BOXES × FRAY"; the prototype directory left the tree in the
// same change).
//
// ONE SCENE, TWO STATES, AND EVERY BOX KEEPS ONE PAIR OF EDGES. The first cut was a
// static diptych; this stage is a STEP DIAGRAM under two rows of boxes. The three
// issued boxes and the four question boxes are HERO-sized while they are being argued
// (poses 0–1) and compact into chip rows when the fray arrives (poses 2–3) — and the
// compaction is a height/width collapse inside ONE left edge and ONE right edge
// ({@link BAND_LEFT}, {@link BAND_RIGHT}), hero and chip alike, so nothing drifts
// sideways while it shrinks. Below the boxes runs the SPINE: a rollout line that draws
// to a first labelled dot (what was handed out), extends to a second (where the writing
// stopped), and at the fray pose RISES into the freed space and fans out into two dozen
// swaying private hairlines. The stopped-and-frayed line plus the question boxes'
// EMPTY answer rules are §6.2's image for this pass — `./content.ts` records the
// comparison against D.3's and D.4's.
//
// FIGURE COORDINATES, NOT STAGE COORDINATES — the one convention change the redesign
// makes, and the reason is the SVG: the spine, the fan and the marching closer line
// live in one `<svg>` whose viewBox must agree with the boxes layered over it, so
// everything below is authored in the space of a single figure wrapper the component
// mounts at stage ({@link FIGURE_LEFT}, {@link FIGURE_TOP}) — `.slide-content`'s own
// shelf. Add those two numbers to any coordinate below to get stage space; the floor
// arithmetic at the bottom of this file does exactly that, because the NavBar band is
// a STAGE fact.
//
// NOTHING IS PINNED TO `./geometry.ts` OR TO `./hardest-part-geometry.ts` — the rule
// this module kept through the redesign: the stage facts are RESTATED from
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
//   26   issued row — HERO 120 tall → 146           CHIP 36 tall → 62
//   176  band 2's title (hero pose)                 76 at the chip pose
//   202  question grid — HERO 2×2, 88 tall,         CHIP row at 104, 36 tall → 140
//        rows at 202/298 → 386
//   180  band 3's title, the fray's                 (chip pose only)
//   280  the RISEN spine and the fan's origin       (poses 2–3)
//   400  the verdict · TWO lines of 24px serif, 70 tall → 470   (pose 3)
//   448  the LOW spine (poses 0–1); dot captions at 460, ≈13 tall → 473
//   ──────────────────────────────────────────────────────────────────────────
//   floor: NavBar band at stage y=632 = figure y=476. Lowest RESTING paint is the
//   dot captions' 473 (3px clear); the lowest TRANSIENT is the waiting ping's 474
//   (2px clear), a ring that spends its life fading out. Poses 2–3 end at the
//   verdict's 470 (6px clear).
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
 *  issued hero sentence holds ONE line at the width the tiling leaves. Not exported. */
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

/** The issued hero's height: 120 — an icon over a one-line 14.5px sentence, with the
 *  air a hero box carries. Cut down to match single-line content (owner call, round 4). */
export const ISSUED_HERO_HEIGHT = 120;

/** The chip height, issued and question alike: 36 — one mono caps line with an icon
 *  beside it, and nothing else. ONE height for both rows: two chip registers would
 *  rank receipts. */
export const CHIP_HEIGHT = 36;

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

/** A question hero's height: 88 — a one-line 13.5px question beside an icon, over the
 *  EMPTY answer rule that belongs to it. */
export const QUESTION_HERO_HEIGHT = 88;

/** The hero grid's shelf: 202 — directly below the issued heroes (which end at 146),
 *  past band 2's title at 176 and the 12px of air every band title gets. */
export const QUESTION_HERO_TOP = 202;

/** Question hero `index`'s left edge: 8, 587, 8, 587. */
export const questionHeroLeft = (index: number): number => {
  assertQuestion("questionHeroLeft", index);
  return BAND_LEFT + (index % Q_HERO_COLS) * (QUESTION_HERO_WIDTH + Q_HERO_GUTTER_X);
};

/** Question hero `index`'s top edge: 202, 202, 298, 298. */
export const questionHeroTop = (index: number): number => {
  assertQuestion("questionHeroTop", index);
  return QUESTION_HERO_TOP + Math.floor(index / Q_HERO_COLS) * (QUESTION_HERO_HEIGHT + Q_HERO_GUTTER_Y);
};

/** The chip row's gutter: 16 — one step tighter than the hero gutter, because chips
 *  are receipts and the air between them is not carrying an argument. Not exported. */
const Q_CHIP_GUTTER = 16;

/** A question chip's width: 273. `4 × 273 + 3 × 16 = 1140` — the row tiles the band. */
export const QUESTION_CHIP_WIDTH = (BAND_WIDTH - (QUESTION_COUNT - 1) * Q_CHIP_GUTTER) / QUESTION_COUNT;

/** The question chips' one shelf: 104 — 12px of air under band 2's compact title,
 *  which sits at 76 and ends at ≈89. */
export const QUESTION_CHIP_TOP = 104;

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

/** Band 2's title rides with its band: 176 over the hero grid, 76 over the chip row —
 *  12px above each, past the issued row's two heights (146 hero, 62 chip). */
export const UNWRITTEN_TITLE_TOP_HERO = 176;
export const UNWRITTEN_TITLE_TOP_CHIP = 76;

/** Band 3's title — the fray's: 180, on the compacted stage only, over the space the
 *  risen spine fans into. */
export const CONDITION_TITLE_TOP = 180;

// ───────────────────── the step diagram ─────────────────────

/** The spine's authored (LOW) baseline: 448 — under both hero bands, in the strip the
 *  compaction later frees. Poses 0–1. */
export const SPINE_Y = 448;

/** How far the whole spine group rides UP when the stage compacts: 168. The risen
 *  baseline — 280 — is where the fan is authored, so the strands never move relative
 *  to their own origin. */
export const SPINE_RISE = 168;

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
 *  10px mono caption on 1.3 ends ≈13 later — the lowest resting paint on the stage
 *  (see the floor arithmetic below). */
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
 * band right of centre (x from 720, y from 168) — clear of the chip rows above, the
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

/** The lowest RESTING paint, in figure coordinates: the two dot captions at the LOW
 *  baseline — 448 + 12 + ≈13 of 10px mono on 1.3. Poses 0–1; from pose 2 the whole
 *  spine group rides 168 higher. */
const DOT_LABEL_BOTTOM = SPINE_Y + DOT_LABEL_OFFSET_Y + 13;

/**
 * What is left between that caption and the NavBar's hover band: 3px, in STAGE space —
 * `632 − (156 + 473)`. THE TIGHTEST FLOOR IN THE LEADER TREE, and it is the
 * owner-approved prototype's own geometry rendered on the real stage: the low spine is
 * deliberately deep so the hero bands above it get the height that keeps every
 * sentence on one line. Derived from both ends so an edit anywhere above moves it and
 * a test fails on it before the stage crosses the band. (The waiting ping's transient
 * ring reaches 1px lower still — {@link SPINE_Y} + {@link PING_RADIUS} — and spends
 * its whole life fading out.)
 */
export const NAV_ZONE_CLEARANCE = NAV_ZONE_TOP - (FIGURE_TOP + DOT_LABEL_BOTTOM);

/**
 * The same margin under the closer's SECOND line: 6px, in stage space —
 * `632 − (156 + 400 + 70)`. Derived and exported separately because it is the floor
 * this stage actually broke once: the prototype's 420 shelf put the wrapped line at
 * 646, through the band, and a one-line assumption is exactly the mistake a derived
 * number refuses to survive.
 */
export const VERDICT_CLEARANCE = NAV_ZONE_TOP - (FIGURE_TOP + VERDICT_TOP + VERDICT_HEIGHT);
