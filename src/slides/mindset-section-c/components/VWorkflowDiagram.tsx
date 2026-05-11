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
// inbound/outbound line as a single beat.
//
// The visual rhyme: work *descends* into Generate (AI takes over), then
// *ascends* back into Verify (human resumes). Side captions above/below the
// V explicitly label the human vs AI work.
//
// Used by C.4 only. Step gates are passed in via the `on*` flags so the
// parent slide owns the step-reveal sequencing.
import type { CSSProperties, ReactNode } from "react";

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

export interface VWorkflowNode {
  label: string;
  caption: string;
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
}

// stepIndex semantics (passed in by C.4):
//   < 0  : nothing visible
//   ≥ 0  : SPECIFY + connecting line 1 draw
//   ≥ 1  : GENERATE appears (line 1 finished; line 2 draws toward VERIFY)
//   ≥ 2  : VERIFY appears + SHIP arrow draws

export function VWorkflowDiagram({
  nodes,
  humanCaption,
  aiCaption,
  stepIndex,
}: VWorkflowDiagramProps) {
  const specifyOn = stepIndex >= 0;
  const line1On = stepIndex >= 0;
  const generateOn = stepIndex >= 1;
  const line2On = stepIndex >= 1;
  const verifyOn = stepIndex >= 2;
  const shipOn = stepIndex >= 2;

  const specify = nodes[0];
  const generate = nodes[1];
  const verify = nodes[2];
  const ship = nodes[3];

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
          {/* SPECIFY → GENERATE diagonal */}
          <line
            data-testid="v-line-specify-generate"
            x1={LINE1_X1}
            y1={LINE1_Y1}
            x2={LINE1_X2}
            y2={LINE1_Y2}
            stroke="var(--copper-300)"
            strokeWidth={1.6}
            strokeLinecap="round"
            strokeDasharray={LINE1_LEN}
            strokeDashoffset={line1On ? 0 : LINE1_LEN}
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
            stroke="var(--copper-300)"
            strokeWidth={1.6}
            strokeLinecap="round"
            strokeDasharray={LINE2_LEN}
            strokeDashoffset={line2On ? 0 : LINE2_LEN}
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
            strokeWidth={1.6}
            strokeLinecap="round"
            strokeDasharray={SHIP_LEN}
            strokeDashoffset={shipOn ? 0 : SHIP_LEN}
            style={{
              transition: "stroke-dashoffset 500ms var(--ease)",
              transitionDelay: shipOn ? "200ms" : "0ms",
            }}
          />
          {/* SHIP arrowhead */}
          <polyline
            data-testid="v-ship-head"
            points={`${SHIP_END_X - 10},${SHIP_END_Y - 6} ${SHIP_END_X},${SHIP_END_Y} ${SHIP_END_X - 10},${SHIP_END_Y + 6}`}
            fill="none"
            stroke="var(--copper-400)"
            strokeWidth={1.6}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              opacity: shipOn ? 1 : 0,
              transition: "opacity 240ms var(--ease)",
              transitionDelay: shipOn ? "560ms" : "0ms",
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
          testId="v-node-specify"
        />
        {/* GENERATE node */}
        <VNode
          cx={GEN_CX}
          cy={GEN_CY}
          label={generate?.label ?? "GENERATE"}
          caption={generate?.caption ?? ""}
          on={generateOn}
          tone="ai"
          testId="v-node-generate"
        />
        {/* VERIFY node */}
        <VNode
          cx={VER_CX}
          cy={VER_CY}
          label={verify?.label ?? "VERIFY"}
          caption={verify?.caption ?? ""}
          on={verifyOn}
          tone="human"
          testId="v-node-verify"
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
      </div>
    </div>
  );
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
  testId,
}: {
  cx: number;
  cy: number;
  label: string;
  caption: string;
  on: boolean;
  tone: "human" | "ai";
  testId: string;
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
  };

  return (
    <div data-testid={testId} style={style}>
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
      }}
    >
      {label}
    </div>
  );
}
