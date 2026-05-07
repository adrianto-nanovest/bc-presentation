interface FigLabelProps {
  section: string;       // e.g. "I", "J", "K"
  num: number;           // e.g. 1, 2, 3
  label: string;         // e.g. "THE JOURNEY"
}

export function FigLabel({ section, num, label }: FigLabelProps) {
  return (
    <p
      className="absolute top-12 left-12 z-20 font-sans uppercase tracking-[0.18em] text-copper-400"
      style={{ fontSize: "clamp(0.95rem, 1.05vw, 1.25rem)" }}
    >
      — FIG. {section}.{num} · {label}
    </p>
  );
}
