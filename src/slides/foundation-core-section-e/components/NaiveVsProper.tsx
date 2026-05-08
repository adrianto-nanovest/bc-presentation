import { motion } from "framer-motion";
import type { JSX } from "react";

interface NaiveVsProperProps {
  naivePrompt: string;
  naiveResult: string;
  properPrompt: string;
  properElementLabels: readonly string[]; // tokens like "Role:" — emphasized inline
  properResult: string;
  revealNaive: boolean;
  revealProper: boolean;
  revealResults: boolean;
}

// Wrap each occurrence of any label in `labels` with a copper-300 span.
function emphasizeLabels(text: string, labels: readonly string[]): JSX.Element {
  // Sort longest-first to avoid partial overlaps (e.g. "Output" inside "OutputSpec").
  const sorted = [...labels].sort((a, b) => b.length - a.length);
  let parts: (string | JSX.Element)[] = [text];
  sorted.forEach((label, idx) => {
    parts = parts.flatMap((p, partIdx) => {
      if (typeof p !== "string" || !p.includes(label)) return [p];
      const split = p.split(label);
      const out: (string | JSX.Element)[] = [];
      split.forEach((s, j) => {
        if (j > 0) {
          out.push(
            <span key={`${idx}-${partIdx}-${j}`} className="text-copper-300 font-semibold">
              {label}
            </span>,
          );
        }
        if (s) out.push(s);
      });
      return out;
    });
  });
  return (
    <>
      {parts.map((p, i) =>
        typeof p === "string" ? <span key={i}>{p}</span> : p,
      )}
    </>
  );
}

export function NaiveVsProper({
  naivePrompt,
  naiveResult,
  properPrompt,
  properElementLabels,
  properResult,
  revealNaive,
  revealProper,
  revealResults,
}: NaiveVsProperProps) {
  return (
    <div className="flex w-full flex-col gap-4">
      {/* NAIVE block */}
      <motion.div
        data-testid="naive-block"
        data-revealed={String(revealNaive)}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: revealNaive ? 1 : 0, y: revealNaive ? 0 : 12 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col gap-2 border border-copper-700 bg-neutral-950/70 p-4"
      >
        <span className="font-mono uppercase tracking-[0.18em] text-copper-400" style={{ fontSize: "clamp(0.75rem, 0.9vw, 0.95rem)" }}>
          NAIVE
        </span>
        <pre className="whitespace-pre-wrap font-mono text-neutral-100" style={{ fontSize: "clamp(0.95rem, 1.15vw, 1.2rem)" }}>
          {naivePrompt}
        </pre>
        <motion.pre
          data-testid="naive-result"
          data-revealed={String(revealResults)}
          initial={{ opacity: 0 }}
          animate={{ opacity: revealResults ? 0.7 : 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="whitespace-pre-wrap font-mono italic text-neutral-400"
          style={{ fontSize: "clamp(0.8rem, 0.95vw, 1rem)", maxHeight: "6em", overflow: "hidden", WebkitMaskImage: "linear-gradient(to bottom, black 70%, transparent 100%)", maskImage: "linear-gradient(to bottom, black 70%, transparent 100%)" }}
        >
          {naiveResult}
        </motion.pre>
      </motion.div>

      {/* PROPER block */}
      <motion.div
        data-testid="proper-block"
        data-revealed={String(revealProper)}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: revealProper ? 1 : 0, y: revealProper ? 0 : 12 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col gap-2 border border-copper-300 bg-neutral-950/70 p-4"
      >
        <span className="font-mono uppercase tracking-[0.18em] text-copper-300" style={{ fontSize: "clamp(0.75rem, 0.9vw, 0.95rem)" }}>
          PROPER
        </span>
        <pre className="whitespace-pre-wrap font-mono text-neutral-100" style={{ fontSize: "clamp(0.95rem, 1.15vw, 1.2rem)" }}>
          {emphasizeLabels(properPrompt, properElementLabels)}
        </pre>
        <motion.pre
          data-testid="proper-result"
          data-revealed={String(revealResults)}
          initial={{ opacity: 0 }}
          animate={{ opacity: revealResults ? 1 : 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="whitespace-pre-wrap font-mono text-neutral-100"
          style={{ fontSize: "clamp(0.8rem, 0.95vw, 1rem)", maxHeight: "6em", overflow: "hidden", WebkitMaskImage: "linear-gradient(to bottom, black 70%, transparent 100%)", maskImage: "linear-gradient(to bottom, black 70%, transparent 100%)" }}
        >
          {properResult}
        </motion.pre>
      </motion.div>
    </div>
  );
}
