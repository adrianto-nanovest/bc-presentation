import type { ReactNode } from "react";
import { HoverReveal } from "@/components/HoverReveal";

interface RecipeStepCardProps {
  num: number;
  headline: ReactNode;
  subText: ReactNode;
  hoverExample?: ReactNode;
  orientation?: "vertical" | "horizontal";
}

export function RecipeStepCard({
  num,
  headline,
  subText,
  hoverExample,
  orientation = "vertical",
}: RecipeStepCardProps) {
  const padded = String(num).padStart(2, "0");
  const sizeFromOrientation =
    orientation === "horizontal"
      ? "w-[28%] min-h-[280px]"
      : "w-full max-w-[820px] min-h-[180px]";
  const card = (
    <div
      className={`relative flex flex-col gap-4 border border-copper-700 bg-neutral-950/40 p-8 ${sizeFromOrientation}`}
      data-testid="recipe-step-card"
    >
      <span
        className="font-mono text-copper-400"
        style={{ fontSize: "clamp(1.25rem, 1.4vw, 1.75rem)" }}
      >
        {padded}
      </span>
      <h3
        className="font-display text-neutral-50"
        style={{ fontSize: "clamp(1.75rem, 2.2vw, 2.5rem)", lineHeight: 1.18 }}
      >
        {headline}
      </h3>
      <hr className="w-[70%] border-0 border-t border-copper-700/70" />
      <p
        className="font-serif italic text-neutral-300"
        style={{ fontSize: "clamp(1.15rem, 1.4vw, 1.6rem)", lineHeight: 1.45 }}
      >
        {subText}
      </p>
    </div>
  );
  if (!hoverExample) return card;
  return (
    <HoverReveal
      position="below"
      trigger={card}
      payload={
        <span
          className="block max-w-[480px] border border-copper-500 bg-neutral-900 p-6 font-serif italic text-neutral-100 shadow"
          style={{ fontSize: "clamp(1rem, 1.2vw, 1.35rem)", lineHeight: 1.5 }}
        >
          {hoverExample}
        </span>
      }
    />
  );
}
