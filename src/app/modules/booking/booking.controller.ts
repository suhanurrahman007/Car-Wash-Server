import httpStatus from 'http-status';
import catchAsync from '../../middlewares/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookingService } from './booking.service';
import { JwtPayload } from 'jsonwebtoken';

// Controller to create a booking
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
    message: 'Booking successfully created',
    data: newBooking,
  });
});

// Controller to get all bookings
const getAllBooking = catchAsync(async (req, res) => {
  const allBookings = await BookingService.getAllBookingFromDB();

  // Check if no data is found
  if (!allBookings || allBookings.length === 0) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'No Data Found',
      data: [],
    });
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All bookings retrieved successfully',
    data: allBookings,
  });
});

// Controller to get user's own bookings
const getMyBooking = catchAsync(async (req, res) => {
  const user = req.user as JwtPayload;
  const userBookings = await BookingService.getMyBookingFromDB(user);

  // Check if no data is found for the user
  if (!userBookings || userBookings.length === 0) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'No Data Found',
      data: [],
    });
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User bookings retrieved successfully',
    data: userBookings,
  });
});

export const BookingController = {
  createBooking,
  getAllBooking,
  getMyBooking,
};
