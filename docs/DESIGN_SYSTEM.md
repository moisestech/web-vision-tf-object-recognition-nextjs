# Government-Style Design System

## Overview

This design system creates a professional, trustworthy, and accessible government application interface using shadcn/ui components and Tailwind CSS.

## Design Principles

1. **Professional & Trustworthy**: Clean, organized, and authoritative appearance
2. **Accessibility First**: High contrast, clear typography, keyboard navigation
3. **Consistency**: Unified color palette, spacing, and component patterns
4. **Clarity**: Clear hierarchy, readable text, intuitive navigation
5. **Efficiency**: Streamlined workflows for field inspectors

## Color Palette

### Primary Colors (Government Blue)
- **Primary**: `#1e40af` (Blue 800) - Main actions, headers, important elements
- **Primary Light**: `#3b82f6` (Blue 500) - Hover states, accents
- **Primary Dark**: `#1e3a8a` (Blue 900) - Active states, emphasis

### Secondary Colors
- **Secondary**: `#0f172a` (Slate 900) - Backgrounds, cards
- **Secondary Light**: `#1e293b` (Slate 800) - Hover states, borders
- **Accent**: `#06b6d4` (Cyan 500) - Highlights, success states

### Neutral Colors
- **Background**: `#0a0a0a` (Dark mode) / `#ffffff` (Light mode)
- **Surface**: `#1e293b` (Slate 800) - Cards, panels
- **Border**: `#334155` (Slate 700) - Dividers, borders
- **Text Primary**: `#f1f5f9` (Slate 100) - Main text
- **Text Secondary**: `#94a3b8` (Slate 400) - Secondary text
- **Text Muted**: `#64748b` (Slate 500) - Labels, hints

### Status Colors
- **Success**: `#10b981` (Emerald 500) - Completed, positive actions
- **Warning**: `#f59e0b` (Amber 500) - Warnings, attention needed
- **Error**: `#ef4444` (Red 500) - Errors, critical actions
- **Info**: `#3b82f6` (Blue 500) - Information, neutral states

## Typography

### Font Families
- **Sans**: System fonts (Arial, Helvetica, sans-serif) - Professional, readable
- **Mono**: Monospace for code/data display

### Font Sizes
- **Display**: `text-4xl` (36px) - Page titles
- **Heading 1**: `text-3xl` (30px) - Section headers
- **Heading 2**: `text-2xl` (24px) - Subsection headers
- **Heading 3**: `text-xl` (20px) - Card titles
- **Body**: `text-base` (16px) - Main content
- **Small**: `text-sm` (14px) - Secondary content
- **Caption**: `text-xs` (12px) - Labels, metadata

### Font Weights
- **Bold**: `font-bold` (700) - Headers, emphasis
- **Semibold**: `font-semibold` (600) - Subheaders
- **Medium**: `font-medium` (500) - Important text
- **Regular**: `font-normal` (400) - Body text

## Spacing System

Using Tailwind's spacing scale (4px base):
- **xs**: `0.5` (2px) - Tight spacing
- **sm**: `1` (4px) - Small gaps
- **md**: `2` (8px) - Medium gaps
- **lg**: `4` (16px) - Large gaps
- **xl**: `6` (24px) - Extra large gaps
- **2xl**: `8` (32px) - Section spacing

## Component Patterns

### Cards
- Background: `bg-slate-800`
- Border: `border border-slate-700`
- Padding: `p-6`
- Rounded: `rounded-lg`
- Shadow: `shadow-lg shadow-black/20`

### Buttons

**Primary Button**:
```tsx
className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-lg transition-colors"
```

**Secondary Button**:
```tsx
className="bg-slate-700 hover:bg-slate-600 text-slate-100 font-medium px-6 py-2.5 rounded-lg transition-colors"
```

**Outline Button**:
```tsx
className="border border-slate-600 hover:bg-slate-800 text-slate-200 font-medium px-6 py-2.5 rounded-lg transition-colors"
```

### Input Fields
- Background: `bg-slate-800`
- Border: `border border-slate-700`
- Focus: `focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20`
- Padding: `px-4 py-2.5`
- Rounded: `rounded-lg`

### Tables
- Header: `bg-slate-800 text-slate-200 font-semibold`
- Rows: `border-b border-slate-700`
- Hover: `hover:bg-slate-800/50`

## Page-Specific Design Plans

### 1. Homepage (`/`)
**Current State**: Basic grid with municipality cards
**Improvements**:
- Add hero section with government branding
- Professional header with logo area
- Enhanced municipality cards with icons/badges
- Clear call-to-action hierarchy
- Footer with government information

**Components to Use**:
- `Card` for municipality items
- `Button` for primary actions
- `Badge` for municipality regions
- `Separator` for section divisions

### 2. Scan Page (`/scan`)
**Current State**: Basic camera interface
**Improvements**:
- Professional header with municipality selector
- Clear status indicators
- Enhanced camera controls with icons
- Better error states with proper messaging
- Loading states with progress indicators

**Components to Use**:
- `Select` for municipality dropdown
- `Button` for capture action
- `Alert` for error messages
- `Progress` for loading states
- `Badge` for status indicators

### 3. Review Page (`/review`)
**Current State**: Basic review card
**Improvements**:
- Professional inspection summary card
- Clear data visualization
- Enhanced metadata display
- Better action buttons
- Confirmation dialogs

**Components to Use**:
- `Card` for inspection summary
- `Progress` for fill percentage
- `Badge` for counts
- `Button` for actions
- `Dialog` for confirmations
- `Separator` for sections

### 4. Admin Page (`/admin`)
**Current State**: Basic table/list
**Improvements**:
- Professional data table
- Enhanced filters and search
- Better export controls
- Improved inspection cards
- Statistics dashboard

**Components to Use**:
- `Table` for data display
- `Card` for inspection items
- `Button` for actions
- `Input` for search
- `Select` for filters
- `Dialog` for modals
- `Badge` for status indicators

## Accessibility Requirements

1. **Color Contrast**: Minimum 4.5:1 for text, 3:1 for UI components
2. **Keyboard Navigation**: All interactive elements must be keyboard accessible
3. **Focus Indicators**: Clear focus rings on all focusable elements
4. **Screen Readers**: Proper ARIA labels and semantic HTML
5. **Text Alternatives**: Alt text for images, labels for icons

## Implementation Checklist

- [ ] Set up shadcn/ui components
- [ ] Update color scheme in globals.css
- [ ] Create reusable button components
- [ ] Create card components
- [ ] Update homepage with new design
- [ ] Enhance scan page UI
- [ ] Improve review page layout
- [ ] Redesign admin page with table
- [ ] Add loading states
- [ ] Add error states
- [ ] Test accessibility
- [ ] Test responsive design

## Next Steps

1. Install shadcn/ui components as needed
2. Update globals.css with government color scheme
3. Create component variants for government style
4. Apply design system to each page incrementally
5. Test and refine based on feedback

