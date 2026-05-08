// src/slides/foundation-core-section-e/components/TechniqueModal.tsx
import { motion, AnimatePresence } from "framer-motion";

export interface TechniqueBullet {
  label: string;     // "Best for" | "Example" | "Trade-off"
  body: string;
}

interface TechniqueModalProps {
  id: string;
  title: string;
  layerAnnotation?: string; // "Layer 2" | "Layer 3" | undefined
  bullets: readonly TechniqueBullet[];
  open: boolean;
  onClose: () => void;
}

export function TechniqueModal({
  id,
  title,
  layerAnnotation,
  bullets,
  open,
  onClose,
}: TechniqueModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="modal-root"
          data-testid={`technique-modal-${id}`}
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="close"
            data-testid="technique-modal-backdrop"
            onClick={onClose}
            className="absolute inset-0 bg-black/70"
          />
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex max-h-[70vh] w-[60vw] flex-col gap-4 border border-copper-300 bg-neutral-950 p-8 shadow"
          >
            <div className="flex items-baseline justify-between gap-6">
              <div className="flex items-baseline gap-4">
                <h2
                  className="font-display text-neutral-50"
                  style={{ fontSize: "clamp(2rem, 3vw, 3rem)", lineHeight: 1 }}
                >
                  {title}
                </h2>
                {layerAnnotation && (
                  <span
                    className="font-mono uppercase tracking-[0.18em] text-copper-200"
                    style={{ fontSize: "clamp(0.8rem, 0.95vw, 1rem)" }}
                  >
                    ↘ {layerAnnotation}
                  </span>
                )}
              </div>
              <button
                type="button"
                data-testid="technique-modal-close"
                onClick={onClose}
                className="font-mono text-copper-300 hover:text-copper-200"
                style={{ fontSize: "1.5rem" }}
              >
                ×
              </button>
            </div>
            <ul className="flex flex-col gap-3">
              {bullets.map((b, i) => (
                <li
                  key={b.label}
                  data-testid={`technique-bullet-${i}`}
                  className="flex flex-col gap-1"
                >
                  <span className="font-mono uppercase tracking-[0.18em] text-copper-300" style={{ fontSize: "clamp(0.75rem, 0.9vw, 0.95rem)" }}>
                    {b.label}
                  </span>
                  <span className="font-serif text-neutral-100" style={{ fontSize: "clamp(1rem, 1.2vw, 1.25rem)", lineHeight: 1.4 }}>
                    {b.body}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
