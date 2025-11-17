# shadcn/ui Setup & Implementation Guide

## ✅ Already Completed

1. ✅ Installed dependencies: `class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-react`
2. ✅ Created `components.json` configuration
3. ✅ Created `src/lib/utils.ts` with `cn()` helper
4. ✅ Updated `globals.css` with government color scheme
5. ✅ Created design system documentation

## Next Steps: Install shadcn/ui Components

Run these commands to install the components we need:

```bash
# Core components (Priority 1)
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add select
npx shadcn@latest add badge
npx shadcn@latest add separator

# Enhanced components (Priority 2)
npx shadcn@latest add alert
npx shadcn@latest add progress
npx shadcn@latest add dialog

# Optional components (Priority 3)
npx shadcn@latest add table
npx shadcn@latest add tooltip
npx shadcn@latest add skeleton
```

## Component Usage Examples

### Button
```tsx
import { Button } from "@/components/ui/button"

<Button>Primary Action</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>
```

### Card
```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Inspection Summary</CardTitle>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
</Card>
```

### Badge
```tsx
import { Badge } from "@/components/ui/badge"

<Badge>Active</Badge>
<Badge variant="secondary">Inactive</Badge>
<Badge variant="outline">Pending</Badge>
```

### Select (Municipality Selector)
```tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select municipality" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="demo-miami">Miami</SelectItem>
    <SelectItem value="demo-hallandale">Hallandale Beach</SelectItem>
  </SelectContent>
</Select>
```

### Input (Search)
```tsx
import { Input } from "@/components/ui/input"

<Input placeholder="Search inspections..." />
```

### Alert (Error Messages)
```tsx
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

<Alert variant="destructive">
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Camera access denied</AlertDescription>
</Alert>
```

### Progress (Fill Level)
```tsx
import { Progress } from "@/components/ui/progress"

<Progress value={75} className="w-full" />
```

### Dialog (Confirmations)
```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Confirm Save</DialogTitle>
      <DialogDescription>Save this inspection?</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="outline">Cancel</Button>
      <Button>Save</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

## Customization for Government Style

After installing components, you may want to customize them. Components are in `src/components/ui/` and can be modified directly.

### Common Customizations

1. **Button sizes**: Adjust padding in button component
2. **Card shadows**: Modify shadow values in card component
3. **Color variants**: Add custom variants using the government color scheme
4. **Typography**: Ensure consistent font sizes and weights

## Implementation Checklist

- [ ] Install Priority 1 components (Button, Card, Input, Select, Badge, Separator)
- [ ] Test components render correctly
- [ ] Update Homepage with new components
- [ ] Update Scan page with Select and enhanced UI
- [ ] Update Review page with Card and Badge components
- [ ] Update Admin page with improved layout
- [ ] Install Priority 2 components (Alert, Progress, Dialog)
- [ ] Add error states and loading states
- [ ] Test accessibility
- [ ] Polish and refine

## Quick Start Command

To install all Priority 1 components at once:

```bash
npx shadcn@latest add button card input select badge separator
```

Then test by updating one page at a time, starting with the homepage.

