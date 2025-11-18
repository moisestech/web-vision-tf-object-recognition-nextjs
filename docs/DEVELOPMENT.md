# 💻 Development Guide

This document covers development setup, tools, debugging, and best practices for working on the SOP On-Device AI Demo project.

## 🚀 Development Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Modern browser (Chrome, Firefox, Safari, Edge)

### Initial Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Copy WASM Files**
   ```bash
   cp node_modules/@tensorflow/tfjs-backend-wasm/dist/*.wasm public/tfjs/
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Open Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Structured Logging

The app includes a comprehensive logging system for debugging and monitoring. See the [Logging Documentation](./LOGGING.md) for complete details.

### Quick Start

```typescript
import { log } from '@/lib/utils/logger';

log.info('category', 'Message', { data: 'value' });
log.error('category', 'Error message', error, { context: 'data' });
```

### Log Viewer (Development Mode)

In development mode, a LogViewer component automatically appears in the top-left corner showing:
- Real-time logs with categories and levels
- Structured data for each log entry
- Export logs as JSON
- Clear logs button

### Log Categories

- `tf-init`: TensorFlow.js initialization
- `detection`: Object detection operations
- `camera`: Camera and capture operations
- `review`: Review page actions
- `data`: Data persistence operations
- `store`: State management

### Log Levels

- 🐛 `debug`: Detailed debugging information
- ℹ️ `info`: General information about operations
- ⚠️ `warn`: Warning messages
- ❌ `error`: Error messages with stack traces

## 💾 Memory Monitoring

### DevHUD (Development Mode)

In development mode, a DevHUD appears showing:
- **TensorFlow Backend**: Current backend (webgl/wasm)
- **Tensor Count**: Number of active tensors (watch for leaks)
- **Memory Usage**: Current memory consumption

### Memory Leak Detection

Use the memory monitor utility to track TensorFlow.js memory usage:

```typescript
import { logTfMem } from '@/lib/utils/dev/memory';

// Start monitoring (logs every 2 seconds)
const stop = logTfMem(2000);

// ... do work ...

// Stop monitoring
stop();
```

### Best Practices

1. **Wrap TF Operations**: Always wrap TensorFlow operations in `tf.tidy()`
   ```typescript
   const result = tf.tidy(() => {
     // TensorFlow operations
     return someTFOperation();
   });
   ```

2. **Monitor Tensor Count**: Watch the DevHUD tensor count - it should not grow unbounded
3. **Check for Leaks**: Use `logTfMem()` during development to catch memory leaks early

### Memory Management

- All detection operations are wrapped in `tf.tidy()`
- Models are loaded once and reused
- Canvas operations properly clean up resources
- Image processing uses efficient compression

## 🛠️ Development Tools

### TypeScript

The project uses TypeScript for type safety:
- Strict mode enabled
- Path aliases configured (`@/` maps to `src/`)
- Type definitions for all dependencies

### ESLint

Code linting with Next.js ESLint config:
```bash
npm run lint
```

### Prettier

Code formatting (if configured):
```bash
npx prettier --write .
```

## 🧪 Testing

See the [Testing Guide](./TESTING.md) for complete testing documentation.

### Quick Test Commands

```bash
# Run unit tests
npm test

# Run E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui
```

## 📦 Build & Production

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Production Considerations

- **WASM Files**: Ensure WASM files are in `public/tfjs/`
- **Model Loading**: Models load from CDN first, fallback to local
- **Optimization**: Next.js optimizes images and bundles automatically
- **Environment Variables**: Configure any required env vars

## 🔍 Debugging

### Browser DevTools

1. **Console**: Check for errors and log messages
2. **Network Tab**: Monitor model loading and API calls
3. **Performance Tab**: Profile memory and CPU usage
4. **Application Tab**: Inspect IndexedDB storage

### React DevTools

Install React DevTools browser extension for component inspection.

### TensorFlow.js Debugging

```typescript
// Enable verbose logging
import * as tf from '@tensorflow/tfjs';
tf.setBackend('webgl');
tf.engine().startScope();
```

### Common Debugging Scenarios

1. **Models Not Loading**
   - Check network tab for CDN requests
   - Verify internet connection
   - Check browser console for errors

2. **Memory Leaks**
   - Monitor DevHUD tensor count
   - Use `logTfMem()` utility
   - Check for operations not wrapped in `tf.tidy()`

3. **Camera Not Working**
   - Check browser permissions
   - Ensure HTTPS (required for camera)
   - Try demo mode: `/scan?demo=1`

## 📁 Project Structure

```
src/
  app/              # Next.js pages (App Router)
  components/       # React components
  lib/             # Core logic
    ai/            # Model loaders
    persistence/   # Storage utilities
    utils/
      dev/         # Dev tools (memory, etc.)
      logger.ts    # Logging system
tests/
  unit/            # Unit tests
  e2e/             # E2E tests
public/
  tfjs/            # WASM binaries
  samples/         # Demo assets
```

## 🎯 Best Practices

### Code Organization

1. **Keep components focused**: Each component should have a single responsibility
2. **Use TypeScript**: Leverage types for better code quality
3. **Follow Next.js patterns**: Use App Router conventions
4. **Organize by feature**: Group related files together

### Performance

1. **Lazy load models**: Models load on demand
2. **Throttle detection**: Detection runs every 8 frames
3. **Optimize images**: Use compression and resizing
4. **Monitor memory**: Use DevHUD and memory utilities

### Error Handling

1. **Use Error Boundaries**: Wrap components in error boundaries
2. **Log errors**: Use structured logging for errors
3. **Provide fallbacks**: Always have fallback UI for errors
4. **Handle edge cases**: Test with various inputs and conditions

## 🔗 Related Documentation

- [Testing Guide](./TESTING.md) - Testing approach and coverage
- [Logging](./LOGGING.md) - Detailed logging documentation
- [Architecture](./ARCHITECTURE.md) - System architecture
- [Troubleshooting](./TROUBLESHOOTING.md) - Common issues and solutions

