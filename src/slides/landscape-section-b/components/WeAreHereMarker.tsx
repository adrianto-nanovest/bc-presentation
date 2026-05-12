// WeAreHereMarker — upward arrow + "WE ARE HERE" label that bobs slowly and
// glows ambient copper. Sits BELOW era-5 on B.1 because era-5's label-box
// occupies the space above the rail; the marker points up at the circle.
//
// Two looping motions:
//   1. Ambient copper-glow pulse (4s) via <AmbientPulse>.
//   2. Bobbing y-translation (±4px over 2s) via a local keyframe — drives the
//      eye back during dwell without competing with the pulse.
import type { CSSProperties } from "react";
import { AmbientPulse } from "@/components/AmbientPulse";

export interface WeAreHereMarkerProps {
  on?: boolean;
  delay?: number;
}

const KEYFRAMES_ID = "b1-we-are-here-bob";

// Inject the bobbing keyframe once. Cheap, idempotent, no runtime cost after
// first mount.
function injectKeyframesOnce() {
  if (typeof document === "undefined") return;
  if (document.getElementById(KEYFRAMES_ID)) return;
  const style = document.createElement("style");
  style.id = KEYFRAMES_ID;
  style.textContent = `
@keyframes b1WeAreHereBob {
  0%   { transform: translateY(0px); }
  50%  { transform: translateY(-4px); }
  100% { transform: translateY(0px); }
}
`;
  document.head.appendChild(style);
}

export function WeAreHereMarker({ on = true, delay = 0 }: WeAreHereMarkerProps) {
  injectKeyframesOnce();

  const wrapperStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
    opacity: on ? 1 : 0,
    transition: "opacity 600ms var(--ease)",
    transitionDelay: on ? `${delay}ms` : "0ms",
  };

  // Bobbing wrapper runs continuously once `on` flips true.
  const bobStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
    animation: on ? "b1WeAreHereBob 2s ease-in-out infinite" : "none",
    willChange: "transform",
  };

  return (
    <div data-testid="we-are-here-marker" data-on={on ? "1" : "0"} style={wrapperStyle}>
      <div style={bobStyle}>
        {/* Upward arrow — points UP toward era-5 circle directly above. */}
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
    </div>
  );
}
