// DisplayTitle — Instrument Serif display heading used by the Title slide
// (and any future cover-style slide). Wraps an h1 with the standard display
// font tokens + tunable size.
//
// Scaffolded; later tasks may add letter-spacing tweaks or stagger.
import type { CSSProperties, ReactNode } from "react";

export interface DisplayTitleProps {
  children: ReactNode;
  /** Font size in px. Default 92 per Title spec. */
  size?: number;
  /** Override color. Defaults to neutral-50. */
  color?: string;
  style?: CSSProperties;
  className?: string;
}

export function DisplayTitle({
  children,
  size = 92,
  color = "var(--neutral-50)",
  style,
  className,
}: DisplayTitleProps) {
  return (
    <h1
      data-testid="display-title"
      className={className}
      style={{
        fontFamily: "var(--display)",
        fontWeight: 400,
        fontSize: size,
        lineHeight: 1.02,
        letterSpacing: "-0.01em",
        color,
        margin: 0,
        ...style,
      }}
    >
      {children}
    </h1>
  );
}
