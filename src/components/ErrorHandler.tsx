'use client';

import { useEffect } from 'react';

export function ErrorHandler() {
  useEffect(() => {
    // Handle unhandled promise rejections (like TensorFlow CPU backend errors)
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const errorMessage = event.reason?.message || String(event.reason) || '';
      const errorString = String(event.reason);
      
      // Suppress non-critical TensorFlow backend errors
      if (
        errorMessage.includes("Backend name 'cpu' not found") ||
        errorString.includes("Backend name 'cpu' not found")
      ) {
        event.preventDefault();
        event.stopPropagation();
        return false;
      }
      
      // Allow other errors to be logged normally
    };

    // Add listener with capture phase to catch early
    window.addEventListener('unhandledrejection', handleUnhandledRejection, true);

    // Also handle error events
    const handleError = (event: ErrorEvent) => {
      const errorMessage = event.message || String(event.error);
      if (errorMessage.includes("Backend name 'cpu' not found")) {
        event.preventDefault();
        event.stopPropagation();
        return false;
      }
    };

    window.addEventListener('error', handleError, true);

    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection, true);
      window.removeEventListener('error', handleError, true);
    };
  }, []);

  return null;
}

