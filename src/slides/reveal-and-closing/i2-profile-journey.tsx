// src/slides/reveal-and-closing/i2-profile-journey.tsx
import { motion } from "framer-motion";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "./components/FigLabel";
import { HeroPhoto } from "./components/HeroPhoto";
import { Timeline, type TimelineAnchor } from "./components/Timeline";
import { highlight } from "./components/highlight";
import { HoverReveal } from "./components/HoverReveal";
import { i2Content as C } from "./content";

export function I2ProfileJourney() {
  const { stepIndex } = useDeck();
  const linesRevealed = stepIndex >= 1;
  // Timeline reveal: Space 2 → axis + Mar; Space 3 → segment + Sep; Space 4 → Today.
  const anchorsRevealed =
    stepIndex >= 4 ? 3 : stepIndex >= 3 ? 2 : stepIndex >= 2 ? 1 : 0;
  const lines = [
    {
      key: "name",
      content: <span className="font-display tracking-wide text-neutral-50" style={{ fontSize: "clamp(2.75rem, 4.5vw, 4.5rem)", lineHeight: 1.05 }}>{C.name}</span>,
    },
    {
      key: "role",
      content: <span className="font-display text-neutral-50" style={{ fontSize: "clamp(1.75rem, 2.75vw, 2.75rem)", lineHeight: 1.2 }}>{highlight(C.role.text, C.role.keywords)}</span>,
    },
    {
      key: "delivery",
      content: <span className="font-serif text-neutral-50" style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.5rem)", lineHeight: 1.35 }}>{highlight(C.delivery.text, C.delivery.keywords)}</span>,
    },
    {
      key: "credentials",
      // The "Computer Vision" keyword also gets a HoverReveal per spec §4.2.
      content: (
        <span className="font-serif italic text-neutral-300" style={{ fontSize: "clamp(1.1rem, 1.7vw, 1.75rem)", lineHeight: 1.4 }}>
          ITB Electrical Eng · Chosun M.S.{" "}
          <HoverReveal
            trigger={<em className="text-copper-400 italic">Computer Vision</em>}
            payload={<span className="block max-w-[320px] border border-copper-500 bg-neutral-900 p-4 font-serif italic text-neutral-100" style={{ fontSize: "0.9rem" }}>{C.timeline.cvHover}</span>}
          />{" "}
          · 8+ yrs PM (Toppan Ecquaria · Blibli)
        </span>
      ),
    },
  ];
  const anchors: TimelineAnchor[] = C.timeline.anchors.map((a) => ({
    id: a.id,
    label: a.label,
    hover: a.hover,
    caption: a.captionKeywords ? highlight(a.caption, a.captionKeywords) : a.caption,
  }));
  return (
    <div className="relative h-full w-full">
      <HeroPhoto src="/heroes/i2-night-workspace.jpg" alt="" vignetteSide="bottom-left" />
      <FigLabel section="I" num={2} label="THE JOURNEY" />
      <div className="absolute bottom-12 left-12 z-20 flex max-w-[90vw] flex-col gap-12">
        <div className="flex flex-col gap-5">
          {lines.map((l, i) => (
            <motion.div
              key={l.key}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: linesRevealed ? 1 : 0, y: linesRevealed ? 0 : 6 }}
              transition={{ duration: 0.3, delay: linesRevealed ? i * 0.1 : 0 }}
            >
              {l.content}
            </motion.div>
          ))}
        </div>
        <Timeline
          anchors={anchors}
          segmentLabel={C.timeline.segmentLabel}
          anchorsRevealed={anchorsRevealed}
          ambient={anchorsRevealed >= 3}
        />
      </div>
    </div>
  );
}

export const i2Slide: SlideDef = {
  steps: 5,
  animationMode: "step-reveal",
  canonicalPose: 4,
  surface: "dark",
  render: () => <I2ProfileJourney />,
};
