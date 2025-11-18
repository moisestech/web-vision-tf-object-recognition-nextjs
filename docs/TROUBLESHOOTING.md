# 🔧 Troubleshooting Guide

This document covers common issues, known limitations, and their solutions for the SOP On-Device AI Demo.

## ⚠️ Known Limitations

### 📱 iOS Camera

**Issue**: iOS Safari requires HTTPS and a user gesture to start the camera.

**Solution**:
- Ensure the app is served over HTTPS
- Camera must be started via user interaction (button click)
- Consider using demo mode for testing: `/scan?demo=1`

### 💾 Storage Limits

**Issue**: Safari has a ~50MB IndexedDB limit.

**Solution**:
- Monitor storage usage in browser DevTools
- Consider implementing data cleanup for old inspections
- Export data regularly to CSV

### ⏱️ Model Loading

**Issue**: First load can take 5-10 seconds (models are cached after first load).

**Solution**:
- Models are cached in browser cache
- Subsequent loads are much faster
- Show loading indicators during initial load
- Consider preloading models in background

### 👤 Face Detection

**Issue**: May miss side profiles or occluded faces.

**Solution**:
- BlazeFace works best with frontal faces
- Multiple passes may improve detection
- Consider manual review option

### 🔍 Detection Accuracy

**Issue**: Small/distant objects may be missed.

**Solution**:
- COCO-SSD works best with objects >50px
- Ensure good lighting and camera focus
- Adjust detection threshold if needed (default: 0.5)

## 🔧 Common Issues & Solutions

### 🎮 WebGL Not Available

**Symptoms**:
- App falls back to WASM backend
- Slower performance
- Console warnings about WebGL

**Solutions**:
1. **Check Browser Compatibility**
   - Ensure browser supports WebGL
   - Try updating browser to latest version
   - Test in different browsers

2. **Verify WASM Files**
   ```bash
   # Ensure WASM files are in place
   ls public/tfjs/*.wasm
   ```

3. **Check Browser Console**
   - Look for WebGL initialization errors
   - Check for driver issues
   - Verify GPU acceleration is enabled

4. **Fallback to WASM**
   - The app automatically falls back to WASM
   - WASM is slower but more compatible
   - Performance is still acceptable for most use cases

### 📷 Camera Not Working

**Symptoms**:
- Camera feed doesn't appear
- Permission errors
- Black screen

**Solutions**:
1. **Check HTTPS**
   - Camera requires HTTPS (except localhost)
   - Ensure SSL certificate is valid
   - Try accessing via `https://` not `http://`

2. **Browser Permissions**
   - Check browser permission settings
   - Allow camera access when prompted
   - Clear permissions and try again

3. **Try Demo Mode**
   - Use `/scan?demo=1` for testing
   - Demo mode doesn't require camera
   - Useful for development and testing

4. **Check Browser Console**
   - Look for permission errors
   - Check for camera API errors
   - Verify getUserMedia is supported

5. **Device-Specific Issues**
   - iOS: Requires user gesture to start
   - Android: May need app permissions
   - Desktop: Check camera is not in use by another app

### 💾 Memory Leaks

**Symptoms**:
- DevHUD shows growing tensor count
- Browser becomes slow over time
- Browser crashes after extended use

**Solutions**:
1. **Check DevHUD**
   - Monitor tensor count in development
   - Should remain stable, not grow unbounded
   - Watch for sudden increases

2. **Verify TF Operations**
   ```typescript
   // Ensure all TF ops are wrapped
   const result = tf.tidy(() => {
     // TensorFlow operations
     return someTFOperation();
   });
   ```

3. **Use Memory Monitor**
   ```typescript
   import { logTfMem } from '@/lib/utils/dev/memory';
   const stop = logTfMem(2000); // Log every 2 seconds
   // ... do work ...
   stop();
   ```

4. **Check for Leaks**
   - Review detection loop code
   - Ensure canvas operations clean up
   - Check for event listeners not being removed

### 🤖 Models Not Loading

**Symptoms**:
- Models take too long to load
- Console errors about model loading
- Detection doesn't work

**Solutions**:
1. **Check Network Tab**
   - Verify CDN requests are successful
   - Check for network errors
   - Ensure internet connection is active

2. **CDN vs Local**
   - Models load from CDN first
   - Fallback to local if CDN fails
   - Check CDN availability

3. **Browser Cache**
   - Clear browser cache if models are corrupted
   - Models are cached after first load
   - Check cache settings

4. **Model URLs**
   - Verify model URLs are correct
   - Check for CORS issues
   - Ensure models are accessible

5. **Timeout Issues**
   - Increase timeout if needed
   - Show loading indicators
   - Provide retry mechanism

### 🖼️ Image Processing Issues

**Symptoms**:
- Images not displaying
- Compression errors
- Canvas operations failing

**Solutions**:
1. **Check Image Format**
   - Ensure images are valid formats (JPEG, PNG)
   - Check image file size
   - Verify image data is valid

2. **Canvas Context**
   - Ensure canvas context is available
   - Check for WebGL/2D context errors
   - Verify canvas dimensions

3. **Memory Issues**
   - Large images may cause memory issues
   - Use compression and resizing
   - Monitor memory usage

### 💾 Data Persistence Issues

**Symptoms**:
- Data not saving
- Data lost on refresh
- IndexedDB errors

**Solutions**:
1. **Check IndexedDB**
   - Open browser DevTools → Application → IndexedDB
   - Verify data is being stored
   - Check for quota exceeded errors

2. **Storage Limits**
   - Safari has ~50MB limit
   - Monitor storage usage
   - Clear old data if needed

3. **Validation Errors**
   - Check Zod validation errors
   - Ensure data matches schema
   - Review error messages in console

4. **Browser Compatibility**
   - IndexedDB is supported in modern browsers
   - Check browser compatibility
   - Provide fallback if needed

## 🐛 Debugging Tips

### Enable Verbose Logging

```typescript
// In development, logs are automatically verbose
// Check LogViewer component for detailed logs
```

### Use Browser DevTools

1. **Console Tab**: Check for errors and warnings
2. **Network Tab**: Monitor requests and responses
3. **Application Tab**: Inspect storage and cache
4. **Performance Tab**: Profile performance issues

### Check Logs

The app includes structured logging. In development:
- LogViewer appears automatically
- Export logs as JSON for analysis
- Check log categories and levels

### Test in Demo Mode

Use demo mode for consistent testing:
- `/scan?demo=1` - Uses sample video
- No camera permissions needed
- Consistent test environment

## 📞 Getting Help

If you encounter issues not covered here:

1. **Check Documentation**
   - [Development Guide](./DEVELOPMENT.md)
   - [Architecture](./ARCHITECTURE.md)
   - [Testing Guide](./TESTING.md)

2. **Review Logs**
   - Check browser console
   - Export logs from LogViewer
   - Look for error patterns

3. **Test in Different Browsers**
   - Chrome, Firefox, Safari, Edge
   - Check for browser-specific issues
   - Verify compatibility

4. **Check GitHub Issues**
   - Search for similar issues
   - Create new issue with details
   - Include browser, OS, and error logs

## 🔗 Related Documentation

- [Development Guide](./DEVELOPMENT.md) - Development setup and tools
- [Testing Guide](./TESTING.md) - Testing approach
- [Logging](./LOGGING.md) - Logging system
- [Architecture](./ARCHITECTURE.md) - System architecture

