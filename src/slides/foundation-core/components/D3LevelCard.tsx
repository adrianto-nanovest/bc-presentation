// One column on slide D.3 — header lockup ("Level N" + label) → copper
// rule → ASK paragraph → DO bullet list → motion glyph slot → OUTCOME
// paragraph (anchored to the bottom via a flex spacer).
//
// Visual states (driven by the slide):
//   focused   = step pointer is on this column (highlight border, lift,
//               full opacity, copper inset shadow)
//   hovered   = canHover && hover key matches (same visual as focused)
//   revealed  = step >= column index (lit, but not highlighted)
//   else      = dim placeholder (0.35 opacity, copper-800 border)
//
// The slide owns hover state and passes booleans in. The motion glyph is
// rendered as `children` so the slide picks the right `D3*Anim` per level.
//
// Ported from `claude-design-section-d/jsx/slides-d.jsx:824-895`.
import type { CSSProperties, ReactNode } from "react";
import { highlight as KW } from "../../../components/highlight";
import { Reveal } from "../../foundation-core-section-e/components/Reveal";
import type { D3Level } from "../content";

export interface D3LevelCardProps {
  level: D3Level;
  /** 0-based column index; "Level N" label uses index + 1. */
  index: number;
  /** Step pointer is on this column. */
  focused: boolean;
  /** Mouse is hovering this column AND hover is unlocked (step ≥ 4). */
  hovered: boolean;
  /** Column has been revealed (step >= index). */
  revealed: boolean;
  /** True only when canHover is gated off (controls cursor + listeners are wired by slide). */
  canHover?: boolean;
  /** Mouse-enter handler — slide wires this up only when hover is unlocked. */
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  /** The looping motion glyph (one of D3BpmAnim / D3RpaAnim / D3IpaAnim / D3AgenticAnim). */
  children?: ReactNode;
}

export function D3LevelCard({
  level,
  index,
  focused,
  hovered,
  revealed,
  canHover = false,
  onMouseEnter,
  onMouseLeave,
  children,
}: D3LevelCardProps) {
  const highlight = focused || hovered;
  const accent = `var(--${level.copper})`;

  const cardStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    padding: "16px 16px",
    border: "1px solid",
    borderColor: highlight
      ? "var(--copper-200)"
      : revealed
      ? accent
      : "var(--copper-800)",
    background: highlight
      ? "rgba(184,110,61,0.10)"
      : revealed
      ? "rgba(10,10,10,0.7)"
      : "rgba(10,10,10,0.35)",
    boxShadow: highlight
      ? `0 0 0 1px ${accent} inset, 0 0 30px -8px ${accent}`
      : "none",
    opacity: revealed ? 1 : 0.35,
    transform: highlight ? "translateY(-4px)" : "translateY(0)",
    transition:
      "opacity 0.5s var(--ease), transform 0.3s var(--ease), background 0.25s var(--ease), border-color 0.25s var(--ease), box-shadow 0.25s var(--ease)",
    cursor: "default",
    position: "relative",
    minHeight: 0,
  };

  return (
    <div
      data-testid="d3-level-card"
      data-level={level.key}
      data-focused={focused ? "true" : "false"}
      data-hovered={hovered ? "true" : "false"}
      data-revealed={revealed ? "true" : "false"}
      data-can-hover={canHover ? "true" : "false"}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={cardStyle}
    >
      {/* Header lockup */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.22em",
            color: highlight ? "var(--copper-200)" : accent,
            textTransform: "uppercase",
          }}
        >
          Level {index + 1}
        </span>
        <span
          style={{
            fontFamily: "var(--display)",
            fontSize: 26,
            color: "var(--neutral-50)",
            lineHeight: 1,
          }}
        >
          {level.label}
        </span>
      </div>

      {/* Header rule */}
      <div
        style={{
          height: 1,
          background: highlight ? "var(--copper-200)" : "var(--copper-800)",
          transition: "background 0.3s var(--ease)",
        }}
      />

      {/* ASK */}
      <Reveal on={revealed} delay={focused ? 150 : 0}>
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: 9,
            letterSpacing: "0.22em",
            color: "var(--copper-500)",
            textTransform: "uppercase",
            marginBottom: 3,
          }}
        >
          Ask
        </div>
        <p
          style={{
            fontFamily: "var(--display)",
            fontSize: 19,
            color: "var(--neutral-100)",
            margin: 0,
            lineHeight: 1.15,
            fontStyle: "italic",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {KW(level.ask, level.askKw)}
        </p>
      </Reveal>

      {/* DO */}
      <Reveal on={revealed} delay={focused ? 280 : 0}>
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: 9,
            letterSpacing: "0.22em",
            color: "var(--copper-500)",
            textTransform: "uppercase",
            marginTop: 2,
            marginBottom: 4,
          }}
        >
          Do
        </div>
        <ul
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {level.bullets.map((b, j) => (
            <li
              key={j}
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 8,
                fontFamily: "var(--serif)",
                fontSize: 13,
                color: "var(--neutral-200)",
                lineHeight: 1.25,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              <span
                style={{
                  flex: "0 0 auto",
                  width: 4,
                  height: 4,
                  background: accent,
                  transform: "translateY(-1px)",
                }}
              />
              <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                {KW(b.text, b.kw)}
              </span>
            </li>
          ))}
        </ul>
      </Reveal>

      {/* Motion glyph slot */}
      <Reveal
        on={revealed}
        delay={focused ? 360 : 0}
        style={{ marginTop: 4 }}
      >
        {children}
      </Reveal>

      {/* Spacer pushes OUTCOME to the bottom of the card */}
      <div style={{ flex: 1 }} />

      {/* OUTCOME */}
      <Reveal on={revealed} delay={focused ? 480 : 0}>
        <div
          style={{
            borderTop: `1px solid ${
              highlight ? "var(--copper-300)" : "var(--copper-800)"
            }`,
            paddingTop: 8,
            marginTop: 2,
            transition: "border-color 0.3s var(--ease)",
          }}
        >
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: 9,
              letterSpacing: "0.22em",
              color: "var(--copper-500)",
              textTransform: "uppercase",
              marginBottom: 4,
            }}
          >
            Outcome
          </div>
          <p
            style={{
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontSize: 13,
              color: highlight ? "var(--copper-200)" : "var(--neutral-200)",
              margin: 0,
              lineHeight: 1.3,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              transition: "color 0.3s var(--ease)",
            }}
          >
            {KW(level.outcome, level.outcomeKw)}
          </p>
        </div>
      </Reveal>
    </div>
  );
}
