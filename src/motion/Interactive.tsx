import { type ReactNode, type MouseEvent } from "react";

// Spec §5.2 — opt-in mouse interaction. Stops click propagation so an
// interactive component embedded inside an otherwise-quiet slide doesn't
// bubble into a Slide-level click handler.
export function Interactive({ children }: { children: ReactNode }) {
  const stop = (e: MouseEvent) => e.stopPropagation();
  return (
    <div data-testid="interactive" onClick={stop} onMouseDown={stop}>
      {children}
    </div>
  );
}
