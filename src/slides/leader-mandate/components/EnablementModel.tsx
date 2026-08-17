// The enablement model: three blocks, four pillars, three tracks, all three in one frame, and
// then the thesis alone.
//
// ═══ FIVE POSES, THREE OF WHICH ARE EXCLUSIVE AND TWO OF WHICH ACCUMULATE — WHICH IS THE ONE
// THING TO UNDERSTAND BEFORE READING ANY OF IT. Its three sibling leader figures are
// `step-reveal` in the strict sense: a pose is everything argued so far, and nothing that has
// arrived ever leaves. This one is that for its last two poses and not for its first three.
//
// THE THREE HEROES REPLACE EACH OTHER, because each is a DIFFERENT FIGURE in the same region of
// stage — three blocks, then four pillars, then three lanes, each at 330px with an 88px animated
// mark. Two of them mounted at once is three cards printed over four.
//
// THE RECAP AND THE THESIS DO NOT, and that is the owner's correction (2026-08-14, second
// pass): the thesis is what the recap is FOR. Cleared to one sentence the room reads an assertion
// with its evidence gone; printed under the frame it summarises, it reads as the conclusion of the
// thing still in front of them. So pose 4 is pose 3 PLUS a rule and a line — the recap does not
// move, does not re-animate, and does not re-tile.
//
// THE OWNER'S BRIEF IS THE REASON (2026-08-14): "we don't need to squeeze all things into 1
// slide, that is why we have steps inside, we can have heroes on each step, but we can have n-1
// step to have the recap of all steps, while last step only showing the thesis." What stood here
// before squeezed two columns and a bordered band onto one stage, which meant nothing on it was
// ever bigger than a quarter of the room's attention. A hero per scene buys an 88px mark and a
// 330px card for every one of the ten things this slide names; the recap buys back the
// relationships the heroes cannot show side by side.
//
// ═══ WHICH IS WHY EVERY SCENE IS CONDITIONALLY MOUNTED AND NOT GATED. `Reveal` gates — it holds
// an element at `opacity: 0` and transitions it in — and gating is right when a pose ADDS to what
// is on stage, because the walk backwards then subtracts in one frame. It is wrong here twice
// over: two gated scenes in the same region would cross-fade INTO EACH OTHER, three cards and
// four cards overlapping mid-transition; and a gated scene's arrival choreography plays once, at
// slide mount, so walking back to pose 0 would find the blocks already there rather than landing
// again. Mounting with the scene fixes both — React unmounts the departing figure in the same
// frame, and every `Reveal` inside the arriving one runs its stagger from scratch. It is the
// device `../../leader-gap/components/NoSopBeats.tsx` reserves for exactly this case.
//
// ═══ THE MOTION IS THE ARGUMENT. `./enablement.css` carries all of it and the whole reasoning;
// the short form is that the three BLOCK marks all perform a FAILURE (a dot that reaches a gate
// and comes back, a square that never closes, an arrow that recoils), the four PILLAR marks all
// perform a STRUCTURE WORKING and repeating (a key turning, a line rewritten, a hammer striking,
// a person still reachable), and the three TRACK marks all perform REACH. The
// recap adds one more: a current that keeps running from each block to the pillars that answer
// it, because the blocks are a standing cause rather than an event.
//
// ═══ IT READS NO VARIANT AND NO BRAND, and since the 2026-08-14 re-cut it prints no
// organisation's name at any pose either. `../content.ts` carries that argument at length; the
// short form is that the three blocks are what this workshop meets in BOTH rooms, so the slide
// that used to carry one organisation's quoted brief now carries nobody's.
//
// ═══ CSS VARS ONLY, no hex and no rgba() literals. Rank is a COLOUR TIER — down the three lanes,
// and between a card's name and its line — and never opacity, which here means "not arrived yet",
// i.e. time.
//
// ═══ ONE `<svg>`, ZERO SMIL, and the `<svg>` exists for one reason: the recap's four connectors.
// Four cubic curves crossing a 58px gutter cannot be drawn with `<div>`s, and they are the one
// thing on the slide that has to be drawn rather than faded — a connector that appeared would
// assert a wiring, a connector that draws SHOWS one. Everything else on every scene is a plain
// box. No `<animate>`, `<animateTransform>`, `<animateMotion>`, `<set>` or `<animateColor>`
// element at any pose: SMIL is invisible to `globals.css`'s reduced-motion squash and would need
// a `matchMedia` gate at mount, and a CSS animation is not and does not.
//
// ═══ EVERY BOX ON EVERY SCENE CARRIES `.box-hover`, which is the owner's rule and the reason the
// track rows became boxes at all. The class is `src/styles/globals.css`'s: a pseudo-element at
// `inset: -1px` carrying `border: inherit` at `--copper-200` over a 6% copper wash, so the whole
// painted rectangle answers the pointer and a pointer over the label, the hairline, the mark or
// the line is a pointer over the box. It is a pseudo-element rather than the box's own properties
// because these boxes declare their border INLINE beside their geometry, and an inline
// declaration outranks every stylesheet rule at any specificity.
import type { CSSProperties, ReactNode } from "react";
// Section E's copy, the tree's de facto shared reveal primitive. `CopperRule` comes with it and
// is what draws the line over the thesis — it GROWS from the left rather than fading, which is
// what makes a rule read as a division of the stage rather than as another thing arriving on it.
import { CopperRule, Reveal } from "@/slides/foundation-core-section-e/components/Reveal";
import { highlight } from "@/components/highlight";
import { EnablementGlyph, GLYPH_IDS, type GlyphId } from "./EnablementGlyphs";
import {
  BLOCK_CARD_WIDTH,
  BLOCK_COUNT,
  CARD_GLYPH_OFFSET,
  CARD_HAIRLINE_OFFSET,
  CARD_HEIGHT,
  CARD_LABEL_HEIGHT,
  CARD_LABEL_SIZE,
  CARD_LINE_HEIGHT,
  CARD_LINE_LEADING,
  CARD_LINE_OFFSET,
  CARD_LINE_SIZE,
  CARD_PAD_X,
  CARD_PAD_Y,
  CARD_TOP,
  CHIP_GLYPH_GAP,
  CHIP_GLYPH_SIZE,
  CHIP_HEIGHT,
  CHIP_LABEL_SIZE,
  CHIP_PAD_X,
  CONTENT_WIDTH,
  EYEBROW_TOP,
  GLYPH_SIZE,
  LABEL_HEIGHT,
  LABEL_SIZE,
  LABEL_TRACKING,
  LANE_BAR_OFFSET,
  LANE_FULL_WIDTH,
  LANE_GLYPH_SIZE,
  LANE_HEIGHT,
  LANE_TEXT_X,
  PILLAR_CARD_WIDTH,
  PILLAR_COUNT,
  RECAP_COLUMN_WIDTH,
  RECAP_DIVIDER_X,
  RECAP_HEAD_HEIGHT,
  RECAP_HEAD_SIZE,
  RECAP_HEAD_TOP,
  RECAP_LANE_HEIGHT,
  RULE_HEIGHT,
  RULE_TOP,
  SIDE_MARGIN,
  STAGE,
  THESIS_HEIGHT,
  THESIS_TEXT_SIZE,
  THESIS_TOP,
  TRACK_COUNT,
  TRACK_LINE_OFFSET,
  TRACK_LINE_SIZE,
  TRACK_NAME_OFFSET,
  TRACK_NAME_SIZE,
  TRACK_PAD_X,
  TRACK_ROW_HEIGHT,
  blockCardLeft,
  chipTop,
  connectorPath,
  laneFraction,
  laneWidth,
  pillarCardLeft,
  recapColumnLeft,
  recapLaneWidth,
  trackRowTop,
} from "../enablement-geometry";
// The two things all three MANDATE figures print identically — the mono register and the
// reveal's lead-in. See that module for what stays local here and why.
import { REVEAL_LEAD_MS, SHARED_TIER, mono } from "../type-registers";
import { mandateEnablementContent as C } from "../content";
import "./enablement.css";

// ───────────────────── the one cast, checked ─────────────────────

/**
 * Every id this figure renders has a mark drawn for it — checked once, at module load.
 *
 * THE CAST IS THE REASON THIS EXISTS. `../content.ts` types every `id` as `string`, so the ten
 * call sites below write `block.id as GlyphId`, and a cast is a promise the compiler stops
 * checking. `./EnablementGlyphs.tsx` is exhaustive over the union in the OTHER direction — a mark
 * it forgets to draw is a compile error there — but nothing type-level catches a piece of copy
 * whose id no mark answers: `glyphFor` would fall off the end of its switch and return
 * `undefined`, which renders as an 88px hole in the middle of a card that no bounding check
 * reports and no screenshot diff flags on a dark stage.
 *
 * A THROWING IIFE AND NOT A TEST, for the reason `../enablement-geometry.ts`'s floor guard is one:
 * a module that throws at load paints a blank stage, which is the loudest failure available and
 * the one nobody ships. A test would catch it too, one commit later, after the review that read
 * the copy and not the marks.
 *
 * @throws naming every id the copy has and no mark answers.
 */
(() => {
  const drawn = new Set<string>(GLYPH_IDS);
  const missing = [...C.blocks, ...C.pillars, ...C.tracks]
    .map((item) => item.id)
    .filter((id) => !drawn.has(id));
  if (missing.length > 0) {
    throw new Error(
      `EnablementModel: no mark drawn for ${missing.join(", ")}. Every block, pillar and track ` +
        "carries a glyph of its own verb; add a case to ./EnablementGlyphs.tsx (and its id to " +
        "GLYPH_IDS) or the card renders with a hole where its mark belongs.",
    );
  }
})();

// ───────────────────── the tiers, in one table ─────────────────────

/**
 * One tier per ROLE, and not one per box — brightest first, under the headline's `--neutral-50`.
 *
 *   role         token           register
 *   eyebrow      --copper-400    11px mono caps — one of four, one per scene
 *   recapHead    --copper-400    10.5px mono caps — the recap's three column heads
 *   cardLabel    --copper-100    12.5px mono caps — a card's own name
 *   name         --neutral-100   13px mono caps — a track's name; a chip's name
 *   line         --neutral-300   15px sans — what a card or a track means
 *   frame        --copper-700    every box border on every scene
 *   ground       --neutral-900   the one fill on the stage
 *   connector    --copper-600    the four drawn curves
 *   current      --copper-300    the dots travelling them
 *   divider      --copper-900    the hairline between the pillars and the tracks
 *   thesis       --neutral-100   19px serif, alone on the last pose
 *
 * THE LEFT-HAND SCENES ARE DELIBERATELY UNRANKED. All three block cards and all four pillar
 * cards take one label tier, one line tier, one frame and one mark size — reading across, nothing
 * changes. A block that is missing from the list is a problem the programme does not address and
 * a pillar that is missing takes the other three down with it, so a brighter card would be a
 * claim nobody authored. THE TRACKS ARE RANKED, AND ONLY IN THE BAR ({@link laneTier}): the
 * ranking on this stage is DEPTH, and if the track NAMES dimmed with the lanes the figure would
 * also be ranking the tracks' importance — which would say the enablement of everyone matters
 * least, a claim the slide argues against.
 *
 * NOTHING IS EVER DIMMED TO PROMOTE ANYTHING (§7.1). Attention is bought with added light, every
 * time: the card under the pointer GAINS an overlay border, a brighter hairline and brighter glyph
 * strokes, and the cards beside it are byte for byte unchanged.
 *
 * TWO ENTRIES COME FROM {@link SHARED_TIER}, and only two. `../type-registers.ts` holds what the
 * section's figures print AS ONE OBJECT; after the 2026-08-14 re-cut this slide prints no band, so
 * the four band tokens there are K.2's and K.3's and are deliberately not spread in. The eyebrow
 * tier and the thesis tier are still shared, because a mono line under the headline and the
 * sentence the room leaves with are one object seen three times.
 */
const TIER = {
  eyebrow: SHARED_TIER.heading,
  recapHead: SHARED_TIER.heading,
  thesis: SHARED_TIER.closer,
  /** A scene's own bottom line. ONE TIER UNDER THE CLOSER and the SAME size on the SAME
   *  shelf: rank on this stage is a colour tier, and three scene-scoped sentences set
   *  smaller than the one that closes the slide would read as captions rather than as
   *  arguments. The other half of the separation is the closer's copper rule. */
  sceneThesis: "var(--neutral-200)",
  cardLabel: "var(--copper-100)",
  name: "var(--neutral-100)",
  line: "var(--neutral-300)",
  frame: "var(--copper-700)",
  ground: "var(--neutral-900)",
  connector: "var(--copper-600)",
  current: "var(--copper-300)",
  divider: "var(--copper-900)",
} as const;

/**
 * The copper ramp the lanes walk, dimmest first.
 *
 * SIX STOPS FOR THREE LANES, and that is the point: the ramp is INDEXED BY THE SAME FRACTION the
 * lane widths are cut from ({@link laneFraction}), so three tracks land on 800 / 500 / 300 and a
 * fourth would land on four evenly spread stops without anybody re-typing a colour. The rejected
 * shape was an array of three tokens beside an array of three tracks — two lists that agree today
 * and are one edit apart from disagreeing, with the failure showing up as two lanes the same
 * colour, which reads as a rendering fault rather than as a mistake.
 */
const LANE_RAMP = [
  "var(--copper-800)",
  "var(--copper-700)",
  "var(--copper-600)",
  "var(--copper-500)",
  "var(--copper-400)",
  "var(--copper-300)",
] as const;

/**
 * The lane's own tier: dimmest at the widest lane, brightest at the narrowest.
 *
 * BRIGHTNESS IS DEPTH, NOT IMPORTANCE — see {@link TIER}. The narrowest lane is the brightest
 * because the fewest people go the deepest, and the two encodings agree because both are cut from
 * `laneFraction`.
 */
function laneTier(index: number, count: number): string {
  return LANE_RAMP[Math.round(laneFraction(index, count) * (LANE_RAMP.length - 1))];
}

// ───────────────────── the type registers ─────────────────────
// THREE, for the three things this stage prints: MONO for anything the room reads as a LABEL,
// SANS for anything it reads as a DEFINITION, and SERIF for the one sentence that is an argument.
//
// The MONO half is `../type-registers.ts`'s, shared with K.2 and K.3 because the three rooms see
// the same labels one click apart. The other two are this file's: no other slide in the section
// sets a 15px sans line in a 226px card or a 19px serif sentence alone on a cleared stage.
//
// Every floor is gh#50's: 9.5px for a mono label, 10.5px for prose, and nothing here rests below
// `--neutral-300`. Neither is enforced from this file — a computed font size is not something
// jsdom has — so the sizes are stated once, in `../enablement-geometry.ts`, where a reviewer can
// check them against the floor in one place and where the boxes cut for them are derived.

/** The sans DEFINITION register — where every label-shaped explanation in the deck sits. Not
 *  mono: a mono definition under a mono name reads as part of the name. */
const definition: CSSProperties = {
  fontFamily: "var(--sans)",
  fontSize: CARD_LINE_SIZE,
  lineHeight: CARD_LINE_LEADING,
  color: TIER.line,
};

/** Geometry, a border and a ground — and NOTHING ELSE, which is what lets `.box-hover`'s overlay
 *  reach the border. See the file header: an inline `borderColor` would win against every
 *  stylesheet rule, so the hover is painted by a pseudo-element instead and this shell stays the
 *  only place a box's own chrome is written. */
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
 * ONE LEAD-IN AND ONE STAGGER FOR THE WHOLE SLIDE, unlike the figure this replaced, which had a
 * different stagger per column. Four scenes that each revealed at their own speed would read as
 * four slides rather than as one argument walked, and the room has no way to name what changed.
 * The lead-in is `REVEAL_LEAD_MS`, shared with K.2 and K.3 (`../type-registers.ts`), because the
 * click is shared; 90ms is `leader-invest`'s own step and is what keeps four cards reading as a
 * list being laid down rather than as one flash.
 */
const STAGGER_MS = 90;

/** How many steps into a scene an element arrives, as milliseconds of delay. */
const delay = (step: number) => REVEAL_LEAD_MS + step * STAGGER_MS;

/**
 * Where each scene's elements sit in its own reveal order.
 *
 * EVERY CONCLUSION'S STEP IS DERIVED FROM A COUNT AND NEVER TYPED, which is the rule
 * `leader-invest`'s four slides keep: `BLOCK_NOTE_STEP` is "one step after the last block card",
 * so a fourth block takes the note with it. A literal there is a note that lands on top of the
 * card it belongs under the day somebody writes a fourth block.
 */
const SCENE_STEP = { eyebrow: 0, first: 1 } as const;

/**
 * When a hero scene's own bottom line arrives — LAST, on every one of the three.
 *
 * DERIVED FROM EACH SCENE'S OWN COUNT, so a fourth block or a fifth pillar takes its
 * scene's mini-thesis with it. And last rather than first because the sentence is an
 * ARGUMENT about the set above it: read before the set it is an assertion the room has
 * nothing to check against, read after it is a conclusion.
 */
const BLOCK_THESIS_STEP = SCENE_STEP.first + BLOCK_COUNT;
const PILLAR_THESIS_STEP = SCENE_STEP.first + PILLAR_COUNT;
const TRACK_THESIS_STEP = SCENE_STEP.first + TRACK_COUNT;

/**
 * The recap's own step for chip `row` of column `col`.
 *
 * TWO STEPS OF LEAD PER COLUMN AND ONE PER ROW, which is what makes the frame assemble as an
 * argument rather than as a wave. The blocks land first, the pillars start before the blocks have
 * finished — they are answers, and an answer that waited for the whole problem to finish being
 * stated would make the room read three columns in series — and the tracks follow the pillars the
 * same way. The deepest step is the last pillar's, which is what {@link CONNECTOR_STEP} is
 * measured from.
 */
const RECAP_CHIP_STEP = 1;
const RECAP_COLUMN_LEAD = 2;
const chipStep = (col: number, row: number) =>
  RECAP_CHIP_STEP + col * RECAP_COLUMN_LEAD + row;

/** The connectors draw one step after the last chip they touch. A curve that arrived before the
 *  box at its far end would be a line pointing at nothing. */
const CONNECTOR_STEP = chipStep(1, PILLAR_COUNT - 1) + 1;

/** How long a connector takes to draw — `en-draw`'s own duration, restated here because the
 *  current must not start before the line it rides on has finished. The two numbers are one fact
 *  and they live in two files; if `./enablement.css` retimes the draw, this is the line that has
 *  to move with it, and the test holds them equal. */
const CONNECTOR_DRAW_MS = 620;

const THESIS_STEP = { rule: 0, thesis: 1 } as const;

// ───────────────────── one card, two scenes ─────────────────────

/**
 * A block card or a pillar card. ONE COMPONENT, because they ARE one object: a name, a rule under
 * it, a mark, and one line of what it means.
 *
 * THE SHELF AND THE HEIGHT ARE THE SAME IN BOTH SCENES ({@link CARD_TOP},
 * {@link CARD_HEIGHT}) and only the tiling differs, so the click from three cards to four re-cuts
 * a row in place and moves nothing else. Given two heights the row's baseline would drop as well,
 * and a room reads that as the stage settling rather than as a list being answered.
 */
function Card({
  id,
  label,
  line,
  lineKw,
  glyph,
  left,
  width,
  step,
  kind,
}: {
  id: string;
  label: string;
  line: string;
  lineKw: readonly string[];
  glyph: GlyphId;
  left: number;
  width: number;
  step: number;
  /** `block` or `pillar` — the test id's own middle, so a walk of the stage can tell which scene
   *  a card belongs to without reading its copy. */
  kind: string;
}) {
  const inner = width - 2 * CARD_PAD_X;
  return (
    <Reveal
      on
      delay={delay(step)}
      className="box-hover en-card"
      data-testid={`enablement-${kind}-${id}`}
      style={shell(left, CARD_TOP, width, CARD_HEIGHT)}
    >
      {/* NO `highlight()` ON A LABEL, HERE OR ANYWHERE ON THIS STAGE. Every label is a name and
          carries no `*Kw` sibling by construction (`../content.ts`'s keyword rule); a copper
          italic inside a 12.5px uppercase name would emphasise a fragment of it and read as a
          rendering fault. */}
      <div
        data-testid={`enablement-${kind}-label-${id}`}
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
      {/* THE HAIRLINE — what a thing is CALLED, above; what it DOES, below. Its colour lives in
          `./enablement.css` and not here, because it has two states: it brightens with the
          border under the pointer, and a colour with two states belongs where both can be
          written. */}
      <div
        className="en-hairline"
        data-testid={`enablement-${kind}-hairline-${id}`}
        style={{
          position: "absolute",
          left: CARD_PAD_X,
          top: CARD_HAIRLINE_OFFSET,
          width: inner,
          height: 1,
        }}
      />
      {/* THE MARK, centred on the card. `left` is arithmetic and not `margin: auto`, because the
          card is a positioned box and every other child in it is placed the same way — one
          placement idiom per box is what makes a geometry module worth having. */}
      <div
        style={{
          position: "absolute",
          left: (width - GLYPH_SIZE) / 2,
          top: CARD_GLYPH_OFFSET,
        }}
      >
        <EnablementGlyph
          id={glyph}
          size={GLYPH_SIZE}
          testId={`enablement-glyph-${id}`}
        />
      </div>
      <div
        data-testid={`enablement-${kind}-line-${id}`}
        style={{
          position: "absolute",
          left: CARD_PAD_X,
          top: CARD_LINE_OFFSET,
          width: inner,
          height: CARD_LINE_HEIGHT,
          ...definition,
        }}
      >
        {highlight(line, lineKw)}
      </div>
    </Reveal>
  );
}

// ───────────────────── one chip, three columns ─────────────────────

/**
 * A recap chip — a mark and a name, in a box, and nothing the room has not already read.
 *
 * NO LINE ON A CHIP, WHICH IS THE WHOLE POINT OF THE RECAP. The room has seen every one of these
 * ten things at 296px with its own sentence under it; a chip that repeated the sentence would be
 * the fourth pose printing three scenes' worth of copy at a size nobody can read from the back
 * row. What the recap adds is the RELATIONSHIPS — which is why the connectors get the gutter and
 * the chips get a name.
 */
function Chip({
  id,
  label,
  glyph,
  left,
  top,
  width,
  step,
  children,
}: {
  id: string;
  label: string;
  glyph: GlyphId;
  left: number;
  top: number;
  width: number;
  step: number;
  children?: ReactNode;
}) {
  return (
    <Reveal
      on
      delay={delay(step)}
      className="box-hover en-card"
      data-testid={`enablement-chip-${id}`}
      style={{
        ...shell(left, top, width, CHIP_HEIGHT),
        display: "flex",
        alignItems: "center",
        gap: CHIP_GLYPH_GAP,
        padding: `0 ${CHIP_PAD_X}px`,
      }}
    >
      <EnablementGlyph
        id={glyph}
        size={CHIP_GLYPH_SIZE}
        testId={`enablement-chip-glyph-${id}`}
      />
      <span
        data-testid={`enablement-chip-label-${id}`}
        style={{ ...mono(CHIP_LABEL_SIZE, TIER.name, LABEL_TRACKING), whiteSpace: "nowrap" }}
      >
        {label}
      </span>
      {children}
    </Reveal>
  );
}

/**
 * The bottom line of the slide — a hero scene's mini-thesis, or the closer.
 *
 * ONE COMPONENT AND ONE SHELF FOR ALL FOUR, which is the whole point of it. The room
 * learns after one click that the sentence at the foot of the stage is the takeaway, and
 * it is in the same place, at the same size, in the same register every time. What differs
 * is the TIER — one step down for a scene, brightest for the closer — and whether a copper
 * rule stands over it, which only the closer gets because only the closer is about the
 * whole model rather than about the frame above it.
 *
 * NO DIVIDER ON THE THREE MINI-THESES, and that is the owner's instruction rather than an
 * omission: a rule over each hero would draw the room's eye to a horizontal line four
 * times and spend the one mark that is supposed to mean "this is the last thing".
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
        // A SENTENCE MAY NOT TAKE A POINTER. It spans the full width on a shelf under a row
        // of boxes; nothing here is hoverable and a wide invisible line would eat a hover
        // the day a scene's floor moved.
        pointerEvents: "none",
      }}
    >
      {highlight(text, kw)}
    </Reveal>
  );
}

// ───────────────────── the figure ─────────────────────

export interface EnablementModelProps {
  /** 0…4. See the slide file for what each pose argues. */
  pose: number;
}

export function EnablementModel({ pose }: EnablementModelProps) {
  // THREE `===` TESTS AND TWO `>=`, and the split between them is the argument — see the
  // file header. The three HEROES are exclusive: each replaces the one before it, because
  // each is a different figure in the same region of stage. THE RECAP AND THE THESIS ARE
  // NOT: the thesis is what the recap is FOR, so it lands under a frame that stays put.
  const blocks = pose === 0;
  const pillars = pose === 1;
  const tracks = pose === 2;
  const model = pose >= 3;
  const thesis = pose === 4;

  /** The eyebrow shelf, shared by all four scenes and empty on the fifth. One box, four strings,
   *  never two at once — and the shelf is y=156, which is the 2026-08-14 fix for the complaint
   *  that a mono line at 134 read as the headline's second line. */
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
        // AN EYEBROW MAY NOT TAKE A POINTER. It spans the full width on a shelf 26px above a row
        // of boxes; a wide invisible line over them would eat the hover of whatever it overlapped
        // the day a scene's shelf moved. `.box-hover` is on the boxes, and this is not one.
        pointerEvents: "none",
      }}
    >
      {text}
    </Reveal>
  );

  return (
    <>
      {/* ═══════════════ SCENE 0 · THE BLOCKS ═══════════════
          THE SLIDE OPENS ON THE PROBLEM AND NOT ON THE PROGRAMME, which is the re-cut's first
          decision. A leader shown four pillars first prices them; a leader shown three blocks
          first recognises them, and then reads the pillars as answers. Every mark in this scene
          performs a failure (`./enablement.css`), so a room that reads nothing but the movement
          still learns that nothing here completes. */}
      {blocks && (
        <>
          {eyebrow(C.blocksEyebrow, "enablement-blocks-eyebrow")}
          {C.blocks.map((block, i) => (
            <Card
              key={block.id}
              kind="block"
              id={block.id}
              label={block.label}
              line={block.line}
              lineKw={block.lineKw}
              glyph={block.id as GlyphId}
              left={blockCardLeft(i)}
              width={BLOCK_CARD_WIDTH}
              step={SCENE_STEP.first + i}
            />
          ))}
          <BottomLine
            text={C.blocksThesis}
            kw={C.blocksThesisKw}
            step={BLOCK_THESIS_STEP}
            tier={TIER.sceneThesis}
            testId="enablement-blocks-thesis"
          />
        </>
      )}

      {/* ═══════════════ SCENE 1 · THE PILLARS ═══════════════
          FOUR ANSWERS, ON THE SHELF THE THREE PROBLEMS JUST LEFT. Same card, same height, same
          mark size, one more of them — so the click reads as a row being answered rather than as
          a new figure. Every mark here performs a structure working and repeating, which is the
          scene's own grammar and the opposite of the one before it. */}
      {pillars && (
        <>
          {eyebrow(C.pillarsEyebrow, "enablement-pillars-eyebrow")}
          {C.pillars.map((pillar, i) => (
            <Card
              key={pillar.id}
              kind="pillar"
              id={pillar.id}
              label={pillar.label}
              line={pillar.line}
              lineKw={pillar.lineKw}
              glyph={pillar.id as GlyphId}
              left={pillarCardLeft(i)}
              width={PILLAR_CARD_WIDTH}
              step={SCENE_STEP.first + i}
            />
          ))}
          <BottomLine
            text={C.pillarsThesis}
            kw={C.pillarsThesisKw}
            step={PILLAR_THESIS_STEP}
            tier={TIER.sceneThesis}
            testId="enablement-pillars-thesis"
          />
        </>
      )}

      {/* ═══════════════ SCENE 2 · THE TRACKS ═══════════════
          WHO IT REACHES, AND HOW DEEP. Three full-width rows, and the bar in each is the only
          ordinal object on the slide: its WIDTH says fewer people than the row above and its
          COLOUR TIER says more depth, and both are cut from one fraction
          (`../enablement-geometry.ts`), so the narrowest lane is always the brightest. No axis, no
          scale, no printed share — the bar is ORDINAL and nothing on this stage invites a number
          to be read off it.

          BOTH ENCODINGS ARE NOW NAMED IN WORDS, which is the 2026-08-17 fix and the reason this
          scene has a third text box. Two ordinal facts on one mark is one more than a room can
          take off it unaided: the eyebrow said "and how deep", the bar said nothing about which
          of its two properties was which, and the longest bar sat on the shallowest track. So the
          EYEBROW names the width ("how many persons") and each ROW prints its own depth word.
          Neither is a new claim — both were already in the geometry, and neither was legible. */}
      {tracks && (
        <>
          {eyebrow(C.tracksEyebrow, "enablement-tracks-eyebrow")}
          {C.tracks.map((track, i) => (
            <Reveal
              key={track.id}
              on
              delay={delay(SCENE_STEP.first + i)}
              className="box-hover en-card"
              data-testid={`enablement-track-${track.id}`}
              style={shell(SIDE_MARGIN, trackRowTop(i), CONTENT_WIDTH, TRACK_ROW_HEIGHT)}
            >
              <div
                style={{
                  position: "absolute",
                  left: TRACK_PAD_X,
                  top: (TRACK_ROW_HEIGHT - LANE_GLYPH_SIZE) / 2,
                }}
              >
                <EnablementGlyph
                  id={track.id as GlyphId}
                  size={LANE_GLYPH_SIZE}
                  testId={`enablement-glyph-${track.id}`}
                />
              </div>
              <div
                data-testid={`enablement-track-name-${track.id}`}
                style={{
                  position: "absolute",
                  left: LANE_TEXT_X,
                  top: TRACK_NAME_OFFSET,
                  ...mono(TRACK_NAME_SIZE, TIER.name, LABEL_TRACKING),
                  lineHeight: 1.3,
                  whiteSpace: "nowrap",
                }}
              >
                {track.name}
              </div>
              {/* THE DEPTH LABEL, at the far end of the name shelf — SOME, MORE, MOST DEPTH.
                  It is the ladder the bar cannot state: the bar's WIDTH is how many persons
                  and its COLOUR TIER is depth, and a room reading length as "more" made the
                  widest lane the deepest one. Right-anchored, so the three words stack into a
                  column the eye reads down; CARD LABEL TIER, so it is a different register
                  from the track's own name and not a brighter version of it; and ONE TIER FOR
                  ALL THREE, because stepping it with the lanes would rank the tracks'
                  importance as well as their depth ({@link TIER}). EVERY VALUE REPEATS THE
                  WORD "DEPTH" rather than hanging it once over the column — the rows are
                  120px apart, and a rung that does not name its own scale is a rung the eye
                  has to travel back up to read. See `../content.ts`. */}
              <div
                data-testid={`enablement-track-depth-${track.id}`}
                style={{
                  position: "absolute",
                  right: TRACK_PAD_X,
                  top: TRACK_NAME_OFFSET,
                  ...mono(TRACK_NAME_SIZE, TIER.cardLabel, LABEL_TRACKING),
                  lineHeight: 1.3,
                  whiteSpace: "nowrap",
                }}
              >
                {track.depth}
              </div>
              {/* THE LANE. `en-grow` scales it from its own left edge to the width `laneWidth`
                  produced — `scaleX` and not `width`, so it composites on the GPU and, the half
                  that matters, so its resting frame is the authored number rather than whatever
                  a last keyframe said. */}
              <div
                className="en-grow"
                data-testid={`enablement-lane-${track.id}`}
                style={{
                  position: "absolute",
                  left: LANE_TEXT_X,
                  top: LANE_BAR_OFFSET,
                  width: laneWidth(i, TRACK_COUNT),
                  height: LANE_HEIGHT,
                  background: laneTier(i, TRACK_COUNT),
                  animationDelay: `${delay(SCENE_STEP.first + i) + 120}ms`,
                }}
              />
              <div
                data-testid={`enablement-track-line-${track.id}`}
                style={{
                  position: "absolute",
                  left: LANE_TEXT_X,
                  top: TRACK_LINE_OFFSET,
                  width: LANE_FULL_WIDTH,
                  ...definition,
                  fontSize: TRACK_LINE_SIZE,
                }}
              >
                {highlight(track.line, track.lineKw)}
              </div>
            </Reveal>
          ))}
          <BottomLine
            text={C.tracksThesis}
            kw={C.tracksThesisKw}
            step={TRACK_THESIS_STEP}
            tier={TIER.sceneThesis}
            testId="enablement-tracks-thesis"
          />
        </>
      )}

      {/* ═══════════════ SCENE 3 · THE WHOLE MODEL ═══════════════
          THE ONE FRAME THE ROOM LEAVES WITH THE MODEL IN. Three columns, ten chips, four drawn
          connectors and one divider — and the connectors are the only thing on the slide that is
          NOT a restatement: no hero pose can show that `curriculum` and `practice` both answer
          `literacy`, because the two lists are never on the stage together anywhere else.

          THE DIVIDER BETWEEN THE PILLARS AND THE TRACKS IS NOT A FIFTH CONNECTOR, and that is a
          claim about the model rather than a drawing decision. The pillars are CAUSED by the
          blocks; the tracks are not caused by the pillars, they are who the pillars reach. A
          curve there would assert a wiring nobody authored. */}
      {model && (
        <>
          {eyebrow(C.modelEyebrow, "enablement-model-eyebrow")}

          {/* THE CONNECTOR LAYER, FIRST IN MARKUP so every chip paints over it — the curves meet
              a chip's edge and must not run across its face. `.svg-layer` carries
              `pointer-events: none`, which is what keeps a full-stage `<svg>` from swallowing the
              hover of the ten boxes under it. */}
          <svg
            className="svg-layer"
            data-testid="enablement-connectors"
            viewBox={`0 0 ${STAGE.width} ${STAGE.height}`}
            aria-hidden="true"
          >
            {C.pillars.map((pillar, i) => {
              const from = C.blocks.findIndex((block) => block.id === pillar.answers);
              const d = connectorPath(from, i);
              return (
                <g key={pillar.id}>
                  <path
                    className="en-draw"
                    data-testid={`enablement-connector-${pillar.id}`}
                    d={d}
                    pathLength={1}
                    fill="none"
                    stroke={TIER.connector}
                    strokeWidth={1.6}
                    style={{ animationDelay: `${delay(CONNECTOR_STEP + i)}ms` }}
                  />
                  {/* THE CURRENT, on a WRAPPER that fades and a path that loops — never both on
                      one node, or any later class change would restart the loop and the current
                      would blink. It starts after its own line has finished drawing: a current on
                      a line that is still being drawn reads as a rendering fault. */}
                  <g
                    className="en-arrive"
                    data-testid={`enablement-current-${pillar.id}`}
                    style={{
                      animationDelay: `${delay(CONNECTOR_STEP + i) + CONNECTOR_DRAW_MS}ms`,
                    }}
                  >
                    <path
                      className="en-current"
                      d={d}
                      fill="none"
                      stroke={TIER.current}
                      strokeWidth={1.6}
                      strokeLinecap="round"
                    />
                  </g>
                </g>
              );
            })}
          </svg>

          {[C.blocksShort, C.pillarsShort, C.tracksShort].map((head, col) => (
            <Reveal
              key={head}
              on
              delay={delay(SCENE_STEP.first)}
              data-testid={`enablement-recap-head-${col}`}
              style={{
                position: "absolute",
                left: recapColumnLeft(col),
                top: RECAP_HEAD_TOP,
                width: RECAP_COLUMN_WIDTH,
                height: RECAP_HEAD_HEIGHT,
                ...mono(RECAP_HEAD_SIZE, TIER.recapHead, LABEL_TRACKING),
                lineHeight: 1.25,
                whiteSpace: "nowrap",
                pointerEvents: "none",
              }}
            >
              {head}
            </Reveal>
          ))}

          {C.blocks.map((block, i) => (
            <Chip
              key={block.id}
              id={`block-${block.id}`}
              label={block.label}
              glyph={block.id as GlyphId}
              left={recapColumnLeft(0)}
              top={chipTop(i)}
              width={RECAP_COLUMN_WIDTH}
              step={chipStep(0, i)}
            />
          ))}

          {C.pillars.map((pillar, i) => (
            <Chip
              key={pillar.id}
              id={`pillar-${pillar.id}`}
              label={pillar.label}
              glyph={pillar.id as GlyphId}
              left={recapColumnLeft(1)}
              top={chipTop(i)}
              width={RECAP_COLUMN_WIDTH}
              step={chipStep(1, i)}
            />
          ))}

          {/* THE HAIRLINE, spanning exactly the chip rows it divides and not the whole stage: it
              separates two columns, and a full-height rule would divide the eyebrow and the
              thesis shelf as well. */}
          <Reveal
            on
            delay={delay(chipStep(2, 0))}
            data-testid="enablement-recap-divider"
            style={{
              position: "absolute",
              left: RECAP_DIVIDER_X,
              top: chipTop(0),
              width: 1,
              height: chipTop(TRACK_COUNT - 1) + CHIP_HEIGHT - chipTop(0),
              background: TIER.divider,
              pointerEvents: "none",
            }}
          />

          {C.tracks.map((track, i) => (
            <Chip
              key={track.id}
              id={`track-${track.id}`}
              label={track.name}
              glyph={track.id as GlyphId}
              left={recapColumnLeft(2)}
              top={chipTop(i)}
              width={RECAP_COLUMN_WIDTH}
              step={chipStep(2, i)}
            >
              {/* THE LANE, KEPT IN THE RECAP AT CHIP SCALE, because it is the one thing about the
                  tracks that a name does not say: three names are a list, three names over three
                  different widths are a depth. `marginLeft: auto` pushes it to the chip's right
                  edge, so the three bars align on their left and the comparison is where they
                  end — the same reading the hero scene sets up. */}
              <div
                data-testid={`enablement-recap-lane-${track.id}`}
                style={{
                  marginLeft: "auto",
                  width: recapLaneWidth(i, TRACK_COUNT),
                  height: RECAP_LANE_HEIGHT,
                  background: laneTier(i, TRACK_COUNT),
                }}
              />
            </Chip>
          ))}
        </>
      )}

      {/* ═══════════════ POSE 4 · THE THESIS, UNDER THE MODEL ═══════════════
          IT ARRIVES ON TOP OF THE RECAP AND NOTHING ABOVE IT MOVES. The rule divides the SLIDE —
          above it the whole model the room has just been walked through, below it the one line
          the deck asks them to leave with — and it arrives BEFORE the sentence, because a rule
          that followed its own sentence would be underlining it.

          THE RECAP'S OWN FLOOR IS WHAT MAKES THIS FIT, and it is asserted rather than assumed:
          `../enablement-geometry.ts`'s floor guard checks the recap against the RULE's shelf
          rather than against the body's, precisely because these two are the one pair of scenes
          that share a stage.

          THE SHELF IS 590 AND THE SIZE IS 19px UPRIGHT SERIF, which is `leader-invest`'s thesis
          register and not the 20px italic at 572 this slide used to close on.
          `../enablement-geometry.ts` carries the whole argument for the shelf, including why K.2
          and K.3 keep theirs at 572. */}
      {thesis && (
        <>
          <div
            data-testid="enablement-rule"
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
            text={C.closer}
            kw={C.closerKw}
            step={THESIS_STEP.thesis}
            tier={TIER.thesis}
            testId="enablement-thesis"
          />
        </>
      )}
    </>
  );
}
