// PROTOTYPE gh#16 — variant B · AXIS (above the line / below the line)
//
// Not a ladder at all: one horizontal band carrying L1→L5, and the two
// epistemic statuses encoded by WHICH SIDE OF THE BAND a marker sits on.
//
// The claim being tested: side-of-the-line is the cheapest legend-free encoding
// there is, because the audience learns it from the first two markers and never
// has to look it up. Above the line = we put it there and we will defend it
// (mono, solid, sourced). Below the line = we are asking (serif italic,
// dashed, ends in "?").
//
// Cost: the band is a weaker metaphor than a staircase. Nothing about a
// horizontal strip says "climbing", so the phase strip at the bottom has to
// carry the direction on its own.
import type { Brand, Marker } from "./brief";
import { ladderBrief as L } from "./brief";
import { FigLabel } from "@/components/FigLabel";
import { highlight as KW } from "@/components/highlight";
import { useDeck } from "@/deck/DeckContext";

const BAND = { left: 96, right: 1184, top: 300, height: 76 };
const CELL = (BAND.right - BAND.left) / 5;

function cellX(i: number) {
  return BAND.left + CELL * (i + 0.5);
}

function markerX(at: number) {
  const lo = Math.floor(at);
  const hi = Math.min(lo + 1, 4);
  return cellX(lo) + (cellX(hi) - cellX(lo)) * (at - lo);
}

export function LadderAxis({ brand }: { brand: Brand }) {
  const { stepIndex } = useDeck();
  const markers = L.markers[brand];
  const absence = L.absence[brand];

  const showAsserted = stepIndex >= 1;
  const showOpen = stepIndex >= 2;
  const showAside = stepIndex >= 3;
  const showPhases = stepIndex >= 4;

  const visible = (m: Marker) =>
    m.kind === "asserted" ? showAsserted : m.kind === "open" ? showOpen : showAside;

  const bandBottom = BAND.top + BAND.height;

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

      {/* tethers */}
      <svg className="svg-layer" style={{ zIndex: 1 }} viewBox="0 0 1280 720" preserveAspectRatio="none">
        {markers.map((m) => {
          const x = markerX(m.at);
          const on = visible(m);
          if (m.kind === "aside") return null;
          const asserted = m.kind === "asserted";
          return (
            <g key={m.id} style={{ opacity: on ? 1 : 0, transition: "opacity 0.45s var(--ease)" }}>
              <line
                x1={x}
                y1={asserted ? 286 : bandBottom + 4}
                x2={x}
                y2={asserted ? BAND.top - 2 : 390}
                style={{
                  stroke: asserted ? "var(--copper-300)" : "var(--copper-600)",
                  strokeWidth: asserted ? 2 : 1,
                  strokeDasharray: asserted ? "none" : "3 5",
                }}
              />
              <circle
                cx={x}
                cy={asserted ? BAND.top : bandBottom}
                r={5.5}
                style={
                  asserted
                    ? { fill: "var(--copper-300)" }
                    : { fill: "var(--neutral-900)", stroke: "var(--copper-600)", strokeWidth: 1.4 }
                }
              />
            </g>
          );
        })}
      </svg>

      {/* the band — L1…L5 live inside it, so above/below stays free for meaning */}
      <div
        style={{
          position: "absolute",
          left: BAND.left,
          top: BAND.top,
          width: BAND.right - BAND.left,
          height: BAND.height,
          display: "flex",
          border: "1px solid var(--copper-600)",
          background: "rgba(184,110,61,0.08)",
          zIndex: 2,
        }}
      >
        {L.rungs.map((r, i) => (
          <div
            key={r.id}
            style={{
              flex: 1,
              minWidth: 0,
              padding: "10px 14px",
              boxSizing: "border-box",
              borderLeft: i === 0 ? "none" : "1px solid var(--copper-800)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 4,
            }}
          >
            <div style={{ fontFamily: "var(--display)", fontSize: 19, lineHeight: 1, color: "var(--neutral-50)" }}>
              <span style={{ color: "var(--copper-300)" }}>{r.level}</span> {r.title}
            </div>
            <div style={{ fontFamily: "var(--sans)", fontSize: 11, lineHeight: 1.3, color: "var(--neutral-400)" }}>
              {r.sub}
            </div>
          </div>
        ))}
      </div>

      {/* markers */}
      {markers.map((m) => {
        const x = markerX(m.at);
        const on = visible(m);

        if (m.kind === "aside") {
          return (
            <div
              key={m.id}
              style={{
                position: "absolute",
                // Parked on the band's right shoulder: below-the-line is spoken
                // for by the open question and the two overlap there.
                right: 48,
                top: BAND.top - 22,
                textAlign: "right",
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
              ▸ {m.label}
            </div>
          );
        }

        const asserted = m.kind === "asserted";
        return (
          <div
            key={m.id}
            data-testid={`axis-marker-${m.id}`}
            style={{
              position: "absolute",
              left: Math.min(Math.max(x, 250), 1030),
              top: asserted ? undefined : 390,
              bottom: asserted ? 720 - 286 : undefined,
              transform: "translateX(-50%)",
              width: asserted ? 400 : 440,
              padding: "12px 16px",
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
                    fontSize: 14,
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
                    fontSize: 12,
                    lineHeight: 1.45,
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
                    margin: "10px 0 0 0",
                    fontFamily: "var(--serif)",
                    fontStyle: "italic",
                    fontSize: 22,
                    lineHeight: 1.3,
                    color: "var(--neutral-50)",
                  }}
                >
                  {m.question}
                </p>
                <div
                  style={{
                    marginTop: 10,
                    fontFamily: "var(--sans)",
                    fontSize: 11,
                    lineHeight: 1.45,
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

      {absence && (
        <div
          style={{
            position: "absolute",
            right: 48,
            top: 200,
            width: 400,
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

      {/* phase strip — the only thing here that says "climb" */}
      <div
        style={{
          position: "absolute",
          left: BAND.left,
          top: 546,
          width: BAND.right - BAND.left,
          height: 34,
          display: "flex",
          alignItems: "center",
          opacity: showPhases ? 1 : 0,
          transition: "opacity 0.45s var(--ease)",
          zIndex: 3,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 17,
            height: 1,
            background: "var(--copper-800)",
          }}
        />
        {L.phases.map((ph) => (
          <div
            key={ph.id}
            style={{
              position: "absolute",
              left: cellX(ph.at) - BAND.left,
              transform: "translateX(-50%)",
              padding: "4px 10px",
              border: "1px solid var(--copper-700)",
              background: "var(--neutral-900)",
              fontFamily: "var(--mono)",
              fontSize: 10,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--copper-200)",
              whiteSpace: "nowrap",
            }}
          >
            {ph.label} → {ph.target}
          </div>
        ))}
      </div>

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
