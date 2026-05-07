import { PulseGlow } from "@/components/PulseGlow";

export function LadderLoopBack() {
  return (
    <div
      data-testid="ladder-loopback"
      className="flex flex-col items-center gap-2 border border-copper-500 bg-neutral-950/80 p-4 text-center"
      style={{ width: "clamp(160px, 16vw, 220px)" }}
    >
      <PulseGlow periodSeconds={4} intensity="subtle">
        <span className="font-mono text-copper-400" style={{ fontSize: "clamp(1.4rem, 1.8vw, 2rem)" }}>
          STOP ↻
        </span>
      </PulseGlow>
      <p className="font-serif italic text-copper-300" style={{ fontSize: "clamp(0.95rem, 1.15vw, 1.25rem)", lineHeight: 1.35 }}>
        redesign first
      </p>
    </div>
  );
}
