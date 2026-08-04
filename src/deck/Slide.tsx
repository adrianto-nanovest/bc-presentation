import { type CSSProperties, type ReactNode } from "react";
import { useDeck } from "./DeckContext";
import { useViewportScale } from "./useViewportScale";
import { NavBar } from "./NavBar";
import { SlideNumberProvider } from "./SlideNumberContext";
import type { SectionKey } from "./sections";

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
  // The slide's DERIVED position, published to its chrome via
  // SlideNumberContext and handed to the NavBar, so no slide has to name its own
  // letter or figure number (§3.5). There is NO `section` prop: a second,
  // caller-supplied letter is exactly what could disagree with this one.
  // Required, not optional: the caller reads them off the composed deck, and a
  // default here would silently print a wrong number instead of failing.
  letter: string;
  num: number | null;
  sectionKey: SectionKey;
  children: ReactNode;
}

// Stage dimensions (1280×720) are owned by `.stage-wrap` / `.stage` rules in
// src/styles/globals.css — see useViewportScale.ts. We only set cursor here.
const stageStyle: CSSProperties = {
  cursor: "pointer",
};

// PROTOTYPE gh#15 — slides that stay fully dark in light theme (user call:
// title, every BRIDGE slide, I.2). Indices match the current registry order.
const GH15_DARK_SLIDES = new Set([
  0,  // Title
  12, // C.6  BRIDGE · FROM MINDSET TO MECHANICS
  29, // E.12 BRIDGE · BUILT
  38, // F.9  BRIDGE · CROSSED
  49, // G.11 BRIDGE · WIELD
  52, // H.3  BRIDGE · DISCIPLINE
  54, // I.2  THE JOURNEY
  56, // I.4  BRIDGE · RECIPE
]);

export function Slide({
  index,
  animationMode,
  canonicalPose,
  surface = "dark",
  letter,
  num,
  sectionKey,
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
          {...(import.meta.env.DEV && GH15_DARK_SLIDES.has(index)
            ? { "data-gh15-dark": "" }
            : {})}
          style={stageStyle}
          onClick={handleClick}
        >
          {/* The NavBar prints the same composed letter the FigLabel inside
              `children` does — one value, one source. It takes the letter as a
              prop rather than reading the context because it is rendered right
              here, by the component that already holds it. */}
          <SlideNumberProvider value={{ letter, num, sectionKey }}>
            {children}
            <NavBar letter={letter} />
          </SlideNumberProvider>
        </div>
      </div>
    </div>
  );
}
