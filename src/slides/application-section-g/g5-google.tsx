import { useState, type ReactNode } from "react";
import type { SlideDef } from "../../deck/types";
import { useDeck } from "../../deck/DeckContext";
import { FigLabel } from "../../components/FigLabel";
import { highlight } from "../../components/highlight";
import { VideoOverlay } from "../../components/VideoOverlay";
import { AnimatedGlyph } from "../../components/AnimatedGlyph";
import { Reveal } from "./components/Reveal";
import { g5Content as C } from "./content";

export function G5Google() {
  const { stepIndex } = useDeck();
  const [videoOpen, setVideoOpen] = useState<{ src: string; caption: string } | null>(null);

  return (
    <div className="stage-wrap">
      <style>{`
        .g5-headline {
          position: absolute;
          top: 80px;
          left: 48px;
          right: 48px;
          margin: 0;
        }

        .g5-card-region {
          position: absolute;
          left: 48px;
          right: 48px;
          top: 148px;
          bottom: 92px;
        }

        .g5-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr;
          grid-template-rows: 1fr 1fr 1fr;
          gap: 12px;
          height: 100%;
          grid-template-areas:
            "hero ws ai"
            "hero canvas flow"
            "hero stitch gems";
        }

        .g5-card {
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: 10px 14px;
          border: 1px solid var(--copper-700);
          background: rgba(10, 10, 10, 0.5);
          transition: border-color 0.2s var(--ease), background 0.2s var(--ease), box-shadow 0.2s var(--ease);
          height: 100%;
          overflow: hidden;
        }

        .g5-card:hover {
          border-color: var(--copper-200);
          background: rgba(184, 110, 61, 0.06);
          box-shadow: 0 4px 12px rgba(184, 110, 61, 0.08);
        }

        .g5-card-hero {
          padding: 20px 24px;
          gap: 10px;
        }

        .g5-hero {
          grid-area: hero;
        }

        .g5-card-ws {
          grid-area: ws;
        }

        .g5-card-ai {
          grid-area: ai;
        }

        .g5-card-canvas {
          grid-area: canvas;
        }

        .g5-card-flow {
          grid-area: flow;
        }

        .g5-card-stitch {
          grid-area: stitch;
        }

        .g5-card-gems {
          grid-area: gems;
        }

        .g5-card-name {
          font-family: var(--display);
          font-size: 18px;
          color: var(--neutral-50);
          margin-top: 2px;
          line-height: 1.1;
        }

        .g5-card-hero .g5-card-name {
          font-size: 34px;
          margin-top: 6px;
        }

        .g5-card-desc {
          font-family: var(--serif);
          font-style: italic;
          font-size: 12px;
          color: var(--neutral-300);
          line-height: 1.35;
          flex-grow: 1;
        }

        .g5-card-hero .g5-card-desc {
          font-size: 15px;
          line-height: 1.5;
          max-width: 480px;
        }

        .g5-card-actions {
          display: flex;
          gap: 8px;
          margin-top: auto;
        }

        .g5-card-btn {
          font-family: var(--mono);
          font-size: 10px;
          letter-spacing: 0.08em;
          color: var(--copper-300);
          background: transparent;
          border: 1px solid var(--copper-700);
          padding: 4px 8px;
          cursor: pointer;
          transition: border-color 0.2s var(--ease), color 0.2s var(--ease);
        }

        .g5-card-btn:hover {
          border-color: var(--copper-300);
          color: var(--copper-100);
        }

        .g5-footer {
          position: absolute;
          bottom: 48px;
          left: 48px;
          right: 48px;
          text-align: center;
          font-family: var(--serif);
          font-style: italic;
          font-size: 16px;
          color: var(--copper-200);
        }
      `}</style>

      {/* FigLabel — always visible */}
      <FigLabel section="G" num={5} label="GOOGLE" />

      {/* Headline — positioned below FigLabel (matches G2 convention) */}
      <h1 className="slide-headline small g5-headline">
        {highlight(C.headline, [...C.headlineKw])}
      </h1>

      {/* Card region — wrapped in data-no-advance */}
      <div className="g5-card-region" data-no-advance>
        <div className="g5-grid">
          {/* Hero card — NotebookLM */}
          <Reveal on delay={120} className="g5-hero">
            <Card
              name={C.hero.name}
              desc={highlight(C.hero.desc, [...C.hero.descKw])}
              videoFile={C.hero.videoFile}
              glyph={C.hero.glyph}
              glyphSize={64}
              isHero
              onPlayVideo={(src, caption) => setVideoOpen({ src, caption })}
            />
          </Reveal>

          {/* 6 supporting cards */}
          {C.cards.map((card, i) => {
            const gridClass = `g5-card-${card.id}`;
            return (
              <Reveal key={card.id} on delay={200 + i * 80} className={gridClass}>
                <Card
                  name={card.name}
                  desc={highlight(card.desc, [...card.descKw])}
                  videoFile={card.videoFile}
                  glyph={card.glyph}
                  glyphSize={28}
                  isHero={false}
                  onPlayVideo={(src, caption) => setVideoOpen({ src, caption })}
                />
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Footer — step 1 */}
      <Reveal on={stepIndex >= 1} delay={120} className="g5-footer">
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

// ─────────────────── Shared Card Component ───────────────────

interface CardProps {
  name: string;
  desc: ReactNode;
  videoFile: string;
  glyph: string;
  glyphSize: number;
  isHero: boolean;
  onPlayVideo: (src: string, caption: string) => void;
}

function Card({ name, desc, videoFile, glyph, glyphSize, isHero, onPlayVideo }: CardProps) {
  return (
    <div className={`g5-card ${isHero ? "g5-card-hero" : ""}`}>
      <AnimatedGlyph kind={glyph as any} size={glyphSize} />
      <div className="g5-card-name">{name}</div>
      <div className="g5-card-desc">{desc}</div>
      <div className="g5-card-actions">
        <button
          className="g5-card-btn"
          onClick={() => onPlayVideo(`/videos/${videoFile}`, name)}
        >
          ▶ Play video
        </button>
      </div>
    </div>
  );
}

// ─────────────────── Slide Def Export ───────────────────

export const g5Slide: SlideDef = {
  steps: 2,
  canonicalPose: 1,
  animationMode: "step-reveal",
  surface: "dark",
  section: "G",
  render: () => <G5Google />,
};
