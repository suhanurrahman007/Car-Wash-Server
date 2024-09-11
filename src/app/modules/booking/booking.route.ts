import express from 'express';

import Auth from '../../middlewares/auth';
import { User_Role } from '../user/user.constant';
import { BookingController } from './booking.controller';
import { BookingValidation } from './booking.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/',
  Auth(User_Role.admin),
  validateRequest(BookingValidation.bookingSchemaValidation),
  BookingController.createBooking,
);

router.get(
  '/',
  Auth(User_Role.admin),
  BookingController.getAllBooking,
);
export const BookingRoutes = router;
