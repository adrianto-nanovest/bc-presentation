// MindsetSilhouette — single closed-path filled silhouette. Used on C.3 to
// depict EXECUTOR (hunched, neutral-500) vs ORCHESTRATOR (expansive, copper-400).
//
// Per spec §9.1 / §3.3: pure flat shapes, no internal stroke detail, no collar
// lines, no desk under executor. Projection-safe at 720p — chunky simplified
// shapes (Otl Aicher pictogram, not anatomical drawing). The orchestrator is
// intentionally taller AND wider than the executor (180×240 vs 160×220): the
// new role expands you.
//
//   • executor      → 160 × 220 viewBox, neutral-500 fill, hunched reaching down
//   • orchestrator  → 180 × 240 viewBox, copper-400 fill, standing tall, arm out
//
// Step-reveal animation (opacity + transform) is owned by the caller and passed
// in via `style` — this component just forwards it verbatim to the <svg>.
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
    return <ExecutorSilhouette size={size ?? 160} style={style} />;
  }
  return <OrchestratorSilhouette size={size ?? 180} style={style} />;
}

// ───────────────────── EXECUTOR ─────────────────────
// Hunched figure at desk, head tilted forward, both arms reaching down to an
// implied keyboard. Single closed filled path — no internal detail.
// ViewBox: 160 × 220. Fill: neutral-500.
function ExecutorSilhouette({
  size,
  style,
}: {
  size: number;
  style?: CSSProperties;
}) {
  const height = Math.round(size * (220 / 160));
  // Path outline, traced clockwise starting at the crown of the head.
  //
  //   • Head: rounded blob centered (~80, 38), tilted slightly forward (right).
  //   • Shoulders: narrow, sloping forward/down.
  //   • Arms: both descend forward to converge on a keyboard slab at y≈150.
  //   • Torso: hunched curve from shoulders down to hips.
  //   • Legs: seated splay — knees forward then feet down to y=220.
  //
  // One continuous outline, closed with Z.
  const d = [
    // Crown of head, top-center, slightly forward (right)
    "M 78 18",
    // Right side of head (forward-leaning skull)
    "C 92 18, 100 26, 100 38",
    "C 100 48, 96 56, 90 60",
    // Neck right side down to right shoulder
    "C 92 64, 94 68, 96 72",
    // Right shoulder slope down and outward
    "C 110 74, 120 82, 124 92",
    // Right upper arm descending forward
    "C 126 104, 124 116, 118 128",
    // Right forearm reaching down to keyboard
    "C 114 138, 108 146, 104 152",
    // Right hand / wrist on keyboard top-right
    "C 104 154, 106 156, 108 158",
    // Across keyboard top-right corner
    "L 124 158",
    // Keyboard right edge down
    "L 124 168",
    // Keyboard bottom-right
    "L 116 168",
    // Under right hand, return back inward (hand bottom)
    "C 110 166, 104 164, 98 160",
    // Continue down right side of torso/thigh
    "C 100 172, 104 184, 110 196",
    // Right shin down to right foot
    "C 114 204, 116 212, 118 220",
    // Right foot bottom
    "L 100 220",
    // Up right inner shin to crotch
    "C 96 208, 92 196, 88 184",
    // Across hips bottom-center
    "L 80 184",
    // Down left inner shin
    "C 76 196, 72 208, 68 220",
    // Left foot bottom
    "L 50 220",
    // Up left outer shin/thigh
    "C 52 212, 54 204, 58 196",
    "C 62 184, 64 172, 66 160",
    // Bottom of left hand
    "C 62 164, 56 166, 50 168",
    // Keyboard bottom-left
    "L 42 168",
    // Keyboard left edge up
    "L 42 158",
    // Keyboard top-left corner
    "L 56 158",
    // Left wrist on keyboard
    "C 58 156, 60 154, 60 152",
    // Left forearm coming up from keyboard
    "C 56 146, 50 138, 46 128",
    // Left upper arm up to shoulder
    "C 40 116, 38 104, 40 92",
    // Left shoulder slope up to neck
    "C 44 82, 54 74, 66 72",
    // Left neck up to head
    "C 68 68, 70 64, 72 60",
    // Left side of head back up to crown
    "C 66 56, 62 48, 62 38",
    "C 62 26, 70 18, 78 18",
    "Z",
  ].join(" ");
  return (
    <svg
      data-testid="mindset-silhouette-executor"
      width={size}
      height={height}
      viewBox="0 0 160 220"
      fill="var(--neutral-500)"
      stroke="none"
      aria-hidden
      style={style}
    >
      <path d={d} />
    </svg>
  );
}

// ───────────────────── ORCHESTRATOR ─────────────────────
// Standing figure, head upright, right arm extended outward in a directing
// gesture (conductor about to cue an orchestra). Single closed filled path.
// ViewBox: 180 × 240 — wider AND taller than executor. Fill: copper-400.
function OrchestratorSilhouette({
  size,
  style,
}: {
  size: number;
  style?: CSSProperties;
}) {
  const height = Math.round(size * (240 / 180));
  // Path outline, traced clockwise from the crown.
  //
  //   • Head: round, upright, centered (~70, 32).
  //   • Shoulders: broad, level.
  //   • Right arm: extends outward to roughly (162, 78) — directing gesture.
  //   • Left arm: relaxed at side.
  //   • Torso: straight trunk.
  //   • Legs: standing, slight stance, feet down at y=240.
  //
  // One continuous outline, closed with Z.
  const d = [
    // Crown of head
    "M 70 10",
    // Right side of head
    "C 84 10, 92 18, 92 32",
    "C 92 42, 88 50, 82 54",
    // Right neck down to right shoulder
    "L 84 64",
    // Right shoulder out to extended-arm root
    "C 96 66, 108 70, 118 74",
    // Right upper arm extending out and slightly up (directing)
    "C 132 76, 146 78, 158 78",
    // Hand / fingertip — chunky rounded tip
    "C 164 78, 168 80, 168 84",
    "C 168 88, 164 90, 158 90",
    // Underside of the extended arm coming back inward
    "C 146 90, 132 90, 118 88",
    "C 108 88, 98 86, 90 84",
    // Down right side of torso to waist
    "L 90 130",
    // Right hip out
    "C 96 132, 100 138, 100 146",
    // Right outer thigh / leg down
    "C 102 168, 104 192, 106 218",
    // Right shin to right foot
    "L 108 240",
    // Right foot bottom
    "L 86 240",
    // Up right inner leg
    "L 84 218",
    "C 82 196, 80 174, 78 152",
    // Crotch / inseam
    "L 72 152",
    // Down left inner leg
    "C 70 174, 68 196, 66 218",
    "L 64 240",
    // Left foot bottom
    "L 42 240",
    // Up left outer leg
    "L 44 218",
    "C 46 192, 48 168, 50 146",
    // Left hip
    "C 50 138, 54 132, 60 130",
    // Up left torso to shoulder
    "L 60 84",
    // Down left arm — relaxed at side. Upper arm.
    "C 56 86, 52 90, 50 100",
    // Left forearm down to hand
    "C 48 110, 46 122, 46 134",
    // Left hand — chunky rounded tip
    "C 46 138, 50 140, 54 140",
    "C 58 140, 62 138, 62 134",
    // Back up inside of left arm
    "C 62 122, 64 110, 66 100",
    "C 68 92, 72 88, 76 86",
    // Up to left shoulder root
    "C 72 80, 68 74, 66 64",
    // Left neck up to jaw
    "L 68 54",
    // Left side of head
    "C 52 50, 48 42, 48 32",
    "C 48 18, 56 10, 70 10",
    "Z",
  ].join(" ");
  return (
    <svg
      data-testid="mindset-silhouette-orchestrator"
      width={size}
      height={height}
      viewBox="0 0 180 240"
      fill="var(--copper-400)"
      stroke="none"
      aria-hidden
      style={style}
    >
      <path d={d} />
    </svg>
  );
}
