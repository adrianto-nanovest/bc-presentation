// VWorkflowDiagram — V-shaped workflow diagram used on C.4.
//
// Three nodes form a downward V:
//   SPECIFY  (top-left peak, copper-700 border)            ←  human
//          ↘
//        GENERATE  (bottom of V, copper-400 dimmer border) ←  AI
//          ↗
//   VERIFY  (top-right peak, copper-700 border) → SHIP →   ←  human
//
// Connecting lines (SPECIFY → GENERATE, GENERATE → VERIFY) and the SHIP
// arrow are drawn via SVG pathLength so each step can reveal a node + its
// inbound/outbound line as a single beat. Connectors are 2.5px copper-400
// with filled triangular arrowheads (via shared <marker>).
//
// The visual rhyme: work *descends* into Generate (AI takes over), then
// *ascends* back into Verify (human resumes). Side captions above/below the
// V explicitly label the human vs AI work.
//
// Used by C.4 only. Step gates are passed in via the `on*` flags so the
// parent slide owns the step-reveal sequencing.
import { useState, type CSSProperties, type ReactNode } from "react";
import C4LoopBackArrow from "./C4LoopBackArrow";

// ─── Geometry (internal SVG viewBox is 1000×400 — scales to container) ───
// Three node centers (x, y) in viewBox units.
const VB_W = 1000;
const VB_H = 400;
// Node positions
const NODE_W = 200;
const NODE_H = 64;
const SPEC_CX = 230;
const SPEC_CY = 90;
const GEN_CX = 500;
const GEN_CY = 280;
const VER_CX = 770;
const VER_CY = 90;
// Ship arrow endpoint (extends rightward from VERIFY)
const SHIP_START_X = VER_CX + NODE_W / 2;
const SHIP_START_Y = VER_CY;
const SHIP_END_X = 970;
const SHIP_END_Y = VER_CY;

// Connecting line endpoints — anchor on node edges (approximate visual joins).
// SPECIFY → GENERATE: bottom-right of SPECIFY → top-left of GENERATE.
const LINE1_X1 = SPEC_CX + NODE_W / 2 - 10;
const LINE1_Y1 = SPEC_CY + NODE_H / 2;
const LINE1_X2 = GEN_CX - NODE_W / 2 + 10;
const LINE1_Y2 = GEN_CY - NODE_H / 2;
// GENERATE → VERIFY: top-right of GENERATE → bottom-left of VERIFY.
const LINE2_X1 = GEN_CX + NODE_W / 2 - 10;
const LINE2_Y1 = GEN_CY - NODE_H / 2;
const LINE2_X2 = VER_CX - NODE_W / 2 + 10;
const LINE2_Y2 = VER_CY + NODE_H / 2;

const LINE1_LEN = Math.hypot(LINE1_X2 - LINE1_X1, LINE1_Y2 - LINE1_Y1);
const LINE2_LEN = Math.hypot(LINE2_X2 - LINE2_X1, LINE2_Y2 - LINE2_Y1);
const SHIP_LEN = SHIP_END_X - SHIP_START_X;

// Lane hairline y — between V peaks (y≈230 in spec coords) and V trough
// (y≈360 in spec coords). The diagram's internal y is 0–400; peaks sit at
// y=90 and trough at y=280, so the midline sits at y≈185. We use 185 here
// (the same proportional midpoint between peak and trough as in the spec).
const LANE_HAIRLINE_Y = 185;

export interface VWorkflowNode {
  label: string;
  caption: string;
  /** Optional 2-line hover detail (per spec §3.4 hover behaviour). */
  hoverLines?: readonly [string, string];
}

export interface VWorkflowDiagramProps {
  /** [SPECIFY, GENERATE, VERIFY, SHIP] — order is fixed. */
  nodes: readonly VWorkflowNode[];
  /** Caption above the V: HUMAN WORK: SPECIFY + VERIFY */
  humanCaption?: ReactNode;
  /** Caption below the GENERATE node: AI WORK: GENERATE (bulk) */
  aiCaption?: ReactNode;
  /** stepIndex from the deck — drives which nodes/lines are visible. */
  stepIndex: number;
  /** When true, render a faint copper-900 hairline across the diagram
   *  between the V peaks and trough to mark the human/AI lane split. */
  showLaneHairline?: boolean;
  /** When true, overlay the recursive VERIFY → SPECIFY loop-back arrow. */
  showLoopBack?: boolean;
}

// stepIndex semantics (passed in by C.4, post-rework):
//   < 1  : nothing visible (mount/load pose)
//   ≥ 1  : both V-peak nodes (SPECIFY + VERIFY) reveal simultaneously +
//          both diagonal arrows draw down toward GENERATE position
//   ≥ 2  : GENERATE node appears at the trough + SHIP arrow extends right
//          from VERIFY
//   ≥ 3  : (handled by parent — loop-back overlay)
//
// Pre-rework C.4 passed clamped values 0/1/2; the new C.4 passes the slide's
// full stepIndex directly. Internally we gate purely on stepIndex thresholds.

export function VWorkflowDiagram({
  nodes,
  humanCaption,
  aiCaption,
  stepIndex,
  showLaneHairline = false,
  showLoopBack = false,
}: VWorkflowDiagramProps) {
  const specifyOn = stepIndex >= 1;
  const line1On = stepIndex >= 1;
  const verifyOn = stepIndex >= 1;
  const line2On = stepIndex >= 1;
  const generateOn = stepIndex >= 2;
  const shipOn = stepIndex >= 2;

  const specify = nodes[0];
  const generate = nodes[1];
  const verify = nodes[2];
  const ship = nodes[3];

  // hoveredNode tracks which of the three V-nodes is hovered (if any) so the
  // diagram can surface a 2-line caption beside it. Presenter-only detail —
  // never a substitute for the step-reveal sequence.
  const [hoveredNode, setHoveredNode] = useState<
    "specify" | "generate" | "verify" | null
  >(null);

  return (
    <div
      data-testid="v-workflow-diagram"
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top caption — HUMAN WORK */}
      <div
        data-testid="v-workflow-human-caption"
        style={{
          textAlign: "center",
          fontFamily: "var(--mono)",
          fontSize: 12,
          letterSpacing: "0.28em",
          color: "var(--copper-300)",
          textTransform: "uppercase",
          marginBottom: 4,
          opacity: specifyOn ? 0.9 : 0,
          transition: "opacity 400ms var(--ease)",
        }}
      >
        {humanCaption}
      </div>

      {/* SVG canvas — connecting lines + ship arrow. Nodes are absolutely
          positioned divs on top so we get crisp text without SVG <foreignObject>. */}
      <div
        style={{
          position: "relative",
          flex: "1 1 auto",
          width: "100%",
        }}
      >
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          preserveAspectRatio="xMidYMid meet"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            overflow: "visible",
            pointerEvents: "none",
          }}
          aria-hidden
        >
          <defs>
            {/* Shared filled triangular arrowhead for all three connectors.
                refX sits at the tip of the triangle so the marker's tip
                lines up exactly with the line's endpoint. */}
            <marker
              id="v-arrowhead"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              markerUnits="strokeWidth"
              orient="auto"
            >
              <polygon
                points="0,0 10,5 0,10"
                fill="var(--copper-400)"
              />
            </marker>
          </defs>

          {/* Lane hairline — opt-in, splits HUMAN WORK (above) from AI WORK
              (below). Captions are drawn by the consuming slide. */}
          {showLaneHairline && (
            <line
              data-testid="v-lane-hairline"
              x1={0}
              y1={LANE_HAIRLINE_Y}
              x2={VB_W}
              y2={LANE_HAIRLINE_Y}
              stroke="var(--copper-900)"
              strokeWidth={1}
              opacity={0.4}
            />
          )}

          {/* SPECIFY → GENERATE diagonal */}
          <line
            data-testid="v-line-specify-generate"
            x1={LINE1_X1}
            y1={LINE1_Y1}
            x2={LINE1_X2}
            y2={LINE1_Y2}
            stroke="var(--copper-400)"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeDasharray={LINE1_LEN}
            strokeDashoffset={line1On ? 0 : LINE1_LEN}
            markerEnd={line1On ? "url(#v-arrowhead)" : undefined}
            style={{
              transition: "stroke-dashoffset 600ms var(--ease)",
              transitionDelay: line1On ? "120ms" : "0ms",
            }}
          />
          {/* GENERATE → VERIFY diagonal */}
          <line
            data-testid="v-line-generate-verify"
            x1={LINE2_X1}
            y1={LINE2_Y1}
            x2={LINE2_X2}
            y2={LINE2_Y2}
            stroke="var(--copper-400)"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeDasharray={LINE2_LEN}
            strokeDashoffset={line2On ? 0 : LINE2_LEN}
            markerEnd={line2On ? "url(#v-arrowhead)" : undefined}
            style={{
              transition: "stroke-dashoffset 600ms var(--ease)",
              transitionDelay: line2On ? "120ms" : "0ms",
            }}
          />
          {/* SHIP arrow shaft */}
          <line
            data-testid="v-ship-shaft"
            x1={SHIP_START_X}
            y1={SHIP_START_Y}
            x2={SHIP_END_X}
            y2={SHIP_END_Y}
            stroke="var(--copper-400)"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeDasharray={SHIP_LEN}
            strokeDashoffset={shipOn ? 0 : SHIP_LEN}
            markerEnd={shipOn ? "url(#v-arrowhead)" : undefined}
            style={{
              transition: "stroke-dashoffset 500ms var(--ease)",
              transitionDelay: shipOn ? "200ms" : "0ms",
            }}
          />
        </svg>

        {/* SPECIFY node */}
        <VNode
          cx={SPEC_CX}
          cy={SPEC_CY}
          label={specify?.label ?? "SPECIFY"}
          caption={specify?.caption ?? ""}
          on={specifyOn}
          tone="human"
          icon="specify"
          testId="v-node-specify"
          hovered={hoveredNode === "specify"}
          onHoverChange={(h) => setHoveredNode(h ? "specify" : null)}
          hoverLines={
            specify?.hoverLines ?? [
              "Write the brief: what & why.",
              "Constraints, audience, success criteria.",
            ]
          }
          hoverSide="right"
        />
        {/* GENERATE node */}
        <VNode
          cx={GEN_CX}
          cy={GEN_CY}
          label={generate?.label ?? "GENERATE"}
          caption={generate?.caption ?? ""}
          on={generateOn}
          tone="ai"
          icon="generate"
          testId="v-node-generate"
          hovered={hoveredNode === "generate"}
          onHoverChange={(h) => setHoveredNode(h ? "generate" : null)}
          hoverLines={
            generate?.hoverLines ?? [
              "Bulk drafting at speed.",
              "AI produces the first 80% — you steer.",
            ]
          }
          hoverSide="right"
        />
        {/* VERIFY node */}
        <VNode
          cx={VER_CX}
          cy={VER_CY}
          label={verify?.label ?? "VERIFY"}
          caption={verify?.caption ?? ""}
          on={verifyOn}
          tone="human"
          icon="verify"
          testId="v-node-verify"
          hovered={hoveredNode === "verify"}
          onHoverChange={(h) => setHoveredNode(h ? "verify" : null)}
          hoverLines={
            verify?.hoverLines ?? [
              "Review, validate, judge.",
              "The new core skill — verifiability beats fluency.",
            ]
          }
          hoverSide="left"
        />
        {/* SHIP marker — small caps tag just past the arrowhead */}
        <ShipMarker
          x={SHIP_END_X}
          y={SHIP_END_Y}
          label={(ship?.label ?? "→ SHIP").replace(/^→\s*/, "")}
          on={shipOn}
        />

        {/* AI WORK caption — sits below GENERATE node */}
        <div
          data-testid="v-workflow-ai-caption"
          style={{
            position: "absolute",
            left: `${(GEN_CX / VB_W) * 100}%`,
            top: `${((GEN_CY + NODE_H / 2 + 30) / VB_H) * 100}%`,
            transform: "translate(-50%, 0)",
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.26em",
            color: "var(--neutral-400)",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            opacity: generateOn ? 0.95 : 0,
            transition: "opacity 400ms var(--ease)",
            transitionDelay: generateOn ? "300ms" : "0ms",
          }}
        >
          {aiCaption}
        </div>

        {/* Recursive loop-back arrow — opt-in, overlays the diagram area. */}
        {showLoopBack && (
          <div
            data-testid="v-loop-back-overlay"
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
            }}
          >
            <C4LoopBackArrow on={showLoopBack} />
          </div>
        )}
      </div>
    </div>
  );
}

// ─── NodeIcon — 20×20 line glyph centered above the node label. ───
type NodeIconKind = "specify" | "generate" | "verify" | "ship";

function NodeIcon({ kind }: { kind: NodeIconKind }) {
  const common = {
    width: 20,
    height: 20,
    viewBox: "0 0 20 20",
    fill: "none",
    stroke: "var(--copper-300)",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (kind) {
    case "specify":
      // brief-and-pen: page rectangle + diagonal pen
      return (
        <svg {...common} aria-hidden>
          <rect x="3" y="3" width="10" height="13" rx="1" />
          <line x1="5.5" y1="6.5" x2="10.5" y2="6.5" />
          <line x1="5.5" y1="9" x2="10.5" y2="9" />
          <line x1="5.5" y1="11.5" x2="9" y2="11.5" />
          {/* pen */}
          <path d="M13 13 L17 17" />
          <path d="M12.3 13.7 L13.7 12.3 L17 15.5 L15.5 17 Z" />
        </svg>
      );
    case "generate":
      // gears: two interlocking gear circles (simplified)
      return (
        <svg {...common} aria-hidden>
          <circle cx="7.5" cy="8.5" r="3" />
          <line x1="7.5" y1="4.5" x2="7.5" y2="3" />
          <line x1="7.5" y1="14" x2="7.5" y2="12.5" />
          <line x1="3.5" y1="8.5" x2="2" y2="8.5" />
          <line x1="11.5" y1="8.5" x2="13" y2="8.5" />
          <circle cx="14" cy="14" r="2.2" />
          <line x1="14" y1="11" x2="14" y2="10" />
          <line x1="14" y1="18" x2="14" y2="17" />
          <line x1="11" y1="14" x2="10" y2="14" />
          <line x1="18" y1="14" x2="17" y2="14" />
        </svg>
      );
    case "verify":
      // shield-check
      return (
        <svg {...common} aria-hidden>
          <path d="M10 2.5 L16 5 L16 10 C16 13.5 13.5 16 10 17.5 C6.5 16 4 13.5 4 10 L4 5 Z" />
          <polyline points="7,10 9.5,12.5 13.5,7.5" />
        </svg>
      );
    case "ship":
      // rocket silhouette
      return (
        <svg {...common} aria-hidden>
          <path d="M10 2 C12.5 4.5 13.5 7.5 13.5 10.5 L13.5 13 L6.5 13 L6.5 10.5 C6.5 7.5 7.5 4.5 10 2 Z" />
          <circle cx="10" cy="8" r="1.3" />
          <path d="M6.5 11 L4 13 L4 16 L7 14.5" />
          <path d="M13.5 11 L16 13 L16 16 L13 14.5" />
          <path d="M8.5 14 L8.5 17 M11.5 14 L11.5 17 M10 14 L10 18" />
        </svg>
      );
  }
}

// ─── VNode — a single labeled box. Absolutely positioned by viewBox-% so it
// scales with the parent's aspect-fit SVG. ───
function VNode({
  cx,
  cy,
  label,
  caption,
  on,
  tone,
  icon,
  testId,
  hovered,
  onHoverChange,
  hoverLines,
  hoverSide,
}: {
  cx: number;
  cy: number;
  label: string;
  caption: string;
  on: boolean;
  tone: "human" | "ai";
  icon: NodeIconKind;
  testId: string;
  hovered: boolean;
  onHoverChange: (hovered: boolean) => void;
  hoverLines: readonly [string, string];
  hoverSide: "left" | "right";
}) {
  // tone="human" → copper-700 border, slightly brighter label
  // tone="ai"    → copper-400 dimmer border to signal AI-led step
  const borderColor =
    tone === "human" ? "var(--copper-700)" : "var(--copper-400)";
  const labelColor =
    tone === "human" ? "var(--neutral-50)" : "var(--copper-200)";

  const style: CSSProperties = {
    position: "absolute",
    left: `${(cx / VB_W) * 100}%`,
    top: `${(cy / VB_H) * 100}%`,
    transform: `translate(-50%, -50%) ${on ? "scale(1)" : "scale(0.92)"}`,
    transformOrigin: "center center",
    width: NODE_W,
    minHeight: NODE_H,
    border: `1px solid ${borderColor}`,
    background: "rgba(10,6,4,0.6)",
    padding: "10px 14px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    opacity: on ? 1 : 0,
    transition:
      "opacity 500ms var(--ease), transform 500ms var(--ease)",
    boxShadow: tone === "human" ? "inset 0 0 0 1px rgba(122,70,38,0.18)" : "none",
    pointerEvents: on ? "auto" : "none",
    cursor: "default",
  };

  return (
    <div
      data-testid={testId}
      style={style}
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
    >
      {/* Icon — 20×20 line glyph, centered above the label with ~6px gap */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 2,
          height: 20,
        }}
      >
        <NodeIcon kind={icon} />
      </div>
      <span
        style={{
          fontFamily: "var(--mono)",
          fontSize: 13,
          letterSpacing: "0.26em",
          color: labelColor,
          textTransform: "uppercase",
          fontWeight: 500,
        }}
      >
        {label}
      </span>
      {caption && (
        <span
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 12,
            color: "var(--neutral-400)",
            textAlign: "center",
            lineHeight: 1.25,
          }}
        >
          {caption}
        </span>
      )}

      {/* 2-line hover caption — surfaces beside the node when hovered. */}
      <div
        data-testid={`${testId}-hover`}
        style={{
          position: "absolute",
          top: "50%",
          [hoverSide === "right" ? "left" : "right"]: "calc(100% + 12px)",
          transform: `translateY(-50%) ${hovered ? "translateX(0)" : `translateX(${hoverSide === "right" ? "-4px" : "4px"})`}`,
          minWidth: 180,
          maxWidth: 240,
          padding: "8px 12px",
          background: "rgba(10,6,4,0.92)",
          border: "1px solid var(--copper-700)",
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontSize: 12,
          lineHeight: 1.35,
          color: "var(--neutral-200)",
          textAlign: hoverSide === "right" ? "left" : "right",
          opacity: hovered ? 1 : 0,
          pointerEvents: "none",
          transition: "opacity 200ms var(--ease), transform 200ms var(--ease)",
          zIndex: 2,
          whiteSpace: "normal",
        }}
      >
        <div>{hoverLines[0]}</div>
        <div style={{ color: "var(--neutral-400)", marginTop: 2 }}>
          {hoverLines[1]}
        </div>
      </div>
    </div>
  );
}

// SHIP marker — small caps tag anchored just past the arrowhead.
function ShipMarker({
  x,
  y,
  label,
  on,
}: {
  x: number;
  y: number;
  label: string;
  on: boolean;
}) {
  return (
    <div
      data-testid="v-ship-label"
      style={{
        position: "absolute",
        left: `${(x / VB_W) * 100}%`,
        top: `${(y / VB_H) * 100}%`,
        transform: "translate(8px, -50%)",
        fontFamily: "var(--mono)",
        fontSize: 12,
        letterSpacing: "0.26em",
        color: "var(--copper-300)",
        textTransform: "uppercase",
        opacity: on ? 1 : 0,
        transition: "opacity 360ms var(--ease)",
        transitionDelay: on ? "640ms" : "0ms",
        display: "flex",
        alignItems: "center",
        gap: 6,
      }}
    >
      <NodeIcon kind="ship" />
      <span>{label}</span>
    </div>
  );
}
