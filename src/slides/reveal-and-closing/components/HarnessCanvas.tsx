import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import { DefaultHarness } from "../simulations/DefaultHarness";

const HEAVY_IDS = new Set([
  "stocks-intel",
  "legal-docs",
  "exchange-alerts",
  "nanovest-product",
  "notebooklm",
]);

interface HarnessCanvasProps {
  selectedId: string | null;
  mode: "simulation" | "screenshots";
  onToggleMode: () => void;
  // Slot for the per-item content. Caller renders the right component
  // based on selectedId; the canvas just provides the shell + transition.
  children?: ReactNode;
}

export function HarnessCanvas({ selectedId, mode, onToggleMode, children }: HarnessCanvasProps) {
  const isHeavy = selectedId && HEAVY_IDS.has(selectedId);
  return (
    <div
      data-testid="harness-canvas"
      data-selected={selectedId ?? ""}
      className="relative h-full w-full border border-copper-900 bg-neutral-950/40"
    >
      {isHeavy && (
        <button
          type="button"
          onClick={onToggleMode}
          className="absolute right-6 top-6 z-10 border border-copper-500 px-4 py-1 font-sans text-copper-300 hover:bg-copper-900/30"
          style={{ fontSize: "clamp(0.85rem, 1vw, 1.05rem)" }}
        >
          {mode === "simulation" ? "see it real" : "back to simulation"}
        </button>
      )}
      {/* mode="wait" omitted: jsdom never fires onExitComplete, leaving incoming child unmounted in tests. */}
      <AnimatePresence>
        <motion.div
          key={`${selectedId ?? "default"}-${mode}`}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="h-full w-full"
        >
          {children ?? <DefaultHarness />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
