// StrikethroughAnimator — wraps a word and animates a copper-700 strikethrough
// draw from left → right when `active` flips true.
//
// Scaffolded shape; later tasks (C.1 + C.5) will tune the easing and the
// underline-width vs strikethrough geometry. Render is intentionally minimal:
// children + a copper line that grows via scaleX.
import type { CSSProperties, ReactNode } from "react";

export interface StrikethroughAnimatorProps {
  active: boolean;
  /** Duration of the line-draw in ms. Default 400 (matches C.1/C.5 spec). */
  duration?: number;
  /** Override stroke color. Defaults to var(--copper-700). */
  color?: string;
  /** Stroke thickness in px. Default 3. */
  thickness?: number;
  children: ReactNode;
}

export function StrikethroughAnimator({
  active,
  duration = 400,
  color = "var(--copper-700)",
  thickness = 3,
  children,
}: StrikethroughAnimatorProps) {
  const wrap: CSSProperties = {
    position: "relative",
    display: "inline-block",
    whiteSpace: "nowrap",
  };
  const line: CSSProperties = {
    position: "absolute",
    left: 0,
    right: 0,
    top: "50%",
    height: thickness,
    background: color,
    transformOrigin: "left center",
    transform: active ? "scaleX(1)" : "scaleX(0)",
    transition: `transform ${duration}ms var(--ease)`,
    pointerEvents: "none",
  };
  return (
    <span
      data-strikethrough
      data-active={active ? "1" : "0"}
      style={wrap}
    >
      {children}
      <span aria-hidden style={line} />
    </span>
  );
}
