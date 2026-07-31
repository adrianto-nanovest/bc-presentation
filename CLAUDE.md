<codex-cli-notes>
For using codex CLI, here is the mechanic:
```bash
codex exec -m gpt-5.6-terra -c model_reasoning_effort="high" \
  --sandbox read-only --skip-git-repo-check --ephemeral \
  -o <ABS_OUT.md> '<self-contained prompt>' < /dev/null   # final message → stdout AND the -o file
```
ALWAYS redirect `< /dev/null`: gives an immediate EOF.

Only consider models: 
1. gpt-5.6-sol (smartest, intelligence above opus, below fable; cost similar to sonnet)
2. gpt-5.6-terra (balance, intelligence between sonnet and opus; cost similar to haiku)
3. gpt-5.6-luna (fast, intelligence similar to haiku; cheapest at cost)

Effort-wise, there are `low`, `medium`, `high`, `xhigh`, `max` for all models above, define which to use wisely.

Prompting best-practices can be checked on: /Users/macbook/Projects/knowledge-catalog/docs/references/prompting-gpt-5.6.md
</codex-cli-notes>