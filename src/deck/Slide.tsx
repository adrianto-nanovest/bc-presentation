import { type CSSProperties, type ReactNode, type MouseEvent } from "react";

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
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
}

const baseStyle: CSSProperties = {
  position: "relative",
  width: "100vw",
  height: "100vh",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
};

export function Slide({
  index,
  animationMode,
  canonicalPose,
  surface = "dark",
  children,
  onClick,
}: SlideProps) {
  // Spec §5.2 — non-interactive slides MUST NOT consume click events on stage,
  // so the speaker can gesture without accidentally advancing.
  const handleClick =
    animationMode === "interactive" && onClick ? onClick : undefined;

  return (
    <section
      data-testid="slide"
      data-slide-index={index}
      data-animation-mode={animationMode}
      data-canonical-pose={canonicalPose}
      data-surface={surface}
      style={{
        ...baseStyle,
        background:
          surface === "dark" ? "var(--surface-dark)" : "var(--surface-light)",
        color:
          surface === "dark" ? "var(--neutral-50)" : "var(--neutral-900)",
      }}
      onClick={handleClick}
    >
      {children}
    </section>
  );
}
