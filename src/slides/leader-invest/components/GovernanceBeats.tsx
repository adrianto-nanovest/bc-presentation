// THE THREE DOORS AND THE FOUR SWITCHES — D.4's whole figure, in two acts.
//
// ═══ WHAT THIS COMPONENT REPLACED. Two slides of type. The old D.4 was a three-column table of
// destinations over a two-column band of exposures and governance chips; the old D.5 was a
// two-column comparison over a formula and a three-row price table. Between them they set
// forty-one strings, of which nine were full sentences and four were citations. The owner's note
// on the rendered frames was that the largest object on either stage was a paragraph.
//
// WHAT IT IS NOW. ONE FIGURE IN TWO ACTS, with the sentences reduced to three captions on it:
//
//   ACT 1 · ONE SCREEN, THREE DOORS. The prompt box every person in the room has already used,
//   a bus out of it, and three destinations — an open door with something leaving through it, a
//   shut door with a badge on it, and a rack that never opens. The lane to the open door is the
//   only one whose dashes travel, because what a personal account's terms permit is a standing
//   arrangement and not an event. Each door carries its account type and one two-sentence
//   contract; the verdict under them says where on that dial to stop.
//
//   ACT 2 · FOUR SWITCHES, ONE CIRCUIT EACH. The bus and the other two doors leave; the OPEN
//   DOOR travels to the left margin and grows into the token everything under it hangs off. Four
//   rows arrive, each one a thing nobody can do, wired through a switch that is OFF to a slot
//   that is empty. Then the switches flip, the four right-hand wires draw themselves to the four
//   controls that close the gaps, and the door SHUTS. That is the argument: the account that
//   leaks is the account nobody owns, and one managed seat is what closes both.
//
// ═══ WHY A SWITCH. It is the only drawing of governance a board reads from the back of a room
// without being told what it is looking at: two states, somebody flipped it, and the flip is
// visible at projection scale. Every alternative this figure was cut against — a tick against a
// cross, a red column against a green one, a progress bar — either encodes the answer in colour
// alone (which a projector may not carry) or asserts a quantity nothing on this slide sourced.
//
// ═══ WHY THE TWO COLUMNS SHARE ONE ROW GRID. Gap `i` and control `i` are the SAME row, on one
// centre line, joined by one switch and two wires. That is the one thing the two slides of type
// could never say: they put four gaps on the left and four capabilities on the right with
// nothing between them, and nothing between them is exactly what the argument is about.
// `../governance-geometry.ts` welds the two counts together and refuses to compile if they
// diverge.
//
// ═══ 4 POSES, AND THE LAST ONE IS THE FLOOR ALONE.
//
//   0 — THE THREE DOORS. The headline says the account is the risk; act 1 says what an account
//       IS. Nothing about exposure yet: this pose rests on a comparison that recommends nothing
//       except where own hardware fits, which is safe to leave on a screen.
//   1 — WHAT NOBODY CAN DO. The door travels. Four rows, four dead switches, four empty slots.
//       This pose is the only one that rests on a deficit, and it does so deliberately — the
//       room has to recognise its own position before it is offered anything.
//   2 — WHAT A MANAGED SEAT GIVES. The four switches flip in sequence, the circuit completes,
//       the door shuts, and the answer names what changed. The fullest pose.
//   3 — THE FLOOR. The rule, and the thesis alone under it.
//
// THE SWITCHES FLIP BEFORE THE DOOR SHUTS, and the 620ms/700ms split in `./governance.css` is
// what enforces it. The switches are the cause and the door is the consequence; a consequence
// that completed first would be the wrong stagecraft.
//
// ═══ NO BRAND AXIS, and that is a decision. Both parent slides forked — one on whether the room
// already runs private on-prem GPU servers, the other on whether it has a local price anchor —
// and both forks needed a source line on the stage. One story, byte-identical in both leader
// decks, is the same call `./ChickenEggBeats.tsx` makes, and it is a claim a browser check can
// settle by diffing the two decks' rendered boxes.
//
// ═══ ZERO SMIL. Every mark that moves here is a CSS animation or a CSS transition; there is no
// `<animate>`, `<animateTransform>`, `<animateMotion>` or `<set>` on this stage. See
// `./governance.css`, which owns every keyframe and the reduced-motion block that finishes the
// job the global squash cannot.
import type { CSSProperties, ReactNode } from "react";

// `Reveal` and `CopperRule` come from section E, which is the tree's de facto shared reveal
// primitive — `./ProofLedger.tsx` carries a census of its importers and the four figures beside
// it decline to re-quote the numbers. This file declines too.
import { CopperRule, Reveal } from "@/slides/foundation-core-section-e/components/Reveal";
import { highlight } from "@/components/highlight";
import {
  ANSWER_TOP,
  BEAT_HEIGHT,
  BEAT_TEXT_SIZE,
  BUS_Y,
  CIRCUIT_ROWS,
  COLUMN_LABEL_TOP,
  CONTENT_WIDTH,
  CONTROL_LEFT,
  CONTROL_W,
  DOOR_COUNT,
  DOOR_FRAME_W,
  DOOR_GLYPH_CY,
  DOOR_GLYPH_SIZE,
  DOOR_H,
  DOOR_LABEL_TOP,
  DOOR_PAD,
  DOOR_TEXT_HEIGHT,
  DOOR_TEXT_TOP,
  DOOR_TOKEN_SCALE,
  DOOR_TOP,
  DOOR_TRAVEL_X,
  DOOR_TRAVEL_Y,
  DOOR_W,
  EXPOSURE_TOP,
  GAP_LEFT,
  GAP_W,
  ITEM_PAD_X,
  ITEM_PAD_Y,
  ITEM_TEXT_SIZE,
  KNOB_OFF_CX,
  KNOB_R,
  LABEL_HEIGHT,
  LABEL_SIZE,
  LABEL_TRACKING,
  ROW_H,
  RULE_TOP,
  SCREEN_BOTTOM,
  SCREEN_CX,
  SCREEN_EYEBROW_TOP,
  SCREEN_H,
  SCREEN_LEFT,
  SCREEN_TOP,
  SCREEN_W,
  SIDE_MARGIN,
  SWITCH_H,
  SWITCH_LEFT,
  SWITCH_THROW,
  SWITCH_W,
  THESIS_HEIGHT,
  THESIS_TEXT_SIZE,
  THESIS_TOP,
  TOKEN_CX,
  TOKEN_CY,
  TOKEN_LABEL_HEIGHT,
  TOKEN_LABEL_LEFT,
  TOKEN_LABEL_SIZE,
  TOKEN_LABEL_TOP,
  TOKEN_LABEL_TRACKING,
  TOKEN_LABEL_W,
  TOKEN_R,
  VERDICT_TOP,
  WIRE_W,
  doorCenterX,
  doorLeft,
  rowCenterY,
  rowTop,
} from "../governance-geometry";
import { investGovernanceContent as C, type DataDestination } from "../content";
import "./governance.css";

// ───────────────────── the tiers, in one table ─────────────────────

/**
 * One tier per ROLE, and not one per box. The ladder is this section's, with the same
 * hand-derived luminances (WCAG relative luminance over `src/styles/globals.css`'s hexes) that
 * `./BaseRatesBeats.tsx`, `./ProofLedger.tsx` and `./ChickenEggBeats.tsx` use, so the section's
 * four slides rank at one scale. Brightest first, under the headline's `--neutral-50` (0.9131):
 *
 *   role        token           luminance   register
 *   bright      --neutral-100    0.7835     19px serif thesis · 17px serif prose · the controls
 *   contract    --neutral-200    0.6584     13px sans  — what each account's terms amount to
 *   gap         --neutral-300    0.3663     13px sans  — the four things nobody can do
 *   word        --copper-200     0.5917     the knob when it is on, the packet that escapes
 *   live        --copper-300     0.4586     a completed wire, a lit track, a control's border
 *   label       --copper-400     0.2967     9.5–11px mono caps — every eyebrow and token label
 *   node        --copper-500     0.2168     the screen, the three door glyphs, the personal lane
 *   wire        --copper-600     0.1547     the two lanes that arrive and stop
 *   frame       --copper-700     0.0900     box borders, dead switches, broken wires
 *
 * ═══ THE EPISTEMICS ARE DRAWN IN THE TWO LIST TIERS, AND THEY ARE THE POINT OF THE TABLE. The
 * four controls out-rank the four gaps by two steps (0.7835 against 0.3663) in boxes that are
 * otherwise identical — same width, same height, same face, same size, same row. Nothing but
 * colour separates them, which is exactly enough, and it is why the circuit can be read as a
 * comparison without a caption saying "compare these". The gaps are a deficit that already
 * exists; the controls are what the room is being handed.
 *
 * ═══ NOTHING IS EVER DIMMED TO PROMOTE SOMETHING ELSE (§7.1). The gaps are `--neutral-300` from
 * the moment they arrive and stay there when the controls land beside them at `--neutral-100`;
 * the broken wire is `--copper-700` from the start and is COVERED by a lit one rather than
 * darkened. Attention on this stage is bought with added light, every time.
 *
 * ═══ THE THREE STROKE TIERS BELOW THE TEXT FLOOR ARE NOT TEXT. `--copper-700` (borders, dead
 * switches, broken leads) and `--copper-600` (the two settled lanes) sit under gh#50's floors
 * deliberately: a border is not read, and a lane that arrives and stops has no argument to make
 * after it has arrived. `--copper-500` for the screen and the door glyphs clears WCAG's 3:1
 * floor for a non-text graphic against `--surface-dark` with room to spare.
 *
 * `--copper-400` UNDER `--neutral-300` FOR THE MONO CAPS is the shipped precedent all four
 * sibling figures cite — exactly this token in exactly this register.
 *
 * ═══ THE ONE TIER THAT IS NOT IN THIS TABLE IS HOVER, AND IT IS NOT THIS FILE'S. All ELEVEN
 * boxes on the stage — the three doors, the four gaps and the four controls — carry `box-hover`
 * from `src/styles/globals.css`, which steps a hovered box's BORDER to `--copper-200` and brings
 * a copper wash up under it. It deliberately does not touch type: the rest tiers above are the
 * argument, and a hover that also brightened the words would let a pointer re-rank the deficit
 * against the offer.
 */
const TIER = {
  /** The thesis, the three prose lines, and the four controls. */
  bright: "var(--neutral-100)",
  /** What each of the three accounts' terms amount to. */
  contract: "var(--neutral-200)",
  /** The four things nobody can do today: a deficit that already exists. */
  gap: "var(--neutral-300)",
  /** The knob when it is on, and the packet leaving through the open door. */
  word: "var(--copper-200)",
  /** A completed wire, a lit track, a control box's border. */
  live: "var(--copper-300)",
  /** Every eyebrow and both token labels. */
  label: "var(--copper-400)",
  /** The screen, the three door glyphs, and the one lane that keeps moving. */
  node: "var(--copper-500)",
  /** The two lanes that arrive and stop. */
  wire: "var(--copper-600)",
  /** Box borders, dead switches, broken leads, the token's rim before it has an owner. */
  frame: "var(--copper-700)",
  /** The one fill on the stage: what a token, a track or a screen sits on. */
  ground: "var(--neutral-900)",
} as const;

// ───────────────────── type registers ─────────────────────

/** The mono register. `upper` is the default because every mono LABEL in this deck is uppercase,
 *  and every string this figure sets in it already is. */
function mono(size: number, color: string, ls: number): CSSProperties {
  return {
    fontFamily: "var(--mono)",
    fontSize: size,
    letterSpacing: `${ls}em`,
    textTransform: "uppercase",
    color,
    margin: 0,
  };
}

/** The prose register — the four sentences. Upright serif; the only italics on this stage are
 *  the keywords `highlight()` places. */
function prose(size: number, color: string): CSSProperties {
  return {
    fontFamily: "var(--serif)",
    fontSize: size,
    lineHeight: 1.3,
    color,
    margin: 0,
  };
}

/** The sans register — the three contracts, the four gaps and the four controls. It is the
 *  deck's list face and these are the only lists on the stage. */
function sans(color: string): CSSProperties {
  return {
    fontFamily: "var(--sans)",
    fontSize: ITEM_TEXT_SIZE,
    lineHeight: 1.4,
    color,
    margin: 0,
  };
}

// ───────────────────── the stagger ─────────────────────

/** The section's two numbers — 120ms of lead-in, 90ms between boxes. A section's slides reveal
 *  at one speed or the section has four. */
const LEAD_MS = 120;
const STAGGER_MS = 90;

/** How many steps into a pose a box arrives, as milliseconds of delay. */
const delay = (step: number) => LEAD_MS + step * STAGGER_MS;

/**
 * POSE 0 — THE THREE DOORS, in the order a room can build it.
 *
 * THE LABEL BEFORE THE SCREEN, because "one screen · three contracts" is the claim and the
 * drawing is its evidence; the screen before the bus, because a bus out of nothing is a line to
 * nowhere; the doors LAST, because they are what the bus adds up to. A destination that arrived
 * first would tell the room the answer before it had seen the question.
 */
const DOOR_STEP = {
  eyebrow: 0,
  screen: 1,
  bus: 2,
  /** The first door. Each one after it is a further {@link STAGGER_MS}. */
  door: 3,
} as const;

/** Where beat 1's verdict lands: after the last door, which is what makes it a conclusion and
 *  not a fourth column. Derived from the count so a re-cut row takes the verdict with it. */
const VERDICT_STEP = DOOR_STEP.door + DOOR_COUNT;

/**
 * POSE 1 — WHAT NOBODY CAN DO.
 *
 * THE SENTENCE FIRST AND THE CIRCUIT SECOND. The line that says the risk is the account has to
 * land before four rows of things nobody can do, or the room reads the rows as a feature request.
 * The token second, because it is what the four rows belong to; the heading third; the rows last,
 * one at a time, which is what makes four boxes read as a list being counted out rather than as a
 * table appearing.
 */
const CIRCUIT_STEP = {
  line: 0,
  token: 1,
  eyebrow: 2,
  /** The first row. Each one after it is a further {@link STAGGER_MS}. */
  row: 3,
} as const;

/**
 * POSE 2 — WHAT A MANAGED SEAT GIVES.
 *
 * THE HEADING, THEN FOUR SWITCHES IN SEQUENCE, THEN THE DOOR, THEN THE SENTENCE. The order is the
 * causal chain and it is the whole reason this pose is not one reveal: four switches that flipped
 * together would read as a state that was always true, and one hand going down a panel reads as a
 * decision being taken. The door shuts AFTER the last switch because it is the consequence of all
 * four, and the sentence lands last because it names what the room has just watched happen.
 */
const MANAGED_STEP = {
  eyebrow: 0,
  /** The first switch. Each one after it is a further {@link STAGGER_MS}. */
  row: 1,
} as const;

/** When the door shuts: after the last switch has thrown. Derived from the row count, so a
 *  fifth row would push the consequence behind its own cause rather than in front of it. */
const SHUT_STEP = MANAGED_STEP.row + CIRCUIT_ROWS;

/** Where beat 3's answer lands: after the door. It is the last arrival of the fullest pose. */
const ANSWER_STEP = SHUT_STEP + 1;

/**
 * POSE 3 — THE FLOOR, ALONE.
 *
 * The rule divides the stage before the sentence under it lands, so the thesis arrives into a
 * band that already exists rather than opening one — the same order D.1, D.2 and D.3 use. Two
 * arrivals, and the figure above them does not move: the room has read the whole picture by the
 * time the deck asks it for anything.
 */
const FLOOR_STEP = {
  rule: 0,
  thesis: 1,
} as const;

// ───────────────────── the SVG layer's own reveal ─────────────────────

/**
 * An SVG group that fades in on a delay — and does NOT translate.
 *
 * WHY NOT `Reveal`. `.fade` in `src/styles/globals.css` owns `transform`: it holds elements at
 * `translateY(8px)` and animates them to 0. Half the marks in this figure carry a transform of
 * their own — the door's travel, the leaf's swing, the four knobs' throw, the arrowheads' pop —
 * and a class that writes `transform` would silently win or lose against them depending on
 * cascade order. So the SVG layer gets one primitive that touches OPACITY ONLY, and every
 * transform on this stage belongs to exactly one rule.
 *
 * THE DELAY IS DROPPED WHEN `on` IS FALSE, which is `Reveal`'s own rule applied by hand: a walk
 * BACKWARDS off a pose must clear the stage at once, not unbuild it in the order it was built.
 */
function Mark({
  on,
  delay: ms,
  className,
  testId,
  style,
  children,
}: {
  on: boolean;
  delay: number;
  className?: string;
  testId?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <g
      className={className}
      data-testid={testId}
      style={{
        ...style,
        opacity: on ? 1 : 0,
        transition: "opacity 0.45s var(--ease)",
        transitionDelay: on ? `${ms}ms` : "0ms",
      }}
    >
      {children}
    </g>
  );
}

// ───────────────────── act 1 · the screen ─────────────────────

/**
 * The prompt box, drawn from primitives at the top of the stage.
 *
 * NO BRAND, NO LOGO, NO RECOGNISABLE INTERFACE — and that is the whole point of the drawing.
 * Act 1's claim is that the picture is IDENTICAL whatever account is behind it, so a screen that
 * looked like one vendor's product would make the slide about that vendor. What is on it is the
 * grammar every one of them shares: a title bar, two lines of an answer already given, and a box
 * with a caret in it waiting for the next question.
 *
 * THE CARET IS THE ONLY MARK ON THIS STAGE THAT IS PURELY RECOGNITION. It blinks so the object
 * reads as a screen in under a second; a still caret reads as a diagram of a rectangle. See
 * `./governance.css`.
 */
function Screen() {
  const left = SCREEN_LEFT;
  const top = SCREEN_TOP;
  return (
    <>
      <rect
        x={left}
        y={top}
        width={SCREEN_W}
        height={SCREEN_H}
        rx={4}
        fill={TIER.ground}
        stroke={TIER.node}
        strokeWidth={1.6}
      />
      <line
        x1={left}
        y1={top + 20}
        x2={left + SCREEN_W}
        y2={top + 20}
        stroke={TIER.frame}
        strokeWidth={1}
      />
      {/* Two lines of an answer that has already been given — the reason there is a next
          question, and the reason a room reads this as a conversation rather than a form. */}
      <rect x={left + 16} y={top + 34} width={96} height={5} rx={2.5} fill={TIER.frame} />
      <rect x={left + 16} y={top + 46} width={62} height={5} rx={2.5} fill={TIER.frame} />
      <rect
        x={left + 16}
        y={top + 58}
        width={SCREEN_W - 32}
        height={20}
        rx={3}
        fill="none"
        stroke={TIER.node}
        strokeWidth={1.2}
      />
      <rect
        className="gv-caret"
        x={left + 26}
        y={top + 63}
        width={2}
        height={10}
        fill={TIER.word}
      />
    </>
  );
}

// ───────────────────── act 1 · the three door glyphs ─────────────────────

/**
 * THE OPEN DOOR — the one object on this stage that survives the act change.
 *
 * At pose 0 it is the first destination's glyph, ajar, with something leaving through it. From
 * pose 1 it has travelled to the left margin and grown into the token the whole circuit hangs
 * off, and at pose 2 its leaf SHUTS and a badge lands on it. One element, three states, and the
 * room watches the thing that leaked become the thing that closes.
 *
 * THREE TRANSFORMS ON THREE ELEMENTS, which is why this is a nest of groups rather than one. The
 * outer group travels and scales; the leaf inside it swings on its own hinge; the packet inside
 * that loops. Composing them on one node would mean one `transform` declaration doing three jobs
 * at three different poses, and the first edit after that would break two of them.
 *
 * `vectorEffect="non-scaling-stroke"` ON EVERY STROKE, because this glyph is drawn at 34px and
 * rendered at 39: the drawing grows, its lines do not thicken.
 */
function TravellingDoor({ parked, shut }: { parked: boolean; shut: boolean }) {
  const cx = doorCenterX(0);
  const cy = DOOR_GLYPH_CY;
  const half = DOOR_GLYPH_SIZE / 2;
  return (
    <g
      className={`gv-travel${parked ? " gv-travel-parked" : ""}`}
      data-testid="governance-door"
      data-parked={parked ? "true" : "false"}
      data-shut={shut ? "true" : "false"}
      style={
        {
          "--gv-door-x": `${DOOR_TRAVEL_X}px`,
          "--gv-door-y": `${DOOR_TRAVEL_Y}px`,
          "--gv-door-k": DOOR_TOKEN_SCALE,
        } as CSSProperties
      }
    >
      {/* The frame stays put at every pose. A door is the hole in a wall, and the hole does not
          move when the leaf does. */}
      <rect
        x={cx - DOOR_FRAME_W / 2}
        y={cy - half}
        width={DOOR_FRAME_W}
        height={DOOR_GLYPH_SIZE}
        rx={2}
        fill="none"
        stroke={TIER.node}
        strokeWidth={2}
        vectorEffect="non-scaling-stroke"
      />
      <g
        className={`gv-leaf${shut ? " gv-leaf-shut" : ""}`}
        data-testid="governance-door-leaf"
      >
        <rect
          x={cx - DOOR_FRAME_W / 2 + 2}
          y={cy - half + 2}
          width={DOOR_FRAME_W - 4}
          height={DOOR_GLYPH_SIZE - 4}
          fill={TIER.ground}
          stroke={TIER.node}
          strokeWidth={1.6}
          vectorEffect="non-scaling-stroke"
        />
        {/* THE HANDLE, AND IT IS INSIDE THE LEAF ON PURPOSE. A door frame with a rectangle in it
            is a picture frame; a handle is the one mark that says which object this is, and it
            has to travel with the thing it is attached to. It squashes with the leaf when the
            door is ajar, which is what a handle seen edge-on does. */}
        <line
          x1={cx + DOOR_FRAME_W / 2 - 6}
          y1={cy - 3}
          x2={cx + DOOR_FRAME_W / 2 - 6}
          y2={cy + 3}
          stroke={TIER.node}
          strokeWidth={2}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </g>
      {/* WHAT KEEPS LEAVING. Removed outright once the door is shut — a closed door with
          something still coming out of it would unsay the act change, and an opacity of 0 would
          leave an animation running behind it for the rest of the deck. */}
      {shut ? null : (
        <circle
          className="gv-leak"
          data-testid="governance-leak"
          cx={cx + 4}
          cy={cy}
          r={2.6}
          fill={TIER.word}
        />
      )}
      {/* THE BADGE — who the door now belongs to. It arrives only when the door is shut, and it
          is the answer to the figure's own label. */}
      {shut ? (
        <g className="gv-pop" data-testid="governance-badge">
          <circle
            cx={cx + 12}
            cy={cy + 12}
            r={7}
            fill={TIER.ground}
            stroke={TIER.live}
            strokeWidth={1.8}
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={`M ${cx + 8.5} ${cy + 12} l 2.4 2.4 l 5 -5`}
            fill="none"
            stroke={TIER.live}
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </g>
      ) : null}
    </g>
  );
}

/** The second destination's glyph: the same door, already shut, with a badge on it. It is drawn
 *  from the same primitives at the same weights as {@link TravellingDoor}, so the room reads the
 *  two as two STATES of one object rather than as two icons — which is what makes act 2's shut a
 *  return to something it has already seen rather than a new picture. */
function GuardedDoor() {
  const cx = doorCenterX(1);
  const cy = DOOR_GLYPH_CY;
  const half = DOOR_GLYPH_SIZE / 2;
  return (
    <>
      <rect
        x={cx - DOOR_FRAME_W / 2}
        y={cy - half}
        width={DOOR_FRAME_W}
        height={DOOR_GLYPH_SIZE}
        rx={2}
        fill="none"
        stroke={TIER.node}
        strokeWidth={2}
      />
      <rect
        x={cx - DOOR_FRAME_W / 2 + 2}
        y={cy - half + 2}
        width={DOOR_FRAME_W - 4}
        height={DOOR_GLYPH_SIZE - 4}
        fill={TIER.ground}
        stroke={TIER.node}
        strokeWidth={1.6}
      />
      <line
        x1={cx + DOOR_FRAME_W / 2 - 6}
        y1={cy - 3}
        x2={cx + DOOR_FRAME_W / 2 - 6}
        y2={cy + 3}
        stroke={TIER.node}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <circle
        cx={cx + 12}
        cy={cy + 12}
        r={7}
        fill={TIER.ground}
        stroke={TIER.live}
        strokeWidth={1.8}
      />
      <path
        d={`M ${cx + 8.5} ${cy + 12} l 2.4 2.4 l 5 -5`}
        fill="none"
        stroke={TIER.live}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
}

/** The third destination's glyph: a rack. A DIFFERENT OBJECT on purpose — the first two
 *  destinations are the same door in two states, and this one is not a door at all. Nothing goes
 *  in or out of it, which is the whole of what its contract says. */
function OnsiteRack() {
  const cx = doorCenterX(2);
  const cy = DOOR_GLYPH_CY;
  return (
    <>
      <rect
        x={cx - 15}
        y={cy - 18}
        width={30}
        height={36}
        rx={2}
        fill="none"
        stroke={TIER.node}
        strokeWidth={2}
      />
      {[-13, -4, 5].map((dy) => (
        <g key={dy}>
          <rect
            x={cx - 10}
            y={cy + dy}
            width={20}
            height={7}
            rx={1}
            fill="none"
            stroke={TIER.node}
            strokeWidth={1.2}
          />
          <circle cx={cx + 6} cy={cy + dy + 3.5} r={1.3} fill={TIER.live} />
        </g>
      ))}
    </>
  );
}

/**
 * Which drawing hangs on a door that does NOT travel.
 *
 * AN EXHAUSTIVE SWITCH OVER THE CLOSED UNION IN `../content.ts`, so a fourth glyph name fails to
 * compile HERE — at the drawing — rather than rendering an empty group on the stage. `"open"` is
 * absent by construction: that glyph is {@link TravellingDoor}, it is drawn last and outside
 * every act group, and the call site narrows it away before reaching this function.
 */
function StaticGlyph({ kind }: { kind: Exclude<DataDestination["glyph"], "open"> }) {
  switch (kind) {
    case "guarded":
      return <GuardedDoor />;
    case "onsite":
      return <OnsiteRack />;
  }
}

// ───────────────────── act 1 · the bus ─────────────────────

/**
 * Lane `index`'s path: down out of the screen, along the bus, and down into its door.
 *
 * ORTHOGONAL AND NOT A FAN OF DIAGONALS — see `../governance-geometry.ts`. Three straight lines
 * from one point read as a beam splitting; a bus with three taps off it reads as a system, which
 * is what this is: one input, three routings, decided by configuration rather than by the person
 * typing. The middle lane's horizontal run is zero, because the middle door is centred on the
 * stage, so it renders as a plain drop and needs no special case.
 */
function lanePath(index: number): string {
  return `M ${SCREEN_CX} ${SCREEN_BOTTOM} V ${BUS_Y} H ${doorCenterX(index)} V ${DOOR_TOP}`;
}

// ───────────────────── act 2 · one row of the circuit ─────────────────────

/**
 * One row: a lead in, a switch, and a lead out that is broken until the switch is thrown.
 *
 * THE BROKEN LEAD IS NOT DIMMED WHEN THE LIT ONE ARRIVES — it is COVERED. Both segments are on
 * the stage from pose 1; the lit one paints over the dashed one and its arrowhead lands on the
 * control box. That is §7.1 applied to a line: attention is bought with added light, never
 * subtracted, and a walk backwards uncovers the break rather than having to restore it.
 *
 * THE FOUR ROWS RUN IN SEQUENCE and the delay is written here rather than in the stylesheet,
 * because it is a property of the row's position in a list and not of the motion.
 */
function CircuitRow({ index, on }: { index: number; on: boolean }) {
  const cy = rowCenterY(index);
  const ms = delay(MANAGED_STEP.row + index);
  const wireEnd = SWITCH_LEFT + SWITCH_W + WIRE_W;
  return (
    <g data-testid={`governance-row-${index}`}>
      {/* the lead from the gap box into the switch — always connected: the thing nobody can do
          is wired to the switch that would do it, and that is true whichever way the switch is
          thrown. */}
      <line
        x1={GAP_LEFT + GAP_W}
        y1={cy}
        x2={SWITCH_LEFT}
        y2={cy}
        stroke={TIER.frame}
        strokeWidth={1.5}
      />

      {/* the lead out, broken */}
      <line
        x1={SWITCH_LEFT + SWITCH_W}
        y1={cy}
        x2={wireEnd}
        y2={cy}
        stroke={TIER.frame}
        strokeWidth={1.5}
        strokeDasharray="5 6"
      />

      {/* the lead out, completed — drawn left to right, on this row's own clock */}
      {on ? (
        <>
          <line
            className="gv-draw"
            data-testid={`governance-wire-${index}`}
            x1={SWITCH_LEFT + SWITCH_W}
            y1={cy}
            x2={wireEnd}
            y2={cy}
            pathLength={1}
            stroke={TIER.live}
            strokeWidth={1.8}
            style={
              {
                "--gv-len": "1",
                strokeDasharray: 1,
                animationDelay: `${ms}ms`,
              } as CSSProperties
            }
          />
          <polygon
            className="gv-pop"
            points={`${wireEnd - 7} ${cy - 5} ${wireEnd} ${cy} ${wireEnd - 7} ${cy + 5}`}
            fill={TIER.live}
            style={{ animationDelay: `${ms + 320}ms` }}
          />
        </>
      ) : null}

      {/* the switch. The track and the knob share one clock so the pair reads as ONE object
          changing state rather than as a dot moving across a shape. */}
      <rect
        className="gv-track"
        data-testid={`governance-track-${index}`}
        x={SWITCH_LEFT}
        y={cy - SWITCH_H / 2}
        width={SWITCH_W}
        height={SWITCH_H}
        rx={SWITCH_H / 2}
        fill={on ? "var(--copper-800)" : TIER.ground}
        stroke={on ? TIER.live : TIER.frame}
        strokeWidth={1.5}
        style={{ transitionDelay: on ? `${ms}ms` : "0ms" }}
      />
      <circle
        className={`gv-knob${on ? " gv-knob-on" : ""}`}
        data-testid={`governance-knob-${index}`}
        data-on={on ? "true" : "false"}
        cx={KNOB_OFF_CX}
        cy={cy}
        r={KNOB_R}
        fill={on ? TIER.word : TIER.frame}
        style={
          {
            "--gv-throw": `${SWITCH_THROW}px`,
            transitionDelay: on ? `${ms}ms` : "0ms",
          } as CSSProperties
        }
      />
    </g>
  );
}

// ───────────────────── the figure ─────────────────────

export interface GovernanceBeatsProps {
  /** 0…3. See the header for what each pose argues. */
  pose: number;
}

export function GovernanceBeats({ pose }: GovernanceBeatsProps) {
  // ACT 1 IS `===` AND ACT 2 IS `>=` — the same exception `./ChickenEggBeats.tsx` records. The
  // three doors are a SET and not superseded information: act 2 is about ONE of them, so the
  // other two leave and the door that stays is what carries the claim across the gap.
  const act1 = pose === 0;
  const showCircuit = pose >= 1;
  const showManaged = pose >= 2;
  const showFloor = pose >= 3;

  return (
    <>
      {/* ═══════════════ THE DRAWN LAYER ═══════════════
          One `<svg>`, 1:1 with the stage (`viewBox` 0 0 1280 720 against a 1280×720 stage), so
          every number in `../governance-geometry.ts` is usable in both layers without a second
          coordinate system. `pointerEvents: none` comes from `.svg-layer`: a click anywhere on
          the stage advances the deck, and nothing here may shadow that.

          IT IS FIRST IN THE MARKUP, so the DOM boxes paint over it. That is what lets the three
          door boxes carry no background and still be boxes — the glyph inside each one is drawn
          on this layer and shows through the box that frames it. */}
      <svg className="svg-layer" viewBox="0 0 1280 720" data-testid="governance-svg">
        {/* ───── act 1 · the screen ───── */}
        <Mark on={act1} delay={delay(DOOR_STEP.screen)} testId="governance-screen">
          <Screen />
        </Mark>

        {/* ───── act 1 · the bus ─────
            The personal lane is DASHED and its dashes travel; the other two are solid and still.
            What a consumer account's terms permit is a standing arrangement, and a static line
            would say it was over. */}
        <Mark on={act1} delay={delay(DOOR_STEP.bus)} testId="governance-bus">
          {C.destinations.map((destination, index) => (
            <path
              key={destination.id}
              className={index === 0 ? "gv-lane-flow" : undefined}
              data-testid={`governance-lane-${destination.id}`}
              d={lanePath(index)}
              fill="none"
              stroke={index === 0 ? TIER.node : TIER.wire}
              strokeWidth={1.6}
              strokeDasharray={index === 0 ? "6 6" : undefined}
            />
          ))}
          {/* A TERMINATOR ON EACH LANE, ON THE DOOR IT ENTERS. It is a dash-pattern fix before
              it is a drawing decision: the personal lane is dashed, so where its last dash
              falls is arithmetic, and on a rendered frame it stopped ≈18px short of the card
              and read as a line that had been cut. A node on the join says the lane arrives,
              whatever the pattern does. The other two get one too — three lanes, one grammar. */}
          {C.destinations.map((destination, index) => (
            <circle
              key={destination.id}
              cx={doorCenterX(index)}
              cy={DOOR_TOP}
              r={2.6}
              fill={index === 0 ? TIER.node : TIER.wire}
            />
          ))}
        </Mark>

        {/* ───── act 1 · the two glyphs that leave with the act ─────
            The first destination's glyph is NOT here: it is drawn last, outside every group, and
            it travels. */}
        {C.destinations.map((destination, index) => {
          if (destination.glyph === "open") return null;
          return (
            <Mark
              key={destination.id}
              on={act1}
              delay={delay(DOOR_STEP.door + index)}
              testId={`governance-glyph-${destination.id}`}
            >
              <StaticGlyph kind={destination.glyph} />
            </Mark>
          );
        })}

        {/* ───── act 2 · the token the circuit hangs off ─────
            Its rim goes from `frame` to `live` when the door inside it shuts, which is the only
            colour on this stage that answers the figure's own label. */}
        <Mark on={showCircuit} delay={delay(CIRCUIT_STEP.token)} testId="governance-token">
          <circle
            cx={TOKEN_CX}
            cy={TOKEN_CY}
            r={TOKEN_R}
            fill={TIER.ground}
            stroke={showManaged ? TIER.live : TIER.frame}
            strokeWidth={1.5}
            style={{ transition: "stroke 620ms var(--ease)" }}
          />
        </Mark>

        {/* ───── act 2 · four rows, one circuit each ───── */}
        {C.exposures.map((exposure, index) => (
          <Mark
            key={exposure.id}
            on={showCircuit}
            delay={delay(CIRCUIT_STEP.row + index)}
            testId={`governance-circuit-${exposure.id}`}
          >
            <CircuitRow index={index} on={showManaged} />
          </Mark>
        ))}

        {/* THE DOOR IS LAST IN THE MARKUP so it paints over the box it starts inside and over the
            token it ends inside. It is OUTSIDE every act group on purpose: the bus and the other
            two glyphs fade out, and this one travels and stays. */}
        <Mark on delay={delay(DOOR_STEP.door)} testId="governance-door-mark">
          <TravellingDoor parked={!act1} shut={showManaged} />
        </Mark>
      </svg>

      {/* ═══════════════ ACT 1 · ONE SCREEN, THREE DOORS ═══════════════ */}

      <Reveal
        on={act1}
        delay={delay(DOOR_STEP.eyebrow)}
        data-testid="governance-screen-eyebrow"
        style={{
          position: "absolute",
          left: SIDE_MARGIN,
          top: SCREEN_EYEBROW_TOP,
          width: CONTENT_WIDTH,
          height: LABEL_HEIGHT,
          ...mono(LABEL_SIZE, TIER.label, LABEL_TRACKING),
          lineHeight: 1.3,
          textAlign: "center",
          whiteSpace: "nowrap",
        }}
      >
        {C.screenEyebrow}
      </Reveal>

      {/* THE THREE DOORS — one box each, and NO BACKGROUND. The glyph inside every one of them is
          drawn on the SVG layer under this box, so a fill here would hide it. The stage is
          `--neutral-900` already, which is what a `ground` fill would have painted. */}
      {C.destinations.map((destination, index) => (
        <Reveal
          key={destination.id}
          on={act1}
          delay={delay(DOOR_STEP.door + index)}
          className="box-hover"
          data-testid={`governance-destination-${destination.id}`}
          style={{
            position: "absolute",
            left: doorLeft(index),
            top: DOOR_TOP,
            width: DOOR_W,
            height: DOOR_H,
            boxSizing: "border-box",
            border: `1px solid ${TIER.frame}`,
          }}
        >
          <div
            data-testid={`governance-destination-label-${destination.id}`}
            style={{
              position: "absolute",
              left: DOOR_PAD,
              top: DOOR_LABEL_TOP - DOOR_TOP,
              width: DOOR_W - 2 * DOOR_PAD,
              height: LABEL_HEIGHT,
              ...mono(LABEL_SIZE, TIER.label, LABEL_TRACKING),
              lineHeight: 1.3,
              textAlign: "center",
              whiteSpace: "nowrap",
            }}
          >
            {destination.label}
          </div>
          <div
            data-testid={`governance-destination-contract-${destination.id}`}
            style={{
              position: "absolute",
              left: DOOR_PAD,
              top: DOOR_TEXT_TOP - DOOR_TOP,
              width: DOOR_W - 2 * DOOR_PAD,
              height: DOOR_TEXT_HEIGHT,
              ...sans(TIER.contract),
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {destination.contract}
          </div>
        </Reveal>
      ))}

      <Reveal
        on={act1}
        as="p"
        delay={delay(VERDICT_STEP)}
        data-testid="governance-verdict"
        style={{
          position: "absolute",
          left: SIDE_MARGIN,
          top: VERDICT_TOP,
          width: CONTENT_WIDTH,
          height: BEAT_HEIGHT,
          ...prose(BEAT_TEXT_SIZE, TIER.bright),
        }}
      >
        {highlight(C.verdict, C.verdictKw)}
      </Reveal>

      {/* ═══════════════ ACT 2 · THE CIRCUIT ═══════════════ */}

      <Reveal
        on={showCircuit}
        as="p"
        delay={delay(CIRCUIT_STEP.line)}
        data-testid="governance-exposure"
        style={{
          position: "absolute",
          left: SIDE_MARGIN,
          top: EXPOSURE_TOP,
          width: CONTENT_WIDTH,
          height: BEAT_HEIGHT,
          ...prose(BEAT_TEXT_SIZE, TIER.bright),
        }}
      >
        {highlight(C.exposureLine, C.exposureLineKw)}
      </Reveal>

      {/* THE TOKEN'S TWO LABELS — one box's worth of stage, two mutually exclusive strings. It is
          the figure's own label answered twice: nobody, and then one person. `pose === 1` and not
          `>= 1`, because this is a STATE and not an accumulation. */}
      <Reveal
        on={pose === 1}
        delay={delay(CIRCUIT_STEP.token)}
        data-testid="governance-token-nobody"
        style={{
          position: "absolute",
          left: TOKEN_LABEL_LEFT,
          top: TOKEN_LABEL_TOP,
          width: TOKEN_LABEL_W,
          height: TOKEN_LABEL_HEIGHT,
          ...mono(TOKEN_LABEL_SIZE, TIER.label, TOKEN_LABEL_TRACKING),
          lineHeight: 1.3,
          textAlign: "center",
          whiteSpace: "nowrap",
        }}
      >
        {C.nobodyToken}
      </Reveal>

      <Reveal
        on={showManaged}
        delay={delay(SHUT_STEP)}
        data-testid="governance-token-owner"
        style={{
          position: "absolute",
          left: TOKEN_LABEL_LEFT,
          top: TOKEN_LABEL_TOP,
          width: TOKEN_LABEL_W,
          height: TOKEN_LABEL_HEIGHT,
          ...mono(TOKEN_LABEL_SIZE, TIER.label, TOKEN_LABEL_TRACKING),
          lineHeight: 1.3,
          textAlign: "center",
          whiteSpace: "nowrap",
        }}
      >
        {C.ownerToken}
      </Reveal>

      <Reveal
        on={showCircuit}
        delay={delay(CIRCUIT_STEP.eyebrow)}
        data-testid="governance-exposure-eyebrow"
        style={{
          position: "absolute",
          left: GAP_LEFT,
          top: COLUMN_LABEL_TOP,
          width: GAP_W,
          height: LABEL_HEIGHT,
          ...mono(LABEL_SIZE, TIER.label, LABEL_TRACKING),
          lineHeight: 1.3,
          whiteSpace: "nowrap",
        }}
      >
        {C.exposureEyebrow}
      </Reveal>

      <Reveal
        on={showManaged}
        delay={delay(MANAGED_STEP.eyebrow)}
        data-testid="governance-controls-eyebrow"
        style={{
          position: "absolute",
          left: CONTROL_LEFT,
          top: COLUMN_LABEL_TOP,
          width: CONTROL_W,
          height: LABEL_HEIGHT,
          ...mono(LABEL_SIZE, TIER.label, LABEL_TRACKING),
          lineHeight: 1.3,
          whiteSpace: "nowrap",
        }}
      >
        {C.controlsEyebrow}
      </Reveal>

      {/* THE DEFICIT — four boxes, dashed, because nothing here is a term anybody agreed to. The
          type is centred for the reason the circuit is: every box hangs off a wire on the row's
          own centre line, and left-aligned type breaks that horizontal for the boxes whose string
          is shorter than the measure. */}
      {C.exposures.map((exposure, index) => (
        <Reveal
          key={exposure.id}
          on={showCircuit}
          delay={delay(CIRCUIT_STEP.row + index)}
          className="box-hover"
          data-testid={`governance-gap-${exposure.id}`}
          style={{
            position: "absolute",
            left: GAP_LEFT,
            top: rowTop(index),
            width: GAP_W,
            height: ROW_H,
            boxSizing: "border-box",
            border: `1px dashed ${TIER.frame}`,
            background: TIER.ground,
            padding: `${ITEM_PAD_Y}px ${ITEM_PAD_X}px`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ ...sans(TIER.gap), textAlign: "center" }}>{exposure.label}</span>
        </Reveal>
      ))}

      {/* THE OFFER — the SAME four boxes in two states. At pose 1 each one is an empty slot with
          a mark in it that keeps dimming and recovering; at pose 2 it is solid, lit, and holds
          the control that closes the gap on its row.

          ONE ELEMENT AND NOT TWO, which is what makes the walk backwards free and what lets
          `.box-hover`'s own `border-color` transition carry the state change. The border goes
          from dashed to solid instantly under a 200ms colour ramp, which at projection scale
          reads as one box hardening rather than as two boxes swapping. */}
      {C.controls.map((control, index) => (
        <Reveal
          key={control.id}
          on={showCircuit}
          delay={
            showManaged ? delay(MANAGED_STEP.row + index) : delay(CIRCUIT_STEP.row + index)
          }
          className="box-hover"
          data-testid={`governance-control-${control.id}`}
          data-filled={showManaged ? "true" : "false"}
          style={{
            position: "absolute",
            left: CONTROL_LEFT,
            top: rowTop(index),
            width: CONTROL_W,
            height: ROW_H,
            boxSizing: "border-box",
            border: showManaged ? `1px solid ${TIER.live}` : `1px dashed ${TIER.frame}`,
            background: TIER.ground,
            padding: `${ITEM_PAD_Y}px ${ITEM_PAD_X}px`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {showManaged ? (
            <span style={{ ...sans(TIER.bright), textAlign: "center" }}>{control.label}</span>
          ) : (
            <span
              className="gv-empty"
              data-testid={`governance-empty-${control.id}`}
              style={{
                display: "block",
                width: 22,
                height: 2,
                background: TIER.frame,
                animationDelay: `${delay(CIRCUIT_STEP.row + index)}ms`,
              }}
            />
          )}
        </Reveal>
      ))}

      <Reveal
        on={showManaged}
        as="p"
        delay={delay(ANSWER_STEP)}
        data-testid="governance-answer"
        style={{
          position: "absolute",
          left: SIDE_MARGIN,
          top: ANSWER_TOP,
          width: CONTENT_WIDTH,
          height: BEAT_HEIGHT,
          ...prose(BEAT_TEXT_SIZE, TIER.bright),
        }}
      >
        {highlight(C.answerLine, C.answerLineKw)}
      </Reveal>

      {/* ═══════════════ THE FLOOR · THE RULE AND THE THESIS ═══════════════
          Full width, because the rule divides the SLIDE: above it what the room is looking at,
          below it the one line this deck asks it to leave with. The testid sits on a positioned
          WRAPPER because `CopperRule` spreads no `data-*` props. */}
      <div
        data-testid="governance-rule"
        style={{ position: "absolute", left: SIDE_MARGIN, top: RULE_TOP, width: CONTENT_WIDTH }}
      >
        <CopperRule on={showFloor} delay={delay(FLOOR_STEP.rule)} width="100%" />
      </div>

      <Reveal
        on={showFloor}
        as="p"
        delay={delay(FLOOR_STEP.thesis)}
        data-testid="governance-thesis"
        style={{
          position: "absolute",
          left: SIDE_MARGIN,
          top: THESIS_TOP,
          width: CONTENT_WIDTH,
          height: THESIS_HEIGHT,
          ...prose(THESIS_TEXT_SIZE, TIER.bright),
        }}
      >
        {highlight(C.closer, C.closerKw)}
      </Reveal>
    </>
  );
}
