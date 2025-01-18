import express from 'express';
import { userRouter } from '../modules/User/user.route';
import { postRouter } from '../modules/Post/post.route';
import { commentRouter } from '../modules/Comment/comment.route';
import { paymentRoute } from '../modules/Payment/payment.route';
import { authRoutes } from '../modules/Auth/auth.route';
import { categoryRoute } from '../modules/Categories/categories.route';
import { tagsRoute } from '../modules/Tags/tags.route';
import { bookmarkRoute } from '../modules/Bookmark/bookmark.route';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/user',
    route: userRouter,
  },
  {
    path: '/categories',
    route: categoryRoute,
  },
  {
    path: '/tags',
    route: tagsRoute,
  },
  {
    path: '/bookmarks',
    route: bookmarkRoute,
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
