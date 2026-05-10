// E.1 — THREE LAYERS
//
// Ported from `claude-design-project/jsx/slides-a.jsx:36-184`.
// 4 steps: 0=PROMPT focal, 1=CONTEXT focal, 2=HARNESS focal, 3=SUMMARY.
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

type LayerId = (typeof C.layers)[number]["id"];

// ───────────────────── slide ─────────────────────

export function E1ThreeLayers() {
  const { stepIndex } = useDeck();
  const focal: LayerId | null =
    stepIndex === 0
      ? "prompt"
      : stepIndex === 1
      ? "context"
      : stepIndex === 2
      ? "harness"
      : null;
  const isSummary = stepIndex === 3;
  const focusIndex =
    stepIndex === 0 ? 0 : stepIndex === 1 ? 1 : stepIndex === 2 ? 2 : null;
  const mode: "focal" | "summary" = isSummary ? "summary" : "focal";

  const [hoverTag, setHoverTag] = useState<string | null>(null);

  return (
    <>
      <FigLabel section="E" num={1} label="THE THREE LAYERS" />

      <div className="slide-headline-row">
        <h1 className="slide-headline">
          {highlight(C.headline, C.headlineKw)}
        </h1>
      </div>

      {/* Left: concentric rings — top-aligned with the right column. */}
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
        }}
      >
        <RingStack focusIndex={focusIndex} mode={mode} width={540} height={460} />
      </div>

      {/* Right: focal detail (steps 0–2) or layer summary (step 3). */}
      <div
        style={{
          position: "absolute",
          right: 60,
          top: 170,
          width: 580,
          bottom: 80,
        }}
      >
        {focal && (
          <FocalDetail
            key={focal}
            layer={focal}
            hoverTag={hoverTag}
            setHoverTag={setHoverTag}
          />
        )}
        {isSummary && <LayerSummary key="summary" />}
      </div>

      {/* Footer quote — only on summary step. */}
      {isSummary && (
        <Reveal
          on
          delay={250}
          data-testid="e1-footer-quote"
          style={{
            position: "absolute",
            left: 60,
            right: 60,
            bottom: 30,
            display: "flex",
            alignItems: "baseline",
            gap: 16,
          }}
        >
          <span
            style={{
              fontFamily: "var(--display)",
              fontSize: 36,
              color: "var(--copper-400)",
              lineHeight: 1,
            }}
          >
            “
          </span>
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
            {highlight(C.quote, C.quoteKw)}
          </p>
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11,
              letterSpacing: "0.18em",
              color: "var(--neutral-500)",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            {C.attr}
          </span>
        </Reveal>
      )}
    </>
  );
}

// ───────────────────── FocalDetail (steps 0–2) ─────────────────────

interface FocalDetailProps {
  layer: LayerId;
  hoverTag: string | null;
  setHoverTag: (t: string | null) => void;
}

function FocalDetail({ layer, hoverTag, setHoverTag }: FocalDetailProps) {
  const data = C.layers.find((l) => l.id === layer);
  if (!data) return null;
  const layerNum = layer === "prompt" ? 1 : layer === "context" ? 2 : 3;

  return (
    <Reveal on data-testid={`focal-detail-${layer}`}>
      <span
        style={{
          fontFamily: "var(--mono)",
          fontSize: 12,
          letterSpacing: "0.22em",
          color: "var(--copper-300)",
          textTransform: "uppercase",
        }}
      >
        Layer {layerNum}
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

// ───────────────────── LayerSummary (step 3) ─────────────────────

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
        Three Layers · Summary
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

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          marginTop: 22,
        }}
      >
        {C.layers.map((l, i) => (
          <Reveal
            on
            delay={300 + i * 150}
            key={l.id}
            data-testid={`summary-row-${l.id}`}
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 14,
              padding: "10px 14px",
              borderLeft: "2px solid var(--copper-200)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: 10,
                letterSpacing: "0.22em",
                color: "var(--copper-300)",
                textTransform: "uppercase",
                minWidth: 56,
              }}
            >
              Layer {i + 1}
            </span>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontFamily: "var(--display)",
                  fontSize: 24,
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
                  fontSize: 15,
                  color: "var(--neutral-300)",
                  marginTop: 4,
                  lineHeight: 1.35,
                }}
              >
                {l.summarySub}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Reveal>
  );
}

// ───────────────────── slide def ─────────────────────

export const e1Slide: SlideDef = {
  steps: 4,
  canonicalPose: 3,
  animationMode: "step-reveal",
  surface: "dark",
  section: "E",
  render: () => <E1ThreeLayers />,
};
