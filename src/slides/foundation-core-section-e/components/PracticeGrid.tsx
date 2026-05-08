import { useState } from "react";
import { LayoutGroup } from "framer-motion";
import { PracticeCard, type PracticeIcon } from "./PracticeCard";

export interface PracticeSpec {
  id: string;
  icon: PracticeIcon;
  name: string;
  essence: string;
  bullets: readonly string[];
}

interface PracticeGridProps {
  practices: readonly PracticeSpec[]; // expect 8
}

export function PracticeGrid({ practices }: PracticeGridProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const expanded = expandedId !== null ? practices.find((p) => p.id === expandedId) : undefined;
  const others = expandedId !== null ? practices.filter((p) => p.id !== expandedId) : [];

  return (
    <LayoutGroup>
      {expandedId === null ? (
        <div
          data-testid="practice-grid-default"
          className="grid w-full grid-cols-4 grid-rows-2 gap-4"
          style={{ minHeight: "62vh" }}
        >
          {practices.map((p) => (
            <PracticeCard
              key={p.id}
              {...p}
              expanded={false}
              onSelect={(id) => setExpandedId(id)}
              onClose={() => {}}
            />
          ))}
        </div>
      ) : (
        <div
          data-testid="practice-grid-expanded"
          className="relative w-full"
          style={{ minHeight: "62vh" }}
        >
          <button
            type="button"
            data-testid="practice-grid-outside"
            aria-label="close"
            onClick={() => setExpandedId(null)}
            className="absolute inset-0 z-0 cursor-default bg-transparent"
          />
          <div className="relative z-10 grid w-full grid-cols-[1fr_24%] gap-4" style={{ minHeight: "62vh" }}>
            {expanded && (
              <PracticeCard
                key={expanded.id}
                {...expanded}
                expanded
                onSelect={(id) => setExpandedId(id)}
                onClose={() => setExpandedId(null)}
              />
            )}
            <div className="flex flex-col gap-2">
              {others.map((p) => (
                <PracticeCard
                  key={p.id}
                  {...p}
                  expanded={false}
                  onSelect={(id) => setExpandedId(id)}
                  onClose={() => {}}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </LayoutGroup>
  );
}
