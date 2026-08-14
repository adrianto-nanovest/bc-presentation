// The Capability Ladder a second time — read as a plan, in four scenes.
//
// ═══ RE-CUT 2026-08-15 (owner's call). What this file drew was ONE STAGE HOLDING
// EVERYTHING: a small staircase, four columns of dates and gates under it, a bordered
// band under those and the ask under that, assembled over four poses that only ever
// added. `../phases-gates-geometry.ts`'s header records the three complaints that
// retired it. The shape of the answer is K.1's, one slide earlier, and deliberately so:
// THREE HEROES, A RECAP, A THESIS.
//
//   0 — THE LADDER. `gap-capability-ladder`'s staircase at its own scale, drawing itself
//       in. Five rungs, three lit, and two dashed notes saying which two are not on the
//       plan and why. The room reads the vocabulary it already knows, big, before
//       anything is placed on it.
//   1 — THE PHASES. Four cards on one shelf: the phase, the rung it leaves you on, an
//       animated mark, and the organisation's OWN published dates — cited underneath, in
//       their own words.
//   2 — THE GATES. The SAME four cards, on the SAME shelf, at the SAME width. Only the
//       mark and the body change: the dates become what has to be true to leave. This is
//       the slide's turn, and it is made by the stage rather than asserted by a sentence.
//   3 — THE WHOLE PLAN. The staircase again, small, with a chip on every tread a phase
//       lands on, and four columns carrying both halves at once. The one frame that says
//       which phase stands on which rung — no hero pose can, because the staircase and
//       the columns are never on stage together anywhere else.
//   4 — THE THESIS, UNDER THE PLAN THAT EARNS IT. A copper rule and one line of 19px
//       serif, and POSE 3 DOES NOT MOVE.
//
// ═══ THE FIRST THREE SCENES ARE MUTUALLY EXCLUSIVE AND THE LAST TWO ACCUMULATE, which
// is K.1's split and is made the same way — by conditional MOUNT rather than by a gated
// `Reveal`. Two gated scenes would cross-fade into each other in the same region of
// stage, and a gated scene plays its stagger once at slide mount, so walking backwards
// would find the scene already assembled. Mounting makes React drop the leaving figure
// in the same frame and restarts every `Reveal` in the arriving one.
//
// ═══ ONE CARD COMPONENT FOR SCENES 1 AND 2, and it is the decision the pair rests on.
// Same shelf, same height, same width, same mark size, same four left edges. Given two
// cards the click would re-layout and the room would read a new figure; given one, the
// body swaps in place and the comparison is the click itself.
//
// ═══ IT READS NO VARIANT AND NO BRAND. The resolved block arrives as a prop, exactly as
// `CapabilityLadder`'s does, which is what lets one test mount both brands' calendars in
// a single module epoch and compare them (§4.4 slot 6).
//
// ═══ CSS VARS ONLY, no hex and no rgba() literal. Rank is a COLOUR TIER — between the
// rungs the plan reaches and the two it does not — and NEVER opacity, which on a
// step-reveal deck means "not revealed yet", i.e. time.
//
// ═══ THERE IS AN `<svg>` ON THIS SLIDE NOW, AND THE RULE THAT WENT WITH IT IS GONE.
// This file used to argue that keeping the whole of `src/slides/leader-mandate/` free of
// `<svg>` closed the SMIL question by construction. K.1's recap draws four connectors in
// one, so the property was already lost — and lost for the right reason: a curve between
// two boxes is not a rectangle, and neither is a staircase that draws itself in under a
// `stroke-dashoffset` sweep. THE RULE THAT SURVIVES IS THE ONE THAT WAS LOAD-BEARING:
// ZERO SMIL NODES, at every pose, under any motion preference. Every mark here is a CSS
// animation, which the global `prefers-reduced-motion: reduce` rule can reach and an
// `<animate>` element cannot.
import type { CSSProperties, ReactNode } from "react";
// Section E's copy, the tree's de facto shared reveal primitive — see
// `./EnablementModel.tsx` for the ledger of who imports which of the three, and for why
// centralising them is a cleanup neither of this section's tickets is.
import { CopperRule, Reveal } from "@/slides/foundation-core-section-e/components/Reveal";
import { highlight } from "@/components/highlight";
import {
  CALENDAR_ROWS,
  CALENDAR_ROW_HEIGHT,
  CALENDAR_ROW_SIZE,
  CARD_BODY_OFFSET,
  CARD_GLYPH_OFFSET,
  CARD_HAIRLINE_OFFSET,
  CARD_HEIGHT,
  CARD_LABEL_HEIGHT,
  CARD_LABEL_SIZE,
  CARD_LINE_HEIGHT,
  CARD_LINE_LEADING,
  CARD_LINE_SIZE,
  CARD_PAD_X,
  CARD_PAD_Y,
  CARD_TARGET_SIZE,
  CARD_TARGET_TRACKING,
  CARD_TOP,
  CARD_WIDTH,
  CHIP_GAP_X,
  CHIP_HEIGHT,
  CONTENT_WIDTH,
  EYEBROW_TOP,
  GLYPH_SIZE,
  HERO_DASH_OFF,
  HERO_PATH_ABOVE,
  HERO_PATH_BELOW,
  HERO_PATH_PLAN,
  HERO_RUNG_LABEL_GAP,
  HERO_RUNG_LABEL_GUTTER,
  HERO_RUNG_LABEL_INSET,
  HERO_RUNG_NAME_LEADING,
  HERO_RUNG_NAME_SIZE,
  HERO_RUNG_SUB_GAP,
  HERO_RUNG_SUB_LEADING,
  HERO_RUNG_SUB_SIZE,
  HERO_STROKE_OFF,
  HERO_STROKE_PLAN,
  HERO_TREADS,
  HIGH_LEADER_BOTTOM,
  HIGH_LEADER_X0,
  HIGH_LEADER_X1,
  HIGH_LEADER_Y,
  HIGH_NOTE,
  LABEL_HEIGHT,
  LABEL_SIZE,
  LABEL_TRACKING,
  LOW_LEADER_BOTTOM,
  LOW_LEADER_TOP,
  LOW_LEADER_X,
  LOW_NOTE,
  NOTE_HEIGHT,
  NOTE_LABEL_HEIGHT,
  NOTE_LABEL_SIZE,
  NOTE_LABEL_TRACKING,
  NOTE_LINE_GAP,
  NOTE_LINE_LEADING,
  NOTE_LINE_SIZE,
  NOTE_PAD_X,
  NOTE_PAD_Y,
  NOTE_WIDTH,
  PHASE_COUNT,
  PLAN_TAG,
  PROVENANCE_HEIGHT,
  PROVENANCE_LEADING,
  PROVENANCE_SIZE,
  PROVENANCE_TOP,
  RECAP_CAL_OFFSET,
  RECAP_CAL_ROW_HEIGHT,
  RECAP_CAL_SIZE,
  RECAP_COL_HEIGHT,
  RECAP_COL_TOP,
  RECAP_COL_WIDTH,
  RECAP_GATE_LINE_HEIGHT,
  RECAP_GATE_LINES,
  RECAP_GATE_OFFSET,
  RECAP_GATE_SIZE,
  RECAP_GLYPH_GAP,
  RECAP_GLYPH_SIZE,
  RECAP_HEAD_SIZE,
  RECAP_PATH_ABOVE,
  RECAP_PATH_BELOW,
  RECAP_PATH_PLAN,
  RECAP_PAD_X,
  RECAP_PAD_Y,
  RECAP_RUNG_LABEL_GAP,
  RECAP_RUNG_LABEL_GUTTER,
  RECAP_RUNG_LABEL_HEIGHT,
  RECAP_RUNG_LABEL_INSET,
  RECAP_RUNG_LABEL_SIZE,
  RECAP_STROKE,
  RECAP_TREADS,
  RULE_HEIGHT,
  RULE_TOP,
  SIDE_MARGIN,
  STAGE,
  THESIS_HEIGHT,
  THESIS_TEXT_SIZE,
  THESIS_TOP,
  cardLeft,
  chipTop,
  recapColLeft,
} from "../phases-gates-geometry";
// The two things K.1 and K.2 print identically — the mono register and the reveal's
// lead-in. See that module for what stays local here and why.
import { REVEAL_LEAD_MS, SHARED_TIER, mono } from "../type-registers";
import {
  mandatePhasesGatesContent as C,
  phasesOnRung,
  rungOf,
  type PhaseCalendar,
  type PhasesGatesBrandBlock,
} from "../content";
import { PHASE_GLYPH_IDS, PhaseGlyph, type PhaseGlyphId } from "./PhaseGlyphs";
import "./phases.css";

// ───────────────────── the pin between the copy and the marks ─────────────────────

/**
 * Every glyph the copy names has actually been drawn — checked ONCE, AT MODULE LOAD.
 *
 * `../content.ts` types `stateGlyph` and `gateGlyph` as `string`, because a content
 * module may not import a component; `./PhaseGlyphs.tsx` owns the union of ids a mark
 * exists for. The cast at the call sites below is a promise, and this is where the
 * promise is kept. Without it, a phase whose `gateGlyph` is `"budget"` would compile,
 * pass every type check, and print an 88px hole in the middle of a card that no bounding
 * check reports.
 *
 * AT LOAD AND NOT IN A `useEffect`, so the failure lands in every deck that composes
 * this slide and in every test that imports it — not only in the ones that happen to
 * render pose 1. K.1's figure holds the identical guard over its own ten.
 */
const DRAWN: ReadonlySet<string> = new Set(PHASE_GLYPH_IDS);
for (const phase of C.phases) {
  for (const id of [phase.stateGlyph, phase.gateGlyph]) {
    if (!DRAWN.has(id)) {
      throw new Error(
        `PhaseLadder: phase "${phase.id}" names the mark "${id}", which nothing draws — ` +
          `\`./PhaseGlyphs.tsx\` has ${PHASE_GLYPH_IDS.join(", ")}.`,
      );
    }
  }
}

// ───────────────────── the tiers, in one table ─────────────────────

/**
 * One tier per ROLE, and — on the staircase — one pair per role, for the rungs the plan
 * reaches and the two it does not.
 *
 * THE STAIRCASE IS RANKED AND THE CARDS ARE NOT, which is K.1's split and the same kind
 * of decision. Four phases are four pieces of work of equal standing — a plan that dimmed
 * P3 would be saying the far end matters less, which is the opposite of what a slide
 * about gates argues — so every card is drawn identically. The RUNGS are ranked, because
 * three are on the plan and two are not, and that difference is the only thing the
 * staircase says beyond naming them.
 *
 * TWO TIERS AND NOT AN OPACITY. An unlit rung at 40% would read as a rung the slide had
 * not finished revealing, which on a step-reveal deck is a specific, wrong meaning.
 *
 * IT NAMES THE TWO ENTRIES IT SHARES RATHER THAN SPREADING {@link SHARED_TIER}, which is
 * the call K.1's table makes and the reason is now this slide's too: the four `band*`
 * tokens in that module belong to K.3 alone as of this ticket, and a spread here would
 * quietly re-adopt four colours this stage no longer prints.
 */
const TIER = {
  /** The mono line under the headline — one per scene, and the copper label tier every
   *  sibling leader slide gives the same line. */
  eyebrow: SHARED_TIER.heading,
  /** The ask. One tier over the scene lines and one under the headline. */
  thesis: SHARED_TIER.closer,
  /** A scene's own bottom line — one tier under the ask, same size, same shelf. Rank on
   *  this stage is a colour tier and never a size. */
  sceneThesis: "var(--neutral-200)",

  /** A box: a hairline frame and a ground, and nothing else, so `.box-hover`'s overlay
   *  can reach the border. */
  frame: "var(--copper-700)",
  ground: "var(--neutral-900)",

  /** A card's own name — `P0`. The loud token, because it is what ties the card to the
   *  chip on the staircase. */
  cardLabel: "var(--copper-300)",
  /** The rung and the state beside it — a POINTER at the staircase, not a claim. */
  cardTarget: "var(--neutral-300)",
  /** Every gate line, and the deck's sentence where a roadmap runs out. gh#50's floor,
   *  which is where a definition belongs: quietest, still legible from the back row. */
  line: "var(--neutral-300)",
  /** The organisation's own calendar rows. Brighter than the deck's own prose, because
   *  they are the one thing on the card the room can check. */
  calendar: "var(--neutral-100)",
  /** The citation under them. Same tier as the gates: it is a source, not an argument. */
  provenance: "var(--neutral-300)",

  /** The two notes on the ladder scene. DASHED, which is `gap-capability-ladder`'s own
   *  mark for a claim nobody has earned, spent here on the two rungs no phase reaches. */
  noteBorder: "1px dashed var(--copper-600)",
  noteLabel: "var(--neutral-300)",
  noteLine: "var(--neutral-300)",
  leader: "var(--copper-600)",

  /** A rung name the plan reaches, and one it does not. `--neutral-300` is gh#50's floor
   *  for text on this stage — the unlit rungs sit ON the floor and never under it,
   *  because L1 and L5 are read, not merely present. */
  rungOn: "var(--neutral-50)",
  rungOff: "var(--neutral-300)",
  /** The rung's `L2`, in the copper the ladder itself gives that token — the same span
   *  `CapabilityLadder` wraps `rung.level` in, one section apart. */
  rungLevel: "var(--copper-300)",
  /** A rung's definition, on the hero pose. */
  rungSub: "var(--neutral-300)",

  /** A stretch of staircase no phase reaches. The lit run takes a gradient instead —
   *  see {@link CLIMB_ID}. */
  stairOff: "var(--copper-700)",
  /** The tag over the lit run. */
  planTag: "var(--copper-200)",

  /** A phase chip on its tread: a hairline box, filled, so it reads as standing ON the
   *  step rather than floating over it. */
  chipBorder: "1px solid var(--copper-500)",
  chipBackground: "var(--copper-950)",
  chipLabel: "var(--copper-100)",
} as const;

/**
 * The gradient the lit run is stroked with — ONE HUE, THREE TIERS OF IT, mapped left to
 * right across the staircase, so the climb reads as a climb before a word of it is read.
 * B.4's device, and its stops.
 *
 * A NEW ID AND NOT B.4's `gap-ladder-climb`, because an SVG id is document-global and two
 * slides can be in the DOM at once during a transition. A shared id would have one
 * slide's gradient silently painting the other's staircase.
 */
const CLIMB_ID = { hero: "pg-ladder-climb-hero", recap: "pg-ladder-climb-recap" } as const;
/** The arrowhead on the two leaders. Same reasoning about the id. */
const ARROW_ID = "pg-note-arrow";

// ───────────────────── type registers ─────────────────────
// FOUR FAMILIES, each earning its place: mono for anything either room reads as a LABEL,
// sans for anything it reads as a SENTENCE, `--display` for a rung's name (a rung name is
// a title, and `gap-capability-ladder` sets it in the display serif), and `--serif` for
// the four bottom lines, which are the deck's argument register.
//
// The MONO half is `../type-registers.ts`'s, shared with K.1 because the two rooms see
// the same labels one click apart; the SANS halves are this file's, because they are cut
// against this slide's own column widths.
//
// Both floors are gh#50's: 9.5px for a mono label, 10.5px for prose, and nothing here
// rests below `--neutral-300`. Neither is enforced from this file — a computed font size
// is not something jsdom has — so the sizes are stated once, in
// `../phases-gates-geometry.ts`, where a reviewer can check them against the floor in one
// place.

/** The sans SENTENCE register on a card — the gates, and the line a card prints where a
 *  roadmap runs out. Not mono: a mono sentence under a mono calendar reads as part of the
 *  calendar. */
const sentence: CSSProperties = {
  fontFamily: "var(--sans)",
  fontSize: CARD_LINE_SIZE,
  lineHeight: CARD_LINE_LEADING,
  color: TIER.line,
};

/** The same register, cut smaller for the recap's narrower, shorter column. */
const recapSentence: CSSProperties = {
  fontFamily: "var(--sans)",
  fontSize: RECAP_GATE_SIZE,
  lineHeight: `${RECAP_GATE_LINE_HEIGHT}px`,
  color: TIER.line,
};

/** Geometry, a border and a ground — and NOTHING ELSE, which is what lets `.box-hover`'s
 *  overlay reach the border. An inline `borderColor` would win against every stylesheet
 *  rule at any specificity, so the hover is painted by a pseudo-element instead and this
 *  helper stays the only place a box's own chrome is written. */
function shell(left: number, top: number, width: number, height: number): CSSProperties {
  return {
    position: "absolute",
    left,
    top,
    width,
    height,
    boxSizing: "border-box",
    border: `1px solid ${TIER.frame}`,
    background: TIER.ground,
  };
}

// ───────────────────── the timetable ─────────────────────

/**
 * How far behind the one before it each element of a scene arrives.
 *
 * ONE LEAD-IN AND ONE STAGGER FOR THE WHOLE SLIDE, unlike the figure this replaced,
 * which had a different stagger for the staircase and the columns. Four scenes that each
 * revealed at their own speed would read as four slides rather than as one argument
 * walked, and the room has no way to name what changed. The lead-in is `REVEAL_LEAD_MS`,
 * shared with K.1 and K.3 (`../type-registers.ts`), because the click is shared; 90ms is
 * `leader-invest`'s own step and K.1's.
 */
const STAGGER_MS = 90;

/** How many steps into a scene an element arrives, as milliseconds of delay. */
const delay = (step: number) => REVEAL_LEAD_MS + step * STAGGER_MS;

/** Where each scene's first elements sit in its own reveal order. */
const SCENE_STEP = { eyebrow: 0, first: 1 } as const;

/**
 * The ladder scene's own beats.
 *
 * THE STAIRCASE DRAWS FIRST AND THE NOTES ARRIVE AFTER IT, because a dashed box pointing
 * at a tread that has not been drawn yet is a box pointing at nothing. The two dead ends
 * fade rather than draw — a `stroke-dasharray` set by a class beats a `strokeDasharray`
 * attribute on the same element, so a path cannot both sweep AND look dashed, and given
 * the two the dash is the one carrying meaning. B.4 records making the identical trade.
 */
const LADDER_DRAW_MS = 1100;
const LADDER_BEAT = {
  plan: 0,
  /** Per rung, so the five names land as the sweep passes them. */
  rung: (i: number) => 1 + i,
  note: SCENE_STEP.first + 5,
  tag: SCENE_STEP.first + 6,
} as const;

/**
 * When a scene's own bottom line arrives — LAST, on every one of the three heroes.
 *
 * DERIVED FROM EACH SCENE'S OWN COUNT, so a fifth phase or a sixth rung takes its
 * scene's line with it. And last rather than first because the sentence is an ARGUMENT
 * about the set above it: read before the set it is an assertion the room has nothing to
 * check against; read after it, it is a conclusion.
 */
const LADDER_THESIS_STEP = LADDER_BEAT.tag + 1;
const CARD_THESIS_STEP = SCENE_STEP.first + PHASE_COUNT;
/** Scene 1 alone prints the citation, and it lands between the cards and the line that
 *  argues about them — it is evidence for the cards, not part of the argument. */
const PROVENANCE_STEP = SCENE_STEP.first + PHASE_COUNT;
const PROVENANCE_THESIS_STEP = PROVENANCE_STEP + 1;

/** The recap: the staircase, then its chips, then the columns. Two steps of lead for the
 *  chips, so the treads are all on stage before anything stands on one. */
const RECAP_STEP = {
  rung: (i: number) => SCENE_STEP.first + i,
  chip: (i: number) => SCENE_STEP.first + 1 + i,
  col: (i: number) => SCENE_STEP.first + 2 + i,
} as const;

const THESIS_STEP = { rule: 0, thesis: 1 } as const;

// ───────────────────── one card, two scenes ─────────────────────

/**
 * A phase card. ONE COMPONENT AND ONE SHELF FOR BOTH SCENES, because they ARE one object:
 * a phase's name, the rung it leaves you on, a rule, a mark, and one body.
 *
 * ONLY THE MARK AND THE BODY DIFFER between the two poses. Given two components the click
 * from dates to gates would re-layout, and a room reads that as the stage settling rather
 * than as one column answering its own question.
 */
function PhaseCard({
  id,
  label,
  target,
  glyph,
  index,
  kind,
  children,
}: {
  id: string;
  label: string;
  target: string;
  glyph: PhaseGlyphId;
  index: number;
  /** `phase` or `gate` — the test id's own middle, so a walk of the stage can tell which
   *  scene a card belongs to without reading its copy. */
  kind: string;
  children: ReactNode;
}) {
  const inner = CARD_WIDTH - 2 * CARD_PAD_X;
  return (
    <Reveal
      on
      delay={delay(SCENE_STEP.first + index)}
      className="box-hover pg-card"
      data-testid={`phases-${kind}-${id}`}
      style={shell(cardLeft(index), CARD_TOP, CARD_WIDTH, CARD_HEIGHT)}
    >
      {/* NO `highlight()` ON A LABEL, HERE OR ANYWHERE ON THIS STAGE. Every label is a
          name and carries no `*Kw` sibling by construction (`../content.ts`'s keyword
          rule); a copper italic inside a 12.5px uppercase name would emphasise a fragment
          of it and read as a rendering fault. */}
      <div
        data-testid={`phases-${kind}-label-${id}`}
        style={{
          position: "absolute",
          left: CARD_PAD_X,
          top: CARD_PAD_Y,
          width: inner,
          height: CARD_LABEL_HEIGHT,
          ...mono(CARD_LABEL_SIZE, TIER.cardLabel, LABEL_TRACKING),
          lineHeight: 1.35,
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </div>
      {/* THE RUNG AND THE STATE, on the label's own line and hard against the right edge.
          `L2 · CLAIMED` reads as two facts; `L2 CLAIMED` would read as a rung called "L2
          CLAIMED", which is precisely the re-labelling this slide must not do — the four
          states are ADJECTIVES on `gap-capability-ladder`'s rungs and never a second
          ladder. The rung's LEVEL and nothing else: its title is on the staircase, where
          there is room for it. */}
      <div
        data-testid={`phases-${kind}-target-${id}`}
        style={{
          position: "absolute",
          left: CARD_PAD_X,
          top: CARD_PAD_Y + 3,
          width: inner,
          textAlign: "right",
          ...mono(CARD_TARGET_SIZE, TIER.cardTarget, CARD_TARGET_TRACKING),
          lineHeight: 1.3,
          whiteSpace: "nowrap",
        }}
      >
        {target}
      </div>
      {/* THE HAIRLINE — what a thing is CALLED, above; what it SHOWS, below. Its colour
          lives in `./phases.css` and not here, because it has two states: it brightens
          with the border under the pointer, and a colour with two states belongs where
          both can be written. */}
      <div
        className="pg-hairline"
        data-testid={`phases-${kind}-hairline-${id}`}
        style={{
          position: "absolute",
          left: CARD_PAD_X,
          top: CARD_HAIRLINE_OFFSET,
          width: inner,
          height: 1,
        }}
      />
      {/* THE MARK, centred on the card. `left` is arithmetic and not `margin: auto`,
          because the card is a positioned box and every other child in it is placed the
          same way — one placement idiom per box is what makes a geometry module worth
          having. */}
      <div
        style={{
          position: "absolute",
          left: (CARD_WIDTH - GLYPH_SIZE) / 2,
          top: CARD_GLYPH_OFFSET,
        }}
      >
        <PhaseGlyph id={glyph} size={GLYPH_SIZE} testId={`phases-glyph-${kind}-${id}`} />
      </div>
      <div
        data-testid={`phases-${kind}-body-${id}`}
        style={{
          position: "absolute",
          left: CARD_PAD_X,
          top: CARD_BODY_OFFSET,
          width: inner,
          height: CARD_LINE_HEIGHT,
        }}
      >
        {children}
      </div>
    </Reveal>
  );
}

/**
 * One card's calendar slot — the organisation's own rows, or the deck's sentence where
 * the roadmap runs out.
 *
 * THE TWO ARMS RENDER IN DIFFERENT REGISTERS ON PURPOSE (see `PhaseCalendar` in
 * `../content.ts`): mono uppercase for dates and programme names somebody else published,
 * sans prose for the deck's own statement about their absence. A shared register would
 * make the second read as a date that failed to load.
 */
function Calendar({
  calendar,
  size,
  rowHeight,
  prose,
}: {
  calendar: PhaseCalendar;
  size: number;
  rowHeight: number;
  /**
   * The sans register the `ours` arm prints in — THE CALLER'S, and never derived from
   * `size`.
   *
   * IT HAS TO BE THE REGISTER THE GATE USES IN THAT BOX, because the two land in the same
   * slot one click apart: on a hero card a 12.5px absence line under a 15px gate would
   * make P2 and P3 look like columns the slide cared less about, and rank on this stage is
   * a colour tier and never a size. The mono `size` above governs the `theirs` arm only —
   * those are somebody else's labels and are set in the label register at the label's own
   * scale.
   */
  prose: CSSProperties;
}) {
  if (calendar.kind === "ours") {
    return <div style={prose}>{highlight(C.beyondRoadmap, C.beyondRoadmapKw)}</div>;
  }
  return (
    <>
      {calendar.rows.map((row) => (
        <div
          key={row}
          style={{ ...mono(size, TIER.calendar, 0.06), lineHeight: `${rowHeight}px` }}
        >
          {row}
        </div>
      ))}
    </>
  );
}

/**
 * The bottom line of the slide — a hero scene's own conclusion, or the thesis.
 *
 * ONE COMPONENT AND ONE SHELF FOR ALL FOUR, which is the whole point of it: the room
 * learns after one click that the sentence at the foot of the stage is the takeaway, and
 * it is in the same place, at the same size, in the same register every time. What
 * differs is the TIER — one step down for a scene, brightest for the ask — and whether a
 * copper rule stands over it, which only the ask gets because only the ask is about the
 * whole plan rather than about the frame above it.
 */
function BottomLine({
  text,
  kw,
  step,
  tier,
  testId,
}: {
  text: string;
  kw: readonly string[];
  step: number;
  tier: string;
  testId: string;
}) {
  return (
    <Reveal
      on
      as="p"
      delay={delay(step)}
      data-testid={testId}
      style={{
        position: "absolute",
        left: SIDE_MARGIN,
        top: THESIS_TOP,
        width: CONTENT_WIDTH,
        height: THESIS_HEIGHT,
        margin: 0,
        fontFamily: "var(--serif)",
        fontSize: THESIS_TEXT_SIZE,
        lineHeight: 1.3,
        color: tier,
        // A SENTENCE MAY NOT TAKE A POINTER. It spans the full width on a shelf under a
        // row of boxes; nothing here is hoverable and a wide invisible line would eat a
        // hover the day a scene's floor moved.
        pointerEvents: "none",
      }}
    >
      {highlight(text, kw)}
    </Reveal>
  );
}

/** One of the two dashed notes on the ladder scene. A BOX AND NOT A CAPTION, because the
 *  dash is the encoding: `gap-capability-ladder` spends it on a claim nobody has earned,
 *  and these two name the rungs no phase reaches. */
function LadderNote({
  note,
  left,
  top,
  step,
  testId,
}: {
  note: { readonly label: string; readonly line: string };
  left: number;
  top: number;
  step: number;
  testId: string;
}) {
  return (
    <Reveal
      on
      delay={delay(step)}
      className="box-hover pg-card"
      data-testid={testId}
      style={{
        position: "absolute",
        left,
        top,
        width: NOTE_WIDTH,
        height: NOTE_HEIGHT,
        boxSizing: "border-box",
        padding: `${NOTE_PAD_Y}px ${NOTE_PAD_X}px`,
        border: TIER.noteBorder,
        background: "transparent",
        zIndex: 3,
      }}
    >
      <div
        data-testid={`${testId}-label`}
        style={{
          height: NOTE_LABEL_HEIGHT,
          ...mono(NOTE_LABEL_SIZE, TIER.noteLabel, NOTE_LABEL_TRACKING),
          lineHeight: 1.3,
          whiteSpace: "nowrap",
        }}
      >
        {note.label}
      </div>
      <div
        data-testid={`${testId}-line`}
        style={{
          marginTop: NOTE_LINE_GAP,
          fontFamily: "var(--sans)",
          fontSize: NOTE_LINE_SIZE,
          lineHeight: NOTE_LINE_LEADING,
          color: TIER.noteLine,
        }}
      >
        {note.line}
      </div>
    </Reveal>
  );
}

// ───────────────────── the figure ─────────────────────

export interface PhaseLadderProps {
  /** The brand's resolved block — `phasesGatesFor(VARIANT.brand)`. */
  content: PhasesGatesBrandBlock;
  /** 0…4. See the slide file for what each pose argues. */
  pose: number;
}

export function PhaseLadder({ content, pose }: PhaseLadderProps) {
  // THREE `===` TESTS AND TWO `>=`, and the split between them is the argument — see the
  // file header. The three HEROES are exclusive: each replaces the one before it, because
  // each is a different figure in the same region of stage. THE RECAP AND THE THESIS ARE
  // NOT: the thesis is what the recap is FOR, so it lands under a frame that stays put.
  const ladder = pose === 0;
  const phases = pose === 1;
  const gates = pose === 2;
  const plan = pose >= 3;
  const thesis = pose === 4;

  const { rungs } = C;

  /** The eyebrow shelf, shared by all four scenes and empty on the fifth. One box, four
   *  strings, never two at once — and the shelf is y=156, which is the 2026-08-15 fix for
   *  the complaint that a mono line at 134 read as the headline's second line. */
  const eyebrow = (text: string, testId: string) => (
    <Reveal
      on
      delay={delay(SCENE_STEP.eyebrow)}
      data-testid={testId}
      style={{
        position: "absolute",
        left: SIDE_MARGIN,
        top: EYEBROW_TOP,
        width: CONTENT_WIDTH,
        height: LABEL_HEIGHT,
        ...mono(LABEL_SIZE, TIER.eyebrow, LABEL_TRACKING),
        lineHeight: 1.3,
        whiteSpace: "nowrap",
        // AN EYEBROW MAY NOT TAKE A POINTER. It spans the full width on a shelf 26px
        // above a row of boxes; a wide invisible line over them would eat the hover of
        // whatever it overlapped the day a scene's shelf moved. `.box-hover` is on the
        // boxes, and this is not one.
        pointerEvents: "none",
      }}
    >
      {text}
    </Reveal>
  );

  return (
    <>
      {/* ═══════════════ SCENE 0 · THE LADDER ═══════════════
          THE ROOM READS THE VOCABULARY IT ALREADY KNOWS BEFORE ANYTHING IS PLACED ON IT.
          Five rungs, drawn at `gap-capability-ladder`'s own scale and in its own idiom —
          a `<path>` sweeping itself in over a left-to-right copper gradient, with the two
          stretches no phase reaches in the dash that slide spends on "not claimed". Three
          lit of five is the scene's whole claim, and no string on the stage states it:
          the two notes name the two dead ends, and the tag names the live one. */}
      {ladder && (
        <>
          {eyebrow(C.ladderEyebrow, "phases-ladder-eyebrow")}

          {/* THE STAIRCASE LAYER, FIRST IN MARKUP so the notes paint over it. `.svg-layer`
              carries `pointer-events: none`, which is what keeps a full-stage `<svg>` from
              swallowing the hover of the two boxes on top of it. */}
          <svg
            className="svg-layer"
            data-testid="phases-ladder-svg"
            viewBox={`0 0 ${STAGE.width} ${STAGE.height}`}
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id={CLIMB_ID.hero}
                gradientUnits="userSpaceOnUse"
                x1={HERO_TREADS[0].x1}
                y1={0}
                x2={HERO_TREADS[HERO_TREADS.length - 1].x2}
                y2={0}
              >
                <stop offset="0" stopColor="var(--copper-700)" />
                <stop offset="0.5" stopColor="var(--copper-500)" />
                <stop offset="1" stopColor="var(--copper-200)" />
              </linearGradient>
              <marker
                id={ARROW_ID}
                viewBox="0 0 9 9"
                refX={9}
                refY={4.5}
                markerWidth={9}
                markerHeight={9}
                markerUnits="userSpaceOnUse"
                orient="auto"
              >
                <path d="M 0 0.5 L 9 4.5 L 0 8.5 Z" fill={TIER.leader} />
              </marker>
            </defs>

            {/* THE TWO DEAD ENDS. They FADE and do not draw, and that is forced rather
                than chosen: the draw-in IS a `stroke-dasharray`, and a class setting that
                property beats an attribute on the same element — so a path cannot both
                sweep and look dashed. Given the two, the dash is the one carrying meaning. */}
            <path
              className="pg-arrive"
              data-testid="phases-ladder-below"
              style={{ animationDelay: `${delay(LADDER_BEAT.plan) + LADDER_DRAW_MS}ms` }}
              d={HERO_PATH_BELOW}
              fill="none"
              stroke={TIER.stairOff}
              strokeWidth={HERO_STROKE_OFF}
              strokeDasharray={HERO_DASH_OFF}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              className="pg-arrive"
              data-testid="phases-ladder-above"
              style={{ animationDelay: `${delay(LADDER_BEAT.plan) + LADDER_DRAW_MS}ms` }}
              d={HERO_PATH_ABOVE}
              fill="none"
              stroke={TIER.stairOff}
              strokeWidth={HERO_STROKE_OFF}
              strokeDasharray={HERO_DASH_OFF}
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* THE PLAN'S OWN RUN, drawn last so it paints over both dashed ends at the
                two corners they share. */}
            <path
              className="pg-draw"
              data-testid="phases-ladder-plan"
              style={{
                animationDuration: `${LADDER_DRAW_MS}ms`,
                animationDelay: `${delay(LADDER_BEAT.plan)}ms`,
              }}
              d={HERO_PATH_PLAN}
              pathLength={1}
              fill="none"
              stroke={`url(#${CLIMB_ID.hero})`}
              strokeWidth={HERO_STROKE_PLAN}
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* THE TWO LEADERS. The low one drops straight onto L1's tread; the high one
                turns once, because L5's own label is under the tread it names and a box
                above it would sit inside the eyebrow's shelf. Both carry the arrowhead —
                these two POINT rather than tether, which is the distinction
                `gap-capability-ladder` draws between its aside and its chips. */}
            <line
              className="pg-arrive"
              data-testid="phases-low-leader"
              style={{ animationDelay: `${delay(LADDER_BEAT.note)}ms` }}
              x1={LOW_LEADER_X}
              y1={LOW_LEADER_TOP}
              x2={LOW_LEADER_X}
              y2={LOW_LEADER_BOTTOM}
              stroke={TIER.leader}
              strokeWidth={1.25}
              strokeDasharray="4 4"
              markerEnd={`url(#${ARROW_ID})`}
            />
            <path
              className="pg-arrive"
              data-testid="phases-high-leader"
              style={{ animationDelay: `${delay(LADDER_BEAT.note)}ms` }}
              d={`M ${HIGH_LEADER_X0} ${HIGH_LEADER_Y} L ${HIGH_LEADER_X1} ${HIGH_LEADER_Y} L ${HIGH_LEADER_X1} ${HIGH_LEADER_BOTTOM}`}
              fill="none"
              stroke={TIER.leader}
              strokeWidth={1.25}
              strokeDasharray="4 4"
              markerEnd={`url(#${ARROW_ID})`}
            />
          </svg>

          {/* THE RUNG NAMES AND THEIR DEFINITIONS, hung under each tread exactly as B.4
              hangs them, and staggered so the five land as the sweep passes them. The
              definitions are printed HERE and nowhere else on the slide: this is the one
              pose with room for them, and the recap three clicks later prints names only. */}
          {rungs.map((rung, i) => {
            const claimed = phasesOnRung(i).length > 0;
            const tread = HERO_TREADS[i];
            return (
              <Reveal
                key={rung.id}
                on
                delay={delay(LADDER_BEAT.rung(i))}
                data-testid={`phases-hero-rung-${rung.id}`}
                style={{
                  position: "absolute",
                  left: tread.x1 + HERO_RUNG_LABEL_INSET,
                  top: tread.y + HERO_RUNG_LABEL_GAP,
                  width: tread.x2 - tread.x1 - HERO_RUNG_LABEL_GUTTER,
                  pointerEvents: "none",
                  zIndex: 2,
                }}
              >
                <div
                  data-testid={`phases-hero-rung-name-${rung.id}`}
                  style={{
                    fontFamily: "var(--display)",
                    fontSize: HERO_RUNG_NAME_SIZE,
                    lineHeight: HERO_RUNG_NAME_LEADING,
                    color: claimed ? TIER.rungOn : TIER.rungOff,
                  }}
                >
                  <span style={{ color: TIER.rungLevel }}>{rung.level}</span> · {rung.title}
                </div>
                <div
                  data-testid={`phases-hero-rung-sub-${rung.id}`}
                  style={{
                    marginTop: HERO_RUNG_SUB_GAP,
                    fontFamily: "var(--sans)",
                    fontSize: HERO_RUNG_SUB_SIZE,
                    lineHeight: HERO_RUNG_SUB_LEADING,
                    color: TIER.rungSub,
                  }}
                >
                  {rung.sub}
                </div>
              </Reveal>
            );
          })}

          <LadderNote
            note={C.lowNote}
            left={LOW_NOTE.left}
            top={LOW_NOTE.top}
            step={LADDER_BEAT.note}
            testId="phases-low-note"
          />
          <LadderNote
            note={C.highNote}
            left={HIGH_NOTE.left}
            top={HIGH_NOTE.top}
            step={LADDER_BEAT.note}
            testId="phases-high-note"
          />

          <Reveal
            on
            delay={delay(LADDER_BEAT.tag)}
            data-testid="phases-plan-tag"
            style={{
              position: "absolute",
              left: PLAN_TAG.left,
              top: PLAN_TAG.top,
              width: PLAN_TAG.width,
              ...mono(LABEL_SIZE, TIER.planTag, 0.2),
              lineHeight: 1.3,
              whiteSpace: "nowrap",
              pointerEvents: "none",
              zIndex: 2,
            }}
          >
            {C.planTag}
          </Reveal>

          <BottomLine
            text={C.ladderThesis}
            kw={C.ladderThesisKw}
            step={LADDER_THESIS_STEP}
            tier={TIER.sceneThesis}
            testId="phases-ladder-thesis"
          />
        </>
      )}

      {/* ═══════════════ SCENE 1 · THE PHASES ═══════════════
          FOUR CARDS, AND THE DATES ON THEM ARE NOT OURS. Every row in a calendar slot is
          the organisation's own published window, in its own labels, cited underneath in
          its own words — which is what lets the next click take them away without the
          room feeling contradicted. Every mark here performs a calendar advancing. */}
      {phases && (
        <>
          {eyebrow(C.phasesEyebrow, "phases-phases-eyebrow")}
          {C.phases.map((phase, i) => (
            <PhaseCard
              key={phase.id}
              kind="phase"
              id={phase.id}
              label={phase.label}
              target={`${rungOf(phase.rungId).level} · ${phase.state}`}
              glyph={phase.stateGlyph as PhaseGlyphId}
              index={i}
            >
              <Calendar
                calendar={content.calendars[phase.id]}
                size={CALENDAR_ROW_SIZE}
                rowHeight={CALENDAR_ROW_HEIGHT}
                prose={sentence}
              />
            </PhaseCard>
          ))}

          {/* THE CITATION, under the four calendars it is the source for. Mono, sentence
              case, keyword-free — it is somebody else's document. */}
          <Reveal
            on
            delay={delay(PROVENANCE_STEP)}
            data-testid="phases-provenance"
            style={{
              position: "absolute",
              left: SIDE_MARGIN,
              top: PROVENANCE_TOP,
              width: CONTENT_WIDTH,
              height: PROVENANCE_HEIGHT,
              lineHeight: PROVENANCE_LEADING,
              pointerEvents: "none",
              ...mono(PROVENANCE_SIZE, TIER.provenance, 0.02, false),
            }}
          >
            {content.provenance}
          </Reveal>

          <BottomLine
            text={C.phasesThesis}
            kw={C.phasesThesisKw}
            step={PROVENANCE_THESIS_STEP}
            tier={TIER.sceneThesis}
            testId="phases-phases-thesis"
          />
        </>
      )}

      {/* ═══════════════ SCENE 2 · THE GATES ═══════════════
          THE SAME FOUR CARDS, ON THE SAME SHELF, WITH THE DATES GONE. This is the slide's
          turn and the whole reason the two scenes share one card: the room watches the
          organisation's calendar be replaced, in place, by what actually ends each phase.
          Every mark here performs a measurement that lands. */}
      {gates && (
        <>
          {eyebrow(C.gatesEyebrow, "phases-gates-eyebrow")}
          {C.phases.map((phase, i) => (
            <PhaseCard
              key={phase.id}
              kind="gate"
              id={phase.id}
              label={phase.label}
              target={`${rungOf(phase.rungId).level} · ${phase.state}`}
              glyph={phase.gateGlyph as PhaseGlyphId}
              index={i}
            >
              <div style={sentence}>{highlight(phase.gate, phase.gateKw)}</div>
            </PhaseCard>
          ))}
          <BottomLine
            text={C.gatesThesis}
            kw={C.gatesThesisKw}
            step={CARD_THESIS_STEP}
            tier={TIER.sceneThesis}
            testId="phases-gates-thesis"
          />
        </>
      )}

      {/* ═══════════════ SCENE 3 · THE WHOLE PLAN ═══════════════
          THE ONE FRAME THAT SAYS WHICH PHASE STANDS ON WHICH RUNG. The chips on the treads
          and the headers of the columns print the SAME phase labels, and that repetition
          is the only thing tying the two bands together — no hero pose can make it,
          because the staircase and the columns are never on stage together anywhere else.
          Every string here has already been read at three times the size. */}
      {plan && (
        <>
          {eyebrow(C.planEyebrow, "phases-plan-eyebrow")}

          <svg
            className="svg-layer"
            data-testid="phases-recap-svg"
            viewBox={`0 0 ${STAGE.width} ${STAGE.height}`}
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id={CLIMB_ID.recap}
                gradientUnits="userSpaceOnUse"
                x1={RECAP_TREADS[0].x1}
                y1={0}
                x2={RECAP_TREADS[RECAP_TREADS.length - 1].x2}
                y2={0}
              >
                <stop offset="0" stopColor="var(--copper-700)" />
                <stop offset="0.5" stopColor="var(--copper-500)" />
                <stop offset="1" stopColor="var(--copper-200)" />
              </linearGradient>
            </defs>
            <path
              data-testid="phases-recap-below"
              d={RECAP_PATH_BELOW}
              fill="none"
              stroke={TIER.stairOff}
              strokeWidth={RECAP_STROKE}
              strokeDasharray={HERO_DASH_OFF}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              data-testid="phases-recap-above"
              d={RECAP_PATH_ABOVE}
              fill="none"
              stroke={TIER.stairOff}
              strokeWidth={RECAP_STROKE}
              strokeDasharray={HERO_DASH_OFF}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* NO DRAW-IN ON THE RECAP'S STAIRCASE. The room watched this shape sweep
                itself in three clicks ago; drawing it a second time would make the recap
                read as a new figure rather than as the one it summarises, and the pose has
                nine boxes of its own to land. */}
            <path
              data-testid="phases-recap-plan"
              d={RECAP_PATH_PLAN}
              fill="none"
              stroke={`url(#${CLIMB_ID.recap})`}
              strokeWidth={RECAP_STROKE}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* THE RUNG NAMES, name only. The definitions were read at hero size three
              clicks ago and reprinting five of them would cost 65px of a pose that has
              four columns to show. */}
          {rungs.map((rung, i) => {
            const claimed = phasesOnRung(i).length > 0;
            const tread = RECAP_TREADS[i];
            return (
              <Reveal
                key={rung.id}
                on
                delay={delay(RECAP_STEP.rung(i))}
                data-testid={`phases-recap-rung-${rung.id}`}
                style={{
                  position: "absolute",
                  left: tread.x1 + RECAP_RUNG_LABEL_INSET,
                  top: tread.y + RECAP_STROKE + RECAP_RUNG_LABEL_GAP,
                  width: tread.x2 - tread.x1 - RECAP_RUNG_LABEL_INSET - RECAP_RUNG_LABEL_GUTTER,
                  height: RECAP_RUNG_LABEL_HEIGHT,
                  fontFamily: "var(--display)",
                  // WAS THE LITERAL `12.5` UNTIL 2026-08-15, while
                  // `../phases-gates-geometry.ts` exported `RECAP_RUNG_LABEL_SIZE = 12.5`
                  // that nothing read. Two copies of one coordinate, and the geometry
                  // module's copy was the one its own comment described — so a reader
                  // retuning the recap label there would have changed nothing on the stage.
                  fontSize: RECAP_RUNG_LABEL_SIZE,
                  lineHeight: 1.25,
                  color: claimed ? TIER.rungOn : TIER.rungOff,
                  pointerEvents: "none",
                }}
              >
                <span style={{ color: TIER.rungLevel }}>{rung.level}</span> · {rung.title}
              </Reveal>
            );
          })}

          {/* THE CHIPS — which phases land on which rung. A rung no phase reaches gets no
              chip and no placeholder, which is what leaves L1 and L5 bare without anybody
              maintaining a list of empty rungs (`phasesOnRung` in `../content.ts`). */}
          {rungs.map((rung, i) => {
            const landing = phasesOnRung(i);
            if (landing.length === 0) return null;
            return (
              <Reveal
                key={rung.id}
                on
                delay={delay(RECAP_STEP.chip(i))}
                data-testid={`phases-recap-chips-${rung.id}`}
                style={{
                  position: "absolute",
                  left: RECAP_TREADS[i].x1,
                  top: chipTop(i),
                  height: CHIP_HEIGHT,
                  display: "flex",
                  gap: CHIP_GAP_X,
                  pointerEvents: "none",
                }}
              >
                {landing.map((phase) => (
                  <div
                    key={phase.id}
                    data-testid={`phases-recap-chip-${phase.id}`}
                    style={{
                      padding: "0 7px",
                      lineHeight: `${CHIP_HEIGHT - 2}px`,
                      border: TIER.chipBorder,
                      background: TIER.chipBackground,
                      ...mono(10, TIER.chipLabel, 0.14),
                    }}
                  >
                    {phase.label}
                  </div>
                ))}
              </Reveal>
            );
          })}

          {/* THE FOUR COLUMNS — a mark, a header, the calendar and the gate, in one box.
              Both halves at once, which is what makes this a recap rather than a fourth
              scene: the two clicks the room has just seen, side by side. */}
          {C.phases.map((phase, i) => {
            const rung = rungOf(phase.rungId);
            const inner = RECAP_COL_WIDTH - 2 * RECAP_PAD_X;
            return (
              <Reveal
                key={phase.id}
                on
                delay={delay(RECAP_STEP.col(i))}
                className="box-hover pg-card"
                data-testid={`phases-recap-col-${phase.id}`}
                style={shell(recapColLeft(i), RECAP_COL_TOP, RECAP_COL_WIDTH, RECAP_COL_HEIGHT)}
              >
                <div
                  style={{
                    position: "absolute",
                    left: RECAP_PAD_X,
                    top: RECAP_PAD_Y,
                    width: inner,
                    height: RECAP_GLYPH_SIZE,
                    display: "flex",
                    alignItems: "center",
                    gap: RECAP_GLYPH_GAP,
                  }}
                >
                  <PhaseGlyph
                    id={phase.stateGlyph as PhaseGlyphId}
                    size={RECAP_GLYPH_SIZE}
                    testId={`phases-recap-glyph-${phase.id}`}
                  />
                  <span
                    data-testid={`phases-recap-head-${phase.id}`}
                    style={{
                      ...mono(RECAP_HEAD_SIZE, TIER.cardTarget, LABEL_TRACKING),
                      whiteSpace: "nowrap",
                    }}
                  >
                    <span style={{ color: TIER.cardLabel }}>{phase.label}</span> · {rung.level} ·{" "}
                    {phase.state}
                  </span>
                </div>
                <div
                  data-testid={`phases-recap-calendar-${phase.id}`}
                  style={{
                    position: "absolute",
                    left: RECAP_PAD_X,
                    top: RECAP_CAL_OFFSET,
                    width: inner,
                    height: CALENDAR_ROWS * RECAP_CAL_ROW_HEIGHT,
                  }}
                >
                  <Calendar
                    calendar={content.calendars[phase.id]}
                    size={RECAP_CAL_SIZE}
                    rowHeight={RECAP_CAL_ROW_HEIGHT}
                    prose={recapSentence}
                  />
                </div>
                <div
                  data-testid={`phases-recap-gate-${phase.id}`}
                  style={{
                    position: "absolute",
                    left: RECAP_PAD_X,
                    top: RECAP_GATE_OFFSET,
                    width: inner,
                    height: RECAP_GATE_LINES * RECAP_GATE_LINE_HEIGHT,
                    ...recapSentence,
                  }}
                >
                  {highlight(phase.gate, phase.gateKw)}
                </div>
              </Reveal>
            );
          })}
        </>
      )}

      {/* ═══════════════ POSE 4 · THE THESIS, UNDER THE PLAN ═══════════════
          IT ARRIVES ON TOP OF THE RECAP AND NOTHING ABOVE IT MOVES. The rule divides the
          SLIDE — above it the whole plan the room has been walked through, below it the
          one line the deck asks them to leave with — and it arrives BEFORE the sentence,
          because a rule that followed its own sentence would be underlining it.

          THE SHELF IS 590 AND THE SIZE IS 19px UPRIGHT SERIF, which is K.1's register and
          `leader-invest`'s before it, and not the 20px italic at 572 this slide used to
          close on. `../phases-gates-geometry.ts` carries the whole argument, including
          what it costs K.3. */}
      {thesis && (
        <>
          <div
            data-testid="phases-rule"
            style={{
              position: "absolute",
              left: SIDE_MARGIN,
              top: RULE_TOP,
              width: CONTENT_WIDTH,
              height: RULE_HEIGHT,
            }}
          >
            <CopperRule on delay={delay(THESIS_STEP.rule)} width="100%" />
          </div>
          <BottomLine
            text={content.closer}
            kw={content.closerKw}
            step={THESIS_STEP.thesis}
            tier={TIER.thesis}
            testId="phases-thesis"
          />
        </>
      )}
    </>
  );
}
