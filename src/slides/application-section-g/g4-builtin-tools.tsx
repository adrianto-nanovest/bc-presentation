import { useDeck } from "../../deck/DeckContext";
import { FigLabel } from "../../components/FigLabel";
import { highlight } from "../../components/highlight";
import { Reveal } from "./components/Reveal";
import { AnimatedGlyph } from "../../components/AnimatedGlyph";
import { LucideIcon } from "../foundation-techniques-section-f/components/LucideIcon";
import type { SlideDef } from "../../deck/types";
import { g4Content as C } from "./content";

export function G4BuiltinTools() {
  const { stepIndex } = useDeck();

  return (
    <>
      <style>{`
        .g4-quadrant {
          border: 1px solid var(--copper-700);
          background: rgba(10, 10, 10, 0.5);
          padding: 10px 16px 16px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          overflow: hidden;
          height: 100%;
          box-sizing: border-box;
          transition: border-color 0.2s var(--ease), background 0.2s var(--ease), box-shadow 0.2s var(--ease);
        }
        .g4-quadrant:hover {
          border-color: var(--copper-200);
          background: rgba(184, 110, 61, 0.06);
          box-shadow: 0 4px 12px rgba(184, 110, 61, 0.08);
        }
        .g4-quadrant-header {
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.20em;
          color: var(--copper-300);
          text-transform: uppercase;
          padding-bottom: 4px;
          border-bottom: 1px solid var(--copper-800);
          margin-bottom: 2px;
        }
        .g4-quadrant-items {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .g4-item {
          display: grid;
          grid-template-columns: 22px 132px 1fr;
          gap: 10px;
          align-items: center;
          padding: 1px 6px;
          transition: background 0.18s var(--ease), color 0.18s var(--ease);
          cursor: default;
        }
        .g4-item:hover {
          background: rgba(184, 110, 61, 0.08);
        }
        .g4-item-glyph {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 18px;
          height: 18px;
        }
        .g4-item-name {
          font-family: var(--mono);
          font-size: 10.5px;
          color: var(--copper-100);
          letter-spacing: 0.05em;
        }
        .g4-item:hover .g4-item-name {
          color: var(--copper-50, #fbf6f1);
        }
        .g4-item-essence {
          font-family: var(--serif);
          font-style: italic;
          font-size: 11px;
          color: var(--neutral-300);
          line-height: 1.3;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      `}</style>

      <FigLabel section="G" num={4} label="BUILT-IN TOOLS & COMMANDS" />
      <div className="slide-headline-row">
        <h1 className="slide-headline small">
          {highlight(C.headline, [...C.headlineKw])}
        </h1>
      </div>

      <div
        data-no-advance
        style={{
          position: "absolute",
          left: 32,
          right: 32,
          top: 148,
          bottom: 158,
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
          gridTemplateRows: "auto auto",
          gap: 14,
          alignContent: "start",
        }}
      >
        {/* Q1 — Agents (step 0) */}
        <Reveal on={stepIndex >= 0} delay={120} style={{ height: "100%" }}>
          <div className="g4-quadrant">
            <div className="g4-quadrant-header">{C.quadrants[0].header}</div>
            <div className="g4-quadrant-items">
              {C.quadrants[0].items.map((item) => (
                <ItemRow item={item} key={item.name} />
              ))}
            </div>
          </div>
        </Reveal>

        {/* Q2 — Slash Commands (step 1) */}
        <Reveal on={stepIndex >= 1} delay={120} style={{ height: "100%" }}>
          <div className="g4-quadrant">
            <div className="g4-quadrant-header">{C.quadrants[1].header}</div>
            <div className="g4-quadrant-items">
              {C.quadrants[1].items.map((item) => (
                <ItemRow item={item} key={item.name} />
              ))}
            </div>
          </div>
        </Reveal>

        {/* Q3 — Built-in Tools (step 2) */}
        <Reveal on={stepIndex >= 2} delay={120} style={{ height: "100%" }}>
          <div className="g4-quadrant">
            <div className="g4-quadrant-header">{C.quadrants[2].header}</div>
            <div className="g4-quadrant-items">
              {C.quadrants[2].items.map((item) => (
                <ItemRow item={item} key={item.name} />
              ))}
            </div>
          </div>
        </Reveal>

        {/* Q4 — Hooks (step 3) */}
        <Reveal on={stepIndex >= 3} delay={120} style={{ height: "100%" }}>
          <div className="g4-quadrant">
            <div className="g4-quadrant-header">{C.quadrants[3].header}</div>
            <div className="g4-quadrant-items">
              {C.quadrants[3].items.map((item) => (
                <ItemRow item={item} key={item.name} />
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* Footer (step 4) */}
      <Reveal
        on={stepIndex >= 4}
        delay={120}
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

function ItemRow({
  item,
}: {
  item: {
    name: string;
    essence: string;
    essenceKw?: readonly string[];
    glyph: string | null;
  };
}) {
  const isLucide = item.glyph?.startsWith("lucide:");
  return (
    <div className="g4-item">
      <div className="g4-item-glyph">
        {isLucide ? (
          <LucideIcon
            name={item.glyph!.slice(7)}
            size={14}
            color="var(--copper-300)"
            strokeWidth={1.5}
          />
        ) : (
          <AnimatedGlyph kind={(item.glyph ?? "dash-pulse") as any} size={16} tight />
        )}
      </div>
      <span className="g4-item-name">{item.name}</span>
      <span className="g4-item-essence">
        {highlight(item.essence, item.essenceKw ?? [])}
      </span>
    </div>
  );
}

export const g4Slide: SlideDef = {
  steps: 5,
  canonicalPose: 4,
  animationMode: "step-reveal",
  surface: "dark",
  section: "G",
  render: () => <G4BuiltinTools />,
};
