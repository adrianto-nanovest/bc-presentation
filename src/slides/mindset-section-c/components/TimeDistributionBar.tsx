// TimeDistributionBar — horizontal 3-segment bar (Specify / Generate / Verify)
// used on C.4 for the BEFORE vs AFTER time-distribution comparison.
//
// Each segment grows from the left via `scaleX 0 → 1` with `transform-origin:
// left center`, staggered ~180ms apart so the bar fills left-to-right.
// Segment widths are percentages of the bar's full width — they are baked into
// the inline width on the wrapper, so the grow animation simply scales each
// segment from collapsed (scaleX 0) to its assigned slice.
//
// "BEFORE" emphasizes Generate (copper-700 dominant block) — the dense centre
// is what the AFTER bar visually breaks. "AFTER" redistributes weight: Verify
// becomes the dominant segment (copper-400), Generate shrinks to copper-700
// dim. The visual contrast between the two bars is the slide's emotional
// payoff — by design BOTH bars stay visible at canonical pose.
import type { CSSProperties, ReactNode } from "react";

export interface TimeDistributionSegment {
  label: string;
  percent: number;
  /** CSS color (token var or literal). */
  color: string;
}

export interface TimeDistributionBarProps {
  /** Row label rendered to the left of the bar (e.g. "BEFORE" / "AFTER"). */
  label: string;
  /** Color for the row label text. */
  labelColor: string;
  /** Three segments in left-to-right order. */
  segments: readonly TimeDistributionSegment[];
  /** When true, segments grow from left → assigned width with stagger. */
  on: boolean;
  /** Base delay applied to the first segment. Subsequent segments are
   *  staggered 180ms after each prior segment finishes its enter. */
  delay?: number;
  /** Bar width in px (parent sets the row's overall width). */
  trackWidth?: number;
  /** Optional segment-label tone — caption rendered beneath each segment. */
  captionColor?: string;
  testId?: string;
}

const SEG_DURATION = 800;       // ms — single segment grow duration
const SEG_STAGGER = 180;        // ms — start delay between consecutive segments
const BAR_HEIGHT = 32;

export function TimeDistributionBar({
  label,
  labelColor,
  segments,
  on,
  delay = 0,
  trackWidth = 820,
  captionColor = "var(--neutral-300)",
  testId,
}: TimeDistributionBarProps) {
  return (
    <div
      data-testid={testId ?? "time-distribution-bar"}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 18,
        width: "100%",
      }}
    >
      {/* Row label — sits to the left of the bar */}
      <div
        style={{
          flex: "0 0 auto",
          width: 90,
          paddingTop: 8,
          textAlign: "right",
          fontFamily: "var(--mono)",
          fontSize: 12,
          letterSpacing: "0.28em",
          color: labelColor,
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>

      {/* Bar + segment captions */}
      <div
        style={{
          flex: "0 0 auto",
          width: trackWidth,
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        {/* Bar track */}
        <div
          style={{
            display: "flex",
            width: "100%",
            height: BAR_HEIGHT,
            border: "1px solid var(--copper-900)",
            background: "rgba(184,110,61,0.04)",
            overflow: "hidden",
          }}
        >
          {segments.map((seg, i) => {
            const segDelay = delay + i * SEG_STAGGER;
            const fillStyle: CSSProperties = {
              width: "100%",
              height: "100%",
              background: seg.color,
              transformOrigin: "left center",
              transform: on ? "scaleX(1)" : "scaleX(0)",
              transition: `transform ${SEG_DURATION}ms var(--ease)`,
              transitionDelay: on ? `${segDelay}ms` : "0ms",
            };
            return (
              <div
                key={`${seg.label}-${i}`}
                data-testid={`segment-${seg.label.toLowerCase()}`}
                style={{
                  flex: `0 0 ${seg.percent}%`,
                  height: "100%",
                  position: "relative",
                  borderRight:
                    i < segments.length - 1
                      ? "1px solid rgba(10,6,4,0.55)"
                      : "none",
                }}
              >
                <div style={fillStyle} />
              </div>
            );
          })}
        </div>

        {/* Segment captions — pct + label */}
        <div style={{ display: "flex", width: "100%" }}>
          {segments.map((seg, i) => {
            const segDelay = delay + i * SEG_STAGGER + 200;
            return (
              <div
                key={`cap-${seg.label}-${i}`}
                style={{
                  flex: `0 0 ${seg.percent}%`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                  paddingTop: 2,
                  opacity: on ? 1 : 0,
                  transform: on ? "translateY(0)" : "translateY(3px)",
                  transition:
                    "opacity 360ms var(--ease), transform 360ms var(--ease)",
                  transitionDelay: on ? `${segDelay}ms` : "0ms",
                  minWidth: 0,
                }}
              >
                <SegmentCaption
                  pct={seg.percent}
                  label={seg.label}
                  captionColor={captionColor}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SegmentCaption({
  pct,
  label,
  captionColor,
}: {
  pct: number;
  label: string;
  captionColor: string;
}): ReactNode {
  return (
    <>
      <span
        style={{
          fontFamily: "var(--display)",
          fontSize: 18,
          color: "var(--neutral-100)",
          lineHeight: 1,
        }}
      >
        {pct}%
      </span>
      <span
        style={{
          fontFamily: "var(--mono)",
          fontSize: 10,
          letterSpacing: "0.22em",
          color: captionColor,
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
    </>
  );
}
