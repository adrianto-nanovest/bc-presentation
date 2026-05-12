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

function G6OpenAI() {
  const { stepIndex } = useDeck();
  const [videoOpen, setVideoOpen] = useState<{ src: string; caption: string } | null>(null);

  return (
    <div className="slide-wrap g6-slide">
      {/* FigLabel — always visible */}
      <FigLabel section="G" num={6} label="OPENAI" />

      {/* Headline — always visible, structural */}
      <h1 className="slide-headline small" style={{ position: "absolute", top: 80, left: 48, right: 48 }}>
        {highlight(C.headline, [...C.headlineKw])}
      </h1>

      {/* Subhead — mono 11px copper-400 uppercase */}
      <div
        className="g6-subhead"
        style={{
          position: "absolute",
          top: 128,
          left: 48,
          right: 48,
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--copper-400)",
        }}
      >
        {C.subhead}
      </div>

      {/* Cards region — 3 horizontal cards */}
      <div
        data-no-advance
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          top: 172,
          bottom: 120,
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 24,
          height: "100%",
        }}
      >
        {C.cards.map((card, i) => (
          <Reveal key={card.id} on={true} delay={120 + i * 100}>
            <Card
              name={card.name}
              desc={card.desc}
              videoFile={card.videoFile}
              glyph={card.glyph}
              onPlayVideo={(src, caption) => setVideoOpen({ src, caption })}
            />
          </Reveal>
        ))}
      </div>

      {/* Footer — revealed at step 1 */}
      <Reveal on={stepIndex >= 1} delay={120}>
        <div
          className="g6-footer"
          style={{
            position: "absolute",
            bottom: 64,
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
        </div>
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

interface CardProps {
  name: string;
  desc: string;
  videoFile: string | null;
  glyph: string;
  onPlayVideo: (src: string, caption: string) => void;
}

function Card({ name, desc, videoFile, glyph, onPlayVideo }: CardProps) {
  return (
    <div className="g6-card">
      <AnimatedGlyph kind={glyph as any} size={48} />
      <div className="g6-card-name">{name}</div>
      <div className="g6-card-desc">{desc}</div>
      {videoFile && (
        <div className="g6-card-actions">
          <button
            className="g6-card-btn"
            onClick={() => onPlayVideo(`/videos/${videoFile}`, name)}
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
