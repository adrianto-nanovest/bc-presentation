import { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

// Module-level default so the array identity is stable across renders;
// inlining the literal as a default-prop value would re-create it each render
// and re-trigger the animation effect on every parent re-render.
const DEFAULT_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface CountUpProps {
  from: number;
  to: number;
  durationMs?: number;
  // Cubic-bezier control points (Framer accepts a 4-tuple).
  ease?: [number, number, number, number];
  testId?: string;
  className?: string;
}

export function CountUp({
  from,
  to,
  durationMs = 1500,
  ease = DEFAULT_EASE,
  testId,
  className,
}: CountUpProps) {
  const value = useMotionValue(from);
  const rounded = useTransform(value, (n) => Math.round(n).toString());

  useEffect(() => {
    const controls = animate(value, to, {
      duration: durationMs / 1000,
      ease,
    });
    return () => controls.stop();
  }, [to, durationMs, ease, value]);

  return (
    <motion.span
      data-testid={testId}
      data-count-from={from}
      data-count-to={to}
      data-duration-ms={durationMs}
      className={className}
    >
      {rounded}
    </motion.span>
  );
}
