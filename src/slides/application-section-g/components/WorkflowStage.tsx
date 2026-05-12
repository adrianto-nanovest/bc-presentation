// WorkflowStage — single stage card for the G.9 7-stage pipeline.
//
// Spec §1 + §2.G.9. Vertical stack:
//   01 (mono number, copper-300)
//   [glyph 64×64, centered]
//   RESEARCH (display 18px)
//   Understand the problem (serif 13px, neutral-300)
//   ─── 1px copper-700 divider ───
//   tool chips (mono 10px, one per line)
//
// `active` is driven by the parent <WorkflowPipeline> as the flow particle
// passes each stage zone. Hover overrides flow-pulse momentarily and uses
// the same copper-200 border + copper-300 chip brighten.
import { useState } from "react";
import { AnimatedGlyph, type GlyphKind } from "@/components/AnimatedGlyph";

export interface WorkflowStageProps {
  num: string; // "01"…"07" (already zero-padded in content)
  name: string;
  purpose: string;
  tools: readonly string[];
  active: boolean; // flow-pulse trigger
  glyphKind: GlyphKind;
}

export function WorkflowStage({
  num,
  name,
  purpose,
  tools,
  active,
  glyphKind,
}: WorkflowStageProps) {
  const [hover, setHover] = useState(false);
  const lit = active || hover;

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: 165,
        height: "100%",
        boxSizing: "border-box",
        padding: 12,
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        gap: 8,
        border: `1px solid ${lit ? "var(--copper-200)" : "var(--copper-700)"}`,
        background: "rgba(10, 10, 10, 0.5)",
        transition:
          "border-color 0.2s var(--ease), box-shadow 0.2s var(--ease), background 0.2s var(--ease)",
        boxShadow: lit ? "0 0 12px rgba(184,110,61,0.18)" : "none",
        position: "relative",
      }}
    >
      {/* Number — mono 11px copper-300 */}
      <div
        style={{
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: "0.18em",
          color: "var(--copper-300)",
        }}
      >
        {num}
      </div>

      {/* Glyph — 64×64 centered */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 4,
          paddingBottom: 4,
        }}
      >
        <AnimatedGlyph kind={glyphKind} size={64} />
      </div>

      {/* Name — display 18px */}
      <div
        style={{
          fontFamily: "var(--display)",
          fontSize: 18,
          color: "var(--neutral-50)",
          lineHeight: 1.1,
          letterSpacing: "0.02em",
        }}
      >
        {name}
      </div>

      {/* Purpose — serif 13px neutral-300 */}
      <div
        style={{
          fontFamily: "var(--serif)",
          fontSize: 13,
          color: "var(--neutral-300)",
          lineHeight: 1.3,
          fontStyle: "italic",
        }}
      >
        {purpose}
      </div>

      {/* Divider — 1px copper-700 */}
      <div
        style={{
          height: 1,
          background: "var(--copper-700)",
          margin: "4px 0",
        }}
      />

      {/* Tool chips — mono 10px, one per line */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        {tools.map((tool) => (
          <div
            key={tool}
            style={{
              fontFamily: "var(--mono)",
              fontSize: 10,
              letterSpacing: "0.08em",
              color: lit ? "var(--copper-300)" : "var(--copper-500)",
              transition: "color 0.2s var(--ease)",
              lineHeight: 1.3,
            }}
          >
            {tool}
          </div>
        ))}
      </div>
    </div>
  );
}
