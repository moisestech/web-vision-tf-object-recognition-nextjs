# 🧪 Testing Guide

This document describes the testing approach, test coverage, and how to run tests for the SOP On-Device AI Demo project.

## 📊 Test Overview

The project uses a comprehensive testing strategy with both unit tests and end-to-end (E2E) tests:

- **Unit Tests**: 6 tests covering core utilities and functions
- **E2E Tests**: 6 tests covering complete user workflows
- **Total**: 12 tests across the test suite

## 🎯 Testing Approach

### Unit Testing with Vitest

Unit tests focus on isolated functions and utilities, ensuring core logic works correctly without browser dependencies.

**Test Framework**: [Vitest](https://vitest.dev/)
- Fast execution with Vite's build system
- Jest-compatible API
- Happy DOM environment for browser API simulation

**Configuration**: `vitest.config.ts`
- Uses `happy-dom` for browser API simulation
- Path aliases configured (`@/` maps to `src/`)
- Excludes E2E tests and node_modules

### E2E Testing with Playwright

End-to-end tests verify complete user workflows in a real browser environment.

**Test Framework**: [Playwright](https://playwright.dev/)
- Cross-browser testing support
- Automatic dev server management
- Screenshot and trace capabilities

**Configuration**: `playwright.config.ts`
- Automatically starts dev server before tests
- Uses Chromium for consistent testing
- HTML reporter for test results

## 📁 Test Structure

```
tests/
  unit/                    # Unit tests
    math.test.ts          # Math utilities (2 tests)
    csv.test.ts           # CSV export (2 tests)
    image/
      resizeAndCompress.spec.ts  # Image processing (1 test)
    detect/
      drawOverlay.spec.ts # Canvas operations (1 test)
  e2e/                     # End-to-end tests
    scan.spec.ts          # Complete workflows (6 tests)
```

## ✅ Unit Tests (6 tests)

### Math Utilities (`tests/unit/math.test.ts`)
- ✅ `litersFromFill` clamps and scales correctly
- ✅ `tallyByClass` merges utensils properly

### CSV Export (`tests/unit/csv.test.ts`)
- ✅ CSV formatting with proper escaping
- ✅ Field validation

### Image Processing (`tests/unit/image/resizeAndCompress.spec.ts`)
- ✅ Image resize and compression logic

### Canvas Operations (`tests/unit/detect/drawOverlay.spec.ts`)
- ✅ Canvas state management

## 🎭 E2E Tests (6 tests)

### Complete Workflows (`tests/e2e/scan.spec.ts`)

1. **Scan → Review → Admin Flow**
   - Tests complete user journey in demo mode
   - Verifies navigation between pages
   - Ensures data persistence

2. **Municipality Selection Persists**
   - Tests municipality selection via query parameter
   - Verifies municipality persists through capture and save
   - Checks municipality display in review and admin pages

3. **CSV Export Downloads Correctly**
   - Creates test inspection
   - Verifies CSV download with correct filename format
   - Validates CSV content structure and data

4. **Poster Download Works**
   - Creates test inspection
   - Verifies poster PNG download
   - Validates PNG file format (magic number check)

5. **Handles Camera Permission Denial**
   - Tests error handling when camera access is denied
   - Verifies error UI is displayed
   - Checks for retry functionality

## 🚀 Running Tests

### Run All Unit Tests

```bash
npm test
```

### Run Unit Tests in Watch Mode

```bash
npm test -- --watch
```

### Run E2E Tests

```bash
# E2E tests (automatically starts dev server)
npm run test:e2e
```

### Run E2E Tests with UI

```bash
# Interactive Playwright UI
npm run test:e2e:ui
```

### Run Specific Test File

```bash
# Unit test
npm test tests/unit/math.test.ts

# E2E test
npm run test:e2e tests/e2e/scan.spec.ts
```

## 📈 Test Coverage

### What's Tested

✅ **Core Utilities**
- Math calculations (liters, tallies)
- CSV export formatting
- Image processing
- Canvas operations

✅ **User Workflows**
- Complete scan → review → admin flow
- Municipality selection and persistence
- Data export (CSV and PNG)
- Error handling

### What's Not Tested (Future Improvements)

- ⏳ TensorFlow.js model loading
- ⏳ Real-time detection accuracy
- ⏳ Face blurring functionality
- ⏳ IndexedDB persistence edge cases
- ⏳ Memory leak detection
- ⏳ Performance benchmarks

## 🛠️ Test Development Guidelines

### Writing Unit Tests

1. **Keep tests isolated**: Each test should be independent
2. **Use descriptive names**: Test names should describe what they verify
3. **Test edge cases**: Include boundary conditions and error cases
4. **Mock external dependencies**: Use mocks for browser APIs and TensorFlow.js

Example:
```typescript
import { describe, it, expect } from 'vitest';
import { litersFromFill } from '@/lib/math';

describe('math', () => {
  it('litersFromFill clamps negative values to 0', () => {
    expect(litersFromFill(-10, 100)).toBe(0);
  });
});
```

### Writing E2E Tests

1. **Use demo mode**: Always use `?demo=1` for consistent testing
2. **Add appropriate waits**: Wait for models to load and pages to render
3. **Test user interactions**: Click buttons, fill forms, verify navigation
4. **Verify data persistence**: Check that data is saved correctly

Example:
```typescript
test('scan → review → admin flow', async ({ page }) => {
  await page.goto('/scan?demo=1');
  await page.waitForTimeout(2000); // Wait for models
  await page.getByText('Capture').click();
  await expect(page).toHaveURL(/\/review/);
});
```

## 🐛 Debugging Tests

### Debug Unit Tests

```bash
# Run with Node debugger
node --inspect-brk node_modules/.bin/vitest
```

### Debug E2E Tests

```bash
# Run with Playwright inspector
npm run test:e2e -- --debug
```

### View E2E Test Reports

After running E2E tests, view the HTML report:
```bash
npx playwright show-report
```

## 📝 Test Maintenance

### Adding New Tests

1. **Unit tests**: Add to appropriate file in `tests/unit/`
2. **E2E tests**: Add to `tests/e2e/scan.spec.ts` or create new spec file
3. **Update this document**: Document new test coverage

### Test Naming Convention

- Unit tests: `*.test.ts` or `*.spec.ts`
- E2E tests: `*.spec.ts`
- Test files should match source file structure

## 🔗 Related Documentation

- [Development Guide](./DEVELOPMENT.md) - Development setup and tools
- [Architecture](./ARCHITECTURE.md) - System architecture
- [Logging](./LOGGING.md) - Logging system for debugging

