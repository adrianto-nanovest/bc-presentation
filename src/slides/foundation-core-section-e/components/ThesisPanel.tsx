import { motion } from "framer-motion";
import { highlight } from "@/components/highlight";

interface ThesisPanelProps {
  revealEquation: boolean;
  revealStanza: boolean;
  revealTagline: boolean;
}

const STANZA = [
  "It picks what to load.",
  "It cleans up.",
  "It verifies its work.",
  "It remembers.",
] as const;

const QUOTE_TEXT =
  "A decent model with a great harness beats a great model with a bad harness.";
const QUOTE_KEYWORDS = [
  "decent model with a great harness",
  "great model with a bad harness",
] as const;

export function ThesisPanel({
  revealEquation,
  revealStanza,
  revealTagline,
}: ThesisPanelProps) {
  return (
    <div className="flex flex-col gap-6">
      <div
        data-testid="thesis-equation"
        data-revealed={String(revealEquation)}
        className="flex flex-wrap items-baseline gap-3 font-display text-neutral-50"
        style={{ fontSize: "clamp(2.2rem, 3.5vw, 3.5rem)", lineHeight: 1 }}
      >
        {[
          { token: "Agent", italicCopper: true, delay: 0 },
          { token: "=", italicCopper: false, delay: 0.25 },
          { token: "Model", italicCopper: false, delay: 0.4 },
          { token: "+", italicCopper: false, delay: 0.55 },
          { token: "Harness", italicCopper: true, delay: 1.0 },
        ].map((t) => (
          <motion.span
            key={t.token}
            initial={{ opacity: 0, y: 6 }}
            animate={{
              opacity: revealEquation ? 1 : 0,
              y: revealEquation ? 0 : 6,
            }}
            transition={{
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
              delay: revealEquation ? t.delay : 0,
            }}
            className={t.italicCopper ? "italic text-copper-300" : ""}
          >
            {t.token}
          </motion.span>
        ))}
      </div>

      <div className="border-t border-copper-700" />

      <motion.div
        className="flex flex-col gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: revealEquation ? 1 : 0 }}
        transition={{ duration: 0.5, delay: revealEquation ? 1.6 : 0 }}
      >
        <p
          className="font-serif italic text-neutral-200"
          style={{ fontSize: "clamp(1rem, 1.4vw, 1.4rem)", lineHeight: 1.4 }}
        >
          &ldquo;{highlight(QUOTE_TEXT, QUOTE_KEYWORDS)}&rdquo;
        </p>
        <p
          className="text-right font-mono uppercase tracking-[0.18em] text-neutral-400"
          style={{ fontSize: "clamp(0.7rem, 0.85vw, 0.85rem)" }}
        >
          — Cursor engineering
        </p>
      </motion.div>

      <div className="border-t border-copper-700" />

      <div
        data-testid="thesis-stanza-block"
        data-revealed={String(revealStanza)}
        className="flex flex-col gap-1"
      >
        {STANZA.map((line, i) => (
          <motion.p
            key={line}
            data-testid={`thesis-stanza-${i}`}
            className="font-serif text-neutral-50"
            style={{ fontSize: "clamp(1rem, 1.3vw, 1.3rem)", lineHeight: 1.4 }}
            initial={{ opacity: 0, x: -4 }}
            animate={{
              opacity: revealStanza ? 1 : 0,
              x: revealStanza ? 0 : -4,
            }}
            transition={{
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
              delay: revealStanza ? i * 0.25 : 0,
            }}
          >
            {line}
          </motion.p>
        ))}
      </div>

      <motion.p
        data-testid="thesis-tagline"
        data-revealed={String(revealTagline)}
        className="font-display italic text-neutral-50"
        style={{ fontSize: "clamp(1.5rem, 2.2vw, 2.2rem)", lineHeight: 1.2 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: revealTagline ? 1 : 0 }}
        transition={{ duration: 0.45 }}
      >
        <span className="text-copper-300">Build once</span>.{" "}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: revealTagline ? 1 : 0 }}
          transition={{ duration: 0.4, delay: revealTagline ? 0.4 : 0 }}
          className="text-copper-300"
        >
          Use forever
        </motion.span>
        .
      </motion.p>
    </div>
  );
}
