---
name: ralph-ryan
description: "Ralph autonomous agent for iterative development. Use 'ralph prd' to create PRD, 'ralph prep' to prepare execution, 'ralph run' to execute stories. Triggers on: ralph prd, ralph prep, ralph run, ralph go."
---

# Ralph Agent

Autonomous coding agent that implements user stories iteratively.

---

## Routing

Based on user intent, load the corresponding instruction file:

| Intent | Keywords | Action |
|--------|----------|--------|
| **PRD** | prd, create, generate, plan | Read `{baseDir}/prd.md` |
| **Prep** | prep, prepare, convert, setup | Read `{baseDir}/prep.md` |
| **Run** | run, execute, go, start | Read `{baseDir}/run.md` |

---

## Shared Configuration

| Item | Path |
|------|------|
| Working directory | `.claude/ralph-ryan/` |
| PRD markdown | `.claude/ralph-ryan/prd.md` |
| PRD JSON | `.claude/ralph-ryan/prd.json` |
| Progress log | `.claude/ralph-ryan/progress.txt` |
| Archived runs | `.claude/ralph-ryan-archived/<date>-<featureName>/` |

---

## Quick Reference

```bash
# Workflow
# Step1: manual
/ralph-ryan prd [describe your feature]

# Step2: manual
/ralph-ryan prep

# Step3: manual + auto
/ralph-loop:ralph-loop "Load skill ralph-ryan and execute run mode." --max-iterations 10 --completion-promise COMPLETE
```

IMPORTANT NOTE: there are two `ralph-loop` in the command `/ralph-loop:ralph-loop`, don't trim it.
