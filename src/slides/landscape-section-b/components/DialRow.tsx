// DialRow — knob graphic + label + plain caption with a hover-revealed tech
// name. Used on B.3's left rail (Temperature / Context Window / System Prompt).
//
// The knob is a small SVG rotary dial with three marked positions
// (Low / Mid / High). On reveal the indicator rotates 0° → 45° over ~300ms
// (easeOutExpo) and settles at "Mid". Hover the row → reveals the technical
// name in a small mono-font popover anchored just below the dial caption.
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";

export interface DialRowProps {
  label: string;
  caption: ReactNode;
  /** Tech-name shown on hover (e.g. `temperature: 0.0 - 1.5+`). */
  hover: string;
  /** Drives appearance animation (slide-in from left + knob rotation). */
  on: boolean;
  /** Optional reveal delay (ms). */
  delay?: number;
}

export function DialRow({ label, caption, hover, on, delay = 0 }: DialRowProps) {
  const [h, setH] = useState(false);
  // Knob rotation is gated by `on` AND a short post-mount delay so the
  // settle reads as deliberate (not coincident with the slide-in).
  const [knobSettled, setKnobSettled] = useState(false);
  useEffect(() => {
    if (!on) {
      setKnobSettled(false);
      return;
    }
    const t = window.setTimeout(() => setKnobSettled(true), delay + 120);
    return () => window.clearTimeout(t);
  }, [on, delay]);

  const containerStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 18,
    padding: "10px 0",
    cursor: "default",
    opacity: on ? 1 : 0,
    transform: on ? "translateX(0)" : "translateX(-16px)",
    transition: "opacity 500ms var(--ease), transform 500ms var(--ease)",
    transitionDelay: on ? `${delay}ms` : "0ms",
    willChange: "opacity, transform",
  };

  return (
    <div
      data-testid="dial-row"
      data-on={on ? "1" : "0"}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={containerStyle}
    >
      <Knob settled={knobSettled} />
      <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.24em",
            color: "var(--copper-300)",
            textTransform: "uppercase",
            lineHeight: 1.2,
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontFamily: "var(--serif)",
            fontSize: 16,
            color: "var(--neutral-200)",
            marginTop: 4,
            lineHeight: 1.35,
            maxWidth: 360,
          }}
        >
          {caption}
        </span>
        {/* Hover popover — mono tech-name, fades in/out beneath the caption. */}
        <span
          data-testid="dial-hover"
          style={{
            fontFamily: "var(--mono)",
            fontSize: 10,
            letterSpacing: "0.12em",
            color: "var(--copper-300)",
            marginTop: 6,
            opacity: h ? 1 : 0,
            transform: h ? "translateY(0)" : "translateY(-2px)",
            transition: "opacity 220ms var(--ease), transform 220ms var(--ease)",
            pointerEvents: "none",
            whiteSpace: "nowrap",
          }}
        >
          {hover}
        </span>
      </div>
    </div>
  );
}

// ───────────────────── Knob ─────────────────────
// Small SVG rotary dial. Three tick marks (Low/Mid/High). The indicator line
// rotates from 0° (pointing left/down at the "Low" tick) to 45° (pointing up
// at the "Mid" tick) once `settled` is true.
//
// Coordinate system: viewBox 0 0 56 56, centered at (28, 28). Ticks are
// arranged across the top semicircle from −135° (Low) to −45° (High) with Mid
// at the top (−90°). The indicator starts pre-rotation at −135° and the
// `settled` rotation deltas to −90°, i.e. a +45° clockwise rotation. We
// implement the indicator as a line drawn straight up and apply `rotate(...)`
// to the group.
function Knob({ settled }: { settled: boolean }) {
  // 0° = pointing up (Mid). −45° = pointing top-left (Low). +45° = top-right (High).
  const angle = settled ? 0 : -45; // start at Low, settle at Mid

  return (
    <svg
      width={44}
      height={44}
      viewBox="0 0 56 56"
      aria-hidden
      style={{ flexShrink: 0 }}
    >
      {/* Outer ring */}
      <circle
        cx={28}
        cy={28}
        r={20}
        fill="rgba(10,10,10,0.6)"
        stroke="var(--copper-700)"
        strokeWidth="1"
      />
      {/* Inner ring (subtle halo) */}
      <circle
        cx={28}
        cy={28}
        r={16}
        fill="none"
        stroke="var(--copper-800)"
        strokeWidth="0.5"
        opacity={0.7}
      />
      {/* Tick marks — Low (−135°), Mid (−90°), High (−45°). Drawn as short
          radial line segments just outside the outer ring. */}
      {[
        { a: -135, key: "low" },
        { a: -90, key: "mid" },
        { a: -45, key: "high" },
      ].map(({ a, key }) => {
        const rad = (a * Math.PI) / 180;
        const r1 = 22;
        const r2 = 25;
        const x1 = 28 + r1 * Math.cos(rad);
        const y1 = 28 + r1 * Math.sin(rad);
        const x2 = 28 + r2 * Math.cos(rad);
        const y2 = 28 + r2 * Math.sin(rad);
        return (
          <line
            key={key}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="var(--copper-400)"
            strokeWidth="1.2"
            opacity={key === "mid" ? 1 : 0.55}
          />
        );
      })}
      {/* Indicator — short copper line from center pointing "up" when the
          group rotation is 0°. easeOutExpo approximation via cubic-bezier. */}
      <g
        style={{
          transform: `rotate(${angle}deg)`,
          transformOrigin: "28px 28px",
          transition:
            "transform 380ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <line
          x1={28}
          y1={28}
          x2={28}
          y2={14}
          stroke="var(--copper-200)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx={28} cy={28} r={2} fill="var(--copper-200)" />
      </g>
    </svg>
  );
}
