# Agent Prompts for SOP Demo Development

This document contains prompts for each agent to continue development. Each agent should read this file and their specific section before starting work.

## Current Status

✅ **COMPLETED:**
- Next.js 15 app with TypeScript, Tailwind CSS
- All dependencies installed
- File structure created
- TensorFlow.js initialization with WebGL→WASM fallback
- COCO-SSD detection pipeline
- BlazeFace face blur
- Camera surface with detection overlay
- Review card with counter pills and fill gauge
- Admin table with CSV export
- Poster generation
- Structured logging system
- Municipality support (6 municipalities)
- All unit tests passing (6/6)
- Error boundaries and loading states
- DevHUD for memory monitoring

📋 **TODO:**
- E2E tests need Playwright setup
- Demo mode sample assets (optional)
- Additional polish and optimizations

---

## Agent A: Bootstrapping & Infrastructure ✅ COMPLETE

**Status:** This agent's work is complete. Use this as reference for future projects.

**What was done:**
- Next.js 15 app created with TypeScript, Tailwind, App Router
- All dependencies installed (TF.js, models, Zustand, LocalForage, etc.)
- `next.config.ts` configured with `optimizePackageImports`
- WASM files copied to `public/tfjs/`
- File structure created
- Global styles with button classes

**If needed to re-run:**
```bash
# Verify setup
npm install
cp node_modules/@tensorflow/tfjs-backend-wasm/dist/*.wasm public/tfjs/
npm run dev
```

---

## Agent B: TensorFlow & Camera ✅ COMPLETE

**Status:** This agent's work is complete. All TF operations are implemented with proper memory management.

**What was done:**
- `lib/tfInit.ts`: WebGL→WASM fallback with logging
- `lib/detection.ts`: COCO-SSD detection with `tf.tidy()` wrapping
- `lib/faces.ts`: BlazeFace face blur implementation
- `lib/ai/loaders.ts`: CDN-first model loading with local fallback
- `components/CameraSurface.tsx`: Full camera implementation with:
  - rAF detection loop (throttled to every 8 frames)
  - Overlay canvas drawing
  - Demo mode support
  - Municipality selector
  - Comprehensive logging

**Key Features:**
- All TF ops wrapped in `tf.tidy()` to prevent memory leaks
- Detection throttled to every 8 frames for performance
- Logging at every step for debugging
- Error handling with fallbacks

**If modifications needed:**
- Detection threshold: `lib/detection.ts` line 45 (currently 0.5)
- Throttle rate: `components/CameraSurface.tsx` line 103 (currently 8 frames)
- Overlay styling: `lib/image.ts` `drawDetections()` function

---

## Agent C: Review & Data Management ✅ COMPLETE

**Status:** This agent's work is complete. All data operations are implemented with validation.

**What was done:**
- `lib/math.ts`: `litersFromFill()` and `tallyByClass()` utilities
- `lib/schemas.ts`: Zod validation schema for inspections
- `lib/data.ts`: IndexedDB operations with LocalForage
- `lib/csv.ts`: CSV export with proper escaping
- `lib/store.ts`: Zustand store with sessionStorage persistence
- `components/ReviewCard.tsx`: Full review UI with:
  - Municipality display
  - Counter pills for adjusting counts
  - Fill gauge slider
  - Zod validation before save
- `components/CounterPills.tsx`: Interactive count adjusters
- `components/FillGauge.tsx`: Visual fill percentage indicator
- `components/AdminTable.tsx`: Inspection list with CSV export

**Key Features:**
- All saves validated with Zod before persistence
- Municipality info displayed throughout
- SessionStorage persistence for draft state
- CSV export with proper field escaping

**If modifications needed:**
- Validation rules: `lib/schemas.ts`
- Storage key: `lib/data.ts` line 5 (currently 'sop-inspections')
- CSV format: `lib/csv.ts`

---

## Agent D: Poster & Polish ✅ COMPLETE

**Status:** This agent's work is complete. Poster generation and UI polish are implemented.

**What was done:**
- `lib/poster.ts`: Poster PNG generation (1080x1350px)
  - Municipality name and date
  - Image thumbnail with rounded corners
  - Fill gauge visualization
  - Object badges (bottles, cups, utensils)
  - SOP footer
- `components/AdminTable.tsx`: Poster download per inspection
- Dark theme styling throughout
- Responsive design
- Button styles in `globals.css`
- Municipality showcase on homepage

**Key Features:**
- Posters generated client-side as PNG blobs
- High-contrast cyan theme
- Mobile-responsive layout
- Municipality cards on homepage

**If modifications needed:**
- Poster dimensions: `lib/poster.ts` lines 8-9
- Theme colors: `lib/poster.ts` and `globals.css`
- Layout: `src/app/page.tsx` for homepage

---

## Agent E: Testing & CI 🔄 IN PROGRESS

**Status:** Unit tests complete. E2E tests need Playwright setup verification.

**What was done:**
- `vitest.config.ts`: Unit test configuration
- `playwright.config.ts`: E2E test configuration
- Unit tests (all passing):
  - `tests/unit/math.test.ts`: Math utilities
  - `tests/unit/csv.test.ts`: CSV export
  - `tests/unit/image/resizeAndCompress.spec.ts`: Image processing
  - `tests/unit/detect/drawOverlay.spec.ts`: Canvas operations
- E2E test stub: `tests/e2e/scan.spec.ts`

**TODO for Agent E:**

1. **Verify E2E Test Setup:**
   ```bash
   # Install Playwright browsers
   npx playwright install
   
   # Run E2E tests
   npm run test:e2e
   ```

2. **Enhance E2E Tests:**
   - Test municipality switching
   - Test CSV export
   - Test poster download
   - Test error scenarios

3. **Add GitHub Actions (Optional):**
   Create `.github/workflows/test.yml`:
   ```yaml
   name: Tests
   on: [push, pull_request]
   jobs:
     test:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
         - run: npm ci
         - run: npm test
         - run: npx playwright install
         - run: npm run test:e2e
   ```

4. **Add Test Coverage:**
   - Consider adding `@vitest/coverage-v8`
   - Add coverage reporting to CI

**Current Test Status:**
- ✅ 6/6 unit tests passing
- ⏳ E2E tests need verification

---

## Agent Hand-off Protocol

### Before Starting Work:

1. **Read this file** to understand what's been done
2. **Run tests** to verify current state:
   ```bash
   npm test
   ```
3. **Check logs** in development mode to see what's working
4. **Review related files** mentioned in your agent section

### While Working:

1. **Use structured logging:**
   ```typescript
   import { log } from '@/lib/utils/logger';
   log.info('category', 'Message', { data: 'value' });
   ```

2. **Follow existing patterns:**
   - All TF ops in `tf.tidy()`
   - Zod validation before saves
   - Error boundaries around components
   - Municipality support throughout

3. **Update tests** if you change functionality

4. **Leave TODO comments** for complex areas:
   ```typescript
   // TODO(Agent-X): Add feature Y when Z is ready
   ```

### After Completing Work:

1. **Run tests:**
   ```bash
   npm test
   npm run test:e2e  # If applicable
   ```

2. **Update this file** with what you completed

3. **Document any new patterns** or conventions

4. **Check for linting errors:**
   ```bash
   npm run lint
   ```

---

## Quick Reference: File Locations

### Core Logic
- `src/lib/tfInit.ts` - TensorFlow initialization
- `src/lib/detection.ts` - Object detection
- `src/lib/faces.ts` - Face blur
- `src/lib/math.ts` - Calculations
- `src/lib/data.ts` - IndexedDB operations
- `src/lib/csv.ts` - CSV export
- `src/lib/poster.ts` - Poster generation
- `src/lib/store.ts` - State management
- `src/lib/utils/logger.ts` - Logging system

### Components
- `src/components/CameraSurface.tsx` - Main camera component
- `src/components/ReviewCard.tsx` - Review page
- `src/components/AdminTable.tsx` - Admin panel
- `src/components/LogViewer.tsx` - Dev log viewer
- `src/components/DevHUD.tsx` - Memory monitor

### Pages
- `src/app/page.tsx` - Homepage with municipality showcase
- `src/app/scan/page.tsx` - Scanner page
- `src/app/review/page.tsx` - Review page
- `src/app/admin/page.tsx` - Admin page

### Tests
- `tests/unit/` - Unit tests
- `tests/e2e/` - E2E tests
- `vitest.config.ts` - Unit test config
- `playwright.config.ts` - E2E test config

---

## Common Issues & Solutions

### Memory Leaks
- Check DevHUD tensor count
- Ensure all TF ops in `tf.tidy()`
- Use `logTfMem()` utility

### Tests Failing
- Check canvas context mocking
- Verify happy-dom environment
- Check test exclusions in `vitest.config.ts`

### Logs Not Showing
- Ensure `NODE_ENV=development`
- Check LogViewer component is mounted
- Verify logger is imported correctly

### Municipality Not Saving
- Check `lib/store.ts` for default municipality
- Verify `lib/data.ts` save function
- Check browser console for errors

---

## Next Steps for Future Agents

1. **Performance Optimization:**
   - Lazy load models
   - Optimize image compression
   - Add service worker for caching

2. **Features:**
   - Filter inspections by municipality
   - Search functionality
   - Batch poster export
   - Statistics dashboard

3. **Accessibility:**
   - ARIA labels
   - Keyboard navigation
   - Screen reader support

4. **Mobile:**
   - Touch gestures
   - Mobile-specific UI
   - Camera orientation handling





