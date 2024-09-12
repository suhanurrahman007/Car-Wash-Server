import { z } from 'zod';
import { vehicleTypes } from './booking.constant';

// Zod schema for the booking data
export const bookingSchemaValidation = z.object({
  body: z.object({
    serviceId: z.string(),
    slotId: z.string(),
    vehicleType: z.enum([...vehicleTypes] as [string, ...string[]]),
    vehicleBrand: z.string().min(1),
    vehicleModel: z.string().min(1),
    manufacturingYear: z.number().int().gte(1886),
    registrationPlate: z.string().min(1),
  }),
});

export const BookingValidation = {
  bookingSchemaValidation,
};
