import type { ReactNode } from "react";
import { HoverReveal } from "@/components/HoverReveal";

interface LadderTerminalProps {
  abbrev: string;            // "BPM" | "RPA" | "IPA" | "AGENTIC"
  subLine: string;
  altitudeTier: 1 | 2 | 3 | 4; // 1 = lowest (BPM), 4 = highest (AGENTIC)
  hoverExample?: ReactNode;
}

export function LadderTerminal({
  abbrev,
  subLine,
  altitudeTier,
  hoverExample,
}: LadderTerminalProps) {
  const card = (
    <div
      data-testid="ladder-terminal"
      data-altitude-tier={altitudeTier}
      className="flex flex-col gap-2 border border-copper-500 bg-neutral-950/60 p-4"
      style={{ width: "230px" }}
    >
      <h3 className="font-display text-neutral-50" style={{ fontSize: "1.6rem", lineHeight: 1.1 }}>
        {abbrev}
      </h3>
      <p className="font-serif italic text-neutral-300" style={{ fontSize: "0.95rem", lineHeight: 1.35 }}>
        {subLine}
      </p>
    </div>
  );
  if (!hoverExample) return card;
  return (
    <HoverReveal
      position="below"
      trigger={card}
      payload={
        <span className="block max-w-[420px] border border-copper-500 bg-neutral-900 p-5 font-serif italic text-neutral-100 shadow" style={{ fontSize: "0.95rem", lineHeight: 1.45 }}>
          {hoverExample}
        </span>
      }
    />
  );
}
