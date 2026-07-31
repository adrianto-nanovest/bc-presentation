// I1Backdrop — ambient particle-motion layer for I.1 steps 1–2 (code
// stepIndex 0–1), which were otherwise a black stage behind two lines of type.
//
// Ported from hr-group-agentic-org/web's hero network (canvas 2D, no
// dependencies; see docs/researches/2026-07-31-hr-group-agentic-org-analysis.md
// §3 for the source parameters) and re-tuned to this deck's copper ramp and
// hairline-rule vocabulary. Selected from four prototyped variants — gh issue
// #12; the three that lost are kept switchable, see "Switching" below.
//
// What it renders — "grid pulse":
//   • A static 96px hairline grid in copper-700 at 0.16 alpha. This is the
//     deck's own rule language, not a new decorative idiom. 80px read as
//     graph paper behind the 52px headline; 96px lets the pulses be the
//     subject.
//   • 13 concurrent pulses, each routed along ONE grid line (orthogonal only,
//     never free drift): a gradient comet tail (70–130px) into a 1.9px
//     copper-200 head, travelling 1.1–2.3px per frame. A pulse that leaves
//     the stage respawns on another line.
//   • Intersection dots that brighten (alpha 0.10 → 0.65, radius 1 → 2.4) as
//     a pulse head passes within 40px, so the grid reads as routed traffic.
//   • A radial mask that holds the center back, protecting the headline.
//     The source hero had no centered display type to protect.
//
// Coordinate space is stage units (1280×720). The stage is a fixed-size box
// that CSS-scales (see useViewportScale), so sim state never needs rebuilding
// on resize — only the canvas backing store is re-fitted for the current
// on-screen scale.
//
// Reduced motion: draws exactly one static frame, no animation loop. The
// source omitted its particle layer entirely, but a still frame answers the
// blank-stage problem without any motion. Note that re-fitting the backing
// store clears the canvas, so the fit path redraws that frame.
//
// Exports (PDF/PPTX) are unaffected: I.1's canonicalPose is step 3, where this
// layer has already faded out.
//
// Switching variants (dev only, never bundled for production — see
// I1BackdropAlternates.tsx): `?proto=A|B|C|D|off` plus `[` / `]` to cycle.
// To ship a different variant permanently, move its sim factory into this
// file and point PRODUCTION_SIM at it.
import { useEffect, useRef, useState, type ComponentType } from "react";

export const STAGE_W = 1280;
export const STAGE_H = 720;

/** Deck copper ramp (src/styles/globals.css), as `r,g,b` for rgba() strings. */
export const COPPER = {
  c200: "232,196,160",
  c300: "217,158,108",
  c400: "201,133,72",
  c500: "184,110,61",
  c700: "122,70,38",
} as const;

export const rand = (a: number, b: number) => a + Math.random() * (b - a);

/**
 * One backdrop treatment. `frame` draws a single frame in stage units; it owns
 * its own particle state, so a factory is called once per mount.
 *
 * `mask` (CSS mask on the canvas) and `glow` (a blurred radial layer under the
 * canvas) are optional per-variant decorations — the shipping grid-pulse sim
 * uses `mask` only; the dev alternates use both.
 */
export interface BackdropSim {
  frame: (ctx: CanvasRenderingContext2D, t: number, stepIndex: number) => void;
  mask?: string;
  glow?: boolean;
}

export type BackdropSimFactory = () => BackdropSim;

/** Key of the variant this deck ships. Kept in sync with PRODUCTION_SIM. */
export const PRODUCTION_KEY = "C";

// ───────────────────── the shipping sim ─────────────────────

export function gridPulseSim(): BackdropSim {
  const G = 96;
  const COLS = Math.floor(STAGE_W / G);
  const ROWS = Math.floor(STAGE_H / G);
  const LIT_RADIUS = 40;

  type Pulse = {
    vertical: boolean;
    line: number;
    pos: number;
    dir: 1 | -1;
    sp: number;
    tail: number;
  };

  const spawn = (): Pulse => {
    const vertical = Math.random() < 0.5;
    const forward = Math.random() < 0.5;
    const span = vertical ? STAGE_H : STAGE_W;
    return {
      vertical,
      line: Math.floor(rand(1, vertical ? COLS : ROWS)) * G,
      pos: forward ? -60 : span + 60,
      dir: forward ? 1 : -1,
      sp: rand(1.1, 2.3),
      tail: rand(70, 130),
    };
  };

  // Seed mid-flight so the first frame is already populated.
  let pulses: Pulse[] = Array.from({ length: 13 }, () => {
    const p = spawn();
    p.pos = rand(0, p.vertical ? STAGE_H : STAGE_W);
    return p;
  });

  return {
    mask:
      "radial-gradient(ellipse 60% 54% at 50% 46%, rgba(0,0,0,0.14) 0%, rgba(0,0,0,0.42) 44%, #000 80%)",

    frame(ctx) {
      // Grid — one path for every line, stroked once.
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(${COPPER.c700},0.16)`;
      ctx.beginPath();
      for (let c = 1; c <= COLS; c++) {
        ctx.moveTo(c * G + 0.5, 0);
        ctx.lineTo(c * G + 0.5, STAGE_H);
      }
      for (let r = 1; r <= ROWS; r++) {
        ctx.moveTo(0, r * G + 0.5);
        ctx.lineTo(STAGE_W, r * G + 0.5);
      }
      ctx.stroke();

      // Pulses — advance, respawn on exit, then draw tail + head.
      pulses = pulses.map((p) => {
        p.pos += p.sp * p.dir;
        const span = p.vertical ? STAGE_H : STAGE_W;
        if (p.pos < -80 || p.pos > span + 80) return spawn();

        const hx = p.vertical ? p.line + 0.5 : p.pos;
        const hy = p.vertical ? p.pos : p.line + 0.5;
        const tx = p.vertical ? hx : p.pos - p.tail * p.dir;
        const ty = p.vertical ? p.pos - p.tail * p.dir : hy;

        const tail = ctx.createLinearGradient(tx, ty, hx, hy);
        tail.addColorStop(0, `rgba(${COPPER.c400},0)`);
        tail.addColorStop(1, `rgba(${COPPER.c300},0.72)`);
        ctx.strokeStyle = tail;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(hx, hy);
        ctx.stroke();

        ctx.fillStyle = `rgba(${COPPER.c200},0.85)`;
        ctx.beginPath();
        ctx.arc(hx, hy, 1.9, 0, Math.PI * 2);
        ctx.fill();
        return p;
      });

      // Intersection dots. 13 columns × 7 rows × 13 pulses is a small enough
      // product to check directly; the axis-delta bail keeps the hypot count
      // near zero on most frames.
      for (let c = 1; c <= COLS; c++) {
        const x = c * G;
        for (let r = 1; r <= ROWS; r++) {
          const y = r * G;
          let lit = 0;
          for (const p of pulses) {
            const px = p.vertical ? p.line : p.pos;
            const py = p.vertical ? p.pos : p.line;
            if (Math.abs(px - x) > LIT_RADIUS) continue;
            if (Math.abs(py - y) > LIT_RADIUS) continue;
            const d = Math.hypot(px - x, py - y);
            if (d < LIT_RADIUS) lit = Math.max(lit, 1 - d / LIT_RADIUS);
          }
          ctx.fillStyle = `rgba(${COPPER.c300},${(0.1 + 0.55 * lit).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(x, y, 1 + 1.4 * lit, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    },
  };
}

const PRODUCTION_SIM: BackdropSimFactory = gridPulseSim;

// ───────────────────── dev-only variant switching ─────────────────────
// The three losing prototype variants and the switcher UI live in
// I1BackdropAlternates.tsx and are reached only through this dynamic import.
// In a production build `import.meta.env.DEV` is `false`, so the whole block
// is dead code and Rollup drops both the import and its chunk — verified by
// grepping dist/ for the alternates' marker strings.

interface SwitcherProps {
  options: readonly string[];
  current: string;
  onChange: (next: string) => void;
}

interface AlternatesModule {
  ALTERNATE_SIMS: Record<string, BackdropSimFactory>;
  BackdropSwitcher: ComponentType<SwitcherProps>;
}

function useAlternates() {
  const [mod, setMod] = useState<AlternatesModule | null>(null);
  useEffect(() => {
    if (!import.meta.env.DEV) return;
    let live = true;
    void import("./I1BackdropAlternates").then((m) => {
      if (live) setMod(m as AlternatesModule);
    });
    return () => {
      live = false;
    };
  }, []);
  return mod;
}

function readProtoParam(): string {
  // Dev only: in a production build the alternates do not exist, so honoring
  // `?proto=A` there would leave the slide with no backdrop at all.
  // (`?variant=` is taken by the berau|general deck build — src/variant.ts.)
  if (!import.meta.env.DEV || typeof window === "undefined") {
    return PRODUCTION_KEY;
  }
  return (
    new URLSearchParams(window.location.search).get("proto") ?? PRODUCTION_KEY
  );
}

// ───────────────────── component ─────────────────────

interface I1BackdropProps {
  stepIndex: number;
  /** Last step the backdrop stays visible for; it fades out after this. */
  visibleThroughStep?: number;
}

export function I1Backdrop({
  stepIndex,
  visibleThroughStep = 1,
}: I1BackdropProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // The sim reads the live step without re-initialising (step-reactive
  // alternates depend on it; the shipping sim ignores it).
  const stepRef = useRef(stepIndex);
  stepRef.current = stepIndex;

  const alternates = useAlternates();
  const [simKey, setSimKey] = useState(readProtoParam);
  const factory: BackdropSimFactory | null =
    simKey === PRODUCTION_KEY
      ? PRODUCTION_SIM
      : (alternates?.ALTERNATE_SIMS[simKey] ?? null);

  const [sim, setSim] = useState<BackdropSim | null>(null);

  useEffect(() => {
    if (!factory) {
      setSim(null);
      return;
    }
    const active = factory();
    setSim(active);

    const canvas = canvasRef.current;
    let ctx: CanvasRenderingContext2D | null = null;
    try {
      ctx = canvas?.getContext("2d") ?? null;
    } catch {
      ctx = null; // jsdom has no canvas backend
    }
    if (!canvas || !ctx) return;

    const draw = (t: number) => {
      ctx!.clearRect(0, 0, STAGE_W, STAGE_H);
      active.frame(ctx!, t, stepRef.current);
    };

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Backing store follows the stage's on-screen scale; the transform keeps
    // drawing in stage units. Re-fitting clears the surface, hence the redraw
    // under reduced motion (where nothing else would repaint).
    const fit = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width < 10) return; // layout not settled; observer re-fires
      const dpr = Math.min(
        2,
        (window.devicePixelRatio || 1) * (rect.width / STAGE_W),
      );
      canvas.width = Math.round(STAGE_W * dpr);
      canvas.height = Math.round(STAGE_H * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduced) draw(performance.now());
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(canvas);

    let raf = 0;
    const tick = (t: number) => {
      draw(t);
      if (!reduced) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick); // reduced motion → one frame only

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [factory]);

  const Switcher = alternates?.BackdropSwitcher;

  return (
    <>
      <div
        data-testid="i1-backdrop"
        data-sim={simKey}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          opacity: stepIndex <= visibleThroughStep ? 1 : 0,
          transition: "opacity 700ms var(--ease)",
        }}
      >
        {sim?.glow && (
          <div
            style={{
              position: "absolute",
              inset: "auto -10% -18% -10%",
              height: "62%",
              background: `radial-gradient(46% 62% at 26% 88%, rgba(${COPPER.c500},0.20), transparent 66%),
                           radial-gradient(42% 58% at 52% 96%, rgba(${COPPER.c400},0.22), transparent 66%),
                           radial-gradient(40% 54% at 80% 90%, rgba(${COPPER.c700},0.26), transparent 66%)`,
              filter: "blur(42px)",
            }}
          />
        )}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            opacity: 0.9,
            maskImage: sim?.mask,
            WebkitMaskImage: sim?.mask,
          }}
        />
      </div>

      {Switcher && (
        <Switcher
          options={["off", "A", "B", PRODUCTION_KEY, "D"]}
          current={simKey}
          onChange={(next) => {
            setSimKey(next);
            const params = new URLSearchParams(window.location.search);
            params.set("proto", next);
            window.history.replaceState(null, "", `?${params.toString()}`);
          }}
        />
      )}
    </>
  );
}
