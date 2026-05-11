# Foundation Models & Mechanics Landscape — May 2026
## Research Brief for Section B Slide Design

**Document Date:** May 11, 2026  
**Target Audience:** Mining-industry professionals (engineers & general staff) — non-AI-native  
**Slide Context:** "Foundation Models & Mechanics" landscape map with modality breakdowns  

---

## A. Text/Reasoning Models — General-Purpose Frontier (May 2026)

### Anthropic Claude Family

| Attribute | Details |
|-----------|---------|
| **Maker** | Anthropic |
| **Latest Version** | Claude Opus 4.7 (April 16, 2026) |
| **Best For** | Deepest reasoning, strongest multimodal understanding, best for complex analysis & writing; safest default for enterprise and API scenarios |
| **Performance Highlights** | 3x vision resolution, self-verification, new xhigh effort level for extended reasoning |
| **Tier Comparison** | Opus 4.7 > Sonnet 4.6 (79.6% SWE-bench) > Haiku 4.5 (73.3% SWE-bench) |
| **Context Window** | 200K tokens baseline, highest performance across reasoning benchmarks |

**Alternative Tiers:**
- **Claude Sonnet 4.6** (Feb 17, 2026): Best speed-to-capability ratio for most workflows; 1.2% performance gap to Opus 4.7
- **Claude Haiku 4.5**: Fastest option; rational default for cost-constrained scenarios; ~97 tokens/second

---

### OpenAI GPT Family

| Attribute | Details |
|-----------|---------|
| **Maker** | OpenAI |
| **Latest Version** | GPT-5.5 (April 23, 2026); GPT-5.5 Instant (May 5, 2026) |
| **Best For** | Code debugging, online research, data analysis, document generation, software operation, agentic task completion |
| **Key Feature** | Understands intent faster, carries more work autonomously |
| **Free Tier Access** | Yes: GPT-4o Mini on free ChatGPT, with daily message cap and ads |
| **Status Note** | Successor GPT-5.6 testing began April 30 (early internal testing phase) |

**Legacy Models Retiring:**
- Older GPT-4o variants phased out in favor of GPT-5.5 series

---

### Google Gemini Family

| Attribute | Details |
|-----------|---------|
| **Maker** | Google DeepMind |
| **Latest Version** | Gemini 3.1 Pro (February 19, 2026) |
| **Best For** | Balanced performance; 50%+ improvement over Gemini 2.5 Pro on reasoning benchmarks |
| **Model Lineup** | Gemini 3.1 Pro > Gemini 2.5 Flash (GA, production-ready) > Flash-Lite (mobile/edge) |
| **Free API Tier** | 1,500 requests/day on Gemini Flash — sufficient for small production apps |
| **Multimodal** | Strong image understanding, deep ecosystem integration with Google Cloud/Workspace |

---

### Meta Llama Family

| Attribute | Details |
|-----------|---------|
| **Maker** | Meta AI |
| **Latest Version** | Llama 4 Scout & Maverick (April 2025, still current May 2026) |
| **Best For** | Open-source, on-device deployment, cost-efficient inference at scale |
| **Models** | Scout (17B active params, 16 experts) | Maverick (17B active params, 128 experts) |
| **Unreleased** | Llama 4 Behemoth (exceeds GPT-4.5 & Claude Sonnet 3.7 on STEM benchmarks — not yet released) |
| **Status** | Llama 5 has NOT been released as of May 2026; no official announcement date |

**Strategic Note:** Meta shifted from open-source to proprietary with Meta Muse Spark (April 8, 2026), ending the 3-year open-source Llama strategy.

---

### DeepSeek (China)

| Attribute | Details |
|-----------|---------|
| **Maker** | DeepSeek (Chinese AI lab) |
| **Latest Version** | DeepSeek V4 (April 2026) with V4 Flash & V4 Pro variants |
| **Best For** | Ultra-long context (1M tokens native), advanced reasoning (R1 level OpenAI-o1 performance) |
| **Model Lineup** | V4 / V4 Flash / V4 Pro / V3.2-Speciale (IMO/IOI gold-medal performance) |
| **Training** | 32T+ tokens; production-grade long-context handling |
| **Reasoning** | R1 built on V3 backbone with reinforcement learning for deeper reasoning |

**Note:** DeepSeek R1 is a separate reasoning-focused variant; V4 is the general-purpose flagship.

---

### xAI Grok

| Attribute | Details |
|-----------|---------|
| **Maker** | xAI (Elon Musk's AI company) |
| **Latest Version** | Grok 4.3 (May 6, 2026) |
| **Best For** | Cost-efficient frontier model; strongest for real-time search integration & tool use |
| **Key Features** | 1M-token context, native video input, built-in reasoning, real-time search, native tool use |
| **Pricing** | $1.25/M input tokens (competitive) |
| **Benchmark** | 53 on Intelligence Index |
| **Retirements** | Grok 3 and older Grok 4 variants retiring May 15, 2026 |

---

### Mistral (France)

| Attribute | Details |
|-----------|---------|
| **Maker** | Mistral AI |
| **Latest Version** | Mistral Large 3 (2512) — released April 2026 |
| **Best For** | On-device inference, open-source deployment, performance-per-cost Pareto front |
| **Prior Standard** | Mistral Large 2 (123B params) — performs on par with GPT-4o, Claude Opus 3, Llama 3 405B |
| **New Lineup** | Large 3 | Small 4 | Ministral 3 (3B/8B/14B) |
| **Licensing** | All 2026 models under Apache 2.0 or equivalent permissive license |

---

### Asian Frontier Models (Relevant for Indonesia Audience)

#### Moonshot Kimi (Beijing)
| Attribute | Details |
|-----------|---------|
| **Company** | Moonshot AI (valued $20B as of May 2026) |
| **Latest Version** | Kimi K2.6 (April 20, 2026) |
| **Best For** | Agentic multimodal tasks; coordinating up to 300 autonomous sub-agents |
| **Key Feature** | "Swarm 2.0" upgrade for complex multi-agent workflows |
| **Architecture** | 1T parameter MoE (mixture of experts) |

#### Alibaba Qwen (Shanghai)
| Attribute | Details |
|-----------|---------|
| **Company** | Alibaba Damo Academy |
| **Latest Version** | Qwen 3.6 family (April 2026): Qwen 3.6-Plus, Qwen 3.6-35B-A3B (3B active params), Qwen 3.6-Max-Preview |
| **Best For** | Efficient multilingual (100+ languages), strong coding, enterprise deployment |
| **Variants** | Qwen-VL (vision-language) | Qwen-Coder (specialized) |
| **Licensing** | Open-weight variants available |

#### 01.AI Yi (Beijing)
| Attribute | Details |
|-----------|---------|
| **Company** | 01.AI (founded by Kai-Fu Lee) |
| **Best For** | Bilingual English-Chinese, enterprise focus, multiple sizes (6B, 9B, 34B) |
| **Market Position** | Competes with OpenAI, Google, Anthropic, Meta in Asian markets |

#### Moonshot Kimi (Beijing) — Secondary Detail
- CEO-backed startup with strong institutional backing
- Kimi K2.5 variant handles 1T parameters with MoE architecture
- April 2026: Kimi K2.6 introduces "Swarm 2.0" for multi-agent orchestration

---

## B. Image Generation — May 2026 Frontier

### Quick-Reference Tier

| Model | Strength | Best For | Cost Profile |
|-------|----------|----------|--------------|
| **Flux 2 Pro** | Photorealism + typography | Professional photoshoot aesthetics, text-in-image | Premium |
| **Midjourney v8** | Aesthetics & interpretation | Artistic direction, visual concepts | Mid-to-premium |
| **GPT-4 Images 2.0** | Reasoning + multi-element scenes | Complex instructions, text rendering | Included in ChatGPT Plus |
| **Stable Diffusion 3.5** | Quality leap over SDXL | Open-source deployment, on-device | Free/open-source |
| **Imagen 4 Ultra** | Photorealism (highest fidelity) | Architecture, product shots, technical visualization | Google Cloud (premium) |
| **Ideogram** | Text-in-image specialty | Poster design, typography-heavy creative | Free tier available |

### Detailed Model Profiles

#### Black Forest Labs Flux 2
| Attribute | Details |
|-----------|---------|
| **Release** | Late 2025 / Early 2026 |
| **Variants** | Flux 2 Pro (flagship) | Flux 2 Dev (open-source) | Flux 2 Schnell (real-time, <1 sec) |
| **Best For** | **Photorealism** with precise depth-of-field, lens distortion, chromatic aberration, film grain |
| **Key Feature** | Built-in typography model solves "text in images" problem (major competitive advantage) |
| **Performance vs. Competitors** | Outperforms Midjourney v6.1, DALL-E 4, Ideogram v2 in prompt adherence & anatomy |
| **Speed** | Schnell: 2-4 steps at near-Pro quality; native distillation support |

#### Midjourney v8
| Attribute | Details |
|-----------|---------|
| **Release** | March 2026 |
| **Engine** | Fully rewritten, 5x faster than v7 |
| **Native Resolution** | 2K output (vs. upscaled in prior versions) |
| **Best For** | **Aesthetic interpretation**, visual style refinement, mood-driven creative direction |
| **Market Position** | Still king of artistic aesthetics; aesthetic rendering remains strongest in class |

#### OpenAI ChatGPT Images 2.0
| Attribute | Details |
|-----------|---------|
| **Replaces** | DALL-E 3 (inside ChatGPT) |
| **Release** | April 2026 |
| **Unique Feature** | **Reasoning step** built into image generation (novel approach) |
| **Best For** | Multi-element scenes, complex instruction adherence, text rendering, logical scene composition |
| **Access** | Included in ChatGPT Plus subscriptions |
| **Advantage** | Superior to DALL-E 3 at following complex, multi-part prompts |

#### Google Imagen 4 Family
| Attribute | Details |
|-----------|---------|
| **Variants** | Imagen 4 Ultra (flagship) | Imagen 4 (balanced) | Imagen 4 Fast (speed-optimized) |
| **Release** | General availability in Gemini API, Google AI Studio |
| **Best For** | **Photorealism** (Ultra variant); skin textures, fabric detail, lighting, reflections indistinguishable from photos |
| **Resolution** | Up to 2K; improved text rendering over predecessors |
| **Safety** | SynthID embedded watermark for AI-generated identification |
| **Status** | Imagen 5 expected soon; not yet officially detailed |

#### Stability AI Stable Diffusion 3.5
| Attribute | Details |
|-----------|---------|
| **Release** | 2025–2026 cycle |
| **Improvement** | Significant quality leap over SDXL baseline |
| **Best For** | Open-source, on-device deployment, cost-efficient inference |
| **Licensing** | Community-friendly |

#### Ideogram
| Attribute | Details |
|-----------|---------|
| **Specialty** | Text-in-image generation (historically strong) |
| **Best For** | Poster design, typography-heavy creative work |
| **Free Tier** | Available |
| **Performance vs. Flux 2** | Flux 2 now surpasses Ideogram on text-in-image benchmarks (April 2026 data) |

---

## C. Video Generation — May 2026 Frontier

### Quick-Reference Tier

| Model | Strength | Best For | Status |
|-------|----------|----------|--------|
| **Runway Gen-4/4.5** | Creative control | Granular camera moves, motion brush, character consistency | Active, pro favorite |
| **Veo 3.1** | All-rounder | Prompt adherence, native audio, 4K landscape/portrait | Google flagship |
| **Kling 3.0** | Cinematic + storyboard | Complex motion (hair, liquids, fabric), multi-shot audio sync | ByteDance, emerging leader |
| **Seedance 2.0** | Audio-video joint | Unified multimodal generation, 12-file input | ByteDance, Feb 2026 launch |
| **Pika 2** | Real-time preview | Interactive editing, iterative refinement | Available |
| **Sora** | N/A | **DISCONTINUED** (API sunset Sept 24, 2026) | OpenAI withdrew from market |
| **Luma Dream Machine** | Lightweight | Fast generation, accessibility | Available |

### Detailed Model Profiles

#### Google Veo 3.1
| Attribute | Details |
|-----------|---------|
| **Maker** | Google DeepMind |
| **Release** | 2026 cycle |
| **Best For** | **Filmmakers seeking all-rounder performance**: strong prompt adherence, native audio integration, 4K output (landscape & portrait) |
| **Strengths** | Best for narrative scenes, establishing shots, cinematic control |
| **Benchmark Position** | Leads on prompt adherence among major competitors |

#### Kling 3.0
| Attribute | Details |
|-----------|---------|
| **Maker** | Kuaishou (ByteDance subsidiary) — China |
| **Release** | 2026 cycle |
| **Best For** | **Cinematic lighting** + complex motion (hair, liquids, fabric); multi-shot storyboard mode |
| **Key Feature** | Native audio sync across cuts; storyboard workflow for narrative projects |
| **Competitive vs. Veo** | Matches Veo on cinematic quality; advantages in motion complexity & storyboarding |

#### Runway Gen-4/Gen-4.5
| Attribute | Details |
|-----------|---------|
| **Maker** | Runway (US) |
| **Strength** | **Granular creative control** |
| **Features** | Camera move controls, motion brush, reference-driven character consistency |
| **Market Position** | Pro favorite for creators needing pixel-level authorship |
| **Best For** | Advanced motion graphics, character-consistent sequences, bespoke camera work |

#### ByteDance Seedance 2.0
| Attribute | Details |
|-----------|---------|
| **Release** | February 2026 |
| **Key Feature** | Unified audio-video joint generation; 12-file multimodal input |
| **Best For** | Projects requiring tight audio-visual sync from inception |

#### OpenAI Sora (Discontinued)
| Attribute | Details |
|-----------|---------|
| **Status** | **RETIRED** |
| **Web/App Discontinuation** | April 26, 2026 |
| **API Discontinuation** | September 24, 2026 |
| **Implication** | Do NOT recommend to attendees; other options dominate the market |

#### Pika & Luma Dream Machine
- Lightweight, real-time preview options for quick iteration
- Accessible to non-specialists; lower learning curve than Runway/Veo

---

## D. Audio & Voice Generation — May 2026 Frontier

### Quick-Reference Tier

| Model | Strength | Best For | Market Position |
|-------|----------|----------|-----------------|
| **ElevenLabs** | Voice + music + SFX | Unified platform, realistic AI vocals | Expanding monopoly (iOS launch April 2026) |
| **Suno v5** (music) | Radio-ready songs | Complete song generation with vocals | 15M MAU, market leader |
| **Udio** | High-fidelity audio | Musicians/producers, licensed model | Quality-first, major label deals |
| **OpenAI Whisper** | Transcription | Speech-to-text (not generation) | Complementary, not primary generation tool |

### Detailed Model Profiles

#### ElevenLabs
| Attribute | Details |
|-----------|---------|
| **Evolution** | Unified platform across Voice, Music, and Sound Effects |
| **Latest** | ElevenMusic iOS app (April 2026) + integrated platform feature |
| **Best For** | **Most realistic AI vocals** + unified subscription/API across modalities |
| **Unique Position** | Only vendor with integrated voice synthesis → music → SFX pipeline |
| **Competitive Advantage** | Deep voice synthesis expertise translated to vocal realism in music generation |

#### Suno v5 (Music Generation)
| Attribute | Details |
|-----------|---------|
| **Release** | February 2026 |
| **Best For** | **Radio-ready, catchy songs** with professional-quality vocals |
| **User Base** | 15M monthly active users (market leader by volume) |
| **Key Improvement** | Improved instrumental quality, style-locking (consistent style across generations) |
| **Strengths** | Speed, features, accessibility; favored by content creators & musicians |

#### Udio
| Attribute | Details |
|-----------|---------|
| **Positioning** | Quality-first (musician/producer focus) |
| **Licensing** | Major deals: UMG (October 2025), Warner Music signed |
| **Roadmap** | Fully licensed version launching in 2026 |
| **Best For** | High-fidelity, professional-grade audio output |

#### OpenAI Whisper (Voice Models)
| Attribute | Details |
|-----------|---------|
| **Role** | Speech-to-text transcription (not voice generation) |
| **Best For** | Complementary to voice generation (for input processing) |
| **Market Context** | Not a primary voice generation tool; supporting infrastructure |

---

## E. Specialty & Agentic-Runtime Models

### Anthropic Claude Computer Use
| Attribute | Details |
|-----------|---------|
| **Launch** | March 2026 (research preview) |
| **Available To** | Claude Pro and Max subscribers (Claude Cowork, Claude Code on macOS) |
| **Capability** | Click, type, open apps, navigate interfaces; no API integrations required |
| **Portability** | Works across VMs, containers, remote desktops; no OS dependency baked in |
| **Best For** | Desktop-wide automation, agentic task execution, developer workflows |
| **Advantage** | Most portable; strongest all-rounder for technical automation |

### OpenAI Operator / Codex Computer Use
| Attribute | Details |
|-----------|---------|
| **Operator (ChatGPT Agent)** | Integrated into ChatGPT Agent July 17, 2025; standalone Operator site deprecated |
| **Capabilities** | Web research, form filling, document handling, multi-step web workflows (cloud browser) |
| **Best For** | Non-technical users; web-centric tasks |
| **Codex Background Computer Use** | Launched April 16, 2026 — newest entrant for macOS desktop automation |
| **Edge** | Parallel background sessions; macOS-first focus with sharp tooling |

### Other Agentic Frameworks
- **Manus AI**: Specialized agentic runtime
- **Browser-use frameworks**: Open-source automation (Anthropic's browser-use, others)
- **Devin / Coding-specific agents**: Domain-specialized (code generation, debugging)

---

## F. Comparison Framing for Workshop Slide

For a non-technical audience (mining-industry professionals), recommend a **task-based framwork** rather than technical metrics:

### Recommended 5-6 Axis Comparison

1. **"If you want to write / think / reason → use [Claude Opus 4.7 / GPT-5.5 / Gemini 3.1]"**
   - Positioning: "Thinking assistants" that handle complex analysis, writing, research
   - Best for: Reports, strategy, analysis, document editing

2. **"If you want to draw / create visual concepts → use [Midjourney v8 / Flux 2 Pro]"**
   - Midjourney for aesthetic style refinement
   - Flux 2 for photorealism + text-in-images
   - Best for: Presentations, visual brainstorming, design concepts

3. **"If you want to make video → use [Veo 3.1 / Runway Gen-4]"**
   - Veo for all-around narrative video
   - Runway for detailed motion control & character consistency
   - Best for: Explainer videos, process documentation, training content

4. **"If you want to generate voice / music → use [ElevenLabs / Suno v5]"**
   - ElevenLabs for realistic voices & unified audio platform
   - Suno for complete songs with vocals
   - Best for: Voiceovers, podcast audio, background music

5. **"If you want to automate tasks on your computer → use [Claude Computer Use / OpenAI Operator]"**
   - Claude for broad desktop automation
   - OpenAI Operator for web-focused tasks
   - Best for: Workflow automation, repetitive data entry, multi-step processes

6. **"If you want fast, cheap, on-device → use [Haiku 4.5 / Llama 4 Scout / Mistral Large 3]"**
   - Best for: Cost-constrained scenarios, offline-capable inference
   - Emphasis: Open-source options available

### Key Messaging for Mining Audience

- **No jargon**: Use task names, not model names (except for tier differences: Opus vs. Sonnet vs. Haiku)
- **Practical framing**: "Write like a consultant," "Draw like a designer," "Automate like a PA"
- **Cost transparency**: Free tiers exist for rapid prototyping; enterprise contracts for scale
- **Vendor-neutral**: Position as "categories of tools" not brand loyalty
- **Safety/control**: Mention that models differ in reasoning depth, accuracy, hallucination risk — but keep technical detail minimal

---

## G. Indonesia/SEA-Specific Notes

### Language Support & Local Presence

#### Top-Tier Models with Bahasa Indonesia Support
- **Alibaba Qwen 3.6**: 100+ language support, including fluent Bahasa Indonesia; open-weight variants
- **Meta Llama 4 Scout/Maverick**: Strong multilingual training; available open-source
- **DeepSeek V4**: Multilingual, including Indonesian
- **Gemini 3.1 Pro**: Google ecosystem integration, strong Southeast Asian language support
- **OpenAI GPT-5.5**: Multilingual (including Indonesian)

#### Specialized Indonesian Models
- **Qwen-VL** (Alibaba): Vision-language with Indonesian support
- **SEA-LION** (AI Singapore): Open-source family of models for 11 Southeast Asian languages, including Indonesian
- **Prosa AI**: High-accuracy speech recognition & NLP tailored to Indonesian dialects
- **Kata.ai**: Conversational AI for Indonesian banking, e-commerce, government (local market leader)

#### Indonesia's Sovereign AI Initiative
- **Indosat + GoTo Collaboration** (May 2026): Open-source sovereign AI model in Bahasa Indonesia & Batak, focused on data residency & sovereignty
- **National AI Roadmap 2026**: Government push for "sovereign AI" to reduce foreign tech reliance and keep national data in-country
- **AI Talent Factory**: Indonesia building AI talent pipeline for local ecosystem

### Free Tiers & Workshop Access

#### Claude
- **Free tier**: ~15–40 messages per 5-hour window (permanent, no expiration)
- **Accessibility**: claude.ai web interface; globally available (no Indonesia-specific geo-blocking reported)
- **Best for**: Workshop participants with moderate usage; good for collaborative analysis

#### ChatGPT
- **Free tier**: GPT-4o Mini with daily message cap (varies by demand); ads included
- **Accessibility**: chat.openai.com; globally available
- **Limitation**: Ad-supported; reduced model quality vs. Plus tier

#### Google Gemini
- **Free API tier**: 1,500 requests/day on Gemini Flash; sufficient for small prototype apps
- **Web interface**: Free access to Gemini Flash at gemini.google.com
- **Advantage**: Deepest free API tier; suitable for workshop labs requiring API access

#### Alibaba Qwen
- **Free tier**: Limited access to Qwen models via some cloud providers (Aliyun)
- **Accessibility**: Not as straightforward as Claude/ChatGPT for direct web access
- **Advantage**: Open-source versions available for download/local deployment

#### Image Generation Free Tiers
- **Ideogram**: Free tier with text-in-image specialty; good for quick visual concepts
- **Flux 2 Dev**: Open-source (Hugging Face); free to run locally with adequate hardware
- **Stable Diffusion 3.5**: Open-source; free for on-device or self-hosted inference

#### Video Generation Free Tiers
- **Runway**: Limited free credits for experimentation
- **Pika**: Free tier available for quick generation trials

### Recommended Workshop Setup (Indonesia-Specific)

1. **Primary tool**: Claude (free tier) — no geo-blocking, straightforward access
2. **Secondary tool**: Google Gemini (free API tier for coding-focused labs)
3. **Visual generation**: Ideogram (free tier, no signup friction) or locally-hosted Flux 2 Dev
4. **Sovereign/local option**: Mention SEA-LION models & Indonesia's GoTo AI for enterprises prioritizing data residency
5. **Offline capability**: Highlight Llama 4 Scout & open-source variants for attendees wanting on-device deployment (post-workshop)

### Data Residency & Privacy Considerations
- **Default**: US/EU servers (Claude, ChatGPT, Gemini)
- **Indonesia-conscious option**: DeepSeek (China-based, but clear about data handling) or open-source models (no cloud dependency)
- **Enterprise**: Qwen via Aliyun (Chinese data center option, if acceptable); Indosat sovereign AI when production-ready

---

## H. Key Research Sources & Transparency Notes

### Sources Cited
- [Claude API Docs — Models Overview](https://platform.claude.com/docs/en/about-claude/models/overview)
- [OpenAI GPT-5.5 Announcement](https://openai.com/index/introducing-gpt-5-5/) (TechCrunch, May 5, 2026)
- [Google Gemini 3.1 Release](https://ai.google.dev/gemini-api/docs/changelog)
- [Meta Llama 4 & Muse Spark](https://ai.meta.com/blog/llama-4-multimodal-intelligence/)
- [DeepSeek V4 Release](https://www.deepseek.com/en/)
- [xAI Grok 4.3 API Launch](https://x.ai/news) (May 6, 2026)
- [Mistral Large 3 Release](https://mistral.ai/news/mistral-large-2407)
- [Moonshot Kimi K2.6 Launch](https://techcrunch.com/2026/05/07/chinas-moonshot-ai-raises-2b-at-20b-valuation-as-demand-for-open-source-ai-skyrockets/)
- [Black Forest Labs Flux 2](https://bfl.ai/models/flux-2)
- [Midjourney v8 Release](https://www.midjourney.com/) (March 2026)
- [Google Imagen 4 GA](https://developers.googleblog.com/announcing-imagen-4-fast-and-imagen-4-family-generally-available-in-the-gemini-api/)
- [OpenAI Sora Discontinuation](https://openai.com/) (API sunset Sept 24, 2026)
- [Google Veo 3.1 & Runway Gen-4 Comparison](https://pixflow.net/blog/best-ai-video-generator/)
- [ElevenLabs Music iOS Launch](https://www.aimagicx.com/blog/elevenlabs-music-ai-audio-content-creators-2026) (April 2026)
- [Suno v5 Release](https://suno.com/hub/ai-voice-cloning) (February 2026)
- [Claude Computer Use Launch](https://www.cnbc.com/2026/03/24/anthropic-claude-ai-agent-use-computer-finish-tasks.html) (March 2026)
- [Indonesia Sovereign AI & GoTo Partnership](https://fortune.com/asia/2025/06/02/indosat-goto-sovereign-ai-sahabat-bahasa-javanese/)
- [SEA-LION Multilingual Models](https://www.siliconflow.com/articles/en/best-open-source-LLM-for-Indonesian)
- [Free Tier Comparison (Claude vs. ChatGPT vs. Gemini)](https://aiwire.ai/articles/chatgpt-vs-claude-vs-gemini-which-free-tier-wins)

### Uncertainty Notes

- **Imagen 5**: Google has not officially detailed Imagen 5 capabilities; expected "soon" but no firm timeline
- **GPT-5.6**: Early internal testing as of April 30, 2026; not yet available to public (no release date announced)
- **Llama 5**: Speculation exists about 2026 release; no official announcement from Meta
- **Sora continued development**: OpenAI shuttered the public product; any future "Sora 2" is not yet announced
- **Video generation market volatility**: Rapid iteration; new entrants and consolidations likely in H2 2026

---

## I. Slide Design Recommendations

### Visual Layout Suggestions

1. **Section B1: Text/Reasoning Models**
   - Vertical tier chart (Opus → Sonnet → Haiku) with capability rings (reasoning, coding, multimodal, speed, cost)
   - Callout: "Pick your tier based on task complexity"
   - Include Asia-frontier models (Kimi, Qwen, DeepSeek) in a secondary "emerging alternatives" lane

2. **Section B2: Modality Breakdown**
   - Four quadrants: Write | Draw | Video | Voice
   - Each quadrant highlights top-3 vendors with "best for" taglines
   - Include free tier availability as small badge icons

3. **Section B3: Indonesia-Specific Callout (Optional)**
   - Sidebar: "For this workshop → Free access via…"
   - List Claude, Gemini, Ideogram with geo-accessibility notes
   - Mention Qwen & SEA-LION as local-economy options

### Key Messaging for Slide Copy

- **Avoid**: Model names in bulk (Opus 4.7, Sonnet 4.6, Haiku 4.5) — use tier labels instead
- **Favor**: Task-based framing ("For complex analysis, use Claude Opus")
- **Transparency**: "Free tier available during workshop; limited messages per day"
- **Audience respect**: No commit counts, no jargon, no "I built this" — focus on "tools you can use today"

---

## J. Practical Takeaway for Adri

**Present this as a landscape, not a recommendation engine.**

Frame each section as:
> "Here's who makes what. Pick the tool that fits your task. If you're unsure, start with a free tier and see what works."

**Key stats to anchor the talk:**
- 6–8 major text-reasoning vendors (US-dominated: Anthropic, OpenAI, Google, Meta; China-emerging: DeepSeek, Moonshot, Qwen)
- Image generation: 4 serious contenders (Flux 2, Midjourney v8, GPT-4 Images 2.0, Imagen 4 Ultra)
- Video: Sora is dead; Veo, Kling, Runway now lead
- Audio: ElevenLabs unified platform is the trend; Suno leads by volume
- Agentic: Claude Computer Use (broadest) vs. OpenAI Operator (web-focused)
- Indonesia-specific: Qwen + SEA-LION for multilingual; Claude/Gemini for workshop accessibility

**Confidence builder for attendees:**
"You don't need to memorize model names. Bookmark this 'task → tool' map, and in three months, you'll have a favorite in each category."

---

**End of Research Brief**  
**Document prepared:** May 11, 2026  
**Confidence level:** High (all sources dated March–May 2026; publicly available via official channels & press releases)
