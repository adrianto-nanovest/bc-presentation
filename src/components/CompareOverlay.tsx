import { useEffect } from "react";

export interface ComparisonRow {
  label: string;       // row label, rendered in mono uppercase (left column)
  cells: string[];     // one cell per data column
}

export interface CompareOverlayProps {
  open: boolean;
  onClose: () => void;
  title: string;            // e.g. "Schedules vs Routines vs /loop"
  columns: string[];        // header labels for the data columns
  rows: ComparisonRow[];
  footer?: React.ReactNode; // optional small print beneath the table
}

export function CompareOverlay({
  open,
  onClose,
  title,
  columns,
  rows,
  footer,
}: CompareOverlayProps) {
  // Handle Escape key
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      data-no-advance
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(0,0,0,0.85)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "min(900px, 80vw)",
          maxHeight: "82vh",
          overflowY: "auto",
          background: "rgba(20,12,6,0.92)",
          border: "1px solid var(--copper-700)",
          padding: "32px 36px",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close comparison"
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            width: "24px",
            height: "24px",
            border: "none",
            background: "transparent",
            color: "var(--copper-300)",
            cursor: "pointer",
            fontSize: "20px",
            lineHeight: "24px",
            padding: 0,
            transition: "color 0.2s var(--ease)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--copper-100)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--copper-300)";
          }}
        >
          ×
        </button>

        {/* Title block */}
        <div
          style={{
            fontFamily: "var(--display)",
            fontSize: "24px",
            color: "var(--copper-100)",
            marginBottom: "8px",
          }}
        >
          {title}
        </div>
        <div
          style={{
            width: "40%",
            height: "1px",
            background: "var(--copper-300)",
            marginBottom: "24px",
          }}
        />

        {/* Table grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `180px repeat(${columns.length}, 1fr)`,
            columnGap: "16px",
            rowGap: 0,
          }}
        >
          {/* Header row */}
          <div style={{ paddingBottom: "12px" }} />
          {columns.map((col, i) => (
            <div
              key={i}
              style={{
                fontFamily: "var(--mono)",
                fontSize: "11px",
                color: "var(--copper-300)",
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                paddingBottom: "12px",
                borderBottom: "1px solid var(--copper-700)",
                alignSelf: "start",
              }}
            >
              {col}
            </div>
          ))}

          {/* Data rows */}
          {rows.map((row, rowIdx) => {
            const isLastRow = rowIdx === rows.length - 1;
            return (
              <>
                {/* Label cell */}
                <div
                  key={`label-${rowIdx}`}
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: "11px",
                    color: "var(--copper-400)",
                    textTransform: "uppercase",
                    letterSpacing: "0.16em",
                    padding: "14px 0",
                    borderBottom: isLastRow ? "none" : "1px solid var(--copper-800)",
                    alignSelf: "start",
                  }}
                >
                  {row.label}
                </div>
                {/* Data cells */}
                {row.cells.map((cell, cellIdx) => (
                  <div
                    key={`cell-${rowIdx}-${cellIdx}`}
                    style={{
                      fontFamily: "var(--serif)",
                      fontSize: "13px",
                      color: "var(--neutral-100)",
                      lineHeight: "1.45",
                      padding: "14px 0",
                      borderBottom: isLastRow ? "none" : "1px solid var(--copper-800)",
                      alignSelf: "start",
                    }}
                  >
                    {cell}
                  </div>
                ))}
              </>
            );
          })}
        </div>

        {/* Footer (optional) */}
        {footer && (
          <>
            <div
              style={{
                height: "1px",
                background: "var(--copper-800)",
                marginTop: "24px",
              }}
            />
            <div
              style={{
                fontFamily: "var(--serif)",
                fontStyle: "italic",
                fontSize: "12px",
                color: "var(--copper-200)",
                lineHeight: "1.5",
                paddingTop: "16px",
              }}
            >
              {footer}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
