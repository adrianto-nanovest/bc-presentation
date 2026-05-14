import { useState } from "react";
import type { SlideDef } from "../../deck/types";
import { useDeck } from "../../deck/DeckContext";
import { FigLabel } from "../../components/FigLabel";
import { highlight } from "../../components/highlight";
import { VideoOverlay } from "../../components/VideoOverlay";
import { AnimatedGlyph } from "../../components/AnimatedGlyph";
import { Reveal } from "./components/Reveal";
import { g6Content as C } from "./content";
import "./g6-openai.css";

type Card = (typeof C.cards)[number];

function G6OpenAI() {
  const { stepIndex } = useDeck();
  const [videoOpen, setVideoOpen] = useState<{ src: string; caption: string } | null>(null);

  return (
    <div className="slide-wrap g6-slide">
      {/* FigLabel — always visible */}
      <FigLabel section="G" num={6} label="OPENAI" />

      {/* Headline — always visible, structural */}
      <h1
        className="slide-headline small"
        style={{ position: "absolute", top: 80, left: 48, right: 48, margin: 0 }}
      >
        {highlight(C.headline, [...C.headlineKw])}
      </h1>

      {/* Cards region — 3 horizontal cards (G1 pattern) */}
      <div
        data-no-advance
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          top: 148,
          bottom: 112,
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 24,
        }}
      >
        {C.cards.map((card, i) => (
          <Reveal key={card.id} on={true} delay={120 + i * 120} style={{ height: "100%" }}>
            <CardView
              card={card}
              onPlayVideo={(src, caption) => setVideoOpen({ src, caption })}
            />
          </Reveal>
        ))}
      </div>

      {/* Footer — revealed at step 1.
          NOTE: position: absolute lives on Reveal itself, not on a child —
          .fade's transform creates a containing block, so an absolutely-
          positioned child would resolve to Reveal (zero height) instead of
          .stage-wrap and render above the canvas. Mirrors G2/G5. */}
      <Reveal
        on={stepIndex >= 1}
        delay={120}
        style={{
          position: "absolute",
          bottom: 56,
          left: 48,
          right: 48,
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontSize: 16,
          color: "var(--copper-200)",
          textAlign: "center",
        }}
      >
        {highlight(C.footer, [...C.footerKw])}
      </Reveal>

      {/* Video overlay */}
      <VideoOverlay
        open={!!videoOpen}
        onClose={() => setVideoOpen(null)}
        videoSrc={videoOpen?.src ?? ""}
        caption={videoOpen?.caption ?? ""}
      />
    </div>
  );
}

interface CardViewProps {
  card: Card;
  onPlayVideo: (src: string, caption: string) => void;
}

function CardView({ card, onPlayVideo }: CardViewProps) {
  const kw = [...card.bulletsKw];
  return (
    <div className="g6-card">
      <div className="g6-card-logo">
        <AnimatedGlyph kind={card.glyph as any} size={48} />
      </div>
      <div className="g6-card-name">{card.name}</div>
      <div className="g6-card-tagline">
        {highlight(card.tagline, [...card.taglineKw])}
      </div>
      <hr className="g6-card-rule" />
      <ul className="g6-card-bullets">
        {card.bullets.map((b, i) => (
          <li key={i} className="g6-card-bullet">
            {highlight(b, kw)}
          </li>
        ))}
      </ul>
      {card.videoFile && (
        <div className="g6-card-actions">
          <button
            className="g6-card-btn"
            onClick={() => onPlayVideo(`/videos/${card.videoFile}`, card.name)}
          >
            ▶ Play video
          </button>
        </div>
      )}
    </div>
  );
}

export const g6Slide: SlideDef = {
  steps: 2,
  canonicalPose: 1,
  animationMode: "step-reveal",
  surface: "dark",
  section: "G",
  render: () => <G6OpenAI />,
};
