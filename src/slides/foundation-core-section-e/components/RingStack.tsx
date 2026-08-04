// Three concentric rings (PROMPT / CONTEXT / HARNESS) used on slide E.1.
//
// Ported from `claude-design-project/jsx/slides-a.jsx:78-109`. The source
// drives ring diameters from the outer step number; we expose a typed
// `focusIndex` (0=prompt, 1=context, 2=harness, null=summary) plus a
// `mode` discriminator and recompute the diameters internally so callers
// don't have to. The rings themselves are SVG-free — pure absolutely-positioned
// divs with CSS transitions, no Framer Motion.
//
// `orbit` (spec §8.2, gh#45) adds the one thing the rings cannot express: the
// three rings are one run in SPACE, the loop is repetition in TIME. It is drawn
// as a tilted SVG ellipse that CROSSES all three rings — deliberately not a
// fourth ring, and not a circle around them either, because a concentric outer
// boundary would assert the loop/harness containment direction that a third of
// the current literature draws the other way round. Off by default; the orbit is
// the only SVG this component mounts.
import { useId, type CSSProperties } from "react";

const LAYERS = [
  {
    id: "prompt",
    label: "PROMPT",
    essence: "the instructions",
    baseColor: "var(--copper-500)",
    focalColor: "var(--copper-200)",
  },
  {
    id: "context",
    label: "CONTEXT",
    essence: "the information",
    baseColor: "var(--copper-600)",
    focalColor: "var(--copper-200)",
  },
  {
    id: "harness",
    label: "HARNESS",
    essence: "the system",
    baseColor: "var(--copper-700)",
    focalColor: "var(--copper-200)",
  },
] as const;

type RingMode = "focal" | "summary";

// ───────────────────── orbit geometry ─────────────────────
// A TILTED ELLIPSE, not a concentric circle. This is the whole point of §8.2: a
// circle drawn outside the harness would be a fourth containment boundary, which
// is the direction the spec rejects. A tilted ellipse instead CROSSES the figure —
// its long axis reaches past the outer harness ring while its short axis dips
// inside the innermost prompt core, so the track cuts over all three ring strokes
// and cannot be read as enclosing any of them. It closes on itself, which is the
// "it repeats" reading.
const ORBIT_LABEL = "THE LOOP";
/** Long axis clearance from the canvas edge. 540 wide → rx 240, i.e. 50px past
 *  the 380-diameter harness ring. */
const ORBIT_RX_INSET = 30;
/** Short axis. Far inside the 240-diameter context ring's 120px radius, so both
 *  passes run through the interior of the stack and cross every ring stroke —
 *  that is what makes this a sweep and not an enclosure. */
const ORBIT_RY = 40;
/** Tilt, in degrees. Reads as perspective — an orbit seen edge-on, not a band.
 *  Kept shallow because tilt is what lifts the far pass toward the ring copy. */
const ORBIT_TILT = -14;
/** The track's center sits BELOW the rings' center. Every ring prints its label
 *  and essence at its own top edge, so the upper half of the figure is full of
 *  copy and the lower half is empty. With RY and TILT above, dropping the center
 *  by this much puts the whole track below the lowest of that copy (the prompt
 *  ring's essence line) while its far pass still runs through the prompt core, so
 *  all three ring strokes are crossed. Being off-center also puts the
 *  non-containment reading beyond doubt — nothing off-center is a boundary. */
const ORBIT_CY_OFFSET = 64;
/** Seconds for one full sweep. Slow enough to read as time, not as decoration. */
const ORBIT_DUR = 7;

export interface RingStackProps {
  focusIndex: 0 | 1 | 2 | null;
  mode: RingMode;
  /** SVG-style canvas width. The diagram is centered inside it. */
  width: number;
  /** SVG-style canvas height. */
  height: number;
  /**
   * When true, a copper arc sweeps all three rings and carries the mono label
   * `THE LOOP`. Motion over the figure, never a fourth ring. Default off, so
   * existing call sites are unaffected.
   */
  orbit?: boolean;
}

// Diameter table mirrors the source (`promptD`, `contextD`, `harnessD`).
// Index = layer (0=prompt, 1=context, 2=harness). Inner index = focusIndex
// (0..2 focal stages, 3 = summary).
const DIAMETERS: Readonly<Record<number, [number, number, number]>> = {
  // [promptD, contextD, harnessD]
  0: [220, 0, 0],
  1: [140, 320, 0],
  2: [110, 240, 380],
  3: [110, 240, 380], // summary
};

export function RingStack({
  focusIndex,
  mode,
  width,
  height,
  orbit = false,
}: RingStackProps) {
  const stage = focusIndex == null ? 3 : focusIndex;
  const [promptD, contextD, harnessD] = DIAMETERS[stage];
  const summary = mode === "summary";

  return (
    <div
      data-testid="ring-stack"
      data-mode={mode}
      data-focus={focusIndex == null ? "summary" : String(focusIndex)}
      data-orbit={orbit ? "true" : "false"}
      style={{
        position: "relative",
        width,
        height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Ring
        layerIndex={2}
        diameter={harnessD}
        focal={focusIndex === 2}
        summary={summary}
      />
      <Ring
        layerIndex={1}
        diameter={contextD}
        focal={focusIndex === 1}
        summary={summary}
      />
      <Ring
        layerIndex={0}
        diameter={promptD}
        focal={focusIndex === 0}
        summary={summary}
      />
      {/* Last in the DOM so the arc paints over the rings, not between them. */}
      {orbit && <Orbit width={width} height={height} />}
    </div>
  );
}

// ───────────────────── Orbit (step 4) ─────────────────────

/** Rotate `p` about (cx, cy) by `deg`, matching SVG's `rotate()` transform. */
function rotatePoint(
  p: { x: number; y: number },
  cx: number,
  cy: number,
  deg: number,
) {
  const a = (deg * Math.PI) / 180;
  const dx = p.x - cx;
  const dy = p.y - cy;
  return {
    x: cx + dx * Math.cos(a) - dy * Math.sin(a),
    y: cy + dx * Math.sin(a) + dy * Math.cos(a),
  };
}

function Orbit({ width, height }: { width: number; height: number }) {
  // SMIL is invisible to the global prefers-reduced-motion rule in globals.css
  // (it squashes CSS animations only), so the motion nodes are gated at mount.
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;

  // The <defs> path is referenced by <mpath href>, so the id must be unique per
  // mount. useId's colons are legal in an id but need escaping anywhere the id
  // reaches a CSS selector — strip them rather than depend on that.
  const trackId = `orbit-track-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  const cx = width / 2;
  const rx = width / 2 - ORBIT_RX_INSET;
  const ry = ORBIT_RY;
  // The rings' center, then the track's — the two are deliberately not the same.
  const ocy = height / 2 + ORBIT_CY_OFFSET;

  // Closed ellipse, drawn as two half-arcs from the right-hand extreme. Both use
  // sweep-flag 1, so the track runs clockwise: rightmost → bottom → leftmost → top.
  // Everything inside the rotated <g> is written in these UNROTATED coordinates;
  // the group transform tilts the track and the marker together.
  const d =
    `M ${cx + rx} ${ocy} A ${rx} ${ry} 0 1 1 ${cx - rx} ${ocy}` +
    ` A ${rx} ${ry} 0 1 1 ${cx + rx} ${ocy}`;

  // Arrowhead on the near pass (bottom of the ellipse), where the track runs
  // right-to-left. It is what still says "direction" when motion is suppressed.
  const head =
    `M ${cx - 7} ${ocy + ry} L ${cx + 2} ${ocy + ry - 4}` +
    ` L ${cx + 2} ${ocy + ry + 4} Z`;

  // The label rides the track's high end but must stay upright, so it sits
  // outside the rotated group at the rotated position of that end. The end is
  // close enough to the canvas edge that a centered label would overhang it, so
  // the x is clamped to keep the whole string on the canvas.
  const labelEnd = rotatePoint({ x: cx + rx, y: ocy }, cx, ocy, ORBIT_TILT);
  const labelAt = { x: Math.min(labelEnd.x, width - 45), y: labelEnd.y };

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      style={{
        position: "absolute",
        inset: 0,
        width,
        height,
        overflow: "visible",
        pointerEvents: "none",
      }}
    >
      <g
        data-testid="ring-orbit"
        data-orbit-rx={rx}
        data-orbit-ry={ry}
        data-orbit-cy={ocy}
        data-orbit-tilt={ORBIT_TILT}
      >
        <defs>
          <path id={trackId} d={d} />
        </defs>
        <g transform={`rotate(${ORBIT_TILT} ${cx} ${ocy})`}>
          {/* Knock-out pass in the surface color: the track reads as passing IN
              FRONT of the ring strokes it crosses, not merging with them. */}
          <path d={d} fill="none" stroke="var(--surface-dark)" strokeWidth="5" />
          <path
            data-testid="ring-orbit-arc"
            d={d}
            fill="none"
            stroke="var(--copper-400)"
            strokeWidth="1.5"
          />
          <path d={head} fill="var(--copper-300)" />
          {reduced ? (
            <circle
              data-testid="ring-orbit-marker"
              cx={cx + rx}
              cy={ocy}
              r="3.5"
              fill="var(--copper-100)"
            />
          ) : (
            // No cx/cy: animateMotion translates the element from the origin.
            <circle
              data-testid="ring-orbit-marker"
              r="3.5"
              fill="var(--copper-100)"
            >
              <animateMotion dur={`${ORBIT_DUR}s`} repeatCount="indefinite">
                <mpath href={`#${trackId}`} />
              </animateMotion>
            </circle>
          )}
        </g>
        <text
          x={labelAt.x}
          y={labelAt.y - 12}
          textAnchor="middle"
          fill="var(--copper-200)"
          fontFamily="var(--mono)"
          fontSize="11"
          letterSpacing="2"
        >
          {ORBIT_LABEL}
        </text>
      </g>
    </svg>
  );
}

interface RingProps {
  layerIndex: 0 | 1 | 2;
  diameter: number;
  focal: boolean;
  summary: boolean;
}

function Ring({ layerIndex, diameter, focal, summary }: RingProps) {
  if (diameter <= 0) return null;
  const layer = LAYERS[layerIndex];
  const summaryColor = "#e8c4a0";
  const borderColor = summary
    ? summaryColor
    : focal
    ? layer.focalColor
    : layer.baseColor;
  const labelColor = summary
    ? summaryColor
    : focal
    ? "var(--copper-200)"
    : "var(--copper-300)";
  const showEssence = focal || summary;
  const essenceColor = focal ? "var(--neutral-100)" : "var(--neutral-300)";
  const small = diameter <= 140;

  const wrapStyle: CSSProperties = {
    position: "absolute",
    width: diameter,
    height: diameter,
    borderRadius: "50%",
    border: `1px solid ${borderColor}`,
    background: focal ? "rgba(184,110,61,0.05)" : "transparent",
    transition: "all 0.7s var(--ease)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: small ? 8 : 12,
  };

  return (
    <div
      data-testid={`ring-${layer.id}`}
      data-focal={focal}
      data-diameter={diameter}
      style={wrapStyle}
    >
      <span
        style={{
          fontFamily: "var(--mono)",
          fontSize: small ? 9 : 11,
          letterSpacing: "0.18em",
          color: labelColor,
          textTransform: "uppercase",
        }}
      >
        {layer.label}
      </span>
      {showEssence && (
        <span
          style={{
            fontFamily: "var(--display)",
            fontStyle: "italic",
            fontSize: small ? 11 : diameter <= 240 ? 13 : 16,
            color: essenceColor,
            marginTop: small ? 1 : 4,
            whiteSpace: "nowrap",
          }}
        >
          {layer.essence}
        </span>
      )}
    </div>
  );
}
