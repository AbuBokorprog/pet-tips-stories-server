import express from 'express';
import { userRouter } from '../Modules/User/user.route';
import { postRouter } from '../Modules/Post/post.route';
import { commentRouter } from '../Modules/Comment/comment.route';
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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
