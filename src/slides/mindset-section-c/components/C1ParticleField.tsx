// C1ParticleField — ambient copper particles drifting left-to-right beneath C.1's text.

import { useMemo } from "react";
import type { CSSProperties } from "react";

const PARTICLE_COUNT = 44;

// Deterministic PRNG so the field is identical across re-renders within a
// mount but still varied between particles. Seeded once at module scope.
function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Particle = {
  topPct: number;       // vertical anchor (%)
  size: number;         // px diameter
  opacity: number;      // base alpha
  durationS: number;    // horizontal drift period
  delayS: number;       // negative start offset → mid-flight on mount
  wobbleS: number;      // vertical sine period
  wobbleAmp: number;    // px vertical amplitude
  hueShade: 300 | 400;  // copper variant
  glow: number;         // px box-shadow radius
};

export function C1ParticleField() {
  const particles = useMemo<Particle[]>(() => {
    const rng = mulberry32(0xc1b21d6e);
    const out: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const r = rng;
      out.push({
        topPct: r() * 100,
        size: 2 + r() * 2,                 // 2–4px
        opacity: 0.55 + r() * 0.35,        // 0.55–0.90
        durationS: 16 + r() * 8,           // 16–24s
        delayS: -(r() * 24),               // negative → already drifting
        wobbleS: 6 + r() * 4,              // 6–10s
        wobbleAmp: 6 + r() * 10,           // 6–16px
        hueShade: r() > 0.5 ? 300 : 400,
        glow: 8 + r() * 8,                 // 8–16px
      });
    }
    return out;
  }, []);

  return (
    <div
      data-testid="c1-particle-field"
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 2,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <style>{KEYFRAMES}</style>
      {particles.map((p, i) => {
        const color = `var(--copper-${p.hueShade})`;
        const outerStyle: CSSProperties = {
          position: "absolute",
          top: `${p.topPct}%`,
          left: 0,
          width: p.size,
          height: p.size,
          animation: `c1pf-drift ${p.durationS}s linear ${p.delayS}s infinite`,
          willChange: "transform",
        };
        const innerStyle: CSSProperties = {
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          background: color,
          opacity: p.opacity,
          filter: "blur(0.5px)",
          boxShadow: `0 0 ${p.glow}px ${color}`,
          animation: `c1pf-wobble ${p.wobbleS}s ease-in-out ${p.delayS}s infinite`,
          willChange: "transform",
          // Per-particle wobble amplitude consumed by the @keyframes below.
          ["--c1pf-amp" as string]: `${p.wobbleAmp}px`,
        };
        return (
          <div key={i} style={outerStyle}>
            <div style={innerStyle} />
          </div>
        );
      })}
    </div>
  );
}

// Two independent keyframe tracks so horizontal drift and vertical wobble
// can run at their own periods. Horizontal travel uses -10vw → 110vw so
// particles enter from off-screen left and exit off-screen right, echoing
// the "crossing a bridge" metaphor.
const KEYFRAMES = `
@keyframes c1pf-drift {
  0%   { transform: translateX(-10vw); }
  100% { transform: translateX(110vw); }
}
@keyframes c1pf-wobble {
  0%   { transform: translateY(0); }
  50%  { transform: translateY(var(--c1pf-amp, 10px)); }
  100% { transform: translateY(0); }
}
`;
