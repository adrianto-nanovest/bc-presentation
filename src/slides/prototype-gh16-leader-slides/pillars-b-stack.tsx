// PROTOTYPE gh#16 — variant B · STACK (decision ledger)
//
// Throws the diagram away. Six pillars are six rows of a ledger; the enabler is
// a header band, not a centre. Reading order is imposed by gravity instead of
// inferred from a circle — at projection distance a room reads top-to-bottom
// faster than it reads clockwise-from-noon.
//
// ANSWER IT PROPOSES to the dimming question: nothing dims. The focus walk
// EXPANDS the active row — the decision text only exists inside the open row —
// so attention moves by height, not by brightness. A slide that never darkens
// cannot go dark.
//
// Cost of this variant: it stops looking like the HR original, and it loses the
// "everything connects to the enabler" claim that the hub-and-spokes makes
// visually for free.
import type { Brand } from "./brief";
import { pillarBrief as B } from "./brief";
import { Icon } from "./icons";
import { FigLabel } from "@/components/FigLabel";
import { highlight as KW } from "@/components/highlight";
import { useDeck } from "@/deck/DeckContext";

const ROW_COLLAPSED = 50;
const ROW_OPEN = 122;
const GAP = 6;

export function PillarsStack({ brand }: { brand: Brand }) {
  const { stepIndex } = useDeck();
  const showRows = stepIndex >= 1;
  const focus = stepIndex >= 2 && stepIndex <= 7 ? stepIndex - 2 : -1;
  const showCloser = stepIndex >= 8;

  return (
    <>
      <FigLabel section={B.fig.section} num={B.fig.num} label={B.fig.label} />

      <div className="slide-headline-row">
        <h1 className="slide-headline small">{KW(B.headline, [...B.headlineKw])}</h1>
      </div>

      {/* enabler band — the hub, flattened into a header */}
      <div
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          top: 150,
          height: 46,
          display: "flex",
          alignItems: "center",
          gap: 18,
          padding: "0 18px",
          boxSizing: "border-box",
          border: "1px solid var(--copper-600)",
          background: "rgba(184,110,61,0.14)",
          zIndex: 2,
        }}
      >
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.24em",
            color: "var(--copper-100)",
          }}
        >
          {B.hub.label}
        </span>
        <span style={{ width: 1, height: 20, background: "var(--copper-700)" }} />
        <span
          style={{
            fontFamily: "var(--display)",
            fontSize: 22,
            color: "var(--neutral-0)",
            lineHeight: 1,
          }}
        >
          {B.hub.brandLine[brand]}
        </span>
        <span style={{ flex: 1 }} />
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 10,
            letterSpacing: "0.2em",
            color: "var(--copper-400)",
            textAlign: "right",
          }}
        >
          {B.kicker}
        </span>
      </div>

      {/* the ledger */}
      <div
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          top: 208,
          display: "flex",
          flexDirection: "column",
          gap: GAP,
          zIndex: 2,
        }}
      >
        {B.pillars.map((p, i) => {
          const on = focus === i;
          const done = focus > i;
          return (
            <div
              key={p.id}
              data-testid={`stack-pillar-${p.id}`}
              data-active={on ? "true" : "false"}
              style={{
                height: on ? ROW_OPEN : ROW_COLLAPSED,
                display: "flex",
                alignItems: "stretch",
                overflow: "hidden",
                border: `1px solid ${on ? "var(--copper-300)" : done ? "var(--copper-700)" : "var(--copper-800)"}`,
                background: on ? "rgba(184,110,61,0.14)" : "rgba(10,10,10,0.6)",
                opacity: showRows ? 1 : 0,
                transform: showRows ? "translateY(0)" : "translateY(10px)",
                transition: `height 0.42s var(--ease), border-color 0.35s var(--ease), background 0.35s var(--ease), opacity 0.4s var(--ease) ${120 + i * 70}ms, transform 0.4s var(--ease) ${120 + i * 70}ms`,
              }}
            >
              {/* rail — the copper bar that walks down the ledger */}
              <div
                style={{
                  width: 4,
                  flex: "0 0 4px",
                  background: on ? "var(--copper-400)" : done ? "var(--copper-800)" : "transparent",
                  transition: "background 0.35s var(--ease)",
                }}
              />

              <div
                style={{
                  flex: 1,
                  minWidth: 0,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  padding: "0 20px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <span
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 11,
                      letterSpacing: "0.16em",
                      color: on ? "var(--copper-200)" : "var(--copper-600)",
                      width: 26,
                      flex: "0 0 26px",
                      transition: "color 0.35s var(--ease)",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
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
                      fontSize: on ? 25 : 21,
                      lineHeight: 1,
                      color: on ? "var(--neutral-0)" : "var(--neutral-200)",
                      transition: "font-size 0.35s var(--ease), color 0.35s var(--ease)",
                    }}
                  >
                    {p.label}
                  </span>
                  <span style={{ flex: 1 }} />
                  <span
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 10,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      whiteSpace: "nowrap",
                      color: on ? "var(--copper-300)" : "var(--neutral-500)",
                      transition: "color 0.35s var(--ease)",
                    }}
                  >
                    → {p.actIII}
                  </span>
                </div>

                {/* The decision only exists inside an open row — and must take
                    NO layout height when closed, or a 50px row centres content
                    that is 90px tall and clips it at both ends. */}
                <p
                  style={{
                    margin: on ? "12px 0 0 40px" : "0 0 0 40px",
                    maxHeight: on ? 80 : 0,
                    overflow: "hidden",
                    fontFamily: "var(--serif)",
                    fontSize: 22,
                    lineHeight: 1.35,
                    color: "var(--neutral-50)",
                    opacity: on ? 1 : 0,
                    transition: `max-height 0.42s var(--ease), margin 0.42s var(--ease), opacity 0.3s var(--ease) ${on ? 140 : 0}ms`,
                  }}
                >
                  {KW(p.decision, [...p.decisionKw])}
                </p>
              </div>
            </div>
          );
        })}
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
