// F.8 — YOUR AGENTIC OS (Section F coronation slide)
//
// Spec section 11. The crown-jewel synthesis slide of Section F. Pre-figures
// Section J (adoption — INDIVIDUAL track) and Section I (Hook 2 reveal).
// Carries the deck's most-loaded private context: AI as portable adaptability
// for talent that may be redeployed (per memory). The closing tagline
// "this is yours — wherever you go, you carry it." appears EXACTLY ONCE in
// the entire deck.
//
// Layout (full-stage 1280×720, NOT 480/660 split):
//   • FigLabel top-left
//   • Centered headline "Your Agentic OS" (display, copper-200)
//   • Horizontal FacetStrip beneath headline
//   • Copper rule (40% width) beneath strip
//   • LEFT half: AgenticOSStack (9 layers, bottom-up assembly)
//   • RIGHT half: 4 OutputCards stacked vertically
//   • SVG connection lines bridging stack → cards (clip-path inset reveal)
//   • Bottom-centered closing italic tagline (reveal step 12)
//
// Step axis (13 steps; canonicalPose = 12):
//   0  → headline + facet strip + copper rule visible; stack + outputs empty
//   1  → "COMPONENTS" facet lights up; CLAUDE.md foundation appears
//   2  → TOOLS (MCP) layer slides in
//   3  → PEOPLE layer
//   4  → DATA layer
//   5  → HOOKS layer
//   6  → SKILLS layer
//   7  → AGENTS layer
//   8  → HUMAN IN LOOP layer
//   9  → ORCHESTRATION layer (full stack assembled)
//   10 → "OUTPUTS" facet lights up; 4 OutputCards fade in as a group
//   11 → Connection lines from stack to cards draw in (clip-path inset)
//   12 → "PORTABLE" facet lights up; closing italic tagline reveals
//   13 → "BUILD INCREMENTAL" facet lights up (soft bridge to Section J)
//
// Pacing: ~3–5 minutes. Speaker pauses on each layer addition.
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { Reveal, CopperRule } from "./components/Reveal";
import { FacetStrip } from "./components/FacetStrip";
import { AgenticOSStack } from "./components/AgenticOSStack";
import { OutputCard, type OutputCardKind } from "./components/OutputCard";
import { f8Content as C } from "./content";

// ───────────────────── geometry ─────────────────────
//
// 1280×720 stage.
// Top band: FigLabel(20–48), Headline center(~70–130), FacetStrip(~150),
// Rule(~178). Main visual band: ~210–580. Tagline: ~615–680.
//
// LEFT visual: AgenticOSStack horizontally centered around x=300.
//   width 340 → left=130, right=470
// RIGHT visual: 4 OutputCards horizontally aligned with left=820, right=1080.
//
// Stack vertical: 9 bars × 44 + 8 gaps × 6 = 444. Visual band ~370 → tight
// but the bar height + gap stack is what spec asked for. We position the
// stack vertically centered in the band by using top=190 (so top-of-stack
// at 190, bottom at 190+444=634 — fits cleanly above the tagline).
//
// Output cards vertical: 4 cards × 100 + 3 gaps × 16 = 448 → top=188,
// bottom=636 — visually aligned with the stack's vertical extent.

// Connection-line endpoints — bottom-aligned to the visual stack rows.
// We use measured centers of the matched stack rows + matched cards.
//
// In the stack, rows are rendered top-to-bottom = ORCH, HUMAN, AGENTS,
// SKILLS, HOOKS, DATA, PEOPLE, TOOLS, CLAUDE.md.
// (renderOrder = reverse of bottom-up data array).
//
// Per spec §11.3 ASCII, connection mapping (top-to-bottom in render order):
//   ORCHESTRATION row    → DAILY DIGEST card
//   AGENTS row           → TASKS card
//   SKILLS row           → SCHEDULE card
//   DATA row             → MEMORIES card
//
// We compute Y per row from the stack-top + (rowIndexFromTop × pitch),
// where pitch = 44 + 6 = 50 and offset to row center = 22.
const STACK_TOP = 190;
const STACK_X_RIGHT = 470; // right edge of the 340-wide stack at x=130
const STACK_ROW_PITCH = 50;
const STACK_ROW_HALF = 22;

// In render order (top → bottom):
//   0=ORCHESTRATION, 1=HUMAN IN LOOP, 2=AGENTS, 3=SKILLS, 4=HOOKS,
//   5=DATA, 6=PEOPLE, 7=TOOLS, 8=CLAUDE.md
const ROW_INDEX_BY_LAYER_ID: Record<string, number> = {
  orchestration: 0,
  "human-in-loop": 1,
  agents: 2,
  skills: 3,
  hooks: 4,
  data: 5,
  people: 6,
  tools: 7,
  "claude-md": 8,
};

const CARD_TOP = 188;
const CARD_X_LEFT = 820;
const CARD_PITCH = 100 + 16;
const CARD_HALF = 50;

// Mapping: card index → stack layer id it connects to.
const CARD_TO_LAYER: { cardIdx: number; layerId: string }[] = [
  { cardIdx: 0, layerId: "orchestration" }, // DAILY DIGEST
  { cardIdx: 1, layerId: "agents" },         // TASKS
  { cardIdx: 2, layerId: "skills" },         // SCHEDULE
  { cardIdx: 3, layerId: "data" },           // MEMORIES
];

function lineCoords(cardIdx: number, layerId: string) {
  const fromX = STACK_X_RIGHT;
  const fromY =
    STACK_TOP + ROW_INDEX_BY_LAYER_ID[layerId] * STACK_ROW_PITCH + STACK_ROW_HALF;
  const toX = CARD_X_LEFT;
  const toY = CARD_TOP + cardIdx * CARD_PITCH + CARD_HALF;
  // Midpoint for an elbow path: horizontal then vertical then horizontal.
  const midX = (fromX + toX) / 2;
  return { fromX, fromY, toX, toY, midX };
}

// ───────────────────── slide ─────────────────────

export function F8YourAgenticOs() {
  const { stepIndex } = useDeck();

  // FacetStrip activeStep mapping — see header comment for full table.
  // -1 = none, 0 = COMPONENTS, 1 = OUTPUTS, 2 = PORTABLE, 3 = BUILD INCREMENTAL.
  let facetActive = -1;
  if (stepIndex >= 1) facetActive = 0;
  if (stepIndex >= 10) facetActive = 1;
  if (stepIndex >= 12) facetActive = 2;
  if (stepIndex >= 13) facetActive = 3;

  // Stack activeStep — step 1 reveals layer 0, step 9 reveals layer 8.
  const stackActiveStep = Math.min(8, Math.max(-1, stepIndex - 1));

  const showOutputs = stepIndex >= 10;
  const showConnections = stepIndex >= 11;
  const showTagline = stepIndex >= 12;

  const facetStripItems = C.facetStrip.map((f) => f.label);

  return (
    <>
      <FigLabel section="F" num={8} label="YOUR AGENTIC OS" />

      {/* ── Top band: headline + facet strip + copper rule ── */}
      <div
        style={{
          position: "absolute",
          top: 70,
          left: 48,
          right: 48,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 14,
        }}
      >
        <h1
          data-testid="f8-headline"
          style={{
            fontFamily: "var(--display)",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: 56,
            lineHeight: 1.0,
            letterSpacing: "-0.01em",
            color: "var(--copper-200)",
            margin: 0,
            textAlign: "center",
          }}
        >
          {highlight(C.headline, C.headlineKw)}
        </h1>

        <FacetStrip items={facetStripItems} activeStep={facetActive} />

        <CopperRule on width="40%" />
      </div>

      {/* ── LEFT half: AgenticOSStack ── */}
      <div
        data-testid="f8-stack-pane"
        style={{
          position: "absolute",
          left: 130,
          top: STACK_TOP,
        }}
      >
        <AgenticOSStack
          layers={C.stack.map((l) => ({
            id: l.id,
            name: l.label,
            caption: l.caption,
            popover: l.popover,
          }))}
          activeStep={stackActiveStep}
        />
      </div>

      {/* ── RIGHT half: OutputCards ── */}
      <div
        data-testid="f8-outputs-pane"
        style={{
          position: "absolute",
          left: CARD_X_LEFT,
          top: CARD_TOP,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {C.outputs.map((o, i) => (
          <OutputCard
            key={o.id}
            kind={o.kind as OutputCardKind}
            title={o.title}
            subtitle={o.subtitle}
            body={o.body}
            popover={o.popover}
            on={showOutputs}
            delay={80 + i * 90}
          />
        ))}
      </div>

      {/* ── Connection lines (SVG overlay, behind hover popovers) ── */}
      <svg
        data-testid="f8-connections"
        viewBox="0 0 1280 720"
        width={1280}
        height={720}
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 5,
        }}
        aria-hidden="true"
      >
        <defs>
          {/* Clip-path inset reveals — drawn left → right with a 600ms total
              window. Each line's clip animates from inset(0 100% 0 0) → 0. */}
          {CARD_TO_LAYER.map((_m, i) => (
            <clipPath
              key={`clip-${i}`}
              id={`f8-line-clip-${i}`}
              clipPathUnits="userSpaceOnUse"
            >
              <rect
                className={`f8-line-rect ${
                  showConnections ? "drawn" : ""
                }`}
                style={{
                  // 600ms total / 4 lines → ~150ms stagger
                  transitionDelay: `${i * 120}ms`,
                }}
                x={0}
                y={0}
                width={1280}
                height={720}
              />
            </clipPath>
          ))}
        </defs>
        {CARD_TO_LAYER.map((m, i) => {
          const { fromX, fromY, toX, toY, midX } = lineCoords(
            m.cardIdx,
            m.layerId,
          );
          // Elbow path: from (fromX,fromY) → (midX,fromY) → (midX,toY) → (toX,toY)
          const d = `M ${fromX} ${fromY} L ${midX} ${fromY} L ${midX} ${toY} L ${toX} ${toY}`;
          return (
            <g key={`line-${i}`} clipPath={`url(#f8-line-clip-${i})`}>
              <path
                d={d}
                stroke="var(--copper-400)"
                strokeWidth={1}
                fill="none"
                opacity={0.85}
              />
              {/* Arrow head at the card-end */}
              <circle
                cx={toX}
                cy={toY}
                r={2.5}
                fill="var(--copper-200)"
              />
            </g>
          );
        })}
        <style>{`
          .f8-line-rect {
            transform: translateX(-100%);
            transition: transform 480ms var(--ease);
          }
          .f8-line-rect.drawn {
            transform: translateX(0);
          }
        `}</style>
      </svg>

      {/* ── Bottom-centered closing tagline (step 12) ── */}
      <div
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          bottom: 50,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Reveal on={showTagline} delay={120} data-testid="f8-tagline">
          <p
            style={{
              fontFamily: "var(--display)",
              fontStyle: "italic",
              fontSize: 36,
              lineHeight: 1.15,
              color: "var(--copper-200)",
              margin: 0,
              textAlign: "center",
              letterSpacing: "-0.005em",
            }}
          >
            {highlight(C.tagline, C.taglineKw)}
          </p>
        </Reveal>
      </div>
    </>
  );
}

// ───────────────────── slide def ─────────────────────

export const f8Slide: SlideDef = {
  steps: 14,
  canonicalPose: 12,
  animationMode: "step-reveal",
  surface: "dark",
  section: "F",
  render: () => <F8YourAgenticOs />,
};
