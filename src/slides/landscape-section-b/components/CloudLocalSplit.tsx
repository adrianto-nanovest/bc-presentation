// CloudLocalSplit — two-half panel showing cloud vs local model deployment,
// with a copper arrow connecting them. Used on B.4.
import type { ReactNode } from "react";

export interface CloudLocalSplitProps {
  cloudLabel: ReactNode;
  cloudSuperlative: ReactNode;
  localLabel: ReactNode;
  localSuperlative: ReactNode;
}

export function CloudLocalSplit({
  cloudLabel,
  cloudSuperlative,
  localLabel,
  localSuperlative,
}: CloudLocalSplitProps) {
  return (
    <div
      data-testid="cloud-local-split"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 32px 1fr",
        alignItems: "center",
        gap: 12,
      }}
    >
      <Half label="CLOUD" mainLine={cloudLabel} superlative={cloudSuperlative} />
      <div
        aria-hidden
        style={{
          textAlign: "center",
          fontFamily: "var(--mono)",
          color: "var(--copper-400)",
        }}
      >
        ↔
      </div>
      <Half label="LOCAL" mainLine={localLabel} superlative={localSuperlative} />
    </div>
  );
}

function Half({
  label,
  mainLine,
  superlative,
}: {
  label: string;
  mainLine: ReactNode;
  superlative: ReactNode;
}) {
  return (
    <div
      style={{
        padding: 14,
        border: "1px solid var(--copper-800)",
        background: "rgba(10,10,10,0.45)",
        display: "flex",
        flexDirection: "column",
        gap: 6,
      }}
    >
      <span
        style={{
          fontFamily: "var(--mono)",
          fontSize: 10,
          letterSpacing: "0.28em",
          color: "var(--copper-300)",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: "var(--serif)",
          fontSize: 14,
          color: "var(--neutral-100)",
        }}
      >
        {mainLine}
      </span>
      <span
        style={{
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontSize: 13,
          color: "var(--copper-200)",
        }}
      >
        {superlative}
      </span>
    </div>
  );
}
