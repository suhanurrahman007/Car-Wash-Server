import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
// import { AuthValidation } from './auth.validation';
import { UserValidation } from '../user/user.validation';
import { AuthValidation } from './auth.validation';


const router = express.Router();

router.post(
  '/signup',
  validateRequest(UserValidation.userValidationSchema),
  AuthController.signUpUser,
);

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.loginUser,
);


export const AuthRoutes = router;
