import express from 'express';
import { userRouter } from '../Modules/User/user.route';
import { postRouter } from '../Modules/Post/post.route';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: userRouter,
  },
  {
    path: '/post',
    route: postRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
