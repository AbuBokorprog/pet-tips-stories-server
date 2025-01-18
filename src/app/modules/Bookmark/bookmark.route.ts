import express from 'express';
import { bookmarkController } from './bookmark.controller';
import { Auth } from '../../middleware/auth';
import { userRoles } from '../User/user.utils';
const route = express.Router();

route.post(
  '/',
  Auth(userRoles.ADMIN, userRoles.USER),
  bookmarkController.createBookmark,
);
route.get(
  '/',
  Auth(userRoles.ADMIN, userRoles.USER),
  bookmarkController.retrieveUserAllBookmark,
);
route.patch(
  '/:id',
  Auth(userRoles.ADMIN, userRoles.USER),
  bookmarkController.updateBookmark,
);
route.delete(
  '/:id',
  Auth(userRoles.ADMIN, userRoles.USER),
  bookmarkController.deleteBookmark,
);

export const bookmarkRoute = route;
