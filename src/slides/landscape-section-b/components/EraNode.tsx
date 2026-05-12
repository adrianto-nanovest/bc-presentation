// EraNode — circle marker on B.1's timeline. Renders the circle ONLY; the
// adjacent label box (era label + year + caption) is positioned separately
// by the slide so it can flip above/below the rail per era.
//
// Visual states:
//   active     — stage 5 ("WE ARE HERE") — brighter stroke + copper glow halo.
//   highlighted— hover/active highlight ring (copper-200 + soft glow).
//   dimmed     — pre-reveal / AGI variant. Lowered opacity. AGI keeps a dashed
//                border + reduced fill to honestly signal "not yet".
//   on         — reveal gate. Off = opacity 0 + slight translateY for entry.
//   isAgi      — marks the dashed-border, dimmed-fill AGI variant.
import type { CSSProperties, MouseEventHandler, ReactNode } from "react";

export interface EraNodeProps {
  glyph: ReactNode;
  /** When true: this era is currently the WE ARE HERE stage. */
  active?: boolean;
  /** When true: hover/active highlight ring. Layers on top of all variants. */
  highlighted?: boolean;
  /** When true: dim styling (opacity 0.22) — used both pre-reveal and for AGI. */
  dimmed?: boolean;
  /** When true: AGI variant — dashed border + reduced fill. */
  isAgi?: boolean;
  /** Reveal gate — fade + slight rise when true. */
  on?: boolean;
  /** Optional stagger delay (ms). */
  delay?: number;
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: MouseEventHandler<HTMLDivElement>;
}

const NODE_DIAMETER = 68;

export function EraNode({
  glyph,
  active = false,
  highlighted = false,
  dimmed = false,
  isAgi = false,
  on = true,
  delay = 0,
  onMouseEnter,
  onMouseLeave,
}: EraNodeProps) {
  // Base stroke. Highlight overrides everything when on.
  const strokeColor = highlighted
    ? "var(--copper-200)"
    : active
      ? "var(--copper-200)"
      : isAgi
        ? "var(--copper-700)"
        : "var(--copper-400)";
  const borderStyle = isAgi ? "dashed" : "solid";
  const glyphColor = highlighted
    ? "var(--copper-200)"
    : active
      ? "var(--copper-200)"
      : isAgi
        ? "var(--copper-700)"
        : "var(--copper-300)";

  // Halo: WE ARE HERE marker pulses outward; hover adds a softer ring; AGI
  // dimmed gets a reduced fill so it reads as "not yet".
  const baseShadow =
    highlighted || active
      ? "0 0 0 1px var(--copper-200), 0 0 18px -4px var(--copper-400)"
      : "none";

  const containerStyle: CSSProperties = {
    position: "relative",
    width: NODE_DIAMETER,
    height: NODE_DIAMETER,
    borderRadius: 999,
    border: `${isAgi ? "1.5px" : "1.25px"} ${borderStyle} ${strokeColor}`,
    background: isAgi ? "rgba(10,10,10,0.45)" : "rgba(10,10,10,0.85)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: glyphColor,
    boxShadow: baseShadow,
    opacity: on ? (dimmed ? 0.22 : 1) : 0,
    transform: on ? "translateY(0)" : "translateY(6px)",
    transition:
      "opacity 500ms var(--ease), transform 500ms var(--ease), box-shadow 320ms var(--ease), border-color 320ms var(--ease), color 320ms var(--ease)",
    transitionDelay: on ? `${delay}ms` : "0ms",
    willChange: "opacity, transform",
    cursor: onMouseEnter ? "default" : undefined,
  };

  return (
    <div
      data-testid="era-node"
      data-active={active ? "1" : "0"}
      data-dimmed={dimmed ? "1" : "0"}
      data-highlighted={highlighted ? "1" : "0"}
      data-on={on ? "1" : "0"}
      style={containerStyle}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {glyph}
    </div>
  );
}

export const ERA_NODE_DIAMETER = NODE_DIAMETER;
