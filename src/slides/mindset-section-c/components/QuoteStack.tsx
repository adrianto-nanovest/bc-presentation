// QuoteStack — N italic sentence-lines vertically stacked, with per-line
// stagger gates + per-line font-size overrides. Used on the C→D Bridge slide
// for the Kofi Annan quote.
//
// Each line gets its own visibility flag (caller-controlled) so the parent
// can stagger the reveal over ~2.4s — sentence 1, then sentence 2 ~400ms
// later, then sentence 3 ~400ms after that. Attribution chip is right-
// aligned and exposed as its own visibility gate.
//
// No internal Space-key wiring or timers — the parent owns timing so the
// component stays composable (and so the Bridge can hold at step 0 without
// any internal animation creep).
import type { CSSProperties, ReactNode } from "react";

export interface QuoteStackLine {
  /** Pre-highlighted content, typically wrapped via `highlight()`. */
  content: ReactNode;
  /** Optional per-line font-size override (px). Defaults to `size`. */
  size?: number;
  /** Caller-controlled visibility gate. */
  visible?: boolean;
  /** Stagger delay in ms before the fade kicks in (relative to `visible` flipping true). */
  delayMs?: number;
}

export interface QuoteStackProps {
  lines: readonly QuoteStackLine[];
  /** Default font-size in px. Per-line `size` overrides this. */
  size?: number;
  /** Vertical gap between lines (px). */
  gap?: number;
  /** Per-line fade duration (ms). */
  duration?: number;
  /** Right-aligned attribution (e.g. "— Kofi Annan"). */
  attribution?: string;
  /** Visibility gate for attribution. */
  attributionVisible?: boolean;
  /** Stagger delay for attribution (ms). */
  attributionDelayMs?: number;
  /** Test id for the root container. */
  testId?: string;
}

export function QuoteStack({
  lines,
  size = 52,
  gap = 22,
  duration = 600,
  attribution,
  attributionVisible = true,
  attributionDelayMs = 0,
  testId = "quote-stack",
}: QuoteStackProps) {
  return (
    <div
      data-testid={testId}
      style={{ display: "flex", flexDirection: "column", gap }}
    >
      {lines.map((l, i) => {
        const visible = l.visible ?? true;
        const lineSize = l.size ?? size;
        const style: CSSProperties = {
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontSize: lineSize,
          color: "var(--neutral-100)",
          margin: 0,
          lineHeight: 1.2,
          fontWeight: 400,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(10px)",
          transition: `opacity ${duration}ms var(--ease), transform ${duration}ms var(--ease)`,
          transitionDelay: visible ? `${l.delayMs ?? 0}ms` : "0ms",
          willChange: "opacity, transform",
        };
        return (
          <p key={i} data-testid={`${testId}-line-${i}`} style={style}>
            {l.content}
          </p>
        );
      })}
      {attribution && (
        <span
          data-testid={`${testId}-attribution`}
          style={{
            fontFamily: "var(--mono)",
            fontSize: 14,
            letterSpacing: "0.22em",
            color: "var(--copper-300)",
            textTransform: "uppercase",
            textAlign: "right",
            marginTop: 12,
            opacity: attributionVisible ? 1 : 0,
            transform: attributionVisible ? "translateY(0)" : "translateY(8px)",
            transition: `opacity ${duration}ms var(--ease), transform ${duration}ms var(--ease)`,
            transitionDelay: attributionVisible ? `${attributionDelayMs}ms` : "0ms",
            willChange: "opacity, transform",
          }}
        >
          {attribution}
        </span>
      )}
    </div>
  );
}
