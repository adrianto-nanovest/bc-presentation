import { copper, neutral } from "@/design-system/colors";

// Color projection-test slide. Renders the full copper ladder + grayscale
// so Adri can hold his laptop next to the projector and pick the stops
// that survive the auditorium's wash-out (spec §6.5, §11).
export function HexLadder() {
  const renderStop = (hex: string, label: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const luma = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    const labelColor = luma > 0.55 ? "#0a0a0a" : "#f5f5f5";
    return (
      <div
        key={`${label}-${hex}`}
        data-testid="swatch"
        className="flex flex-1 flex-col items-center justify-end p-4"
        style={{ background: hex, color: labelColor }}
      >
        <span style={{ fontSize: "clamp(0.875rem, 1vw, 1.25rem)" }}>{label}</span>
        <span style={{ fontSize: "clamp(0.875rem, 1vw, 1.25rem)" }}>{hex}</span>
      </div>
    );
  };

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex flex-1">
        {Object.entries(copper).map(([k, v]) =>
          renderStop(v as string, `copper-${k}`),
        )}
      </div>
      <div className="flex flex-1">
        {Object.entries(neutral).map(([k, v]) =>
          renderStop(v as string, `neutral-${k}`),
        )}
      </div>
    </div>
  );
}
