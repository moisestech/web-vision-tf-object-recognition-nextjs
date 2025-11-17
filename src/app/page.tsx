'use client';

import Link from 'next/link';
import { Building2, Camera, FileText } from 'lucide-react';
import { MUNICIPALITIES } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useMunicipalityTheme } from '@/contexts/ThemeContext';

export default function HomePage() {
  const { theme } = useMunicipalityTheme();
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Building2 className="h-6 w-6 text-blue-500" />
              <h1 className="text-xl font-bold text-foreground">SOP Inspection System</h1>
            </div>
            <nav className="flex items-center gap-4">
              <Link href="/admin" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Admin
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            SOP On-Device AI Inspection System
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Professional waste management inspection tool. All AI runs locally on your device. 
            Faces are automatically anonymized on capture for privacy compliance.
          </p>
          
          {/* Primary Actions */}
          <div className="flex gap-4 justify-center">
            <Button 
              asChild 
              size="lg" 
              className="gap-2"
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
              <Link href="/scan">
                <Camera className="h-5 w-5" />
                Open Field Scanner
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="gap-2"
              style={{
                borderColor: theme.border,
                color: theme.textAccent,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = theme.cardBg;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <Link href="/admin">
                <FileText className="h-5 w-5" />
                View Admin
              </Link>
            </Button>
          </div>
        </div>

        <Separator className="my-12" />

        {/* Municipalities Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-center text-foreground">
            Supported Municipalities
          </h2>
          <p className="text-center text-muted-foreground mb-8">
            Select a municipality to begin inspection
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {MUNICIPALITIES.map((municipality) => (
              <Link
                key={municipality.id}
                href={`/scan?m=${municipality.id}`}
                className="block transition-transform hover:scale-[1.02]"
              >
                <Card 
                  className="h-full transition-colors cursor-pointer"
                  style={{
                    backgroundColor: municipality.theme.cardBg,
                    borderColor: municipality.theme.border,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = municipality.theme.accent;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = municipality.theme.border;
                  }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <Building2 
                          className="h-5 w-5" 
                          style={{ color: municipality.theme.textAccent }}
                        />
                        <CardTitle 
                          className="text-lg"
                          style={{ color: municipality.theme.textAccent }}
                        >
                          {municipality.name}
                        </CardTitle>
                      </div>
                      <Badge 
                        variant="secondary" 
                        className="text-xs"
                        style={{
                          backgroundColor: municipality.theme.border,
                          color: municipality.theme.textAccent,
                        }}
                      >
                        {municipality.region}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {municipality.description && (
                      <CardDescription 
                        className="text-sm"
                        style={{ color: municipality.theme.textAccent + 'cc' }}
                      >
                        {municipality.description}
                      </CardDescription>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-16 text-center">
          <Separator className="mb-6" />
          <p className="text-sm text-muted-foreground">
            Professional inspection system for waste management compliance
          </p>
        </div>
      </main>
    </div>
  );
}
