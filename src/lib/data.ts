import localforage from 'localforage';
import type { Inspection } from './schemas';
import { log } from './utils/logger';

const KEY = 'sop-inspections';

export async function saveInspection(i: Inspection): Promise<void> {
  log.info('data', 'Saving inspection', { id: i.id, municipalityId: i.municipalityId, counts: i.counts });
  const existing = (await listInspections()) || [];
  existing.push(i);
  await localforage.setItem(KEY, existing);
  log.info('data', 'Inspection saved', { totalInspections: existing.length });
}

export async function listInspections(): Promise<Inspection[]> {
  log.debug('data', 'Listing inspections');
  const data = await localforage.getItem<Inspection[]>(KEY);
  if (!data) {
    log.debug('data', 'No inspections found');
    return [];
  }
  const sorted = data.sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  log.debug('data', 'Inspections loaded', { count: sorted.length });
  return sorted;
}

