# Visual Design Plan - Government Style UI

## Design Philosophy

Create a professional, trustworthy government application interface that:
- Instills confidence and authority
- Maintains accessibility standards
- Provides clear visual hierarchy
- Uses consistent design patterns
- Supports efficient workflows

## Page-by-Page Design Plans

### 1. Homepage (`/`) - Landing & Municipality Selection

#### Current Issues
- Basic grid layout
- Minimal visual hierarchy
- No branding/header
- Simple municipality cards

#### Proposed Design

```
┌─────────────────────────────────────────────────────────┐
│  [Logo/Seal]  SOP Inspection System    [User Info]     │ ← Header Bar
├─────────────────────────────────────────────────────────┤
│                                                           │
│           SOP On-Device AI Inspection System              │ ← Hero Title
│     Professional Waste Management Inspection Tool        │ ← Subtitle
│                                                           │
│  ┌──────────────┐  ┌──────────────┐                      │
│  │ Open Scanner │  │  View Admin  │                      │ ← Primary Actions
│  └──────────────┘  └──────────────┘                      │
│                                                           │
│  ─────────────────────────────────────────────            │ ← Divider
│                                                           │
│  Select Municipality                                      │ ← Section Header
│                                                           │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐       │
│  │   Miami     │  │ Hallandale  │  │ Key Bisc.  │       │
│  │  [Icon]     │  │   [Icon]    │  │   [Icon]   │       │
│  │ South FL    │  │ South FL    │  │ South FL   │       │
│  │ [Badge]     │  │ [Badge]     │  │ [Badge]    │       │
│  └─────────────┘  └─────────────┘  └─────────────┘       │
│                                                           │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐       │
│  │ Ft. Laud.   │  │ Miami Beach │  │ Coral Gables│       │
│  │  [Icon]     │  │   [Icon]    │  │   [Icon]    │       │
│  │ South FL    │  │ South FL    │  │ South FL   │       │
│  │ [Badge]     │  │ [Badge]     │  │ [Badge]    │       │
│  └─────────────┘  └─────────────┘  └─────────────┘       │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

**Components to Add:**
- Header with logo/branding area
- Hero section with clear title
- Enhanced municipality cards with:
  - Icons (building/government icon)
  - Region badges
  - Hover effects
  - Better spacing
- Footer with government information

**Color Scheme:**
- Header: `bg-slate-900` with `border-b border-slate-700`
- Hero: Centered, large typography
- Cards: `bg-slate-800` with `border border-slate-700`
- Hover: `hover:border-blue-500` and `hover:bg-slate-750`

---

### 2. Scan Page (`/scan`) - Camera Interface

#### Current Issues
- Basic camera view
- Simple municipality selector
- Minimal status indicators
- Basic error handling

#### Proposed Design

```
┌─────────────────────────────────────────────────────────┐
│  [← Back]  Field Scanner              [Municipality ▼]  │ ← Header
├─────────────────────────────────────────────────────────┤
│                                                           │
│  Municipality: [Hallandale Beach ▼]  [Info Icon]        │ ← Selector Bar
│  Broward County beachfront                              │
│                                                           │
│  ┌──────────────────────────────────────────────┐        │
│  │                                              │        │
│  │         [Camera Feed with Overlay]           │        │
│  │                                              │        │
│  │         Detection Boxes & Labels            │        │
│  │                                              │        │
│  └──────────────────────────────────────────────┘        │
│                                                           │
│  Status: [●] Models Loaded  [●] Camera Active            │ ← Status Bar
│                                                           │
│  ┌──────────────────────────────────────────────┐        │
│  │     [📷 Capture & Anonymize]                  │        │ ← Primary Action
│  └──────────────────────────────────────────────┘        │
│                                                           │
│  Detection runs on-device. WebGL → WASM fallback.        │ ← Info Text
│                                                           │
└─────────────────────────────────────────────────────────┘
```

**Components to Add:**
- Professional header with navigation
- Enhanced municipality selector (shadcn Select)
- Status indicators with badges
- Better camera controls
- Loading states with progress indicators
- Alert components for errors

**Color Scheme:**
- Header: `bg-slate-900`
- Camera container: `bg-slate-950` with border
- Status badges: `bg-blue-600` for active, `bg-slate-700` for inactive
- Button: Primary blue button

---

### 3. Review Page (`/review`) - Inspection Review

#### Current Issues
- Basic card layout
- Simple data display
- Minimal visual hierarchy

#### Proposed Design

```
┌─────────────────────────────────────────────────────────┐
│  [← Back]  Review Inspection                            │ ← Header
├─────────────────────────────────────────────────────────┤
│                                                           │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Inspection Summary                              │   │
│  ├─────────────────────────────────────────────────┤   │
│  │                                                  │   │
│  │  Municipality: Hallandale Beach                 │   │
│  │  [Badge: Broward County]                        │   │
│  │                                                  │   │
│  │  ┌──────────────────────────────────────────┐   │   │
│  │  │                                          │   │   │
│  │  │      [Anonymized Image]                  │   │   │
│  │  │                                          │   │   │
│  │  └──────────────────────────────────────────┘   │   │
│  │                                                  │   │
│  │  Detection Counts:                              │   │
│  │  [🍾 12] Bottles  [☕ 8] Cups  [🍴 5] Utensils │   │
│  │                                                  │   │
│  │  Fill Level:                                    │   │
│  │  ████████████░░░░░░  75% (90L)                 │   │
│  │                                                  │   │
│  │  ────────────────────────────────────────────   │   │
│  │                                                  │   │
│  │  [Cancel]              [✓ Save Inspection]      │   │
│  └─────────────────────────────────────────────────┘   │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

**Components to Add:**
- Professional card with proper spacing
- Badge components for counts
- Progress bar for fill level
- Better button layout
- Confirmation dialog for save action

**Color Scheme:**
- Card: `bg-slate-800` with shadow
- Badges: Color-coded (blue for bottles, green for cups, etc.)
- Progress: Blue gradient
- Buttons: Primary for save, secondary for cancel

---

### 4. Admin Page (`/admin`) - Inspection Management

#### Current Issues
- Basic list layout
- No search/filter
- Simple export button
- Basic inspection cards

#### Proposed Design

```
┌─────────────────────────────────────────────────────────┐
│  [← Home]  Inspection Management                       │ ← Header
├─────────────────────────────────────────────────────────┤
│                                                           │
│  Inspections                    [📥 Export CSV]          │ ← Title Bar
│                                                           │
│  [🔍 Search...]  [Filter: All ▼]  [Sort: Date ▼]        │ ← Filters
│                                                           │
│  ┌─────────────────────────────────────────────────┐   │
│  │  ┌────┐  Inspection #001                        │   │
│  │  │Img │  Date: Jan 27, 2025  |  Hallandale     │   │
│  │  └────┘  Counts: 12 bottles, 8 cups, 5 utensils │   │
│  │          Fill: 75% (90L)                        │   │
│  │          [📄 Download Poster]                    │   │
│  ├─────────────────────────────────────────────────┤   │
│  │  ┌────┐  Inspection #002                        │   │
│  │  │Img │  Date: Jan 26, 2025  |  Miami          │   │
│  │  └────┘  Counts: 15 bottles, 10 cups, 3 utensils│   │
│  │          Fill: 82% (98L)                        │   │
│  │          [📄 Download Poster]                    │   │
│  └─────────────────────────────────────────────────┘   │
│                                                           │
│  Showing 2 of 2 inspections                              │ ← Footer
│                                                           │
└─────────────────────────────────────────────────────────┘
```

**Components to Add:**
- Professional table/card layout
- Search input component
- Filter dropdowns
- Sort functionality
- Enhanced inspection cards
- Statistics summary (optional)

**Color Scheme:**
- Header: `bg-slate-900`
- Cards: `bg-slate-800` with borders
- Search/Filter: `bg-slate-800` inputs
- Buttons: Primary for export, secondary for actions

---

## Component Library Plan

### Priority 1: Core Components
1. **Button** - Primary, secondary, outline variants
2. **Card** - For content containers
3. **Input** - For forms and search
4. **Select** - For dropdowns (municipality selector)
5. **Badge** - For status indicators and counts
6. **Separator** - For visual divisions

### Priority 2: Enhanced Components
7. **Alert** - For error messages
8. **Progress** - For fill level indicators
9. **Dialog** - For confirmations
10. **Table** - For admin data display (optional)

### Priority 3: Advanced Components
11. **Tabs** - If needed for admin sections
12. **Tooltip** - For help text
13. **Skeleton** - For loading states

## Implementation Order

1. ✅ Set up shadcn/ui configuration
2. ✅ Update color scheme in globals.css
3. Install core shadcn components (Button, Card, Input, Select, Badge)
4. Update Homepage with new design
5. Enhance Scan page UI
6. Improve Review page layout
7. Redesign Admin page
8. Add loading and error states
9. Test accessibility
10. Polish and refine

## Accessibility Checklist

- [ ] All interactive elements keyboard accessible
- [ ] Focus indicators visible on all focusable elements
- [ ] Color contrast meets WCAG AA standards (4.5:1)
- [ ] ARIA labels on icons and buttons
- [ ] Screen reader friendly navigation
- [ ] Responsive design for mobile devices
- [ ] Error messages clearly communicated

## Next Steps

1. Install shadcn/ui components using CLI
2. Create component variants for government style
3. Apply design system page by page
4. Test and iterate based on feedback

