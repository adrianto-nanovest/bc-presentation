// B.4 — TIERS & DEPLOYMENT
//
// Three horizontal bands stacked vertically:
//   TOP   (~30%): Tier ladder. Three rungs build BOTTOM-UP (Haiku → Sonnet →
//                 Opus) so the audience feels the ladder grow. Border-left
//                 grades copper-700 → copper-400 by tier so the apex visibly
//                 brightens.
//   MID   (~25%): Competitor strip. Four horizontal chips slide in left-to-
//                 right with a 100ms stagger.
//   BOTTOM(~40%): Cloud-vs-Local split. LEFT half (frontier) appears first,
//                 RIGHT half (local + fine-tune) second, then a copper arrow
//                 draws between them via SVG pathLength and the italic
//                 insight line fades in below.
//
// Step map (load animation is mount-driven; stepIndex 0 = first Space press):
//   load (on mount): FIG label + dot-grid background fade in
//   stepIndex 0:     Tier ladder builds bottom-up — Haiku → Sonnet → Opus
//                    (300ms per row, 150ms stagger)
//   stepIndex 1:     Competitor strip slides in (4 chips, 100ms stagger)
//   stepIndex 2:     Cloud-Frontier side (LEFT) reveals
//   stepIndex 3:     Local + Fine-Tuned side (RIGHT) reveals
//   stepIndex 4 (canonical):
//                    Copper connecting arrow draws via stroke-dashoffset +
//                    italic key-insight line fades in
//
// Background tier: diagrammatic → plain neutral-950 + faint dot-grid (matches
// B.1/B.2/B.3 and A.1).
//
// Hover (presenter detail layer) is intentionally minimal here — the slide
// already carries a lot of text. Tier rows lift slightly + brighten the
// border on hover; competitor chips brighten their border. Anything heavier
// would interfere with the "land the load-bearing insight" moment.
import type { CSSProperties } from "react";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight } from "@/components/highlight";
import { b4Content as C } from "./content";

// Stage: 1280×720. FIG band ~88px top, nav reserves ~64px bottom.
const SIDE_PAD = 64;

// Vertical band tops (px from stage top). Tuned so the three bands sit
// comfortably between the FIG label and the bottom nav.
const LADDER_TOP = 120;
const LADDER_HEIGHT = 168;     // ~3 rows × 52px + small gap
const COMPETITORS_TOP = LADDER_TOP + LADDER_HEIGHT + 22; // ≈ 310
const COMPETITORS_HEIGHT = 64;
const SPLIT_TOP = COMPETITORS_TOP + COMPETITORS_HEIGHT + 28; // ≈ 402
const SPLIT_HEIGHT = 160;
const INSIGHT_TOP = SPLIT_TOP + SPLIT_HEIGHT + 22; // ≈ 584

// ───────────────────── slide ─────────────────────

export function B4TiersDeployment() {
  const { stepIndex } = useDeck();

  // Step gates. The ladder builds bottom-up: bottom row (Haiku) appears at
  // step 0 immediately; mid row staggers 150ms; apex row staggers 300ms. We
  // keep this internal to the rendering rather than splitting across step
  // indices — one Space press lights the whole ladder, which matches the
  // spec's "Tier ladder builds bottom-up" beat.
  const ladderOn = stepIndex >= 0;
  const competitorsOn = stepIndex >= 1;
  const cloudOn = stepIndex >= 2;
  const localOn = stepIndex >= 3;
  const arrowOn = stepIndex >= 4;
  const insightOn = stepIndex >= 4;

  return (
    <div
      data-testid="slide-b4"
      style={{ position: "absolute", inset: 0, overflow: "hidden" }}
    >
      {/* Background — plain dark + dot-grid (matches the rest of section B). */}
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

      <FigLabel section="B" num={4} label={C.figLabel} />

      {/* ───────────── BAND 1 — Tier ladder ───────────── */}
      <div
        data-testid="b4-ladder"
        style={{
          position: "absolute",
          left: SIDE_PAD,
          right: SIDE_PAD,
          top: LADDER_TOP,
          height: LADDER_HEIGHT,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          zIndex: 5,
        }}
      >
        <BandLabel text="TIER LADDER · CLAUDE FAMILY" />
        <div
          style={{
            display: "flex",
            flexDirection: "column-reverse", // bottom-up: Haiku first visually
            gap: 6,
            marginTop: 8,
          }}
        >
          {/* Render in source order (top → mid → apex); flex-direction
              column-reverse stacks bottom-to-top visually so the ladder
              grammar matches the audience reading flow. */}
          {C.tiers.map((t, i) => (
            <TierRung
              key={t.position}
              position={t.position}
              model={t.model}
              price={t.price}
              caption={highlight(t.caption, t.captionKw)}
              on={ladderOn}
              delay={i * 150}
            />
          ))}
        </div>
      </div>

      {/* ───────────── BAND 2 — Competitor strip ───────────── */}
      <div
        data-testid="b4-competitors"
        style={{
          position: "absolute",
          left: SIDE_PAD,
          right: SIDE_PAD,
          top: COMPETITORS_TOP,
          height: COMPETITORS_HEIGHT,
          display: "flex",
          flexDirection: "column",
          gap: 6,
          zIndex: 5,
        }}
      >
        <BandLabel text="VIABLE ALTERNATIVES · ASIA FRONTIER" />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 12,
            marginTop: 4,
          }}
        >
          {C.competitors.map((c, i) => (
            <CompetitorTile
              key={c.name}
              name={c.name}
              desc={c.desc}
              on={competitorsOn}
              delay={i * 100}
            />
          ))}
        </div>
      </div>

      {/* ───────────── BAND 3 — Cloud / Local split + insight ───────────── */}
      <div
        data-testid="b4-split"
        style={{
          position: "absolute",
          left: SIDE_PAD,
          right: SIDE_PAD,
          top: SPLIT_TOP,
          height: SPLIT_HEIGHT,
          zIndex: 5,
        }}
      >
        <SplitWithArrow
          cloudOn={cloudOn}
          localOn={localOn}
          arrowOn={arrowOn}
          cloudLabel={C.cloud.label}
          cloudSuperlative={highlight(C.cloud.superlative, C.cloud.superlativeKw)}
          localLabel={C.local.label}
          localSuperlative={highlight(C.local.superlative, C.local.superlativeKw)}
        />
      </div>

      {/* ───────────── Key insight ───────────── */}
      <div
        data-testid="b4-insight"
        style={{
          position: "absolute",
          left: SIDE_PAD,
          right: SIDE_PAD,
          top: INSIGHT_TOP,
          textAlign: "center",
          opacity: insightOn ? 1 : 0,
          transform: insightOn ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.6s var(--ease) 0.25s, transform 0.6s var(--ease) 0.25s",
          zIndex: 5,
        }}
      >
        <p
          style={{
            margin: 0,
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 25,
            lineHeight: 1.3,
            color: "var(--neutral-200)",
            letterSpacing: "-0.005em",
          }}
        >
          {highlight(C.insight, C.insightKw)}
        </p>
      </div>
    </div>
  );
}

// ───────────────────── BandLabel ─────────────────────

function BandLabel({ text }: { text: string }) {
  return (
    <span
      style={{
        fontFamily: "var(--mono)",
        fontSize: 10,
        letterSpacing: "0.28em",
        color: "var(--copper-300)",
        textTransform: "uppercase",
      }}
    >
      {text}
    </span>
  );
}

// ───────────────────── TierRung ─────────────────────
// Single ladder rung. Renders model + price + caption in a horizontal row
// with a 2px copper border-left whose tone brightens by tier (entry → apex).
// Slides up + fades in from `delay` ms.

const positionAccent: Record<"top" | "mid" | "apex", string> = {
  top: "copper-700",  // entry — dim
  mid: "copper-500",
  apex: "copper-300", // apex — brightest
};

function TierRung({
  position,
  model,
  price,
  caption,
  on,
  delay,
}: {
  position: "top" | "mid" | "apex";
  model: string;
  price: string;
  caption: React.ReactNode;
  on: boolean;
  delay: number;
}) {
  // Visible position label varies by spec. Render the human-facing tier
  // tag (ENTRY / WORKHORSE / APEX) since "top/mid/apex" maps to the data
  // model rather than what the audience reads.
  const tag: Record<typeof position, string> = {
    top: "ENTRY",
    mid: "WORKHORSE",
    apex: "APEX",
  };
  const accent = positionAccent[position];

  return (
    <div
      data-testid={`b4-tier-${position}`}
      style={{
        display: "grid",
        gridTemplateColumns: "108px 230px 110px 1fr",
        alignItems: "baseline",
        gap: 18,
        padding: "10px 14px",
        borderLeft: `2px solid var(--${accent})`,
        background: "rgba(10,10,10,0.35)",
        opacity: on ? 1 : 0,
        transform: on ? "translateY(0)" : "translateY(10px)",
        transition: `opacity 0.45s var(--ease) ${delay}ms, transform 0.45s var(--ease) ${delay}ms`,
      }}
    >
      <span
        style={{
          fontFamily: "var(--mono)",
          fontSize: 10,
          letterSpacing: "0.28em",
          color: `var(--${accent})`,
          textTransform: "uppercase",
        }}
      >
        {tag[position]}
      </span>
      <span
        style={{
          fontFamily: "var(--display)",
          fontSize: 22,
          color: "var(--neutral-50)",
          lineHeight: 1,
        }}
      >
        {model}
      </span>
      <span
        style={{
          fontFamily: "var(--mono)",
          fontSize: 12,
          letterSpacing: "0.08em",
          color: "var(--copper-200)",
        }}
      >
        {price}
      </span>
      <span
        style={{
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontSize: 14,
          color: "var(--neutral-300)",
          lineHeight: 1.3,
        }}
      >
        {caption}
      </span>
    </div>
  );
}

// ───────────────────── CompetitorTile ─────────────────────
// Slim chip for the alternatives strip. Slides in from below + fades.

function CompetitorTile({
  name,
  desc,
  on,
  delay,
}: {
  name: string;
  desc: string;
  on: boolean;
  delay: number;
}) {
  return (
    <div
      data-testid="b4-competitor"
      style={{
        padding: "8px 12px",
        border: "1px solid var(--copper-800)",
        background: "rgba(10,10,10,0.55)",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        opacity: on ? 1 : 0,
        transform: on ? "translateY(0)" : "translateY(8px)",
        transition: `opacity 0.45s var(--ease) ${delay}ms, transform 0.45s var(--ease) ${delay}ms, border-color 0.25s var(--ease)`,
      }}
    >
      <span
        style={{
          fontFamily: "var(--mono)",
          fontSize: 10,
          letterSpacing: "0.2em",
          color: "var(--copper-200)",
          textTransform: "uppercase",
        }}
      >
        {name}
      </span>
      <span
        style={{
          fontFamily: "var(--serif)",
          fontSize: 12,
          color: "var(--neutral-300)",
          fontStyle: "italic",
          lineHeight: 1.25,
        }}
      >
        {desc}
      </span>
    </div>
  );
}

// ───────────────────── SplitWithArrow ─────────────────────
// Two-half panel with a copper arrow drawn via SVG path between them.
// The two halves are absolutely positioned inside a relative container so
// the arrow SVG (which sits between them) can overlap their inner edges
// cleanly. Arrow draws via stroke-dashoffset (pathLength-style animation).

function SplitWithArrow({
  cloudOn,
  localOn,
  arrowOn,
  cloudLabel,
  cloudSuperlative,
  localLabel,
  localSuperlative,
}: {
  cloudOn: boolean;
  localOn: boolean;
  arrowOn: boolean;
  cloudLabel: string;
  cloudSuperlative: React.ReactNode;
  localLabel: string;
  localSuperlative: React.ReactNode;
}) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "grid",
        gridTemplateColumns: "1fr 80px 1fr",
        alignItems: "stretch",
        gap: 0,
      }}
    >
      <SplitHalf
        sideLabel="CLOUD · FRONTIER (RAW)"
        mainLine={cloudLabel}
        superlative={cloudSuperlative}
        on={cloudOn}
        align="right"
      />

      {/* Center arrow well. Stretches the full band height; arrow draws
          horizontally at the vertical midline. */}
      <ArrowBetween on={arrowOn} />

      <SplitHalf
        sideLabel="LOCAL · FINE-TUNED"
        mainLine={localLabel}
        superlative={localSuperlative}
        on={localOn}
        align="left"
      />
    </div>
  );
}

function SplitHalf({
  sideLabel,
  mainLine,
  superlative,
  on,
  align,
}: {
  sideLabel: string;
  mainLine: string;
  superlative: React.ReactNode;
  on: boolean;
  align: "left" | "right";
}) {
  const containerStyle: CSSProperties = {
    padding: "16px 18px",
    border: "1px solid var(--copper-800)",
    background: "rgba(10,10,10,0.55)",
    display: "flex",
    flexDirection: "column",
    gap: 8,
    height: "100%",
    boxSizing: "border-box",
    opacity: on ? 1 : 0,
    transform: on ? "translateY(0)" : "translateY(10px)",
    transition: "opacity 0.5s var(--ease), transform 0.5s var(--ease)",
    textAlign: align,
  };
  return (
    <div data-testid={`b4-split-${align}`} style={containerStyle}>
      <span
        style={{
          fontFamily: "var(--mono)",
          fontSize: 10,
          letterSpacing: "0.28em",
          color: "var(--copper-300)",
          textTransform: "uppercase",
        }}
      >
        {sideLabel}
      </span>
      <span
        style={{
          fontFamily: "var(--display)",
          fontSize: 22,
          color: "var(--neutral-50)",
          lineHeight: 1.15,
        }}
      >
        {mainLine}
      </span>
      <span
        style={{
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontSize: 14,
          color: "var(--copper-200)",
          marginTop: "auto",
        }}
      >
        {superlative}
      </span>
    </div>
  );
}

// Connecting copper arrow drawn via stroke-dashoffset. Curved line from the
// right edge of the left half to the left edge of the right half, with an
// arrowhead at the destination. The arrowhead opacity follows the path so
// it appears at the same time as the path completes.
function ArrowBetween({ on }: { on: boolean }) {
  const W = 80;
  const H = 160; // matches SPLIT_HEIGHT
  // Path: subtle S-curve from (0, mid) → (W, mid). Length ~80 (close enough
  // for a smooth gradual stroke).
  const pathLength = 90;
  return (
    <div
      data-testid="b4-arrow"
      data-on={on ? "1" : "0"}
      aria-hidden
      style={{
        position: "relative",
        width: W,
        height: H,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        width={W}
        height={H}
        viewBox={`0 0 ${W} ${H}`}
        style={{ overflow: "visible" }}
      >
        <defs>
          <marker
            id="b4-arrow-head"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--copper-400)" />
          </marker>
        </defs>
        <path
          d={`M 0 ${H / 2} C ${W / 3} ${H / 2 - 8}, ${(W * 2) / 3} ${H / 2 + 8}, ${W} ${H / 2}`}
          fill="none"
          stroke="var(--copper-400)"
          strokeWidth="1.5"
          strokeDasharray={pathLength}
          strokeDashoffset={on ? 0 : pathLength}
          style={{ transition: "stroke-dashoffset 700ms var(--ease)" }}
          markerEnd="url(#b4-arrow-head)"
        />
      </svg>
    </div>
  );
}

// ───────────────────── slide def ─────────────────────

export const b4Slide: SlideDef = {
  // 5 stepIndex values (0..4): ladder, competitors, cloud, local, arrow+insight.
  steps: 5,
  canonicalPose: 4,
  animationMode: "step-reveal",
  surface: "dark",
  section: "B",
  render: () => <B4TiersDeployment />,
};
