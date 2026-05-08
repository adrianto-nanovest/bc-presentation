import { motion } from "framer-motion";

interface HarnessPackageProps {
  includes: readonly string[];
  revealIncludes: boolean;
  revealArrows: boolean;
}

export function HarnessPackage({
  includes,
  revealIncludes,
  revealArrows,
}: HarnessPackageProps) {
  return (
    <div
      data-testid="harness-package"
      className="relative flex w-full max-w-[40vw] flex-col items-stretch gap-3 border border-copper-200 bg-neutral-950/70 p-6"
    >
      <span
        className="font-mono uppercase tracking-[0.18em] text-copper-200"
        style={{ fontSize: "clamp(1.1rem, 1.5vw, 1.6rem)" }}
      >
        HARNESS
      </span>
      <span
        className="font-serif italic text-neutral-200"
        style={{ fontSize: "clamp(0.95rem, 1.2vw, 1.2rem)", lineHeight: 1.3 }}
      >
        Automates context engineering
      </span>

      <motion.div
        data-testid="harness-includes"
        data-revealed={String(revealIncludes)}
        className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-copper-700 pt-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: revealIncludes ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      >
        <span
          className="font-mono uppercase tracking-[0.18em] text-neutral-300"
          style={{ fontSize: "clamp(0.7rem, 0.85vw, 0.85rem)" }}
        >
          Includes:
        </span>
        {includes.map((name, i) => (
          <motion.span
            key={name}
            data-testid={`harness-include-${i}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: revealIncludes ? 1 : 0 }}
            transition={{
              duration: 0.3,
              delay: revealIncludes ? i * 0.12 : 0,
            }}
            className="font-mono text-copper-300"
            style={{ fontSize: "clamp(0.75rem, 0.95vw, 0.95rem)" }}
          >
            {name}
            {i < includes.length - 1 ? " · " : ""}
          </motion.span>
        ))}
      </motion.div>

      <div className="flex items-center justify-between gap-4 pt-2">
        <motion.span
          data-testid="harness-arrow-input"
          data-revealed={String(revealArrows)}
          className="font-mono text-copper-300"
          style={{ fontSize: "clamp(0.85rem, 1.05vw, 1.05rem)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: revealArrows ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        >
          request →
        </motion.span>
        <motion.span
          data-testid="harness-arrow-output"
          data-revealed={String(revealArrows)}
          className="font-mono text-copper-300"
          style={{ fontSize: "clamp(0.85rem, 1.05vw, 1.05rem)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: revealArrows ? 1 : 0 }}
          transition={{ duration: 0.4, delay: revealArrows ? 0.15 : 0 }}
        >
          → result
        </motion.span>
      </div>
    </div>
  );
}
