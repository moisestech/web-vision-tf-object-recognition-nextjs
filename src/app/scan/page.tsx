'use client';

import Link from 'next/link';
import { Suspense } from 'react';
import { ArrowLeft } from 'lucide-react';
import { CameraSurface } from '@/components/CameraSurface';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { useMunicipalityTheme } from '@/contexts/ThemeContext';

export default function ScanPage() {
  const { theme } = useMunicipalityTheme();
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header 
        className="border-b"
        style={{
          borderColor: theme.border,
          backgroundColor: theme.cardBg + '80',
        }}
      >
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="sm">
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Link>
            </Button>
            <h1 className="text-xl font-bold text-foreground">Field Scanner</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-6 py-8">
        <Suspense fallback={<LoadingSpinner />}>
          <CameraSurface />
        </Suspense>
      </main>
    </div>
  );
}

