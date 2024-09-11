import httpStatus from 'http-status';
import catchAsync from '../../middlewares/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookingService } from './booking.service';
import { JwtPayload } from 'jsonwebtoken';

const createBooking = catchAsync(async (req, res) => {
  const bookingData = req.body;
  const user = req.user as JwtPayload;
  const newBooking = await BookingService.createBookingIntoDB(
    bookingData,
    user,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booking successfully',
    data: newBooking,
  });
});

const getAllBooking = catchAsync(async (req, res) => {
  const newBooking = await BookingService.getAllBookingFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All bookings retrieved successfully',
    data: newBooking,
  });
});


export const BookingController = {
  createBooking,
  getAllBooking,
};
