// OutputCard — F.8 user-facing output card (spec §11.5).
//
// Four cards on the right side of F.8's coronation visual. Each card
// represents a daily-use output that the audience's potential Agentic OS
// produces: DAILY DIGEST · TASKS · SCHEDULE · MEMORIES.
//
// Layout (~260px × 100px):
//   1. Header row — Lucide icon + mono uppercase title
//   2. Subtitle — italic serif copper-300
//   3. Body — italic serif neutral-300 (1 line, optional)
//   4. CSS-only hover popover anchored to the LEFT of the card
//      (the stack lives on the right of the card from the card's POV —
//      anchoring the popover to the card's left keeps it inside the
//      stage area on a 1280-wide canvas)
//
// Reveal: wraps content in <Reveal on={on} delay={delay}> so all four
// cards fade in as a group on step 10 (per spec §11.6).
import type { CSSProperties } from "react";
import { Reveal } from "./Reveal";
import { LucideIcon } from "./LucideIcon";

export type OutputCardKind =
  | "daily-digest"
  | "tasks"
  | "schedule"
  | "memories";

export interface OutputCardProps {
  kind: OutputCardKind;
  /** Mono uppercase title — e.g. "DAILY DIGEST". */
  title: string;
  /** Italic serif tagline beneath the title — e.g. "today's brief". */
  subtitle: string;
  /** Optional body line, italic serif. */
  body?: string;
  /** Hover popover copy — full sentence example (~1 line, may wrap). */
  popover: string;
  /** Reveal gate. */
  on: boolean;
  /** Reveal delay (ms). */
  delay?: number;
  /** Optional inline style override (e.g. positioning). */
  style?: CSSProperties;
}

// Icon mapping per kind. Free lucide icons only.
const ICON_FOR_KIND: Record<OutputCardKind, string> = {
  "daily-digest": "Inbox",
  tasks: "CheckCircle",
  schedule: "Calendar",
  memories: "Library",
};

export function OutputCard({
  kind,
  title,
  subtitle,
  body,
  popover,
  on,
  delay = 0,
  style,
}: OutputCardProps) {
  const iconName = ICON_FOR_KIND[kind];
  return (
    <Reveal
      on={on}
      delay={delay}
      data-testid={`output-card-${kind}`}
      style={style}
    >
      <div
        className="f8-output-card"
        style={{
          position: "relative",
          width: 260,
          minHeight: 100,
          border: "1px solid var(--copper-800)",
          background: "rgba(184,110,61,0.04)",
          padding: "14px 16px",
          display: "flex",
          flexDirection: "column",
          gap: 6,
          transition:
            "border-color 0.2s var(--ease), background 0.2s var(--ease)",
          cursor: "default",
        }}
      >
        {/* Header row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <LucideIcon name={iconName} size={18} color="var(--copper-200)" />
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 12,
              letterSpacing: "0.22em",
              color: "var(--copper-100)",
              textTransform: "uppercase",
            }}
          >
            {title}
          </span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 13,
            color: "var(--copper-300)",
            lineHeight: 1.35,
          }}
        >
          {subtitle}
        </div>

        {/* Optional body line */}
        {body ? (
          <div
            style={{
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontSize: 12,
              color: "var(--neutral-400)",
              lineHeight: 1.35,
            }}
          >
            {body}
          </div>
        ) : null}

        {/* CSS-only hover popover — anchored to the card's LEFT so it
            opens toward the stack (and stays inside the 1280px stage). */}
        <div
          className="f8-output-popover"
          role="tooltip"
          style={{
            position: "absolute",
            top: "50%",
            right: "calc(100% + 12px)",
            transform: "translateY(-50%)",
            width: 280,
            padding: "12px 14px",
            background: "var(--neutral-900)",
            border: "1px solid var(--copper-700)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 12.5,
            color: "var(--neutral-200)",
            lineHeight: 1.45,
            opacity: 0,
            pointerEvents: "none",
            transition: "opacity 0.18s var(--ease)",
            zIndex: 20,
          }}
        >
          {popover}
        </div>

        <style>{`
          .f8-output-card:hover {
            border-color: var(--copper-200);
            background: rgba(184,110,61,0.10);
          }
          .f8-output-card:hover .f8-output-popover {
            opacity: 1;
          }
        `}</style>
      </div>
    </Reveal>
  );
}
