// PROTOTYPE gh#16 — variant C · BANDS (stacked, L5 on top)
//
// Rebuilt geometry rather than a port. Five full-width bands, L5 at the top, so
// "up" means "further along" without any staircase to draw. A marker at 0.4
// literally straddles the L1/L2 boundary — the fractional placement that the
// staircase has to fake with interpolation is native here.
//
// Legend-free encoding, third attempt:
//   asserted → the marker is INSIDE its band, filled, sharing the band's frame.
//              It belongs to the level. Source printed with it.
//   open     → the marker is OUTSIDE, in the right gutter, tethered in by a
//              dashed line. It has not been placed; it is being pointed at.
//
// This is the strongest of the three at one specific job: showing that Berau
// has no tech-function marker. An empty right gutter next to a full band stack
// reads as "we looked and there is nothing", where the staircase just looks
// unfinished.
import type { Brand } from "./brief";
import { ladderBrief as L } from "./brief";
import { FigLabel } from "@/components/FigLabel";
import { highlight as KW } from "@/components/highlight";
import { useDeck } from "@/deck/DeckContext";

const TOP = 168;
const BAND_H = 84;
const GAP = 6;
const BAND_LEFT = 48;
const BAND_W = 700;
const GUTTER_LEFT = 780;
const GUTTER_W = 452;

// L5 sits at the top, L1 at the bottom, so row = 4 - levelIndex.
function bandTop(level: number) {
  return TOP + (4 - level) * (BAND_H + GAP);
}
function bandMid(level: number) {
  return bandTop(level) + BAND_H / 2;
}
// Fractional levels interpolate across the stack, so 0.4 straddles L1/L2.
function markerY(at: number) {
  const lo = Math.floor(at);
  const hi = Math.min(lo + 1, 4);
  return bandMid(lo) + (bandMid(hi) - bandMid(lo)) * (at - lo);
}

export function LadderBands({ brand }: { brand: Brand }) {
  const { stepIndex } = useDeck();
  const markers = L.markers[brand];
  const absence = L.absence[brand];

  const showAsserted = stepIndex >= 1;
  const showOpen = stepIndex >= 2;
  const showAside = stepIndex >= 3;
  const showPhases = stepIndex >= 4;

  const asserted = markers.filter((m) => m.kind === "asserted");
  const open = markers.filter((m) => m.kind === "open");
  const asides = markers.filter((m) => m.kind === "aside");

  return (
    <>
      <FigLabel section={L.fig.section} num={L.fig.num} label={L.fig.label} />

      <div className="slide-headline-row">
        <h1 className="slide-headline small">{KW(L.headline, [...L.headlineKw])}</h1>
      </div>

      {/* dashed tethers from the gutter into the stack */}
      <svg className="svg-layer" style={{ zIndex: 3 }} viewBox="0 0 1280 720" preserveAspectRatio="none">
        {open.map((m) => {
          const y = markerY(m.at);
          return (
            <g key={m.id} style={{ opacity: showOpen ? 1 : 0, transition: "opacity 0.45s var(--ease)" }}>
              <line
                x1={BAND_LEFT + BAND_W}
                y1={y}
                x2={GUTTER_LEFT - 6}
                y2={y}
                style={{ stroke: "var(--copper-600)", strokeWidth: 1, strokeDasharray: "3 5" }}
              />
              <circle
                cx={BAND_LEFT + BAND_W}
                cy={y}
                r={5.5}
                style={{ fill: "var(--neutral-900)", stroke: "var(--copper-600)", strokeWidth: 1.4 }}
              />
            </g>
          );
        })}
      </svg>

      {/* the stack */}
      {L.rungs.map((r, i) => {
        const hit = asserted.find((m) => Math.round(m.at) === i && showAsserted);
        return (
          <div
            key={r.id}
            data-testid={`band-${r.id}`}
            style={{
              position: "absolute",
              left: BAND_LEFT,
              top: bandTop(i),
              width: BAND_W,
              height: BAND_H,
              boxSizing: "border-box",
              display: "flex",
              alignItems: "stretch",
              border: `1px solid ${hit ? "var(--copper-300)" : "var(--copper-800)"}`,
              background: hit ? "rgba(184,110,61,0.14)" : "rgba(10,10,10,0.6)",
              transition: "border-color 0.4s var(--ease), background 0.4s var(--ease)",
              zIndex: 2,
            }}
          >
            <div
              style={{
                width: 74,
                flex: "0 0 74px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRight: "1px solid var(--copper-800)",
                fontFamily: "var(--display)",
                fontSize: 30,
                color: hit ? "var(--copper-100)" : "var(--copper-400)",
                transition: "color 0.4s var(--ease)",
              }}
            >
              {r.level}
            </div>

            <div
              style={{
                flex: 1,
                minWidth: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "0 18px",
              }}
            >
              <div style={{ fontFamily: "var(--display)", fontSize: 23, lineHeight: 1.05, color: "var(--neutral-50)" }}>
                {r.title}
              </div>
              <div style={{ fontFamily: "var(--sans)", fontSize: 12, color: "var(--neutral-400)", marginTop: 4 }}>
                {r.sub}
              </div>
            </div>

            {/* the asserted marker lives INSIDE the band it claims */}
            {hit && (
              <div
                className="fade on"
                style={{
                  flex: "0 0 268px",
                  margin: 8,
                  padding: "8px 12px",
                  boxSizing: "border-box",
                  background: "rgba(184,110,61,0.28)",
                  border: "1px solid var(--copper-300)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 12,
                    fontWeight: 500,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--neutral-0)",
                  }}
                >
                  {hit.label}
                </div>
                <div
                  style={{
                    marginTop: 5,
                    fontFamily: "var(--sans)",
                    fontSize: 10,
                    lineHeight: 1.35,
                    color: "var(--copper-100)",
                  }}
                >
                  {hit.citation}
                </div>
              </div>
            )}

            {/* phase chip, pinned to the band it targets */}
            {showPhases &&
              L.phases
                .filter((ph) => ph.at === i)
                .map((ph) => (
                  <div
                    key={ph.id}
                    className="fade on"
                    style={{
                      position: "absolute",
                      left: -1,
                      top: -11,
                      padding: "2px 8px",
                      background: "var(--neutral-900)",
                      border: "1px solid var(--copper-700)",
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
        );
      })}

      {/* right gutter — questions, not placements */}
      {open.map((m) => (
        <div
          key={m.id}
          data-testid={`bands-open-${m.id}`}
          style={{
            position: "absolute",
            left: GUTTER_LEFT,
            top: markerY(m.at),
            transform: "translateY(-50%)",
            width: GUTTER_W,
            padding: "14px 18px",
            boxSizing: "border-box",
            border: "1px dashed var(--copper-600)",
            background: "rgba(10,10,10,0.55)",
            opacity: showOpen ? 1 : 0,
            transition: "opacity 0.45s var(--ease)",
            zIndex: 4,
          }}
        >
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
              fontSize: 23,
              lineHeight: 1.28,
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
        </div>
      ))}

      {/* absence, stated in the gutter where a marker would have been */}
      {absence && (
        <div
          style={{
            position: "absolute",
            left: GUTTER_LEFT,
            top: bandTop(2),
            width: GUTTER_W,
            height: BAND_H,
            boxSizing: "border-box",
            padding: "0 18px",
            display: "flex",
            alignItems: "center",
            borderLeft: "1px solid var(--neutral-700)",
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

      {/* the self-deprecating one, kept small and out of the way */}
      {asides.map((m) => (
        <div
          key={m.id}
          style={{
            position: "absolute",
            left: GUTTER_LEFT,
            // Below the L1 band, clear of the open-question chip in the gutter.
            top: bandTop(0) + BAND_H + 10,
            width: GUTTER_W,
            fontFamily: "var(--mono)",
            fontSize: 10,
            letterSpacing: "0.14em",
            color: "var(--neutral-500)",
            opacity: showAside ? 1 : 0,
            transition: "opacity 0.4s var(--ease)",
            zIndex: 4,
          }}
        >
          ▸ {m.label} — <span style={{ fontFamily: "var(--sans)", letterSpacing: 0 }}>{m.citation}</span>
        </div>
      ))}

      <div
        style={{
          position: "absolute",
          left: GUTTER_LEFT,
          top: 172,
          width: GUTTER_W,
          fontFamily: "var(--mono)",
          fontSize: 10,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "var(--neutral-500)",
          lineHeight: 1.5,
          zIndex: 2,
        }}
      >
        {L.provenance}
      </div>

      <p
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          bottom: 24,
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
