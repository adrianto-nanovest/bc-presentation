// src/slides/foundation-core-section-e/components/TechniqueCard.tsx
import type { CopperStop } from "./TieredTechniqueGrid";

interface TechniqueCardProps {
  id: string;
  title: string;
  essence: string;
  copper: CopperStop;
  onClick: (id: string) => void;
}

const BORDER_CLASS: Record<CopperStop, string> = {
  "copper-300": "border-copper-300/60 hover:border-copper-300",
  "copper-500": "border-copper-500/60 hover:border-copper-300",
  "copper-700": "border-copper-700/60 hover:border-copper-300",
};

export function TechniqueCard({
  id,
  title,
  essence,
  copper,
  onClick,
}: TechniqueCardProps) {
  return (
    <button
      type="button"
      data-testid={`technique-card-${id}`}
      data-copper-stop={copper}
      onClick={() => onClick(id)}
      className={`group flex w-full flex-col items-start gap-2 border bg-neutral-950/60 px-4 py-3 text-left transition-transform duration-150 hover:scale-[1.02] ${BORDER_CLASS[copper]}`}
    >
      <span
        className="font-display text-neutral-50"
        style={{ fontSize: "clamp(1.2rem, 1.6vw, 1.7rem)", lineHeight: 1.1 }}
      >
        {title}
      </span>
      <span
        className="font-serif italic text-neutral-300"
        style={{ fontSize: "clamp(0.85rem, 1vw, 1.05rem)", lineHeight: 1.3 }}
      >
        {essence}
      </span>
    </button>
  );
}
