import { motion } from "framer-motion";
import type { ReactNode } from "react";

export interface FlowStage {
  num: number;
  label: string;
  sub: ReactNode;        // pre-highlighted via highlight() in caller
}

interface HorizontalFlowProps {
  stages: FlowStage[];
  revealed: boolean;     // gates the stage stagger-fade
  ambient: boolean;      // turns on the connector traveling pulse
}

export function HorizontalFlow({ stages, revealed, ambient }: HorizontalFlowProps) {
  return (
    <div
      data-testid="flow-wrapper"
      data-revealed={String(revealed)}
      className="flex w-full items-stretch justify-between gap-4"
    >
      {stages.map((stage, i) => (
        <div key={stage.num} className="flex flex-1 items-stretch gap-4">
          <motion.div
            data-testid="flow-stage"
            className="flex flex-1 flex-col gap-3 border border-copper-700 bg-neutral-950/60 p-6"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 8 }}
            transition={{
              duration: 0.4,
              delay: revealed ? i * 0.05 : 0,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <span
              className="font-mono text-copper-400"
              style={{ fontSize: "0.95rem" }}
            >
              {String(stage.num).padStart(2, "0")}
            </span>
            <h4
              className="font-display text-neutral-50"
              style={{ fontSize: "1.44rem", lineHeight: 1.2 }}
            >
              {stage.label}
            </h4>
            <p
              className="font-serif italic text-neutral-300"
              style={{ fontSize: "0.95rem", lineHeight: 1.45 }}
            >
              {stage.sub}
            </p>
          </motion.div>
          {i < stages.length - 1 && (
            <div
              data-testid="flow-connector"
              className="flex w-12 items-center justify-center"
            >
              <svg width="48" height="32" className="overflow-visible">
                <motion.path
                  d="M 4 16 L 36 16 M 30 10 L 36 16 L 30 22"
                  stroke="#7a4626"
                  strokeWidth={1.5}
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: revealed ? 1 : 0 }}
                  transition={{
                    duration: 0.5,
                    delay: revealed ? 0.3 + i * 0.08 : 0,
                  }}
                />
                {ambient && (
                  <motion.path
                    d="M 4 16 L 36 16"
                    stroke="#d99e6c"
                    strokeWidth={2.5}
                    fill="none"
                    strokeDasharray="6 100"
                    initial={{ strokeDashoffset: 0 }}
                    animate={{ strokeDashoffset: -106 }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: i * 0.4 }}
                  />
                )}
              </svg>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
