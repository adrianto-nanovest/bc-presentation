import { motion } from "framer-motion";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { HoverReveal } from "@/components/HoverReveal";
import { highlight } from "@/components/highlight";
import { ConvergenceCard, type ConvergenceSlot } from "./components/ConvergenceCard";
import { d2Content as C } from "./content";

// Pixel-level geometry of the 5-card layout. Positions are percent-based so
// the layout scales with the slide.
const SLOT_STYLE: Record<ConvergenceSlot, React.CSSProperties> = {
  "bpm-tl":      { top: "20%", left: "10%" },
  "rpa-tr":      { top: "20%", right: "10%" },
  "ai-bc":       { bottom: "12%", left: "50%", transform: "translateX(-50%)" },
  "ipa-c":       { top: "45%", left: "50%", transform: "translate(-50%, -50%)" },
  "agentic-r":   { top: "45%", right: "8%", transform: "translateY(-50%)" },
};

// Which step each card reveals at: BPM=0, RPA=1, AI=2, IPA=3, AGENTIC=4.
const REVEAL_STEP: Record<string, number> = {
  bpm: 0,
  rpa: 1,
  ai: 2,
  ipa: 3,
  agentic: 4,
};

export function D2TheConvergence() {
  const { stepIndex } = useDeck();
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
      <FigLabel section="D" num={2} label="THE CONVERGENCE" />
      <h1
        className="absolute left-12 right-12 top-12 z-10 font-display text-neutral-50"
        style={{ fontSize: "2.4rem", lineHeight: 1.2 }}
      >
        {highlight(C.headline, C.headlineKeywords)}
      </h1>

      {/* Convergence cards */}
      {C.cards.map((card) => (
        <motion.div
          key={card.key}
          className="absolute"
          style={SLOT_STYLE[card.position]}
          initial={{ opacity: 0, y: 8 }}
          animate={{
            opacity: stepIndex >= REVEAL_STEP[card.key] ? 1 : 0,
            y: stepIndex >= REVEAL_STEP[card.key] ? 0 : 8,
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <HoverReveal
            position="below"
            trigger={
              <ConvergenceCard
                title={card.title}
                subName={card.subName}
                tagline={card.tagline}
                taglineKeywords={card.taglineKeywords}
                bullets={card.bullets}
                copperStop={card.copperStop}
                position={card.position}
              />
            }
            payload={
              <span className="block max-w-[420px] border border-copper-500 bg-neutral-900 p-4 font-serif italic text-neutral-100 shadow" style={{ fontSize: "0.95rem", lineHeight: 1.45 }}>
                {card.hoverAnalogy}
              </span>
            }
          />
        </motion.div>
      ))}

      {/* Connector arrows — drawn over the cards. SVG occupies the full slide.
          viewBox 0..100 maps directly to the percent geometry of SLOT_STYLE,
          stretched non-uniformly so the integers below read as percent x/y. */}
      <svg
        className="pointer-events-none absolute inset-0 z-0"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        data-testid="d2-arrows"
      >
        {/* BPM → IPA */}
        <motion.path
          d="M 20 25 L 45 45"
          stroke="#7a4626"
          strokeWidth={1.5}
          fill="none"
          markerEnd="url(#d2-arrowhead)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: stepIndex >= 3 ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />
        {/* RPA → IPA */}
        <motion.path
          d="M 80 25 L 55 45"
          stroke="#7a4626"
          strokeWidth={1.5}
          fill="none"
          markerEnd="url(#d2-arrowhead)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: stepIndex >= 3 ? 1 : 0 }}
          transition={{ duration: 0.2, delay: stepIndex >= 3 ? 0.2 : 0 }}
        />
        {/* AI → IPA */}
        <motion.path
          d="M 50 80 L 50 55"
          stroke="#7a4626"
          strokeWidth={1.5}
          fill="none"
          markerEnd="url(#d2-arrowhead)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: stepIndex >= 3 ? 1 : 0 }}
          transition={{ duration: 0.2, delay: stepIndex >= 3 ? 0.4 : 0 }}
        />
        {/* IPA → AGENTIC */}
        <motion.path
          d="M 55 45 L 80 45"
          stroke="#7a4626"
          strokeWidth={1.5}
          fill="none"
          markerEnd="url(#d2-arrowhead)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: stepIndex >= 4 ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        <defs>
          <marker id="d2-arrowhead" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#7a4626" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

export const d2Slide: SlideDef = {
  steps: 5,
  animationMode: "step-reveal",
  canonicalPose: 4,
  surface: "dark",
  section: "D",
  render: () => <D2TheConvergence />,
};
