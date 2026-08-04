// I1BackdropAlternates — DEV ONLY. Not part of the shipped deck.
//
// The three I.1 backdrop treatments that lost to "grid pulse" (gh issue #12),
// kept on main so the decision can be revisited without archaeology. I1Backdrop
// reaches this module through a dynamic import inside an
// `if (import.meta.env.DEV)` block, so a production build drops it: nothing
// here can ever reach an audience.
//
// Use: `?proto=A|B|C|D|off` on I.1, or `[` / `]` to cycle. `C` is the shipping
// grid pulse (defined in I1Backdrop.tsx), `off` is the bare stage.
//
//   A — Copper network   Faithful port of the source hero (web/app.js): nodes
//                        drift, near nodes link, hubs pulse and emit packets.
//                        Recolored to copper and de-densified for a projected
//                        1280×720 stage. Deviations from the source are listed
//                        at the sim.
//   B — Ember rise       No edges: three parallax layers of embers rise with
//                        sway and flicker over a bottom heat glow. Atmosphere,
//                        not a graph.
//   D — Convergence      Step-reactive: particles are spring-pulled to a band
//                        at the current headline's Y, so the field assembles
//                        into the sentence and follows it up when the header
//                        collapses. Lost because the mesh sits behind the
//                        collapsed header; kept because it is the only variant
//                        coupled to I.1's reveal choreography.
//
// If one of these is ever promoted, move its factory into I1Backdrop.tsx and
// point PRODUCTION_SIM at it — this file is written under prototype
// constraints (no tests, no error handling) and should be rewritten, not
// imported, by production code.
import { useEffect } from "react";
import {
  COPPER,
  STAGE_H,
  STAGE_W,
  rand,
  type BackdropSim,
  type BackdropSimFactory,
} from "./I1Backdrop";

// ───────────────────── A — copper network (faithful port) ─────────────────
// Deviations from web/app.js, all for a projected slide rather than a web hero:
//   node count   57 (source formula at 1280×720) → 44; source density read as
//                visual noise behind a 52px headline
//   link dist    130 → 150 (fewer nodes still need to find each other)
//   link alpha   ×0.16 → ×0.13, recolored rgba(190,196,210) → copper-300
//   velocity     ±0.16 → ±0.10 px/frame (deck motion is slower everywhere)
//   hubs         every 14th → every 8th (44 nodes would otherwise give 4)
//   hub colors   cyan/blue/violet/amber → copper-200/300/400
//   packets      26 / 0.004 spawn → 18 / 0.0028 (calmer traffic)
//   center mask  new — the source hero had no centered display type to protect
function copperNetworkSim(): BackdropSim {
  const LINK = 150;
  const HUB_COLORS = [COPPER.c200, COPPER.c300, COPPER.c400];
  const nodes = Array.from({ length: 44 }, (_, i) => ({
    x: rand(0, STAGE_W),
    y: rand(0, STAGE_H),
    vx: rand(-0.1, 0.1),
    vy: rand(-0.1, 0.1),
    r: rand(0.9, 2),
    hub: i % 8 === 0,
    c: HUB_COLORS[i % HUB_COLORS.length],
    ph: rand(0, Math.PI * 2),
  }));
  type Node = (typeof nodes)[number];
  let packets: { a: Node; b: Node; p: number; sp: number; c: string }[] = [];

  return {
    mask:
      "radial-gradient(ellipse 52% 46% at 50% 48%, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.35) 46%, rgba(0,0,0,0.85) 74%, #000 100%)",

    frame(ctx, t) {
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -20) n.x = STAGE_W + 20;
        if (n.x > STAGE_W + 20) n.x = -20;
        if (n.y < -20) n.y = STAGE_H + 20;
        if (n.y > STAGE_H + 20) n.y = -20;
      }

      // Edges — O(n²) like the source; 44 nodes ≈ 946 pairs per frame.
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 >= LINK * LINK) continue;
          const alpha = (1 - Math.sqrt(d2) / LINK) * 0.13;
          ctx.strokeStyle = `rgba(${COPPER.c300},${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
          if (a.hub && packets.length < 18 && Math.random() < 0.0028) {
            packets.push({ a, b, p: 0, sp: rand(0.005, 0.011), c: a.c });
          }
        }
      }

      packets = packets.filter((pk) => {
        pk.p += pk.sp;
        if (pk.p >= 1) return false;
        const alpha = 0.85 * Math.sin(Math.PI * pk.p);
        ctx.fillStyle = `rgba(${pk.c},${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(
          pk.a.x + (pk.b.x - pk.a.x) * pk.p,
          pk.a.y + (pk.b.y - pk.a.y) * pk.p,
          1.6,
          0,
          Math.PI * 2,
        );
        ctx.fill();
        return true;
      });

      for (const n of nodes) {
        if (n.hub) {
          const pulse = 0.5 + 0.5 * Math.sin(t / 1100 + n.ph);
          ctx.fillStyle = `rgba(${n.c},${(0.18 * pulse).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, 8 + 5 * pulse, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = `rgba(${n.c},0.8)`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, 2.4, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = `rgba(${COPPER.c200},0.4)`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    },
  };
}

// ───────────────────── B — ember rise ─────────────────────
// Source-like alphas (0.26/0.38/0.5) were indistinguishable from the blank
// stage — the problem being solved — so they are raised, and the near layer
// gets real glow.
function emberRiseSim(): BackdropSim {
  const LAYERS = [
    { n: 40, r: [0.7, 1.3], v: [0.1, 0.18], a: 0.42, c: COPPER.c400, blur: 0 },
    { n: 22, r: [1.2, 2.1], v: [0.18, 0.3], a: 0.58, c: COPPER.c300, blur: 5 },
    { n: 10, r: [2.2, 3.8], v: [0.3, 0.46], a: 0.72, c: COPPER.c200, blur: 12 },
  ];
  const parts = LAYERS.flatMap((L) =>
    Array.from({ length: L.n }, () => ({
      x: rand(0, STAGE_W),
      y: rand(0, STAGE_H),
      r: rand(L.r[0], L.r[1]),
      v: rand(L.v[0], L.v[1]),
      a: L.a,
      c: L.c,
      blur: L.blur,
      ph: rand(0, Math.PI * 2),
      sway: rand(0.06, 0.2),
    })),
  );

  return {
    glow: true,

    frame(ctx, t) {
      for (const p of parts) {
        p.y -= p.v;
        p.x += Math.sin(t / 2200 + p.ph) * p.sway;
        if (p.y < -12) {
          p.y = STAGE_H + 12;
          p.x = rand(0, STAGE_W);
        }
        if (p.x < -12) p.x = STAGE_W + 12;
        if (p.x > STAGE_W + 12) p.x = -12;

        const flicker = 0.72 + 0.28 * Math.sin(t / 620 + p.ph * 2);
        ctx.shadowBlur = p.blur;
        ctx.shadowColor = `rgba(${p.c},0.7)`;
        ctx.fillStyle = `rgba(${p.c},${(p.a * flicker).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
    },
  };
}

// ───────────────────── D — convergence ─────────────────────
// Band targets track I.1's own type: step 0's centered line 2 (top:400, 52px)
// and step 1's collapsed header (top:80, 40px).
function convergenceSim(): BackdropSim {
  const BAND_CENTER = 424;
  const BAND_HEADER = 104;
  const LINK = 62;
  const parts = Array.from({ length: 74 }, () => ({
    x: rand(0, STAGE_W),
    y: rand(0, STAGE_H),
    vx: rand(-0.12, 0.12),
    vy: rand(-0.2, 0.2),
    r: rand(0.8, 1.9),
    off: rand(-26, 26), // per-particle band thickness
  }));

  return {
    frame(ctx, _t, stepIndex) {
      const target = stepIndex >= 1 ? BAND_HEADER : BAND_CENTER;
      for (const p of parts) {
        p.vy += (target + p.off - p.y) * 0.00055;
        p.vy *= 0.985;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -20) p.x = STAGE_W + 20;
        if (p.x > STAGE_W + 20) p.x = -20;
      }

      // The mesh only forms once particles are near each other.
      ctx.lineWidth = 1;
      for (let i = 0; i < parts.length; i++) {
        for (let j = i + 1; j < parts.length; j++) {
          const d = Math.hypot(
            parts[i].x - parts[j].x,
            parts[i].y - parts[j].y,
          );
          if (d >= LINK) continue;
          const alpha = (1 - d / LINK) * 0.11;
          ctx.strokeStyle = `rgba(${COPPER.c300},${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(parts[i].x, parts[i].y);
          ctx.lineTo(parts[j].x, parts[j].y);
          ctx.stroke();
        }
      }

      // Dispersed material is dim; assembled material glows.
      for (const p of parts) {
        const near = Math.max(0, 1 - Math.abs(p.y - target) / 240);
        ctx.fillStyle = `rgba(${COPPER.c200},${(0.14 + 0.46 * near).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    },
  };
}

export const ALTERNATE_SIMS: Record<string, BackdropSimFactory> = {
  A: copperNetworkSim,
  B: emberRiseSim,
  D: convergenceSim,
};

// ───────────────────── switcher keys ─────────────────────
// Keyboard only, renders nothing. The floating blue pill was removed because
// the deck is presented from `npm run dev`, where any dev chrome is on stage.
// `[` / `]` are the only safe keys: arrows, space, r, u and a–k all belong to
// useKeyboardNav.
export function BackdropSwitcher({
  options,
  current,
  onChange,
}: {
  options: readonly string[];
  current: string;
  onChange: (next: string) => void;
}) {
  const idx = Math.max(0, options.indexOf(current));
  const step = (delta: number) =>
    onChange(options[(idx + delta + options.length) % options.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (
        t?.isContentEditable ||
        t?.tagName === "INPUT" ||
        t?.tagName === "TEXTAREA"
      ) {
        return;
      }
      if (e.key === "[") {
        e.preventDefault();
        step(-1);
      } else if (e.key === "]") {
        e.preventDefault();
        step(1);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  return null;
}
