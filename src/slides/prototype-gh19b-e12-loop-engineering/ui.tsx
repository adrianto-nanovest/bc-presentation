// PROTOTYPE gh#19b — throwaway. Shared visual primitives for the E.12 rebuild.
//
// All prototype-scoped keyframes live in one injected <style> block, prefixed
// `p19b-` so nothing leaks into the deck's namespace. The global
// prefers-reduced-motion rule in globals.css squashes every CSS animation to
// 0.01ms already; only SMIL (<animateMotion>) needs an explicit `reduced`
// gate, which the panels handle at mount time.
import type { CSSProperties, ReactNode } from "react";
import { highlight } from "@/components/highlight";

// ───────────────────────── type shorthands ─────────────────────────

export const mono = (size: number, color: string, ls = 0.18): CSSProperties => ({
  fontFamily: "var(--mono)",
  fontSize: size,
  letterSpacing: `${ls}em`,
  color,
  textTransform: "uppercase" as const,
});

export const serif = (size: number, color: string, italic = false): CSSProperties => ({
  fontFamily: "var(--serif)",
  fontStyle: italic ? "italic" : "normal",
  fontSize: size,
  lineHeight: 1.35,
  color,
});

/** Square number chip — copper block, dark numeral. The deck is radius-0. */
export function NumChip({ n, size = 17, on = true }: { n: string; size?: number; on?: boolean }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        flex: `0 0 ${size}px`,
        background: on ? "var(--copper-500)" : "var(--copper-800)",
        color: on ? "var(--neutral-950)" : "var(--copper-200)",
        fontFamily: "var(--mono)",
        fontSize: size * 0.58,
        fontWeight: 700,
        transition: "background 200ms var(--ease), color 200ms var(--ease)",
      }}
    >
      {n}
    </span>
  );
}

// ───────────────────────── panel shell ─────────────────────────
// Every right-canvas panel = mono title / serif kicker / content / footnote.

export function PanelShell({
  testid,
  title,
  kicker,
  kickerKw,
  foot,
  footKw,
  footDelay = 500,
  children,
}: {
  testid: string;
  title: string;
  kicker: string;
  kickerKw: readonly string[];
  foot?: string;
  footKw?: readonly string[];
  footDelay?: number;
  children: ReactNode;
}) {
  return (
    <div
      data-testid={testid}
      className="fade on"
      style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column" }}
    >
      <div style={{ flex: "0 0 auto" }}>
        <div style={mono(11, "var(--copper-300)", 0.22)}>{title}</div>
        <div style={{ ...serif(13, "var(--neutral-300)", true), marginTop: 5 }}>
          {highlight(kicker, kickerKw)}
        </div>
      </div>
      <div style={{ flex: 1, position: "relative", marginTop: 12, minHeight: 0 }}>{children}</div>
      {foot && (
        <div
          className="fade on"
          style={{
            flex: "0 0 auto",
            borderTop: "1px solid var(--copper-900)",
            paddingTop: 9,
            marginTop: 10,
            textAlign: "center",
            animationDelay: `${footDelay}ms`,
          }}
        >
          <span style={serif(13.5, "var(--copper-100)", true)}>{highlight(foot, footKw ?? [])}</span>
        </div>
      )}
    </div>
  );
}

// ───────────────────────── EKG trace ─────────────────────────
// A live electrocardiogram sweep: dim base line + a bright dash segment
// cycling along it. Dash pattern has period 1 (pathLength=1), so the loop is
// seamless. Reduced motion: globals.css squashes the sweep to a still frame.

export function Ekg({ w = 46, h = 14, color = "var(--copper-200)" }: { w?: number; h?: number; color?: string }) {
  const mid = h * 0.62;
  const pts = `0,${mid} ${w * 0.18},${mid} ${w * 0.26},${h * 0.2} ${w * 0.34},${h * 0.95} ${w * 0.42},${mid} ${w * 0.62},${mid} ${w * 0.7},${h * 0.42} ${w * 0.78},${mid} ${w},${mid}`;
  return (
    <svg width={w} height={h} style={{ display: "block", overflow: "visible" }} aria-hidden>
      <polyline points={pts} fill="none" stroke="var(--copper-800)" strokeWidth={1} />
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth={1.4}
        pathLength={1}
        strokeDasharray="0.28 0.72"
        style={{ animation: "p19b-sweep 2.2s linear infinite" }}
      />
    </svg>
  );
}

// ───────────────────────── keyframes ─────────────────────────

export function Proto19bKeyframes() {
  return (
    <style>{`
      /* dash conveyor — dasharray must total 10 for a seamless loop */
      @keyframes p19b-dash { to { stroke-dashoffset: -10; } }
      .p19b-dash { stroke-dasharray: 5 5; animation: p19b-dash 0.9s linear infinite; }
      .p19b-dash-slow { stroke-dasharray: 4 6; animation: p19b-dash 1.6s linear infinite; }

      /* one-shot stroke draw-in — pair with pathLength=1 */
      @keyframes p19b-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
      .p19b-draw {
        stroke-dasharray: 1;
        stroke-dashoffset: 1;
        animation: p19b-draw 0.7s var(--ease) both;
      }

      /* periodic bright-segment sweep (EKG) — offset period is 1 */
      @keyframes p19b-sweep { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }

      /* soft pulse for beat markers */
      @keyframes p19b-pulse {
        0%, 100% { transform: scale(1); opacity: 0.75; }
        50% { transform: scale(1.3); opacity: 1; }
      }

      /* gate bars growing to their width */
      @keyframes p19b-grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
      .p19b-grow { transform-origin: left center; animation: p19b-grow 0.9s var(--ease) both; }

      /* the memory-wipe cross stamping in */
      @keyframes p19b-stamp {
        0% { transform: scale(2.4) rotate(18deg); opacity: 0; }
        60% { transform: scale(0.94) rotate(-2deg); opacity: 1; }
        100% { transform: scale(1) rotate(0deg); opacity: 1; }
      }
      .p19b-stamp { animation: p19b-stamp 0.55s var(--ease) both; }

      /* chevron train on the step-0 bridge */
      @keyframes p19b-chev {
        0% { opacity: 0; transform: translateX(-7px); }
        45% { opacity: 1; }
        100% { opacity: 0; transform: translateX(9px); }
      }

      /* travelling spark on the heartbeats axis */
      @keyframes p19b-axis-dot {
        0% { left: 0%; opacity: 0; }
        6% { opacity: 1; }
        94% { opacity: 1; }
        100% { left: 100%; opacity: 0; }
      }
    `}</style>
  );
}
