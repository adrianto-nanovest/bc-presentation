// Compact card used in the LEFT vertical list on slide D.2.
//
// Hovering writes a hover key via the `onHover` callback (lifted to the
// slide). The hover state drives both the right-side detail panel (step 0)
// AND the matching satellite/arrow highlight in the network illustration
// (step 1+).
//
// Ported from `claude-design-section-d/jsx/slides-d.jsx:274-311`.
import type { CSSProperties } from "react";
import { highlight as KW } from "../../../components/highlight";
import { LucideIcon } from "../../foundation-core-section-e/components/LucideIcon";
import type { D2Card, D2CardKey } from "../content";

export type D2HoverKey = D2CardKey | null;
export type D2HoverSetter = (
  next: D2HoverKey | ((prev: D2HoverKey) => D2HoverKey),
) => void;

export interface D2ListCardProps {
  data: D2Card;
  hovered: D2HoverKey;
  onHover: D2HoverSetter;
  /** Stagger reveal delay (ms). */
  delay?: number;
}

// Design source uses lowercase icon names ("workflow", "bot"...). Our
// LucideIcon registry is keyed by lucide-react PascalCase exports, so we
// normalize at the consumer site. Single-word names: just capitalize.
function toPascal(name: string): string {
  if (!name) return name;
  return name
    .split(/[-_ ]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

export function D2ListCard({
  data,
  hovered,
  onHover,
  delay = 0,
}: D2ListCardProps) {
  const isHover = hovered === data.key;
  const accent = `var(--${data.copper})`;

  const cardStyle: CSSProperties = {
    flex: 1,
    minHeight: 0,
    display: "flex",
    alignItems: "center",
    gap: 14,
    padding: "10px 14px",
    border: `1px solid ${isHover ? "var(--copper-200)" : accent}`,
    background: isHover ? "rgba(184,110,61,0.10)" : "rgba(10,10,10,0.6)",
    boxShadow: isHover
      ? `0 0 0 1px ${accent} inset, 0 0 24px -10px ${accent}`
      : "none",
    transition: "all 0.2s var(--ease)",
    cursor: "default",
    animation: `fadeReveal 0.5s var(--ease) ${delay}ms both`,
  };

  return (
    <div
      data-testid="d2-list-card"
      data-key={data.key}
      data-hovered={isHover ? "true" : "false"}
      onMouseEnter={() => onHover(data.key)}
      onMouseLeave={() =>
        onHover((h) => (h === data.key ? null : h))
      }
      style={cardStyle}
    >
      <div
        style={{
          flex: "0 0 28px",
          width: 28,
          height: 28,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          color: isHover ? "var(--copper-100)" : "var(--copper-300)",
        }}
      >
        <LucideIcon name={toPascal(data.icon)} size={22} color="currentColor" />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: 8,
          }}
        >
          <span
            style={{
              fontFamily: "var(--display)",
              fontSize: 22,
              color: "var(--neutral-50)",
              lineHeight: 1,
            }}
          >
            {data.title}
          </span>
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 9,
              letterSpacing: "0.16em",
              color: "var(--copper-400)",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {data.subName}
          </span>
        </div>
        <span
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 13,
            color: "var(--copper-200)",
            lineHeight: 1.3,
          }}
        >
          {KW(data.tagline, data.taglineKw)}
        </span>
      </div>
    </div>
  );
}
