# Ralph-Ryan for Claude Code | Claude Code 版 Ralph-Ryan

![Ralph](ralph.jpg)

## Introduction | 简介

**English:**
Ralph-Ryan is a Claude Code skill for autonomous iterative development. It combines structured PRD generation with Claude Code's `ralph-loop` plugin - each iteration runs with clean context, while memory persists via git history and progress files.

**中文：**
Ralph-Ryan 是一个用于自主迭代开发的 Claude Code 技能。它将结构化 PRD 生成与 Claude Code 的 `ralph-loop` 插件结合——每次迭代在干净上下文中运行，记忆通过 git 历史和进度文件持久化。

Tested to compress 1-hour tasks (without Ralph Loop or with vanilla Ralph Loop) down to 20 minutes, with significantly improved quality.

实测能将无 Ralph Loop 或原生 Ralph Loop 下 1 小时的任务压缩到 20 分钟完成，且质量大大提升。

---

## Recommended Reading | 推荐阅读

> **[一文读懂Ralph Loop的四种变体：从Claude官方插件到...](https://x.com/wquguru/status/2009303499230908737?s=46)** - 深入解析 Ralph Loop 的不同变体和使用场景（中文）

---

## Prerequisites | 前置条件

- [Claude Code CLI](https://claude.ai/code) installed | 已安装
- ralph-loop plugin: `/plugin install ralph-loop@claude-plugins-official`
- Git repository | Git 仓库

---

## Setup | 设置

```bash
cp -r skills/ralph-ryan ~/.claude/skills/
```

---

## Quick Start | 快速开始

```bash
# Phase 1: Create PRD | 创建 PRD
use ralph-ryan skill, write prd for [your feature]

# Phase 2: Prepare | 准备
use ralph-ryan skill, prepare files

# Phase 3: Run | 运行
/ralph-loop "Load skill ralph-ryan and execute run mode. Read .claude/ralph-ryan/prd.json and implement stories." --max-iterations 10
```

**The loop will | 循环将：**
1. Pick highest priority story with `passes: false` | 选择优先级最高的未完成故事
2. Implement → Quality checks → Commit | 实现 → 质量检查 → 提交
3. Update `prd.json` and `progress.txt` | 更新状态和进度
4. Repeat until all stories pass | 重复直到全部完成

---

## Key Files | 关键文件

| File 文件 | Purpose 用途 |
|-----------|--------------|
| `.claude/ralph-ryan/prd.md` | PRD document | PRD 文档 |
| `.claude/ralph-ryan/prd.json` | User stories | 用户故事 |
| `.claude/ralph-ryan/progress.txt` | Learning log | 学习记录 |

---

## Core Concepts | 核心概念

### Fresh Context | 新上下文
Each iteration starts clean. Memory persists via git history, `progress.txt`, and `prd.json`.

每次迭代从干净状态开始。记忆通过 git 历史、`progress.txt` 和 `prd.json` 持久化。

### Small Tasks | 小任务
Each story should complete in one context window.

每个故事应能在一个上下文窗口内完成。

**Good | 合适:** Add a component, update an action, add a migration

**Too big | 太大:** Build entire dashboard, add authentication

---

## Flowchart | 流程图

[![Ralph Flowchart](ralph-flowchart.png)](https://snarktank.github.io/ralph/)

[View Interactive Flowchart | 查看交互式流程图](https://wquguru.github.io/ralph-ryan/)

---

## Acknowledgments | 致谢

This project is forked from [snarktank/ralph](https://github.com/snarktank/ralph) by [Ryan Carson](https://ampcode.com/). The name "ralph-ryan" honors both the Ralph pattern and its creator Ryan. Try [Amp](https://ampcode.com/) - Ryan's AI coding tool!

本项目 fork 自 [Ryan Carson](https://ampcode.com/) 的 [snarktank/ralph](https://github.com/snarktank/ralph)。"ralph-ryan" 这个名字致敬了 Ralph 模式及其创作者 Ryan。欢迎尝试 Ryan 的 AI 编码工具 [Amp](https://ampcode.com/)！
