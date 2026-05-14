// WorkflowPipeline — composition-level animation loop wrapping 7 WorkflowStage
// cards. Spec §1 + §2.G.9.
//
// Visual:
//   ┌────┬────┬────┬────┬────┬────┬────┐  ← 7 stage cards (gap 8px)
//   └────┴────┴────┴────┴────┴────┴────┘
//   ────────●─────────────────────────  ← 2px track + copper-200 particle
//
// Behaviour:
//   • Particle traverses left → right across all 7 stages over ~10s
//   • 2s pause at the right edge before re-spawning at left (~12s loop total)
//   • As the particle reaches each stage zone (1/7 of total width), that
//     stage receives `active=true` for ~600ms
//   • Loop runs continuously regardless of step
//
// Implementation: JS-driven activeStageIndex via setInterval (1.4s per stage,
// 7 stages = 9.8s active phase, then ~2.2s null pause) paired with a CSS
// keyframe particle position so the visual particle and the active card pulse
// stay synchronised.
import { useEffect, useState } from "react";
import type { GlyphKind } from "@/components/AnimatedGlyph";
import { WorkflowStage } from "./WorkflowStage";

export interface StageDef {
  num: string;
  name: string;
  purpose: string;
  tools: readonly string[];
  glyphKind: GlyphKind;
}

interface WorkflowPipelineProps {
  stages: readonly StageDef[];
  // Delay (ms) before the pulse loop begins — lets the card stagger finish
  // before the flow particle starts traversing.
  startDelay?: number;
}

const STAGE_COUNT = 7;
const STAGE_DURATION_MS = 1400; // ~1.4s per stage
const PAUSE_MS = 2200; // pause at end before re-spawn
// Total cycle = 7 * 1400 + 2200 = 12000ms → matches CSS keyframe duration.
const CYCLE_MS = STAGE_COUNT * STAGE_DURATION_MS + PAUSE_MS;

export function WorkflowPipeline({ stages, startDelay = 0 }: WorkflowPipelineProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [particleRunning, setParticleRunning] = useState(startDelay === 0);

  useEffect(() => {
    let cancelled = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    const scheduleCycle = () => {
      if (cancelled) return;
      // Schedule activation of each stage at its time offset.
      for (let i = 0; i < STAGE_COUNT; i++) {
        timeouts.push(
          setTimeout(() => {
            if (!cancelled) setActiveIndex(i);
          }, i * STAGE_DURATION_MS),
        );
      }
      // After the final stage's pulse window, drop activeIndex to null for
      // the pause phase, then re-schedule.
      timeouts.push(
        setTimeout(() => {
          if (!cancelled) setActiveIndex(null);
        }, STAGE_COUNT * STAGE_DURATION_MS),
      );
      timeouts.push(
        setTimeout(() => {
          if (!cancelled) scheduleCycle();
        }, CYCLE_MS),
      );
    };

    const kickoff = setTimeout(() => {
      if (cancelled) return;
      setParticleRunning(true);
      scheduleCycle();
    }, startDelay);
    timeouts.push(kickoff);

    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, [startDelay]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <style>{`
        @keyframes g9-flow-particle {
          0%   { left: 0%;   opacity: 0; }
          2%   { opacity: 1; }
          81%  { left: calc(100% - 3px); opacity: 1; }
          83%  { left: calc(100% - 3px); opacity: 0; }
          100% { left: calc(100% - 3px); opacity: 0; }
        }
      `}</style>

      {/* Stage cards row */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "stretch",
          gap: 8,
          flex: 1,
          minHeight: 0,
        }}
      >
        {stages.map((stage, i) => (
          <WorkflowStage
            key={stage.num}
            num={stage.num}
            name={stage.name}
            purpose={stage.purpose}
            tools={stage.tools}
            active={activeIndex === i}
            glyphKind={stage.glyphKind}
          />
        ))}
      </div>

      {/* Flow track + particle */}
      <div
        style={{
          position: "relative",
          height: 2,
          marginTop: 12,
          background:
            "linear-gradient(to right, transparent 0%, var(--copper-700) 8%, var(--copper-700) 92%, transparent 100%)",
          opacity: 0.5,
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: -1.5,
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: "var(--copper-200)",
            boxShadow: "0 0 6px var(--copper-200)",
            animation: particleRunning
              ? `g9-flow-particle ${CYCLE_MS}ms linear infinite`
              : "none",
            opacity: particleRunning ? undefined : 0,
            willChange: "left, opacity",
          }}
        />
      </div>
    </div>
  );
}
