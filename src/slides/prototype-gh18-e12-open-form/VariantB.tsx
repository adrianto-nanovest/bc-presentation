// PROTOTYPE — throwaway. Variant B · "THE SCORE".
//
// Form thesis: reject the ring. #10's own resolution says the three layers are
// SPACE and the loop is TIME — so draw time. Full-width horizontal bands, no
// left/right split at all. The x-axis is the week.
//
// What this variant is testing:
//   - BUDGET and GATE are positions in time, not points on a circle. On a ring
//     they have to be overlaid (the sibling's known risk, #10 P1). Here they
//     are just further right. Does that alone justify the form?
//   - The five decisions run left-to-right in the SAME order as the diagram
//     above them, each with a connector to the element it controls. The
//     teaching order becomes a spatial fact rather than a list convention.
//   - The worked example is not a footnote — it is the content of the cells.
import { useState } from "react";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { HintIcon } from "@/components/HintIcon";
import { highlight } from "@/components/highlight";
import { LucideIcon } from "@/slides/foundation-core-section-e/components/LucideIcon";
import { Reveal } from "@/slides/foundation-core-section-e/components/Reveal";
import { brief as B, type DecisionId } from "./brief";

// ── timeline geometry (all absolute against the 1280×720 stage) ──────────
const TRACK_Y = 300; // centre line of the cycle cells
const CELL_W = 170;
const CELL_H = 84;
const CELLS = [236, 422, 608];
const STOP_X = 832;
const GATE_X = 860;
const SIGN_X = 1010;
const MEM_Y = 368;

// Which timeline element each decision lights, and where its connector lands.
const TARGET_X: Record<DecisionId, number> = {
  trigger: 158,
  memory: 507,
  condition: 608 + CELL_W - 26,
  budget: STOP_X,
  gate: GATE_X + 62,
};

const COL_W = 228;
const COL_GAP = 13;
const colX = (i: number) => 48 + i * (COL_W + COL_GAP);

export function VariantB() {
  const { stepIndex } = useDeck();
  const [hover, setHover] = useState<DecisionId | null>(null);
  const [pinned, setPinned] = useState<DecisionId | null>(null);
  const active = pinned ?? hover;

  const on = stepIndex >= 0;
  const land = stepIndex >= 1;
  const lit = (id: DecisionId) => active === id || (land && active === null);

  return (
    <>
      <FigLabel {...B.fig} />

      <div className="slide-headline-row">
        <h1 className="slide-headline small">
          {highlight(B.headline, B.headlineKw)}
        </h1>
      </div>

      <div
        style={{
          position: "absolute",
          left: 48,
          top: 136,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 10.5,
            letterSpacing: "0.22em",
            color: "var(--copper-600)",
            textTransform: "uppercase",
          }}
        >
          {B.qualifier}
        </span>
        <HintIcon text="Hover a decision to light what it controls, click to pin." />
      </div>

      {/* ── BAND 1 — the thing you are stopping ─────────────────────────── */}
      <Reveal
        on={on}
        delay={60}
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          top: 170,
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 9.5,
            letterSpacing: "0.24em",
            color: "var(--copper-700)",
            width: 104,
            flexShrink: 0,
          }}
        >
          {B.shift.beforeLabel}
        </span>
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            gap: 5,
            opacity: 0.72,
          }}
        >
          {Array.from({ length: 8 }, (_, i) => B.shift.beforeChain[i % 2]).map(
            (n, i) => (
              <span key={i} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                {i > 0 && (
                  <span style={{ color: "var(--copper-800)", fontSize: 10 }}>→</span>
                )}
                <span
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 10,
                    letterSpacing: "0.1em",
                    padding: "2px 7px",
                    border: "1px solid var(--copper-800)",
                    color: n === "you" ? "var(--copper-200)" : "var(--neutral-500)",
                    background: n === "you" ? "rgba(184,110,61,0.10)" : "transparent",
                  }}
                >
                  {n}
                </span>
              </span>
            ),
          )}
          <span
            aria-hidden
            style={{
              position: "absolute",
              left: -6,
              right: -6,
              top: "50%",
              height: 1,
              background: "var(--copper-500)",
            }}
          />
        </div>
        <span
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 12.5,
            color: "var(--neutral-400)",
          }}
        >
          {B.shift.beforeNote}
        </span>
      </Reveal>

      {/* ── BAND 2 — the loop, drawn on a time axis ─────────────────────── */}
      <svg
        width={1280}
        height={720}
        viewBox="0 0 1280 720"
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: on ? 1 : 0,
          transition: "opacity 0.6s var(--ease)",
        }}
      >
        <defs>
          <marker
            id="vb-arrow"
            viewBox="0 0 8 8"
            refX={7}
            refY={4}
            markerWidth={5}
            markerHeight={5}
            orient="auto"
          >
            <path d="M 0 0 L 8 4 L 0 8 z" fill="var(--copper-400)" />
          </marker>
        </defs>

        {/* Spine — the week, running left to right. */}
        <line
          x1={48}
          y1={TRACK_Y}
          x2={SIGN_X + 88}
          y2={TRACK_Y}
          stroke="var(--copper-900)"
          strokeWidth={1}
        />

        {/* Trigger tick. */}
        <line
          x1={TARGET_X.trigger}
          y1={TRACK_Y - 42}
          x2={TARGET_X.trigger}
          y2={TRACK_Y + 42}
          stroke={lit("trigger") ? "var(--copper-200)" : "var(--copper-700)"}
          strokeWidth={lit("trigger") ? 3 : 1.5}
          style={{ transition: "all 0.25s var(--ease)" }}
        />

        {/* Cycle cells + the "not done → again" return arcs. */}
        {CELLS.map((x, i) => (
          <g key={x}>
            <rect
              x={x}
              y={TRACK_Y - CELL_H / 2}
              width={CELL_W}
              height={CELL_H}
              fill="rgba(0,0,0,0.45)"
              stroke="var(--copper-800)"
              strokeWidth={1}
            />
            {/* condition diamond at the cell's right edge */}
            <rect
              x={x + CELL_W - 34}
              y={TRACK_Y - 11}
              width={16}
              height={16}
              transform={`rotate(45 ${x + CELL_W - 26} ${TRACK_Y - 3})`}
              fill={lit("condition") ? "var(--copper-300)" : "var(--copper-950)"}
              stroke={lit("condition") ? "var(--copper-200)" : "var(--copper-700)"}
              strokeWidth={1.5}
              style={{ transition: "all 0.25s var(--ease)" }}
            />
            {/* return arc — the cycle repeats until the check passes */}
            <path
              d={`M ${x + CELL_W - 26} ${TRACK_Y - 44} C ${x + CELL_W - 60} ${TRACK_Y - 70}, ${x + 30} ${TRACK_Y - 70}, ${x + 12} ${TRACK_Y - 46}`}
              fill="none"
              stroke={lit("condition") ? "var(--copper-300)" : "var(--copper-800)"}
              strokeWidth={1.5}
              markerEnd="url(#vb-arrow)"
              style={{ transition: "stroke 0.25s var(--ease)" }}
            />
            {i < CELLS.length - 1 && (
              <line
                x1={x + CELL_W}
                y1={TRACK_Y}
                x2={x + CELL_W + 16}
                y2={TRACK_Y}
                stroke="var(--copper-700)"
                strokeWidth={1}
              />
            )}
          </g>
        ))}

        {/* Memory rail — state that survives between cycles. */}
        <path
          d={`M ${CELLS[0] + 12} ${TRACK_Y + CELL_H / 2} L ${CELLS[0] + 12} ${MEM_Y} L ${CELLS[2] + CELL_W - 12} ${MEM_Y} L ${CELLS[2] + CELL_W - 12} ${TRACK_Y + CELL_H / 2}`}
          fill="none"
          stroke={lit("memory") ? "var(--copper-300)" : "var(--copper-800)"}
          strokeWidth={lit("memory") ? 2.5 : 1.5}
          strokeDasharray="4 4"
          style={{ transition: "all 0.25s var(--ease)" }}
        />
        {CELLS.slice(1).map((x) => (
          <line
            key={x}
            x1={x + 12}
            y1={MEM_Y}
            x2={x + 12}
            y2={TRACK_Y + CELL_H / 2}
            stroke={lit("memory") ? "var(--copper-400)" : "var(--copper-900)"}
            strokeWidth={1}
            style={{ transition: "all 0.25s var(--ease)" }}
          />
        ))}

        {/* Budget — a hard vertical stop. Nothing runs past it. */}
        <line
          x1={STOP_X}
          y1={TRACK_Y - 62}
          x2={STOP_X}
          y2={TRACK_Y + 62}
          stroke={lit("budget") ? "var(--copper-200)" : "var(--copper-600)"}
          strokeWidth={lit("budget") ? 4 : 2}
          style={{ transition: "all 0.25s var(--ease)" }}
        />
        <line
          x1={STOP_X + 6}
          y1={TRACK_Y - 62}
          x2={STOP_X + 6}
          y2={TRACK_Y + 62}
          stroke={lit("budget") ? "var(--copper-400)" : "var(--copper-800)"}
          strokeWidth={lit("budget") ? 2 : 1}
          style={{ transition: "all 0.25s var(--ease)" }}
        />

        {/* Exit to the gate, then out to the human. */}
        <line
          x1={STOP_X + 8}
          y1={TRACK_Y}
          x2={GATE_X - 4}
          y2={TRACK_Y}
          stroke="var(--copper-700)"
          strokeWidth={1}
        />
        <line
          x1={GATE_X + 124}
          y1={TRACK_Y}
          x2={SIGN_X - 4}
          y2={TRACK_Y}
          stroke="var(--copper-500)"
          strokeWidth={1.5}
          markerEnd="url(#vb-arrow)"
        />
        <line
          x1={132}
          y1={TRACK_Y}
          x2={TARGET_X.trigger - 4}
          y2={TRACK_Y}
          stroke="var(--copper-500)"
          strokeWidth={1.5}
          markerEnd="url(#vb-arrow)"
        />

        {/* Connector from the hovered decision column up to what it controls. */}
        {active && (
          <path
            d={`M ${colX(B.decisions.findIndex((d) => d.id === active)) + COL_W / 2} 470 L ${colX(B.decisions.findIndex((d) => d.id === active)) + COL_W / 2} 456 L ${TARGET_X[active]} 456 L ${TARGET_X[active]} ${active === "memory" ? MEM_Y + 2 : TRACK_Y + 66}`}
            fill="none"
            stroke="var(--copper-400)"
            strokeWidth={1.5}
            strokeDasharray="3 3"
          />
        )}
      </svg>

      {/* Band-2 text layer. */}
      <Reveal
        on={on}
        delay={140}
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      >
        {/* YOU — sets it once. */}
        <div style={endBlock(48, TRACK_Y)}>
          <div style={endTitle}>YOU</div>
          <div style={endSub}>sets it once</div>
        </div>

        {/* Trigger stamp. */}
        <div
          style={{
            position: "absolute",
            left: TARGET_X.trigger - 46,
            top: TRACK_Y - 72,
            width: 92,
            textAlign: "center",
            fontFamily: "var(--mono)",
            fontSize: 10,
            letterSpacing: "0.14em",
            color: lit("trigger") ? "var(--copper-100)" : "var(--copper-600)",
            transition: "color 0.25s var(--ease)",
          }}
        >
          FRI 16:00
        </div>

        {/* One cycle = one client's update. The example IS the diagram. */}
        {CELLS.map((x, i) => (
          <div
            key={x}
            style={{
              position: "absolute",
              left: x + 12,
              top: TRACK_Y - CELL_H / 2 + 11,
              width: CELL_W - 56,
            }}
          >
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: 9,
                letterSpacing: "0.2em",
                color: "var(--copper-700)",
              }}
            >
              CYCLE {i + 1}
            </div>
            <div
              style={{
                fontFamily: "var(--serif)",
                fontSize: 12,
                lineHeight: 1.3,
                color: "var(--neutral-200)",
                marginTop: 5,
              }}
            >
              {i < 2 ? "write update → client" : "write update → client"}{" "}
              <span style={{ color: "var(--copper-200)" }}>{i + 1}</span>
            </div>
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: 8.5,
                letterSpacing: "0.14em",
                color: lit("condition") ? "var(--copper-200)" : "var(--copper-700)",
                marginTop: 6,
                transition: "color 0.25s var(--ease)",
              }}
            >
              → review/
            </div>
          </div>
        ))}

        {/* Memory rail caption. */}
        <div
          style={{
            position: "absolute",
            left: CELLS[0] + 16,
            top: MEM_Y + 10,
            width: 300,
            fontFamily: "var(--mono)",
            fontSize: 9.5,
            letterSpacing: "0.12em",
            color: lit("memory") ? "var(--copper-100)" : "var(--copper-700)",
            transition: "color 0.25s var(--ease)",
          }}
        >
          review/state.json — who already got one
        </div>

        {/* The check, spelled out once. */}
        <div
          style={{
            position: "absolute",
            left: CELLS[0],
            top: TRACK_Y - CELL_H / 2 - 52,
            width: 560,
            fontFamily: "var(--mono)",
            fontSize: 9.5,
            letterSpacing: "0.14em",
            color: lit("condition") ? "var(--copper-200)" : "var(--copper-700)",
            transition: "color 0.25s var(--ease)",
          }}
        >
          CHECK · {B.example.condition}
        </div>

        {/* Budget cap. */}
        <div
          style={{
            position: "absolute",
            left: STOP_X - 56,
            top: TRACK_Y + 70,
            width: 120,
            textAlign: "center",
            fontFamily: "var(--mono)",
            fontSize: 9.5,
            letterSpacing: "0.18em",
            color: lit("budget") ? "var(--copper-100)" : "var(--copper-600)",
            transition: "color 0.25s var(--ease)",
          }}
        >
          CAP · 7-DAY EXPIRY
        </div>

        {/* Gate. */}
        <div
          style={{
            position: "absolute",
            left: GATE_X,
            top: TRACK_Y - 26,
            width: 124,
            height: 52,
            border: `1px solid ${lit("gate") ? "var(--copper-200)" : "var(--copper-700)"}`,
            background: lit("gate") ? "rgba(184,110,61,0.12)" : "rgba(0,0,0,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 7,
            color: lit("gate") ? "var(--copper-100)" : "var(--copper-400)",
            transition: "all 0.25s var(--ease)",
          }}
        >
          <LucideIcon name="Shield" size={14} color="currentColor" />
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11,
              letterSpacing: "0.2em",
            }}
          >
            GATE
          </span>
        </div>

        {/* YOU — signs. */}
        <div style={endBlock(SIGN_X, TRACK_Y)}>
          <div style={endTitle}>YOU</div>
          <div style={endSub}>signs</div>
        </div>

        {/* Implementation strip, tucked under the right end. */}
        <div
          style={{
            position: "absolute",
            left: SIGN_X,
            top: TRACK_Y + 40,
            fontFamily: "var(--mono)",
            fontSize: 9.5,
            letterSpacing: "0.1em",
            color: "var(--copper-500)",
          }}
        >
          {B.example.impl}
        </div>
      </Reveal>

      {/* ── BAND 3 — five decisions, in time order, under what they control ── */}
      <div
        data-no-advance=""
        style={{ position: "absolute", left: 0, right: 0, top: 470 }}
      >
        {B.decisions.map((d, i) => {
          const isLit = lit(d.id);
          const isPinned = pinned === d.id;
          return (
            <Reveal
              key={d.id}
              on={on}
              delay={260 + i * 90}
              data-testid={`vb-decision-${d.id}`}
              data-active={String(active === d.id)}
              style={{ position: "absolute", left: colX(i), top: 0, width: COL_W }}
            >
              <div
                onMouseEnter={() => setHover(d.id)}
                onMouseLeave={() => setHover(null)}
                onClick={() => setPinned((c) => (c === d.id ? null : d.id))}
                style={{
                  cursor: "pointer",
                  padding: "10px 12px 12px",
                  borderTop: `2px solid ${isLit ? "var(--copper-200)" : "var(--copper-800)"}`,
                  background: isLit ? "rgba(184,110,61,0.07)" : "transparent",
                  boxShadow: isPinned
                    ? "inset 0 0 0 1px rgba(217,158,108,0.35)"
                    : "none",
                  transition: "all 0.22s var(--ease)",
                  minHeight: 96,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    color: isLit ? "var(--copper-100)" : "var(--copper-500)",
                  }}
                >
                  <LucideIcon name={d.icon} size={14} color="currentColor" />
                  <span
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 12.5,
                      letterSpacing: "0.2em",
                    }}
                  >
                    {d.title}
                  </span>
                  <span style={{ flex: 1 }} />
                  <span
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 9,
                      letterSpacing: "0.2em",
                      color: "var(--copper-700)",
                    }}
                  >
                    {d.num}
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: "var(--serif)",
                    fontStyle: "italic",
                    fontSize: 12.5,
                    lineHeight: 1.35,
                    color: isLit ? "var(--neutral-100)" : "var(--neutral-400)",
                    marginTop: 6,
                    transition: "color 0.22s var(--ease)",
                  }}
                >
                  {d.essence}
                </div>
                {"warning" in d && d.warning ? (
                  <div
                    style={{
                      fontFamily: "var(--serif)",
                      fontStyle: "italic",
                      fontSize: 10.5,
                      lineHeight: 1.3,
                      color: isLit ? "var(--copper-300)" : "var(--copper-800)",
                      marginTop: 7,
                      transition: "color 0.22s var(--ease)",
                    }}
                  >
                    {d.warning}
                  </div>
                ) : (
                  <div
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 9.5,
                      letterSpacing: "0.1em",
                      color: isLit ? "var(--copper-300)" : "var(--copper-800)",
                      marginTop: 7,
                      transition: "color 0.22s var(--ease)",
                    }}
                  >
                    {d.value}
                  </div>
                )}
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* ── BOTTOM — the landing ─────────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          top: 596,
          display: "flex",
          alignItems: "baseline",
          gap: 28,
        }}
      >
        <Reveal on={land} delay={60}>
          <p
            style={{
              fontFamily: "var(--display)",
              fontSize: 26,
              color: "var(--copper-100)",
              margin: 0,
              whiteSpace: "nowrap",
            }}
          >
            {highlight(B.tagline, B.taglineKw)}
          </p>
        </Reveal>
        <Reveal on={land} delay={220}>
          <p
            style={{
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontSize: 14,
              color: "var(--neutral-400)",
              margin: 0,
              whiteSpace: "nowrap",
            }}
          >
            {highlight(B.closer, B.closerKw)}
          </p>
        </Reveal>
      </div>
    </>
  );
}

// ── small shared bits, local to this variant ─────────────────────────────
const endBlock = (left: number, cy: number) => ({
  position: "absolute" as const,
  left,
  top: cy - 27,
  width: 88,
  height: 54,
  border: "1px solid var(--copper-300)",
  background: "rgba(184,110,61,0.12)",
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center" as const,
  justifyContent: "center" as const,
});

const endTitle = {
  fontFamily: "var(--mono)",
  fontSize: 12,
  letterSpacing: "0.28em",
  color: "var(--copper-100)",
  textIndent: "0.28em",
};

const endSub = {
  fontFamily: "var(--serif)",
  fontStyle: "italic" as const,
  fontSize: 10,
  color: "var(--copper-300)",
  marginTop: 2,
};

export const variantBName = "The Score — the loop drawn on a time axis";
