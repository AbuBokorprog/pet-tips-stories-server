import express from 'express';
import { validationRequest } from '../../utils/validationRequest';
import {
  createPostValidationSchema,
  updatePostValidationSchema,
} from './post.validation';
import { postController } from './post.controller';
import { Auth } from '../../middleware/auth';
import { userRoles } from '../User/user.utils';
const route = express.Router();

route.post(
  '/create-post',
  Auth(userRoles.ADMIN, userRoles.USER),
  validationRequest(createPostValidationSchema),
  postController.createPost,
);
route.get('/', postController.retrieveAllPosts);
route.get('/:id', postController.specificPost);

route.patch(
  '/:id/upvote',
  Auth(userRoles.ADMIN, userRoles.USER),
  postController.toggleUpVotes,
);
route.patch(
  '/:id/downvote',
  Auth(userRoles.ADMIN, userRoles.USER),
  postController.toggleDownVotes,
);

route.put(
  '/:id',
  Auth(userRoles.ADMIN, userRoles.USER),
  validationRequest(updatePostValidationSchema),
  postController.updatePost,
);
route.delete(
  '/:id',
  Auth(userRoles.ADMIN, userRoles.USER),
  postController.deletePost,
);

export const postRouter = route;
