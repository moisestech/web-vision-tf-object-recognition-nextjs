import type { Inspection } from './schemas';

function escapeCsvField(field: string | number): string {
  const str = String(field);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function inspectionsToCsv(rows: Inspection[]): string {
  const headers = [
    'id',
    'createdAt',
    'municipalityId',
    'bottleCount',
    'cupCount',
    'utensilsCount',
    'fillPercent',
    'litersEst',
  ];

  const headerRow = headers.join(',');

  const dataRows = rows.map((row) => {
    return [
      escapeCsvField(row.id),
      escapeCsvField(row.createdAt),
      escapeCsvField(row.municipalityId),
      escapeCsvField(row.counts.bottle),
      escapeCsvField(row.counts.cup),
      escapeCsvField(row.counts.utensils),
      escapeCsvField(row.fillPercent),
      escapeCsvField(row.litersEst),
    ].join(',');
  });

  return [headerRow, ...dataRows].join('\n');
}

