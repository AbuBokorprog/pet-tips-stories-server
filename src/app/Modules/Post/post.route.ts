import express from 'express';
import { validationRequest } from '../../utils/validationRequest';
import {
  createPostValidationSchema,
  updatePostValidationSchema,
} from './post.validation';
import { postController } from './post.controller';
const route = express.Router();

route.post(
  '/create-post',
  validationRequest(createPostValidationSchema),
  postController.createPost,
);
route.get('/', postController.retrieveAllPosts);
route.get('/:id', postController.specificPost);
route.put(
  '/:id',
  validationRequest(updatePostValidationSchema),
  postController.updatePost,
);
route.delete('/:id', postController.deletePost);

export const postRouter = route;
