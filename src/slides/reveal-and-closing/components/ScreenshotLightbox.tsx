// I.3 — ScreenshotLightbox
//
// Modal overlay that shows one screenshot at a time at a fixed dialog height,
// so screenshots with wildly different aspect ratios all read well. Cyclic
// prev/next (last → first), explicit close button, dim backdrop. Mounted as
// position:absolute inside the workflow canvas so it stays inside the bezel.
import { useEffect, useState, type CSSProperties } from "react";

interface ScreenshotLightboxProps {
  images: readonly string[];
  isOpen: boolean;
  onClose: () => void;
}

export function ScreenshotLightbox({
  images,
  isOpen,
  onClose,
}: ScreenshotLightboxProps) {
  const [index, setIndex] = useState(0);

  // Re-open always lands on the first image; same when the image set changes.
  useEffect(() => {
    if (isOpen) setIndex(0);
  }, [isOpen, images]);

  // Keyboard nav while open. Capture-phase + stopPropagation so the deck's
  // own arrow-key handlers don't also advance slides.
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.stopPropagation();
        setIndex((i) => (i - 1 + images.length) % images.length);
      } else if (e.key === "ArrowRight") {
        e.stopPropagation();
        setIndex((i) => (i + 1) % images.length);
      } else if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener("keydown", handler, true);
    return () => window.removeEventListener("keydown", handler, true);
  }, [isOpen, images.length, onClose]);

  if (!isOpen || images.length === 0) return null;

  const prev = () =>
    setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  return (
    <div
      data-no-advance
      data-testid="screenshot-lightbox"
      onClick={onClose}
      style={{
        position: "absolute",
        inset: 0,
        background: "rgba(0,0,0,0.78)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
        animation: "i3-lightbox-fade 180ms var(--ease) both",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "calc(100% - 32px)",
          height: "calc(100% - 32px)",
          background: "var(--neutral-950)",
          border: "1px solid var(--copper-700)",
          borderRadius: 8,
          boxShadow: "0 16px 48px rgba(0,0,0,0.6)",
          padding: "12px 56px",
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        >
          <span
            data-testid="lightbox-counter"
            style={{
              fontFamily: "var(--mono)",
              fontSize: 10,
              color: "var(--copper-300)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            {index + 1} / {images.length}
          </span>
          <button
            type="button"
            data-no-advance
            data-testid="lightbox-close"
            onClick={onClose}
            aria-label="Close"
            className="i3-lightbox-btn i3-lightbox-close"
            style={{
              background: "transparent",
              border: "1px solid var(--copper-700)",
              borderRadius: 4,
              color: "var(--copper-200)",
              width: 26,
              height: 26,
              cursor: "pointer",
              fontFamily: "var(--mono)",
              fontSize: 14,
              lineHeight: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ×
          </button>
        </div>

        <div
          style={{
            flex: 1,
            minHeight: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <img
            key={images[index]}
            src={images[index]}
            alt=""
            role="img"
            aria-hidden
            data-testid="lightbox-image"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
              animation: "i3-lightbox-img 220ms var(--ease) both",
            }}
          />
        </div>

        <button
          type="button"
          data-no-advance
          data-testid="lightbox-prev"
          onClick={prev}
          aria-label="Previous"
          className="i3-lightbox-btn i3-lightbox-nav"
          style={navButtonStyle("left")}
        >
          ‹
        </button>
        <button
          type="button"
          data-no-advance
          data-testid="lightbox-next"
          onClick={next}
          aria-label="Next"
          className="i3-lightbox-btn i3-lightbox-nav"
          style={navButtonStyle("right")}
        >
          ›
        </button>
      </div>

      <style>{`
        @keyframes i3-lightbox-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes i3-lightbox-img {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .i3-lightbox-btn:hover {
          border-color: var(--copper-200);
          color: var(--copper-100);
          background: rgba(184,110,61,0.10);
        }
      `}</style>
    </div>
  );
}

function navButtonStyle(side: "left" | "right"): CSSProperties {
  return {
    position: "absolute",
    top: "50%",
    [side]: 10,
    transform: "translateY(-50%)",
    width: 36,
    height: 36,
    borderRadius: "50%",
    background: "var(--neutral-900)",
    border: "1px solid var(--copper-700)",
    color: "var(--copper-100)",
    fontSize: 26,
    fontFamily: "var(--mono)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 1,
    paddingBottom: 4,
    zIndex: 1,
  } as CSSProperties;
}
