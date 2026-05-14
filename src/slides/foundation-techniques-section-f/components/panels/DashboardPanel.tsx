// DashboardPanel — F.8 monitor's default "Dashboard" tab (spec §4.1, §8.2).
//
// 2×2 grid of tiles: DigestTile · BriefTile · CalendarTile · ActivitySparkline.
// Each tile is fed its slice of f8Content.dashboard plus a `highlighted` flag
// derived from the panel's `highlighted` id list (see AgenticOSMonitor §8.1).
//
// Step 2 lights up ["digest","brief"]; step 3 lights up ["calendar","activity"].
// The pulse animation (ramp-in 200ms / hold 1100ms / ramp-out 200ms, spec
// §7.4) is implemented in CSS scoped to this panel; tiles themselves only
// expose `data-highlighted` and a transition on border/box-shadow.
import { DigestTile, type DigestItem } from "../tiles/DigestTile";
import { BriefTile, type BriefPriority } from "../tiles/BriefTile";
import { CalendarTile, type CalendarSlot } from "../tiles/CalendarTile";
import { ActivitySparkline } from "../tiles/ActivitySparkline";

export interface DashboardData {
  readonly digest: { readonly items: readonly DigestItem[] };
  readonly brief: {
    readonly headline: string;
    readonly priorities: readonly BriefPriority[];
  };
  readonly calendar: { readonly slots: readonly CalendarSlot[] };
  readonly activity: {
    readonly points: readonly number[];
    readonly total: number;
    readonly lastDay: number;
  };
}

export interface DashboardPanelProps {
  readonly dashboard: DashboardData;
  readonly highlighted?: readonly string[];
}

export function DashboardPanel({
  dashboard,
  highlighted,
}: DashboardPanelProps) {
  const hl = highlighted ?? [];
  return (
    <div
      data-testid="dashboard-panel"
      role="tabpanel"
      aria-label="Dashboard"
      className="f8-dashboard-panel"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr 1fr",
        gap: 16,
        padding: 12,
        width: "100%",
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      <DigestTile
        items={dashboard.digest.items}
        highlighted={hl.includes("digest")}
      />
      <BriefTile
        headline={dashboard.brief.headline}
        priorities={dashboard.brief.priorities}
        highlighted={hl.includes("brief")}
      />
      <CalendarTile
        slots={dashboard.calendar.slots}
        highlighted={hl.includes("calendar")}
      />
      <ActivitySparkline
        points={dashboard.activity.points}
        total={dashboard.activity.total}
        lastDay={dashboard.activity.lastDay}
        highlighted={hl.includes("activity")}
      />
      <style>{`
        .f8-dashboard-panel .f8-tile {
          transition: border-color 0.18s var(--ease), box-shadow 0.18s var(--ease);
        }
        .f8-dashboard-panel .f8-tile:hover {
          border-color: var(--copper-200);
          box-shadow: 0 0 0 1px var(--copper-200), 0 0 20px rgba(184,110,61,0.15);
        }
        .f8-dashboard-panel .f8-tile[data-highlighted="true"] {
          animation: f8-tile-pulse 1500ms var(--ease) both;
        }
        @keyframes f8-tile-pulse {
          0% {
            border-color: var(--copper-800);
            box-shadow: 0 0 0 0 rgba(184,110,61,0);
          }
          13.33% {
            border-color: var(--copper-200);
            box-shadow:
              0 0 0 1px var(--copper-200),
              0 0 24px rgba(184,110,61,0.25);
          }
          86.67% {
            border-color: var(--copper-200);
            box-shadow:
              0 0 0 1px var(--copper-200),
              0 0 24px rgba(184,110,61,0.25);
          }
          100% {
            border-color: var(--copper-200);
            box-shadow: 0 0 0 0 rgba(184,110,61,0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .f8-dashboard-panel .f8-tile[data-highlighted="true"] {
            animation: none;
            border-color: var(--copper-200);
          }
        }
      `}</style>
    </div>
  );
}
