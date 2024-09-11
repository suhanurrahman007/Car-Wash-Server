import { Schema, model } from 'mongoose';
import { BookingDocument } from './booking.interface';

const BookingSchema = new Schema<BookingDocument>(
  {
    customer: {
      _id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
    },
    service: {
      _id: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
      name: { type: String, required: true },
      description: { type: String, required: true },
      price: { type: Number, required: true },
      duration: { type: Number, required: true },
      isDeleted: { type: Boolean, default: false },
    },
    slot: {
      _id: { type: Schema.Types.ObjectId, ref: 'Slot', required: true },
      service: { type: Schema.Types.ObjectId, required: true },
      date: { type: String, required: true },
      startTime: { type: String, required: true },
      endTime: { type: String, required: true },
      isBooked: { type: String, default: 'available' },
    },
    vehicleType: { type: String, required: true },
    vehicleBrand: { type: String, required: true },
    vehicleModel: { type: String, required: true },
    manufacturingYear: { type: Number, required: true },
    registrationPlate: { type: String, required: true },
  },
  { timestamps: true },
);

export const BookingModel = model<BookingDocument>('Booking', BookingSchema);
