// G.3 — CLAUDE CAPABILITIES
//
// Spec §3.G.3 — 8 capability cards in a 4×2 grid. Most interactive slide in
// Section G. Each card has an AnimatedGlyph + video button. Two cards
// (Schedules, Artifacts) have an additional compare button that opens a
// feature comparison overlay.
//
// Step structure:
//   0 (entry) — 8 cards stagger in (120ms + i*80ms), subhead appears
//   1         — footer line reveals

import { useState } from "react";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { AnimatedGlyph } from "@/components/AnimatedGlyph";
import { VideoOverlay } from "@/components/VideoOverlay";
import { CompareOverlay } from "@/components/CompareOverlay";
import { Reveal } from "./components/Reveal";
import { g3Content as C, g3SchedulesCompare, g3ArtifactsCompare } from "./content";

// ─────────────────────────────────────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────────────────────────────────────

const styles = `
.g3-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px;
  border: 1px solid var(--copper-700);
  background: rgba(10, 10, 10, 0.5);
  transition: border-color 0.2s var(--ease), background 0.2s var(--ease), box-shadow 0.2s var(--ease);
  position: relative;
  height: 100%;
}

.g3-card:hover {
  border-color: var(--copper-200);
  background: rgba(184, 110, 61, 0.06);
  box-shadow: 0 4px 12px rgba(184, 110, 61, 0.08);
}

.g3-card-name {
  font-family: var(--display);
  font-size: 22px;
  color: var(--neutral-50);
  margin-top: 4px;
  line-height: 1.1;
}

.g3-card-desc {
  font-family: var(--serif);
  font-style: italic;
  font-size: 14px;
  color: var(--neutral-300);
  line-height: 1.4;
  flex-grow: 1;
}

.g3-card-actions {
  display: flex;
  gap: 8px;
  margin-top: auto;
}

.g3-card-btn {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  color: var(--copper-300);
  background: transparent;
  border: 1px solid var(--copper-700);
  padding: 6px 10px;
  cursor: pointer;
  transition: border-color 0.2s var(--ease), color 0.2s var(--ease);
}

.g3-card-btn:hover {
  border-color: var(--copper-300);
  color: var(--copper-100);
}
`;

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function G3ClaudeCapabilities() {
  const { stepIndex } = useDeck();

  const [videoOpen, setVideoOpen] = useState<{ src: string; caption: string } | null>(null);
  const [compareOpen, setCompareOpen] = useState<"schedules" | "artifacts" | null>(null);

  return (
    <>
      <style>{styles}</style>

      {/* STRUCTURAL — FigLabel + Headline (always present) */}
      <FigLabel section="G" num={3} label="CLAUDE CAPABILITIES" />

      <div className="slide-headline-row">
        <h1 className="slide-headline small">
          {highlight(C.headline, [...C.headlineKw])}
        </h1>
      </div>

      {/* SUBHEAD — mono 11px, copper-400 */}
      <div
        style={{
          position: "absolute",
          top: 128,
          left: 48,
          right: 48,
          fontFamily: "var(--mono)",
          fontSize: 11,
          color: "var(--copper-400)",
          textTransform: "uppercase",
          letterSpacing: "0.18em",
        }}
      >
        {C.subhead}
      </div>

      {/* CARD GRID — 4×2 layout, data-no-advance wrapper */}
      <div data-no-advance>
        <div
          style={{
            position: "absolute",
            left: 48,
            right: 48,
            top: 172,
            bottom: 120,
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridTemplateRows: "1fr 1fr",
            gap: 18,
          }}
        >
          {C.cards.map((card, i) => (
            <Reveal key={card.id} on={true} delay={120 + i * 80}>
              <div className="g3-card">
                <AnimatedGlyph kind={card.glyph as any} size={48} />
                <div className="g3-card-name">{card.name}</div>
                <div className="g3-card-desc">{card.desc}</div>
                <div className="g3-card-actions">
                  <button
                    className="g3-card-btn"
                    onClick={() =>
                      setVideoOpen({
                        src: `/videos/${card.videoFile}`,
                        caption: card.name,
                      })
                    }
                  >
                    ▶ Play video
                  </button>
                  {card.hasCompare && (
                    <button
                      className="g3-card-btn"
                      onClick={() => setCompareOpen(card.id as any)}
                    >
                      ⊙ Compare
                    </button>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* FOOTER — step 1 reveal */}
      <Reveal on={stepIndex >= 1} delay={120}>
        <div
          style={{
            position: "absolute",
            bottom: 64,
            left: 48,
            right: 48,
            textAlign: "center",
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 16,
            color: "var(--copper-200)",
          }}
        >
          {highlight(C.footer, [...C.footerKw])}
        </div>
      </Reveal>

      {/* VIDEO OVERLAY */}
      <VideoOverlay
        open={!!videoOpen}
        onClose={() => setVideoOpen(null)}
        videoSrc={videoOpen?.src ?? ""}
        caption={videoOpen?.caption ?? ""}
      />

      {/* COMPARE OVERLAYS */}
      <CompareOverlay
        open={compareOpen === "schedules"}
        onClose={() => setCompareOpen(null)}
        title={g3SchedulesCompare.title}
        columns={[...g3SchedulesCompare.columns]}
        rows={g3SchedulesCompare.rows.map((r) => ({
          label: r.label,
          cells: [...r.cells],
        }))}
        footer={g3SchedulesCompare.footer}
      />

      <CompareOverlay
        open={compareOpen === "artifacts"}
        onClose={() => setCompareOpen(null)}
        title={g3ArtifactsCompare.title}
        columns={[...g3ArtifactsCompare.columns]}
        rows={g3ArtifactsCompare.rows.map((r) => ({
          label: r.label,
          cells: [...r.cells],
        }))}
      />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE DEF
// ─────────────────────────────────────────────────────────────────────────────

export const g3Slide: SlideDef = {
  steps: 2,
  canonicalPose: 1,
  animationMode: "step-reveal",
  surface: "dark",
  section: "G",
  render: () => <G3ClaudeCapabilities />,
};
