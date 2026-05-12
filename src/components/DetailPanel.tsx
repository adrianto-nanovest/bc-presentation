import type { ReactNode } from "react";

// Shared inline detail panel for G.7 (and reusable elsewhere).
// When `comparison` is non-null, renders a CSS-grid matrix of column headers
// (with optional vendor sub-label) plus rows of label + cells.
// When `comparison` is null, renders `fallback` (or nothing) inside a
// transparent container so the page layout doesn't shift.
//
// Spec: docs/specs/2026-05-12-slides-application-G7-G11-synthesis.md §1, §2 G.7

export type ComparisonDef = {
  title: string;
  columns: { name: string; vendor?: string }[];
  rows: { label: string; cells: string[] }[];
};

export interface DetailPanelProps {
  comparison: ComparisonDef | null;
  fallback?: ReactNode;
}

export function DetailPanel({ comparison, fallback }: DetailPanelProps) {
  const hasContent = comparison !== null;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        boxSizing: "border-box",
        padding: "24px",
        border: hasContent
          ? "1px solid var(--copper-300)"
          : "1px solid transparent",
        background: hasContent ? "rgba(20,12,6,0.85)" : "transparent",
        transition:
          "border-color 200ms var(--ease), background 200ms var(--ease)",
        overflow: "hidden",
      }}
    >
      {comparison ? (
        <ComparisonMatrix comparison={comparison} />
      ) : (
        fallback ?? null
      )}
    </div>
  );
}

function ComparisonMatrix({ comparison }: { comparison: ComparisonDef }) {
  const { columns, rows } = comparison;
  const colCount = columns.length;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `110px repeat(${colCount}, 1fr)`,
        columnGap: "16px",
        rowGap: 0,
        width: "100%",
      }}
    >
      {/* Header row: empty top-left + each column name (with optional vendor) */}
      <div style={{ paddingBottom: "12px" }} />
      {columns.map((col, i) => (
        <div
          key={`col-${i}`}
          style={{
            paddingBottom: "12px",
            borderBottom: "1px solid var(--copper-700)",
            alignSelf: "start",
          }}
        >
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: "11px",
              color: "var(--copper-300)",
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              lineHeight: 1.2,
            }}
          >
            {col.name}
          </div>
          {col.vendor && (
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: "9px",
                color: "var(--copper-500)",
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                lineHeight: 1.2,
                marginTop: "3px",
              }}
            >
              {col.vendor}
            </div>
          )}
        </div>
      ))}

      {/* Body rows */}
      {rows.map((row, rowIdx) => {
        const isLastRow = rowIdx === rows.length - 1;
        const rowDivider = isLastRow ? "none" : "1px solid var(--copper-800)";
        return (
          <RowFragment
            key={`row-${rowIdx}`}
            label={row.label}
            cells={row.cells}
            divider={rowDivider}
          />
        );
      })}
    </div>
  );
}

function RowFragment({
  label,
  cells,
  divider,
}: {
  label: string;
  cells: string[];
  divider: string;
}) {
  return (
    <>
      <div
        style={{
          fontFamily: "var(--mono)",
          fontSize: "11px",
          color: "var(--copper-300)",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          padding: "10px 0",
          borderBottom: divider,
          alignSelf: "start",
        }}
      >
        {label}
      </div>
      {cells.map((cell, cellIdx) => (
        <div
          key={`cell-${cellIdx}`}
          style={{
            fontFamily: "var(--serif)",
            fontSize: "13px",
            color: "var(--neutral-100)",
            lineHeight: 1.4,
            padding: "10px 0",
            borderBottom: divider,
            alignSelf: "start",
            verticalAlign: "top",
          }}
        >
          {cell}
        </div>
      ))}
    </>
  );
}
