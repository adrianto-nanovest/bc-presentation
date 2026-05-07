# Exchanger News Alerting System — n8n Workflow Research

**Date**: May 7, 2026  
**Source**: `/Users/macbook/Projects/_nanovest_bitbucket/n8n-projects/exchanger-news-alerting-system`

---

## 1. What the Workflow Does

Monitors cryptocurrency exchange (Binance, OKX, Tokocrypto, BitMart, Indodax) and stock broker (Alpaca) announcements via RSS feeds, applies AI-powered classification to filter for operational relevance, and routes alerts to Opsgenie teams based on provider group—ensuring operations teams only receive critical infrastructure updates, not trading product listings.

---

## 2. Trigger

**Continuous polling via scheduled cron**: Executes every **1 hour** (configurable via `scheduler_period_hours` in Main Config Data Table). Timestamp is fixed at workflow execution, not per-feed.

---

## 3. Pipeline / Sub-Workflows (Step-by-Step)

### Phase 1: Configuration & Data Loading
1. **Schedule Trigger** — Runs every 1 hour
2. **Main Config Loader** — Fetches config table (rsshub_url, opsgenie keys/responders, slack channel)
3. **Feed Sources Loader** — Fetches feed sources table (provider, group, rss_source, rss_url, category)
4. **RSS URL Builder** — Constructs full feed URLs (rsshub base + route for RSSHub; direct URL for native)

### Phase 2: RSS Fetching Loop (Batched & Rate-Limited)
5. **Split In Batches** — Rate-limits RSS fetching to batch size 2 per iteration
6. **RSS Feed Reader** — Fetches feed content (continueErrorOutput enabled for failure tracking)
7. **Source Metadata Attachment** — Enriches items with provider, group, category; detects empty feeds
8. **Error Collector** — Captures failed fetch attempts (HTTP errors, timeouts, Cloudflare blocks)
9. **Wait 1 Second** — Rate-limiting delay between batches
   - *Loop accumulates*: All items (success + errors) flow back to Split In Batches via Wait node. When complete, "done" branch outputs all accumulated items to Check RSS Errors.

### Phase 3: Error Detection & Slack Notification
10. **Check RSS Errors** — Separates successful items from fetch errors and empty feeds
11. **Has RSS Errors?** (IF gate) — Branches based on error count
    - **TRUE**: Construct Slack RSS Alert → Send Slack RSS Alert (Block Kit formatted)
    - **FALSE**: Skip to next phase

### Phase 4: Filtering & Deduplication
12. **Time Filter** — Retains only items published in last N hours (default 1h in production, 24h for testing)
13. **Pre-AI Deduplication** (Layer 1 & 2)
    - Layer 1: Content hash (MD5) matching
    - Layer 2: Fuzzy title matching (Levenshtein distance, 0.85 threshold)
    - Normalizes: removes dates, exchange names, prefixes before comparison
14. **Has Unique Items?** (IF gate) — Branches based on deduplicated item count

### Phase 5: AI Classification (Batch Processing)
15. **Batch Aggregator** — Bundles all items into single indexed prompt; sanitizes for injection; converts dates to GMT+7
16. **AI Agent** (Gemini) — Single LLM call classifying all items as JSON array
17. **Parse Batch Response** — Splits array back to individual items; merges AI results with original data; handles AI-detected duplicates (Layer 3)

### Phase 6: Alert Filtering & Building
18. **Is Relevant?** (IF gate) — Filters to `is_relevant: true` items only
19. **Opsgenie Alert Builder** — Constructs alert payload per item:
    - Per-group routing (crypto/stocks/custom groups)
    - Resolves opsgenie_api_key_{group} and opsgenie_responder_name_{group}
    - Plain text formatting (works on Opsgenie + Slack)
    - Generates alias hash for Opsgenie deduplication
    - Converts timestamps to GMT+7

### Phase 7: Alert Delivery (Rate-Limited)
20. **Split Alert Batches** — Rate-limits alert creation to batch size 5
21. **Create Opsgenie Alert** — HTTP POST to Opsgenie API with auth header
22. **Wait Between Alerts (1s)** — Rate-limiting delay between batches

---

## 4. AI Agent Usage — All LLM Calls Use Google Gemini

### Single Gemini 2.5 Pro Call (Batch Processing)

**Node**: AI Agent  
**Model**: `models/gemini-2.5-pro` (temperature 0.1 — low variance)  
**Trigger**: Once, after deduplication, for all items in batch

#### What Gemini Does:
1. **Classifies each announcement** into categories: `maintenance`, `api-change`, `security`, `deposit-withdrawal`, `not-relevant`
2. **Assigns priority levels**: P1 (critical/immediate), P2 (within 24h), P3 (within 1 week), P4 (low), P5 (informational)
3. **Detects semantic duplicates** (same announcement from multiple feeds) — sets `duplicate_of` field
4. **Generates summaries** (1–2 sentences, ensuring GMT+7 timezone if times mentioned)
5. **Outputs JSON array** with classifications for all items

#### Prompt Constraints:
- **Relevant categories**: maintenance, api-change, security, deposit-withdrawal
- **Filtered out**: listing announcements, delistings, trading competitions, airdrops, marketing, VIP upgrades
- **Critical rule**: "api-change" means API endpoint/auth/rate limit changes—NOT new trading products that happen to be API-accessible
- **Content truncation**: Max 500 chars per item, max 2000 chars total for title/snippet

#### Response Format:
```json
[
  {
    "index": 0,
    "is_relevant": true,
    "category": "api-change",
    "priority": "P3",
    "summary": "Brief summary with GMT+7 times",
    "duplicate_of": null
  },
  {
    "index": 1,
    "is_relevant": false,
    "category": "not-relevant",
    "priority": "P5",
    "summary": "Listing announcement",
    "duplicate_of": null
  }
]
```

---

## 5. Data Sources — News & Exchange Feeds

### Feed Consumption:

**RSSHub-based feeds** (via custom Nanovest RSSHub fork):
- **Binance**: Announcement API (RSSHub `/binance/announcement`)
- **OKX**: HTML scraping with ofetch (RSSHub `/okx/announcements`)
- **Tokocrypto**: real-browser (Cloudflare-protected) (RSSHub `/tokocrypto/announcement`)
- **BitMart**: real-browser (Cloudflare-protected) (RSSHub `/bitmart/announcement`)

**Native RSS feeds**:
- **Indodax**: Native blog RSS (`https://blog.indodax.com/feed`)
- **Alpaca**: Native status/announcements RSS

### Feed Categories:
- `api`: API-specific announcements
- `maintenance`: System maintenance notices
- `announcements`: General exchange announcements

### Infrastructure:
- **RSSHub instance** expected at `http://localhost:1200` (configurable)
- **Fallback for blocked sites**: real-browser route (Puppeteer) bypasses Cloudflare

---

## 6. Tools & Integrations — Output Channels

### Opsgenie Integration:
- **API endpoint**: Configurable, defaults to `https://api.opsgenie.com`
- **Authentication**: Per-group API keys (`opsgenie_api_key_default`, `opsgenie_api_key_crypto`, `opsgenie_api_key_stocks`)
- **Routing**: Responders are team-based (per-group responder names)
- **Deduplication**: Opsgenie alias-based (prevents duplicate alerts if same announcement creates alert twice)

### Slack Integration:
- **Channel**: Configurable (`slack_rss_alert_channel_id`)
- **Trigger**: Only when RSS feeds fail (fetch errors, empty feeds)
- **Format**: Block Kit (rich formatting, clickable links)
- **Bot**: Slack Nano AI Bot Access Token (chat:write scope)

### HTTP Request (No Custom SDK):
- Standard n8n HTTP node for Opsgenie POST requests
- Headers: `Authorization: GenieKey {api_key}`, `Content-Type: application/json`

---

## 7. Anomaly Detection Logic

### Three-Layer Deduplication (Hybrid Rule + AI):

#### Layer 1: Pre-AI Content Matching (Rule-Based)
- **Content hash**: MD5 of normalized contentSnippet (first 200 chars, whitespace collapsed)
- **Title fuzzy matching**: Levenshtein distance on normalized titles (85% similarity threshold)
- **Normalization**: Removes dates, exchange names, prefixes; lowercases; strips punctuation

#### Layer 2: AI Semantic Detection (AI-Based)
- Gemini identifies conceptually duplicate items (same announcement from multiple feed sources)
- Sets `duplicate_of: <first_index>` in JSON response
- Parse Batch Response filters out flagged duplicates before alert creation

#### Layer 3: Opsgenie Alias Deduplication (Rule-Based)
- Alias format: `{provider}-{category}-{MD5_hash(title+date)}`
- Opsgenie won't create alert if same alias already exists in system

### Operational Relevance Detection (AI-Based Rules):

**Relevant** (triggers alert):
- API changes, deprecations, rate limit changes
- Scheduled maintenance affecting operations
- Deposit/withdrawal suspensions
- Security incidents
- Network/blockchain upgrades

**Not Relevant** (filtered):
- Trading product listings/delistings
- Trading competitions, airdrops
- Marketing campaigns
- General news

---

## 8. Visual Topology — Node Graph for Animation

```
┌─────────────────────────────────────────────────────────────────┐
│                    CONFIGURATION PHASE                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Schedule Trigger (1h) ──> Main Config Loader ──> Feed Sources   │
│                                                      Loader       │
│                                    │                              │
│                                    └──> RSS URL Builder           │
│                                                      │             │
│                                                      ▼             │
└─────────────────────────────────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                 RSS FETCHING LOOP (Batched)                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Split In Batches ──> RSS Feed Reader                            │
│       ▲                   /  \                                    │
│       │          [Success]  [Error]                              │
│       │              /          \                                │
│    Wait 1s ◄─── Source Meta   Error Collector                    │
│       │         Attachment           │                           │
│       │              \               /                           │
│       │               └─────┬────────┘                           │
│       │                     │                                    │
│       └─────────────────────┴─ [Loop continues until done]      │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
                                       │
                     [Split In Batches "done" branch]
                                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                  ERROR DETECTION & NOTIFICATION                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Check RSS Errors ──> Has RSS Errors? (IF)                      │
│                           /        \                            │
│                        [TRUE]    [FALSE]                        │
│                          /          \                           │
│              Construct Slack ──> Send Slack Alert               │
│              RSS Alert      │                                    │
│                             └──────┐                            │
│                                    │                            │
│                                    ▼                            │
└─────────────────────────────────────────────────────────────────┘
                                       │
┌─────────────────────────────────────────────────────────────────┐
│            FILTERING & DEDUPLICATION PHASES                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Time Filter ──> Pre-AI Deduplication ──> Has Unique Items? (IF)│
│  (last N hours)  (hash + fuzzy match)    /                      │
│                                       [ITEMS]                    │
│                                          │                      │
│                                          ▼                      │
└─────────────────────────────────────────────────────────────────┘
                                       │
┌─────────────────────────────────────────────────────────────────┐
│              AI BATCH CLASSIFICATION PHASE                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Batch Aggregator ──> AI Agent (Gemini 2.5 Pro)                 │
│  (single prompt    (1 LLM call for all items)                   │
│   for all items)                   │                            │
│                                    ▼                            │
│                          Parse Batch Response                    │
│                          (split array back,                      │
│                           merge with original)                   │
│                                    │                            │
│                                    ▼                            │
└─────────────────────────────────────────────────────────────────┘
                                       │
┌─────────────────────────────────────────────────────────────────┐
│              ALERT FILTERING & BUILDING PHASE                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Is Relevant? (IF) ──> Opsgenie Alert Builder                   │
│  [TRUE branch]      (per-group routing, alias dedup)            │
│                                    │                            │
│                                    ▼                            │
│                     Split Alert Batches (batch size 5)           │
│                                    │                            │
│                                    ▼                            │
│                   Create Opsgenie Alert (HTTP POST)             │
│                                    │                            │
│                              Wait 1 Second                       │
│                                    │                            │
│                           [Loop until done]                     │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 9. Notable Features

### A. Optimization: Single AI Call for All Items
- **Traditional approach**: N items = N Gemini calls (expensive, slow)
- **This workflow**: 1 Gemini call classifies all items simultaneously
- **Savings**: Token usage ~20–30% lower, latency reduced

### B. Multi-Output Channel Architecture
- **Primary output**: Opsgenie alerts (per-group routing)
- **Secondary output**: Slack RSS failure notifications (failures only)
- Can be extended with email, webhook, or other channels

### C. Three-Layer Deduplication
- Pre-AI (hash + fuzzy) — avoids wasting LLM tokens on obvious duplicates
- AI semantic detection — catches paraphrased duplicates
- Opsgenie alias-based — final safety net

### D. GMT+7 Timezone Conversion
- All dates converted to Jakarta timezone (GMT+7) in summaries and alerts
- Ensures operations teams see times in local timezone

### E. Real-Browser Cloudflare Bypass
- Tokocrypto and BitMart use `real-browser` route (Puppeteer)
- Automatically bypasses Cloudflare protection

### F. Per-Group Opsgenie Routing
- Teams organized by provider group (crypto, stocks, custom)
- Each group has own API key and responder team
- Extensible: add new groups to config without code changes

### G. Content Sanitization for Prompt Injection
- Truncates to max 2000 chars per batch
- Strips HTML-like tags, redacts prompt injection patterns
- Preserves data integrity

---

## 10. Animation Cues

### Key Orchestration Points for Visualization:

1. **Sequential Initialization** (visual: arrows flowing left-to-right):
   - Schedule → Config → Feeds → URL Builder
   - Build anticipation: "loading configuration"

2. **Loop Animation** (visual: circular flow with accumulation):
   - RSS Feed Reader loops through batches
   - Show "wait" delay between iterations
   - Accumulate items on each pass
   - End condition: "done" branch exits loop

3. **Error Branch** (visual: conditional branching):
   - Has RSS Errors? splits to two paths
   - Error path → Slack notification (show message delivery)
   - Success path → continue to filtering

4. **Batch Processing Moment** (visual: highlight/pulse):
   - Deduplication reduces item count (show "❌ duplicate" markers fading)
   - Batch Aggregator bundles items into single prompt
   - **AI Agent executes**: Show single Gemini icon/badge (emphasize "1 call")
   - Parse Response explodes array back to items (show item count change)

5. **Per-Group Routing** (visual: color-coded paths):
   - Alert Builder resolves group for each item (show crypto/stocks/custom badges)
   - Route to appropriate Opsgenie responder team
   - Use color coding to distinguish groups

6. **Rate Limiting** (visual: temporal flow):
   - "Wait 1 Second" and "Wait Between Alerts" show clock/timer ticking
   - Emphasize "controlled delivery" vs. "burst"

7. **Final Aggregation** (visual: alerts flowing to endpoints):
   - Alerts leave workflow → Opsgenie (show team notifications)
   - Errors → Slack (show Slack channel update)
   - Use animated arrows or particle effects for delivery

### Suggested Animation Sequence:
1. Config loads (data table icons fill)
2. Loop spins through feeds (batches accumulate on screen)
3. Error check branches (conditional visual)
4. Dedup removes duplicates (items fade/disappear)
5. Batch prompt builds (text scrolls)
6. Gemini processes (LLM icon shines, 1 call badge)
7. Results parse (array expands back)
8. Routing branches by group (color-coded)
9. Alerts deliver (arrows flow to Opsgenie/Slack)

---

## References

- README: `/Users/macbook/Projects/_nanovest_bitbucket/n8n-projects/exchanger-news-alerting-system/README.md`
- Workflow JSON: `/Users/macbook/Projects/_nanovest_bitbucket/n8n-projects/exchanger-news-alerting-system/src/exchanger-news-alerting-system.json`
- RSSHub fork: https://bitbucket.org/nano-vest/rsshub
- Opsgenie API: https://docs.opsgenie.com/docs/api-overview
- Gemini API: https://ai.google.dev/docs

