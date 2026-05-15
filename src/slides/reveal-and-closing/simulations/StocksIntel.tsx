import { motion } from "framer-motion";

// viewBox 1600 × 540 — four "AI Agent" group boxes in a horizontal row,
// each framing its own mini-illustration. Cron column on the far-left feeds Agent 1.

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

// Group box bounds — bigger, with cron pulled out into its own left column.
const G1: Box = { x: 110, y: 50, w: 280, h: 460 };
const G2: Box = { x: 490, y: 50, w: 240, h: 460 };
const G3: Box = { x: 830, y: 50, w: 300, h: 460 };
const G4: Box = { x: 1230, y: 50, w: 280, h: 460 };

// Cron lives in its own vertical column to the left of G1.
const CRON = { cx: 45, cy: 270, r: 18 };

// Apps end-circle mirrors cron, on the far-right after Agent 4.
const APPS = { cx: 1555, cy: 270, r: 18 };

// Agent 1 inner: single RSS box (10 sources in 2 columns) → filter LLM → output pill.
const RSS_BOX: Box = { x: G1.x + 16, y: G1.y + 50, w: G1.w - 32, h: 170 };
const A1_FILTER: Box = { x: G1.x + 30, y: G1.y + 290, w: G1.w - 60, h: 60 };
const A1_OUT: Box = { x: G1.x + 30, y: G1.y + 400, w: G1.w - 60, h: 36 };

// 10 RSS sources arranged in 5 rows × 2 cols inside RSS_BOX.
const RSS_SOURCES_COL1 = [
  "Investing.com",
  "CNBC",
  "Seeking Alpha",
  "Yahoo Finance",
  "MarketWatch",
];
const RSS_SOURCES_COL2 = [
  "Forbes",
  "Nasdaq",
  "Financial Times",
  "AlphaStreet",
  "The Economist",
];

// Agent 2 inner: input → parallel WebScraper + LLM → output pill.
const A2_INPUT: Box = { x: G2.x + 20, y: G2.y + 50, w: G2.w - 40, h: 32 };
const A2_SCRAPER: Box = { x: G2.x + 20, y: G2.y + 130, w: 96, h: 220 };
const A2_LLM: Box = { x: G2.x + 124, y: G2.y + 130, w: 96, h: 220 };
const A2_OUT: Box = { x: G2.x + 20, y: G2.y + 400, w: G2.w - 40, h: 36 };

// Agent 3 inner.
const A3_EXTRACT: Box = { x: G3.x + 20, y: G3.y + 50, w: 140, h: 60 };
const A3_GROUND: Box = { x: G3.x + 180, y: G3.y + 46, w: 64, h: 70 };
const A3_SCORE: Box = { x: G3.x + 30, y: G3.y + 170, w: G3.w - 60, h: 70 };
const A3_TOP10: Box = { x: G3.x + 30, y: G3.y + 380, w: G3.w - 60, h: 60 };

// Agent 4 inner — LLM Template centered on top, Slack + Sheets side-by-side at bottom.
const A4_TEMPLATE: Box = { x: G4.x + 60, y: G4.y + 60, w: G4.w - 120, h: 90 };
const A4_SLACK: Box = { x: G4.x + 16, y: G4.y + 250, w: 120, h: 180 };
const A4_SHEETS: Box = { x: G4.x + 144, y: G4.y + 250, w: 120, h: 180 };

export function StocksIntel() {
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
          {/* RSS → A1_FILTER vertical fan-in bezier paths (5 evenly-spaced) */}
          {Array.from({ length: 5 }).map((_, i) => {
            const fromX = RSS_BOX.x + ((i + 0.5) * RSS_BOX.w) / 5;
            const fromY = RSS_BOX.y + RSS_BOX.h;
            const toX = A1_FILTER.x + A1_FILTER.w / 2;
            const toY = A1_FILTER.y;
            const c1x = fromX;
            const c1y = fromY + 30;
            const c2x = toX;
            const c2y = toY - 30;
            return (
              <path
                key={`a1-flow-path-${i}`}
                id={`a1-flow-path-${i}`}
                d={`M ${fromX} ${fromY} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${toX} ${toY}`}
                fill="none"
              />
            );
          })}
        </defs>

        {/* ─── Cron trigger column ───────────────────────────────────────── */}
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
            11 AM
          </text>
          <text
            x={CRON.cx}
            y={CRON.cy + 42}
            textAnchor="middle"
            fill="#a3a3a3"
            fontFamily="JetBrains Mono"
            fontSize="10"
          >
            daily cron
          </text>
        </g>

        {/* Cron → Agent 1 left edge (L-shaped, dashed) */}
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
          { box: G1, label: "AI AGENT 1 · SOURCE AGGREGATOR" },
          { box: G2, label: "AI AGENT 2 · BATCH PROCESSING" },
          { box: G3, label: "AI AGENT 3 · TICKER GENERATOR" },
          { box: G4, label: "AI AGENT 4 · SUMMARY GENERATOR" },
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

        {/* ─── AGENT 1 · Source Aggregator ───────────────────────────────── */}
        {/* Unified RSS box */}
        <rect
          x={RSS_BOX.x}
          y={RSS_BOX.y}
          width={RSS_BOX.w}
          height={RSS_BOX.h}
          fill="none"
          stroke="var(--copper-700)"
          strokeWidth="1"
          rx="4"
        />
        <text
          x={RSS_BOX.x + 10}
          y={RSS_BOX.y + 16}
          fill="#d99e6c"
          fontFamily="JetBrains Mono"
          fontSize="9"
          letterSpacing="0.08em"
        >
          RSS FEEDS · 10 SOURCES
        </text>
        {/* 5 rows × 2 cols bullet list */}
        {RSS_SOURCES_COL1.map((label, i) => {
          const rowY = RSS_BOX.y + 40 + i * 24;
          const colX = RSS_BOX.x + 14;
          return (
            <g key={`rss-c1-${label}`}>
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
                {label}
              </text>
            </g>
          );
        })}
        {RSS_SOURCES_COL2.map((label, i) => {
          const rowY = RSS_BOX.y + 40 + i * 24;
          const colX = RSS_BOX.x + RSS_BOX.w / 2 + 4;
          return (
            <g key={`rss-c2-${label}`}>
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
                {label}
              </text>
            </g>
          );
        })}

        {/* Vertical fan-in: RSS_BOX bottom → A1_FILTER top (dashed bezier + particles) */}
        {Array.from({ length: 5 }).map((_, i) => (
          <use
            key={`a1-flow-stroke-${i}`}
            href={`#a1-flow-path-${i}`}
            stroke="var(--copper-600)"
            strokeWidth={1}
            strokeDasharray="3 4"
            opacity={0.7}
            fill="none"
          />
        ))}
        {Array.from({ length: 5 }).map((_, i) => (
          <circle
            key={`a1-flow-particle-${i}`}
            r={2}
            fill="var(--copper-100)"
            style={{ filter: "drop-shadow(0 0 4px var(--copper-300))" }}
          >
            <animateMotion dur="3s" repeatCount="indefinite" begin={`${i * 0.25}s`}>
              <mpath href={`#a1-flow-path-${i}`} />
            </animateMotion>
          </circle>
        ))}

        {/* Filter LLM pill */}
        <rect
          x={A1_FILTER.x}
          y={A1_FILTER.y}
          width={A1_FILTER.w}
          height={A1_FILTER.h}
          fill="none"
          stroke="var(--copper-300)"
          strokeWidth="1.4"
          rx="28"
        />
        <text
          x={A1_FILTER.x + A1_FILTER.w / 2}
          y={A1_FILTER.y + 26}
          textAnchor="middle"
          fill="#f5f5f5"
          fontFamily="Source Serif 4"
          fontSize="13"
        >
          LLM · Filter Relevance
        </text>
        <text
          x={A1_FILTER.x + A1_FILTER.w / 2}
          y={A1_FILTER.y + 44}
          textAnchor="middle"
          fill="#a3a3a3"
          fontFamily="JetBrains Mono"
          fontStyle="italic"
          fontSize="9"
        >
          gemini-pro
        </text>

        {/* Filter → valid metadata */}
        {(() => {
          const start = bottom(A1_FILTER);
          const end = { x: top(A1_OUT).x, y: top(A1_OUT).y - 4 };
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

        {/* Valid metadata pill */}
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
          valid news metadata
        </text>

        {/* ─── A1 → A2 connector: FAN-OUT (1 → 4) ───────────────────────── */}
        {(() => {
          const fromX = A1_OUT.x + A1_OUT.w;
          const fromY = A1_OUT.y + A1_OUT.h / 2;
          const midX = (G1.x + G1.w + G2.x) / 2;
          const midY = 270;
          const labelW = 100;
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
              {Array.from({ length: 4 }).map((_, i) => {
                const toX = G2.x;
                const toY = G2.y + 100 + i * 80;
                const c1x = fromX + 50;
                const c1y = fromY;
                const c2x = toX - 50;
                const c2y = toY;
                const tangent = unitVec({ x: c2x, y: c2y }, { x: toX, y: toY });
                const d = withArrow(
                  `M ${fromX} ${fromY} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${toX} ${toY}`,
                  { x: toX, y: toY },
                  tangent,
                  8,
                );
                return (
                  <motion.path
                    key={`a1a2-${i}`}
                    d={d}
                    stroke="var(--copper-500)"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    {...revealLoop(2.0)}
                  />
                );
              })}
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
                valid news
              </motion.text>
            </g>
          );
        })()}

        {/* ─── AGENT 2 · Batch Processing ─────────────────────────────────── */}
        <text
          x={A2_INPUT.x + A2_INPUT.w / 2}
          y={A2_INPUT.y - 6}
          textAnchor="middle"
          fill="#d99e6c"
          fontFamily="JetBrains Mono"
          fontSize="9"
          letterSpacing="0.08em"
        >
          INPUT · NEWS URLS
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
          y={A2_INPUT.y + 20}
          textAnchor="middle"
          fill="#a3a3a3"
          fontFamily="JetBrains Mono"
          fontSize="10"
        >
          batch[N]
        </text>

        {/* WebScraper mini browser (taller) */}
        <rect
          x={A2_SCRAPER.x}
          y={A2_SCRAPER.y}
          width={A2_SCRAPER.w}
          height={A2_SCRAPER.h}
          fill="none"
          stroke="var(--copper-700)"
          strokeWidth="1"
          rx="3"
        />
        <line
          x1={A2_SCRAPER.x}
          y1={A2_SCRAPER.y + 14}
          x2={A2_SCRAPER.x + A2_SCRAPER.w}
          y2={A2_SCRAPER.y + 14}
          stroke="var(--copper-800)"
          strokeWidth="0.8"
        />
        <circle cx={A2_SCRAPER.x + 8} cy={A2_SCRAPER.y + 7} r="1.6" fill="var(--copper-700)" />
        <circle cx={A2_SCRAPER.x + 14} cy={A2_SCRAPER.y + 7} r="1.6" fill="var(--copper-700)" />
        <circle cx={A2_SCRAPER.x + 20} cy={A2_SCRAPER.y + 7} r="1.6" fill="var(--copper-700)" />
        {Array.from({ length: 12 }).map((_, i) => (
          <line
            key={`a2-scrap-line-${i}`}
            x1={A2_SCRAPER.x + 8}
            y1={A2_SCRAPER.y + 26 + i * 14}
            x2={A2_SCRAPER.x + A2_SCRAPER.w - 8 - (i % 3 === 2 ? 22 : 0)}
            y2={A2_SCRAPER.y + 26 + i * 14}
            stroke="var(--copper-700)"
            strokeWidth="0.9"
            opacity={0.6 - (i % 4) * 0.08}
          />
        ))}
        <text
          x={A2_SCRAPER.x + A2_SCRAPER.w / 2}
          y={A2_SCRAPER.y + A2_SCRAPER.h + 16}
          textAnchor="middle"
          fill="#f5f5f5"
          fontFamily="JetBrains Mono"
          fontSize="9"
          letterSpacing="0.06em"
        >
          WebScraper
        </text>

        {/* LLM analyze node (taller, denser dot grid) */}
        <rect
          x={A2_LLM.x}
          y={A2_LLM.y}
          width={A2_LLM.w}
          height={A2_LLM.h}
          fill="none"
          stroke="var(--copper-300)"
          strokeWidth="1.2"
          rx="3"
        />
        {Array.from({ length: 12 }).map((_, r) =>
          Array.from({ length: 5 }).map((_, c) => (
            <circle
              key={`a2-dot-${r}-${c}`}
              cx={A2_LLM.x + 12 + c * 14}
              cy={A2_LLM.y + 20 + r * 16}
              r="1.2"
              fill="var(--copper-300)"
              opacity={((r + c) % 3) * 0.22 + 0.18}
            />
          )),
        )}
        <text
          x={A2_LLM.x + A2_LLM.w / 2}
          y={A2_LLM.y + A2_LLM.h + 16}
          textAnchor="middle"
          fill="#f5f5f5"
          fontFamily="JetBrains Mono"
          fontSize="9"
          letterSpacing="0.06em"
        >
          LLM · gemini-flash
        </text>

        {/* Fan-out from INPUT to scraper + LLM */}
        {(() => {
          const start = bottom(A2_INPUT);
          const scraperEnd = { x: A2_SCRAPER.x + A2_SCRAPER.w / 2, y: A2_SCRAPER.y - 4 };
          const llmEnd = { x: A2_LLM.x + A2_LLM.w / 2, y: A2_LLM.y - 4 };
          const scraperTangent = unitVec(start, scraperEnd);
          const llmTangent = unitVec(start, llmEnd);
          const dScraper = withArrow(
            `M ${start.x} ${start.y} L ${scraperEnd.x} ${scraperEnd.y}`,
            scraperEnd,
            scraperTangent,
            6,
          );
          const dLlm = withArrow(
            `M ${start.x} ${start.y} L ${llmEnd.x} ${llmEnd.y}`,
            llmEnd,
            llmTangent,
            6,
          );
          return (
            <>
              <motion.path
                d={dScraper}
                stroke="var(--copper-300)"
                strokeWidth="1.1"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                {...revealLoop(1.9)}
              />
              <motion.path
                d={dLlm}
                stroke="var(--copper-300)"
                strokeWidth="1.1"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                {...revealLoop(2.0)}
              />
            </>
          );
        })()}

        {/* Fan-in to output pill */}
        {(() => {
          const scraperB = { x: A2_SCRAPER.x + A2_SCRAPER.w / 2, y: A2_SCRAPER.y + A2_SCRAPER.h + 22 };
          const llmB = { x: A2_LLM.x + A2_LLM.w / 2, y: A2_LLM.y + A2_LLM.h + 22 };
          const outTop = { x: A2_OUT.x + A2_OUT.w / 2, y: A2_OUT.y };
          const scraperEnd = { x: outTop.x - 20, y: outTop.y - 4 };
          const llmEnd = { x: outTop.x + 20, y: outTop.y - 4 };
          const dScraper = withArrow(
            `M ${scraperB.x} ${scraperB.y} L ${scraperEnd.x} ${scraperEnd.y}`,
            scraperEnd,
            unitVec(scraperB, scraperEnd),
            6,
          );
          const dLlm = withArrow(
            `M ${llmB.x} ${llmB.y} L ${llmEnd.x} ${llmEnd.y}`,
            llmEnd,
            unitVec(llmB, llmEnd),
            6,
          );
          return (
            <>
              <motion.path
                d={dScraper}
                stroke="var(--copper-700)"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                {...revealLoop(2.3)}
              />
              <motion.path
                d={dLlm}
                stroke="var(--copper-700)"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                {...revealLoop(2.4)}
              />
            </>
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
          news ↔ ticker map
        </text>

        {/* ─── A2 → A3 connector: FAN-IN (4 → 1) ────────────────────────── */}
        {(() => {
          const toX = A3_EXTRACT.x;
          const toY = A3_EXTRACT.y + A3_EXTRACT.h / 2;
          const fromX = G2.x + G2.w;
          const midX = (G2.x + G2.w + G3.x) / 2;
          const midY = 270;
          const labelW = 138;
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
              {Array.from({ length: 4 }).map((_, i) => {
                const fromY = G2.y + 100 + i * 80;
                const c1x = fromX + 50;
                const c1y = fromY;
                const c2x = toX - 50;
                const c2y = toY;
                const tangent = unitVec({ x: c2x, y: c2y }, { x: toX, y: toY });
                const d = withArrow(
                  `M ${fromX} ${fromY} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${toX} ${toY}`,
                  { x: toX, y: toY },
                  tangent,
                  8,
                );
                return (
                  <motion.path
                    key={`a2a3-${i}`}
                    d={d}
                    stroke="var(--copper-500)"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    {...revealLoop(2.6)}
                  />
                );
              })}
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
                parallel batches
              </motion.text>
            </g>
          );
        })()}

        {/* ─── AGENT 3 · Ticker Generator ─────────────────────────────────── */}
        {/* Ticker Extraction node */}
        <rect
          x={A3_EXTRACT.x}
          y={A3_EXTRACT.y}
          width={A3_EXTRACT.w}
          height={A3_EXTRACT.h}
          fill="none"
          stroke="var(--copper-700)"
          strokeWidth="1.2"
          rx="3"
        />
        <text
          x={A3_EXTRACT.x + A3_EXTRACT.w / 2}
          y={A3_EXTRACT.y + 26}
          textAnchor="middle"
          fill="#f5f5f5"
          fontFamily="Source Serif 4"
          fontSize="13"
        >
          Ticker Extraction
        </text>
        <text
          x={A3_EXTRACT.x + A3_EXTRACT.w / 2}
          y={A3_EXTRACT.y + 44}
          textAnchor="middle"
          fill="#a3a3a3"
          fontFamily="JetBrains Mono"
          fontStyle="italic"
          fontSize="9"
        >
          regex + LLM
        </text>

        {/* Ground truth reference card */}
        <rect
          x={A3_GROUND.x}
          y={A3_GROUND.y}
          width={A3_GROUND.w}
          height={A3_GROUND.h}
          fill="none"
          stroke="var(--copper-700)"
          strokeWidth="1"
          strokeDasharray="3 3"
          rx="3"
        />
        <text
          x={A3_GROUND.x + A3_GROUND.w / 2}
          y={A3_GROUND.y + 12}
          textAnchor="middle"
          fill="#d99e6c"
          fontFamily="JetBrains Mono"
          fontSize="7"
          letterSpacing="0.08em"
        >
          GROUND TRUTH
        </text>
        {["GOOG", "AAPL", "AMZN", "NVDA"].map((t, i) => (
          <text
            key={t}
            x={A3_GROUND.x + A3_GROUND.w / 2}
            y={A3_GROUND.y + 28 + i * 13}
            textAnchor="middle"
            fill="#a3a3a3"
            fontFamily="JetBrains Mono"
            fontSize="9"
          >
            {t}
          </text>
        ))}

        {/* Cross-check arrow */}
        {(() => {
          const start = right(A3_EXTRACT);
          const end = { x: left(A3_GROUND).x - 4, y: left(A3_GROUND).y };
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
              stroke="var(--copper-700)"
              strokeWidth="0.9"
              strokeDasharray="3 3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              {...revealLoop(3.0)}
            />
          );
        })()}

        {/* Score & Outlook LLM */}
        <rect
          x={A3_SCORE.x}
          y={A3_SCORE.y}
          width={A3_SCORE.w}
          height={A3_SCORE.h}
          fill="none"
          stroke="var(--copper-300)"
          strokeWidth="1.4"
          rx="6"
        />
        <text
          x={A3_SCORE.x + A3_SCORE.w / 2}
          y={A3_SCORE.y + 28}
          textAnchor="middle"
          fill="#f5f5f5"
          fontFamily="Source Serif 4"
          fontSize="14"
        >
          LLM · Score &amp; Outlook
        </text>
        <text
          x={A3_SCORE.x + A3_SCORE.w / 2}
          y={A3_SCORE.y + 50}
          textAnchor="middle"
          fill="#a3a3a3"
          fontFamily="JetBrains Mono"
          fontStyle="italic"
          fontSize="9"
        >
          importance · outlook
        </text>

        {/* Extract → Score */}
        {(() => {
          const start = bottom(A3_EXTRACT);
          const end = { x: A3_SCORE.x + A3_SCORE.w / 2 - 40, y: A3_SCORE.y - 4 };
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
              {...revealLoop(3.1)}
            />
          );
        })()}

        {/* Ground → Score (dashed) */}
        {(() => {
          const start = bottom(A3_GROUND);
          const end = { x: A3_SCORE.x + A3_SCORE.w / 2 + 40, y: A3_SCORE.y - 4 };
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
              stroke="var(--copper-700)"
              strokeWidth="1"
              strokeDasharray="3 3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              {...revealLoop(3.2)}
            />
          );
        })()}

        {/* TOP 10 banner */}
        <rect
          x={A3_TOP10.x}
          y={A3_TOP10.y}
          width={A3_TOP10.w}
          height={A3_TOP10.h}
          fill="none"
          stroke="var(--copper-300)"
          strokeWidth="1.5"
          rx="3"
        />
        <text
          x={A3_TOP10.x + A3_TOP10.w / 2}
          y={A3_TOP10.y + 26}
          textAnchor="middle"
          fill="#d99e6c"
          fontFamily="JetBrains Mono"
          fontSize="14"
          letterSpacing="0.12em"
        >
          TOP 10 TICKERS
        </text>
        <text
          x={A3_TOP10.x + A3_TOP10.w / 2}
          y={A3_TOP10.y + 44}
          textAnchor="middle"
          fill="#a3a3a3"
          fontFamily="JetBrains Mono"
          fontSize="9"
        >
          ranked by score
        </text>

        {/* Score → Top10 */}
        {(() => {
          const start = bottom(A3_SCORE);
          const end = { x: top(A3_TOP10).x, y: top(A3_TOP10).y - 4 };
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
              {...revealLoop(3.4)}
            />
          );
        })()}

        {/* ─── A3 → A4 connector: single curved Bezier ──────────────────── */}
        {(() => {
          const start = right(A3_TOP10);
          const end = { x: G4.x, y: A4_TEMPLATE.y + A4_TEMPLATE.h / 2 };
          const c1x = start.x + 60;
          const c1y = start.y;
          const c2x = end.x - 60;
          const c2y = end.y;
          const midX = (G3.x + G3.w + G4.x) / 2;
          const midY = 310;
          const labelW = 76;
          const labelH = 22;
          const labelPulse = {
            initial: { opacity: 0 },
            animate: { opacity: [0, 1, 1, 0] },
            transition: {
              duration: 9,
              repeat: Infinity,
              delay: 3.7,
              times: [0, 0.45, 0.9, 1],
              ease: "easeInOut" as const,
            },
          };
          const tangent = unitVec({ x: c2x, y: c2y }, { x: end.x, y: end.y });
          const d = withArrow(
            `M ${start.x} ${start.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${end.x} ${end.y}`,
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
                {...revealLoop(3.7)}
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
                top 10
              </motion.text>
            </g>
          );
        })()}

        {/* ─── AGENT 4 · Summary Generator (vertical stack) ───────────────── */}
        <rect
          x={A4_TEMPLATE.x}
          y={A4_TEMPLATE.y}
          width={A4_TEMPLATE.w}
          height={A4_TEMPLATE.h}
          fill="none"
          stroke="var(--copper-300)"
          strokeWidth="1.4"
          rx="6"
        />
        <text
          x={A4_TEMPLATE.x + A4_TEMPLATE.w / 2}
          y={A4_TEMPLATE.y + 30}
          textAnchor="middle"
          fill="#f5f5f5"
          fontFamily="Source Serif 4"
          fontSize="12"
        >
          LLM · Brief
        </text>
        <text
          x={A4_TEMPLATE.x + A4_TEMPLATE.w / 2}
          y={A4_TEMPLATE.y + 48}
          textAnchor="middle"
          fill="#f5f5f5"
          fontFamily="Source Serif 4"
          fontSize="12"
        >
          Template
        </text>
        <text
          x={A4_TEMPLATE.x + A4_TEMPLATE.w / 2}
          y={A4_TEMPLATE.y + 66}
          textAnchor="middle"
          fill="#a3a3a3"
          fontFamily="JetBrains Mono"
          fontStyle="italic"
          fontSize="9"
        >
          fill template
        </text>

        {/* Slack output */}
        <rect
          x={A4_SLACK.x}
          y={A4_SLACK.y}
          width={A4_SLACK.w}
          height={A4_SLACK.h}
          fill="none"
          stroke="var(--copper-300)"
          strokeWidth="1.2"
          rx="4"
        />
        {(() => {
          const sx = A4_SLACK.x + 18;
          const sy = A4_SLACK.y + 18;
          const bw = A4_SLACK.w - 36;
          return (
            <>
              <path
                d={`M ${sx} ${sy} h ${bw} v 28 h ${-(bw - 14)} l -10 10 v -10 h -4 z`}
                fill="none"
                stroke="var(--copper-700)"
                strokeWidth="0.9"
              />
              <line
                x1={sx + 8}
                y1={sy + 10}
                x2={sx + bw - 14}
                y2={sy + 10}
                stroke="var(--copper-700)"
                strokeWidth="0.8"
              />
              <line
                x1={sx + 8}
                y1={sy + 20}
                x2={sx + bw - 22}
                y2={sy + 20}
                stroke="var(--copper-700)"
                strokeWidth="0.8"
              />
            </>
          );
        })()}
        <text
          x={A4_SLACK.x + A4_SLACK.w / 2}
          y={A4_SLACK.y + 86}
          textAnchor="middle"
          fill="#f5f5f5"
          fontFamily="Source Serif 4"
          fontSize="11"
        >
          Slack
        </text>
        <text
          x={A4_SLACK.x + A4_SLACK.w / 2}
          y={A4_SLACK.y + 104}
          textAnchor="middle"
          fill="#a3a3a3"
          fontFamily="JetBrains Mono"
          fontSize="8"
        >
          #stocks-trending
        </text>

        {/* Sheets output */}
        <rect
          x={A4_SHEETS.x}
          y={A4_SHEETS.y}
          width={A4_SHEETS.w}
          height={A4_SHEETS.h}
          fill="none"
          stroke="var(--copper-300)"
          strokeWidth="1.2"
          rx="4"
        />
        {(() => {
          const cell = 16;
          const cols = 4;
          const rows = 3;
          const gx = A4_SHEETS.x + (A4_SHEETS.w - cols * cell) / 2;
          const gy = A4_SHEETS.y + 18;
          const lines = [];
          for (let i = 0; i <= cols; i++) {
            lines.push(
              <line
                key={`sh-v-${i}`}
                x1={gx + i * cell}
                y1={gy}
                x2={gx + i * cell}
                y2={gy + rows * cell}
                stroke="var(--copper-700)"
                strokeWidth="0.8"
              />,
            );
          }
          for (let i = 0; i <= rows; i++) {
            lines.push(
              <line
                key={`sh-h-${i}`}
                x1={gx}
                y1={gy + i * cell}
                x2={gx + cols * cell}
                y2={gy + i * cell}
                stroke="var(--copper-700)"
                strokeWidth="0.8"
              />,
            );
          }
          lines.push(
            <rect
              key="sh-head"
              x={gx}
              y={gy}
              width={cols * cell}
              height={cell}
              fill="var(--copper-700)"
              opacity="0.15"
            />,
          );
          return <g>{lines}</g>;
        })()}
        <text
          x={A4_SHEETS.x + A4_SHEETS.w / 2}
          y={A4_SHEETS.y + 86}
          textAnchor="middle"
          fill="#f5f5f5"
          fontFamily="Source Serif 4"
          fontSize="11"
        >
          Google Sheets
        </text>
        <text
          x={A4_SHEETS.x + A4_SHEETS.w / 2}
          y={A4_SHEETS.y + 104}
          textAnchor="middle"
          fill="#a3a3a3"
          fontFamily="JetBrains Mono"
          fontSize="8"
        >
          archive log
        </text>

        {/* Template → Slack (down-left) and Template → Sheets (down-right), two diverging curves */}
        {(() => {
          const slackStart = bottom(A4_TEMPLATE);
          const slackEnd = { x: A4_SLACK.x + A4_SLACK.w / 2, y: A4_SLACK.y - 4 };
          const slackC1 = { x: slackStart.x, y: slackStart.y + 40 };
          const slackC2 = { x: slackEnd.x, y: slackEnd.y - 40 };
          const sheetsStart = bottom(A4_TEMPLATE);
          const sheetsEnd = { x: A4_SHEETS.x + A4_SHEETS.w / 2, y: A4_SHEETS.y - 4 };
          const sheetsC1 = { x: sheetsStart.x, y: sheetsStart.y + 40 };
          const sheetsC2 = { x: sheetsEnd.x, y: sheetsEnd.y - 40 };
          const slackTangent = unitVec(slackC2, slackEnd);
          const sheetsTangent = unitVec(sheetsC2, sheetsEnd);
          const dSlack = withArrow(
            `M ${slackStart.x} ${slackStart.y} C ${slackC1.x} ${slackC1.y}, ${slackC2.x} ${slackC2.y}, ${slackEnd.x} ${slackEnd.y}`,
            slackEnd,
            slackTangent,
            7,
          );
          const dSheets = withArrow(
            `M ${sheetsStart.x} ${sheetsStart.y} C ${sheetsC1.x} ${sheetsC1.y}, ${sheetsC2.x} ${sheetsC2.y}, ${sheetsEnd.x} ${sheetsEnd.y}`,
            sheetsEnd,
            sheetsTangent,
            7,
          );
          return (
            <>
              <motion.path
                d={dSlack}
                stroke="var(--copper-300)"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                {...revealLoop(3.9)}
              />
              <motion.path
                d={dSheets}
                stroke="var(--copper-300)"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                {...revealLoop(4.0)}
              />
            </>
          );
        })()}

        {/* ─── Apps end-circle (mirror of cron) ────────────────────────────── */}
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
            y={APPS.cy + 4}
            textAnchor="middle"
            fill="#f5f5f5"
            fontFamily="JetBrains Mono"
            fontSize="11"
          >
            Apps
          </text>
          <text
            x={APPS.cx}
            y={APPS.cy + 42}
            textAnchor="middle"
            fill="#a3a3a3"
            fontFamily="JetBrains Mono"
            fontSize="10"
          >
            destinations
          </text>
        </g>

        {/* Agent 4 right edge → Apps (L-shaped, mirrors cron→G1) */}
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
              {...revealLoop(4.3)}
            />
          );
        })()}
      </svg>
    </div>
  );
}
