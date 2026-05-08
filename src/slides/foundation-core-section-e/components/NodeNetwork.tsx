import { motion } from "framer-motion";
import {
  MessageSquare,
  Shield,
  History,
  BookOpen,
  Wrench,
  Archive,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  MessageSquare,
  Shield,
  History,
  BookOpen,
  Wrench,
  Archive,
};

export type NodeNetworkVariant = "context-hub";
export type NodeNetworkState = "activated" | "stamped" | "compressed";

export interface SatelliteSpec {
  id: string;
  label: string;
  icon: keyof typeof ICONS;
}

interface NodeNetworkProps {
  variant: NodeNetworkVariant;
  state: NodeNetworkState;
  centerNode: string;
  satellites: readonly SatelliteSpec[]; // expect 6 in clockwise order from 12 o'clock
  play: boolean; // ambient on/off (inward flow + clockwise highlight + chaos arrows)
  hoveredSatelliteId?: string | null; // optional: parent can drive hover state
  onSatelliteHover?: (id: string | null) => void;
}

// Hex layout — clockwise from 12 o'clock at 60° intervals.
// Distances expressed in vmin so the layout scales with the slide.
const HEX_ANGLES_DEG = [-90, -30, 30, 90, 150, -150]; // 12, 2, 4, 6, 8, 10 o'clock
const RADIUS_VMIN = 22;

function satellitePosition(i: number, state: NodeNetworkState) {
  const angleRad = (HEX_ANGLES_DEG[i] * Math.PI) / 180;
  const r = state === "compressed" ? RADIUS_VMIN * 0.15 : RADIUS_VMIN;
  return {
    x: Math.cos(angleRad) * r,
    y: Math.sin(angleRad) * r,
  };
}

export function NodeNetwork({
  variant: _variant,
  state,
  centerNode,
  satellites,
  play,
  hoveredSatelliteId = null,
  onSatelliteHover,
}: NodeNetworkProps) {
  const dimmed = state === "stamped";
  const compressed = state === "compressed";

  return (
    <div
      data-testid="node-network-root"
      data-state={state}
      data-play={String(play)}
      className="relative h-full w-full"
    >
      {/* SVG layer — connector lines + ambient particles */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="-50 -50 100 100"
        preserveAspectRatio="xMidYMid meet"
      >
        {satellites.map((s, i) => {
          const pos = satellitePosition(i, state);
          return (
            <motion.line
              key={`line-${s.id}`}
              data-testid={`node-line-${s.id}`}
              x1={0}
              y1={0}
              x2={pos.x}
              y2={pos.y}
              stroke={dimmed ? "rgb(124 84 56 / 0.35)" : "rgb(184 110 61 / 0.7)"}
              strokeWidth={0.4}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: compressed ? 0 : 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          );
        })}

        {/* Inward-flow ambient (E.6 activated + play) */}
        {state === "activated" && play && satellites.map((s, i) => {
          const pos = satellitePosition(i, state);
          return (
            <motion.circle
              key={`flow-${s.id}`}
              data-testid={`node-flow-${s.id}`}
              r={0.8}
              fill="rgb(212 153 102)"
              initial={{ cx: pos.x, cy: pos.y, opacity: 0 }}
              animate={{ cx: [pos.x, 0], cy: [pos.y, 0], opacity: [0, 1, 0] }}
              transition={{
                duration: 3.5,
                ease: "linear",
                repeat: Infinity,
                delay: i * 0.4,
              }}
            />
          );
        })}

        {/* Chaos arrows ambient (E.8 stamped + play) */}
        {state === "stamped" && play && Array.from({ length: 6 }).map((_, i) => {
          const start = { x: -45 + Math.random() * 90, y: -45 + Math.random() * 90 };
          const end = { x: -45 + Math.random() * 90, y: -45 + Math.random() * 90 };
          return (
            <motion.line
              key={`chaos-${i}`}
              data-testid={`node-chaos-${i}`}
              x1={start.x}
              y1={start.y}
              x2={end.x}
              y2={end.y}
              stroke="rgb(212 153 102 / 0.5)"
              strokeWidth={0.3}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.8, 0] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.5 + Math.random(),
                repeatDelay: 1 + Math.random() * 2,
              }}
            />
          );
        })}
      </svg>

      {/* HTML layer — hub + satellites (HTML so labels stay crisp at projection) */}
      <div className="absolute inset-0">
        {/* Hub */}
        <motion.div
          data-testid="node-hub"
          layoutId="node-network-hub"
          className={`absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center border ${
            compressed
              ? "border-copper-300 bg-copper-200/10"
              : dimmed
                ? "border-copper-700 bg-copper-900/30"
                : "border-copper-100 bg-copper-200/15"
          }`}
          style={{
            width: compressed ? "28vmin" : "14vmin",
            height: compressed ? "10vmin" : "7vmin",
            padding: "1vmin 1.5vmin",
          }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            className="font-display text-neutral-50"
            style={{ fontSize: "clamp(1rem, 1.6vw, 1.5rem)", letterSpacing: "0.04em" }}
          >
            {compressed ? "HARNESS" : centerNode}
          </span>
          {compressed && (
            <span
              className="font-serif italic text-neutral-200"
              style={{ fontSize: "clamp(0.7rem, 0.95vw, 0.95rem)" }}
            >
              Automates context engineering
            </span>
          )}
        </motion.div>

        {/* STILL MANUAL stamp on stamped state */}
        {state === "stamped" && (
          <motion.div
            data-testid="node-still-manual-stamp"
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-12 border-2 border-copper-300 bg-neutral-950/70 px-3 py-1 font-mono uppercase tracking-[0.18em] text-copper-200"
            style={{ fontSize: "clamp(0.7rem, 0.95vw, 0.95rem)" }}
            initial={{ scale: 1.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            STILL MANUAL
          </motion.div>
        )}

        {/* Satellites */}
        {satellites.map((s, i) => {
          const pos = satellitePosition(i, state);
          const Icon = ICONS[s.icon];
          const hovered = hoveredSatelliteId === s.id;
          return (
            <motion.div
              key={s.id}
              data-testid={`node-satellite-${s.id}`}
              data-compressed={String(compressed)}
              layoutId={`node-network-sat-${s.id}`}
              className={`absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 border bg-neutral-950/80 px-3 py-2 ${
                dimmed
                  ? "border-copper-800 opacity-70"
                  : hovered
                    ? "border-copper-300"
                    : "border-copper-700"
              }`}
              style={{
                left: `calc(50% + ${pos.x}vmin)`,
                top: `calc(50% + ${pos.y}vmin)`,
                width: compressed ? "0vmin" : "11vmin",
                opacity: compressed ? 0 : undefined,
              }}
              animate={{ opacity: compressed ? 0 : dimmed ? 0.7 : 1 }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => onSatelliteHover?.(s.id)}
              onMouseLeave={() => onSatelliteHover?.(null)}
            >
              {Icon && (
                <Icon
                  size={32}
                  strokeWidth={1.5}
                  className="text-copper-300"
                  aria-hidden
                />
              )}
              <span
                className="text-center font-mono text-neutral-100"
                style={{
                  fontSize: "clamp(0.65rem, 0.85vw, 0.85rem)",
                  letterSpacing: "0.02em",
                  lineHeight: 1.15,
                }}
              >
                {s.label}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
