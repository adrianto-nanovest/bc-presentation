// MindsetSilhouette — vector SVG icon, neutral or copper variant. Used on
// C.3 to depict EXECUTOR (hunched, neutral) vs ORCHESTRATOR (expansive, copper).
//
// Visual storytelling: the orchestrator silhouette is intentionally taller and
// wider than the executor — head up, broader shoulders, one arm directing
// outward. This is the literal embodiment of the slide's argument: the new
// role expands you.
//
//   • executor      → 140 × 200 viewBox, neutral-500, hunched over keyboard
//   • orchestrator  → 160 × 220 viewBox, copper-400, standing tall, arm out
import type { CSSProperties } from "react";

export interface MindsetSilhouetteProps {
  variant: "executor" | "orchestrator";
  /** Render width in px. Height is derived from the variant's aspect ratio. */
  size?: number;
  style?: CSSProperties;
}

export function MindsetSilhouette({
  variant,
  size,
  style,
}: MindsetSilhouetteProps) {
  if (variant === "executor") {
    return <ExecutorSilhouette size={size ?? 140} style={style} />;
  }
  return <OrchestratorSilhouette size={size ?? 160} style={style} />;
}

// ───────────────────── EXECUTOR ─────────────────────
// Hunched person leaning over a keyboard. Narrow shoulders, head tilted
// down, slight forward curve through the spine. Neutral-500 stroke — the
// dimmer, "before" tone. ViewBox: 140 × 200.
function ExecutorSilhouette({
  size,
  style,
}: {
  size: number;
  style?: CSSProperties;
}) {
  const height = Math.round(size * (200 / 140));
  return (
    <svg
      data-testid="mindset-silhouette-executor"
      width={size}
      height={height}
      viewBox="0 0 140 200"
      fill="none"
      stroke="var(--neutral-500)"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      style={style}
    >
      {/* Head — tilted slightly forward, smaller */}
      <circle cx="68" cy="40" r="14" />

      {/* Neck — short, leaning forward */}
      <path d="M68 54 L70 64" />

      {/* Shoulders — narrow, sloped down */}
      <path d="M52 70 L70 64 L88 70" />

      {/* Spine — slight forward curve (hunch) */}
      <path d="M70 64 Q 72 90 76 116" />

      {/* Arms — both forward, reaching toward an unseen keyboard.
          Upper arm down, forearm forward and slightly down. */}
      <path d="M52 70 L48 102 L72 118" />
      <path d="M88 70 L92 102 L74 120" />

      {/* Keyboard — a thin horizontal line in front of the hands */}
      <path
        d="M44 122 L102 122"
        stroke="var(--neutral-600, var(--neutral-500))"
        strokeWidth="1"
        opacity="0.7"
      />

      {/* Hips — narrow */}
      <path d="M64 132 L88 132" />

      {/* Legs — seated, bent at the knee (the chair is implied) */}
      <path d="M66 132 L60 168 L60 188" />
      <path d="M86 132 L92 168 L92 188" />

      {/* Chair seat hint — a faint horizontal line */}
      <path
        d="M50 170 L102 170"
        stroke="var(--neutral-600, var(--neutral-500))"
        strokeWidth="1"
        opacity="0.5"
      />
    </svg>
  );
}

// ───────────────────── ORCHESTRATOR ─────────────────────
// Person standing tall with broad shoulders, head up, one arm extended
// outward (directing). Copper-400 stroke — the active, "after" tone.
// ViewBox: 160 × 220, slightly larger overall to read as expanded.
function OrchestratorSilhouette({
  size,
  style,
}: {
  size: number;
  style?: CSSProperties;
}) {
  const height = Math.round(size * (220 / 160));
  return (
    <svg
      data-testid="mindset-silhouette-orchestrator"
      width={size}
      height={height}
      viewBox="0 0 160 220"
      fill="none"
      stroke="var(--copper-400)"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      style={style}
    >
      {/* Head — upright, slightly larger than executor */}
      <circle cx="76" cy="38" r="16" />

      {/* Neck — upright */}
      <path d="M76 54 L76 66" />

      {/* Shoulders — broader, level */}
      <path d="M52 72 L76 66 L100 72" />

      {/* Spine — straight, standing tall */}
      <path d="M76 66 L76 138" />

      {/* Left arm — at the side, hand resting near the hip */}
      <path d="M52 72 L46 116 L52 144" />

      {/* Right arm — extended outward, directing. Upper arm out,
          forearm angled up slightly (gesture of conducting). */}
      <path d="M100 72 L130 84 L150 70" />

      {/* Hand at the end of the directing arm — small open mark */}
      <circle cx="150" cy="70" r="3" fill="var(--copper-400)" />

      {/* Hips — broader than executor */}
      <path d="M62 144 L94 144" />

      {/* Legs — standing tall, slight stance */}
      <path d="M68 144 L62 188 L62 210" />
      <path d="M90 144 L96 188 L96 210" />

      {/* Ground line — a faint copper hairline under the feet, suggesting
          stability/standing rather than seated. */}
      <path
        d="M44 212 L114 212"
        stroke="var(--copper-700)"
        strokeWidth="1"
        opacity="0.6"
      />
    </svg>
  );
}
