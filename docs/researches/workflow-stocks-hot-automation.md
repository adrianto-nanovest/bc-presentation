# Stocks Hot Automation Workflow — Research Summary

## Overview
The **Stocks Hot Automation** workflow is a scheduled, AI-powered market intelligence pipeline that monitors financial news, filters for stock market relevance, extracts ticker impact signals, and delivers daily "hot stocks" rankings to a Slack channel.

---

## 1. What It Does
**Single Sentence:** Ingests 50–200 daily financial news articles from 10 RSS sources, filters them for market relevance using Gemini Pro, scrapes full article content, analyzes ticker mentions and sentiment using Gemini Flash and Pro, ranks the top 10 affected stocks by AI-derived impact score, and delivers a formatted intelligence brief to Slack daily at 11 AM Jakarta time.

---

## 2. Trigger
- **Type:** Scheduled, recurring
- **Frequency:** Daily at 11:00 AM Jakarta time (GMT+7)
- **Cron Expression:** `0 11 * * *`
- **Behavior:** Automatically fires every day without manual intervention

---

## 3. Pipeline / Sub-Workflows

### Phase 1: Data Collection (RSS Aggregation)
1. **Generate Today's Sheet Name** — Generates daily Google Sheet name with date stamp
2. **Search for Today's Sheet** → Check if sheet already exists in Google Drive
3. **Copy Template Sheet** — Creates daily sheet from template with 6 predefined tabs
4. **Prepare RSS Feed URLs** — Sets up 10 financial news sources
5. **Split RSS Feeds In Batches** — Batches feeds to manage API load
6. **RSS Read** — Fetches raw articles from feeds (estimated 50–200 items)
7. **Add Source Metadata** — Tags each article with source name
8. **Normalize RSS Fields** — Standardizes title, description, URL, publish date
9. **Filter Last 24 Hours** — Removes articles older than 24 hours
10. **Remove Duplicates** — Deduplicates by URL/title hash
11. **Store to raw_news Sheet** — Logs all collected items to Google Sheets tab

### Phase 2: AI Filtering (Relevance Classification)
12. **Build Filtering Prompt** — Constructs security-hardened prompt for Gemini Pro
13. **Gemini Model - Filtering** (Gemini Pro) — LLM classifies articles as market-relevant or not
14. **Parse Filter Results** — Extracts JSON relevance decisions
15. **Store to filtered_news Sheet** — Saves 20–50 filtered items

### Phase 3: Content Scraping (Full Article Extraction)
16. **Prepare Content for Analysis** — Sets up batch scraping parameters
17. **Batch Scraping Control** — Iterates over filtered articles
18. **Scrape Article Content (Crawl4AI)** — HTTP POST to self-hosted Crawl4AI endpoint, extracts markdown
19. **Check Scraping Success** — Tests if scraping returned content
20. **Use Description Fallback** — Falls back to RSS description on scraping failure

### Phase 4: News Analysis (Ticker Extraction & Sentiment)
21. **Build Analysis Prompt** — Prepares sanitized prompt with article content
22. **Gemini Model - News Analysis** (Gemini Flash) — Extracts ticker symbols and impact scores
23. **Parse Analysis Results** — Transforms JSON output, extracts tickers with scores/outlook
24. **Load Valid Tickers List** — Validates extracted tickers against master list from Google Sheets
25. **Filter Valid Tickers** — Removes invalid/OTC symbols
26. **Merge Tickers with Analysis** — Combines ticker mentions across all articles

### Phase 5: Holistic Ticker Analysis (V4 AI Agent)
27. **Build Ticker Analysis Prompt** — Aggregates all news for each ticker into structured data
28. **Gemini Model - Ticker Analysis** (Gemini Pro) — **AI agent performs holistic analysis** of all news per ticker
29. **Parse Ticker Analysis Results** — Extracts impact scores, outlook, and synthesized driver summary
30. **Store to ticker_analysis Sheet** — Logs all identified tickers with AI analysis

### Phase 6: Ranking & Brief Generation
31. **Rank Tickers by Impact** — Sorts by impact_score (descending), then by news count
32. **Select Top 10** — Takes top 10 ranked tickers
33. **Format Top 10 Data** — Structures data for Slack table (rank, ticker, company, impact, outlook, key driver)
34. **Store to hot_now_top10 Sheet** — Saves ranked output

35. **Build Brief Prompt** — Constructs prompt with top 10 data and stats
36. **Gemini Model - Brief Generation** (Gemini Flash) — Generates 2–3 sentence executive news summary
37. **AI Agent - Generate Brief** — LLM synthesizes summary
38. **Format Slack Message** — Builds formatted Slack markdown table and connections list

### Phase 7: Output & Delivery
39. **Store to executive_brief Sheet** — Saves AI-generated summary
40. **Prepare News Connections** — Maps each top 10 ticker to its key drivers and related URLs
41. **Store to news_connections Sheet** — Logs ticker→news relationships
42. **Post to Slack** — Delivers formatted message to #stocks-trending-n8n channel

---

## 4. AI Agent Usage

All LLM interactions use **Gemini** models. Four distinct Gemini calls, each with a specialized role:

| Step | Model | Purpose |
|------|-------|---------|
| **Filter Relevance** | Gemini Pro (2.5) | Binary classification: Is each article market-relevant? Evaluates market impact scope, affected sectors, injection detection. |
| **Extract Tickers** | Gemini Flash | Ticker mention detection: Given full article content, identify all company stock tickers, estimate per-ticker impact score (1–100), classify outlook (Bullish/Bearish/Neutral). |
| **Holistic Ticker Analysis** | Gemini Pro (2.5) | **V4 Enhancement**: Analyzes ALL news articles for a single ticker holistically. Synthesizes impact score (not just max value), determines consensus outlook, generates key driver summary (2–3 sentences synthesizing themes). |
| **Generate Brief** | Gemini Flash | Executive summary: Synthesizes top 10 tickers into 2–3 sentence market brief capturing primary catalysts and sentiment. |

---

## 5. Data Sources

### Primary News Sources (10 RSS Feeds)
1. **Investing.com** — investing.com/rss/news_25.rss
2. **CNBC** — search.cnbc.com/rs/search/...
3. **Seeking Alpha** — seekingalpha.com/feed.xml
4. **Nasdaq** — nasdaq.com/feed/rssoutbound
5. **Financial Times** — ft.com/rss/companies
6. **Yahoo Finance** — finance.yahoo.com/news/rssindex
7. **MarketWatch** — feeds.marketwatch.com/...
8. **AlphaStreet** — news.alphastreet.com/feed
9. **The Economist** — economist.com/business/rss.xml
10. **Forbes** — forbes.com/business/feed

### Reference Data
- **Ticker Master List** — Google Sheets: `1YFnQQPYF0RJwXpfz7ykR8ZLpZ36KhpZYouqKhvm9zyE` (validates ticker symbols)

---

## 6. Tools & Integrations

### External Services (Output)
| Service | Purpose | Endpoint/ID |
|---------|---------|------------|
| **Google Sheets API** | Data storage (6 daily tabs: raw_news, filtered_news, ticker_analysis, hot_now_top10, executive_brief, news_connections) | Credential ID: `Npbsm0tq5D40jeBN` |
| **Slack API** | Daily intelligence brief delivery | Channel: #stocks-trending-n8n (C09P0AN1GDB) |
| **Crawl4AI** (Self-Hosted) | Article content scraping (internal VPN endpoint) | `https://crawl4ai.nanovest.app/md` |
| **Google Gemini API** | AI analysis (Pro & Flash models) | Credential ID: `dGh4FGJ2dAL2i5Cp` |

### Data Flow Destinations
- **Google Drive Folder** (Output folder ID: `1gxROTWdsXtw2KJCKrSPhVzU8QUQ1NHy7`) — Houses all daily sheets
- **Slack Channel** (#stocks-trending-n8n) — Formatted table of top 10 + news brief

---

## 7. Decision Logic

### What Makes a Stock "Hot"?

**Impact Score Methodology (V4):**
- **Scoring Scale:** 1–100 (numerical)
- **Threshold for Inclusion:** impact_score ≥ 60
- **Holistic Calculation:** AI evaluates:
  - News volume (how many relevant articles mention the ticker)
  - Source credibility signals (which news sources reported it)
  - Market relevance and consistency (are messages aligned or contradictory?)
  - Overall significance (not just the highest individual article score)

**Scoring Guidelines (from Gemini prompts):**
- **High (80–100):** Major company announcements, regulatory changes, earnings surprises, significant catalysts
- **Medium (50–79):** Industry trends affecting the company, analyst coverage, moderate news flow
- **Low (20–49):** Routine mentions, minimal direct impact

**Outlook Determination:**
- **Bullish:** Majority of news is positive; growth catalysts present
- **Bearish:** Majority of news is negative; headwinds identified
- **Neutral:** Genuine uncertainty or balanced opposing forces (not a cop-out; valid for pending decisions like FDA approval)

**Ranking Criteria:**
- Primary sort: impact_score (descending)
- Tie-breaker: news_count (descending)
- Output: Top 10 only

---

## 8. Visual Topology

```
TRIGGER (Daily 11 AM JKT)
    │
    ├─► [Sheet Generation] → Create Today's Sheet
    │
    └─► [RSS Collection] ──┬─► Fetch 10 RSS Feeds (50–200 items)
                           ├─► Normalize Fields
                           ├─► Filter 24h
                           └─► Deduplicate → Store raw_news
                               │
    ┌──────────────────────────┘
    │
    ├─► [AI Filtering] ────────────┬─► Gemini Pro: Relevance Filter
                                    ├─► Parse Results
                                    └─► Store filtered_news (20–50 items)
                                        │
    ┌───────────────────────────────┘
    │
    ├─► [Batch Scraping] ──────────┬─► For each article:
                                    ├─► Crawl4AI: Extract markdown
                                    ├─► Fallback: Use RSS description
                                    └─► Prepare content → Store scraped_content
                                        │
    ┌───────────────────────────────┘
    │
    ├─► [News Analysis] ──────────┬─► Gemini Flash: Extract tickers + scores
                                   ├─► Parse results
                                   ├─► Validate tickers
                                   └─► Merge ticker mentions → Aggregate by ticker
                                       │
    ┌──────────────────────────────┘
    │
    ├─► [Ticker Analysis] ───────┬─► Gemini Pro: Holistic analysis per ticker
                                   │   - Synthesize impact score
                                   │   - Determine consensus outlook
                                   │   - Generate key driver summary
                                   ├─► Parse results
                                   └─► Store ticker_analysis
                                       │
    ┌──────────────────────────────┘
    │
    ├─► [Ranking] ───────────────┬─► Rank by impact_score
                                   ├─► Select Top 10
                                   ├─► Format for display
                                   └─► Store hot_now_top10
                                       │
    ┌──────────────────────────────┘
    │
    ├─► [Brief Generation] ──────┬─► Gemini Flash: Synthesize 2–3 sentence summary
                                   ├─► Format Slack message with table
                                   ├─► Build news connections list
                                   └─► Store executive_brief + news_connections
                                       │
    ┌──────────────────────────────┘
    │
    └─► [Delivery] ──────────────┬─► Google Sheets: Store all 6 tabs
                                   └─► Slack: Post formatted intelligence brief
```

---

## 9. Notable Features

### V4 Enhancement: Holistic AI Ticker Analysis
**Problem (V3):** Code-based aggregation inflated impact by taking the maximum score from individual articles, ignored article importance weights, and concatenated article reasoning redundantly.

**Solution (V4):** Introduced AI Agent node that evaluates ALL news per ticker holistically:
- Impact score reflects overall significance, not outlier peaks
- Outlook considers article weights, not simple voting
- Summary synthesizes key themes, eliminating redundancy

### Security Features
- **Prompt Injection Detection:** All user-provided text (titles, descriptions, article content) is scanned for injection patterns (e.g., "ignore previous instructions", "system:", "developer mode")
- **Text Sanitization:** HTML tags, data URIs, event handlers stripped from article text
- **Token Limits:** Input capped at 50K characters to prevent token exhaustion attacks
- **Suspicious Content Flagging:** Articles with detected injection attempts are logged and redacted

### Scraping Resilience
- **Primary Method:** Crawl4AI self-hosted endpoint (VPN-protected, $0/month unlimited)
- **Fallback:** If scraping fails (timeout, network error), uses RSS description field automatically
- **Success Rate Target:** >80% full content scraping

### Performance
| Operation | Duration |
|-----------|----------|
| RSS collection | 2–3 min |
| AI filtering | 1–2 min |
| Batch scraping | 5–10 min |
| News analysis | 3–5 min |
| Ticker analysis (V4) | 1–2 min |
| Brief generation | 30 sec |
| **Total end-to-end** | 15–20 min |

### API Usage
| Model | Est. Tokens per Run |
|-------|-------------------|
| Gemini Pro (filtering) | ~15K |
| Gemini Flash (news analysis) | ~100K |
| Gemini Pro (ticker analysis) | ~20K |
| Gemini Flash (brief) | ~10K |
| **Monthly estimate** | ~4.5M tokens |

---

## 10. Animation Cues

### Key Visual Moments for Harness Simulation

1. **Trigger Entry** — Clock ticks to 11 AM; schedule node fires
2. **Sheet Creation** — Generate name → Search → Copy template; 3 quick nodes in sequence
3. **RSS Fan-Out** — Prepare URLs → Split batches → 10 parallel RSS fetches, each returning items; merge into ~100–200 items flowing downward
4. **AI Filtering Gate** — 100–200 items → Gemini Pro node; filtered stream emerges narrower (20–50 items)
5. **Batch Scraping Loop** — Filtered items loop into batch node; each iteration fires Crawl4AI request; success/fallback branch; items re-emerge with full content
6. **Ticker Extraction** — Scraped content → Gemini Flash; output is structured ticker list with scores
7. **Holistic Aggregation** — Tickers grouped by symbol; all news per ticker flows into Ticker Analysis node (V4 centerpiece); a single Gemini Pro call synthesizes holistic insight per ticker
8. **Top 10 Ranking** — All tickers → Rank → Select Top 10; a funnel narrowing to 10 items
9. **Brief Synthesis** — Top 10 + stats → Gemini Flash; single text output (executive summary)
10. **Dual Delivery** — Formatted output branches: one to Google Sheets (6 tabs written in parallel), one to Slack (formatted message posted)
11. **Completion** — All 6 sheet tabs populated; Slack message visible in channel; workflow concludes

### Node Grouping for Visual Clarity
- **Blue: Data Ingestion** (RSS, Sheet setup)
- **Teal: AI Processing** (Gemini nodes)
- **Orange: Data Transformation** (Parse, format, rank, filter)
- **Green: Storage** (Google Sheets writes)
- **Red: External Delivery** (Slack post)

### Animation Timing Suggestions
- RSS fetch and filtering: 2–3 seconds (fast parallel streams)
- Scraping loop: 4–5 seconds (iterative, batch-by-batch)
- AI analysis nodes: 1–2 seconds each (logical processing pause)
- Ranking/top 10 selection: 1 second (crisp funnel narrowing)
- Final delivery: 1 second (simultaneous Sheets + Slack)

### Data Cardinality (For Visual Emphasis)
- Input: 50–200 articles (flow width)
- After filtering: 20–50 articles (narrower flow)
- After scraping + analysis: 5–30 tickers (thin flow)
- Output: 10 tickers ranked (final focused output)

---

## Appendix: Workflow Metadata

| Property | Value |
|----------|-------|
| **Workflow Name** | Stocks Hot Automation V4 - Crawl4AI |
| **n8n URL** | n8n.prd.nanovest.app |
| **Schedule** | Daily 11 AM JKT (0 11 * * *) |
| **Total Nodes** | 45+ |
| **Gemini Calls** | 4 (Pro filtering, Flash news, Pro ticker analysis, Flash brief) |
| **External APIs** | Google Sheets, Slack, Crawl4AI |
| **Execution Time** | 15–20 minutes |
| **Last Updated** | 2025-12-19 |
| **Status** | Operational |

