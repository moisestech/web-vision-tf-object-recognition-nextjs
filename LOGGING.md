# Logging Guide

This document explains how to use the structured logging system for debugging and monitoring.

## Overview

The SOP Demo uses a structured logging system that captures:
- Timestamps
- Log levels (debug, info, warn, error)
- Categories (tf-init, detection, camera, etc.)
- Messages
- Structured data
- Error stack traces

## Log Viewer

In development mode, a LogViewer component appears in the top-left corner showing:
- Real-time log entries
- Color-coded log levels
- Structured data
- Error details

### Controls

- **Export**: Download logs as JSON file
- **Clear**: Clear all logs from memory

## Log Categories

| Category | Description |
|----------|-------------|
| `tf-init` | TensorFlow.js backend initialization |
| `detection` | Object detection operations |
| `camera` | Camera access and capture |
| `review` | Review page actions |
| `data` | IndexedDB operations |
| `store` | Zustand state management |

## Log Levels

### Debug
Detailed information for debugging:
```typescript
log.debug('detection', 'Frame detection complete', {
  totalDetections: 5,
  filteredDetections: 3,
  detectTimeMs: '45.23'
});
```

### Info
General information about operations:
```typescript
log.info('camera', 'Capture complete', {
  municipalityId: 'demo-miami',
  counts: { bottle: 2, cup: 1, utensils: 0 },
  captureTimeMs: '123.45'
});
```

### Warn
Warning messages for non-critical issues:
```typescript
log.warn('detection', 'Model not available for detection');
```

### Error
Error messages with full context:
```typescript
log.error('camera', 'Capture failed', error, {
  municipalityId: 'demo-miami'
});
```

## Exporting Logs

### Via LogViewer Component
Click the "Export" button in the LogViewer to download logs as JSON.

### Via Browser Console
```javascript
// Get logs array
const logs = log.getLogs();

// Export as JSON string
const json = log.export();

// Copy to clipboard
navigator.clipboard.writeText(json);
```

## Log Format

Each log entry follows this structure:

```json
{
  "timestamp": "2025-01-13T00:33:29.123Z",
  "level": "info",
  "category": "camera",
  "message": "Capture complete",
  "data": {
    "municipalityId": "demo-miami",
    "counts": { "bottle": 2, "cup": 1, "utensils": 0 },
    "captureTimeMs": "123.45"
  },
  "error": null
}
```

For errors:
```json
{
  "timestamp": "2025-01-13T00:33:29.123Z",
  "level": "error",
  "category": "camera",
  "message": "Capture failed",
  "data": {
    "municipalityId": "demo-miami"
  },
  "error": {
    "name": "Error",
    "message": "Failed to capture image",
    "stack": "Error: Failed to capture image\n    at ..."
  }
}
```

## Expected Log Flow

### Normal Operation

1. **Initialization**
   ```
   [INFO] [tf-init] Initializing TensorFlow.js
   [INFO] [tf-init] WebGL backend initialized
   [INFO] [detection] Loading COCO-SSD model
   [INFO] [detection] COCO-SSD model loaded
   [INFO] [camera] Initializing camera surface
   [INFO] [camera] Models loaded successfully
   ```

2. **Detection Loop**
   ```
   [DEBUG] [detection] Frame detection complete
   [DEBUG] [detection] Frame detection complete
   ...
   ```

3. **Capture**
   ```
   [INFO] [camera] Starting capture
   [DEBUG] [camera] Video snapshot created
   [DEBUG] [camera] Face blur complete
   [DEBUG] [camera] Image compressed
   [INFO] [camera] Detection counts computed
   [INFO] [camera] Capture complete
   ```

4. **Save**
   ```
   [INFO] [review] Saving inspection
   [INFO] [data] Saving inspection
   [INFO] [data] Inspection saved
   [INFO] [review] Inspection saved successfully
   ```

## Troubleshooting with Logs

### Model Loading Issues
Look for `tf-init` and `detection` category logs:
- Check if backend initialized (webgl/wasm)
- Verify model loading completed
- Check for CDN/local fallback messages

### Capture Issues
Look for `camera` category logs:
- Check if camera stream started
- Verify snapshot creation
- Check face blur completion
- Verify compression size

### Data Persistence Issues
Look for `data` category logs:
- Check if inspection was saved
- Verify total inspection count
- Check for IndexedDB errors

### Memory Leaks
Monitor `tf-init` logs and DevHUD:
- Watch tensor count in DevHUD
- Check for repeated model loading
- Verify `tf.tidy()` usage in detection logs

## Sharing Logs

When reporting issues, export logs and include:
1. Log JSON file (from LogViewer export)
2. Browser console output
3. DevHUD screenshot (if available)
4. Steps to reproduce





