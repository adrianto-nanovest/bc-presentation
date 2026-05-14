// DigestTile — F.8 Dashboard "DAILY DIGEST" tile (spec §4.1, §7).
//
// 5 bullet rows of mono 11px: "HH:MM · <label>". Time renders in copper-300,
// label renders via highlight() with copper-300 keyword spans. The tile
// flashes a copper-200 glow when its id ("digest") appears in `highlighted`
// (step 2 pulse per spec §5 + §7.4).
import { highlight } from "../../../../components/highlight";
import { LucideIcon } from "../LucideIcon";

export interface DigestItem {
  readonly time: string;
  readonly label: string;
  readonly kw?: readonly string[];
}

export interface DigestTileProps {
  readonly items: readonly DigestItem[];
  readonly highlighted?: boolean;
}

export function DigestTile({ items, highlighted = false }: DigestTileProps) {
  return (
    <div
      className="f8-tile f8-tile-digest"
      data-testid="tile-digest"
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
          DAILY DIGEST
        </span>
        <LucideIcon name="Inbox" size={14} color="var(--copper-300)" />
      </div>
      <ul
        style={{
          listStyle: "none",
          margin: 0,
          padding: 12,
          display: "flex",
          flexDirection: "column",
          gap: 6,
          flex: 1,
        }}
      >
        {items.map((it, i) => (
          <li
            key={`${it.time}-${i}`}
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11,
              lineHeight: 1.45,
              color: "var(--neutral-200)",
            }}
          >
            <span style={{ color: "var(--copper-300)" }}>{it.time}</span>
            <span style={{ color: "var(--neutral-500)" }}> · </span>
            {highlight(it.label, it.kw ?? [])}
          </li>
        ))}
      </ul>
    </div>
  );
}
