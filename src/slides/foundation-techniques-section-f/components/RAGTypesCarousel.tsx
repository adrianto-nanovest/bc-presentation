// RAGTypesCarousel — F.2 "THE TYPES" facet hover state.
//
// Spec §3.2 (`<RAGTypesCarousel activeType>`) + §5.5 ("THE TYPES" canvas):
// wraps `<BridgeArtifact mode>` and cycles vector → graph → file → hybrid,
// using BridgeArtifact's built-in 700ms opacity crossfade between platter
// variants. A small strip below the artifact echoes the 4 type names in
// mono uppercase — the currently-active type lights up copper-200 with a
// copper underline; others are neutral-500. Hovering a type name on the
// strip overrides the auto-cycle and locks BridgeArtifact to that type.
//
// Props:
//   - `activeType`  — when provided (typically driven by the parent
//                     DetailCanvas facet hover), locks to that type and
//                     disables the internal cycle.
//   - `autoCycle`   — when true and `activeType` is null AND the strip is
//                     not hovered, internal state cycles every ~2500ms.
//
// Hover priority (highest first):
//   1. Strip hover (`stripHover`)  — local lock
//   2. `activeType` prop           — parent lock
//   3. Internal cycle              — when `autoCycle`
//   4. Fallback static default     — file mode
import { useEffect, useState } from "react";
import { BridgeArtifact } from "./BridgeArtifact";

type RagType = "vector" | "graph" | "file" | "hybrid";

const TYPES: readonly RagType[] = ["vector", "graph", "file", "hybrid"];
const CYCLE_MS = 2500;

export interface RAGTypesCarouselProps {
  /** Parent-driven lock. When non-null, the carousel renders that type. */
  activeType?: RagType | null;
  /** When true (and no `activeType` override / strip hover), cycle every 2.5s. */
  autoCycle?: boolean;
}

export function RAGTypesCarousel({
  activeType = null,
  autoCycle = false,
}: RAGTypesCarouselProps) {
  // Internal cycle index — only consumed when no override is active.
  const [cycleIndex, setCycleIndex] = useState(0);
  // Strip hover state — local override that beats the cycle but is itself
  // beaten by an explicit `activeType` prop.
  const [stripHover, setStripHover] = useState<RagType | null>(null);

  useEffect(() => {
    if (!autoCycle) return;
    if (activeType != null) return;
    if (stripHover != null) return;
    const id = window.setInterval(() => {
      setCycleIndex((i) => (i + 1) % TYPES.length);
    }, CYCLE_MS);
    return () => window.clearInterval(id);
  }, [autoCycle, activeType, stripHover]);

  // Resolve which type to display, following hover priority above.
  const display: RagType =
    activeType ?? stripHover ?? (autoCycle ? TYPES[cycleIndex] : "file");

  return (
    <div
      data-testid="rag-types-carousel"
      data-display-type={display}
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
      }}
    >
      <BridgeArtifact mode={display} size={560} />

      {/* Mini-label echoing the active type. */}
      <div
        data-testid="rag-types-active-label"
        style={{
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: "0.28em",
          color: "var(--copper-200)",
          textTransform: "uppercase",
        }}
      >
        {display}
      </div>

      {/* Strip — 4 type names in mono uppercase, copper underline on active. */}
      <div
        data-testid="rag-types-strip"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 28,
          paddingTop: 4,
        }}
      >
        {TYPES.map((t) => {
          const isActive = display === t;
          return (
            <button
              key={t}
              type="button"
              data-testid={`rag-types-strip-${t}`}
              data-active={isActive ? "true" : "false"}
              onMouseEnter={() => setStripHover(t)}
              onMouseLeave={() => setStripHover(null)}
              onFocus={() => setStripHover(t)}
              onBlur={() => setStripHover(null)}
              style={{
                background: "transparent",
                border: "none",
                padding: "4px 2px",
                cursor: "pointer",
                fontFamily: "var(--mono)",
                fontSize: 11,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: isActive ? "var(--copper-200)" : "var(--neutral-500)",
                borderBottom: `1px solid ${
                  isActive ? "var(--copper-300)" : "transparent"
                }`,
                transition:
                  "color 0.25s var(--ease), border-color 0.25s var(--ease)",
              }}
            >
              {t}
            </button>
          );
        })}
      </div>
    </div>
  );
}
