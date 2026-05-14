// BriefTile — F.8 Dashboard "MORNING BRIEF" tile (spec §4.1, §7).
//
// Headline (mono 11px neutral-200) sits above 3 priority lines (italic serif
// 12px neutral-300 with a copper-300 leading ▸ bullet). Keywords inside each
// line are highlighted via highlight(). Pulses on step 2 alongside DigestTile.
import { highlight } from "../../../../components/highlight";
import { LucideIcon } from "../LucideIcon";

export interface BriefPriority {
  readonly text: string;
  readonly kw?: readonly string[];
}

export interface BriefTileProps {
  readonly headline: string;
  readonly priorities: readonly BriefPriority[];
  readonly highlighted?: boolean;
}

export function BriefTile({
  headline,
  priorities,
  highlighted = false,
}: BriefTileProps) {
  return (
    <div
      className="f8-tile f8-tile-brief"
      data-testid="tile-brief"
      data-highlighted={highlighted}
      style={{
        display: "flex",
        flexDirection: "column",
        background: "var(--neutral-900)",
        border: "1px solid var(--copper-800)",
        borderRadius: 4,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 12px",
          borderBottom: "1px solid var(--copper-800)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.18em",
            color: "var(--copper-200)",
            fontWeight: 500,
          }}
        >
          MORNING BRIEF
        </span>
        <LucideIcon name="Sparkles" size={14} color="var(--copper-300)" />
      </div>
      <div
        style={{
          padding: 12,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          flex: 1,
        }}
      >
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11,
            lineHeight: 1.45,
            color: "var(--neutral-200)",
          }}
        >
          {headline}
        </div>
        <ul
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {priorities.map((p, i) => (
            <li
              key={i}
              style={{
                fontFamily: "var(--serif)",
                fontStyle: "italic",
                fontSize: 12,
                lineHeight: 1.4,
                color: "var(--neutral-300)",
              }}
            >
              <span style={{ color: "var(--copper-300)", marginRight: 6 }}>
                ▸
              </span>
              {highlight(p.text, p.kw ?? [])}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
