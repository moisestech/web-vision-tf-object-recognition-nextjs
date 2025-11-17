'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { initTf } from '@/lib/tfInit';
import { loadCoco, detectFrame, type Det } from '@/lib/detection';
import {
  snapshotVideoToCanvas,
  drawDetections,
  compressCanvasToDataURL,
} from '@/lib/image';
import { blurFacesOnCanvas } from '@/lib/faces';
import { useDraft } from '@/lib/store';
import { tallyByClass } from '@/lib/math';
import { MUNICIPALITIES, getMunicipality, getDefaultMunicipality } from '@/lib/constants';
import { log } from '@/lib/utils/logger';
import { ErrorBoundary } from './ErrorBoundary';
import { LoadingSpinner } from './LoadingSpinner';
import { DevHUD } from './DevHUD';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Camera, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useMunicipalityTheme } from '@/contexts/ThemeContext';

export function CameraSurface() {
  const router = useRouter();
  const params = useSearchParams();
  const demo = params?.get('demo') === '1';
  const municipalityId =
    params?.get('m') || getDefaultMunicipality().id;
  
  const municipality = getMunicipality(municipalityId) || getDefaultMunicipality();
  const { theme } = useMunicipalityTheme();

  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const [dets, setDets] = useState<Det[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const frameCountRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const { set: setDraft } = useDraft();

  useEffect(() => {
    let mounted = true;

    async function initialize() {
      try {
        log.info('camera', 'Initializing camera surface', { demo, municipalityId });
        await initTf();
        await loadCoco();
        setModelsLoaded(true);
        setLoading(false);
        log.info('camera', 'Models loaded successfully');

        if (demo && videoRef.current) {
          // Demo mode: use sample video
          log.info('camera', 'Starting demo mode with sample video');
          videoRef.current.src = '/samples/street_gutter_debris.mp4';
          videoRef.current.loop = true;
          videoRef.current.play().catch((err) => {
            log.error('camera', 'Failed to play demo video', err);
          });
        } else {
          // Real camera mode
          log.info('camera', 'Requesting camera access');
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' },
          });
          if (mounted && videoRef.current) {
            videoRef.current.srcObject = stream;
            log.info('camera', 'Camera stream started');
          }
        }
      } catch (err) {
        log.error('camera', 'Failed to initialize camera', err instanceof Error ? err : new Error(String(err)), { demo, municipalityId });
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to initialize');
          setLoading(false);
        }
      }
    }

    initialize();

    return () => {
      mounted = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [demo]);

  useEffect(() => {
    if (!modelsLoaded || !videoRef.current || !overlayRef.current) {
      return;
    }

    const video = videoRef.current;
    const overlay = overlayRef.current;
    const ctx = overlay.getContext('2d');

    if (!ctx) {
      return;
    }

    function detectLoop() {
      if (!video || !ctx || video.readyState !== video.HAVE_ENOUGH_DATA) {
        animationFrameRef.current = requestAnimationFrame(detectLoop);
        return;
      }

      // Throttle to every 8 frames
      frameCountRef.current++;
      if (frameCountRef.current % 8 === 0) {
        detectFrame(video)
          .then((newDets) => {
            if (!ctx) return;
            
            setDets(newDets);

            // Resize overlay to match video
            if (
              overlay.width !== video.videoWidth ||
              overlay.height !== video.videoHeight
            ) {
              overlay.width = video.videoWidth;
              overlay.height = video.videoHeight;
            }

            // Clear and draw
            ctx.clearRect(0, 0, overlay.width, overlay.height);
            drawDetections(ctx, newDets);
          })
          .catch((error) => {
            // Silently handle detection errors (they're already logged in detection.ts)
            // Only log if it's not a CPU backend error
            const errorMessage = error?.message || String(error);
            if (!errorMessage.includes("Backend name 'cpu' not found")) {
              log.warn('camera', 'Detection error in loop', { error: errorMessage });
            }
          });
      }

      animationFrameRef.current = requestAnimationFrame(detectLoop);
    }

    detectLoop();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [modelsLoaded]);

  async function onCapture() {
    if (!videoRef.current) {
      log.warn('camera', 'Capture attempted but video not available');
      return;
    }

    log.info('camera', 'Starting capture', { municipalityId, detectionCount: dets.length });
    const captureStartTime = performance.now();

    try {
      // 1) Snapshot
      const canvas = snapshotVideoToCanvas(videoRef.current, 1280);
      log.debug('camera', 'Video snapshot created', { width: canvas.width, height: canvas.height });

      // 2) Blur faces
      const blurredCanvas = await blurFacesOnCanvas(canvas);
      log.debug('camera', 'Face blur complete');

      // 3) Compress
      const dataUrl = compressCanvasToDataURL(blurredCanvas, 0.7);
      const dataSize = (dataUrl.length * 3) / 4 / 1024; // Approximate KB
      log.debug('camera', 'Image compressed', { sizeKB: dataSize.toFixed(2) });

      // 4) Compute counts
      const counts = tallyByClass(dets);
      log.info('camera', 'Detection counts computed', counts);

      // 5) Set draft and navigate
      setDraft({
        imgDataUrl: dataUrl,
        counts,
        municipalityId,
      });

      const captureTime = performance.now() - captureStartTime;
      log.info('camera', 'Capture complete', { 
        municipalityId, 
        counts, 
        captureTimeMs: captureTime.toFixed(2) 
      });

      router.push('/review');
    } catch (error) {
      log.error('camera', 'Capture failed', error instanceof Error ? error : new Error(String(error)), { municipalityId });
      alert('Failed to capture image');
    }
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <Alert variant="destructive" className="max-w-2xl mx-auto">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="mt-2">
          {error}
        </AlertDescription>
        <div className="mt-4">
          <Button onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      </Alert>
    );
  }

  return (
    <ErrorBoundary>
      <section className="grid gap-6">
        {/* Municipality Selector */}
        <Card 
          className="p-4"
          style={{
            backgroundColor: theme.cardBg,
            borderColor: theme.border,
          }}
        >
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex-1">
              <label 
                className="text-sm font-medium mb-2 block"
                style={{ color: theme.textAccent + 'cc' }}
              >
                Municipality
              </label>
              <Select
                value={municipalityId}
                onValueChange={(newM) => {
                  log.info('camera', 'Municipality changed', { from: municipalityId, to: newM });
                  router.push(`/scan?m=${newM}${demo ? '&demo=1' : ''}`);
                }}
              >
                <SelectTrigger 
                  className="w-full sm:w-[300px]"
                  style={{
                    backgroundColor: theme.cardBg,
                    borderColor: theme.border,
                    color: theme.textAccent,
                  }}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent
                  style={{
                    backgroundColor: theme.cardBg,
                    borderColor: theme.border,
                  }}
                >
                  {MUNICIPALITIES.map((m) => (
                    <SelectItem 
                      key={m.id} 
                      value={m.id}
                      style={{
                        color: theme.textAccent,
                      }}
                      className="hover:opacity-80"
                    >
                      {m.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {municipality.description && (
                <p 
                  className="text-xs mt-2 italic"
                  style={{ color: theme.textAccent + 'aa' }}
                >
                  {municipality.description}
                </p>
              )}
            </div>
            
            {/* Status Indicators */}
            <div className="flex gap-2 flex-wrap">
              <Badge 
                className="gap-1.5"
                style={{
                  backgroundColor: modelsLoaded ? theme.primary : theme.border,
                  color: 'white',
                }}
              >
                {modelsLoaded ? (
                  <CheckCircle2 className="h-3 w-3" />
                ) : (
                  <AlertCircle className="h-3 w-3" />
                )}
                Models {modelsLoaded ? "Loaded" : "Loading"}
              </Badge>
              <Badge 
                className="gap-1.5"
                style={{
                  backgroundColor: !error ? theme.primary : 'rgb(239, 68, 68)',
                  color: 'white',
                }}
              >
                {!error ? (
                  <CheckCircle2 className="h-3 w-3" />
                ) : (
                  <AlertCircle className="h-3 w-3" />
                )}
                Camera {!error ? "Active" : "Error"}
              </Badge>
            </div>
          </div>
        </Card>

        {/* Camera View */}
        <div className="relative w-full max-w-3xl mx-auto">
          <div className="relative rounded-lg border border-border overflow-hidden bg-slate-950">
            <video
              ref={videoRef}
              className="w-full aspect-video object-cover"
              playsInline
              muted
              autoPlay
            />
            <canvas
              ref={overlayRef}
              className="absolute inset-0 w-full h-full pointer-events-none"
            />
          </div>
        </div>

        {/* Capture Button */}
        <div className="flex flex-col items-center gap-4">
          <Button 
            size="lg" 
            onClick={onCapture} 
            className="gap-2 min-w-[200px]"
            style={{
              backgroundColor: theme.primary,
              color: 'white',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = theme.primaryHover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = theme.primary;
            }}
          >
            <Camera className="h-5 w-5" />
            Capture & Anonymize
          </Button>
          
          <p 
            className="text-xs text-center max-w-md"
            style={{ color: theme.textAccent + 'aa' }}
          >
            Detection runs on‑device. WebGL → WASM fallback. Faces are automatically anonymized on capture.
          </p>
        </div>

        <DevHUD />
      </section>
    </ErrorBoundary>
  );
}

