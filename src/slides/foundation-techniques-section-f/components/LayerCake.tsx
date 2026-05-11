// LayerCake — Section F's agentic-OS stack illustration.
//
// Reference: docs/examples/agentic-os-illustration.png. Horizontal bars are
// stacked bottom-up (CLAUDE.md is the foundation, AGENTS sits on top). Lit
// layers glow copper; dim/non-lit layers read as muted neutral so progressive
// reveal (F.4 → F.7) feels like the cake is "lighting up" one tier at a time.
//
// Modes:
//   compact   stacked tight, 2px gap (F.1 dim, F.3 with ribbon, F.4–F.7)
//   exploded  spread out (12px gap) with per-layer pointers (e.g., "F.4 →")
//
// `ribbon: true` wraps the cake in a copper-tinted frame with a "PLUGIN" badge
// across the top — purely decorative, no layout-impact on the layers.
//
// `animateAssembly` cascades layers in bottom-up via staggered keyframes; the
// keyframe `cake-rise` is injected inline (one <style> tag, namespaced ID) so
// the component is self-contained — no globals.css edits required.
import type { CSSProperties } from "react";

export type LayerCakeMode = "compact" | "exploded";

export interface LayerCakeProps {
  /** Ordered bottom-up. Default: ["CLAUDE.md", "HOOKS", "SKILLS", "AGENTS"]. */
  layers?: string[];
  /** Render the copper PLUGIN ribbon frame around the cake. */
  ribbon?: boolean;
  /** Layer names to highlight in copper (case-sensitive match). */
  lit?: string[];
  /** "compact" (default) or "exploded". */
  mode?: LayerCakeMode;
  /** Cascade layers bottom-up on mount. */
  animateAssembly?: boolean;
  /** F.1 preview state — drop opacity, neutral palette. */
  dim?: boolean;
  /** Exploded-mode pointers (layer name → label, e.g., "F.4"). */
  pointers?: Record<string, string>;
  /** Override outer dimensions. */
  size?: { width?: number; height?: number };
}

const DEFAULT_LAYERS = ["CLAUDE.md", "HOOKS", "SKILLS", "AGENTS"];

// Single shared keyframe block — injected once. Component-local class name
// `f-cake-rise` namespaces it so it never collides with global rules.
const ASSEMBLY_STYLE = `
@keyframes f-cake-rise {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
.f-cake-layer--rise {
  opacity: 0;
  animation: f-cake-rise 250ms var(--ease) forwards;
}
`;

export function LayerCake({
  layers = DEFAULT_LAYERS,
  ribbon = false,
  lit = [],
  mode = "compact",
  animateAssembly = false,
  dim = false,
  pointers,
  size,
}: LayerCakeProps) {
  // Layer geometry. `layers` is bottom-up; render top-down via .slice().reverse()
  // so the visual stack matches the conceptual stack (CLAUDE.md at bottom).
  const barWidth = size?.width ?? 340;
  const barHeight = 36;
  const gap = mode === "exploded" ? 12 : 2;

  // i=0 in the array = bottom-most layer. Assembly animation delays are keyed
  // off the source index (bottom layer animates first).
  const rendered = layers.map((name, i) => {
    const isLit = lit.includes(name) && !dim;
    const delay = animateAssembly ? 250 * i : 0;
    return { name, i, isLit, delay };
  });

  // Display order: top of array (last layer) painted first so it sits on top.
  const displayOrder = [...rendered].reverse();

  const wrapperStyle: CSSProperties = {
    position: "relative",
    display: "inline-flex",
    flexDirection: "column",
    gap,
    padding: ribbon ? "32px 28px 22px" : 0,
    border: ribbon
      ? `1px solid ${dim ? "var(--neutral-500)" : "var(--copper-700)"}`
      : undefined,
    borderRadius: ribbon ? 6 : 0,
    background: ribbon ? "rgba(122,70,38,0.04)" : undefined,
    opacity: dim ? 0.4 : 1,
    width: ribbon ? barWidth + 56 : barWidth,
    boxSizing: "content-box",
    minHeight: size?.height,
  };

  return (
    <div data-testid="layer-cake" data-mode={mode} style={wrapperStyle}>
      {/* Keyframes — injected once per instance; cheap & isolated. */}
      {animateAssembly && <style>{ASSEMBLY_STYLE}</style>}

      {ribbon && <PluginBadge dim={dim} />}

      {displayOrder.map(({ name, isLit, delay }) => (
        <LayerBar
          key={name}
          name={name}
          width={barWidth}
          height={barHeight}
          lit={isLit}
          dim={dim}
          animate={animateAssembly}
          delay={delay}
          mode={mode}
          pointer={pointers?.[name]}
        />
      ))}
    </div>
  );
}

// ─────────────────────────── Sub-components ───────────────────────────

interface LayerBarProps {
  name: string;
  width: number;
  height: number;
  lit: boolean;
  dim: boolean;
  animate: boolean;
  delay: number;
  mode: LayerCakeMode;
  pointer?: string;
}
function LayerBar({
  name,
  width,
  height,
  lit,
  dim,
  animate,
  delay,
  mode,
  pointer,
}: LayerBarProps) {
  // Palette: lit layers glow copper; non-lit layers read muted. Dim mode
  // forces neutral throughout (F.1 preview).
  const bg = lit
    ? "var(--copper-700)"
    : dim
    ? "transparent"
    : "transparent";
  const border = lit
    ? "var(--copper-400)"
    : dim
    ? "var(--neutral-500)"
    : "var(--neutral-700)";
  const color = lit
    ? "var(--copper-100)"
    : dim
    ? "var(--neutral-500)"
    : "var(--neutral-300)";

  const barStyle: CSSProperties = {
    width,
    height,
    background: bg,
    border: `1px solid ${border}`,
    color,
    fontFamily: "var(--mono)",
    fontSize: 13,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    transition: "background 220ms var(--ease), color 220ms var(--ease), border-color 220ms var(--ease)",
    animationDelay: animate ? `${delay}ms` : undefined,
  };

  const bar = (
    <div
      data-testid={`layer-bar-${name}`}
      data-lit={lit ? "1" : "0"}
      className={animate ? "f-cake-layer--rise" : undefined}
      style={barStyle}
    >
      {name}
    </div>
  );

  // Exploded mode: pair each bar with an arrow + label to its right.
  if (mode === "exploded") {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          // Pointer label shouldn't shift the cake's left edge — keep bar
          // left-aligned and let the label overflow to the right.
        }}
      >
        {bar}
        {pointer && (
          <span
            aria-hidden="false"
            style={{
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontSize: 14,
              color: dim ? "var(--neutral-500)" : "var(--copper-200)",
              whiteSpace: "nowrap",
              // Hand-rolled arrow glyph keeps it visually consistent with rest
              // of the deck (no SVG required for this tiny pointer).
              opacity: 0.95,
            }}
          >
            <span
              style={{
                display: "inline-block",
                marginRight: 6,
                color: dim ? "var(--neutral-500)" : "var(--copper-400)",
              }}
            >
              →
            </span>
            {pointer}
          </span>
        )}
      </div>
    );
  }

  return bar;
}

// PLUGIN ribbon badge — anchored to the top edge of the ribbon frame.
interface PluginBadgeProps {
  dim: boolean;
}
function PluginBadge({ dim }: PluginBadgeProps) {
  const style: CSSProperties = {
    position: "absolute",
    top: -10,
    left: 24,
    padding: "2px 10px",
    background: dim ? "var(--neutral-700)" : "var(--copper-200)",
    color: dim ? "var(--neutral-300)" : "var(--copper-900)",
    fontFamily: "var(--mono)",
    fontSize: 10,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    border: `1px solid ${dim ? "var(--neutral-500)" : "var(--copper-700)"}`,
    borderRadius: 2,
    lineHeight: 1.4,
  };
  return (
    <span data-testid="plugin-badge" style={style}>
      Plugin
    </span>
  );
}
