# PRD: Flowchart Mobile Optimization

## 1. Introduction

The Ralph-Ryan flowchart application currently has poor mobile user experience. On mobile devices (e.g., iPhone 12 with 390x844 viewport), the flowchart only displays a small portion of nodes in the top-left corner, requiring users to manually zoom and pan to view the full diagram.

This PRD addresses the mobile experience by:
1. Fixing the initial fitView behavior
2. Implementing automatic layout switching for mobile devices
3. Disabling edit functionality on mobile for a cleaner view-only experience

## 2. Goals

- Flowchart displays fully visible on mobile devices upon initial load
- Automatic detection and switching between desktop/mobile layouts
- Mobile layout uses compact vertical arrangement optimized for small screens
- Disable drag/edit functionality on mobile for simplified viewing
- Maintain full desktop functionality unchanged

## 3. User Stories

### US-001: Fix Initial FitView on Mobile

**Description:** As a mobile user, I want the flowchart to fit the screen properly when the page loads so that I can see all visible nodes without manual zooming.

**Acceptance Criteria:**
- [ ] Add `onInit` callback to ReactFlow to trigger fitView after initialization
- [ ] Increase `fitViewOptions.padding` from 0.2 to 0.3
- [ ] First node is fully visible and centered on initial load
- [ ] Typecheck passes

### US-002: Add Mobile Detection Hook

**Description:** As a developer, I want a reusable hook to detect mobile viewport so that components can adapt their behavior.

**Acceptance Criteria:**
- [ ] Create `useIsMobile` hook in `src/hooks/useIsMobile.ts`
- [ ] Hook returns `true` when viewport width <= 767px
- [ ] Hook updates on window resize
- [ ] Hook uses `matchMedia` for efficient detection
- [ ] Typecheck passes

### US-003: Create Mobile-Optimized Node Positions

**Description:** As a mobile user, I want a compact vertical layout so that the flowchart fits better on narrow screens.

**Acceptance Criteria:**
- [ ] Create `mobilePositions` object with tighter x/y coordinates
- [ ] Mobile layout uses vertical arrangement (max x around 200px)
- [ ] Reduce vertical spacing between nodes for better fit
- [ ] Export both `positions` and `mobilePositions` from a positions config
- [ ] Typecheck passes

### US-004: Implement Automatic Layout Switching

**Description:** As a user, I want the app to automatically use the appropriate layout based on my device so that I get the best experience without manual intervention.

**Acceptance Criteria:**
- [ ] Use `useIsMobile` hook in App component
- [ ] Switch between `positions` and `mobilePositions` based on device
- [ ] Update `nodePositions.current` when layout changes
- [ ] Call fitView after layout switch
- [ ] Typecheck passes

### US-005: Disable Edit Mode on Mobile

**Description:** As a mobile user, I want a view-only experience so that I don't accidentally move nodes while scrolling.

**Acceptance Criteria:**
- [ ] Set `nodesDraggable={false}` on mobile
- [ ] Set `nodesConnectable={false}` on mobile
- [ ] Set `edgesReconnectable={false}` on mobile
- [ ] Set `elementsSelectable={false}` on mobile
- [ ] Keep pan and zoom enabled for navigation
- [ ] Typecheck passes

### US-006: Verify Mobile Experience with Browser Tool

**Description:** As a developer, I want to verify the mobile optimization works correctly using agent-browser.

**Acceptance Criteria:**
- [ ] Use agent-browser to open page with iPhone 12 viewport
- [ ] Verify flowchart is fully visible on initial load
- [ ] Verify navigation buttons work correctly
- [ ] Verify nodes cannot be dragged on mobile
- [ ] Take screenshot to confirm layout
- [ ] Typecheck passes

## 4. Functional Requirements

- FR-1: The system must detect mobile devices using viewport width (breakpoint: 767px)
- FR-2: The system must use a compact vertical layout on mobile devices
- FR-3: The system must fit the flowchart to screen on initial load
- FR-4: The system must disable node editing on mobile devices
- FR-5: The system must maintain pan/zoom functionality on mobile for navigation
- FR-6: The system must preserve all desktop functionality unchanged

## 5. Non-Goals

- Landscape orientation specific optimization
- Tablet-specific layout (use desktop layout)
- Touch gesture hints or tutorials
- Offline support
- PWA features

## 6. Technical Considerations

- Use `window.matchMedia('(max-width: 767px)')` for mobile detection
- ReactFlow's `onInit` callback provides access to the ReactFlow instance for programmatic fitView
- Mobile positions should keep all nodes within ~200px width for optimal viewing
- Consider using `useRef` to store ReactFlow instance for fitView calls
