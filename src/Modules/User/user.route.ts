import express from 'express';
import { createUserValidation, updateUserValidation } from './user.validation';
import { userController } from './user.controller';
import { validationRequest } from '../../app/utils/validationRequest';
const route = express.Router();

route.post(
  '/auth/register',
  validationRequest(createUserValidation),
  userController.createUser,
);

route.put(
  '/:id',
  validationRequest(updateUserValidation),
  userController.updateUser,
);

route.delete('/:id', userController.deleteUser);

route.post('/:id/follow', userController.followUser);
route.post('/:id/unfollow', userController.unFollowUser);

export const userRouter = route;
