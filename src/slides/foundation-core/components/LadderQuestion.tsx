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
      style={{ width: "179px" }}
    >
      <span className="font-mono text-copper-300" style={{ fontSize: "0.85rem" }}>
        Q{number}
      </span>
      <p className="font-serif text-neutral-50" style={{ fontSize: "0.95rem", lineHeight: 1.3 }}>
        <em className="italic">{highlight(question, keywords)}</em>
      </p>
      <div className="mt-1 flex w-full justify-between font-mono text-copper-200" style={{ fontSize: "0.7rem" }}>
        {yesLabel && <span>YES → {yesLabel}</span>}
        {noLabel && <span>NO ↓ {noLabel}</span>}
      </div>
    </div>
  );
}
