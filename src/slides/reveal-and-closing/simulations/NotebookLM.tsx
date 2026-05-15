import { motion } from "framer-motion";

// viewBox 1600 × 540 — static router-and-specialists card grid:
// NLM router (left) + 6 specialist lanes in 2 tiers (top: ingest, bottom: knowledge).

type Box = { x: number; y: number; w: number; h: number };

// ── Geometry ───────────────────────────────────────────────────────
const ROUTER: Box = { x: 110, y: 50, w: 170, h: 460 };

const LANE_W = 380;
const LANE_H = 210;
const TIER_TOP_Y = 50;
const TIER_BOTTOM_Y = 295;
const LANE_X = [320, 720, 1120] as const;

const LANES = [
  {
    key: "youtube-curator",
    tier: "top" as const,
    laneCol: 0,
    label: "INGEST · VIDEO SOURCES",
    title: "youtube-curator",
    subtitle: "video discovery → bulk add",
    dashed: false,
  },
  {
    key: "drive-scout",
    tier: "top" as const,
    laneCol: 1,
    label: "INGEST · DRIVE SOURCES",
    title: "drive-scout",
    subtitle: "Drive search → quota-checked import",
    dashed: false,
  },
  {
    key: "url-crawler",
    tier: "top" as const,
    laneCol: 2,
    label: "INGEST · URL SOURCES",
    title: "url-crawler",
    subtitle: "crawl pages → chunked add",
    dashed: false,
  },
  {
    key: "deep-researcher",
    tier: "bottom" as const,
    laneCol: 0,
    label: "KNOWLEDGE · DEEP RESEARCH",
    title: "deep-researcher",
    subtitle: "hybrid RAG · parallel queries",
    dashed: false,
  },
  {
    key: "cross-notebook-query",
    tier: "bottom" as const,
    laneCol: 1,
    label: "KNOWLEDGE · CROSS-NOTEBOOK",
    title: "cross-notebook-query",
    subtitle: "discover · query · contradict",
    dashed: false,
  },
  {
    key: "brain-compiler",
    tier: "bottom" as const,
    laneCol: 2,
    label: "KNOWLEDGE · SECOND-BRAIN",
    title: "brain-compiler",
    subtitle: "second-brain · wiki synth",
    dashed: true,
  },
] as const;

export function NotebookLM() {
  return (
    <div className="h-full w-full p-6">
      <svg viewBox="0 0 1600 540" className="h-full w-full">
        {/* ─── NLM Router box ─────────────────────────────────────────── */}
        <text
          x={ROUTER.x + 4}
          y={ROUTER.y - 14}
          fill="#d99e6c"
          fontFamily="JetBrains Mono"
          fontSize="11"
          letterSpacing="0.04em"
        >
          NLM INTENT CLASSIFIER
        </text>
        <rect
          x={ROUTER.x}
          y={ROUTER.y}
          width={ROUTER.w}
          height={ROUTER.h}
          fill="var(--neutral-900)"
          stroke="var(--copper-300)"
          strokeWidth="1.4"
          rx="6"
        />

        {/* Router title block */}
        <text
          x={ROUTER.x + ROUTER.w / 2}
          y={ROUTER.y + 28}
          textAnchor="middle"
          fill="#f5f5f5"
          fontFamily="Source Serif 4"
          fontSize="18"
        >
          nlm
        </text>
        <text
          x={ROUTER.x + ROUTER.w / 2}
          y={ROUTER.y + 46}
          textAnchor="middle"
          fill="#a3a3a3"
          fontFamily="Source Serif 4"
          fontStyle="italic"
          fontSize="11"
        >
          intent → agent
        </text>

        {/* Router LLM glyph: 5 cols × 7 rows dot-grid */}
        {(() => {
          const cols = 5;
          const rows = 7;
          const cellW = 14;
          const cellH = 12;
          const gridW = cols * cellW;
          const gx = ROUTER.x + (ROUTER.w - gridW) / 2 + cellW / 2;
          const gy = ROUTER.y + 70;
          return Array.from({ length: rows }).map((_, r) =>
            Array.from({ length: cols }).map((_, c) => (
              <circle
                key={`nlm-dot-${r}-${c}`}
                cx={gx + c * cellW}
                cy={gy + r * cellH}
                r="1.4"
                fill="var(--copper-300)"
                opacity={((r + c) % 3) * 0.18 + 0.22}
              />
            )),
          );
        })()}

        {/* Router 6 routing-indicator rows */}
        {(() => {
          const rows = [
            { text: "research → deep-researcher", italic: false },
            { text: "query → cross-notebook", italic: false },
            { text: "youtube → curator", italic: false },
            { text: "drive → scout", italic: false },
            { text: "url → crawler", italic: false },
            { text: "wrap-up → compiler (skill)", italic: false },
          ];
          const startY = ROUTER.y + 70 + 7 * 12 + 26;
          const rowH = 16;
          const dotX = ROUTER.x + 14;
          const textX = ROUTER.x + 22;
          return rows.map((row, i) => {
            const y = startY + i * rowH;
            return (
              <g key={`nlm-row-${i}`}>
                <circle
                  cx={dotX}
                  cy={y - 3}
                  r="1.8"
                  fill="var(--copper-700)"
                />
                <text
                  x={textX}
                  y={y}
                  fill={row.italic ? "#a3a3a3" : "#f5f5f5"}
                  fontFamily="JetBrains Mono"
                  fontStyle={row.italic ? "italic" : "normal"}
                  fontSize="9"
                >
                  {row.text}
                </text>
              </g>
            );
          });
        })()}

        {/* ─── Six lane boxes (each with its own group-box label) ──────── */}
        {LANES.map((lane) => {
          const y = lane.tier === "top" ? TIER_TOP_Y : TIER_BOTTOM_Y;
          const x = LANE_X[lane.laneCol];
          const stroke = lane.dashed
            ? "var(--copper-500)"
            : lane.key === "deep-researcher"
              ? "var(--copper-300)"
              : "var(--copper-500)";
          return (
            <g key={`lane-box-${lane.key}`}>
              <text
                x={x + 4}
                y={y - 14}
                fill="#d99e6c"
                fontFamily="JetBrains Mono"
                fontSize="11"
                letterSpacing="0.04em"
              >
                {lane.label}
              </text>
              <rect
                x={x}
                y={y}
                width={LANE_W}
                height={LANE_H}
                fill="var(--neutral-900)"
                stroke={stroke}
                strokeWidth={lane.key === "deep-researcher" ? 1.4 : 1.2}
                strokeDasharray={lane.dashed ? "6 4" : undefined}
                rx="6"
              />
            </g>
          );
        })}

        {/* ─── Lane internals ──────────────────────────────────────────── */}
        {LANES.map((lane) => {
          const ly = lane.tier === "top" ? TIER_TOP_Y : TIER_BOTTOM_Y;
          const lx = LANE_X[lane.laneCol];
          return (
            <g key={`lane-internal-${lane.key}`}>
              {/* Title */}
              <text
                x={lx + 16}
                y={ly + 24}
                fill="#f5f5f5"
                fontFamily="Source Serif 4"
                fontSize="14"
              >
                {lane.title}
              </text>
              {/* Subtitle */}
              <text
                x={lx + 16}
                y={ly + 42}
                fill="#a3a3a3"
                fontFamily="Source Serif 4"
                fontStyle="italic"
                fontSize="10"
              >
                {lane.subtitle}
              </text>
            </g>
          );
        })}

        {/* ── Lane 1 · youtube-curator internals ───────────────────────── */}
        {(() => {
          const lx = LANE_X[0];
          const ly = TIER_TOP_Y;
          // YouTube glyph: rounded rect + play triangle
          const ytX = lx + 20;
          const ytY = ly + 60;
          const ytW = 50;
          const ytH = 34;
          return (
            <g>
              <rect
                x={ytX}
                y={ytY}
                width={ytW}
                height={ytH}
                fill="none"
                stroke="var(--copper-300)"
                strokeWidth="1"
                rx="6"
              />
              <path
                d={`M ${ytX + 20} ${ytY + 10} L ${ytX + 34} ${ytY + 17} L ${ytX + 20} ${ytY + 24} Z`}
                fill="var(--copper-300)"
              />
              {/* Stacked rects suggesting × N videos parallel */}
              {Array.from({ length: 3 }).map((_, i) => (
                <rect
                  key={`yt-stack-${i}`}
                  x={lx + 90 + i * 4}
                  y={ytY + i * 4}
                  width={36}
                  height={26}
                  fill="none"
                  stroke="var(--copper-700)"
                  strokeWidth="0.9"
                  rx="2"
                />
              ))}
              <text
                x={lx + 144}
                y={ytY + 18}
                fill="#a3a3a3"
                fontFamily="JetBrains Mono"
                fontSize="9"
              >
                × N videos
              </text>
              {/* Phase pills */}
              <rect
                x={lx + 16}
                y={ly + 120}
                width={170}
                height={26}
                fill="none"
                stroke="var(--copper-700)"
                strokeWidth="1"
                rx="13"
              />
              <text
                x={lx + 101}
                y={ly + 137}
                textAnchor="middle"
                fill="#d99e6c"
                fontFamily="JetBrains Mono"
                fontSize="9"
              >
                P1 · search + caption
              </text>
              <rect
                x={lx + 196}
                y={ly + 120}
                width={168}
                height={26}
                fill="none"
                stroke="var(--copper-700)"
                strokeWidth="1"
                rx="13"
              />
              <text
                x={lx + 280}
                y={ly + 137}
                textAnchor="middle"
                fill="#d99e6c"
                fontFamily="JetBrains Mono"
                fontSize="9"
              >
                P2 · add to notebook
              </text>
              {/* Footer caption */}
              <text
                x={lx + 16}
                y={ly + 184}
                fill="#a3a3a3"
                fontFamily="JetBrains Mono"
                fontStyle="italic"
                fontSize="9"
              >
                prunes captionless &lt; 500 bytes
              </text>
            </g>
          );
        })()}

        {/* ── Lane 2 · drive-scout internals ───────────────────────────── */}
        {(() => {
          const lx = LANE_X[1];
          const ly = TIER_TOP_Y;
          const gX = lx + 24;
          const gY = ly + 62;
          // Drive-style triangle silhouette
          return (
            <g>
              <path
                d={`M ${gX + 16} ${gY} L ${gX + 40} ${gY + 28} L ${gX + 24} ${gY + 28} Z`}
                fill="none"
                stroke="var(--copper-300)"
                strokeWidth="1"
              />
              <path
                d={`M ${gX} ${gY + 28} L ${gX + 16} ${gY} L ${gX + 8} ${gY + 28} Z`}
                fill="none"
                stroke="var(--copper-300)"
                strokeWidth="1"
              />
              <path
                d={`M ${gX + 8} ${gY + 28} L ${gX + 24} ${gY + 28} L ${gX + 32} ${gY + 14} L ${gX + 16} ${gY + 14} Z`}
                fill="none"
                stroke="var(--copper-300)"
                strokeWidth="1"
              />
              {/* Quota badge */}
              <rect
                x={lx + 90}
                y={gY + 6}
                width={88}
                height={20}
                fill="none"
                stroke="var(--copper-700)"
                strokeWidth="0.9"
                strokeDasharray="3 3"
                rx="10"
              />
              <text
                x={lx + 134}
                y={gY + 20}
                textAnchor="middle"
                fill="#a3a3a3"
                fontFamily="JetBrains Mono"
                fontSize="9"
              >
                quota-aware
              </text>
              {/* Phase pills */}
              <rect
                x={lx + 16}
                y={ly + 120}
                width={170}
                height={26}
                fill="none"
                stroke="var(--copper-700)"
                strokeWidth="1"
                rx="13"
              />
              <text
                x={lx + 101}
                y={ly + 137}
                textAnchor="middle"
                fill="#d99e6c"
                fontFamily="JetBrains Mono"
                fontSize="9"
              >
                P1 · scan + quota
              </text>
              <rect
                x={lx + 196}
                y={ly + 120}
                width={168}
                height={26}
                fill="none"
                stroke="var(--copper-700)"
                strokeWidth="1"
                rx="13"
              />
              <text
                x={lx + 280}
                y={ly + 137}
                textAnchor="middle"
                fill="#d99e6c"
                fontFamily="JetBrains Mono"
                fontSize="9"
              >
                P2 · batch import
              </text>
              <text
                x={lx + 16}
                y={ly + 184}
                fill="#a3a3a3"
                fontFamily="JetBrains Mono"
                fontStyle="italic"
                fontSize="9"
              >
                cap 20 · circuit-break × 3
              </text>
            </g>
          );
        })()}

        {/* ── Lane 3 · url-crawler internals ───────────────────────────── */}
        {(() => {
          const lx = LANE_X[2];
          const ly = TIER_TOP_Y;
          const cx = lx + 38;
          const cy = ly + 76;
          return (
            <g>
              {/* Globe glyph */}
              <circle
                cx={cx}
                cy={cy}
                r="16"
                fill="none"
                stroke="var(--copper-300)"
                strokeWidth="1"
              />
              <ellipse
                cx={cx}
                cy={cy}
                rx="6"
                ry="16"
                fill="none"
                stroke="var(--copper-300)"
                strokeWidth="0.8"
              />
              <line
                x1={cx - 16}
                y1={cy}
                x2={cx + 16}
                y2={cy}
                stroke="var(--copper-300)"
                strokeWidth="0.8"
              />
              {/* Chunk indicator */}
              {Array.from({ length: 4 }).map((_, i) => (
                <rect
                  key={`chunk-${i}`}
                  x={lx + 90 + i * 22}
                  y={cy - 10}
                  width={18}
                  height={20}
                  fill="none"
                  stroke="var(--copper-700)"
                  strokeWidth="0.9"
                  rx="2"
                />
              ))}
              <text
                x={lx + 188}
                y={cy + 4}
                fill="#a3a3a3"
                fontFamily="JetBrains Mono"
                fontSize="9"
              >
                chunks
              </text>
              {/* Phase pills */}
              <rect
                x={lx + 16}
                y={ly + 120}
                width={170}
                height={26}
                fill="none"
                stroke="var(--copper-700)"
                strokeWidth="1"
                rx="13"
              />
              <text
                x={lx + 101}
                y={ly + 137}
                textAnchor="middle"
                fill="#d99e6c"
                fontFamily="JetBrains Mono"
                fontSize="9"
              >
                P1 · crawl + present
              </text>
              <rect
                x={lx + 196}
                y={ly + 120}
                width={168}
                height={26}
                fill="none"
                stroke="var(--copper-700)"
                strokeWidth="1"
                rx="13"
              />
              <text
                x={lx + 280}
                y={ly + 137}
                textAnchor="middle"
                fill="#d99e6c"
                fontFamily="JetBrains Mono"
                fontSize="9"
              >
                P2 · add chunks of 10
              </text>
              <text
                x={lx + 16}
                y={ly + 184}
                fill="#a3a3a3"
                fontFamily="JetBrains Mono"
                fontStyle="italic"
                fontSize="9"
              >
                respects robots.txt
              </text>
            </g>
          );
        })()}

        {/* ── Lane 4 · deep-researcher internals (headline agent) ──────── */}
        {(() => {
          const lx = LANE_X[0];
          const ly = TIER_BOTTOM_Y;
          // Dot-grid mini (LLM-feel, with subtle live pulse)
          const cols = 6;
          const rows = 4;
          const cellW = 10;
          const cellH = 10;
          const gx = lx + 20;
          const gy = ly + 60;
          return (
            <g>
              {Array.from({ length: rows }).map((_, r) =>
                Array.from({ length: cols }).map((_, c) => (
                  <motion.circle
                    key={`dr-dot-${r}-${c}`}
                    cx={gx + c * cellW}
                    cy={gy + r * cellH}
                    r="1.3"
                    fill="var(--copper-300)"
                    initial={{ opacity: 0.3 }}
                    animate={{
                      opacity: [
                        0.2 + ((r + c) % 3) * 0.15,
                        0.55 + ((r + c) % 3) * 0.15,
                        0.2 + ((r + c) % 3) * 0.15,
                      ],
                    }}
                    transition={{
                      duration: 2.6,
                      repeat: Infinity,
                      delay: ((r * cols + c) % 6) * 0.18,
                      ease: "easeInOut",
                    }}
                  />
                )),
              )}
              {/* Three mini-pills horizontally */}
              {[
                { x: lx + 96, label: "decompose" },
                { x: lx + 180, label: "parallel RAG" },
                { x: lx + 264, label: "synthesize" },
              ].map((p) => (
                <g key={`dr-pill-${p.label}`}>
                  <rect
                    x={p.x}
                    y={ly + 64}
                    width={76}
                    height={22}
                    fill="none"
                    stroke="var(--copper-700)"
                    strokeWidth="1"
                    rx="11"
                  />
                  <text
                    x={p.x + 38}
                    y={ly + 79}
                    textAnchor="middle"
                    fill="#d99e6c"
                    fontFamily="JetBrains Mono"
                    fontSize="9"
                  >
                    {p.label}
                  </text>
                </g>
              ))}
              {/* Scope row */}
              <text
                x={lx + 16}
                y={ly + 124}
                fill="#a3a3a3"
                fontFamily="JetBrains Mono"
                fontSize="9"
              >
                scope · notebook + local + web
              </text>
              {/* Wall-clock caption */}
              <text
                x={lx + 16}
                y={ly + 184}
                fill="#a3a3a3"
                fontFamily="JetBrains Mono"
                fontStyle="italic"
                fontSize="9"
              >
                ~12s wall · citations by source-type
              </text>
            </g>
          );
        })()}

        {/* ── Lane 5 · cross-notebook-query internals ──────────────────── */}
        {(() => {
          const lx = LANE_X[1];
          const ly = TIER_BOTTOM_Y;
          // Three notebook glyphs with a "?" badge
          const nbY = ly + 58;
          const nbW = 32;
          const nbH = 38;
          return (
            <g>
              {[0, 1, 2].map((i) => {
                const nx = lx + 20 + i * 46;
                return (
                  <g key={`nb-${i}`}>
                    <rect
                      x={nx}
                      y={nbY}
                      width={nbW}
                      height={nbH}
                      fill="none"
                      stroke="var(--copper-300)"
                      strokeWidth="1"
                      rx="2"
                    />
                    {/* corner fold */}
                    <path
                      d={`M ${nx + nbW - 8} ${nbY} L ${nx + nbW} ${nbY + 8} L ${nx + nbW - 8} ${nbY + 8} Z`}
                      fill="var(--copper-700)"
                      opacity="0.5"
                    />
                    {/* lines */}
                    {Array.from({ length: 3 }).map((_, j) => (
                      <line
                        key={`nb-line-${i}-${j}`}
                        x1={nx + 4}
                        y1={nbY + 16 + j * 6}
                        x2={nx + nbW - 6}
                        y2={nbY + 16 + j * 6}
                        stroke="var(--copper-700)"
                        strokeWidth="0.7"
                      />
                    ))}
                  </g>
                );
              })}
              {/* "?" badge between notebooks */}
              <circle
                cx={lx + 174}
                cy={nbY + nbH / 2}
                r="12"
                fill="none"
                stroke="var(--copper-300)"
                strokeWidth="1"
              />
              <text
                x={lx + 174}
                y={nbY + nbH / 2 + 5}
                textAnchor="middle"
                fill="#d99e6c"
                fontFamily="JetBrains Mono"
                fontSize="13"
              >
                ?
              </text>
              {/* Phase pills */}
              <rect
                x={lx + 200}
                y={nbY + 4}
                width={166}
                height={22}
                fill="none"
                stroke="var(--copper-700)"
                strokeWidth="1"
                rx="11"
              />
              <text
                x={lx + 283}
                y={nbY + 19}
                textAnchor="middle"
                fill="#d99e6c"
                fontFamily="JetBrains Mono"
                fontSize="9"
              >
                P1 · rank notebooks
              </text>
              <rect
                x={lx + 200}
                y={nbY + 32}
                width={166}
                height={22}
                fill="none"
                stroke="var(--copper-700)"
                strokeWidth="1"
                rx="11"
              />
              <text
                x={lx + 283}
                y={nbY + 47}
                textAnchor="middle"
                fill="#d99e6c"
                fontFamily="JetBrains Mono"
                fontSize="9"
              >
                P2 · parallel + contradict
              </text>
              <text
                x={lx + 16}
                y={ly + 184}
                fill="#a3a3a3"
                fontFamily="JetBrains Mono"
                fontStyle="italic"
                fontSize="9"
              >
                emits ## Contradictions
              </text>
            </g>
          );
        })()}

        {/* ── Lane 6 · brain-compiler internals (second-order) ─────────── */}
        {(() => {
          const lx = LANE_X[2];
          const ly = TIER_BOTTOM_Y;
          // Brain glyph: circle + arcs
          const bx = lx + 38;
          const by = ly + 78;
          return (
            <g>
              <circle
                cx={bx}
                cy={by}
                r="18"
                fill="none"
                stroke="var(--copper-300)"
                strokeWidth="1"
              />
              <path
                d={`M ${bx - 14} ${by} Q ${bx} ${by - 10} ${bx + 14} ${by}`}
                fill="none"
                stroke="var(--copper-300)"
                strokeWidth="0.9"
              />
              <path
                d={`M ${bx - 14} ${by} Q ${bx} ${by + 10} ${bx + 14} ${by}`}
                fill="none"
                stroke="var(--copper-300)"
                strokeWidth="0.9"
              />
              <line
                x1={bx}
                y1={by - 18}
                x2={bx}
                y2={by + 18}
                stroke="var(--copper-300)"
                strokeWidth="0.8"
                strokeDasharray="2 2"
              />
              {/* Phase pills */}
              <rect
                x={lx + 80}
                y={ly + 64}
                width={272}
                height={22}
                fill="none"
                stroke="var(--copper-700)"
                strokeWidth="1"
                strokeDasharray="3 3"
                rx="11"
              />
              <text
                x={lx + 216}
                y={ly + 79}
                textAnchor="middle"
                fill="#d99e6c"
                fontFamily="JetBrains Mono"
                fontSize="9"
              >
                read .nlm-brain/sessions
              </text>
              <rect
                x={lx + 80}
                y={ly + 94}
                width={272}
                height={22}
                fill="none"
                stroke="var(--copper-700)"
                strokeWidth="1"
                strokeDasharray="3 3"
                rx="11"
              />
              <text
                x={lx + 216}
                y={ly + 109}
                textAnchor="middle"
                fill="#d99e6c"
                fontFamily="JetBrains Mono"
                fontSize="9"
              >
                wiki draft + diff
              </text>
              <text
                x={lx + 16}
                y={ly + 184}
                fill="#a3a3a3"
                fontFamily="JetBrains Mono"
                fontStyle="italic"
                fontSize="9"
              >
                (via nlm-second-brain skill)
              </text>
            </g>
          );
        })()}

      </svg>
    </div>
  );
}
