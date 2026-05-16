// E.4 — PROMPT · METHODOLOGIES
//
// Ported from `claude-design-project/jsx/slides-a.jsx:604-722` (slide body
// + the inlined `<TechniqueDetail>` sub-component).
//
// 4 steps:
//   0 — BASIC tier reveals (3 cards)
//   1 — INTERMEDIATE tier reveals (2 cards)
//   2 — ADVANCED tier reveals (3 cards)
//   3 — footer caption reveals
//
// Hover-to-detail (NOT click-to-modal): hovering any card fills the bottom
// 190px region with a `<TechniqueDetail>` showing best-for / trade-off plus
// a streamed example via `<Typewriter>`. Mouse-leave clears it.
//
// Layout uses absolute coordinates against the 1280×720 stage. Reveal /
// CopperRule are the shared T10 reveal primitives — no Framer Motion here.
import { useState } from "react";
import type { CSSProperties } from "react";
import { Pin } from "lucide-react";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { HintIcon } from "@/components/HintIcon";
import { highlight } from "@/components/highlight";
import { Reveal } from "./components/Reveal";
import { Typewriter } from "./components/Typewriter";
import { e4Content as C } from "./content";

// ───────────────────── slide ─────────────────────

type Tier = (typeof C.tiers)[number];
type Card = Tier["cards"][number];
type CardWithTier = Card & { tier: Tier };
type ModalEntry = (typeof C.modal)[keyof typeof C.modal];

export function E4PromptMethodologies() {
  const { stepIndex } = useDeck();
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [pinnedId, setPinnedId] = useState<string | null>(null);

  const showFooter = stepIndex >= 3;

  // Pin takes precedence over hover; together they drive the detail strip.
  const activeId = pinnedId ?? hoverId;

  // Flatten cards across tiers so we can resolve `activeId` → its full record.
  // Tag each card with its tier index so we can suppress details for tiers
  // that haven't been revealed yet (defensive against stale hover/pin on
  // backward navigation, and a belt-and-braces partner to the pointer-events
  // gate on individual cards).
  const allCards: (CardWithTier & { tierIndex: number })[] = C.tiers.flatMap(
    (t, tierIndex) =>
      t.cards.map((c) => ({ ...c, tier: t, tierIndex })),
  );
  const activeRaw = activeId
    ? allCards.find((c) => c.id === activeId) ?? null
    : null;
  const hovered: CardWithTier | null =
    activeRaw && stepIndex >= activeRaw.tierIndex ? activeRaw : null;

  return (
    <>
      <FigLabel section="E" num={4} label="LAYER 1 · METHODOLOGIES" />

      <div className="slide-headline-row">
        <h1 className="slide-headline small">
          {highlight(C.headline, C.headlineKw)}
        </h1>
      </div>

      {/* Hint affordance — top-right of stage, visible all 4 steps. */}
      <div
        data-testid="e4-hint"
        style={{
          position: "absolute",
          top: 30,
          right: 48,
          zIndex: 50,
        }}
      >
        <HintIcon position="left" />
      </div>

      {/* Tier rows region — top:158, bottom:290 leaves a 190px detail strip
          (bottom:88 height:190) plus footer (bottom:50). Matches the design
          source coordinates exactly.
          `data-no-advance` keeps card clicks inside the menu (pin only).
          Clicks elsewhere on the stage still advance via Slide.tsx. */}
      <div
        data-testid="e4-tiers"
        data-no-advance=""
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          top: 158,
          bottom: 290,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {C.tiers.map((tier, i) => {
          const revealed = stepIndex >= i;
          return (
            <Reveal
              key={tier.id}
              on={revealed}
              delay={i * 100}
              data-testid={`tier-${tier.id}`}
              style={{
                display: "flex",
                alignItems: "stretch",
                gap: 16,
                flex: 1,
              }}
            >
              {/* Tier label column */}
              <div
                style={{
                  width: 140,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  borderLeft: `2px solid var(--${tier.copper})`,
                  paddingLeft: 12,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 14,
                    letterSpacing: "0.18em",
                    color: `var(--${tier.copper})`,
                    textTransform: "uppercase",
                  }}
                >
                  {tier.label}
                </span>
                <span
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 9,
                    letterSpacing: "0.18em",
                    color: "var(--neutral-500)",
                    textTransform: "uppercase",
                    marginTop: 4,
                  }}
                >
                  Tier {i + 1}
                </span>
              </div>

              {/* Cards row — N columns matching tier.cards.length */}
              <div
                style={{
                  flex: 1,
                  display: "grid",
                  gridTemplateColumns: `repeat(${tier.cards.length}, 1fr)`,
                  gap: 12,
                }}
              >
                {tier.cards.map((c) => {
                  const isHover = hoverId === c.id;
                  const isPinned = pinnedId === c.id;
                  const active = isHover || isPinned;
                  const cardStyle: CSSProperties = {
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    gap: 6,
                    padding: "14px 16px",
                    border: `1px solid var(--${tier.copper})`,
                    background: isPinned
                      ? "rgba(217,119,87,0.12)"
                      : isHover
                        ? "rgba(217,119,87,0.08)"
                        : "rgba(10,10,10,0.7)",
                    boxShadow: isPinned
                      ? `inset 0 0 0 1px var(--${tier.copper}), 0 0 28px -6px var(--${tier.copper})`
                      : isHover
                        ? `0 0 0 1px var(--${tier.copper}), 0 0 24px -8px var(--${tier.copper})`
                        : "none",
                    cursor: revealed ? "pointer" : "default",
                    textAlign: "left",
                    pointerEvents: revealed ? "auto" : "none",
                    transition:
                      "background 0.18s var(--ease), box-shadow 0.18s var(--ease)",
                  };
                  return (
                    <div
                      key={c.id}
                      data-testid={`technique-card-${c.id}`}
                      data-active={active ? "true" : "false"}
                      data-pinned={isPinned ? "true" : "false"}
                      onMouseEnter={
                        revealed ? () => setHoverId(c.id) : undefined
                      }
                      onMouseLeave={
                        revealed
                          ? () =>
                              setHoverId((prev) =>
                                prev === c.id ? null : prev,
                              )
                          : undefined
                      }
                      onClick={
                        revealed
                          ? () =>
                              setPinnedId((prev) =>
                                prev === c.id ? null : c.id,
                              )
                          : undefined
                      }
                      style={cardStyle}
                    >
                      {isPinned && (
                        <div
                          aria-label="pinned"
                          style={{
                            position: "absolute",
                            top: 6,
                            right: 8,
                            width: 14,
                            height: 14,
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: `var(--${tier.copper})`,
                            pointerEvents: "none",
                          }}
                        >
                          <Pin size={11} color="currentColor" strokeWidth={1.75} />
                        </div>
                      )}
                      <span
                        style={{
                          fontFamily: "var(--display)",
                          fontSize: 22,
                          color: "var(--neutral-50)",
                          lineHeight: 1.05,
                        }}
                      >
                        {c.title}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--serif)",
                          fontStyle: "italic",
                          fontSize: 13,
                          color: "var(--neutral-300)",
                          lineHeight: 1.3,
                        }}
                      >
                        {c.essence}
                      </span>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* Hover-detail strip (190px tall). Stays mounted as an empty placeholder
          when no card is hovered, so layout doesn't shift. */}
      <div
        data-testid="e4-detail-slot"
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          bottom: 88,
          height: 190,
          pointerEvents: "none",
        }}
      >
        <TechniqueDetail card={hovered} />
      </div>

      {showFooter && (
        <Reveal
          on={showFooter}
          data-testid="e4-footer"
          style={{
            position: "absolute",
            left: 48,
            right: 48,
            bottom: 50,
          }}
        >
          <p
            style={{
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontSize: 14,
              color: "var(--neutral-400)",
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            {highlight(C.footer, C.footerKw)}
          </p>
        </Reveal>
      )}
    </>
  );
}

// ───────────────────── TechniqueDetail (hover detail strip) ─────────────────────
//
// Sub-component inlined per the new pattern: only E.4 uses this layout.
// Renders the full payload for a hovered card — header row (tier · title ·
// essence), best-for / trade-off pair, and a streamed example via Typewriter.
//
// When `card` is null, all visible content collapses to non-breaking spaces
// and the box fades to opacity 0 (border + bg disappear) so the placeholder
// occupies the same vertical real estate without drawing attention.

interface TechniqueDetailProps {
  card: CardWithTier | null;
}

function TechniqueDetail({ card }: TechniqueDetailProps) {
  const detail: ModalEntry | null = card ? C.modal[card.id] : null;
  const accent = card ? `var(--${card.tier.copper})` : "var(--copper-700)";
  // Streaming duration scales with text length, clamped to a comfortable range.
  const exampleDuration = detail
    ? Math.min(2400, Math.max(700, detail.example.length * 16))
    : 800;

  return (
    <div
      data-testid={card ? `technique-detail-${card.id}` : "technique-detail-empty"}
      style={{
        position: "relative",
        height: "100%",
        border: card ? `1px solid ${accent}` : "1px solid transparent",
        background: card
          ? "linear-gradient(180deg, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.6) 100%)"
          : "transparent",
        padding: "16px 24px 14px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        opacity: card ? 1 : 0,
        transition:
          "opacity 0.2s var(--ease), border-color 0.2s var(--ease), background 0.2s var(--ease)",
      }}
    >
      {/* Header row — tier label · title · essence */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 16,
          borderBottom: `1px solid ${accent}`,
          paddingBottom: 10,
        }}
      >
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 10,
            letterSpacing: "0.22em",
            color: accent,
            textTransform: "uppercase",
          }}
        >
          {card ? `${card.tier.label} · TIER` : " "}
        </span>
        <h3
          style={{
            fontFamily: "var(--display)",
            fontSize: 24,
            color: "var(--neutral-50)",
            margin: 0,
            lineHeight: 1,
          }}
        >
          {card ? card.title : " "}
        </h3>
        <span
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 14,
            color: "var(--neutral-400)",
            marginLeft: "auto",
          }}
        >
          {card ? card.essence : " "}
        </span>
      </div>

      {/* Body grid: left = best-for + trade-off · right = streaming example */}
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1.1fr 2fr",
          gap: 28,
          alignItems: "stretch",
          minHeight: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
            justifyContent: "flex-start",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: 10,
                letterSpacing: "0.22em",
                color: accent,
                textTransform: "uppercase",
              }}
            >
              Best for
            </span>
            <span
              data-testid="technique-detail-best-for"
              style={{
                fontFamily: "var(--serif)",
                fontSize: 14,
                color: "var(--neutral-100)",
                lineHeight: 1.4,
              }}
            >
              {detail ? detail.bestFor : " "}
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: 10,
                letterSpacing: "0.22em",
                color: accent,
                textTransform: "uppercase",
              }}
            >
              Trade-off
            </span>
            <span
              data-testid="technique-detail-trade-off"
              style={{
                fontFamily: "var(--serif)",
                fontStyle: "italic",
                fontSize: 14,
                color: "var(--neutral-300)",
                lineHeight: 1.4,
              }}
            >
              {detail ? detail.tradeOff : " "}
            </span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 6,
            minHeight: 0,
            borderLeft: `1px solid ${accent}`,
            paddingLeft: 20,
          }}
        >
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 10,
              letterSpacing: "0.22em",
              color: accent,
              textTransform: "uppercase",
            }}
          >
            Example prompt
          </span>
          {card && detail && (
            <Typewriter
              key={card.id}
              play
              text={detail.example}
              duration={exampleDuration}
              caretStyle="block"
              style={{
                fontFamily: "var(--mono)",
                fontSize: 12.5,
                color: "var(--neutral-100)",
                whiteSpace: "pre-wrap",
                margin: 0,
                lineHeight: 1.5,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// ───────────────────── slide def ─────────────────────

export const e4Slide: SlideDef = {
  steps: 4,
  canonicalPose: 3,
  animationMode: "step-reveal",
  surface: "dark",
  section: "E",
  render: () => <E4PromptMethodologies />,
};
