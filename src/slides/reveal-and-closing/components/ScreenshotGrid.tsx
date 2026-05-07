interface ScreenshotGridProps {
  paths: readonly string[];
}

export function ScreenshotGrid({ paths }: ScreenshotGridProps) {
  return (
    <div className="grid h-full w-full grid-cols-3 gap-4 p-8">
      {paths.map((p) => (
        <div key={p} className="flex items-center justify-center bg-neutral-950 p-2">
          <img
            src={p}
            alt=""
            role="img"
            aria-hidden
            className="max-h-full max-w-full object-contain"
          />
        </div>
      ))}
    </div>
  );
}
