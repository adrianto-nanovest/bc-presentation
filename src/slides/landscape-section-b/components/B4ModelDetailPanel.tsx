// B4ModelDetailPanel — per-category detail for the right section box.
//
// Renders whichever layout matches the active category's `layout` field:
//   • R1 (write-reason, code, agentic, multimodal):
//       FRONTIER LEADERS bar chart (3 rows, copper-700 fill)
//       OPEN-WEIGHT CONTENDER bar row (copper outline, no fill) + tagline
//       per-category serif-italic footnote (from `cat.footnote`)
//   • R2 (creative): four labelled chip groups (IMAGE / VIDEO / SPEECH / MUSIC)
//       + the same per-category footnote idiom.
//   • R3 (cost-intel): cost × intelligence scatter (`B4CostScatter`). The
//       scatter carries its own annotation in lieu of a footnote, so no
//       extra footer line is rendered here.
//
// Component is `key`-ed at the slide level on `categoryId` so changing the
// active card remounts the panel and replays the entry stagger.
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { highlight as KW } from "@/components/highlight";
import {
  b4Content as C,
  type B4BenchmarkBlock,
  type B4Category,
  type B4CategoryId,
  type B4CreativeChips,
} from "../content";
import { B4CostScatter } from "./B4CostScatter";

export interface B4ModelDetailPanelProps {
  categoryId: B4CategoryId;
}

export function B4ModelDetailPanel({
  categoryId,
}: B4ModelDetailPanelProps) {
  const cat = C.categories.find((x) => x.id === categoryId)!;

  // Mount gate — flip to true on next frame so children animate from rest.
  const [mounted, setMounted] = useState(false);
  const rafRef = useRef<number | null>(null);
  useEffect(() => {
    rafRef.current = window.requestAnimationFrame(() => setMounted(true));
    return () => {
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      data-testid="b4-detail-panel"
      data-category={categoryId}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        width: "100%",
        height: "100%",
      }}
    >
      <PanelHeader cat={cat} mounted={mounted} />

      <div style={{ flex: 1, position: "relative" }}>
        {cat.layout === "R1" && (
          <R1Body
            categoryId={categoryId as Exclude<B4CategoryId, "creative" | "cost-intel">}
            cat={cat}
            mounted={mounted}
          />
        )}
        {cat.layout === "R2" && (
          <R2Body data={C.creativeChips} cat={cat} mounted={mounted} />
        )}
        {cat.layout === "R3" && (
          <B4CostScatter
            points={C.scatter}
            annotation={C.scatterAnnotation}
          />
        )}
      </div>
    </div>
  );
}

// ───────────────────── Header ─────────────────────

function PanelHeader({
  cat,
  mounted,
}: {
  cat: B4Category;
  mounted: boolean;
}) {
  return (
    <div
      data-testid="b4-detail-header"
      style={{
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between",
        gap: 16,
        opacity: mounted ? 1 : 0,
        transition: "opacity 300ms var(--ease)",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <h2
          style={{
            margin: 0,
            fontFamily: "var(--display)",
            fontWeight: 400,
            fontSize: 28,
            color: "var(--neutral-50)",
            lineHeight: 1.05,
            letterSpacing: "-0.005em",
          }}
        >
          {cat.label}
        </h2>
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 10,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--copper-300)",
          }}
        >
          {cat.subLabel}
        </span>
      </div>
    </div>
  );
}

// ───────────────────── R1 layout (benchmark bars + footnote) ─────────────────────

const ROW_LABEL_WIDTH = 150;
const BAR_HEIGHT = 22;

function R1Body({
  categoryId,
  cat,
  mounted,
}: {
  categoryId: Exclude<B4CategoryId, "creative" | "cost-intel">;
  cat: B4Category;
  mounted: boolean;
}) {
  const data: B4BenchmarkBlock = C.benchmarks[categoryId];
  const maxScore = data.scaleMax;
  const unit = data.unit ?? "";
  const decimals = data.decimals ?? 1;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 14,
        height: "100%",
        paddingBottom: 24,
        boxSizing: "border-box",
      }}
    >
      <SectionHead text="FRONTIER LEADERS" />
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {data.frontier.map((row, i) => (
          <Bar
            key={row.name}
            name={row.name}
            score={row.score}
            max={maxScore}
            unit={unit}
            decimals={decimals}
            tone="frontier"
            mounted={mounted}
            delay={80 + i * 80}
          />
        ))}
      </div>

      {/* The licence restriction is disclosed HERE and nowhere else — once per
          pane, on the head that owns the open-weight row, rather than repeated
          against each of the four panels' bars. */}
      <div style={{ marginTop: 6 }}>
        <SectionHead text="OPEN-WEIGHT CONTENDER · COMMERCIAL USE RESTRICTED" />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <Bar
          name={data.openWeight.name}
          score={data.openWeight.score}
          max={maxScore}
          unit={unit}
          decimals={decimals}
          tone="open-weight"
          mounted={mounted}
          delay={80 + data.frontier.length * 80}
        />
        <div
          style={{
            marginLeft: ROW_LABEL_WIDTH + 12,
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 12,
            color: "var(--copper-200)",
            lineHeight: 1.3,
            opacity: mounted ? 1 : 0,
            transition: "opacity 300ms var(--ease) 480ms",
          }}
        >
          {data.openWeight.tagline}
        </div>
      </div>

      <div style={{ flex: 1, minHeight: 12 }} />

      <Footnote text={cat.footnote} kw={cat.footnoteKw} mounted={mounted} />
    </div>
  );
}

interface BarProps {
  name: string;
  score: number;
  max: number;
  /** Unit suffix appended to the score label (e.g. "%" for MMMU). */
  unit?: string;
  /** Decimal places on the score label — 0 for the indices AA publishes as
   *  whole numbers, so the bar never claims precision AA does not report. */
  decimals?: number;
  tone: "frontier" | "open-weight";
  mounted: boolean;
  delay: number;
}

function Bar({
  name,
  score,
  max,
  unit = "",
  decimals = 1,
  tone,
  mounted,
  delay,
}: BarProps) {
  const fraction = Math.max(0.04, Math.min(1, score / max));
  const isFrontier = tone === "frontier";

  const containerStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: `${ROW_LABEL_WIDTH}px 1fr auto`,
    alignItems: "center",
    gap: 12,
    minHeight: BAR_HEIGHT,
  };

  const nameStyle: CSSProperties = {
    fontFamily: "var(--serif)",
    fontSize: 14,
    color: "var(--neutral-100)",
    lineHeight: 1.1,
    textAlign: "left",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  const barTrackStyle: CSSProperties = {
    height: BAR_HEIGHT,
    position: "relative",
    background: "rgba(217,158,108,0.06)",
    overflow: "hidden",
    border: isFrontier ? "none" : "1px solid var(--copper-200)",
  };

  const barFillStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    width: `${fraction * 100}%`,
    background: isFrontier ? "var(--copper-700)" : "var(--copper-300)",
    transformOrigin: "left center",
    transform: mounted ? "scaleX(1)" : "scaleX(0)",
    transition: `transform 480ms var(--ease) ${delay}ms`,
  };

  const scoreStyle: CSSProperties = {
    fontFamily: "var(--mono)",
    fontSize: 12,
    letterSpacing: "0.08em",
    color: isFrontier ? "var(--neutral-100)" : "var(--copper-100)",
    minWidth: 28,
    textAlign: "right",
    opacity: mounted ? 1 : 0,
    transition: `opacity 320ms var(--ease) ${delay + 220}ms`,
  };

  return (
    <div data-testid={`b4-detail-bar-${name}`} style={containerStyle}>
      <span style={nameStyle}>{name}</span>
      <div style={barTrackStyle}>
        <div style={barFillStyle} />
      </div>
      <span style={scoreStyle}>
        {score.toFixed(decimals)}
        {unit}
      </span>
    </div>
  );
}

// ───────────────────── R2 layout (creative chips + footnote) ─────────────────────

function R2Body({
  data,
  cat,
  mounted,
}: {
  data: B4CreativeChips;
  cat: B4Category;
  mounted: boolean;
}) {
  // Four groups, not three: AA runs Speech (TTS) and Vocals (music) as
  // separate arenas, and the old single VOICE group filed Suno — which makes
  // songs — under a heading about voices.
  const groups: ReadonlyArray<{ label: string; chips: readonly string[] }> = [
    { label: "IMAGE", chips: data.image },
    { label: "VIDEO", chips: data.video },
    { label: "SPEECH", chips: data.speech },
    { label: "MUSIC", chips: data.music },
  ];

  // A fourth group costs ~46px, which the three-group spacing did not have:
  // the stack overflowed its envelope and pushed the footnote flush onto the
  // section-box border. The row rhythm below is tightened just enough that the
  // footnote keeps the same clearance it has on the R1 panes.
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        height: "100%",
        paddingBottom: 24,
        boxSizing: "border-box",
      }}
    >
      {groups.map((g, gi) => (
        <div
          key={g.label}
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(6px)",
            transition: `opacity 320ms var(--ease) ${
              80 + gi * 110
            }ms, transform 320ms var(--ease) ${80 + gi * 110}ms`,
          }}
        >
          <SectionHead text={g.label} />
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              marginTop: 6,
            }}
          >
            {g.chips.map((chip) => (
              <span
                key={chip}
                style={{
                  fontFamily: "var(--display)",
                  fontSize: 14,
                  lineHeight: 1.15,
                  color: "var(--neutral-100)",
                  border: "1px solid var(--copper-700)",
                  padding: "4px 10px",
                  background: "rgba(10,10,10,0.5)",
                }}
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      ))}

      <div style={{ flex: 1, minHeight: 12 }} />

      <Footnote text={cat.footnote} kw={cat.footnoteKw} mounted={mounted} />
    </div>
  );
}

// ───────────────────── Shared footnote line ─────────────────────

function Footnote({
  text,
  kw,
  mounted,
}: {
  text: string;
  kw: readonly string[];
  mounted: boolean;
}) {
  if (!text) return null;
  return (
    <p
      data-testid="b4-detail-footnote"
      style={{
        margin: 0,
        fontFamily: "var(--serif)",
        fontStyle: "italic",
        fontSize: 13,
        color: "var(--copper-200)",
        lineHeight: 1.4,
        opacity: mounted ? 1 : 0,
        transition: "opacity 320ms var(--ease) 480ms",
      }}
    >
      {KW(text, kw)}
    </p>
  );
}

// ───────────────────── Shared mono section heading ─────────────────────

function SectionHead({ text }: { text: string }) {
  return (
    <span
      style={{
        fontFamily: "var(--mono)",
        fontSize: 10,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: "var(--copper-500)",
      }}
    >
      {text}
    </span>
  );
}
