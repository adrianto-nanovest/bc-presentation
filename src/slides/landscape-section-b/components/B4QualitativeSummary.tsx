// B4QualitativeSummary — 4×5 matrix of qualitative cells (BEST/GOOD/AVG/WEAK)
// for slide B.4 step 1. Replaces the legacy quantitative heatmap.
//
// Cells are pre-derived at content-time from `heatmap.scores` (see
// `content.ts → qualitativeSummary`). Render-time does NOT compute them.
//
// Entry animation:
//   1. Column header strip + row labels fade in first (80ms stagger).
//   2. Then cells cascade row-by-row, left→right (40ms per cell, 80ms per
//      row offset).
//
// Cell styling per spec:
//   BEST    — solid copper-300 background, neutral-950 text.
//   GOOD    — copper-700 background, neutral-100 text.
//   AVERAGE — neutral-800 background, neutral-200 text, copper-800 border.
//   WEAK    — transparent background, neutral-400 text, neutral-700 dotted.
import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { B4QualitativeCell, B4QualitativeSummary } from "../content";

export interface B4QualitativeSummaryProps {
  data: B4QualitativeSummary;
  /** Optional freshness stamp rendered as a right-aligned mono caption
   *  below the descriptor — replaces the deck-level footer freshness on B.4. */
  freshness?: string;
}

const ROW_LABEL_WIDTH = 138;
const ROW_HEIGHT = 38;
const ROW_GAP = 6;
const COL_GAP = 6;

const LABELS_STAGGER = 60;
const CELLS_BASE = 360;     // cells start after labels finish
const CELL_STEP_MS = 40;    // per-cell within a row
const ROW_STEP_MS = 80;     // per-row offset

export function B4QualitativeSummary({
  data,
  freshness,
}: B4QualitativeSummaryProps) {
  const [mounted, setMounted] = useState(false);
  const rafRef = useRef<number | null>(null);
  useEffect(() => {
    rafRef.current = window.requestAnimationFrame(() => setMounted(true));
    return () => {
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      data-testid="b4-qualitative-summary"
      style={{
        display: "flex",
        flexDirection: "column",
        // Center the matrix vertically within the right column's content
        // envelope so the table sits at the middle of the left card stack.
        justifyContent: "center",
        gap: 12,
        width: "100%",
        height: "100%",
      }}
    >
      {/* Column header row — the panel header is now supplied by the
          slide-level right SectionTitle ("AT A GLANCE — RELATIVE STRENGTH"),
          so we don't render it again here. */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `${ROW_LABEL_WIDTH}px repeat(${data.columns.length}, minmax(0, 1fr))`,
          columnGap: COL_GAP,
          alignItems: "end",
        }}
      >
        <span />
        {data.columns.map((col, i) => (
          <span
            key={col}
            style={{
              fontFamily: "var(--mono)",
              fontSize: 9,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--copper-300)",
              textAlign: "center",
              paddingBottom: 4,
              borderBottom: "1px solid var(--copper-800)",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(4px)",
              transition: `opacity 280ms var(--ease) ${
                80 + i * LABELS_STAGGER
              }ms, transform 280ms var(--ease) ${80 + i * LABELS_STAGGER}ms`,
              lineHeight: 1.1,
            }}
          >
            {col}
          </span>
        ))}
      </div>

      {/* Rows */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: ROW_GAP,
        }}
      >
        {data.rows.map((row, ri) => (
          <div
            key={row}
            style={{
              display: "grid",
              gridTemplateColumns: `${ROW_LABEL_WIDTH}px repeat(${data.columns.length}, minmax(0, 1fr))`,
              columnGap: COL_GAP,
              alignItems: "stretch",
              minHeight: ROW_HEIGHT,
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                fontFamily: "var(--serif)",
                fontSize: 14,
                color: "var(--neutral-100)",
                lineHeight: 1.15,
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateX(0)" : "translateX(-4px)",
                transition: `opacity 280ms var(--ease) ${
                  120 + ri * LABELS_STAGGER
                }ms, transform 280ms var(--ease) ${120 + ri * LABELS_STAGGER}ms`,
              }}
            >
              {row}
            </span>

            {data.cells[ri].map((cell, ci) => (
              <Cell
                key={ci}
                cell={cell}
                mounted={mounted}
                delay={CELLS_BASE + ri * ROW_STEP_MS + ci * CELL_STEP_MS}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Freshness sits IMMEDIATELY below the matrix (right-aligned mono
          caption) — small top margin keeps it tied to the last row without
          feeling glued. Task 19. */}
      {freshness ? (
        <span
          data-testid="b4-freshness"
          style={{
            marginTop: 6,
            alignSelf: "flex-end",
            fontFamily: "var(--mono)",
            fontSize: 10,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--copper-500)",
            whiteSpace: "nowrap",
            opacity: mounted ? 1 : 0,
            transition: "opacity 320ms var(--ease) 720ms",
          }}
        >
          {freshness}
        </span>
      ) : null}
    </div>
  );
}

function Cell({
  cell,
  mounted,
  delay,
}: {
  cell: B4QualitativeCell;
  mounted: boolean;
  delay: number;
}) {
  const style = cellStyles[cell];
  const label = cell.toUpperCase();

  return (
    <div
      data-testid={`b4-qsum-cell-${cell}`}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--mono)",
        fontSize: 10,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        minHeight: ROW_HEIGHT,
        opacity: mounted ? 1 : 0,
        transform: mounted ? "scale(1)" : "scale(0.94)",
        transition: `opacity 240ms var(--ease) ${delay}ms, transform 240ms var(--ease) ${delay}ms`,
        ...style,
      }}
    >
      {label}
    </div>
  );
}

const cellStyles: Record<B4QualitativeCell, CSSProperties> = {
  best: {
    background: "var(--copper-300)",
    color: "var(--neutral-950)",
    border: "1px solid var(--copper-300)",
  },
  good: {
    background: "var(--copper-700)",
    color: "var(--neutral-100)",
    border: "1px solid var(--copper-700)",
  },
  average: {
    background: "var(--neutral-800)",
    color: "var(--neutral-200)",
    border: "1px solid var(--copper-800)",
  },
  weak: {
    background: "transparent",
    color: "var(--neutral-400)",
    border: "1px dotted var(--neutral-700)",
  },
};
