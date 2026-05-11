interface FigLabelProps {
  section: string;       // e.g. "I", "J", "K"
  num: number;           // e.g. 1, 2, 3
  label: string;         // e.g. "THE JOURNEY"
}

export function FigLabel({ section, num, label }: FigLabelProps) {
  return (
    <div className="fig-label">
      — FIG. {section}.{num}
      <span className="dot">·</span>
      <span style={{ color: "var(--copper-200)" }}>{label}</span>
    </div>
  );
}
