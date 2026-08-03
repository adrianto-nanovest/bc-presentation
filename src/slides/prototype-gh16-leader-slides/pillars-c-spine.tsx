// PROTOTYPE gh#16 — variant C · SPINE (two columns)
//
// A middle position between A and B: keeps the "everything hangs off the
// enabler" claim (there is still a literal spine, and a literal connector), but
// lays the six pillars out on a reading grid instead of a clock face.
//
// ANSWER IT PROPOSES to the dimming question: the OTHER FIVE never carry body
// text to begin with, so there is nothing to dim. They are labels. The focus
// walk grows one tile and draws one connector; the slide's total luminance
// barely moves between steps, which is the property a projector actually cares
// about.
//
// Watch for: the connector crossing the gutter is the whole reason this variant
// exists. If it reads as decoration rather than as "the enabler is deciding
// this", the variant has failed and A is the better hub.
import type { Brand } from "./brief";
import { pillarBrief as B } from "./brief";
import { Icon } from "./icons";
import { FigLabel } from "@/components/FigLabel";
import { highlight as KW } from "@/components/highlight";
import { useDeck } from "@/deck/DeckContext";

const COL_L = { left: 48, width: 492 };
const COL_R = { left: 740, width: 492 };
const SPINE_X = 640;
const TOP = 254;
const GAP = 10;
const H_ON = 190;
const H_OFF = 86;
const H_EVEN = 122;

// Row heights for one column given which of its three rows is focused (-1 none).
function heights(colFocus: number): number[] {
  if (colFocus < 0) return [H_EVEN, H_EVEN, H_EVEN];
  return [0, 1, 2].map((r) => (r === colFocus ? H_ON : H_OFF));
}

function centerY(hs: number[], row: number): number {
  let y = TOP;
  for (let r = 0; r < row; r++) y += hs[r] + GAP;
  return y + hs[row] / 2;
}

export function PillarsSpine({ brand }: { brand: Brand }) {
  const { stepIndex } = useDeck();
  const showTiles = stepIndex >= 1;
  const focus = stepIndex >= 2 && stepIndex <= 7 ? stepIndex - 2 : -1;
  const showCloser = stepIndex >= 8;

  // pillars 0–2 on the left, 3–5 on the right
  const focusCol = focus < 0 ? -1 : focus < 3 ? 0 : 1;
  const focusRow = focus < 0 ? -1 : focus % 3;
  const hsL = heights(focusCol === 0 ? focusRow : -1);
  const hsR = heights(focusCol === 1 ? focusRow : -1);

  const connY = focus < 0 ? 0 : centerY(focusCol === 0 ? hsL : hsR, focusRow);
  const connX2 = focusCol === 0 ? COL_L.left + COL_L.width : COL_R.left;

  return (
    <>
      <FigLabel label={B.fig.label} />

      <div className="slide-headline-row">
        <h1 className="slide-headline small">{KW(B.headline, [...B.headlineKw])}</h1>
      </div>

      {/* spine + connector */}
      <svg className="svg-layer" style={{ zIndex: 1 }} viewBox="0 0 1280 720" preserveAspectRatio="none">
        <line
          x1={SPINE_X}
          y1={244}
          x2={SPINE_X}
          y2={646}
          style={{
            stroke: "var(--copper-800)",
            strokeWidth: 1.5,
            opacity: showTiles ? 1 : 0,
            transition: "opacity 0.5s var(--ease) 150ms",
          }}
        />
        {focus >= 0 && (
          <>
            <line
              x1={SPINE_X}
              y1={connY}
              x2={connX2}
              y2={connY}
              style={{ stroke: "var(--copper-200)", strokeWidth: 2.4, transition: "all 0.4s var(--ease)" }}
            />
            <circle
              cx={SPINE_X}
              cy={connY}
              r={5}
              style={{ fill: "var(--copper-200)", transition: "all 0.4s var(--ease)" }}
            />
          </>
        )}
      </svg>

      {/* enabler plate, sat on top of the spine */}
      <div
        style={{
          position: "absolute",
          left: SPINE_X,
          top: 200,
          transform: "translate(-50%, -50%)",
          padding: "10px 24px",
          border: "1px solid var(--copper-300)",
          background: "rgba(184,110,61,0.16)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          zIndex: 3,
          whiteSpace: "nowrap",
        }}
      >
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 10,
            letterSpacing: "0.24em",
            color: "var(--copper-100)",
          }}
        >
          {B.hub.label}
        </span>
        <span style={{ fontFamily: "var(--display)", fontSize: 22, color: "var(--neutral-0)", lineHeight: 1 }}>
          {B.hub.brandLine[brand]}
        </span>
      </div>

      {[0, 1].map((col) => {
        const geom = col === 0 ? COL_L : COL_R;
        const hs = col === 0 ? hsL : hsR;
        return (
          <div
            key={col}
            style={{
              position: "absolute",
              left: geom.left,
              width: geom.width,
              top: TOP,
              display: "flex",
              flexDirection: "column",
              gap: GAP,
              zIndex: 2,
            }}
          >
            {[0, 1, 2].map((row) => {
              const i = col * 3 + row;
              const p = B.pillars[i];
              const on = focus === i;
              return (
                <div
                  key={p.id}
                  data-testid={`spine-pillar-${p.id}`}
                  data-active={on ? "true" : "false"}
                  style={{
                    height: hs[row],
                    overflow: "hidden",
                    boxSizing: "border-box",
                    padding: "14px 18px",
                    // Collapsed tiles centre their one line; an open tile
                    // top-aligns so the decision reads as hanging off the label.
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: on ? "flex-start" : "center",
                    border: `1px solid ${on ? "var(--copper-200)" : "var(--copper-800)"}`,
                    background: on ? "rgba(184,110,61,0.16)" : "rgba(10,10,10,0.6)",
                    opacity: showTiles ? 1 : 0,
                    transition: `height 0.42s var(--ease), border-color 0.35s var(--ease), background 0.35s var(--ease), opacity 0.4s var(--ease) ${140 + i * 70}ms`,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span
                      style={{
                        color: on ? "var(--copper-100)" : "var(--copper-400)",
                        display: "flex",
                        transition: "color 0.35s var(--ease)",
                      }}
                    >
                      <Icon name={p.icon} size={20} />
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--display)",
                        fontSize: 23,
                        lineHeight: 1,
                        color: on ? "var(--neutral-0)" : "var(--neutral-200)",
                        transition: "color 0.35s var(--ease)",
                      }}
                    >
                      {p.label}
                    </span>
                  </div>

                  {/* Both must collapse to zero height when closed — an 86px
                      tile that centres 130px of content clips it top and bottom. */}
                  <p
                    style={{
                      margin: on ? "16px 0 0 0" : 0,
                      maxHeight: on ? 100 : 0,
                      overflow: "hidden",
                      fontFamily: "var(--serif)",
                      fontSize: 21,
                      lineHeight: 1.35,
                      color: "var(--neutral-50)",
                      opacity: on ? 1 : 0,
                      transition: `max-height 0.42s var(--ease), margin 0.42s var(--ease), opacity 0.3s var(--ease) ${on ? 140 : 0}ms`,
                    }}
                  >
                    {KW(p.decision, [...p.decisionKw])}
                  </p>
                  <div
                    style={{
                      marginTop: on ? 14 : 0,
                      maxHeight: on ? 20 : 0,
                      overflow: "hidden",
                      fontFamily: "var(--mono)",
                      fontSize: 10,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--copper-300)",
                      opacity: on ? 1 : 0,
                      transition: `max-height 0.42s var(--ease), margin 0.42s var(--ease), opacity 0.3s var(--ease) ${on ? 200 : 0}ms`,
                    }}
                  >
                    → ACT III · {p.actIII}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}

      <div
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          bottom: 30,
          zIndex: 6,
        }}
      >
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.22em",
            color: "var(--copper-400)",
            opacity: stepIndex === 0 ? 1 : 0,
            transition: "opacity 0.35s var(--ease)",
          }}
        >
          {B.kicker}
        </div>
        <p
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 18,
            color: "var(--neutral-200)",
            margin: 0,
            opacity: showCloser ? 1 : 0,
            transition: "opacity 0.45s var(--ease)",
          }}
        >
          {KW(B.closer, [...B.closerKw])}
        </p>
      </div>
    </>
  );
}
