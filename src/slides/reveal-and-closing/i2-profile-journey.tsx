// src/slides/reveal-and-closing/i2-profile-journey.tsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { HeroPhoto } from "@/components/HeroPhoto";
import {
  JourneyTimeline,
  type JourneyAnchor,
} from "./components/JourneyTimeline";
import { highlight } from "@/components/highlight";
import { i2Content as C } from "./content";

const TITLE_TO_CONTENT_DELAY_MS = 550;
const PROFILE_STAGGER_MS = 150;

export function I2ProfileJourney() {
  const { stepIndex } = useDeck();

  // Step 2 reveal: title appears first, content (timeline animation) follows
  // after TITLE_TO_CONTENT_DELAY_MS so the audience reads the title before
  // the rail/circles draw attention.
  const titleOn = stepIndex >= 1;
  const [contentOn, setContentOn] = useState(false);
  useEffect(() => {
    if (!titleOn) {
      setContentOn(false);
      return;
    }
    const t = window.setTimeout(() => setContentOn(true), TITLE_TO_CONTENT_DELAY_MS);
    return () => window.clearTimeout(t);
  }, [titleOn]);

  const anchors: JourneyAnchor[] = C.timeline.anchors.map((a) => ({
    id: a.id,
    label: a.label,
    icon: a.icon,
    bullets: a.bullets,
  }));

  return (
    <div className="relative h-full w-full overflow-hidden">
      <HeroPhoto src="/heroes/i2-night-workspace.jpg" alt="" vignetteSide="bottom-left" />

      {/* Darken overlay constrained to the timeline region — keeps the rail
          and bullet text legible against the bright lamp/laptop area. */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 380,
          bottom: 0,
          background:
            "linear-gradient(180deg, rgba(10,10,10,0.35) 0%, rgba(10,10,10,0.78) 35%, rgba(10,10,10,0.85) 100%)",
          zIndex: 12,
        }}
      />

      <FigLabel section="I" num={2} label="THE JOURNEY" />

      <div className="slide-headline-row" style={{ zIndex: 20 }}>
        <h1 className="slide-headline small">
          {highlight("Introduction", ["Introduction"] as const)}. Who {highlight("am I", ["am I"] as const)}.
        </h1>
      </div>

      {/* Profile block — staggered entry on slide mount. */}
      <div
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          top: 200,
          zIndex: 20,
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="font-display tracking-wide text-neutral-50"
          style={{ fontSize: "2.8rem", lineHeight: 1.05 }}
        >
          {C.name}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: PROFILE_STAGGER_MS / 1000,
            ease: "easeOut",
          }}
          className="font-display"
          style={{
            fontSize: "1.4rem",
            lineHeight: 1.25,
            color: "var(--neutral-300)",
          }}
        >
          {highlight(C.role.text, C.role.keywords)}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: (PROFILE_STAGGER_MS * 2) / 1000,
            ease: "easeOut",
          }}
          className="font-serif"
          style={{
            fontSize: "1.3rem",
            lineHeight: 1.3,
            color: "var(--neutral-300)",
          }}
        >
          {highlight(C.delivery.text, C.delivery.keywords)}
        </motion.div>
      </div>

      {/* Timeline title — step 2 reveal, fades in BEFORE the timeline content. */}
      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: titleOn ? 1 : 0, y: titleOn ? 0 : -4 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          top: 388,
          zIndex: 20,
          fontFamily: "var(--mono)",
          fontSize: 12,
          letterSpacing: "0.22em",
          color: "var(--copper-300)",
          textTransform: "uppercase",
        }}
      >
        — {C.timeline.title}
      </motion.div>

      {/* Journey timeline — content reveal lags the title by TITLE_TO_CONTENT_DELAY_MS. */}
      <div
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          top: 420,
          bottom: 96,
          zIndex: 20,
        }}
      >
        <JourneyTimeline
          anchors={anchors}
          segments={C.timeline.segments}
          on={contentOn}
          boxWidth={210}
          highlight={highlight}
        />
      </div>
    </div>
  );
}

export const i2Slide: SlideDef = {
  steps: 2,
  animationMode: "step-reveal",
  canonicalPose: 1,
  surface: "dark",
  section: "I",
  render: () => <I2ProfileJourney />,
};
