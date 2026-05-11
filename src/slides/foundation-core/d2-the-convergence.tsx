// D.2 — THE CONVERGENCE
//
// Ported from `claude-design-section-d/jsx/slides-d.jsx:265-624`.
// 3 steps:
//   0 — left card list visible; right = D2DetailPanel (blank by default,
//       fills when a left card is hovered).
//   1 — right swaps to D2Network; phase machine reveals BPM, RPA, AI, then
//       IPA + 3 feeder arrows, then AGENTIC + dashed arrow.
//   2 — italic copper-200 summary band fades in below the network. The slot
//       height is reserved on step 1 too so the network does not shift.
//
// canonicalPose = 2.
import { useState } from "react";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight as KW } from "@/components/highlight";
import { CopperRule } from "../foundation-core-section-e/components/Reveal";
import { D2ListCard } from "./components/D2ListCard";
import type { D2HoverKey } from "./components/D2ListCard";
import { D2DetailPanel } from "./components/D2DetailPanel";
import { D2Network } from "./components/D2Network";
import { d2Content as C } from "./content";

// ───────────────────── slide ─────────────────────

export function D2TheConvergence() {
  const { stepIndex } = useDeck();

  // Lifted hover state — single source of truth shared across the left
  // D2ListCards (which write it) AND the right column. On step 0 it drives
  // D2DetailPanel; on step 1+ it heats the matching D2Network arrow/satellite.
  const [hovered, setHovered] = useState<D2HoverKey>(null);

  const showNetwork = stepIndex >= 1;
  const showSummary = stepIndex >= 2;

  const hoverData = hovered
    ? C.cards.find((c) => c.key === hovered) ?? null
    : null;

  return (
    <>
      <FigLabel section="D" num={2} label="THE CONVERGENCE" />

      <div className="slide-headline-row">
        <h1 className="slide-headline small">
          {KW(C.headline, C.headlineKw)}
        </h1>
      </div>

      {/* Body — fixed height across all steps so left cards never shrink */}
      <div
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          top: 156,
          bottom: 80,
          display: "flex",
          gap: 28,
        }}
      >
        {/* LEFT — vertical card list (always visible, full height) */}
        <div
          style={{
            flex: "0 0 360px",
            display: "flex",
            flexDirection: "column",
            gap: 8,
            minHeight: 0,
          }}
        >
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: 10,
              letterSpacing: "0.22em",
              color: "var(--copper-400)",
              textTransform: "uppercase",
              marginBottom: 4,
            }}
          >
            Five disciplines
          </div>
          <CopperRule on width="40%" />
          <div style={{ height: 6 }} />
          {C.cards.map((card, i) => (
            <D2ListCard
              key={card.key}
              data={card}
              hovered={hovered}
              onHover={setHovered}
              delay={i * 90}
            />
          ))}
        </div>

        {/* RIGHT — detail panel (step 0, blank-by-default) OR network (step 1+) + summary band (step 2) */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
            position: "relative",
          }}
        >
          {/* Detail panel — step 0 only. Renders blank when nothing hovered. */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: showNetwork ? 0 : 1,
              transform: showNetwork ? "translateY(-8px)" : "translateY(0)",
              transition:
                "opacity 0.4s var(--ease), transform 0.4s var(--ease)",
              display: "flex",
              pointerEvents: showNetwork ? "none" : "auto",
            }}
          >
            <D2DetailPanel data={hoverData} />
          </div>

          {/* Network + step-2 summary — step 1+ */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: showNetwork ? 1 : 0,
              transition: "opacity 0.5s var(--ease) 0.15s",
              pointerEvents: showNetwork ? "auto" : "none",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ flex: 1, minHeight: 0 }}>
              <D2Network on={showNetwork} hovered={hovered} cards={C.cards} />
            </div>
            {/* Summary slot — height ALWAYS reserved so the illustration above
                stays vertically anchored across step 1 and step 2 (no shift
                on reveal). */}
            <div
              data-testid="d2-summary"
              style={{
                flex: "0 0 80px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                opacity: showSummary ? 1 : 0,
                transform: showSummary ? "translateY(0)" : "translateY(6px)",
                transition:
                  "opacity 0.5s var(--ease) 0.1s, transform 0.5s var(--ease) 0.1s",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--display)",
                  fontSize: 22,
                  fontStyle: "italic",
                  color: "var(--copper-200)",
                  margin: 0,
                  lineHeight: 1.3,
                }}
              >
                {KW(C.summary, C.summaryKw)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ───────────────────── slide def ─────────────────────

export const d2Slide: SlideDef = {
  steps: 3,
  canonicalPose: 2,
  animationMode: "step-reveal",
  surface: "dark",
  section: "D",
  render: () => <D2TheConvergence />,
};
