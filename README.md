# Ralph-Ryan for Claude Code | Claude Code 版 Ralph-Ryan

![Ralph](ralph.webp)

## Introduction | 简介

**English:**
Ralph-Ryan is a Claude Code skill that enhances the official `ralph-loop` plugin with structured PRD generation, preparation, and execution guidance. It transforms the original [Ralph pattern](https://ghuntley.com/ralph/) (designed for Amp) into a Claude Code-native workflow.

The core innovation is combining the `ralph-ryan` skill with Claude Code's official `ralph-loop` plugin for autonomous iterative development. Each iteration runs with clean context, while memory persists via git history, `progress.txt`, and `prd.json`.

**中文：**
Ralph-Ryan 是一个 Claude Code 技能，通过结构化的 PRD 生成、准备和执行指导来增强官方 `ralph-loop` 插件。它将原始的 [Ralph 模式](https://ghuntley.com/ralph/)（为 Amp 设计）转化为 Claude Code 原生工作流。

核心创新在于将 `ralph-ryan` 技能与 Claude Code 官方的 `ralph-loop` 插件结合，实现自主迭代开发。每次迭代都在干净的上下文中运行，而记忆通过 git 历史、`progress.txt` 和 `prd.json` 持久化。

---

## Three-Phase Workflow | 三阶段工作流

```
Phase 1: PRD     →  Phase 2: Prep     →  Phase 3: Run
阶段 1：编写 PRD  →  阶段 2：准备文件  →  阶段 3：运行循环
```

---

## Prerequisites | 前置条件

**English:**
- [Claude Code CLI](https://claude.ai/code) installed and authenticated
- ralph-loop plugin installed: `/plugin install ralph-loop@claude-plugins-official`
- A git repository for your project

**中文：**
- 已安装并认证 [Claude Code CLI](https://claude.ai/code)
- 已安装 ralph-loop 插件：`/plugin install ralph-loop@claude-plugins-official`
- 项目需要是 git 仓库

---

## Setup | 设置

Copy the skill to your Claude Code skills directory:

将技能复制到 Claude Code 技能目录：

```bash
cp -r skills/ralph-ryan ~/.claude/skills/
```

---

## Quick Start | 快速开始

```bash
# Phase 1: Create PRD | 阶段 1：创建 PRD
use ralph-ryan skill, write prd for [your feature]

# Phase 2: Prepare | 阶段 2：准备
use ralph-ryan skill, prepare files

# Phase 3: Run | 阶段 3：运行
/ralph-loop "Load skill ralph-ryan and execute run mode. Read .claude/ralph-ryan/prd.json and implement stories." --max-iterations 10
```

---

## Workflow Details | 工作流详情

### Phase 1: Create PRD | 阶段 1：创建 PRD

Use the ralph-ryan skill to generate a structured PRD:

使用 ralph-ryan 技能生成结构化的 PRD：

```
use ralph-ryan skill, write prd for [your feature description]
```

The skill will:
- Ask 3-5 clarifying questions
- Generate a structured PRD with user stories
- Save to `.claude/ralph-ryan/prd.md`

技能将：
- 询问 3-5 个澄清问题
- 生成包含用户故事的结构化 PRD
- 保存到 `.claude/ralph-ryan/prd.md`

### Phase 2: Prepare | 阶段 2：准备

Convert the PRD to executable format:

将 PRD 转换为可执行格式：

```
use ralph-ryan skill, prepare files
```

This creates:
- `.claude/ralph-ryan/prd.json` - User stories for autonomous execution
- `.claude/ralph-ryan/progress.txt` - Learning log

这将创建：
- `.claude/ralph-ryan/prd.json` - 用于自主执行的用户故事
- `.claude/ralph-ryan/progress.txt` - 学习记录日志

### Phase 3: Run | 阶段 3：运行

Start the autonomous loop:

启动自主循环：

```
/ralph-loop "Load skill ralph-ryan and execute run mode. Read .claude/ralph-ryan/prd.json and implement stories." --max-iterations 10
```

The loop will:
1. Pick the highest priority story where `passes: false`
2. Implement that single story
3. Run quality checks (typecheck, tests)
4. Commit if checks pass
5. Update `prd.json` to mark story as `passes: true`
6. Append learnings to `progress.txt`
7. Repeat until all stories pass or max iterations reached

循环将：
1. 选择优先级最高且 `passes: false` 的故事
2. 实现该故事
3. 运行质量检查（类型检查、测试）
4. 检查通过则提交
5. 更新 `prd.json` 将故事标记为 `passes: true`
6. 将学习记录追加到 `progress.txt`
7. 重复直到所有故事通过或达到最大迭代次数

---

## Key Files | 关键文件

| File 文件 | Purpose 用途 |
|-----------|--------------|
| `.claude/ralph-ryan/prd.md` | PRD document PRD 文档 |
| `.claude/ralph-ryan/prd.json` | Parsed user stories 解析后的用户故事 |
| `.claude/ralph-ryan/progress.txt` | Learning log 学习记录 |
| `skills/ralph-ryan/` | The skill files 技能文件 |
| `flowchart/` | Interactive visualization 交互式流程图 |

---

## Critical Concepts | 核心概念

### Each Iteration = Fresh Context | 每次迭代 = 新上下文

Each iteration runs with **clean context**. Memory persists via:
- Git history (commits from previous iterations)
- `progress.txt` (learnings and context)
- `prd.json` (which stories are done)

每次迭代都在**干净的上下文**中运行。记忆通过以下方式持久化：
- Git 历史（之前迭代的提交）
- `progress.txt`（学习和上下文）
- `prd.json`（哪些故事已完成）

### Small Tasks | 小任务

Each PRD item should be small enough to complete in one context window.

每个 PRD 项目应该足够小，可以在一个上下文窗口中完成。

**Right-sized stories 合适大小的故事:**
- Add a database column and migration 添加数据库列和迁移
- Add a UI component to an existing page 向现有页面添加 UI 组件
- Update a server action with new logic 用新逻辑更新服务器操作

**Too big (split these) 太大（需要拆分）:**
- "Build the entire dashboard" "构建整个仪表板"
- "Add authentication" "添加认证"
- "Refactor the API" "重构 API"

### Feedback Loops | 反馈循环

Ralph only works with feedback loops:
- Typecheck catches type errors
- Tests verify behavior
- CI must stay green

Ralph 只有在有反馈循环时才能工作：
- 类型检查捕获类型错误
- 测试验证行为
- CI 必须保持绿色

### Stop Condition | 停止条件

When all stories have `passes: true`, the loop outputs `<promise>COMPLETE</promise>` and exits.

当所有故事的 `passes: true` 时，循环输出 `<promise>COMPLETE</promise>` 并退出。

---

## Flowchart | 流程图

[![Ralph Flowchart](ralph-flowchart.png)](https://snarktank.github.io/ralph/)

**[View Interactive Flowchart | 查看交互式流程图](https://snarktank.github.io/ralph/)**

To run locally 本地运行:

```bash
cd flowchart
npm install
npm run dev
```

---

## Debugging | 调试

```bash
# See which stories are done | 查看哪些故事已完成
cat .claude/ralph-ryan/prd.json | jq '.userStories[] | {id, title, passes}'

# See learnings | 查看学习记录
cat .claude/ralph-ryan/progress.txt

# Check git history | 查看 git 历史
git log --oneline -10
```

---

## Acknowledgments | 致谢

This project is based on [Geoffrey Huntley's Ralph pattern](https://ghuntley.com/ralph/). The original concept of autonomous AI agent loops with persistent memory was pioneered by Geoffrey Huntley.

本项目基于 [Geoffrey Huntley 的 Ralph 模式](https://ghuntley.com/ralph/)。自主 AI 代理循环与持久化记忆的原始概念由 Geoffrey Huntley 开创。
