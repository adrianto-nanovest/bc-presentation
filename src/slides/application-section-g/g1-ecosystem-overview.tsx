// G.1 — ECOSYSTEM OVERVIEW
//
// Section G opener · 3-vendor convergence motif. Three orbs arranged
// horizontally center-stage, each with vendor-specific ambient particle
// animation looping continuously. Establishes the ecosystem framing:
// specialization, not single winners.
//
// Layout:
//   Top: FigLabel + headline (always structural, no Reveal)
//   Center: 3 vendor orbs (Claude, Google, OpenAI) with ambient loops
//   Below orbs: per-vendor labels (step 1)
//   Bottom: closing line (step 2)
//
// 3 reveal steps (spec §3.G.1):
//   0 — All 3 orbs fade in with stagger (120ms / 200ms / 280ms); loops run
//   1 — Per-vendor specialization labels appear beneath each orb
//   2 — Closing line reveals at bottom
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { Reveal } from "./components/Reveal";
import { EcosystemMotif } from "./components/EcosystemMotif";
import { g1Content as C } from "./content";

// ───────────────────── slide ─────────────────────

export function G1EcosystemOverview() {
  const { stepIndex } = useDeck();

  const showLabels = stepIndex >= 1;
  const showClosing = stepIndex >= 2;

  return (
    <>
      <FigLabel section="G" num={1} label="ECOSYSTEM" />

      {/* ───────────── Headline (always structural, no Reveal) ───────────── */}
      <h1
        className="slide-headline small"
        style={{
          position: "absolute",
          top: 80,
          left: 48,
          right: 48,
          margin: 0,
          textAlign: "center",
        }}
      >
        {highlight(C.headline, C.headlineKw)}
      </h1>

      {/* ───────────── 3 vendor orbs (entry step 0, staggered) ───────────── */}
      <Reveal on data-testid="g1-orb-claude" delay={120}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <EcosystemMotif />
        </div>
      </Reveal>

      {/* ───────────── Per-vendor labels (step 1, beneath each orb) ─────── */}
      <div
        data-testid="g1-vendor-labels"
        style={{
          position: "absolute",
          top: 470,
          left: 48,
          right: 48,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 80,
        }}
      >
        {C.vendors.map((v, i) => (
          <Reveal
            key={v.id}
            on={showLabels}
            delay={100 + i * 100}
            style={{
              flex: 1,
              textAlign: "center",
            }}
          >
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: 11,
                color: "var(--copper-300)",
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                lineHeight: 1.4,
              }}
            >
              {v.label}
            </span>
          </Reveal>
        ))}
      </div>

      {/* ───────────── Closing line (step 2, bottom) ───────────── */}
      <Reveal
        on={showClosing}
        delay={120}
        data-testid="g1-closing"
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
          {highlight(C.closingLine, C.closingLineKw)}
        </p>
      </Reveal>
    </>
  );
}

// ───────────────────── slide def ─────────────────────

export const g1Slide: SlideDef = {
  steps: 3,
  canonicalPose: 2,
  animationMode: "step-reveal",
  surface: "dark",
  section: "G",
  render: () => <G1EcosystemOverview />,
};
