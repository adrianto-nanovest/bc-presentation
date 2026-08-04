// The hub, its six spokes, and the six pillars on the ring.
//
// ONE COMPONENT AND NOT THREE. The hub, the spokes and the boxes are three layers
// — an HTML disc, an SVG line each, an HTML box each — and they are three views of
// ONE fact: where the six pillars are. `./geometry.ts` owns that fact and all
// three layers read it here, in one file, because the failure this figure is
// actually at risk of is a spoke pointing at where a box used to be. Splitting the
// SVG layer from the box layer would put the two halves of every spoke in
// different files and hide exactly that.
//
// IT READS NO VARIANT AND NO BRAND: the resolved hub line arrives as a prop. That
// is what lets one test render both brands' hubs side by side in a single module
// epoch, which is the only way to compare them (§4.4 slot 5).
//
// CSS vars only, NO HEX AND NO rgba() LITERALS — the prototype fills its hub with
// `rgba(184,110,61,0.14)` and its boxes with `rgba(10,10,10,0.92)`, which are the
// copper and the stage written out by hand where `var(--copper-950)` and
// `var(--neutral-900)` say the same thing and move with the token. Rank is a
// COLOUR TIER and never opacity — opacity here means "not revealed yet", which is
// time, not rank.
//
// NOTHING IS PRE-DIMMED (§7.1). At the resting pose all six pillars carry the SAME
// border and the SAME label tier: none of them is waiting for a walk to undim it,
// because attention is bought with added light, never subtracted. See {@link REST}.
//
// ZERO SMIL NODES, at either pose, under any motion preference. The whole motion
// budget is CSS transitions on a pose change, which the global
// `prefers-reduced-motion: reduce` rule at the top of `src/styles/globals.css`
// squashes to 0.01ms — so both poses rest on their finished frame and there is
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
import {
  HUB,
  KICKER_TOP,
  PILLAR_BOX,
  SIDE_MARGIN,
  pillarCentre,
  spokeSegment,
} from "../geometry";
import { shapeOrgContent as C } from "../content";

// ───────────────────── the resting tiers, in one table ─────────────────────

/**
 * What a pillar looks like when nothing is focused — which, this ticket, is
 * always.
 *
 * ONE TIER FOR ALL SIX, and it is a FULL one. The prototype ranks its pillars
 * three ways (`--copper-800` unvisited, `--copper-600` walked, `--copper-200`
 * active) because it renders the focus walk; at the resting pose that this ticket
 * ships, there is no "unvisited" — there is no walk yet to have visited anything —
 * so ranking would draw a distinction the slide is not making. The tiers below are
 * the prototype's WALKED tier, not its unvisited one, for exactly that reason.
 *
 * AND IT LEAVES ROOM ABOVE ITSELF. The next ticket's focused pillar has
 * `--copper-300`, `--copper-200`, `--copper-100`, `--neutral-0` and a copper fill
 * left to spend, so it can gain light without any of the other five losing any.
 * Had this pose opened at `--copper-200`, the walk's only way to make one pillar
 * louder would have been to make five quieter, which is the one thing §7.1 rules
 * out.
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
  iconColor: "var(--copper-300)",
  /** `--neutral-200`, three tiers above gh#50's `--neutral-300` floor. A full
   *  strength label on all six, which is half of "nothing is pre-dimmed" — the
   *  border is the other half. */
  labelColor: "var(--neutral-200)",
} as const;

/**
 * The mono LABEL register, which is where every string on this slide except the
 * headline lives.
 *
 * `textTransform: uppercase` is what lets `./content.ts` store "The Enabler" in
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

// ───────────────────── the figure ─────────────────────

export interface PillarOrbitProps {
  /**
   * The hub's second line — `hubBrandLineFor(VARIANT.brand)`. `null` means this
   * deck names no organisation, and the hub then prints its label alone rather
   * than a blank line (see `../content.ts`).
   */
  brandLine: string | null;
  /** 0 or 1. See the slide file for what each pose argues. */
  pose: number;
}

export function PillarOrbit({ brandLine, pose }: PillarOrbitProps) {
  const showPillars = pose >= 1;

  return (
    <>
      {/* THE STANDING KICKER — the claim the figure argues for, in the band
          between the headline and the top of the ring. It does NOT fade with the
          poses: the prototype's kicker sat inside the ring's own space and had to
          cross-fade out as the pillars came in, which spends a pose on a string
          that is true at both of them. */}
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
          runs box edge → disc edge.

          `stroke` AND `strokeWidth` GO THROUGH `style`, NOT through the SVG
          presentation attributes: `var()` is only resolved in CSS properties, so
          `stroke="var(--copper-600)"` as an attribute renders a black line on a
          black stage. The one hard-won line of the prototype, kept verbatim.

          No `preserveAspectRatio` override: `.svg-layer` is `inset: 0` on a stage
          that is exactly 1280×720, so the viewBox is already 1:1 with the
          absolute coordinates the boxes are placed at. */}
      <svg className="svg-layer" style={{ zIndex: 1 }} viewBox="0 0 1280 720">
        {C.pillars.map((pillar, i) => {
          const spoke = spokeSegment(i);
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
                stroke: REST.spokeStroke,
                strokeWidth: REST.spokeWidth,
                opacity: showPillars ? 1 : 0,
                transition: `opacity 0.5s var(--ease) ${
                  REVEAL_LEAD_MS + i * REVEAL_STAGGER_MS
                }ms`,
              }}
            />
          );
        })}
      </svg>

      {/* THE HUB — present from pose 0, because pose 0 IS the hub. No reveal
          wrapper on it for that reason: it has no pose it is absent at. */}
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
          collision. */}
      {C.pillars.map((pillar, i) => {
        const { x, y } = pillarCentre(i);
        return (
          <div
            key={pillar.id}
            data-testid={`shape-pillar-${pillar.id}`}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: PILLAR_BOX.w,
              height: PILLAR_BOX.h,
              // 0.86 → 1: the box settles onto the ring instead of appearing on
              // it. The scale is on the SAME transform as the centring, which is
              // why it has to be written out rather than composed by a wrapper.
              transform: `translate(-50%, -50%) scale(${showPillars ? 1 : 0.86})`,
              opacity: showPillars ? 1 : 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 7,
              padding: "8px 10px",
              boxSizing: "border-box",
              border: REST.boxBorder,
              background: REST.boxBackground,
              zIndex: 2,
              transition: `opacity 0.5s var(--ease) ${
                REVEAL_LEAD_MS + i * REVEAL_STAGGER_MS
              }ms, transform 0.4s var(--ease) ${
                REVEAL_LEAD_MS + i * REVEAL_STAGGER_MS
              }ms`,
            }}
          >
            <span
              data-testid={`shape-pillar-${pillar.id}-icon`}
              style={{ color: REST.iconColor, display: "flex" }}
            >
              {/* `currentColor` by omission — the shim's `color` prop is left
                  unset so the icon inherits the tier set on the span above, and
                  one edit moves the icon and nothing else. */}
              <LucideIcon name={pillar.icon} size={22} strokeWidth={1.5} />
            </span>
            <span
              data-testid={`shape-pillar-${pillar.id}-label`}
              style={{
                ...monoLabel(11, REST.labelColor, 0.13),
                textAlign: "center",
                lineHeight: 1.2,
              }}
            >
              {pillar.label}
            </span>
          </div>
        );
      })}

      {/* NOTHING SITS RIGHT OF x = 764. The column is reserved for the next
          ticket's focus-walk panel (§6.6) and `WALK_COLUMN_LEFT` in
          `../geometry.ts` is the constraint the ring was measured against — see
          that constant for why the panel cannot go along the bottom instead.

          AND NO Specify → Generate → Verify PANEL, here or anywhere on this
          slide: §6.6 drops it and C.4 does it better. It is refused, not pending. */}
    </>
  );
}
