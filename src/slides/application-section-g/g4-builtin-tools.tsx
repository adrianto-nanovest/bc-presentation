import { useDeck } from "../../deck/DeckContext";
import { FigLabel } from "../../components/FigLabel";
import { highlight } from "../../components/highlight";
import { Reveal } from "./components/Reveal";
import { AnimatedGlyph } from "../../components/AnimatedGlyph";
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
          padding: 14px 18px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          overflow: hidden;
        }
        .g4-quadrant-header {
          font-family: var(--mono);
          font-size: 12px;
          letter-spacing: 0.20em;
          color: var(--copper-300);
          text-transform: uppercase;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--copper-800);
          margin-bottom: 6px;
        }
        .g4-quadrant-items {
          display: flex;
          flex-direction: column;
          gap: 4px;
          flex: 1;
        }
        .g4-item {
          display: grid;
          grid-template-columns: 28px 140px 1fr;
          gap: 10px;
          align-items: center;
          padding: 4px 6px;
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
          width: 24px;
          height: 24px;
        }
        .g4-item-name {
          font-family: var(--mono);
          font-size: 12px;
          color: var(--copper-100);
          letter-spacing: 0.05em;
        }
        .g4-item:hover .g4-item-name {
          color: var(--copper-50, #fbf6f1);
        }
        .g4-item-essence {
          font-family: var(--serif);
          font-style: italic;
          font-size: 12px;
          color: var(--neutral-300);
          line-height: 1.35;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .g4-footer {
          position: absolute;
          bottom: 48px;
          left: 48px;
          right: 48px;
          text-align: center;
          font-family: var(--serif);
          font-style: italic;
          font-size: 16px;
          color: var(--copper-200);
          line-height: 1.4;
        }
      `}</style>

      <FigLabel section="G" num={4} label="BUILT-IN TOOLS & COMMANDS" />

      <h1 className="slide-headline small">
        {highlight(C.headline, [...C.headlineKw])}
      </h1>

      <div
        data-no-advance
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          top: 156,
          bottom: 96,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          gap: 24,
        }}
      >
        {/* Q1 — Agents (step 0) */}
        <div className="g4-quadrant">
          <div className="g4-quadrant-header">{C.quadrants[0].header}</div>
          <div className="g4-quadrant-items">
            {C.quadrants[0].items.map((item, i) => (
              <Reveal on={stepIndex >= 0} delay={120 + i * 80} key={item.name}>
                <ItemRow item={item} />
              </Reveal>
            ))}
          </div>
        </div>

        {/* Q2 — Slash Commands (step 1) */}
        <div className="g4-quadrant">
          <div className="g4-quadrant-header">{C.quadrants[1].header}</div>
          <div className="g4-quadrant-items">
            {C.quadrants[1].items.map((item, i) => (
              <Reveal on={stepIndex >= 1} delay={120 + i * 80} key={item.name}>
                <ItemRow item={item} />
              </Reveal>
            ))}
          </div>
        </div>

        {/* Q3 — Built-in Tools (step 2) */}
        <div className="g4-quadrant">
          <div className="g4-quadrant-header">{C.quadrants[2].header}</div>
          <div className="g4-quadrant-items">
            {C.quadrants[2].items.map((item, i) => (
              <Reveal on={stepIndex >= 2} delay={120 + i * 80} key={item.name}>
                <ItemRow item={item} />
              </Reveal>
            ))}
          </div>
        </div>

        {/* Q4 — Hooks (step 3) */}
        <div className="g4-quadrant">
          <div className="g4-quadrant-header">{C.quadrants[3].header}</div>
          <div className="g4-quadrant-items">
            {C.quadrants[3].items.map((item, i) => (
              <Reveal on={stepIndex >= 3} delay={120 + i * 80} key={item.name}>
                <ItemRow item={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Footer (step 4) */}
      <Reveal on={stepIndex >= 4} delay={120}>
        <div className="g4-footer">
          {highlight(C.footer, [...C.footerKw])}
        </div>
      </Reveal>
    </>
  );
}

function ItemRow({ item }: { item: { name: string; essence: string; glyph: string | null } }) {
  return (
    <div className="g4-item">
      <div className="g4-item-glyph">
        {item.glyph ? (
          <AnimatedGlyph kind={item.glyph as any} size={20} />
        ) : (
          <StaticIcon />
        )}
      </div>
      <span className="g4-item-name">{item.name}</span>
      <span className="g4-item-essence">{item.essence}</span>
    </div>
  );
}

function StaticIcon() {
  return (
    <span
      style={{
        display: "inline-block",
        width: 14,
        height: 2,
        background: "var(--copper-700)",
      }}
    />
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
