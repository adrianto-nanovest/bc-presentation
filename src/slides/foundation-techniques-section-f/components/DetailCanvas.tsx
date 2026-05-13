// DetailCanvas — Section F right-side detail pane.
//
// CSS opacity crossfade (700ms via var(--ease)) between states based on
// `activeFacet`. When `defaultState` is omitted (Section F canonical hover-only
// pattern), no facet hover renders nothing inside the canvas. When
// `defaultState` is provided, it shows when no facet is hovered or when the
// hovered facet has no matching state.
//
// All layers are stacked absolutely inside the canvas so the crossfade truly
// happens in-place (no layout reflow). Inactive layers receive
// `pointerEvents: 'none'` so hover doesn't get trapped on stale state.
//
// Reveal animation (Item 19, deck-wide consistency):
//   Each time a state becomes active, an inner wrapper keyed on `activeFacet`
//   re-mounts so the `.f-state-reveal` keyframe (0.2s var(--ease) on opacity
//   + transform translateY -8px → 0) plays exactly once per hover. The outer
//   700ms opacity crossfade between layers stays unchanged.
//
// Mirrors spec §3.2 (`<DetailCanvas activeFacet, defaultState, states>`) and
// §3.3 motion-timing reference (700ms crossfade).
import type { ReactNode } from "react";

export interface DetailCanvasProps {
  /** Active facet id (matches a key in `states`) or null for empty/default. */
  activeFacet: string | null;
  /**
   * Optional default illustration — shown when activeFacet is null or
   * unmatched. When omitted, the canvas renders nothing for those states
   * (canonical F.2–F.7 hover-only pattern).
   */
  defaultState?: ReactNode;
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
  // facet has no corresponding state child. Only mounted when a defaultState
  // node was provided.
  const defaultActive = !hasMatch;
  const hasDefault = defaultState !== undefined && defaultState !== null;

  return (
    <div
      data-testid="f-detail-canvas"
      style={{
        position: "absolute",
        inset: 0,
      }}
    >
      {hasDefault ? (
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
      ) : null}

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
            {/* Inner reveal wrapper — `key` flips between `active` and
                `idle-<id>` so the .f-state-reveal entry animation replays
                exactly once per fresh hover (mount of the keyed `active`
                node). Children (`node`) stay mounted across hovers via
                React's reconciliation on the inner ReactNode. */}
            <div
              key={isActive ? "active" : `idle-${id}`}
              className={isActive ? "f-state-reveal" : undefined}
              style={{ position: "absolute", inset: 0 }}
            >
              {node}
            </div>
          </div>
        );
      })}
    </div>
  );
}
