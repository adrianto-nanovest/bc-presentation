import { motion } from "framer-motion";

const FEEDS = [
  "Investing.com", "CNBC", "Seeking Alpha", "Nasdaq", "FT",
  "Yahoo Finance", "MarketWatch", "AlphaStreet", "The Economist", "Forbes",
];
const AGENTS = ["Filter Relevance", "News Analyzer", "Ticker Analyzer", "Summarizer"];

export function StocksIntel() {
  return (
    <div className="h-full w-full p-6">
      <svg viewBox="0 0 1100 540" className="h-full w-full">
        <defs>
          <marker id="si-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#b86e3d" />
          </marker>
        </defs>
        {/* Clock pulse — 11 AM trigger (top-left) */}
        <g>
          <motion.circle
            cx="60" cy="40" r="22"
            fill="none" stroke="#b86e3d" strokeWidth="1.5"
            animate={{ opacity: [0.4, 1, 0.4], r: [22, 26, 22] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <text x="60" y="46" textAnchor="middle" fill="#f5f5f5" fontFamily="JetBrains Mono" fontSize="12">11 AM</text>
          <text x="60" y="86" textAnchor="middle" fill="#a3a3a3" fontFamily="JetBrains Mono" fontSize="10">daily</text>
        </g>
        {/* 10 RSS feeds — vertical column on the left */}
        {FEEDS.map((feed, i) => (
          <g key={feed}>
            <rect x="160" y={20 + i * 48} width="140" height="38" fill="none" stroke="#7a4626" strokeWidth="1" />
            <text x="230" y={43 + i * 48} textAnchor="middle" fill="#f5f5f5" fontFamily="Source Serif 4" fontSize="13">{feed}</text>
            <motion.path
              d={`M 300 ${39 + i * 48} L 420 270`}
              stroke="#7a4626" strokeWidth="0.8" fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 1, 1, 0] }}
              transition={{ duration: 8, repeat: Infinity, delay: i * 0.15, times: [0, 0.4, 0.85, 1] }}
            />
          </g>
        ))}
        {/* Crawl4AI scrape node */}
        <rect x="380" y="246" width="120" height="48" fill="none" stroke="#b86e3d" strokeWidth="1.5" />
        <text x="440" y="270" textAnchor="middle" fill="#f5f5f5" fontFamily="Source Serif 4" fontSize="14">Crawl4AI</text>
        <text x="440" y="286" textAnchor="middle" fill="#a3a3a3" fontFamily="Source Serif 4" fontStyle="italic" fontSize="11">scrape</text>
        {/* Gemini agent chain — 4 agents horizontal */}
        {AGENTS.map((agent, i) => (
          <g key={agent}>
            <rect x={530 + i * 130} y="248" width="116" height="44" fill="none" stroke="#9c5a30" strokeWidth="1" />
            <text x={530 + i * 130 + 58} y="274" textAnchor="middle" fill="#f5f5f5" fontFamily="Source Serif 4" fontSize="12">{agent}</text>
            {i < AGENTS.length - 1 && (
              <motion.path
                d={`M ${530 + i * 130 + 116} 270 L ${530 + (i + 1) * 130} 270`}
                stroke="#b86e3d" strokeWidth="1.2" fill="none" markerEnd="url(#si-arrow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: [0, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: 2 + i * 0.4, repeatDelay: 5 }}
              />
            )}
          </g>
        ))}
        {/* Top 10 ranking node */}
        <rect x="990" y="248" width="100" height="48" fill="none" stroke="#b86e3d" strokeWidth="1.5" />
        <text x="1040" y="272" textAnchor="middle" fill="#f5f5f5" fontFamily="Source Serif 4" fontSize="13">Top 10</text>
        <text x="1040" y="288" textAnchor="middle" fill="#a3a3a3" fontFamily="Source Serif 4" fontStyle="italic" fontSize="11">ranked</text>
        <motion.path
          d="M 1050 296 L 1050 380 M 800 296 L 800 380"
          stroke="#7a4626" strokeWidth="1" fill="none"
        />
        {/* Outputs: Slack (auto) + Hot Now (manual) */}
        <g>
          <rect x="700" y="380" width="200" height="60" fill="none" stroke="#b86e3d" strokeWidth="1.2" />
          <text x="800" y="408" textAnchor="middle" fill="#f5f5f5" fontFamily="Source Serif 4" fontSize="14">Slack</text>
          <text x="800" y="426" textAnchor="middle" fill="#a3a3a3" fontFamily="JetBrains Mono" fontSize="11">#stocks-trending-n8n</text>
        </g>
        <g>
          <rect x="950" y="380" width="200" height="60" fill="none" stroke="#7a4626" strokeWidth="1.2" strokeDasharray="4 4" />
          <text x="1050" y="408" textAnchor="middle" fill="#f5f5f5" fontFamily="Source Serif 4" fontSize="14">Nanovest "Hot Now"</text>
          <text x="1050" y="428" textAnchor="middle" fill="#d99e6c" fontFamily="JetBrains Mono" fontStyle="italic" fontSize="11">(still manual currently)</text>
        </g>
      </svg>
    </div>
  );
}
