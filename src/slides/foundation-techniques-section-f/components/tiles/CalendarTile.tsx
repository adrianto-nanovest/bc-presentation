// CalendarTile — F.8 Dashboard "CALENDAR" tile (spec §4.1, §7).
//
// 4 timeslot rows: mono 11px time + italic serif 11px label. The final slot
// carries `conflict: true` and gets a trailing copper-300 "⚠" glyph. Pulses
// on step 3 with `activity`.
import { highlight } from "../../../../components/highlight";
import { LucideIcon } from "../LucideIcon";

export interface CalendarSlot {
  readonly time: string;
  readonly label: string;
  readonly conflict?: boolean;
  readonly kw?: readonly string[];
}

export interface CalendarTileProps {
  readonly slots: readonly CalendarSlot[];
  readonly highlighted?: boolean;
}

export function CalendarTile({
  slots,
  highlighted = false,
}: CalendarTileProps) {
  return (
    <div
      className="f8-tile f8-tile-calendar"
      data-testid="tile-calendar"
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
          CALENDAR
        </span>
        <LucideIcon name="Calendar" size={14} color="var(--copper-300)" />
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
        {slots.map((s, i) => (
          <li
            key={`${s.time}-${i}`}
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 8,
              lineHeight: 1.4,
            }}
          >
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: 11,
                color: "var(--copper-300)",
                minWidth: 40,
              }}
            >
              {s.time}
            </span>
            <span
              style={{
                fontFamily: "var(--serif)",
                fontStyle: "italic",
                fontSize: 11,
                color: "var(--neutral-200)",
                flex: 1,
              }}
            >
              {highlight(s.label, s.kw ?? [])}
            </span>
            {s.conflict ? (
              <span
                aria-label="conflict"
                style={{
                  color: "var(--copper-300)",
                  fontSize: 11,
                }}
              >
                ⚠
              </span>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
