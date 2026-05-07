import type { ReactNode } from "react";
import { highlight } from "@/components/highlight";

export type ConvergenceSlot =
  | "bpm-tl"
  | "rpa-tr"
  | "ai-bc"
  | "ipa-c"
  | "agentic-r";

export type CopperStop =
  | "copper-200"
  | "copper-300"
  | "copper-400"
  | "copper-500"
  | "copper-700";

interface ConvergenceCardProps {
  title: string;                   // e.g. "BPM"
  subName: string;                 // e.g. "Business Process Management"
  tagline: string;                 // e.g. "The GPS for operations"
  taglineKeywords: readonly string[];
  bullets: readonly string[];      // exactly 3 entries
  copperStop: CopperStop;          // left-rule color
  position: ConvergenceSlot;
  children?: ReactNode;            // optional trailing slot (e.g. HoverReveal payload host)
}

const stopBorderClass: Record<CopperStop, string> = {
  "copper-200": "border-l-copper-200",
  "copper-300": "border-l-copper-300",
  "copper-400": "border-l-copper-400",
  "copper-500": "border-l-copper-500",
  "copper-700": "border-l-copper-700",
};

export function ConvergenceCard({
  title,
  subName,
  tagline,
  taglineKeywords,
  bullets,
  copperStop,
  position,
  children,
}: ConvergenceCardProps) {
  return (
    <div
      data-testid="convergence-card"
      data-position={position}
      data-copper-stop={copperStop}
      className={`relative flex flex-col gap-3 border-l-2 ${stopBorderClass[copperStop]} bg-neutral-950/60 p-6 shadow`}
      style={{ width: "clamp(220px, 22vw, 320px)" }}
    >
      <h3 className="font-display text-neutral-50" style={{ fontSize: "clamp(1.5rem, 2vw, 2rem)", lineHeight: 1.15 }}>
        {title}
      </h3>
      <p className="font-serif italic text-neutral-300" style={{ fontSize: "clamp(1rem, 1.3vw, 1.4rem)", lineHeight: 1.3 }}>
        {subName}
      </p>
      <p className="font-serif text-neutral-50" style={{ fontSize: "clamp(1.1rem, 1.4vw, 1.5rem)", lineHeight: 1.35 }}>
        <em className="italic">{highlight(tagline, taglineKeywords)}</em>
      </p>
      <ul className="flex flex-col gap-1 font-sans text-neutral-200" style={{ fontSize: "clamp(0.95rem, 1.1vw, 1.15rem)", lineHeight: 1.45 }}>
        {bullets.map((b, i) => (
          <li key={i} className="before:mr-2 before:content-['·']">{b}</li>
        ))}
      </ul>
      {children}
    </div>
  );
}
