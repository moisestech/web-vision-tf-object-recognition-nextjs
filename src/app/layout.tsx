'use client';

import { Suspense } from 'react';
import { LogViewer } from '@/components/LogViewer';
import { ErrorHandler } from '@/components/ErrorHandler';
import { ThemeProvider } from '@/contexts/ThemeContext';
import './globals.css';

function ThemeProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={children}>
      <ThemeProvider>{children}</ThemeProvider>
    </Suspense>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Suppress TensorFlow CPU backend errors before React/Next.js can catch them
              (function() {
                const originalAddEventListener = window.addEventListener;
                window.addEventListener = function(type, listener, options) {
                  if (type === 'unhandledrejection') {
                    const wrappedListener = function(event) {
                      const errorMessage = event.reason?.message || String(event.reason) || '';
                      const errorString = String(event.reason);
                      if (errorMessage.includes("Backend name 'cpu' not found") || 
                          errorString.includes("Backend name 'cpu' not found")) {
                        event.preventDefault();
                        event.stopPropagation();
                        return false;
                      }
                      if (listener) listener(event);
                    };
                    return originalAddEventListener.call(this, type, wrappedListener, options);
                  }
                  return originalAddEventListener.call(this, type, listener, options);
                };
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-dvh bg-background text-foreground antialiased">
        <ErrorHandler />
        <ThemeProviderWrapper>
          {children}
        </ThemeProviderWrapper>
        {process.env.NODE_ENV === 'development' && <LogViewer />}
      </body>
    </html>
  );
}
