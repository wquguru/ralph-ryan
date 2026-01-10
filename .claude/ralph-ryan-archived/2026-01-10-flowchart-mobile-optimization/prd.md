# PRD: Flowchart 移动端体验优化

## 1. Introduction

优化 Ralph-Ryan 流程图在移动端的显示体验。当前存在两个主要问题：
1. 底部导航控件位置过低，与 React Flow 控制面板之间存在大量空白
2. 流程图节点缺少左侧边距，被截断显示

## 2. Goals

- 移动端导航控件位置合理，减少不必要的空白区域
- 流程图节点在移动端有适当的边距，不被截断
- 切换步骤时自动聚焦到当前节点，提供更好的浏览体验
- 保持桌面端现有体验不变

## 3. User Stories

### US-001: 优化移动端导航控件位置

**Description:** 作为移动端用户，我希望导航控件（Previous/Next/Reset）位置更合理，这样我可以更方便地操作。

**Acceptance Criteria:**
- [ ] 移动端 (max-width: 767px) 导航控件紧贴在 React Flow 控制面板下方
- [ ] 移动端隐藏 React Flow 自带的控制面板（缩放按钮），简化界面
- [ ] 桌面端保持原有布局不变
- [ ] Typecheck passes
- [ ] Verify in browser using Playwright MCP (viewport: 375x667)

### US-002: 添加流程图左侧边距

**Description:** 作为移动端用户，我希望流程图节点有足够的左侧边距，这样节点不会被截断。

**Acceptance Criteria:**
- [ ] 移动端流程图区域有足够的 padding（左右至少 16px）
- [ ] fitView 配置增加 padding 值，确保节点不贴边
- [ ] 初始显示时节点完整可见
- [ ] Typecheck passes
- [ ] Verify in browser using Playwright MCP (viewport: 375x667)

### US-003: 移动端步骤切换时聚焦当前节点

**Description:** 作为移动端用户，我希望切换步骤时自动聚焦到当前节点，这样我可以清楚看到当前步骤的内容。

**Acceptance Criteria:**
- [ ] 点击 Next/Previous 时，视图自动平移到新显示的节点
- [ ] 使用 ReactFlow 的 fitView 或 setCenter API 实现聚焦
- [ ] 聚焦动画平滑过渡
- [ ] 桌面端可选择保持原有行为或同步优化
- [ ] Typecheck passes
- [ ] Verify in browser using Playwright MCP (viewport: 375x667)

## 4. Functional Requirements

- FR-1: 移动端 (max-width: 767px) 隐藏 React Flow 控制面板
- FR-2: 移动端导航控件使用 absolute/fixed 定位，位于流程图区域底部
- FR-3: 移动端 fitView padding 值增加到 0.3 或更高
- FR-4: 步骤切换时调用 fitView 或 setCenter 聚焦到当前可见节点
- FR-5: 所有样式修改仅影响移动端，桌面端保持不变

## 5. Non-Goals

- 不改变节点的实际布局坐标
- 不新增功能按钮或交互
- 不修改桌面端的任何行为
- 不改变流程图的业务逻辑

## 6. Technical Considerations

- 使用 CSS media query `@media (max-width: 767px)` 区分移动端
- React Flow 提供 `useReactFlow` hook，可获取 `fitView` 和 `setCenter` 方法
- 需要使用 `ReactFlowProvider` 包装组件以使用 hook
- fitViewOptions 的 padding 参数控制边距
- 可通过 CSS 隐藏 `.react-flow__controls` 控制面板
