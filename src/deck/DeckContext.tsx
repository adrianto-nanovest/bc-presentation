import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type DeckState = {
  slideIndex: number;
  stepIndex: number;
  stepCounts: readonly number[];
  advance: () => void;
  retreat: () => void;
  goTo: (slide: number, step?: number) => void;
};

const DeckCtx = createContext<DeckState | null>(null);

export function DeckProvider({
  stepCounts,
  children,
}: {
  stepCounts: readonly number[];
  children: ReactNode;
}) {
  const [pos, setPos] = useState({ slide: 0, step: 0 });
  const { slide: slideIndex, step: stepIndex } = pos;

  const advance = useCallback(() => {
    setPos((cur) => {
      const stepsHere = stepCounts[cur.slide] ?? 1;
      // Single transaction so step + slide transitions stay consistent in
      // StrictMode double-render. Do not split into separate setState calls.
      if (cur.step + 1 < stepsHere) return { slide: cur.slide, step: cur.step + 1 };
      if (cur.slide + 1 < stepCounts.length)
        return { slide: cur.slide + 1, step: 0 };
      return cur; // pinned at the last step of the last slide
    });
  }, [stepCounts]);

  const retreat = useCallback(() => {
    setPos((cur) => {
      if (cur.step > 0) return { slide: cur.slide, step: cur.step - 1 };
      if (cur.slide > 0)
        return {
          slide: cur.slide - 1,
          step: Math.max(0, (stepCounts[cur.slide - 1] ?? 1) - 1),
        };
      return cur;
    });
  }, [stepCounts]);

  const goTo = useCallback(
    (slide: number, step = 0) => {
      const safeSlide = Math.max(0, Math.min(slide, stepCounts.length - 1));
      const safeStep = Math.max(
        0,
        Math.min(step, (stepCounts[safeSlide] ?? 1) - 1),
      );
      setPos({ slide: safeSlide, step: safeStep });
    },
    [stepCounts],
  );

  const value = useMemo<DeckState>(
    () => ({ slideIndex, stepIndex, stepCounts, advance, retreat, goTo }),
    [slideIndex, stepIndex, stepCounts, advance, retreat, goTo],
  );

  return <DeckCtx.Provider value={value}>{children}</DeckCtx.Provider>;
}

export function useDeck() {
  const ctx = useContext(DeckCtx);
  if (!ctx) throw new Error("useDeck must be used inside <DeckProvider>");
  return ctx;
}
