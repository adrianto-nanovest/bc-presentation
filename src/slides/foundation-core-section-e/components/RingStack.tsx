// Concentric rings (PROMPT / CONTEXT / HARNESS, plus THE LOOP) used on slide E.1.
//
// Ported from `claude-design-project/jsx/slides-a.jsx:78-109`. The source
// drives ring diameters from the outer step number; we expose a typed
// `focusIndex` (0=prompt, 1=context, 2=harness, 3=loop, null=summary) plus a
// `mode` discriminator and recompute the diameters internally so callers
// don't have to. The rings are SVG-free — pure absolutely-positioned divs with
// CSS transitions, no Framer Motion.
//
// `loop` (owner direction 2026-08-04) draws THE LOOP as a FOURTH, OUTERMOST
// RING carrying a marker that travels around it. This supersedes the earlier
// §8.2 treatment (a tilted ellipse sweeping across the three rings, gh#45),
// which is gone: the owner asked for a concentric outer ring so that the loop
// can be given its own focal step and its own summary row alongside the three
// layers. The three inner rings shrink when the loop ring appears, so the
// figure keeps its margins on the 540×460 canvas.
import type { CSSProperties } from "react";

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
  {
    id: "loop",
    // One word, like the three ring labels above it — `THE LOOP` was the only
    // label carrying an article, which is what made the figure read unevenly.
    label: "LOOP",
    essence: "the repetition",
    baseColor: "var(--copper-700)",
    focalColor: "var(--copper-200)",
  },
] as const;

type RingMode = "focal" | "summary";
type LayerIndex = 0 | 1 | 2 | 3;

export interface RingStackProps {
  focusIndex: LayerIndex | null;
  mode: RingMode;
  /** SVG-style canvas width. The diagram is centered inside it. */
  width: number;
  /** SVG-style canvas height. */
  height: number;
  /**
   * When true, the outermost LOOP ring is drawn and a copper marker travels
   * around it. Implied by `focusIndex === 3`. Default off, so the three-ring
   * poses (steps 0–2) are unaffected.
   */
  loop?: boolean;
}

// Diameter table mirrors the source (`promptD`, `contextD`, `harnessD`) and adds
// `loopD`. Index = pose. 0..2 = the focal stages, 3 = the three-ring summary,
// 4 = any pose that carries the loop ring.
//
// Pose 4's four rings are set by the GAP, not by the diameters: every ring
// prints a label and an essence line inside its own top band, so the band has to
// clear the ring below it. 58px of gap against a ~39px text block (see `compact`
// in `Ring`) keeps `the repetition` off the harness stroke with ~19px to spare.
//
// The gap also fixes the outer diameter at 452, and THAT is what has to fit the
// slide: the figure is centered at y=380, so the outer ring spans y 154–606 and
// the marker dot overhangs it by 4. Headline ends at 128, footer text starts at
// 654 — about 22px of air at the top and 44px at the foot. Widening the gap
// pushes the ring into the headline, which is why it is 58 and not 62.
const RING_GAP_4 = 58;
const PROMPT_D_4 = 104;
const DIAMETERS: Readonly<Record<number, [number, number, number, number]>> = {
  // [promptD, contextD, harnessD, loopD]
  0: [220, 0, 0, 0],
  1: [140, 320, 0, 0],
  2: [110, 240, 380, 0],
  3: [110, 240, 380, 0], // summary, no loop
  4: [
    PROMPT_D_4,
    PROMPT_D_4 + 2 * RING_GAP_4,
    PROMPT_D_4 + 4 * RING_GAP_4,
    PROMPT_D_4 + 6 * RING_GAP_4, // 452
  ],
};

export function RingStack({
  focusIndex,
  mode,
  width,
  height,
  loop = false,
}: RingStackProps) {
  const showLoop = loop || focusIndex === 3;
  const stage = showLoop ? 4 : focusIndex ?? 3;
  const [promptD, contextD, harnessD, loopD] = DIAMETERS[stage];
  const summary = mode === "summary";

  return (
    <div
      data-testid="ring-stack"
      data-mode={mode}
      data-focus={focusIndex == null ? "summary" : String(focusIndex)}
      data-loop={showLoop ? "true" : "false"}
      style={{
        position: "relative",
        width,
        height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {showLoop && (
        <Ring
          layerIndex={3}
          diameter={loopD}
          focal={focusIndex === 3}
          summary={summary}
          compact
          entering
        />
      )}
      <Ring
        layerIndex={2}
        diameter={harnessD}
        focal={focusIndex === 2}
        summary={summary}
        compact={showLoop}
      />
      <Ring
        layerIndex={1}
        diameter={contextD}
        focal={focusIndex === 1}
        summary={summary}
        compact={showLoop}
      />
      <Ring
        layerIndex={0}
        diameter={promptD}
        focal={focusIndex === 0}
        summary={summary}
        compact={showLoop}
      />
      {/* Last in the DOM so the marker paints over every ring stroke it passes. */}
      {showLoop && <LoopMarker diameter={loopD} />}
    </div>
  );
}

// ───────────────────── LoopMarker ─────────────────────

/**
 * The dot that travels the loop ring. A rotating square box the size of the
 * ring, with the dot pinned to its top edge — so the dot rides the stroke
 * exactly, whatever the diameter.
 *
 * CSS animation, not SMIL: the global `prefers-reduced-motion` rule in
 * globals.css squashes CSS animations, so this needs no mount gate of its own
 * and the dot simply parks on the ring when motion is suppressed.
 */
function LoopMarker({ diameter }: { diameter: number }) {
  return (
    <div
      data-testid="ring-loop-marker"
      className="e1-loop-marker"
      style={{ width: diameter, height: diameter }}
    >
      <span className="e1-loop-marker-dot" />
    </div>
  );
}

interface RingProps {
  layerIndex: LayerIndex;
  diameter: number;
  focal: boolean;
  summary: boolean;
  /**
   * Four rings on stage: the label block is trimmed so it clears the ring below
   * it inside a 62px gap. The three-ring poses keep their original metrics —
   * they have 65–70px of gap and were signed off as they are.
   */
  compact?: boolean;
  /** Fade + settle on mount. Only the loop ring appears mid-slide. */
  entering?: boolean;
}

function Ring({
  layerIndex,
  diameter,
  focal,
  summary,
  compact,
  entering,
}: RingProps) {
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
    paddingTop: small ? 8 : compact ? 10 : 12,
    ...(entering ? { animation: "e1RingIn 0.6s var(--ease) both" } : null),
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
          fontSize: small ? 9 : compact ? 10 : 11,
          lineHeight: 1,
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
            fontSize: small
              ? 11
              : diameter <= 240
              ? compact
                ? 12
                : 13
              : compact
              ? 14
              : 16,
            lineHeight: 1.15,
            color: essenceColor,
            marginTop: small ? 1 : compact ? 3 : 4,
            whiteSpace: "nowrap",
          }}
        >
          {layer.essence}
        </span>
      )}
    </div>
  );
}
