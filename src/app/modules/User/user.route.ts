import express from 'express';
import {
  createUserValidation,
  loginValidationSchema,
  updateUserValidation,
} from './user.validation';
import { userController } from './user.controller';
import { validationRequest } from '../../utils/validationRequest';
import { Auth } from '../../middleware/auth';
import { userRoles } from './user.utils';
const route = express.Router();

route.post(
  '/auth/register',
  validationRequest(createUserValidation),
  userController.createUser,
);

route.post(
  '/auth/login',
  validationRequest(loginValidationSchema),
  userController.userLogin,
);

route.get(
  '/me',
  Auth(userRoles.ADMIN, userRoles.USER),
  userController.retrievedMe,
);

route.put(
  '/update/me',
  Auth(userRoles.ADMIN, userRoles.USER),
  validationRequest(updateUserValidation),
  userController.updateUser,
);

route.delete('/:id', Auth(userRoles.ADMIN), userController.deleteUser);

route.patch(
  '/:id/follow',
  Auth(userRoles.ADMIN, userRoles.USER),
  userController.followUser,
);
route.patch(
  '/:id/unfollow',
  Auth(userRoles.ADMIN, userRoles.USER),
  userController.unFollowUser,
);

export const userRouter = route;