// Reveal / CopperRule — shared animation primitives for Section E slides.
//
// These wrap the existing globals.css `.fade` / `.fade.on` and
// `.copper-rule` / `.copper-rule.on` rules (defined in T3). They are the
// single reveal primitive for E slides; reach for Framer Motion only when
// you need real interactive motion (drag, layout, gestures).
//
// Ported from `claude-design-project/jsx/shell.jsx:175-194`.
import type { CSSProperties, ReactNode, ElementType } from "react";

export interface RevealProps {
  /** When true, transitions the element into its visible/on state. */
  on: boolean;
  /** Delay (ms) applied to both `transitionDelay` and `animationDelay`. */
  delay?: number;
  /** Element tag to render. Defaults to "div". */
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  // Allow passthrough of common props (data-*, aria-*, etc.) without losing
  // type-safety on the documented props.
  [key: `data-${string}`]: string | undefined;
}

export function Reveal({
  on,
  delay = 0,
  as: Tag = "div",
  className = "",
  style,
  children,
  ...rest
}: RevealProps) {
  const cls = `fade ${on ? "on" : ""} ${className}`.trim();
  return (
    <Tag
      className={cls}
      style={{
        ...style,
        transitionDelay: on ? `${delay}ms` : "0ms",
        animationDelay: on ? `${delay}ms` : "0ms",
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export interface CopperRuleProps {
  on: boolean;
  delay?: number;
  /** CSS width — string or number (px). Defaults to "100%". */
  width?: string | number;
  style?: CSSProperties;
}

export function CopperRule({
  on,
  delay = 0,
  width = "100%",
  style,
}: CopperRuleProps) {
  return (
    <div
      className={`copper-rule ${on ? "on" : ""}`}
      style={{
        width,
        transitionDelay: on ? `${delay}ms` : "0ms",
        ...style,
      }}
    />
  );
}
