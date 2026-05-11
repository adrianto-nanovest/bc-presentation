// AmbientPulse — wraps children in a slow 4s copper-glow ambient loop. Used
// across the opening arc (C.1, C.3, C.5, Bridge) to mark the "linchpin"
// keyword/line of a slide. Thin shim over PulseGlow with the canonical
// 4s period and copper accent.
//
// Scaffolded for the opening-arc tasks; later tasks may tune timing/intensity
// per slide. Keep the props minimal — anything more ornate belongs in a
// section-local component.
import type { ReactNode } from "react";
import { PulseGlow } from "./PulseGlow";

export interface AmbientPulseProps {
  children: ReactNode;
  /** Full cycle duration in seconds. Default 4s per spec. */
  periodSeconds?: number;
  /** Optional semantic hint — e.g. the keyword being emphasized. Reserved
   *  for later instrumentation/testing hooks. */
  keyword?: string;
  intensity?: "subtle" | "strong";
}

export function AmbientPulse({
  children,
  periodSeconds = 4,
  keyword,
  intensity = "subtle",
}: AmbientPulseProps) {
  return (
    <span data-ambient-pulse data-keyword={keyword}>
      <PulseGlow periodSeconds={periodSeconds} intensity={intensity}>
        {children}
      </PulseGlow>
    </span>
  );
}
