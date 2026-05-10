// Canvas2D 4-ring "copper ladder" funnel (slide E.7).
//
// Ported from `claude-design-project/jsx/funnel.jsx` (entire file). Particles
// flow left → right through four elliptical rings (WRITE → SELECT →
// COMPRESS → ISOLATE); the ring whose index matches `hoveredIndex` glows
// stronger than the others. The animation runs on requestAnimationFrame and
// is sized to the parent via ResizeObserver.
//
// `hoveredIndex` is read through a ref inside the rAF loop so the loop does
// not restart when the parent re-renders on hover changes.
import { useEffect, useRef } from "react";

export interface FunnelAnimationProps {
  /** 0..3 → corresponding ring glows; null → no glow. */
  hoveredIndex: number | null;
}

interface Ring {
  color: string;
  cx: number;
  cy: number;
  rx: number;
  ry: number;
}

interface Dot {
  spawnY: number;
  coreY: number;
  exitY: number;
  x: number;
  speed: number;
  jitter: number;
  phase: number;
  baseSize: number;
  pulse: number;
}

export function FunnelAnimation({ hoveredIndex }: FunnelAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const hoverRef = useRef<number | null>(hoveredIndex);

  useEffect(() => {
    hoverRef.current = hoveredIndex;
  }, [hoveredIndex]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!canvas || !stage) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let DPR = 1;
    let raf = 0;

    // Copper ladder: WRITE (700) → SELECT (600) → COMPRESS (500) → ISOLATE (400)
    const rings: Ring[] = [
      { color: "#7a4626", cx: 0, cy: 0, rx: 0, ry: 0 },
      { color: "#9c5a30", cx: 0, cy: 0, rx: 0, ry: 0 },
      { color: "#b86e3d", cx: 0, cy: 0, rx: 0, ry: 0 },
      { color: "#c98548", cx: 0, cy: 0, rx: 0, ry: 0 },
    ];

    const layout = () => {
      const cxs = [0.20, 0.40, 0.60, 0.80];
      rings.forEach((r, i) => {
        r.cx = cxs[i];
        r.cy = 0.5;
        r.rx = 0.040;
        r.ry = 0.34;
      });
    };
    layout();

    function resize() {
      const rect = stage!.getBoundingClientRect();
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = rect.width;
      H = rect.height;
      canvas!.width = W * DPR;
      canvas!.height = H * DPR;
      ctx!.setTransform(DPR, 0, 0, DPR, 0, 0);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(stage);

    const NUM_DOTS = 200;
    const SPEED = 0.06;
    const RING_INSIDE_TOP = 0.5 - 0.30;
    const RING_INSIDE_BOT = 0.5 + 0.30;

    function makeDot(initialX?: number): Dot {
      const spawnY = 0.04 + Math.random() * 0.92;
      const coreY = RING_INSIDE_TOP + Math.random() * (RING_INSIDE_BOT - RING_INSIDE_TOP);
      const exitY = 0.04 + Math.random() * 0.92;
      return {
        spawnY,
        coreY,
        exitY,
        x: initialX !== undefined ? initialX : -0.05 - Math.random() * 0.4,
        speed: SPEED * (0.85 + Math.random() * 0.3),
        jitter: (Math.random() - 0.5) * 0.010,
        phase: Math.random() * Math.PI * 2,
        baseSize: 2.2 + Math.random() * 1.2,
        pulse: 0,
      };
    }

    const dots: Dot[] = [];
    for (let i = 0; i < NUM_DOTS; i++) {
      dots.push(makeDot(-0.1 + Math.random() * 1.25));
    }

    function smooth(t: number) {
      t = Math.max(0, Math.min(1, t));
      return t * t * (3 - 2 * t);
    }

    function particleY(d: Dot) {
      const r0 = rings[0];
      const rL = rings[rings.length - 1];
      const xConvergeStart = 0.0;
      const xConvergeEnd = r0.cx - r0.rx * 0.2;
      const xSpreadStart = rL.cx + rL.rx * 0.2;
      const xSpreadEnd = 1.0;
      let y;
      if (d.x <= xConvergeStart) y = d.spawnY;
      else if (d.x < xConvergeEnd) {
        const t = smooth((d.x - xConvergeStart) / (xConvergeEnd - xConvergeStart));
        y = d.spawnY + (d.coreY - d.spawnY) * t;
      } else if (d.x <= xSpreadStart) y = d.coreY;
      else if (d.x < xSpreadEnd) {
        const t = smooth((d.x - xSpreadStart) / (xSpreadEnd - xSpreadStart));
        y = d.coreY + (d.exitY - d.coreY) * t;
      } else y = d.exitY;
      return y + d.jitter + Math.sin(d.phase * 0.7) * 0.0015;
    }

    function justCrossed(prevX: number, x: number, ringX: number) {
      return prevX < ringX && x >= ringX;
    }
    function ringInfluence(x: number, ring: Ring) {
      const dx = Math.abs(x - ring.cx);
      const reach = ring.rx * 1.35;
      if (dx > reach) return 0;
      return 1 - dx / reach;
    }

    function drawGridDot(px: number, py: number, r: number, alpha: number) {
      ctx!.beginPath();
      ctx!.arc(px, py, r, 0, Math.PI * 2);
      ctx!.fillStyle = `rgba(229,229,229,${alpha})`;
      ctx!.fill();
    }
    function drawGlowDot(px: number, py: number, r: number, color: string, intensity: number) {
      const grad = ctx!.createRadialGradient(px, py, 0, px, py, r * 4);
      grad.addColorStop(0, color);
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx!.globalAlpha = 0.55 * intensity;
      ctx!.fillStyle = grad;
      ctx!.beginPath();
      ctx!.arc(px, py, r * 4, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.globalAlpha = 1;
      ctx!.beginPath();
      ctx!.arc(px, py, r, 0, Math.PI * 2);
      ctx!.fillStyle = color;
      ctx!.fill();
    }

    interface ArrowOpts {
      headLen?: number;
      thickness?: number;
      color?: string;
    }

    function drawArrow(x1: number, y1: number, x2: number, y2: number, opts: ArrowOpts = {}) {
      const headLen = opts.headLen || 10;
      const thickness = opts.thickness || 8;
      const color = opts.color || "rgba(229,229,229,0.85)";
      const ang = Math.atan2(y2 - y1, x2 - x1);
      ctx!.strokeStyle = color;
      ctx!.lineWidth = thickness;
      ctx!.lineCap = "butt";
      ctx!.beginPath();
      ctx!.moveTo(x1, y1);
      ctx!.lineTo(x2 - Math.cos(ang) * headLen, y2 - Math.sin(ang) * headLen);
      ctx!.stroke();
      ctx!.fillStyle = color;
      ctx!.beginPath();
      const h = headLen;
      const w = thickness * 1.6;
      ctx!.moveTo(x2, y2);
      ctx!.lineTo(x2 - Math.cos(ang) * h - Math.cos(ang - Math.PI / 2) * w, y2 - Math.sin(ang) * h - Math.sin(ang - Math.PI / 2) * w);
      ctx!.lineTo(x2 - Math.cos(ang) * h - Math.cos(ang + Math.PI / 2) * w, y2 - Math.sin(ang) * h - Math.sin(ang + Math.PI / 2) * w);
      ctx!.closePath();
      ctx!.fill();
    }
    function drawCurvedArrow(
      p0: { x: number; y: number },
      p1: { x: number; y: number },
      p2: { x: number; y: number },
      opts: ArrowOpts = {},
    ) {
      const thickness = opts.thickness || 8;
      const color = opts.color || "rgba(229,229,229,0.85)";
      const headLen = opts.headLen || 10;
      const w = thickness * 1.6;
      const ang = Math.atan2(p2.y - p1.y, p2.x - p1.x);
      const tipX = p2.x;
      const tipY = p2.y;
      const shaftEndX = p2.x - Math.cos(ang) * headLen * 0.6;
      const shaftEndY = p2.y - Math.sin(ang) * headLen * 0.6;
      ctx!.strokeStyle = color;
      ctx!.lineWidth = thickness;
      ctx!.lineCap = "butt";
      ctx!.beginPath();
      ctx!.moveTo(p0.x, p0.y);
      ctx!.quadraticCurveTo(p1.x, p1.y, shaftEndX, shaftEndY);
      ctx!.stroke();
      ctx!.fillStyle = color;
      ctx!.beginPath();
      ctx!.moveTo(tipX, tipY);
      ctx!.lineTo(tipX - Math.cos(ang) * headLen - Math.cos(ang - Math.PI / 2) * w, tipY - Math.sin(ang) * headLen - Math.sin(ang - Math.PI / 2) * w);
      ctx!.lineTo(tipX - Math.cos(ang) * headLen - Math.cos(ang + Math.PI / 2) * w, tipY - Math.sin(ang) * headLen - Math.sin(ang + Math.PI / 2) * w);
      ctx!.closePath();
      ctx!.fill();
    }

    function drawRing(r: Ring, glow: number) {
      const cx = r.cx * W;
      const cy = r.cy * H;
      const rx = r.rx * W;
      const ry = r.ry * H;
      ctx!.save();
      ctx!.translate(cx, cy);
      if (glow > 0.01) {
        const haloR = Math.max(rx, ry) * (1.6 + glow * 0.6);
        const grad = ctx!.createRadialGradient(0, 0, 0, 0, 0, haloR);
        grad.addColorStop(0, r.color);
        grad.addColorStop(0.35, r.color);
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx!.globalAlpha = 0.32 * glow;
        ctx!.fillStyle = grad;
        ctx!.beginPath();
        ctx!.ellipse(0, 0, haloR, haloR, 0, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.globalAlpha = 1;
      }
      const baseLine = Math.max(5, W * 0.0055);
      ctx!.lineWidth = baseLine * (1 + glow * 0.6);
      ctx!.lineCap = "round";
      if (glow > 0.01) {
        ctx!.shadowColor = r.color;
        ctx!.shadowBlur = 18 + glow * 32;
      }
      ctx!.globalAlpha = 0.55 + 0.45 * glow;
      ctx!.strokeStyle = r.color;
      ctx!.beginPath();
      ctx!.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
      ctx!.stroke();
      ctx!.globalAlpha = 1;
      ctx!.shadowBlur = 0;
      if (glow > 0.01) {
        ctx!.globalAlpha = glow * 0.85;
        ctx!.lineWidth = baseLine * 0.45;
        ctx!.strokeStyle = "#ffffff";
        ctx!.beginPath();
        ctx!.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
        ctx!.stroke();
        ctx!.globalAlpha = 1;
      }
      ctx!.lineWidth = Math.max(1.5, W * 0.0015);
      ctx!.strokeStyle = "rgba(255,255,255,0.18)";
      ctx!.beginPath();
      ctx!.ellipse(0, -ry * 0.02, rx * 0.92, ry * 0.96, 0, Math.PI * 1.05, Math.PI * 1.95);
      ctx!.stroke();
      ctx!.restore();
    }

    const ringGlows = rings.map(() => 0);

    let last = performance.now();
    function frame(now: number) {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      ctx!.clearRect(0, 0, W, H);

      const target = hoverRef.current;
      const easeSpeed = 5.0;
      for (let k = 0; k < rings.length; k++) {
        const t = target === k ? 1 : 0;
        ringGlows[k] += (t - ringGlows[k]) * Math.min(1, dt * easeSpeed);
      }

      const arrowColor = "rgba(229,229,229,0.65)";
      const arrowThk = Math.max(6, H * 0.018);
      const arrowHead = Math.max(10, H * 0.030);
      const r0 = rings[0];
      const rL = rings[rings.length - 1];
      const r0LeftX = (r0.cx - r0.rx) * W;
      const rLRightX = (rL.cx + rL.rx) * W;
      const ringTopY = (r0.cy - r0.ry * 0.55) * H;
      const ringBotY = (r0.cy + r0.ry * 0.55) * H;
      const farLeftX = 0.025 * W;
      const farRightX = 0.975 * W;
      const farTopY = 0.10 * H;
      const farBotY = 0.90 * H;

      drawCurvedArrow({ x: farLeftX, y: farTopY }, { x: r0LeftX - 0.02 * W, y: farTopY }, { x: r0LeftX, y: ringTopY }, { color: arrowColor, thickness: arrowThk, headLen: arrowHead });
      drawCurvedArrow({ x: farLeftX, y: farBotY }, { x: r0LeftX - 0.02 * W, y: farBotY }, { x: r0LeftX, y: ringBotY }, { color: arrowColor, thickness: arrowThk, headLen: arrowHead });

      for (let i = 0; i < rings.length - 1; i++) {
        const a = rings[i];
        const b = rings[i + 1];
        const ax = (a.cx + a.rx) * W;
        const bx = (b.cx - b.rx) * W;
        const yMid = a.cy * H;
        drawArrow(ax + 6, yMid - 0.18 * H, bx - 6, yMid - 0.18 * H, { color: arrowColor, thickness: arrowThk, headLen: arrowHead });
        drawArrow(ax + 6, yMid + 0.18 * H, bx - 6, yMid + 0.18 * H, { color: arrowColor, thickness: arrowThk, headLen: arrowHead });
      }

      drawCurvedArrow({ x: rLRightX, y: ringTopY }, { x: rLRightX + 0.02 * W, y: farTopY }, { x: farRightX, y: farTopY }, { color: arrowColor, thickness: arrowThk, headLen: arrowHead });
      drawCurvedArrow({ x: rLRightX, y: ringBotY }, { x: rLRightX + 0.02 * W, y: farBotY }, { x: farRightX, y: farBotY }, { color: arrowColor, thickness: arrowThk, headLen: arrowHead });

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        const prevX = d.x;
        d.x += d.speed * dt;
        d.phase += dt;
        let intensity = 0;
        let nearestRingColor: string | null = null;
        let nearestGlow = 0;
        for (let k = 0; k < rings.length; k++) {
          const R = rings[k];
          const inf = ringInfluence(d.x, R);
          if (inf > intensity) {
            intensity = inf;
            nearestRingColor = R.color;
            nearestGlow = ringGlows[k];
          }
          if (justCrossed(prevX, d.x, R.cx)) d.pulse = 1;
        }
        d.pulse = Math.max(0, d.pulse - dt * 1.6);

        let alpha = 1;
        if (d.x < 0) alpha = Math.max(0, 1 + d.x / 0.05);
        if (d.x > 1.0) alpha = Math.max(0, 1 - (d.x - 1.0) / 0.05);

        const yRel = particleY(d);
        const px = d.x * W;
        const py = yRel * H;
        const baseR = d.baseSize * (W / 1280);
        const boost = Math.max(intensity, d.pulse);
        const r = baseR * (1 + boost * 1.0);
        const dotAlpha = (0.55 + 0.35 * (1 - boost * 0.4)) * alpha;

        if (boost > 0.05 && nearestRingColor) {
          ctx!.save();
          ctx!.globalAlpha = alpha;
          const glowMul = 0.5 + boost * 0.5 + nearestGlow * 0.6;
          drawGlowDot(px, py, r * (1 + d.pulse * 0.4 + nearestGlow * 0.25), nearestRingColor, glowMul);
          ctx!.restore();
        } else {
          drawGridDot(px, py, r, Math.min(1, dotAlpha));
        }

        if (d.x > 1.05) Object.assign(d, makeDot(-0.05 - Math.random() * 0.1));
      }

      for (let i = 0; i < rings.length; i++) drawRing(rings[i], ringGlows[i]);

      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <div
      ref={stageRef}
      data-testid="funnel-animation"
      style={{ position: "relative", width: "100%", height: "100%" }}
    >
      <canvas
        ref={canvasRef}
        data-testid="funnel-animation-canvas"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />
    </div>
  );
}
