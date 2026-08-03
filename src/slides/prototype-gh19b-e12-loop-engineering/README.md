# PROTOTYPE gh#19b — E.12 · LOOP ENGINEERING

Throwaway. A **clean-sheet rebuild** of the E.12 slide — deliberately sharing
nothing with `prototype-gh19-e12-the-loop/` (the spiral-to-ring figure). One
candidate, not a variant bracket (owner call, 2026-08-03: "just create 1").
Sourced entirely from the Panaversity *Loop Engineering: A Crash Course* doc.

```
npm run dev  →  http://localhost:5173/?dev=proto19b
```

`Space` / click step forward · `Backspace` / `↑` / `←` back · `1`–`4` pin a
part · `0` clear and return to step 0 · `\` replay the current step's entry.

## The three steps

**step 0 — the mindset shift.** A diptych. Left: *prompting, turn by turn* —
four chips relaying an endless highlight cycle (each row owns a quarter of the
beat), with a dashed **"you, again"** return path; the panel's verdict is
*"You are the heartbeat, the checker, and the memory."* Right: *looping — a
system you design once* — a live EKG heartbeat feeding
`DISCOVER → IMPLEMENT → VERIFY → COMMIT`, a spine (`progress.md`, read first /
written last), a `risky` escape to the one human gate, and `approved` handed
back to commit. A token runs the column continuously; the left panel visibly
cannot run without you, the right one visibly can. Below, the two
practitioners who renamed the job: **Boris Cherny** (*"…my job is to write
loops"*) and **Peter Steinberger** (*"you should be designing loops that
prompt your agents"*). Bridge between the panels: `THE LEVERAGE MOVES ›››`.

**step 1 — the big loop, four parts.** Left rail:
`HEARTBEAT · ONE BEAT · CHECKER · SPINE`, joined by down-arrows and an amber
return arc — *"tomorrow's beat starts by reading the spine."* A hint icon sits
beside the heading (no qualifier line anywhere on this build). Hovering a part
**magnifies** it on the right canvas — a stepped leader line physically
connects the card to the panel title:

| part | right canvas |
|---|---|
| `HEARTBEAT` | the four heartbeats — in-session `/loop`, conditional `/goal` / `codex exec + tests`, scheduled Routines / ChatGPT Tasks / cron, event-driven Channels / GitHub / `@codex` — on a *you hold it → it runs without you* axis. **No OpenCode anywhere** (owner call); Codex/ChatGPT stand in. |
| `ONE BEAT` | the agent runtime — build the context → the model decides → run the tools → add the results, drawn as an orbit with a circulating comet; the dashed exit: *the model stops asking — the beat ends, back to the big loop: the checker, then the spine.* |
| `CHECKER` | the checker ladder — passing test (*proof*), mechanical checks (*partial proof*), rubric with a bar (*a claim, not a proof*), with the human gate widening beneath as the proof thins. |
| `SPINE` | memory between runs — Run 1 Monday ✕ *the session ends, the model's memory is wiped* ✕ Run 2 Tuesday, over the continuous repo band (`CLAUDE.md / AGENTS.md` the front of the diary, `progress.md` the back). |

Idle shows `ONE BEAT` — so the resting pose is exactly the reference's "two
loops, one name" spread: big loop on the left, one beat magnified on the
right. Un-hover **releases**; click **pins** (pin glyph replaces the row
number).

**step 2 — the worked example.** The rail stays; the canvas becomes the
**morning-triage loop, one beat**: heartbeat 9:00 → read `progress.md` → find
the work (≤5) → draft in a worktree (*the maker*) → a separate reviewer grades
it (*the checker*) → `THE VERDICT?` forks to *needs a human* / *open a PR* →
update `progress.md` → dashed return, *again tomorrow at 9:00*. Hovering a
rail part now **lights the flow stages that part owns** (spine → read+update,
checker → reviewer+verdict+both branches, heartbeat → the pill and the return,
one beat → the maker stages); everything else demotes a colour tier — never
opacity. Two day-tokens run the flow on alternating laps: one lap passes and
opens a PR, the next fails and flags a person. Closer: *"You wake up to two
PRs and one flagged decision. You typed nothing."* The recap footnote lands
bottom-left at display weight:

> **Design the loop once — it starts the work, checks the work, remembers the
> work. You keep *intent* and *accountability*.**

## Rules this build obeys

- **No qualifier.** The mono strip under the headline is gone by request.
- **`kw` everywhere** — headline, both step-0 verdicts and quotes, every rail
  description, every panel kicker/desc/footnote, every flow node, the closer
  and the recap. Mono strings (titles, tool strips, axis labels, phase names)
  never carry keywords. All copy lives in `content.ts` with its `*Kw`
  siblings; 1–3 keywords per chunk.
- **Hint beside the left heading**, via the shared `HintIcon`.
- **Rank is colour tier, never opacity** — step 2's dimming moves borders to
  copper-900 and text to neutral-400; nothing rests semi-transparent.
- **Reduced motion**: zero SMIL nodes mount (verified); CSS animation is
  squashed by the global rule; every pose still renders complete.
- CSS vars only, no hex literals, no new fonts, no new libraries. All
  prototype keyframes are `p19b-`-prefixed in one injected style block.

## What was observed in the browser

Via `scripts/p19b-shots.mjs` and `scripts/p19b-reduced.mjs` against the real
`<Slide>` stage at 1280×720:

- Step 1 idle reports panel `beat`; hovering each card swaps to its panel and
  sets `data-active`; un-hover releases (zero active cards, panel back to
  `beat`); click-pin holds after the pointer leaves.
- Step 2 reports panel `triage`; the footnote mounts; all four hover states
  light their own stages.
- `2 → 1 → 0` all re-render; `\` replays entries.
- Two step-0 frames 1.7 s apart differ across both panels (ambient relay,
  comet, EKG, chevrons all live).
- `prefers-reduced-motion: reduce`: 0 `<animateMotion>` nodes at every step,
  no page errors.
- Console clean. `vite build` succeeds and `dist/` contains no prototype
  markers (`proto19b`, `p19b`, quote strings).

## Not done / open at the projector

- The 8.5 px mono tool strips on the heartbeat cards are the smallest type on
  the deck — projector legibility unverified.
- Step-0 entry lands in ~1 s; there is no draw-in choreography for the right
  panel's connectors (they mount with the panel). Deliberate — step 0 is a
  poster, not a build-up — but it is an owner call.
- No tests, inline styles throughout. Prototype rules: **rewrite, do not
  lift.**
