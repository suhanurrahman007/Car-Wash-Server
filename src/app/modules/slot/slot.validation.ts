import { z } from 'zod';

const slotSchemaValidation = z.object({
  body: z.object({
    service: z.string(),
    date: z.string(),
    startTime: z.string(),
    endTime: z.string(),
  }),
});

export const slotValidation = {
  slotSchemaValidation,
};
