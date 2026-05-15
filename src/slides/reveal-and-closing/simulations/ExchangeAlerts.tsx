import { motion } from "framer-motion";

type Box = { x: number; y: number; w: number; h: number };

const right = (b: Box) => ({ x: b.x + b.w, y: b.y + b.h / 2 });
const top = (b: Box) => ({ x: b.x + b.w / 2, y: b.y });
const bottom = (b: Box) => ({ x: b.x + b.w / 2, y: b.y + b.h });

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

function unitVec(a: { x: number; y: number }, b: { x: number; y: number }) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  return { x: dx / len, y: dy / len };
}

const G1: Box = { x: 110, y: 50, w: 280, h: 460 };
const G2: Box = { x: 490, y: 50, w: 240, h: 460 };
const G3: Box = { x: 830, y: 50, w: 300, h: 460 };
const G4: Box = { x: 1230, y: 50, w: 280, h: 460 };

const CRON = { cx: 45, cy: 270, r: 18 };
const OPSGENIE = { cx: 1555, cy: 270, r: 18 };

// G1 inner boxes
const SOURCES_BOX: Box = { x: G1.x + 16, y: G1.y + 40, w: G1.w - 32, h: 240 };
const AGG_PILL: Box = { x: G1.x + 30, y: G1.y + 310, w: G1.w - 60, h: 56 };
const G1_OUT: Box = { x: G1.x + 30, y: G1.y + 400, w: G1.w - 60, h: 36 };

// G2 inner boxes
const G2_INPUT: Box = { x: G2.x + 20, y: G2.y + 50, w: G2.w - 40, h: 32 };
const G2_STAGE1: Box = { x: G2.x + 20, y: G2.y + 130, w: G2.w - 40, h: 60 };
const G2_STAGE2: Box = { x: G2.x + 20, y: G2.y + 210, w: G2.w - 40, h: 60 };
const G2_STAGE3: Box = { x: G2.x + 20, y: G2.y + 290, w: G2.w - 40, h: 60 };
const G2_OUT: Box = { x: G2.x + 20, y: G2.y + 400, w: G2.w - 40, h: 36 };

// G3 inner boxes
const G3_INPUT: Box = { x: G3.x + 20, y: G3.y + 50, w: G3.w - 40, h: 32 };
const G3_LLM: Box = { x: G3.x + 30, y: G3.y + 110, w: G3.w - 60, h: 170 };
const G3_OUT: Box = { x: G3.x + 30, y: G3.y + 400, w: G3.w - 60, h: 36 };

// G4 inner boxes
const G4_INPUT: Box = { x: G4.x + 20, y: G4.y + 50, w: G4.w - 40, h: 32 };
const G4_FILTER: Box = { x: G4.x + G4.w - 130, y: G4.y + 150, w: 110, h: 60 };
const G4_DISPATCH: Box = { x: G4.x + G4.w - 130, y: G4.y + 240, w: 110, h: 60 };
const G4_OUT: Box = { x: G4.x + 30, y: G4.y + 380, w: G4.w - 60, h: 36 };

const G1_SOURCES_COL1 = ["Binance", "Tokocrypto", "Indodax"];
const G1_SOURCES_COL2 = ["OKX", "Bitmart", "Alpaca"];
const G1_OFFICIAL_SOURCES_COL1 = ["API", "Web Scraper"];
const G1_OFFICIAL_SOURCES_COL2 = ["RSS", "Telegram Channel"];

export function ExchangeAlerts() {
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
          {/* Fan-in bezier paths from SOURCES_BOX bottom rows → AGG pill top */}
          {[0, 1, 2].map((i) => {
            // 3 source-pair fan paths: each originates from one of 3 row-pair X positions
            const fromX = SOURCES_BOX.x + ((i + 0.5) * SOURCES_BOX.w) / 3;
            const fromY = SOURCES_BOX.y + SOURCES_BOX.h;
            const toX = AGG_PILL.x + AGG_PILL.w / 2;
            const toY = AGG_PILL.y;
            return (
              <path
                key={`ea-fanin-${i}`}
                id={`ea-fanin-${i}`}
                d={`M ${fromX} ${fromY} C ${fromX} ${fromY + 30}, ${toX} ${toY - 30}, ${toX} ${toY}`}
                fill="none"
              />
            );
          })}
        </defs>

        {/* ─── Cron trigger ──────────────────────────────────────────────── */}
        <g>
          <motion.circle
            cx={CRON.cx}
            cy={CRON.cy}
            r={CRON.r}
            fill="none"
            stroke="var(--copper-300)"
            strokeWidth="1.5"
            initial={{ r: CRON.r, opacity: 0.6 }}
            animate={{ opacity: [0.4, 1, 0.4], r: [CRON.r, CRON.r + 4, CRON.r] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <text
            x={CRON.cx}
            y={CRON.cy + 4}
            textAnchor="middle"
            fill="#f5f5f5"
            fontFamily="JetBrains Mono"
            fontSize="12"
          >
            trigger
          </text>
          <text
            x={CRON.cx}
            y={CRON.cy + 42}
            textAnchor="middle"
            fill="#a3a3a3"
            fontFamily="JetBrains Mono"
            fontSize="10"
          >
            hourly cron
          </text>
        </g>

        {/* Cron → G1 left edge (L-shaped, dashed) */}
        {(() => {
          const startX = CRON.cx + CRON.r;
          const cornerX = 90;
          const targetX = G1.x;
          const y = CRON.cy;
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

        {/* ─── Group boxes + labels ─────────────────────────────────────── */}
        {[
          { box: G1, label: "AGENT 1 · FEEDS AGGREGATION" },
          { box: G2, label: "AGENT 2 · FILTER & DEDUP" },
          { box: G3, label: "AI AGENT 3 · BATCH CLASSIFICATION" },
          { box: G4, label: "AGENT 4 · ALERT GENERATOR" },
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

        {/* ─── Opsgenie end-circle ──────────────────────────────────────── */}
        <g>
          <motion.circle
            cx={OPSGENIE.cx}
            cy={OPSGENIE.cy}
            r={OPSGENIE.r}
            fill="none"
            stroke="var(--copper-300)"
            strokeWidth="1.5"
            initial={{ r: OPSGENIE.r, opacity: 0.6 }}
            animate={{ opacity: [0.4, 1, 0.4], r: [OPSGENIE.r, OPSGENIE.r + 4, OPSGENIE.r] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <text
            x={OPSGENIE.cx}
            y={OPSGENIE.cy + 4}
            textAnchor="middle"
            fill="#f5f5f5"
            fontFamily="JetBrains Mono"
            fontSize="11"
          >
            Slack
          </text>
          <text
            x={OPSGENIE.cx}
            y={OPSGENIE.cy + 42}
            textAnchor="middle"
            fill="#a3a3a3"
            fontFamily="JetBrains Mono"
            fontSize="10"
          >
            notified
          </text>
        </g>

        {/* G4 right edge → Opsgenie (L-shaped, solid copper-300) */}
        {(() => {
          const startX = G4.x + G4.w;
          const cornerX = OPSGENIE.cx - OPSGENIE.r - 10;
          const targetX = OPSGENIE.cx - OPSGENIE.r;
          const y = OPSGENIE.cy;
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
              {...revealLoop(4.3)}
            />
          );
        })()}

        {/* ─── AGENT 1 · FEEDS AGGREGATION ─────────────────────────────── */}
        {/* SOURCES_BOX outer rect */}
        <rect
          x={SOURCES_BOX.x}
          y={SOURCES_BOX.y}
          width={SOURCES_BOX.w}
          height={SOURCES_BOX.h}
          fill="none"
          stroke="var(--copper-700)"
          strokeWidth="1"
          rx="4"
        />
        <text
          x={SOURCES_BOX.x + 10}
          y={SOURCES_BOX.y + 16}
          fill="#d99e6c"
          fontFamily="JetBrains Mono"
          fontSize="9"
          letterSpacing="0.08em"
        >
          EXCHANGE FEEDS · 6 SOURCES
        </text>

        {/* 6 providers as bullets — 2 cols × 3 rows */}
        {G1_SOURCES_COL1.map((name, i) => {
          const rowY = SOURCES_BOX.y + 44 + i * 26;
          const colX = SOURCES_BOX.x + 14;
          return (
            <g key={`g1-c1-${name}`}>
              <text
                x={colX}
                y={rowY}
                fill="#d99e6c"
                fontFamily="JetBrains Mono"
                fontSize="12"
              >
                •
              </text>
              <text
                x={colX + 12}
                y={rowY}
                fill="#f5f5f5"
                fontFamily="Source Serif 4"
                fontSize="13"
              >
                {name}
              </text>
            </g>
          );
        })}
        {G1_SOURCES_COL2.map((name, i) => {
          const rowY = SOURCES_BOX.y + 44 + i * 26;
          const colX = SOURCES_BOX.x + SOURCES_BOX.w / 2 + 4;
          return (
            <g key={`g1-c2-${name}`}>
              <text
                x={colX}
                y={rowY}
                fill="#d99e6c"
                fontFamily="JetBrains Mono"
                fontSize="12"
              >
                •
              </text>
              <text
                x={colX + 12}
                y={rowY}
                fill="#f5f5f5"
                fontFamily="Source Serif 4"
                fontSize="13"
              >
                {name}
              </text>
            </g>
          );
        })}

        {/* Faint divider between providers and Official Sources */}
        <line
          x1={SOURCES_BOX.x + 14}
          y1={SOURCES_BOX.y + 138}
          x2={SOURCES_BOX.x + SOURCES_BOX.w - 14}
          y2={SOURCES_BOX.y + 138}
          stroke="var(--copper-700)"
          strokeWidth="0.6"
          opacity={0.5}
        />

        {/* Official Sources sub-section header */}
        <text
          x={SOURCES_BOX.x + 10}
          y={SOURCES_BOX.y + 158}
          fill="#d99e6c"
          fontFamily="JetBrains Mono"
          fontSize="9"
          letterSpacing="0.08em"
        >
          OFFICIAL SOURCES
        </text>

        {/* 4 source-type bullets — 2 cols × 2 rows */}
        {G1_OFFICIAL_SOURCES_COL1.map((label, i) => {
          const rowY = SOURCES_BOX.y + 184 + i * 24;
          const colX = SOURCES_BOX.x + 14;
          return (
            <g key={`g1-os-c1-${label}`}>
              <text
                x={colX}
                y={rowY}
                fill="#d99e6c"
                fontFamily="JetBrains Mono"
                fontSize="11"
              >
                •
              </text>
              <text
                x={colX + 12}
                y={rowY}
                fill="#a3a3a3"
                fontFamily="JetBrains Mono"
                fontSize="11"
              >
                {label}
              </text>
            </g>
          );
        })}
        {G1_OFFICIAL_SOURCES_COL2.map((label, i) => {
          const rowY = SOURCES_BOX.y + 184 + i * 24;
          const colX = SOURCES_BOX.x + SOURCES_BOX.w / 2 + 4;
          return (
            <g key={`g1-os-c2-${label}`}>
              <text
                x={colX}
                y={rowY}
                fill="#d99e6c"
                fontFamily="JetBrains Mono"
                fontSize="11"
              >
                •
              </text>
              <text
                x={colX + 12}
                y={rowY}
                fill="#a3a3a3"
                fontFamily="JetBrains Mono"
                fontSize="11"
              >
                {label}
              </text>
            </g>
          );
        })}

        {/* Fan-in: SOURCES_BOX bottom → AGG pill top (dashed bezier + particles) */}
        {[0, 1, 2].map((i) => (
          <use
            key={`ea-fanin-stroke-${i}`}
            href={`#ea-fanin-${i}`}
            stroke="var(--copper-600)"
            strokeWidth={1}
            strokeDasharray="3 4"
            opacity={0.7}
            fill="none"
          />
        ))}
        {[0, 1, 2].map((i) => (
          <circle
            key={`ea-fanin-particle-${i}`}
            r={2}
            fill="var(--copper-100)"
            style={{ filter: "drop-shadow(0 0 4px var(--copper-300))" }}
          >
            <animateMotion dur="3s" repeatCount="indefinite" begin={`${i * 0.25}s`}>
              <mpath href={`#ea-fanin-${i}`} />
            </animateMotion>
          </circle>
        ))}

        {/* AGG pill (no AI → copper-700 stroke) */}
        <rect
          x={AGG_PILL.x}
          y={AGG_PILL.y}
          width={AGG_PILL.w}
          height={AGG_PILL.h}
          fill="none"
          stroke="var(--copper-700)"
          strokeWidth="1.4"
          rx="28"
        />
        <text
          x={AGG_PILL.x + AGG_PILL.w / 2}
          y={AGG_PILL.y + 26}
          textAnchor="middle"
          fill="#f5f5f5"
          fontFamily="Source Serif 4"
          fontSize="13"
        >
          Aggregator · Batch Loop
        </text>
        <text
          x={AGG_PILL.x + AGG_PILL.w / 2}
          y={AGG_PILL.y + 44}
          textAnchor="middle"
          fill="#a3a3a3"
          fontFamily="JetBrains Mono"
          fontStyle="italic"
          fontSize="9"
        >
          no AI · pure fetch
        </text>

        {/* AGG → output pill */}
        {(() => {
          const start = bottom(AGG_PILL);
          const end = { x: top(G1_OUT).x, y: top(G1_OUT).y - 4 };
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
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              {...revealLoop(1.4)}
            />
          );
        })()}

        {/* G1 output pill */}
        <rect
          x={G1_OUT.x}
          y={G1_OUT.y}
          width={G1_OUT.w}
          height={G1_OUT.h}
          fill="none"
          stroke="var(--copper-700)"
          strokeWidth="1"
          strokeDasharray="3 3"
          rx="4"
        />
        <text
          x={G1_OUT.x + G1_OUT.w / 2}
          y={G1_OUT.y + G1_OUT.h / 2 + 4}
          textAnchor="middle"
          fill="#a3a3a3"
          fontFamily="JetBrains Mono"
          fontSize="10"
        >
          raw announcements
        </text>

        {/* ─── AGENT 2 · FILTER & DEDUP ─────────────────────────────────── */}
        {/* Input pill */}
        <rect
          x={G2_INPUT.x}
          y={G2_INPUT.y}
          width={G2_INPUT.w}
          height={G2_INPUT.h}
          fill="none"
          stroke="var(--copper-700)"
          strokeWidth="1"
          strokeDasharray="3 3"
          rx="4"
        />
        <text
          x={G2_INPUT.x + G2_INPUT.w / 2}
          y={G2_INPUT.y + G2_INPUT.h / 2 + 4}
          textAnchor="middle"
          fill="#a3a3a3"
          fontFamily="JetBrains Mono"
          fontSize="10"
        >
          raw batch · N
        </text>

        {/* No-AI subtitle above ladder */}
        <text
          x={G2.x + G2.w / 2}
          y={G2.y + 110}
          textAnchor="middle"
          fill="#a3a3a3"
          fontFamily="Source Serif 4"
          fontStyle="italic"
          fontSize="10"
        >
          no AI · pure logic
        </text>

        {/* 3-stage dedup ladder */}
        {[
          { box: G2_STAGE1, label: "hash", sub: "exact match" },
          { box: G2_STAGE2, label: "fuzzy", sub: "92%+ similarity" },
          { box: G2_STAGE3, label: "source canonical", sub: "merge duplicates" },
        ].map(({ box, label, sub }) => (
          <g key={label}>
            <rect
              x={box.x}
              y={box.y}
              width={box.w}
              height={box.h}
              fill="none"
              stroke="var(--copper-700)"
              strokeWidth="1.2"
              rx="4"
            />
            <text
              x={box.x + box.w / 2}
              y={box.y + 26}
              textAnchor="middle"
              fill="#f5f5f5"
              fontFamily="Source Serif 4"
              fontSize="14"
            >
              {label}
            </text>
            <text
              x={box.x + box.w / 2}
              y={box.y + 44}
              textAnchor="middle"
              fill="#a3a3a3"
              fontFamily="JetBrains Mono"
              fontStyle="italic"
              fontSize="9"
            >
              {sub}
            </text>
          </g>
        ))}

        {/* Sequential down-arrows between stages */}
        {[
          { from: G2_STAGE1, to: G2_STAGE2, delay: 1.5 },
          { from: G2_STAGE2, to: G2_STAGE3, delay: 1.7 },
        ].map(({ from, to, delay }) => {
          const start = bottom(from);
          const end = { x: top(to).x, y: top(to).y - 4 };
          const tangent = unitVec(start, end);
          const d = withArrow(
            `M ${start.x} ${start.y} L ${end.x} ${end.y}`,
            end,
            tangent,
            7,
          );
          return (
            <motion.path
              key={`g2-stage-arrow-${delay}`}
              d={d}
              stroke="var(--copper-700)"
              strokeWidth="1.1"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              {...revealLoop(delay)}
            />
          );
        })}

        {/* Stage3 → G2 output */}
        {(() => {
          const start = bottom(G2_STAGE3);
          const end = { x: top(G2_OUT).x, y: top(G2_OUT).y - 4 };
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
              stroke="var(--copper-700)"
              strokeWidth="1.1"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              {...revealLoop(1.9)}
            />
          );
        })()}

        {/* G2 output pill */}
        <rect
          x={G2_OUT.x}
          y={G2_OUT.y}
          width={G2_OUT.w}
          height={G2_OUT.h}
          fill="none"
          stroke="var(--copper-700)"
          strokeWidth="1"
          strokeDasharray="3 3"
          rx="4"
        />
        <text
          x={G2_OUT.x + G2_OUT.w / 2}
          y={G2_OUT.y + G2_OUT.h / 2 + 4}
          textAnchor="middle"
          fill="#a3a3a3"
          fontFamily="JetBrains Mono"
          fontSize="10"
        >
          deduped batch
        </text>

        {/* ─── AGENT 3 · BATCH CLASSIFICATION ──────────────────────────── */}
        {/* Input pill */}
        <rect
          x={G3_INPUT.x}
          y={G3_INPUT.y}
          width={G3_INPUT.w}
          height={G3_INPUT.h}
          fill="none"
          stroke="var(--copper-700)"
          strokeWidth="1"
          strokeDasharray="3 3"
          rx="4"
        />
        <text
          x={G3_INPUT.x + G3_INPUT.w / 2}
          y={G3_INPUT.y + G3_INPUT.h / 2 + 4}
          textAnchor="middle"
          fill="#a3a3a3"
          fontFamily="JetBrains Mono"
          fontSize="10"
        >
          deduped batch
        </text>

        {/* Input → LLM box arrow */}
        {(() => {
          const start = bottom(G3_INPUT);
          const end = { x: top(G3_LLM).x, y: top(G3_LLM).y - 4 };
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
              stroke="var(--copper-700)"
              strokeWidth="1.1"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              {...revealLoop(2.6)}
            />
          );
        })()}

        {/* LLM batch-call box */}
        <rect
          x={G3_LLM.x}
          y={G3_LLM.y}
          width={G3_LLM.w}
          height={G3_LLM.h}
          fill="none"
          stroke="var(--copper-300)"
          strokeWidth="1.4"
          rx="6"
        />
        <text
          x={G3_LLM.x + G3_LLM.w / 2}
          y={G3_LLM.y + 24}
          textAnchor="middle"
          fill="#f5f5f5"
          fontFamily="Source Serif 4"
          fontSize="14"
        >
          LLM · Classifier
        </text>
        <text
          x={G3_LLM.x + G3_LLM.w / 2}
          y={G3_LLM.y + 44}
          textAnchor="middle"
          fill="#a3a3a3"
          fontFamily="Source Serif 4"
          fontStyle="italic"
          fontSize="11"
        >
          gemini-flash · batch
        </text>
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.rect
            key={`g3-bar-${i}`}
            x={G3_LLM.x + 20}
            y={G3_LLM.y + 62 + i * 16}
            width={G3_LLM.w - 40}
            height={10}
            fill="var(--copper-600)"
            animate={{ opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}

        {/* 3 classification badge rects beneath LLM box */}
        {(() => {
          const badgeW = 88;
          const badgeH = 60;
          const gap = 8;
          const totalW = 3 * badgeW + 2 * gap;
          const startX = G3.x + (G3.w - totalW) / 2;
          const badgeY = G3.y + 310;
          const badges = [
            { chip: "CATEGORY", values: ["maintenance", "api-change", "security"] },
            { chip: "PRIORITY", values: ["P1 · P2 · P3","P4 · P5"] },
            { chip: "RELEVANCE", values: ["0.0 → 1.0"] },
          ];
          return (
            <>
              {badges.map(({ chip, values }, i) => {
                const bx = startX + i * (badgeW + gap);
                return (
                  <g key={chip}>
                    <rect
                      x={bx}
                      y={badgeY}
                      width={badgeW}
                      height={badgeH}
                      fill="none"
                      stroke="var(--copper-700)"
                      strokeWidth="1"
                      rx="4"
                    />
                    <text
                      x={bx + badgeW / 2}
                      y={badgeY + 14}
                      textAnchor="middle"
                      fill="#d99e6c"
                      fontFamily="JetBrains Mono"
                      fontSize="9"
                      letterSpacing="0.08em"
                    >
                      {chip}
                    </text>
                    {values.map((v, vi) => (
                      <text
                        key={v}
                        x={bx + badgeW / 2}
                        y={badgeY + 30 + vi * 14}
                        textAnchor="middle"
                        fill="#a3a3a3"
                        fontFamily="JetBrains Mono"
                        fontSize="9"
                      >
                        {v}
                      </text>
                    ))}
                  </g>
                );
              })}
            </>
          );
        })()}

        {/* LLM box → badges arrow */}
        {(() => {
          const start = bottom(G3_LLM);
          const badgesTopY = G3.y + 310;
          const end = { x: start.x, y: badgesTopY - 4 };
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
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              {...revealLoop(2.8)}
            />
          );
        })()}

        {/* badges → G3 output arrow */}
        {(() => {
          const badgesBottomY = G3.y + 310 + 60;
          const start = { x: G3.x + G3.w / 2, y: badgesBottomY };
          const end = { x: top(G3_OUT).x, y: top(G3_OUT).y - 4 };
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
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              {...revealLoop(3.0)}
            />
          );
        })()}

        {/* G3 output pill */}
        <rect
          x={G3_OUT.x}
          y={G3_OUT.y}
          width={G3_OUT.w}
          height={G3_OUT.h}
          fill="none"
          stroke="var(--copper-700)"
          strokeWidth="1"
          strokeDasharray="3 3"
          rx="4"
        />
        <text
          x={G3_OUT.x + G3_OUT.w / 2}
          y={G3_OUT.y + G3_OUT.h / 2 + 4}
          textAnchor="middle"
          fill="#a3a3a3"
          fontFamily="JetBrains Mono"
          fontSize="10"
        >
          classified alerts
        </text>

        {/* ─── AGENT 4 · ALERT GENERATOR ───────────────────────────────── */}
        {/* Input pill */}
        <rect
          x={G4_INPUT.x}
          y={G4_INPUT.y}
          width={G4_INPUT.w}
          height={G4_INPUT.h}
          fill="none"
          stroke="var(--copper-700)"
          strokeWidth="1"
          strokeDasharray="3 3"
          rx="4"
        />
        <text
          x={G4_INPUT.x + G4_INPUT.w / 2}
          y={G4_INPUT.y + G4_INPUT.h / 2 + 4}
          textAnchor="middle"
          fill="#a3a3a3"
          fontFamily="JetBrains Mono"
          fontSize="10"
        >
          classified alerts
        </text>

        {/* 5 priority bucket boxes — left half of G4 */}
        {[
          { label: "P1", i: 0, relevant: true },
          { label: "P2", i: 1, relevant: true },
          { label: "P3", i: 2, relevant: true },
          { label: "P4", i: 3, relevant: false },
          { label: "P5", i: 4, relevant: false },
        ].map(({ label, i, relevant }) => {
          const bx = G4.x + 20;
          const by = G4.y + 110 + i * 38;
          return (
            <g key={label}>
              <rect
                x={bx}
                y={by}
                width={80}
                height={28}
                fill="none"
                stroke={relevant ? "var(--copper-300)" : "var(--copper-800)"}
                strokeWidth="1"
                opacity={relevant ? 1 : 0.5}
                rx="3"
              />
              <text
                x={bx + 40}
                y={by + 18}
                textAnchor="middle"
                fill="white"
                fontFamily="JetBrains Mono"
                fontSize="12"
                opacity={relevant ? 1 : 0.5}
              >
                {label}
              </text>
            </g>
          );
        })}

        {/* P1/P2/P3 → Filter pill: brighter fan-in lines */}
        {[0, 1, 2].map((i) => {
          const bx = G4.x + 20;
          const by = G4.y + 110 + i * 38;
          const fromX = bx + 80;
          const fromY = by + 14;
          const toX = G4_FILTER.x;
          const toY = G4_FILTER.y + G4_FILTER.h / 2;
          return (
            <line
              key={`g4-fan-${i}`}
              x1={fromX}
              y1={fromY}
              x2={toX}
              y2={toY}
              stroke="var(--copper-300)"
              strokeWidth="1.4"
              opacity={0.9}
            />
          );
        })}

        {/* Filter · relevant pill */}
        <rect
          x={G4_FILTER.x}
          y={G4_FILTER.y}
          width={G4_FILTER.w}
          height={G4_FILTER.h}
          fill="none"
          stroke="var(--copper-300)"
          strokeWidth="1.4"
          rx="28"
        />
        <text
          x={G4_FILTER.x + G4_FILTER.w / 2}
          y={G4_FILTER.y + 26}
          textAnchor="middle"
          fill="#f5f5f5"
          fontFamily="Source Serif 4"
          fontSize="13"
        >
          Filter
        </text>
        <text
          x={G4_FILTER.x + G4_FILTER.w / 2}
          y={G4_FILTER.y + 44}
          textAnchor="middle"
          fill="#a3a3a3"
          fontFamily="JetBrains Mono"
          fontStyle="italic"
          fontSize="9"
        >
          relevant only
        </text>

        {/* Filter → Dispatcher arrow */}
        {(() => {
          const start = bottom(G4_FILTER);
          const end = { x: top(G4_DISPATCH).x, y: top(G4_DISPATCH).y - 4 };
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
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              {...revealLoop(3.8)}
            />
          );
        })()}

        {/* Batch dispatcher box */}
        <rect
          x={G4_DISPATCH.x}
          y={G4_DISPATCH.y}
          width={G4_DISPATCH.w}
          height={G4_DISPATCH.h}
          fill="none"
          stroke="var(--copper-300)"
          strokeWidth="1.2"
          rx="4"
        />
        <text
          x={G4_DISPATCH.x + G4_DISPATCH.w / 2}
          y={G4_DISPATCH.y + 22}
          textAnchor="middle"
          fill="#f5f5f5"
          fontFamily="Source Serif 4"
          fontSize="13"
        >
          Batch push
        </text>
        <text
          x={G4_DISPATCH.x + G4_DISPATCH.w / 2}
          y={G4_DISPATCH.y + 38}
          textAnchor="middle"
          fill="#a3a3a3"
          fontFamily="JetBrains Mono"
          fontStyle="italic"
          fontSize="9"
        >
          Opsgenie API
        </text>
        {/* Rate-limit dots */}
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={`g4-rl-${i}`}
            cx={G4_DISPATCH.x + G4_DISPATCH.w / 2 - 10 + i * 10}
            cy={G4_DISPATCH.y + G4_DISPATCH.h - 14}
            r={2}
            fill="var(--copper-300)"
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}

        {/* Dispatcher → G4 output */}
        {(() => {
          const start = bottom(G4_DISPATCH);
          const end = { x: top(G4_OUT).x, y: top(G4_OUT).y - 4 };
          // route: down from dispatcher then left to output pill center
          const midY = start.y + (end.y - start.y) / 2;
          const tangent = unitVec({ x: end.x, y: midY }, end);
          const d = withArrow(
            `M ${start.x} ${start.y} L ${start.x} ${midY} L ${end.x} ${midY} L ${end.x} ${end.y}`,
            end,
            tangent,
            7,
          );
          return (
            <motion.path
              d={d}
              stroke="var(--copper-300)"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              {...revealLoop(4.0)}
            />
          );
        })()}

        {/* G4 output pill */}
        <rect
          x={G4_OUT.x}
          y={G4_OUT.y}
          width={G4_OUT.w}
          height={G4_OUT.h}
          fill="none"
          stroke="var(--copper-300)"
          strokeWidth="1"
          strokeDasharray="3 3"
          rx="4"
        />
        <text
          x={G4_OUT.x + G4_OUT.w / 2}
          y={G4_OUT.y + G4_OUT.h / 2 + 4}
          textAnchor="middle"
          fill="#a3a3a3"
          fontFamily="JetBrains Mono"
          fontSize="10"
        >
          alerts dispatched
        </text>

        {/* ─── Inter-agent bezier connectors ───────────────────────────── */}
        {/* G1 → G2: raw stream */}
        {(() => {
          const start = right(G1_OUT);
          const end = { x: G2_INPUT.x, y: G2_INPUT.y + G2_INPUT.h / 2 };
          const c1x = start.x + 50;
          const c1y = start.y;
          const c2x = end.x - 50;
          const c2y = end.y;
          const midX = (G1.x + G1.w + G2.x) / 2;
          const midY = (start.y + end.y) / 2;
          const tangent = unitVec({ x: c2x, y: c2y }, end);
          const d = withArrow(
            `M ${start.x} ${start.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${end.x} ${end.y}`,
            end,
            tangent,
            8,
          );
          const labelW = 92;
          const labelH = 22;
          const labelPulse = {
            initial: { opacity: 0 },
            animate: { opacity: [0, 1, 1, 0] },
            transition: {
              duration: 9,
              repeat: Infinity,
              delay: 2.0,
              times: [0, 0.45, 0.9, 1],
              ease: "easeInOut" as const,
            },
          };
          return (
            <g>
              <motion.path
                d={d}
                stroke="var(--copper-500)"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                {...revealLoop(2.0)}
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
                raw stream
              </motion.text>
            </g>
          );
        })()}

        {/* G2 → G3: unique */}
        {(() => {
          const start = right(G2_OUT);
          const end = { x: G3_INPUT.x, y: G3_INPUT.y + G3_INPUT.h / 2 };
          const c1x = start.x + 50;
          const c1y = start.y;
          const c2x = end.x - 50;
          const c2y = end.y;
          const midX = (G2.x + G2.w + G3.x) / 2;
          const midY = (start.y + end.y) / 2;
          const tangent = unitVec({ x: c2x, y: c2y }, end);
          const d = withArrow(
            `M ${start.x} ${start.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${end.x} ${end.y}`,
            end,
            tangent,
            8,
          );
          const labelW = 70;
          const labelH = 22;
          const labelPulse = {
            initial: { opacity: 0 },
            animate: { opacity: [0, 1, 1, 0] },
            transition: {
              duration: 9,
              repeat: Infinity,
              delay: 2.6,
              times: [0, 0.45, 0.9, 1],
              ease: "easeInOut" as const,
            },
          };
          return (
            <g>
              <motion.path
                d={d}
                stroke="var(--copper-500)"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                {...revealLoop(2.6)}
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
                unique
              </motion.text>
            </g>
          );
        })()}

        {/* G3 → G4: tagged */}
        {(() => {
          const start = right(G3_OUT);
          const end = { x: G4_INPUT.x, y: G4_INPUT.y + G4_INPUT.h / 2 };
          const c1x = start.x + 50;
          const c1y = start.y;
          const c2x = end.x - 50;
          const c2y = end.y;
          const midX = (G3.x + G3.w + G4.x) / 2;
          const midY = (start.y + end.y) / 2;
          const tangent = unitVec({ x: c2x, y: c2y }, end);
          const d = withArrow(
            `M ${start.x} ${start.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${end.x} ${end.y}`,
            end,
            tangent,
            8,
          );
          const labelW = 70;
          const labelH = 22;
          const labelPulse = {
            initial: { opacity: 0 },
            animate: { opacity: [0, 1, 1, 0] },
            transition: {
              duration: 9,
              repeat: Infinity,
              delay: 3.4,
              times: [0, 0.45, 0.9, 1],
              ease: "easeInOut" as const,
            },
          };
          return (
            <g>
              <motion.path
                d={d}
                stroke="var(--copper-500)"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                {...revealLoop(3.4)}
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
                tagged
              </motion.text>
            </g>
          );
        })()}
      </svg>
    </div>
  );
}
