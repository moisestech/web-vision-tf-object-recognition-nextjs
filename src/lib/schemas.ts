import { z } from 'zod';

export const InspectionSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  municipalityId: z.string(),
  counts: z.object({
    bottle: z.number(),
    cup: z.number(),
    utensils: z.number(),
  }),
  fillPercent: z.number().min(0).max(100),
  litersEst: z.number().min(0),
  imageAnonymizedDataUrl: z.string().startsWith('data:image/'),
});

export type Inspection = z.infer<typeof InspectionSchema>;

