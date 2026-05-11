// SkillProgressiveDisclosure — F.4 flagship right canvas (spec §7.4).
//
// Three-level disclosure visual with copper monochromatic stops on the same
// hue (copper-700 / copper-500 / copper-200) — NOT teal/green/orange. The
// deck is single-hue copper (spec §16, locked).
//
// Layout (top → bottom):
//   1. Title row: "PROGRESSIVE DISCLOSURE" (mono uppercase) +
//      "Load only what's needed, when it's needed" (italic serif copper-200)
//   2. Level 1 bar — METADATA · LEVEL 1 · 30% · always loaded · ~100 tokens
//      "name + description (YAML frontmatter)"
//   3. Vertical arrow + "↓ when triggered" (copper-300 italic)
//   4. Level 2 bar — INSTRUCTIONS · LEVEL 2 · 55% · when triggered · <5K tokens
//      "SKILL.md content loaded"
//   5. Vertical arrow + "↓ as needed"
//   6. Level 3 bar — RESOURCES · LEVEL 3 · 80% · as needed · unlimited
//      "Reference files, scripts, examples"
//   7. Horizontal copper rule
//   8. Bottom callout — "LEAN CONTEXT + RICH KNOWLEDGE" (mono uppercase
//      copper-200) + "Model-invoked: Claude uses skills when relevant"
//      (italic serif neutral-300)
//
// The `level` prop controls reveal-state — see prop comment below. All
// transitions are CSS opacity (700ms var(--ease)) so the visual builds in
// tandem with the facet-menu reveal cascade on F.4's step axis.
import { LucideIcon } from "./LucideIcon";

type DisclosureLevel = 1 | 2 | 3 | "all";

export interface SkillProgressiveDisclosureProps {
  /**
   * Controls how much of the disclosure ladder is visible.
   * - 1   → only L1 (METADATA)
   * - 2   → L1 + L2 (METADATA + INSTRUCTIONS)
   * - 3   → L1 + L2 + L3 (all three bars, no LEAN CONTEXT callout)
   * - all → L1 + L2 + L3 + LEAN CONTEXT callout
   * Defaults to "all".
   */
  level?: DisclosureLevel;
}

interface LevelDef {
  id: string;
  num: 1 | 2 | 3;
  label: string;          // METADATA / INSTRUCTIONS / RESOURCES
  heading: string;        // "30%" / "55%" / "80%"
  badge: string;          // "always loaded" / "when triggered" / "as needed"
  tokens: string;         // "~100 tokens" / "<5K tokens" / "unlimited"
  detail: string;         // sub-line under the bar
  icon: string;           // lucide icon name
  bg: string;             // bar background color (rgba over the copper hue)
  border: string;         // bar border CSS var
  text: string;           // primary text CSS var
  arrowLabel?: string;    // label of the arrow BELOW this level (omit on L3)
}

// Three copper monochromatic stops — same hue, three lightness steps.
// L1 darkest (copper-700) → L3 lightest (copper-200). Per spec §7.4 + content.tsx.
const LEVELS: readonly LevelDef[] = [
  {
    id: "metadata",
    num: 1,
    label: "METADATA",
    heading: "30%",
    badge: "always loaded",
    tokens: "~100 tokens",
    detail: "name + description (YAML frontmatter)",
    icon: "FileText",
    // copper-700 tinted bg via rgba of the hex
    bg: "rgba(122,70,38,0.32)",
    border: "var(--copper-800)",
    text: "var(--copper-100)",
    arrowLabel: "when triggered",
  },
  {
    id: "instructions",
    num: 2,
    label: "INSTRUCTIONS",
    heading: "55%",
    badge: "when triggered",
    tokens: "<5K tokens",
    detail: "SKILL.md content loaded",
    icon: "BookOpen",
    // copper-500 tinted bg
    bg: "rgba(184,110,61,0.28)",
    border: "var(--copper-700)",
    text: "var(--copper-100)",
    arrowLabel: "as needed",
  },
  {
    id: "resources",
    num: 3,
    label: "RESOURCES",
    heading: "80%",
    badge: "as needed",
    tokens: "unlimited",
    detail: "Reference files, scripts, examples",
    icon: "Folder",
    // copper-200 tinted bg (lightest)
    bg: "rgba(232,196,160,0.22)",
    border: "var(--copper-600)",
    text: "var(--neutral-50)",
  },
] as const;

export function SkillProgressiveDisclosure({
  level = "all",
}: SkillProgressiveDisclosureProps) {
  // Visibility math: levelNum is 1/2/3 — show levels with num <= levelNum.
  const levelNum = level === "all" ? 3 : level;
  const showCallout = level === "all";

  return (
    <div
      data-testid="skill-progressive-disclosure"
      data-level={String(level)}
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        padding: "8px 12px",
      }}
    >
      {/* Title row */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 6,
          marginBottom: 18,
        }}
      >
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: 12,
            letterSpacing: "0.22em",
            color: "var(--copper-300)",
            textTransform: "uppercase",
          }}
        >
          PROGRESSIVE DISCLOSURE
        </span>
        <span
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 14,
            color: "var(--copper-200)",
            lineHeight: 1.4,
          }}
        >
          Load only what&rsquo;s needed, when it&rsquo;s needed
        </span>
      </div>

      {/* Three-level ladder */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 0,
          flex: 1,
        }}
      >
        {LEVELS.map((lv, i) => {
          const visible = lv.num <= levelNum;
          const arrowVisible =
            !!lv.arrowLabel && lv.num < levelNum; // hide arrow below the last visible level
          return (
            <div
              key={lv.id}
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                data-testid={`disclosure-level-${lv.num}`}
                data-active={visible ? "true" : "false"}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(8px)",
                  transition:
                    "opacity 700ms var(--ease), transform 700ms var(--ease)",
                  transitionDelay: `${i * 60}ms`,
                  border: `1px solid ${lv.border}`,
                  background: lv.bg,
                  padding: "12px 16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                {/* Top row: icon · LABEL · LEVEL N badge · %  */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <LucideIcon name={lv.icon} size={20} color={lv.text} />
                  <span
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 13,
                      letterSpacing: "0.22em",
                      color: lv.text,
                      textTransform: "uppercase",
                      fontWeight: 500,
                    }}
                  >
                    {lv.label}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 10,
                      letterSpacing: "0.18em",
                      color: "var(--copper-300)",
                      textTransform: "uppercase",
                      border: "1px solid var(--copper-700)",
                      padding: "2px 6px",
                      borderRadius: 2,
                    }}
                  >
                    LEVEL {lv.num}
                  </span>
                  <span
                    style={{
                      marginLeft: "auto",
                      fontFamily: "var(--display)",
                      fontSize: 28,
                      color: lv.text,
                      lineHeight: 1,
                    }}
                  >
                    {lv.heading}
                  </span>
                </div>
                {/* Badge row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 10,
                      letterSpacing: "0.18em",
                      color: "var(--copper-200)",
                      textTransform: "uppercase",
                      background: "rgba(184,110,61,0.18)",
                      border: "1px solid var(--copper-700)",
                      padding: "2px 6px",
                    }}
                  >
                    {lv.badge}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 11,
                      color: "var(--neutral-300)",
                    }}
                  >
                    {lv.tokens}
                  </span>
                </div>
                {/* Detail row */}
                <div
                  style={{
                    fontFamily: "var(--serif)",
                    fontStyle: "italic",
                    fontSize: 13,
                    color: "var(--neutral-200)",
                    lineHeight: 1.4,
                  }}
                >
                  {lv.detail}
                </div>
              </div>

              {/* Arrow between bars — only when the level below is visible */}
              {lv.arrowLabel ? (
                <div
                  data-testid={`disclosure-arrow-${lv.num}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    height: 28,
                    opacity: arrowVisible ? 1 : 0,
                    transition: "opacity 700ms var(--ease)",
                    transitionDelay: `${i * 60 + 120}ms`,
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 14,
                      color: "var(--copper-300)",
                    }}
                  >
                    ↓
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--serif)",
                      fontStyle: "italic",
                      fontSize: 12,
                      color: "var(--copper-300)",
                    }}
                  >
                    {lv.arrowLabel}
                  </span>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      {/* Horizontal copper rule + LEAN CONTEXT callout */}
      <div
        data-testid="disclosure-callout"
        data-active={showCallout ? "true" : "false"}
        style={{
          marginTop: 18,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          opacity: showCallout ? 1 : 0,
          transition: "opacity 700ms var(--ease)",
        }}
      >
        <div
          style={{
            height: 1,
            background: "var(--copper-700)",
            width: "100%",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 12,
              letterSpacing: "0.22em",
              color: "var(--copper-200)",
              textTransform: "uppercase",
            }}
          >
            LEAN CONTEXT + RICH KNOWLEDGE
          </span>
          <span
            style={{
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontSize: 13,
              color: "var(--neutral-300)",
              lineHeight: 1.4,
            }}
          >
            Model-invoked: Claude uses skills when relevant
          </span>
        </div>
      </div>
    </div>
  );
}
