// QuestionRow — Source Serif 4 italic question line + a hover-pointer chip.
// The 4 questions on A.1 each render through this.
//
// Hover → small "→ Section X" chip slides in (CSS-only, 150ms). Mouse-leave
// → slides back out. Cursor stays default (this is a presenter detail
// layer, not interactive content for the audience).
//
// `children` is a pre-highlighted ReactNode (typically `highlight(text, kw)`)
// — A.1's italic copper-400 keywords are applied at the call site so the
// row stays text-agnostic.
import { useState, type ReactNode } from "react";
import { SectionPointerHover } from "./SectionPointerHover";

export interface QuestionRowProps {
  /** Pre-highlighted children, typically `highlight(text, kw)`. */
  children: ReactNode;
  /** Pointer chip, e.g. "→ Section F". */
  pointer: string;
}

export function QuestionRow({ children, pointer }: QuestionRowProps) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      data-testid="question-row"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 0,
        padding: "10px 0",
        cursor: "default",
      }}
    >
      <p
        style={{
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontSize: 28,
          fontWeight: 400,
          color: "var(--neutral-200)",
          margin: 0,
          lineHeight: 1.35,
        }}
      >
        {children}
      </p>
      <SectionPointerHover text={pointer} visible={hovered} />
    </div>
  );
}
