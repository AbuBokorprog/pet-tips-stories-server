import express from 'express';
import { updateUserValidation } from './user.validation';
import { userController } from './user.controller';
import { validationRequest } from '../../utils/validationRequest';
import { Auth } from '../../middleware/auth';
import { userRoles } from './user.utils';
import { upload } from '../../utils/imageUploader';
const route = express.Router();

route.get('/', userController.retrievedUsers);

route.get(
  '/me',
  Auth(userRoles.ADMIN, userRoles.USER),
  userController.retrievedMe,
);

route.get(
  '/:id',
  Auth(userRoles.ADMIN, userRoles.USER),
  userController.retrieveSpecificUser,
);

route.put(
  '/update/me',
  upload.single('file'),
  (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  Auth(userRoles.ADMIN, userRoles.USER),
  validationRequest(updateUserValidation),
  userController.updateUser,
);

route.put(
  '/:id',
  Auth(userRoles.ADMIN),
  validationRequest(updateUserValidation),
  userController.updateUserRole,
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
