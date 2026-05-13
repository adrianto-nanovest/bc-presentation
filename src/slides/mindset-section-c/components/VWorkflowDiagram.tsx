// VWorkflowDiagram — V-shaped workflow diagram used on C.4.
//
// Four node boxes form a downward V that bounces out to SHIP IT:
//   SPECIFY  (top-left peak,   copper-700 border)          ←  human
//          ↘  "Human → AI"
//        GENERATE  (bottom of V, copper-400 dimmer border) ←  AI
//          ↗  "AI → Human"
//   VERIFY  (top-right peak,   copper-700 border)          ←  human
//          →
//   SHIP IT (right of VERIFY,  copper-400 border + sonar ping)
//
// Step semantics (v5 — 2026-05-13) —
//   On first mount with stepIndex === 0 the diagram runs an internal
//   AUTO-STAGGER reveal: each element group fades in sequentially over
//   ≈2.6s (SPECIFY → SPEC→GEN arrow + GEN → GEN→VER arrow + VERIFY →
//   VER→SHIP arrow + SHIP IT → ITERATE line + label). Once stepIndex ≥ 1
//   the diagram is fully revealed in one shot — no further animation.
//   The slide's other reveals (BEFORE/AFTER bars, footer) are gated by
//   the parent slide, not by this component.
//
// Arrow geometry (v5) — connector endpoints are computed from the
// **measured rendered bounding boxes** of the four node divs (via refs),
// so the arrowhead tips touch the destination box edges *exactly*
// regardless of container width / height variations. Endpoints use
// explicit center-edge anchors (not corners):
//   SPECIFY → GENERATE: SPECIFY center-bottom → GENERATE center-left
//   GENERATE → VERIFY:  GENERATE center-right → VERIFY center-bottom
//   VERIFY → SHIP IT:   VERIFY right-center   → SHIP IT center-left
// Arrowhead markers (refX=9 inside a 10-wide marker box) place the marker
// tip exactly at the line's endpoint.
//
// Arrow labels — mono-caps copper-300 micro-labels sit perpendicular to
// each diagonal midpoint ("Human → AI" on SPEC→GEN, "AI → Human" on
// GEN→VER) so the human/AI handoff direction reads at a glance.
//
// SHIP IT — a full VNode with a "ship" tone (copper-400 border, rocket
// icon, label "SHIP IT"). A subtle copper sonar-ping ring sits behind
// the box and pulses indefinitely once the node is revealed, giving the
// terminus an "active" feel without breaking the four-state visual rhyme.
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import C4LoopBackArrow from "./C4LoopBackArrow";

// ─── Layout fractions (relative to container width / height) ───
// Node center positions as fractions of the container width / height.
// (Previously these lived in a 1000×400 viewBox; we now use fractions so
// the same %s drive both the absolutely-positioned divs and the SVG
// connector endpoints computed in container-pixel coords.)
//
// Horizontal layout (v5 — compact): the V is tightened so the four
// state nodes sit close together (Adri's feedback: "distance between
// boxes is too wide"). SPECIFY/GENERATE/VERIFY/SHIP land at 20/42/64/86
// — even ~22% gaps that read as a compact V plus a SHIP-IT terminus,
// all inside the ≤1080px stage band.
// Vertical layout: SPECIFY / VERIFY / SHIP peaks sit at y=18%, GENERATE
// trough at y=55%. This leaves ~30% of vertical room below GENERATE for
// the recursive iterate line to render cleanly without overlapping the
// GENERATE caption.
const SPEC_CX_FRAC = 0.2;
const SPEC_CY_FRAC = 0.18;
const GEN_CX_FRAC = 0.42;
const GEN_CY_FRAC = 0.55;
const VER_CX_FRAC = 0.64;
const VER_CY_FRAC = 0.18;
// SHIP IT node sits to the right of VERIFY at the same y row.
const SHIP_CX_FRAC = 0.86;
const SHIP_CY_FRAC = 0.18;

// Node box dims (CSS px).
const NODE_W = 200;
const NODE_H = 64;
// Sonar ping radius behind the SHIP IT node (CSS px) — sized so the ring
// extends ~14px past the box's longest axis (200px wide → radius 114).
const SHIP_PING_R = 114;

// Lane hairline y — splits HUMAN WORK (above) from AI WORK (below).
// Sits roughly midway between the V peaks and trough.
const LANE_HAIRLINE_FRAC = 0.36;

// Iterate line offset below GENERATE box bottom (CSS px). The line is
// drawn below the V structure by the C4LoopBackArrow overlay.

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
  /** Caption below the GENERATE node: AI WORK: GENERATE (bulk).
   *  Kept in the prop signature for backward compatibility, but no
   *  longer rendered — it overlapped the GENERATE card per Image #11. */
  aiCaption?: ReactNode;
  /** stepIndex from the deck. Unused by this component (the diagram is
   *  fully visible on load); kept in the signature so the parent slide
   *  can still pass it without a type error. */
  stepIndex?: number;
  /** When true, render a faint copper-900 hairline across the diagram
   *  between the V peaks and trough to mark the human/AI lane split. */
  showLaneHairline?: boolean;
  /** When true, render the recursive VERIFY → SPECIFY iterate line. */
  showLoopBack?: boolean;
}

interface Endpoints {
  /** SPECIFY → GENERATE diagonal */
  line1: { x1: number; y1: number; x2: number; y2: number };
  /** GENERATE → VERIFY diagonal */
  line2: { x1: number; y1: number; x2: number; y2: number };
  /** VERIFY → SHIP IT shaft */
  shipShaft: { x1: number; y1: number; x2: number; y2: number };
  /** Container dims (used to size the SVG viewBox 1:1 with the DOM) */
  width: number;
  height: number;
}

export function VWorkflowDiagram({
  nodes,
  humanCaption,
  stepIndex = 0,
  showLaneHairline = false,
  showLoopBack = false,
}: VWorkflowDiagramProps) {
  const specify = nodes[0];
  const generate = nodes[1];
  const verify = nodes[2];
  const ship = nodes[3];

  // Container ref — drives endpoint recomputation on resize.
  const stageRef = useRef<HTMLDivElement | null>(null);
  // Node refs — used to measure their actual bounding boxes.
  const specRef = useRef<HTMLDivElement | null>(null);
  const genRef = useRef<HTMLDivElement | null>(null);
  const verRef = useRef<HTMLDivElement | null>(null);
  const shipRef = useRef<HTMLDivElement | null>(null);

  const [endpoints, setEndpoints] = useState<Endpoints | null>(null);

  // ─── Auto-stagger reveal sequence (v5) ───
  // On first mount, the 5 element groups fade in sequentially. Each stage
  // advances at a fixed cadence relative to mount:
  //   stage 1 (T+200ms):  SPECIFY box
  //   stage 2 (T+700ms):  SPECIFY→GENERATE arrow + GENERATE box + "Human → AI" label
  //   stage 3 (T+1200ms): GENERATE→VERIFY arrow + VERIFY box + "AI → Human" label
  //   stage 4 (T+1700ms): VERIFY→SHIP arrow + SHIP IT node
  //   stage 5 (T+2200ms): ITERATE line + ITERATE label
  // Once stepIndex ≥ 1 (user advances past load) the diagram is fully
  // revealed in one shot — no further animation needed.
  const [revealStage, setRevealStage] = useState<number>(
    stepIndex >= 1 ? 5 : 0,
  );
  useEffect(() => {
    if (stepIndex >= 1) {
      // Past-load — ensure everything is shown immediately.
      setRevealStage(5);
      return;
    }
    // First load (or back to step 0) — run the stagger.
    setRevealStage(0);
    const timers = [
      window.setTimeout(() => setRevealStage(1), 200),
      window.setTimeout(() => setRevealStage(2), 700),
      window.setTimeout(() => setRevealStage(3), 1200),
      window.setTimeout(() => setRevealStage(4), 1700),
      window.setTimeout(() => setRevealStage(5), 2200),
    ];
    return () => {
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [stepIndex]);

  // Per-element opacity gates derived from revealStage.
  const specOn = revealStage >= 1;
  const line1On = revealStage >= 2;
  const genOn = revealStage >= 2;
  const line2On = revealStage >= 3;
  const verOn = revealStage >= 3;
  const shipShaftOn = revealStage >= 4;
  const shipOn = revealStage >= 4;
  const loopOn = revealStage >= 5;

  // Compute connector endpoints from the actual rendered node positions.
  // Runs once after layout, then again on resize.
  useLayoutEffect(() => {
    const compute = () => {
      const stage = stageRef.current;
      const sp = specRef.current;
      const gn = genRef.current;
      const vr = verRef.current;
      const sh = shipRef.current;
      if (!stage || !sp || !gn || !vr || !sh) return;
      const sBox = stage.getBoundingClientRect();
      const spBox = sp.getBoundingClientRect();
      const gnBox = gn.getBoundingClientRect();
      const vrBox = vr.getBoundingClientRect();
      const shBox = sh.getBoundingClientRect();

      // Convert each box to stage-local coords.
      const toLocal = (r: DOMRect) => ({
        left: r.left - sBox.left,
        right: r.right - sBox.left,
        top: r.top - sBox.top,
        bottom: r.bottom - sBox.top,
        cx: (r.left + r.right) / 2 - sBox.left,
        cy: (r.top + r.bottom) / 2 - sBox.top,
      });
      const sp2 = toLocal(spBox);
      const gn2 = toLocal(gnBox);
      const vr2 = toLocal(vrBox);
      const sh2 = toLocal(shBox);

      // Explicit border anchor points (v5):
      //   SPECIFY center-bottom → GENERATE center-left
      //   GENERATE center-right → VERIFY center-bottom
      //   VERIFY right-center   → SHIP IT center-left
      setEndpoints({
        line1: {
          x1: sp2.cx,
          y1: sp2.bottom,
          x2: gn2.left,
          y2: gn2.cy,
        },
        line2: {
          x1: gn2.right,
          y1: gn2.cy,
          x2: vr2.cx,
          y2: vr2.bottom,
        },
        shipShaft: {
          x1: vr2.right,
          y1: vr2.cy,
          x2: sh2.left,
          y2: sh2.cy,
        },
        width: sBox.width,
        height: sBox.height,
      });
    };

    // Initial measurement (after layout). Use a microtask + a delayed
    // pass to catch font-loading / late layout shifts.
    compute();
    const t = window.setTimeout(compute, 0);
    const t2 = window.setTimeout(compute, 50);

    const ro = new ResizeObserver(compute);
    if (stageRef.current) ro.observe(stageRef.current);

    window.addEventListener("resize", compute);
    return () => {
      window.clearTimeout(t);
      window.clearTimeout(t2);
      ro.disconnect();
      window.removeEventListener("resize", compute);
    };
  }, []);

  // hoveredNode tracks which of the four V-nodes is hovered (if any) so
  // the diagram can surface a 2-line caption beside it.
  const [hoveredNode, setHoveredNode] = useState<
    "specify" | "generate" | "verify" | "ship" | null
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
          opacity: 0.9,
        }}
      >
        {humanCaption}
      </div>

      {/* Stage area — nodes are absolutely positioned divs; SVG overlays
          provide the connectors using measured endpoints. */}
      <div
        ref={stageRef}
        style={{
          position: "relative",
          flex: "1 1 auto",
          width: "100%",
        }}
      >
        {/* SPECIFY node */}
        <VNode
          nodeRef={specRef}
          cxFrac={SPEC_CX_FRAC}
          cyFrac={SPEC_CY_FRAC}
          label={specify?.label ?? "SPECIFY"}
          caption={specify?.caption ?? ""}
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
          revealOn={specOn}
        />
        {/* GENERATE node */}
        <VNode
          nodeRef={genRef}
          cxFrac={GEN_CX_FRAC}
          cyFrac={GEN_CY_FRAC}
          label={generate?.label ?? "GENERATE"}
          caption={generate?.caption ?? ""}
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
          revealOn={genOn}
        />
        {/* VERIFY node */}
        <VNode
          nodeRef={verRef}
          cxFrac={VER_CX_FRAC}
          cyFrac={VER_CY_FRAC}
          label={verify?.label ?? "VERIFY"}
          caption={verify?.caption ?? ""}
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
          revealOn={verOn}
        />
        {/* SHIP IT node — a fourth state, paired with a sonar-ping ring
            behind it so the terminus reads as "active" without breaking
            the four-state visual rhyme. */}
        <ShipSonarPing cxFrac={SHIP_CX_FRAC} cyFrac={SHIP_CY_FRAC} revealOn={shipOn} />
        <VNode
          nodeRef={shipRef}
          cxFrac={SHIP_CX_FRAC}
          cyFrac={SHIP_CY_FRAC}
          label={ship?.label ?? "SHIP IT"}
          caption={ship?.caption ?? ""}
          tone="ship"
          icon="ship"
          testId="v-node-ship"
          hovered={hoveredNode === "ship"}
          onHoverChange={(h) => setHoveredNode(h ? "ship" : null)}
          hoverLines={
            ship?.hoverLines ?? [
              "Ship the result.",
              "Verified work goes out the door.",
            ]
          }
          hoverSide="left"
          revealOn={shipOn}
        />

        {/* SVG overlay — connectors, motion pulses, SHIP pulse circle.
            viewBox matches the container size 1:1 (in CSS px) so the
            endpoints we measured map directly to SVG coords. */}
        {endpoints && (
          <svg
            viewBox={`0 0 ${endpoints.width} ${endpoints.height}`}
            preserveAspectRatio="none"
            width="100%"
            height="100%"
            style={{
              position: "absolute",
              inset: 0,
              overflow: "visible",
              pointerEvents: "none",
            }}
            aria-hidden
          >
            <defs>
              {/* Shared filled triangular arrowhead — refX=9 places the
                  marker tip exactly at the line's endpoint. */}
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

            {/* Lane hairline — opt-in, splits HUMAN WORK from AI WORK. */}
            {showLaneHairline && (
              <line
                data-testid="v-lane-hairline"
                x1={0}
                y1={endpoints.height * LANE_HAIRLINE_FRAC}
                x2={endpoints.width}
                y2={endpoints.height * LANE_HAIRLINE_FRAC}
                stroke="var(--copper-900)"
                strokeWidth={1}
                opacity={0.4}
              />
            )}

            {/* SPECIFY → GENERATE diagonal + "Human → AI" handoff label */}
            {/* Draw animation: pathLength=1 + dasharray=1 lets us animate
                strokeDashoffset 1→0 to "draw" the line over 500ms when
                line1On flips true. Motion pulses fade in alongside. */}
            <g
              data-testid="v-arrow-1"
              style={{
                opacity: line1On ? 1 : 0,
                transition: "opacity 400ms var(--ease)",
              }}
            >
              <line
                data-testid="v-line-specify-generate"
                x1={endpoints.line1.x1}
                y1={endpoints.line1.y1}
                x2={endpoints.line1.x2}
                y2={endpoints.line1.y2}
                stroke="var(--copper-400)"
                strokeWidth={2.5}
                strokeLinecap="round"
                markerEnd="url(#v-arrowhead)"
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={line1On ? 0 : 1}
                style={{ transition: "stroke-dashoffset 500ms var(--ease)" }}
              />
              <ArrowMidLabel
                line={endpoints.line1}
                text="HUMAN → AI"
                side="above"
                testId="v-arrow-1-label"
              />
              {line1On &&
                [0, 0.4, 0.8].map((begin, i) => {
                  const path = `M ${endpoints.line1.x1} ${endpoints.line1.y1} L ${endpoints.line1.x2} ${endpoints.line1.y2}`;
                  return (
                    <circle
                      key={`pulse1-${i}-${path}`}
                      r="3"
                      fill="var(--copper-100)"
                      opacity="0"
                      style={{
                        filter: "drop-shadow(0 0 6px var(--copper-300))",
                      }}
                    >
                      <animateMotion
                        dur="1.6s"
                        repeatCount="indefinite"
                        begin={`${begin}s`}
                        path={path}
                      />
                      <animate
                        attributeName="opacity"
                        from="0"
                        to="1"
                        begin={`${begin}s`}
                        dur="0.01s"
                        fill="freeze"
                      />
                    </circle>
                  );
                })}
            </g>

            {/* GENERATE → VERIFY diagonal + "AI → Human" handoff label */}
            <g
              data-testid="v-arrow-2"
              style={{
                opacity: line2On ? 1 : 0,
                transition: "opacity 400ms var(--ease)",
              }}
            >
              <line
                data-testid="v-line-generate-verify"
                x1={endpoints.line2.x1}
                y1={endpoints.line2.y1}
                x2={endpoints.line2.x2}
                y2={endpoints.line2.y2}
                stroke="var(--copper-400)"
                strokeWidth={2.5}
                strokeLinecap="round"
                markerEnd="url(#v-arrowhead)"
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={line2On ? 0 : 1}
                style={{ transition: "stroke-dashoffset 500ms var(--ease)" }}
              />
              <ArrowMidLabel
                line={endpoints.line2}
                text="AI → HUMAN"
                side="above"
                testId="v-arrow-2-label"
              />
              {line2On &&
                [0, 0.4, 0.8].map((begin, i) => {
                  const path = `M ${endpoints.line2.x1} ${endpoints.line2.y1} L ${endpoints.line2.x2} ${endpoints.line2.y2}`;
                  return (
                    <circle
                      key={`pulse2-${i}-${path}`}
                      r="3"
                      fill="var(--copper-100)"
                      opacity="0"
                      style={{
                        filter: "drop-shadow(0 0 6px var(--copper-300))",
                      }}
                    >
                      <animateMotion
                        dur="1.6s"
                        repeatCount="indefinite"
                        begin={`${begin}s`}
                        path={path}
                      />
                      <animate
                        attributeName="opacity"
                        from="0"
                        to="1"
                        begin={`${begin}s`}
                        dur="0.01s"
                        fill="freeze"
                      />
                    </circle>
                  );
                })}
            </g>

            {/* VERIFY → SHIP IT shaft */}
            <g
              data-testid="v-arrow-ship"
              style={{
                opacity: shipShaftOn ? 1 : 0,
                transition: "opacity 400ms var(--ease)",
              }}
            >
              <line
                data-testid="v-ship-shaft"
                x1={endpoints.shipShaft.x1}
                y1={endpoints.shipShaft.y1}
                x2={endpoints.shipShaft.x2}
                y2={endpoints.shipShaft.y2}
                stroke="var(--copper-400)"
                strokeWidth={2.5}
                strokeLinecap="round"
                markerEnd="url(#v-arrowhead)"
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={shipShaftOn ? 0 : 1}
                style={{ transition: "stroke-dashoffset 500ms var(--ease)" }}
              />
              {shipShaftOn &&
                [0, 0.4, 0.8].map((begin, i) => {
                  const path = `M ${endpoints.shipShaft.x1} ${endpoints.shipShaft.y1} L ${endpoints.shipShaft.x2} ${endpoints.shipShaft.y2}`;
                  return (
                    <circle
                      key={`pulse-ship-${i}-${path}`}
                      r="3"
                      fill="var(--copper-100)"
                      opacity="0"
                      style={{
                        filter: "drop-shadow(0 0 6px var(--copper-300))",
                      }}
                    >
                      <animateMotion
                        dur="1.6s"
                        repeatCount="indefinite"
                        begin={`${begin}s`}
                        path={path}
                      />
                      <animate
                        attributeName="opacity"
                        from="0"
                        to="1"
                        begin={`${begin}s`}
                        dur="0.01s"
                        fill="freeze"
                      />
                    </circle>
                  );
                })}
            </g>
          </svg>
        )}

        {/* Recursive iterate line — overlays the diagram. Gated by loopOn
            so it fades in as the final stage of the auto-stagger. */}
        {showLoopBack && (
          <div
            data-testid="v-loop-back-overlay"
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
            }}
          >
            <C4LoopBackArrow on={loopOn} />
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
      return (
        <svg {...common} aria-hidden>
          <rect x="3" y="3" width="10" height="13" rx="1" />
          <line x1="5.5" y1="6.5" x2="10.5" y2="6.5" />
          <line x1="5.5" y1="9" x2="10.5" y2="9" />
          <line x1="5.5" y1="11.5" x2="9" y2="11.5" />
          <path d="M13 13 L17 17" />
          <path d="M12.3 13.7 L13.7 12.3 L17 15.5 L15.5 17 Z" />
        </svg>
      );
    case "generate":
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
      return (
        <svg {...common} aria-hidden>
          <path d="M10 2.5 L16 5 L16 10 C16 13.5 13.5 16 10 17.5 C6.5 16 4 13.5 4 10 L4 5 Z" />
          <polyline points="7,10 9.5,12.5 13.5,7.5" />
        </svg>
      );
    case "ship":
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

// ─── VNode — a single labeled box. Absolutely positioned by fraction
// (so it scales with the parent's actual rendered size). ───
function VNode({
  nodeRef,
  cxFrac,
  cyFrac,
  label,
  caption,
  tone,
  icon,
  testId,
  hovered,
  onHoverChange,
  hoverLines,
  hoverSide,
  revealOn = true,
}: {
  nodeRef: React.RefObject<HTMLDivElement>;
  cxFrac: number;
  cyFrac: number;
  label: string;
  caption: string;
  tone: "human" | "ai" | "ship";
  icon: NodeIconKind;
  testId: string;
  hovered: boolean;
  onHoverChange: (hovered: boolean) => void;
  hoverLines: readonly [string, string];
  hoverSide: "left" | "right";
  /** When false the node renders translucent (opacity 0) and lifted 8px
   *  below its final position; transitions to full opacity + 0 offset
   *  when toggled true. Default true keeps the node fully visible. */
  revealOn?: boolean;
}) {
  // Tones —
  //   human: copper-700 border, neutral-50 label (SPECIFY / VERIFY)
  //   ai:    copper-400 border, copper-200 label (GENERATE)
  //   ship:  copper-400 border, copper-200 label, slightly stronger
  //          background so the terminus reads as the "result" node.
  const borderColor =
    tone === "human" ? "var(--copper-700)" : "var(--copper-400)";
  const labelColor =
    tone === "human" ? "var(--neutral-50)" : "var(--copper-200)";
  const nodeBackground =
    tone === "ship" ? "rgba(184,110,61,0.10)" : "rgba(10,6,4,0.6)";

  // Combined transform: keep the (−50%,−50%) centering offset, then add
  // an 8px translateY when not yet revealed (so the node lifts into place).
  const baseTransform = "translate(-50%, -50%)";
  const revealTransform = revealOn
    ? baseTransform
    : `${baseTransform} translateY(8px)`;

  const style: CSSProperties = {
    position: "absolute",
    left: `${cxFrac * 100}%`,
    top: `${cyFrac * 100}%`,
    transform: revealTransform,
    transformOrigin: "center center",
    width: NODE_W,
    minHeight: NODE_H,
    border: `1px solid ${borderColor}`,
    background: nodeBackground,
    padding: "10px 14px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    boxShadow: tone === "human" ? "inset 0 0 0 1px rgba(122,70,38,0.18)" : "none",
    pointerEvents: revealOn ? "auto" : "none",
    cursor: "default",
    opacity: revealOn ? 1 : 0,
    transition:
      "opacity 400ms var(--ease), transform 400ms var(--ease)",
    willChange: "opacity, transform",
  };

  return (
    <div
      ref={nodeRef}
      data-testid={testId}
      style={style}
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
    >
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

// ─── ShipSonarPing — copper sonar ring rendered BEHIND the SHIP IT node.
// Gives the terminus an "active" / live feel without breaking the
// four-state visual rhyme: the SHIP IT box reads as a peer state, and
// the ping reads as ambient motion behind it. ───
function ShipSonarPing({
  cxFrac,
  cyFrac,
  revealOn = true,
}: {
  cxFrac: number;
  cyFrac: number;
  /** When false the ring renders at opacity 0; fades in (and starts the
   *  sonar animation) when toggled true. */
  revealOn?: boolean;
}) {
  // Inject the keyframes once via a global <style> tag (idempotent — the
  // browser dedupes identical keyframe definitions).
  useEffect(() => {
    const id = "v-ship-pulse-keyframes";
    if (document.getElementById(id)) return;
    const style = document.createElement("style");
    style.id = id;
    style.textContent = `
      @keyframes v-ship-sonar {
        0%   { transform: translate(-50%, -50%) scale(0.78); opacity: 0.45; }
        100% { transform: translate(-50%, -50%) scale(1.18); opacity: 0;    }
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <div
      data-testid="v-ship-sonar-ping"
      aria-hidden
      style={{
        position: "absolute",
        left: `${cxFrac * 100}%`,
        top: `${cyFrac * 100}%`,
        width: SHIP_PING_R * 2,
        height: SHIP_PING_R * 2,
        transform: "translate(-50%, -50%)",
        borderRadius: "50%",
        border: "1px solid var(--copper-400)",
        pointerEvents: "none",
        opacity: revealOn ? 1 : 0,
        transition: "opacity 400ms var(--ease)",
        // Only run the sonar animation once the ring is visible; this
        // avoids a stale animation cycle racing against the fade-in.
        animation: revealOn ? "v-ship-sonar 2.2s ease-out infinite" : "none",
        // Sit behind the SHIP IT VNode (which has its own stacking context
        // via opacity transitions). Pinning a negative z-index keeps the
        // ring under the box's solid background.
        zIndex: 0,
      }}
    />
  );
}

// ─── ArrowMidLabel — small mono-caps SVG <text> rendered perpendicular
// to a line's midpoint. Used for the "Human → AI" / "AI → Human" handoff
// micro-labels on the V's two diagonals. ───
function ArrowMidLabel({
  line,
  text,
  side = "above",
  testId,
}: {
  line: { x1: number; y1: number; x2: number; y2: number };
  text: string;
  /** Whether the label sits "above" the line (perpendicular toward y−) or
   *  "below" (perpendicular toward y+). Defaults to "above". */
  side?: "above" | "below";
  testId?: string;
}) {
  // Midpoint.
  const mx = (line.x1 + line.x2) / 2;
  const my = (line.y1 + line.y2) / 2;
  // Perpendicular unit vector (rotated 90°).
  const dx = line.x2 - line.x1;
  const dy = line.y2 - line.y1;
  const len = Math.hypot(dx, dy) || 1;
  // Rotating (dx,dy) by 90° CCW yields (−dy, dx). For "above" (toward y−)
  // we want the perpendicular component with a negative y; for "below"
  // we want a positive y.
  let nx = -dy / len;
  let ny = dx / len;
  if ((side === "above" && ny > 0) || (side === "below" && ny < 0)) {
    nx = -nx;
    ny = -ny;
  }
  const OFFSET = 14; // CSS px away from the line
  const tx = mx + nx * OFFSET;
  const ty = my + ny * OFFSET;

  // Rotate label to follow the line direction so the text reads along
  // the diagonal rather than dead-horizontal. Clamp the angle to keep
  // the text upright (no upside-down labels).
  let angleDeg = Math.atan2(dy, dx) * (180 / Math.PI);
  if (angleDeg > 90) angleDeg -= 180;
  if (angleDeg < -90) angleDeg += 180;

  return (
    <text
      data-testid={testId}
      x={tx}
      y={ty}
      fill="var(--copper-300)"
      fontFamily="var(--mono)"
      fontSize={10}
      letterSpacing="0.22em"
      textAnchor="middle"
      dominantBaseline="middle"
      transform={`rotate(${angleDeg.toFixed(2)} ${tx} ${ty})`}
      style={{ textTransform: "uppercase" }}
    >
      {text}
    </text>
  );
}
