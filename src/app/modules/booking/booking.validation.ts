import { z } from 'zod';
// Zod schema for the booking data
export const bookingSchemaValidation = z.object({
  body: z.object({
    serviceId: z.string(),
    slotId: z.string(),
    vehicleType: z.string().min(1),
    vehicleBrand: z.string().min(1),
    vehicleModel: z.string().min(1),
    manufacturingYear: z.number().int().gte(1886),
    registrationPlate: z.string().min(1),
  }),
});

export const BookingValidation = {
  bookingSchemaValidation,
};
