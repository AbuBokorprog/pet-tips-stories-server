import express from 'express';
import { createUserValidation, updateUserValidation } from './user.validation';
import { userController } from './user.controller';
import { validationRequest } from '../../utils/validationRequest';
const route = express.Router();

route.post(
  '/register',
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