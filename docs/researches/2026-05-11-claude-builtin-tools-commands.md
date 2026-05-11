# Claude Code Built-in Tools & Commands: Complete Catalogue (May 2026)

**Audience:** Non-engineers who want to understand what Claude Code can do out of the box  
**Last Updated:** May 11, 2026  
**Version:** Claude Code 2.1+

---

## Table of Contents

1. [Built-in Subagents](#1-built-in-subagents)
2. [Built-in Slash Commands](#2-built-in-slash-commands)
3. [Built-in Tools](#3-built-in-tools)
4. [Hooks System](#4-hooks-system)
5. [Skills vs MCP vs Plugins](#5-skills-vs-mcp-vs-plugins)
6. [Why This Matters to Knowledge Workers](#6-why-this-matters-to-knowledge-workers)

---

## 1. Built-in Subagents

Subagents are specialized AI assistants that handle specific types of tasks in their own context window. Think of them as expert consultants Claude can bring in when needed.

### **Explore** (Read-only research agent)
**Purpose:** Search and analyze your codebase without making changes  
**When to care:** You want Claude to find patterns, understand how something works, or research a question without risking edits  
**Example trigger:** "Find all files that handle authentication" or "How does the payment system work?"

### **Plan** (Architect agent)
**Purpose:** Draft implementation plans for complex multi-step changes  
**When to care:** Before making significant changes, you want a roadmap to review first  
**Example trigger:** Type `/plan` or ask "Can you plan out how to add this feature?"

### **general-purpose** (Default agent)
**Purpose:** The standard Claude you talk to; can read, write, search, and execute  
**When to care:** This is your main workhorse for everyday tasks  
**Example trigger:** Active by default when you start Claude Code

### **claude-code-guide** (Documentation assistant)
**Purpose:** Answers questions about Claude Code itself—how to use features, configure settings, troubleshoot issues  
**When to care:** You're trying to learn Claude Code or debug your setup  
**Example trigger:** Currently active as you read this response

### **statusline-setup** (Configuration helper)
**Purpose:** Helps configure your terminal status line  
**When to care:** You want to customize what information displays in your terminal prompt  
**Example trigger:** Run `/statusline` command

### Output Style Variants
Claude Code also has specialized response modes (Explanatory, Terse, Diff-only, Plan) that adjust how verbose or structured responses are. These aren't separate agents but behavior presets you can switch between via `/config`.

**Sources:**
- [Claude Code Subagents Documentation](https://code.claude.com/docs/en/subagents.md)
- [How Claude Code Works](https://code.claude.com/docs/en/how-claude-code-works.md)

---

## 2. Built-in Slash Commands

Slash commands are shortcuts you type at the start of a message to control Claude Code directly. Here's the complete list organized by use case.

### **Session Management**
| Command | Purpose | Concrete Use Case |
|---------|---------|-------------------|
| `/clear [name]` | Start fresh conversation, empty context | After finishing a task, start a new one without prior conversation history |
| `/resume [session]` | Continue a previous conversation | Pick up where you left off yesterday |
| `/branch [name]` | Fork conversation at this point | Try two different approaches without losing your work |
| `/compact [instructions]` | Summarize conversation to free context | Your conversation is getting long and slow |
| `/export [filename]` | Save conversation as text | Keep a record of what was discussed or changed |
| `/btw <question>` | Quick side question without history bloat | "btw what's the capital of France?" won't pollute your coding session |
| `/context [all]` | Visualize context window usage | See what's taking up space in Claude's memory |
| `/teleport` | Pull a web session into terminal | Started on claude.ai, want to continue locally |
| `/remote-control` | Make session available from web | Working locally, want to check from phone |

### **Configuration & Settings**
| Command | Purpose | Concrete Use Case |
|---------|---------|-------------------|
| `/config` | Open settings interface | Change theme, model, output style |
| `/model [model]` | Switch AI model | Use Opus for complex tasks, Haiku for speed |
| `/effort [level]` | Adjust reasoning depth | Set to `xhigh` for hard problems, `low` for simple edits |
| `/theme` | Change color scheme | Switch to light mode or colorblind-friendly palette |
| `/permissions` | Manage what Claude can do | Allow certain file operations, block others |
| `/hooks` | View automation triggers | See what happens automatically after edits |
| `/keybindings` | Customize keyboard shortcuts | Rebind Ctrl+S or add chord shortcuts |
| `/sandbox` | Toggle sandboxed execution | Run code in isolated environment for safety |
| `/fast [on\|off]` | Toggle fast mode | Trade accuracy for speed |
| `/privacy-settings` | Manage data privacy | Control what Anthropic can see (Pro/Max only) |
| `/color [color]` | Set prompt bar color | Visual indicator for different projects |

### **Workflow & Code Quality**
| Command | Purpose | Concrete Use Case |
|---------|---------|-------------------|
| `/init` | Generate CLAUDE.md guide for project | First time in a new codebase |
| `/plan [description]` | Enter planning mode | "Plan how to add user authentication" |
| `/diff` | View uncommitted changes interactively | See exactly what Claude changed before committing |
| `/review [PR]` | Code review a pull request | Get feedback before merging |
| `/security-review` | Scan for security vulnerabilities | Check for SQL injection, auth issues, data leaks |
| `/simplify [focus]` | Find and fix code quality issues | Remove duplication, improve efficiency after rapid development |
| `/rewind` | Undo code and conversation | Claude made a mistake—roll back |
| `/batch <instruction>` | Large-scale parallel changes | "Migrate 30 components from Vue to React" |

### **Project Setup & Integration**
| Command | Purpose | Concrete Use Case |
|---------|---------|-------------------|
| `/memory` | Edit CLAUDE.md memory files | Add project context Claude should always remember |
| `/mcp` | Manage external tool connections | Connect to GitHub, databases, browsers |
| `/agents` | Configure custom subagents | Create specialized assistants for your domain |
| `/skills` | List and manage custom skills | See what procedures Claude knows |
| `/plugin` | Manage installable extensions | Install community-built capabilities |
| `/ide` | Connect to VS Code/JetBrains | Use Claude while staying in your editor |
| `/add-dir <path>` | Grant file access to another folder | Work across multiple repositories |

### **Help & Meta**
| Command | Purpose | Concrete Use Case |
|---------|---------|-------------------|
| `/help` | Show available commands | Quick reference |
| `/doctor` | Diagnose installation issues | Claude not working right? Run diagnostics |
| `/debug [description]` | Enable debug logging | Something's broken, need detailed logs |
| `/feedback [report]` | Submit bug report | Found a problem, report it to Anthropic |
| `/release-notes` | View changelog | See what's new in latest version |
| `/powerup` | Interactive feature tutorials | Learn Claude Code capabilities with demos |
| `/usage` | Show costs and usage stats | Track API spending and session costs |
| `/insights` | Analyze your usage patterns | What projects do you work on? What commands do you use? |

### **Automation & Scheduling**
| Command | Purpose | Concrete Use Case |
|---------|---------|-------------------|
| `/loop [interval] [prompt]` | Run prompt on repeat | "/loop 5m check if CI passed" |
| `/schedule [description]` | Create cloud-based routines | Daily reports, weekly cleanup tasks |
| `/tasks` | Manage background processes | See what's running in the background |

### **Advanced & Specialized**
| Command | Purpose | Concrete Use Case |
|---------|---------|-------------------|
| `/ultraplan <prompt>` | Deep cloud-based planning | Complex architectural decisions |
| `/ultrareview [PR]` | Multi-agent cloud code review | Thorough review with multiple perspectives |
| `/autofix-pr [prompt]` | Auto-fix CI failures and review comments | Watch PR and push fixes automatically |
| `/install-github-app` | Set up GitHub Actions integration | CI/CD automation |
| `/team-onboarding` | Generate teammate guide from your usage | Help new developers get started |
| `/claude-api [migrate]` | Load API reference, migrate code | Building apps with Anthropic SDK |
| `/fewer-permission-prompts` | Auto-configure permission allowlist | Stop getting asked for common operations |

### **Account & Access**
| Command | Purpose | Concrete Use Case |
|---------|---------|-------------------|
| `/login` | Sign in | Authenticate with Anthropic |
| `/logout` | Sign out | Switch accounts |
| `/upgrade` | View plan upgrade options | Need more usage capacity |
| `/passes` | Share free trial invites | Give friends a week of Claude Code |

**Sources:**
- [Complete Commands Reference](https://code.claude.com/docs/en/commands.md)

---

## 3. Built-in Tools

Tools are what Claude actually uses to interact with your system. When you see "Claude is using Bash" or "Claude is reading file.py", these are tool invocations.

### **File Reading Tools**
| Tool | Purpose |
|------|---------|
| **Read** | Read file contents line-by-line with line numbers |
| **Glob** | Find files matching a pattern (e.g., `*.tsx`) |
| **Grep** | Search file contents for text patterns |

**When to care:** These are read-only and safe. Claude uses these to understand your codebase.

### **File Editing Tools**
| Tool | Purpose |
|------|---------|
| **Write** | Create or completely overwrite a file |
| **Edit** | Make precise find-and-replace changes to existing files |
| **NotebookEdit** | Edit Jupyter notebook cells (.ipynb files) |

**When to care:** These modify your code. Claude prefers Edit (surgical changes) over Write (full replacement) when possible.

### **Execution Tools**
| Tool | Purpose |
|------|---------|
| **Bash** | Run shell commands (npm install, git commit, python script.py) |

**When to care:** Can run anything your terminal can run. Permission system lets you approve/deny commands.

### **Web Tools**
| Tool | Purpose |
|------|---------|
| **WebFetch** | Download and parse a specific URL as markdown |
| **WebSearch** | Search the web for current information |

**When to care:** Claude can research documentation, StackOverflow, or current events without leaving the conversation.

### **Task Management Tools**
| Tool | Purpose |
|------|---------|
| **TaskCreate** | Start a background process |
| **TaskGet** | Check status of a background task |
| **TaskUpdate** | Modify a running task |
| **TaskList** | List all active tasks |
| **TaskOutput** | Get output from a completed task |

**When to care:** Long-running operations (builds, tests, deployments) can run in the background while you continue working.

### **Planning & Subagent Tools**
| Tool | Purpose |
|------|---------|
| **EnterPlanMode** | Switch into planning mode |
| **ExitPlanMode** | Return to normal mode |
| **Agent** | Delegate work to a specialized subagent |
| **SendMessage** | Communicate with another agent |
| **TeamCreate** | Spawn multiple parallel agents |

**When to care:** Complex tasks get broken down and handled by specialized agents.

### **Workflow Control Tools**
| Tool | Purpose |
|------|---------|
| **Skill** | Invoke a custom skill/command |
| **ToolSearch** | Find the right tool for a task (when many MCP tools available) |
| **AskUserQuestion** | Explicitly prompt you for input |

**When to care:** These help Claude orchestrate complex multi-step workflows.

### **Scheduling Tools**
| Tool | Purpose |
|------|---------|
| **ScheduleWakeup** | Set a one-time delayed action |
| **CronCreate** | Create recurring scheduled task |
| **CronList** | View scheduled tasks |
| **CronDelete** | Remove scheduled task |
| **EnterWorktree** | Create isolated git workspace |
| **ExitWorktree** | Leave isolated workspace |

**When to care:** Automation and parallel development branches.

### **IDE Integration Tools** (via MCP)
| Tool | Purpose |
|------|---------|
| **mcp__ide__getDiagnostics** | Get errors/warnings from your editor |
| **mcp__ide__executeCode** | Run code in your IDE |

**When to care:** When Claude is connected to VS Code or JetBrains, it can see linter errors and run code in your editor.

**Sources:**
- [Claude Code Built-in Tools Explained](https://israynotarray.com/en/ai/2026/04/29/claude-code-built-in-tools-explained/)
- [Tool System Deep Dive](https://callsphere.ai/blog/claude-code-tool-system-explained)
- [System Prompts Repository](https://github.com/Piebald-AI/claude-code-system-prompts)

---

## 4. Hooks System

Hooks are automation triggers—code that runs automatically when certain events happen. They live in your `settings.json` under a `hooks` section.

### **Complete List of Hook Events** (21+ events)

#### **Session Lifecycle**
- **SessionStart** — When Claude Code starts or resumes
- **Stop** — When Claude finishes a response
- **StopFailure** — When a response fails due to API error
- **UserPromptSubmit** — When you press Enter

#### **Tool Execution** (The Power Hooks)
- **PreToolUse** — *Before* any tool runs (can block the action)
- **PostToolUse** — *After* successful tool completion
- **PostToolUseFailure** — When a tool fails

**Real-world examples:**
- Auto-format files after Edit/Write
- Block destructive Bash commands before they run
- Log all web searches to a file
- Send Slack notification when tests fail

#### **Permission & Security**
- **PermissionRequest** — When Claude is about to ask permission
- **PermissionDenied** — When auto mode blocks a tool

#### **Subagents**
- **SubagentStart** — When a specialized agent spawns
- **SubagentStop** — When subagent finishes

#### **File & Environment Watching**
- **FileChanged** — When a watched file changes on disk
- **CwdChanged** — When working directory changes
- **ConfigChange** — When settings.json is modified

#### **Context Management**
- **PreCompact** — Before conversation summarization
- **PostCompact** — After conversation summarized

#### **System Events**
- **Notification** — For system notifications
- **Setup** — Triggered by special CLI flags

### **How It Works**
Each hook can run:
- A shell command
- An MCP tool
- A custom skill

**Example: Auto-format TypeScript after every edit**
```json
{
  "hooks": {
    "PostToolUse": {
      "Edit(**.tsx)": {
        "command": "prettier --write $FILE"
      }
    }
  }
}
```

**Why this matters:** You describe a procedure once in settings, and it happens automatically forever. No need to remember "format before committing" or "run tests after changing API code."

**Sources:**
- [Hooks Guide](https://code.claude.com/docs/en/hooks-guide)
- [Claude Code Hooks Complete Guide](https://claudefa.st/blog/tools/hooks/hooks-guide)
- [All Hook Events with Examples](https://www.pixelmojo.io/blogs/claude-code-hooks-production-quality-ci-cd-patterns)

---

## 5. Skills vs MCP vs Plugins

These three concepts get confused because they all "extend Claude Code"—but they do very different things.

### **Comparison Table**

| Feature | **Skills** | **MCP Servers** | **Plugins** |
|---------|-----------|-----------------|-------------|
| **What it does** | Teaches Claude HOW to do something | Connects Claude TO something external | Bundles skills/MCP/hooks into one install |
| **File format** | Markdown (SKILL.md) | Server process (any language) | Directory with manifest.json |
| **Example** | "How to write commit messages" | "Connect to GitHub API" | "GitHelper: bundled skills + GitHub MCP + hooks" |
| **When to use** | You want Claude to follow a procedure | You need external data/APIs | You want to share a complete workflow |
| **Scope** | Single workflow/guideline | External system connection | Complete capability package |
| **Portability** | Cross-platform (Agent Skills standard) | Cross-platform (MCP is open standard) | Claude Code specific |
| **Installation** | Drop SKILL.md in `.claude/skills/` | Configure in settings.json or MCP marketplace | `/plugin` command |
| **Context cost** | Zero until invoked | High (tools listed upfront) | Varies (sum of bundled parts) |
| **Technical skill** | Low (write instructions) | Medium-High (build a server) | Medium (package existing pieces) |

### **How They Work Together**

**Real-world workflow:**
1. Install a **Plugin** called "Notion Workspace Manager"
2. The plugin bundles:
   - **MCP Server** that connects to Notion API
   - **Skill** that teaches Claude your documentation structure
   - **Hook** that auto-updates your changelog when code changes

So one `/plugin install` gives you connectivity (MCP) + knowledge (Skill) + automation (Hook).

### **Mental Model for Non-Engineers**

- **Skill** = Recipe (teaches Claude how to bake a cake)
- **MCP** = Kitchen appliance (gives Claude an oven to bake with)
- **Plugin** = Meal kit (comes with recipe + specialized equipment + pre-measured ingredients)

**Sources:**
- [Skills vs MCP vs Plugins Complete Guide](https://www.morphllm.com/claude-code-skills-mcp-plugins)
- [Decision Guide](https://devtoolpicks.com/blog/claude-skills-vs-mcp-connectors-vs-plugins-2026)
- [Developer's Comparison](https://skiln.co/blog/claude-code-plugins-vs-skills-vs-mcp-decision-guide)

---

## 6. Why This Matters to Knowledge Workers (Not Developers)

If you don't write code professionally, here's why understanding Claude Code's capabilities is valuable:

### **1. You don't need to code to automate your work**

**Scenario:** You copy-paste the same 10-step checklist into every project kickoff document.

**Solution:** Write it once as a Skill. Now type `/project-kickoff` and Claude generates the document following your exact process.

**No code required:** Skills are written in plain English markdown.

---

### **2. You can make Claude remember domain expertise**

**Scenario:** You're a mining engineer. Claude doesn't know your company's safety protocols.

**Solution:** Put your protocols in `CLAUDE.md`. Now every session knows your domain context without you re-explaining.

**Benefit:** Claude becomes your domain-specific assistant, not a generic chatbot.

---

### **3. You can enforce quality standards automatically**

**Scenario:** Every report needs specific sections, formatting, and legal disclaimers.

**Solution:** Create a Hook that checks documents after Claude writes them. If sections are missing, Claude auto-adds them.

**Why this matters:** Compliance and quality become automatic, not something you manually verify.

---

### **4. You can connect Claude to your actual tools**

**Scenario:** Your data lives in Google Sheets, Notion, Airtable, and internal databases.

**Solution:** Install MCP servers for each platform. Now Claude can pull live data instead of you copying it into chat.

**The magic:** "Create a summary of Q1 sales from our internal database" actually queries real data.

---

### **5. You can delegate research without losing context**

**Scenario:** You're writing a proposal. You need Claude to research 5 topics, but if you do it in one conversation, the chat becomes unreadable.

**Solution:** Claude spawns 5 Explore subagents—each researches one topic in its own context, returns a summary. Your main chat stays clean.

**Benefit:** Deep research without conversation chaos.

---

### **Example: Non-Technical Workshop Facilitator**

**Your job:** Run AI workshops for 400 mining industry professionals.

**How you use Claude Code:**

1. **Hook:** PostToolUse on any Edit to workshop slides → auto-check that examples are industry-generic, not mining-specific (your constraint from memory)

2. **Skill:** `/section-creator` that follows your exact slide structure rules (copper accent on keywords, FIG labels, etc.)

3. **MCP:** Connect to Unsplash and Wikimedia so Claude can fetch real images for prototypes

4. **Subagent:** Explore agent researches "foundation model landscape 2026" while you work on slides in main session

5. **Memory:** CLAUDE.md contains "BCE context: real mission is portable adaptability training, never on slides" so Claude knows the framing

**Result:** You orchestrate complex knowledge work without writing code. You write instructions once, Claude follows them forever.

---

### **The Core Insight**

Traditional software: You adapt to the tool's workflow.  
Claude Code: The tool adapts to YOUR workflow.

Skills, hooks, and memory files are how you teach it your procedures. MCP servers are how you connect it to your world. Subagents are how you parallelize cognitive work.

You're not "using AI"—you're delegating to a configurable assistant that remembers your standards, follows your processes, and connects to your systems.

**That's why a catalogue of built-in capabilities matters:** You need to know what's possible before you can orchestrate it.

---

## Complete Source List

**Official Documentation:**
- [Claude Code Documentation Map](https://code.claude.com/docs/en/claude_code_docs_map.md)
- [Complete Commands Reference](https://code.claude.com/docs/en/commands.md)
- [Subagents Guide](https://code.claude.com/docs/en/subagents.md)
- [Skills Documentation](https://code.claude.com/docs/en/skills.md)
- [Hooks Guide](https://code.claude.com/docs/en/hooks-guide)
- [How Claude Code Works](https://code.claude.com/docs/en/how-claude-code-works.md)

**Community Resources:**
- [Built-in Tools Explained](https://israynotarray.com/en/ai/2026/04/29/claude-code-built-in-tools-explained/)
- [Tool System Deep Dive](https://callsphere.ai/blog/claude-code-tool-system-explained)
- [System Prompts Repository](https://github.com/Piebald-AI/claude-code-system-prompts)
- [Hooks Complete Guide](https://claudefa.st/blog/tools/hooks/hooks-guide)
- [Hooks Production Patterns](https://www.pixelmojo.io/blogs/claude-code-hooks-production-quality-ci-cd-patterns)
- [Skills vs MCP vs Plugins Guide](https://www.morphllm.com/claude-code-skills-mcp-plugins)
- [Decision Guide](https://devtoolpicks.com/blog/claude-skills-vs-mcp-connectors-vs-plugins-2026)
- [Developer Comparison](https://skiln.co/blog/claude-code-plugins-vs-skills-vs-mcp-decision-guide)

---

**Document End** | Word Count: ~3,400 | Audience: Non-engineer knowledge workers | Updated: 2026-05-11
