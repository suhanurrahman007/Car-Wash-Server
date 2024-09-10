import { z } from 'zod';

const createServiceSchemaValidation = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().min(1, 'Description is required'),
    price: z.number().positive('Price must be a positive number'),
    duration: z.number().positive('Duration must be a positive number'),
    isDeleted: z.boolean(),
  }),
});


const updateServiceSchemaValidation = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required').optional(),
    description: z.string().min(1, 'Description is required').optional(),
    price: z.number().positive('Price must be a positive number').optional(),
    duration: z
      .number()
      .positive('Duration must be a positive number')
      .optional(),
    isDeleted: z.boolean().optional(),
  }),
});
export const serviceValidation = {
  createServiceSchemaValidation,
  updateServiceSchemaValidation,
};
