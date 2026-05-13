// B3Pipeline — always-looping LLM pipeline for slide B.3.
//
// Narrative shape (top → bottom of the left column):
//
//   ┌──────────────────────────────────────────────────────┐
//   │ RAW INPUT                                            │ ← mono-caption
//   │ ┌──────────────────────────────────────────────────┐ │
//   │ │ The report needs to be ___       (typewriter)    │ │
//   │ └──────────────────────────────────────────────────┘ │
//   │                                                      │
//   │   TOKENIZE     EMBED       ATTEND      PREDICT       │ ← stage labels
//   │   ┌────┐                ┌─────────┐    ░░░           │
//   │   │The │ ───────·····───┤         ├──→ ░░ ░          │
//   │   │rep.│ ───────·····───┤ ATTEND  │    ░  ░ ░        │
//   │   │nee.│ ───────·····───┤ (LLM)   │    completed/    │
//   │   │ to │ ───────·····───┤         ├    reviewed/…    │
//   │   │ be │ ───────·····───┤         │                  │
//   │   └────┘                └─────────┘                  │
//   │           └───────── LLM wrapper ─────────┘          │ (around EMBED + ATTEND + PREDICT)
//   │                                                      │
//   │ PREDICTED NEXT WORD                                  │ ← mono-caption
//   │ ┌──────────────────────────────────────────────────┐ │
//   │ │ The report needs to be {cycling}                 │ │
//   │ └──────────────────────────────────────────────────┘ │
//   └──────────────────────────────────────────────────────┘
//
// Key behaviours:
// - Typewriter input streams once on mount over ~700ms, then static.
// - PREDICT bars highlight cycles every 4s, locked to a single `cycle` state.
// - The {cycling} word in the bottom box reads the same `cycle` index, so the
//   highlighted bar and the output word always match.
// - EMBED column has no diamonds — only a header label. Flow goes directly
//   from token-box right edges to the ATTEND block via brightened Bezier
//   curves (copper-600, dashed, opacity 0.85).
// - LLM wrapper hugs the EMBED + ATTEND + PREDICT columns vertically and
//   horizontally; the TOKENIZE column and the OUTPUT box sit outside it.

import { useEffect, useState } from "react";
import { b3Content } from "../content";

// ── Outer envelope ───────────────────────────────────────────────────────
// COL_W matches the parent column width (set by b3-mechanics-landscape.tsx
// after Fix #11: 1280 - 2*48 = 1184, split 580/24/580 → COL_W = 580).
const COL_W = 580;
// Right edge of the bar-chart's last bar; everything that right-aligns
// (input box, LLM wrapper, output box) pins to LAST_BAR_RIGHT_X + 8.
// Bars: startX = PREDICT.x + 8 = 368. Bar 3 right edge = 368 + 22 + 3*44 = 522.
const LAST_BAR_RIGHT_X = 522;
// 8px breathing room past the last bar — the right edge that all three
// horizontally-aligned boxes pin to.
const RIGHT_EDGE_X = LAST_BAR_RIGHT_X + 8; // 530

// ── Top input + bottom output box geometry ───────────────────────────────
const BOX_LABEL_H = 16;  // height of the "RAW INPUT" / "PREDICTED NEXT WORD" caption
const BOX_GAP = 6;       // gap between caption and the box itself
const BOX_BODY_H = 44;   // height of the framed sentence box
const TOP_BLOCK_H = BOX_LABEL_H + BOX_GAP + BOX_BODY_H; // 66
const BOT_BLOCK_H = BOX_LABEL_H + BOX_GAP + BOX_BODY_H; // 66

// Pipeline vertical layout — tightened per Fix #9 so the cycling word and
// the bars feel like one unit. Input box → SVG 10px; SVG → output box 6px.
const TOP_TO_SVG_GAP = 10;
const SVG_TO_BOT_GAP = 6;

// ── Middle SVG band geometry ─────────────────────────────────────────────
const VB_W = COL_W;
const VB_H = 300;

// Fix #14.4: vertical shift applied to ALL rendered SVG content (wrapper,
// stage labels, tokens, attend block, bars, flow lines, particles). This
// pushes the visual LLM wrapper down ~10px inside the SVG band so its
// vertical center sits at column-local y≈222 — the exact midpoint between
// the RAW INPUT box bottom (col-local y=64) and the PREDICTED NEXT WORD
// label top (col-local y=382). Implemented as a single `<g transform>`
// wrapping the rendered children (defs untouched), so the column total
// height — and therefore the output-box position — stays put.
//   wrapper center (SVG-local) = (LLM_WRAP_Y + LLM_WRAP_BOT_Y)/2 = 136
//   col-local center w/o offset = TOP_BLOCK(66) + TOP_TO_SVG_GAP(10) + 136 = 212
//   target col-local center     = (64 + 382) / 2 = 223
//   delta                       = 223 - 212 = 11  →  rounded to 10
const SVG_BAND_Y_OFFSET = 10;

// Column anchors inside the SVG band.
// Left-aligned: TOKENIZE starts at x=0 in column-local coords so the
// stack reads-left with the RAW INPUT / PREDICTED NEXT WORD boxes (which
// also start at x=0) and visually rhymes with the slide-headline left edge.
// Geometry (Fix #11/#12): TOKENIZE 0..110. LLM wrapper starts at x=122
// (12px clean gap past TOKENIZE column). EMBED label sits centered with
// the flow lines themselves (Fix #14.2: x=115, w=80 → center=155).
// ATTEND col x=180..340 (block 130×100 centered). PREDICT col x=360..560
// (bars + 9px serif labels at BAR_GAP=22 fit). LLM wrapper hugs EMBED
// label + ATTEND + PREDICT and right-aligns to RIGHT_EDGE_X (530).
const STAGES = {
  tokenize: { x: 0,   w: 110 },
  // Fix #14.2: EMBED label sits at the visual center of the flow-line
  // illustration (token-box right edge ~110 → ATTEND block left edge ~195
  // → visual center ~152–155), NOT at the LLM wrapper's left edge.
  // x=115, w=80 → label center = 115 + 80/2 = 155 via the existing
  // `col.x + col.w/2` text-anchor=middle iteration. The label is text-only
  // — widening `w` only relocates the anchor, no other geometry depends on
  // STAGES.embed.
  embed:    { x: 115, w: 80  },
  attend:   { x: 180, w: 160 },
  predict:  { x: 360, w: 200 },
} as const;

// Token-box geometry (TOKENIZE column). Trimmed to 110 to match the
// narrower TOKENIZE col.
const TOK_BOX_W = 110;
const TOK_BOX_H = 26;
const TOK_BOX_GAP = 8;
const TOK_TOP_PADDING = 44;                // first token top (below stage labels)
const TOK_COL_H = 5 * TOK_BOX_H + 4 * TOK_BOX_GAP; // 162

// Attend block geometry.
// Trimmed to 130 (was 170) to fit inside the narrower ATTEND column.
// The text "ATTEND / TRANSFORMER" reads comfortably at this width.
const ATTEND_BLOCK_W = 130;
const ATTEND_BLOCK_H = 110;

// Bar chart geometry (PREDICT & SAMPLE).
// Wider gap (10 → 22) since the PREDICT column is now 200px wide; this
// gives the 9px serif labels (completed / reviewed / submitted / finished)
// room to read without overlapping. Total width: 4×22 + 3×22 = 154 in 200.
const BAR_W = 22;
const BAR_GAP = 22;
const BAR_MAX_H = 110;
const BAR_HEIGHTS = [1.0, 0.78, 0.58, 0.40]; // descending

// Stage label y inside the SVG band.
const STAGE_LABEL_Y = 18;

// Token column vertical bounds.
const TOK_TOP_Y = TOK_TOP_PADDING;
const TOK_BOT_Y = TOK_TOP_Y + TOK_COL_H;

// Attend center y — aligned with token-column centre so flow lines fan in symmetrically.
const ATTEND_CENTER_Y = TOK_TOP_Y + TOK_COL_H / 2;
const ATTEND_TOP_Y = ATTEND_CENTER_Y - ATTEND_BLOCK_H / 2;
const ATTEND_BOT_Y = ATTEND_CENTER_Y + ATTEND_BLOCK_H / 2;

// Bar chart vertical anchor — baseline lines up roughly with token bottoms.
const BAR_BASE_Y = TOK_BOT_Y;                  // baseline
const BAR_TOP_Y = BAR_BASE_Y - BAR_MAX_H;      // tallest bar's top

// LLM wrapper — starts 12px past TOKENIZE column's right edge (clean gap,
// no overlap). Right edge pins to RIGHT_EDGE_X so it aligns with the
// RAW INPUT box and PREDICTED NEXT WORD box (Fix #12).
const LLM_WRAP_X = STAGES.tokenize.x + STAGES.tokenize.w + 12; // 122
const LLM_WRAP_W = RIGHT_EDGE_X - LLM_WRAP_X;                  // 408
const LLM_WRAP_Y = STAGE_LABEL_Y + 14;
// Wrapper bottom hugs candidate-label row (baseline + 22 for label text).
const LLM_WRAP_BOT_Y = Math.max(ATTEND_BOT_Y, BAR_BASE_Y + 26) + 8;
const LLM_WRAP_H = LLM_WRAP_BOT_Y - LLM_WRAP_Y;

// ── Component ────────────────────────────────────────────────────────────

export interface B3PipelineProps {
  /** When true, runs the one-time build-up reveal then loops forever. */
  mounted: boolean;
}

export function B3Pipeline({ mounted }: B3PipelineProps) {
  const candidates = b3Content.pipeline.candidates;
  const cycleDur = 4000; // ms per highlight cycle, matches CSS keyframes.

  // Cycle the highlighted candidate every 4s. The same `cycle` state drives
  // both the PREDICT bar highlight and the cycling word in the bottom box,
  // so they're always synchronised.
  const [cycle, setCycle] = useState(0);
  useEffect(() => {
    if (!mounted) return;
    const id = window.setInterval(() => setCycle((c) => c + 1), cycleDur);
    return () => window.clearInterval(id);
  }, [mounted]);
  const selectedIdx = cycle % candidates.length;
  const cyclingWord = candidates[selectedIdx];

  // Typewriter for the input box. JS state-based char-index increment — runs
  // once on mount over ~700ms (about 28ms per char for the 25-char sentence).
  const fullInput = b3Content.pipeline.inputSentence;
  const [typeLen, setTypeLen] = useState(0);
  useEffect(() => {
    if (!mounted) {
      setTypeLen(0);
      return;
    }
    const perChar = Math.max(20, Math.floor(700 / fullInput.length));
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setTypeLen(i);
      if (i >= fullInput.length) {
        window.clearInterval(id);
      }
    }, perChar);
    return () => window.clearInterval(id);
  }, [mounted, fullInput]);
  const inputTyped = fullInput.slice(0, typeLen);
  const typingDone = typeLen >= fullInput.length;

  // Split the typed string into a body and the trailing run of underscores
  // (the "___" predicted-slot marker). Once the typewriter completes, the
  // trailing underscores get a step-blink animation to signal "this is the
  // slot the pipeline is about to fill in".
  const trailingMatch = inputTyped.match(/_+$/);
  const trailingUnderscores = trailingMatch ? trailingMatch[0] : "";
  // Fix #14.3a: strip the trailing space that lives in the source sentence
  // ("The report needs to be ___") so the gap before the underscores is
  // controlled solely by the trailing span's `paddingLeft`. Otherwise the
  // body's trailing space + the padding would compound into a double gap.
  const inputBody = trailingUnderscores
    ? inputTyped.slice(0, inputTyped.length - trailingUnderscores.length).trimEnd()
    : inputTyped;

  return (
    <div
      data-testid="b3-pipeline"
      style={{
        position: "relative",
        width: COL_W,
        display: "flex",
        flexDirection: "column",
        gap: 0,
      }}
    >
      {/* ── RAW INPUT box (top) ─────────────────────────────────────── */}
      <div
        data-testid="b3-input-block"
        style={{
          width: "100%",
          opacity: mounted ? 1 : 0,
          transition: "opacity 240ms var(--ease)",
        }}
      >
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: 10,
            letterSpacing: "0.24em",
            color: "var(--copper-500)",
            textTransform: "uppercase",
            height: BOX_LABEL_H,
            lineHeight: `${BOX_LABEL_H}px`,
          }}
        >
          {b3Content.pipeline.inputLabel}
        </div>
        <div style={{ height: BOX_GAP }} />
        <div
          data-testid="b3-input-box"
          style={{
            width: RIGHT_EDGE_X,
            height: BOX_BODY_H,
            border: "1px solid var(--copper-800)",
            background: "rgba(10,10,10,0.55)",
            display: "flex",
            alignItems: "center",
            padding: "0 14px",
            fontFamily: "var(--serif)",
            fontSize: 16,
            color: "var(--neutral-100)",
            letterSpacing: "0.01em",
            boxSizing: "border-box",
          }}
        >
          <span>{inputBody}</span>
          {trailingUnderscores && (
            <span
              data-testid="b3-input-blank"
              style={{
                color: "var(--copper-300)",
                // Fix #14.3a: explicit gap between "be" and the first
                // underscore so the slot reads as its own glyph cluster
                // (~6px = roughly one character width at 16px serif).
                paddingLeft: 6,
              }}
            >
              {/* Fix #14.3b: each underscore is its own span with a
                 staggered animation-delay so the pulse flows left → right
                 (0ms → 300ms → 600ms, then repeats over the 1.2s cycle).
                 Pulse only starts once the typewriter has completed. */}
              {trailingUnderscores.split("").map((ch, i) => (
                <span
                  key={i}
                  style={{
                    display: "inline-block",
                    animation: typingDone
                      ? `b3-input-pulse 1.2s var(--ease) ${i * 300}ms infinite`
                      : "none",
                  }}
                >
                  {ch}
                </span>
              ))}
            </span>
          )}
          {/* Blinking caret while typing. */}
          {!typingDone && mounted && (
            <span
              aria-hidden
              style={{
                display: "inline-block",
                width: 1,
                height: 18,
                marginLeft: 2,
                background: "var(--copper-300)",
                animation: "b3-caret 0.8s steps(2) infinite",
              }}
            />
          )}
        </div>
      </div>

      <div style={{ height: TOP_TO_SVG_GAP }} />

      {/* ── MIDDLE — SVG pipeline band ──────────────────────────────── */}
      <svg
        width={VB_W}
        height={VB_H}
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        style={{ overflow: "visible", display: "block" }}
      >
        <defs>
          {/* Arrow terminator. */}
          <marker
            id="b3-arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="8"
            markerHeight="8"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--copper-600)" />
          </marker>

          {/* Bezier paths — token-row right edges → ATTEND block left edge.
             No diamonds: paths originate at TOKENIZE box right edges, not at
             an intermediate column. */}
          {Array.from({ length: 5 }).map((_, i) => {
            const fromX = STAGES.tokenize.x + (STAGES.tokenize.w + TOK_BOX_W) / 2;
            const fromY = tokenRowY(i);
            const toX =
              STAGES.attend.x + (STAGES.attend.w - ATTEND_BLOCK_W) / 2;
            const toY = ATTEND_CENTER_Y;
            const c1x = fromX + 60;
            const c1y = fromY;
            const c2x = toX - 60;
            const c2y = toY;
            return (
              <path
                key={i}
                id={`b3-flow-path-${i}`}
                d={`M ${fromX} ${fromY} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${toX} ${toY}`}
                fill="none"
              />
            );
          })}

          {/* Output particle path — ATTEND right edge → first PREDICT bar. */}
          <path
            id="b3-output-path"
            d={`M ${STAGES.attend.x + (STAGES.attend.w + ATTEND_BLOCK_W) / 2} ${
              ATTEND_CENTER_Y
            } C ${STAGES.attend.x + STAGES.attend.w + 20} ${
              ATTEND_CENTER_Y
            }, ${STAGES.predict.x - 10} ${BAR_TOP_Y + 30}, ${
              STAGES.predict.x + 8
            } ${BAR_TOP_Y + 30}`}
            fill="none"
          />
        </defs>

        {/* Fix #14.4: single translate wraps ALL rendered SVG content (LLM
           wrapper, stage labels, tokens, attend block, bars, flow lines,
           particles). Pushes the wrapper visually down by SVG_BAND_Y_OFFSET
           so its vertical center sits in the middle of the input-bottom →
           output-top range. Defs above stay untouched — they're just path
           definitions and the `<use>` references inherit this transform. */}
        <g transform={`translate(0, ${SVG_BAND_Y_OFFSET})`}>

        {/* ── LLM wrapper (around EMBED + ATTEND + PREDICT) ─────────── */}
        <g data-testid="b3-llm-wrapper">
          <rect
            x={LLM_WRAP_X}
            y={LLM_WRAP_Y}
            width={LLM_WRAP_W}
            height={LLM_WRAP_H}
            rx={6}
            fill="none"
            stroke="var(--copper-700)"
            strokeWidth={1}
            style={{
              opacity: mounted ? 0.85 : 0,
              transition: "opacity 300ms var(--ease) 700ms",
            }}
          />
          {/* "LLM" caption — anchored INSIDE the wrapper at bottom-left so
             it reads as the wrapper's own label without colliding with the
             EMBED stage label that sits just above the wrapper. */}
          <text
            x={LLM_WRAP_X + 10}
            y={LLM_WRAP_Y + LLM_WRAP_H - 10}
            textAnchor="start"
            fontFamily="var(--mono)"
            fontSize={10}
            letterSpacing="0.28em"
            fill="var(--copper-400)"
            style={{
              textTransform: "uppercase",
              opacity: mounted ? 1 : 0,
              transition: "opacity 300ms var(--ease) 740ms",
            }}
          >
            LLM
          </text>
        </g>

        {/* ── Stage labels (TOKENIZE / EMBED / ATTEND / PREDICT & SAMPLE) ── */}
        {b3Content.pipeline.stages.map((stage, i) => {
          const col = (Object.values(STAGES) as { x: number; w: number }[])[i];
          return (
            <text
              key={stage.id}
              x={col.x + col.w / 2}
              y={STAGE_LABEL_Y}
              textAnchor="middle"
              fontFamily="var(--mono)"
              fontSize={10}
              letterSpacing="0.22em"
              fill="var(--copper-500)"
              style={{
                textTransform: "uppercase",
                opacity: mounted ? 1 : 0,
                transition: `opacity 300ms var(--ease) ${i * 70}ms`,
              }}
            >
              {stage.label}
            </text>
          );
        })}

        {/* Static arrow: ATTEND → PREDICT chart. */}
        {(() => {
          const attendRightX =
            STAGES.attend.x + (STAGES.attend.w + ATTEND_BLOCK_W) / 2;
          const predictLeftX = STAGES.predict.x;
          return (
            <line
              x1={attendRightX + 4}
              y1={ATTEND_CENTER_Y}
              x2={predictLeftX - 4}
              y2={ATTEND_CENTER_Y}
              stroke="var(--copper-600)"
              strokeWidth={1}
              markerEnd="url(#b3-arrow)"
              style={{
                opacity: mounted ? 0.8 : 0,
                transition: "opacity 300ms var(--ease) 1100ms",
              }}
            />
          );
        })()}

        {/* ── Stage 1: TOKENIZE — 5 stacked boxes ───────────────────── */}
        <g data-testid="b3-tokenize">
          {b3Content.pipeline.sentence.map((tok, i) => {
            const cx = STAGES.tokenize.x + STAGES.tokenize.w / 2;
            const y = tokenRowY(i) - TOK_BOX_H / 2;
            return (
              <g
                key={i}
                style={{
                  opacity: mounted ? 1 : 0,
                  transition: `opacity 300ms var(--ease) ${700 + i * 80}ms`,
                  animation: mounted
                    ? `b3-tok-light 4s ${i * 80}ms infinite both var(--ease)`
                    : "none",
                  transformOrigin: `${cx}px ${y + TOK_BOX_H / 2}px`,
                }}
              >
                <rect
                  x={cx - TOK_BOX_W / 2}
                  y={y}
                  width={TOK_BOX_W}
                  height={TOK_BOX_H}
                  rx={3}
                  fill="rgba(10,10,10,0.6)"
                  stroke="var(--copper-800)"
                  strokeWidth={1}
                  className="b3-tok-box"
                />
                <text
                  x={cx}
                  y={y + TOK_BOX_H / 2 + 5}
                  textAnchor="middle"
                  fontFamily="var(--serif)"
                  fontSize={14}
                  fill="var(--neutral-200)"
                >
                  {tok}
                </text>
              </g>
            );
          })}
        </g>

        {/* ── Stage 2: EMBED — header label only, no glyphs.
            Flow lines + particles span TOKENIZE → ATTEND directly. */}
        <g data-testid="b3-embed">
          {/* Brightened Bezier flow lines — token rows → ATTEND. */}
          {Array.from({ length: 5 }).map((_, i) => (
            <use
              key={`l-${i}`}
              href={`#b3-flow-path-${i}`}
              stroke="var(--copper-600)"
              strokeWidth={1}
              strokeDasharray="3 4"
              fill="none"
              style={{
                opacity: mounted ? 0.85 : 0,
                transition: `opacity 320ms var(--ease) ${1100 + i * 40}ms`,
              }}
            />
          ))}
        </g>

        {/* ── Stage 3: ATTEND — rounded block + converging particles ── */}
        <g data-testid="b3-attend">
          <g
            style={{
              opacity: mounted ? 1 : 0,
              transition: "opacity 320ms var(--ease) 1000ms",
            }}
          >
            <rect
              x={STAGES.attend.x + (STAGES.attend.w - ATTEND_BLOCK_W) / 2}
              y={ATTEND_TOP_Y}
              width={ATTEND_BLOCK_W}
              height={ATTEND_BLOCK_H}
              rx={10}
              fill="rgba(217,158,108,0.05)"
              stroke="var(--copper-700)"
              strokeWidth={1}
            />
            <text
              x={STAGES.attend.x + STAGES.attend.w / 2}
              y={ATTEND_CENTER_Y - 6}
              textAnchor="middle"
              fontFamily="var(--mono)"
              fontSize={13}
              letterSpacing="0.22em"
              fill="var(--copper-300)"
              style={{ textTransform: "uppercase" }}
            >
              attend
            </text>
            <text
              x={STAGES.attend.x + STAGES.attend.w / 2}
              y={ATTEND_CENTER_Y + 14}
              textAnchor="middle"
              fontFamily="var(--mono)"
              fontSize={9}
              letterSpacing="0.2em"
              fill="var(--copper-500)"
              style={{ textTransform: "uppercase", opacity: 0.75 }}
            >
              transformer
            </text>
            {/* Pulsing core glow. */}
            <circle
              cx={STAGES.attend.x + STAGES.attend.w / 2}
              cy={ATTEND_CENTER_Y + 32}
              r={3.5}
              fill="var(--copper-300)"
              opacity={0.7}
            >
              <animate
                attributeName="opacity"
                values="0.3;0.85;0.3"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
          </g>

          {/* SMIL particles converging into ATTEND along the brightened
             flow paths. Staggered begin so they read as converging. */}
          {mounted &&
            Array.from({ length: 5 }).map((_, i) => (
              <circle
                key={`p-${i}`}
                r={2.4}
                fill="var(--copper-100)"
                style={{ filter: "drop-shadow(0 0 4px var(--copper-300))" }}
              >
                <animateMotion
                  dur="2.4s"
                  repeatCount="indefinite"
                  begin={`${1.0 + i * 0.12}s`}
                >
                  <mpath href={`#b3-flow-path-${i}`} />
                </animateMotion>
              </circle>
            ))}

          {/* One output particle on the ATTEND right edge → first PREDICT bar. */}
          {mounted && (
            <circle
              r={2.6}
              fill="var(--copper-300)"
              style={{ filter: "drop-shadow(0 0 6px var(--copper-300))" }}
            >
              <animateMotion dur="4s" repeatCount="indefinite" begin="2.4s">
                <mpath href="#b3-output-path" />
              </animateMotion>
            </circle>
          )}
        </g>

        {/* ── Stage 4: PREDICT & SAMPLE — descending bars + labels ──── */}
        <g data-testid="b3-predict">
          {/* Baseline — spans only the actual bar footprint (Fix #12). Stops
             at LAST_BAR_RIGHT_X so it doesn't trail past the bars. */}
          <line
            x1={STAGES.predict.x + 8}
            y1={BAR_BASE_Y + 4}
            x2={LAST_BAR_RIGHT_X}
            y2={BAR_BASE_Y + 4}
            stroke="var(--copper-800)"
            strokeWidth={1}
            style={{
              opacity: mounted ? 0.6 : 0,
              transition: "opacity 300ms var(--ease) 1200ms",
            }}
          />

          {candidates.map((cand, i) => {
            const startX = STAGES.predict.x + 8;
            const x = startX + i * (BAR_W + BAR_GAP);
            const h = BAR_HEIGHTS[i] * BAR_MAX_H;
            const baseY = BAR_BASE_Y + 4;
            const barY = baseY - h;
            const isSelected = i === selectedIdx;
            return (
              <g
                key={cand}
                style={{
                  opacity: mounted ? 1 : 0,
                  transition: `opacity 320ms var(--ease) ${1200 + i * 60}ms`,
                }}
              >
                <rect
                  x={x}
                  y={barY}
                  width={BAR_W}
                  height={h}
                  fill={isSelected ? "var(--copper-300)" : "var(--copper-700)"}
                  style={{
                    transition: "fill 280ms var(--ease)",
                    transformOrigin: `${x + BAR_W / 2}px ${baseY}px`,
                    animation: mounted
                      ? `b3-bar-rise 4s ${1200 + i * 60}ms 1 both var(--ease)`
                      : "none",
                  }}
                />
                {isSelected && (
                  <rect
                    x={x - 2}
                    y={barY - 2}
                    width={BAR_W + 4}
                    height={h + 4}
                    fill="none"
                    stroke="var(--copper-300)"
                    strokeWidth={1}
                    style={{ filter: "drop-shadow(0 0 6px var(--copper-300))" }}
                  >
                    <animate
                      attributeName="opacity"
                      values="0;1;1;0.6"
                      dur="2.5s"
                      repeatCount="1"
                    />
                  </rect>
                )}
                <text
                  x={x + BAR_W / 2}
                  y={baseY + 16}
                  textAnchor="middle"
                  fontFamily="var(--serif)"
                  fontSize={9}
                  letterSpacing="-0.01em"
                  fill={isSelected ? "var(--copper-100)" : "var(--neutral-300)"}
                  fontWeight={isSelected ? 600 : 400}
                  style={{
                    transition:
                      "fill 280ms var(--ease), font-weight 280ms var(--ease)",
                  }}
                >
                  {cand}
                </text>
              </g>
            );
          })}

          {/* Top-down highlight ring re-keyed per cycle. */}
          {mounted && (
            <g key={`scan-${cycle}`} pointerEvents="none">
              <line
                x1={STAGES.predict.x + 4}
                x2={STAGES.predict.x + STAGES.predict.w - 4}
                y1={BAR_TOP_Y - 6}
                y2={BAR_TOP_Y - 6}
                stroke="var(--copper-300)"
                strokeWidth={1}
                strokeDasharray="3 4"
                opacity={0.0}
              >
                <animate
                  attributeName="opacity"
                  values="0;0.8;0.8;0"
                  keyTimes="0;0.25;0.6;0.85"
                  dur="2.6s"
                  repeatCount="1"
                  begin="0.6s"
                />
                <animate
                  attributeName="y1"
                  values={`${BAR_TOP_Y - 6};${
                    BAR_BASE_Y + 4 - BAR_HEIGHTS[selectedIdx] * BAR_MAX_H * 0.5
                  }`}
                  dur="1.8s"
                  begin="0.6s"
                  fill="freeze"
                />
                <animate
                  attributeName="y2"
                  values={`${BAR_TOP_Y - 6};${
                    BAR_BASE_Y + 4 - BAR_HEIGHTS[selectedIdx] * BAR_MAX_H * 0.5
                  }`}
                  dur="1.8s"
                  begin="0.6s"
                  fill="freeze"
                />
              </line>
            </g>
          )}
        </g>
        </g>{/* /SVG_BAND_Y_OFFSET translate (Fix #14.4) */}
      </svg>

      <div style={{ height: SVG_TO_BOT_GAP }} />

      {/* ── PREDICTED NEXT WORD box (bottom) — OUTSIDE the LLM wrapper.
          The cycling word is the same `selectedIdx` that drives the bar
          highlight, so the two read as locked together. */}
      <div
        data-testid="b3-output-block"
        style={{
          width: "100%",
          opacity: mounted ? 1 : 0,
          transition: "opacity 320ms var(--ease) 1400ms",
        }}
      >
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: 10,
            letterSpacing: "0.24em",
            color: "var(--copper-500)",
            textTransform: "uppercase",
            height: BOX_LABEL_H,
            lineHeight: `${BOX_LABEL_H}px`,
          }}
        >
          {b3Content.pipeline.outputLabel}
        </div>
        <div style={{ height: BOX_GAP }} />
        <div
          data-testid="b3-output-box"
          style={{
            width: RIGHT_EDGE_X,
            height: BOX_BODY_H,
            border: "1px solid var(--copper-700)",
            background: "rgba(217,158,108,0.04)",
            display: "flex",
            alignItems: "center",
            padding: "0 14px",
            fontFamily: "var(--serif)",
            fontSize: 16,
            color: "var(--neutral-100)",
            letterSpacing: "0.01em",
            boxSizing: "border-box",
          }}
        >
          {/* Fix #14.5: preserve the trailing space from `outputPrefix` AND
             keep a paddingLeft on the italic span so the cycling word can
             never visually touch "be". In a flex row the bare `{" "}` text
             node can render as a near-zero-width flex item, hence the
             belt-and-suspenders combo. */}
          <span>{b3Content.pipeline.outputPrefix}</span>
          <span
            data-testid="b3-output-cycling"
            key={`word-${cycle}`}
            style={{
              fontStyle: "italic",
              color: "var(--copper-300)",
              paddingLeft: 6,
              animation: "b3-word-pop 320ms var(--ease) both",
            }}
          >
            {cyclingWord}
          </span>
        </div>
      </div>

      {/* Scoped keyframes — token light-up + bar rise + caret + word pop. */}
      <style>{`
        @keyframes b3-tok-light {
          0%, 8%   { fill-opacity: 0.6; }
          12%, 20% { fill-opacity: 1; }
          22%, 100%{ fill-opacity: 0.6; }
        }
        @keyframes b3-bar-rise {
          0%   { transform: scaleY(0); }
          18%  { transform: scaleY(0); }
          40%  { transform: scaleY(1); }
          100% { transform: scaleY(1); }
        }
        @keyframes b3-caret {
          0%, 49%   { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        @keyframes b3-word-pop {
          0%   { opacity: 0; transform: translateY(2px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        /* Fix #14.3: sequential left-to-right pulse on the three
           underscores. Each underscore span owns its own animation-delay
           (0ms / 300ms / 600ms), so over a 1.2s cycle the pulse reads as
           a wave moving rightward through the slot. More pronounced than
           the old b3-input-blink (0.2 → 1 → 0.2 instead of 0.25 → 1). */
        @keyframes b3-input-pulse {
          0%, 100% { opacity: 0.2; }
          50%      { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// y-centre of the i-th TOKENIZE row.
function tokenRowY(i: number) {
  return TOK_TOP_PADDING + i * (TOK_BOX_H + TOK_BOX_GAP) + TOK_BOX_H / 2;
}

// Total height of the pipeline column — used by the slide layout to verify
// the column fits inside its 510px envelope.
export const B3_PIPELINE_HEIGHT =
  TOP_BLOCK_H + TOP_TO_SVG_GAP + VB_H + SVG_TO_BOT_GAP + BOT_BLOCK_H;
