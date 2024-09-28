import express from 'express';
import { userRouter } from '../Modules/User/user.route';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: userRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
