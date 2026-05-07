import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { HoverReveal } from "./HoverReveal";

export interface TimelineAnchor {
  id: string;
  label: string;
  caption: ReactNode;
  hover?: ReactNode;
}

interface TimelineProps {
  anchors: TimelineAnchor[];     // ordered left → right
  segmentLabel?: ReactNode;      // single mid-segment label (Mar→Sep style)
  anchorsRevealed: number;       // how many anchors should be visible (0..N)
  ambient: boolean;
}

export function Timeline({ anchors, segmentLabel, anchorsRevealed, ambient }: TimelineProps) {
  const total = anchors.length;
  const positions = anchors.map((_, i) => (i / (total - 1)) * 100);
  const axisRevealed = anchorsRevealed >= 1;
  return (
    <div className="relative w-full px-12 py-8" style={{ height: 200 }}>
      {/* Axis */}
      <div
        data-testid="timeline-axis"
        className="absolute left-0 right-0"
        style={{ top: 96 }}
      >
        <svg width="100%" height="4" preserveAspectRatio="none" className="overflow-visible">
          <motion.line
            x1="0"
            y1="2"
            x2="100%"
            y2="2"
            stroke="#7a4626"
            strokeWidth={1.5}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: axisRevealed ? 1 : 0 }}
            transition={{ duration: 0.6 }}
          />
          {ambient && (
            <motion.line
              x1="0"
              y1="2"
              x2="100%"
              y2="2"
              stroke="#d99e6c"
              strokeWidth={2.5}
              strokeDasharray="20 1000"
              initial={{ strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: -1020 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />
          )}
        </svg>
      </div>
      {/* Anchors */}
      {anchors.map((a, i) => {
        const revealed = i < anchorsRevealed;
        const node = (
          <motion.div
            data-testid="timeline-anchor"
            data-revealed={String(revealed)}
            className="absolute flex flex-col items-center gap-3"
            style={{ left: `${positions[i]}%`, transform: "translateX(-50%)", top: 60 }}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 6 }}
            transition={{ duration: 0.4 }}
          >
            <span className="block h-4 w-4 rounded-full border border-copper-400 bg-neutral-900" />
            <span
              className="font-mono text-copper-300"
              style={{ fontSize: "clamp(0.95rem, 1.1vw, 1.25rem)" }}
            >
              {a.label}
            </span>
            <span
              className="font-serif italic text-neutral-300"
              style={{ fontSize: "clamp(0.85rem, 1vw, 1.15rem)" }}
            >
              {a.caption}
            </span>
          </motion.div>
        );
        return (
          <span key={a.id}>
            {a.hover ? (
              <HoverReveal
                trigger={node}
                position="below"
                payload={
                  <span
                    className="block max-w-[320px] border border-copper-500 bg-neutral-900 p-4 font-serif italic text-neutral-100 shadow"
                    style={{ fontSize: "0.95rem" }}
                  >
                    {a.hover}
                  </span>
                }
              />
            ) : (
              node
            )}
          </span>
        );
      })}
      {/* Mid-segment label (if provided) — sits between anchor[0] and anchor[1]. */}
      {segmentLabel && (
        <motion.span
          className="absolute font-serif italic text-copper-300"
          style={{
            top: 16,
            left: `${(positions[0] + positions[1]) / 2}%`,
            transform: "translateX(-50%)",
            fontSize: "clamp(0.95rem, 1.15vw, 1.3rem)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: anchorsRevealed >= 2 ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        >
          {segmentLabel}
        </motion.span>
      )}
    </div>
  );
}
