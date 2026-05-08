import { motion } from "framer-motion";
import { highlight } from "@/components/highlight";

export type PitfallKind = "default" | "conflict" | "confusion" | "poisoning" | "distraction";

interface PitfallIllustrationProps {
  kind: PitfallKind;
}

export function PitfallIllustration({ kind }: PitfallIllustrationProps) {
  return (
    <div
      data-testid="pitfall-illustration"
      data-kind={kind}
      className="flex h-full w-full flex-col items-center justify-center gap-4 p-8"
    >
      {kind === "default" && <DefaultCanvas />}
      {kind === "conflict" && <ConflictCanvas />}
      {kind === "confusion" && <ConfusionCanvas />}
      {kind === "poisoning" && <PoisoningCanvas />}
      {kind === "distraction" && <DistractionCanvas />}
    </div>
  );
}

function DefaultCanvas() {
  return (
    <p
      className="font-serif italic text-neutral-400"
      style={{ fontSize: "clamp(0.85rem, 1.1vw, 1.1rem)" }}
    >
      Hover a pitfall →
    </p>
  );
}

function Caption({ text, keywords, mitigatedBy }: {
  text: string;
  keywords: readonly string[];
  mitigatedBy: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <p
        className="font-serif italic text-neutral-100"
        style={{ fontSize: "clamp(1rem, 1.3vw, 1.3rem)", lineHeight: 1.4 }}
      >
        {highlight(text, keywords)}
      </p>
      <p
        className="font-mono uppercase tracking-[0.18em] text-copper-300"
        style={{ fontSize: "clamp(0.7rem, 0.9vw, 0.9rem)" }}
      >
        Mitigated by → {mitigatedBy}
      </p>
    </div>
  );
}

function ConflictCanvas() {
  return (
    <>
      <svg viewBox="-50 -30 100 60" className="w-full" style={{ maxHeight: "16rem" }}>
        <motion.circle
          cx={-12} cy={0} r={20}
          fill="rgb(124 84 56 / 0.4)"
          stroke="rgb(124 84 56)"
          strokeWidth={0.6}
          initial={{ x: -10 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.circle
          cx={12} cy={0} r={20}
          fill="rgb(212 153 102 / 0.4)"
          stroke="rgb(212 153 102)"
          strokeWidth={0.6}
          initial={{ x: 10 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
        <text
          x={0} y={0}
          textAnchor="middle"
          fill="rgb(212 153 102)"
          fontSize={5}
          fontFamily="JetBrains Mono"
        >
          FROZEN
        </text>
        <text x={-25} y={-25} fill="rgb(124 84 56)" fontSize={3.5} fontFamily="JetBrains Mono">Source A</text>
        <text x={20} y={-25} fill="rgb(212 153 102)" fontSize={3.5} fontFamily="JetBrains Mono">Source B</text>
      </svg>
      <Caption
        text="Sources contradict. Model commits early — and can't recover."
        keywords={["commits early"]}
        mitigatedBy="Context Isolation · Versioned Context"
      />
      <p
        className="text-center font-serif italic text-neutral-300"
        style={{ fontSize: "clamp(0.8rem, 1vw, 1rem)", lineHeight: 1.4 }}
      >
        Example: pasting Q3 and Q4 figures into the same chat — model averages them, picks neither cleanly.
      </p>
    </>
  );
}

function ConfusionCanvas() {
  return (
    <>
      <svg viewBox="-50 -30 100 60" className="w-full" style={{ maxHeight: "16rem" }}>
        <line x1={-50} y1={-8} x2={50} y2={-8} stroke="rgb(212 153 102 / 0.5)" strokeWidth={0.4} strokeDasharray="2 2" />
        <polygon points="-6,-8 6,-8 0,-22" fill="rgb(212 153 102 / 0.7)" />
        <motion.polygon
          points="-22,-8 22,-8 12,18 -12,18"
          fill="rgb(124 84 56 / 0.5)"
          initial={{ y: -4 }}
          animate={{ y: 0 }}
          transition={{ duration: 1.2, repeat: Infinity, repeatType: "reverse" }}
        />
        <text x={0} y={-18} textAnchor="middle" fill="rgb(229 199 159)" fontSize={3} fontFamily="JetBrains Mono">Signal</text>
        <text x={0} y={0} textAnchor="middle" fill="rgb(124 84 56)" fontSize={2.5} fontFamily="JetBrains Mono">Irrelevant Information</text>
        <text x={0} y={6} textAnchor="middle" fill="rgb(124 84 56)" fontSize={2.5} fontFamily="JetBrains Mono">Tool Overload</text>
        <text x={0} y={12} textAnchor="middle" fill="rgb(124 84 56)" fontSize={2.5} fontFamily="JetBrains Mono">Cognitive Overload</text>
      </svg>
      <Caption
        text="Most of the context isn't what you wanted."
        keywords={["what you wanted"]}
        mitigatedBy="Tool Loadout · Context Pruning"
      />
      <p
        className="text-center font-serif italic text-neutral-300"
        style={{ fontSize: "clamp(0.8rem, 1vw, 1rem)", lineHeight: 1.4 }}
      >
        Example: pasting a 50-page report 'just in case' — model misses the 3 things that mattered.
      </p>
    </>
  );
}

function PoisoningCanvas() {
  return (
    <>
      <svg viewBox="-50 -30 100 60" className="w-full" style={{ maxHeight: "16rem" }}>
        <rect x={-30} y={-25} width={60} height={20} fill="rgb(212 153 102 / 0.18)" stroke="rgb(212 153 102)" strokeWidth={0.4} />
        <rect x={-30} y={5} width={60} height={20} fill="rgb(124 84 56 / 0.3)" stroke="rgb(124 84 56)" strokeWidth={0.4} />
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.circle
            key={i}
            r={1.2}
            cy={-15}
            cx={-25 + i * 7}
            fill="rgb(229 199 159)"
            initial={{ cy: -15, fill: "rgb(229 199 159)" }}
            animate={{ cy: [-15, 15], fill: ["rgb(229 199 159)", "rgb(168 90 60)"] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.25, ease: "linear" }}
          />
        ))}
        <text x={0} y={-26} textAnchor="middle" fill="rgb(229 199 159)" fontSize={3} fontFamily="JetBrains Mono">Clean</text>
        <text x={0} y={20} textAnchor="middle" fill="rgb(124 84 56)" fontSize={3} fontFamily="JetBrains Mono">Corrupted</text>
      </svg>
      <Caption
        text="Wrong or vague info compounds silently."
        keywords={["compounds"]}
        mitigatedBy="Subagent Verification · Context Quarantine"
      />
      <p
        className="text-center font-serif italic text-neutral-300"
        style={{ fontSize: "clamp(0.8rem, 1vw, 1rem)", lineHeight: 1.4 }}
      >
        Example: pasted last quarter's budget by mistake — AI keeps using it through edits; final memo ships off by 30%.
      </p>
    </>
  );
}

function DistractionCanvas() {
  return (
    <>
      <svg viewBox="-50 -30 100 60" className="w-full" style={{ maxHeight: "16rem" }}>
        <rect x={-40} y={15} width={80} height={6} fill="rgb(212 153 102 / 0.15)" stroke="rgb(212 153 102 / 0.5)" strokeWidth={0.3} />
        <motion.rect
          x={-40} y={15} height={6}
          fill="rgb(212 153 102 / 0.6)"
          initial={{ width: 10 }}
          animate={{ width: 80 }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeIn" }}
        />
        <motion.path
          d="M-40,-15 Q-10,-20 0,-10 T40,15"
          fill="none"
          stroke="rgb(229 199 159)"
          strokeWidth={0.6}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
        <rect x={20} y={5} width={20} height={12} fill="rgb(168 90 60 / 0.35)" />
        <text x={30} y={12} textAnchor="middle" fill="rgb(229 199 159)" fontSize={3} fontFamily="JetBrains Mono">DEGRADED</text>
      </svg>
      <Caption
        text='Tokens compound. Performance degrades into the dumb zone.'
        keywords={["dumb zone"]}
        mitigatedBy="Summarization · Context Offloading"
      />
      <p
        className="text-center font-serif italic text-neutral-300"
        style={{ fontSize: "clamp(0.8rem, 1vw, 1rem)", lineHeight: 1.4 }}
      >
        Example: after ~20 rounds of edits in one chat — answers start repeating, recent corrections get missed.
      </p>
    </>
  );
}
