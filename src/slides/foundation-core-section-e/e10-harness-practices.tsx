import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { PracticeGrid } from "./components/PracticeGrid";
import { e10Content as C } from "./content";

export function E10HarnessPractices() {
  const { stepIndex } = useDeck();
  // Spec §4.10 motion: Space 1 headline; Space 2 top row of 4 cards; Space 3 bottom row.
  const showTopRow = stepIndex >= 1;
  const showBottomRow = stepIndex >= 2;

  const visiblePractices = showBottomRow
    ? C.practices
    : showTopRow
      ? C.practices.slice(0, 4)
      : [];

  return (
    <div className="relative h-full w-full overflow-hidden bg-neutral-900">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <FigLabel section="E" num={10} label="PRACTICES" />

      <div className="relative z-10 mx-auto flex h-full max-w-[92vw] flex-col gap-8 px-12 py-20">
        <h1
          className="font-display text-neutral-50"
          style={{ fontSize: "clamp(2rem, 3vw, 3rem)", lineHeight: 1.1 }}
        >
          {highlight(C.headline, C.headlineKeywords)}
        </h1>

        <div className="flex-1">
          {visiblePractices.length > 0 && (
            <PracticeGrid practices={visiblePractices} />
          )}
        </div>
      </div>
    </div>
  );
}

export const e10Slide: SlideDef = {
  steps: 3,
  animationMode: "step-reveal",
  canonicalPose: 2,
  surface: "dark",
  render: () => <E10HarnessPractices />,
};
