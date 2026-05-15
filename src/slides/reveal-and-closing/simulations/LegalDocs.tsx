import { motion } from "framer-motion";

// viewBox 1600 × 540 — four "AI Agent" group boxes in a horizontal row,
// each framing its own mini-illustration. Slack /nanoearn trigger on the
// far-left feeds Agent 1; decline loop bridges Agent 2 ↔ Agent 3.

type Box = { x: number; y: number; w: number; h: number };

const right = (b: Box) => ({ x: b.x + b.w, y: b.y + b.h / 2 });
const left = (b: Box) => ({ x: b.x, y: b.y + b.h / 2 });
const top = (b: Box) => ({ x: b.x + b.w / 2, y: b.y });
const bottom = (b: Box) => ({ x: b.x + b.w / 2, y: b.y + b.h });

// Append a V-shaped arrowhead at the end of a path's `d` string.
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

// Group box bounds — match StocksIntel geometry.
const G1: Box = { x: 110, y: 50, w: 280, h: 460 };
const G2: Box = { x: 490, y: 50, w: 240, h: 460 };
const G3: Box = { x: 830, y: 50, w: 300, h: 460 };
const G4: Box = { x: 1230, y: 50, w: 280, h: 460 };

// Trigger circle on the far-left (Slack /nanoearn command).
const CRON = { cx: 45, cy: 270, r: 18 };
// Destination circle on the far-right.
const APPS = { cx: 1555, cy: 270, r: 18 };

// Agent 1 · Docs Generation — vertically stacked mini-illustrations.
const A1_FORM: Box = { x: G1.x + 16, y: G1.y + 50, w: G1.w - 32, h: 120 };
const A1_FOLDER: Box = { x: G1.x + 30, y: G1.y + 192, w: G1.w - 60, h: 56 };
const A1_TEMPLATE: Box = { x: G1.x + 30, y: G1.y + 266, w: G1.w - 60, h: 52 };
const A1_DOCWRITE: Box = { x: G1.x + 30, y: G1.y + 336, w: G1.w - 60, h: 52 };
const A1_OUT: Box = { x: G1.x + 30, y: G1.y + 410, w: G1.w - 60, h: 36 };

// Agent 2 · Approval Workflow — input → Slack approve message → Finance gate → Legal gate → output.
const A2_INPUT: Box = { x: G2.x + 20, y: G2.y + 50, w: G2.w - 40, h: 32 };
const A2_SLACK: Box = { x: G2.x + 20, y: G2.y + 102, w: G2.w - 40, h: 76 };
const A2_FINANCE: Box = { x: G2.x + 20, y: G2.y + 200, w: G2.w - 40, h: 70 };
const A2_LEGAL: Box = { x: G2.x + 20, y: G2.y + 296, w: G2.w - 40, h: 70 };
const A2_OUT: Box = { x: G2.x + 20, y: G2.y + 400, w: G2.w - 40, h: 36 };

// Agent 3 · AI Revision — input → LLM (dot-grid) + JSON delta → patched GDoc → output.
const A3_INPUT: Box = { x: G3.x + 20, y: G3.y + 50, w: G3.w - 40, h: 32 };
const A3_LLM: Box = { x: G3.x + 24, y: G3.y + 102, w: 130, h: 220 };
const A3_JSON: Box = { x: G3.x + 164, y: G3.y + 102, w: G3.w - 188, h: 105 };
const A3_PATCH: Box = { x: G3.x + 164, y: G3.y + 220, w: G3.w - 188, h: 102 };
const A3_OUT: Box = { x: G3.x + 30, y: G3.y + 400, w: G3.w - 60, h: 36 };

// Agent 4 · E-Sign Automation — input → PDF render → Dropbox Sign → email + webhook wait → outputs.
const A4_INPUT: Box = { x: G4.x + 20, y: G4.y + 50, w: G4.w - 40, h: 32 };
const A4_PDF: Box = { x: G4.x + 24, y: G4.y + 102, w: 110, h: 96 };
const A4_DROPBOX: Box = { x: G4.x + 146, y: G4.y + 102, w: G4.w - 170, h: 96 };
const A4_EMAIL: Box = { x: G4.x + 24, y: G4.y + 220, w: 110, h: 78 };
const A4_WEBHOOK: Box = { x: G4.x + 146, y: G4.y + 220, w: G4.w - 170, h: 78 };
const A4_DRIVE: Box = { x: G4.x + 24, y: G4.y + 320, w: 110, h: 100 };
const A4_SHEETS: Box = { x: G4.x + 146, y: G4.y + 320, w: G4.w - 170, h: 100 };

export function LegalDocs() {
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
          {/* Template → DocWrite particle path inside Agent 1 */}
          <path
            id="a1-particle-path"
            d={`M ${A1_TEMPLATE.x + A1_TEMPLATE.w / 2} ${A1_TEMPLATE.y + A1_TEMPLATE.h} C ${A1_TEMPLATE.x + A1_TEMPLATE.w / 2} ${A1_TEMPLATE.y + A1_TEMPLATE.h + 10}, ${A1_DOCWRITE.x + A1_DOCWRITE.w / 2} ${A1_DOCWRITE.y - 10}, ${A1_DOCWRITE.x + A1_DOCWRITE.w / 2} ${A1_DOCWRITE.y}`}
            fill="none"
          />
          {/* PDF → Dropbox Sign particle path inside Agent 4 */}
          <path
            id="a4-particle-path"
            d={`M ${A4_PDF.x + A4_PDF.w} ${A4_PDF.y + A4_PDF.h / 2} L ${A4_DROPBOX.x} ${A4_DROPBOX.y + A4_DROPBOX.h / 2}`}
            fill="none"
          />
        </defs>

        {/* ─── Trigger column · Slack /nanoearn ───────────────────────────── */}
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
            fontSize="11"
          >
            /nanoearn
          </text>
          <text
            x={CRON.cx}
            y={CRON.cy + 42}
            textAnchor="middle"
            fill="#a3a3a3"
            fontFamily="JetBrains Mono"
            fontSize="10"
          >
            Slack command
          </text>
        </g>

        {/* Slack command → Agent 1 left edge (L-shaped, dashed) */}
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
          { box: G1, label: "AGENT 1 · DOCS GENERATION" },
          { box: G2, label: "AGENT 2 · APPROVAL WORKFLOW" },
          { box: G3, label: "AI AGENT 3 · DOCS REVISION" },
          { box: G4, label: "AGENT 4 · E-SIGN AUTOMATION" },
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

        {/* ─── AGENT 1 · Docs Generation ─────────────────────────────────── */}
        {/* Slack form payload (modal mock) */}
        <rect
          x={A1_FORM.x}
          y={A1_FORM.y}
          width={A1_FORM.w}
          height={A1_FORM.h}
          fill="none"
          stroke="var(--copper-700)"
          strokeWidth="1"
          rx="4"
        />
        <text
          x={A1_FORM.x + 10}
          y={A1_FORM.y + 16}
          fill="#d99e6c"
          fontFamily="JetBrains Mono"
          fontSize="9"
          letterSpacing="0.08em"
        >
          SLACK FORM · /nanoearn
        </text>
        {[
          { label: "counterparty", value: "PT Bukit Asam" },
          { label: "amount", value: "USD 12,500" },
          { label: "doc_type", value: "MoU draft" },
          { label: "term", value: "12 months" },
        ].map((f, i) => {
          const rowY = A1_FORM.y + 38 + i * 18;
          return (
            <g key={`a1-form-${f.label}`}>
              <text
                x={A1_FORM.x + 14}
                y={rowY}
                fill="#a3a3a3"
                fontFamily="JetBrains Mono"
                fontSize="9"
              >
                {f.label}
              </text>
              <line
                x1={A1_FORM.x + 100}
                y1={rowY - 6}
                x2={A1_FORM.x + A1_FORM.w - 14}
                y2={rowY - 6}
                stroke="var(--copper-800)"
                strokeWidth="0.7"
              />
              <text
                x={A1_FORM.x + 104}
                y={rowY}
                fill="#f5f5f5"
                fontFamily="Source Serif 4"
                fontSize="11"
              >
                {f.value}
              </text>
            </g>
          );
        })}

        {/* Form → GDrive folder */}
        {(() => {
          const start = { x: A1_FORM.x + A1_FORM.w / 2, y: A1_FORM.y + A1_FORM.h };
          const end = { x: A1_FOLDER.x + A1_FOLDER.w / 2, y: A1_FOLDER.y - 4 };
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
              {...revealLoop(0.4)}
            />
          );
        })()}

        {/* GDrive folder node */}
        <rect
          x={A1_FOLDER.x}
          y={A1_FOLDER.y}
          width={A1_FOLDER.w}
          height={A1_FOLDER.h}
          fill="none"
          stroke="var(--copper-700)"
          strokeWidth="1"
          rx="3"
        />
        {(() => {
          const fx = A1_FOLDER.x + 14;
          const fy = A1_FOLDER.y + 18;
          return (
            <g>
              {/* Folder glyph: tab + body */}
              <path
                d={`M ${fx} ${fy + 4} L ${fx + 8} ${fy + 4} L ${fx + 11} ${fy} L ${fx + 26} ${fy} L ${fx + 26} ${fy + 18} L ${fx} ${fy + 18} Z`}
                fill="none"
                stroke="var(--copper-300)"
                strokeWidth="1"
                strokeLinejoin="round"
              />
              {/* Plus glyph in upper-right */}
              <line
                x1={fx + 22}
                y1={fy + 2}
                x2={fx + 22}
                y2={fy + 10}
                stroke="var(--copper-300)"
                strokeWidth="1.2"
              />
              <line
                x1={fx + 18}
                y1={fy + 6}
                x2={fx + 26}
                y2={fy + 6}
                stroke="var(--copper-300)"
                strokeWidth="1.2"
              />
            </g>
          );
        })()}
        <text
          x={A1_FOLDER.x + 50}
          y={A1_FOLDER.y + 24}
          fill="#f5f5f5"
          fontFamily="Source Serif 4"
          fontSize="12"
        >
          GDrive folder
        </text>
        <text
          x={A1_FOLDER.x + 50}
          y={A1_FOLDER.y + 40}
          fill="#a3a3a3"
          fontFamily="JetBrains Mono"
          fontStyle="italic"
          fontSize="9"
        >
          create + scope
        </text>

        {/* Folder → Template */}
        {(() => {
          const start = { x: A1_FOLDER.x + A1_FOLDER.w / 2, y: A1_FOLDER.y + A1_FOLDER.h };
          const end = { x: A1_TEMPLATE.x + A1_TEMPLATE.w / 2, y: A1_TEMPLATE.y - 4 };
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
              {...revealLoop(0.55)}
            />
          );
        })()}

        {/* Template fetch — Google Docs glyph */}
        <rect
          x={A1_TEMPLATE.x}
          y={A1_TEMPLATE.y}
          width={A1_TEMPLATE.w}
          height={A1_TEMPLATE.h}
          fill="none"
          stroke="var(--copper-700)"
          strokeWidth="1"
          rx="3"
        />
        {(() => {
          const dx = A1_TEMPLATE.x + 14;
          const dy = A1_TEMPLATE.y + 12;
          return (
            <g>
              {/* Doc with corner-fold */}
              <path
                d={`M ${dx} ${dy} L ${dx + 16} ${dy} L ${dx + 22} ${dy + 6} L ${dx + 22} ${dy + 28} L ${dx} ${dy + 28} Z`}
                fill="none"
                stroke="var(--copper-300)"
                strokeWidth="1"
                strokeLinejoin="round"
              />
              <path
                d={`M ${dx + 16} ${dy} L ${dx + 16} ${dy + 6} L ${dx + 22} ${dy + 6}`}
                fill="none"
                stroke="var(--copper-300)"
                strokeWidth="1"
              />
              {[10, 14, 18, 22].map((ly) => (
                <line
                  key={`a1-tmpl-line-${ly}`}
                  x1={dx + 3}
                  y1={dy + ly}
                  x2={dx + 19}
                  y2={dy + ly}
                  stroke="var(--copper-700)"
                  strokeWidth="0.7"
                />
              ))}
            </g>
          );
        })()}
        <text
          x={A1_TEMPLATE.x + 50}
          y={A1_TEMPLATE.y + 22}
          fill="#f5f5f5"
          fontFamily="Source Serif 4"
          fontSize="12"
        >
          Template
        </text>
        <text
          x={A1_TEMPLATE.x + 50}
          y={A1_TEMPLATE.y + 38}
          fill="#a3a3a3"
          fontFamily="JetBrains Mono"
          fontStyle="italic"
          fontSize="9"
        >
          fetch master
        </text>

        {/* Template → DocWrite (with particle) */}
        <use
          href="#a1-particle-path"
          stroke="var(--copper-500)"
          strokeWidth="1"
          strokeDasharray="3 4"
          opacity={0.7}
          fill="none"
        />
        <circle
          r={2}
          fill="var(--copper-100)"
          style={{ filter: "drop-shadow(0 0 4px var(--copper-300))" }}
        >
          <animateMotion dur="3s" repeatCount="indefinite">
            <mpath href="#a1-particle-path" />
          </animateMotion>
        </circle>
        <circle
          r={2}
          fill="var(--copper-100)"
          style={{ filter: "drop-shadow(0 0 4px var(--copper-300))" }}
        >
          <animateMotion dur="3s" repeatCount="indefinite" begin="1s">
            <mpath href="#a1-particle-path" />
          </animateMotion>
        </circle>

        {/* DocWrite — Google Docs glyph with copper highlight */}
        <rect
          x={A1_DOCWRITE.x}
          y={A1_DOCWRITE.y}
          width={A1_DOCWRITE.w}
          height={A1_DOCWRITE.h}
          fill="none"
          stroke="var(--copper-300)"
          strokeWidth="1.4"
          rx="3"
        />
        {(() => {
          const dx = A1_DOCWRITE.x + 14;
          const dy = A1_DOCWRITE.y + 12;
          return (
            <g>
              <path
                d={`M ${dx} ${dy} L ${dx + 16} ${dy} L ${dx + 22} ${dy + 6} L ${dx + 22} ${dy + 28} L ${dx} ${dy + 28} Z`}
                fill="none"
                stroke="var(--copper-100)"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
              <path
                d={`M ${dx + 16} ${dy} L ${dx + 16} ${dy + 6} L ${dx + 22} ${dy + 6}`}
                fill="none"
                stroke="var(--copper-100)"
                strokeWidth="1.2"
              />
              {[10, 14, 18, 22].map((ly) => (
                <line
                  key={`a1-doc-line-${ly}`}
                  x1={dx + 3}
                  y1={dy + ly}
                  x2={dx + 19}
                  y2={dy + ly}
                  stroke="var(--copper-300)"
                  strokeWidth="0.8"
                />
              ))}
            </g>
          );
        })()}
        <text
          x={A1_DOCWRITE.x + 50}
          y={A1_DOCWRITE.y + 22}
          fill="#f5f5f5"
          fontFamily="Source Serif 4"
          fontSize="12"
        >
          Doc write
        </text>
        <text
          x={A1_DOCWRITE.x + 50}
          y={A1_DOCWRITE.y + 38}
          fill="#a3a3a3"
          fontFamily="JetBrains Mono"
          fontStyle="italic"
          fontSize="9"
        >
          merge fields
        </text>

        {/* DocWrite → output pill */}
        {(() => {
          const start = bottom(A1_DOCWRITE);
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
          draft doc
        </text>

        {/* ─── A1 → A2 connector: FAN-OUT (1 → 2) ───────────────────────── */}
        {(() => {
          const fromX = A1_OUT.x + A1_OUT.w;
          const fromY = A1_OUT.y + A1_OUT.h / 2;
          const midX = (G1.x + G1.w + G2.x) / 2;
          const midY = (285 + 381) / 2;
          const labelW = 90;
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
              {[285, 381].map((toY, i) => {
                const toX = G2.x;
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
                draft doc
              </motion.text>
            </g>
          );
        })()}

        {/* ─── AGENT 2 · Approval Workflow ────────────────────────────────── */}
        <text
          x={A2_INPUT.x + A2_INPUT.w / 2}
          y={A2_INPUT.y - 6}
          textAnchor="middle"
          fill="#d99e6c"
          fontFamily="JetBrains Mono"
          fontSize="9"
          letterSpacing="0.08em"
        >
          INPUT · DRAFT
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
          draft doc
        </text>

        {/* Slack approval message mock */}
        <rect
          x={A2_SLACK.x}
          y={A2_SLACK.y}
          width={A2_SLACK.w}
          height={A2_SLACK.h}
          fill="none"
          stroke="var(--copper-700)"
          strokeWidth="1"
          rx="4"
        />
        {(() => {
          const sx = A2_SLACK.x + 12;
          const sy = A2_SLACK.y + 10;
          const bw = A2_SLACK.w - 24;
          return (
            <g>
              {/* message preview lines */}
              <line
                x1={sx + 4}
                y1={sy + 8}
                x2={sx + bw - 18}
                y2={sy + 8}
                stroke="var(--copper-700)"
                strokeWidth="0.8"
              />
              <line
                x1={sx + 4}
                y1={sy + 18}
                x2={sx + bw - 38}
                y2={sy + 18}
                stroke="var(--copper-700)"
                strokeWidth="0.8"
              />
              {/* Approve / Decline buttons */}
              <rect
                x={sx + 4}
                y={sy + 30}
                width={(bw - 16) / 2}
                height={22}
                fill="none"
                stroke="var(--copper-300)"
                strokeWidth="1"
                rx="3"
              />
              <text
                x={sx + 4 + (bw - 16) / 4}
                y={sy + 45}
                textAnchor="middle"
                fill="#f5f5f5"
                fontFamily="JetBrains Mono"
                fontSize="9"
              >
                Approve
              </text>
              <rect
                x={sx + 12 + (bw - 16) / 2}
                y={sy + 30}
                width={(bw - 16) / 2}
                height={22}
                fill="none"
                stroke="var(--copper-700)"
                strokeWidth="1"
                strokeDasharray="3 3"
                rx="3"
              />
              <text
                x={sx + 12 + (bw - 16) * 0.75}
                y={sy + 45}
                textAnchor="middle"
                fill="#a3a3a3"
                fontFamily="JetBrains Mono"
                fontSize="9"
              >
                Decline
              </text>
            </g>
          );
        })()}

        {/* Input → Slack approval */}
        {(() => {
          const start = bottom(A2_INPUT);
          const end = { x: A2_SLACK.x + A2_SLACK.w / 2, y: A2_SLACK.y - 4 };
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
              stroke="var(--copper-300)"
              strokeWidth="1.1"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              {...revealLoop(2.1)}
            />
          );
        })()}

        {/* Finance gate */}
        <rect
          x={A2_FINANCE.x}
          y={A2_FINANCE.y}
          width={A2_FINANCE.w}
          height={A2_FINANCE.h}
          fill="none"
          stroke="var(--copper-300)"
          strokeWidth="1.2"
          rx="6"
        />
        {(() => {
          const cx = A2_FINANCE.x + 22;
          const cy = A2_FINANCE.y + 30;
          return (
            <g>
              <circle cx={cx} cy={cy - 6} r="5" fill="none" stroke="var(--copper-300)" strokeWidth="1" />
              <path
                d={`M ${cx - 9} ${cy + 12} Q ${cx} ${cy + 2}, ${cx + 9} ${cy + 12}`}
                fill="none"
                stroke="var(--copper-300)"
                strokeWidth="1"
                strokeLinecap="round"
              />
            </g>
          );
        })()}
        <text
          x={A2_FINANCE.x + 48}
          y={A2_FINANCE.y + 30}
          fill="#f5f5f5"
          fontFamily="Source Serif 4"
          fontSize="13"
        >
          Finance gate
        </text>
        <text
          x={A2_FINANCE.x + 48}
          y={A2_FINANCE.y + 48}
          fill="#a3a3a3"
          fontFamily="JetBrains Mono"
          fontStyle="italic"
          fontSize="9"
        >
          human review
        </text>

        {/* Slack → Finance */}
        {(() => {
          const start = bottom(A2_SLACK);
          const end = { x: A2_FINANCE.x + A2_FINANCE.w / 2, y: A2_FINANCE.y - 4 };
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
              stroke="var(--copper-300)"
              strokeWidth="1.1"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              {...revealLoop(2.3)}
            />
          );
        })()}

        {/* Finance → Legal */}
        {(() => {
          const start = bottom(A2_FINANCE);
          const end = { x: A2_LEGAL.x + A2_LEGAL.w / 2, y: A2_LEGAL.y - 4 };
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
              stroke="var(--copper-300)"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              {...revealLoop(2.5)}
            />
          );
        })()}

        {/* Legal gate */}
        <rect
          x={A2_LEGAL.x}
          y={A2_LEGAL.y}
          width={A2_LEGAL.w}
          height={A2_LEGAL.h}
          fill="none"
          stroke="var(--copper-300)"
          strokeWidth="1.2"
          rx="6"
        />
        {(() => {
          const cx = A2_LEGAL.x + 22;
          const cy = A2_LEGAL.y + 30;
          return (
            <g>
              <circle cx={cx} cy={cy - 6} r="5" fill="none" stroke="var(--copper-300)" strokeWidth="1" />
              <path
                d={`M ${cx - 9} ${cy + 12} Q ${cx} ${cy + 2}, ${cx + 9} ${cy + 12}`}
                fill="none"
                stroke="var(--copper-300)"
                strokeWidth="1"
                strokeLinecap="round"
              />
            </g>
          );
        })()}
        <text
          x={A2_LEGAL.x + 48}
          y={A2_LEGAL.y + 30}
          fill="#f5f5f5"
          fontFamily="Source Serif 4"
          fontSize="13"
        >
          Legal gate
        </text>
        <text
          x={A2_LEGAL.x + 48}
          y={A2_LEGAL.y + 48}
          fill="#a3a3a3"
          fontFamily="JetBrains Mono"
          fontStyle="italic"
          fontSize="9"
        >
          human review
        </text>

        {/* Legal → output pill */}
        {(() => {
          const start = bottom(A2_LEGAL);
          const end = { x: top(A2_OUT).x, y: top(A2_OUT).y - 4 };
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
              {...revealLoop(2.7)}
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
          approved doc
        </text>

        {/* ─── A2 → A3 connector: "on decline" forward path ──────────────── */}
        {(() => {
          const start = { x: G2.x + G2.w, y: 350 };
          const end = { x: G3.x, y: 350 };
          const c1x = start.x + 40;
          const c1y = start.y;
          const c2x = end.x - 40;
          const c2y = end.y;
          const midX = (G2.x + G2.w + G3.x) / 2;
          const tangent = unitVec({ x: c2x, y: c2y }, { x: end.x, y: end.y });
          const d = withArrow(
            `M ${start.x} ${start.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${end.x} ${end.y}`,
            end,
            tangent,
            7,
          );
          const midY = 350;
          const labelW = 96;
          const labelH = 22;
          const labelPulse = {
            initial: { opacity: 0 },
            animate: { opacity: [0, 1, 1, 0] },
            transition: {
              duration: 9,
              repeat: Infinity,
              delay: 3.0,
              times: [0, 0.45, 0.9, 1],
              ease: "easeInOut" as const,
            },
          };
          return (
            <g>
              <motion.path
                d={d}
                stroke="var(--copper-500)"
                strokeWidth="1"
                strokeDasharray="4 4"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                {...revealLoop(3.0)}
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
                on decline
              </motion.text>
            </g>
          );
        })()}

        {/* ─── AGENT 3 · AI Revision ─────────────────────────────────────── */}
        <text
          x={A3_INPUT.x + A3_INPUT.w / 2}
          y={A3_INPUT.y - 6}
          textAnchor="middle"
          fill="#d99e6c"
          fontFamily="JetBrains Mono"
          fontSize="9"
          letterSpacing="0.08em"
        >
          INPUT · DECLINE
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
          y={A3_INPUT.y + 20}
          textAnchor="middle"
          fill="#a3a3a3"
          fontFamily="JetBrains Mono"
          fontSize="10"
        >
          rejection reason
        </text>

        {/* LLM node (dense dot-grid, dominant) */}
        <rect
          x={A3_LLM.x}
          y={A3_LLM.y}
          width={A3_LLM.w}
          height={A3_LLM.h}
          fill="none"
          stroke="var(--copper-300)"
          strokeWidth="1.4"
          rx="3"
        />
        {Array.from({ length: 14 }).map((_, r) =>
          Array.from({ length: 7 }).map((_, c) => (
            <circle
              key={`a3-dot-${r}-${c}`}
              cx={A3_LLM.x + 12 + c * 16}
              cy={A3_LLM.y + 20 + r * 14}
              r="1.2"
              fill="var(--copper-300)"
              opacity={((r + c) % 3) * 0.22 + 0.18}
            />
          )),
        )}
        <text
          x={A3_LLM.x + A3_LLM.w / 2}
          y={A3_LLM.y + A3_LLM.h + 16}
          textAnchor="middle"
          fill="#f5f5f5"
          fontFamily="JetBrains Mono"
          fontSize="9"
          letterSpacing="0.06em"
        >
          LLM · gemini-2.5-pro
        </text>

        {/* JSON delta output */}
        <rect
          x={A3_JSON.x}
          y={A3_JSON.y}
          width={A3_JSON.w}
          height={A3_JSON.h}
          fill="none"
          stroke="var(--copper-700)"
          strokeWidth="1"
          rx="3"
        />
        <text
          x={A3_JSON.x + 10}
          y={A3_JSON.y + 16}
          fill="#d99e6c"
          fontFamily="JetBrains Mono"
          fontSize="8"
          letterSpacing="0.08em"
        >
          STRUCTURED DELTA
        </text>
        {[
          `"amount": 5000,`,
          `"term": "12mo",`,
          `"clause": "indem",`,
          `"action": "patch"`,
        ].map((line, i) => (
          <text
            key={`a3-json-${i}`}
            x={A3_JSON.x + 12}
            y={A3_JSON.y + 36 + i * 16}
            fill="#f5f5f5"
            fontFamily="JetBrains Mono"
            fontSize="10"
          >
            {line}
          </text>
        ))}

        {/* Patch GDoc — Docs glyph with copper highlight ring */}
        <rect
          x={A3_PATCH.x}
          y={A3_PATCH.y}
          width={A3_PATCH.w}
          height={A3_PATCH.h}
          fill="none"
          stroke="var(--copper-300)"
          strokeWidth="1.4"
          rx="3"
        />
        {(() => {
          const dx = A3_PATCH.x + A3_PATCH.w / 2 - 12;
          const dy = A3_PATCH.y + 10;
          return (
            <g>
              <path
                d={`M ${dx} ${dy} L ${dx + 18} ${dy} L ${dx + 24} ${dy + 6} L ${dx + 24} ${dy + 30} L ${dx} ${dy + 30} Z`}
                fill="none"
                stroke="var(--copper-100)"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
              <path
                d={`M ${dx + 18} ${dy} L ${dx + 18} ${dy + 6} L ${dx + 24} ${dy + 6}`}
                fill="none"
                stroke="var(--copper-100)"
                strokeWidth="1.2"
              />
              {[12, 16, 20, 24].map((ly) => (
                <line
                  key={`a3-patch-line-${ly}`}
                  x1={dx + 3}
                  y1={dy + ly}
                  x2={dx + 21}
                  y2={dy + ly}
                  stroke="var(--copper-300)"
                  strokeWidth="0.8"
                />
              ))}
            </g>
          );
        })()}
        <text
          x={A3_PATCH.x + A3_PATCH.w / 2}
          y={A3_PATCH.y + 64}
          textAnchor="middle"
          fill="#f5f5f5"
          fontFamily="Source Serif 4"
          fontSize="12"
        >
          Patch GDoc
        </text>
        <text
          x={A3_PATCH.x + A3_PATCH.w / 2}
          y={A3_PATCH.y + 82}
          textAnchor="middle"
          fill="#a3a3a3"
          fontFamily="JetBrains Mono"
          fontStyle="italic"
          fontSize="9"
        >
          apply delta
        </text>

        {/* Input → LLM */}
        {(() => {
          const start = bottom(A3_INPUT);
          const end = { x: A3_LLM.x + A3_LLM.w / 2, y: A3_LLM.y - 4 };
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
              stroke="var(--copper-300)"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              {...revealLoop(3.2)}
            />
          );
        })()}

        {/* LLM → JSON */}
        {(() => {
          const start = { x: A3_LLM.x + A3_LLM.w, y: A3_JSON.y + A3_JSON.h / 2 };
          const end = { x: A3_JSON.x - 4, y: A3_JSON.y + A3_JSON.h / 2 };
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
              stroke="var(--copper-300)"
              strokeWidth="1.1"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              {...revealLoop(3.4)}
            />
          );
        })()}

        {/* JSON → Patch */}
        {(() => {
          const start = { x: A3_JSON.x + A3_JSON.w / 2, y: A3_JSON.y + A3_JSON.h };
          const end = { x: A3_PATCH.x + A3_PATCH.w / 2, y: A3_PATCH.y - 4 };
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
              stroke="var(--copper-300)"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              {...revealLoop(3.5)}
            />
          );
        })()}

        {/* Patch → output */}
        {(() => {
          const start = { x: A3_PATCH.x + A3_PATCH.w / 2, y: A3_PATCH.y + A3_PATCH.h };
          const end = { x: top(A3_OUT).x + 60, y: top(A3_OUT).y - 4 };
          const c1 = { x: start.x, y: start.y + 30 };
          const c2 = { x: end.x, y: end.y - 20 };
          const tangent = unitVec(c2, end);
          const d = withArrow(
            `M ${start.x} ${start.y} C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${end.x} ${end.y}`,
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
              {...revealLoop(3.7)}
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
          revised doc
        </text>

        {/* ─── A3 → A2 LOOP-BACK (decline loop) — curves UNDER the boxes ── */}
        {(() => {
          const start = left(A3_OUT);
          const end = right(A2_OUT);
          const c1 = { x: start.x - 80, y: 525 };
          const c2 = { x: end.x + 80, y: 525 };
          const midX = (G2.x + G2.w + G3.x) / 2;
          const tangent = unitVec(c2, end);
          const d = withArrow(
            `M ${start.x} ${start.y} C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${end.x} ${end.y}`,
            end,
            tangent,
            7,
          );
          const midY = 520;
          const labelW = 200;
          const labelH = 22;
          const labelPulse = {
            initial: { opacity: 0 },
            animate: { opacity: [0, 1, 1, 0] },
            transition: {
              duration: 9,
              repeat: Infinity,
              delay: 4.2,
              times: [0, 0.45, 0.9, 1],
              ease: "easeInOut" as const,
            },
          };
          return (
            <g>
              <motion.path
                d={d}
                stroke="var(--copper-700)"
                strokeWidth="1"
                strokeDasharray="3 4"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                {...revealLoop(4.2)}
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
                revised — restart approval
              </motion.text>
            </g>
          );
        })()}

        {/* ─── A2 → A4 SKIP ARROW: arcs OVER Agent 3 ──────────────────────── */}
        {(() => {
          const start = { x: G2.x + G2.w, y: 250 };
          const end = { x: G4.x, y: A4_INPUT.y + A4_INPUT.h / 2 };
          const c1 = { x: start.x + 80, y: G3.y - 30 };
          const c2 = { x: end.x - 80, y: G3.y - 30 };
          const tangent = unitVec(c2, end);
          const midX = (G2.x + G2.w + G3.x) / 2;
          const midY = 160;
          const labelW = 88;
          const labelH = 22;
          const labelPulse = {
            initial: { opacity: 0 },
            animate: { opacity: [0, 1, 1, 0] },
            transition: {
              duration: 9,
              repeat: Infinity,
              delay: 3.0,
              times: [0, 0.45, 0.9, 1],
              ease: "easeInOut" as const,
            },
          };
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
                {...revealLoop(3.0)}
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
                approved
              </motion.text>
            </g>
          );
        })()}

        {/* ─── AGENT 4 · E-Sign Automation ────────────────────────────────── */}
        <text
          x={A4_INPUT.x + A4_INPUT.w / 2}
          y={A4_INPUT.y - 6}
          textAnchor="middle"
          fill="#d99e6c"
          fontFamily="JetBrains Mono"
          fontSize="9"
          letterSpacing="0.08em"
        >
          INPUT · APPROVED
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
          y={A4_INPUT.y + 20}
          textAnchor="middle"
          fill="#a3a3a3"
          fontFamily="JetBrains Mono"
          fontSize="10"
        >
          approved doc
        </text>

        {/* PDF render node */}
        <rect
          x={A4_PDF.x}
          y={A4_PDF.y}
          width={A4_PDF.w}
          height={A4_PDF.h}
          fill="none"
          stroke="var(--copper-700)"
          strokeWidth="1"
          rx="3"
        />
        {(() => {
          const dx = A4_PDF.x + A4_PDF.w / 2 - 16;
          const dy = A4_PDF.y + 18;
          return (
            <g>
              <path
                d={`M ${dx} ${dy} L ${dx + 22} ${dy} L ${dx + 32} ${dy + 10} L ${dx + 32} ${dy + 44} L ${dx} ${dy + 44} Z`}
                fill="none"
                stroke="var(--copper-300)"
                strokeWidth="1"
                strokeLinejoin="round"
              />
              <path
                d={`M ${dx + 22} ${dy} L ${dx + 22} ${dy + 10} L ${dx + 32} ${dy + 10}`}
                fill="none"
                stroke="var(--copper-300)"
                strokeWidth="1"
              />
              <text
                x={dx + 16}
                y={dy + 32}
                textAnchor="middle"
                fill="#d99e6c"
                fontFamily="JetBrains Mono"
                fontSize="9"
                letterSpacing="0.06em"
              >
                PDF
              </text>
            </g>
          );
        })()}
        <text
          x={A4_PDF.x + A4_PDF.w / 2}
          y={A4_PDF.y + A4_PDF.h - 8}
          textAnchor="middle"
          fill="#f5f5f5"
          fontFamily="JetBrains Mono"
          fontSize="9"
          letterSpacing="0.06em"
        >
          PDF render
        </text>

        {/* Dropbox Sign node */}
        <rect
          x={A4_DROPBOX.x}
          y={A4_DROPBOX.y}
          width={A4_DROPBOX.w}
          height={A4_DROPBOX.h}
          fill="none"
          stroke="var(--copper-300)"
          strokeWidth="1.2"
          rx="3"
        />
        {(() => {
          const cx = A4_DROPBOX.x + A4_DROPBOX.w / 2;
          const cy = A4_DROPBOX.y + 36;
          const s = 8;
          return (
            <g>
              {/* Dropbox-style four-triangle silhouette */}
              <path
                d={`M ${cx - s * 2} ${cy - s} L ${cx - s} ${cy - s * 2} L ${cx} ${cy - s} L ${cx - s} ${cy} Z`}
                fill="none"
                stroke="var(--copper-300)"
                strokeWidth="1"
              />
              <path
                d={`M ${cx} ${cy - s} L ${cx + s} ${cy - s * 2} L ${cx + s * 2} ${cy - s} L ${cx + s} ${cy} Z`}
                fill="none"
                stroke="var(--copper-300)"
                strokeWidth="1"
              />
              <path
                d={`M ${cx - s} ${cy} L ${cx} ${cy + s} L ${cx + s} ${cy} L ${cx} ${cy - s} Z`}
                fill="none"
                stroke="var(--copper-100)"
                strokeWidth="1"
              />
            </g>
          );
        })()}
        <text
          x={A4_DROPBOX.x + A4_DROPBOX.w / 2}
          y={A4_DROPBOX.y + A4_DROPBOX.h - 18}
          textAnchor="middle"
          fill="#f5f5f5"
          fontFamily="Source Serif 4"
          fontSize="11"
        >
          Dropbox Sign
        </text>
        <text
          x={A4_DROPBOX.x + A4_DROPBOX.w / 2}
          y={A4_DROPBOX.y + A4_DROPBOX.h - 4}
          textAnchor="middle"
          fill="#a3a3a3"
          fontFamily="JetBrains Mono"
          fontSize="8"
        >
          upload + request
        </text>

        {/* PDF → Dropbox (with particle) */}
        <use
          href="#a4-particle-path"
          stroke="var(--copper-500)"
          strokeWidth="1"
          strokeDasharray="3 4"
          opacity={0.7}
          fill="none"
        />
        <circle
          r={2}
          fill="var(--copper-100)"
          style={{ filter: "drop-shadow(0 0 4px var(--copper-300))" }}
        >
          <animateMotion dur="3s" repeatCount="indefinite">
            <mpath href="#a4-particle-path" />
          </animateMotion>
        </circle>
        <circle
          r={2}
          fill="var(--copper-100)"
          style={{ filter: "drop-shadow(0 0 4px var(--copper-300))" }}
        >
          <animateMotion dur="3s" repeatCount="indefinite" begin="1.5s">
            <mpath href="#a4-particle-path" />
          </animateMotion>
        </circle>

        {/* Input → PDF + Input → Dropbox fan-out */}
        {(() => {
          const start = bottom(A4_INPUT);
          const pdfEnd = { x: A4_PDF.x + A4_PDF.w / 2, y: A4_PDF.y - 4 };
          const pdfTangent = unitVec(start, pdfEnd);
          const dPdf = withArrow(
            `M ${start.x} ${start.y} L ${pdfEnd.x} ${pdfEnd.y}`,
            pdfEnd,
            pdfTangent,
            6,
          );
          return (
            <motion.path
              d={dPdf}
              stroke="var(--copper-300)"
              strokeWidth="1.1"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              {...revealLoop(3.4)}
            />
          );
        })()}

        {/* Email signer node */}
        <rect
          x={A4_EMAIL.x}
          y={A4_EMAIL.y}
          width={A4_EMAIL.w}
          height={A4_EMAIL.h}
          fill="none"
          stroke="var(--copper-700)"
          strokeWidth="1"
          rx="3"
        />
        {(() => {
          const dx = A4_EMAIL.x + A4_EMAIL.w / 2 - 14;
          const dy = A4_EMAIL.y + 12;
          return (
            <g>
              <rect
                x={dx}
                y={dy}
                width="28"
                height="18"
                fill="none"
                stroke="var(--copper-300)"
                strokeWidth="1"
                rx="1"
              />
              <path
                d={`M ${dx} ${dy} L ${dx + 14} ${dy + 10} L ${dx + 28} ${dy}`}
                fill="none"
                stroke="var(--copper-300)"
                strokeWidth="1"
                strokeLinejoin="round"
              />
            </g>
          );
        })()}
        <text
          x={A4_EMAIL.x + A4_EMAIL.w / 2}
          y={A4_EMAIL.y + A4_EMAIL.h - 18}
          textAnchor="middle"
          fill="#f5f5f5"
          fontFamily="Source Serif 4"
          fontSize="11"
        >
          Email signer
        </text>
        <text
          x={A4_EMAIL.x + A4_EMAIL.w / 2}
          y={A4_EMAIL.y + A4_EMAIL.h - 4}
          textAnchor="middle"
          fill="#a3a3a3"
          fontFamily="JetBrains Mono"
          fontSize="8"
        >
          send link
        </text>

        {/* Webhook wait node (pulsing) */}
        <rect
          x={A4_WEBHOOK.x}
          y={A4_WEBHOOK.y}
          width={A4_WEBHOOK.w}
          height={A4_WEBHOOK.h}
          fill="none"
          stroke="var(--copper-700)"
          strokeWidth="1"
          rx="3"
        />
        <motion.circle
          cx={A4_WEBHOOK.x + A4_WEBHOOK.w / 2}
          cy={A4_WEBHOOK.y + 28}
          r={9}
          fill="none"
          stroke="var(--copper-300)"
          strokeWidth="1.2"
          initial={{ r: 9, opacity: 0.6 }}
          animate={{ opacity: [0.4, 1, 0.4], r: [9, 13, 9] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
        <text
          x={A4_WEBHOOK.x + A4_WEBHOOK.w / 2}
          y={A4_WEBHOOK.y + A4_WEBHOOK.h - 18}
          textAnchor="middle"
          fill="#f5f5f5"
          fontFamily="Source Serif 4"
          fontSize="11"
        >
          Webhook wait
        </text>
        <text
          x={A4_WEBHOOK.x + A4_WEBHOOK.w / 2}
          y={A4_WEBHOOK.y + A4_WEBHOOK.h - 4}
          textAnchor="middle"
          fill="#a3a3a3"
          fontFamily="JetBrains Mono"
          fontSize="8"
        >
          on signed
        </text>

        {/* Dropbox → Email + Dropbox → Webhook fan-out */}
        {(() => {
          const start = { x: A4_DROPBOX.x + A4_DROPBOX.w / 2, y: A4_DROPBOX.y + A4_DROPBOX.h };
          const emailEnd = { x: A4_EMAIL.x + A4_EMAIL.w / 2, y: A4_EMAIL.y - 4 };
          const webhookEnd = { x: A4_WEBHOOK.x + A4_WEBHOOK.w / 2, y: A4_WEBHOOK.y - 4 };
          const dEmail = withArrow(
            `M ${start.x} ${start.y} L ${emailEnd.x} ${emailEnd.y}`,
            emailEnd,
            unitVec(start, emailEnd),
            6,
          );
          const dWebhook = withArrow(
            `M ${start.x} ${start.y} L ${webhookEnd.x} ${webhookEnd.y}`,
            webhookEnd,
            unitVec(start, webhookEnd),
            6,
          );
          return (
            <>
              <motion.path
                d={dEmail}
                stroke="var(--copper-300)"
                strokeWidth="1.1"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                {...revealLoop(3.7)}
              />
              <motion.path
                d={dWebhook}
                stroke="var(--copper-300)"
                strokeWidth="1.1"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                {...revealLoop(3.8)}
              />
            </>
          );
        })()}

        {/* GDrive output (folder + check) */}
        <rect
          x={A4_DRIVE.x}
          y={A4_DRIVE.y}
          width={A4_DRIVE.w}
          height={A4_DRIVE.h}
          fill="none"
          stroke="var(--copper-300)"
          strokeWidth="1.2"
          rx="4"
        />
        {(() => {
          const fx = A4_DRIVE.x + A4_DRIVE.w / 2 - 18;
          const fy = A4_DRIVE.y + 18;
          return (
            <g>
              <path
                d={`M ${fx} ${fy + 6} L ${fx + 12} ${fy + 6} L ${fx + 16} ${fy} L ${fx + 36} ${fy} L ${fx + 36} ${fy + 26} L ${fx} ${fy + 26} Z`}
                fill="none"
                stroke="var(--copper-300)"
                strokeWidth="1"
                strokeLinejoin="round"
              />
              {/* checkmark inside folder */}
              <path
                d={`M ${fx + 11} ${fy + 16} L ${fx + 17} ${fy + 21} L ${fx + 27} ${fy + 9}`}
                fill="none"
                stroke="var(--copper-100)"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          );
        })()}
        <text
          x={A4_DRIVE.x + A4_DRIVE.w / 2}
          y={A4_DRIVE.y + A4_DRIVE.h - 22}
          textAnchor="middle"
          fill="#f5f5f5"
          fontFamily="Source Serif 4"
          fontSize="11"
        >
          GDrive
        </text>
        <text
          x={A4_DRIVE.x + A4_DRIVE.w / 2}
          y={A4_DRIVE.y + A4_DRIVE.h - 8}
          textAnchor="middle"
          fill="#a3a3a3"
          fontFamily="JetBrains Mono"
          fontSize="8"
        >
          archive signed
        </text>

        {/* GSheets output */}
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
          const cell = 14;
          const cols = 4;
          const rows = 3;
          const gx = A4_SHEETS.x + (A4_SHEETS.w - cols * cell) / 2;
          const gy = A4_SHEETS.y + 14;
          const lines = [] as JSX.Element[];
          for (let i = 0; i <= cols; i++) {
            lines.push(
              <line
                key={`a4-sh-v-${i}`}
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
                key={`a4-sh-h-${i}`}
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
              key="a4-sh-head"
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
          y={A4_SHEETS.y + A4_SHEETS.h - 22}
          textAnchor="middle"
          fill="#f5f5f5"
          fontFamily="Source Serif 4"
          fontSize="11"
        >
          GSheets
        </text>
        <text
          x={A4_SHEETS.x + A4_SHEETS.w / 2}
          y={A4_SHEETS.y + A4_SHEETS.h - 8}
          textAnchor="middle"
          fill="#a3a3a3"
          fontFamily="JetBrains Mono"
          fontSize="8"
        >
          audit log
        </text>

        {/* Webhook → GDrive + Webhook → GSheets diverging curves */}
        {(() => {
          const driveStart = { x: A4_WEBHOOK.x + A4_WEBHOOK.w / 2 - 10, y: A4_WEBHOOK.y + A4_WEBHOOK.h };
          const driveEnd = { x: A4_DRIVE.x + A4_DRIVE.w / 2, y: A4_DRIVE.y - 4 };
          const driveC1 = { x: driveStart.x, y: driveStart.y + 14 };
          const driveC2 = { x: driveEnd.x, y: driveEnd.y - 14 };
          const sheetsStart = { x: A4_WEBHOOK.x + A4_WEBHOOK.w / 2 + 10, y: A4_WEBHOOK.y + A4_WEBHOOK.h };
          const sheetsEnd = { x: A4_SHEETS.x + A4_SHEETS.w / 2, y: A4_SHEETS.y - 4 };
          const sheetsC1 = { x: sheetsStart.x, y: sheetsStart.y + 14 };
          const sheetsC2 = { x: sheetsEnd.x, y: sheetsEnd.y - 14 };
          const dDrive = withArrow(
            `M ${driveStart.x} ${driveStart.y} C ${driveC1.x} ${driveC1.y}, ${driveC2.x} ${driveC2.y}, ${driveEnd.x} ${driveEnd.y}`,
            driveEnd,
            unitVec(driveC2, driveEnd),
            7,
          );
          const dSheets = withArrow(
            `M ${sheetsStart.x} ${sheetsStart.y} C ${sheetsC1.x} ${sheetsC1.y}, ${sheetsC2.x} ${sheetsC2.y}, ${sheetsEnd.x} ${sheetsEnd.y}`,
            sheetsEnd,
            unitVec(sheetsC2, sheetsEnd),
            7,
          );
          return (
            <>
              <motion.path
                d={dDrive}
                stroke="var(--copper-300)"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                {...revealLoop(4.0)}
              />
              <motion.path
                d={dSheets}
                stroke="var(--copper-300)"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                {...revealLoop(4.1)}
              />
            </>
          );
        })()}

        {/* ─── Apps end-circle (Slack notification completion) ────────────── */}
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
            y={APPS.cy + 6}
            textAnchor="middle"
            fill="#f5f5f5"
            fontFamily="JetBrains Mono"
            fontSize="16"
          >
            #
          </text>
          <text
            x={APPS.cx}
            y={APPS.cy + 42}
            textAnchor="middle"
            fill="#f5f5f5"
            fontFamily="JetBrains Mono"
            fontSize="11"
          >
            Slack notify
          </text>
          <text
            x={APPS.cx}
            y={APPS.cy + 56}
            textAnchor="middle"
            fill="#a3a3a3"
            fontFamily="JetBrains Mono"
            fontSize="9"
          >
            signed &amp; filed
          </text>
        </g>

        {/* Agent 4 right edge → Done (L-shaped, mirrors cron→G1) */}
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
      </svg>
    </div>
  );
}
