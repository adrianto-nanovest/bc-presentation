import type { ReactNode } from "react";

// Marker primitive — explicit "this slide intentionally has no animation."
// Useful in the smoke-deck registry so the static intent is grep-able.
export function Static({ children }: { children: ReactNode }) {
  return <div data-testid="static">{children}</div>;
}
