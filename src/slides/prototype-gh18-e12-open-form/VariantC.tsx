// PROTOTYPE — throwaway. Variant C · "THE SPEC".
//
// Form thesis: no diagram. The five decisions are not five concepts to
// illustrate — they are five FIELDS you have to fill in before you are allowed
// to leave the room. So render the artifact itself: a loop spec, filled in
// with the Friday 4 PM example. The abstraction and the worked example are the
// same object, read left column / right column.
//
// What this variant is testing:
//   - Does the chain→ring shift survive as pure typography (two lines, one
//     struck) with no drawn figure at all?
//   - Is a filled-in spec more actionable at a workshop than a diagram — the
//     audience can photograph it and copy it on Monday.
//   - Only one diagrammatic element survives: the return rail down the left,
//     which is the loop. Is one rail enough to carry "cycle"?
import { useState } from "react";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { HintIcon } from "@/components/HintIcon";
import { highlight } from "@/components/highlight";
import { LucideIcon } from "@/slides/foundation-core-section-e/components/LucideIcon";
import { Reveal } from "@/slides/foundation-core-section-e/components/Reveal";
import { brief as B, type DecisionId } from "./brief";

const SHEET_X = 230;
const SHEET_W = 650;
const ROWS_Y = 258;
const ROW_H = 56;
const RAIL_X = 200;

export function VariantC() {
  const { stepIndex } = useDeck();
  const [hover, setHover] = useState<DecisionId | null>(null);
  const [pinned, setPinned] = useState<DecisionId | null>(null);
  const active = pinned ?? hover;

  const on = stepIndex >= 0;
  const land = stepIndex >= 1;

  return (
    <>
      <FigLabel {...B.fig} />

      <div className="slide-headline-row">
        <h1 className="slide-headline small">
          {highlight(B.headline, B.headlineKw)}
        </h1>
      </div>

      {/* Qualifier, right-aligned under the headline — appears exactly once. */}
      <div
        style={{
          position: "absolute",
          right: 48,
          top: 138,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <HintIcon
          text="Hover a field for why it exists, click to pin/unpin."
          position="left"
        />
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
      </div>

      {/* ── The shift, as two lines of type. No figure. ─────────────────── */}
      <Reveal
        on={on}
        delay={60}
        style={{
          position: "absolute",
          left: SHEET_X,
          top: 180,
          width: 1232 - SHEET_X,
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <span
          style={{
            position: "relative",
            fontFamily: "var(--mono)",
            fontSize: 13,
            letterSpacing: "0.1em",
            color: "var(--neutral-500)",
          }}
        >
          {B.shift.typographic}
          <span
            aria-hidden
            style={{
              position: "absolute",
              left: -4,
              right: -4,
              top: "52%",
              height: 1,
              background: "var(--copper-500)",
            }}
          />
        </span>
        <span style={{ color: "var(--copper-700)", fontSize: 14 }}>⇒</span>
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 13,
            letterSpacing: "0.1em",
            color: "var(--copper-100)",
          }}
        >
          you <span style={{ color: "var(--copper-700)" }}>→</span>{" "}
          <span style={{ color: "var(--copper-300)" }}>[ loop ]</span>{" "}
          <span style={{ color: "var(--copper-700)" }}>→</span> you
        </span>
        <span
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 12.5,
            color: "var(--neutral-400)",
          }}
        >
          {B.shift.afterNote}
        </span>
      </Reveal>

      {/* ── The return rail — the only drawn thing on the slide. ─────────── */}
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
            id="vc-arrow"
            viewBox="0 0 8 8"
            refX={7}
            refY={4}
            markerWidth={5}
            markerHeight={5}
            orient="auto"
          >
            <path d="M 0 0 L 8 4 L 0 8 z" fill="var(--copper-300)" />
          </marker>
        </defs>
        <path
          id="vc-rail"
          d={`M ${RAIL_X} ${ROWS_Y - 8}
              L ${RAIL_X} ${ROWS_Y + ROW_H * 5 - 2}
              Q ${RAIL_X} ${ROWS_Y + ROW_H * 5 + 12} ${RAIL_X - 14} ${ROWS_Y + ROW_H * 5 + 12}
              L ${RAIL_X - 26} ${ROWS_Y + ROW_H * 5 + 12}
              Q ${RAIL_X - 40} ${ROWS_Y + ROW_H * 5 + 12} ${RAIL_X - 40} ${ROWS_Y + ROW_H * 5 - 2}
              L ${RAIL_X - 40} ${ROWS_Y - 8}
              Q ${RAIL_X - 40} ${ROWS_Y - 22} ${RAIL_X - 26} ${ROWS_Y - 22}
              L ${RAIL_X - 4} ${ROWS_Y - 22}`}
          fill="none"
          stroke="var(--copper-700)"
          strokeWidth={1.5}
          markerEnd="url(#vc-arrow)"
        />
        <circle r={4} fill="var(--copper-200)">
          <animateMotion dur="7s" repeatCount="indefinite" rotate="auto">
            <mpath href="#vc-rail" />
          </animateMotion>
        </circle>
        {/* Field ticks off the rail. */}
        {B.decisions.map((d, i) => (
          <line
            key={d.id}
            x1={RAIL_X}
            y1={ROWS_Y + i * ROW_H + ROW_H / 2}
            x2={SHEET_X - 4}
            y2={ROWS_Y + i * ROW_H + ROW_H / 2}
            stroke={
              active === d.id || (land && active === null)
                ? "var(--copper-300)"
                : "var(--copper-900)"
            }
            strokeWidth={active === d.id ? 2 : 1}
            style={{ transition: "all 0.22s var(--ease)" }}
          />
        ))}
      </svg>

      <div
        style={{
          position: "absolute",
          left: RAIL_X - 56,
          top: ROWS_Y + ROW_H * 2.5 - 30,
          width: 14,
          fontFamily: "var(--mono)",
          fontSize: 9,
          letterSpacing: "0.24em",
          color: "var(--copper-600)",
          lineHeight: 1.15,
          textAlign: "center",
        }}
      >
        A G A I N
      </div>

      {/* ── The spec sheet ───────────────────────────────────────────────── */}
      <Reveal
        on={on}
        delay={140}
        style={{
          position: "absolute",
          left: SHEET_X,
          top: ROWS_Y - 40,
          width: SHEET_W,
          display: "flex",
          alignItems: "baseline",
          gap: 12,
        }}
      >
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.22em",
            color: "var(--copper-300)",
            textTransform: "uppercase",
          }}
        >
          LOOP SPEC
        </span>
        <span style={{ color: "var(--copper-800)" }}>·</span>
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.1em",
            color: "var(--neutral-400)",
          }}
        >
          {B.example.specName}
        </span>
        <span style={{ flex: 1 }} />
        <span
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 11.5,
            color: "var(--neutral-500)",
          }}
        >
          five fields · all five, or it is not a loop
        </span>
      </Reveal>

      <div
        data-no-advance=""
        style={{
          position: "absolute",
          left: SHEET_X,
          top: ROWS_Y,
          width: SHEET_W,
          borderTop: "1px solid var(--copper-800)",
        }}
      >
        {B.decisions.map((d, i) => {
          const isActive = active === d.id;
          const isPinned = pinned === d.id;
          const dim = active !== null && !isActive;
          return (
            <Reveal
              key={d.id}
              on={on}
              delay={200 + i * 80}
              data-testid={`vc-field-${d.id}`}
              data-active={String(isActive)}
            >
              <div
                onMouseEnter={() => setHover(d.id)}
                onMouseLeave={() => setHover(null)}
                onClick={() => setPinned((c) => (c === d.id ? null : d.id))}
                style={{
                  height: ROW_H,
                  boxSizing: "border-box",
                  borderBottom: "1px solid var(--copper-900)",
                  padding: "8px 12px 0",
                  cursor: "pointer",
                  background: isActive ? "rgba(184,110,61,0.08)" : "transparent",
                  boxShadow: isPinned
                    ? "inset 2px 0 0 0 var(--copper-300)"
                    : "none",
                  opacity: dim ? 0.4 : 1,
                  transition: "all 0.22s var(--ease)",
                }}
              >
                <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                  <span
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 9.5,
                      letterSpacing: "0.2em",
                      color: "var(--copper-700)",
                      width: 22,
                    }}
                  >
                    {d.num}
                  </span>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      width: 148,
                      color: isActive ? "var(--copper-100)" : "var(--copper-300)",
                    }}
                  >
                    <LucideIcon name={d.icon} size={13} color="currentColor" />
                    <span
                      style={{
                        fontFamily: "var(--mono)",
                        fontSize: 13,
                        letterSpacing: "0.2em",
                      }}
                    >
                      {d.title}
                    </span>
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 10,
                      color: "var(--copper-800)",
                    }}
                  >
                    =
                  </span>
                  <span
                    style={{
                      flex: 1,
                      fontFamily: "var(--mono)",
                      fontSize: 12,
                      letterSpacing: "0.02em",
                      color: land || isActive
                        ? "var(--copper-200)"
                        : "var(--neutral-500)",
                      transition: "color 0.3s var(--ease)",
                    }}
                  >
                    {d.value}
                  </span>
                </div>
                {/* Reserved second line — no layout shift when it fills. */}
                <div
                  style={{
                    marginLeft: 34,
                    marginTop: 4,
                    fontFamily: "var(--serif)",
                    fontStyle: "italic",
                    fontSize: 11.5,
                    lineHeight: 1.25,
                    color: "warning" in d ? "var(--copper-300)" : "var(--neutral-300)",
                    opacity: isActive ? 1 : 0,
                    transition: "opacity 0.22s var(--ease)",
                  }}
                >
                  {"warning" in d && d.warning ? d.warning : d.long}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* ── Right column — what the spec is actually for ─────────────────── */}
      <div
        style={{
          position: "absolute",
          left: SHEET_X + SHEET_W + 34,
          top: ROWS_Y - 40,
          width: 1232 - (SHEET_X + SHEET_W + 34),
        }}
      >
        <Reveal on={on} delay={260}>
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: 9.5,
              letterSpacing: "0.24em",
              color: "var(--copper-700)",
              textTransform: "uppercase",
            }}
          >
            {B.example.kicker}
          </div>
          <div
            style={{
              fontFamily: "var(--serif)",
              fontSize: 13,
              lineHeight: 1.45,
              color: "var(--neutral-200)",
              marginTop: 10,
            }}
          >
            <em style={{ color: "var(--copper-200)", fontStyle: "normal" }}>
              {B.example.when}
            </em>{" "}
            — {B.example.what}.
          </div>
        </Reveal>

        <Reveal on={on} delay={340}>
          <div
            style={{
              marginTop: 18,
              paddingTop: 14,
              borderTop: "1px solid var(--copper-900)",
              fontFamily: "var(--mono)",
              fontSize: 10.5,
              lineHeight: 1.5,
              color: "var(--neutral-300)",
            }}
          >
            <span style={{ color: "var(--copper-400)" }}>
              {B.example.conditionLabel}
            </span>
            <br />
            {B.example.condition}
          </div>
        </Reveal>

        <Reveal on={on} delay={400}>
          <div
            style={{
              marginTop: 18,
              paddingTop: 14,
              borderTop: "1px solid var(--copper-900)",
              fontFamily: "var(--mono)",
              fontSize: 10.5,
              lineHeight: 1.5,
              color: "var(--copper-200)",
              letterSpacing: "0.04em",
            }}
          >
            <span style={{ color: "var(--copper-700)" }}>
              {B.example.implLabel}
            </span>
            <br />
            {B.example.impl}
          </div>
        </Reveal>
      </div>

      {/* ── Landing ──────────────────────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          left: SHEET_X,
          right: 48,
          top: ROWS_Y + ROW_H * 5 + 30,
          display: "flex",
          alignItems: "baseline",
          gap: 26,
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

export const variantCName = "The Spec — five fields, filled in, no diagram";
