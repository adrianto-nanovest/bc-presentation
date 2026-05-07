import { motion } from "framer-motion";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { CountUp } from "./components/CountUp";
import { AmplificationBar } from "./components/AmplificationBar";
import { d1Content as C } from "./content";

function Divider({ shown }: { shown: boolean }) {
  return (
    <motion.hr
      className="w-[30%] self-center border-0 border-t border-copper-700"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: shown ? 1 : 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformOrigin: "left center" }}
    />
  );
}

export function D1TheTrap() {
  const { stepIndex } = useDeck();
  // Beats 1/2/3 reveal at stepIndex 0/1/2; everything settles by stepIndex 3.
  const showStat = stepIndex >= 0;
  const showMechanism = stepIndex >= 1;
  const showBars = stepIndex >= 2;
  const showPrescription = stepIndex >= 3;

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
      <FigLabel section="D" num={1} label="THE TRAP" />
      <div className="relative z-10 mx-auto flex h-full max-w-[80vw] flex-col items-center justify-center gap-10 px-12 py-20 text-center">
        {/* Beat 1 — number */}
        {showStat && (
          <div className="flex flex-col items-center gap-4">
            <h1
              className="font-display text-copper-400"
              style={{ fontSize: "clamp(7rem, 16vw, 17.5rem)", lineHeight: 1 }}
            >
              〔
              <CountUp from={0} to={C.beat1.statValue} durationMs={1500} testId="d1-stat-counter" />
              〕{C.beat1.statSuffix}
            </h1>
            <motion.hr
              className="border-0 border-t border-copper-700"
              initial={{ scaleX: 0, width: "30%" }}
              animate={{ scaleX: showStat ? 1 : 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "left center" }}
            />
            <motion.p
              className="font-serif text-neutral-50"
              style={{ fontSize: "clamp(2rem, 2.75vw, 2.75rem)", lineHeight: 1.3 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: showStat ? 1 : 0 }}
              transition={{ duration: 0.4, delay: 1.8 }}
            >
              {highlight(C.beat1.subLine, C.beat1.subLineKeywords)}
            </motion.p>
            <motion.p
              className="font-sans text-neutral-400"
              style={{ fontSize: "clamp(0.95rem, 1.1vw, 1.15rem)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: showStat ? 1 : 0 }}
              transition={{ duration: 0.4, delay: 2.0 }}
            >
              {C.beat1.caption}
            </motion.p>
          </div>
        )}

        <Divider shown={showMechanism} />

        {/* Beat 2 — mechanism + bars */}
        {showMechanism && (
          <div className="flex flex-col items-center gap-8">
            <motion.h2
              className="font-display text-neutral-50"
              style={{ fontSize: "clamp(2.25rem, 3.25vw, 3.25rem)", lineHeight: 1.2 }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {highlight(C.beat2.mechanism, C.beat2.mechanismKeywords)}
            </motion.h2>
            {showBars && (
              <div className="flex w-full max-w-3xl flex-col gap-4">
                <AmplificationBar {...C.beat2.manualBar} offFrame={false} durationMs={500} />
                <AmplificationBar {...C.beat2.machineBar} offFrame durationMs={1200} delayMs={700} />
              </div>
            )}
          </div>
        )}

        <Divider shown={showPrescription} />

        {/* Beat 3 — prescription */}
        {showPrescription && (
          <div className="flex flex-col items-center gap-4">
            <motion.h2
              className="font-display text-neutral-50"
              style={{ fontSize: "clamp(2.25rem, 3.25vw, 3.25rem)", lineHeight: 1.2 }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {highlight(C.beat3.prescription, C.beat3.prescriptionKeywords)}
            </motion.h2>
            <motion.p
              className="font-serif italic text-neutral-300"
              style={{ fontSize: "clamp(1.5rem, 2vw, 2rem)", lineHeight: 1.35 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              {highlight(C.beat3.subPrescription, C.beat3.subPrescriptionKeywords)}
            </motion.p>
          </div>
        )}
      </div>
    </div>
  );
}

export const d1Slide: SlideDef = {
  steps: 4,
  animationMode: "step-reveal",
  canonicalPose: 3,
  surface: "dark",
  render: () => <D1TheTrap />,
};
