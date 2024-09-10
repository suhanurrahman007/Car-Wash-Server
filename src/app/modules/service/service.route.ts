import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { serviceValidation } from './service.validation';
import { ServiceController } from './service.controller';
import Auth from '../../middlewares/auth';
import { User_Role } from '../user/user.constant';
const router = express.Router();

router.post(
  '/',
  Auth(User_Role.admin),
  validateRequest(serviceValidation.createServiceSchemaValidation),
  ServiceController.createService,
);

router.get('/', ServiceController.getAllService);

router.get('/:id', ServiceController.getSingleService);

router.patch(
  '/:id',
  Auth(User_Role.admin),
  validateRequest(serviceValidation.updateServiceSchemaValidation),
  ServiceController.updateService,
);

router.delete(
  '/:id',
  Auth(User_Role.admin),
  ServiceController.deleteService,
);



router.post(
  '/slots',
  Auth(User_Role.admin),
  validateRequest(serviceValidation.slotSchemaValidation),
  ServiceController.createSlot,
);


export const ServiceRoutes = router;
