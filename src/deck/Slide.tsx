import { type CSSProperties, type ReactNode } from "react";
import { useDeck } from "./DeckContext";
import { useViewportScale } from "./useViewportScale";
import { NavBar } from "./NavBar";
import type { SlideSection } from "./types";

export type AnimationMode =
  | "interactive"
  | "looping-ambient"
  | "step-reveal"
  | "static";

export interface SlideProps {
  index: number;
  animationMode: AnimationMode;
  // Index of the step that PDF/PPTX export should pause at before
  // screenshotting (spec §4.1). 0 for static slides.
  canonicalPose: number;
  surface?: "dark" | "light";
  section: SlideSection;
  children: ReactNode;
}

// Stage dimensions (1280×720) are owned by `.stage-wrap` / `.stage` rules in
// src/styles/globals.css — see useViewportScale.ts. We only set cursor here.
const stageStyle: CSSProperties = {
  cursor: "pointer",
};

export function Slide({
  index,
  animationMode,
  canonicalPose,
  surface = "dark",
  section,
  children,
}: SlideProps) {
  const scale = useViewportScale();
  const { advance } = useDeck();

  // Click-to-advance: any click inside the stage advances one step (with
  // spillover into the next slide), unless the click target sits inside an
  // interactive element or carries an explicit `data-no-advance` opt-out.
  // The NavBar uses `data-no-advance` on its outer `.nav-zone` wrapper.
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const t = e.target as HTMLElement | null;
    if (t?.closest("button, a, input, textarea, select, [data-no-advance]")) {
      return;
    }
    advance();
  };

  return (
    <div className="viewport">
      <div className="stage-wrap" style={{ transform: `scale(${scale})` }}>
        <div
          className={`stage ${surface === "light" ? "light" : ""}`}
          data-testid="slide"
          data-slide-index={index}
          data-animation-mode={animationMode}
          data-canonical-pose={canonicalPose}
          data-surface={surface}
          style={stageStyle}
          onClick={handleClick}
        >
          {children}
          <NavBar section={section} />
        </div>
      </div>
    </div>
  );
}
