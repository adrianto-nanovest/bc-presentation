import { motion } from "framer-motion";

export type ListEntry =
  | { kind: "header"; label: string }
  | { kind: "subheader"; label: string }
  | { kind: "item"; id: string; label: string; weight: "heavy" | "light" };

interface CategoryListProps {
  items: ListEntry[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  revealedHeaders: number;       // 0 = nothing, 1 = first header group, 2 = all
}

export function CategoryList({ items, selectedId, onSelect, revealedHeaders }: CategoryListProps) {
  // Compute "which group does each entry belong to" by walking and counting headers.
  let groupIndex = -1;
  return (
    <ul className="flex flex-col gap-2 font-sans">
      {items.map((entry, i) => {
        if (entry.kind === "header") {
          groupIndex += 1;
          const revealed = groupIndex < revealedHeaders;
          return (
            <motion.li
              key={i}
              data-testid="category-header"
              data-revealed={String(revealed)}
              className="mt-6 text-copper-400 uppercase tracking-[0.18em]"
              style={{ fontSize: "clamp(0.85rem, 1vw, 1.1rem)" }}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: revealed ? 1 : 0, x: revealed ? 0 : -4 }}
              transition={{ duration: 0.3 }}
            >
              {entry.label}
            </motion.li>
          );
        }
        const groupRevealed = groupIndex < revealedHeaders;
        if (entry.kind === "subheader") {
          return (
            <motion.li
              key={i}
              className="ml-4 text-copper-300 italic"
              style={{ fontSize: "clamp(0.85rem, 1vw, 1.05rem)" }}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: groupRevealed ? 1 : 0, x: groupRevealed ? 0 : -4 }}
              transition={{ duration: 0.25, delay: 0.05 }}
            >
              <span aria-hidden="true">─ </span>
              <span>{entry.label}</span>
            </motion.li>
          );
        }
        // entry.kind === "item"
        const isActive = selectedId === entry.id;
        return (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: groupRevealed ? 1 : 0, x: groupRevealed ? 0 : -4 }}
            transition={{ duration: 0.25, delay: 0.1 + i * 0.02 }}
          >
            <button
              type="button"
              data-active={String(isActive)}
              onClick={() => onSelect(entry.id)}
              className={`ml-8 block w-full text-left transition-colors ${
                isActive
                  ? "border-l-2 border-copper-400 pl-3 text-neutral-50"
                  : "border-l-2 border-transparent pl-3 text-neutral-300 hover:text-neutral-50 hover:border-copper-700"
              }`}
              style={{ fontSize: "clamp(0.95rem, 1.15vw, 1.25rem)", lineHeight: 1.4 }}
            >
              <span aria-hidden="true">• </span>
              <span>{entry.label}</span>
            </button>
          </motion.li>
        );
      })}
    </ul>
  );
}
