import { useEffect, useState } from "react";

// Letterbox-fit hook: returns the largest scale factor that lets a fixed
// 1280x720 stage fit inside the current viewport while preserving aspect
// ratio. Mirrors the original Claude-Design shell behaviour. Client-only —
// the app never renders on the server.
export function useViewportScale(): number {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const fit = () => {
      const sx = window.innerWidth / 1280;
      const sy = window.innerHeight / 720;
      setScale(Math.min(sx, sy));
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);
  return scale;
}
