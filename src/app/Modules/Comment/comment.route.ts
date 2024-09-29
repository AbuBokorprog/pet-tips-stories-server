import express from 'express';
import { validationRequest } from '../../utils/validationRequest';
import { createComment, updateComment } from './comment.validation';
import { commentController } from './comment.controller';
const route = express.Router();

route.post(
  '/create-comment',
  validationRequest(createComment),
  commentController.createComment,
);
route.get('/', commentController.retrieveComment);

route.put(
  '/:id',
  validationRequest(updateComment),
  commentController.updateComment,
);
route.delete('/:id', commentController.deleteComment);

export const commentRouter = route;
