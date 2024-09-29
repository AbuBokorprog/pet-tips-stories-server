import express from 'express';
import { validationRequest } from '../../utils/validationRequest';
import { createComment, updateComment } from './comment.validation';
import { commentController } from './comment.controller';
import { Auth } from '../../middleware/auth';
import { userRoles } from '../User/user.utils';
const route = express.Router();

route.post(
  '/create-comment',
  Auth(userRoles.ADMIN, userRoles.USER),
  validationRequest(createComment),
  commentController.createComment,
);

route.post(
  '/:id/reply',
  Auth(userRoles.ADMIN, userRoles.USER),
  validationRequest(createComment),
  commentController.replyComment,
);

route.get(
  '/:id',
  Auth(userRoles.ADMIN, userRoles.USER),
  commentController.retrieveComment,
);

route.put(
  '/:id',
  Auth(userRoles.ADMIN, userRoles.USER),
  validationRequest(updateComment),
  commentController.updateComment,
);
route.delete(
  '/:id',
  Auth(userRoles.ADMIN, userRoles.USER),
  commentController.deleteComment,
);

export const commentRouter = route;
