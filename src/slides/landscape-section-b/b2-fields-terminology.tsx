// B.2 — AI FIELDS & TERMINOLOGY (NESTED, NOT EQUAL)
//
// Five concentric rings on the left; per-tier focal detail panel on the
// right (mirrors the E.1 architecture). Step 0..4 cycles focal tiers
// outside-in (AI → LLM); step 5 swaps to the summary view (right panel
// becomes a 5-tier ladder; left rings move labels INSIDE each ring and the
// two sides sync via lifted hover state) AND reveals the footer caption
// as the last beat — footer delay puts it after the ladder cards finish
// staggering in.
import { useState } from "react";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight as KW } from "@/components/highlight";
import { Reveal, CopperRule } from "../foundation-core-section-e/components/Reveal";
import { NestedRingStack } from "./components/NestedRingStack";
import { b2Content as C } from "./content";

const STAGE_W = 1280;
const STAGE_H = 720;

type FocusIndex = 0 | 1 | 2 | 3 | 4;

export function B2FieldsTerminology() {
  const { stepIndex } = useDeck();
  const focusIndex: FocusIndex =
    stepIndex >= 4 ? 4 : (Math.max(0, Math.min(4, stepIndex)) as FocusIndex);
  const isSummary = stepIndex >= 5;
  const showFooter = stepIndex >= 5;

  const [hoveredTier, setHoveredTier] = useState<number | null>(null);

  const ringLabels = C.tiers.map((t) => t.shortLabel);

  return (
    <div
      data-testid="slide-b2"
      style={{
        position: "absolute",
        inset: 0,
        width: STAGE_W,
        height: STAGE_H,
        overflow: "hidden",
      }}
    >
      {/* Background — neutral-950 base + subtle dot grid. */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: "var(--neutral-950)",
          zIndex: 0,
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.05,
          backgroundImage:
            "radial-gradient(rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          zIndex: 1,
        }}
      />

      <FigLabel section="B" num={2} label={C.figLabel} />

      <div className="slide-headline-row">
        <h1 className="slide-headline small">
          {KW(C.slideTitle, C.slideTitleKw)}
        </h1>
      </div>

      {/* LEFT — five concentric rings. */}
      <div
        style={{
          position: "absolute",
          left: 60,
          top: 155,
          width: 540,
          height: 460,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 5,
        }}
      >
        <NestedRingStack
          focusIndex={focusIndex}
          width={540}
          height={460}
          labels={ringLabels}
          mode={isSummary ? "summary" : "focal"}
          hoveredTier={isSummary ? hoveredTier : null}
          onHoverTier={isSummary ? setHoveredTier : undefined}
        />
      </div>

      {/* RIGHT — focal detail panel (steps 0..4) cross-faded with the
          tier ladder (step 5+). Both occupy the same envelope. */}
      <div
        style={{
          position: "absolute",
          right: 60,
          top: 170,
          width: 580,
          bottom: 80,
          zIndex: 6,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: isSummary ? 0 : 1,
            transform: isSummary ? "translateY(-8px)" : "translateY(0)",
            transition:
              "opacity 0.35s var(--ease), transform 0.35s var(--ease)",
            pointerEvents: isSummary ? "none" : "auto",
          }}
        >
          <FocalDetail key={focusIndex} tierIndex={focusIndex} />
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: isSummary ? 1 : 0,
            transition: "opacity 0.4s var(--ease) 0.15s",
            pointerEvents: isSummary ? "auto" : "none",
          }}
        >
          <TierLadder
            on={isSummary}
            hoveredTier={hoveredTier}
            onHoverTier={setHoveredTier}
          />
        </div>
      </div>

      {/* Footer caption — same step as summary (5), but delayed to land
          AFTER the ladder cards have finished their 120ms-staggered reveal
          (last card completes around 980ms post-flip). */}
      <Reveal
        on={showFooter}
        delay={1100}
        data-testid="b2-footer-caption"
        style={{
          position: "absolute",
          left: 48,
          bottom: 50,
          right: 48,
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontSize: 14,
          color: "var(--neutral-400)",
          lineHeight: 1.4,
          zIndex: 7,
        }}
      >
        {KW(C.footerCaption, C.footerCaptionKw)}
      </Reveal>

      {/* Inline keyframe for innermost ring's ambient glow halo. */}
      <style>{`
        @keyframes b2-llm-glow {
          0%, 100% {
            filter: drop-shadow(0 0 4px rgba(217,158,108,0.30));
          }
          50% {
            filter: drop-shadow(0 0 14px rgba(217,158,108,0.55));
          }
        }
      `}</style>
    </div>
  );
}

// ───────────────────── FocalDetail ─────────────────────

function FocalDetail({ tierIndex }: { tierIndex: FocusIndex }) {
  const tier = C.tiers[tierIndex];
  const tierNum = tierIndex + 1;

  return (
    <Reveal on data-testid={`b2-focal-detail-${tierNum}`}>
      <span
        style={{
          fontFamily: "var(--mono)",
          fontSize: 12,
          letterSpacing: "0.22em",
          color: "var(--copper-300)",
          textTransform: "uppercase",
        }}
      >
        Tier {tierNum}
      </span>
      <h2
        style={{
          fontFamily: "var(--display)",
          fontSize: 48,
          color: "var(--neutral-50)",
          margin: "8px 0 6px 0",
          lineHeight: 1.02,
        }}
      >
        {tier.label}
      </h2>
      <p
        style={{
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontSize: 20,
          color: "var(--copper-200)",
          margin: "0 0 14px 0",
          lineHeight: 1.35,
          maxWidth: 540,
        }}
      >
        {KW(tier.essence, tier.essenceKw)}
      </p>

      <CopperRule on width="40%" delay={300} />

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: "14px 0 18px 0",
          maxWidth: 540,
        }}
      >
        {tier.bullets.map((b, i) => (
          <li
            key={i}
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 8,
              marginBottom: i === tier.bullets.length - 1 ? 0 : 9,
            }}
          >
            <span
              aria-hidden
              style={{
                fontFamily: "var(--mono)",
                fontSize: 11,
                color: "var(--copper-400)",
                lineHeight: 1.4,
                flex: "0 0 auto",
              }}
            >
              →
            </span>
            <span
              style={{
                fontFamily: "var(--serif)",
                fontSize: 14,
                color: "var(--neutral-200)",
                lineHeight: 1.4,
              }}
            >
              {b}
            </span>
          </li>
        ))}
      </ul>

      <div
        style={{
          fontFamily: "var(--mono)",
          fontSize: 10,
          letterSpacing: "0.22em",
          color: "var(--copper-400)",
          textTransform: "uppercase",
          marginBottom: 8,
        }}
      >
        Real-world examples
      </div>
      <div style={{ display: "flex", flexWrap: "nowrap", gap: 7, maxWidth: 540 }}>
        {tier.examples.map((ex) => (
          <span
            key={ex}
            data-testid={`b2-example-${ex.toLowerCase().replace(/\s+/g, "-")}`}
            style={{
              fontFamily: "var(--mono)",
              fontSize: 10,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "5px 8px",
              border: "1px solid var(--copper-700)",
              background: "rgba(10,10,10,0.4)",
              color: "var(--neutral-200)",
              whiteSpace: "nowrap",
            }}
          >
            {ex}
          </span>
        ))}
      </div>
    </Reveal>
  );
}

// ───────────────────── TierLadder (step 5 summary) ─────────────────────

interface TierLadderProps {
  on: boolean;
  hoveredTier: number | null;
  onHoverTier: (tier: number | null) => void;
}

function TierLadder({ on, hoveredTier, onHoverTier }: TierLadderProps) {
  return (
    <div
      data-testid="b2-tier-ladder"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <div
        style={{
          fontFamily: "var(--mono)",
          fontSize: 10,
          letterSpacing: "0.22em",
          color: "var(--copper-400)",
          textTransform: "uppercase",
          marginBottom: 6,
        }}
      >
        All five tiers · summary
      </div>
      <CopperRule on={on} width="40%" />
      <div style={{ height: 10 }} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          flex: 1,
          minHeight: 0,
        }}
      >
        {C.tiers.map((tier, i) => (
          <Reveal
            key={tier.tier}
            on={on}
            delay={120 * i}
            style={{ display: "flex" }}
          >
            <TierLadderCard
              tier={tier}
              hovered={hoveredTier === tier.tier}
              onHover={onHoverTier}
            />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

interface TierLadderCardProps {
  tier: (typeof C.tiers)[number];
  hovered: boolean;
  onHover: (tier: number | null) => void;
}

function TierLadderCard({ tier, hovered, onHover }: TierLadderCardProps) {
  return (
    <div
      data-testid={`b2-ladder-card-${tier.tier}`}
      data-hovered={hovered ? "true" : "false"}
      onMouseEnter={() => onHover(tier.tier)}
      onMouseLeave={() => onHover(null)}
      style={{
        flex: 1,
        minHeight: 70,
        display: "flex",
        alignItems: "stretch",
        gap: 14,
        padding: "12px 16px",
        border: `1px solid ${hovered ? "var(--copper-200)" : "var(--copper-700)"}`,
        background: hovered
          ? "rgba(217,158,108,0.08)"
          : "rgba(10,10,10,0.6)",
        boxShadow: hovered
          ? "0 0 0 1px var(--copper-400) inset, 0 0 22px -10px var(--copper-400)"
          : "none",
        transition:
          "background 0.18s var(--ease), border-color 0.18s var(--ease), box-shadow 0.18s var(--ease)",
        cursor: "default",
      }}
    >
      <div
        style={{
          flex: "0 0 30px",
          width: 30,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRight: "1px solid var(--copper-700)",
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: "0.22em",
          color: hovered ? "var(--copper-100)" : "var(--copper-300)",
          transition: "color 0.18s var(--ease)",
        }}
      >
        {tier.tier}
      </div>
      <div
        style={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <span
          style={{
            fontFamily: "var(--display)",
            fontSize: 19,
            color: hovered ? "var(--neutral-50)" : "var(--neutral-100)",
            lineHeight: 1.05,
            transition: "color 0.18s var(--ease)",
          }}
        >
          {tier.label}
        </span>
        <span
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 13,
            color: hovered ? "var(--copper-100)" : "var(--copper-200)",
            lineHeight: 1.3,
            transition: "color 0.18s var(--ease)",
          }}
        >
          {KW(tier.essence, tier.essenceKw)}
        </span>
      </div>
    </div>
  );
}

// ───────────────────── slide def ─────────────────────

export const b2Slide: SlideDef = {
  steps: 6,
  canonicalPose: 5,
  animationMode: "step-reveal",
  surface: "dark",
  section: "B",
  render: () => <B2FieldsTerminology />,
};
