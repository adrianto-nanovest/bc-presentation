// ActivitySparkline — F.8 Dashboard "ACTIVITY · 14 DAYS" tile (spec §4.1,
// §7.3). 14-point area chart rendered as a 100×40 SVG with a copper gradient
// fill (rgba 0.35 → 0) under a 1.2px copper-200 polyline. Top-right corner
// shows "319 total · 68 last day" in mono 10px copper-300. Pulses on step 3
// with `calendar`.
//
// Coordinate map (spec §7.3):
//   x = i * (100 / (n - 1))
//   y = 40 - ((v - min) / (max - min)) * 36
import { useId } from "react";
import { LucideIcon } from "../LucideIcon";

export interface ActivitySparklineProps {
  readonly points: readonly number[];
  readonly total: number;
  readonly lastDay: number;
  readonly highlighted?: boolean;
}

export function ActivitySparkline({
  points,
  total,
  lastDay,
  highlighted = false,
}: ActivitySparklineProps) {
  const gradId = useId().replace(/[:]/g, "");
  const n = points.length;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const span = max - min || 1;
  const coords = points.map((v, i) => {
    const x = i * (100 / (n - 1));
    const y = 40 - ((v - min) / span) * 36;
    return [x, y] as const;
  });
  const polyline = coords.map(([x, y]) => `${x},${y}`).join(" ");
  const areaPath =
    `M ${coords[0][0]},40 ` +
    coords.map(([x, y]) => `L ${x},${y}`).join(" ") +
    ` L ${coords[n - 1][0]},40 Z`;

  return (
    <div
      className="f8-tile f8-tile-activity"
      data-testid="tile-activity"
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
          gap: 8,
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
          ACTIVITY · 14 DAYS
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 10,
              color: "var(--copper-300)",
              letterSpacing: "0.12em",
            }}
          >
            {total} total · {lastDay} last day
          </span>
          <LucideIcon name="Activity" size={14} color="var(--copper-300)" />
        </div>
      </div>
      <div
        style={{
          padding: 12,
          flex: 1,
          minHeight: 0,
          overflow: "hidden",
          display: "flex",
        }}
      >
        <svg
          viewBox="0 0 100 40"
          preserveAspectRatio="none"
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            flex: 1,
            minHeight: 0,
          }}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={gradId} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="rgba(184,110,61,0.35)" />
              <stop offset="100%" stopColor="rgba(184,110,61,0)" />
            </linearGradient>
          </defs>
          <path d={areaPath} fill={`url(#${gradId})`} />
          <polyline
            points={polyline}
            fill="none"
            stroke="var(--copper-200)"
            strokeWidth={1.2}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
