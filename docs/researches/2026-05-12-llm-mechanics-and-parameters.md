# How LLMs Work — Core Concepts and Parameters
## Research Report for Workshop Slide (Non-Technical Mining Industry Audience)
**Date:** May 12, 2026  
**Audience:** Knowledge workers and professionals (~400 attendees) already using ChatGPT/Claude/Gemini  
**Target Regions:** Indonesia-friendly presentation (English research; translation later)

---

## PART 1: HOW LLMs WORK

### 1. Tokenization: Text → Tokens

When you type a message into ChatGPT or Claude, the first thing the model does is break your text into small pieces called **tokens**. A token is typically a word, part of a word, or even a single character. For example, "hello" might be one token, but "refrigerator" might split into two or three tokens depending on how common it is.

Modern models use a method called **Byte Pair Encoding (BPE)** to decide how to break text into tokens. BPE works like a compression algorithm: it identifies the most common letter or character pairs in training data and merges them together. This process repeats until a vocabulary of ~100,000–250,000 tokens is built. The genius of BPE is that it balances efficiency—common words become single tokens, saving space—while handling rare or new words by breaking them into smaller pieces. Different models have different vocabularies: LLaMA 3 uses ~128K tokens, while Gemma uses ~256K.

**Why not just use whole words?** Because English (and Indonesian) have infinite words—including new ones, slang, and names. Tokens allow the model to handle any text with a fixed vocabulary, while still keeping processing efficient. A simpler approach would need hundreds of millions of vocabulary entries; BPE keeps it to a manageable size.

**References:**  
- [GitHub Blog: So many tokens, so little time](https://github.blog/ai-and-ml/llms/so-many-tokens-so-little-time-introducing-a-faster-more-flexible-byte-pair-tokenizer/)
- [Hugging Face: Byte-Pair Encoding (BPE)](https://huggingface.co/learn/llm-course/chapter6/5)
- [Michael Brenndoerfer: Byte Pair Encoding - Complete Guide](https://mbrenndoerfer.com/writing/byte-pair-encoding-subword-tokenization-guide)

---

### 2. Embedding: Tokens → Vectors (High-Dimensional Space)

Once text is tokenized, each token is converted into a **vector**—a list of numbers. If you've ever heard "machine learning works with numbers," this is where that happens. Each token gets mapped to, say, 768 or 4,096 numbers. These form a point in **high-dimensional space**.

Think of it like a map. Just as we locate a city using latitude and longitude (2 dimensions), embeddings locate a token's *meaning* using hundreds or thousands of dimensions. In this space, semantically similar tokens end up close to each other. For example, "king" and "queen" would be near each other, while "apple" (fruit) and "apple" (company) might occupy distinct regions depending on context. The model learns these positions during training so that *meaning is encoded in location*.

Higher dimensions capture more nuance—how formal a word is, whether it's a noun or verb, emotional valence—but also cost more compute. LLMs typically use 768–4,096 dimensions. Researchers are still exploring whether all these dimensions are truly necessary, but empirically, they work well.

**References:**  
- [ArXiv: LLMs are Also Effective Embedding Models](https://arxiv.org/html/2412.12591v1)
- [Iguazio: What are LLM Embeddings?](https://www.iguazio.com/glossary/llm-embeddings/)
- [DataScienceDojo: Embeddings 101: The Foundation of LLM Power](https://datasciencedojo.com/blog/embeddings-and-llm/)

---

### 3. Transformer / Attention: The Core Mechanism

The **Transformer** is the architecture that powers all modern LLMs. At its heart is a mechanism called **self-attention**, which is basically the model's way of "paying attention" to relevant parts of what it has read so far.

**Plain-language intuition:** Imagine reading the sentence "The bank executive decided the river bank was too wet." When you reach "bank" the second time, you instinctively recall that "bank" earlier referred to a financial institution, not a riverbank. Your brain is doing attention—it looked back at the first use and updated your interpretation. Transformers do the same: every token looks at all previous tokens (or all tokens in a window) and decides which ones are most relevant to understanding the current position.

Here's how it works without math:
1. The model reads all previous tokens.
2. For each previous token, it asks: "How relevant are you to what I'm deciding now?"
3. It assigns a *relevance score* to each previous token.
4. It uses these scores to focus on the most relevant past context.
5. This focused context helps predict the next word.

A Transformer has multiple "attention heads" running in parallel, allowing it to consider relationships from different angles simultaneously: one head might track grammatical connections (subject-verb), another might track semantic meaning (who did what to whom), and a third might focus on sentiment or tone. The model learns which heads to rely on for different situations.

**Why this matters:** Before Transformers, models processed text sequentially (like reading left-to-right), which was slow and limited. Transformers can process all tokens in parallel and look back at any token instantly, making training faster and allowing longer context. This innovation enabled ChatGPT and modern AI.

**References:**  
- [DataCamp: Attention Mechanism in LLMs: An Intuitive Explanation](https://www.datacamp.com/blog/attention-mechanism-in-llms-intuition)
- [IBM: What is an Attention Mechanism?](https://www.ibm.com/think/topics/attention-mechanism)
- [Polo Club: Transformer Explainer (Visual)](https://poloclub.github.io/transformer-explainer/)

---

### 4. Next-Token Prediction: The Generative Loop

After all the embedding and attention magic, the Transformer outputs a list of scores (called **logits**) for every token in its vocabulary. For example, the logit for "happy" might be 8.2, for "sad" might be 2.1, and for "confused" might be 1.5. These scores reflect the model's "confidence" in each possible next word given everything it has read so far.

The model then applies a function called **softmax** to convert these raw scores into a probability distribution—a set of numbers between 0 and 1 that sum to 1. Now it can ask: "Given what I've learned, what's the probability the next word is 'happy'?" (maybe 65%), "sad"? (maybe 20%), "confused"? (maybe 10%), etc.

Once it picks a next token, that token gets added to the sequence, re-embedded, and fed back through the Transformer to predict the token after that. This loop repeats until the model says "I'm done" (an end-of-sequence token) or hits the output limit. This autoregressive, token-by-token generation is what makes responses feel continuous and coherent, rather than being written all at once.

**Why tokens matter here:** Because tokens, not words, are the model's native unit of thought. When you ask Claude for 200 words, it's actually budgeting hundreds of tokens (since not all tokens are words). This is why a technical answer about code might "cost" more tokens than a conversational answer of the same word count.

**References:**  
- [Mike X Cohen: LLM Breakdown 2/6 - Logits and Next-Token Prediction](https://mikexcohen.substack.com/p/llm-breakdown-26-logits-and-next)
- [Towards Data Science: Decoding Strategies in Large Language Models](https://towardsdatascience.com/decoding-strategies-in-large-language-models-9733a8f70539/)

---

### 5. Sampling: Picking from the Distribution (Parameters Enter Here)

Once the model has a probability distribution for the next token, it doesn't always pick the highest-probability token. If it did, every conversation about "How are you?" would get identical responses. Instead, it uses **sampling**—randomly selecting a token from the distribution, but in ways you can control.

If you ask for a deterministic answer (e.g., "What is 2+2?"), you might use **greedy sampling**: always pick the highest-probability token. The result is predictable and precise.

If you want creativity (e.g., "Write a poem"), you might use **nucleus sampling** or **top-k sampling**: these methods reshape the probability distribution to favor diversity while still respecting the model's learned preferences. For example, nucleus sampling (top-p) says: "Only consider tokens whose cumulative probability reaches 90%, then pick randomly from that set." This avoids absurd choices while allowing the model room to surprise you.

**The key insight:** All the parameters you'll learn next—temperature, top_p, top_k—are really just different ways of reshaping this probability distribution before you sample. They don't change what the model learned; they change how it picks from what it knows.

**References:**  
- [Let's Data Science: LLM Sampling - Temperature, Top-K, Top-P](https://letsdatascience.com/blog/llm-sampling-temperature-top-k-top-p-and-min-p-explained)
- [Medium (Sai Bhargav): Understanding LLM Sampling: Top-K, Top-P, and Temperature](https://pub.towardsai.net/understanding-llm-sampling-top-k-top-p-and-temperature-aa9360466bf0)

---

## PART 2: PARAMETERS (The Dials You Can Turn)

### Temperature (Range: 0–2)

**What it is:**  
Temperature controls the "confidence sharpness" of the probability distribution. It's like adjusting the focus of a spotlight.

**Low temperature (0–0.5):**  
The distribution becomes more peaked. The highest-probability token dominates, and low-probability alternatives barely register. **Result:** Focused, predictable, boring outputs. Best for: factual queries, calculations, consistent responses.

**Medium temperature (0.7–1.0):**  
The distribution stays balanced. High-probability tokens are favored but alternatives get fair consideration. **Result:** Natural, conversational, balanced. Best for: most general use cases.

**High temperature (1.5–2.0):**  
The distribution flattens. Many tokens get similar odds. **Result:** Creative, random, sometimes incoherent. Best for: brainstorming, creative writing, exploring ideas.

**Practical intuition:** Imagine a weather forecast showing "80% chance of sun, 15% rain, 5% snow." At low temperature, you'd always expect sun. At high temperature, you'd expect anything. At medium temperature, you'd reasonably bet on sun but stay ready for rain.

**When a non-technical user adjusts it:**  
- If Claude's answers feel robotic and repetitive → raise temperature.
- If Claude's answers feel nonsensical or off-topic → lower temperature.
- For careful work (code, reports) → use 0.5–0.7.
- For creative work (brainstorming, writing) → use 1.0–1.5.

**References:**  
- [Medium (Miguel de la Vega): Understanding Temperature and Top_p](https://medium.com/@1511425435311/understanding-openais-temperature-and-top-p-parameters-in-language-models-d2066504684f)
- [OpenAI Community: Cheat Sheet - Mastering Temperature and Top_p](https://community.openai.com/t/cheat-sheet-mastering-temperature-and-top-p-in-chatbot-responses/295542)

---

### Top-p / Nucleus Sampling (Typical: 0.9)

**What it is:**  
Instead of reshaping the entire distribution (like temperature does), top-p selects only the most likely tokens whose cumulative probability reaches the threshold, then samples from that subset.

**Example:** With top-p = 0.9, the model lists tokens in order of probability (say, "the" 35%, "a" 28%, "it" 15%, "hello" 12%, "xyz" 5%, ...) and includes tokens until the sum hits 90%. So it includes "the," "a," "it," and "hello" (totaling 90%), but excludes "xyz" and rarer options. Then it randomly picks one of those four.

**Effect on output:**  
- **Low top-p (0.5):** Restrictive; only very likely tokens get considered. Deterministic feel.
- **Medium top-p (0.9):** Balanced; most good options get a chance. (Most common setting.)
- **High top-p (1.0):** All tokens eligible; similar to no filtering.

**Difference from temperature:** Temperature reshapes the probabilities themselves; top-p just removes low-probability options. They can be combined: temperature changes the shape of the curve, top-p trims the tail.

**When a non-technical user adjusts it:**  
- If the model is too repetitive or "stuck" → lower top-p (e.g., 0.7).
- If responses feel too constrained → raise top-p (e.g., 0.95).
- Default (0.9) works well for most cases.

**References:**  
- [Medium (Nimmala Satyaprasad): Top-p in OpenAI Chat Completion API](https://medium.com/@nimmala.satyaprasad/understanding-temperature-and-top-p-parameters-in-openais-chat-completion-api-c2b1e000d320)
- [vLLM: Sampling Parameters](https://docs.vllm.ai/en/v0.4.1/dev/sampling_params.html)

---

### Top-k (Typical: 40–50)

**What it is:**  
Top-k restricts the model to always choosing from the K most likely tokens, discarding everything else.

**Example:** With top-k = 5, the model lists tokens by probability and only considers the top 5. It ignores tokens ranked 6th and below, no matter how reasonable they might be.

**Effect on output:**  
- **Low top-k (5–10):** Very restrictive; only the "obvious" tokens survive. Repetitive, safe.
- **Medium top-k (40–50):** Balanced; plenty of good options while still filtering noise. (Common default.)
- **High top-k (100+):** Minimal filtering; similar to no constraint.

**Difference from top-p:** Top-k fixes the *number* of candidate tokens (always top 5); top-p fixes the *cumulative probability* (always sum to 90%). In practice, top-p is more flexible because the top 5 tokens might sum to 50% on one question and 98% on another.

**When a non-technical user adjusts it:**  
- Top-k is less intuitive than temperature or top-p, so most users don't touch it.
- If you want to force extremely consistent/focused outputs → lower top-k (e.g., 10).
- If you want more diversity → raise top-k (e.g., 100).

**References:**  
- [Codefinity: Understanding Temperature, Top-k, and Top-p](https://codefinity.com/blog/Understanding-Temperature,-Top-k,-and-Top-p-Sampling-in-Generative-Models)
- [DataForest: Top-k Sampling Glossary](https://dataforest.ai/glossary/top-k-sampling)

---

### Max Tokens / Max Output Tokens

**What it is:**  
A hard ceiling on how many tokens the model is allowed to generate before it stops. If you set max_tokens = 500, the model will never output more than 500 tokens, period.

**Effect on output:**  
- **Low max_tokens (50–100):** Brief, concise responses. Useful for quick answers or cost-sensitive applications.
- **Medium max_tokens (500–2000):** Default for most conversations; enough for detailed explanations.
- **High max_tokens (4000+):** For long-form content (essays, code, reports).

**Important constraint:** max_tokens is an *output* budget, separate from the *input* budget (context window). A 200K context window means you can feed the model 200K tokens of text, but max_tokens only limits what it *generates*. The cost is: input tokens + output tokens ≤ context window.

**When a non-technical user adjusts it:**  
- If responses get cut off mid-sentence → raise max_tokens.
- If you want quick answers and care about cost → lower max_tokens (each token is charged).
- If using a model for real-time chat → set a reasonable default (1000–2000) to manage latency.

**References:**  
- [Morph: LLM Token Limits - Context Window Comparison (2026)](https://www.morphllm.com/llm-token-limit)
- [Atlan: LLM Context Window Limitations](https://atlan.com/know/llm-context-window-limitations/)

---

### Context Window (Input Budget + Tradeoffs)

**What it is:**  
The total number of tokens a model can "see" in a single conversation. Modern Claude models support 200K tokens; GPT-5.2 supports 400K. This is the combined budget for: (1) all previous messages, (2) the current message, (3) the system prompt, and (4) the response the model will generate.

**Example:** If you have a 200K context window and upload a 100K-token document, add a 5K system prompt, and ask a question that will generate 5K tokens, you've used 110K tokens and have 90K remaining for future messages.

**Why it matters:**  
- **Long context (200K+):** Can handle entire documents, codebases, or conversation histories without forgetting. Enables "talk to your PDF" and "analyze this 100-page report" features.
- **Short context (4K–16K):** Forces the model to be selective; you can only include relevant recent messages. Older context gets "dropped," causing the model to lose memory.

**Tradeoffs of longer context windows:**  

1. **Cost:** Longer contexts cost more to process. Anthropic and Google apply steep surcharges at 200K+; the surcharge applies to the *entire* request, not just overflow.

2. **Performance degradation:** Longer contexts introduce a phenomenon called the "lost-in-the-middle" problem. Models attend well to the beginning and end of context but struggle with the middle. Benchmark tests show accuracy drops by 30%+ when relevant information is placed mid-document. (Exception: Gemini 1.5 Pro holds accuracy better.)

3. **Latency:** Longer inputs take longer to process because the Transformer must attend to more tokens, increasing computational complexity.

4. **Unnecessary cost:** If you only need 10K tokens of context, using a 200K window wastes money.

**Best practice:** Set max_output_tokens and choose your context window based on your task. For mining reports or compliance documents, a large window (200K) might be worth the cost; for quick Q&A, a 16K window is plenty.

**References:**  
- [Anthropic: Context Windows](https://docs.anthropic.com/en/docs/build-with-claude/context-windows)
- [Chroma Research: Context Rot - How Increasing Input Tokens Impacts LLM Performance](https://research.trychroma.com/context-rot)

---

### System Prompt (Persistence & Behavior Control)

**What it is:**  
A special instruction you give to the model *once*, before the conversation starts, that describes its role, tone, or constraints. Unlike a user message, the system prompt is not part of the conversation history—it stays consistent across the entire session.

**Example system prompts:**
- "You are a mining safety inspector. Answer all questions in Indonesian. Be formal and precise."
- "You are a friendly assistant. Keep responses under 100 words. Use emoji."
- "You are an expert Python developer. Provide code with explanations and tests."

**Key differences from a user prompt:**
- **System prompt:** Stays the same for the whole session. Applies to *every* message. Sets up the "character" or constraints.
- **User prompt:** A one-time instruction for a specific task. Example: "Summarize this document in 3 points."

**Persistence behavior:**  
Once a system prompt is set (e.g., in an API call or a chat interface), it remains active across all subsequent messages *until explicitly changed*. The model treats every response as if it's living inside the system prompt's frame. If you later give a conflicting user prompt, the user prompt takes priority, but the system prompt's influence remains underneath.

**When a non-technical user sets a system prompt:**  
- If you want consistent tone/language across a chat session → set a system prompt once.
- If you want the model to "pretend" to be an expert or character → system prompt is perfect.
- If your organization uses LLMs for customer support, use a system prompt to ensure all responses reflect company policy and tone.
- Examples: "Always cite sources," "Respond in Indonesian," "Be skeptical of claims without evidence."

**References:**  
- [Anthropic: System Prompts Best Practices](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/system-prompts)

---

### Reasoning Effort / Thinking Budget (The New Parameter)

**What it is:**  
A relatively new feature in advanced models (GPT-5 series, Claude 4+) that lets you control how much *internal reasoning* the model does before answering. Under the hood, these models can "think"—internal chains of reasoning that aren't shown to you—before producing the final response. **Reasoning effort** controls the budget for those hidden thoughts.

**How it works:**  
Modern reasoning models (GPT-5.4, Claude 4.6) allow you to set an `effort` parameter with values like "low," "medium," "high," or "max":

- **Low effort:** The model does minimal internal reasoning, jumping to an answer quickly. Fast and cheap but less thorough. (Best for straightforward questions.)
- **Medium effort:** Balanced reasoning. Handles moderate complexity. (Default for most use cases.)
- **High effort:** The model reasons for longer, reconsidering approaches and checking work. Slower and more expensive but more reliable on hard problems. (Best for complex analysis, coding, or decisions with consequences.)
- **Max effort:** Full reasoning budget; the model spends as many reasoning tokens as it deems necessary. (Use rarely, for critical work.)

**Under the hood:**  
The model is allocated a `budget_tokens` limit—e.g., 32K tokens for reasoning. As it reasons, it "spends" tokens from that budget. You don't see these reasoning tokens in the response (unless you ask for them), but they improve answer quality. If you set a high budget, the model can iterate multiple times: "Hmm, does this make sense? Let me re-check... Actually, there's another angle..." This internal debate improves accuracy.

**Cost implications:**  
- Reasoning tokens count toward your API bill (though some providers show them separately).
- 3x–5x more expensive than standard responses, but often produce better results on hard problems.
- You pay for the *full budget*, even if the model doesn't use it all.

**When a non-technical user adjusts it:**  
- For routine questions ("What time is the meeting?") → set to "low."
- For decision-support ("Should we expand the Berau mine?") → set to "high."
- For anything with legal/safety implications → set to "high" or "max," cost be damned.
- For debugging code or solving math problems → "medium" or "high" usually needed.

**Important note:** This parameter is still new (2024–2025) and only available on cutting-edge models. Older models like GPT-4o or Claude 3 Sonnet don't support it. As of May 2026, OpenAI (o1, o3 series, GPT-5.4) and Anthropic (Claude 4.6, Opus 4.5) expose this feature via API.

**References:**  
- [Anthropic: Extended Thinking / Adaptive Thinking](https://platform.claude.com/docs/en/build-with-claude/extended-thinking)
- [OpenAI: Reasoning Models Guide](https://developers.openai.com/api/docs/guides/reasoning)
- [OpenRouter: Reasoning Tokens Documentation](https://openrouter.ai/docs/guides/best-practices/reasoning-tokens)

---

### Frequency Penalty & Presence Penalty (Optional but Useful)

**What they are:**  
Two penalty parameters (OpenAI and other vendors) that discourage repetition in different ways. Range: -2.0 to +2.0.

**Presence penalty:**  
A one-off penalty applied to any token that has appeared *at least once* in the generated response so far. Discourages the model from reusing words/phrases. Think of it as: "I've already mentioned X, so let me pick something different."

- **0 (default):** No penalty; the model is free to repeat words naturally.
- **0.5–1.0 (mild):** Discourages obvious repetition (e.g., "The report says... the report also says...").
- **2.0 (strong):** Aggressively prevents any word from appearing twice, even if it's natural (can produce weird phrasing).

**Frequency penalty:**  
A penalty proportional to *how many times* a token has already been used. The more you've used a word, the larger the penalty. Discourages common filler words.

- **0 (default):** No penalty.
- **0.5–1.0 (mild):** Reduces "um," "like," "you know," fillers.
- **2.0 (strong):** Heavily suppresses common words; output can become awkwardly verbose.

**Practical difference:**  
- Use **presence_penalty** if you want diversity in word choice (e.g., "Find 5 synonyms for X" without repeating any).
- Use **frequency_penalty** if you want to reduce filler and common-word overuse.

**When a non-technical user adjusts them:**  
- For creative writing or brainstorming → raise presence_penalty (0.5–1.0).
- For summaries or reports where you expect repetition → set both to 0 (default).
- These are less intuitive than temperature, so most non-technical users won't touch them. Use only if you notice the model is being too repetitive.

**References:**  
- [OpenAI Platform: Frequency and Presence Penalties](https://platform.openai.com/docs/advanced-usage/frequency-and-presence-penalties)
- [Medium (Asim KT): Frequency vs Presence Penalty](https://medium.com/@KTAsim/frequency-vs-presence-penalty-whats-the-difference-openai-api-51b0c4a7229e)

---

## PART 3: ANIMATION IDEAS (10–20 words each for slide visualizations)

Each parameter can be animated to show its effect:

1. **Temperature:** A bell curve that sharpens (cold) and flattens (hot) as a slider moves left-to-right. Show the peak narrowing and widening.

2. **Top-p:** A bar chart of token probabilities; a horizontal line traces upward, including tokens cumulatively until reaching 90%, then the rest fade. Redraw as slider changes.

3. **Top-k:** A sorted list of tokens; only the top K are highlighted; rest are grayed out. K shrinks/grows as slider moves.

4. **Max Tokens:** A progress bar filling; when full, the model stops (mid-sentence if needed). Show truncation visually.

5. **Context Window:** Two stacked bars: "Input tokens used" + "Output tokens used" = "Total budget used." Show the shrinking free budget as a conversation grows.

6. **System Prompt:** A box labeled "System Instructions" at the top of a chat panel, solid/persistent while user messages scroll below. Show it staying constant across multiple turns.

7. **Reasoning Effort:** A "thinking" animation (swirling lines or pulsing circle) with duration/intensity tied to effort level. "Low" = quick pulse; "High" = longer, more intense thinking.

8. **Presence/Frequency Penalty:** A word cloud where repeated words shrink or fade; as penalty increases, more unique words appear and same words vanish.

---

## PART 4: SOURCES

### Official Documentation & Guides

- [Anthropic: Context Windows](https://docs.anthropic.com/en/docs/build-with-claude/context-windows)
- [Anthropic: System Prompts Best Practices](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/system-prompts)
- [Anthropic: Extended Thinking / Adaptive Thinking](https://platform.claude.com/docs/en/build-with-claude/extended-thinking)
- [OpenAI: Reasoning Models Guide](https://developers.openai.com/api/docs/guides/reasoning)
- [OpenAI: Frequency and Presence Penalties](https://platform.openai.com/docs/advanced-usage/frequency-and-presence-penalties)
- [vLLM: Sampling Parameters](https://docs.vllm.ai/en/v0.4.1/dev/sampling_params.html)

### Tokenization & BPE

- [GitHub Blog: So many tokens, so little time](https://github.blog/ai-and-ml/llms/so-many-tokens-so-little-time-introducing-a-faster-more-flexible-byte-pair-tokenizer/)
- [Hugging Face: Byte-Pair Encoding (BPE)](https://huggingface.co/learn/llm-course/chapter6/5)
- [Michael Brenndoerfer: Byte Pair Encoding - Complete Guide](https://mbrenndoerfer.com/writing/byte-pair-encoding-subword-tokenization-guide)
- [Sebastian Raschka: Implementing BPE From Scratch](https://sebastianraschka.com/blog/2025/bpe-from-scratch.html)

### Embeddings & Representation

- [ArXiv: LLMs are Also Effective Embedding Models](https://arxiv.org/html/2412.12591v1)
- [Iguazio: What are LLM Embeddings?](https://www.iguazio.com/glossary/llm-embeddings/)
- [DataScienceDojo: Embeddings 101: The Foundation of LLM Power](https://datasciencedojo.com/blog/embeddings-and-llm/)

### Attention & Transformers

- [DataCamp: Attention Mechanism in LLMs: An Intuitive Explanation](https://www.datacamp.com/blog/attention-mechanism-in-llms-intuition)
- [IBM: What is an Attention Mechanism?](https://www.ibm.com/think/topics/attention-mechanism)
- [Polo Club: Transformer Explainer (Visual Interactive)](https://poloclub.github.io/transformer-explainer/)
- [MachineLearningMastery: The Transformer Attention Mechanism](https://machinelearningmastery.com/the-transformer-attention-mechanism/)

### Next-Token Prediction & Logits

- [Mike X Cohen: LLM Breakdown 2/6 - Logits and Next-Token Prediction](https://mikexcohen.substack.com/p/llm-breakdown-26-logits-and-next)
- [Towards Data Science: Decoding Strategies in Large Language Models](https://towardsdatascience.com/decoding-strategies-in-large-language-models-9733a8f70539/)

### Temperature & Sampling Parameters

- [Medium (Miguel de la Vega): Understanding Temperature and Top_p](https://medium.com/@1511425435311/understanding-openais-temperature-and-top-p-parameters-in-language-models-d2066504684f)
- [OpenAI Community: Cheat Sheet - Mastering Temperature and Top_p](https://community.openai.com/t/cheat-sheet-mastering-temperature-and-top-p-in-chatbot-responses/295542)
- [Let's Data Science: LLM Sampling - Temperature, Top-K, Top-P](https://letsdatascience.com/blog/llm-sampling-temperature-top-k-top-p-and-min-p-explained)
- [Medium (Sai Bhargav): Understanding LLM Sampling: Top-K, Top-P, and Temperature](https://pub.towardsai.net/understanding-llm-sampling-top-k-top-p-and-temperature-aa9360466bf0)

### Top-k Sampling

- [Codefinity: Understanding Temperature, Top-k, and Top-p](https://codefinity.com/blog/Understanding-Temperature,-Top-k,-and-Top-p-Sampling-in-Generative-Models)
- [DataForest: Top-k Sampling Glossary](https://dataforest.ai/glossary/top-k-sampling)

### Context Window & Token Limits

- [Morph: LLM Token Limits - Context Window Comparison (2026)](https://www.morphllm.com/llm-token-limit)
- [Atlan: LLM Context Window Limitations](https://atlan.com/know/llm-context-window-limitations/)
- [Chroma Research: Context Rot - How Increasing Input Tokens Impacts LLM Performance](https://research.trychroma.com/context-rot)

### Penalties & Advanced Features

- [OpenAI Platform: Frequency and Presence Penalties](https://platform.openai.com/docs/advanced-usage/frequency-and-presence-penalties)
- [Medium (Asim KT): Frequency vs Presence Penalty](https://medium.com/@KTAsim/frequency-vs-presence-penalty-whats-the-difference-openai-api-51b0c4a7229e)
- [OpenRouter: Reasoning Tokens Documentation](https://openrouter.ai/docs/guides/best-practices/reasoning-tokens)

---

## NOTES FOR SLIDE DESIGN

- **Tone:** Assume the audience has used ChatGPT/Claude but doesn't know how they work. Avoid jargon (don't say "softmax" or "attention head count" on a slide).
- **Metaphors:** Use familiar analogies (spotlight, map, probability distribution, thinking/reasoning).
- **Visuals:** Animations that show cause-and-effect (moving a slider → output changes) will be more memorable than static diagrams.
- **Pacing:** Spend ~2–3 minutes on Part 1 (how LLMs work) and ~5–7 minutes on Part 2 (parameters), with time for audience Q&A.
- **Language:** English for research; translation to Bahasa Indonesia for final delivery.
- **Practical angle:** Tie each parameter to a real use case ("If you want creative output, do this...") so professionals see immediate relevance.

---

**Word count:** ~2,100 words (excluding source list)  
**Completed:** May 12, 2026  
**Status:** Ready for slide design and translation

