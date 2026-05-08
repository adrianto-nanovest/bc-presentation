import { motion } from "framer-motion";
import {
  Network,
  Package,
  Brain,
  Activity,
  Zap,
  FileText,
  Users,
  Repeat,
  type LucideIcon,
} from "lucide-react";
import { HarnessPattern } from "@/components/HarnessPattern";

const ICONS: Record<string, LucideIcon> = {
  Network,
  Package,
  Brain,
  Activity,
  Zap,
  FileText,
  Users,
  Repeat,
};

export type PracticeIcon = keyof typeof ICONS;

interface PracticeCardProps {
  id: string;
  icon: PracticeIcon;
  name: string;
  essence: string;
  bullets: readonly string[];
  expanded: boolean;
  onSelect: (id: string) => void;
  onClose: () => void;
}

export function PracticeCard({
  id,
  icon,
  name,
  essence,
  bullets,
  expanded,
  onSelect,
  onClose,
}: PracticeCardProps) {
  const Icon = ICONS[icon];
  const isOrchestration = id === "orchestration";

  return (
    <motion.div
      data-testid={`practice-card-${id}`}
      data-expanded={String(expanded)}
      layoutId={`practice-${id}`}
      className={`relative flex h-full w-full cursor-pointer flex-col gap-2 border bg-neutral-950/70 ${
        expanded ? "border-copper-300 p-6" : "border-copper-700 p-4 hover:border-copper-300"
      }`}
      onClick={(e) => {
        if (expanded) return;
        e.stopPropagation();
        onSelect(id);
      }}
      transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
    >
      <div className="flex items-center gap-3">
        {Icon && (
          <Icon size={expanded ? 28 : 24} strokeWidth={1.5} className="text-copper-300" aria-hidden />
        )}
        <span
          className="font-mono uppercase tracking-[0.18em] text-neutral-50"
          style={{ fontSize: expanded ? "clamp(1.1rem, 1.4vw, 1.4rem)" : "clamp(0.85rem, 1vw, 1rem)" }}
        >
          {name}
        </span>
        {expanded && (
          <button
            type="button"
            data-testid="practice-card-close"
            aria-label="close"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="ml-auto font-mono text-copper-300 hover:text-copper-200"
            style={{ fontSize: "1.4rem" }}
          >
            ×
          </button>
        )}
      </div>

      {!expanded && (
        <span
          className="font-serif italic text-neutral-300"
          style={{ fontSize: "clamp(0.7rem, 0.85vw, 0.85rem)", lineHeight: 1.3 }}
        >
          {essence}
        </span>
      )}

      {expanded && (
        <div className="mt-2 flex flex-1 gap-6">
          {isOrchestration ? (
            <>
              <div className="flex-1">
                <HarnessPattern play />
              </div>
              <ul className="flex w-1/3 flex-col gap-2">
                {bullets.map((b, i) => (
                  <li
                    key={b}
                    data-testid={`practice-bullet-${i}`}
                    className="font-serif text-neutral-100"
                    style={{ fontSize: "clamp(0.85rem, 1vw, 1rem)", lineHeight: 1.4 }}
                  >
                    <span className="mr-2 text-copper-300">•</span>
                    {b}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <ul className="flex flex-1 flex-col gap-2">
              {bullets.map((b, i) => (
                <li
                  key={b}
                  data-testid={`practice-bullet-${i}`}
                  className="font-serif text-neutral-100"
                  style={{ fontSize: "clamp(0.95rem, 1.15vw, 1.15rem)", lineHeight: 1.4 }}
                >
                  <span className="mr-2 text-copper-300">•</span>
                  {b}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </motion.div>
  );
}
