// BigStat — Instrument Serif huge number with a counter-up animation. Used on
// B.5's "92%" reveal.
//
// IMPORTANT — visual rhyme with D.1:
//   B.5's "92%" counter-up MUST mirror D.1's "73%" counter-up exactly (same
//   component, same easing, same duration). To guarantee that, this component
//   delegates to the existing Section D `CountUp` rather than re-implementing
//   a parallel counter. The cross-deck `src/components/CounterUp.tsx` stub is
//   no longer referenced from here — keeping the single canonical
//   implementation under `foundation-core/components/CountUp.tsx`.
import type { CSSProperties } from "react";
import { CountUp } from "@/slides/foundation-core/components/CountUp";

// Same easing curve as D.1 — Framer cubic-bezier 4-tuple (easeOutExpo-ish).
// Mirrors `DEFAULT_EASE` inside CountUp.tsx so the two stats feel identical.
const RHYME_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export interface BigStatProps {
  to: number;
  suffix?: string;
  /** Font-size in px. Default 280 per B.5 spec. */
  size?: number;
  /** Animation duration in ms. Default 1500 to match D.1. */
  duration?: number;
  /** CSS color for the number. Default copper-400 per B.5 spec. */
  color?: string;
  /** Optional color override for the suffix. Defaults to `color`. */
  suffixColor?: string;
  style?: CSSProperties;
  testId?: string;
}

export function BigStat({
  to,
  suffix,
  size = 280,
  duration = 1500,
  color = "var(--copper-400)",
  suffixColor,
  style,
  testId = "big-stat",
}: BigStatProps) {
  return (
    <div
      data-testid={testId}
      style={{
        fontFamily: "var(--display)",
        fontWeight: 400,
        fontSize: size,
        lineHeight: 0.85,
        letterSpacing: "-0.02em",
        color,
        display: "inline-flex",
        alignItems: "baseline",
        ...style,
      }}
    >
      <CountUp
        from={0}
        to={to}
        durationMs={duration}
        ease={RHYME_EASE}
        testId={`${testId}-counter`}
      />
      {suffix && (
        <span
          style={{
            fontSize: "0.55em",
            marginLeft: "0.05em",
            color: suffixColor ?? color,
          }}
        >
          {suffix}
        </span>
      )}
    </div>
  );
}
