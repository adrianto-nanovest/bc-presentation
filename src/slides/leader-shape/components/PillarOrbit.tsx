// The hub, its six spokes, the six pillars on the ring — and the pointer that opens
// one of them at a time.
//
// ONE COMPONENT AND NOT THREE. The hub, the spokes and the boxes are three layers
// — an HTML disc, two SVG lines each, an HTML button each — and they are three views
// of ONE fact: where the six pillars are. `../geometry.ts` owns that fact and all
// three layers read it here, in one file, because the failure this figure is
// actually at risk of is a spoke pointing at where a box used to be. Splitting the
// SVG layer from the box layer would put the two halves of every spoke in
// different files and hide exactly that.
//
// THE HIGHLIGHT MAKES THAT ARGUMENT TWICE OVER. Lighting a pillar lights a box AND
// reverses the flow on the spoke that joins it, so the two halves of one gesture are
// also in two layers — and both read `litAt(i)` from the top of this component,
// which is `isLit` in `../walk.ts`. That is why the rule is not a ternary repeated
// through this JSX tree: a spoke that surged for a box that was not lit is the one
// bug that would look like a rendering glitch rather than a logic error.
//
// AND "LIT" IS NOT "WHAT THE PANEL SAYS". With a pin down the two part company: the
// column keeps answering for the PINNED pillar (`resolveFocus`, pin-wins) while the
// ring goes on lighting whatever the pointer crosses (`isLit`). Two rules, two names,
// both in `../walk.ts` — see `resolveFocus` there for why the pin took the column.
//
// IT OWNS THE POINTER STATE AND NOTHING ELSE OWNS ANY. Two `useState`s live here —
// which pillar is hovered, which pillar is pinned — because this is the only
// component that has the six boxes AND the panel that answers them. `../walk.ts`
// INTERPRETS those two numbers and holds no state of its own, so every rule about
// what beats what is a pure function a node test can run without a DOM.
//
// IT READS NO VARIANT AND NO BRAND, and since 2026-08-16 there is no brand to read.
// The hub's second line used to arrive as a `brandLine` prop resolved from
// `VARIANT.brand` (MineTech / DigiTech / null). It now prints one string for every
// deck — `hubEnablerName`, the AI Steering Committee — because the old line named a
// DEPARTMENT as the thing that drives six pillars, which is not a department's remit
// in either organisation. `../content.ts` carries the full argument where the resolver
// used to be. This component takes `pose` and nothing else.
//
// CSS vars only, NO HEX AND NO rgba() LITERALS — the #16 prototype fills its hub with
// `rgba(184,110,61,0.14)`, its boxes with `rgba(10,10,10,0.92)`, and its FOCUSED
// box with `rgba(184,110,61,0.22)` under a `rgba(184,110,61,0.13)` halo. Those are
// the copper and the stage written out by hand where `var(--copper-950)`,
// `var(--neutral-900)`, `var(--copper-900)` and `var(--copper-800)` say the same
// thing and move with the token. Rank is a COLOUR TIER and never opacity — opacity
// here means "not revealed yet", which is time, not rank.
//
// NOTHING IS PRE-DIMMED, AND NOTHING IS RANKED BY HISTORY (§7.1). At every moment all
// six pillars carry the SAME border and the SAME label tier except the ONE the
// pointer is on, which carries a BRIGHTER one — see {@link REST} and {@link FOCUS}.
// There is no "already read" tier and no "not yet" tier: the prototype ranks its
// inactive pillars two more ways (`--copper-600` once visited, `--copper-800` before)
// and that ranking is deleted here rather than ported, because it makes five of six
// pillars change appearance on a gesture that is about the sixth.
//
// ZERO SMIL NODES, at either pose, under any motion preference — unchanged, and now
// load-bearing in a place it was not. The whole motion budget used to be CSS
// transitions on a pose change; it is now transitions PLUS the keyframes in
// `./agentic-org.css`, because this figure builds itself inside one pose (nothing to
// transition FROM) and its spokes carry motion at rest (a loop, not a change). Both
// are CSS animations and neither is an `<animate>` element, which is what keeps the
// reduced-motion story honest: the global squash in `src/styles/globals.css` reaches
// a CSS animation and cannot see SMIL at all.
import {
  Fragment,
  useCallback,
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";
// The section-E shim, which is the tree's de facto shared icon resolver: every
// module that needs a lucide glyph outside section F imports THIS one, and this
// slide joins them rather than adding a third. There are already two — section F
// keeps its own longer copy with a different map — and centralising the pair is a
// cleanup this ticket is not. `Boxes` and `Compass` were added to the map here for
// this slide, which is the extension path the shim's own doc comment names.
import { LucideIcon } from "@/slides/foundation-core-section-e/components/LucideIcon";
import { highlight } from "@/components/highlight";
// The deck's one hover affordance, and this slide joins the eight that already use it
// rather than keeping its own mono instruction line. See the idle block.
import { HintIcon } from "@/components/HintIcon";
import {
  FOCUS_HALO_WIDTH,
  FOCUS_SCALE,
  HUB,
  PILLAR_BOX,
  WALK_COLUMN,
  pillarCentre,
  spokeSegment,
} from "../geometry";
import { decisionCounter, shapeOrgContent as C } from "../content";
// NO `POSE` IMPORT, deliberately. Every question this component asks about the pose
// goes through a named predicate (`showsRecap`, `acceptsPointer`), so no branch in
// this tree can form its own opinion about what pose 1 means by comparing it to a
// number — which is the failure the pose names exist to prevent.
import { NO_FOCUS, acceptsPointer, isLit, resolveFocus, showsRecap, togglePin } from "../walk";
import "./agentic-org.css";

// ───────────────────── the two tiers, in two tables ─────────────────────

/**
 * What a pillar looks like when the pointer is not on it — which is five of six
 * pillars while one is open, and all six with nothing open.
 *
 * ONE TIER FOR ALL SIX, and it is a FULL one. The prototype ranks its pillars
 * three ways (`--copper-800` unvisited, `--copper-600` walked, `--copper-200`
 * active) and only the third of those survives here. The other two are deleted, not
 * ported, and the reason is §7.1's rule read literally: a read-vs-unread ranking
 * means opening the fourth pillar also re-colours the three before it, so five boxes
 * change on a gesture that is about the sixth and the room's eye is pulled to the
 * change it is not supposed to be reading. Five of six pillars are literally
 * unchanged when one opens, byte for byte, and {@link FOCUS} is the only thing that
 * differs from this table at all.
 *
 * AND IT LEAVES ROOM ABOVE ITSELF, which is what makes the highlight possible without
 * subtracting anything: `--copper-300`, `--copper-200`, `--copper-100`,
 * `--neutral-0` and a copper fill are all still unspent at this tier. Had the
 * resting pose opened at `--copper-200`, the only way to make one pillar louder would
 * have been to make five quieter — the one thing §7.1 rules out.
 */
const REST = {
  /** Same tier as the box border: the spoke is part of the same resting figure,
   *  and a spoke brighter than the box it joins would read as the emphasis. */
  spokeStroke: "var(--copper-600)",
  /** 1.6, not the prototype's 1.2. At projection distance a 1.2px copper hairline
   *  on near-black is the first thing to disappear, and this is a full-strength
   *  resting figure — the highlight thickens ITS spoke to make a point, and 2.6 over
   *  1.6 is still an unmistakable difference. */
  spokeWidth: 1.6,
  /**
   * THE BEADS DRIFTING IN — the resting half of the flow overlay
   * (`.shape-spoke-flow` in `./agentic-org.css`).
   *
   * ONE TIER ABOVE THE LINE THEY RUN ON, and no further. `--copper-400` on
   * `--copper-600` is enough separation for a 2px bead to be seen travelling and not
   * enough for the beads to become the figure — at `--copper-200` the resting ring
   * would read as six animated arrows pointing at a disc, which is a diagram of
   * traffic rather than of an organisation. It is also the ceiling this tier can
   * afford: {@link FOCUS} still has to be brighter than it without reaching
   * `--neutral-0`.
   */
  flowStroke: "var(--copper-400)",
  /** Fatter than the line under it, so a 2px dash reads as a BEAD rather than as a
   *  gap in the hairline. With `stroke-linecap: round` a 2×2.4 dash draws a lozenge
   *  about 4.4px long, which is the smallest mark that survives a projector. */
  flowWidth: 2.4,
  boxBorder: "1px solid var(--copper-600)",
  /** The stage's own colour, opaque: the box is defined by its border, and a fill
   *  a tier lighter than the stage would make six grey rectangles compete with
   *  the hub. Opaque rather than translucent so a spoke can never show through the
   *  box it terminates at. */
  boxBackground: "var(--neutral-900)",
  /**
   * NO HALO — and it is written out as `"none"` rather than left off the object.
   *
   * The box reads `boxShadow: tier.boxHalo` from whichever of the two tables
   * applies, so every property the focus tier touches has a resting counterpart in
   * the same position here. An absent key would make the two tables different
   * SHAPES, which is how a focus property ends up with no release: React drops the
   * declaration on the un-focus render instead of transitioning back to it, and the
   * halo stays on the box the pointer has left.
   */
  boxHalo: "none",
  iconColor: "var(--copper-300)",
  /** `--neutral-200`, three tiers above gh#50's `--neutral-300` floor. A full
   *  strength label on all six, which is half of "nothing is pre-dimmed" — the
   *  border is the other half. */
  labelColor: "var(--neutral-200)",
} as const;

/**
 * What the ONE pillar under the pointer looks like — §7.1's "the active one *gains*
 * copper fill, a thickened spoke and a halo".
 *
 * EVERY VALUE HERE IS AT OR BRIGHTER THAN ITS {@link REST} COUNTERPART, and that is
 * the invariant to check this table against before anything else: `--copper-200`
 * over `--copper-600` on the spoke and the border, `--copper-100` over
 * `--copper-400` on the flow and over `--copper-300` on the icon, `--neutral-0` over
 * `--neutral-200` on the label, 2.6px over 1.6px of stroke and 3px over 2.4px of
 * bead, a `--copper-900` fill where the resting box is the stage's own
 * `--neutral-900` (#3d2413 against #0a0a0a — the box gains light, it does not merely
 * change hue), and a visible halo where the resting box has none. Not one of the nine
 * is a subtraction, so the five pillars beside the lit one need no adjustment for it
 * to stand out. That is what "attention is bought with added light, never subtracted"
 * means as a diff between two tables.
 *
 * THE HALO IS THE DARKEST THING IN THIS TABLE, deliberately. It is painted OUTSIDE
 * the box's own edge (`0 0 0 4px` — no offset, no blur, a hard 4px ring; see
 * `FOCUS_HALO_WIDTH` in `../geometry.ts`), against the near-black stage rather than
 * against another lit surface, so `--copper-800` reads as a glow around the box
 * while `--copper-200` there would out-shout the border it surrounds and turn the
 * box into a target. Its resting counterpart is `none`, so a dark ring is still
 * added light by the only comparison that matters.
 *
 * A COLOUR TIER AND NOT AN OPACITY, which is where the prototype's version of this
 * table cannot be lifted: it fills with `rgba(184,110,61,0.22)` and haloes with
 * `rgba(184,110,61,0.13)`, i.e. it expresses two tiers of the copper ramp as two
 * alphas of `--copper-500`. On this slide opacity means "not revealed yet" — it is
 * the channel the build uses — so a rank carried in the same channel is a rank that
 * reads as a reveal that has not finished.
 */
const FOCUS = {
  spokeStroke: "var(--copper-200)",
  spokeWidth: 2.6,
  flowStroke: "var(--copper-100)",
  flowWidth: 3,
  boxBorder: "1px solid var(--copper-200)",
  /** The "gains copper fill" of §7.1, as a token: the darkest copper that still
   *  reads as copper rather than as the stage, so the box is filled without
   *  drowning the `--copper-100` icon standing on it. */
  boxBackground: "var(--copper-900)",
  boxHalo: `0 0 0 ${FOCUS_HALO_WIDTH}px var(--copper-800)`,
  iconColor: "var(--copper-100)",
  labelColor: "var(--neutral-0)",
} as const;

/**
 * The mono LABEL register, which is where every string on this slide except the six
 * decisions, the idle lead, the six recap fragments and the closer lives.
 *
 * `textTransform: uppercase` is what lets `../content.ts` store "The Enabler" in
 * title case and still print it as the deck's other labels print: the glyphs
 * shout, `textContent` does not.
 */
function monoLabel(size: number, color: string, ls: number): CSSProperties {
  return {
    fontFamily: "var(--mono)",
    fontSize: size,
    letterSpacing: `${ls}em`,
    textTransform: "uppercase",
    color,
  };
}

// ───────────────────── the build, as a timetable ─────────────────────

/**
 * WHEN EACH PIECE OF THE FIGURE ARRIVES, in milliseconds after mount.
 *
 * ONE TABLE, AND IT IS THE WHOLE CHOREOGRAPHY. The keyframes in
 * `./agentic-org.css` own what each arrival LOOKS like; this owns the order, and
 * the order is the argument: the enabler exists, six spokes grow OUT of it, a box
 * lands at the end of each one, the beads start running, and only then does the
 * panel open beside the finished figure. A room reads that as "this thing is built
 * out from a centre", which is the sentence §6.6 asks the centrepiece to make. The
 * reverse order — six boxes first, then lines joining them — reads as "six things
 * that were already there got connected", which is the org chart this slide is
 * arguing against.
 *
 * THE STAGGER IS THE SWEEP. 60ms between neighbours, in ring order, so the six land
 * clockwise from twelve o'clock rather than all at once — six of one thing, not six
 * things. Six simultaneous arrivals is one event; six staggered ones are a shape
 * being drawn.
 *
 * IT RUNS ON MOUNT AND NOT ON A POSE, which is the change this rewrite is built
 * around. `src/deck/Deck.tsx` renders ONLY the active slide, and the child element's
 * TYPE changes when the deck moves, so React unmounts the old slide and mounts this
 * one — mounting IS arriving. That is what lets the whole figure occupy one pose:
 * the build no longer needs a "before" pose to transition out of. Stepping to the
 * recap and back does NOT re-run it (the component stays mounted, only `pose`
 * changes), which is correct — a figure that rebuilt itself every time the presenter
 * stepped back would be a figure the room has to re-read.
 *
 * AND IT ENDS. 1.42s from mount to the panel's last frame. Every animation in
 * `./agentic-org.css` that carries one of these delays is a one-shot ending on its
 * resting frame, so the finished figure is a static frame that a PDF export, a
 * screenshot and a reduced-motion reader all get in full. The two INFINITE
 * animations (the beads) are decoration on top of it.
 */
const BUILD = {
  /** The disc, immediately. It is what everything else is measured from, so nothing
   *  waits for it to be introduced. */
  hub: 0,
  /** The first spoke leaves the disc as the disc finishes settling (520ms of
   *  `shape-hub-in`, half-elapsed) — overlapping rather than queued, so the build
   *  reads as one gesture and not as five. */
  spokeLead: 260,
  /** A box lands 360ms behind its own spoke's start, which is 140ms before that
   *  spoke finishes drawing: the line arrives INTO a box that is already there
   *  rather than at an empty point, so no spoke is ever left pointing at nothing. */
  boxLead: 620,
  /** The beads start once every line exists. Earlier and the first spoke would carry
   *  traffic while the last one was still being drawn. */
  flowLead: 800,
  /** The panel last, into a finished figure. It is a REPLY to the ring — see
   *  {@link WALK_COLUMN} — and a reply that arrives first is a caption. */
  panel: 900,
  /** 60ms between neighbours, in ring order. */
  stagger: 60,
} as const;

/** Pillar `i`'s place in the sweep. One function, three consumers (spoke, box,
 *  beads), so the three layers of one pillar can never drift out of step. */
function stagger(lead: number, i: number): string {
  return `${lead + i * BUILD.stagger}ms`;
}

/**
 * The one duration every focus property transitions over — the prototype's, kept.
 *
 * ONE CONSTANT FOR ALL EIGHT PROPERTIES (border, fill, halo, icon colour, label
 * colour, spoke stroke and width, bead stroke and width) because opening a pillar is
 * ONE event and the two layers that draw it are HTML and SVG. Two durations would let
 * the spoke finish thickening before the box it joins finishes filling, which is one
 * gesture arriving twice.
 *
 * AND IT IS SHORTER THAN A DELIBERATE HOVER. 350ms is long enough to read as a
 * change and short enough that sweeping the pointer across three pillars does not
 * leave a trail of half-lit boxes behind it.
 */
const FOCUS_TRANSITION = "0.35s var(--ease)";

/** The panel's own cross-fade — the same duration, so the box lighting up and the
 *  panel answering are one event rather than two. */
const PANEL_TRANSITION = `opacity ${FOCUS_TRANSITION}`;

// ───────────────────── the figure ─────────────────────

export interface PillarOrbitProps {
  /** 0 or 1. See the slide file for what each pose argues, and `../walk.ts` for the
   *  two of them. */
  pose: number;
}

export function PillarOrbit({ pose }: PillarOrbitProps) {
  // THREE CHANNELS, AND THEY ARE SEPARATE ON PURPOSE. A single `active` number could
  // not tell "the pointer left, fall back to the pin" from "the pin was released", so
  // a hover that ended would either clear the pin or be unable to; and merging the
  // caret into the pointer would let the blur below close a pillar the mouse is still
  // sitting on. Three numbers with three lifetimes, ONE rule (`resolveFocus`), and the
  // rule lives in `../walk.ts` where a node test can run it without a DOM.
  const [hovered, setHovered] = useState(NO_FOCUS);
  const [focused, setFocused] = useState(NO_FOCUS);
  const [pinned, setPinned] = useState(NO_FOCUS);
  // AND NO `touched` LATCH ANY MORE. A fourth `useState` used to track whether anyone
  // had touched the figure, for one consumer: the standing mono hint line, which was
  // dropped from the tree for good on the first hover. That line is now the deck's
  // `HintIcon` (see the idle block below), and a 14px glyph beside an eyebrow does not
  // need a latch — it lives and dies with the idle block it sits in.

  // THE POSE, ASKED WHERE IT IS ANSWERED. Every question about the pose goes to
  // `../walk.ts` and none is re-derived from a comparison, so no branch in this tree
  // can form its own opinion about what pose 1 means.
  const recap = showsRecap(pose);
  const pointerLive = acceptsPointer(pose);

  // WHICH PILLAR THE PANEL IS SPEAKING FOR, ONCE. Everything in the column below
  // reads this and nothing re-derives it. At the recap the pointer is not consulted
  // at all — `NO_FOCUS` — because the recap lights all six and gives the panel to the
  // summary; see `acceptsPointer`.
  //
  // IT IS NO LONGER THE SAME QUESTION AS "WHICH BOX IS LIT", which is the one thing
  // to hold onto when reading the rest of this file. With a pin down there are two
  // answers — the panel stays on the PINNED pillar while the ring goes on answering
  // the pointer — so the figure reads `lit` (below, per pillar) and the column reads
  // `focus`. `resolveFocus` and `isLit` in `../walk.ts` own the two rules.
  const focus = pointerLive ? resolveFocus(pinned, hovered, focused) : NO_FOCUS;
  // WHETHER PILLAR `i` IS LIT — one closure, three consumers (the spokes, the beads,
  // the boxes), for the same reason `resolveFocus` is called once: a spoke that
  // surged for a box that was not lit is the one bug here that looks like a rendering
  // glitch rather than a logic error. `recap` short-circuits it because that pose
  // lights all six regardless of where the pointer was left.
  const litAt = (i: number) => recap || (pointerLive && isLit(i, pinned, hovered, focused));

  const enter = useCallback((i: number) => setHovered(i), []);
  const leave = useCallback(() => setHovered(NO_FOCUS), []);
  const focusOn = useCallback((i: number) => setFocused(i), []);
  const focusOff = useCallback(() => setFocused(NO_FOCUS), []);
  const pin = useCallback((e: MouseEvent<HTMLButtonElement>, i: number) => {
    setPinned((p) => togglePin(p, i));
    // THE ONE LINE THAT KEEPS A MOUSE CLICK FROM PAINTING A KEYBOARD RING.
    // `:focus-visible` does not match immediately after a pointer click — but the
    // browser re-evaluates it on the next keypress, and the NEXT KEYPRESS ON THIS
    // DECK IS ALWAYS Space or an arrow, because that is how a presenter advances.
    // So a pillar clicked and then stepped past would wear a copper focus ring for
    // the rest of the slide, on a box that is no longer open. Blurring on a
    // pointer-originated click is the standard remedy and it costs a keyboard user
    // nothing: `detail` is 0 for the synthetic click a <button> fires on Enter or
    // Space, and non-zero only for a real press.
    if (e.detail > 0) e.currentTarget.blur();
  }, []);

  return (
    <>
      {/* THE SPOKES. TWO lines per pillar and not one: a drawn hairline that is the
          figure, and a dashed overlay that is the motion. They are separate elements
          because they are separate facts — the structure has to survive
          `prefers-reduced-motion: reduce` (where `./agentic-org.css` removes the
          overlay outright) and a single line cannot be both solid and travelling.
          It is also the trap `CapabilityLadder.tsx` records from the other side: a
          draw class and a `strokeDasharray` attribute on one element fight, and the
          class wins.

          `stroke` AND `strokeWidth` GO THROUGH `style`, NOT through the SVG
          presentation attributes: `var()` is only resolved in CSS properties, so
          `stroke="var(--copper-600)"` as an attribute renders a black line on a
          black stage. The one hard-won line of the prototype, kept verbatim — and
          it is now load-bearing four times over, because the focus tier is a
          `var()` too and so is every bead.

          No `preserveAspectRatio` override: `.svg-layer` is `inset: 0` on a stage
          that is exactly 1280×720, so the viewBox is already 1:1 with the
          absolute coordinates the boxes are placed at. `.svg-layer` is also
          `pointer-events: none`, which is what keeps a 3px bead from stealing a
          hover from the box behind it. */}
      <svg className="svg-layer" style={{ zIndex: 1 }} viewBox="0 0 1280 720">
        {C.pillars.map((pillar, i) => {
          const spoke = spokeSegment(i);
          const lit = litAt(i);
          const tier = lit ? FOCUS : REST;
          return (
            <g key={pillar.id}>
              <line
                data-testid={`shape-spoke-${pillar.id}`}
                className="shape-spoke-draw"
                x1={spoke.x1}
                y1={spoke.y1}
                x2={spoke.x2}
                y2={spoke.y2}
                // PAIRED WITH `stroke-dasharray: 1` IN THE CLASS. Normalising the
                // path to 1 is what makes six spokes of six different lengths draw
                // in the same 520ms — the ring is an ellipse, so the vertical spokes
                // are ~40% shorter than the diagonal ones, and a user-unit dasharray
                // would have them arrive at six different times.
                pathLength={1}
                strokeLinecap="round"
                style={{
                  stroke: tier.spokeStroke,
                  strokeWidth: tier.spokeWidth,
                  animationDelay: stagger(BUILD.spokeLead, i),
                  // `stroke-width` AND NOT `strokeWidth` inside the transition
                  // string: this is CSS, not the React prop namespace, and the
                  // camelCase spelling is silently ignored — which would leave the
                  // spoke snapping to 2.6px while its box fades to copper over
                  // 350ms.
                  transition: `stroke ${FOCUS_TRANSITION}, stroke-width ${FOCUS_TRANSITION}`,
                }}
              />
              {/* THE WRAPPER IS THE ENTRY FADE and the line is the loop — see
                  `.shape-fade-in` in `./agentic-org.css`. Putting both on the line
                  would restart the fade every time `.is-active` was added or
                  removed, and the fade carries a delay of up to 1.1s. */}
              <g className="shape-fade-in" style={{ animationDelay: stagger(BUILD.flowLead, i) }}>
                <line
                  data-testid={`shape-flow-${pillar.id}`}
                  // NO `pathLength` HERE, and that is the opposite choice from the
                  // line above it for the opposite reason: the bead spacing is `2 10`
                  // in USER UNITS, so every spoke carries the same-sized beads at the
                  // same pitch however long it is. Normalised, the short spokes would
                  // get tight beads and the long ones sparse ones, and the six would
                  // stop reading as one system.
                  className={`shape-spoke-flow${lit ? " is-active" : ""}`}
                  x1={spoke.x1}
                  y1={spoke.y1}
                  x2={spoke.x2}
                  y2={spoke.y2}
                  strokeLinecap="round"
                  style={{
                    stroke: tier.flowStroke,
                    strokeWidth: tier.flowWidth,
                    transition: `stroke ${FOCUS_TRANSITION}, stroke-width ${FOCUS_TRANSITION}`,
                  }}
                />
              </g>
            </g>
          );
        })}
      </svg>

      {/* THE HUB — the first thing on the stage and the thing everything else grows
          out of. No focus tier: the hub is what the six pillars are pillars OF, so a
          highlight that also lit the centre would be a figure with seven subjects. */}
      <div
        data-testid="shape-hub"
        className="shape-hub-in"
        style={{
          position: "absolute",
          left: HUB.x,
          top: HUB.y,
          width: HUB.r * 2,
          height: HUB.r * 2,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          border: "1px solid var(--copper-300)",
          // The darkest copper in the ramp, so the disc reads as filled — and as
          // copper — without competing with its own border.
          background: "var(--copper-950)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
          boxSizing: "border-box",
          zIndex: 3,
        }}
      >
        <span
          data-testid="shape-hub-label"
          style={monoLabel(11, "var(--copper-100)", 0.2)}
        >
          {C.hubLabel}
        </span>
        {/* WHO THE ENABLER IS — one string, every deck, unconditionally rendered.
            It used to be a nullable brand line (`MineTech` / `DigiTech` / nothing),
            and `../content.ts` records why that is gone at the point where the
            resolver stood. There is no absent case left to handle: the committee is
            the same claim in front of every audience.

            THE DISC IS 132px WIDE AND THE NAME IS 21 CHARACTERS, so it is set at
            16px over two lines rather than at the brand line's 19px on one —
            `maxWidth` forces the wrap at the word rather than leaving it to the
            glyph metrics, and `textAlign: center` keeps both lines on the disc's own
            axis. The display serif and the `--neutral-50` tier are unchanged: it is
            still the brightest type inside the figure, which is correct — the disc is
            the only thing on the stage that is not one of six. */}
        <span
          data-testid="shape-hub-enabler"
          style={{
            fontFamily: "var(--display)",
            fontSize: 16,
            lineHeight: 1.15,
            maxWidth: HUB.r * 2 - 26,
            textAlign: "center",
            color: "var(--neutral-50)",
          }}
        >
          {C.hubEnablerName}
        </span>
      </div>

      {/* ───────────────── THE PILLARS ─────────────────

          THREE ELEMENTS PER PILLAR, ONE TRANSFORM EACH, and this is the one place
          the nine-pose version has to be contradicted rather than extended. It put
          all three on a single `div` — `translate(-50%, -50%)` for the centring,
          `scale(0.86 → 1)` for the arrival, `scale(FOCUS_SCALE)` for the highlight —
          and argued that a wrapper per effect would give the arrival and the
          highlight separate timelines "so a click during the sweep would scale one
          box from two directions at once".

          THAT ARGUMENT WAS CORRECT WHEN THE HIGHLIGHT COST A CLICK AND IS WRONG NOW.
          The highlight is a HOVER: the pointer can be over a box while the box is
          still arriving, and it routinely is, because the build runs on mount and a
          presenter's pointer is already on the stage. On one element the arrival
          keyframe and the focus transition then own the same `transform` property,
          the keyframe wins for as long as it runs, and the box snaps to its focused
          size the frame the animation ends. On three elements they COMPOSE — the
          browser multiplies the matrices — and a box hovered mid-build grows
          smoothly out of an arrival that is still finishing.

          So: the outer div PLACES (and carries the z-index, because the halo has to
          be painted over its neighbours), the middle div ARRIVES, the button
          HIGHLIGHTS. Each one owns exactly one transform and no two ever write the
          same property. */}
      {C.pillars.map((pillar, i) => {
        const { x, y } = pillarCentre(i);
        const lit = litAt(i);
        const isPinned = pinned === i;
        const tier = lit ? FOCUS : REST;
        return (
          <div
            key={pillar.id}
            style={{
              position: "absolute",
              left: x,
              top: y,
              transform: "translate(-50%, -50%)",
              // 4 WHEN LIT, so the halo is painted over its neighbours instead of
              // under them. At a flat z-index the ring's own paint order decides,
              // and pillars 1/2 and 4/5 are close enough that the later box clips
              // the earlier one's 4px ring — a halo with a bite out of one side.
              zIndex: lit ? 4 : 2,
            }}
          >
            <div
              className="shape-pillar-in"
              style={{ animationDelay: stagger(BUILD.boxLead, i) }}
            >
              <button
                type="button"
                className="shape-pillar-box"
                data-testid={`shape-pillar-${pillar.id}`}
                // WHICH PILLAR IS OPEN, AND WHICH IS PINNED, IN THE DOM. The unit
                // tests and the browser harness both key off these rather than off a
                // parsed style string — "which box is lit" is a fact about the
                // figure, and reading it back out of a border colour would make every
                // check a check of the tier table's spelling instead.
                data-active={lit ? "true" : "false"}
                data-pinned={isPinned ? "true" : "false"}
                // THE BUTTON IS THE ACCESSIBLE NAME AND THE PIN IS ITS STATE. A
                // screen reader hears "Governance & Policies, toggle button, not
                // pressed" — which is the whole interaction, without seeing the ring.
                aria-pressed={isPinned}
                // AT THE RECAP THE BOXES LEAVE THE TAB ORDER. Six controls that
                // cannot change anything are six stops that answer nothing; the pose
                // lights all six and the panel already holds every word they would
                // have opened.
                tabIndex={pointerLive ? 0 : -1}
                onMouseEnter={pointerLive ? () => enter(i) : undefined}
                onMouseLeave={pointerLive ? leave : undefined}
                // THE CARET OPENS A PILLAR EXACTLY AS THE POINTER DOES — the box
                // lights, the spoke surges, the panel answers. Without this, `Tab`
                // would move a focus ring around six boxes that never opened. It is
                // its OWN channel and not a second writer of `hovered`; see
                // `resolveFocus` in `../walk.ts` for the blur that forces the split.
                onFocus={pointerLive ? () => focusOn(i) : undefined}
                onBlur={pointerLive ? focusOff : undefined}
                onClick={pointerLive ? (e) => pin(e, i) : undefined}
                // THE ONE LINE THAT KEEPS SPACE FROM DOING TWO THINGS.
                // `useKeyboardNav` listens on `window` and advances the deck on Space
                // and Enter; a `<button>` fires its own click on both. Without this,
                // pinning a pillar from the keyboard would also step the slide. React
                // dispatches at the root container, so stopping propagation here is
                // what keeps the event from reaching the window listener above it —
                // and `preventDefault` is deliberately NOT called, because that is
                // what would suppress the button's own click.
                onKeyDown={(e) => {
                  if (e.key === " " || e.key === "Enter") e.stopPropagation();
                }}
                style={{
                  // `relative` FOR THE PIN DOT AND FOR NOTHING ELSE. The box is
                  // PLACED by the div two levels up; this only gives the corner mark
                  // a containing block, so a `position: absolute` dot cannot escape
                  // to the stage.
                  position: "relative",
                  width: PILLAR_BOX.w,
                  height: PILLAR_BOX.h,
                  transform: `scale(${lit ? FOCUS_SCALE : 1})`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 7,
                  padding: "8px 10px",
                  boxSizing: "border-box",
                  border: tier.boxBorder,
                  background: tier.boxBackground,
                  boxShadow: tier.boxHalo,
                  // NO DELAY ON ANY OF THESE, ever. A delay here would land on the
                  // RELEASE too: sweeping from one pillar to the next would un-light
                  // the first late and light the second late, and the two would
                  // overlap so that two pillars are lit at once — the one state
                  // §7.1's no-dim rule exists to make unambiguous.
                  transition:
                    `transform ${FOCUS_TRANSITION}, ` +
                    `border-color ${FOCUS_TRANSITION}, ` +
                    `background ${FOCUS_TRANSITION}, ` +
                    `box-shadow ${FOCUS_TRANSITION}`,
                }}
              >
                <span
                  data-testid={`shape-pillar-${pillar.id}-icon`}
                  style={{
                    color: tier.iconColor,
                    display: "flex",
                    transition: `color ${FOCUS_TRANSITION}`,
                  }}
                >
                  {/* `currentColor` by omission — the shim's `color` prop is left
                      unset so the icon inherits the tier set on the span above, and
                      one edit moves the icon and nothing else. It is also what lets
                      the icon's tier TRANSITION at all: a `color` prop would paint
                      the SVG's own `stroke` attribute, which no transition on this
                      span can reach. */}
                  <LucideIcon name={pillar.icon} size={22} strokeWidth={1.5} />
                </span>
                <span
                  data-testid={`shape-pillar-${pillar.id}-label`}
                  style={{
                    ...monoLabel(11, tier.labelColor, 0.13),
                    textAlign: "center",
                    lineHeight: 1.2,
                    transition: `color ${FOCUS_TRANSITION}`,
                  }}
                >
                  {pillar.label}
                </span>
                {/* THE PIN, AS A MARK ON THE BOX ITSELF. Two pillars can be lit at
                    once — the pinned one and whichever the pointer is on — so the
                    two states have to be separable without moving the pointer;
                    otherwise a presenter cannot tell, from the ring alone, which of
                    the two boxes the column on the right is speaking for.

                    A PIN GLYPH AND NOT A DOT (owner call, 2026-08-14), and not a
                    word. The box holds a 22px icon over an 11px label in 72px of
                    height and has no room for a third line of type, so the mark goes
                    in the corner either way — but a 5px disc there names nothing,
                    and this deck already answers the question elsewhere: E.1's era
                    boxes (`../../landscape-section-b/b1-evolution-journey.tsx`) mark
                    their pinned box with `Pin` at 11px in the same corner. Same
                    gesture, same glyph, same size — the room learns the mark once.
                    The panel still spells it out in words
                    (`shape-decision-*-pin`), which is where there is room to.

                    `currentColor` BY OMISSION, exactly as the pillar icon above does
                    it: `--copper-100` is the focus tier's icon colour, and a pinned
                    box is lit by definition, so the mark sits at the same tier as
                    the glyph it shares the box with.

                    `pointerEvents: none` so the mark can never eat the click that
                    would release it. */}
                {isPinned && (
                  <span
                    data-testid={`shape-pillar-${pillar.id}-pin`}
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      top: 6,
                      right: 7,
                      display: "flex",
                      color: "var(--copper-100)",
                      pointerEvents: "none",
                    }}
                  >
                    <LucideIcon name="Pin" size={11} strokeWidth={1.5} />
                  </span>
                )}
              </button>
            </div>
          </div>
        );
      })}

      {/* ───────────────── THE PANEL ─────────────────

          ONE ELEMENT HOLDING EIGHT THINGS IN TURN — an idle block, six decisions and
          the recap. The prototype drew its beats in one bordered panel and its closer
          in a SECOND bordered block at the same left edge, each with its own
          `opacity: … ? 1 : 0`, so at the closer the column's left hairline faded out
          and back in in the same place. Two elements pretending to be one column, and
          the blink is what gives it away on a projector. The hairline belongs to the
          COLUMN, so it is declared once, here, and outlives everything inside it.

          IT IS NEVER EMPTY, which is the difference from the nine-pose version and
          the reason the idle block exists. That version opened the column at the
          first beat and showed nothing beside the ring before it; a figure reached by
          hovering has no first beat, so a column that waited for one would be a blank
          third of the stage for as long as nobody touched anything.

          `bottom` IS A CSS OFFSET AND `WALK_COLUMN.bottom` IS A STAGE Y, hence the
          subtraction — the same conversion `CapabilityLadder.tsx` does for its chip
          shelf. `WALK_COLUMN.top` (190) and `WALK_COLUMN.bottom` (610) come off the
          ring in `../geometry.ts`, and they are symmetric about `HUB.y`: 400 − 210
          and 400 + 210. So this box's own vertical centre IS y = 400 = `HUB.y`, and
          every block inside it centred on that line reads at the hub's own eye
          level. That is why the eight blocks below share one `top: 50%` instead of
          stacking from the top of the column: the panel is a reply to the hub, and a
          reply set 190px above it makes the room's eye travel up and back down on
          every hover. */}
      <div
        data-testid="shape-walk-column"
        className="shape-panel-in"
        style={{
          position: "absolute",
          left: WALK_COLUMN.left,
          right: WALK_COLUMN.right,
          top: WALK_COLUMN.top,
          bottom: 720 - WALK_COLUMN.bottom,
          borderLeft: "1px solid var(--copper-800)",
          // THE GUTTER, DECLARED ON THE COLUMN AND RESTATED BY ITS CHILDREN. An
          // absolutely positioned child's containing block is its ancestor's
          // PADDING box, so this padding does not indent the eight blocks below —
          // each sets `left: WALK_COLUMN.rulePad` itself. It is kept anyway, and
          // from the same constant, because it is the column's content box: a later
          // block that is NOT absolutely positioned must land in the same measure as
          // these eight, and one number read twice cannot drift the way 28 written
          // twice can.
          paddingLeft: WALK_COLUMN.rulePad,
          animationDelay: `${BUILD.panel}ms`,
          zIndex: 5,
        }}
      >
        {/* THE IDLE BLOCK — what the panel says with nothing open, which on this
            slide is the state a room arrives in and may never leave.

            IT IS NOT A PLACEHOLDER. `idleEyebrow` names the figure and `idleLead`
            states the mechanism under the headline, so a presenter who talks straight
            through this slide without touching it still delivers the argument; the
            six decisions are the DEPTH, not the content. That is the test an idle
            state on an interactive slide has to pass. */}
        <PanelBlock testid="shape-idle" open={!recap && focus === NO_FOCUS}>
          {/* THE EYEBROW AND THE HINT ON ONE BASELINE. The eyebrow names the figure;
              the glyph beside it explains the pointer, and it is the deck's own
              `HintIcon` rather than a line of type this slide invented — E.3, E.4,
              E.5, E.9, D.2, F.8, I.3 and K.2 all put the same pulsing glyph beside
              the block it explains. A room that has met it once needs no instruction
              here.

              `alignItems: center` AND NOT `baseline` (owner call, 2026-08-16). The
              glyph is a circle and the eyebrow is a 10px mono line: sitting them on a
              shared baseline puts the circle's centre below the letters' centre, which
              reads as a dropped icon rather than as a mark beside a label. Centres to
              centres is what the eye checks on a round glyph.

              THE 1px LIFT FINISHES IT. `HintIcon`'s own padding is asymmetric — 7
              top, 5 bottom, for the baseline alignment the rest of the deck uses — so
              its content box centre sits 1px above the glyph's. `top: -1px` on a
              relatively positioned wrapper takes that back WITHOUT touching the shared
              component or moving anything else in the row.

              `position="right"`, WHICH IS ALSO THE DEFAULT. Measured on the stage
              rather than estimated: the column's text starts at x = 792, the eyebrow
              runs ~210px, the glyph stands at ~1010, and the tooltip is ~180px wide —
              so it ends near 1200 against a right margin at 1232. It opens away from
              the panel it explains, which is the direction the deck's other eight
              hints open. */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 16,
            }}
          >
            <div
              data-testid="shape-idle-eyebrow"
              style={monoLabel(10, "var(--copper-400)", 0.24)}
            >
              {C.idleEyebrow}
            </div>
            <span style={{ position: "relative", top: -1, display: "inline-flex" }}>
              <HintIcon text={C.hintTooltip} position="right" />
            </span>
          </div>
          <p
            data-testid="shape-idle-lead"
            style={{
              fontFamily: "var(--serif)",
              fontSize: 22,
              lineHeight: 1.45,
              color: "var(--neutral-100)",
              margin: 0,
            }}
          >
            {highlight(C.idleLead, C.idleLeadKw)}
          </p>
          {/* AND NOTHING UNDER THE LEAD. A mono hint line used to stand 34px below it
              — "HOVER A PILLAR TO OPEN IT · CLICK TO PIN" — dropped from the tree the
              first time a pillar was touched, with a pulse of its own in
              `./agentic-org.css`. Both are gone: the instruction is in the tooltip on
              the eyebrow above, which is where the rest of the deck keeps it. */}
        </PanelBlock>

        {/* SIX BLOCKS MOUNTED, NOT ONE PANEL WHOSE TEXT SWAPS — and this is a
            correctness decision, not a performance one.

            A single panel driven by `focus` has to render SOMETHING when nothing is
            open, and every available answer is wrong in front of a room. Render
            nothing and the panel blanks mid-fade, so the last decision's words vanish
            a frame before the block that holds them does. Fall back to `pillars[0]` —
            which is what `pillars.at(focus)` and the prototype's own
            `Math.max(focus, 0)` both do — and the FIRST decision flashes up under the
            idle copy as the panel fades out, plus a "01 / 06" counter for a pillar
            nobody opened.

            Six blocks cross-fade with no fallback and no clamp: at most one of them
            is at opacity 1 at any moment, `decisionCounter(i)` is always asked about a
            pillar that exists, and closing one asks the same question of a smaller
            number.

            THEY ALL OCCUPY THE SAME RECTANGLE, which is what makes the cross-fade a
            cross-fade rather than a re-layout: the outgoing and incoming decisions are
            the same block of the column, so the eyebrow does not move by the
            difference between two label lengths.

            THE EYEBROW AND THE LABEL CARRY NO HIGHLIGHT. `decisionCounter(i)` is the
            mono LABEL register and the pillar's name is the display one — a copper
            italic in either reads as a rendering fault, and inside the counter it
            would be an emphasis on arithmetic. Only the decision goes through
            `highlight`; see the keyword rule at the top of `../content.ts`. */}
        {C.pillars.map((pillar, i) => (
          <PanelBlock
            key={pillar.id}
            testid={`shape-decision-${pillar.id}`}
            open={!recap && focus === i}
          >
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 10,
                marginBottom: 13,
              }}
            >
              <span
                data-testid={`shape-decision-${pillar.id}-eyebrow`}
                style={monoLabel(10, "var(--copper-400)", 0.24)}
              >
                {decisionCounter(i)}
              </span>
              {/* THE PIN, SPELLED OUT. The dot on the box says THAT something is
                  pinned; this says WHICH state the panel is in, in a place that has
                  room for a word. It is a tier above the counter beside it because it
                  is the only part of this line that is not always true. */}
              {pinned === i && (
                <span
                  data-testid={`shape-decision-${pillar.id}-pin`}
                  style={monoLabel(9, "var(--copper-200)", 0.24)}
                >
                  {"· pinned"}
                </span>
              )}
            </div>
            {/* The pillar's own name, in the display serif — the same words the box
                on the ring is labelled with, so the room can see WHICH pillar the
                panel is speaking for without following the spoke. Repetition is
                the point; the ring's copy is 11px mono and this is 29px serif. */}
            <div
              data-testid={`shape-decision-${pillar.id}-label`}
              style={{
                fontFamily: "var(--display)",
                fontSize: 29,
                lineHeight: 1.1,
                color: "var(--neutral-50)",
                marginBottom: 15,
              }}
            >
              {pillar.label}
            </div>
            <p
              data-testid={`shape-decision-${pillar.id}-text`}
              style={{
                fontFamily: "var(--serif)",
                fontSize: 20,
                lineHeight: 1.45,
                color: "var(--neutral-100)",
                margin: 0,
              }}
            >
              {highlight(pillar.decision, pillar.decisionKw)}
            </p>
            {/* THE HAIRLINE IS THE JOIN BETWEEN AN ARGUMENT AND ITS SCOPE. Above it,
                the one thing this pillar asks of the leader; below it, HR p4's own
                account of what that covers. Without the rule the four nouns read as a
                continuation of the sentence; with it they read as its footing. */}
            <div
              style={{
                height: 1,
                background: "var(--copper-800)",
                margin: "22px 0 16px",
              }}
            />
            <ul
              data-testid={`shape-decision-${pillar.id}-points`}
              style={{ listStyle: "none", margin: 0, padding: 0 }}
            >
              {pillar.points.map((point) => (
                <li
                  key={point}
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 11,
                    marginBottom: 9,
                  }}
                >
                  {/* A 3px SQUARE AND NOT A BULLET GLYPH. `•` is drawn by whichever
                      font is resolving, at whichever weight, and the deck's serif and
                      mono disagree about its size; a div is the same mark on every
                      machine and takes the copper tier directly. */}
                  <span
                    aria-hidden="true"
                    style={{
                      flex: "none",
                      width: 3,
                      height: 3,
                      marginTop: 1,
                      background: "var(--copper-400)",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--serif)",
                      fontSize: 16,
                      lineHeight: 1.35,
                      color: "var(--neutral-200)",
                    }}
                  >
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </PanelBlock>
        ))}

        {/* THE RECAP — the eighth thing in the same slot, on the same centre line,
            and the only one of the eight that speaks about all six at once.

            IT IS A RECAP AND NOT A THESIS, which is the change from the nine-pose
            version. That one gave its last pose to the closer ALONE — a claim
            standing in an empty column with its evidence already off the stage, so a
            room that had lost the thread had nothing to catch. This prints the six
            decisions the room has just been able to open, compressed to their objects
            under one shared stem, and THEN the claim they are evidence for. The
            figure behind it lights all six pillars at the same moment, so the panel
            and the ring say the same thing in two registers.

            THE STEM IS SAID ONCE. Every decision opens "You decide"; six full
            sentences here would be a paragraph, and a room reads a paragraph by
            skimming it. `recapEyebrow` carries the stem and the six fragments
            complete it — see `Pillar.recap` in `../content.ts`. */}
        <PanelBlock testid="shape-recap" open={recap}>
          <div
            data-testid="shape-recap-eyebrow"
            style={{ ...monoLabel(10, "var(--copper-400)", 0.24), marginBottom: 18 }}
          >
            {C.recapEyebrow}
          </div>
          {/* A GRID AND NOT SIX FLEX ROWS: the six pillar names have to start on one
              vertical line and the six fragments on another, because a reader scans a
              recap down the second column and a ragged left edge there costs more
              than the width the longest label spends. 150px holds "PROCESS &
              METHODOLOGY" — the longest of the six — at 9.5px mono; the fragments
              take the remaining 277, which is what the longest of THEM ("whether the
              culture rewards or waits", ~262px at 15.5px serif) needs to stay on one
              line. Both columns are cut to their own longest string, and the six rows
              are the same height because none of them wraps. */}
          <div
            data-testid="shape-recap-rows"
            style={{
              display: "grid",
              gridTemplateColumns: "150px 1fr",
              columnGap: 12,
              rowGap: 12,
              alignItems: "baseline",
            }}
          >
            {/* `Fragment` SPELLED OUT AND NOT `<>`: the shorthand takes no `key`, and
                each row is two grid CELLS that cannot be wrapped in a div without
                breaking the grid that aligns them. */}
            {C.pillars.map((pillar) => (
              <Fragment key={pillar.id}>
                <span
                  data-testid={`shape-recap-${pillar.id}-label`}
                  style={monoLabel(9.5, "var(--copper-300)", 0.1)}
                >
                  {pillar.label}
                </span>
                <span
                  data-testid={`shape-recap-${pillar.id}-text`}
                  style={{
                    fontFamily: "var(--serif)",
                    fontSize: 15.5,
                    lineHeight: 1.3,
                    color: "var(--neutral-100)",
                  }}
                >
                  {pillar.recap}
                </span>
              </Fragment>
            ))}
          </div>
          <div
            style={{ height: 1, background: "var(--copper-800)", margin: "22px 0 18px" }}
          />
          {/* SERIF ITALIC AGAINST THE ROWS' UPRIGHT: it is a claim ABOUT the six
              above it rather than a seventh row, and the italic is what says so
              without a label. */}
          <p
            data-testid="shape-closer"
            style={{
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontSize: 21,
              lineHeight: 1.4,
              color: "var(--neutral-100)",
              margin: 0,
            }}
          >
            {highlight(C.closer, C.closerKw)}
          </p>
        </PanelBlock>
      </div>

      {/* AND NO Specify → Generate → Verify PANEL, here or anywhere on this slide:
          §6.6 drops it, C.4 does it better, and the space it used is what the six
          decisions and their point lists are spent on. It is refused, not pending — a
          test asserts those three words appear nowhere on this stage at any pose,
          under any brand and with any pillar open, so even a paraphrase that borrows
          one of them fails.

          NOTHING GOES IN THE BOTTOM STRIP, either. See `FOCUS_GROWTH_SPENT` in
          `../geometry.ts`: the strip is occupied by the lowest pillar, which grows
          when it is lit.

          AND NOTHING GOES IN THE BAND UNDER THE HEADLINE. A standing mono kicker used
          to print at y = 134; it is cut (owner call, 2026-08-13) and the band is left
          empty on purpose — see `../content.ts` where the field used to be. */}
    </>
  );
}

// ───────────────────── the panel's one shape ─────────────────────

/**
 * One of the eight things the panel holds, in the one rectangle they all share.
 *
 * A COMPONENT AND NOT EIGHT COPIES OF SIX PROPERTIES. `position`, `left`, `right`,
 * `top`, `transform` and `transition` are what make the cross-fade a cross-fade
 * rather than a re-layout, and they have to be identical in all eight places or the
 * eyebrow moves by the difference between two blocks. Written eight times they would
 * be eight chances to type 49% instead of 50%; written once they cannot disagree.
 *
 * `opacity` AND NOT MOUNTING: all eight are in the tree at all times. That is what
 * lets an outgoing block finish fading while its replacement fades in — React
 * unmounting the old one would cut it off mid-transition — and it is why
 * `pointerEvents` is switched off for the seven that are closed, so a hidden block
 * can never take a click from the panel underneath it.
 */
function PanelBlock({
  testid,
  open,
  children,
}: {
  testid: string;
  open: boolean;
  children: ReactNode;
}) {
  return (
    <div
      data-testid={testid}
      data-open={open ? "true" : "false"}
      style={{
        position: "absolute",
        left: WALK_COLUMN.rulePad,
        right: 0,
        top: "50%",
        transform: "translateY(-50%)",
        opacity: open ? 1 : 0,
        pointerEvents: open ? "auto" : "none",
        transition: PANEL_TRANSITION,
      }}
    >
      {children}
    </div>
  );
}
