// PROTOTYPE gh#16 — variant A · ORBIT (hub & spokes)
//
// The faithful port of the HR original: generic hub, six pillars on an ellipse.
// Reuses this codebase's E.6 geometry idea but not its component, because the
// focus walk needs per-satellite state the E.6 network does not carry.
//
// ANSWER IT PROPOSES to "how does the focus walk dim the other five without the
// slide going dark": it does not dim them at all. Inactive pillars keep full
// border and label; the ACTIVE one gains a copper fill, a thickened spoke and a
// halo. Attention is bought with added light, not subtracted light — a dark
// auditorium punishes the opposite.
import type { Brand } from "./brief";
import { pillarBrief as B } from "./brief";
import { Icon } from "./icons";
import { FigLabel } from "@/components/FigLabel";
import { highlight as KW } from "@/components/highlight";
import { useDeck } from "@/deck/DeckContext";

const HUB = { x: 390, y: 430, r: 66 };
const RX = 280;
const RY = 190;
const SAT_W = 196;
const SAT_H = 76;

const PANEL = { left: 764, right: 48, top: 196, bottom: 116 };

function pos(i: number) {
  const theta = (i * 2 * Math.PI) / 6 - Math.PI / 2;
  return { x: HUB.x + Math.cos(theta) * RX, y: HUB.y + Math.sin(theta) * RY };
}

// Trim the spoke so it runs box-edge → disc-edge instead of centre → centre.
function spoke(p: { x: number; y: number }) {
  const a = Math.atan2(HUB.y - p.y, HUB.x - p.x);
  const c = Math.cos(a);
  const s = Math.sin(a);
  const t = Math.min(SAT_W / 2 / Math.abs(c || 1e-4), SAT_H / 2 / Math.abs(s || 1e-4)) + 6;
  return { x1: p.x + c * t, y1: p.y + s * t, x2: HUB.x - c * (HUB.r + 6), y2: HUB.y - s * (HUB.r + 6) };
}

export function PillarsOrbit({ brand }: { brand: Brand }) {
  const { stepIndex } = useDeck();
  const showPillars = stepIndex >= 1;
  const focus = stepIndex >= 2 && stepIndex <= 7 ? stepIndex - 2 : -1;
  const showCloser = stepIndex >= 8;
  const active = focus >= 0 ? B.pillars[focus] : null;

  return (
    <>
      <FigLabel label={B.fig.label} />

      <div className="slide-headline-row">
        <h1 className="slide-headline small">{KW(B.headline, [...B.headlineKw])}</h1>
      </div>

      <svg
        className="svg-layer"
        style={{ zIndex: 1 }}
        viewBox="0 0 1280 720"
        preserveAspectRatio="none"
      >
        {B.pillars.map((p, i) => {
          const seg = spoke(pos(i));
          const on = focus === i;
          return (
            <line
              key={p.id}
              x1={seg.x1}
              y1={seg.y1}
              x2={seg.x2}
              y2={seg.y2}
              strokeLinecap="round"
              // stroke/strokeWidth go through `style`, not presentation
              // attributes — var() is only resolved in CSS properties.
              style={{
                stroke: on ? "var(--copper-200)" : "var(--copper-800)",
                strokeWidth: on ? 2.6 : 1.2,
                opacity: showPillars ? 1 : 0,
                transition: `opacity 0.5s var(--ease) ${180 + i * 90}ms, stroke 0.35s var(--ease), stroke-width 0.35s var(--ease)`,
              }}
            />
          );
        })}
      </svg>

      {/* hub */}
      <div
        style={{
          position: "absolute",
          left: HUB.x,
          top: HUB.y,
          width: HUB.r * 2,
          height: HUB.r * 2,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          border: "1px solid var(--copper-300)",
          background: "rgba(184,110,61,0.14)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
          zIndex: 3,
        }}
      >
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.2em",
            color: "var(--copper-100)",
          }}
        >
          {B.hub.label}
        </span>
        <span
          style={{
            fontFamily: "var(--display)",
            fontSize: 19,
            color: "var(--neutral-50)",
            lineHeight: 1,
          }}
        >
          {B.hub.brandLine[brand]}
        </span>
      </div>

      {/* pillars */}
      {B.pillars.map((p, i) => {
        const { x, y } = pos(i);
        const on = focus === i;
        const done = focus > i;
        return (
          <div
            key={p.id}
            data-testid={`orbit-pillar-${p.id}`}
            data-active={on ? "true" : "false"}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: SAT_W,
              height: SAT_H,
              transform: `translate(-50%, -50%) scale(${showPillars ? (on ? 1.07 : 1) : 0.86})`,
              opacity: showPillars ? 1 : 0,
              zIndex: on ? 4 : 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 7,
              padding: "8px 10px",
              boxSizing: "border-box",
              border: `1px solid ${on ? "var(--copper-200)" : done ? "var(--copper-600)" : "var(--copper-800)"}`,
              background: on ? "rgba(184,110,61,0.22)" : "rgba(10,10,10,0.92)",
              boxShadow: on ? "0 0 0 4px rgba(184,110,61,0.13)" : "none",
              transition: `opacity 0.5s var(--ease) ${180 + i * 90}ms, transform 0.4s var(--ease), border-color 0.35s var(--ease), background 0.35s var(--ease), box-shadow 0.35s var(--ease)`,
            }}
          >
            <span style={{ color: on ? "var(--copper-100)" : "var(--copper-300)", display: "flex" }}>
              <Icon name={p.icon} size={22} />
            </span>
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: 11,
                letterSpacing: "0.13em",
                textTransform: "uppercase",
                textAlign: "center",
                lineHeight: 1.2,
                color: on ? "var(--neutral-0)" : "var(--neutral-200)",
                transition: "color 0.35s var(--ease)",
              }}
            >
              {p.label}
            </span>
          </div>
        );
      })}

      {/* decision panel — the thing that turns a diagram into an index */}
      <div
        style={{
          position: "absolute",
          left: PANEL.left,
          right: PANEL.right,
          top: PANEL.top,
          bottom: PANEL.bottom,
          borderLeft: "1px solid var(--copper-800)",
          paddingLeft: 28,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          opacity: active ? 1 : 0,
          transition: "opacity 0.35s var(--ease)",
          zIndex: 5,
        }}
      >
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: 10,
            letterSpacing: "0.24em",
            color: "var(--copper-400)",
            marginBottom: 14,
          }}
        >
          THE DECISION · {String(Math.max(focus, 0) + 1).padStart(2, "0")} / 06
        </div>
        <div
          style={{
            fontFamily: "var(--display)",
            fontSize: 30,
            lineHeight: 1.1,
            color: "var(--neutral-50)",
            marginBottom: 18,
          }}
        >
          {active?.label}
        </div>
        <p
          style={{
            fontFamily: "var(--serif)",
            fontSize: 21,
            lineHeight: 1.45,
            color: "var(--neutral-100)",
            margin: 0,
          }}
        >
          {active ? KW(active.decision, [...active.decisionKw]) : null}
        </p>
        <div
          style={{
            marginTop: 22,
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--copper-300)",
          }}
        >
          → ACT III · {active?.actIII}
        </div>
      </div>

      {/* kicker sits under the orbit; the closer takes over the right column,
          which is empty once the walk is done — the bottom strip is occupied by
          the lowest pillar and cannot hold a second line of type. */}
      <div
        style={{
          position: "absolute",
          left: 48,
          top: 200,
          width: 300,
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: "0.22em",
          lineHeight: 1.6,
          color: "var(--copper-400)",
          opacity: stepIndex === 0 ? 1 : 0,
          transition: "opacity 0.35s var(--ease)",
          zIndex: 6,
        }}
      >
        {B.kicker}
      </div>

      <p
        style={{
          position: "absolute",
          left: PANEL.left,
          right: PANEL.right,
          top: 380,
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontSize: 24,
          lineHeight: 1.4,
          color: "var(--neutral-100)",
          margin: 0,
          paddingLeft: 28,
          borderLeft: "1px solid var(--copper-800)",
          opacity: showCloser ? 1 : 0,
          transition: "opacity 0.45s var(--ease)",
          zIndex: 6,
        }}
      >
        {KW(B.closer, [...B.closerKw])}
      </p>
    </>
  );
}
