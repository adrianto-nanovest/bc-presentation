import { useEffect } from "react";

interface VideoOverlayProps {
  open: boolean;
  onClose: () => void;
  videoSrc: string;   // e.g. "/videos/Claude Cowork - Schedules.mp4"
  caption: string;    // e.g. "Claude Cowork · Schedules"
}

export function VideoOverlay({ open, onClose, videoSrc, caption }: VideoOverlayProps) {
  // Esc key handling
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      data-no-advance
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(0, 0, 0, 0.85)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Close video"
        style={{
          position: "absolute",
          top: 24,
          right: 24,
          background: "transparent",
          border: "none",
          cursor: "pointer",
          padding: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 200ms var(--ease)",
        }}
        onMouseEnter={(e) => {
          const svg = e.currentTarget.querySelector("svg");
          if (svg) svg.style.stroke = "var(--copper-100)";
        }}
        onMouseLeave={(e) => {
          const svg = e.currentTarget.querySelector("svg");
          if (svg) svg.style.stroke = "var(--copper-300)";
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--copper-300)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ transition: "stroke 200ms var(--ease)" }}
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Video - stop propagation to prevent backdrop click from closing */}
      <video
        controls
        autoPlay
        src={videoSrc}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "85vw",
          maxWidth: "1090px",
          maxHeight: "80vh",
          transition: "opacity 200ms var(--ease)",
        }}
      />

      {/* Caption */}
      <div
        style={{
          position: "absolute",
          bottom: 24,
          right: 32,
          fontFamily: "var(--mono)",
          fontSize: 11,
          letterSpacing: "0.18em",
          color: "var(--copper-300)",
          textTransform: "uppercase",
        }}
      >
        {caption}
      </div>
    </div>
  );
}
