// A.1 — WHAT YOU'VE ALREADY SEEN
//
// Step 0 chips morph into step 1 cards via framer-motion `layoutId` on a
// shared <CapabilityShape>. Step 0 also carries a "CAPABILITIES COVERED"
// rule-header that fades out during the morph.
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { MessageSquare, FileText, ScanSearch, Sparkles, Map } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import type { SlideDef } from "@/deck/types";
import { useDeck } from "@/deck/DeckContext";
import { FigLabel } from "@/components/FigLabel";
import { highlight as KW } from "@/components/highlight";
import { Reveal, CopperRule } from "../foundation-core-section-e/components/Reveal";
import { a1Content as C, type A1IconName, type A1Capability } from "./content";

const ICONS: Record<A1IconName, LucideIcon> = {
  MessageSquare,
  FileText,
  ScanSearch,
  Sparkles,
  Map,
};

const COLUMN_TOP = 170;
const COLUMN_BOTTOM = 80;
const COLUMN_WIDTH = 520;
const CARD_HEIGHT = 64;
const CARD_GAP = 10;

const MORPH_TRANSITION = {
  type: "spring" as const,
  stiffness: 220,
  damping: 28,
};

// The right-hand "Questions" column holds back until the left chip→card morph
// (spring above + description fade) has visually settled, so the two columns
// reveal in sequence rather than together.
const RIGHT_REVEAL_DELAY = 650;

// ───────────────────── slide ─────────────────────

export function A1WhatYouveSeen() {
  const { stepIndex } = useDeck();

  // Mount-driven entry stagger: tagline → rule → chips fade in on first mount.
  // Stage advances once and stays at max; subsequent step transitions are
  // governed independently by stepIndex below.
  const [stage, setStage] = useState(0);
  useEffect(() => {
    const t1 = window.setTimeout(() => setStage(1), 220); // tagline
    const t2 = window.setTimeout(() => setStage(2), 460); // rule
    const t3 = window.setTimeout(() => setStage(3), 680); // chips (stagger inside)
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, []);

  const taglineMounted = stage >= 1;
  const ruleMounted = stage >= 2;
  const chipsMounted = stage >= 3;

  // Gate the right column behind the left morph. Re-arms on every nav change so
  // stepping back to the opener and forward again replays left-then-right.
  const [questionsReady, setQuestionsReady] = useState(false);
  useEffect(() => {
    if (stepIndex < 1) {
      setQuestionsReady(false);
      return;
    }
    if (questionsReady) return; // already revealed — don't re-delay on 1→2
    const t = window.setTimeout(() => setQuestionsReady(true), RIGHT_REVEAL_DELAY);
    return () => window.clearTimeout(t);
  }, [stepIndex, questionsReady]);

  const showOpener = stepIndex === 0;
  const showCards = stepIndex >= 1;
  const showQuestions = stepIndex >= 1 && questionsReady;
  const showFooter = stepIndex >= 2;

  const mode: ShapeMode = showCards ? "card" : "chip";

  return (
    <>
      <FigLabel section="A" num={1} label={C.figLabel} />

      <div className="slide-headline-row">
        <h1 className="slide-headline small">
          {KW(C.slideTitle, C.slideTitleKw)}
        </h1>
      </div>

      <OpenerChrome
        taglineOn={showOpener && taglineMounted}
        ruleOn={showOpener && ruleMounted}
      />

      <LayoutGroup id="a1-capabilities">
        {mode === "chip" ? (
          <ChipsRow on={chipsMounted} capabilities={C.capabilities} />
        ) : (
          <CapabilitiesColumn on={showCards} capabilities={C.capabilities} />
        )}
      </LayoutGroup>

      <QuestionsColumn on={showQuestions} />

      <Reveal
        on={showFooter}
        data-testid="a1-footer-caption"
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          bottom: 50,
          zIndex: 10,
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
          {KW(C.footerCaption, C.footerCaptionKw)}
        </p>
      </Reveal>
    </>
  );
}

// ───────────────────── STEP 0 chrome — rule header + tagline ─────────────────────

function OpenerChrome({
  taglineOn,
  ruleOn,
}: {
  taglineOn: boolean;
  ruleOn: boolean;
}) {
  return (
    <>
      <div
        data-testid="a1-tagline"
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          top: 270,
          opacity: taglineOn ? 1 : 0,
          transform: taglineOn ? "translateY(0)" : "translateY(10px)",
          transition:
            "opacity 520ms var(--ease), transform 520ms var(--ease)",
          pointerEvents: taglineOn ? "auto" : "none",
          zIndex: 10,
        }}
      >
        <p
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 40,
            color: "var(--neutral-200)",
            margin: 0,
            lineHeight: 1.3,
            fontWeight: 400,
            textAlign: "center",
          }}
        >
          {KW(C.tagline, C.taglineKw)}
        </p>
      </div>

      <div
        data-testid="a1-rule-header"
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          top: 380,
          display: "flex",
          alignItems: "center",
          gap: 16,
          opacity: ruleOn ? 1 : 0,
          transition: "opacity 280ms var(--ease)",
          pointerEvents: ruleOn ? "auto" : "none",
          zIndex: 9,
        }}
      >
        <div
          style={{
            flex: 1,
            height: 1,
            background: "var(--copper-700)",
            transformOrigin: "left center",
            transform: ruleOn ? "scaleX(1)" : "scaleX(0)",
            transition: "transform 520ms var(--ease) 120ms",
          }}
        />
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: "0.22em",
            color: "var(--copper-400)",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            opacity: ruleOn ? 1 : 0,
            transition: "opacity 360ms var(--ease) 320ms",
          }}
        >
          Capabilities Covered
        </div>
        <div
          style={{
            flex: 1,
            height: 1,
            background: "var(--copper-700)",
            transformOrigin: "right center",
            transform: ruleOn ? "scaleX(1)" : "scaleX(0)",
            transition: "transform 520ms var(--ease) 120ms",
          }}
        />
      </div>
    </>
  );
}

// ───────────────────── STEP 0 — chip row (centered) ─────────────────────

function ChipsRow({
  on,
  capabilities,
}: {
  on: boolean;
  capabilities: readonly A1Capability[];
}) {
  return (
    <div
      data-testid="a1-chip-strip"
      style={{
        position: "absolute",
        left: 48,
        right: 48,
        top: 460,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        flexWrap: "wrap",
        zIndex: 10,
      }}
    >
      {capabilities.map((cap, i) => (
        <div
          key={cap.label}
          style={{
            opacity: on ? 1 : 0,
            transform: on ? "translateY(0)" : "translateY(10px)",
            transition:
              "opacity 420ms var(--ease), transform 420ms var(--ease)",
            transitionDelay: on ? `${i * 80}ms` : "0ms",
          }}
        >
          <CapabilityShape cap={cap} mode="chip" index={i} />
        </div>
      ))}
    </div>
  );
}

// ───────────────────── STEP 1+ — capabilities column ─────────────────────

function CapabilitiesColumn({
  on,
  capabilities,
}: {
  on: boolean;
  capabilities: readonly A1Capability[];
}) {
  return (
    <div
      data-testid="a1-capabilities-column"
      style={{
        position: "absolute",
        left: 48,
        top: COLUMN_TOP,
        width: COLUMN_WIDTH,
        bottom: COLUMN_BOTTOM,
        display: "flex",
        flexDirection: "column",
        pointerEvents: on ? "auto" : "none",
      }}
    >
      <ColumnHeading on={on} label="Five capabilities" />
      <div style={{ height: 12 }} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: CARD_GAP,
          flex: 1,
          minHeight: 0,
        }}
      >
        {capabilities.map((cap, i) => (
          <CapabilityShape
            key={cap.label}
            cap={cap}
            mode="card"
            index={i}
          />
        ))}
      </div>
    </div>
  );
}

// ───────────────────── morphable capability shape ─────────────────────

type ShapeMode = "chip" | "card";

function CapabilityShape({
  cap,
  mode,
  index,
}: {
  cap: A1Capability;
  mode: ShapeMode;
  index: number;
}) {
  const Icon = ICONS[cap.iconName];
  const isCard = mode === "card";
  const [hovered, setHovered] = useState(false);

  const shellStyle: CSSProperties = isCard
    ? {
        display: "flex",
        alignItems: "center",
        gap: 12,
        minHeight: CARD_HEIGHT,
        flex: 1,
        width: "100%",
        padding: "10px 14px",
        border: `1px solid ${hovered ? "var(--copper-200)" : "var(--copper-700)"}`,
        background: hovered ? "rgba(217,158,108,0.12)" : "rgba(10,10,10,0.6)",
        boxSizing: "border-box",
        transition: "all 0.2s var(--ease)",
        cursor: "default",
      }
    : {
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 16px",
        border: `1px solid ${hovered ? "var(--copper-200)" : "var(--copper-700)"}`,
        background: hovered ? "rgba(217,158,108,0.08)" : "rgba(10,10,10,0.4)",
        boxSizing: "border-box",
        whiteSpace: "nowrap",
        transition: "all 0.2s var(--ease)",
        cursor: "default",
      };

  return (
    <motion.div
      layoutId={`a1-cap-${index}`}
      transition={MORPH_TRANSITION}
      data-testid={
        isCard ? `a1-cap-card-${cap.iconName}` : "capability-chip"
      }
      data-hovered={hovered ? "true" : "false"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={shellStyle}
    >
      <motion.div
        layout="position"
        transition={MORPH_TRANSITION}
        style={{
          flex: isCard ? "0 0 22px" : "0 0 auto",
          width: isCard ? 22 : 14,
          height: isCard ? 22 : 14,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--copper-300)",
        }}
      >
        <Icon size={isCard ? 22 : 14} color="currentColor" strokeWidth={1.5} />
      </motion.div>

      <motion.div
        layout="position"
        transition={MORPH_TRANSITION}
        style={{ flex: isCard ? 1 : "0 0 auto", minWidth: 0 }}
      >
        <div
          style={{
            fontFamily: isCard ? "var(--display)" : "var(--mono)",
            fontWeight: isCard ? 400 : 500,
            fontSize: isCard ? 17 : 12,
            letterSpacing: isCard ? "normal" : "0.22em",
            textTransform: isCard ? "none" : "uppercase",
            color: hovered
              ? "var(--copper-100)"
              : isCard
                ? "var(--neutral-50)"
                : "var(--neutral-200)",
            lineHeight: isCard ? 1.05 : 1,
            whiteSpace: isCard ? "normal" : "nowrap",
            transition: "color 0.2s var(--ease)",
          }}
        >
          {cap.label}
        </div>

        <AnimatePresence initial={false}>
          {isCard && (
            <motion.div
              key="desc"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
              style={{
                fontFamily: "var(--serif)",
                fontStyle: "italic",
                fontSize: 12,
                color: "var(--neutral-300)",
                lineHeight: 1.3,
                marginTop: 3,
                overflow: "hidden",
              }}
            >
              {KW(cap.description, cap.descriptionKw)}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

// ───────────────────── STEP 1+ — Questions column ─────────────────────

function QuestionsColumn({ on }: { on: boolean }) {
  return (
    <div
      data-testid="a1-questions-column"
      style={{
        position: "absolute",
        right: 48,
        top: COLUMN_TOP,
        width: COLUMN_WIDTH,
        bottom: COLUMN_BOTTOM,
        opacity: on ? 1 : 0,
        transform: on ? "translateX(0)" : "translateX(8px)",
        transition: "opacity 400ms var(--ease), transform 400ms var(--ease)",
        pointerEvents: on ? "auto" : "none",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ColumnHeading on={on} label="Questions we'll answer" />
      <div style={{ height: 12 }} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: CARD_GAP,
          flex: 1,
          minHeight: 0,
        }}
      >
        {C.questions.map((q, i) => (
          <Reveal
            on={on}
            delay={i * 90}
            key={q.sectionLabel}
            data-testid={`a1-question-card-${i + 1}`}
            style={{ flex: 1, minHeight: CARD_HEIGHT, display: "flex" }}
          >
            <QuestionCard q={q} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function QuestionCard({ q }: { q: (typeof C.questions)[number] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-hovered={hovered ? "true" : "false"}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 4,
        minHeight: CARD_HEIGHT,
        flex: 1,
        width: "100%",
        padding: "10px 14px",
        border: `1px solid ${hovered ? "var(--copper-200)" : "var(--copper-700)"}`,
        background: hovered ? "rgba(217,158,108,0.12)" : "rgba(10,10,10,0.6)",
        boxSizing: "border-box",
        transition: "all 0.2s var(--ease)",
        cursor: "default",
      }}
    >
      <p
        style={{
          fontFamily: "var(--serif)",
          fontStyle: "italic",
          fontSize: 16,
          fontWeight: 400,
          color: hovered ? "var(--copper-100)" : "var(--neutral-100)",
          margin: 0,
          lineHeight: 1.3,
          transition: "color 0.2s var(--ease)",
        }}
      >
        {KW(q.text, q.kw)}
      </p>
      <div
        style={{
          fontFamily: "var(--mono)",
          fontSize: 10,
          fontWeight: 500,
          letterSpacing: "0.18em",
          color: "var(--copper-300)",
          textTransform: "uppercase",
          lineHeight: 1,
        }}
      >
        {"→ "}
        {q.sectionLabel}
      </div>
    </div>
  );
}

// ───────────────────── shared column heading ─────────────────────

function ColumnHeading({ on, label }: { on: boolean; label: string }) {
  return (
    <>
      <div
        style={{
          fontFamily: "var(--mono)",
          fontSize: 10,
          letterSpacing: "0.22em",
          color: "var(--copper-400)",
          textTransform: "uppercase",
          marginBottom: 4,
          opacity: on ? 1 : 0,
          transform: on ? "translateY(0)" : "translateY(-4px)",
          transition:
            "opacity 320ms var(--ease) 80ms, transform 320ms var(--ease) 80ms",
        }}
      >
        {label}
      </div>
      <CopperRule on={on} width="40%" />
    </>
  );
}

// ───────────────────── slide def ─────────────────────

export const a1Slide: SlideDef = {
  steps: 3,
  canonicalPose: 2,
  animationMode: "step-reveal",
  surface: "dark",
  section: "A",
  render: () => <A1WhatYouveSeen />,
};
