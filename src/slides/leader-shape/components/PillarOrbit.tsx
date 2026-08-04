// The hub, its six spokes, the six pillars on the ring — and the walk that lights
// one of them at a time.
//
// ONE COMPONENT AND NOT THREE. The hub, the spokes and the boxes are three layers
// — an HTML disc, an SVG line each, an HTML box each — and they are three views of
// ONE fact: where the six pillars are. `./geometry.ts` owns that fact and all
// three layers read it here, in one file, because the failure this figure is
// actually at risk of is a spoke pointing at where a box used to be. Splitting the
// SVG layer from the box layer would put the two halves of every spoke in
// different files and hide exactly that.
//
// THE WALK MAKES THAT ARGUMENT TWICE OVER. A beat lights a box AND thickens the
// spoke that joins it, so the two halves of one beat are also in two layers — and
// both read `focusedPillarIndex(pose)` from `../walk.ts`, once, at the top of this
// component. That is why the pose→pillar map is not four `pose >= n` comparisons
// spread through this JSX tree: a spoke that thickened at a pose its box was not
// lit at is the one bug that would look like a rendering glitch rather than a
// logic error.
//
// IT READS NO VARIANT AND NO BRAND: the resolved hub line arrives as a prop. That
// is what lets one test render both brands' hubs side by side in a single module
// epoch, which is the only way to compare them (§4.4 slot 5).
//
// CSS vars only, NO HEX AND NO rgba() LITERALS — the prototype fills its hub with
// `rgba(184,110,61,0.14)`, its boxes with `rgba(10,10,10,0.92)`, and its FOCUSED
// box with `rgba(184,110,61,0.22)` under a `rgba(184,110,61,0.13)` halo. Those are
// the copper and the stage written out by hand where `var(--copper-950)`,
// `var(--neutral-900)`, `var(--copper-900)` and `var(--copper-800)` say the same
// thing and move with the token. Rank is a COLOUR TIER and never opacity — opacity
// here means "not revealed yet", which is time, not rank.
//
// NOTHING IS PRE-DIMMED, AND NOTHING IS RANKED BY HISTORY (§7.1). At every pose all
// six pillars carry the SAME border and the SAME label tier except the ONE the walk
// is on, which carries a BRIGHTER one — see {@link REST} and {@link FOCUS}. There is
// no "already walked" tier and no "not yet" tier: the prototype ranks its inactive
// pillars two more ways (`--copper-600` once visited, `--copper-800` before) and
// that ranking is deleted here rather than ported, because it makes five of six
// pillars change appearance on a beat that is about the sixth.
//
// ZERO SMIL NODES, at any of the nine poses, under any motion preference. The whole
// motion budget is CSS transitions on a pose change, which the global
// `prefers-reduced-motion: reduce` rule at the top of `src/styles/globals.css`
// squashes to 0.01ms — so every pose rests on its finished frame and there is
// nothing to gate at mount. NO NEW KEYFRAME EITHER: gh#53 needed one because a
// `stroke-dashoffset` sweep has no resting pair of values to transition between,
// and this figure has nothing SMIL or a keyframe can draw that a transition
// cannot.
import type { CSSProperties } from "react";
// The section-E shim, which is the tree's de facto shared icon resolver: every
// module that needs a lucide glyph outside section F imports THIS one, and this
// slide joins them rather than adding a third. There are already two — section F
// keeps its own longer copy with a different map — and centralising the pair is a
// cleanup this ticket is not. `Boxes` and `Compass` were added to the map here for
// this slide, which is the extension path the shim's own doc comment names.
import { LucideIcon } from "@/slides/foundation-core-section-e/components/LucideIcon";
import { highlight } from "@/components/highlight";
import {
  FOCUS_HALO_WIDTH,
  FOCUS_SCALE,
  HUB,
  KICKER_TOP,
  PILLAR_BOX,
  SIDE_MARGIN,
  WALK_COLUMN,
  pillarCentre,
  spokeSegment,
} from "../geometry";
import { decisionCounter, shapeOrgContent as C } from "../content";
import {
  POSE,
  focusedPillarIndex,
  showsCloser,
  showsPillars,
  showsWalkColumn,
} from "../walk";

// ───────────────────── the two tiers, in two tables ─────────────────────

/**
 * What a pillar looks like when the walk is not on it — which is five of six
 * pillars at every beat, and all six at the poses that focus none.
 *
 * ONE TIER FOR ALL SIX, and it is a FULL one. The prototype ranks its pillars
 * three ways (`--copper-800` unvisited, `--copper-600` walked, `--copper-200`
 * active) and only the third of those survives here. The other two are deleted, not
 * ported, and the reason is §7.1's rule read literally: a walked-vs-unvisited
 * ranking means the ARRIVAL of beat 4 also re-colours pillars 1–3, so five boxes
 * change on a beat that is about the sixth and the room's eye is pulled to the
 * change it is not supposed to be reading. Five of six pillars are literally
 * unchanged by a beat here, byte for byte, and {@link FOCUS} is the only thing that
 * differs from this table at all.
 *
 * AND IT LEAVES ROOM ABOVE ITSELF, which is what makes the walk possible without
 * subtracting anything: `--copper-300`, `--copper-200`, `--copper-100`,
 * `--neutral-0` and a copper fill are all still unspent at this tier. Had the
 * resting pose opened at `--copper-200`, the walk's only way to make one pillar
 * louder would have been to make five quieter — the one thing §7.1 rules out.
 */
const REST = {
  /** Same tier as the box border: the spoke is part of the same resting figure,
   *  and a spoke brighter than the box it joins would read as the emphasis. */
  spokeStroke: "var(--copper-600)",
  /** 1.6, not the prototype's 1.2. At projection distance a 1.2px copper hairline
   *  on near-black is the first thing to disappear, and this is a full-strength
   *  resting figure — the walk thickens ITS spoke to make a point, and 2.6 over
   *  1.6 is still an unmistakable difference. */
  spokeWidth: 1.6,
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
   * halo stays on the box the walk has left.
   */
  boxHalo: "none",
  iconColor: "var(--copper-300)",
  /** `--neutral-200`, three tiers above gh#50's `--neutral-300` floor. A full
   *  strength label on all six, which is half of "nothing is pre-dimmed" — the
   *  border is the other half. */
  labelColor: "var(--neutral-200)",
} as const;

/**
 * What the ONE pillar the walk is on looks like — §7.1's "the active one *gains*
 * copper fill, a thickened spoke and a halo".
 *
 * EVERY VALUE HERE IS AT OR BRIGHTER THAN ITS {@link REST} COUNTERPART, and that is
 * the invariant to check this table against before anything else: `--copper-200`
 * over `--copper-600` on the spoke and the border, `--copper-100` over
 * `--copper-300` on the icon, `--neutral-0` over `--neutral-200` on the label,
 * 2.6px over 1.6px of stroke, a `--copper-900` fill where the resting box is the
 * stage's own `--neutral-900` (#3d2413 against #0a0a0a — the box gains light, it
 * does not merely change hue), and a visible halo where the resting box has none.
 * Not one of the seven is a subtraction, so the five pillars beside the lit one need
 * no adjustment for it to stand out. That is what "attention is bought with added
 * light, never subtracted" means as a diff between two tables.
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
 * the channel the arrival sweep uses — so a rank carried in the same channel is a
 * rank that reads as a reveal that has not finished.
 */
const FOCUS = {
  spokeStroke: "var(--copper-200)",
  spokeWidth: 2.6,
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
 * decisions, the closer and the headline lives.
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

/**
 * How long a pillar takes to arrive, and how far behind the one before it.
 *
 * The ring reveals in ring order, 90ms apart, so six boxes land as a sweep around
 * the hub rather than as one flash of six — the sweep is what says "these are six
 * of one thing". 180ms of lead-in keeps the first box from arriving on the same
 * frame as the click.
 */
const REVEAL_LEAD_MS = 180;
const REVEAL_STAGGER_MS = 90;

/**
 * The stagger delay pillar `i` carries AT THIS POSE — and the reason it is a
 * function of the pose and not a constant per index.
 *
 * THE ARRIVAL OWNS THE DELAY; THE WALK MUST NOT INHERIT IT. Up to and including
 * {@link POSE.RING} this returns the sweep's own offset (180…630ms), which is what
 * makes the six boxes land in ring order. From the first beat onward it returns 0,
 * and that is not a tidy-up: `opacity` and `transform` are the two properties the
 * sweep animates, and the FOCUS SCALE rides on the same `transform` as the centring
 * translate (see the pillar box below, and `FOCUS_SCALE` in `../geometry.ts`). Left
 * at 630ms, focusing the LAST pillar in the ring would sit still for two thirds of a
 * second after the presenter's click and then jump — which on a projector reads as a
 * deck that has stopped responding, and reads WORST on the pillar the walk reaches
 * last.
 *
 * THE FOCUS PROPERTIES NEVER GET A DELAY AT ALL, at any pose — see the three
 * transition strings below, which append `border-color`, `background`, `box-shadow`,
 * `stroke`, `stroke-width` and `color` at a flat `0.35s var(--ease)`. A delay on
 * those is worse than a delay on the transform, because it lands on the RELEASE
 * too: stepping from beat 3 to beat 4 would un-light pillar 2 late and light pillar
 * 3 late, and the two would overlap in the middle so that two pillars are lit at
 * once for a third of a second — the one state §7.1's no-dim rule exists to make
 * unambiguous.
 *
 * AND IT IS WHAT MAKES `prefers-reduced-motion: reduce` HONEST HERE. The global rule
 * in `src/styles/globals.css` squashes `transition-duration` to 0.01ms and says
 * NOTHING about `transition-delay` — gh#54's verification script measured exactly
 * that on this slide. So under `reduce` a delayed transition is still delayed, it
 * just snaps when it finally starts. A focus change carries no delay, so it is
 * genuinely instant; the arrival sweep keeps its 180…630ms, which is correct,
 * because a staggered reveal that has been asked to skip its motion should still
 * arrive in order rather than all at once.
 */
function revealDelayMs(pose: number, i: number): number {
  return pose <= POSE.RING ? REVEAL_LEAD_MS + i * REVEAL_STAGGER_MS : 0;
}

/**
 * The one duration every focus property transitions over — the prototype's, kept.
 *
 * ONE CONSTANT FOR ALL SIX PROPERTIES (border, fill, halo, icon colour, label
 * colour, spoke stroke and width) because a beat is ONE event and the two layers
 * that draw it are HTML and SVG. Two durations would let the spoke finish
 * thickening before the box it joins finishes filling, which is a beat that arrives
 * twice.
 */
const FOCUS_TRANSITION = "0.35s var(--ease)";

// ───────────────────── the figure ─────────────────────

export interface PillarOrbitProps {
  /**
   * The hub's second line — `hubBrandLineFor(VARIANT.brand)`. `null` means this
   * deck names no organisation, and the hub then prints its label alone rather
   * than a blank line (see `../content.ts`).
   */
  brandLine: string | null;
  /** 0…8. See the slide file for what each pose argues, and `../walk.ts` for the
   *  three named ones and the six counted ones. */
  pose: number;
}

export function PillarOrbit({ brandLine, pose }: PillarOrbitProps) {
  // THE POSE, ASKED WHERE IT IS ANSWERED. Every question about the pose goes to
  // `../walk.ts` and none is re-derived from a comparison — so no branch in this tree
  // can form its own opinion about what pose 8 means. The two the FIGURE branches on
  // are read here, because the ring, the spokes and the boxes all need the same
  // answer; the column's own two (`showsWalkColumn`, `showsCloser`) are asked at the
  // column, where nothing above them has any use for them.
  const showPillars = showsPillars(pose);
  const focus = focusedPillarIndex(pose);

  return (
    <>
      {/* THE STANDING KICKER — the claim the figure argues for, in the band
          between the headline and the top of the ring. It does NOT fade with the
          poses, at any of the nine: the prototype's kicker sat inside the ring's
          own space and had to cross-fade out as the pillars came in
          (`opacity: stepIndex === 0 ? 1 : 0`), which spends a pose on a string that
          is true at all of them. An operating model is not a department at pose 8
          either. */}
      <div
        data-testid="shape-kicker"
        style={{
          position: "absolute",
          left: SIDE_MARGIN,
          top: KICKER_TOP,
          ...monoLabel(11, "var(--copper-400)", 0.22),
        }}
      >
        {C.kicker}
      </div>

      {/* THE SPOKES. One `<line>` per pillar, trimmed by `spokeSegment` so each
          runs box edge → disc edge, and thickened on the ONE the walk is on.

          `stroke` AND `strokeWidth` GO THROUGH `style`, NOT through the SVG
          presentation attributes: `var()` is only resolved in CSS properties, so
          `stroke="var(--copper-600)"` as an attribute renders a black line on a
          black stage. The one hard-won line of the prototype, kept verbatim — and
          it is now load-bearing twice, because the focus tier is a `var()` too.

          No `preserveAspectRatio` override: `.svg-layer` is `inset: 0` on a stage
          that is exactly 1280×720, so the viewBox is already 1:1 with the
          absolute coordinates the boxes are placed at. */}
      <svg className="svg-layer" style={{ zIndex: 1 }} viewBox="0 0 1280 720">
        {C.pillars.map((pillar, i) => {
          const spoke = spokeSegment(i);
          const tier = focus === i ? FOCUS : REST;
          return (
            <line
              key={pillar.id}
              data-testid={`shape-spoke-${pillar.id}`}
              x1={spoke.x1}
              y1={spoke.y1}
              x2={spoke.x2}
              y2={spoke.y2}
              strokeLinecap="round"
              style={{
                stroke: tier.spokeStroke,
                strokeWidth: tier.spokeWidth,
                opacity: showPillars ? 1 : 0,
                // `stroke-width` AND NOT `strokeWidth` inside the transition
                // string: this is CSS, not the React prop namespace, and the
                // camelCase spelling is silently ignored — which would leave the
                // spoke snapping to 2.6px while its box fades to copper over
                // 350ms.
                transition:
                  `opacity 0.5s var(--ease) ${revealDelayMs(pose, i)}ms, ` +
                  `stroke ${FOCUS_TRANSITION}, stroke-width ${FOCUS_TRANSITION}`,
              }}
            />
          );
        })}
      </svg>

      {/* THE HUB — present from pose 0, because pose 0 IS the hub. No reveal
          wrapper on it for that reason: it has no pose it is absent at. And no
          focus tier either — the hub is what the six pillars are pillars OF, so a
          walk that also lit the centre would be a walk with seven subjects. */}
      <div
        data-testid="shape-hub"
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
        {/* THE BRAND LINE, or nothing at all. Rendered only when there is an
            organisation to name: `null` prints no element, not an empty one, so a
            deck that names nobody shows a hub with one line instead of one line
            and a gap. The display serif and the `--neutral-50` tier make it the
            brightest type on the stage at pose 0, which is correct — at pose 0
            the whole argument is who the enabler is. */}
        {brandLine !== null && (
          <span
            data-testid="shape-hub-brand-line"
            style={{
              fontFamily: "var(--display)",
              fontSize: 19,
              lineHeight: 1,
              color: "var(--neutral-50)",
            }}
          >
            {brandLine}
          </span>
        )}
      </div>

      {/* THE PILLARS. Absolutely positioned boxes, centred on their ring point.
          NOT WRAPPED IN `Reveal`: `.fade`/`.fade.on` carry their own
          `transform: translateY(…)`, which would overwrite the
          `translate(-50%, -50%)` that does the centring here and drop all six
          boxes half their own size down and right. So the reveal is an inline
          opacity-and-scale transition — the same primitive, minus the transform
          collision — and the focus scale composes onto the same transform for the
          same reason. */}
      {C.pillars.map((pillar, i) => {
        const { x, y } = pillarCentre(i);
        const focused = focus === i;
        const tier = focused ? FOCUS : REST;
        const delay = revealDelayMs(pose, i);
        return (
          <div
            key={pillar.id}
            data-testid={`shape-pillar-${pillar.id}`}
            // WHICH PILLAR THE WALK IS ON, IN THE DOM. The unit tests and the
            // browser harness both key off this rather than off a parsed style
            // string — "which box is lit" is a fact about the figure, and reading
            // it back out of a border colour would make every check a check of the
            // tier table's spelling instead.
            data-active={focused ? "true" : "false"}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: PILLAR_BOX.w,
              height: PILLAR_BOX.h,
              // THREE SCALES ON ONE TRANSFORM, and they have to be: 0.86 → 1 is
              // the arrival (the box settles onto the ring instead of appearing on
              // it), 1 → FOCUS_SCALE is the beat, and `translate(-50%, -50%)` is
              // what makes `left`/`top` a CENTRE. A wrapper element per effect
              // would compose them, and would also give the arrival and the beat
              // separate transition timelines — so a click during the sweep would
              // scale one box from two directions at once.
              transform: `translate(-50%, -50%) scale(${
                showPillars ? (focused ? FOCUS_SCALE : 1) : 0.86
              })`,
              opacity: showPillars ? 1 : 0,
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
              // 4 WHEN LIT, so the halo is painted over its neighbours instead of
              // under them. At a flat z-index the ring's own paint order decides,
              // and pillars 1/2 and 4/5 are close enough that the later box clips
              // the earlier one's 4px ring — a halo with a bite out of one side,
              // on two of the six beats only.
              zIndex: focused ? 4 : 2,
              // ONE PROPERTY PER ITEM, AND THE DELAY ONLY ON THE ARRIVAL'S TWO.
              // See {@link revealDelayMs}: `opacity` and `transform` carry the
              // sweep's stagger while the ring is arriving and nothing afterwards,
              // and the three focus properties carry no delay at any pose so that a
              // beat and the RELEASE of that beat both animate.
              transition:
                `opacity 0.5s var(--ease) ${delay}ms, ` +
                `transform 0.4s var(--ease) ${delay}ms, ` +
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
                  the icon's tier TRANSITION at all: a `color` prop would paint the
                  SVG's own `stroke` attribute, which no transition on this span
                  can reach. */}
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
          </div>
        );
      })}

      {/* ───────────────── THE WALK COLUMN ─────────────────

          ONE ELEMENT HOLDING TWO THINGS IN TURN — six decisions, then the closer.
          `showsWalkColumn` in `../walk.ts` carries the argument: the prototype
          drew the beats in one bordered panel and the closer in a SECOND bordered
          block at the same left edge, each with its own
          `opacity: … ? 1 : 0`, so at the closer's pose the column's left hairline
          faded out and back in in the same place. Two elements pretending to be one
          column, and the blink is what gives it away on a projector. The hairline
          belongs to the COLUMN, so it is declared once, here, and outlives the
          things inside it.

          IT NEVER OPENS AT POSE 1 either — the ring's own reveal is a six-box
          sweep, and a hairline arriving beside it would compete with the thing the
          room is watching.

          `bottom` IS A CSS OFFSET AND `WALK_COLUMN.bottom` IS A STAGE Y, hence the
          subtraction — the same conversion `CapabilityLadder.tsx` does for its chip
          shelf. `WALK_COLUMN.top` (190) and `WALK_COLUMN.bottom` (610) come off the
          ring in `../geometry.ts`, and they are symmetric about `HUB.y`: 400 − 210
          and 400 + 210. So this box's own vertical centre IS y = 400 = `HUB.y`, and
          every block inside it centred on that line reads at the hub's own eye
          level. That is why the seven blocks below share one `top: 50%` instead of
          stacking from the top of the column: a beat is a reply to the hub, and a
          reply set 190px above it makes the room's eye travel up and back down on
          each of six clicks. */}
      <div
        data-testid="shape-walk-column"
        style={{
          position: "absolute",
          left: WALK_COLUMN.left,
          right: WALK_COLUMN.right,
          top: WALK_COLUMN.top,
          bottom: 720 - WALK_COLUMN.bottom,
          borderLeft: "1px solid var(--copper-800)",
          // THE GUTTER, DECLARED ON THE COLUMN AND RESTATED BY ITS CHILDREN. An
          // absolutely positioned child's containing block is its ancestor's
          // PADDING box, so this padding does not indent the seven blocks below —
          // each sets `left: WALK_COLUMN.rulePad` itself. It is kept anyway, and
          // from the same constant, because it is the column's content box: a later
          // block that is NOT absolutely positioned (a second line under the
          // closer, a mono footer) must land in the same measure as these seven, and
          // one number read twice cannot drift the way 28 written twice can.
          paddingLeft: WALK_COLUMN.rulePad,
          opacity: showsWalkColumn(pose) ? 1 : 0,
          transition: `opacity ${FOCUS_TRANSITION}`,
          zIndex: 5,
        }}
      >
        {/* SIX BLOCKS MOUNTED, NOT ONE PANEL WHOSE TEXT SWAPS — and this is a
            correctness decision, not a performance one.

            A single panel driven by `focus` has to render SOMETHING at the closer's
            pose, where `focus` is `NO_FOCUS`, and every available answer is wrong in
            front of a room. Render nothing and the panel blanks mid-fade, so the
            sixth decision's words vanish a frame before the block that holds them
            does. Fall back to `pillars[0]` — which is what `pillars.at(focus)` and
            the prototype's own `Math.max(focus, 0)` both do — and the FIRST
            decision flashes up under the closer as the panel fades out, plus a
            "01 / 06" counter for a beat that is not running. Keep the last-focused
            pillar in state and there is a piece of history for a BACKWARDS step to
            contradict, on a slide whose `8 → 0` walk is an acceptance criterion.

            Six blocks cross-fade with no state, no fallback and no clamp: exactly
            one of them is at opacity 1 at any pose, `decisionCounter(i)` is always
            asked about a pillar that exists, and stepping backwards asks the same
            question of a smaller number.

            THEY ALL OCCUPY THE SAME RECTANGLE (`left`/`right`/`top: 50%`), which is
            what makes the cross-fade a cross-fade rather than a re-layout: the
            outgoing and incoming decisions are the same block of the column, so the
            eyebrow does not move by the difference between two label lengths.

            THE EYEBROW AND THE LABEL CARRY NO HIGHLIGHT. `decisionCounter(i)` is the
            mono LABEL register and the pillar's name is the display one — a copper
            italic in either reads as a rendering fault, and inside the counter it
            would be an emphasis on arithmetic. Only the decision goes through
            `highlight`; see the keyword rule at the top of `../content.ts`. */}
        {C.pillars.map((pillar, i) => (
          <div
            key={pillar.id}
            data-testid={`shape-decision-${pillar.id}`}
            style={{
              position: "absolute",
              left: WALK_COLUMN.rulePad,
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              opacity: focus === i ? 1 : 0,
              transition: `opacity ${FOCUS_TRANSITION}`,
            }}
          >
            <div
              data-testid={`shape-decision-${pillar.id}-eyebrow`}
              style={{ ...monoLabel(10, "var(--copper-400)", 0.24), marginBottom: 14 }}
            >
              {decisionCounter(i)}
            </div>
            {/* The pillar's own name, in the display serif — the same words the box
                on the ring is labelled with, so the room can see WHICH pillar the
                column is speaking for without following the spoke. Repetition is
                the point; the ring's copy is 11px mono and this is 30px serif. */}
            <div
              data-testid={`shape-decision-${pillar.id}-label`}
              style={{
                fontFamily: "var(--display)",
                fontSize: 30,
                lineHeight: 1.1,
                color: "var(--neutral-50)",
                marginBottom: 18,
              }}
            >
              {pillar.label}
            </div>
            <p
              data-testid={`shape-decision-${pillar.id}-text`}
              style={{
                fontFamily: "var(--serif)",
                fontSize: 21,
                lineHeight: 1.45,
                color: "var(--neutral-100)",
                margin: 0,
              }}
            >
              {highlight(pillar.decision, pillar.decisionKw)}
            </p>
          </div>
        ))}

        {/* THE CLOSER — the seventh thing in the same slot, on the same centre
            line, and the only one of the seven that is not a beat.

            SERIF ITALIC AT 24 AGAINST THE BEATS' UPRIGHT 21: it is a claim ABOUT
            the six decisions rather than a seventh decision, and the italic is what
            says so without a label. It also carries no eyebrow and no counter, for
            the same reason — "07 / 06" is not a thing the room should be able to
            read.

            0.45s AND NOT THE BEATS' 0.35s. The six beats replace one another, so
            they trade at the pace of the click; the closer arrives into an empty
            column at the end of the argument and is the last thing the room is asked
            to read. The extra 100ms is the only place on this slide where a duration
            is doing rhetorical work.

            IN THE COLUMN, NOT THE BOTTOM STRIP — §7.1's one recorded layout risk,
            now arithmetic: the lowest pillar's box already reaches y = 610 of a 632
            floor and GROWS to 616.52 at the beat that focuses it
            (`FOCUS_GROWTH_SPENT` / `FOCUSED_LOWEST_PILLAR_BOTTOM` in
            `../geometry.ts`). There is no bottom strip left to print a line of type
            into, and the column the walk has just finished with is empty at exactly
            the pose the closer needs it. */}
        <p
          data-testid="shape-closer"
          style={{
            position: "absolute",
            left: WALK_COLUMN.rulePad,
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 24,
            lineHeight: 1.4,
            color: "var(--neutral-100)",
            margin: 0,
            opacity: showsCloser(pose) ? 1 : 0,
            transition: "opacity 0.45s var(--ease)",
          }}
        >
          {highlight(C.closer, C.closerKw)}
        </p>
      </div>

      {/* AND NO Specify → Generate → Verify PANEL, here or anywhere on this slide:
          §6.6 drops it, C.4 does it better, and the space it used is what the six
          beats above are spent on. It is refused, not pending — a test asserts those
          three words appear nowhere on this stage at any pose, so even a paraphrase
          that borrows one of them fails.

          NOTHING GOES IN THE BOTTOM STRIP, either. See the closer above and
          `FOCUS_GROWTH_SPENT` in `../geometry.ts`: the strip is occupied by the
          lowest pillar, which grows when the walk reaches it. */}
    </>
  );
}
