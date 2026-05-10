// Three concentric rings (PROMPT / CONTEXT / HARNESS) used on slide E.1.
//
// Ported from `claude-design-project/jsx/slides-a.jsx:78-109`. The source
// drives ring diameters from the outer step number; we expose a typed
// `focusIndex` (0=prompt, 1=context, 2=harness, null=summary) plus a
// `mode` discriminator and recompute the diameters internally so callers
// don't have to. SVG-free — pure absolutely-positioned divs with CSS
// transitions, no Framer Motion.
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
] as const;

type RingMode = "focal" | "summary";

export interface RingStackProps {
  focusIndex: 0 | 1 | 2 | null;
  mode: RingMode;
  /** SVG-style canvas width. The diagram is centered inside it. */
  width: number;
  /** SVG-style canvas height. */
  height: number;
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

export function RingStack({ focusIndex, mode, width, height }: RingStackProps) {
  const stage = focusIndex == null ? 3 : focusIndex;
  const [promptD, contextD, harnessD] = DIAMETERS[stage];
  const summary = mode === "summary";

  return (
    <div
      data-testid="ring-stack"
      data-mode={mode}
      data-focus={focusIndex == null ? "summary" : String(focusIndex)}
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
    </div>
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
