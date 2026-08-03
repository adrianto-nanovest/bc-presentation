// PROTOTYPE gh#16 — variant A · STAIRCASE (port of the hr-group web/ ladder)
//
// Answers the second open question directly: this IS the `web/index.html`
// geometry, re-cut for a 1280×720 stage and repainted in copper. The port cost
// is low — the original is one <path> plus text nodes — but the ORIGINAL'S
// COLOUR CODING DOES NOT SURVIVE. web/ separates its two markers with cyan vs
// violet; a single-hue copper system has no second hue to spend, so the
// asserted/open distinction has to be carried by form instead.
//
// How this variant carries it, with no legend:
//   asserted → solid copper chip, SOLID leader line, filled dot on the tread,
//              and the source printed underneath in mono. It looks measured.
//   open     → hairline dashed chip, DASHED leader line ending in an open ring,
//              and the text is a serif-italic sentence ending in "?".
//              It looks asked.
import type { Brand, Marker } from "./brief";
import { ladderBrief as L } from "./brief";
import { FigLabel } from "@/components/FigLabel";
import { highlight as KW } from "@/components/highlight";
import { useDeck } from "@/deck/DeckContext";

// Tread geometry, in stage coordinates.
const TREADS = [
  { x1: 96, x2: 300, y: 596 },
  { x1: 300, x2: 500, y: 528 },
  { x1: 500, x2: 700, y: 460 },
  { x1: 700, x2: 900, y: 392 },
  { x1: 900, x2: 1184, y: 324 },
];

const STAIR_PATH = `M ${TREADS[0].x1} ${TREADS[0].y} H ${TREADS[0].x2} V ${TREADS[1].y} H ${TREADS[1].x2} V ${TREADS[2].y} H ${TREADS[2].x2} V ${TREADS[3].y} H ${TREADS[3].x2} V ${TREADS[4].y} H ${TREADS[4].x2}`;

function centre(i: number) {
  const t = TREADS[i];
  return { x: (t.x1 + t.x2) / 2, y: t.y };
}

// Fractional `at` interpolates between tread centres so a marker can sit
// "between L1 and L2" honestly instead of being forced onto a rung.
function point(at: number) {
  const lo = Math.floor(at);
  const hi = Math.min(lo + 1, TREADS.length - 1);
  const f = at - lo;
  const a = centre(lo);
  const b = centre(hi);
  return { x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f };
}

export function LadderStaircase({ brand }: { brand: Brand }) {
  const { stepIndex } = useDeck();
  const markers = L.markers[brand];
  const absence = L.absence[brand];

  const showAsserted = stepIndex >= 1;
  const showOpen = stepIndex >= 2;
  const showAside = stepIndex >= 3;
  const showPhases = stepIndex >= 4;

  const visible = (m: Marker) =>
    m.kind === "asserted" ? showAsserted : m.kind === "open" ? showOpen : showAside;

  return (
    <>
      <FigLabel label={L.fig.label} />

      <div className="slide-headline-row">
        <h1 className="slide-headline small">{KW(L.headline, [...L.headlineKw])}</h1>
      </div>

      <div
        style={{
          position: "absolute",
          left: 48,
          top: 136,
          fontFamily: "var(--mono)",
          fontSize: 10,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "var(--neutral-400)",
        }}
      >
        {L.provenance}
      </div>

      <svg className="svg-layer" style={{ zIndex: 1 }} viewBox="0 0 1280 720" preserveAspectRatio="none">
        {/* the staircase, drawn on entry */}
        <path
          d={STAIR_PATH}
          fill="none"
          strokeLinejoin="round"
          strokeLinecap="round"
          style={{
            stroke: "var(--copper-500)",
            strokeWidth: 2.5,
            strokeDasharray: 1800,
            strokeDashoffset: 0,
            animation: "protoDraw 1.4s var(--ease) both",
          }}
        />

        {markers.map((m) => {
          const p = point(m.at);
          const on = visible(m);
          if (m.kind === "aside") {
            return (
              <circle
                key={m.id}
                cx={p.x}
                cy={p.y}
                r={4}
                style={{
                  fill: "var(--copper-600)",
                  opacity: on ? 1 : 0,
                  transition: "opacity 0.4s var(--ease)",
                }}
              />
            );
          }
          const asserted = m.kind === "asserted";
          const chipY = p.y - 96;
          return (
            <g key={m.id} style={{ opacity: on ? 1 : 0, transition: "opacity 0.45s var(--ease)" }}>
              <line
                x1={p.x}
                y1={chipY}
                x2={p.x}
                y2={p.y - 8}
                style={{
                  stroke: asserted ? "var(--copper-300)" : "var(--copper-600)",
                  strokeWidth: asserted ? 2 : 1,
                  strokeDasharray: asserted ? "none" : "3 5",
                }}
              />
              {asserted ? (
                <circle cx={p.x} cy={p.y} r={6} style={{ fill: "var(--copper-300)" }} />
              ) : (
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={6}
                  style={{ fill: "none", stroke: "var(--copper-600)", strokeWidth: 1.4 }}
                />
              )}
            </g>
          );
        })}
      </svg>

      {/* rung labels, hung under each tread */}
      {L.rungs.map((r, i) => {
        const t = TREADS[i];
        return (
          <div
            key={r.id}
            style={{
              position: "absolute",
              left: t.x1 + 10,
              top: t.y + 10,
              width: t.x2 - t.x1 - 12,
              zIndex: 2,
            }}
          >
            <div
              style={{
                fontFamily: "var(--display)",
                fontSize: 21,
                color: "var(--neutral-50)",
                lineHeight: 1.1,
              }}
            >
              <span style={{ color: "var(--copper-300)" }}>{r.level}</span> · {r.title}
            </div>
            <div
              style={{
                fontFamily: "var(--sans)",
                fontSize: 12,
                color: "var(--neutral-400)",
                marginTop: 4,
                lineHeight: 1.3,
              }}
            >
              {r.sub}
            </div>
            {showPhases &&
              L.phases
                .filter((ph) => ph.at === i)
                .map((ph) => (
                  <div
                    key={ph.id}
                    className="fade on"
                    style={{
                      marginTop: 8,
                      display: "inline-block",
                      padding: "3px 8px",
                      border: "1px solid var(--copper-700)",
                      fontFamily: "var(--mono)",
                      fontSize: 10,
                      letterSpacing: "0.14em",
                      color: "var(--copper-200)",
                      textTransform: "uppercase",
                    }}
                  >
                    {ph.label} → {ph.target}
                  </div>
                ))}
          </div>
        );
      })}

      {/* marker chips */}
      {markers.map((m) => {
        const p = point(m.at);
        const on = visible(m);
        if (m.kind === "aside") {
          return (
            <div
              key={m.id}
              style={{
                position: "absolute",
                // Above the riser — the tread below it belongs to the L2 label
                // block, and the two collide if the aside sits on the line.
                left: p.x + 16,
                top: p.y - 62,
                fontFamily: "var(--mono)",
                fontSize: 10,
                letterSpacing: "0.14em",
                color: "var(--neutral-500)",
                whiteSpace: "nowrap",
                opacity: on ? 1 : 0,
                transition: "opacity 0.4s var(--ease)",
                zIndex: 4,
              }}
            >
              {m.label}
            </div>
          );
        }
        const asserted = m.kind === "asserted";
        return (
          <div
            key={m.id}
            data-testid={`stair-marker-${m.id}`}
            style={{
              position: "absolute",
              left: p.x,
              top: p.y - 96,
              transform: "translate(-50%, -100%)",
              width: asserted ? 330 : 380,
              padding: asserted ? "12px 16px" : "12px 16px",
              boxSizing: "border-box",
              border: asserted ? "1px solid var(--copper-300)" : "1px dashed var(--copper-600)",
              background: asserted ? "rgba(184,110,61,0.20)" : "rgba(10,10,10,0.55)",
              opacity: on ? 1 : 0,
              transition: "opacity 0.45s var(--ease)",
              zIndex: 5,
            }}
          >
            {asserted ? (
              <>
                <div
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 13,
                    fontWeight: 500,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--neutral-0)",
                  }}
                >
                  {m.label}
                </div>
                <div
                  style={{
                    marginTop: 8,
                    fontFamily: "var(--sans)",
                    fontSize: 11,
                    lineHeight: 1.4,
                    color: "var(--copper-100)",
                  }}
                >
                  {m.citation}
                </div>
              </>
            ) : (
              <>
                <div
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 10,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--neutral-400)",
                  }}
                >
                  {m.label}
                </div>
                <p
                  style={{
                    margin: "8px 0 0 0",
                    fontFamily: "var(--serif)",
                    fontStyle: "italic",
                    fontSize: 20,
                    lineHeight: 1.3,
                    color: "var(--neutral-50)",
                  }}
                >
                  {m.question}
                </p>
                <div
                  style={{
                    marginTop: 8,
                    fontFamily: "var(--sans)",
                    fontSize: 11,
                    lineHeight: 1.4,
                    color: "var(--neutral-400)",
                  }}
                >
                  {m.evidence}
                </div>
              </>
            )}
          </div>
        );
      })}

      {/* stated absence (berau only) */}
      {absence && (
        <div
          style={{
            position: "absolute",
            right: 48,
            top: 176,
            width: 420,
            textAlign: "right",
            fontFamily: "var(--sans)",
            fontSize: 12,
            lineHeight: 1.5,
            color: "var(--neutral-400)",
            opacity: showAsserted ? 1 : 0,
            transition: "opacity 0.45s var(--ease)",
            zIndex: 4,
          }}
        >
          {absence}
        </div>
      )}

      <p
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          bottom: 26,
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontSize: 18,
          color: "var(--neutral-200)",
          margin: 0,
          opacity: showAside ? 1 : 0,
          transition: "opacity 0.45s var(--ease)",
          zIndex: 6,
        }}
      >
        {KW(L.closer, [...L.closerKw])}
      </p>
    </>
  );
}
