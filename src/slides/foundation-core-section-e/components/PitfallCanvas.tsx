// Container for the four E.8 pitfall illustrations + caption pair.
//
// Behaviour ported from `claude-design-project/jsx/slides-b.jsx:506-519`:
// when no pitfall is hovered, render nothing; otherwise render the matching
// SMIL animation on top of its caption. All four anims and the PIT_DETAIL
// metadata live in `PitfallAnims.tsx`.
import {
  ConflictAnim,
  ConfusionAnim,
  DistractionAnim,
  PitCaption,
  PoisoningAnim,
  type PitfallKind,
} from "./PitfallAnims";

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
        {activeKind === "distraction" && <DistractionAnim />}
      </div>
      <PitCaption kind={activeKind} />
    </div>
  );
}
