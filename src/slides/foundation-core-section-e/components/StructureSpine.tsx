import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { HoverPopover } from "./HoverPopover";

export interface SpineElement {
  id: string;
  num: 1 | 2 | 3 | 4 | 5 | 6;
  name: string;
  essence: string;
  popover: ReactNode;
}

interface StructureSpineProps {
  elements: readonly SpineElement[];
  // 0..6 — 0 hides all; 6 shows the entire spine. The slide drives this off stepIndex.
  revealedThrough: number;
}

const NUMERIC_BADGE = ["①", "②", "③", "④", "⑤", "⑥"] as const;

export function StructureSpine({ elements, revealedThrough }: StructureSpineProps) {
  return (
    <div className="flex flex-col items-stretch gap-3">
      {elements.map((el, i) => {
        const revealed = i < revealedThrough;
        return (
          <motion.div
            key={el.id}
            data-testid={`spine-element-${el.num}`}
            data-revealed={String(revealed)}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 6 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: revealed ? i * 0.08 : 0 }}
            className="flex items-center gap-4 border border-copper-800 bg-neutral-950/60 px-4 py-3"
          >
            <HoverPopover
              position="right"
              trigger={
                <div className="flex items-center gap-4">
                  <span className="font-mono text-copper-300" style={{ fontSize: "clamp(1.4rem, 2vw, 2rem)" }}>
                    {NUMERIC_BADGE[i]}
                  </span>
                  <div className="flex flex-col">
                    <span className="font-display text-neutral-50" style={{ fontSize: "clamp(1.2rem, 1.5vw, 1.5rem)", lineHeight: 1.1 }}>
                      {el.name}
                    </span>
                    <span className="font-serif italic text-neutral-300" style={{ fontSize: "clamp(0.85rem, 1vw, 1.05rem)" }}>
                      {el.essence}
                    </span>
                  </div>
                </div>
              }
              payload={el.popover}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
