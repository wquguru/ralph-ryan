# Ralph-Ryan Agent Instructions | Ralph-Ryan 代理指令

## Overview | 概述

**English:**
Ralph-Ryan is a Claude Code skill that works with the official `ralph-loop` plugin for autonomous iterative development. The skill provides structured PRD generation, preparation, and execution guidance. Each iteration runs with clean context, while memory persists via git history, `progress.txt`, and `prd.json`.

**中文：**
Ralph-Ryan 是一个 Claude Code 技能，与官方 `ralph-loop` 插件配合实现自主迭代开发。该技能提供结构化的 PRD 生成、准备和执行指导。每次迭代都在干净的上下文中运行，而记忆通过 git 历史、`progress.txt` 和 `prd.json` 持久化。

---

## Commands | 命令

### Skill Invocation | 技能调用

```bash
# Phase 1: Create PRD | 阶段 1：创建 PRD
/ralph-ryan prd [describe your feature]

# Phase 2: Prepare | 阶段 2：准备
/ralph-ryan prep

# Phase 3: Run | 阶段 3：运行
/ralph-loop:ralph-loop "Load skill ralph-ryan and execute run mode." --max-iterations 10 --completion-promise COMPLETE
```

### Flowchart Development | 流程图开发

```bash
# Run dev server | 运行开发服务器
cd flowchart && npm run dev

# Build | 构建
cd flowchart && npm run build
```

---

## Key Files | 关键文件

| File 文件 | Purpose 用途 |
|-----------|--------------|
| `.claude/ralph-ryan/prd.md` | PRD document PRD 文档 |
| `.claude/ralph-ryan/prd.json` | Parsed user stories 解析后的用户故事 |
| `.claude/ralph-ryan/progress.txt` | Learning log 学习记录 |
| `skills/ralph-ryan/SKILL.md` | Skill entry point 技能入口 |
| `skills/ralph-ryan/prd.md` | PRD generation instructions PRD 生成指令 |
| `skills/ralph-ryan/prep.md` | Preparation instructions 准备指令 |
| `skills/ralph-ryan/run.md` | Execution instructions 执行指令 |
| `flowchart/` | Interactive visualization 交互式流程图 |

---

## Flowchart | 流程图

The `flowchart/` directory contains an interactive visualization built with React Flow (@xyflow/react).

`flowchart/` 目录包含使用 React Flow (@xyflow/react) 构建的交互式可视化。

Key source files 关键源文件:
- `flowchart/src/App.tsx` - Main component with steps and notes 主组件（步骤和注释）
- `flowchart/src/App.css` - Styling 样式

---

## Patterns | 模式

**English:**
- Each iteration runs with clean context (fresh Claude Code session)
- Memory persists via git history, `progress.txt`, and `prd.json`
- Stories should be small enough to complete in one context window
- Always update progress.txt with discovered patterns
- Use bilingual format: "English | 中文" for all user-facing content

**中文：**
- 每次迭代都在干净的上下文中运行（新的 Claude Code 会话）
- 记忆通过 git 历史、`progress.txt` 和 `prd.json` 持久化
- 故事应该足够小，可以在一个上下文窗口中完成
- 始终将发现的模式更新到 progress.txt
- 所有面向用户的内容使用双语格式："English | 中文"

---

## Codebase Notes | 代码库注意事项

- Flowchart uses @xyflow/react with custom node types
- Steps defined in `allSteps` array with phase categorization (setup, loop, decision, done)
- Notes defined in `notes` array with `appearsWithStep` for visibility control
- Build validation: `cd flowchart && npm run build`
