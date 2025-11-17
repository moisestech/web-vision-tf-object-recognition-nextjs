import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { v4 as uuid } from 'uuid';
import { getDefaultMunicipality } from './constants';
import { log } from './utils/logger';

export type DraftInspection = {
  id: string;
  createdAt: string;
  municipalityId: string;
  counts: { bottle: number; cup: number; utensils: number };
  fillPercent: number;
  litersEst: number;
  imgDataUrl: string;
};

type DraftStore = {
  current?: DraftInspection;
  set: (d: Partial<DraftInspection>) => void;
  reset: () => void;
};

export const useDraft = create<DraftStore>()(
  persist(
    (set, get) => ({
      current: undefined,
      set: (d) => {
        const newDraft = {
          id: uuid(),
          createdAt: new Date().toISOString(),
          municipalityId: getDefaultMunicipality().id,
          counts: { bottle: 0, cup: 0, utensils: 0 },
          fillPercent: 0,
          litersEst: 0,
          imgDataUrl: '',
          ...(get().current || {}),
          ...d,
        };
        log.info('store', 'Draft updated', { municipalityId: newDraft.municipalityId, counts: newDraft.counts });
        set({ current: newDraft });
      },
      reset: () => {
        log.info('store', 'Draft reset');
        set({ current: undefined });
      },
    }),
    {
      name: 'sop-draft',
      storage: typeof window !== 'undefined' 
        ? createJSONStorage(() => window.sessionStorage)
        : undefined,
    }
  )
);

