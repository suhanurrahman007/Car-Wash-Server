import { Router } from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
// import { UserRoutes } from '../modules/user/user.route';
import { ServiceRoutes } from '../modules/service/service.route';
import { SlotRoutes } from '../modules/slot/slot.route';
import { BookingRoutes } from '../modules/booking/booking.route';

const router = Router();

const moduleRoutes = [
  // {
  //   path: '/users',
  //   route: UserRoutes,
  // },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/services',
    route: ServiceRoutes,
  },
  {
    path: '/slots',
    route: SlotRoutes,
  },
  {
    path: '/',
    route: BookingRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
