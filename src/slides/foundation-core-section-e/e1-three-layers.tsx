// E.1 — THREE LAYERS
//
// 5 steps: 0=PROMPT focal, 1=CONTEXT focal, 2=HARNESS focal, 3=THE LOOP focal,
// 4=SUMMARY (the full stack).
//
// Step 3 names the loop for the first time in the deck, and it gets the same
// treatment as the three layers before it: a focal card on the right, its own
// ring on the left. That ring is the OUTERMOST one and it carries a marker that
// travels around it — the loop is repetition in TIME of the run the three inner
// rings draw in SPACE, and the motion is what says so. (Owner direction
// 2026-08-04; this replaces the tilted sweep arc of spec §8.2 / gh#45.)
//
// Step 4 then shows the whole figure at once with the four-row summary.
//
// Layout uses absolute coordinates against the 1280×720 stage (see
// src/deck/Slide.tsx + globals.css `.stage-wrap`). The design source is the
// spec for pixel positions — do not refactor into Tailwind utilities.
import { useState, type CSSProperties } from "react";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { RingStack } from "./components/RingStack";
import { Reveal, CopperRule } from "./components/Reveal";
import { e1Content as C } from "./content";

/** The three layers plus the loop, in ring order. One row per figure ring. */
const FOCALS = [...C.layers, C.loop] as const;
type FocalId = (typeof FOCALS)[number]["id"];

/** Eyebrow over each focal card. The loop carries a phrase, not a number — see
 *  `e1Content.loop` for why. */
const EYEBROW: Record<FocalId, string> = {
  prompt: "Layer 1",
  context: "Layer 2",
  harness: "Layer 3",
  loop: C.loop.eyebrow,
};

// ───────────────────── slide ─────────────────────

export function E1ThreeLayers() {
  const { stepIndex } = useDeck();
  const focal = stepIndex <= 3 ? FOCALS[stepIndex] : null;
  const isSummary = stepIndex === 4;
  const focusIndex = isSummary ? null : (stepIndex as 0 | 1 | 2 | 3);
  const mode: "focal" | "summary" = isSummary ? "summary" : "focal";
  // The loop ring is on stage from its own focal step onward.
  const showLoopRing = stepIndex >= 3;

  const [hoverTag, setHoverTag] = useState<string | null>(null);

  return (
    <>
      <FigLabel label="THE THREE LAYERS" />

      <div className="slide-headline-row">
        <h1 className="slide-headline">
          {highlight(C.headline, C.headlineKw)}
        </h1>
      </div>

      {/* Left: concentric rings, centered at y=380. The four-ring pose has to
          live between the headline (ends ≈128) and the footer (text top ≈654),
          so its outer ring is 452 — y 154–606, with the marker dot 4px proud of
          that. See `RING_GAP_4` in RingStack for why it is not larger. */}
      <div
        style={{
          position: "absolute",
          left: 60,
          top: 150,
          width: 540,
          height: 460,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <RingStack
          focusIndex={focusIndex}
          mode={mode}
          width={540}
          height={460}
          loop={showLoopRing}
        />
      </div>

      {/* Right: focal detail (steps 0–3) or the full-stack summary (step 4). */}
      <div
        style={{
          position: "absolute",
          right: 60,
          top: 170,
          width: 580,
          bottom: 100,
        }}
      >
        {focal && (
          <FocalDetail
            key={focal.id}
            data={focal}
            eyebrow={EYEBROW[focal.id]}
            hoverTag={hoverTag}
            setHoverTag={setHoverTag}
          />
        )}
        {isSummary && <LayerSummary />}
      </div>

      {/* Footer — step 4 only.
          `bottom: 60` lands this line's BASE on the TOP of the nav's
          `STEP nn / nn` row: `.nav-bar` pads 14 from the floor, the 28px button
          row and a 6px gap sit above it, so the counter text runs y≈660–672 —
          and a 17px/1.4 line at bottom 60 ends at y=660. It is left-anchored at
          x=60 while the counters are right-anchored past x=1030, so the two
          never meet. Clears the outer ring (bottom 606) by 30px. */}
      {isSummary && (
        <Reveal
          on
          delay={250}
          data-testid="e1-loop-footer"
          style={{
            position: "absolute",
            left: 60,
            right: 60,
            bottom: 60,
          }}
        >
          <p
            style={{
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontSize: 17,
              color: "var(--neutral-200)",
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            {highlight(C.loopFooter, C.loopFooterKw)}
          </p>
        </Reveal>
      )}
    </>
  );
}

// ───────────────────── FocalDetail (steps 0–3) ─────────────────────

interface FocalDetailProps {
  /** One entry of `FOCALS` — a layer, or the loop. Same card either way. */
  data: (typeof FOCALS)[number];
  eyebrow: string;
  hoverTag: string | null;
  setHoverTag: (t: string | null) => void;
}

function FocalDetail({ data, eyebrow, hoverTag, setHoverTag }: FocalDetailProps) {
  return (
    <Reveal on data-testid={`focal-detail-${data.id}`}>
      <span
        style={{
          fontFamily: "var(--mono)",
          fontSize: 12,
          letterSpacing: "0.22em",
          color: "var(--copper-300)",
          textTransform: "uppercase",
        }}
      >
        {eyebrow}
      </span>
      <h2
        style={{
          fontFamily: "var(--display)",
          fontSize: 56,
          color: "var(--neutral-50)",
          margin: "8px 0 6px 0",
          lineHeight: 0.98,
        }}
      >
        {data.titleA}
        <br />
        {data.titleB}
      </h2>
      <p
        style={{
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontSize: 20,
          color: "var(--copper-200)",
          margin: "0 0 14px 0",
        }}
      >
        {highlight(data.essence, data.kw)}
      </p>

      {/* Copper rule — animated reveal via class (delay 300ms). */}
      <CopperRule on width="40%" delay={300} />

      <p
        style={{
          fontFamily: "var(--serif)",
          fontSize: 16,
          color: "var(--neutral-300)",
          margin: "16px 0 18px 0",
          lineHeight: 1.5,
          maxWidth: 500,
        }}
      >
        {data.blurb}
      </p>

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
        Key terms · echoed in following slides
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, maxWidth: 540 }}>
        {data.tags.map((t) => {
          const isHover = hoverTag === t;
          const tagStyle: CSSProperties = {
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            padding: "6px 10px",
            border: `1px solid ${
              isHover ? "var(--copper-200)" : "var(--copper-700)"
            }`,
            background: isHover
              ? "rgba(217,158,108,0.12)"
              : "rgba(10,10,10,0.4)",
            color: isHover ? "var(--copper-100)" : "var(--neutral-200)",
            transition: "all 0.2s var(--ease)",
            cursor: "default",
          };
          const slug = t.toLowerCase().replace(/\s+/g, "-");
          return (
            <span
              key={t}
              data-testid={`tag-chip-${slug}`}
              data-hover={isHover ? "true" : "false"}
              onMouseEnter={() => setHoverTag(t)}
              onMouseLeave={() => setHoverTag(null)}
              style={tagStyle}
            >
              {t}
            </span>
          );
        })}
      </div>
    </Reveal>
  );
}

// ───────────────────── LayerSummary (step 4) ─────────────────────

function LayerSummary() {
  return (
    <Reveal on data-testid="layer-summary">
      <span
        style={{
          fontFamily: "var(--mono)",
          fontSize: 12,
          letterSpacing: "0.22em",
          color: "var(--copper-200)",
          textTransform: "uppercase",
        }}
      >
        Three Layers + The Loop · Summary
      </span>
      <h2
        style={{
          fontFamily: "var(--display)",
          fontSize: 44,
          color: "var(--copper-200)",
          margin: "10px 0 6px 0",
          lineHeight: 1,
        }}
      >
        The full stack.
      </h2>
      <CopperRule on width="40%" style={{ background: "var(--copper-200)" }} />

      {/* Four rows now, so the type and the gaps step down — the column has to
          finish above the footer at `bottom: 92`. */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          marginTop: 20,
        }}
      >
        {FOCALS.map((l, i) => {
          const isLoop = l.id === "loop";
          return (
            <Reveal
              on
              delay={300 + i * 150}
              key={l.id}
              data-testid={`summary-row-${l.id}`}
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 14,
                padding: "8px 14px",
                // The loop is not the fourth layer — a brighter rule and a gap
                // above it are what separate the run from its repetition.
                borderLeft: `2px solid ${
                  isLoop ? "var(--copper-400)" : "var(--copper-200)"
                }`,
                marginTop: isLoop ? 8 : 0,
              }}
            >
              {/* Fixed width, not `minWidth`: the marker column is what the
                  four titles align against, so a longer word here must not push
                  its own title right. */}
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 10,
                  letterSpacing: "0.22em",
                  color: isLoop ? "var(--copper-400)" : "var(--copper-300)",
                  textTransform: "uppercase",
                  width: 64,
                  flex: "0 0 64px",
                  whiteSpace: "nowrap",
                }}
              >
                {isLoop ? C.loop.summaryMarker : `Layer ${i + 1}`}
              </span>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: "var(--display)",
                    fontSize: 22,
                    color: "var(--neutral-50)",
                    lineHeight: 1.05,
                  }}
                >
                  {l.titleA} {l.titleB}
                </div>
                <div
                  style={{
                    fontFamily: "var(--serif)",
                    fontStyle: "italic",
                    fontSize: 14,
                    color: "var(--neutral-300)",
                    marginTop: 4,
                    lineHeight: 1.35,
                  }}
                >
                  {l.summarySub}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Reveal>
  );
}

// ───────────────────── slide def ─────────────────────

export const e1Slide: SlideDef = {
  id: "e1-three-layers",
  steps: 5,
  canonicalPose: 4,
  animationMode: "step-reveal",
  surface: "dark",
  sectionKey: "fundamentals",
  render: () => <E1ThreeLayers />,
};
