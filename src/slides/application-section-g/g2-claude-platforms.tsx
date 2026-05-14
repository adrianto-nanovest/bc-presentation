// G.2 — CLAUDE PLATFORMS
//
// Mirrors G.1 visually: four horizontal platform cards, each with a small
// uppercase platform tag (WEB · DESKTOP · CLI · API), display-font name,
// mono tagline, copper rule, and capability list. The Desktop card carries
// nested sub-groups (Chat / Cowork / Code); the other three cards render a
// flat bullet list. Both shapes flow from the same `{ group, items }` union.
//
// 2 reveal steps:
//   0 — All 4 cards fade in left→right with stagger (120 + i*140 ms)
//   1 — Closing line reveals at bottom

import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { Reveal } from "./components/Reveal";
import { g2Content as C } from "./content";
import "./g2-claude-platforms.css";

type Platform = (typeof C.platforms)[number];

function PlatformCard({ platform }: { platform: Platform }) {
  const kw = [...platform.capabilitiesKw];
  // A card is "nested" if any capability group carries a non-null label.
  const nested = platform.capabilities.some((g) => g.group !== null);

  return (
    <div className="g2-card">
      <div className="g2-card-tag">{platform.tag}</div>
      <div className="g2-card-name">{platform.name}</div>
      <div className="g2-card-tagline">
        {highlight(platform.tagline, [...platform.taglineKw])}
      </div>
      <hr className="g2-card-rule" />

      {nested ? (
        <div className="g2-card-groups">
          {platform.capabilities.map((group, i) => (
            <div key={i} className="g2-card-group">
              {group.group && (
                <div className="g2-card-group-label">
                  {highlight(group.group, kw)}
                </div>
              )}
              <div className="g2-card-group-items">
                {group.items.join(" · ")}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <ul className="g2-card-bullets">
          {platform.capabilities[0]?.items.map((item, i) => (
            <li key={i} className="g2-card-bullet">
              {highlight(item, kw)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ───────────────────── slide ─────────────────────

export function G2ClaudePlatforms() {
  const { stepIndex } = useDeck();

  const showClosing = stepIndex >= 1;

  return (
    <>
      <FigLabel section="G" num={2} label="CLAUDE PLATFORMS" />

      {/* ───────────── Headline (always structural, no Reveal) ───────────── */}
      <h1
        className="slide-headline small"
        style={{
          position: "absolute",
          top: 80,
          left: 48,
          right: 48,
          margin: 0,
        }}
      >
        {highlight(C.headline, [...C.headlineKw])}
      </h1>

      {/* ───────────── 4 platform cards (entry step 0, staggered) ────────── */}
      <div
        data-testid="g2-platform-cards"
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          top: 200,
          bottom: 140,
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 24,
        }}
      >
        {C.platforms.map((p, i) => (
          <Reveal
            key={p.id}
            on={true}
            delay={120 + i * 140}
            data-testid={`g2-card-${p.id}`}
            style={{ height: "100%" }}
          >
            <PlatformCard platform={p} />
          </Reveal>
        ))}
      </div>

      {/* ───────────── Closing line (step 1, bottom) ─────────────────────── */}
      <Reveal
        on={showClosing}
        delay={120}
        data-testid="g2-closing"
        style={{
          position: "absolute",
          bottom: 100,
          left: 48,
          right: 48,
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "var(--display)",
            fontStyle: "italic",
            fontSize: 22,
            color: "var(--copper-200)",
            margin: 0,
            lineHeight: 1.3,
          }}
        >
          {highlight(C.footer, [...C.footerKw])}
        </p>
      </Reveal>
    </>
  );
}

// ───────────────────── slide def ─────────────────────

export const g2Slide: SlideDef = {
  steps: 2,
  canonicalPose: 1,
  animationMode: "step-reveal",
  surface: "dark",
  section: "G",
  render: () => <G2ClaudePlatforms />,
};
