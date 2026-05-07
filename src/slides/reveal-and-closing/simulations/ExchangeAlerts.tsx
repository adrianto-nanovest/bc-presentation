import { motion } from "framer-motion";

const FEEDS = ["Binance", "OKX", "Tokocrypto", "BitMart", "Indodax", "Alpaca"];
const DEDUP = ["hash", "fuzzy", "AI-semantic"];

export function ExchangeAlerts() {
  return (
    <div className="h-full w-full p-6">
      <svg viewBox="0 0 1100 540" className="h-full w-full">
        <defs>
          <marker id="ea-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#b86e3d" />
          </marker>
        </defs>
        {/* Cron */}
        <motion.circle cx="60" cy="270" r="22" fill="none" stroke="#b86e3d" strokeWidth="1.5"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }} />
        <text x="60" y="275" textAnchor="middle" fill="#f5f5f5" fontFamily="JetBrains Mono" fontSize="11">hourly</text>
        {/* 6 feeds — vertical column */}
        {FEEDS.map((feed, i) => (
          <g key={feed}>
            <rect x="140" y={120 + i * 60} width="120" height="40" fill="none" stroke="#7a4626" strokeWidth="1" />
            <text x="200" y={144 + i * 60} textAnchor="middle" fill="#f5f5f5" fontFamily="Source Serif 4" fontSize="13">{feed}</text>
            <motion.path
              d={`M 260 ${140 + i * 60} L 360 270`}
              stroke="#7a4626" strokeWidth="0.8" fill="none"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 6, repeat: Infinity, delay: i * 0.2 }}
            />
          </g>
        ))}
        {/* 3-layer dedup ladder */}
        {DEDUP.map((layer, i) => (
          <g key={layer}>
            <rect x={340 + i * 130} y="250" width="110" height="40" fill="none" stroke="#9c5a30" strokeWidth="1" />
            <text x={340 + i * 130 + 55} y="274" textAnchor="middle" fill="#f5f5f5" fontFamily="Source Serif 4" fontSize="12">{layer}</text>
            {i < DEDUP.length - 1 && (
              <motion.path
                d={`M ${340 + i * 130 + 110} 270 L ${340 + (i + 1) * 130} 270`}
                stroke="#b86e3d" strokeWidth="1.2" fill="none" markerEnd="url(#ea-arrow)"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
              />
            )}
          </g>
        ))}
        {/* SINGLE Gemini batch call — drawn as a single big box with multiple items inside */}
        <rect x="730" y="200" width="200" height="140" fill="none" stroke="#b86e3d" strokeWidth="1.5" />
        <text x="830" y="226" textAnchor="middle" fill="#f5f5f5" fontFamily="Source Serif 4" fontSize="14">SINGLE Gemini call</text>
        <text x="830" y="244" textAnchor="middle" fill="#a3a3a3" fontFamily="Source Serif 4" fontStyle="italic" fontSize="11">batch inference</text>
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.rect
            key={i}
            x={750} y={258 + i * 14} width="160" height="10"
            fill="#9c5a30" opacity={0.6}
            animate={{ opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
        <motion.path d="M 690 270 L 730 270" stroke="#b86e3d" strokeWidth="1.2" fill="none" markerEnd="url(#ea-arrow)" />
        {/* 5 priority categories emerging */}
        {["P0", "P1", "P2", "P3", "INFO"].map((cat, i) => (
          <g key={cat}>
            <rect x="970" y={170 + i * 42} width="60" height="32" fill="none" stroke="#9c5a30" strokeWidth="1" />
            <text x="1000" y={190 + i * 42} textAnchor="middle" fill="#f5f5f5" fontFamily="JetBrains Mono" fontSize="12">{cat}</text>
            <motion.path
              d={`M 930 270 L 970 ${186 + i * 42}`}
              stroke="#7a4626" strokeWidth="0.8" fill="none"
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 4, repeat: Infinity, delay: i * 0.3 }}
            />
          </g>
        ))}
        {/* Opsgenie + rate-limited delivery */}
        <text x="1080" y="280" textAnchor="middle" fill="#d99e6c" fontFamily="JetBrains Mono" fontSize="12">→ Opsgenie</text>
        <text x="1080" y="300" textAnchor="middle" fill="#a3a3a3" fontFamily="Source Serif 4" fontStyle="italic" fontSize="10">rate-limited</text>
      </svg>
    </div>
  );
}
