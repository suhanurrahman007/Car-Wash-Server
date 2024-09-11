/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { JwtPayload } from 'jsonwebtoken';
import { TBookingRequest } from './booking.interface';
import { BookingModel } from './booking.model';
import { User } from '../user/user.model';
import AppError from '../../error/AppError';
import httpStatus from 'http-status';
import { SlotModel } from '../slot/slot.model';
import { ServiceModel } from '../service/service.model';

const createBookingIntoDB = async (
  payload: TBookingRequest,
  user: JwtPayload,
) => {
  // Find the customer by email
  const customerIdentify = await User.findOne({ email: user.userEmail });
  if (!customerIdentify) {
    throw new AppError(httpStatus.NOT_FOUND, 'Customer not found');
  }

  const customer = {
    _id: customerIdentify._id,
    name: customerIdentify.name,
    email: customerIdentify.email,
    phone: customerIdentify.phone,
    address: customerIdentify.address,
  };

  const serviceIdentify = await ServiceModel.findById(payload.serviceId);
  if (!serviceIdentify) {
    throw new AppError(httpStatus.NOT_FOUND, 'service not found');
  }

  const service = {
    _id: serviceIdentify._id,
    name: serviceIdentify.name,
    description: serviceIdentify.description,
    price: serviceIdentify.price,
    duration: serviceIdentify.duration,
    isDeleted: serviceIdentify.isDeleted,
  };

  const slotIdentify = await SlotModel.findById(payload.slotId);
  if (!slotIdentify) {
    throw new AppError(httpStatus.NOT_FOUND, 'slot not found');
  }

  const slot = {
    _id: slotIdentify._id,
    service: slotIdentify.service,
    date: slotIdentify.date,
    startTime: slotIdentify.startTime,
    endTime: slotIdentify.endTime,
    isBooked: slotIdentify.isBooked,
  };

  // Create the booking object
  const newBooking = {
    customer,
    service,
    slot,
    vehicleType: payload.vehicleType,
    vehicleBrand: payload.vehicleBrand,
    vehicleModel: payload.vehicleModel,
    manufacturingYear: payload.manufacturingYear,
    registrationPlate: payload.registrationPlate,
  };

  // Save the booking in the database
  const booking = await BookingModel.create(newBooking);

  // Update the slot to mark it as booked
  const slotUpdate = await SlotModel.findByIdAndUpdate(
    payload.slotId,
    { isBooked: 'booked' },
    { new: true, runValidators: true },
  );

  // Check if slot was updated, if not, throw an error
  if (!slotUpdate) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Slot not found or already booked',
    );
  }

  const booked = booking.slot.isBooked;

  if (booked === 'booked') {
    throw new AppError(httpStatus.BAD_REQUEST, 'Slot already booked');
  }

  if (booked === 'canceled') {
    throw new AppError(httpStatus.BAD_REQUEST, 'Slot is canceled');
  }

  return booking;
};

const getAllBookingFromDB = async () => {
  const result = await BookingModel.find();
  return result;
};

const getMyBookingFromDB = async (user: JwtPayload) => {
  const result = await BookingModel.find({
    'customer.email': user.userEmail,
  }).select('-customer');
  return result;
};

export const BookingService = {
  createBookingIntoDB,
  getAllBookingFromDB,
  getMyBookingFromDB,
};
