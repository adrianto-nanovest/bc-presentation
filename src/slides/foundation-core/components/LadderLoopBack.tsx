import { PulseGlow } from "@/components/PulseGlow";

export function LadderLoopBack() {
  return (
    <div
      data-testid="ladder-loopback"
      className="flex flex-col items-center gap-2 border border-copper-500 bg-neutral-950/80 p-4 text-center"
      style={{ width: "205px" }}
    >
      <PulseGlow periodSeconds={4} intensity="subtle">
        <span className="font-mono text-copper-400" style={{ fontSize: "1.44rem" }}>
          STOP ↻
        </span>
      </PulseGlow>
      <p className="font-serif italic text-copper-300" style={{ fontSize: "0.95rem", lineHeight: 1.35 }}>
        redesign first
      </p>
    </div>
  );
}
