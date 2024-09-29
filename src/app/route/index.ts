import express from 'express';
import { userRouter } from '../modules/User/user.route';
import { postRouter } from '../modules/Post/post.route';
import { commentRouter } from '../modules/Comment/comment.route';
import { paymentRoute } from '../modules/Payment/payment.route';
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
  {
    path: '/comment',
    route: commentRouter,
  },
  {
    path: '/payment',
    route: paymentRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
