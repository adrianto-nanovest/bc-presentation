import { highlight } from "@/components/highlight";

interface LadderQuestionProps {
  number: number;
  question: string;
  keywords: readonly string[];
  yesLabel?: string;
  noLabel?: string;
}

export function LadderQuestion({
  number,
  question,
  keywords,
  yesLabel,
  noLabel,
}: LadderQuestionProps) {
  return (
    <div
      data-testid="ladder-question"
      data-q-number={number}
      className="flex flex-col items-center gap-2 border border-copper-700 bg-neutral-950/60 p-3 text-center"
      style={{ width: "clamp(140px, 14vw, 200px)" }}
    >
      <span className="font-mono text-copper-300" style={{ fontSize: "clamp(0.85rem, 1vw, 1rem)" }}>
        Q{number}
      </span>
      <p className="font-serif text-neutral-50" style={{ fontSize: "clamp(0.95rem, 1.15vw, 1.25rem)", lineHeight: 1.3 }}>
        <em className="italic">{highlight(question, keywords)}</em>
      </p>
      <div className="mt-1 flex w-full justify-between font-mono text-copper-200" style={{ fontSize: "clamp(0.7rem, 0.85vw, 0.85rem)" }}>
        {yesLabel && <span>YES → {yesLabel}</span>}
        {noLabel && <span>NO ↓ {noLabel}</span>}
      </div>
    </div>
  );
}
