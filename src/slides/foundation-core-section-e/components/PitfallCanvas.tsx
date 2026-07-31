// Container for the four E.8 pitfall illustrations + caption pair.
//
// Behaviour ported from `claude-design-project/jsx/slides-b.jsx:506-519`:
// when no pitfall is hovered, render nothing; otherwise render the matching
// SMIL animation on top of its caption. All four anims and the PIT_DETAIL
// metadata live in `PitfallAnims.tsx`.
import {
  ConflictAnim,
  ConfusionAnim,
  PitCaption,
  PoisoningAnim,
  type PitfallKind,
} from "./PitfallAnims";
import { DistractionMotion } from "./E9DistractionMotion";

interface PitfallCanvasProps {
  activeKind: PitfallKind | null;
}

export function PitfallCanvas({ activeKind }: PitfallCanvasProps) {
  if (!activeKind) return null;
  return (
    <div
      key={activeKind}
      data-testid="pitfall-canvas"
      data-active={activeKind}
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          width: "100%",
        }}
      >
        {activeKind === "conflict" && <ConflictAnim />}
        {activeKind === "confusion" && <ConfusionAnim />}
        {activeKind === "poisoning" && <PoisoningAnim />}
        {/* Distraction has its own module: the compounding/degradation figure
            is clock-driven rather than SMIL, and carries dev-only variant
            switching (gh#11). See E9DistractionMotion.tsx. */}
        {activeKind === "distraction" && <DistractionMotion />}
      </div>
      <PitCaption kind={activeKind} />
    </div>
  );
}
