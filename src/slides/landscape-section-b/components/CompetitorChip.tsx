// CompetitorChip — chip variant for B.4's competitor rail (Qwen, DeepSeek,
// Moonshot Kimi, SEA-LION).
export interface CompetitorChipProps {
  name: string;
  desc: string;
}

export function CompetitorChip({ name, desc }: CompetitorChipProps) {
  return (
    <span
      data-testid="competitor-chip"
      style={{
        display: "inline-flex",
        flexDirection: "column",
        padding: "6px 12px",
        border: "1px solid var(--copper-800)",
        background: "rgba(10,10,10,0.5)",
      }}
    >
      <span
        style={{
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: "0.18em",
          color: "var(--copper-200)",
          textTransform: "uppercase",
        }}
      >
        {name}
      </span>
      <span
        style={{
          fontFamily: "var(--serif)",
          fontSize: 12,
          color: "var(--neutral-300)",
          fontStyle: "italic",
        }}
      >
        {desc}
      </span>
    </span>
  );
}
