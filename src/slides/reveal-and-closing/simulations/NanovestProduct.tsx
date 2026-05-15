import { motion } from "framer-motion";

// viewBox 1600 × 540 — four "AI Agent" group boxes in a horizontal row.
// PM column on the far-left feeds Agent 1; Confluence column on the far-right
// receives Agent 4. A dashed loop-back arc curves OVER the row from Agent 2's
// plan-reviewer back to Agent 1's brainstorm node ("loop or proceed").

type Box = { x: number; y: number; w: number; h: number };

const right = (b: Box) => ({ x: b.x + b.w, y: b.y + b.h / 2 });
const left = (b: Box) => ({ x: b.x, y: b.y + b.h / 2 });
const top = (b: Box) => ({ x: b.x + b.w / 2, y: b.y });
const bottom = (b: Box) => ({ x: b.x + b.w / 2, y: b.y + b.h });

// Append a V-shaped arrowhead at the end of a path's `d` string.
// `tangent` is the UNIT direction-of-travel vector at the endpoint
// (e.g. for L commands: end - prev; for C commands: end - c2).
function withArrow(
  d: string,
  end: { x: number; y: number },
  tangent: { x: number; y: number },
  size = 7,
): string {
  const px = -tangent.y;
  const py = tangent.x;
  const baseX = end.x - tangent.x * size;
  const baseY = end.y - tangent.y * size;
  const leftX = baseX + px * size * 0.55;
  const leftY = baseY + py * size * 0.55;
  const rightX = baseX - px * size * 0.55;
  const rightY = baseY - py * size * 0.55;
  return `${d} L ${leftX} ${leftY} L ${end.x} ${end.y} L ${rightX} ${rightY}`;
}

// Unit vector from a→b.
function unitVec(a: { x: number; y: number }, b: { x: number; y: number }) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  return { x: dx / len, y: dy / len };
}

// Group-box bounds — identical to StocksIntel / LegalDocs for visual rhyme.
const G1: Box = { x: 110, y: 50, w: 280, h: 460 };
const G2: Box = { x: 490, y: 50, w: 240, h: 460 };
const G3: Box = { x: 830, y: 50, w: 300, h: 460 };
const G4: Box = { x: 1230, y: 50, w: 280, h: 460 };

// PM trigger lives in its own vertical column to the left of G1.
const PM = { cx: 45, cy: 270, r: 18 };

// Confluence destination mirrors the trigger, far-right after Agent 4.
const APPS = { cx: 1555, cy: 270, r: 18 };

// ─── Agent 1 · DISCOVERY (brainstorm + research) ─────────────────────────
const A1_BRAINSTORM: Box = { x: G1.x + 20, y: G1.y + 60, w: G1.w - 40, h: 110 };
const A1_PHASES: Box = { x: G1.x + 20, y: G1.y + 190, w: G1.w - 40, h: 50 };
const A1_RESEARCH: Box = { x: G1.x + 30, y: G1.y + 270, w: G1.w - 60, h: 90 };
const A1_OUT: Box = { x: G1.x + 20, y: G1.y + 396, w: G1.w - 40, h: 40 };

// ─── Agent 2 · DRAFT (plan-reviewer → drafter → draft-reviewer) ───────────
const A2_INPUT: Box = { x: G2.x + 20, y: G2.y + 60, w: G2.w - 40, h: 30 };
const A2_PLAN_REVIEW: Box = { x: G2.x + 20, y: G2.y + 120, w: G2.w - 40, h: 70 };
const A2_DRAFTER: Box = { x: G2.x + 20, y: G2.y + 220, w: G2.w - 40, h: 100 };
const A2_DRAFT_REVIEW: Box = { x: G2.x + 20, y: G2.y + 350, w: G2.w - 40, h: 50 };
const A2_OUT: Box = { x: G2.x + 20, y: G2.y + 412, w: G2.w - 40, h: 32 };

// ─── Agent 3 · ENRICH (Figma + Flowchart parallel → Enricher) ─────────────
const A3_INPUT: Box = { x: G3.x + 20, y: G3.y + 50, w: G3.w - 40, h: 28 };
const A3_FIGMA: Box = { x: G3.x + 20, y: G3.y + 96, w: 124, h: 56 };
const A3_SCREENS: Box = { x: G3.x + 30, y: G3.y + 178, w: 104, h: 68 };
const A3_FLOW: Box = { x: G3.x + 156, y: G3.y + 96, w: 124, h: 56 };
const A3_FLOWGEN: Box = { x: G3.x + 156, y: G3.y + 178, w: 124, h: 50 };
const A3_ENRICHER: Box = { x: G3.x + 20, y: G3.y + 296, w: G3.w - 40, h: 86 };
const A3_OUT: Box = { x: G3.x + 20, y: G3.y + 412, w: G3.w - 40, h: 32 };

// ─── Agent 4 · PUBLISH (validate + converter, publish, jira + drive) ──────
const A4_INPUT: Box = { x: G4.x + 20, y: G4.y + 50, w: G4.w - 40, h: 28 };
const A4_VALIDATE: Box = { x: G4.x + 20, y: G4.y + 96, w: 110, h: 64 };
const A4_CONVERT: Box = { x: G4.x + 150, y: G4.y + 96, w: 110, h: 64 };
const A4_PUBLISH: Box = { x: G4.x + 20, y: G4.y + 190, w: G4.w - 40, h: 84 };
const A4_JIRA: Box = { x: G4.x + 20, y: G4.y + 310, w: 110, h: 110 };
const A4_DRIVE: Box = { x: G4.x + 150, y: G4.y + 310, w: 110, h: 110 };

export function NanovestProduct() {
  const revealLoop = (delay: number) => ({
    initial: { pathLength: 0 },
    animate: { pathLength: [0, 1, 1, 0] },
    transition: {
      duration: 9,
      repeat: Infinity,
      delay,
      times: [0, 0.45, 0.9, 1],
      ease: "easeInOut" as const,
    },
  });

  return (
    <div className="h-full w-full p-6">
      <svg viewBox="0 0 1600 540" className="h-full w-full">
        <defs>
          {/* Brainstorm → research-agent connector (particle path) */}
          <path
            id="np-a1-research-path"
            d={`M ${A1_BRAINSTORM.x + A1_BRAINSTORM.w / 2} ${A1_BRAINSTORM.y + A1_BRAINSTORM.h} C ${A1_BRAINSTORM.x + A1_BRAINSTORM.w / 2} ${A1_PHASES.y + A1_PHASES.h + 16}, ${A1_RESEARCH.x + A1_RESEARCH.w / 2} ${A1_PHASES.y + A1_PHASES.h + 16}, ${A1_RESEARCH.x + A1_RESEARCH.w / 2} ${A1_RESEARCH.y}`}
            fill="none"
          />
          {/* Figma → screen-analyzer parallel (particle path) */}
          <path
            id="np-a3-figma-path"
            d={`M ${A3_FIGMA.x + A3_FIGMA.w / 2} ${A3_FIGMA.y + A3_FIGMA.h} L ${A3_SCREENS.x + A3_SCREENS.w / 2} ${A3_SCREENS.y}`}
            fill="none"
          />
        </defs>

        {/* ─── PM trigger column ──────────────────────────────────────────── */}
        <g>
          <motion.circle
            cx={PM.cx}
            cy={PM.cy}
            r={PM.r}
            fill="none"
            stroke="var(--copper-300)"
            strokeWidth="1.5"
            initial={{ r: PM.r, opacity: 0.6 }}
            animate={{ opacity: [0.4, 1, 0.4], r: [PM.r, PM.r + 4, PM.r] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* tiny person glyph inside the circle */}
          <circle
            cx={PM.cx}
            cy={PM.cy - 4}
            r="3"
            fill="none"
            stroke="var(--copper-300)"
            strokeWidth="1"
          />
          <path
            d={`M ${PM.cx - 6} ${PM.cy + 7} C ${PM.cx - 6} ${PM.cy + 1}, ${PM.cx + 6} ${PM.cy + 1}, ${PM.cx + 6} ${PM.cy + 7}`}
            fill="none"
            stroke="var(--copper-300)"
            strokeWidth="1"
          />
          <text
            x={PM.cx}
            y={PM.cy + 42}
            textAnchor="middle"
            fill="#f5f5f5"
            fontFamily="JetBrains Mono"
            fontSize="11"
          >
            PM input
          </text>
          <text
            x={PM.cx}
            y={PM.cy + 56}
            textAnchor="middle"
            fill="#a3a3a3"
            fontFamily="JetBrains Mono"
            fontSize="9"
          >
            feature + metadata
          </text>
        </g>

        {/* PM → Agent 1 left edge (L-shaped, dashed) */}
        {(() => {
          const startX = PM.cx + PM.r;
          const cornerX = 90;
          const targetX = G1.x;
          const y = PM.cy;
          const tangent = unitVec({ x: cornerX, y }, { x: targetX, y });
          const d = withArrow(
            `M ${startX} ${y} L ${cornerX} ${y} L ${targetX} ${y}`,
            { x: targetX, y },
            tangent,
            5,
          );
          return (
            <motion.path
              d={d}
              stroke="var(--copper-700)"
              strokeWidth="1.2"
              strokeDasharray="4 4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              {...revealLoop(0.05)}
            />
          );
        })()}

        {/* ─── Group boxes + labels ───────────────────────────────────────── */}
        {[
          { box: G1, label: "DISCOVERY" },
          { box: G2, label: "DRAFT PRD" },
          { box: G3, label: "ENRICH PRD" },
          { box: G4, label: "PUBLISH PRD" },
        ].map((g) => (
          <g key={g.label}>
            <text
              x={g.box.x + 4}
              y={g.box.y - 14}
              fill="#d99e6c"
              fontFamily="JetBrains Mono"
              fontSize="11"
              letterSpacing="0.04em"
            >
              {g.label}
            </text>
            <rect
              x={g.box.x}
              y={g.box.y}
              width={g.box.w}
              height={g.box.h}
              fill="var(--neutral-900)"
              stroke="var(--copper-800)"
              strokeWidth="1.2"
              rx="6"
            />
          </g>
        ))}

        {/* ═══════════════════════════════════════════════════════════════════
            AGENT 1 · DISCOVERY  (brainstorm + research → session + plan)
           ═══════════════════════════════════════════════════════════════════ */}

        {/* prd-brainstorm (LLM, dominant — copper-300 strong) */}
        <rect
          x={A1_BRAINSTORM.x}
          y={A1_BRAINSTORM.y}
          width={A1_BRAINSTORM.w}
          height={A1_BRAINSTORM.h}
          fill="none"
          stroke="var(--copper-300)"
          strokeWidth="1.4"
          rx="6"
        />
        <text
          x={A1_BRAINSTORM.x + A1_BRAINSTORM.w / 2}
          y={A1_BRAINSTORM.y + 30}
          textAnchor="middle"
          fill="#f5f5f5"
          fontFamily="Source Serif 4"
          fontSize="14"
        >
          prd-brainstorm
        </text>
        <text
          x={A1_BRAINSTORM.x + A1_BRAINSTORM.w / 2}
          y={A1_BRAINSTORM.y + 50}
          textAnchor="middle"
          fill="#a3a3a3"
          fontFamily="Source Serif 4"
          fontStyle="italic"
          fontSize="10"
        >
          4-phase Q&amp;A
        </text>
        {/* 4 phase indicators (small bars in a row, labelled below) */}
        {Array.from({ length: 4 }).map((_, i) => {
          const barW = 36;
          const gap = 10;
          const totalW = 4 * barW + 3 * gap;
          const startX = A1_BRAINSTORM.x + (A1_BRAINSTORM.w - totalW) / 2;
          const bx = startX + i * (barW + gap);
          const by = A1_BRAINSTORM.y + 70;
          return (
            <g key={`a1-phase-${i}`}>
              <rect
                x={bx}
                y={by}
                width={barW}
                height={5}
                fill="var(--copper-500)"
                opacity={0.45 + i * 0.18}
                rx="1.5"
              />
              <text
                x={bx + barW / 2}
                y={by + 18}
                textAnchor="middle"
                fill="#a3a3a3"
                fontFamily="JetBrains Mono"
                fontSize="9"
              >
                {i + 1}
              </text>
            </g>
          );
        })}
        <text
          x={A1_BRAINSTORM.x + A1_BRAINSTORM.w / 2}
          y={A1_BRAINSTORM.y + A1_BRAINSTORM.h - 6}
          textAnchor="middle"
          fill="#d99e6c"
          fontFamily="JetBrains Mono"
          fontSize="8"
          letterSpacing="0.08em"
        >
          PHASE 1 · 2 · 3 · 4
        </text>

        {/* phases band caption (between brainstorm and research) */}
        <text
          x={A1_PHASES.x + A1_PHASES.w / 2}
          y={A1_PHASES.y + 14}
          textAnchor="middle"
          fill="#d99e6c"
          fontFamily="JetBrains Mono"
          fontSize="9"
          letterSpacing="0.08em"
        >
          OPEN · PATTERN · DEEP · WRAP
        </text>
        {/* tiny dotted timeline */}
        {Array.from({ length: 16 }).map((_, i) => (
          <circle
            key={`a1-tick-${i}`}
            cx={A1_PHASES.x + 8 + i * ((A1_PHASES.w - 16) / 15)}
            cy={A1_PHASES.y + 32}
            r="1.1"
            fill="var(--copper-700)"
            opacity={0.45 + (i % 4) * 0.12}
          />
        ))}

        {/* research-agent sub-node (copper-700 secondary) */}
        <rect
          x={A1_RESEARCH.x}
          y={A1_RESEARCH.y}
          width={A1_RESEARCH.w}
          height={A1_RESEARCH.h}
          fill="none"
          stroke="var(--copper-700)"
          strokeWidth="1"
          rx="4"
        />
        <text
          x={A1_RESEARCH.x + A1_RESEARCH.w / 2}
          y={A1_RESEARCH.y + 26}
          textAnchor="middle"
          fill="#f5f5f5"
          fontFamily="Source Serif 4"
          fontSize="12"
        >
          research-agent
        </text>
        <text
          x={A1_RESEARCH.x + A1_RESEARCH.w / 2}
          y={A1_RESEARCH.y + 44}
          textAnchor="middle"
          fill="#a3a3a3"
          fontFamily="JetBrains Mono"
          fontStyle="italic"
          fontSize="9"
        >
          WebSearch · MCP
        </text>
        {/* small tool badges */}
        {["web", "fetch", "conf"].map((t, i) => {
          const bw = 36;
          const gap = 6;
          const totalW = 3 * bw + 2 * gap;
          const startX = A1_RESEARCH.x + (A1_RESEARCH.w - totalW) / 2;
          const bx = startX + i * (bw + gap);
          const by = A1_RESEARCH.y + 56;
          return (
            <g key={`a1-tool-${t}`}>
              <rect
                x={bx}
                y={by}
                width={bw}
                height={14}
                fill="none"
                stroke="var(--copper-700)"
                strokeWidth="0.8"
                rx="2"
              />
              <text
                x={bx + bw / 2}
                y={by + 10}
                textAnchor="middle"
                fill="#a3a3a3"
                fontFamily="JetBrains Mono"
                fontSize="8"
              >
                {t}
              </text>
            </g>
          );
        })}

        {/* brainstorm → research connector (dashed path with particles) */}
        <use
          href="#np-a1-research-path"
          stroke="var(--copper-600)"
          strokeWidth="1"
          strokeDasharray="3 4"
          opacity={0.7}
          fill="none"
        />
        <circle
          r="2"
          fill="var(--copper-100)"
          style={{ filter: "drop-shadow(0 0 4px var(--copper-300))" }}
        >
          <animateMotion dur="3s" repeatCount="indefinite">
            <mpath href="#np-a1-research-path" />
          </animateMotion>
        </circle>
        <circle
          r="1.6"
          fill="var(--copper-100)"
          style={{ filter: "drop-shadow(0 0 3px var(--copper-300))" }}
        >
          <animateMotion dur="3s" repeatCount="indefinite" begin="1.2s">
            <mpath href="#np-a1-research-path" />
          </animateMotion>
        </circle>

        {/* research → output pill */}
        {(() => {
          const start = bottom(A1_RESEARCH);
          const end = { x: A1_OUT.x + A1_OUT.w / 2, y: A1_OUT.y - 4 };
          const tangent = unitVec(start, end);
          const d = withArrow(
            `M ${start.x} ${start.y} L ${end.x} ${end.y}`,
            end,
            tangent,
            6,
          );
          return (
            <motion.path
              d={d}
              stroke="var(--copper-500)"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              {...revealLoop(1.3)}
            />
          );
        })()}

        {/* A1 output pill */}
        <rect
          x={A1_OUT.x}
          y={A1_OUT.y}
          width={A1_OUT.w}
          height={A1_OUT.h}
          fill="none"
          stroke="var(--copper-700)"
          strokeWidth="1"
          strokeDasharray="3 3"
          rx="4"
        />
        <text
          x={A1_OUT.x + A1_OUT.w / 2}
          y={A1_OUT.y + A1_OUT.h / 2 + 4}
          textAnchor="middle"
          fill="#a3a3a3"
          fontFamily="JetBrains Mono"
          fontSize="10"
        >
          session.md + prd-plan.md
        </text>

        {/* ─── A1 → A2 connector (single bezier with pillbox label) ──────── */}
        {(() => {
          const start = right(A1_OUT);
          const end = { x: G2.x, y: A2_INPUT.y + A2_INPUT.h / 2 };
          const c1 = { x: start.x + 60, y: start.y };
          const c2 = { x: end.x - 60, y: end.y };
          const midX = 440;
          const midY = 280;
          const labelW = 110;
          const labelH = 22;
          const labelPulse = {
            initial: { opacity: 0 },
            animate: { opacity: [0, 1, 1, 0] },
            transition: {
              duration: 9,
              repeat: Infinity,
              delay: 1.8,
              times: [0, 0.45, 0.9, 1],
              ease: "easeInOut" as const,
            },
          };
          const tangent = unitVec(c2, end);
          const d = withArrow(
            `M ${start.x} ${start.y} C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${end.x} ${end.y}`,
            end,
            tangent,
            8,
          );
          return (
            <g>
              <motion.path
                d={d}
                stroke="var(--copper-300)"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                {...revealLoop(1.8)}
              />
              <motion.rect
                x={midX - labelW / 2}
                y={midY - labelH / 2}
                width={labelW}
                height={labelH}
                fill="var(--neutral-900)"
                stroke="var(--copper-700)"
                strokeWidth="1"
                rx="4"
                {...labelPulse}
              />
              <motion.text
                x={midX}
                y={midY + 4}
                textAnchor="middle"
                fill="#d99e6c"
                fontFamily="Source Serif 4"
                fontStyle="italic"
                fontSize="13"
                {...labelPulse}
              >
                prd-plan.md
              </motion.text>
            </g>
          );
        })()}

        {/* ═══════════════════════════════════════════════════════════════════
            AGENT 2 · DRAFT  (plan-review → drafter → draft-review)
           ═══════════════════════════════════════════════════════════════════ */}

        <text
          x={A2_INPUT.x + A2_INPUT.w / 2}
          y={A2_INPUT.y - 6}
          textAnchor="middle"
          fill="#d99e6c"
          fontFamily="JetBrains Mono"
          fontSize="9"
          letterSpacing="0.08em"
        >
          INPUT
        </text>
        <rect
          x={A2_INPUT.x}
          y={A2_INPUT.y}
          width={A2_INPUT.w}
          height={A2_INPUT.h}
          fill="none"
          stroke="var(--copper-700)"
          strokeWidth="1"
          strokeDasharray="3 3"
          rx="4"
        />
        <text
          x={A2_INPUT.x + A2_INPUT.w / 2}
          y={A2_INPUT.y + 19}
          textAnchor="middle"
          fill="#a3a3a3"
          fontFamily="JetBrains Mono"
          fontSize="10"
        >
          prd-plan.md
        </text>

        {/* plan-reviewer (gate before drafter) */}
        <rect
          x={A2_PLAN_REVIEW.x}
          y={A2_PLAN_REVIEW.y}
          width={A2_PLAN_REVIEW.w}
          height={A2_PLAN_REVIEW.h}
          fill="none"
          stroke="var(--copper-300)"
          strokeWidth="1.2"
          rx="4"
        />
        <text
          x={A2_PLAN_REVIEW.x + A2_PLAN_REVIEW.w / 2}
          y={A2_PLAN_REVIEW.y + 26}
          textAnchor="middle"
          fill="#f5f5f5"
          fontFamily="Source Serif 4"
          fontSize="13"
        >
          plan-reviewer
        </text>
        <text
          x={A2_PLAN_REVIEW.x + A2_PLAN_REVIEW.w / 2}
          y={A2_PLAN_REVIEW.y + 44}
          textAnchor="middle"
          fill="#a3a3a3"
          fontFamily="Source Serif 4"
          fontStyle="italic"
          fontSize="10"
        >
          loop or proceed
        </text>
        {/* tiny gate glyph: two arrow heads ↺ ↓ */}
        <text
          x={A2_PLAN_REVIEW.x + A2_PLAN_REVIEW.w / 2}
          y={A2_PLAN_REVIEW.y + 60}
          textAnchor="middle"
          fill="#d99e6c"
          fontFamily="JetBrains Mono"
          fontSize="9"
          letterSpacing="0.2em"
        >
          ↺ · ↓
        </text>

        {/* prd-drafter (LLM dominant — heaviest of Agent 2) */}
        <rect
          x={A2_DRAFTER.x}
          y={A2_DRAFTER.y}
          width={A2_DRAFTER.w}
          height={A2_DRAFTER.h}
          fill="none"
          stroke="var(--copper-300)"
          strokeWidth="1.6"
          rx="6"
        />
        <text
          x={A2_DRAFTER.x + A2_DRAFTER.w / 2}
          y={A2_DRAFTER.y + 28}
          textAnchor="middle"
          fill="#f5f5f5"
          fontFamily="Source Serif 4"
          fontSize="14"
        >
          prd-drafter
        </text>
        <text
          x={A2_DRAFTER.x + A2_DRAFTER.w / 2}
          y={A2_DRAFTER.y + 46}
          textAnchor="middle"
          fill="#a3a3a3"
          fontFamily="JetBrains Mono"
          fontStyle="italic"
          fontSize="9"
        >
          gemini-pro
        </text>
        {/* dense dot grid (LLM signature) */}
        {Array.from({ length: 3 }).map((_, r) =>
          Array.from({ length: 9 }).map((_, c) => (
            <circle
              key={`a2-dot-${r}-${c}`}
              cx={A2_DRAFTER.x + 18 + c * 18}
              cy={A2_DRAFTER.y + 64 + r * 12}
              r="1.2"
              fill="var(--copper-300)"
              opacity={((r + c) % 3) * 0.22 + 0.2}
            />
          )),
        )}

        {/* draft-reviewer (validates output before passing onward) */}
        <rect
          x={A2_DRAFT_REVIEW.x}
          y={A2_DRAFT_REVIEW.y}
          width={A2_DRAFT_REVIEW.w}
          height={A2_DRAFT_REVIEW.h}
          fill="none"
          stroke="var(--copper-700)"
          strokeWidth="1"
          rx="4"
        />
        <text
          x={A2_DRAFT_REVIEW.x + A2_DRAFT_REVIEW.w / 2}
          y={A2_DRAFT_REVIEW.y + 20}
          textAnchor="middle"
          fill="#f5f5f5"
          fontFamily="Source Serif 4"
          fontSize="12"
        >
          draft-reviewer
        </text>
        <text
          x={A2_DRAFT_REVIEW.x + A2_DRAFT_REVIEW.w / 2}
          y={A2_DRAFT_REVIEW.y + 36}
          textAnchor="middle"
          fill="#a3a3a3"
          fontFamily="Source Serif 4"
          fontStyle="italic"
          fontSize="9"
        >
          post-draft validation
        </text>

        {/* input → plan-reviewer */}
        {(() => {
          const start = bottom(A2_INPUT);
          const end = { x: A2_PLAN_REVIEW.x + A2_PLAN_REVIEW.w / 2, y: A2_PLAN_REVIEW.y - 4 };
          const tangent = unitVec(start, end);
          const d = withArrow(
            `M ${start.x} ${start.y} L ${end.x} ${end.y}`,
            end,
            tangent,
            6,
          );
          return (
            <motion.path
              d={d}
              stroke="var(--copper-500)"
              strokeWidth="1.1"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              {...revealLoop(2.0)}
            />
          );
        })()}

        {/* plan-reviewer → drafter */}
        {(() => {
          const start = bottom(A2_PLAN_REVIEW);
          const end = { x: A2_DRAFTER.x + A2_DRAFTER.w / 2, y: A2_DRAFTER.y - 4 };
          const tangent = unitVec(start, end);
          const d = withArrow(
            `M ${start.x} ${start.y} L ${end.x} ${end.y}`,
            end,
            tangent,
            7,
          );
          return (
            <motion.path
              d={d}
              stroke="var(--copper-300)"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              {...revealLoop(2.2)}
            />
          );
        })()}

        {/* drafter → draft-reviewer */}
        {(() => {
          const start = bottom(A2_DRAFTER);
          const end = { x: A2_DRAFT_REVIEW.x + A2_DRAFT_REVIEW.w / 2, y: A2_DRAFT_REVIEW.y - 4 };
          const tangent = unitVec(start, end);
          const d = withArrow(
            `M ${start.x} ${start.y} L ${end.x} ${end.y}`,
            end,
            tangent,
            6,
          );
          return (
            <motion.path
              d={d}
              stroke="var(--copper-500)"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              {...revealLoop(2.4)}
            />
          );
        })()}

        {/* draft-reviewer → output pill */}
        {(() => {
          const start = bottom(A2_DRAFT_REVIEW);
          const end = { x: A2_OUT.x + A2_OUT.w / 2, y: A2_OUT.y - 4 };
          const tangent = unitVec(start, end);
          const d = withArrow(
            `M ${start.x} ${start.y} L ${end.x} ${end.y}`,
            end,
            tangent,
            5,
          );
          return (
            <motion.path
              d={d}
              stroke="var(--copper-700)"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              {...revealLoop(2.55)}
            />
          );
        })()}

        {/* A2 output pill */}
        <rect
          x={A2_OUT.x}
          y={A2_OUT.y}
          width={A2_OUT.w}
          height={A2_OUT.h}
          fill="none"
          stroke="var(--copper-700)"
          strokeWidth="1"
          strokeDasharray="3 3"
          rx="4"
        />
        <text
          x={A2_OUT.x + A2_OUT.w / 2}
          y={A2_OUT.y + A2_OUT.h / 2 + 4}
          textAnchor="middle"
          fill="#a3a3a3"
          fontFamily="JetBrains Mono"
          fontSize="10"
        >
          prd-base.md
        </text>

        {/* ─── A2 → A3 connector (single bezier) ──────────────────────────── */}
        {(() => {
          const start = right(A2_OUT);
          const end = { x: G3.x, y: A3_INPUT.y + A3_INPUT.h / 2 };
          const c1 = { x: start.x + 60, y: start.y };
          const c2 = { x: end.x - 60, y: end.y };
          const midX = 780;
          const midY = 280;
          const labelW = 110;
          const labelH = 22;
          const labelPulse = {
            initial: { opacity: 0 },
            animate: { opacity: [0, 1, 1, 0] },
            transition: {
              duration: 9,
              repeat: Infinity,
              delay: 2.8,
              times: [0, 0.45, 0.9, 1],
              ease: "easeInOut" as const,
            },
          };
          const tangent = unitVec(c2, end);
          const d = withArrow(
            `M ${start.x} ${start.y} C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${end.x} ${end.y}`,
            end,
            tangent,
            8,
          );
          return (
            <g>
              <motion.path
                d={d}
                stroke="var(--copper-300)"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                {...revealLoop(2.8)}
              />
              <motion.rect
                x={midX - labelW / 2}
                y={midY - labelH / 2}
                width={labelW}
                height={labelH}
                fill="var(--neutral-900)"
                stroke="var(--copper-700)"
                strokeWidth="1"
                rx="4"
                {...labelPulse}
              />
              <motion.text
                x={midX}
                y={midY + 4}
                textAnchor="middle"
                fill="#d99e6c"
                fontFamily="Source Serif 4"
                fontStyle="italic"
                fontSize="13"
                {...labelPulse}
              >
                prd-base.md
              </motion.text>
            </g>
          );
        })()}

        {/* ═══════════════════════════════════════════════════════════════════
            AGENT 3 · ENRICH  (Figma + Flowchart parallel → Enricher)
           ═══════════════════════════════════════════════════════════════════ */}

        <text
          x={A3_INPUT.x + A3_INPUT.w / 2}
          y={A3_INPUT.y - 6}
          textAnchor="middle"
          fill="#d99e6c"
          fontFamily="JetBrains Mono"
          fontSize="9"
          letterSpacing="0.08em"
        >
          INPUT
        </text>
        <rect
          x={A3_INPUT.x}
          y={A3_INPUT.y}
          width={A3_INPUT.w}
          height={A3_INPUT.h}
          fill="none"
          stroke="var(--copper-700)"
          strokeWidth="1"
          strokeDasharray="3 3"
          rx="4"
        />
        <text
          x={A3_INPUT.x + A3_INPUT.w / 2}
          y={A3_INPUT.y + 18}
          textAnchor="middle"
          fill="#a3a3a3"
          fontFamily="JetBrains Mono"
          fontSize="10"
        >
          prd-base.md
        </text>

        {/* LEFT COLUMN — Figma branch */}
        <rect
          x={A3_FIGMA.x}
          y={A3_FIGMA.y}
          width={A3_FIGMA.w}
          height={A3_FIGMA.h}
          fill="none"
          stroke="var(--copper-500)"
          strokeWidth="1.2"
          rx="4"
        />
        <text
          x={A3_FIGMA.x + A3_FIGMA.w / 2}
          y={A3_FIGMA.y + 24}
          textAnchor="middle"
          fill="#f5f5f5"
          fontFamily="Source Serif 4"
          fontSize="12"
        >
          prd-figma
        </text>
        <text
          x={A3_FIGMA.x + A3_FIGMA.w / 2}
          y={A3_FIGMA.y + 42}
          textAnchor="middle"
          fill="#a3a3a3"
          fontFamily="Source Serif 4"
          fontStyle="italic"
          fontSize="9"
        >
          design-as-spec
        </text>

        {/* screen-analyzer × N (stacked rectangles for parallel feel) */}
        {(() => {
          const offsets = [
            { dx: 6, dy: 6, opacity: 0.35 },
            { dx: 3, dy: 3, opacity: 0.55 },
            { dx: 0, dy: 0, opacity: 1 },
          ];
          return (
            <g>
              {offsets.map((o, i) => (
                <motion.rect
                  key={`a3-screen-stack-${i}`}
                  x={A3_SCREENS.x + o.dx}
                  y={A3_SCREENS.y + o.dy}
                  width={A3_SCREENS.w}
                  height={A3_SCREENS.h}
                  fill="var(--neutral-900)"
                  stroke="var(--copper-500)"
                  strokeWidth="1"
                  rx="3"
                  initial={{ opacity: o.opacity }}
                  animate={{ opacity: [o.opacity * 0.6, o.opacity, o.opacity * 0.6] }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    delay: i * 0.35,
                    ease: "easeInOut",
                  }}
                />
              ))}
              <text
                x={A3_SCREENS.x + A3_SCREENS.w / 2}
                y={A3_SCREENS.y + 26}
                textAnchor="middle"
                fill="#f5f5f5"
                fontFamily="Source Serif 4"
                fontSize="12"
              >
                screen-analyzer
              </text>
              <text
                x={A3_SCREENS.x + A3_SCREENS.w / 2}
                y={A3_SCREENS.y + 44}
                textAnchor="middle"
                fill="#a3a3a3"
                fontFamily="Source Serif 4"
                fontStyle="italic"
                fontSize="9"
              >
                × N parallel
              </text>
              <text
                x={A3_SCREENS.x + A3_SCREENS.w / 2}
                y={A3_SCREENS.y + 60}
                textAnchor="middle"
                fill="#d99e6c"
                fontFamily="JetBrains Mono"
                fontSize="8"
                letterSpacing="0.08em"
              >
                EN · ID copy
              </text>
            </g>
          );
        })()}

        {/* figma → screen-analyzer (particle path) */}
        <use
          href="#np-a3-figma-path"
          stroke="var(--copper-600)"
          strokeWidth="1"
          strokeDasharray="3 4"
          opacity={0.7}
          fill="none"
        />
        <circle
          r="2"
          fill="var(--copper-100)"
          style={{ filter: "drop-shadow(0 0 4px var(--copper-300))" }}
        >
          <animateMotion dur="2.4s" repeatCount="indefinite">
            <mpath href="#np-a3-figma-path" />
          </animateMotion>
        </circle>
        <circle
          r="1.6"
          fill="var(--copper-100)"
          style={{ filter: "drop-shadow(0 0 3px var(--copper-300))" }}
        >
          <animateMotion dur="2.4s" repeatCount="indefinite" begin="1s">
            <mpath href="#np-a3-figma-path" />
          </animateMotion>
        </circle>

        {/* RIGHT COLUMN — Flowchart branch */}
        <rect
          x={A3_FLOW.x}
          y={A3_FLOW.y}
          width={A3_FLOW.w}
          height={A3_FLOW.h}
          fill="none"
          stroke="var(--copper-500)"
          strokeWidth="1.2"
          rx="4"
        />
        <text
          x={A3_FLOW.x + A3_FLOW.w / 2}
          y={A3_FLOW.y + 24}
          textAnchor="middle"
          fill="#f5f5f5"
          fontFamily="Source Serif 4"
          fontSize="12"
        >
          prd-flowchart
        </text>
        <text
          x={A3_FLOW.x + A3_FLOW.w / 2}
          y={A3_FLOW.y + 42}
          textAnchor="middle"
          fill="#a3a3a3"
          fontFamily="Source Serif 4"
          fontStyle="italic"
          fontSize="9"
        >
          diagram-as-spec
        </text>

        {/* flowchart-generator */}
        <rect
          x={A3_FLOWGEN.x}
          y={A3_FLOWGEN.y}
          width={A3_FLOWGEN.w}
          height={A3_FLOWGEN.h}
          fill="none"
          stroke="var(--copper-700)"
          strokeWidth="1"
          rx="3"
        />
        <text
          x={A3_FLOWGEN.x + A3_FLOWGEN.w / 2}
          y={A3_FLOWGEN.y + 20}
          textAnchor="middle"
          fill="#f5f5f5"
          fontFamily="Source Serif 4"
          fontSize="11"
        >
          flowchart-generator
        </text>
        <text
          x={A3_FLOWGEN.x + A3_FLOWGEN.w / 2}
          y={A3_FLOWGEN.y + 36}
          textAnchor="middle"
          fill="#a3a3a3"
          fontFamily="Source Serif 4"
          fontStyle="italic"
          fontSize="9"
        >
          iterative render
        </text>

        {/* flow → flowgen */}
        {(() => {
          const start = bottom(A3_FLOW);
          const end = { x: A3_FLOWGEN.x + A3_FLOWGEN.w / 2, y: A3_FLOWGEN.y - 4 };
          const tangent = unitVec(start, end);
          const d = withArrow(
            `M ${start.x} ${start.y} L ${end.x} ${end.y}`,
            end,
            tangent,
            5,
          );
          return (
            <motion.path
              d={d}
              stroke="var(--copper-500)"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              {...revealLoop(3.1)}
            />
          );
        })()}

        {/* 3 output format pills below flowgen */}
        {["Mermaid", "Excalidraw", "Draw.io"].map((fmt, i) => {
          const pillW = 38;
          const gap = 4;
          const totalW = 3 * pillW + 2 * gap;
          const startX = A3_FLOWGEN.x + (A3_FLOWGEN.w - totalW) / 2;
          const px = startX + i * (pillW + gap);
          const py = A3_FLOWGEN.y + A3_FLOWGEN.h + 6;
          return (
            <g key={`a3-fmt-${fmt}`}>
              <rect
                x={px}
                y={py}
                width={pillW}
                height={14}
                fill="none"
                stroke="var(--copper-700)"
                strokeWidth="0.8"
                rx="2"
              />
              <text
                x={px + pillW / 2}
                y={py + 10}
                textAnchor="middle"
                fill="#d99e6c"
                fontFamily="JetBrains Mono"
                fontSize="8"
              >
                {fmt}
              </text>
            </g>
          );
        })}

        {/* prd-enricher (LLM dominant — merges both branches) */}
        <rect
          x={A3_ENRICHER.x}
          y={A3_ENRICHER.y}
          width={A3_ENRICHER.w}
          height={A3_ENRICHER.h}
          fill="none"
          stroke="var(--copper-300)"
          strokeWidth="1.5"
          rx="6"
        />
        <text
          x={A3_ENRICHER.x + A3_ENRICHER.w / 2}
          y={A3_ENRICHER.y + 28}
          textAnchor="middle"
          fill="#f5f5f5"
          fontFamily="Source Serif 4"
          fontSize="14"
        >
          prd-enricher
        </text>
        <text
          x={A3_ENRICHER.x + A3_ENRICHER.w / 2}
          y={A3_ENRICHER.y + 46}
          textAnchor="middle"
          fill="#a3a3a3"
          fontFamily="Source Serif 4"
          fontStyle="italic"
          fontSize="10"
        >
          merge optional assets
        </text>
        {/* tiny merge indicator (two arrows converging) */}
        <text
          x={A3_ENRICHER.x + A3_ENRICHER.w / 2}
          y={A3_ENRICHER.y + 70}
          textAnchor="middle"
          fill="#d99e6c"
          fontFamily="JetBrains Mono"
          fontSize="9"
          letterSpacing="0.12em"
        >
          screens + flows → ADF
        </text>

        {/* input → fork (figma + flow) */}
        {(() => {
          const start = bottom(A3_INPUT);
          const figEnd = { x: A3_FIGMA.x + A3_FIGMA.w / 2, y: A3_FIGMA.y - 4 };
          const flowEnd = { x: A3_FLOW.x + A3_FLOW.w / 2, y: A3_FLOW.y - 4 };
          const figTan = unitVec(start, figEnd);
          const flowTan = unitVec(start, flowEnd);
          const dFig = withArrow(
            `M ${start.x} ${start.y} L ${figEnd.x} ${figEnd.y}`,
            figEnd,
            figTan,
            5,
          );
          const dFlow = withArrow(
            `M ${start.x} ${start.y} L ${flowEnd.x} ${flowEnd.y}`,
            flowEnd,
            flowTan,
            5,
          );
          return (
            <>
              <motion.path
                d={dFig}
                stroke="var(--copper-500)"
                strokeWidth="1.1"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                {...revealLoop(2.95)}
              />
              <motion.path
                d={dFlow}
                stroke="var(--copper-500)"
                strokeWidth="1.1"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                {...revealLoop(3.0)}
              />
            </>
          );
        })()}

        {/* fan-in: screens + flowgen → enricher (curved converging arrows) */}
        {(() => {
          const figStart = { x: A3_SCREENS.x + A3_SCREENS.w / 2, y: A3_SCREENS.y + A3_SCREENS.h + 6 };
          const flowStart = { x: A3_FLOWGEN.x + A3_FLOWGEN.w / 2, y: A3_FLOWGEN.y + A3_FLOWGEN.h + 22 };
          const enrichTop = { x: A3_ENRICHER.x + A3_ENRICHER.w / 2, y: A3_ENRICHER.y };
          const figEnd = { x: enrichTop.x - 30, y: enrichTop.y - 4 };
          const flowEnd = { x: enrichTop.x + 30, y: enrichTop.y - 4 };
          const figC1 = { x: figStart.x, y: figStart.y + 20 };
          const figC2 = { x: figEnd.x, y: figEnd.y - 20 };
          const flowC1 = { x: flowStart.x, y: flowStart.y + 20 };
          const flowC2 = { x: flowEnd.x, y: flowEnd.y - 20 };
          const figTan = unitVec(figC2, figEnd);
          const flowTan = unitVec(flowC2, flowEnd);
          const dFig = withArrow(
            `M ${figStart.x} ${figStart.y} C ${figC1.x} ${figC1.y}, ${figC2.x} ${figC2.y}, ${figEnd.x} ${figEnd.y}`,
            figEnd,
            figTan,
            7,
          );
          const dFlow = withArrow(
            `M ${flowStart.x} ${flowStart.y} C ${flowC1.x} ${flowC1.y}, ${flowC2.x} ${flowC2.y}, ${flowEnd.x} ${flowEnd.y}`,
            flowEnd,
            flowTan,
            7,
          );
          return (
            <>
              <motion.path
                d={dFig}
                stroke="var(--copper-300)"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                {...revealLoop(3.3)}
              />
              <motion.path
                d={dFlow}
                stroke="var(--copper-300)"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                {...revealLoop(3.35)}
              />
            </>
          );
        })()}

        {/* enricher → output pill */}
        {(() => {
          const start = bottom(A3_ENRICHER);
          const end = { x: A3_OUT.x + A3_OUT.w / 2, y: A3_OUT.y - 4 };
          const tangent = unitVec(start, end);
          const d = withArrow(
            `M ${start.x} ${start.y} L ${end.x} ${end.y}`,
            end,
            tangent,
            6,
          );
          return (
            <motion.path
              d={d}
              stroke="var(--copper-500)"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              {...revealLoop(3.55)}
            />
          );
        })()}

        {/* A3 output pill */}
        <rect
          x={A3_OUT.x}
          y={A3_OUT.y}
          width={A3_OUT.w}
          height={A3_OUT.h}
          fill="none"
          stroke="var(--copper-700)"
          strokeWidth="1"
          strokeDasharray="3 3"
          rx="4"
        />
        <text
          x={A3_OUT.x + A3_OUT.w / 2}
          y={A3_OUT.y + A3_OUT.h / 2 + 4}
          textAnchor="middle"
          fill="#a3a3a3"
          fontFamily="JetBrains Mono"
          fontSize="10"
        >
          prd-final.md
        </text>

        {/* ─── A3 → A4 connector (single bezier with pillbox label) ───────── */}
        {(() => {
          const start = right(A3_OUT);
          const end = { x: G4.x, y: A4_INPUT.y + A4_INPUT.h / 2 };
          const c1 = { x: start.x + 60, y: start.y };
          const c2 = { x: end.x - 60, y: end.y };
          const midX = 1180;
          const midY = 280;
          const labelW = 110;
          const labelH = 22;
          const labelPulse = {
            initial: { opacity: 0 },
            animate: { opacity: [0, 1, 1, 0] },
            transition: {
              duration: 9,
              repeat: Infinity,
              delay: 3.8,
              times: [0, 0.45, 0.9, 1],
              ease: "easeInOut" as const,
            },
          };
          const tangent = unitVec(c2, end);
          const d = withArrow(
            `M ${start.x} ${start.y} C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${end.x} ${end.y}`,
            end,
            tangent,
            8,
          );
          return (
            <g>
              <motion.path
                d={d}
                stroke="var(--copper-300)"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                {...revealLoop(3.8)}
              />
              <motion.rect
                x={midX - labelW / 2}
                y={midY - labelH / 2}
                width={labelW}
                height={labelH}
                fill="var(--neutral-900)"
                stroke="var(--copper-700)"
                strokeWidth="1"
                rx="4"
                {...labelPulse}
              />
              <motion.text
                x={midX}
                y={midY + 4}
                textAnchor="middle"
                fill="#d99e6c"
                fontFamily="Source Serif 4"
                fontStyle="italic"
                fontSize="13"
                {...labelPulse}
              >
                prd-final.md
              </motion.text>
            </g>
          );
        })()}

        {/* ═══════════════════════════════════════════════════════════════════
            AGENT 4 · PUBLISH  (validate + convert → publish → Jira + Drive)
           ═══════════════════════════════════════════════════════════════════ */}

        <text
          x={A4_INPUT.x + A4_INPUT.w / 2}
          y={A4_INPUT.y - 6}
          textAnchor="middle"
          fill="#d99e6c"
          fontFamily="JetBrains Mono"
          fontSize="9"
          letterSpacing="0.08em"
        >
          INPUT
        </text>
        <rect
          x={A4_INPUT.x}
          y={A4_INPUT.y}
          width={A4_INPUT.w}
          height={A4_INPUT.h}
          fill="none"
          stroke="var(--copper-700)"
          strokeWidth="1"
          strokeDasharray="3 3"
          rx="4"
        />
        <text
          x={A4_INPUT.x + A4_INPUT.w / 2}
          y={A4_INPUT.y + 18}
          textAnchor="middle"
          fill="#a3a3a3"
          fontFamily="JetBrains Mono"
          fontSize="10"
        >
          prd-final.md
        </text>

        {/* validate-agent */}
        <rect
          x={A4_VALIDATE.x}
          y={A4_VALIDATE.y}
          width={A4_VALIDATE.w}
          height={A4_VALIDATE.h}
          fill="none"
          stroke="var(--copper-300)"
          strokeWidth="1.2"
          rx="4"
        />
        {/* shield/check glyph */}
        {(() => {
          const cx = A4_VALIDATE.x + 16;
          const cy = A4_VALIDATE.y + 18;
          return (
            <g>
              <path
                d={`M ${cx - 6} ${cy - 6} L ${cx} ${cy - 9} L ${cx + 6} ${cy - 6} L ${cx + 6} ${cy + 2} C ${cx + 6} ${cy + 6}, ${cx} ${cy + 9}, ${cx} ${cy + 9} C ${cx} ${cy + 9}, ${cx - 6} ${cy + 6}, ${cx - 6} ${cy + 2} Z`}
                fill="none"
                stroke="var(--copper-300)"
                strokeWidth="1"
              />
              <path
                d={`M ${cx - 2.5} ${cy} L ${cx - 0.5} ${cy + 2} L ${cx + 3} ${cy - 2}`}
                fill="none"
                stroke="#d99e6c"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          );
        })()}
        <text
          x={A4_VALIDATE.x + A4_VALIDATE.w / 2 + 8}
          y={A4_VALIDATE.y + 22}
          textAnchor="middle"
          fill="#f5f5f5"
          fontFamily="Source Serif 4"
          fontSize="12"
        >
          validate
        </text>
        <text
          x={A4_VALIDATE.x + A4_VALIDATE.w / 2}
          y={A4_VALIDATE.y + 44}
          textAnchor="middle"
          fill="#a3a3a3"
          fontFamily="Source Serif 4"
          fontStyle="italic"
          fontSize="9"
        >
          ADF schema check
        </text>

        {/* converter-agent */}
        <rect
          x={A4_CONVERT.x}
          y={A4_CONVERT.y}
          width={A4_CONVERT.w}
          height={A4_CONVERT.h}
          fill="none"
          stroke="var(--copper-300)"
          strokeWidth="1.2"
          rx="4"
        />
        {/* MD → ADF glyph (two stacked rounded rects with an arrow) */}
        {(() => {
          const gx = A4_CONVERT.x + 10;
          const gy = A4_CONVERT.y + 12;
          return (
            <g>
              <rect
                x={gx}
                y={gy}
                width={14}
                height={12}
                fill="none"
                stroke="var(--copper-700)"
                strokeWidth="0.8"
                rx="1.5"
              />
              <text
                x={gx + 7}
                y={gy + 9}
                textAnchor="middle"
                fill="#a3a3a3"
                fontFamily="JetBrains Mono"
                fontSize="6"
              >
                MD
              </text>
              <path
                d={`M ${gx + 17} ${gy + 6} L ${gx + 23} ${gy + 6}`}
                stroke="var(--copper-300)"
                strokeWidth="0.9"
              />
              <path
                d={`M ${gx + 21} ${gy + 4} L ${gx + 23} ${gy + 6} L ${gx + 21} ${gy + 8}`}
                fill="none"
                stroke="var(--copper-300)"
                strokeWidth="0.9"
                strokeLinejoin="round"
              />
              <rect
                x={gx + 24}
                y={gy}
                width={14}
                height={12}
                fill="none"
                stroke="var(--copper-700)"
                strokeWidth="0.8"
                rx="1.5"
              />
              <text
                x={gx + 31}
                y={gy + 9}
                textAnchor="middle"
                fill="#a3a3a3"
                fontFamily="JetBrains Mono"
                fontSize="6"
              >
                ADF
              </text>
            </g>
          );
        })()}
        <text
          x={A4_CONVERT.x + A4_CONVERT.w / 2}
          y={A4_CONVERT.y + 46}
          textAnchor="middle"
          fill="#f5f5f5"
          fontFamily="Source Serif 4"
          fontSize="12"
        >
          converter
        </text>
        <text
          x={A4_CONVERT.x + A4_CONVERT.w / 2}
          y={A4_CONVERT.y + 60}
          textAnchor="middle"
          fill="#a3a3a3"
          fontFamily="Source Serif 4"
          fontStyle="italic"
          fontSize="9"
        >
          MD → ADF
        </text>

        {/* input → fork (validate + convert) */}
        {(() => {
          const start = bottom(A4_INPUT);
          const vEnd = { x: A4_VALIDATE.x + A4_VALIDATE.w / 2, y: A4_VALIDATE.y - 4 };
          const cEnd = { x: A4_CONVERT.x + A4_CONVERT.w / 2, y: A4_CONVERT.y - 4 };
          const vTan = unitVec(start, vEnd);
          const cTan = unitVec(start, cEnd);
          const dV = withArrow(
            `M ${start.x} ${start.y} L ${vEnd.x} ${vEnd.y}`,
            vEnd,
            vTan,
            5,
          );
          const dC = withArrow(
            `M ${start.x} ${start.y} L ${cEnd.x} ${cEnd.y}`,
            cEnd,
            cTan,
            5,
          );
          return (
            <>
              <motion.path
                d={dV}
                stroke="var(--copper-500)"
                strokeWidth="1.1"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                {...revealLoop(3.95)}
              />
              <motion.path
                d={dC}
                stroke="var(--copper-500)"
                strokeWidth="1.1"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                {...revealLoop(4.0)}
              />
            </>
          );
        })()}

        {/* prd-publish (LLM dominant) */}
        <rect
          x={A4_PUBLISH.x}
          y={A4_PUBLISH.y}
          width={A4_PUBLISH.w}
          height={A4_PUBLISH.h}
          fill="none"
          stroke="var(--copper-300)"
          strokeWidth="1.5"
          rx="6"
        />
        <text
          x={A4_PUBLISH.x + A4_PUBLISH.w / 2}
          y={A4_PUBLISH.y + 30}
          textAnchor="middle"
          fill="#f5f5f5"
          fontFamily="Source Serif 4"
          fontSize="14"
        >
          prd-publish
        </text>
        <text
          x={A4_PUBLISH.x + A4_PUBLISH.w / 2}
          y={A4_PUBLISH.y + 48}
          textAnchor="middle"
          fill="#a3a3a3"
          fontFamily="Source Serif 4"
          fontStyle="italic"
          fontSize="10"
        >
          Confluence MCP
        </text>
        <text
          x={A4_PUBLISH.x + A4_PUBLISH.w / 2}
          y={A4_PUBLISH.y + 68}
          textAnchor="middle"
          fill="#d99e6c"
          fontFamily="JetBrains Mono"
          fontSize="9"
          letterSpacing="0.1em"
        >
          createPage · attach · update
        </text>

        {/* fan-in: validate + convert → publish */}
        {(() => {
          const vStart = bottom(A4_VALIDATE);
          const cStart = bottom(A4_CONVERT);
          const pubTop = top(A4_PUBLISH);
          const vEnd = { x: pubTop.x - 30, y: pubTop.y - 4 };
          const cEnd = { x: pubTop.x + 30, y: pubTop.y - 4 };
          const vTan = unitVec(vStart, vEnd);
          const cTan = unitVec(cStart, cEnd);
          const dV = withArrow(
            `M ${vStart.x} ${vStart.y} L ${vEnd.x} ${vEnd.y}`,
            vEnd,
            vTan,
            6,
          );
          const dC = withArrow(
            `M ${cStart.x} ${cStart.y} L ${cEnd.x} ${cEnd.y}`,
            cEnd,
            cTan,
            6,
          );
          return (
            <>
              <motion.path
                d={dV}
                stroke="var(--copper-300)"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                {...revealLoop(4.15)}
              />
              <motion.path
                d={dC}
                stroke="var(--copper-300)"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                {...revealLoop(4.2)}
              />
            </>
          );
        })()}

        {/* Jira output */}
        <rect
          x={A4_JIRA.x}
          y={A4_JIRA.y}
          width={A4_JIRA.w}
          height={A4_JIRA.h}
          fill="none"
          stroke="var(--copper-500)"
          strokeWidth="1.2"
          rx="4"
        />
        {/* stylized Jira icon: three nested squares */}
        {(() => {
          const jx = A4_JIRA.x + A4_JIRA.w / 2;
          const jy = A4_JIRA.y + 26;
          return (
            <g>
              <rect
                x={jx - 12}
                y={jy - 12}
                width={10}
                height={10}
                fill="none"
                stroke="var(--copper-300)"
                strokeWidth="1"
                transform={`rotate(45 ${jx - 7} ${jy - 7})`}
              />
              <rect
                x={jx - 5}
                y={jy - 12}
                width={10}
                height={10}
                fill="none"
                stroke="var(--copper-300)"
                strokeWidth="1"
                transform={`rotate(45 ${jx} ${jy - 7})`}
              />
              <rect
                x={jx + 2}
                y={jy - 12}
                width={10}
                height={10}
                fill="none"
                stroke="var(--copper-300)"
                strokeWidth="1"
                transform={`rotate(45 ${jx + 7} ${jy - 7})`}
              />
            </g>
          );
        })()}
        <text
          x={A4_JIRA.x + A4_JIRA.w / 2}
          y={A4_JIRA.y + 56}
          textAnchor="middle"
          fill="#f5f5f5"
          fontFamily="Source Serif 4"
          fontSize="12"
        >
          Jira
        </text>
        <text
          x={A4_JIRA.x + A4_JIRA.w / 2}
          y={A4_JIRA.y + 72}
          textAnchor="middle"
          fill="#a3a3a3"
          fontFamily="JetBrains Mono"
          fontSize="9"
        >
          Epic + Stories
        </text>
        {/* tiny task ticks */}
        {Array.from({ length: 3 }).map((_, i) => (
          <g key={`a4-jira-task-${i}`}>
            <rect
              x={A4_JIRA.x + 14}
              y={A4_JIRA.y + 84 + i * 8}
              width={6}
              height={6}
              fill="none"
              stroke="var(--copper-700)"
              strokeWidth="0.8"
              rx="1"
            />
            <line
              x1={A4_JIRA.x + 24}
              y1={A4_JIRA.y + 87 + i * 8}
              x2={A4_JIRA.x + A4_JIRA.w - 14}
              y2={A4_JIRA.y + 87 + i * 8}
              stroke="var(--copper-700)"
              strokeWidth="0.7"
              opacity={0.6}
            />
          </g>
        ))}

        {/* GDrive output */}
        <rect
          x={A4_DRIVE.x}
          y={A4_DRIVE.y}
          width={A4_DRIVE.w}
          height={A4_DRIVE.h}
          fill="none"
          stroke="var(--copper-500)"
          strokeWidth="1.2"
          rx="4"
        />
        {/* folder + check glyph */}
        {(() => {
          const fx = A4_DRIVE.x + A4_DRIVE.w / 2;
          const fy = A4_DRIVE.y + 22;
          return (
            <g>
              <path
                d={`M ${fx - 12} ${fy - 6} L ${fx - 4} ${fy - 6} L ${fx - 2} ${fy - 3} L ${fx + 12} ${fy - 3} L ${fx + 12} ${fy + 8} L ${fx - 12} ${fy + 8} Z`}
                fill="none"
                stroke="var(--copper-300)"
                strokeWidth="1"
              />
              <path
                d={`M ${fx - 3} ${fy + 2} L ${fx - 1} ${fy + 4} L ${fx + 3} ${fy}`}
                fill="none"
                stroke="#d99e6c"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          );
        })()}
        <text
          x={A4_DRIVE.x + A4_DRIVE.w / 2}
          y={A4_DRIVE.y + 56}
          textAnchor="middle"
          fill="#f5f5f5"
          fontFamily="Source Serif 4"
          fontSize="12"
        >
          GDrive
        </text>
        <text
          x={A4_DRIVE.x + A4_DRIVE.w / 2}
          y={A4_DRIVE.y + 72}
          textAnchor="middle"
          fill="#a3a3a3"
          fontFamily="JetBrains Mono"
          fontSize="9"
        >
          sync
        </text>
        {/* tiny file rows */}
        {Array.from({ length: 3 }).map((_, i) => (
          <g key={`a4-drive-file-${i}`}>
            <rect
              x={A4_DRIVE.x + 14}
              y={A4_DRIVE.y + 84 + i * 8}
              width={5}
              height={6}
              fill="none"
              stroke="var(--copper-700)"
              strokeWidth="0.8"
            />
            <line
              x1={A4_DRIVE.x + 23}
              y1={A4_DRIVE.y + 87 + i * 8}
              x2={A4_DRIVE.x + A4_DRIVE.w - 14}
              y2={A4_DRIVE.y + 87 + i * 8}
              stroke="var(--copper-700)"
              strokeWidth="0.7"
              opacity={0.6}
            />
          </g>
        ))}

        {/* publish → Jira & GDrive (diverging curves) */}
        {(() => {
          const start = bottom(A4_PUBLISH);
          const jEnd = { x: A4_JIRA.x + A4_JIRA.w / 2, y: A4_JIRA.y - 4 };
          const dEnd = { x: A4_DRIVE.x + A4_DRIVE.w / 2, y: A4_DRIVE.y - 4 };
          const jC1 = { x: start.x, y: start.y + 18 };
          const jC2 = { x: jEnd.x, y: jEnd.y - 18 };
          const dC1 = { x: start.x, y: start.y + 18 };
          const dC2 = { x: dEnd.x, y: dEnd.y - 18 };
          const jTan = unitVec(jC2, jEnd);
          const dTan = unitVec(dC2, dEnd);
          const dJ = withArrow(
            `M ${start.x} ${start.y} C ${jC1.x} ${jC1.y}, ${jC2.x} ${jC2.y}, ${jEnd.x} ${jEnd.y}`,
            jEnd,
            jTan,
            7,
          );
          const dD = withArrow(
            `M ${start.x} ${start.y} C ${dC1.x} ${dC1.y}, ${dC2.x} ${dC2.y}, ${dEnd.x} ${dEnd.y}`,
            dEnd,
            dTan,
            7,
          );
          return (
            <>
              <motion.path
                d={dJ}
                stroke="var(--copper-300)"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                {...revealLoop(4.35)}
              />
              <motion.path
                d={dD}
                stroke="var(--copper-300)"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                {...revealLoop(4.4)}
              />
            </>
          );
        })()}

        {/* ─── Confluence destination column ──────────────────────────────── */}
        <g>
          <motion.circle
            cx={APPS.cx}
            cy={APPS.cy}
            r={APPS.r}
            fill="none"
            stroke="var(--copper-300)"
            strokeWidth="1.5"
            initial={{ r: APPS.r, opacity: 0.6 }}
            animate={{ opacity: [0.4, 1, 0.4], r: [APPS.r, APPS.r + 4, APPS.r] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <text
            x={APPS.cx}
            y={APPS.cy + 5}
            textAnchor="middle"
            fill="#f5f5f5"
            fontFamily="JetBrains Mono"
            fontSize="14"
            fontWeight="600"
          >
            C
          </text>
          <text
            x={APPS.cx}
            y={APPS.cy + 42}
            textAnchor="middle"
            fill="#f5f5f5"
            fontFamily="JetBrains Mono"
            fontSize="11"
          >
            Confluence
          </text>
          <text
            x={APPS.cx}
            y={APPS.cy + 56}
            textAnchor="middle"
            fill="#a3a3a3"
            fontFamily="JetBrains Mono"
            fontSize="9"
          >
            live SSOT
          </text>
        </g>

        {/* Agent 4 right edge → Confluence (L-shaped, mirrors PM→G1) */}
        {(() => {
          const startX = G4.x + G4.w;
          const cornerX = APPS.cx - APPS.r - 10;
          const targetX = APPS.cx - APPS.r;
          const y = APPS.cy;
          const tangent = unitVec({ x: cornerX, y }, { x: targetX, y });
          const d = withArrow(
            `M ${startX} ${y} L ${cornerX} ${y} L ${targetX} ${y}`,
            { x: targetX, y },
            tangent,
            5,
          );
          return (
            <motion.path
              d={d}
              stroke="var(--copper-300)"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              {...revealLoop(4.4)}
            />
          );
        })()}

        {/* ─── LOOP-BACK ARC: plan-reviewer (A2) → brainstorm (A1) ─────────
            Curves UP and OVER the agent row. Originates from plan-reviewer's
            left edge, curves above all G boxes, ends at brainstorm's right edge.
           ───────────────────────────────────────────────────────────────── */}
        {(() => {
          const start = left(A2_PLAN_REVIEW);
          const end = right(A1_BRAINSTORM);
          const c1 = { x: start.x - 60, y: 10 };
          const c2 = { x: end.x + 60, y: 10 };
          const midX = 440;
          const midY = 50;
          const labelW = 130;
          const labelH = 22;
          const labelPulse = {
            initial: { opacity: 0 },
            animate: { opacity: [0, 1, 1, 0] },
            transition: {
              duration: 9,
              repeat: Infinity,
              delay: 4.0,
              times: [0, 0.45, 0.9, 1],
              ease: "easeInOut" as const,
            },
          };
          const tangent = unitVec(c2, end);
          const d = withArrow(
            `M ${start.x} ${start.y} C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${end.x} ${end.y}`,
            end,
            tangent,
            7,
          );
          return (
            <g>
              <motion.path
                d={d}
                stroke="var(--copper-500)"
                strokeWidth="1.2"
                strokeDasharray="4 4"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                {...revealLoop(4.0)}
              />
              <motion.rect
                x={midX - labelW / 2}
                y={midY - labelH / 2}
                width={labelW}
                height={labelH}
                fill="var(--neutral-900)"
                stroke="var(--copper-700)"
                strokeWidth="1"
                rx="4"
                {...labelPulse}
              />
              <motion.text
                x={midX}
                y={midY + 4}
                textAnchor="middle"
                fill="#d99e6c"
                fontFamily="Source Serif 4"
                fontStyle="italic"
                fontSize="13"
                {...labelPulse}
              >
                loop or proceed
              </motion.text>
            </g>
          );
        })()}
      </svg>
    </div>
  );
}
