import "@testing-library/jest-dom";

// jsdom doesn't ship a ResizeObserver. The Section E FunnelAnimation
// primitive (Canvas2D animation) constructs one on mount. Provide a no-op
// stub so `mount without throwing` smoke tests pass.
if (typeof globalThis.ResizeObserver === "undefined") {
  class ResizeObserverStub {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as any).ResizeObserver = ResizeObserverStub;
}

// jsdom prints a noisy "Not implemented: HTMLCanvasElement.prototype.getContext"
// warning whenever a 2D context is requested. The FunnelAnimation primitive
// already guards `if (!ctx) return`, so the test still passes — but the
// warning clutters output. Return null silently instead.
if (typeof HTMLCanvasElement !== "undefined") {
  HTMLCanvasElement.prototype.getContext = (() => null) as unknown as typeof HTMLCanvasElement.prototype.getContext;
}
