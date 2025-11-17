# SOP On-Device AI Demo

A one-day, visually impressive Next.js 15 demo with **on-device object detection** and **face anonymization** for the Stop Ocean Pollution mission.

## Features

- **On-device AI**: All AI runs locally in the browser (no PII upload)
- **Object Detection**: COCO-SSD detects bottles, cups, and utensils
- **Face Anonymization**: BlazeFace automatically blurs faces on capture
- **Privacy-first**: All processing happens client-side
- **Review & Save**: Adjust counts and fill percentage before saving
- **CSV Export**: Export all inspections as CSV
- **Poster Generation**: Generate PNG posters for each inspection

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- TensorFlow.js (WebGL → WASM fallback)
- COCO-SSD (object detection)
- BlazeFace (face detection)
- Zustand (state management)
- LocalForage (IndexedDB storage)

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Copy TensorFlow.js WASM Files

The WASM backend requires binary files to be served from the `public` directory:

```bash
cp node_modules/@tensorflow/tfjs-backend-wasm/dist/*.wasm public/tfjs/
```

This step is **required** for WASM fallback to work.

### 3. Add Demo Assets (Optional)

For demo mode (`?demo=1`), add sample assets to `public/samples/`:

- `drain_closeup.jpg` - Sample image showing bottles/cups (720p recommended)
- `street_gutter_debris.mp4` - Sample video loop (<8s, 720p recommended)

If these are missing, demo mode will still work but may show errors.

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Usage

### Camera Mode

1. Navigate to `/scan`
2. Allow camera access when prompted
3. Point camera at objects (bottles, cups, utensils)
4. Real-time detection overlay appears
5. Click "Capture & Anonymize" to capture and blur faces
6. Review and adjust counts/fill percentage
7. Save to IndexedDB

### Demo Mode

Navigate to `/scan?demo=1` to use sample video instead of camera (useful for testing without camera access).

### Municipality Selection

The app supports multiple municipalities for showcasing multi-tenant capabilities:

- **Homepage**: Click any municipality card to start scanning for that municipality
- **Scan Page**: Use the dropdown selector to switch municipalities
- **Query Parameter**: Use `?m={municipalityId}` to set municipality directly

**Supported Municipalities:**
- Miami (demo-miami) - Miami-Dade County coastal areas
- Hallandale Beach (demo-hallandale) - Broward County beachfront
- Key Biscayne (demo-key-biscayne) - Island municipality
- Fort Lauderdale (demo-fort-lauderdale) - Venice of America
- Miami Beach (demo-miami-beach) - Art Deco Historic District
- Coral Gables (demo-coral-gables) - The City Beautiful

All inspections are tagged with their municipality ID for filtering and reporting.

### Admin Panel

Navigate to `/admin` to:
- View all saved inspections
- Export CSV of all inspections
- Download poster PNG for each inspection

## Development

### Structured Logging

The app includes a comprehensive logging system for debugging and monitoring:

**Log Viewer (Development Mode)**
- Automatically appears in the top-left corner in development
- Shows real-time logs with categories, levels, and structured data
- Export logs as JSON for analysis
- Clear logs button for reset

**Log Categories:**
- `tf-init`: TensorFlow.js initialization
- `detection`: Object detection operations
- `camera`: Camera and capture operations
- `review`: Review page actions
- `data`: Data persistence operations
- `store`: State management

**Log Levels:**
- `debug`: Detailed debugging information
- `info`: General information about operations
- `warn`: Warning messages
- `error`: Error messages with stack traces

**Using the Logger:**

```typescript
import { log } from '@/lib/utils/logger';

log.info('category', 'Message', { data: 'value' });
log.error('category', 'Error message', error, { context: 'data' });
```

**Exporting Logs:**

In the browser console:
```javascript
// Get logs as JSON
const logs = log.getLogs();
console.log(JSON.stringify(logs, null, 2));

// Or use the LogViewer component's export button
```

### Memory Monitoring

In development mode, a DevHUD appears showing:
- TensorFlow backend (webgl/wasm)
- Number of tensors (watch for leaks)
- Memory usage

### Memory Leak Detection

Use the memory monitor utility:

```typescript
import { logTfMem } from '@/lib/utils/dev/memory';

const stop = logTfMem(2000); // Log every 2 seconds
// ... do work ...
stop(); // Stop monitoring
```

### Testing

All tests are configured to pass. The test suite includes:

**Unit Tests:**
```bash
npm test
```

Tests cover:
- Math utilities (liters calculation, class tallying)
- CSV export (formatting and escaping)
- Image processing (resize and compression)
- Canvas operations (state management)

**E2E Tests:**
```bash
# E2E tests (requires dev server running)
npm run test:e2e

# E2E tests with UI
npm run test:e2e:ui
```

E2E tests verify the complete flow:
- Scan → Review → Admin in demo mode
- Municipality selection
- Data persistence

## Known Limitations

1. **iOS Camera**: Requires HTTPS and user gesture to start
2. **Storage Limits**: Safari has ~50MB IndexedDB limit
3. **Model Loading**: First load can take 5-10 seconds (models are cached)
4. **Face Detection**: May miss side profiles or occluded faces
5. **Detection Accuracy**: Small/distant objects may be missed

## Troubleshooting

### WebGL Not Available

The app automatically falls back to WASM. If both fail:
- Check browser compatibility
- Ensure WASM files are in `public/tfjs/`
- Check browser console for errors

### Camera Not Working

- Ensure HTTPS (required for camera access)
- Check browser permissions
- Try demo mode: `/scan?demo=1`

### Memory Leaks

- Check DevHUD tensor count (should not grow unbounded)
- Ensure all TF ops are wrapped in `tf.tidy()`
- Monitor with `logTfMem()` utility

### Models Not Loading

- Check network tab for CDN requests
- Models load from CDN first, fallback to local if available
- Ensure internet connection for first load

## Project Structure

```
src/
  app/              # Next.js pages
  components/       # React components
  lib/             # Core logic
    ai/            # Model loaders
    persistence/   # Storage utilities
    utils/dev/     # Dev tools
tests/
  unit/            # Unit tests
  e2e/             # E2E tests
public/
  tfjs/            # WASM binaries (required)
  samples/         # Demo assets (optional)
```

## License

MIT
