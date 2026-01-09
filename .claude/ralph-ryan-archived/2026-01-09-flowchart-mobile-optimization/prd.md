# PRD: Flowchart 优化

## 1. Introduction

优化 Ralph-Ryan 工作流程图项目，使其在移动端有良好体验，简化节点标题显示，并通过图标区分手动/自动步骤。

**问题：**
- 当前布局在移动端显示不佳，节点太宽、标题太长
- 标题双语格式冗长（如 "Write PRD | 编写 PRD"）
- 无法直观区分哪些步骤需要手动调用，哪些是自动执行

---

## 2. Goals

- 移动端完整可用，支持响应式布局、触摸手势、简化视图
- 标题精简为紧凑双语格式（如 "写PRD / PRD"）
- 手动步骤（PRD、Prep、Run Loop）添加手形图标标记，自动步骤添加齿轮图标

---

## 3. User Stories

### US-001: 响应式节点尺寸
**Description:** As a mobile user, I want nodes to scale appropriately on smaller screens so that I can view the flowchart clearly.

**Acceptance Criteria:**
- [ ] 节点宽度在移动端（<768px）缩小为 180px
- [ ] 节点字体在移动端适当缩小（标题 13px，描述 10px）
- [ ] CSS 使用媒体查询实现响应式
- [ ] Typecheck passes

### US-002: 简化标题格式
**Description:** As a user, I want shorter bilingual titles so that nodes are more compact and readable.

**Acceptance Criteria:**
- [ ] 标题格式改为 "中文 / English"，如 "写PRD / PRD"
- [ ] 描述文字同样精简
- [ ] 更新 allSteps 数组中所有节点的 label 和 description
- [ ] Typecheck passes

### US-003: 手动步骤图标标记
**Description:** As a user, I want manual steps to have a hand icon so that I can distinguish them from automatic steps.

**Acceptance Criteria:**
- [ ] CustomNode 组件根据节点 ID 判断是否为手动步骤（ID 1, 2, 3）
- [ ] 手动步骤在标题前显示 "👆" 图标
- [ ] 自动步骤在标题前显示 "⚙️" 图标
- [ ] 图标与标题间有适当间距
- [ ] Typecheck passes

### US-004: 移动端触摸手势优化
**Description:** As a mobile user, I want smooth touch interactions so that I can navigate the flowchart easily.

**Acceptance Criteria:**
- [ ] 确保 ReactFlow 的 zoomOnPinch 启用（已启用）
- [ ] 移动端禁用 hover 效果（使用 @media (hover: hover) 媒体查询）
- [ ] 控制按钮在移动端增大点击区域（最小 44px）
- [ ] Typecheck passes

### US-005: 移动端简化视图
**Description:** As a mobile user, I want a cleaner view on small screens so that the flowchart is not cluttered.

**Acceptance Criteria:**
- [ ] 移动端（<768px）隐藏 note 节点
- [ ] 移动端隐藏节点描述文字，只显示标题
- [ ] 可通过 CSS 或 JS 检测屏幕宽度实现
- [ ] Typecheck passes

### US-006: 控制栏移动端适配
**Description:** As a mobile user, I want the control bar to be usable on small screens.

**Acceptance Criteria:**
- [ ] 控制按钮在移动端使用更紧凑布局
- [ ] 按钮文字可缩短或改用图标（← / →）
- [ ] 步骤计数器保持可见
- [ ] Typecheck passes

---

## 4. Functional Requirements

- FR-1: 系统必须在屏幕宽度 < 768px 时应用移动端样式
- FR-2: 系统必须为手动步骤（节点 1, 2, 3）显示 👆 图标
- FR-3: 系统必须为自动步骤（节点 4-10）显示 ⚙️ 图标
- FR-4: 系统必须在移动端隐藏 note 节点和节点描述
- FR-5: 系统必须保持触摸手势功能正常

---

## 5. Non-Goals

- 不添加多语言切换功能（保持双语显示）
- 不重新设计整体布局或颜色方案
- 不添加新的流程节点
- 不修改节点间的连接关系

---

## 6. Technical Considerations

- 使用 CSS 媒体查询 `@media (max-width: 767px)` 实现响应式
- 使用 `@media (hover: hover)` 区分触摸和鼠标设备
- 手动/自动判断逻辑：`['1', '2', '3'].includes(nodeId)` 为手动
- React Flow 已支持触摸手势，无需额外库
