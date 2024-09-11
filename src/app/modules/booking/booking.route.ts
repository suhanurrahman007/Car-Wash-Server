import express from 'express';

import Auth from '../../middlewares/auth';
import { User_Role } from '../user/user.constant';
import { BookingController } from './booking.controller';
import { BookingValidation } from './booking.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/bookings',
  Auth(User_Role.user),
  validateRequest(BookingValidation.bookingSchemaValidation),
  BookingController.createBooking,
);

router.get('/bookings', Auth(User_Role.admin), BookingController.getAllBooking);

router.get(
  '/my-bookings',
  Auth(User_Role.user),
  BookingController.getMyBooking,
);
export const BookingRoutes = router;
