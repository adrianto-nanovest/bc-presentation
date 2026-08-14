// A lock that never opens, and two roads that end in the same place.
//
// ═══ THE FIGURE IN ONE PARAGRAPH. Act 1 draws the condition §6.7 opens on: BUDGET and PROOF as
// two poles of a CLOSED CYCLE, each arc labelled with the clause that makes the other one
// unreachable, a padlock in the middle, and the dashes circulating for as long as the slide is
// up. Act 2 keeps the padlock — it travels to the left margin and shrinks into a token — and
// spends the stage on TWO ROADS to one destination: the long one we actually took, dashed, with
// a ban seal on it and four costs hanging off it, and the short one the room can authorise,
// solid, drawn in half a second, with four limits hanging off it. The destination is the PROOF
// plate out of act 1's ring, moved and grown. `../chicken-egg-geometry.ts` owns every
// coordinate and argues the layout; this file owns the arrival order, the colour ladder and the
// motion.
//
// ═══ WHAT THE REDRAW REPLACED, so a reader who knows the shipped slide is not looking for it.
// D.3 used to be TWO COLUMNS OF TYPE — the story left, the offer right, a bordered card, and no
// drawn object anywhere. Every string on it is still here and most of them are unchanged; what
// changed is that the argument is now in the picture and the sentences caption it, rather than
// the sentences being the argument and the stage being a place to put them. The two copy edits
// are `../content.ts`'s, not this file's: beat 3 no longer says "Management was convinced" to a
// room of top management, and the deck's closer is a new one-line thesis on the floor.
//
// ═══ FOUR POSES FOR FOUR BEATS — AND STILL NOT ONE BEAT PER POSE. #57's AC reads "Beat 3 is
// present and unmissable; no pose of the slide ends on beat 2", and the issue body reads "The
// slide must never rest on beat 2." A POSE IS A RESTING STATE — the presenter stops on it and
// talks over it for as long as they like — so a pose whose last arrival is the workaround plus
// its bill would leave a room looking at an account of breaching somebody's terms of service
// with the sentence that licenses it not yet on the stage. So beats 2 AND 3 share pose 1, in
// §6.7's order, and the two poses that frees go to beat 4 and to the deck's own floor:
//
//   0 — THE LOCK. Poles, arcs, the two clauses, the padlock, and one glyph beside each pole's
//       word — a banknote and a signed sheet, reaching for each other and never arriving.
//   1 — THE LONG ROAD. The ring contracts and the padlock travels to the road's head; the PROOF
//       pole becomes the destination; the act, the ban, the bill's four boxes, and LAST the
//       verdict that ends the story legitimately.
//   2 — THE TURN, AND WHAT BOUNDS IT. The one sentence addressed to the room, the key, the short
//       road drawing itself to the same destination, and the four limits hanging off it.
//   3 — THE FLOOR. The rule, and LAST the thesis. Nothing else.
//
// POSES 2 AND 3 WERE THREE POSES UNTIL 2026-08-14 — the turn, then the terms, then nothing of its
// own for the floor. The owner joined the first two: a pose is a resting state, and a resting
// state that offers a division head a pilot WITHOUT its terms is a stage that cannot be discussed
// until the presenter presses a key. See {@link TURN_STEP} for the argument and for what the join
// bought, which is a last pose that carries the closer alone.
//
// ═══ ACT 1 IS GATED WITH `===` AND EVERYTHING ELSE WITH `>=`, which is a deliberate exception
// to the rule every step-reveal slide in this deck keeps ("a pose is everything argued so far").
// The ring is not superseded information, it is a SET: the deadlock is the condition act 2
// answers, and leaving a 544px ellipse on the stage under the two roads would make the answer
// unreadable. The padlock is what carries the claim across the gap — it is the one mark that
// does NOT leave, so the room never has to be told that the token at the road's head is the same
// lock it was just shown.
//
// ═══ RANK IS A COLOUR TIER BETWEEN ROLES — see {@link TIER}, where every ordering claim carries
// the luminance it was measured at — and opacity means "not revealed yet", i.e. TIME, never
// rank. NOTHING ON THIS STAGE IS DIMMED WHEN SOMETHING ELSE ARRIVES (§7.1: attention is bought
// with added light, never subtracted). The long road is drawn at `--copper-600` from the moment
// it appears and is still `--copper-600` when the short road lands two poses later at
// `--copper-300`; the short road is brighter because it is the thing being offered, not because
// the long one was turned down.
//
// ═══ CSS VARS ONLY, NO HEX AND NO rgba() LITERALS — including every stroke in the SVG layer.
//
// ═══ ZERO SMIL NODES, at every pose, under either motion preference. This figure DOES mount
// `<svg>` elements — one 1:1 drawn layer, plus a 26px glyph beside each of act 1's two words — so
// the guarantee is no longer "by construction, there is no SVG" and has to be made the way
// `leader-shape`'s three figures make
// it: every mark that moves is a CSS animation or a CSS transition, declared in
// `./chicken-egg.css`, and there is no `<animate>`, `<animateTransform>`, `<animateMotion>` or
// `<set>` in this file. That matters because SMIL is invisible to the `prefers-reduced-motion:
// reduce` squash in `src/styles/globals.css` and would have to be gated behind a `matchMedia` at
// mount; CSS is not, and the media block at the bottom of `./chicken-egg.css` finishes the job
// the squash cannot (it removes the three infinite loops outright and zeroes the short road's
// dash offset by hand, which is the one place `animation: none` alone would leave a mark
// invisible).
//
// ═══ IT READS NO VARIANT AND NO BRAND, and unlike `./ProofLedger.tsx`, `./SecurityBeats.tsx`
// and `./SubscriptionBeats.tsx` it takes no resolved content block either: §4.4's table of seven
// brand × deckSet slots does not list this slide, because the deadlock, the shared accounts and
// the ban are NANOVEST'S OWN history and there is nothing true to put in a per-division version
// of them (`../content.ts` states the decision and forbids a resolver). One story,
// byte-identical in both leader decks — a claim a browser check settles by diffing the two
// decks' rendered boxes rather than by reading this comment.
import type { CSSProperties, ReactNode } from "react";
// Section E's copy, which is the tree's de facto shared reveal primitive. `./ProofLedger.tsx`
// carries a census of its importers and the three figures beside it decline to re-quote the
// numbers; this file declines too. A fourth copy of the primitive would still be the wrong
// answer to three that already exist elsewhere. `CopperRule` comes from the same file for the
// same reason.
import { CopperRule, Reveal } from "@/slides/foundation-core-section-e/components/Reveal";
import { highlight } from "@/components/highlight";
import {
  ACT_TOP,
  BAN_CX,
  BAN_R,
  BEAT_HEIGHT,
  BEAT_TEXT_SIZE,
  BEAT_W,
  BUDGET_LEFT,
  CLAUSE_HEIGHT,
  CLAUSE_LEFT,
  CLAUSE_W,
  CONTENT_WIDTH,
  COST_HEIGHT,
  COST_TOP,
  DEST_EYEBROW_HEIGHT,
  DEST_H,
  DEST_LEFT,
  DEST_PAD,
  DEST_TOP,
  DEST_W,
  DEST_WORD_HEIGHT,
  DEST_WORD_SIZE,
  ITEM_COUNT,
  ITEM_PAD_X,
  ITEM_PAD_Y,
  ITEM_TEXT_SIZE,
  ITEM_W,
  LANE_LEFT,
  LOCK_TOKEN_SCALE,
  LOCK_TRAVEL_X,
  LOCK_TRAVEL_Y,
  LONG_LABEL_TOP,
  LONG_LANE_Y,
  POLE_GLYPH_GAP,
  POLE_GLYPH_SIZE,
  POLE_H,
  POLE_LABEL_SIZE,
  POLE_TOP,
  POLE_W,
  POLE_WORD_TOP,
  PROOF_HERO_LEFT,
  RING_BOTTOM_Y,
  RING_CX,
  RING_CY,
  RING_RX,
  RING_RY,
  RING_TOP_Y,
  ROAD_LABEL_HEIGHT,
  ROAD_LABEL_W,
  ROAD_WEIGHT,
  RULE_TOP,
  SHORT_LABEL_TOP,
  SHORT_LANE_Y,
  SIDE_MARGIN,
  TERM_HEIGHT,
  TERM_NODE_R,
  TERM_TOP,
  THESIS_HEIGHT,
  THESIS_TEXT_SIZE,
  THESIS_TOP,
  TOKEN_CX,
  TOKEN_LABEL_DROP,
  TOKEN_LABEL_HEIGHT,
  TOKEN_LABEL_LEFT,
  TOKEN_LABEL_SIZE,
  TOKEN_LABEL_TRACKING,
  TOKEN_LABEL_W,
  TOKEN_R,
  TOLL_R,
  TURN_TOP,
  VERDICT_TOP,
  itemCenterX,
  itemLeft,
  clauseTop,
} from "../chicken-egg-geometry";
import { investChickenEggContent as C } from "../content";
import "./chicken-egg.css";

// ───────────────────── the tiers, in one table ─────────────────────

/**
 * One tier per ROLE, and not one per box. The ladder is this section's, with the same
 * hand-derived luminances (WCAG relative luminance over `src/styles/globals.css`'s hexes) that
 * `./BaseRatesBeats.tsx`, `./SecurityBeats.tsx` and `./SubscriptionBeats.tsx` use, so the
 * section's five slides rank at one scale. Brightest first, under the headline's `--neutral-50`
 * (0.9131):
 *
 *   role        token           luminance   register
 *   thesis      --neutral-100    0.7835     19px serif — the closer, alone on the floor
 *   verdict     --neutral-100    0.7835     17px serif — beat 3
 *   turn        --neutral-100    0.7835     17px serif — beat 4's address to the room
 *   term        --neutral-100    0.7835     13px sans  — the four limits on offer
 *   act         --neutral-200    0.6584     17px serif — beat 2, what we did
 *   pole        --copper-200     0.5917     26→42px display — BUDGET and PROOF
 *   cost        --neutral-300    0.3663     13px sans  — the four costs, a bill already paid
 *   label       --copper-400     0.2967     10.5–11px mono caps — every eyebrow and token label
 *   short-road  --copper-300     0.4586     the route on offer
 *   node        --copper-500     0.2168     the tolls, the ban seal, the key
 *   long-road   --copper-600     0.1547     the route we took
 *   frame       --copper-700     0.0900     the item boxes' borders and the ticks
 *   ring        --copper-800     0.0480     the cycle's own arcs
 *
 * ═══ THE EPISTEMICS ARE DRAWN IN THE PROSE TIERS, AND THEY ARE THE POINT OF THE TABLE. Beat 2
 * — the workaround — is the ONLY sentence on this stage a tier below the other three. That is
 * not a legibility decision and it is not decoration: it is the slide refusing to give its
 * account of breaching somebody's terms of service the same weight as the verdict that closed
 * it, the turn that supersedes it, or the thesis the room is asked to leave with. A stage that
 * set all four at `--neutral-100` would be a stage that emphasised the workaround exactly as
 * much as the offer.
 *
 * ═══ THE FOUR TERMS OUT-RANK THE FOUR COSTS BY TWO STEPS (0.7835 against 0.3663), and that is
 * the same argument in the small type. The costs are a bill that was already paid, in the past,
 * by us; the terms are what the room is being handed. Both are 13px sans in identical boxes on
 * one grid, so nothing but colour separates them — which is exactly enough, and is why the two
 * rows can be read as a comparison without a caption saying "compare these".
 *
 * ═══ TWO ROADS, TWO TIERS, AND NEITHER OF THEM MOVES. `--copper-300` for the short road and
 * `--copper-600` for the long one is a 3× luminance gap that survives a projector; both are set
 * when their road is drawn and neither is touched afterwards. The dimmer road is not dimmed —
 * it was never brighter (§7.1).
 *
 * ═══ THE THREE STROKE TIERS BELOW THE TEXT FLOOR ARE NOT TEXT. `--copper-700` (borders and
 * ticks) and `--copper-800` (the ring's arcs) sit under gh#50's floors deliberately: a border is
 * not read, and the ring's job at pose 0 is to be the LANE the two labelled arrowheads travel
 * in, not to compete with them. `--copper-500` for the tolls and the ban clears WCAG's 3:1 floor
 * for a non-text graphic against `--surface-dark` with room to spare.
 *
 * `--copper-400` UNDER `--neutral-300` FOR THE MONO CAPS is the shipped precedent all four
 * sibling figures cite — exactly this token in exactly this register — and it is precedent, not
 * a documented exemption.
 *
 * ═══ THE ONE TIER THAT IS NOT IN THIS TABLE IS HOVER, AND IT IS NOT THIS FILE'S. All TEN boxes
 * on the stage — the BUDGET pole, the PROOF plate, the four terms and the four costs — carry
 * `box-hover` from `src/styles/globals.css`, which lays a `--copper-200` hairline and a copper
 * wash over a hovered box on a pseudo-element. It is declared once, for the five leader figures
 * that use it, and it deliberately does not touch type: the rest tiers above are the argument,
 * and a hover that also brightened the words would let a pointer re-rank the bill against the
 * terms. Nothing it does reaches the plate's own transition list either — see the note over that
 * list in `./chicken-egg.css`.
 */
const TIER = {
  /** The closer, the verdict, the turn, and the four terms. */
  bright: "var(--neutral-100)",
  /** Beat 2 alone — see the table. */
  act: "var(--neutral-200)",
  /** The four costs: a bill, paid, in the past. */
  cost: "var(--neutral-300)",
  /** BUDGET and PROOF, in the display face. */
  pole: "var(--copper-200)",
  /** Every eyebrow and token label on the stage. */
  label: "var(--copper-400)",
  /** The road the room can authorise. */
  shortRoad: "var(--copper-300)",
  /** The tolls, the ban seal, the key, the term nodes. */
  node: "var(--copper-500)",
  /** The road we took. */
  longRoad: "var(--copper-600)",
  /** Box borders, ticks, and the token rings. */
  frame: "var(--copper-700)",
  /** The cycle's two arcs. */
  ring: "var(--copper-800)",
  /** The one fill on the stage: what a box, a token or a seal sits on. */
  ground: "var(--neutral-900)",
} as const;

// ───────────────────── type registers ─────────────────────

/** The mono register. `upper` is the default because every mono LABEL in this deck is
 *  uppercase, and every string this figure sets in it already is. */
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

/** The sans register — the four costs and the four terms, and nothing else. It is the deck's
 *  list face and these are the only two lists on the stage. */
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
 *  at one speed or the section has five. */
const LEAD_MS = 120;
const STAGGER_MS = 90;

/** How many steps into a pose a box arrives, as milliseconds of delay. */
const delay = (step: number) => LEAD_MS + step * STAGGER_MS;

/**
 * POSE 0 — THE LOCK, in the order a room can build it.
 *
 * THE POLES BEFORE THE ARCS, because an arc between two things that are not there yet is a line
 * to nowhere; the arcs before the clauses, because a clause is the arc's caption; the LOCK LAST,
 * because it is the conclusion the four marks above it add up to. A padlock that arrived first
 * would tell the room the answer before it had seen the question.
 */
const LOCK_STEP = {
  poles: 0,
  arcs: 1,
  heads: 2,
  clause: 2,
  lock: 4,
} as const;

/**
 * POSE 1 — THE LONG ROAD.
 *
 * §6.7's BEAT ORDER IS THE ARRIVAL ORDER, and the road is part of beat 2 rather than a preamble
 * to it: the room sees the route drawn, then reads what it was, then sees the ban on it, then
 * the bill, then — LAST — the sentence that says how it ended. Nothing here may be reordered
 * without re-reading #57's AC; the verdict's position at the end is the AC.
 */
const LONG_STEP = {
  road: 0,
  destination: 1,
  act: 2,
  ban: 3,
  eyebrow: 4,
  /** The first cost. Each one after it is a further {@link STAGGER_MS}. */
  cost: 5,
} as const;

/** Where the verdict lands: after the last cost, which is what makes it beat 3 and not a fifth
 *  line of beat 2's bill. Derived from the count so a re-cut bill takes the verdict with it. */
const VERDICT_STEP = LONG_STEP.cost + ITEM_COUNT;

/**
 * POSE 2 — THE TURN, THE ROAD, AND THE TERMS ON IT. ONE POSE, EIGHT ARRIVALS.
 *
 * THE SENTENCE FIRST AND THE ROAD SECOND, which is the opposite of pose 1 and deliberately so.
 * Pose 1 shows what happened and then says it; pose 2 says what is on offer and then draws it,
 * because a road that arrives while the room is still reading the sentence is one event and not
 * two.
 *
 * ═══ THE OFFER AND ITS TERMS WERE TWO POSES UNTIL 2026-08-14, and joining them is the owner's
 * call. What the split bought was a beat between "you can skip the deadlock" and the four limits that
 * bound it; what it COST was a resting state that offered a division head a pilot with no terms on
 * it — a keypress the presenter had to make before the offer could be discussed, on a stage whose
 * whole argument is that the short road is SHORT. The road and the boxes hanging off it are one
 * object, and a room reads them as one: the eight arrivals below still stagger in the order the
 * figure argues in, so nothing is lost but the pause.
 *
 * WHAT THE JOIN FREED IS THE FLOOR — see {@link FLOOR_STEP}. Pose 3 is now the thesis and nothing
 * else, which is the strongest possible last pose and the one place in this deck where the closer
 * arrives on an otherwise finished stage.
 */
const TURN_STEP = {
  turn: 0,
  token: 1,
  road: 2,
  head: 3,
  eyebrow: 4,
  /** The first term. Each one after it is a further {@link STAGGER_MS}. */
  term: 5,
} as const;

/**
 * POSE 3 — THE FLOOR, ALONE.
 *
 * The rule divides the stage before the sentence under it lands, so the thesis arrives into a
 * band that already exists rather than opening one — the same order D.1 uses. Two arrivals, and
 * the figure above them does not move: the room has read the whole picture by the time the deck
 * asks it for anything.
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
 * their own — the lock's travel, the arrowheads' pop, the key's turn, the ticks' drop — and a
 * class that writes `transform` would silently win or lose against them depending on cascade
 * order. So the SVG layer gets one primitive that touches OPACITY ONLY, and every transform on
 * this stage belongs to exactly one rule.
 *
 * THE DELAY IS DROPPED WHEN `on` IS FALSE, which is `Reveal`'s own rule applied by hand: a walk
 * BACKWARDS off a pose must clear the stage at once, not unbuild it in the order it was built.
 */
function Mark({
  on,
  delay: ms,
  className,
  testId,
  children,
}: {
  on: boolean;
  delay: number;
  className?: string;
  testId?: string;
  children: ReactNode;
}) {
  return (
    <g
      className={className}
      data-testid={testId}
      style={{
        opacity: on ? 1 : 0,
        transition: "opacity 0.45s var(--ease)",
        transitionDelay: on ? `${ms}ms` : "0ms",
      }}
    >
      {children}
    </g>
  );
}

// ───────────────────── act 1 · the ring ─────────────────────

/** The two arcs, authored CLOCKWISE so one dash-flow rule circulates both — see
 *  `./chicken-egg.css`. Each one runs pole to pole; the clause that labels it sits outside its
 *  own apex, where {@link clauseTop} puts it. */
const ARC_TOP = `M ${RING_CX - RING_RX} ${RING_CY} A ${RING_RX} ${RING_RY} 0 0 1 ${
  RING_CX + RING_RX
} ${RING_CY}`;
const ARC_BOTTOM = `M ${RING_CX + RING_RX} ${RING_CY} A ${RING_RX} ${RING_RY} 0 0 1 ${
  RING_CX - RING_RX
} ${RING_CY}`;

/** The padlock, drawn from primitives at the ring's centre — a shackle, a body and a keyhole.
 *  No icon set in this deck ships a lock at a stroke weight that survives projection, and this
 *  one has to survive being scaled to 55% as well ({@link LOCK_TOKEN_SCALE}), which is why every
 *  stroke below carries `vectorEffect: "non-scaling-stroke"`: the glyph shrinks, its lines do
 *  not thin. */
function Padlock({ parked }: { parked: boolean }) {
  const cx = RING_CX;
  const cy = RING_CY;
  return (
    <g
      className={`ce-lock${parked ? " ce-lock-parked" : ""}`}
      data-testid="chicken-egg-lock"
      data-parked={parked ? "true" : "false"}
      style={
        {
          "--ce-lock-x": `${LOCK_TRAVEL_X}px`,
          "--ce-lock-y": `${LOCK_TRAVEL_Y}px`,
          "--ce-lock-k": LOCK_TOKEN_SCALE,
        } as CSSProperties
      }
    >
      <path
        d={`M ${cx - 18} ${cy - 4} V ${cy - 20} A 18 18 0 0 1 ${cx + 18} ${cy - 20} V ${cy - 4}`}
        fill="none"
        stroke={TIER.pole}
        strokeWidth={5}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      <rect
        x={cx - 30}
        y={cy - 6}
        width={60}
        height={44}
        rx={7}
        fill={TIER.ground}
        stroke={TIER.pole}
        strokeWidth={2.5}
        vectorEffect="non-scaling-stroke"
      />
      <circle cx={cx} cy={cy + 12} r={5.5} fill={TIER.pole} />
      <rect x={cx - 2.5} y={cy + 16} width={5} height={11} rx={2} fill={TIER.pole} />
    </g>
  );
}

/** The key, in the short road's token — the mark that answers the padlock. Drawn from the same
 *  primitives at the same weights, so the room reads them as two states of one idea rather than
 *  as two icons. */
function Key() {
  const cy = SHORT_LANE_Y;
  return (
    <g className="ce-key-in" data-testid="chicken-egg-key">
      <circle
        cx={TOKEN_CX - 14}
        cy={cy}
        r={10}
        fill="none"
        stroke={TIER.node}
        strokeWidth={3}
      />
      <rect x={TOKEN_CX - 4} y={cy - 3} width={28} height={6} rx={2} fill={TIER.node} />
      <rect x={TOKEN_CX + 12} y={cy + 3} width={4} height={8} rx={1} fill={TIER.node} />
      <rect x={TOKEN_CX + 19} y={cy + 3} width={4} height={8} rx={1} fill={TIER.node} />
    </g>
  );
}

/**
 * The glyph that stands to the left of a pole's word: a banknote for BUDGET, a signed sheet for
 * PROOF.
 *
 * ═══ WHY EITHER OF THEM IS ON THE STAGE AT ALL. Act 1 used to be two WORDS in two boxes with a
 * padlock between them, and the room had to read all three to learn what the figure claimed. A
 * glyph beside each word gives the two poles a shape — money on the left, evidence on the right —
 * so the cycle reads before the type does, which for a room reading a slide in its second language
 * is the difference between a diagram and a caption. The owner asked for it by name on 2026-08-14.
 *
 * ═══ DRAWN FROM PRIMITIVES, LIKE THE PADLOCK AND THE KEY, and for the reason `Padlock` records: an
 * imported icon set arrives at its own stroke weight and this figure has four glyphs that have to
 * look like one family at projection distance. 1.7 on a 24-unit viewBox scaled to 26px is 1.84
 * device-independent pixels, which is the same visual weight as the key's 3-on-1:1 at half the
 * size.
 *
 * ═══ THEY REACH FOR EACH OTHER AND NEVER ARRIVE — the one motion, and it is the slide's own
 * argument rather than decoration. BUDGET leans RIGHT, toward the PROOF it cannot have; PROOF
 * leans LEFT, toward the BUDGET it cannot have; each fades as it reaches and recovers as it comes
 * back; and the two run in ANTIPHASE on the ring's own 2600ms period, so the room sees two things
 * taking turns to want each other. That is what a deadlock is, drawn twice more on a stage that
 * already draws it as a loop and as a lock. `--ce-reach` carries the direction and
 * `./chicken-egg.css` owns the keyframe.
 *
 * ═══ IT IS A SECOND `<svg>` ON A STAGE WITH A DRAWN LAYER, and that is deliberate. The layer at
 * the top of this file is 1:1 with the stage and every mark in it is placed by
 * `../chicken-egg-geometry.ts`; these two are laid out by FLEXBOX, centred as one block with the
 * word beside them, because the width of a word in the display face is not a number a geometry
 * module can know. `.svg-layer`'s own class is what a check should count when it wants "the drawn
 * layer" — see `tests/unit/invest-chicken-egg.test.tsx`.
 */
function PoleGlyph({ kind }: { kind: "budget" | "proof" }) {
  return (
    <svg
      className={`ce-glyph ce-glyph-${kind}`}
      data-testid={`chicken-egg-glyph-${kind}`}
      width={POLE_GLYPH_SIZE}
      height={POLE_GLYPH_SIZE}
      viewBox="0 0 24 24"
      fill="none"
      stroke={TIER.pole}
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {kind === "budget" ? (
        <>
          {/* A NOTE, NOT A COIN AND NOT A CURRENCY SIGN. A coin stack at this size is two ellipses
              and reads as a database; a currency glyph would pick a currency, which a deck shown
              in Indonesian rupiah and quoted in US dollars may not do from a figure. */}
          <rect x={1.8} y={5.8} width={20.4} height={12.4} rx={2} />
          <circle cx={12} cy={12} r={3} />
          <path d="M5.4 10.6v2.8" />
          <path d="M18.6 10.6v2.8" />
        </>
      ) : (
        <>
          {/* A SHEET WITH A TICK ON IT — evidence that has been checked, which is what this deck
              means by proof everywhere else in the section. */}
          <path d="M5.6 2.8h8l5 5v13.4H5.6Z" />
          <path d="M13.6 2.8v5h5" />
          <path d="M8.6 14.2l2.5 2.5 4.4-4.9" />
        </>
      )}
    </svg>
  );
}

// ───────────────────── act 2 · the roads ─────────────────────

/** Where a road stops: 6px short of the destination plate, so the arrowhead's TIP lands on the
 *  plate's own left edge rather than inside it. */
const ROAD_END = DEST_LEFT - 6;
const ROAD_LENGTH = ROAD_END - LANE_LEFT;

/** An arrowhead, pointing right, with its tip on the plate. A polygon and not a `marker`:
 *  markers inherit the path's stroke dash state in Chromium and would blink with the flow. */
function Head({ y }: { y: number }) {
  return (
    <polygon
      points={`${ROAD_END} ${y - 7} ${DEST_LEFT} ${y} ${ROAD_END} ${y + 7}`}
      fill={TIER.shortRoad}
    />
  );
}

// ───────────────────── the figure ─────────────────────

export interface ChickenEggBeatsProps {
  /** 0…3. See the header for what each pose argues. */
  pose: number;
}

export function ChickenEggBeats({ pose }: ChickenEggBeatsProps) {
  // ACT 1 IS `===` AND ACT 2 IS `>=` — see the header. The ring is a SET, not superseded
  // information, and the padlock is what carries the claim across the gap.
  const act1 = pose === 0;
  const showLong = pose >= 1;
  const showTurn = pose >= 2;
  const showFloor = pose >= 3;

  return (
    <>
      {/* ═══════════════ THE DRAWN LAYER ═══════════════
          One `<svg>`, 1:1 with the stage (`viewBox` 0 0 1280 720 against a 1280×720 stage), so
          every number in `../chicken-egg-geometry.ts` is usable in both layers without a second
          coordinate system. `pointerEvents: none` comes from `.svg-layer`: a click anywhere on
          the stage advances the deck, and nothing here may shadow that. */}
      <svg className="svg-layer" viewBox="0 0 1280 720" data-testid="chicken-egg-svg">
        {/* ───── the cycle, and its two arrowheads ─────
            The arcs are `--copper-800`: at pose 0 they are the LANE the two labelled heads
            travel in, and a brighter stroke here would compete with the clauses that carry the
            argument. The dashes circulate clockwise for as long as pose 0 is up — a deadlock is
            not a state, it is a loop that keeps running. */}
        <g
          className={`ce-ring${act1 ? "" : " ce-ring-gone"}`}
          data-testid="chicken-egg-ring"
          data-gone={act1 ? "false" : "true"}
        >
          <Mark on={act1} delay={delay(LOCK_STEP.arcs)} testId="chicken-egg-arcs">
            <path
              className="ce-loop-flow"
              d={ARC_TOP}
              fill="none"
              stroke={TIER.ring}
              strokeWidth={3}
              strokeDasharray="14 18"
            />
            <path
              className="ce-loop-flow"
              d={ARC_BOTTOM}
              fill="none"
              stroke={TIER.ring}
              strokeWidth={3}
              strokeDasharray="14 18"
            />
          </Mark>

          {/* THE HEADS SIT ON THE APEXES, where an ellipse's tangent is horizontal — so each one
              points cleanly along its arc's direction of travel with no rotation to compute. The
              top arc runs BUDGET → PROOF and the bottom one PROOF → BUDGET, which is the cycle:
              each pole points at the thing it is waiting for. */}
          <Mark on={act1} delay={delay(LOCK_STEP.heads)} testId="chicken-egg-arc-heads">
            <polygon
              points={`${RING_CX - 8} ${RING_TOP_Y - 8} ${RING_CX + 8} ${RING_TOP_Y} ${
                RING_CX - 8
              } ${RING_TOP_Y + 8}`}
              fill={TIER.node}
            />
            <polygon
              points={`${RING_CX + 8} ${RING_BOTTOM_Y - 8} ${RING_CX - 8} ${RING_BOTTOM_Y} ${
                RING_CX + 8
              } ${RING_BOTTOM_Y + 8}`}
              fill={TIER.node}
            />
          </Mark>
        </g>

        {/* ───── the long road ─────
            Dashed, and the dashes travel for as long as the slide is up: the arrangement this
            road draws was not a single act. */}
        <Mark on={showLong} delay={delay(LONG_STEP.road)} testId="chicken-egg-long-road">
          <line
            className="ce-road-flow"
            x1={LANE_LEFT}
            y1={LONG_LANE_Y}
            x2={ROAD_END}
            y2={LONG_LANE_Y}
            stroke={TIER.longRoad}
            strokeWidth={ROAD_WEIGHT}
            strokeDasharray="10 18"
          />
          <polygon
            points={`${ROAD_END} ${LONG_LANE_Y - 7} ${DEST_LEFT} ${LONG_LANE_Y} ${ROAD_END} ${
              LONG_LANE_Y + 7
            }`}
            fill={TIER.longRoad}
          />
          <circle
            cx={TOKEN_CX}
            cy={LONG_LANE_Y}
            r={TOKEN_R}
            fill={TIER.ground}
            stroke={TIER.frame}
            strokeWidth={1}
          />
        </Mark>

        {/* ───── the ban ─────
            ONE SEAL, RE-STAMPING ITSELF. "Repeatedly" is a word in §6.7's sentence and the only
            quantity this slide may print is 30-DAY, so the repetition is carried by an infinite
            echo rather than by a drawn count. See `./chicken-egg.css`. */}
        <Mark on={showLong} delay={delay(LONG_STEP.ban)} testId="chicken-egg-ban">
          <circle
            className="ce-ban-echo"
            cx={BAN_CX}
            cy={LONG_LANE_Y}
            r={BAN_R}
            fill="none"
            stroke={TIER.node}
            strokeWidth={1.5}
          />
          <circle
            cx={BAN_CX}
            cy={LONG_LANE_Y}
            r={BAN_R}
            fill={TIER.ground}
            stroke={TIER.node}
            strokeWidth={2}
          />
          <line
            x1={BAN_CX - 6.5}
            y1={LONG_LANE_Y + 6.5}
            x2={BAN_CX + 6.5}
            y2={LONG_LANE_Y - 6.5}
            stroke={TIER.node}
            strokeWidth={2}
            strokeLinecap="round"
          />
        </Mark>

        {/* ───── the four tolls, and the ticks down to the bill ─────
            A toll is a circle with a MINUS in it, which is what a cost is; a term's node below is
            a plain dot. The two marks are different objects and the figure says so before either
            box is read. */}
        {C.costs.map((cost, index) => {
          const cx = itemCenterX(index);
          return (
            <Mark
              key={cost.id}
              on={showLong}
              delay={delay(LONG_STEP.cost + index)}
              testId={`chicken-egg-toll-${cost.id}`}
            >
              <line
                className={showLong ? "ce-tick-drop" : undefined}
                x1={cx}
                y1={LONG_LANE_Y + TOLL_R}
                x2={cx}
                y2={COST_TOP}
                stroke={TIER.frame}
                strokeWidth={1}
                style={{ animationDelay: `${delay(LONG_STEP.cost + index)}ms` }}
              />
              <circle
                className={showLong ? "ce-node-in" : undefined}
                cx={cx}
                cy={LONG_LANE_Y}
                r={TOLL_R}
                fill={TIER.ground}
                stroke={TIER.node}
                strokeWidth={2}
                style={{ animationDelay: `${delay(LONG_STEP.cost + index)}ms` }}
              />
              <line
                x1={cx - 4.5}
                y1={LONG_LANE_Y}
                x2={cx + 4.5}
                y2={LONG_LANE_Y}
                stroke={TIER.node}
                strokeWidth={2}
                strokeLinecap="round"
              />
            </Mark>
          );
        })}

        {/* ───── the short road ─────
            Solid, and DRAWN rather than faded: it is the only line on this stage that arrives.
            `--ce-len` is the road's own length, so the keyframe in `./chicken-egg.css` holds no
            coordinate of its own. */}
        <Mark on={showTurn} delay={delay(TURN_STEP.road)} testId="chicken-egg-short-road">
          <line
            className={showTurn ? "ce-draw" : undefined}
            x1={LANE_LEFT}
            y1={SHORT_LANE_Y}
            x2={ROAD_END}
            y2={SHORT_LANE_Y}
            stroke={TIER.shortRoad}
            strokeWidth={ROAD_WEIGHT}
            style={
              {
                "--ce-len": `${ROAD_LENGTH}`,
                strokeDasharray: ROAD_LENGTH,
                animationDelay: `${delay(TURN_STEP.road)}ms`,
              } as CSSProperties
            }
          />
          <circle
            cx={TOKEN_CX}
            cy={SHORT_LANE_Y}
            r={TOKEN_R}
            fill={TIER.ground}
            stroke={TIER.node}
            strokeWidth={1}
          />
        </Mark>

        <Mark on={showTurn} delay={delay(TURN_STEP.token)} testId="chicken-egg-key-mark">
          {showTurn ? <Key /> : <g />}
        </Mark>

        <Mark on={showTurn} delay={delay(TURN_STEP.head)} testId="chicken-egg-short-head">
          <g className={showTurn ? "ce-head-in" : undefined}>
            <Head y={SHORT_LANE_Y} />
          </g>
        </Mark>

        {/* ───── the four term nodes, and the ticks down to the offer ───── */}
        {C.pilotConstraints.map((term, index) => {
          const cx = itemCenterX(index);
          return (
            <Mark
              key={term.id}
              on={showTurn}
              delay={delay(TURN_STEP.term + index)}
              testId={`chicken-egg-termnode-${term.id}`}
            >
              <line
                className={showTurn ? "ce-tick-drop" : undefined}
                x1={cx}
                y1={SHORT_LANE_Y + TERM_NODE_R}
                x2={cx}
                y2={TERM_TOP}
                stroke={TIER.frame}
                strokeWidth={1}
                style={{ animationDelay: `${delay(TURN_STEP.term + index)}ms` }}
              />
              <circle
                className={showTurn ? "ce-node-in" : undefined}
                cx={cx}
                cy={SHORT_LANE_Y}
                r={TERM_NODE_R}
                fill={TIER.shortRoad}
                style={{ animationDelay: `${delay(TURN_STEP.term + index)}ms` }}
              />
            </Mark>
          );
        })}

        {/* THE LOCK IS LAST IN THE MARKUP so it paints over the ring it starts inside and over
            the token it ends inside. It is OUTSIDE the ring group on purpose: the ring contracts
            and fades, the lock travels and stays. */}
        <Mark on delay={delay(LOCK_STEP.lock)} testId="chicken-egg-lock-mark">
          <Padlock parked={!act1} />
        </Mark>
      </svg>

      {/* ═══════════════ ACT 1 · THE TWO POLES AND THEIR CLAUSES ═══════════════ */}

      {/* THE BUDGET POLE — leaves with the ring. Its counterpart does not: see the PROOF plate
          below, which is the same box in its second placement. */}
      <Reveal
        on={act1}
        delay={delay(LOCK_STEP.poles)}
        className="box-hover"
        data-testid="chicken-egg-pole-budget"
        style={{
          position: "absolute",
          left: BUDGET_LEFT,
          top: POLE_TOP,
          width: POLE_W,
          height: POLE_H,
          boxSizing: "border-box",
          border: `1px solid ${TIER.frame}`,
          background: TIER.ground,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: POLE_GLYPH_GAP,
        }}
      >
        <PoleGlyph kind="budget" />
        <span
          style={{
            fontFamily: "var(--display)",
            fontSize: POLE_LABEL_SIZE,
            letterSpacing: "0.04em",
            color: TIER.pole,
          }}
        >
          {C.budgetLabel}
        </span>
      </Reveal>

      {C.deadlockClauses.map((clause, index) => (
        <Reveal
          key={clause}
          on={act1}
          delay={delay(LOCK_STEP.clause + index)}
          data-testid={`chicken-egg-clause-${index}`}
          style={{
            position: "absolute",
            left: CLAUSE_LEFT,
            top: clauseTop(index),
            width: CLAUSE_W,
            height: CLAUSE_HEIGHT,
            ...mono(15, TIER.label, 0.18),
            lineHeight: 1.5,
            textAlign: "center",
            whiteSpace: "nowrap",
          }}
        >
          {clause}
        </Reveal>
      ))}

      {/* ═══════════════ THE PROOF PLATE · THE ONE BOX THAT TRAVELS ═══════════════
          At pose 0 it is the ring's right-hand pole; from pose 1 it is the destination both
          roads end on. ONE element, two placements, five interpolated properties — see
          `./chicken-egg.css`. It is NOT a `Reveal`: it is on the stage at every pose, and
          `.fade`'s own transform would fight the layout transition. */}
      <div
        className="ce-morph box-hover"
        data-testid="chicken-egg-proof-plate"
        data-placement={act1 ? "pole" : "destination"}
        style={{
          position: "absolute",
          left: act1 ? PROOF_HERO_LEFT : DEST_LEFT,
          top: act1 ? POLE_TOP : DEST_TOP,
          width: act1 ? POLE_W : DEST_W,
          height: act1 ? POLE_H : DEST_H,
          fontSize: act1 ? POLE_LABEL_SIZE : DEST_WORD_SIZE,
          boxSizing: "border-box",
          border: `1px solid ${act1 ? TIER.frame : TIER.node}`,
          background: TIER.ground,
        }}
      >
        {/* THE EYEBROW ARRIVES WITH ACT 2 and names what the plate is FOR — which is the
            sentence act 1's top arc made unreachable. It is absolutely placed inside the plate
            rather than laid out with the word, so the word's own box can stay centred in the
            plate at both placements. */}
        <Reveal
          on={showLong}
          delay={delay(LONG_STEP.destination)}
          data-testid="chicken-egg-destination-eyebrow"
          style={{
            position: "absolute",
            left: DEST_PAD,
            top: DEST_PAD,
            width: DEST_W - 2 * DEST_PAD,
            height: DEST_EYEBROW_HEIGHT,
            ...mono(10.5, TIER.label, 0.16),
            lineHeight: 1.4,
          }}
        >
          {C.destinationEyebrow}
        </Reveal>

        {/* THE HAIRLINE UNDER THE EYEBROW, and it is doing a job rather than dressing one. The
            plate is 304px tall because it has to be the terminus of two lanes 170px apart, which
            leaves more air inside it than either of its two strings needs; without a divider the
            eyebrow floats and the word below it reads as a second, unrelated box. The rule binds
            them into one plate — a caption and its subject — exactly as the source plate's own
            hairline does in `./ProofLedger.tsx`. */}
        <Reveal
          on={showLong}
          delay={delay(LONG_STEP.destination)}
          data-testid="chicken-egg-destination-rule"
          style={{
            position: "absolute",
            left: DEST_PAD,
            top: DEST_PAD + DEST_EYEBROW_HEIGHT + 12,
            width: DEST_W - 2 * DEST_PAD,
            height: 1,
            background: TIER.frame,
          }}
        />

        {/* THE WORD, CENTRED IN WHICHEVER BOX IT IS IN — and `top` is the whole of that. The box
            is {@link DEST_WORD_HEIGHT} tall in both placements, so at the destination it is
            centred on the 304px plate by arithmetic and at the pole on the 72px pole by
            `POLE_WORD_TOP`. It read `top: 0` at the pole until 2026-08-14, which put a 50px line
            box at the top of a 72px pole and left PROOF sitting 11px above the middle its own
            counterpart BUDGET is flex-centred in — the defect the owner review caught.

            THE GLYPH IS ACT 1's ALONE, and it is conditional rather than faded for a layout
            reason: this is a `justify-content: center` row, so a glyph left mounted at opacity 0
            would go on holding its own 26px and would push PROOF off the plate's centre for every
            pose after the first. It leaves the moment the plate does. */}
        <div
          data-testid="chicken-egg-proof-word"
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: POLE_GLYPH_GAP,
            fontFamily: "var(--display)",
            fontSize: "inherit",
            lineHeight: 1,
            letterSpacing: "0.04em",
            color: TIER.pole,
            height: DEST_WORD_HEIGHT,
            top: act1 ? POLE_WORD_TOP : DEST_H / 2 - DEST_WORD_HEIGHT / 2,
          }}
        >
          {act1 ? <PoleGlyph kind="proof" /> : null}
          {C.proofLabel}
        </div>
      </div>

      {/* ═══════════════ ACT 2 · THE TURN, AND THE ROAD IT NAMES ═══════════════ */}

      <Reveal
        on={showTurn}
        as="p"
        delay={delay(TURN_STEP.turn)}
        data-testid="chicken-egg-turn"
        style={{
          position: "absolute",
          left: SIDE_MARGIN,
          top: TURN_TOP,
          width: CONTENT_WIDTH,
          height: BEAT_HEIGHT,
          ...prose(BEAT_TEXT_SIZE, TIER.bright),
        }}
      >
        {highlight(C.turn, C.turnKw)}
      </Reveal>

      <Reveal
        on={showTurn}
        delay={delay(TURN_STEP.token)}
        data-testid="chicken-egg-key-label"
        style={{
          position: "absolute",
          left: TOKEN_LABEL_LEFT,
          top: SHORT_LANE_Y + TOKEN_LABEL_DROP,
          width: TOKEN_LABEL_W,
          height: TOKEN_LABEL_HEIGHT,
          ...mono(TOKEN_LABEL_SIZE, TIER.label, TOKEN_LABEL_TRACKING),
          lineHeight: 1.3,
          textAlign: "center",
          whiteSpace: "nowrap",
        }}
      >
        {C.authorityToken}
      </Reveal>

      <Reveal
        on={showTurn}
        delay={delay(TURN_STEP.eyebrow)}
        data-testid="chicken-egg-pilot-eyebrow"
        style={{
          position: "absolute",
          left: LANE_LEFT,
          top: SHORT_LABEL_TOP,
          width: ROAD_LABEL_W,
          height: ROAD_LABEL_HEIGHT,
          ...mono(11, TIER.label, 0.16),
          lineHeight: 1.3,
          whiteSpace: "nowrap",
        }}
      >
        {C.pilotEyebrow}
      </Reveal>

      {/* THE FOUR LIMITS — one line each, on the grid the bill below them shares.
          CENTRED, LIKE THE BILL: see the cost row below for the one argument that covers both. */}
      {C.pilotConstraints.map((term, index) => (
        <Reveal
          key={term.id}
          on={showTurn}
          delay={delay(TURN_STEP.term + index)}
          className="box-hover"
          data-testid={`chicken-egg-term-${term.id}`}
          style={{
            position: "absolute",
            left: itemLeft(index),
            top: TERM_TOP,
            width: ITEM_W,
            height: TERM_HEIGHT,
            boxSizing: "border-box",
            border: `1px solid ${TIER.node}`,
            padding: `${ITEM_PAD_Y - 4}px ${ITEM_PAD_X}px`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ ...sans(TIER.bright), textAlign: "center" }}>{term.label}</span>
        </Reveal>
      ))}

      {/* ═══════════════ ACT 2 · WHAT WE DID, AND WHAT IT COST ═══════════════ */}

      {/* `BEAT_W` AND NOT `CONTENT_WIDTH`, which is the 2026-08-14 fix to the one beat that
          crosses the plate. This sentence sits at y=318 in the gap between the two lanes, and the
          destination plate's band is 192 to 496 — so a full-width box runs BEHIND it, and an
          invisible 26px stripe of that box was taking every pointer aimed at the top half of the
          word PROOF. The plate lit everywhere else and went dark there. The measure is the
          geometry module's, where the same clearance already served the verdict; the note over it
          records both halves of what a capped beat buys. */}
      <Reveal
        on={showLong}
        as="p"
        delay={delay(LONG_STEP.act)}
        data-testid="chicken-egg-workaround"
        style={{
          position: "absolute",
          left: SIDE_MARGIN,
          top: ACT_TOP,
          width: BEAT_W,
          height: BEAT_HEIGHT,
          ...prose(BEAT_TEXT_SIZE, TIER.act),
        }}
      >
        {highlight(C.workaround, C.workaroundKw)}
      </Reveal>

      <Reveal
        on={showLong}
        delay={delay(LONG_STEP.road)}
        data-testid="chicken-egg-lock-label"
        style={{
          position: "absolute",
          left: TOKEN_LABEL_LEFT,
          top: LONG_LANE_Y + TOKEN_LABEL_DROP,
          width: TOKEN_LABEL_W,
          height: TOKEN_LABEL_HEIGHT,
          ...mono(TOKEN_LABEL_SIZE, TIER.label, TOKEN_LABEL_TRACKING),
          lineHeight: 1.3,
          textAlign: "center",
          whiteSpace: "nowrap",
        }}
      >
        {C.deadlockToken}
      </Reveal>

      <Reveal
        on={showLong}
        delay={delay(LONG_STEP.eyebrow)}
        data-testid="chicken-egg-costs-eyebrow"
        style={{
          position: "absolute",
          left: LANE_LEFT,
          top: LONG_LABEL_TOP,
          width: ROAD_LABEL_W,
          height: ROAD_LABEL_HEIGHT,
          ...mono(11, TIER.label, 0.16),
          lineHeight: 1.3,
          whiteSpace: "nowrap",
        }}
      >
        {C.costsEyebrow}
      </Reveal>

      {/* THE BILL — four boxes on the same grid as the four limits above them, dashed because a
          cost is not a term anybody agreed to.

          THE TYPE IS CENTRED IN THE BOX, BOTH ROWS, AND THAT IS A CHANGE OF 2026-08-14. It was
          flush left, which is right for a paragraph and wrong for these: every one of the eight
          boxes hangs off a MARK ON A ROAD — a toll or a term node — on the column's own centre
          line, and left-aligned type breaks that vertical for the three boxes whose string is
          shorter than the measure. Centred, the tick, the node and the words are one line down the
          stage, which is what binds a cost to the point on the road where it was paid. */}
      {C.costs.map((cost, index) => (
        <Reveal
          key={cost.id}
          on={showLong}
          delay={delay(LONG_STEP.cost + index)}
          className="box-hover"
          data-testid={`chicken-egg-cost-${cost.id}`}
          style={{
            position: "absolute",
            left: itemLeft(index),
            top: COST_TOP,
            width: ITEM_W,
            height: COST_HEIGHT,
            boxSizing: "border-box",
            border: `1px dashed ${TIER.frame}`,
            background: TIER.ground,
            padding: `${ITEM_PAD_Y}px ${ITEM_PAD_X}px`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ ...sans(TIER.cost), textAlign: "center" }}>{cost.label}</span>
        </Reveal>
      ))}

      {/* BEAT 3 — THE LOAD-BEARING ONE, and the LAST arrival of pose 1. Nothing may be added
          after it in this pose: see the header and #57's AC. */}
      <Reveal
        on={showLong}
        as="p"
        delay={delay(VERDICT_STEP)}
        data-testid="chicken-egg-verdict"
        style={{
          position: "absolute",
          left: SIDE_MARGIN,
          top: VERDICT_TOP,
          width: BEAT_W,
          height: BEAT_HEIGHT,
          ...prose(BEAT_TEXT_SIZE, TIER.bright),
        }}
      >
        {highlight(C.verdict, C.verdictKw)}
      </Reveal>

      {/* ═══════════════ THE FLOOR · THE RULE AND THE THESIS ═══════════════
          Full width, because the rule divides the SLIDE: above it what happened, below it the
          one line this deck asks the room to leave with. The testid sits on a positioned WRAPPER
          because `CopperRule` spreads no `data-*` props. */}
      <div
        data-testid="chicken-egg-rule"
        style={{ position: "absolute", left: SIDE_MARGIN, top: RULE_TOP, width: CONTENT_WIDTH }}
      >
        <CopperRule on={showFloor} delay={delay(FLOOR_STEP.rule)} width="100%" />
      </div>

      <Reveal
        on={showFloor}
        as="p"
        delay={delay(FLOOR_STEP.thesis)}
        data-testid="chicken-egg-thesis"
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
