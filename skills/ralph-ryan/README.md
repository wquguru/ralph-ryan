# Ralph Loop Ryan

Autonomous AI agent that implements features iteratively through PRD-driven development.

Based on [Geoffrey Huntley's Ralph pattern](https://ghuntley.com/ralph/) and [Ryan Carson's implementation](https://x.com/ryancarson/status/2008548371712135632).

## Overview

Ralph is an autonomous loop that runs Claude Code repeatedly until all PRD items are complete. Each iteration is a fresh instance with clean context. Memory persists via git history, `progress.txt`, and `prd.json`.

## Installation

Before using this skill, you need to install the ralph-loop plugin:

**Step 1: Add the official marketplace**
```bash
/plugin marketplace add anthropics/claude-plugins-official
```

**Step 2: Install the ralph-loop plugin**
```bash
/plugin install ralph-loop@claude-plugins-official
```

Make sure to upgrade Claude Code to the latest version before installation.

## Workflow

```
# Workflow
# Step1: manual
/ralph-ryan prd [describe your feature]

# Step2: manual
/ralph-ryan prep

# Step3: manual + auto
/ralph-loop:ralph-loop "Load skill ralph-ryan and execute run mode." --max-iterations 10 --completion-promise COMPLETE
```

## Directory Structure

```
.claude/ralph-ryan/
├── prd.md          # Human-readable PRD (step 1 output)
├── prd.json        # Machine-readable stories (step 3 output)
└── progress.txt    # Learnings for future iterations

.claude/ralph-ryan-archived/
└── 2025-01-09-task-priority/   # Archived after successful completion
    ├── prd.md
    ├── prd.json
    └── progress.txt
```

## Commands

### 1. Generate PRD

```bash
/ralph-ryan prd Add a task priority system with filtering
```

Creates `.claude/ralph-ryan/prd.md` with:
- Clarifying questions (lettered options)
- User stories sized for single iterations
- Verifiable acceptance criteria

### 2. Prepare for Execution

```bash
/ralph-ryan prep
```

Converts `.claude/ralph-ryan/prd.md` → `.claude/ralph-ryan/prd.json` and initializes `.claude/ralph-ryan/progress.txt`.

### 3. Execute

```bash
/ralph-loop:ralph-loop "/ralph-ryan run" --max-iterations 10
```

Ralph will:
1. Read prd.json and progress.txt
2. Pick highest priority story where `passes: false`
3. Implement that single story
4. Run quality checks
5. Commit if checks pass
6. Update prd.json to mark story complete
7. Append learnings to progress.txt
8. Repeat until all stories pass

## Key Concepts

### Each Iteration = Fresh Context

Each iteration spawns a **new instance** with clean context. Memory persists only via:
- Git history (commits from previous iterations)
- `progress.txt` (learnings and patterns)
- `prd.json` (which stories are done)

### Small Tasks

Each story must complete in **one context window**. If too big, the LLM runs out of context and produces poor code.

**Right-sized:**
- Add a database column and migration
- Add a UI component to existing page
- Update a server action

**Too big (split these):**
- "Build entire dashboard"
- "Add authentication"

### Stop Condition

When all stories have `passes: true`, Ralph outputs `<promise>COMPLETE</promise>` and the loop exits.

## Debugging

```bash
# See which stories are done
cat .claude/ralph-ryan/prd.json | jq '.userStories[] | {id, title, passes}'

# See learnings from previous iterations
cat .claude/ralph-ryan/progress.txt

# Check git history
git log --oneline -10
```

## Files

| File | Purpose |
|------|---------|
| `SKILL.md` | Entry point with routing logic |
| `prd.md` | PRD generation instructions |
| `prep.md` | Preparation/conversion instructions |
| `run.md` | Execution instructions |
