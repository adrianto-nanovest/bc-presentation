// Amplification bar for slide D.1 — label + value lockup with an animated
// fill bar beneath. Width drives in via CSS transition (`width 1.2s
// var(--ease)`) — no Framer Motion. When `widthPct > 100` an additional
// glowing edge bar is rendered to suggest the bar has overflowed its track
// (the "machine pace" overflow effect).
//
// Ported from `claude-design-section-d/jsx/slides-d.jsx:15-41`.
import type { CSSProperties } from "react";

export interface AmpBarProps {
  label: string;
  value: string;
  /** Width percentage (0..N). Values >100 trigger the overflow glow. */
  widthPct: number;
  /** When true, the bar animates from 0 → widthPct. */
  on: boolean;
  /** Animation delay (ms). */
  delay?: number;
  /** CSS variable suffix for accent color. Defaults to `copper-500`. */
  accent?: string;
  /** Bumps the bar height + value font size for the dominant "machine" row. */
  tall?: boolean;
}

export function AmpBar({
  label,
  value,
  widthPct,
  on,
  delay = 0,
  accent = "copper-500",
  tall = false,
}: AmpBarProps) {
  const accentVar = `var(--${accent})`;
  const trackHeight = tall ? 14 : 10;

  const labelStyle: CSSProperties = {
    fontFamily: "var(--mono)",
    fontSize: 11,
    letterSpacing: "0.18em",
    color: accentVar,
    textTransform: "uppercase",
  };
  const valueStyle: CSSProperties = {
    fontFamily: "var(--display)",
    fontSize: tall ? 32 : 22,
    color: accentVar,
    lineHeight: 1,
  };
  const trackStyle: CSSProperties = {
    position: "relative",
    width: "100%",
    height: trackHeight,
    background: "rgba(184,110,61,0.10)",
    border: "1px solid var(--copper-800)",
  };
  const fillStyle: CSSProperties = {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: on ? `${Math.min(100, widthPct)}%` : "0%",
    background: accentVar,
    transition: `width 1.2s var(--ease) ${delay}ms`,
  };

  return (
    <div
      data-testid="amp-bar"
      data-accent={accent}
      data-tall={tall ? "true" : "false"}
      style={{ display: "flex", flexDirection: "column", gap: 6 }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <span style={labelStyle}>{label}</span>
        <span style={valueStyle}>{value}</span>
      </div>
      <div style={trackStyle}>
        <div style={fillStyle} />
        {widthPct > 100 && (
          <div
            style={{
              position: "absolute",
              right: -2,
              top: -4,
              bottom: -4,
              width: 4,
              background: accentVar,
              opacity: on ? 1 : 0,
              transition: `opacity 0.3s var(--ease) ${delay + 1100}ms`,
              boxShadow: `0 0 12px ${accentVar}`,
            }}
          />
        )}
      </div>
    </div>
  );
}
