// AgenticOSStack — F.8 enriched 9-layer coronation stack (spec §11.4).
//
// Vertical stack rendered bottom-to-top — CLAUDE.md is the foundation
// (drawn last in DOM order so it sits at the visual bottom). Each layer
// is a ~320×44 horizontal bar with:
//   • mono uppercase name (centered-left, fontSize 13, copper-100)
//   • italic serif caption on the right side (e.g. "the foundation")
//   • a CSS-only hover popover anchored to the RIGHT of the bar
//     (the stack lives on the LEFT half of F.8's stage so popovers
//     naturally extend toward the center)
//
// Reveal: `activeStep` is the highest layer index to reveal (0 = base
// only / CLAUDE.md, 8 = all nine layers). Each layer animates with
// translateY(20px) → translateY(0) + opacity 0 → 1 across 250ms with
// `var(--ease)`, matching the deck-wide motion-timing reference and the
// LayerCake assembly stagger (spec §3.3).
//
// Per spec §11.4, CLAUDE.md (the foundation) is always lit — even when
// only one layer is visible. The optional `lit` prop adds additional
// layers to the lit set.
import type { CSSProperties } from "react";

export interface StackLayer {
  id: string;
  /** Mono uppercase name — e.g. "CLAUDE.md", "TOOLS (MCP)". */
  name: string;
  /** Italic serif caption — e.g. "the foundation". */
  caption: string;
  /** Hover popover copy — full sentence (~1-2 lines). */
  popover: string;
}

export interface AgenticOSStackProps {
  /** Ordered bottom-to-top — index 0 = CLAUDE.md (the foundation). */
  layers: readonly StackLayer[];
  /**
   * Highest layer index to reveal.
   *   -1 → none visible
   *    0 → CLAUDE.md only
   *    8 → all nine visible
   */
  activeStep: number;
  /** Optional emphasis — layer ids to render in the "lit" copper-fill style.
   *  CLAUDE.md (id "claude-md") is always lit regardless. */
  lit?: readonly string[];
  /** Optional positioning style override. */
  style?: CSSProperties;
}

// Bar geometry. ~320×44 per spec.
const BAR_WIDTH = 340;
const BAR_HEIGHT = 44;
const BAR_GAP = 6;

export function AgenticOSStack({
  layers,
  activeStep,
  lit,
  style,
}: AgenticOSStackProps) {
  // CLAUDE.md ("claude-md") is always lit per spec §11.4.
  const litSet = new Set<string>(lit ?? []);
  litSet.add("claude-md");

  // Render top → bottom in DOM order so flex column stacks visually
  // with bottom=foundation. Index 0 in `layers` is the foundation; we
  // reverse for rendering only.
  const renderOrder = [...layers].slice().reverse();

  return (
    <div
      data-testid="agentic-os-stack"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: BAR_GAP,
        alignItems: "flex-start",
        width: BAR_WIDTH,
        ...style,
      }}
    >
      {renderOrder.map((layer) => {
        // Index in original bottom-up order — the layer's "level" (0 = base).
        const originalIndex = layers.findIndex((l) => l.id === layer.id);
        const visible = originalIndex <= activeStep;
        const isLit = litSet.has(layer.id);

        return (
          <div
            key={layer.id}
            data-testid={`stack-layer-${layer.id}`}
            data-active={visible ? "true" : "false"}
            data-lit={isLit ? "true" : "false"}
            className="f8-stack-layer"
            style={{
              position: "relative",
              width: BAR_WIDTH,
              height: BAR_HEIGHT,
              display: "flex",
              alignItems: "center",
              padding: "0 16px",
              gap: 12,
              border: "1px solid",
              borderColor: isLit
                ? "var(--copper-200)"
                : "var(--copper-800)",
              background: isLit
                ? "rgba(184,110,61,0.16)"
                : "var(--neutral-900)",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition:
                "opacity 250ms var(--ease), transform 250ms var(--ease), border-color 0.2s var(--ease), background 0.2s var(--ease)",
              cursor: visible ? "default" : "default",
              pointerEvents: visible ? "auto" : "none",
            }}
          >
            {/* Layer name */}
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: 13,
                letterSpacing: "0.18em",
                color: isLit ? "var(--copper-100)" : "var(--copper-200)",
                textTransform: "uppercase",
                fontWeight: 500,
                whiteSpace: "nowrap",
              }}
            >
              {layer.name}
            </span>
            {/* Spacer pushes caption to the right */}
            <span style={{ flex: 1 }} />
            {/* Caption */}
            <span
              style={{
                fontFamily: "var(--serif)",
                fontStyle: "italic",
                fontSize: 12.5,
                color: "var(--copper-300)",
                whiteSpace: "nowrap",
              }}
            >
              {layer.caption}
            </span>

            {/* Right-anchored CSS-only hover popover */}
            <div
              className="f8-stack-popover"
              role="tooltip"
              style={{
                position: "absolute",
                top: "50%",
                left: "calc(100% + 12px)",
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
              {layer.popover}
            </div>
          </div>
        );
      })}

      {/* Hover popover trigger — scoped via class for CSS-only behavior */}
      <style>{`
        .f8-stack-layer:hover {
          border-color: var(--copper-200) !important;
          background: rgba(184,110,61,0.20) !important;
        }
        .f8-stack-layer:hover .f8-stack-popover {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
