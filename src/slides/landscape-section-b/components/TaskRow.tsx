// TaskRow — task label + chip list. Used on B.3's right-side grid.
//
// Receives an `on` flag to drive fade-in (steps 4 of B.3) and an optional
// `delay` so the parent can stagger 5 rows at 100ms increments.
import type { CSSProperties, ReactNode } from "react";

export interface TaskRowProps {
  task: string;
  /** Pre-built chips (typically ModelChip elements). */
  children: ReactNode;
  /** Drives fade-in animation. */
  on: boolean;
  /** Optional stagger delay in ms. */
  delay?: number;
}

export function TaskRow({ task, children, on, delay = 0 }: TaskRowProps) {
  const style: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 18,
    padding: "10px 0",
    opacity: on ? 1 : 0,
    transform: on ? "translateY(0)" : "translateY(8px)",
    transition: "opacity 420ms var(--ease), transform 420ms var(--ease)",
    transitionDelay: on ? `${delay}ms` : "0ms",
    willChange: "opacity, transform",
  };
  return (
    <div data-testid="task-row" data-on={on ? "1" : "0"} style={style}>
      <span
        style={{
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: "0.24em",
          color: "var(--copper-300)",
          textTransform: "uppercase",
          minWidth: 110,
          flexShrink: 0,
        }}
      >
        {task}
      </span>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          alignItems: "center",
        }}
      >
        {children}
      </div>
    </div>
  );
}
