// DetailCanvas — Section F right-side detail pane (660px wide).
//
// CSS opacity crossfade (700ms via var(--ease)) between states based on
// `activeFacet`. Default state shows when no facet is hovered OR when the
// active facet has no matching state in `states`. All layers are stacked
// absolutely inside the canvas so the crossfade truly happens in-place
// (no layout reflow).
//
// Inactive layers receive `pointerEvents: 'none'` so hover doesn't get
// trapped on stale state when the user mouses over the canvas itself.
//
// Mirrors spec §3.2 (`<DetailCanvas activeFacet, defaultState, states>`) and
// §3.3 motion-timing reference (700ms crossfade).
import type { ReactNode } from "react";

export interface DetailCanvasProps {
  /** Active facet id (matches a key in `states`) or null for the default state. */
  activeFacet: string | null;
  /** Default illustration — shown when activeFacet is null or unmatched. */
  defaultState: ReactNode;
  /** Map of facet id → state illustration. */
  states: Record<string, ReactNode>;
}

export function DetailCanvas({
  activeFacet,
  defaultState,
  states,
}: DetailCanvasProps) {
  const hasMatch = activeFacet != null && activeFacet in states;
  // Default layer is visible when no facet is hovered OR when the hovered
  // facet has no corresponding state child.
  const defaultActive = !hasMatch;

  return (
    <div
      data-testid="f-detail-canvas"
      style={{
        position: "absolute",
        inset: 0,
      }}
    >
      <div
        data-testid="f-detail-state-default"
        data-active={defaultActive ? "true" : "false"}
        style={{
          position: "absolute",
          inset: 0,
          opacity: defaultActive ? 1 : 0,
          transition: "opacity 700ms var(--ease)",
          pointerEvents: defaultActive ? "auto" : "none",
        }}
      >
        {defaultState}
      </div>

      {Object.entries(states).map(([id, node]) => {
        const isActive = activeFacet === id;
        return (
          <div
            key={id}
            data-testid={`f-detail-state-${id}`}
            data-active={isActive ? "true" : "false"}
            style={{
              position: "absolute",
              inset: 0,
              opacity: isActive ? 1 : 0,
              transition: "opacity 700ms var(--ease)",
              pointerEvents: isActive ? "auto" : "none",
            }}
          >
            {node}
          </div>
        );
      })}
    </div>
  );
}
