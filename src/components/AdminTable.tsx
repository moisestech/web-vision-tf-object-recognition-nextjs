'use client';

import { useEffect, useState } from 'react';
import { listInspections } from '@/lib/data';
import { inspectionsToCsv } from '@/lib/csv';
import { renderPosterPNG } from '@/lib/poster';
import type { Inspection } from '@/lib/schemas';
import { useMunicipalityTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getMunicipality } from '@/lib/constants';

export function AdminTable() {
  const [rows, setRows] = useState<Inspection[]>([]);
  const { theme } = useMunicipalityTheme();

  useEffect(() => {
    loadRows();
  }, []);

  async function loadRows() {
    const inspections = await listInspections();
    setRows(inspections);
  }

  function exportCsv() {
    const csv = inspectionsToCsv(rows);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sop-inspections-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function downloadPoster(i: Inspection) {
    try {
      const blob = await renderPosterPNG(i);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `poster-${i.id}.png`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to generate poster:', error);
      alert('Failed to generate poster');
    }
  }

  return (
    <section className="mx-auto max-w-3xl grid gap-3">
      <div className="flex gap-2 justify-between items-center">
        <h1 
          className="text-2xl font-bold"
          style={{ color: theme.textAccent }}
        >
          Inspections
        </h1>
        <Button 
          onClick={exportCsv}
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
          Export CSV
        </Button>
      </div>

      {rows.length === 0 ? (
        <p 
          className="text-center py-8"
          style={{ color: theme.textAccent + '80' }}
        >
          No inspections yet.
        </p>
      ) : (
        <ul className="grid gap-3">
          {rows.map((row) => {
            const rowMunicipality = getMunicipality(row.municipalityId);
            const rowTheme = rowMunicipality?.theme || theme;
            return (
              <li key={row.id}>
                <Card
                  className="p-4"
                  style={{
                    backgroundColor: rowTheme.cardBg,
                    borderColor: rowTheme.border,
                  }}
                >
                  <div className="flex gap-4 items-start">
                    <img
                      src={row.imageAnonymizedDataUrl}
                      alt="inspection"
                      className="w-24 h-24 object-cover rounded border"
                      style={{ borderColor: rowTheme.border }}
                    />
                    <div className="flex-1 grid gap-1">
                      <div className="flex gap-4 text-sm">
                        <span style={{ color: rowTheme.textAccent + '99' }}>Date:</span>
                        <span style={{ color: rowTheme.textAccent }}>
                          {new Date(row.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex gap-4 text-sm">
                        <span style={{ color: rowTheme.textAccent + '99' }}>Municipality:</span>
                        <span style={{ color: rowTheme.textAccent }}>
                          {rowMunicipality?.name || row.municipalityId}
                        </span>
                      </div>
                      <div className="flex gap-4 text-sm">
                        <span style={{ color: rowTheme.textAccent + '99' }}>Counts:</span>
                        <span style={{ color: rowTheme.textAccent }}>
                          {row.counts.bottle} bottles, {row.counts.cup} cups,{' '}
                          {row.counts.utensils} utensils
                        </span>
                      </div>
                      <div className="flex gap-4 text-sm">
                        <span style={{ color: rowTheme.textAccent + '99' }}>Fill:</span>
                        <span style={{ color: rowTheme.textAccent }}>
                          {row.fillPercent}% ({row.litersEst}L)
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadPoster(row)}
                      style={{
                        borderColor: rowTheme.border,
                        color: rowTheme.textAccent,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = rowTheme.cardBg;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      Download Poster
                    </Button>
                  </div>
                </Card>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

