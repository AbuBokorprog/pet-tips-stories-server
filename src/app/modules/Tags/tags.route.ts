import express from 'express';
import { tagsController } from './tags.controller';
import { Auth } from '../../middleware/auth';
import { userRoles } from '../User/user.utils';
import { validationRequest } from '../../utils/validationRequest';
import { TagValidation } from './tags.validation';
const route = express.Router();

route.post(
  '/',
  Auth(userRoles.ADMIN),
  validationRequest(TagValidation.createTagValidationSchema),
  tagsController.createTag,
);
route.get('/', tagsController.retrieveAllTag);
route.get('/:id', tagsController.retrieveSpecificTag);
route.patch(
  '/:id',
  Auth(userRoles.ADMIN, userRoles.USER),
  tagsController.updateTag,
);
route.delete(
  '/:id',
  Auth(userRoles.ADMIN, userRoles.USER),
  tagsController.deleteTag,
);

route.patch(
  '/:id/follow',
  Auth(userRoles.ADMIN, userRoles.USER),
  tagsController.followTag,
);

route.patch(
  '/:id/unfollow',
  Auth(userRoles.ADMIN, userRoles.USER),
  tagsController.unFollowTag,
);
export const tagsRoute = route;
