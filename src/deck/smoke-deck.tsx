import { type AnimationMode } from "./Slide";
import { Hero } from "@/primitives/Hero";
import { SectionDivider } from "@/primitives/SectionDivider";
import { ContentSlide } from "@/primitives/ContentSlide";
import { QuoteSlide } from "@/primitives/QuoteSlide";
import { HexLadder } from "@/primitives/HexLadder";
import { StepReveal } from "@/motion/StepReveal";
import { LoopingAmbient } from "@/motion/LoopingAmbient";
import { Interactive } from "@/motion/Interactive";
import { useState, type JSX } from "react";

export interface SmokeSlide {
  steps: number; // step count for DeckProvider
  animationMode: AnimationMode;
  canonicalPose: number;
  surface?: "dark" | "light";
  render: () => JSX.Element;
}

function ComparatorDemo() {
  const [on, setOn] = useState(false);
  return (
    <div className="flex h-full flex-col items-center justify-center gap-12 px-32">
      <h2
        className="font-serif"
        style={{ fontSize: "clamp(2.5rem, 4.5vw, 4rem)" }}
      >
        Prompt only vs. Prompt + Context
      </h2>
      <button
        onClick={() => setOn((v) => !v)}
        className="border border-copper-500 px-12 py-6 font-sans text-copper-300"
        style={{ fontSize: "clamp(1.25rem, 1.5vw, 1.75rem)" }}
      >
        {on ? "with context" : "prompt only"}
      </button>
      <p
        className="max-w-[40ch] text-center font-serif"
        style={{ fontSize: "clamp(2.25rem, 2.5vw, 2.75rem)", lineHeight: 1.6 }}
      >
        {on
          ? "Grounded in the project: hits the right repos, the right files, the right history."
          : "Generic prose. Plausible but ungrounded."}
      </p>
    </div>
  );
}

export const smokeDeck: SmokeSlide[] = [
  {
    steps: 1,
    animationMode: "static",
    canonicalPose: 0,
    render: () => (
      <Hero
        title="Berau Coal Energy"
        subtitle="AI Workshop · Vol 2 · Session 2"
        attribution="Adri · Nanovest"
      />
    ),
  },
  {
    steps: 1,
    animationMode: "looping-ambient",
    canonicalPose: 0,
    render: () => (
      <LoopingAmbient>
        <SectionDivider letter="C" label="Mindset" />
      </LoopingAmbient>
    ),
  },
  {
    steps: 3,
    animationMode: "step-reveal",
    canonicalPose: 2,
    render: () => (
      <div className="flex h-full flex-col justify-center px-32 py-24">
        <h2
          className="mb-12 font-serif"
          style={{ fontSize: "clamp(2.5rem, 4.5vw, 4rem)" }}
        >
          Three layers, outside in
        </h2>
        <StepReveal>
          <p className="font-serif" style={{ fontSize: "clamp(2.25rem, 2.5vw, 2.75rem)" }}>
            1. Prompt — what you ask
          </p>
          <p className="font-serif" style={{ fontSize: "clamp(2.25rem, 2.5vw, 2.75rem)" }}>
            2. Context — what's in scope
          </p>
          <p className="font-serif" style={{ fontSize: "clamp(2.25rem, 2.5vw, 2.75rem)" }}>
            3. Harness — what it can act on
          </p>
        </StepReveal>
      </div>
    ),
  },
  {
    steps: 1,
    animationMode: "static",
    canonicalPose: 0,
    render: () => (
      <ContentSlide
        heading="What we'll cover"
        bullets={[
          "Where the field is now",
          "How to think about it",
          "How to use it without losing yourself",
          "How to start, this week",
        ]}
      />
    ),
  },
  {
    steps: 1,
    animationMode: "static",
    canonicalPose: 0,
    render: () => (
      <QuoteSlide
        quote="AI is the bridge from where you are to wherever you need to be."
        attribution="The throughline"
      />
    ),
  },
  {
    steps: 1,
    animationMode: "interactive",
    canonicalPose: 0,
    render: () => (
      <Interactive>
        <ComparatorDemo />
      </Interactive>
    ),
  },
  {
    steps: 1,
    animationMode: "static",
    canonicalPose: 0,
    surface: "light",
    render: () => <HexLadder />,
  },
];
