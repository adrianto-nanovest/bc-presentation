// WeAreHereMarker — upward arrow + "WE ARE HERE" label with a 4s ambient
// copper pulse. Sits BELOW node-5 on B.1, pointing up at it. Deck's first
// deliberate ambient loop — slow, intentional, draws eye back during dwell.
import type { CSSProperties } from "react";
import { AmbientPulse } from "@/components/AmbientPulse";

export interface WeAreHereMarkerProps {
  on?: boolean;
  delay?: number;
}

export function WeAreHereMarker({ on = true, delay = 0 }: WeAreHereMarkerProps) {
  const wrapperStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
    opacity: on ? 1 : 0,
    transform: on ? "translateY(0)" : "translateY(-6px)",
    transition: "opacity 600ms var(--ease), transform 600ms var(--ease)",
    transitionDelay: on ? `${delay}ms` : "0ms",
  };

  return (
    <div data-testid="we-are-here-marker" data-on={on ? "1" : "0"} style={wrapperStyle}>
      {/* Upward arrow — points UP toward node-5 above. */}
      <svg width="14" height="18" viewBox="0 0 14 18" aria-hidden>
        <path
          d="M7 17 V4 M2 9 L7 4 L12 9"
          stroke="var(--copper-300)"
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <AmbientPulse periodSeconds={4} keyword="we-are-here">
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 10,
            letterSpacing: "0.28em",
            color: "var(--copper-200)",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          We are here
        </span>
      </AmbientPulse>
    </div>
  );
}
